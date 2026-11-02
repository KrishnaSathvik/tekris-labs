import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument, type LegalSection } from "@/components/layout/LegalDocument";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Tekris Labs handles information across its website and products.",
  alternates: { canonical: "/privacy" },
  openGraph: { url: "/privacy" },
};

const sections: LegalSection[] = [
  {
    id: "scope",
    title: "Scope",
    content: (
      <>
        <p>
          This policy covers the tekrislabs.com website, including the contact form, and the
          products listed on our <Link href="/products">Products</Link> page. &ldquo;Tekris
          Labs,&rdquo; &ldquo;we,&rdquo; and &ldquo;us&rdquo; refer to the operator of this website.
        </p>
        <p>
          If a product handles data beyond what is described here, its product page will link to a
          supplementary disclosure. Our website and products are not directed to children under 13,
          and we do not knowingly collect their personal information.
        </p>
      </>
    ),
  },
  {
    id: "information-you-provide",
    title: "Information you provide",
    content: (
      <>
        <p>
          When you contact us, you provide your email address, your name if you include it, the
          inquiry type, an optional product, and your subject and message. We use this to reply and
          provide support.
        </p>
        <p>
          Please don&apos;t include passwords, API keys, authentication codes, or payment details in
          a message.
        </p>
      </>
    ),
  },
  {
    id: "website-information",
    title: "Website and technical information",
    content: (
      <p>
        Our hosting provider processes the technical information needed to deliver pages and protect
        the service, such as IP address, browser type, and requested pages, in request and security
        logs. The website uses no analytics, advertising trackers, or tracking cookies, and requires
        no account.
      </p>
    ),
  },
  {
    id: "chatgpt-plugins",
    title: "ChatGPT plugins",
    content: (
      <>
        <p>
          Our current ChatGPT plugins are skills-based: they give ChatGPT instructions and reference
          material, and they do not connect to any server we operate. Your conversations, files, and
          prompts are never sent to Tekris Labs. Your use of ChatGPT is governed by{" "}
          <a href="https://openai.com/policies/privacy-policy/" rel="noopener noreferrer">
            OpenAI&apos;s Privacy Policy
          </a>
          .
        </p>
        <p>
          If a future product sends information to a service we operate, we will disclose what it
          collects and why before it is listed.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "How we use information",
    content: (
      <p>
        We use information only to respond to messages and privacy requests, operate and secure the
        website, improve our products based on your feedback, and meet legal obligations. We do not
        sell personal information, use it for advertising, or send marketing email.
      </p>
    ),
  },
  {
    id: "service-providers",
    title: "Service providers",
    content: (
      <>
        <ul>
          <li>
            <strong>Vercel</strong> hosts the website and processes request logs (
            <a href="https://vercel.com/legal/privacy-policy" rel="noopener noreferrer">
              privacy policy
            </a>
            ).
          </li>
          <li>
            <strong>FormSubmit</strong> forwards contact-form submissions to our inbox by email (
            <a href="https://formsubmit.co" rel="noopener noreferrer">
              formsubmit.co
            </a>
            ).
          </li>
          <li>
            <strong>Google (Gmail)</strong> hosts the mailboxes where messages are received (
            <a href="https://policies.google.com/privacy" rel="noopener noreferrer">
              privacy policy
            </a>
            ).
          </li>
        </ul>
        <p>
          These providers may process information in the United States and other countries under
          their own safeguards. We may also disclose information when required by law or to protect
          the safety and security of users or Tekris Labs.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "Retention",
    content: (
      <p>
        Contact messages are kept for up to 12 months after your inquiry is resolved, then deleted;
        you can ask us to delete one sooner. Hosting logs are kept by Vercel for a limited period
        under its standard settings.
      </p>
    ),
  },
  {
    id: "security",
    title: "Security",
    content: (
      <p>
        We use encrypted connections, collect only what the contact form needs, validate
        submissions, and restrict access to our inbox. No online service can be guaranteed to be
        completely secure.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    content: (
      <p>
        You can ask to access, correct, or delete personal information we hold about you, or to
        receive a copy of it. We honor these requests wherever you live, as far as we reasonably
        can, and may need to confirm that you control the email address involved. You may also have
        the right to complain to your local data protection authority. To make a request, see{" "}
        <a href="#contact">Contact</a> below.
      </p>
    ),
  },
  {
    id: "third-party-services",
    title: "Third-party services",
    content: (
      <p>
        Our website links to plugin directories and other external sites. They operate under their
        own terms and privacy policies, which Tekris Labs does not control.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    content: (
      <p>
        We update this policy when our products, providers, or legal obligations change; this page
        always reflects current practice. We will post material changes before they take effect.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <p>
        For privacy questions or requests, email{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> or{" "}
        <Link href="/contact?topic=privacy">use the contact form</Link>.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      intro={
        <p>
          What information Tekris Labs handles, why, who processes it, and the choices you have.
        </p>
      }
      sections={sections}
    />
  );
}
