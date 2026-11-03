import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getProductStory, hasProductStory } from "@/lib/product-stories";
import { CATEGORY_LABELS, getCategoriesInUse, getFeaturedProducts, products } from "@/lib/products";

describe("product registry", () => {
  it("has unique, URL-safe slugs", () => {
    const slugs = products.map((product) => product.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("has an icon file for every product", () => {
    for (const product of products) {
      expect(existsSync(join(process.cwd(), "public", product.icon)), product.icon).toBe(true);
    }
  });

  it("gives every product a summary and a complete product story", () => {
    for (const product of products) {
      expect(product.summary.length, product.slug).toBeGreaterThan(20);
      expect(hasProductStory(product.slug), product.slug).toBe(true);
      const story = getProductStory(product.slug);
      expect(story.about.length, product.slug).toBeGreaterThanOrEqual(2);
      expect(story.workflow.steps.length, product.slug).toBeGreaterThanOrEqual(3);
      expect(story.workflow.steps.length, product.slug).toBeLessThanOrEqual(4);
      expect(story.expertise, product.slug).toHaveLength(4);
      expect(story.working.provide.length, product.slug).toBeGreaterThanOrEqual(3);
      expect(story.working.expect.length, product.slug).toBeGreaterThanOrEqual(3);
    }
  });

  it("lists all 19 products", () => {
    expect(products).toHaveLength(19);
  });

  it("only links to https listing URLs", () => {
    for (const product of products) {
      if (product.listingUrl) expect(product.listingUrl).toMatch(/^https:\/\//);
    }
  });

  it("links every product to a unique ChatGPT listing", () => {
    const urls = products.map((product) => product.listingUrl);
    for (const [index, url] of urls.entries()) {
      expect(url, products[index].slug).toMatch(
        /^https:\/\/chatgpt\.com\/plugins\/plugins_[0-9a-f]{32}$/,
      );
    }
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("features the selected products in order", () => {
    expect(getFeaturedProducts().map((product) => product.name)).toEqual([
      "RAG & GenAI Copilot",
      "Software & AI Copilot",
      "SQL Copilot",
    ]);
  });

  it("only exposes categories that contain products", () => {
    for (const category of getCategoriesInUse()) {
      expect(CATEGORY_LABELS[category]).toBeTruthy();
      expect(products.some((product) => product.category === category)).toBe(true);
    }
  });
});
