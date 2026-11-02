"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import {
  EMPTY_VALUES,
  INQUIRY_LABELS,
  inboxFor,
  isInquiryType,
  validateContact,
  type ContactValues,
  type FieldErrors,
} from "@/lib/contact";
import { getProduct } from "@/lib/products";
import { SITE_URL } from "@/lib/site";

export type ContactFormState =
  | { status: "idle"; attempt: number; values: ContactValues }
  | { status: "success"; attempt: number; values: ContactValues }
  | {
      status: "error";
      attempt: number;
      values: ContactValues;
      message: string;
      fieldErrors: FieldErrors;
    };

const MIN_FILL_TIME_MS = 3000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const DUPLICATE_WINDOW_MS = 2 * 60 * 1000;
// FormSubmit can take close to a minute to respond.
const DELIVERY_TIMEOUT_MS = 55_000;

// Best-effort, per-instance protection. Serverless instances don't share memory.
const recentByClient = new Map<string, number[]>();
const recentMessages = new Map<string, number>();

function readValues(formData: FormData): ContactValues {
  const read = (key: keyof ContactValues) => String(formData.get(key) ?? "").trim();
  return {
    topic: read("topic") || EMPTY_VALUES.topic,
    product: read("product"),
    name: read("name"),
    email: read("email"),
    subject: read("subject"),
    message: read("message"),
  };
}

function isRateLimited(clientKey: string, now: number) {
  const recent = (recentByClient.get(clientKey) ?? []).filter(
    (time) => now - time < RATE_WINDOW_MS,
  );
  if (recent.length >= RATE_MAX) {
    recentByClient.set(clientKey, recent);
    return true;
  }
  recent.push(now);
  recentByClient.set(clientKey, recent);
  return false;
}

function fingerprintOf(values: ContactValues) {
  return createHash("sha256")
    .update(`${values.email.toLowerCase()}\n${values.message}`)
    .digest("hex");
}

function wasRecentlyDelivered(fingerprint: string, now: number) {
  for (const [key, time] of recentMessages) {
    if (now - time > DUPLICATE_WINDOW_MS) recentMessages.delete(key);
  }
  return recentMessages.has(fingerprint);
}

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const attempt = prevState.attempt + 1;
  const values = readValues(formData);
  const now = Date.now();

  // Honeypot and fill-time checks: quietly accept so bots get no signal.
  const honeypot = String(formData.get("website") ?? "");
  const startedAt = Number(formData.get("startedAt") ?? 0);
  if (honeypot || !startedAt || now - startedAt < MIN_FILL_TIME_MS) {
    return { status: "success", attempt, values: EMPTY_VALUES };
  }

  const fieldErrors = validateContact(values);
  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      attempt,
      values,
      fieldErrors,
      message: "Please correct the highlighted fields.",
    };
  }

  const requestHeaders = await headers();
  const clientKey =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(clientKey, now)) {
    return {
      status: "error",
      attempt,
      values,
      fieldErrors: {},
      message:
        "You've sent several messages in a short time. Please wait a few minutes and try again.",
    };
  }

  const fingerprint = fingerprintOf(values);
  if (wasRecentlyDelivered(fingerprint, now)) {
    return { status: "success", attempt, values: EMPTY_VALUES };
  }

  if (!isInquiryType(values.topic)) {
    return {
      status: "error",
      attempt,
      values,
      fieldErrors: { topic: "Choose an inquiry type." },
      message: "Please correct the highlighted fields.",
    };
  }
  const topicLabel = INQUIRY_LABELS[values.topic];
  const inbox = inboxFor(values.topic);
  const productName = values.product ? getProduct(values.product)?.name : undefined;
  const subjectParts = [topicLabel, productName, values.subject].filter(Boolean);

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`, {
      method: "POST",
      // FormSubmit rejects requests that don't identify the website they come from.
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: SITE_URL,
        Referer: `${SITE_URL}/contact`,
      },
      body: JSON.stringify({
        name: values.name || "(not provided)",
        email: values.email,
        inquiry: topicLabel,
        product: productName ?? "(none selected)",
        subject: values.subject || "(none)",
        message: values.message,
        _subject: `Tekris Labs — ${subjectParts.join(" · ")}`,
        _template: "table",
        _captcha: "false",
      }),
      signal: AbortSignal.timeout(DELIVERY_TIMEOUT_MS),
      cache: "no-store",
    });

    const data: unknown = await response.json().catch(() => null);
    const delivered =
      response.ok &&
      typeof data === "object" &&
      data !== null &&
      String((data as { success?: unknown }).success) === "true";

    if (!delivered) {
      console.error("Contact delivery rejected", response.status, data);
      throw new Error("Delivery rejected");
    }

    recentMessages.set(fingerprint, now);
    return { status: "success", attempt, values: EMPTY_VALUES };
  } catch (error) {
    console.error("Contact delivery failed", error);
    return {
      status: "error",
      attempt,
      values,
      fieldErrors: {},
      message:
        "Your message couldn't be delivered right now. Nothing you typed has been lost — please try sending it again in a moment.",
    };
  }
}
