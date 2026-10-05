import { Link } from "react-router-dom";
import Container from "@/components/base/Container";

export default function CtaBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-foreground-950">
      <img
        src="https://readdy.ai/api/search-image?query=Students%20walking%20together%20along%20a%20shaded%20colonnade%20of%20a%20green%20campus%20in%20warm%20afternoon%20light%2C%20optimistic%20and%20purposeful%20mood%2C%20cinematic%20editorial%20photography%2C%20deep%20green%20and%20amber%20tones&width=1920&height=900&seq=iimb-redesign-cta&orientation=landscape"
        alt="Students walking along a campus colonnade at IIM Bangalore"
        title="Begin your IIMB journey"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground-950/90 via-foreground-950/70 to-foreground-950/50" />

      <Container className="relative z-10 py-20 md:py-28">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-300">
            Admissions 2027
          </span>
          <h2 className="mt-4 font-heading text-3xl leading-tight text-background-50 md:text-5xl">
            Begin your IIMB journey
          </h2>
          <p className="mt-5 text-base leading-relaxed text-background-100/90 md:text-lg">
            Find your programme, understand the process, and take the next step toward a career — and a
            community — that lasts a lifetime.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/admissions"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-accent-600 px-6 py-3.5 text-sm font-semibold text-background-50 transition-colors hover:bg-accent-700"
            >
              How to apply
              <i className="ri-arrow-right-line text-base" />
            </Link>
            <Link
              to="/programmes"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-background-50/40 bg-background-50/5 px-6 py-3.5 text-sm font-semibold text-background-50 transition-colors hover:bg-background-50/15"
            >
              Compare programmes
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}