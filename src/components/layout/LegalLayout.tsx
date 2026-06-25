import Link from "next/link";
import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

interface LegalLayoutProps {
  title: string;
  children: ReactNode;
}

export function LegalLayout({ title, children }: LegalLayoutProps) {
  return (
    <>
      <Navbar />
      <main className="flex-1 page-offset">
        <article className="container-narrow page-content">
          <Link
            href="/"
            className="text-sm text-muted transition-colors hover:text-terracotta"
          >
            &larr; Back to home
          </Link>
          <h1 className="mt-6 font-serif text-4xl tracking-tight text-charcoal md:text-5xl">
            {title}
          </h1>
          <div className="prose-legal mt-10 space-y-6 text-base leading-relaxed text-muted">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
