import { useMemo, useState } from "react";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import Container from "@/components/base/Container";
import PageHeader from "@/components/base/PageHeader";
import { faculty, researchAreas, researchHighlights } from "@/mocks/faculty";

export default function FacultyPage() {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("all");

  const filtered = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    return faculty.filter((member) => {
      const matchesArea = area === "all" || member.area === area;
      const haystack = `${member.name} ${member.title} ${member.focus.join(" ")} ${member.bio}`.toLowerCase();
      const matchesQuery = !trimmed || haystack.includes(trimmed);
      return matchesArea && matchesQuery;
    });
  }, [query, area]);

  return (
    <div className="min-h-screen bg-background-50">
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Faculty & research"
          title="People and ideas that shape management practice"
          description="Search our full-time faculty by name or research area, and explore the questions our scholars are working on right now."
          crumbs={[{ label: "Faculty & Research", href: "/faculty" }]}
        />

        <section className="py-12 md:py-16">
          <Container>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex w-full max-w-md items-center gap-3 rounded-md border border-background-300 bg-background-100 px-4 py-3">
                <span className="flex h-5 w-5 items-center justify-center text-foreground-400">
                  <i className="ri-search-line text-base" />
                </span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by name, title or focus area"
                  className="w-full bg-transparent text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="flex h-5 w-5 items-center justify-center text-foreground-400 hover:text-foreground-900"
                  >
                    <i className="ri-close-line text-base" />
                  </button>
                ) : null}
              </div>
              <p className="text-sm text-foreground-500">
                <strong className="font-semibold text-foreground-900">{filtered.length}</strong> faculty member
                {filtered.length === 1 ? "" : "s"}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {researchAreas.map((item) => {
                const isActive = item.id === area;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setArea(item.id)}
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "border-primary-700 bg-primary-700 text-background-50"
                        : "border-background-300 bg-background-50 text-foreground-600 hover:border-primary-400 hover:text-primary-700"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {filtered.length === 0 ? (
              <div className="mt-12 rounded-lg border border-background-200 bg-background-100 px-6 py-16 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-background-200 text-foreground-500">
                  <i className="ri-user-search-line text-2xl" />
                </span>
                <h2 className="mt-4 font-heading text-xl text-foreground-950">No faculty match your filters</h2>
                <p className="mt-2 text-sm text-foreground-600">Try a different area or clear your search.</p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setArea("all");
                  }}
                  className="mt-6 inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary-700 px-5 py-3 text-sm font-semibold text-background-50 transition-colors hover:bg-primary-800"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filtered.map((member) => (
                  <article
                    key={member.id}
                    className="group flex flex-col overflow-hidden rounded-lg border border-background-200 bg-background-50"
                  >
                    <div className="h-56 w-full overflow-hidden bg-background-200">
                      <img
                        src={member.image}
                        alt={member.name}
                        title={`${member.name} — IIMB faculty`}
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h2 className="font-heading text-lg text-foreground-950">{member.name}</h2>
                      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-accent-700">{member.title}</p>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground-600">{member.bio}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {member.focus.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-secondary-100 px-2.5 py-1 text-[11px] font-medium text-secondary-900"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </Container>
        </section>

        <section className="border-t border-background-200 bg-background-100 py-14 md:py-20">
          <Container>
            <h2 className="font-heading text-2xl text-foreground-950 md:text-3xl">Research that matters</h2>
            <p className="mt-3 max-w-2xl text-sm text-foreground-600 md:text-base">
              Our faculty work across disciplines, and their research informs how organisations and policy
              makers respond to the biggest questions of the day.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {researchHighlights.map((item) => (
                <div key={item.title} className="rounded-lg border border-background-200 bg-background-50 p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-accent-100 text-accent-700">
                    <i className={`${item.icon} text-2xl`} />
                  </span>
                  <h3 className="mt-5 font-heading text-lg text-foreground-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-600">{item.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}