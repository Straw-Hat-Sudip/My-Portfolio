import Navigation from "@/components/sections/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import SlashMarquee from "@/components/sections/SlashMarquee";
import ManifestoSection from "@/components/sections/ManifestoSection";
import BuilderDnaSection from "@/components/sections/BuilderDnaSection";
import TechArsenal from "@/components/sections/TechArsenal";
import ProjectsShowcase from "@/components/sections/ProjectsShowcase";
import AcademicTimeline from "@/components/sections/AcademicTimeline";
import MiniGameSection from "@/components/sections/MiniGameSection";
import ContactCommand from "@/components/sections/ContactCommand";
import CustomCursor from "@/components/ui/CustomCursor";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#030303] text-slate-100 selection:bg-[#ff7043]/30 selection:text-[#ff9e80]">
      <CustomCursor />
      <Navigation />
      <HeroSection />
      <SlashMarquee />
      <ManifestoSection />
      <BuilderDnaSection />
      <TechArsenal />
      <ProjectsShowcase />
      <AcademicTimeline />
      <MiniGameSection />
      <ContactCommand />
    </main>
  );
}
