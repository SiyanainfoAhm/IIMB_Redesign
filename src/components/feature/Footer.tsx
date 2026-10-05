import { Link } from "react-router-dom";
import Container from "@/components/base/Container";
import { primaryNav, utilityNav } from "@/mocks/navigation";

const programmeLinks = [
  { label: "MBA", href: "/programmes" },
  { label: "MBA (Business Analytics)", href: "/programmes" },
  { label: "Executive Post Graduate Programme", href: "/programmes" },
  { label: "Doctoral Programme (PhD)", href: "/programmes" },
  { label: "Executive Education", href: "/programmes" },
];

const socialLinks = [
  { label: "LinkedIn", icon: "ri-linkedin-fill", href: "/about#contact" },
  { label: "X", icon: "ri-twitter-x-fill", href: "/about#contact" },
  { label: "YouTube", icon: "ri-youtube-fill", href: "/about#contact" },
  { label: "Instagram", icon: "ri-instagram-fill", href: "/about#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-primary-100">
      <Container className="py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-accent-600">
                <span className="font-heading text-lg font-semibold leading-none text-background-50">II</span>
              </span>
              <span className="font-heading text-2xl font-semibold text-background-50">IIMB</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-primary-200">
              The Indian Institute of Management Bangalore is a leading graduate school of management,
              shaping thoughtful leaders and advancing research that matters.
            </p>
            <div className="mt-6 space-y-2 text-sm text-primary-200">
              <p className="flex items-start gap-2">
                <i className="ri-map-pin-2-line mt-0.5" />
                Bannerghatta Road, Bengaluru 560076, India
              </p>
              <p className="flex items-center gap-2">
                <i className="ri-phone-line" />
                +91 80 2699 3000
              </p>
              <p className="flex items-center gap-2">
                <i className="ri-mail-line" />
                info@iimb.ac.in
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-background-50">Explore</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {primaryNav.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-primary-200 transition-colors hover:text-secondary-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-background-50">Quick Links</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {utilityNav.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-primary-200 transition-colors hover:text-secondary-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-background-50">Programmes</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {programmeLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-primary-200 transition-colors hover:text-secondary-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-background-50">Stay Connected</h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link to="/about#contact" className="text-primary-200 transition-colors hover:text-secondary-300">
                  Contact & Directions
                </Link>
              </li>
              <li>
                <Link to="/about#campus" className="text-primary-200 transition-colors hover:text-secondary-300">
                  Visit the Campus
                </Link>
              </li>
              <li>
                <Link to="/about#placements" className="text-primary-200 transition-colors hover:text-secondary-300">
                  Recruiters
                </Link>
              </li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              {socialLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  aria-label={item.label}
                  className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-900 text-primary-100 transition-colors hover:bg-accent-600 hover:text-background-50"
                >
                  <i className={item.icon} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-primary-800">
        <Container>
          <div className="flex flex-col items-start justify-between gap-4 py-6 text-xs text-primary-300 sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} IIMB-redesign — Indian Institute of Management Bangalore.</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link to="/design-in-action" className="transition-colors hover:text-secondary-300">
                Design in Action
              </Link>
              <Link to="/about" className="transition-colors hover:text-secondary-300">
                Privacy
              </Link>
              <Link to="/about" className="transition-colors hover:text-secondary-300">
                Accessibility
              </Link>
              <Link to="/about" className="transition-colors hover:text-secondary-300">
                Right to Information
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}