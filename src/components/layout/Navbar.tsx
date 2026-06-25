"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/80 bg-background/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10 lg:px-16">
        <Link
          href="/"
          className="font-serif text-xl tracking-tight text-charcoal transition-colors hover:text-terracotta"
        >
          Tekris Labs
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-charcoal"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-terracotta" aria-hidden />
          <Button href="/contact" variant="ghost" size="sm" className="!px-0">
            Get in touch
          </Button>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span
            className={`block h-px w-6 bg-charcoal transition-transform duration-200 ${
              mobileOpen ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-charcoal transition-opacity duration-200 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-background transition-opacity duration-300 md:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8 pt-16">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-serif text-3xl text-charcoal"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button
            href="/contact"
            variant="accent"
            size="lg"
            onClick={() => setMobileOpen(false)}
          >
            Get in touch
          </Button>
        </div>
      </div>
    </header>
  );
}
