import type { Metadata } from "next";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";
import { SHARE_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "About Tekris Labs" },
  description: "What Tekris Labs stands for and how it approaches building software.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: "About Tekris Labs", images: [SHARE_IMAGE] },
};

const beliefs = [
  {
    title: "Purpose over complexity",
    body: "Every product should solve a meaningful problem. We focus on useful functionality rather than adding complexity for its own sake.",
  },
  {
    title: "Design with intention",
    body: "Good software should feel natural to use. We prioritize clarity, consistency, accessibility, and thoughtful interactions.",
  },
  {
    title: "Engineering that lasts",
    body: "We value maintainable architecture, reliable systems, performance, and careful testing.",
  },
  {
    title: "Continuous improvement",
    body: "Building software is an iterative process. We refine products as needs evolve and new opportunities emerge.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Tekris Labs"
        title={
          <>
            Building software that makes a <span className="text-gradient">difference.</span>
          </>
        }
      >
        <p>
          Tekris Labs builds software products, developer tools, and intelligent applications. We
          care about software that is useful, reliable, and easy to work with.
        </p>
      </PageHeader>

      <section className="section pb-16 md:pb-20">
        <div className="container-page">
          <p className="eyebrow">What we believe</p>
          <h2 className="heading mt-4">How we approach our work</h2>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
            {beliefs.map((belief, index) => (
              <li key={belief.title} className="bg-background p-8 md:p-10">
                <p aria-hidden className="font-mono text-xs font-medium text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="title mt-4 text-xl">{belief.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-muted">{belief.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page pb-24">
        <div className="flex flex-col items-start gap-5 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted">Explore the products and tools created by Tekris Labs.</p>
          <Button href="/products" variant="primary">
            Explore products
            <ArrowIcon />
          </Button>
        </div>
      </section>
    </>
  );
}
