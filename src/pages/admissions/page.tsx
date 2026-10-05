import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import CompareBar from "@/components/feature/CompareBar";
import Container from "@/components/base/Container";
import PageHeader from "@/components/base/PageHeader";
import SectionHeading from "@/components/base/SectionHeading";
import DeadlineTimeline from "./components/DeadlineTimeline";
import EligibilityChecker from "./components/EligibilityChecker";

const requirements = [
  {
    icon: "ri-file-text-line",
    title: "Academic records",
    text: "Transcripts and degree certificates from every institution you have attended.",
  },
  {
    icon: "ri-award-line",
    title: "Test scores",
    text: "A valid CAT, GMAT, GRE or UGC-NET score where the programme requires one.",
  },
  {
    icon: "ri-user-star-line",
    title: "Recommendations",
    text: "One or two referees who can speak to your work and potential.",
  },
  {
    icon: "ri-quill-pen-line",
    title: "Essays & CV",
    text: "A short statement of purpose, a current CV and any role-specific questions.",
  },
];

export default function AdmissionsPage() {
  return (
    <div className="min-h-screen bg-background-50">
      <Navbar />
      <main className="pb-16">
        <PageHeader
          eyebrow="Admissions"
          title="Your admissions journey, step by step"
          description="Track every deadline on the way to joining IIMB, then use the quick eligibility checker to see where you stand before you apply."
          crumbs={[{ label: "Admissions", href: "/admissions" }]}
        />

        <section className="pt-12 md:pt-16">
          <Container>
            <SectionHeading
              eyebrow="Step 1"
              title="Key deadlines & milestones"
              description="Choose a programme to see its admissions calendar. Tap any milestone to see what happens at that stage."
            />
            <div className="mt-10">
              <DeadlineTimeline />
            </div>
          </Container>
        </section>

        <section className="mt-16 border-y border-background-200 bg-background-100 py-14 md:py-20">
          <Container>
            <SectionHeading
              eyebrow="Step 2"
              title="Check your eligibility"
              description="Answer three quick questions and get an instant read on whether you meet the published criteria."
            />
            <div className="mt-10">
              <EligibilityChecker />
            </div>
          </Container>
        </section>

        <section className="pt-14 md:pt-20">
          <Container>
            <SectionHeading
              eyebrow="Step 3"
              title="What you'll need to apply"
              description="Gather these early so you can submit comfortably before the deadline."
            />
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {requirements.map((item) => (
                <div key={item.title} className="rounded-lg border border-background-200 bg-background-50 p-5 md:p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-secondary-100 text-secondary-900">
                    <i className={`${item.icon} text-xl`} />
                  </span>
                  <h3 className="mt-4 font-heading text-lg text-foreground-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-600">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 rounded-lg border border-background-200 bg-background-100 p-5 md:p-6">
              <span className="flex items-center gap-2 text-sm font-semibold text-foreground-900">
                <i className="ri-compass-3-line text-accent-600" />
                Not sure which programme fits?
              </span>
              <Link
                to="/compare"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-background-300 bg-background-50 px-4 py-2.5 text-sm font-semibold text-foreground-900 transition-colors hover:border-primary-500 hover:text-primary-700"
              >
                Compare up to 3 programmes
                <i className="ri-scales-3-line text-base" />
              </Link>
              <Link
                to="/news#events"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-background-300 bg-background-50 px-4 py-2.5 text-sm font-semibold text-foreground-900 transition-colors hover:border-primary-500 hover:text-primary-700"
              >
                Attend an info session
                <i className="ri-calendar-event-line text-base" />
              </Link>
            </div>
          </Container>
        </section>

        <section className="mt-16 md:mt-20">
          <Container>
            <div className="flex flex-col items-start justify-between gap-6 rounded-lg bg-primary-950 p-6 md:flex-row md:items-center md:p-10">
              <div>
                <h2 className="font-heading text-2xl text-background-50 md:text-3xl">Ready to begin?</h2>
                <p className="mt-3 max-w-xl text-sm text-primary-200">
                  Start your application on the admissions portal, or talk to our team if you have questions along the
                  way.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/programmes"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-accent-600 px-6 py-3.5 text-sm font-semibold text-background-50 transition-colors hover:bg-accent-700"
                >
                  Browse programmes
                  <i className="ri-arrow-right-line text-base" />
                </Link>
                <Link
                  to="/about#contact"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-primary-700 px-6 py-3.5 text-sm font-semibold text-background-50 transition-colors hover:bg-primary-900"
                >
                  Contact admissions
                  <i className="ri-mail-line text-base" />
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <CompareBar />
    </div>
  );
}