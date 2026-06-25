"use server";

import { CONTACT_EMAIL } from "@/lib/site";

export type ContactFormState = {
  success: boolean;
  error: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { success: false, error: "Please fill in all fields." };
  }

  if (!emailPattern.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  if (message.length < 10) {
    return {
      success: false,
      error: "Message should be at least 10 characters.",
    };
  }

  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Tekris Labs — message from ${name}`,
          _template: "table",
          _captcha: "false",
        }),
      },
    );

    if (!response.ok) {
      return {
        success: false,
        error: "Something went wrong. Please try again.",
      };
    }

    return { success: true, error: "" };
  } catch {
    return {
      success: false,
      error: "Unable to send message. Please try again later.",
    };
  }
}
