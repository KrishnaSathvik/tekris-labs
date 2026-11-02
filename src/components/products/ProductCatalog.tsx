"use client";

import { useState } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { CATEGORY_LABELS, type Product, type ProductCategory } from "@/lib/products";

type Filter = ProductCategory | "all";

interface ProductCatalogProps {
  products: Product[];
  categories: ProductCategory[];
}

export function ProductCatalog({ products, categories }: ProductCatalogProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const visible =
    filter === "all" ? products : products.filter((product) => product.category === filter);

  const options: { value: Filter; label: string }[] = [
    { value: "all", label: "All products" },
    ...categories.map((category) => ({ value: category, label: CATEGORY_LABELS[category] })),
  ];

  return (
    <div>
      <div className="border-b border-border pb-6">
        <div
          role="group"
          aria-label="Filter by category"
          className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 md:mx-0 md:flex-wrap md:px-0"
        >
          {options.map((option) => {
            const selected = filter === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(option.value)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  selected
                    ? "border-ink bg-ink text-white"
                    : "border-border bg-background text-muted hover:border-line hover:text-ink"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "product" : "products"} shown
      </p>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product) => (
          <li key={product.slug}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
