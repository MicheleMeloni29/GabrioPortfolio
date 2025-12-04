import FullPageScroller from "./components/FullPageScroller";
import NavBar from "./components/NavBar";
import ContactSection from "./sections/Contact";
import Hero from "./sections/Hero";
import ProjectsSection from "./sections/Works";
import StudioSection from "./sections/Studio";
import ServiziSection from "./sections/Servizi";

export default function Home() {
  return (
    <div className="relative h-screen overflow-hidden">
      <NavBar />
      <FullPageScroller>
        <Hero />
        <StudioSection />
        <ServiziSection />
        <ProjectsSection />
        <ContactSection />
      </FullPageScroller>
    </div>
  );
}
