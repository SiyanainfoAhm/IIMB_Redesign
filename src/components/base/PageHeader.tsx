import { Link } from "react-router-dom";
import Container from "@/components/base/Container";

interface Crumb {
  label: string;
  href: string;
}

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
}

export default function PageHeader({ eyebrow, title, description, crumbs = [] }: PageHeaderProps) {
  return (
    <section className="border-b border-background-200 bg-background-100 pb-12 pt-28 md:pb-16 lg:pt-36">
      <Container>
        {crumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-xs text-foreground-500">
            <Link to="/" className="transition-colors hover:text-accent-700">
              Home
            </Link>
            {crumbs.map((crumb) => (
              <span key={crumb.label} className="flex items-center gap-2">
                <i className="ri-arrow-right-s-line" />
                <Link to={crumb.href} className="transition-colors hover:text-accent-700">
                  {crumb.label}
                </Link>
              </span>
            ))}
          </nav>
        ) : null}

        {eyebrow ? (
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">
            <span className="h-px w-6 bg-accent-500/50" />
            {eyebrow}
          </div>
        ) : null}
        <h1 className="max-w-4xl font-heading text-3xl leading-tight text-foreground-950 md:text-5xl">{title}</h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-foreground-600 md:text-base">{description}</p>
        ) : null}
      </Container>
    </section>
  );
}