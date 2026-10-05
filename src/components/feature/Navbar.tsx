import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "@/components/base/Logo";
import SearchOverlay from "@/components/feature/SearchOverlay";
import { primaryNav, utilityNav } from "@/mocks/navigation";

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const overlay = isHome && !scrolled && !menuOpen;

  const navText = overlay ? "text-background-100 hover:text-background-50" : "text-foreground-800 hover:text-accent-700";
  const iconText = overlay ? "text-background-100 hover:text-background-50" : "text-foreground-800 hover:text-accent-700";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[60]">
        {/* Utility strip */}
        <div className="hidden bg-primary-950 text-primary-100 lg:block">
          <div className="flex h-9 w-full items-center justify-between px-4 md:px-6 lg:px-10">
            <span className="flex items-center gap-2 text-xs text-primary-200">
              <i className="ri-map-pin-2-line" />
              Bengaluru, India
            </span>
            <nav className="flex items-center gap-5">
              {utilityNav.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-xs text-primary-200 transition-colors hover:text-background-50"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Main bar */}
        <div
          className={`transition-all duration-300 ${
            overlay
              ? "border-b border-background-50/10 bg-transparent"
              : "border-b border-background-200 bg-background-50/95 backdrop-blur"
          }`}
        >
          <div className="flex h-16 w-full items-center justify-between gap-4 px-4 md:px-6 lg:h-20 lg:px-10">
            <Logo inverted={overlay} />

            <nav className="hidden items-center gap-1 xl:flex">
              {primaryNav.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${navText}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
                className={`flex h-10 w-10 items-center justify-center rounded-md transition-colors ${iconText}`}
              >
                <i className="ri-search-line text-xl" />
              </button>
              <Link
                to="/admissions"
                className="hidden whitespace-nowrap rounded-md bg-accent-600 px-4 py-2.5 text-sm font-semibold text-background-50 transition-colors hover:bg-accent-700 sm:inline-flex"
              >
                Apply Now
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                className={`flex h-10 w-10 items-center justify-center rounded-md transition-colors xl:hidden ${iconText}`}
              >
                <i className={`${menuOpen ? "ri-close-line" : "ri-menu-line"} text-2xl`} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile / tablet panel */}
        {menuOpen ? (
          <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-background-200 bg-background-50 xl:hidden">
            <div className="flex flex-col gap-1 px-4 py-4 md:px-6">
              {primaryNav.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-center justify-between rounded-md px-3 py-3 text-sm font-medium text-foreground-900 transition-colors hover:bg-background-100"
                >
                  {item.label}
                  <i className="ri-arrow-right-s-line text-lg text-foreground-400" />
                </Link>
              ))}
              <Link
                to="/admissions"
                className="mt-2 inline-flex items-center justify-center whitespace-nowrap rounded-md bg-accent-600 px-4 py-3 text-sm font-semibold text-background-50"
              >
                Apply Now
              </Link>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 border-t border-background-200 pt-4">
                {utilityNav.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="text-xs text-foreground-500 transition-colors hover:text-accent-700"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}