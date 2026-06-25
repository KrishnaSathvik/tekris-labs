import { SectionLabel } from "@/components/ui/Decorative";

const values = [
  {
    title: "Clean, focused product experiences",
    description:
      "Every tool is designed with intention — no clutter, no unnecessary complexity.",
  },
  {
    title: "Built for real digital workflows",
    description:
      "We solve practical problems in productivity, content, and business operations.",
  },
  {
    title: "Cloud-based and accessible anywhere",
    description:
      "Products are delivered as online web applications, available wherever you work.",
  },
  {
    title: "Designed with usability in mind",
    description:
      "Efficiency and clarity guide every interface decision we make.",
  },
];

export function WhyTekris() {
  return (
    <section id="about" className="border-t border-border">
      <div className="container-wide section-padding">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionLabel index="03" label="About" />
            <h2 className="mt-4 font-serif text-3xl tracking-tight text-charcoal md:text-4xl lg:text-5xl">
              Designed for{" "}
              <span className="italic text-terracotta">practical</span>, modern
              software experiences.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted">
              We believe good software should feel calm, capable, and
              trustworthy — tools you reach for because they genuinely make
              work easier.
            </p>
          </div>

          <div className="divide-y divide-border">
            {values.map((value, index) => (
              <div key={value.title} className="py-8 first:pt-0 last:pb-0">
                <div className="flex gap-6">
                  <span className="font-serif text-lg text-terracotta">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-charcoal">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-muted">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
