import { useEffect } from "react";

export interface PastEventDetail {
  id: string;
  category: string;
  title: string;
  dateLabel: string;
  year: string;
  image: string;
  summary: string;
  recap: string;
  highlights: string[];
  stat: string;
  statLabel: string;
}

interface PastEventDialogProps {
  event: PastEventDetail | null;
  onClose: () => void;
}

export default function PastEventDialog({ event, onClose }: PastEventDialogProps) {
  useEffect(() => {
    if (!event) return undefined;

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
  }, [event, onClose]);

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Close event recap"
        onClick={onClose}
        className="absolute inset-0 cursor-pointer bg-foreground-950/60 backdrop-blur-sm animate-fade-in"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="past-event-title"
        className="relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-lg border border-background-200 bg-background-50 sm:rounded-lg animate-fade-up"
      >
        <div className="relative h-56 w-full overflow-hidden sm:h-72">
          <img
            src={event.image}
            alt={event.title}
            title={`${event.title} — IIMB past event recap`}
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground-950/80 via-foreground-950/30 to-transparent" />
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
                {event.category}
              </span>
              <span className="rounded-full bg-primary-950/85 px-3 py-1 text-[11px] font-semibold text-background-50">
                {event.year}
              </span>
            </div>
            <h2
              id="past-event-title"
              className="mt-3 font-heading text-2xl leading-tight text-background-50 md:text-3xl"
            >
              {event.title}
            </h2>
            <p className="mt-2 flex items-center gap-2 text-sm text-background-100">
              <i className="ri-calendar-line" />
              {event.dateLabel}
            </p>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <p className="text-base leading-relaxed text-foreground-700">{event.summary}</p>

          <div className="mt-6 rounded-lg border border-background-200 bg-background-100 p-5 md:p-6">
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-700">
              <span className="h-px w-6 bg-accent-300" />
              Full recap
            </span>
            <p className="mt-4 text-sm leading-relaxed text-foreground-700">{event.recap}</p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <h3 className="font-heading text-lg text-foreground-950">Moments that stood out</h3>
              <ul className="mt-4 space-y-3">
                {event.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-sm leading-relaxed text-foreground-700">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-secondary-100 text-secondary-900">
                      <i className="ri-check-line text-sm" />
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-background-200 bg-background-50 p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary-800 text-background-50">
                <i className="ri-bar-chart-box-line text-xl" />
              </span>
              <p className="mt-4 font-heading text-2xl text-foreground-950">{event.stat}</p>
              <p className="mt-1 text-xs text-foreground-500">{event.statLabel}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-background-200 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary-700 px-6 py-3 text-sm font-semibold text-background-50 transition-colors hover:bg-primary-800"
            >
              <i className="ri-arrow-left-line text-base" />
              Back to the archive
            </button>
            <span className="flex items-center gap-2 text-xs text-foreground-500">
              <i className="ri-information-line text-base" />
              Recaps are published shortly after each event.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}