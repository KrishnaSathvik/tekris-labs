import Image from "next/image";
import type { Product } from "@/lib/products";

interface ProductIconProps {
  product: Pick<Product, "icon" | "name">;
  size?: number;
  className?: string;
}

export function ProductIcon({ product, size = 48, className = "" }: ProductIconProps) {
  return (
    <Image
      src={product.icon}
      alt=""
      width={size}
      height={size}
      unoptimized={product.icon.endsWith(".svg")}
      className={`shrink-0 rounded-xl border border-border bg-background object-cover ${className}`}
    />
  );
}
