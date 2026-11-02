import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/products/ProductCard";
import { getFeaturedProducts } from "@/lib/products";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const featured = getFeaturedProducts();

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
        <div className="container-page pb-20 pt-16 md:pb-28 md:pt-24 lg:pb-32 lg:pt-28">
          <div className="max-w-4xl">
            <p className="eyebrow">Tekris Labs</p>
            <h1 className="display mt-6">
              Thoughtful software, built for <span className="text-gradient">real use.</span>
            </h1>
            <p className="lede mt-6 max-w-xl">
              Tekris Labs creates digital products, developer tools, and intelligent applications
              designed to solve practical problems.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/products" variant="primary" size="lg">
                Explore products
                <ArrowIcon />
              </Button>
              <Button href="/about" variant="secondary" size="lg">
                About Tekris Labs
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-border bg-surface">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="eyebrow">Featured work</p>
              <h2 className="heading mt-4">A selection of what we&apos;re building</h2>
            </div>
            <Link
              href="/products"
              className="-my-2 inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap py-2 text-sm font-medium text-ink transition-colors hover:text-accent"
            >
              View all products
              <ArrowIcon />
            </Link>
          </div>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <li key={product.slug} className="sm:last:odd:col-span-2 lg:last:odd:col-span-1">
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </div>
      </section>

    </>
  );
}
