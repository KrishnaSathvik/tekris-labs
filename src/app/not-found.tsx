import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="container-page flex flex-1 flex-col justify-center py-24 md:py-32">
      <p className="text-gradient font-mono text-7xl font-semibold tracking-tight md:text-8xl">404</p>
      <h1 className="display mt-6">Page not found</h1>
      <p className="lede mt-6 max-w-xl">
        We couldn&apos;t find the page you&apos;re looking for. It may have moved, or the link may
        no longer be available.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Button href="/" variant="primary" size="lg">
          Return home
        </Button>
        <Button href="/products" variant="secondary" size="lg">
          Explore products
        </Button>
      </div>
      <p className="mt-10 text-sm text-muted">
        Still need help?{" "}
        <Link href="/contact" className="text-link">
          Contact Tekris Labs
        </Link>
        .
      </p>
    </div>
  );
}
