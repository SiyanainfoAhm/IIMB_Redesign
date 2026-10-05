import Container from "@/components/base/Container";
import SectionHeading from "@/components/base/SectionHeading";
import { campusLife, studentAchievements } from "@/mocks/campus";

export default function CampusLife() {
  return (
    <section className="bg-background-50 py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Student life"
          title="Achievement, community and a campus built for ideas"
          description="Learn, compete, build and belong. Life at IIMB extends well beyond the classroom."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {studentAchievements.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 rounded-lg border border-background-200 bg-background-100 p-5 md:p-6"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-accent-100 text-accent-700">
                <i className={`${item.icon} text-2xl`} />
              </span>
              <div>
                <h3 className="font-heading text-base text-foreground-950">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground-600">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {campusLife.map((item) => (
            <article key={item.id} className="group overflow-hidden rounded-lg border border-background-200 bg-background-50">
              <div className="h-52 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  title={`${item.title} — IIMB campus life`}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg text-foreground-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-600">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}