import Link from "next/link";
import { LogoMark } from "@/components/layout/LogoMark";
import { SITE_NAME } from "@/lib/site";

const links = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="container-page flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="flex items-center gap-2.5 text-[0.95rem] font-semibold tracking-[-0.02em] text-ink">
            <LogoMark className="h-5 w-auto" />
            {SITE_NAME}
          </p>
          <p className="mt-3 text-xs text-muted">{SITE_NAME}. All rights reserved.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-block py-1.5 text-sm text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
