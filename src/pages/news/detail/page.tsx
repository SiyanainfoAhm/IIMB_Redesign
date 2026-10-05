import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import CompareBar from "@/components/feature/CompareBar";
import Container from "@/components/base/Container";
import NewsCard from "@/pages/news/components/NewsCard";
import { newsItems } from "@/mocks/news";

export default function NewsDetailPage() {
  const { id } = useParams();
  const article = newsItems.find((item) => item.id === id);

  if (!article) {
    return (
      <div className="flex min-h-screen flex-col bg-background-50">
        <Navbar />
        <main className="flex flex-1 items-center justify-center px-4 py-32">
          <div className="w-full max-w-lg rounded-lg border border-background-200 bg-background-100 p-10 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-md bg-secondary-100 text-secondary-900">
              <i className="ri-file-search-line text-2xl" />
            </span>
            <h1 className="mt-5 font-heading text-2xl text-foreground-950">Story not found</h1>
            <p className="mt-3 text-sm leading-relaxed text-foreground-600">
              The article you are looking for may have been moved or is no longer available.
            </p>
            <Link
              to="/news"
              className="mt-6 inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary-700 px-5 py-3 text-sm font-semibold text-background-50 transition-colors hover:bg-primary-800"
            >
              <i className="ri-arrow-left-line text-base" />
              Back to all news
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const related = newsItems
    .filter((item) => item.id !== article.id && item.category === article.category)
    .slice(0, 3);

  const fallbackRelated = newsItems.filter((item) => item.id !== article.id).slice(0, 3);
  const relatedItems = related.length > 0 ? related : fallbackRelated;

  return (
    <div className="min-h-screen bg-background-50">
      <Navbar />
      <main className="pb-16">
        <article>
          <header className="border-b border-background-200 bg-background-100 pb-10 pt-28 lg:pt-36">
            <Container>
              <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-xs text-foreground-500">
                <Link to="/" className="transition-colors hover:text-accent-700">
                  Home
                </Link>
                <i className="ri-arrow-right-s-line" />
                <Link to="/news" className="transition-colors hover:text-accent-700">
                  News & Events
                </Link>
                <i className="ri-arrow-right-s-line" />
                <span className="text-foreground-700">{article.category}</span>
              </nav>

              <span className="inline-flex rounded-full bg-accent-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent-900">
                {article.category}
              </span>
              <h1 className="mt-4 max-w-4xl font-heading text-3xl leading-tight text-foreground-950 md:text-4xl lg:text-5xl">
                {article.title}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-foreground-600">
                <span className="flex items-center gap-2">
                  <i className="ri-user-line text-accent-600" />
                  {article.author}
                </span>
                <span className="h-1 w-1 rounded-full bg-foreground-300" />
                <span>{article.date}</span>
                <span className="h-1 w-1 rounded-full bg-foreground-300" />
                <span className="flex items-center gap-2">
                  <i className="ri-time-line" />
                  {article.readTime}
                </span>
              </div>
            </Container>
          </header>

          <div className="mt-10 md:mt-14">
            <Container>
              <div className="h-64 w-full overflow-hidden rounded-lg border border-background-200 md:h-[440px]">
                <img
                  src={article.image}
                  alt={article.title}
                  title={`${article.title} — IIMB news`}
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </Container>
          </div>

          <Container className="mt-10 md:mt-14">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <div className="space-y-5">
                  {article.body.map((paragraph, index) => (
                    <p
                      key={`${article.id}-p-${index}`}
                      className={`text-base leading-relaxed text-foreground-700 ${index === 0 ? "text-lg font-medium text-foreground-900" : ""}`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-10 flex flex-col gap-4 border-t border-background-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <Link
                    to="/news"
                    className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-foreground-800 transition-colors hover:text-accent-700"
                  >
                    <i className="ri-arrow-left-line" />
                    Back to all news
                  </Link>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-foreground-500">Share</span>
                    {["ri-linkedin-fill", "ri-twitter-x-fill", "ri-mail-line"].map((icon) => (
                      <span
                        key={icon}
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-background-200 text-foreground-600 transition-colors hover:border-accent-500 hover:text-accent-700"
                      >
                        <i className={icon} />
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <aside className="lg:col-span-4">
                <div className="rounded-lg border border-background-200 bg-background-100 p-6">
                  <h2 className="font-heading text-lg text-foreground-950">About the story</h2>
                  <dl className="mt-5 space-y-4 text-sm">
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-foreground-500">Category</dt>
                      <dd className="font-medium text-foreground-900">{article.category}</dd>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-foreground-500">Published</dt>
                      <dd className="font-medium text-foreground-900">{article.date}</dd>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-foreground-500">Source</dt>
                      <dd className="text-right font-medium text-foreground-900">{article.author}</dd>
                    </div>
                  </dl>
                  <Link
                    to="/news#events"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border border-background-300 px-5 py-3 text-sm font-semibold text-foreground-900 transition-colors hover:border-primary-500 hover:text-primary-700"
                  >
                    See upcoming events
                    <i className="ri-calendar-event-line text-base" />
                  </Link>
                </div>

                <div className="mt-6 rounded-lg border border-background-200 bg-secondary-100/60 p-6">
                  <h2 className="font-heading text-lg text-foreground-950">Considering IIMB?</h2>
                  <p className="mt-3 text-sm leading-relaxed text-secondary-900">
                    Explore programmes, check your eligibility and compare options side by side.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link
                      to="/admissions"
                      className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary-700 px-4 py-2.5 text-sm font-semibold text-background-50 transition-colors hover:bg-primary-800"
                    >
                      Admissions
                    </Link>
                    <Link
                      to="/compare"
                      className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-secondary-500 px-4 py-2.5 text-sm font-semibold text-background-50 transition-colors hover:bg-secondary-600"
                    >
                      Compare
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </Container>
        </article>

        <section className="mt-16 border-t border-background-200 bg-background-100 py-14 md:mt-20 md:py-20">
          <Container>
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-heading text-2xl text-foreground-950 md:text-3xl">More stories</h2>
                <p className="mt-3 max-w-xl text-sm text-foreground-600">
                  Continue reading from across the IIMB community.
                </p>
              </div>
              <Link
                to="/news"
                className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-accent-700 transition-colors hover:text-accent-800"
              >
                View all news
                <i className="ri-arrow-right-line" />
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedItems.map((item) => (
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
          </Container>
        </section>
      </main>
      <Footer />
      <CompareBar />
    </div>
  );
}