import { Link } from "react-router-dom";
import { programmes } from "@/mocks/programmes";
import { useCompare } from "@/context/CompareContext";

export default function HeroCompareTray() {
  const { selected, max } = useCompare();

  if (selected.length === 0) return null;

  const items = selected
    .map((id) => programmes.find((programme) => programme.id === id))
    .filter((item): item is (typeof programmes)[number] => Boolean(item));

  return (
    <div className="mt-8 max-w-2xl rounded-lg border border-background-50/25 bg-background-50/10 p-4 backdrop-blur-sm animate-fade-up md:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3">
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary-300">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-secondary-500 text-primary-950">
              <i className="ri-bookmark-3-line text-sm" />
            </span>
            Your shortlist · {selected.length}/{max}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {items.map((item) => (
              <span
                key={item.id}
                className="rounded-full border border-background-50/25 bg-background-50/15 px-3 py-1.5 text-xs font-medium text-background-50"
              >
                {item.shortName}
              </span>
            ))}
            {selected.length < max ? (
              <span className="text-xs text-background-200/80">
                Add {max - selected.length} more to compare side by side
              </span>
            ) : (
              <span className="text-xs text-background-200/80">Shortlist full — ready to compare</span>
            )}
          </div>
        </div>
        <Link
          to="/compare"
          className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-accent-600 px-5 py-3 text-sm font-semibold text-background-50 transition-colors hover:bg-accent-700"
        >
          Compare now
          <i className="ri-arrow-right-line text-base" />
        </Link>
      </div>
    </div>
  );
}