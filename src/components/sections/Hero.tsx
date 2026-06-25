import { Button, ArrowIcon } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/Decorative";

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
      {/* Cardinal-style sand outer frame */}
      <div className="rounded-2xl bg-sand p-4 md:p-6 lg:p-8">
        <div className="relative aspect-[5/4] overflow-hidden rounded-xl bg-ivory md:aspect-[16/11]">
          <div className="absolute inset-0 grid-canvas opacity-50" />

          <p className="absolute left-6 top-6 font-serif text-sm text-charcoal md:left-8 md:top-8">
            Tekris Labs
          </p>

          {/* Floating icon tiles */}
          <div className="absolute left-[10%] top-[18%] flex h-14 w-14 items-center justify-center rounded-xl bg-terracotta md:h-16 md:w-16">
            <div className="icon-tile h-9 w-9 bg-terracotta/30">
              <svg viewBox="0 0 24 24" className="line-icon h-5 w-5">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </div>
          </div>

          <div className="absolute right-[15%] top-[12%] flex h-12 w-12 items-center justify-center rounded-lg bg-dusty-blue md:h-14 md:w-14">
            <div className="icon-tile h-8 w-8 bg-dusty-blue/30">
              <svg viewBox="0 0 24 24" className="line-icon h-4 w-4">
                <circle cx="12" cy="12" r="8" />
                <path d="M12 8v4l3 2" />
              </svg>
            </div>
          </div>

          <div className="absolute left-[28%] top-[38%] flex h-11 w-11 items-center justify-center rounded-lg bg-muted-yellow md:h-12 md:w-12">
            <div className="icon-tile h-7 w-7 bg-muted-yellow/40">
              <svg viewBox="0 0 24 24" className="line-icon h-4 w-4">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <div className="absolute right-[8%] top-[42%] flex h-12 w-12 items-center justify-center rounded-lg bg-stone md:h-14 md:w-14">
            <div className="icon-tile h-8 w-8 bg-stone/50">
              <svg viewBox="0 0 24 24" className="line-icon h-4 w-4">
                <path d="M4 18l4-8 4 4 4-6 4 10" />
              </svg>
            </div>
          </div>

          {/* Overlapping black tile */}
          <div className="absolute -bottom-4 -left-4 flex h-24 w-24 items-center justify-center rounded-xl bg-charcoal md:-bottom-6 md:-left-6 md:h-32 md:w-32">
            <svg viewBox="0 0 48 48" className="h-12 w-12 text-ivory md:h-14 md:w-14" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M8 28c8-12 24-12 32 0" strokeLinecap="round" />
              <path d="M12 24c6-8 18-8 24 0" strokeLinecap="round" />
              <path d="M20 20l8-6 8 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <p className="absolute bottom-8 right-6 max-w-[200px] font-serif text-2xl leading-tight text-charcoal md:bottom-10 md:right-10 md:text-3xl lg:text-4xl">
            Software for modern work.
          </p>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 md:pt-24">
      <div className="container-wide px-6 pb-12 md:px-10 md:pb-16 lg:px-16">
        <SectionLabel index="01" label="Home" className="mb-6" />

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <h1 className="font-serif text-4xl leading-[1.08] tracking-tight text-charcoal md:text-5xl lg:text-[3.5rem]">
              Build smarter software for{" "}
              <span className="italic text-terracotta">modern</span> work.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg">
              Tekris Labs builds subscription-based cloud software and digital
              tools for productivity, document creation, content workflows, and
              business automation.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#capabilities" variant="accent" size="lg">
                Learn more
                <ArrowIcon />
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Contact us
              </Button>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <HeroVisual />
          </div>
        </div>
      </div>

      <div className="container-wide hidden px-6 pb-8 md:px-10 lg:flex lg:px-16">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted">
          <span className="h-2 w-2 bg-terracotta" />
          <span>Scroll to explore</span>
          <span className="h-px w-12 bg-border" />
        </div>
      </div>
    </section>
  );
}
