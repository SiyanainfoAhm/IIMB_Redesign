import { useEffect, useRef, useState } from "react";
import { useSavedEvents } from "@/context/SavedEventsContext";

export default function SavedEvents() {
  const { saved, remove, clear, saveSignal } = useSavedEvents();
  const [nudge, setNudge] = useState(false);
  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    setNudge(true);
    const timer = window.setTimeout(() => setNudge(false), 4000);
    return () => window.clearTimeout(timer);
  }, [saveSignal]);

  if (saved.length === 0) return null;

  return (
    <section className="pt-12 md:pt-16">
      <div className="overflow-hidden rounded-lg border border-background-200 bg-background-50">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-background-200 bg-background-100 px-5 py-4 md:px-6">
          <span className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary-100 text-secondary-900">
              <i className="ri-bookmark-3-line text-base" />
            </span>
            <span className="flex flex-col">
              <span className="font-heading text-base text-foreground-950">Your saved events</span>
              <span className="text-xs text-foreground-500">
                {saved.length} {saved.length === 1 ? "event" : "events"} kept on this device
              </span>
            </span>
          </span>
          <button
            type="button"
            onClick={clear}
            className="inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-2 text-xs font-semibold text-foreground-600 transition-colors hover:text-foreground-950"
          >
            <i className="ri-delete-bin-line text-sm" />
            Clear all
          </button>
        </div>

        {nudge ? (
          <div className="flex items-center gap-2 border-b border-background-200 bg-accent-50 px-5 py-3 text-xs font-medium text-accent-900 md:px-6">
            <i className="ri-checkbox-circle-line text-base text-accent-700" />
            Saved. We'll remember this event for your next visit.
          </div>
        ) : null}

        <ul className="divide-y divide-background-200">
          {saved.map((event) => (
            <li
              key={event.id}
              className="flex flex-wrap items-center gap-4 px-5 py-4 md:px-6"
            >
              <span className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-md bg-primary-800 text-background-50">
                <span className="font-heading text-lg leading-none">{event.day}</span>
                <span className="text-[10px] uppercase tracking-wide text-primary-200">{event.month}</span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="font-heading text-base leading-snug text-foreground-950">{event.title}</span>
                  <span className="rounded-full bg-secondary-100 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-secondary-900">
                    {event.category}
                  </span>
                </span>
                <span className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-foreground-500">
                  <span className="flex items-center gap-1.5">
                    <i className="ri-calendar-line" />
                    {event.day} {event.month} {event.year} · {event.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <i className="ri-map-pin-2-line" />
                    {event.venue}
                  </span>
                </span>
              </span>
              <button
                type="button"
                onClick={() => remove(event.id)}
                aria-label={`Remove ${event.title} from saved events`}
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md border border-background-300 text-foreground-500 transition-colors hover:border-accent-400 hover:text-accent-700"
              >
                <i className="ri-close-line text-base" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}