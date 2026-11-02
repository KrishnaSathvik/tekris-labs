import type { ReactNode } from "react";
import type { ProductStory, StoryExcerpt } from "@/lib/product-story";

type Workflow = ProductStory["workflow"];

function Label({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-muted">
      {children}
    </p>
  );
}

function CodeExcerpt({ excerpt }: { excerpt: StoryExcerpt }) {
  return (
    <figure className="overflow-hidden rounded-xl bg-ink text-white shadow-sm">
      <figcaption className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-2.5 font-mono text-xs text-white/60">
        <span>{excerpt.label}</span>
        <span className="uppercase tracking-wider">{excerpt.language}</span>
      </figcaption>
      <pre className="overflow-x-auto p-4 font-mono text-[0.8rem] leading-relaxed">
        <code>{excerpt.content}</code>
      </pre>
    </figure>
  );
}

function DocumentExcerpt({ excerpt }: { excerpt: StoryExcerpt }) {
  return (
    <figure className="rounded-xl border border-border bg-background p-5 shadow-sm">
      <figcaption className="font-mono text-xs text-muted">{excerpt.label}</figcaption>
      <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ink">{excerpt.content}</p>
    </figure>
  );
}

function Steps({ steps }: { steps: string[] }) {
  return (
    <ol className="space-y-5">
      {steps.map((step, index) => (
        <li key={step} className="flex gap-4">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line font-mono text-xs text-ink">
            {index + 1}
          </span>
          <span className="pt-0.5 leading-relaxed text-ink">{step}</span>
        </li>
      ))}
    </ol>
  );
}

function Result({ children }: { children: ReactNode }) {
  return (
    <div className="border-l-2 border-accent pl-5">
      <Label>Expected result</Label>
      <p className="mt-2 leading-relaxed text-ink">{children}</p>
    </div>
  );
}

function TechnicalWorkflow({ workflow, name }: { workflow: Workflow; name: string }) {
  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
      <div className="min-w-0 space-y-6">
        <div>
          <Label>The problem</Label>
          <p className="mt-3 text-lg leading-relaxed text-ink">{workflow.problem}</p>
        </div>
        {workflow.input ? <CodeExcerpt excerpt={workflow.input} /> : null}
      </div>
      <div className="space-y-10">
        <div>
          <Label>How {name} approaches it</Label>
          <div className="mt-5">
            <Steps steps={workflow.steps} />
          </div>
        </div>
        <Result>{workflow.result}</Result>
      </div>
    </div>
  );
}

function PlanningWorkflow({ workflow }: { workflow: Workflow }) {
  return (
    <div>
      <p className="max-w-3xl text-lg leading-relaxed text-ink">{workflow.problem}</p>
      <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
        <div className="min-w-0">
          <Label>01 · What you share</Label>
          <div className="mt-4">
            {workflow.input ? (
              <DocumentExcerpt excerpt={workflow.input} />
            ) : (
              <p className="leading-relaxed text-muted">{workflow.problem}</p>
            )}
          </div>
        </div>
        <div>
          <Label>02 · How it works through it</Label>
          <div className="mt-4">
            <Steps steps={workflow.steps} />
          </div>
        </div>
        <div>
          <Label>03 · What you get</Label>
          <p className="mt-4 rounded-xl bg-ink p-5 leading-relaxed text-white">{workflow.result}</p>
        </div>
      </div>
    </div>
  );
}

function CreativeWorkflow({ workflow }: { workflow: Workflow }) {
  return (
    <div>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <p className="text-lg leading-relaxed text-ink">{workflow.problem}</p>
        {workflow.input ? (
          <blockquote className="border-l-2 border-line pl-5">
            <Label>{workflow.input.label}</Label>
            <p className="mt-3 whitespace-pre-line text-xl leading-relaxed tracking-[-0.01em] text-ink">
              {workflow.input.content}
            </p>
          </blockquote>
        ) : null}
      </div>
      <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {workflow.steps.map((step, index) => (
          <li key={step} className="border-t border-ink pt-5">
            <span className="font-display text-4xl font-semibold tracking-[-0.04em] text-gradient">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="mt-3 leading-relaxed text-ink">{step}</p>
          </li>
        ))}
      </ol>
      <div className="mt-12 max-w-3xl">
        <Result>{workflow.result}</Result>
      </div>
    </div>
  );
}

export function ProductWorkflow({ story, name }: { story: ProductStory; name: string }) {
  switch (story.style) {
    case "technical":
      return <TechnicalWorkflow workflow={story.workflow} name={name} />;
    case "planning":
      return <PlanningWorkflow workflow={story.workflow} />;
    case "creative":
      return <CreativeWorkflow workflow={story.workflow} />;
    default: {
      const unhandled: never = story.style;
      throw new Error(`Unhandled story style: ${unhandled}`);
    }
  }
}
