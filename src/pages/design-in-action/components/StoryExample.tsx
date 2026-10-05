import { Link } from "react-router-dom";
import { newsItems } from "@/mocks/news";

export default function StoryExample() {
  const story = newsItems[2];
  const [lead, ...rest] = story.body;

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="relative h-64 w-full overflow-hidden rounded-lg bg-background-200 md:h-96">
        <img
          src={story.image}
          alt={story.title}
          title={story.title}
          className="h-full w-full object-cover object-top"
        />
        <span className="absolute left-4 top-4 rounded-full bg-accent-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-background-50">
          {story.category}
        </span>
      </div>

      <article className="mx-auto mt-8 max-w-3xl md:mt-10">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs uppercase tracking-wide text-foreground-500">
          <span className="flex items-center gap-1.5">
            <i className="ri-user-line" />
            {story.author}
          </span>
          <span className="flex items-center gap-1.5">
            <i className="ri-calendar-line" />
            {story.date}
          </span>
          <span className="flex items-center gap-1.5">
            <i className="ri-time-line" />
            {story.readTime}
          </span>
        </div>

        <h3 className="mt-4 font-heading text-2xl leading-tight text-foreground-950 md:text-4xl">{story.title}</h3>

        <p className="mt-6 text-base leading-relaxed text-foreground-800 md:text-lg">{lead}</p>

        <div className="mt-8 border-l-2 border-accent-500 pl-5">
          <p className="font-heading text-lg italic leading-snug text-foreground-900 md:text-xl">
            &ldquo;Capital markets are slowly learning to price climate risk — the question is how fast, and at what
            cost to those least able to bear it.&rdquo;
          </p>
          <p className="mt-2 text-xs uppercase tracking-wide text-foreground-500">Centre for Climate Finance</p>
        </div>

        <div className="mt-8 space-y-5">
          {rest.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="text-sm leading-relaxed text-foreground-700 md:text-base">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-9 grid grid-cols-1 gap-4 rounded-lg border border-background-200 bg-background-100 p-6 sm:grid-cols-3">
          <div>
            <p className="font-heading text-2xl tabular-nums text-accent-700">₹120 cr</p>
            <p className="mt-1 text-[11px] uppercase tracking-wide text-foreground-500">Research commitment</p>
          </div>
          <div>
            <p className="font-heading text-2xl tabular-nums text-accent-700">14</p>
            <p className="mt-1 text-[11px] uppercase tracking-wide text-foreground-500">Faculty involved</p>
          </div>
          <div>
            <p className="font-heading text-2xl tabular-nums text-accent-700">6</p>
            <p className="mt-1 text-[11px] uppercase tracking-wide text-foreground-500">Partner institutions</p>
          </div>
        </div>

        <Link
          to={`/news/${story.id}`}
          className="mt-8 inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary-700 px-5 py-3 text-sm font-semibold text-background-50 transition-colors hover:bg-primary-800"
        >
          Read the full story
          <i className="ri-arrow-right-line text-base" />
        </Link>
      </article>
    </div>
  );
}