import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.(tsx?|css)$/.test(entry) ? [path] : [];
  });
}

const files = sourceFiles(join(process.cwd(), "src")).map((path) => ({
  path,
  text: readFileSync(path, "utf8"),
}));

describe("site content rules", () => {
  it("shows no visible dates, years, or update timestamps", () => {
    for (const { path, text } of files) {
      expect(text, path).not.toMatch(/getFullYear|toLocaleDateString|Last updated|Effective date/i);
      const withoutSvgPaths = text.replace(/\sd="[^"]*"/g, "");
      expect(withoutSvgPaths, path).not.toMatch(/\b(19|20)\d{2}\b/);
    }
  });

  it("does not describe products as subscriptions", () => {
    for (const { path, text } of files) {
      expect(text, path).not.toMatch(/subscription-based|cloud-based software/i);
    }
  });

  it("uses the Tekris Labs brand without personal names or unofficial email addresses", () => {
    const official = new Set(["support@tekrislabs.com", "hello@tekrislabs.com", "you@example.com"]);
    for (const { path, text } of files) {
      expect(text, path).not.toMatch(/krishna|sathvik/i);
      const addresses = text.match(/[\w.+-]+@[\w-]+\.[a-z]{2,}/gi) ?? [];
      for (const address of addresses) expect(official, `${path}: ${address}`).toContain(address);
    }
  });

  it("does not promise a response time", () => {
    for (const { path, text } of files) {
      expect(text, path).not.toMatch(/business days/i);
    }
  });
});
