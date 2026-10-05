import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "default" | "light";
  action?: ReactNode;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  action,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const titleColor = tone === "light" ? "text-background-50" : "text-foreground-950";
  const descColor = tone === "light" ? "text-background-200" : "text-foreground-600";

  return (
    <div
      className={`flex flex-col gap-4 ${isCenter ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"}`}
    >
      <div className={`max-w-2xl ${isCenter ? "mx-auto" : ""}`}>
        {eyebrow ? (
          <div
            className={`mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] ${isCenter ? "justify-center" : ""} ${tone === "light" ? "text-secondary-300" : "text-accent-600"}`}
          >
            <span className={`h-px w-6 ${tone === "light" ? "bg-secondary-300/60" : "bg-accent-500/50"}`} />
            {eyebrow}
          </div>
        ) : null}
        <h2 className={`font-heading text-2xl leading-tight md:text-4xl ${titleColor}`}>{title}</h2>
        {description ? (
          <p className={`mt-4 text-sm leading-relaxed md:text-base ${descColor}`}>{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}