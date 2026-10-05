import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "@/components/base/Container";
import HeroCompareTray from "./HeroCompareTray";
import { heroStats } from "@/mocks/institution";

export default function Hero() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <section className="relative isolate flex min-h-[92vh] flex-col justify-end overflow-hidden bg-foreground-950">
      <img
        src="https://readdy.ai/api/search-image?query=Wide%20aerial%20view%20of%20a%20lush%20green%20university%20campus%20with%20stone%20buildings%20and%20tree-lined%20avenues%2C%20golden%20hour%20light%2C%20calm%20and%20dignified%20institutional%20atmosphere%2C%20cinematic%20editorial%20photography%2C%20deep%20warm%20green%20and%20amber%20tones&width=1920&height=1080&seq=iimb-redesign-hero&orientation=landscape"
        alt="Aerial view of the IIM Bangalore campus with stone architecture and tree-lined avenues"
        title="IIMB campus — Indian Institute of Management Bangalore"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
      {reduceMotion ? null : (
        <video
          className="absolute inset-0 h-full w-full object-cover object-top"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://readdy.ai/api/search-image?query=Wide%20aerial%20view%20of%20a%20lush%20green%20university%20campus%20with%20stone%20buildings%20and%20tree-lined%20avenues%2C%20golden%20hour%20light%2C%20calm%20and%20dignified%20institutional%20atmosphere%2C%20cinematic%20editorial%20photography%2C%20deep%20warm%20green%20and%20amber%20tones&width=1920&height=1080&seq=iimb-redesign-hero&orientation=landscape"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src="https://videos.pexels.com/video-files/36802723/15594745_640_360_60fps.mp4" type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/75 via-foreground-950/55 to-foreground-950/85" />

      <Container className="relative z-10 flex flex-1 flex-col justify-center pb-16 pt-36 md:pt-44">
        <div className="max-w-3xl">
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-background-50/20 bg-background-50/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-background-100 animate-fade-in"
          >
            <span className="flex h-4 w-4 items-center justify-center">
              <i className="ri-graduation-cap-line text-secondary-300" />
            </span>
            Indian Institute of Management Bangalore
          </div>
          <h1
            className="font-heading text-4xl leading-[1.08] text-background-50 md:text-6xl lg:text-[4.2rem] animate-fade-up"
          >
            Shaping leaders who move business — and society — forward.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-background-100/90 md:text-lg animate-fade-up">
            For over five decades, IIMB has brought together world-class faculty, rigorous research
            and a vibrant campus to develop graduates who lead with clarity, rigour and integrity.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center animate-fade-up">
            <Link
              to="/programmes"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-accent-600 px-6 py-3.5 text-sm font-semibold text-background-50 transition-colors hover:bg-accent-700"
            >
              Explore Programmes
              <i className="ri-arrow-right-line text-base" />
            </Link>
            <Link
              to="/admissions"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-background-50/40 bg-background-50/5 px-6 py-3.5 text-sm font-semibold text-background-50 transition-colors hover:bg-background-50/15"
            >
              Apply for 2027 Intake
            </Link>
          </div>

          <HeroCompareTray />
        </div>
      </Container>

      <div className="relative z-10 border-t border-background-50/15 bg-foreground-950/40 backdrop-blur-sm">
        <Container>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-6 py-7 lg:grid-cols-4">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-heading text-2xl text-background-50 md:text-3xl">{stat.value}</dt>
                <dd className="mt-1 text-xs leading-snug text-background-200 md:text-sm">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}