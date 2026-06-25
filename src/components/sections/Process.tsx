import { SectionLabel } from "@/components/ui/Decorative";

const steps = [
  {
    number: "01",
    title: "Identify real workflow needs",
    description:
      "We focus on useful digital problems in productivity, content, and business operations.",
  },
  {
    number: "02",
    title: "Build focused software products",
    description:
      "We create streamlined tools designed for clarity, speed, and ease of use.",
  },
  {
    number: "03",
    title: "Deliver through the cloud",
    description:
      "Our products are delivered as online, subscription-based web applications.",
  },
  {
    number: "04",
    title: "Improve continuously",
    description:
      "We refine and expand based on product goals and evolving user needs.",
  },
];

export function Process() {
  return (
    <section id="process" className="border-t border-border bg-ivory">
      <div className="container-wide section-padding">
        <SectionLabel index="04" label="Process" />
        <h2 className="mt-4 max-w-xl font-serif text-3xl tracking-tight text-charcoal md:text-4xl lg:text-5xl">
          From problem to product, with care.
        </h2>

        {/* Mosaic-style staggered numbered blocks */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-20">
          {steps.map((step, index) => (
            <article
              key={step.number}
              className={`rounded-2xl border border-border bg-background p-8 md:p-10 ${
                index % 2 === 1 ? "md:mt-12" : ""
              }`}
            >
              <span className="font-serif text-sm text-terracotta">
                {step.number}
              </span>
              <h3 className="mt-4 font-serif text-xl text-charcoal md:text-2xl">
                {step.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
