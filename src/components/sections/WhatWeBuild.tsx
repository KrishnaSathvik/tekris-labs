import { SectionLabel } from "@/components/ui/Decorative";

const categories = [
  {
    title: "Productivity Tools",
    description:
      "Software that helps users organize tasks, manage workflows, and improve day-to-day efficiency.",
    bg: "bg-terracotta",
    text: "text-ivory",
    descText: "text-ivory/80",
    gridClass: "md:col-span-1 md:row-span-2",
    minH: "min-h-[280px] md:min-h-[420px]",
    icon: (
      <div className="grid grid-cols-3 gap-1.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${i === 4 ? "ring-2 ring-ivory ring-offset-1 ring-offset-terracotta bg-transparent" : "bg-charcoal/80"}`}
          />
        ))}
      </div>
    ),
  },
  {
    title: "Document Creation",
    description:
      "Tools for generating, editing, formatting, and managing digital documents and written content.",
    bg: "bg-stone",
    text: "text-charcoal",
    descText: "text-charcoal/70",
    gridClass: "md:col-span-1",
    minH: "min-h-[200px]",
    icon: (
      <svg viewBox="0 0 24 24" className="line-icon h-8 w-8">
        <path d="M6 4h9l3 3v13H6z" />
        <path d="M15 4v3h3M8 12h8M8 16h5" />
      </svg>
    ),
  },
  {
    title: "Content Workflows",
    description:
      "Products that streamline publishing, content operations, and structured digital workflows.",
    bg: "bg-dusty-blue",
    text: "text-charcoal",
    descText: "text-charcoal/70",
    gridClass: "md:col-span-1 md:row-span-2",
    minH: "min-h-[280px] md:min-h-[420px]",
    icon: (
      <svg viewBox="0 0 24 24" className="line-icon h-8 w-8">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </svg>
    ),
  },
  {
    title: "Business Automation",
    description:
      "Digital tools that reduce manual work and support business operations through automation.",
    bg: "bg-charcoal",
    text: "text-ivory",
    descText: "text-ivory/75",
    gridClass: "md:col-span-1",
    minH: "min-h-[200px]",
    icon: (
      <svg viewBox="0 0 48 48" className="h-10 w-10 text-ivory" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M8 28c8-12 24-12 32 0" strokeLinecap="round" />
        <path d="M12 24c6-8 18-8 24 0" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function WhatWeBuild() {
  return (
    <section id="capabilities" className="border-t border-border bg-ivory">
      <div className="container-wide section-padding">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionLabel index="02" label="Capabilities" />
            <h2 className="mt-4 font-serif text-3xl tracking-tight text-charcoal md:text-4xl lg:text-5xl">
              What we{" "}
              <span className="italic text-terracotta">build</span> with intent.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              We develop focused digital tools across core categories — each
              designed for clarity, reliability, and real-world use.
            </p>
          </div>

          {/* Cardinal bento grid */}
          <div className="grid gap-4 md:grid-cols-2 md:grid-rows-[auto_auto_auto]">
            {categories.map((category) => (
              <article
                key={category.title}
                className={`relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 md:p-8 ${category.bg} ${category.text} ${category.gridClass} ${category.minH}`}
              >
                {category.icon && (
                  <div className="mb-6">{category.icon}</div>
                )}
                <div>
                  <h3 className="font-serif text-xl leading-tight md:text-2xl">
                    {category.title}
                  </h3>
                  <p className={`mt-3 text-base leading-relaxed ${category.descText}`}>
                    {category.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
