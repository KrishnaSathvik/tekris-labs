import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductCatalog } from "@/components/products/ProductCatalog";
import { getCategoriesInUse, products } from "@/lib/products";
import { SHARE_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products & Tools",
  description:
    "Explore software products, development tools, and creative utilities from Tekris Labs.",
  alternates: { canonical: "/products" },
  openGraph: { url: "/products", images: [SHARE_IMAGE] },
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title={
          <>
            Products <span className="text-gradient">&amp; tools</span>
          </>
        }
      >
        <p>Software, tools, and digital products built for practical use.</p>
      </PageHeader>

      <section aria-label="Product catalog" className="container-page pb-20 pt-10 md:pt-12">
        <ProductCatalog products={products} categories={getCategoriesInUse()} />
        <p className="mt-14 text-sm text-muted">
          Need help with a product?{" "}
          <Link href="/contact?topic=support" className="text-link">
            Contact support
          </Link>
          .
        </p>
      </section>
    </>
  );
}
