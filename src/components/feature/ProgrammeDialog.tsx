import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface ProgrammeDetail {
  id: string;
  name: string;
  shortName: string;
  category: string;
  duration: string;
  format: string;
  level: string;
  intake: number;
  deadline: string;
  deadlineIso?: string | null;
  description: string;
  highlights: string[];
  curriculum: string[];
  eligibility: string[];
  howToApply: string[];
  image: string;
}

interface ProgrammeDialogProps {
  programme: ProgrammeDetail | null;
  onClose: () => void;
  onAddToCalendar: (programme: ProgrammeDetail) => void;
}

const TABS = [
  { id: "curriculum", label: "Curriculum", icon: "ri-book-2-line" },
  { id: "eligibility", label: "Eligibility", icon: "ri-shield-check-line" },
  { id: "apply", label: "How to apply", icon: "ri-guide-line" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function ProgrammeDialog({ programme, onClose, onAddToCalendar }: ProgrammeDialogProps) {
  const [tab, setTab] = useState<TabId>("curriculum");

  useEffect(() => {
    setTab("curriculum");
  }, [programme?.id]);

  useEffect(() => {
    if (!programme) return undefined;

    const handleKey = (keyEvent: KeyboardEvent) => {
      if (keyEvent.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [programme, onClose]);

  if (!programme) return null;

  const list =
    tab === "curriculum"
      ? programme.curriculum
      : tab === "eligibility"
        ? programme.eligibility
        : programme.howToApply;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Close programme details"
        onClick={onClose}
        className="absolute inset-0 cursor-pointer bg-foreground-950/60 backdrop-blur-sm animate-fade-in"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="programme-dialog-title"
        className="relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-lg border border-background-200 bg-background-50 sm:rounded-lg animate-fade-up"
      >
        <div className="relative h-52 w-full overflow-hidden sm:h-64">
          <img
            src={programme.image}
            alt={programme.name}
            title={`${programme.name} — IIMB programme`}
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground-950/85 via-foreground-950/35 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-background-50/30 bg-foreground-950/40 text-background-50 backdrop-blur transition-colors hover:bg-foreground-950/70"
          >
            <i className="ri-close-line text-lg" />
          </button>
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-background-50/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent-700">
                {programme.shortName}
              </span>
              <span className="rounded-full bg-primary-950/85 px-3 py-1 text-[11px] font-semibold text-background-50">
                {programme.level}
              </span>
            </div>
            <h2
              id="programme-dialog-title"
              className="mt-3 font-heading text-2xl leading-tight text-background-50 md:text-3xl"
            >
              {programme.name}
            </h2>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-foreground-600">
            <span className="flex items-center gap-2">
              <i className="ri-time-line text-base" />
              {programme.duration}
            </span>
            <span className="flex items-center gap-2">
              <i className="ri-building-2-line text-base" />
              {programme.format}
            </span>
            <span className="flex items-center gap-2">
              <i className="ri-group-line text-base" />
              {programme.intake} seats
            </span>
          </div>

          <p className="mt-5 text-base leading-relaxed text-foreground-700">{programme.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {programme.highlights.map((highlight) => (
              <span
                key={highlight}
                className="rounded-full bg-secondary-100 px-3 py-1 text-xs font-medium text-secondary-900"
              >
                {highlight}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-4 rounded-lg border border-background-200 bg-background-100 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary-800 text-background-50">
                <i className="ri-calendar-event-line text-xl" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wide text-foreground-500">Application deadline</p>
                <p className="font-heading text-base text-foreground-950">{programme.deadline}</p>
              </div>
            </div>
            {programme.deadlineIso ? (
              <button
                type="button"
                onClick={() => onAddToCalendar(programme)}
                className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary-700 px-5 py-3 text-sm font-semibold text-background-50 transition-colors hover:bg-primary-800"
              >
                <i className="ri-calendar-check-line text-base" />
                Add to calendar
              </button>
            ) : (
              <span className="text-xs text-foreground-500">Rolling admissions — no fixed deadline</span>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-1 rounded-full border border-background-300 bg-background-100 px-1 py-1">
            {TABS.map((item) => {
              const isActive = item.id === tab;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary-700 text-background-50"
                      : "text-foreground-600 hover:bg-background-50 hover:text-foreground-900"
                  }`}
                >
                  <i className={item.icon} />
                  {item.label}
                </button>
              );
            })}
          </div>

          <ul className="mt-6 space-y-4">
            {list.map((entry, index) => (
              <li key={entry} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-semibold ${
                    tab === "eligibility"
                      ? "bg-secondary-100 text-secondary-900"
                      : "bg-accent-100 text-accent-800"
                  }`}
                >
                  {tab === "eligibility" ? <i className="ri-check-line text-sm" /> : index + 1}
                </span>
                <span className="text-sm leading-relaxed text-foreground-700">{entry}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-background-200 pt-6">
            <Link
              to="/admissions"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary-700 px-6 py-3 text-sm font-semibold text-background-50 transition-colors hover:bg-primary-800"
            >
              Check admission details
              <i className="ri-arrow-right-line text-base" />
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border border-background-300 px-5 py-3 text-sm font-semibold text-foreground-900 transition-colors hover:border-primary-500 hover:text-primary-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}