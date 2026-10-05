import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import Container from "@/components/base/Container";
import PageHeader from "@/components/base/PageHeader";
import { programmes } from "@/mocks/programmes";

const rows = [
  { label: "Level", render: (programme: (typeof programmes)[number]) => programme.level },
  { label: "Category", render: (programme: (typeof programmes)[number]) => programme.category },
  { label: "Duration", render: (programme: (typeof programmes)[number]) => programme.duration },
  { label: "Format", render: (programme: (typeof programmes)[number]) => programme.format },
  { label: "Intake", render: (programme: (typeof programmes)[number]) => `${programme.intake} seats` },
  { label: "Application deadline", render: (programme: (typeof programmes)[number]) => programme.deadline },
];

export default function CompareAllPage() {
  return (
    <div className="min-h-screen bg-background-50">
      <Navbar />
      <main className="pb-20">
        <PageHeader
          eyebrow="Compare all"
          title="Every programme, side by side"
          description="The full IIMB catalogue in one view — duration, format, level, intake and application deadlines lined up. Scroll across to compare every programme at once, or build a focused three-programme shortlist."
          crumbs={[
            { label: "Programmes", href: "/programmes" },
            { label: "Compare all", href: "/compare-all" },
          ]}
        />

        <section className="pt-12 md:pt-16">
          <Container>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-foreground-600">
                <strong className="font-semibold text-foreground-900">{programmes.length}</strong> programmes across
                postgraduate, undergraduate, executive and certificate tracks.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/programmes"
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-background-300 px-5 py-3 text-sm font-semibold text-foreground-900 transition-colors hover:border-primary-500 hover:text-primary-700"
                >
                  <i className="ri-arrow-left-line text-base" />
                  Back to programmes
                </Link>
                <Link
                  to="/compare"
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary-700 px-5 py-3 text-sm font-semibold text-background-50 transition-colors hover:bg-primary-800"
                >
                  <i className="ri-scales-3-line text-base" />
                  Build a shortlist
                </Link>
              </div>
            </div>

            <div className="mt-6 max-h-[75vh] overflow-auto rounded-lg border border-background-200 bg-background-50">
              <table className="w-max border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-background-200">
                    <th className="sticky left-0 top-0 z-40 w-40 min-w-[150px] border-b border-background-200 bg-background-100 px-5 py-5 align-bottom text-xs font-semibold uppercase tracking-wide text-foreground-500">
                      Programme
                    </th>
                    {programmes.map((programme) => (
                      <th
                        key={programme.id}
                        className="sticky top-0 z-30 min-w-[220px] border-b border-l border-background-200 bg-background-100 px-5 py-5 align-bottom"
                      >
                        <span className="text-[11px] font-semibold uppercase tracking-wide text-accent-700">
                          {programme.shortName}
                        </span>
                        <p className="mt-1 font-heading text-sm leading-snug text-foreground-950">
                          {programme.name}
                        </p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-foreground-700">
                  {rows.map((row) => (
                    <tr key={row.label} className="border-b border-background-200">
                      <td className="sticky left-0 z-10 bg-background-50 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-foreground-500">
                        {row.label}
                      </td>
                      {programmes.map((programme) => (
                        <td
                          key={programme.id}
                          className="border-l border-background-200 px-5 py-4 font-medium text-foreground-900"
                        >
                          {row.render(programme)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="border-b border-background-200">
                    <td className="sticky left-0 z-10 align-top bg-background-50 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-foreground-500">
                      Highlights
                    </td>
                    {programmes.map((programme) => (
                      <td key={programme.id} className="border-l border-background-200 px-5 py-4">
                        <ul className="space-y-2">
                          {programme.highlights.map((highlight) => (
                            <li key={highlight} className="flex items-start gap-2 text-sm text-foreground-700">
                              <i className="ri-check-line mt-0.5 text-secondary-600" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="sticky left-0 z-10 bg-background-50 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-foreground-500">
                      Shortlist
                    </td>
                    {programmes.map((programme) => (
                      <td key={programme.id} className="border-l border-background-200 px-5 py-4">
                        <Link
                          to="/compare"
                          className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-background-300 px-4 py-2 text-xs font-semibold text-foreground-900 transition-colors hover:border-primary-500 hover:text-primary-700"
                        >
                          <i className="ri-scales-3-line" />
                          Compare in detail
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4 flex items-center gap-2 text-xs text-foreground-500">
              <i className="ri-information-line text-base" />
              Scroll inside the table — the header row and the Programme column stay pinned so you never lose your place.
            </p>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}