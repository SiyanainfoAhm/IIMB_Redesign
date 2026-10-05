import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import Hero from "./components/Hero";
import QuickNav from "./components/QuickNav";
import Advantage from "./components/Advantage";
import Programmes from "./components/Programmes";
import FacultySpotlight from "./components/FacultySpotlight";
import NewsEvents from "./components/NewsEvents";
import CampusLife from "./components/CampusLife";
import CtaBanner from "./components/CtaBanner";

export default function Home() {
  return (
    <div className="min-h-screen bg-background-50">
      <Navbar />
      <main>
        <Hero />
        <QuickNav />
        <Advantage />
        <Programmes />
        <FacultySpotlight />
        <NewsEvents />
        <CampusLife />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}