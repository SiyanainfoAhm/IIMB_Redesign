import type { ReactNode } from "react";
import Container from "@/components/base/Container";

interface ExampleFrameProps {
  index: string;
  type: string;
  title: string;
  description: string;
  primitives: string[];
  tone?: "plain" | "tint";
  children: ReactNode;
}

export default function ExampleFrame({
  index,
  type,
  title,
  description,
  primitives,
  tone = "plain",
  children,
}: ExampleFrameProps) {
  return (
    <section className={tone === "tint" ? "bg-background-100 py-16 md:py-24" : "bg-background-50 py-16 md:py-24"}>
      <Container>
        <div className="flex flex-col gap-6 border-b border-background-200 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-start gap-5">
            <span className="font-heading text-4xl leading-none text-accent-500 md:text-5xl">{index}</span>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-secondary-900">
                <i className="ri-shapes-line text-sm" />
                {type}
              </span>
              <h2 className="mt-3 max-w-2xl font-heading text-2xl leading-tight text-foreground-950 md:text-3xl">
                {title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground-600">{description}</p>
            </div>
          </div>
          <div className="shrink-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground-500">Built from</p>
            <div className="mt-2 flex max-w-sm flex-wrap gap-1.5">
              {primitives.map((primitive) => (
                <span
                  key={primitive}
                  className="rounded-full border border-background-300 px-2.5 py-1 text-[11px] text-foreground-600"
                >
                  {primitive}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 md:mt-12">{children}</div>
      </Container>
    </section>
  );
}