import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Tekris Labs",
  description:
    "Get in touch with Tekris Labs for product inquiries, support, or business questions.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 page-offset">
        <div className="container-narrow page-content">
          <Link
            href="/"
            className="text-sm text-muted transition-colors hover:text-terracotta"
          >
            &larr; Back to home
          </Link>

          <h1 className="mt-6 font-serif text-4xl tracking-tight text-charcoal md:text-5xl">
            Get in touch
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
            Reach out for product inquiries, customer support, or general
            business questions. We typically respond within one to two business
            days.
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            <div className="rounded-2xl border border-border p-8 lg:col-span-2">
              <p className="text-xs font-medium uppercase tracking-widest text-muted">
                Business information
              </p>
              <dl className="mt-4 space-y-4">
                <div>
                  <dt className="text-sm text-muted">Company</dt>
                  <dd className="mt-1 font-medium text-charcoal">Tekris Labs</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Business type</dt>
                  <dd className="mt-1 font-medium text-charcoal">
                    Software company
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Offering</dt>
                  <dd className="mt-1 font-medium text-charcoal">
                    Subscription-based software and digital tools
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Delivery</dt>
                  <dd className="mt-1 font-medium text-charcoal">
                    Cloud-based web applications
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
