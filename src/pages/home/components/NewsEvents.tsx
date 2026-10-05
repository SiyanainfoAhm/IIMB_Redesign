import { Link } from "react-router-dom";
import Container from "@/components/base/Container";
import SectionHeading from "@/components/base/SectionHeading";
import { events, newsItems } from "@/mocks/news";

export default function NewsEvents() {
  const [featured, ...rest] = newsItems;

  return (
    <section id="news" className="scroll-mt-28 bg-background-100 py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="News & events"
          title="What's happening at IIMB"
          description="Stories from our community, and the moments to mark in your calendar."
          action={
            <Link
              to="/news"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-background-300 px-5 py-3 text-sm font-semibold text-foreground-900 transition-colors hover:border-primary-500 hover:text-primary-700"
            >
              View all news
              <i className="ri-arrow-right-line text-base" />
            </Link>
          }
        />

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <article className="group overflow-hidden rounded-lg border border-background-200 bg-background-50">
              <Link to={`/news/${featured.id}`} className="relative block h-64 w-full overflow-hidden md:h-72">
                <img
                  src={featured.image}
                  alt={featured.title}
                  title={featured.title}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-accent-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-background-50">
                  {featured.category}
                </span>
              </Link>
              <div className="p-6">
                <p className="text-xs text-foreground-500">{featured.date}</p>
                <h3 className="mt-2 font-heading text-xl leading-snug text-foreground-950 md:text-2xl">
                  <Link to={`/news/${featured.id}`} className="transition-colors hover:text-accent-700">
                    {featured.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground-600">{featured.excerpt}</p>
                <Link
                  to={`/news/${featured.id}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 transition-colors hover:text-accent-800"
                >
                  Read story
                  <i className="ri-arrow-right-line" />
                </Link>
              </div>
            </article>

            <div className="mt-6 flex flex-col divide-y divide-background-200 overflow-hidden rounded-lg border border-background-200 bg-background-50">
              {rest.map((item) => (
                <Link
                  key={item.id}
                  to={`/news/${item.id}`}
                  className="group flex items-center gap-4 p-4 transition-colors hover:bg-background-100"
                >
                  <div className="h-16 w-20 shrink-0 overflow-hidden rounded-md bg-background-200">
                    <img
                      src={item.image}
                      alt={item.title}
                      title={item.title}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-accent-700">
                      {item.category}
                    </span>
                    <h4 className="mt-1 text-sm font-medium leading-snug text-foreground-900 group-hover:text-accent-700">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs text-foreground-500">{item.date}</p>
                  </div>
                  <i className="ri-arrow-right-line text-lg text-foreground-300 transition-transform group-hover:translate-x-1 group-hover:text-accent-600" />
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-lg border border-background-200 bg-background-50 p-6 md:p-7">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-xl text-foreground-950">Upcoming events</h3>
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-100 text-primary-700">
                  <i className="ri-calendar-event-line text-lg" />
                </span>
              </div>
              <ul className="mt-6 space-y-5">
                {events.map((event) => (
                  <li key={event.id} className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-md bg-primary-800 text-background-50">
                      <span className="font-heading text-lg leading-none">{event.day}</span>
                      <span className="text-[10px] uppercase tracking-wide text-primary-200">{event.month}</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-accent-700">
                        {event.tag}
                      </span>
                      <h4 className="mt-0.5 text-sm font-medium leading-snug text-foreground-900">{event.title}</h4>
                      <p className="mt-1 text-xs text-foreground-500">{event.meta}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                to="/events"
                className="mt-7 inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border border-foreground-300 px-5 py-3 text-sm font-semibold text-foreground-900 transition-colors hover:border-primary-500 hover:text-primary-700"
              >
                View all events
                <i className="ri-arrow-right-line text-base" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}