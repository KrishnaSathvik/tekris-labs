"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import {
  submitContactForm,
  type ContactFormState,
} from "@/app/contact/actions";

const initialState: ContactFormState = { success: false, error: "" };

const fieldClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-charcoal placeholder:text-muted/70 transition-colors focus:border-terracotta/50 focus:outline-none focus:ring-2 focus:ring-terracotta/20";

const labelClass =
  "mb-2 block text-xs font-medium uppercase tracking-widest text-muted";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState,
  );

  if (state.success) {
    return (
      <div className="rounded-2xl border border-border bg-ivory p-8 md:p-10">
        <p className="font-serif text-2xl text-charcoal">Message sent</p>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Thanks for reaching out. We&apos;ll get back to you within one to two
          business days.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="rounded-2xl border border-border bg-ivory p-8 md:p-10">
      <p className="text-xs font-medium uppercase tracking-widest text-muted">
        Send a message
      </p>
      <p className="mt-2 text-base leading-relaxed text-muted">
        For product support, billing questions, partnerships, or general
        inquiries.
      </p>

      <div className="mt-8 space-y-6">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="How can we help?"
            className={`${fieldClass} resize-y min-h-[140px]`}
          />
        </div>

        {state.error ? (
          <p className="text-sm text-terracotta" role="alert">
            {state.error}
          </p>
        ) : null}

        <Button type="submit" variant="accent" size="lg" className={pending ? "opacity-70" : ""}>
          {pending ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}
