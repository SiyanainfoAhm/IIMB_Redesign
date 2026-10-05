import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import Container from "@/components/base/Container";
import PageHeader from "@/components/base/PageHeader";
import SectionHeading from "@/components/base/SectionHeading";
import { programmes } from "@/mocks/programmes";
import { useCompare } from "@/context/CompareContext";

export default function ComparePage() {
  const { selected, toggle, remove, clear, isFull, max } = useCompare();

  const [highlightDiff, setHighlightDiff] = useState(false);

  const items = programmes.filter((programme) => selected.includes(programme.id));

  const compareRows = [
    {
      label: "Duration",
      comparable: true,
      alignTop: false,
      cellClass: "font-medium text-foreground-900",
      text: (p: (typeof items)[number]) => p.duration,
      render: (p: (typeof items)[number]) => p.duration,
    },
    {
      label: "Format",
      comparable: true,
      alignTop: false,
      cellClass: "font-medium text-foreground-900",
      text: (p: (typeof items)[number]) => p.format,
      render: (p: (typeof items)[number]) => p.format,
    },
    {
      label: "Level",
      comparable: true,
      alignTop: false,
      cellClass: "font-medium text-foreground-900",
      text: (p: (typeof items)[number]) => p.level,
      render: (p: (typeof items)[number]) => p.level,
    },
    {
      label: "Intake",
      comparable: true,
      alignTop: false,
      cellClass: "font-medium text-foreground-900",
      text: (p: (typeof items)[number]) => `${p.intake} seats`,
      render: (p: (typeof items)[number]) => `${p.intake} seats`,
    },
    {
      label: "Deadline",
      comparable: true,
      alignTop: false,
      cellClass: "font-medium text-accent-700",
      text: (p: (typeof items)[number]) => p.deadline,
      render: (p: (typeof items)[number]) => p.deadline,
    },
    {
      label: "Highlights",
      comparable: true,
      alignTop: true,
      cellClass: "",
      text: (p: (typeof items)[number]) => p.highlights.join(" • "),
      render: (p: (typeof items)[number]) => (
        <ul className="space-y-2">
          {p.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-2">
              <i className="ri-check-line mt-0.5 text-secondary-600" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      label: "Overview",
      comparable: false,
      alignTop: true,
      cellClass: "leading-relaxed",
      text: (p: (typeof items)[number]) => p.description,
      render: (p: (typeof items)[number]) => p.description,
    },
  ];

  return (
    <div className="min-h-screen bg-background-50">
      <Navbar />
      <main className="pb-20">
        <PageHeader
          eyebrow="Compare programmes"
          title="Build your shortlist, side by side"
          description="Pick up to three programmes and see duration, format, level, intake and admissions deadlines lined up so the differences are easy to see."
          crumbs={[{ label: "Compare", href: "/compare" }]}
        />

        <section className="pt-12 md:pt-16">
          <Container>
            <SectionHeading
              eyebrow="Step 1"
              title="Choose your programmes"
              description={
                isFull
                  ? `You have selected the maximum of ${max} programmes. Remove one to swap it out.`
                  : `Select up to ${max} programmes to compare.`
              }
              action={
                <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-background-300 bg-background-100 px-4 py-2 text-sm font-semibold text-foreground-800">
                  <i className="ri-scales-3-line text-secondary-600" />
                  {selected.length}/{max} selected
                </span>
              }
            />

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {programmes.map((programme) => {
                const active = selected.includes(programme.id);
                const disabled = !active && isFull;
                return (
                  <div
                    key={programme.id}
                    className={`flex flex-col justify-between rounded-lg border p-5 transition-colors ${
                      active
                        ? "border-primary-500 bg-primary-100/60"
                        : "border-background-200 bg-background-50"
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-[11px] font-semibold uppercase tracking-wide text-accent-700">
                            {programme.shortName}
                          </span>
                          <h3 className="mt-1 font-heading text-base leading-snug text-foreground-950">
                            {programme.name}
                          </h3>
                        </div>
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
                            active ? "bg-primary-700 text-background-50" : "bg-background-100 text-foreground-400"
                          }`}
                        >
                          <i className={active ? "ri-check-line text-base" : "ri-add-line text-base"} />
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground-600">
                        <span className="flex items-center gap-1.5">
                          <i className="ri-time-line" />
                          {programme.duration}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <i className="ri-building-2-line" />
                          {programme.format}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggle(programme.id)}
                      disabled={disabled}
                      className={`mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 py-2.5 text-sm font-semibold transition-colors ${
                        active
                          ? "border border-primary-300 bg-background-50 text-primary-700 hover:bg-background-100"
                          : disabled
                            ? "cursor-not-allowed border border-background-200 bg-background-100 text-foreground-400"
                            : "bg-primary-700 text-background-50 hover:bg-primary-800"
                      }`}
                    >
                      {active ? (
                        <>
                          <i className="ri-close-line text-base" />
                          Remove
                        </>
                      ) : disabled ? (
                        <>
                          <i className="ri-lock-line text-base" />
                          Shortlist full
                        </>
                      ) : (
                        <>
                          <i className="ri-add-line text-base" />
                          Add to compare
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        <section className="mt-16 border-y border-background-200 bg-background-100 py-14 md:py-20">
          <Container>
            <SectionHeading
              eyebrow="Step 2"
              title="Your comparison"
              action={
                items.length > 1 ? (
                  <button
                    type="button"
                    role="switch"
                    aria-checked={highlightDiff}
                    onClick={() => setHighlightDiff((value) => !value)}
                    className={`inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                      highlightDiff
                        ? "border-accent-300 bg-accent-100 text-accent-900"
                        : "border-background-300 bg-background-100 text-foreground-800 hover:border-accent-500 hover:text-accent-700"
                    }`}
                  >
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-sm ${
                        highlightDiff ? "bg-accent-500 text-background-50" : "border border-background-400 bg-background-50"
                      }`}
                    >
                      {highlightDiff ? <i className="ri-check-line text-xs" /> : null}
                    </span>
                    Highlight differences
                  </button>
                ) : undefined
              }
            />

            {items.length > 1 && highlightDiff ? (
              <p className="mt-4 flex items-center gap-2 text-xs text-accent-800">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
                Rows where your shortlisted programmes differ are highlighted below.
              </p>
            ) : null}

            {items.length === 0 ? (
              <div className="mt-8 rounded-lg border border-background-200 bg-background-50 p-10 text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-md bg-secondary-100 text-secondary-900">
                  <i className="ri-scales-3-line text-2xl" />
                </span>
                <h3 className="mt-5 font-heading text-xl text-foreground-950">Nothing to compare yet</h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-foreground-600">
                  Add programmes from the list above and they will appear here side by side, ready to review.
                </p>
                <Link
                  to="/programmes"
                  className="mt-6 inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-background-300 px-5 py-3 text-sm font-semibold text-foreground-900 transition-colors hover:border-primary-500 hover:text-primary-700"
                >
                  Browse all programmes
                  <i className="ri-arrow-right-line text-base" />
                </Link>
              </div>
            ) : (
              <>
                <div className="mt-8 overflow-x-auto rounded-lg border border-background-200 bg-background-50 lg:overflow-visible">
                  <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-background-200">
                        <th className="sticky left-0 top-16 z-30 w-40 border-b border-background-200 bg-background-50 px-5 py-5 align-bottom text-xs font-semibold uppercase tracking-wide text-foreground-500 lg:top-[116px]">
                          Attribute
                        </th>
                        {items.map((item) => (
                          <th
                            key={item.id}
                            className="sticky top-16 z-20 border-b border-background-200 bg-background-50 px-5 py-5 align-bottom lg:top-[116px]"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <span className="text-[11px] font-semibold uppercase tracking-wide text-accent-700">
                                  {item.shortName}
                                </span>
                                <p className="mt-1 font-heading text-base leading-snug text-foreground-950">
                                  {item.name}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => remove(item.id)}
                                aria-label={`Remove ${item.name}`}
                                className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-md border border-background-200 text-foreground-400 transition-colors hover:border-accent-500 hover:text-accent-700"
                              >
                                <i className="ri-close-line text-sm" />
                              </button>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="text-foreground-700">
                      {compareRows.map((row) => {
                        const values = items.map((item) => row.text(item));
                        const differ = highlightDiff && row.comparable && new Set(values).size > 1;
                        return (
                          <tr key={row.label} className="border-b border-background-200">
                            <td
                              className={`sticky left-0 z-10 px-5 py-4 text-xs font-semibold uppercase tracking-wide transition-colors ${
                                row.alignTop ? "align-top" : ""
                              } ${differ ? "bg-accent-100 text-accent-900" : "bg-background-50 text-foreground-500"}`}
                            >
                              <span className="flex items-center gap-2">
                                {differ ? <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" /> : null}
                                {row.label}
                              </span>
                            </td>
                            {items.map((item) => (
                              <td
                                key={item.id}
                                className={`px-5 py-4 transition-colors ${
                                  row.alignTop ? "align-top" : ""
                                } ${differ ? "bg-accent-100/50" : ""} ${row.cellClass}`}
                              >
                                {row.render(item)}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    to="/admissions"
                    className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary-700 px-5 py-3 text-sm font-semibold text-background-50 transition-colors hover:bg-primary-800"
                  >
                    Check your eligibility
                    <i className="ri-arrow-right-line text-base" />
                  </Link>
                  <button
                    type="button"
                    onClick={clear}
                    className="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-md border border-background-300 px-5 py-3 text-sm font-semibold text-foreground-900 transition-colors hover:border-accent-500 hover:text-accent-700"
                  >
                    <i className="ri-delete-bin-line text-base" />
                    Clear shortlist
                  </button>
                </div>
              </>
            )}
          </Container>
        </section>

        <section className="pt-14 md:pt-20">
          <Container>
            <div className="flex flex-col items-start justify-between gap-6 rounded-lg bg-primary-950 p-6 md:flex-row md:items-center md:p-10">
              <div>
                <h2 className="font-heading text-2xl text-background-50 md:text-3xl">Need help deciding?</h2>
                <p className="mt-3 max-w-xl text-sm text-primary-200">
                  Our admissions team can talk you through the differences and help you find the right fit.
                </p>
              </div>
              <Link
                to="/about#contact"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-accent-600 px-6 py-3.5 text-sm font-semibold text-background-50 transition-colors hover:bg-accent-700"
              >
                Talk to admissions
                <i className="ri-arrow-right-line text-base" />
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}