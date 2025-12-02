import FullPageScroller from "./components/FullPageScroller";
import NavBar from "./components/NavBar";
import AboutSection from "./sections/About";
import ContactSection from "./sections/Contact";
import Hero from "./sections/Hero";
import ProjectsSection from "./sections/Works";

export default function Home() {
  return (
    <div className="relative h-screen overflow-hidden">
      <NavBar />
      <FullPageScroller>
        <Hero />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </FullPageScroller>
    </div>
  );
}
