import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import PageHeader from "@/components/base/PageHeader";
import Container from "@/components/base/Container";
import ExampleFrame from "@/pages/design-in-action/components/ExampleFrame";
import CompareExample from "@/pages/design-in-action/components/CompareExample";
import StoryExample from "@/pages/design-in-action/components/StoryExample";
import PeopleExample from "@/pages/design-in-action/components/PeopleExample";

const colourRoles = [
  { name: "Background", token: "background-50", className: "bg-background-50 border border-background-300" },
  { name: "Primary", token: "primary-500", className: "bg-primary-500" },
  { name: "Accent", token: "accent-500", className: "bg-accent-500" },
  { name: "Secondary", token: "secondary-500", className: "bg-secondary-500" },
  { name: "Foreground", token: "foreground-950", className: "bg-foreground-950" },
];

const sharedComponents = [
  "Container",
  "Section heading",
  "Pill tabs",
  "Cards",
  "Value badges",
  "Buttons",
  "Meta rows",
  "Quote callouts",
];

const throughLines = [
  {
    icon: "ri-palette-line",
    title: "One palette, five roles",
    description:
      "Every example pulls from the same five roles — pine for actions, maroon for accents, ochre for tags, ivory for surfaces and warm ink for type. Nothing invents its own colour.",
  },
  {
    icon: "ri-text",
    title: "Two typefaces, clear hierarchy",
    description:
      "Fraunces carries every headline and figure; Manrope handles all body copy, labels and controls. A data table, a feature story and a profile all sound like the same institution.",
  },
  {
    icon: "ri-layout-masonry-line",
    title: "One rhythm and silhouette",
    description:
      "The same container width, spacing scale, corner radii and component patterns sit underneath all three — so wildly different content still shares a recognisable shape.",
  },
];

export default function DesignInAction() {
  return (
    <div className="min-h-screen bg-background-50">
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Design system in practice"
          title="One system, three very different kinds of content"
          description="The test of a design system is not how it looks on a single hero — it is whether it holds together when the content changes completely. Below, the same IIMB design system carries three opposite types of content: a data-dense comparison, a long-form editorial story, and a human profile."
          crumbs={[{ label: "Design in Action", href: "/design-in-action" }]}
        />

        <section className="border-b border-background-200 bg-background-50 py-12 md:py-16">
          <Container>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">
              <span className="h-px w-6 bg-accent-500/50" />
              The shared DNA
            </div>
            <h2 className="mt-3 max-w-2xl font-heading text-2xl leading-tight text-foreground-950 md:text-3xl">
              What stays constant no matter what the content becomes
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="rounded-lg border border-background-200 bg-background-100 p-6">
                <h3 className="font-heading text-lg text-foreground-950">Five colour roles</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-600">
                  The whole site is built from these — never bespoke colours.
                </p>
                <div className="mt-5 grid grid-cols-5 gap-2">
                  {colourRoles.map((role) => (
                    <div key={role.token}>
                      <span className={`block h-14 w-full rounded-md ${role.className}`} />
                      <span className="mt-2 block text-[10px] font-medium uppercase tracking-wide text-foreground-500">
                        {role.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-background-200 bg-background-100 p-6">
                <h3 className="font-heading text-lg text-foreground-950">Two typefaces</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-600">
                  A serif voice for expression, a sans for clarity.
                </p>
                <div className="mt-5 space-y-4">
                  <div className="rounded-md border border-background-200 bg-background-50 p-4">
                    <p className="text-[10px] font-medium uppercase tracking-wide text-foreground-500">Fraunces · headings</p>
                    <p className="mt-1 font-heading text-xl text-foreground-950">Rigour meets imagination</p>
                  </div>
                  <div className="rounded-md border border-background-200 bg-background-50 p-4">
                    <p className="text-[10px] font-medium uppercase tracking-wide text-foreground-500">Manrope · body &amp; UI</p>
                    <p className="mt-1 text-sm text-foreground-700">
                      Readable at length and crisp in controls, tables and labels.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-background-200 bg-background-100 p-6">
                <h3 className="font-heading text-lg text-foreground-950">Shared components &amp; tokens</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-600">
                  A small kit of parts reused across every content type.
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {sharedComponents.map((component) => (
                    <span
                      key={component}
                      className="rounded-full border border-background-300 bg-background-50 px-3 py-1 text-xs text-foreground-600"
                    >
                      {component}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-primary-700 px-3 py-2 text-xs font-semibold text-background-50">
                    <i className="ri-check-line" />
                    Primary action
                  </span>
                  <span className="inline-flex items-center rounded-md border border-foreground-300 px-3 py-2 text-xs font-semibold text-foreground-900">
                    Secondary action
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <ExampleFrame
          index="01"
          type="Data-dense"
          title="A programme comparison that has to stay legible at scale"
          description="Filters, a sortable table and dozens of numbers — the most structural content IIMB publishes. Density is handled with the same surfaces, the same pill tabs and the same accent numbers used everywhere else."
          primitives={["Container", "Pill tabs", "Data table", "Value badges", "tabular-nums", "Sticky header"]}
          tone="tint"
        >
          <CompareExample />
        </ExampleFrame>

        <ExampleFrame
          index="02"
          type="Long-form editorial"
          title="A research story that has to breathe"
          description="The opposite extreme: no table, no chrome — just a lead image, a headline and a measured column of prose. The typographic hierarchy and the maroon accent do all the work, so it still reads unmistakably as IIMB."
          primitives={["Container", "Lead image", "Editorial measure", "Pull quote", "Meta row", "Stat band"]}
          tone="plain"
        >
          <StoryExample />
        </ExampleFrame>

        <ExampleFrame
          index="03"
          type="People & profile"
          title="A faculty profile that has to feel human"
          description="Portrait-led and personal. The same cards, tags and stat grid simply re-compose around a person — proving the system scales from a spreadsheet to a face without breaking character."
          primitives={["Container", "Portrait card", "Focus tags", "Stat band", "Quote callout", "CTA link"]}
          tone="tint"
        >
          <PeopleExample />
        </ExampleFrame>

        <section className="bg-background-50 py-16 md:py-24">
          <Container>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">
              <span className="h-px w-6 bg-accent-500/50" />
              The through-line
            </div>
            <h2 className="mt-3 max-w-2xl font-heading text-2xl leading-tight text-foreground-950 md:text-3xl">
              Why three opposite pages still read as one institution
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {throughLines.map((line) => (
                <article key={line.title} className="flex flex-col rounded-lg border border-background-200 bg-background-100 p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-accent-100 text-accent-700">
                    <i className={`${line.icon} text-xl`} />
                  </span>
                  <h3 className="mt-4 font-heading text-lg text-foreground-950">{line.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-600">{line.description}</p>
                </article>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 rounded-lg border border-secondary-200 bg-secondary-50 p-6 sm:flex-row sm:items-center sm:justify-between md:p-7">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-secondary-500 text-background-50">
                  <i className="ri-focus-3-line text-xl" />
                </span>
                <div>
                  <h3 className="font-heading text-lg text-foreground-950">Change the content, keep the character</h3>
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-foreground-600">
                    The palette can be re-seeded and the typefaces swapped — these three pages will still hold their
                    hierarchy, contrast and identity, because they are built from roles and tokens, not from one-off
                    styles.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}