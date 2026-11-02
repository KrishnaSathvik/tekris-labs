import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/products", "/about", "/contact", "/privacy", "/terms"];
  return [
    ...pages.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...products.map((product) => ({ url: `${SITE_URL}/products/${product.slug}` })),
  ];
}
