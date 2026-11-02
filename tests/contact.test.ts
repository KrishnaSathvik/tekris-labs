import { describe, expect, it } from "vitest";
import {
  EMPTY_VALUES,
  INQUIRY_TYPES,
  LIMITS,
  inboxFor,
  validateContact,
  type ContactValues,
} from "@/lib/contact";

const valid: ContactValues = {
  ...EMPTY_VALUES,
  topic: "support",
  product: "sql-copilot",
  email: "person@example.com",
  message: "The plugin explained a join incorrectly for my schema.",
};

describe("validateContact", () => {
  it("accepts a complete submission", () => {
    expect(validateContact(valid)).toEqual({});
  });

  it("requires a valid email", () => {
    expect(validateContact({ ...valid, email: "" }).email).toBeDefined();
    expect(validateContact({ ...valid, email: "not-an-email" }).email).toBeDefined();
  });

  it("rejects unknown inquiry types and products", () => {
    expect(validateContact({ ...valid, topic: "sales" }).topic).toBeDefined();
    expect(validateContact({ ...valid, product: "does-not-exist" }).product).toBeDefined();
  });

  it("allows no product", () => {
    expect(validateContact({ ...valid, product: "" })).toEqual({});
  });

  it("enforces message length limits", () => {
    expect(validateContact({ ...valid, message: "short" }).message).toBeDefined();
    expect(
      validateContact({ ...valid, message: "x".repeat(LIMITS.messageMax + 1) }).message,
    ).toBeDefined();
  });
});

describe("inboxFor", () => {
  it("routes support, bugs, and privacy requests to support", () => {
    expect(inboxFor("support")).toBe("support@tekrislabs.com");
    expect(inboxFor("bug")).toBe("support@tekrislabs.com");
    expect(inboxFor("privacy")).toBe("support@tekrislabs.com");
  });

  it("routes feedback and general inquiries to hello", () => {
    expect(inboxFor("feedback")).toBe("hello@tekrislabs.com");
    expect(inboxFor("general")).toBe("hello@tekrislabs.com");
  });

  it("only uses the two official addresses", () => {
    const inboxes = new Set(INQUIRY_TYPES.map(inboxFor));
    expect([...inboxes].sort()).toEqual(["hello@tekrislabs.com", "support@tekrislabs.com"]);
  });
});
