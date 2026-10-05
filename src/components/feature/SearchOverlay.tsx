import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { programmes } from "@/mocks/programmes";
import { faculty } from "@/mocks/faculty";
import { newsItems } from "@/mocks/news";
import { primaryNav } from "@/mocks/navigation";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

interface SearchEntry {
  id: string;
  label: string;
  type: string;
  href: string;
}

const buildIndex = (): SearchEntry[] => {
  const pages: SearchEntry[] = primaryNav.map((item) => ({
    id: `page-${item.label}`,
    label: item.label,
    type: "Page",
    href: item.href,
  }));
  const extraPages: SearchEntry[] = [
    { id: "page-compare", label: "Compare programmes", type: "Page", href: "/compare" },
    { id: "page-events", label: "Events", type: "Page", href: "/events" },
  ];
  const programmeEntries: SearchEntry[] = programmes.map((item) => ({
    id: `prog-${item.id}`,
    label: item.name,
    type: "Programme",
    href: "/programmes",
  }));
  const facultyEntries: SearchEntry[] = faculty.map((item) => ({
    id: `fac-${item.id}`,
    label: `${item.name} — ${item.area}`,
    type: "Faculty",
    href: "/faculty",
  }));
  const newsEntries: SearchEntry[] = newsItems.map((item) => ({
    id: `news-${item.id}`,
    label: item.title,
    type: "News",
    href: `/news/${item.id}`,
  }));
  return [...programmeEntries, ...facultyEntries, ...newsEntries, ...pages, ...extraPages];
};

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const index = useMemo(buildIndex, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return index.slice(0, 6);
    return index.filter((entry) => entry.label.toLowerCase().includes(trimmed)).slice(0, 8);
  }, [query, index]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-24 md:pt-32">
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-foreground-950/50 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-2xl overflow-hidden rounded-lg border border-background-200 bg-background-50 shadow-none">
        <div className="flex items-center gap-3 border-b border-background-200 px-4 py-4 md:px-6">
          <span className="flex h-6 w-6 items-center justify-center text-foreground-400">
            <i className="ri-search-line text-lg" />
          </span>
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search programmes, faculty, research, news…"
            className="w-full bg-transparent text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none md:text-base"
          />
          <button
            type="button"
            onClick={onClose}
            className="hidden rounded-md border border-background-300 px-2 py-1 text-xs font-medium text-foreground-500 transition-colors hover:text-foreground-900 md:block"
          >
            ESC
          </button>
        </div>
        <div className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-foreground-500">
              No matches for “{query}”. Try a programme, an area or a name.
            </p>
          ) : (
            <ul>
              {results.map((entry) => (
                <li key={entry.id}>
                  <Link
                    to={entry.href}
                    onClick={onClose}
                    className="flex items-center justify-between gap-4 rounded-md px-4 py-3 transition-colors hover:bg-background-100"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center text-foreground-400">
                        <i className="ri-arrow-right-up-line text-base" />
                      </span>
                      <span className="text-sm text-foreground-900">{entry.label}</span>
                    </span>
                    <span className="rounded-full bg-secondary-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-secondary-900">
                      {entry.type}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}