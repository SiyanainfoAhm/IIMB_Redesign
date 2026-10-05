import { Link } from "react-router-dom";
import Container from "@/components/base/Container";
import SectionHeading from "@/components/base/SectionHeading";
import { journeyTiles } from "@/mocks/navigation";

export default function QuickNav() {
  return (
    <section className="border-b border-background-200 bg-background-100 py-14 md:py-20">
      <Container>
        <SectionHeading
          eyebrow="Start here"
          title="What are you looking for?"
          description="Jump straight to the journeys people come to IIMB for — no digging required."
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {journeyTiles.map((tile) => (
            <Link
              key={tile.title}
              to={tile.href}
              className="group flex items-start gap-4 rounded-lg border border-background-200 bg-background-50 p-5 transition-colors hover:border-primary-300 hover:bg-primary-50 md:p-6"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary-100 text-primary-700 transition-colors group-hover:bg-primary-600 group-hover:text-background-50">
                <i className={`${tile.icon} text-2xl`} />
              </span>
              <span className="flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="font-heading text-lg text-foreground-950">{tile.title}</span>
                  <i className="ri-arrow-right-line text-lg text-foreground-300 transition-transform group-hover:translate-x-1 group-hover:text-accent-600" />
                </span>
                <span className="mt-1.5 block text-sm leading-relaxed text-foreground-600">{tile.description}</span>
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}