import Link from "next/link";
import { ArrowIcon } from "@/components/ui/Button";
import { ProductIcon } from "@/components/products/ProductIcon";
import { CATEGORY_LABELS, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card group relative flex h-full flex-col p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-line hover:shadow-[0_12px_32px_-12px_rgb(10_10_10/0.18)] has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-accent has-[a:focus-visible]:ring-offset-2 has-[a:focus-visible]:ring-offset-background">
      <div className="flex items-start justify-between">
        <ProductIcon product={product} />
        <ArrowIcon className="h-4 w-4 text-muted transition-all group-hover:translate-x-0.5 group-hover:text-accent" />
      </div>
      <h3 className="title mt-5">
        <Link
          href={`/products/${product.slug}`}
          className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
        >
          {product.name}
        </Link>
      </h3>
      <p className="mt-1.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.12em] text-muted">
        {CATEGORY_LABELS[product.category]}
      </p>
      <p className="mt-3 text-[0.925rem] leading-relaxed text-muted">{product.summary}</p>
    </article>
  );
}
