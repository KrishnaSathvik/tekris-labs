import Link from "next/link";

const footerLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-ivory">
      <div className="container-wide section-padding !py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="font-serif text-2xl text-charcoal">Tekris Labs</p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
              Tekris Labs builds subscription-based software products and
              digital tools for productivity, document creation, content
              workflows, and business automation.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted">
              Legal &amp; Contact
            </p>
            <ul className="mt-4 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-charcoal transition-colors hover:text-terracotta"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Tekris Labs. All rights reserved.</p>
          <p>Cloud-based software products delivered online.</p>
        </div>
      </div>
    </footer>
  );
}
