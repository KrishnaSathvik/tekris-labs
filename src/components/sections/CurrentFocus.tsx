import { PixelCorners, SectionLabel } from "@/components/ui/Decorative";

const focusAreas = [
  {
    title: "Productivity",
    description:
      "Tools that help users organize work, manage tasks, and improve day-to-day efficiency.",
    tileBg: "bg-muted-yellow",
    icon: (
      <svg viewBox="0 0 24 24" className="line-icon h-7 w-7">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 9h8M8 13h5" />
      </svg>
    ),
  },
  {
    title: "Documents & Content",
    description:
      "Software for creating, formatting, and managing digital content and documents.",
    tileBg: "bg-terracotta",
    icon: (
      <svg viewBox="0 0 24 24" className="line-icon h-7 w-7">
        <path d="M6 4h9l3 3v13H6z" />
        <path d="M15 4v3h3M8 12h8" />
      </svg>
    ),
  },
  {
    title: "Workflow Automation",
    description:
      "Digital tools that reduce repetitive manual work and support business operations.",
    tileBg: "bg-dusty-blue",
    icon: (
      <svg viewBox="0 0 24 24" className="line-icon h-7 w-7">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      </svg>
    ),
  },
];

export function CurrentFocus() {
  return (
    <section className="border-t border-border">
      <div className="container-wide section-padding">
        <div className="relative mx-auto max-w-3xl rounded-3xl border border-border bg-ivory px-8 py-14 md:px-16 md:py-20">
          <PixelCorners />
          <div className="relative text-center">
            <SectionLabel index="05" label="Focus" className="text-center" />
            <h2 className="mt-4 font-serif text-3xl tracking-tight text-charcoal md:text-4xl">
              Focused software products, built one workflow at a time.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted">
              Tekris Labs is developing practical cloud-based tools for
              productivity, document creation, content workflows, and business
              automation. Each product is designed to solve a clear digital
              workflow problem with a simple, reliable user experience.
            </p>
          </div>
        </div>

        {/* Cardinal 3-column feature cards */}
        <div className="mt-16 grid gap-10 md:grid-cols-3 lg:mt-20">
          {focusAreas.map((area) => (
            <article key={area.title}>
              <div
                className={`flex aspect-square max-h-56 w-full items-center justify-center rounded-2xl ${area.tileBg}`}
              >
                <div className="icon-tile h-20 w-20 bg-ivory/30">
                  {area.icon}
                </div>
              </div>
              <h3 className="mt-6 font-serif text-xl text-charcoal md:text-2xl">
                {area.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {area.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
