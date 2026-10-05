import { useMemo, useState } from "react";
import { pastEvents } from "@/mocks/events";
import PastEventDialog from "./PastEventDialog";
import type { PastEventDetail } from "./PastEventDialog";

export default function PastHighlights() {
  const years = useMemo(() => {
    const unique = Array.from(new Set(pastEvents.map((event) => event.year)));
    return unique.sort((a, b) => Number(b) - Number(a));
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(pastEvents.map((event) => event.category)));
    return unique.sort();
  }, []);

  const [activeYear, setActiveYear] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selected, setSelected] = useState<PastEventDetail | null>(null);

  const visible = useMemo(() => {
    return pastEvents.filter((event) => {
      const yearMatch = activeYear === "all" || event.year === activeYear;
      const categoryMatch = activeCategory === "all" || event.category === activeCategory;
      return yearMatch && categoryMatch;
    });
  }, [activeYear, activeCategory]);

  const filtersActive = activeYear !== "all" || activeCategory !== "all";

  const chipClass = (isActive: boolean) =>
    `whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "bg-primary-700 text-background-50"
        : "text-foreground-600 hover:bg-background-50 hover:text-foreground-900"
    }`;

  const resultText =
    activeYear === "all" && activeCategory === "all"
      ? "from the archive"
      : `matching ${activeYear !== "all" ? activeYear : "all years"}${
          activeCategory !== "all" ? ` · ${activeCategory}` : ""
        }`;

  return (
    <section className="py-14 md:py-20">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-heading text-2xl text-foreground-950 md:text-3xl">Past events archive</h2>
          <p className="mt-3 max-w-xl text-sm text-foreground-600">
            A look back at the gatherings that brought our community together. Filter by year and category,
            then open any card to read the full recap.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-background-300 bg-background-100 p-4 md:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          <div className="flex-1">
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground-500">
              <i className="ri-calendar-line text-base text-accent-600" />
              Year
            </span>
            <div className="mt-3 flex flex-wrap items-center gap-1">
              <button type="button" onClick={() => setActiveYear("all")} className={chipClass(activeYear === "all")}>
                All years
              </button>
              {years.map((year) => (
                <button
                  key={year}
                  type="button"
                  onClick={() => setActiveYear(year)}
                  className={chipClass(activeYear === year)}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          <span className="hidden w-px self-stretch bg-background-300 lg:block" />

          <div className="flex-1">
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground-500">
              <i className="ri-price-tag-3-line text-base text-accent-600" />
              Category
            </span>
            <div className="mt-3 flex flex-wrap items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                className={chipClass(activeCategory === "all")}
              >
                All categories
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={chipClass(activeCategory === category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-foreground-500">
          Showing <strong className="font-semibold text-foreground-900">{visible.length}</strong>{" "}
          {visible.length === 1 ? "event" : "events"} {resultText}
        </p>
        {filtersActive ? (
          <button
            type="button"
            onClick={() => {
              setActiveYear("all");
              setActiveCategory("all");
            }}
            className="inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full border border-background-300 bg-background-50 px-3.5 py-1.5 text-xs font-semibold text-foreground-700 transition-colors hover:border-primary-400 hover:text-primary-700"
          >
            <i className="ri-close-line text-sm" />
            Clear filters
          </button>
        ) : null}
      </div>

      {visible.length === 0 ? (
        <div className="mt-8 rounded-lg border border-background-200 bg-background-50 p-10 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-secondary-100 text-secondary-900">
            <i className="ri-history-line text-xl" />
          </span>
          <p className="mt-4 text-sm text-foreground-600">
            No events match these filters yet. Try a different year or category.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((event) => (
            <button
              key={event.id}
              type="button"
              onClick={() => setSelected(event)}
              aria-label={`Open the recap for ${event.title}`}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-lg border border-background-200 bg-background-50 text-left transition-colors hover:border-primary-400"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  title={`${event.title} — IIMB past event`}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-background-50/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent-700">
                  {event.category}
                </span>
                <span className="absolute right-4 top-4 rounded-full bg-primary-950/85 px-3 py-1 text-[11px] font-semibold text-background-50">
                  {event.year}
                </span>
                <span className="absolute inset-0 flex items-center justify-center bg-foreground-950/0 transition-colors duration-300 group-hover:bg-foreground-950/35">
                  <span className="flex translate-y-2 items-center gap-2 rounded-full bg-background-50/95 px-4 py-2 text-xs font-semibold text-foreground-900 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <i className="ri-article-line text-base" />
                    Read the recap
                  </span>
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5 md:p-6">
                <p className="text-xs text-foreground-500">{event.dateLabel}</p>
                <h3 className="mt-2 font-heading text-lg leading-snug text-foreground-950">{event.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground-600">{event.summary}</p>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-background-200 pt-4">
                  <span className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary-100 text-secondary-900">
                      <i className="ri-bar-chart-box-line text-lg" />
                    </span>
                    <span>
                      <span className="block font-heading text-base text-foreground-950">{event.stat}</span>
                      <span className="block text-xs text-foreground-500">{event.statLabel}</span>
                    </span>
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-background-100 text-primary-700 transition-colors group-hover:bg-primary-700 group-hover:text-background-50">
                    <i className="ri-arrow-right-line text-base" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      <PastEventDialog event={selected} onClose={() => setSelected(null)} />
    </section>
  );
}