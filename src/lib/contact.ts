import { getProduct } from "@/lib/products";
import { HELLO_EMAIL, SUPPORT_EMAIL } from "@/lib/site";

export const INQUIRY_TYPES = ["support", "bug", "feedback", "privacy", "general"] as const;
export type InquiryType = (typeof INQUIRY_TYPES)[number];

export const INQUIRY_LABELS: Record<InquiryType, string> = {
  support: "Product support",
  bug: "Technical issue or bug",
  feedback: "Feedback or feature request",
  privacy: "Privacy inquiry",
  general: "Business or general inquiry",
};

export const LIMITS = {
  name: 100,
  email: 254,
  subject: 150,
  messageMin: 20,
  messageMax: 5000,
} as const;

export interface ContactValues {
  topic: string;
  product: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactField = keyof ContactValues;
export type FieldErrors = Partial<Record<ContactField, string>>;

export const EMPTY_VALUES: ContactValues = {
  topic: "support",
  product: "",
  name: "",
  email: "",
  subject: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isInquiryType(value: string): value is InquiryType {
  return (INQUIRY_TYPES as readonly string[]).includes(value);
}

export function inboxFor(topic: InquiryType): string {
  switch (topic) {
    case "support":
    case "bug":
    case "privacy":
      return SUPPORT_EMAIL;
    case "feedback":
    case "general":
      return HELLO_EMAIL;
    default: {
      const unhandled: never = topic;
      throw new Error(`Unhandled inquiry type: ${String(unhandled)}`);
    }
  }
}

export function validateContact(values: ContactValues): FieldErrors {
  const errors: FieldErrors = {};

  if (!isInquiryType(values.topic)) {
    errors.topic = "Choose an inquiry type.";
  }
  if (values.product && !getProduct(values.product)) {
    errors.product = "Choose a product from the list.";
  }
  if (values.name.length > LIMITS.name) {
    errors.name = `Keep your name under ${LIMITS.name} characters.`;
  }
  if (!values.email) {
    errors.email = "Enter your email address so we can reply.";
  } else if (values.email.length > LIMITS.email || !emailPattern.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (values.subject.length > LIMITS.subject) {
    errors.subject = `Keep the subject under ${LIMITS.subject} characters.`;
  }
  if (values.message.length < LIMITS.messageMin) {
    errors.message = `Please write at least ${LIMITS.messageMin} characters so we can help.`;
  } else if (values.message.length > LIMITS.messageMax) {
    errors.message = `Keep your message under ${LIMITS.messageMax} characters.`;
  }

  return errors;
}
