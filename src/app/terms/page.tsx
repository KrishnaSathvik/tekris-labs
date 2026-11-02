import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument, type LegalSection } from "@/components/layout/LegalDocument";
import { HELLO_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using the Tekris Labs website and products.",
  alternates: { canonical: "/terms" },
  openGraph: { url: "/terms" },
};

const sections: LegalSection[] = [
  {
    id: "agreement",
    title: "Scope and agreement",
    content: (
      <p>
        These terms apply to the tekrislabs.com website and the products listed on our{" "}
        <Link href="/products">Products</Link> page. By using them, you agree to these terms. Any
        product-specific terms will be linked from that product&apos;s page and apply alongside
        these.
      </p>
    ),
  },
  {
    id: "products",
    title: "Our products",
    content: (
      <p>
        Tekris Labs publishes software products and developer tools, including plugins distributed
        through platforms such as ChatGPT. Features, availability, and requirements are described on
        each product page.
      </p>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    content: (
      <>
        <p>Use the website and our products lawfully. You must not:</p>
        <ul>
          <li>attempt to access, disrupt, or compromise our systems;</li>
          <li>send spam, malware, or abusive content through the contact form;</li>
          <li>use our products to violate the law or the rights of others;</li>
          <li>misrepresent an affiliation with Tekris Labs.</li>
        </ul>
      </>
    ),
  },
  {
    id: "third-party-platforms",
    title: "Third-party platforms",
    content: (
      <p>
        Products used through platforms we don&apos;t operate, such as ChatGPT, are also subject to
        those platforms&apos; terms, including{" "}
        <a href="https://openai.com/policies/terms-of-use/" rel="noopener noreferrer">
          OpenAI&apos;s Terms of Use
        </a>
        . We don&apos;t control their availability, pricing, or features.
      </p>
    ),
  },
  {
    id: "accounts-and-payment",
    title: "Accounts and paid features",
    content: (
      <p>
        The website and our current products require no Tekris Labs account or purchase. If a future
        product offers accounts or paid features, its terms and pricing will be shown before you
        sign up or pay.
      </p>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    content: (
      <p>
        The Tekris Labs name, logos, product names, and original materials belong to Tekris Labs or
        its licensors and may not be used to suggest endorsement without permission. Third-party and
        open-source components remain under their own licenses.
      </p>
    ),
  },
  {
    id: "your-content",
    title: "Your content and generated output",
    content: (
      <p>
        You keep your rights in the content you provide and are responsible for having the right to
        use it. We claim no ownership of output you create with our products; rights in generated
        output may also depend on the platform you use, and similar output may be produced for
        others.
      </p>
    ),
  },
  {
    id: "technical-limitations",
    title: "Software and technical limitations",
    content: (
      <p>
        Software, and AI-assisted tools especially, can produce errors or incomplete results. Review
        and test generated code, commands, and recommendations before relying on them, keep your own
        backups, and protect your credentials. Our products do not provide legal, financial,
        medical, or other professional advice.
      </p>
    ),
  },
  {
    id: "availability",
    title: "Changes and availability",
    content: (
      <p>
        We may update, suspend, or discontinue any product or feature. We don&apos;t guarantee that
        every product will work with every setup or remain available indefinitely.
      </p>
    ),
  },
  {
    id: "warranties",
    title: "Disclaimer of warranties",
    content: (
      <p>
        To the extent permitted by law, the website and products are provided &ldquo;as is&rdquo;
        and &ldquo;as available,&rdquo; without warranties of any kind, including merchantability,
        fitness for a particular purpose, and non-infringement.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    content: (
      <p>
        To the extent permitted by law, Tekris Labs is not liable for indirect, incidental, special,
        consequential, or punitive damages, or for lost data, profits, or business, arising from use
        of the website or products. Nothing here limits liability or consumer rights that cannot be
        limited under applicable law.
      </p>
    ),
  },
  {
    id: "ending-use",
    title: "Ending use",
    content: (
      <p>
        You can stop using any product at any time; ChatGPT plugins can be removed in ChatGPT. We
        may restrict access for anyone who violates these terms.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    content: (
      <p>
        This page always shows the current terms. We will post material changes before they take
        effect.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <p>
        For questions about these terms, email <a href={`mailto:${HELLO_EMAIL}`}>{HELLO_EMAIL}</a>{" "}
        or <Link href="/contact?topic=general">use the contact form</Link>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms of Service"
      intro={<p>The terms for using the Tekris Labs website and the products we publish.</p>}
      sections={sections}
    />
  );
}
