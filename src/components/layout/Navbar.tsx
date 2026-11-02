import Link from "next/link";
import { LogoMark } from "@/components/layout/LogoMark";
import { SITE_NAME } from "@/lib/site";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <div className="container-page flex h-16 items-center">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[0.95rem] font-semibold tracking-[-0.02em] text-ink"
        >
          <LogoMark className="h-5 w-auto" />
          {SITE_NAME}
        </Link>
      </div>
    </header>
  );
}
