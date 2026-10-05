import { useMemo, useState } from "react";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import CompareBar from "@/components/feature/CompareBar";
import Container from "@/components/base/Container";
import PageHeader from "@/components/base/PageHeader";
import SectionHeading from "@/components/base/SectionHeading";
import FeaturedStory from "./components/FeaturedStory";
import NewsCard from "./components/NewsCard";
import NewsletterSignup from "./components/NewsletterSignup";
import { events, newsCategories, newsItems } from "@/mocks/news";
import { Link } from "react-router-dom";

export default function NewsPage() {
  const [active, setActive] = useState("all");

  const [featured, ...others] = newsItems;

  const visible = useMemo(() => {
    if (active === "all") return others;
    return newsItems.filter((item) => item.category === active);
  }, [active, others]);

  return (
    <div className="min-h-screen bg-background-50">
      <Navbar />
      <main className="pb-16">
        <PageHeader
          eyebrow="News & events"
          title="Stories, milestones and moments from IIMB"
          description="Research breakthroughs, alumni journeys, campus life and the events that bring our community together — all in one place."
          crumbs={[{ label: "News & Events", href: "/news" }]}
        />

        <section className="pt-12 md:pt-16">
          <Container>
            <FeaturedStory
              id={featured.id}
              category={featured.category}
              title={featured.title}
              date={featured.date}
              excerpt={featured.excerpt}
              image={featured.image}
              author={featured.author}
              readTime={featured.readTime}
            />
          </Container>
        </section>

        <section className="pt-14 md:pt-20">
          <Container>
            <SectionHeading
              eyebrow="Latest"
              title="All stories"
              description="Filter by the kind of news you care about."
            />

            <div className="mt-8 flex flex-wrap items-center gap-1 rounded-full border border-background-300 bg-background-100 px-1 py-1">
              {newsCategories.map((category) => {
                const isActive = category.id === active;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActive(category.id)}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary-700 text-background-50"
                        : "text-foreground-600 hover:bg-background-50 hover:text-foreground-900"
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>

            <p className="mt-5 text-sm text-foreground-500">
              Showing <strong className="font-semibold text-foreground-900">{visible.length}</strong>{" "}
              {visible.length === 1 ? "story" : "stories"}
            </p>

            {visible.length === 0 ? (
              <div className="mt-8 rounded-lg border border-background-200 bg-background-100 p-10 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-secondary-100 text-secondary-900">
                  <i className="ri-newspaper-line text-xl" />
                </span>
                <p className="mt-4 text-sm text-foreground-600">
                  No stories in this category yet. Try another filter.
                </p>
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((item) => (
                  <NewsCard
                    key={item.id}
                    id={item.id}
                    category={item.category}
                    title={item.title}
                    date={item.date}
                    excerpt={item.excerpt}
                    image={item.image}
                    readTime={item.readTime}
                  />
                ))}
              </div>
            )}
          </Container>
        </section>

        <section id="events" className="mt-16 scroll-mt-28 border-y border-background-200 bg-background-100 py-14 md:mt-20 md:py-20">
          <Container>
            <SectionHeading
              eyebrow="Events"
              title="Upcoming events"
              description="Information sessions, conferences and open days at IIMB."
              action={
                <Link
                  to="/events"
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-foreground-300 px-5 py-3 text-sm font-semibold text-foreground-900 transition-colors hover:border-primary-500 hover:text-primary-700"
                >
                  View all events
                  <i className="ri-arrow-right-line text-base" />
                </Link>
              }
            />
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
              {events.map((event) => (
                <article
                  key={event.id}
                  className="flex items-start gap-5 rounded-lg border border-background-200 bg-background-50 p-5 md:p-6"
                >
                  <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-md bg-primary-800 text-background-50">
                    <span className="font-heading text-xl leading-none">{event.day}</span>
                    <span className="text-[10px] uppercase tracking-wide text-primary-200">{event.month}</span>
                  </div>
                  <div className="flex-1">
                    <span className="rounded-full bg-secondary-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-secondary-900">
                      {event.tag}
                    </span>
                    <h3 className="mt-2 font-heading text-lg leading-snug text-foreground-950">{event.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-600">{event.description}</p>
                    <p className="mt-3 flex items-center gap-2 text-xs text-foreground-500">
                      <i className="ri-time-line" />
                      {event.meta}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="pt-14 md:pt-20">
          <Container>
            <NewsletterSignup />
          </Container>
        </section>

        <section className="pt-14 md:pt-20">
          <Container>
            <div className="grid grid-cols-1 gap-10 rounded-lg border border-background-200 bg-background-50 p-6 md:p-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2 className="font-heading text-2xl text-foreground-950 md:text-3xl">
                  Keep exploring the IIMB community
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground-600">
                  We share research highlights, admission reminders and campus moments with our community. You can
                  also hear directly from the faculty leading our programmes.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/faculty"
                    className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary-700 px-5 py-3 text-sm font-semibold text-background-50 transition-colors hover:bg-primary-800"
                  >
                    Meet our faculty
                    <i className="ri-arrow-right-line text-base" />
                  </Link>
                  <Link
                    to="/about#contact"
                    className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-background-300 px-5 py-3 text-sm font-semibold text-foreground-900 transition-colors hover:border-primary-500 hover:text-primary-700"
                  >
                    Media enquiries
                    <i className="ri-arrow-right-line text-base" />
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="rounded-lg border border-background-200 bg-background-100 p-6">
                  <h3 className="font-heading text-lg text-foreground-950">Media relations</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground-600">
                    Journalists looking for expert comment, faculty interviews or campus access can reach the
                    Communications Office.
                  </p>
                  <ul className="mt-5 space-y-3 text-sm text-foreground-700">
                    <li className="flex items-center gap-2">
                      <i className="ri-mail-line text-accent-600" />
                      media@iimb.ac.in
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-phone-line text-accent-600" />
                      +91 80 2699 3000
                    </li>
                  </ul>
                </div>
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