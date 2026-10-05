import { useMemo, useState } from "react";
import { eventCategories, upcomingEvents } from "@/mocks/events";
import { downloadEventIcs } from "@/utils/calendar";
import { useSavedEvents } from "@/context/SavedEventsContext";
import type { SavedEvent } from "@/context/SavedEventsContext";
import EventInterestDialog from "./EventInterestDialog";
import type { InterestEvent } from "./EventInterestDialog";

type UpcomingEvent = (typeof upcomingEvents)[number];

export default function UpcomingEvents() {
  const [active, setActive] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState<InterestEvent | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);
  const { toggle: toggleSaved, save: saveEvent, isSaved } = useSavedEvents();

  const toSavedEvent = (event: UpcomingEvent): SavedEvent => ({
    id: event.id,
    title: event.title,
    day: event.day,
    month: event.month,
    year: event.year,
    time: event.time,
    venue: event.venue,
    category: event.category,
  });

  const handleAddToCalendar = (event: InterestEvent, description: string) => {
    downloadEventIcs({ ...event, description });
    setAddedId(event.id);
    window.setTimeout(() => setAddedId((current) => (current === event.id ? null : current)), 3000);
  };

  const visible = useMemo(() => {
    if (active === "all") return upcomingEvents;
    return upcomingEvents.filter((event) => event.category === active);
  }, [active]);

  return (
    <section id="upcoming" className="scroll-mt-28 py-14 md:py-20">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-heading text-2xl text-foreground-950 md:text-3xl">What's coming up</h2>
          <p className="mt-3 max-w-xl text-sm text-foreground-600">
            Information sessions, conferences and open days. Filter by the events that matter to you and save
            the date.
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-1 rounded-full border border-background-300 bg-background-100 px-1 py-1">
        {eventCategories.map((category) => {
          const isActive = category.id === active;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setActive(category.id)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary-700 text-background-50"
                  : "text-foreground-600 hover:bg-background-50 hover:text-foreground-900"
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <div className="mt-8 rounded-lg border border-background-200 bg-background-100 p-10 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-secondary-100 text-secondary-900">
            <i className="ri-calendar-line text-xl" />
          </span>
          <p className="mt-4 text-sm text-foreground-600">No events in this category yet. Try another filter.</p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((event) => (
            <article
              key={event.id}
              className={`group flex flex-col rounded-lg border bg-background-50 p-6 ${
                event.featured ? "border-accent-300" : "border-background-200"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-md bg-primary-800 text-background-50">
                  <span className="font-heading text-xl leading-none">{event.day}</span>
                  <span className="text-[10px] uppercase tracking-wide text-primary-200">{event.month}</span>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                    event.featured
                      ? "bg-accent-600 text-background-50"
                      : "bg-secondary-100 text-secondary-900"
                  }`}
                >
                  {event.featured ? "Featured" : event.category}
                </span>
              </div>

              <h3 className="mt-5 font-heading text-lg leading-snug text-foreground-950">{event.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground-600">{event.description}</p>

              <div className="mt-5 space-y-2 border-t border-background-200 pt-4 text-xs text-foreground-500">
                <p className="flex items-center gap-2">
                  <i className="ri-calendar-line" />
                  {event.day} {event.month} {event.year} · {event.time}
                </p>
                <p className="flex items-center gap-2">
                  <i className="ri-map-pin-2-line" />
                  {event.venue}
                </p>
              </div>

              <div className="mt-5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    saveEvent(toSavedEvent(event));
                    setSelectedEvent({
                      id: event.id,
                      title: event.title,
                      day: event.day,
                      month: event.month,
                      year: event.year,
                      time: event.time,
                      venue: event.venue,
                    });
                  }}
                  className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border border-background-300 px-4 py-2.5 text-sm font-semibold text-foreground-900 transition-colors hover:border-primary-500 hover:text-primary-700"
                >
                  <i className="ri-calendar-check-line text-base" />
                  Register interest
                </button>
                <button
                  type="button"
                  onClick={() => toggleSaved(toSavedEvent(event))}
                  title={isSaved(event.id) ? "Remove from saved events" : "Save this event"}
                  aria-label={isSaved(event.id) ? `Remove ${event.title} from saved events` : `Save ${event.title}`}
                  className={`flex h-[42px] w-11 shrink-0 cursor-pointer items-center justify-center rounded-md border transition-colors ${
                    isSaved(event.id)
                      ? "border-secondary-400 bg-secondary-100 text-secondary-900"
                      : "border-background-300 text-foreground-700 hover:border-primary-500 hover:text-primary-700"
                  }`}
                >
                  <i className={isSaved(event.id) ? "ri-bookmark-3-fill text-lg" : "ri-bookmark-3-line text-lg"} />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleAddToCalendar(
                      {
                        id: event.id,
                        title: event.title,
                        day: event.day,
                        month: event.month,
                        year: event.year,
                        time: event.time,
                        venue: event.venue,
                      },
                      event.description,
                    )
                  }
                  title="Add to calendar"
                  aria-label={`Add ${event.title} to your calendar`}
                  className="flex h-[42px] w-11 shrink-0 cursor-pointer items-center justify-center rounded-md border border-background-300 text-foreground-700 transition-colors hover:border-primary-500 hover:text-primary-700"
                >
                  <i className={addedId === event.id ? "ri-check-line text-lg" : "ri-calendar-2-line text-lg"} />
                </button>
              </div>

              {addedId === event.id ? (
                <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-primary-700">
                  <i className="ri-checkbox-circle-line" />
                  Added to your calendar — check your downloads.
                </p>
              ) : null}
            </article>
          ))}
        </div>
      )}

      <EventInterestDialog event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </section>
  );
}