import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/layout/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy — Tekris Labs",
  description: "Privacy Policy for Tekris Labs software products and services.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <p>
        <strong className="text-charcoal">Last updated:</strong> June 25, 2026
      </p>

      <p>
        Tekris Labs (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates
        subscription-based software products and digital tools delivered through
        cloud-based web applications. This Privacy Policy explains how we collect,
        use, and protect information when you use our websites and services.
      </p>

      <h2 className="font-serif text-2xl text-charcoal">Information we collect</h2>
      <p>
        We may collect information you provide directly, such as your name,
        email address, and account details when you register for or use our
        services. We may also collect technical information such as browser
        type, device information, and usage data to improve our products.
      </p>

      <h2 className="font-serif text-2xl text-charcoal">How we use information</h2>
      <p>We use collected information to:</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>Provide, maintain, and improve our software products</li>
        <li>Process subscriptions and manage accounts</li>
        <li>Respond to support requests and inquiries</li>
        <li>Send service-related communications</li>
        <li>Ensure security and prevent fraud</li>
      </ul>

      <h2 className="font-serif text-2xl text-charcoal">Data storage and security</h2>
      <p>
        Our products are delivered through cloud-based web applications. We
        implement reasonable technical and organizational measures to protect
        your information. No method of transmission over the internet is
        completely secure, and we cannot guarantee absolute security.
      </p>

      <h2 className="font-serif text-2xl text-charcoal">Third-party services</h2>
      <p>
        We may use third-party service providers for payment processing,
        hosting, analytics, and customer support. These providers process data
        on our behalf and are subject to their own privacy policies.
      </p>

      <h2 className="font-serif text-2xl text-charcoal">Your rights</h2>
      <p>
        Depending on your location, you may have rights to access, correct,
        delete, or restrict the use of your personal information. To exercise
        these rights, please{" "}
        <Link
          href="/contact"
          className="text-charcoal underline decoration-terracotta/50 underline-offset-2 hover:decoration-terracotta"
        >
          contact us through our contact form
        </Link>
        .
      </p>

      <h2 className="font-serif text-2xl text-charcoal">Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will post the
        updated policy on this page with a revised date.
      </p>

      <h2 className="font-serif text-2xl text-charcoal">Contact</h2>
      <p>
        For questions about this Privacy Policy, please{" "}
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
