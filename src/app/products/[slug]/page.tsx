import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button, ChatGPTIcon, ExternalIcon } from "@/components/ui/Button";
import { ProductIcon } from "@/components/products/ProductIcon";
import { ProductWorkflow } from "@/components/products/ProductWorkflow";
import { getProductStory } from "@/lib/product-stories";
import { CATEGORY_LABELS, getProduct, products, type Product } from "@/lib/products";
import { SHARE_IMAGE } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(props: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) return {};
  const path = `/products/${product.slug}`;
  return {
    title: product.name,
    description: product.summary,
    alternates: { canonical: path },
    openGraph: {
      url: path,
      title: `${product.name} — Tekris Labs`,
      description: product.summary,
      images: [SHARE_IMAGE],
    },
  };
}

function actionLabel(product: Product) {
  switch (product.platform) {
    case "chatgpt":
      return "Open in ChatGPT";
    case "web":
      return "Open website";
    default: {
      const unhandled: never = product.platform;
      throw new Error(`Unhandled platform: ${unhandled}`);
    }
  }
}

function StorySection({
  id,
  index,
  label,
  title,
  children,
}: {
  id: string;
  index: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="py-16 md:py-24">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted">
        <span className="text-accent">{index}</span> — {label}
      </p>
      <h2 id={id} className="heading mt-4 max-w-3xl">
        {title}
      </h2>
      <div className="mt-10 md:mt-12">{children}</div>
    </section>
  );
}

export default async function ProductPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();

  const story = getProductStory(product.slug);

  return (
    <article>
      <header className="relative isolate overflow-hidden border-b border-border">
        <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
        <div className="container-page pt-6 md:pt-8">
          <Link
            href="/products"
            className="-ml-2 inline-flex h-10 items-center gap-2 rounded-lg px-2 text-sm font-medium text-muted transition-colors hover:bg-subtle hover:text-ink"
          >
            <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4" fill="none">
              <path
                d="M2.5 4h11M2.5 8h11M2.5 12h11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            All products
          </Link>
        </div>
        <div className="container-page flex flex-col gap-8 pb-16 pt-8 md:flex-row md:items-start md:pb-24 md:pt-12">
          <ProductIcon product={product} size={80} className="rounded-2xl shadow-sm" />
          <div className="max-w-3xl">
            <p className="eyebrow">
              {CATEGORY_LABELS[product.category]} / {story.subject}
            </p>
            <h1 className="display mt-4">{product.name}</h1>
            <p className="mt-5 font-display text-2xl font-medium leading-snug tracking-[-0.025em] text-ink md:text-3xl">
              {story.tagline}
            </p>
            <p className="lede mt-5">{story.intro}</p>
            {product.listingUrl ? (
              <div className="mt-8">
                <Button href={product.listingUrl} variant="primary" size="lg">
                  {product.platform === "chatgpt" ? (
                    <ChatGPTIcon className="h-[1.125rem] w-[1.125rem]" />
                  ) : null}
                  {actionLabel(product)}
                  <ExternalIcon />
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <div className="container-page divide-y divide-border">
        <StorySection
          id="the-product"
          index="01"
          label="The product"
          title={`What is ${product.name}?`}
        >
          <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-muted">
            {story.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </StorySection>

        <StorySection
          id="in-practice"
          index="02"
          label="Real workflow"
          title={story.workflow.title}
        >
          <ProductWorkflow story={story} name={product.name} />
          <p className="mt-12 text-sm text-muted">
            Illustrative workflow. It doesn’t depict a real session, system, or result.
          </p>
        </StorySection>

        <StorySection id="expertise" index="03" label="Areas of expertise" title="Where it helps">
          <ul className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {story.expertise.map((area) => (
              <li key={area.title} className="border-t border-border pt-6">
                <h3 className="title">{area.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{area.description}</p>
              </li>
            ))}
          </ul>
        </StorySection>

        <StorySection
          id="working-with"
          index="04"
          label={`Working with ${product.name}`}
          title="What to provide and what to expect"
        >
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h3 className="title">Share</h3>
              <ul className="mt-4 space-y-3">
                {story.working.provide.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-ink">
                    <span
                      aria-hidden
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="title">Expect</h3>
              <ul className="mt-4 space-y-3">
                {story.working.expect.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-ink">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-12 max-w-3xl border-t border-border pt-6 leading-relaxed text-muted">
            {story.working.limits}
          </p>
        </StorySection>
      </div>
    </article>
  );
}
