import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import CompareBar from "@/components/feature/CompareBar";
import Container from "@/components/base/Container";
import PageHeader from "@/components/base/PageHeader";
import ProgrammeDialog from "@/components/feature/ProgrammeDialog";
import type { ProgrammeDetail } from "@/components/feature/ProgrammeDialog";
import { comparisonRows, programmes, programmeCategories } from "@/mocks/programmes";
import { useCompare } from "@/context/CompareContext";
import { downloadDeadlineIcs } from "@/utils/calendar";

const filters = [{ id: "all", label: "All programmes" }, ...programmeCategories];

const admissionSteps = [
  {
    title: "Check eligibility",
    text: "Review the academic and work-experience requirements for each programme.",
  },
  {
    title: "Prepare your application",
    text: "Gather transcripts, test scores, essays and recommendations as required.",
  },
  {
    title: "Submit before the deadline",
    text: "Apply through the online portal and track your application status.",
  },
  {
    title: "Interview & decision",
    text: "Shortlisted candidates are invited to interview before final offers are made.",
  },
];

export default function ProgrammesPage() {
  const [active, setActive] = useState("all");
  const [activeProgramme, setActiveProgramme] = useState<ProgrammeDetail | null>(null);
  const [toast, setToast] = useState("");
  const { selected, toggle, isFull } = useCompare();
  const visible = active === "all" ? programmes : programmes.filter((item) => item.category === active);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 3600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const handleCalendar = (programme: ProgrammeDetail) => {
    if (!programme.deadlineIso) return;
    downloadDeadlineIcs({
      id: programme.id,
      title: `${programme.name} — application deadline`,
      isoDate: programme.deadlineIso,
      description: `${programme.deadline}. ${programme.name} at IIM Bangalore.`,
    });
    setToast(`${programme.shortName} application deadline added to your calendar`);
  };

  return (
    <div className="min-h-screen bg-background-50">
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Programmes"
          title="Programmes at IIM Bangalore"
          description="Whether you are launching a career, accelerating it, or pursuing research, there is a programme designed for the next step you want to take. Filter, explore and compare them here."
          crumbs={[{ label: "Programmes", href: "/programmes" }]}
        />

        <section className="py-12 md:py-16">
          <Container>
            <div className="flex flex-wrap items-center gap-1 rounded-full border border-background-300 bg-background-100 px-1 py-1">
              {filters.map((filter) => {
                const isActive = filter.id === active;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setActive(filter.id)}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary-700 text-background-50"
                        : "text-foreground-600 hover:bg-background-50 hover:text-foreground-900"
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-5 text-sm text-foreground-500">
              Showing <strong className="font-semibold text-foreground-900">{visible.length}</strong> programme
              {visible.length === 1 ? "" : "s"}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((item) => (
                <article
                  key={item.id}
                  className="group flex flex-col overflow-hidden rounded-lg border border-background-200 bg-background-50"
                >
                  <div className="group/img relative h-44 w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={`${item.name} at IIM Bangalore`}
                      title={`${item.name} — IIMB programme`}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-background-50/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent-700">
                      {item.shortName}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveProgramme(item)}
                      aria-label={`View details for ${item.name}`}
                      className="absolute inset-0 flex cursor-pointer items-center justify-center bg-foreground-950/0 transition-colors group-hover/img:bg-foreground-950/45"
                    >
                      <span className="inline-flex items-center gap-2 rounded-md bg-background-50/95 px-4 py-2 text-sm font-semibold text-foreground-900 opacity-0 transition-opacity group-hover/img:opacity-100">
                        <i className="ri-eye-line" />
                        View details
                      </span>
                    </button>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="font-heading text-lg leading-snug text-foreground-950">{item.name}</h2>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-foreground-600">
                      <span className="flex items-center gap-1.5">
                        <i className="ri-time-line" />
                        {item.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <i className="ri-building-2-line" />
                        {item.format}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <i className="ri-group-line" />
                        {item.intake} seats
                      </span>
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground-600">{item.description}</p>
                    <div className="mt-4 border-t border-background-200 pt-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-medium text-accent-700">{item.deadline}</span>
                        <div className="flex shrink-0 items-center gap-2">
                          {item.deadlineIso ? (
                            <button
                              type="button"
                              onClick={() => handleCalendar(item)}
                              title="Add the application deadline to your calendar"
                              aria-label={`Add ${item.name} application deadline to your calendar`}
                              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-background-300 text-foreground-700 transition-colors hover:border-primary-500 hover:text-primary-700"
                            >
                              <i className="ri-calendar-line text-base" />
                            </button>
                          ) : null}
                          <button
                            type="button"
                            onClick={() => setActiveProgramme(item)}
                            className="inline-flex shrink-0 cursor-pointer items-center gap-1 whitespace-nowrap text-sm font-semibold text-foreground-900 transition-colors hover:text-accent-700"
                          >
                            Details
                            <i className="ri-arrow-right-line" />
                          </button>
                        </div>
                      </div>
                      {(() => {
                        const isSelected = selected.includes(item.id);
                        const disabled = !isSelected && isFull;
                        return (
                          <>
                            <button
                              type="button"
                              onClick={() => toggle(item.id)}
                              disabled={disabled}
                              className={`mt-3 inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 py-2.5 text-sm font-semibold transition-colors ${
                                isSelected
                                  ? "border border-primary-300 bg-primary-100/60 text-primary-700 hover:bg-background-100"
                                  : disabled
                                    ? "cursor-not-allowed border border-background-200 bg-background-100 text-foreground-400"
                                    : "border border-background-300 text-foreground-900 hover:border-primary-500 hover:text-primary-700"
                              }`}
                            >
                              <i
                                className={
                                  isSelected ? "ri-bookmark-3-fill text-base" : "ri-bookmark-3-line text-base"
                                }
                              />
                              {isSelected ? "Saved to shortlist" : disabled ? "Shortlist full" : "Save to shortlist"}
                            </button>
                            {!isSelected && !disabled ? (
                              <p className="mt-2 flex items-center gap-1.5 text-[11px] text-foreground-500">
                                <i className="ri-scales-3-line" />
                                Saved programmes appear in the compare bar below
                              </p>
                            ) : null}
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-y border-background-200 bg-background-100 py-14 md:py-20">
          <Container>
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-heading text-2xl text-foreground-950 md:text-3xl">Compare programmes</h2>
                <p className="mt-3 max-w-xl text-sm text-foreground-600">
                  A quick side-by-side view of duration, format, level and intake so you can decide with confidence.
                  Build your own shortlist to compare up to three programmes in detail.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/compare-all"
                  className="inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-md border border-background-300 px-5 py-3 text-sm font-semibold text-foreground-900 transition-colors hover:border-primary-500 hover:text-primary-700"
                >
                  <i className="ri-bar-chart-grouped-line text-base" />
                  Compare all programmes
                </Link>
                <Link
                  to="/compare"
                  className="inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-md bg-primary-700 px-5 py-3 text-sm font-semibold text-background-50 transition-colors hover:bg-primary-800"
                >
                  <i className="ri-scales-3-line text-base" />
                  Build your shortlist
                </Link>
              </div>
            </div>

            <div className="mt-8 overflow-x-auto rounded-lg border border-background-200 bg-background-50">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-background-200 bg-background-100 text-xs uppercase tracking-wide text-foreground-500">
                    <th className="px-5 py-4 font-semibold">Programme</th>
                    <th className="px-5 py-4 font-semibold">Duration</th>
                    <th className="px-5 py-4 font-semibold">Format</th>
                    <th className="px-5 py-4 font-semibold">Level</th>
                    <th className="px-5 py-4 font-semibold">Intake</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.id} className="border-b border-background-200 last:border-0">
                      <td className="px-5 py-4 font-medium text-foreground-900">{row.name}</td>
                      <td className="px-5 py-4 text-foreground-600">{row.duration}</td>
                      <td className="px-5 py-4 text-foreground-600">{row.format}</td>
                      <td className="px-5 py-4 text-foreground-600">{row.level}</td>
                      <td className="px-5 py-4 text-foreground-600">{row.intake}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </section>

        <section id="admissions" className="scroll-mt-28 py-14 md:py-20">
          <Container>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">
                  <span className="h-px w-6 bg-accent-500/50" />
                  Admissions
                </div>
                <h2 className="mt-3 font-heading text-2xl text-foreground-950 md:text-4xl">
                  How to apply
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-foreground-600">
                  The process is straightforward. Follow these four steps and you will be ready to submit a
                  strong application.
                </p>
                <Link
                  to="/faculty"
                  className="mt-6 inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-accent-700 transition-colors hover:text-accent-800"
                >
                  Talk to our faculty
                  <i className="ri-arrow-right-line" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
                {admissionSteps.map((step, index) => (
                  <div key={step.title} className="rounded-lg border border-background-200 bg-background-100 p-5 md:p-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-700 font-heading text-base text-background-50">
                      {index + 1}
                    </span>
                    <h3 className="mt-4 font-heading text-lg text-foreground-950">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-600">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-primary-950 py-14 md:py-20">
          <Container>
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h2 className="font-heading text-2xl text-background-50 md:text-3xl">Still deciding?</h2>
                <p className="mt-3 max-w-xl text-sm text-primary-200">
                  Attend an information session or reach out to our admissions team — we are happy to help.
                </p>
              </div>
              <Link
                to="/about#contact"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-accent-600 px-6 py-3.5 text-sm font-semibold text-background-50 transition-colors hover:bg-accent-700"
              >
                Contact admissions
                <i className="ri-arrow-right-line text-base" />
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <CompareBar />

      <ProgrammeDialog
        programme={activeProgramme}
        onClose={() => setActiveProgramme(null)}
        onAddToCalendar={handleCalendar}
      />

      {toast ? (
        <div className="fixed inset-x-0 bottom-24 z-[70] flex justify-center px-4 sm:bottom-6">
          <div className="flex items-center gap-3 rounded-lg border border-accent-300 bg-background-50/95 px-4 py-3 backdrop-blur animate-fade-up">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent-600 text-background-50">
              <i className="ri-calendar-check-line text-base" />
            </span>
            <p className="text-sm text-foreground-800">{toast}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}