import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import Container from "@/components/base/Container";
import PageHeader from "@/components/base/PageHeader";
import { campusLife } from "@/mocks/campus";
import { aboutFacts, advantagePoints, leadership, milestones, priorities } from "@/mocks/institution";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background-50">
      <Navbar />
      <main>
        <PageHeader
          eyebrow="About IIMB"
          title="A leading management institution, rooted in Bengaluru"
          description="Since 1973, IIMB has pursued excellence in management education and research — developing leaders, advancing knowledge and serving society."
          crumbs={[{ label: "About", href: "/about" }]}
        />

        <section className="py-14 md:py-20">
          <Container>
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6">
                <div className="h-80 w-full overflow-hidden rounded-lg md:h-[420px]">
                  <img
                    src="https://readdy.ai/api/search-image?query=Stone%20and%20glass%20academic%20building%20surrounded%20by%20lush%20trees%20on%20a%20green%20campus%2C%20warm%20late-afternoon%20light%2C%20serene%20dignified%20institutional%20atmosphere%2C%20editorial%20architectural%20photography&width=1200&height=900&seq=iimb-about-campus&orientation=landscape"
                    alt="An academic building on the IIM Bangalore campus surrounded by greenery"
                    title="IIM Bangalore campus"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>
              <div className="lg:col-span-6">
                <h2 className="font-heading text-2xl text-foreground-950 md:text-4xl">Our story</h2>
                <p className="mt-5 text-sm leading-relaxed text-foreground-600 md:text-base">
                  IIMB was established to build a new generation of professional managers for a young nation.
                  Over five decades it has grown into a globally respected institution, known for its research
                  output, its rigorous programmes and the calibre of its graduates.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-foreground-600 md:text-base">
                  Today our campus is a meeting point for scholars, students, entrepreneurs and leaders — a place
                  where ideas are tested against reality and where the next generation of managers finds its
                  purpose.
                </p>
                <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
                  {aboutFacts.map((fact) => (
                    <div key={fact.label}>
                      <dt className="text-xs uppercase tracking-wide text-foreground-500">{fact.label}</dt>
                      <dd className="mt-1 font-heading text-xl text-foreground-950 md:text-2xl">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-y border-background-200 bg-background-100 py-14 md:py-20">
          <Container>
            <h2 className="font-heading text-2xl text-foreground-950 md:text-3xl">Our journey</h2>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-4">
              {milestones.map((item) => (
                <div key={item.year} className="relative rounded-lg border border-background-200 bg-background-50 p-6">
                  <span className="flex h-2 w-2 rounded-full bg-accent-500" />
                  <span className="mt-5 block font-heading text-2xl text-primary-700">{item.year}</span>
                  <h3 className="mt-2 font-heading text-base text-foreground-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-600">{item.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-14 md:py-20">
          <Container>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">
                  <span className="h-px w-6 bg-accent-500/50" />
                  What drives us
                </div>
                <h2 className="mt-3 font-heading text-2xl text-foreground-950 md:text-4xl">Our priorities</h2>
                <p className="mt-4 text-sm leading-relaxed text-foreground-600 md:text-base">
                  Our strategy is guided by a clear set of priorities that shape how we teach, research and run
                  our campus.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:col-span-7">
                {priorities.map((item) => (
                  <div key={item.title} className="rounded-lg border border-background-200 bg-background-100 p-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-md bg-secondary-100 text-secondary-800">
                      <i className={`${item.icon} text-2xl`} />
                    </span>
                    <h3 className="mt-5 font-heading text-lg text-foreground-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-14 grid grid-cols-1 divide-y divide-background-200 border-y border-background-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
              {advantagePoints.map((point, index) => (
                <div key={point.title} className="flex items-start gap-4 px-0 py-6 md:px-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary-100 text-primary-700">
                    <i className={`${point.icon} text-xl`} />
                  </span>
                  <div>
                    <span className="font-heading text-sm text-accent-600">0{index + 1}</span>
                    <h3 className="font-heading text-base text-foreground-950">{point.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground-600">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-y border-background-200 bg-primary-950 py-14 md:py-20">
          <Container>
            <h2 className="font-heading text-2xl text-background-50 md:text-3xl">Leadership</h2>
            <p className="mt-3 max-w-2xl text-sm text-primary-200 md:text-base">
              IIMB is led by a team of academics who combine scholarship with a deep commitment to the institute
              and its community.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {leadership.map((person) => (
                <div key={person.name} className="rounded-lg border border-primary-800 bg-primary-900 p-6">
                  <h3 className="font-heading text-lg text-background-50">{person.name}</h3>
                  <p className="mt-1 text-sm text-secondary-300">{person.role}</p>
                  <p className="mt-3 text-sm text-primary-200">{person.detail}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section id="campus" className="scroll-mt-28 py-14 md:py-20">
          <Container>
            <h2 className="font-heading text-2xl text-foreground-950 md:text-3xl">Life on campus</h2>
            <p className="mt-3 max-w-2xl text-sm text-foreground-600 md:text-base">
              Our 100-acre campus is designed for both focus and community — a setting that makes learning feel
              part of everyday life.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {campusLife.map((item) => (
                <article key={item.id} className="group overflow-hidden rounded-lg border border-background-200 bg-background-50">
                  <div className="h-52 w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      title={`${item.title} — IIMB campus`}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg text-foreground-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-600">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section id="placements" className="scroll-mt-28 border-y border-background-200 bg-background-100 py-14 md:py-20">
          <Container>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">
                  <span className="h-px w-6 bg-accent-500/50" />
                  Careers
                </div>
                <h2 className="mt-3 font-heading text-2xl text-foreground-950 md:text-4xl">Placements & careers</h2>
                <p className="mt-4 text-sm leading-relaxed text-foreground-600 md:text-base">
                  Our graduates are sought after across consulting, finance, technology, product and
                  entrepreneurship. A dedicated career development team connects students with a global recruiter
                  network.
                </p>
                <Link
                  to="/about#contact"
                  className="mt-6 inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary-700 px-5 py-3 text-sm font-semibold text-background-50 transition-colors hover:bg-primary-800"
                >
                  Become a recruiter
                  <i className="ri-arrow-right-line text-base" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-6 lg:col-span-7">
                {[
                  { value: "500+", label: "Recruiters on campus" },
                  { value: "100%", label: "Placement support" },
                  { value: "40+", label: "Sectors represented" },
                  { value: "60,000+", label: "Alumni worldwide" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-lg border border-background-200 bg-background-50 p-6">
                    <span className="font-heading text-2xl text-primary-700 md:text-3xl">{stat.value}</span>
                    <p className="mt-2 text-sm text-foreground-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section id="contact" className="scroll-mt-28 py-14 md:py-20">
          <Container>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <h2 className="font-heading text-2xl text-foreground-950 md:text-3xl">Visit or contact us</h2>
                <p className="mt-4 text-sm leading-relaxed text-foreground-600 md:text-base">
                  We are located on Bannerghatta Road in south Bengaluru, easily reachable from the city centre
                  and the airport.
                </p>
                <div className="mt-6 space-y-3 text-sm text-foreground-700">
                  <p className="flex items-start gap-3">
                    <i className="ri-map-pin-2-line mt-0.5 text-lg text-accent-600" />
                    Bannerghatta Road, Bengaluru 560076, Karnataka, India
                  </p>
                  <p className="flex items-center gap-3">
                    <i className="ri-phone-line text-lg text-accent-600" />
                    +91 80 2699 3000
                  </p>
                  <p className="flex items-center gap-3">
                    <i className="ri-mail-line text-lg text-accent-600" />
                    info@iimb.ac.in
                  </p>
                  <p className="flex items-center gap-3">
                    <i className="ri-time-line text-lg text-accent-600" />
                    Mon–Fri, 9:00 AM – 5:30 PM IST
                  </p>
                </div>
              </div>
              <div className="lg:col-span-7">
                <div className="h-80 w-full overflow-hidden rounded-lg border border-background-200 md:h-full md:min-h-[360px]">
                  <iframe
                    title="Map showing IIM Bangalore location"
                    src="https://www.google.com/maps?q=Indian+Institute+of+Management+Bangalore&output=embed"
                    className="h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}