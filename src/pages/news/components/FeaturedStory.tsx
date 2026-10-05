import { Link } from "react-router-dom";

interface FeaturedStoryProps {
  id: string;
  category: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  author: string;
  readTime: string;
}

export default function FeaturedStory({
  id,
  category,
  title,
  date,
  excerpt,
  image,
  author,
  readTime,
}: FeaturedStoryProps) {
  return (
    <article className="group grid grid-cols-1 overflow-hidden rounded-lg border border-background-200 bg-background-50 lg:grid-cols-2">
      <Link to={`/news/${id}`} className="relative h-64 w-full overflow-hidden lg:h-full lg:min-h-[380px]">
        <img
          src={image}
          alt={title}
          title={`${title} — IIMB featured story`}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-accent-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-background-50">
          Featured · {category}
        </span>
      </Link>
      <div className="flex flex-col justify-center p-6 md:p-10">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground-500">
          <span>{date}</span>
          <span className="h-1 w-1 rounded-full bg-foreground-300" />
          <span>{readTime}</span>
        </div>
        <h2 className="mt-4 font-heading text-2xl leading-tight text-foreground-950 md:text-3xl">
          <Link to={`/news/${id}`} className="transition-colors hover:text-accent-700">
            {title}
          </Link>
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-foreground-600 md:text-base">{excerpt}</p>
        <p className="mt-5 flex items-center gap-2 text-xs text-foreground-500">
          <i className="ri-user-line" />
          {author}
        </p>
        <Link
          to={`/news/${id}`}
          className="mt-6 inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-md bg-primary-700 px-5 py-3 text-sm font-semibold text-background-50 transition-colors hover:bg-primary-800"
        >
          Read the full story
          <i className="ri-arrow-right-line text-base" />
        </Link>
      </div>
    </article>
  );
}