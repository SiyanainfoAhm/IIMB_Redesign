import { useMemo, useState } from "react";
import { admissionJourneys } from "@/mocks/admissions";

const statusStyles: Record<string, { dot: string; badge: string; label: string }> = {
  complete: {
    dot: "bg-secondary-500 text-background-50",
    badge: "bg-secondary-100 text-secondary-900",
    label: "Done",
  },
  current: {
    dot: "bg-primary-700 text-background-50",
    badge: "bg-primary-100 text-primary-700",
    label: "Now",
  },
  upcoming: {
    dot: "bg-background-200 text-foreground-500",
    badge: "bg-background-100 text-foreground-500",
    label: "Upcoming",
  },
};

export default function DeadlineTimeline() {
  const [activeId, setActiveId] = useState(admissionJourneys[0].id);

  const journey = useMemo(
    () => admissionJourneys.find((item) => item.id === activeId) ?? admissionJourneys[0],
    [activeId],
  );

  const defaultOpen = useMemo(() => {
    const index = journey.steps.findIndex((step) => step.status === "current");
    return index === -1 ? 0 : index;
  }, [journey]);

  const [openStep, setOpenStep] = useState<number>(defaultOpen);

  const handleSelect = (id: string) => {
    const next = admissionJourneys.find((item) => item.id === id);
    setActiveId(id);
    if (next) {
      const index = next.steps.findIndex((step) => step.status === "current");
      setOpenStep(index === -1 ? 0 : index);
    }
  };

  const completed = journey.steps.filter((step) => step.status === "complete").length;
  const progress = Math.round((completed / journey.steps.length) * 100);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1 rounded-full border border-background-300 bg-background-100 px-1 py-1">
        {admissionJourneys.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(item.id)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary-700 text-background-50"
                  : "text-foreground-600 hover:bg-background-50 hover:text-foreground-900"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <ol className="relative">
            {journey.steps.map((step, index) => {
              const styles = statusStyles[step.status];
              const isOpen = openStep === index;
              const isLast = index === journey.steps.length - 1;
              return (
                <li key={`${journey.id}-${step.title}`} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${styles.dot}`}
                    >
                      {step.status === "complete" ? <i className="ri-check-line text-base" /> : index + 1}
                    </span>
                    {!isLast ? <span className="my-1 w-px flex-1 bg-background-300" /> : null}
                  </div>

                  <div className={`flex-1 ${isLast ? "pb-0" : "pb-6"}`}>
                    <button
                      type="button"
                      onClick={() => setOpenStep(isOpen ? -1 : index)}
                      aria-expanded={isOpen}
                      className="flex w-full cursor-pointer items-start justify-between gap-4 rounded-lg border border-background-200 bg-background-50 p-5 text-left transition-colors hover:border-primary-300"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-xs font-semibold uppercase tracking-wide text-accent-700">
                            {step.date}
                          </span>
                          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${styles.badge}`}>
                            {styles.label}
                          </span>
                        </div>
                        <h3 className="mt-2 font-heading text-lg leading-snug text-foreground-950">{step.title}</h3>
                      </div>
                      <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-background-100 text-foreground-500">
                        <i className={`${isOpen ? "ri-subtract-line" : "ri-add-line"} text-base`} />
                      </span>
                    </button>
                    {isOpen ? (
                      <p className="mt-3 rounded-lg border border-background-200 bg-background-100 p-4 text-sm leading-relaxed text-foreground-600">
                        {step.description}
                      </p>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="lg:col-span-4">
          <div className="rounded-lg border border-background-200 bg-background-100 p-6">
            <h3 className="font-heading text-lg text-foreground-950">{journey.label} journey</h3>
            <p className="mt-2 text-sm text-foreground-600">{journey.window}</p>

            <div className="mt-5">
              <div className="flex items-center justify-between text-xs text-foreground-500">
                <span>Progress</span>
                <span className="font-semibold text-foreground-900">{progress}%</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-background-200">
                <div className="h-full rounded-full bg-primary-600" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <ul className="mt-6 space-y-3 text-sm">
              {journey.steps.map((step) => (
                <li key={`${journey.id}-side-${step.title}`} className="flex items-start gap-2">
                  <i
                    className={`mt-0.5 ${
                      step.status === "complete"
                        ? "ri-checkbox-circle-fill text-secondary-600"
                        : step.status === "current"
                          ? "ri-time-fill text-primary-600"
                          : "ri-circle-line text-foreground-300"
                    }`}
                  />
                  <span className={step.status === "upcoming" ? "text-foreground-500" : "text-foreground-800"}>
                    {step.title}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-6 flex items-start gap-2 rounded-md bg-background-50 p-4 text-xs leading-relaxed text-foreground-600">
              <i className="ri-information-line mt-0.5 text-accent-600" />
              Dates are indicative. Always confirm on the official admissions portal before you apply.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}