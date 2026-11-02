import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { EMPTY_VALUES, isInquiryType, type ContactValues } from "@/lib/contact";
import { getProduct, products } from "@/lib/products";
import { HELLO_EMAIL, SUPPORT_EMAIL } from "@/lib/site";

export const maxDuration = 60;

export const metadata: Metadata = {
  title: "Contact & Support",
  description:
    "Contact Tekris Labs for product support, privacy questions, feedback, and general inquiries.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

const options = [
  { need: "Product support or technical issues", how: "Use the form" },
  { need: "Privacy requests", how: "Choose Privacy inquiry" },
  { need: "General or business inquiries", how: "Choose Business or general inquiry" },
];

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ContactPage(props: PageProps<"/contact">) {
  const params = await props.searchParams;
  const requestedTopic = first(params.topic) ?? "";
  const requestedProduct = first(params.product) ?? "";
  const product = getProduct(requestedProduct);

  const initialValues: ContactValues = {
    ...EMPTY_VALUES,
    topic: isInquiryType(requestedTopic) ? requestedTopic : EMPTY_VALUES.topic,
    product: product?.slug ?? "",
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact & Support"
        title={
          <>
            How can we <span className="text-gradient">help?</span>
          </>
        }
      >
        <p>Send us a message about a product, a privacy request, or anything else.</p>
      </PageHeader>

      <div className="container-page py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <ContactForm
            initialValues={initialValues}
            products={products.map(({ slug, name }) => ({ slug, name }))}
          />

          <aside className="self-start rounded-2xl border border-border p-6">
            <h2 className="title">Contact options</h2>
            <dl className="mt-4 space-y-3 text-sm">
              {options.map((option) => (
                <div key={option.need}>
                  <dt className="font-medium text-ink">{option.need}</dt>
                  <dd className="text-muted">{option.how}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 border-t border-border pt-5 text-sm">
              <p className="font-medium text-ink">Email</p>
              <ul className="mt-1">
                <li>
                  <a href={`mailto:${SUPPORT_EMAIL}`} className="text-link inline-block py-1">
                    {SUPPORT_EMAIL}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${HELLO_EMAIL}`} className="text-link inline-block py-1">
                    {HELLO_EMAIL}
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
