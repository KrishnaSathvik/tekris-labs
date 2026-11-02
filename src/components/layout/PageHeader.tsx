import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}

export function PageHeader({ eyebrow, title, children }: PageHeaderProps) {
  return (
    <header className="relative isolate overflow-hidden border-b border-border">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
      <div className="container-page pb-14 pt-16 md:pb-20 md:pt-24">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display mt-5 max-w-4xl">{title}</h1>
        {children ? <div className="lede mt-6 max-w-2xl space-y-4">{children}</div> : null}
      </div>
    </header>
  );
}
