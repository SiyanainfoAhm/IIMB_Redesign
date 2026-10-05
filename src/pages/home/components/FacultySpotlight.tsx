import { Link } from "react-router-dom";
import Container from "@/components/base/Container";
import SectionHeading from "@/components/base/SectionHeading";
import { faculty, researchHighlights } from "@/mocks/faculty";

export default function FacultySpotlight() {
  return (
    <section className="bg-background-50 py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Faculty & research"
          title="Insight from our faculty"
          description="IIMB's scholars advance knowledge and shape practice across strategy, finance, analytics and more."
          action={
            <Link
              to="/faculty"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-foreground-300 px-5 py-3 text-sm font-semibold text-foreground-900 transition-colors hover:border-primary-500 hover:text-primary-700"
            >
              Browse faculty & research
              <i className="ri-arrow-right-line text-base" />
            </Link>
          }
        />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {faculty.map((member) => (
            <article key={member.id} className="group flex flex-col">
              <div className="relative h-60 w-full overflow-hidden rounded-lg bg-background-200">
                <img
                  src={member.image}
                  alt={member.name}
                  title={`${member.name} — IIMB faculty`}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 font-heading text-lg text-foreground-950">{member.name}</h3>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-accent-700">{member.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground-600">{member.bio}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {member.focus.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-background-300 px-2.5 py-0.5 text-[11px] text-foreground-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 rounded-lg border border-background-200 bg-background-100 p-6 md:grid-cols-3 md:p-8">
          {researchHighlights.map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-accent-100 text-accent-700">
                <i className={`${item.icon} text-xl`} />
              </span>
              <div>
                <h3 className="font-heading text-base text-foreground-950">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}