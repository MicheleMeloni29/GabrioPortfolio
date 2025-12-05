import FullPageScroller from "./components/FullPageScroller";
import NavBar from "./components/NavBar";
import ContactSection from "./sections/Contact";
import Hero from "./sections/Hero";
import AboutSection from "./sections/About";
import ServiziSection from "./sections/Services";
import ProjectsSection from "./sections/Projects";
import WhyCoreSection from "./sections/WhyCore";
import WorksProcess from "./sections/WorksProcess";

export default function Home() {
  return (
    <div className="relative h-screen overflow-hidden">
      <NavBar />
      <FullPageScroller>
        <Hero />
        <AboutSection />
        <ServiziSection />
        <WorksProcess />
        <ProjectsSection />
        <WhyCoreSection />
        <ContactSection />
      </FullPageScroller>
    </div>
  );
}
