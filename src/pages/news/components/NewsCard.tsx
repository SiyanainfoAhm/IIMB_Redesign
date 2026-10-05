import { Link } from "react-router-dom";

interface NewsCardProps {
  id: string;
  category: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  readTime: string;
}

export default function NewsCard({ id, category, title, date, excerpt, image, readTime }: NewsCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-background-200 bg-background-50">
      <Link to={`/news/${id}`} className="relative block h-44 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          title={`${title} — IIMB news`}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-background-50/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent-700">
          {category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground-500">
          <span>{date}</span>
          <span className="h-1 w-1 rounded-full bg-foreground-300" />
          <span>{readTime}</span>
        </div>
        <h3 className="mt-3 font-heading text-lg leading-snug text-foreground-950">
          <Link to={`/news/${id}`} className="transition-colors hover:text-accent-700">
            {title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground-600">{excerpt}</p>
        <Link
          to={`/news/${id}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 transition-colors hover:text-accent-800"
        >
          Read story
          <i className="ri-arrow-right-line" />
        </Link>
      </div>
    </article>
  );
}