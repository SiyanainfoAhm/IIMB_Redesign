import { Link } from "react-router-dom";
import Container from "@/components/base/Container";
import SectionHeading from "@/components/base/SectionHeading";
import { advantagePoints } from "@/mocks/institution";

export default function Advantage() {
  return (
    <section className="bg-background-50 py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="An introduction to IIMB"
              title="The IIMB advantage"
              description="A leading management institution in the heart of Bengaluru, IIMB blends academic rigour with real-world practice. Our community of scholars, students and alumni works on the questions that shape industries, policy and society."
            />
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-accent-700 transition-colors hover:text-accent-800"
            >
              About IIMB
              <i className="ri-arrow-right-line text-base" />
            </Link>
          </div>

          <div className="lg:col-span-7">
            <div className="flex flex-col divide-y divide-background-200 border-y border-background-200">
              {advantagePoints.map((point, index) => (
                <div key={point.title} className="flex items-start gap-5 py-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-secondary-100 text-secondary-800">
                    <i className={`${point.icon} text-2xl`} />
                  </span>
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="font-heading text-sm text-accent-600">0{index + 1}</span>
                      <h3 className="font-heading text-xl text-foreground-950">{point.title}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-600">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}