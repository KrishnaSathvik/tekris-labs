import { SectionLabel } from "@/components/ui/Decorative";

const details = [
  {
    label: "Business type",
    value: "Software company",
  },
  {
    label: "Delivery model",
    value: "Cloud-based web applications",
  },
  {
    label: "Offering",
    value: "Subscription-based software products and digital tools",
  },
  {
    label: "Support",
    value: "Available through email contact",
  },
];

export function Credibility() {
  return (
    <section className="border-t border-border bg-ivory">
      <div className="container-wide section-padding">
        <SectionLabel index="06" label="Business" />
        <h2 className="mt-4 max-w-xl font-serif text-3xl tracking-tight text-charcoal md:text-4xl">
          A software business you can trust.
        </h2>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
          Tekris Labs develops and delivers digital software products through
          secure, cloud-based web applications with subscription-based access.
        </p>

        <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:mt-16">
          {details.map((detail) => (
            <div key={detail.label} className="bg-background p-8">
              <dt className="text-xs font-medium uppercase tracking-widest text-muted">
                {detail.label}
              </dt>
              <dd className="mt-2 font-medium text-charcoal">{detail.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
