import type { ReactNode } from "react";

export interface LegalSection {
  id: string;
  title: string;
  content: ReactNode;
}

interface LegalDocumentProps {
  title: string;
  intro: ReactNode;
  sections: LegalSection[];
}

export function LegalDocument({ title, intro, sections }: LegalDocumentProps) {
  return (
    <>
      <header className="relative isolate overflow-hidden border-b border-border">
        <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
        <div className="container-page pb-14 pt-16 md:pb-20 md:pt-24">
          <p className="eyebrow">Legal</p>
          <h1 className="display mt-5">{title}</h1>
          <div className="prose-doc mt-8 max-w-[44rem] text-lg">{intro}</div>
        </div>
      </header>
      <div className="container-page pb-24">
        <article className="prose-doc mt-12 max-w-[44rem] md:mt-16">
          {sections.map((section, index) => (
            <section key={section.id} aria-labelledby={section.id}>
              <h2 id={section.id}>
                {index + 1}. {section.title}
              </h2>
              {section.content}
            </section>
          ))}
        </article>
      </div>
    </>
  );
}
