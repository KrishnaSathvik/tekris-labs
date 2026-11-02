"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { submitContactForm, type ContactFormState } from "@/app/contact/actions";
import {
  INQUIRY_LABELS,
  INQUIRY_TYPES,
  LIMITS,
  type ContactField,
  type ContactValues,
} from "@/lib/contact";

interface ContactFormProps {
  initialValues: ContactValues;
  products: { slug: string; name: string }[];
}

const fieldClass =
  "w-full rounded-lg border bg-background px-3.5 py-2.5 text-[0.95rem] text-ink shadow-sm placeholder:text-muted/80 transition-colors focus:outline-none focus:ring-4 focus:ring-accent/10";

const selectClass = `${fieldClass} cursor-pointer appearance-none pr-10`;

const labelClass = "mb-2 block text-sm font-medium text-ink";

function SelectChevron() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ContactForm({ initialValues, products }: ContactFormProps) {
  const [state, formAction, pending] = useActionState<ContactFormState, FormData>(
    submitContactForm,
    { status: "idle", attempt: 0, values: initialValues },
  );
  const [dismissedAttempt, setDismissedAttempt] = useState(-1);
  const startedAt = useRef(0);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  const fieldErrors = state.status === "error" ? state.fieldErrors : {};
  const errorFor = (field: ContactField) => fieldErrors[field];
  const describedBy = (field: ContactField, hint?: string) =>
    [hint, errorFor(field) ? `${field}-error` : undefined].filter(Boolean).join(" ") || undefined;
  const borderFor = (field: ContactField) =>
    errorFor(field) ? "border-red-500" : "border-border focus:border-accent";

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const input = event.currentTarget.elements.namedItem("startedAt");
    if (input instanceof HTMLInputElement) input.value = String(startedAt.current);
  };

  if (state.status === "success" && dismissedAttempt !== state.attempt) {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="card p-8 focus:outline-none md:p-10"
      >
        <p className="title text-2xl">Message sent</p>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Thank you for getting in touch. Your message has been delivered, and we&apos;ll reply
          to the email address you provided.
        </p>
        <button
          type="button"
          onClick={() => setDismissedAttempt(state.attempt)}
          className="text-link mt-6 text-sm"
        >
          Send another message
        </button>
      </div>
    );
  }

  const values = state.status === "success" ? initialValues : state.values;

  return (
    <form
      key={state.attempt}
      action={formAction}
      onSubmit={onSubmit}
      className="card relative p-6 shadow-[0_12px_40px_-20px_rgb(10_10_10/0.15)] sm:p-8 md:p-10"
    >
      <h2 className="title text-2xl">Send a message</h2>
      <p className="mt-2 text-sm text-muted">Fields marked * are required.</p>

      {state.status === "error" ? (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 focus:outline-none"
        >
          {state.message}
        </div>
      ) : null}

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="topic" className={labelClass}>
            Inquiry type *
          </label>
          <div className="relative">
            <select
              id="topic"
              name="topic"
              required
              defaultValue={values.topic}
              aria-invalid={Boolean(errorFor("topic"))}
              aria-describedby={describedBy("topic")}
              className={`${selectClass} ${borderFor("topic")}`}
            >
              {INQUIRY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {INQUIRY_LABELS[type]}
                </option>
              ))}
            </select>
            <SelectChevron />
          </div>
          <FieldError field="topic" message={errorFor("topic")} />
        </div>

        <div>
          <label htmlFor="product" className={labelClass}>
            Product
          </label>
          <div className="relative">
            <select
              id="product"
              name="product"
              defaultValue={values.product}
              aria-invalid={Boolean(errorFor("product"))}
              aria-describedby={describedBy("product")}
              className={`${selectClass} ${borderFor("product")}`}
            >
              <option value="">No specific product</option>
              {products.map((product) => (
                <option key={product.slug} value={product.slug}>
                  {product.name}
                </option>
              ))}
            </select>
            <SelectChevron />
          </div>
          <FieldError field="product" message={errorFor("product")} />
        </div>

        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={LIMITS.name}
            defaultValue={values.name}
            aria-invalid={Boolean(errorFor("name"))}
            aria-describedby={describedBy("name")}
            className={`${fieldClass} ${borderFor("name")}`}
          />
          <FieldError field="name" message={errorFor("name")} />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={LIMITS.email}
            placeholder="you@example.com"
            defaultValue={values.email}
            aria-invalid={Boolean(errorFor("email"))}
            aria-describedby={describedBy("email")}
            className={`${fieldClass} ${borderFor("email")}`}
          />
          <FieldError field="email" message={errorFor("email")} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="subject" className={labelClass}>
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            maxLength={LIMITS.subject}
            placeholder="A short summary"
            defaultValue={values.subject}
            aria-invalid={Boolean(errorFor("subject"))}
            aria-describedby={describedBy("subject")}
            className={`${fieldClass} ${borderFor("subject")}`}
          />
          <FieldError field="subject" message={errorFor("subject")} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClass}>
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            minLength={LIMITS.messageMin}
            maxLength={LIMITS.messageMax}
            placeholder="Tell us what happened, what you expected, or what you'd like to know."
            defaultValue={values.message}
            aria-invalid={Boolean(errorFor("message"))}
            aria-describedby={describedBy("message", "message-hint")}
            className={`${fieldClass} ${borderFor("message")} min-h-40 resize-y`}
          />
          <p id="message-hint" className="mt-2 text-sm text-muted">
            For technical issues, include any error message you saw. Please don&apos;t include
            passwords, API keys, authentication codes, or other sensitive information.
          </p>
          <FieldError field="message" message={errorFor("message")} />
        </div>
      </div>

      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="startedAt" defaultValue="0" />

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          See how we handle messages in our{" "}
          <Link href="/privacy" className="text-link">
            Privacy Policy
          </Link>
          .
        </p>
        <Button type="submit" variant="primary" size="lg" disabled={pending}>
          {pending ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}

function FieldError({ field, message }: { field: ContactField; message?: string }) {
  if (!message) return null;
  return (
    <p id={`${field}-error`} className="mt-2 text-sm text-red-600">
      {message}
    </p>
  );
}
