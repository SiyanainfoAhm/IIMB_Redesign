import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import ProgrammesPage from "../pages/programmes/page";
import FacultyPage from "../pages/faculty/page";
import AboutPage from "../pages/about/page";
import NewsPage from "../pages/news/page";
import NewsDetailPage from "../pages/news/detail/page";
import EventsPage from "../pages/events/page";
import ComparePage from "../pages/compare/page";
import CompareAllPage from "../pages/compare-all/page";
import AdmissionsPage from "../pages/admissions/page";
import DesignInActionPage from "../pages/design-in-action/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/programmes",
    element: <ProgrammesPage />,
  },
  {
    path: "/compare",
    element: <ComparePage />,
  },
  {
    path: "/compare-all",
    element: <CompareAllPage />,
  },
  {
    path: "/admissions",
    element: <AdmissionsPage />,
  },
  {
    path: "/faculty",
    element: <FacultyPage />,
  },
  {
    path: "/news",
    element: <NewsPage />,
  },
  {
    path: "/news/:id",
    element: <NewsDetailPage />,
  },
  {
    path: "/events",
    element: <EventsPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/design-in-action",
    element: <DesignInActionPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
