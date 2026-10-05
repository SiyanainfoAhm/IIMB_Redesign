import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "@/components/base/Container";
import SectionHeading from "@/components/base/SectionHeading";
import ProgrammeDialog from "@/components/feature/ProgrammeDialog";
import type { ProgrammeDetail } from "@/components/feature/ProgrammeDialog";
import { programmes, programmeCategories } from "@/mocks/programmes";
import { useCompare } from "@/context/CompareContext";
import { downloadDeadlineIcs } from "@/utils/calendar";

export default function Programmes() {
  const [active, setActive] = useState("degree");
  const [activeProgramme, setActiveProgramme] = useState<ProgrammeDetail | null>(null);
  const [toast, setToast] = useState("");
  const { selected, toggle, isFull } = useCompare();
  const visible = programmes.filter((item) => item.category === active);

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
    <section className="bg-background-100 py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Explore our programmes"
          title="Find the programme that fits your ambition"
          description="From the full-time MBA to executive and certificate programmes, discover what you can study at IIMB — and compare them side by side."
          action={
            <Link
              to="/programmes"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-foreground-300 px-5 py-3 text-sm font-semibold text-foreground-900 transition-colors hover:border-primary-500 hover:text-primary-700"
            >
              Compare all programmes
              <i className="ri-arrow-right-line text-base" />
            </Link>
          }
        />

        <div className="mt-8 inline-flex flex-wrap gap-1 rounded-full border border-background-300 bg-background-50 px-1 py-1">
          {programmeCategories.map((category) => {
            const isActive = category.id === active;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActive(category.id)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary-700 text-background-50"
                    : "text-foreground-600 hover:bg-background-100 hover:text-foreground-900"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-lg border border-background-200 bg-background-50"
            >
              <div className="group/img relative h-48 w-full overflow-hidden">
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
                <h3 className="font-heading text-lg leading-snug text-foreground-950">{item.name}</h3>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-foreground-600">
                  <span className="flex items-center gap-1.5">
                    <i className="ri-time-line" />
                    {item.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <i className="ri-building-2-line" />
                    {item.format}
                  </span>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground-600">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full bg-secondary-100 px-2.5 py-1 text-[11px] font-medium text-secondary-900"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
                <div className="mt-5 border-t border-background-200 pt-4">
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
                        className="inline-flex cursor-pointer items-center gap-1 whitespace-nowrap text-sm font-semibold text-foreground-900 transition-colors hover:text-accent-700"
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
                          <i className={isSelected ? "ri-bookmark-3-fill text-base" : "ri-bookmark-3-line text-base"} />
                          {isSelected ? "Saved to shortlist" : disabled ? "Shortlist full" : "Save to shortlist"}
                        </button>
                        {!isSelected && !disabled ? (
                          <p className="mt-2 flex items-center gap-1.5 text-[11px] text-foreground-500">
                            <i className="ri-scales-3-line" />
                            Compare up to 3 programmes side by side
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
    </section>
  );
}