import { type ReactNode } from "react";

interface SectionLabelProps {
  index: string;
  total?: string;
  label: string;
  className?: string;
}

export function SectionLabel({
  index,
  total = "06",
  label,
  className = "",
}: SectionLabelProps) {
  return (
    <p
      className={`text-xs font-medium uppercase tracking-[0.25em] text-muted ${className}`}
    >
      <span className="text-terracotta">{index}</span>
      <span className="mx-2 text-border">/</span>
      <span>{total}</span>
      <span className="mx-3 text-border">—</span>
      <span>{label}</span>
    </p>
  );
}

interface PixelCornersProps {
  colors?: string[];
  className?: string;
}

export function PixelCorners({
  colors = ["bg-terracotta", "bg-dusty-blue", "bg-muted-yellow", "bg-stone"],
  className = "",
}: PixelCornersProps) {
  const positions = [
    "top-0 left-0",
    "top-0 right-0 rotate-90",
    "bottom-0 right-0 rotate-180",
    "bottom-0 left-0 -rotate-90",
  ];

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      {positions.map((position, i) => (
        <div key={position} className={`absolute ${position} flex gap-0.5`}>
          <div className={`h-2 w-2 ${colors[i % colors.length]}`} />
          <div className={`h-2 w-2 ${colors[(i + 1) % colors.length]}`} />
          <div
            className={`h-2 w-2 ${colors[(i + 2) % colors.length]} -translate-y-2`}
          />
        </div>
      ))}
    </div>
  );
}

export function PageChrome({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <div
        className="pointer-events-none fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
        aria-hidden
      >
        <p
          className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted/60"
          style={{ writingMode: "vertical-rl" }}
        >
          Tekris Labs / Software Studio
        </p>
      </div>
      {children}
    </div>
  );
}
