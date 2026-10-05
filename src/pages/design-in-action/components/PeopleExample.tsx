import { Link } from "react-router-dom";
import { faculty } from "@/mocks/faculty";

const profileStats = [
  { label: "Publications", value: "60+" },
  { label: "Years at IIMB", value: "18" },
  { label: "Doctoral students", value: "9" },
  { label: "Courses taught", value: "4" },
];

export default function PeopleExample() {
  const member = faculty[0];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-5">
        <div className="relative h-80 w-full overflow-hidden rounded-lg bg-background-200 md:h-[32rem]">
          <img
            src={member.image}
            alt={member.name}
            title={`${member.name} — IIMB faculty`}
            className="h-full w-full object-cover object-top"
          />
          <span className="absolute left-4 top-4 rounded-full bg-background-50/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent-700">
            {member.area}
          </span>
        </div>
      </div>

      <div className="lg:col-span-7">
        <h3 className="font-heading text-2xl leading-tight text-foreground-950 md:text-3xl">{member.name}</h3>
        <p className="mt-1.5 text-sm font-semibold uppercase tracking-wide text-accent-700">{member.title}</p>

        <p className="mt-5 text-base leading-relaxed text-foreground-700">{member.bio}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {member.focus.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-background-300 px-3 py-1 text-xs text-foreground-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-7 grid grid-cols-2 gap-4 rounded-lg border border-background-200 bg-background-50 p-5 sm:grid-cols-4">
          {profileStats.map((stat) => (
            <div key={stat.label}>
              <p className="font-heading text-2xl tabular-nums text-foreground-950">{stat.value}</p>
              <p className="mt-1 text-[11px] uppercase tracking-wide text-foreground-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-start gap-4 rounded-lg border border-accent-200 bg-accent-50 p-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent-600 text-background-50">
            <i className="ri-double-quotes-l text-lg" />
          </span>
          <p className="text-sm italic leading-relaxed text-foreground-800">
            &ldquo;Strategy is not a document you write once — it is a discipline you practise every day.&rdquo;
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            to="/faculty"
            className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-accent-700 transition-colors hover:text-accent-800"
          >
            View full faculty profile
            <i className="ri-arrow-right-line text-base" />
          </Link>
          <span className="flex items-center gap-1.5 text-xs text-foreground-500">
            <i className="ri-mail-line" />
            ananya.rao@iimb.ac.in
          </span>
        </div>
      </div>
    </div>
  );
}