import { useMemo, useState } from "react";
import { comparisonRows } from "@/mocks/programmes";

const ALL = "All";

export default function CompareExample() {
  const levelOptions = useMemo(() => {
    const set = new Set(comparisonRows.map((row) => row.level));
    return [ALL, ...Array.from(set)];
  }, []);
  const [level, setLevel] = useState(ALL);
  const [sortDesc, setSortDesc] = useState(true);

  const rows = useMemo(() => {
    const filtered = level === ALL ? comparisonRows : comparisonRows.filter((row) => row.level === level);
    return [...filtered].sort((a, b) => {
      const diff = Number(b.intake) - Number(a.intake);
      return sortDesc ? diff : -diff;
    });
  }, [level, sortDesc]);

  const totalIntake = rows.reduce((sum, row) => sum + Number(row.intake), 0);

  return (
    <div className="overflow-hidden rounded-lg border border-background-200 bg-background-50">
      <div className="flex flex-col gap-4 border-b border-background-200 p-4 md:flex-row md:items-center md:justify-between md:p-5">
        <div className="flex flex-wrap gap-1 rounded-full border border-background-300 bg-background-100 px-1 py-1">
          {levelOptions.map((option) => {
            const isActive = option === level;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setLevel(option)}
                className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-primary-700 text-background-50"
                    : "text-foreground-600 hover:bg-background-200 hover:text-foreground-900"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setSortDesc((value) => !value)}
          className="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-md border border-foreground-300 px-3.5 py-2 text-xs font-semibold text-foreground-900 transition-colors hover:border-primary-500 hover:text-primary-700"
        >
          <i className={sortDesc ? "ri-sort-desc" : "ri-sort-asc"} />
          Intake: {sortDesc ? "high to low" : "low to high"}
        </button>
      </div>

      <div className="max-h-[26rem] overflow-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="sticky top-0 z-20">
            <tr className="bg-primary-900 text-background-50">
              <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide">Programme</th>
              <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide">Level</th>
              <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide">Duration</th>
              <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide">Format</th>
              <th className="whitespace-nowrap px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide">
                Intake
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.id}
                className={`border-b border-background-200 ${
                  index % 2 === 1 ? "bg-background-100" : "bg-background-50"
                }`}
              >
                <td className="px-4 py-3 font-medium text-foreground-950">{row.name}</td>
                <td className="px-4 py-3">
                  <span className="whitespace-nowrap rounded-full bg-secondary-100 px-2.5 py-1 text-[11px] font-medium text-secondary-900">
                    {row.level}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-foreground-700">{row.duration}</td>
                <td className="whitespace-nowrap px-4 py-3 text-foreground-700">{row.format}</td>
                <td className="whitespace-nowrap px-4 py-3 text-right font-heading text-base tabular-nums text-accent-700">
                  {row.intake}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-background-200 bg-background-100 px-4 py-3 md:px-5">
        <p className="text-xs text-foreground-500">{rows.length} programmes shown</p>
        <p className="text-xs text-foreground-500">
          Combined intake{" "}
          <span className="font-heading text-sm tabular-nums text-foreground-950">{totalIntake.toLocaleString()}</span>{" "}
          seats
        </p>
      </div>
    </div>
  );
}