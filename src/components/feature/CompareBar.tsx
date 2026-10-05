import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { programmes } from "@/mocks/programmes";
import { COMPARE_MAX, useCompare } from "@/context/CompareContext";

export default function CompareBar() {
  const { selected, remove, clear, max, addSignal } = useCompare();
  const location = useLocation();
  const [nudge, setNudge] = useState(false);
  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    setNudge(true);
    const timer = window.setTimeout(() => setNudge(false), 4200);
    return () => window.clearTimeout(timer);
  }, [addSignal]);

  if (selected.length === 0) return null;
  if (location.pathname === "/compare") return null;

  const items = selected
    .map((id) => programmes.find((programme) => programme.id === id))
    .filter((item): item is (typeof programmes)[number] => Boolean(item));

  return (
    <div className="fixed inset-x-0 bottom-0 z-[65] px-4 pb-4">
      <div className="mx-auto flex w-full max-w-screen flex-col gap-3">
        {nudge ? (
          <div className="flex items-center gap-3 rounded-lg border border-accent-300 bg-background-50/95 px-4 py-3 backdrop-blur">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent-600 text-background-50">
              <i className="ri-bookmark-3-line text-base" />
            </span>
            <p className="flex-1 text-sm leading-snug text-foreground-800">
              <strong className="font-semibold text-foreground-950">Saved to your shortlist.</strong> Add up
              to {max} programmes to compare them side by side.
            </p>
            <Link
              to="/compare"
              className="hidden whitespace-nowrap text-sm font-semibold text-accent-700 transition-colors hover:text-accent-800 sm:inline-flex"
            >
              Compare now
            </Link>
          </div>
        ) : null}

        <div className="flex w-full flex-col gap-4 rounded-lg border border-background-200 bg-background-50/95 p-4 backdrop-blur lg:flex-row lg:items-center lg:justify-between lg:px-6">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <span className="flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-foreground-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary-100 text-secondary-900">
              <i className="ri-scales-3-line text-base" />
            </span>
            Shortlist
            <span className="text-foreground-500">
              {selected.length}/{max}
            </span>
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {items.map((item) => (
              <span
                key={item.id}
                className="flex items-center gap-2 rounded-full border border-background-200 bg-background-100 px-3 py-1.5 text-xs font-medium text-foreground-800"
              >
                {item.shortName}
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  aria-label={`Remove ${item.name} from shortlist`}
                  className="flex h-4 w-4 cursor-pointer items-center justify-center text-foreground-400 transition-colors hover:text-accent-700"
                >
                  <i className="ri-close-line text-sm" />
                </button>
              </span>
            ))}
            {selected.length < COMPARE_MAX ? (
              <span className="hidden items-center gap-1.5 text-xs text-foreground-500 sm:flex">
                <i className="ri-add-line" />
                Add up to {COMPARE_MAX - selected.length} more
              </span>
            ) : null}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={clear}
            className="whitespace-nowrap rounded-md px-3 py-2.5 text-sm font-semibold text-foreground-600 transition-colors hover:text-foreground-900"
          >
            Clear
          </button>
          <Link
            to="/compare"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary-700 px-5 py-2.5 text-sm font-semibold text-background-50 transition-colors hover:bg-primary-800"
          >
            Compare {selected.length}
            <i className="ri-arrow-right-line text-base" />
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}