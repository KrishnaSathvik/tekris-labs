import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/layout/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service — Tekris Labs",
  description: "Terms of Service for Tekris Labs software products and services.",
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service">
      <p>
        <strong className="text-charcoal">Last updated:</strong> June 25, 2026
      </p>

      <p>
        These Terms of Service (&quot;Terms&quot;) govern your use of software
        products and services provided by Tekris Labs. By accessing or using
        our services, you agree to these Terms.
      </p>

      <h2 className="font-serif text-2xl text-charcoal">Our services</h2>
      <p>
        Tekris Labs provides subscription-based software products and digital
        tools for productivity, document creation, content workflows, and
        business automation. Services are delivered through cloud-based web
        applications accessible online.
      </p>

      <h2 className="font-serif text-2xl text-charcoal">Accounts and subscriptions</h2>
      <p>
        Some services require account registration. You are responsible for
        maintaining the confidentiality of your account credentials. Subscription
        terms, including pricing and billing cycles, are presented at the time
        of purchase for each product.
      </p>

      <h2 className="font-serif text-2xl text-charcoal">Acceptable use</h2>
      <p>You agree not to:</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>Use our services for unlawful purposes</li>
        <li>Attempt to gain unauthorized access to our systems</li>
        <li>Interfere with or disrupt the services</li>
        <li>Reverse engineer or copy our software except as permitted by law</li>
      </ul>

      <h2 className="font-serif text-2xl text-charcoal">Intellectual property</h2>
      <p>
        All content, software, and materials provided through our services are
        owned by Tekris Labs or its licensors and are protected by intellectual
        property laws. Your subscription grants a limited, non-exclusive license
        to use the services as intended.
      </p>

      <h2 className="font-serif text-2xl text-charcoal">Disclaimer of warranties</h2>
      <p>
        Our services are provided &quot;as is&quot; and &quot;as available&quot;
        without warranties of any kind, express or implied, to the fullest extent
        permitted by law.
      </p>

      <h2 className="font-serif text-2xl text-charcoal">Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, Tekris Labs shall not be liable
        for any indirect, incidental, special, or consequential damages arising
        from your use of our services.
      </p>

      <h2 className="font-serif text-2xl text-charcoal">Termination</h2>
      <p>
        We may suspend or terminate access to our services if you violate these
        Terms. You may cancel your subscription in accordance with the terms
        presented at purchase.
      </p>

      <h2 className="font-serif text-2xl text-charcoal">Changes to these terms</h2>
      <p>
        We may update these Terms from time to time. Continued use of our
        services after changes constitutes acceptance of the updated Terms.
      </p>

      <h2 className="font-serif text-2xl text-charcoal">Contact</h2>
      <p>
        For questions about these Terms, please{" "}
        <Link
          href="/contact"
          className="text-charcoal underline decoration-terracotta/50 underline-offset-2 hover:decoration-terracotta"
        >
          use our contact form
        </Link>
        .
      </p>
    </LegalLayout>
  );
}
