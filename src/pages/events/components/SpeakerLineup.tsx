import { speakers } from "@/mocks/events";

export default function SpeakerLineup() {
  return (
    <section className="border-y border-background-200 bg-background-100 py-14 md:py-20">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">
            <span className="h-px w-6 bg-accent-500/50" />
            Speaker line-up
          </div>
          <h2 className="font-heading text-2xl text-foreground-950 md:text-3xl">
            The voices on our stage
          </h2>
          <p className="mt-3 max-w-xl text-sm text-foreground-600">
            Faculty, founders and industry leaders who will share their thinking across this season's events.
          </p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {speakers.map((speaker) => (
          <article
            key={speaker.id}
            className="group flex flex-col overflow-hidden rounded-lg border border-background-200 bg-background-50"
          >
            <div className="relative h-60 w-full overflow-hidden">
              <img
                src={speaker.image}
                alt={speaker.name}
                title={`${speaker.name} — IIMB speaker`}
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 rounded-full bg-background-50/95 px-3 py-1 text-[11px] font-semibold text-accent-700">
                {speaker.event}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-heading text-lg leading-snug text-foreground-950">{speaker.name}</h3>
              <p className="mt-1 text-sm font-medium text-foreground-700">{speaker.role}</p>
              <p className="text-xs text-foreground-500">{speaker.organisation}</p>
              <p className="mt-4 flex items-start gap-2 rounded-md bg-secondary-100/70 p-3 text-xs leading-relaxed text-secondary-900">
                <i className="ri-mic-line mt-0.5 shrink-0 text-base" />
                {speaker.topic}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}