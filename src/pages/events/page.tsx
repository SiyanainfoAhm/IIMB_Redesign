import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import CompareBar from "@/components/feature/CompareBar";
import Container from "@/components/base/Container";
import PageHeader from "@/components/base/PageHeader";
import UpcomingEvents from "./components/UpcomingEvents";
import PastHighlights from "./components/PastHighlights";
import SpeakerLineup from "./components/SpeakerLineup";
import SavedEvents from "./components/SavedEvents";

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background-50">
      <Navbar />
      <main className="pb-16">
        <PageHeader
          eyebrow="Events"
          title="Where the IIMB community comes together"
          description="Conferences, research colloquia, admissions sessions and campus open days — explore what's coming up and revisit the moments that mattered."
          crumbs={[{ label: "Events", href: "/events" }]}
        />

        <Container>
          <SavedEvents />
        </Container>

        <Container>
          <UpcomingEvents />
        </Container>

        <div className="bg-background-100">
          <Container>
            <PastHighlights />
          </Container>
        </div>

        <Container>
          <SpeakerLineup />
        </Container>

        <Container>
          <section className="pt-14 md:pt-20">
            <div className="flex flex-col items-start justify-between gap-6 rounded-lg border border-background-200 bg-primary-950 p-7 md:flex-row md:items-center md:p-10">
              <div>
                <h2 className="font-heading text-2xl text-background-50 md:text-3xl">
                  Never miss an IIMB event
                </h2>
                <p className="mt-3 max-w-xl text-sm text-primary-200">
                  Keep up with research highlights, admission reminders and campus moments in our monthly
                  newsletter.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/news"
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-accent-600 px-6 py-3.5 text-sm font-semibold text-background-50 transition-colors hover:bg-accent-700"
                >
                  <i className="ri-mail-send-line text-base" />
                  Subscribe to updates
                </Link>
                <Link
                  to="/admissions"
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-primary-700 px-6 py-3.5 text-sm font-semibold text-background-50 transition-colors hover:border-secondary-400 hover:text-secondary-300"
                >
                  Admissions
                  <i className="ri-arrow-right-line text-base" />
                </Link>
              </div>
            </div>
          </section>
        </Container>
      </main>
      <Footer />
      <CompareBar />
    </div>
  );
}