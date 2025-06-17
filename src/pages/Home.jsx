import { AboutSection } from "../components/AboutSection"
import { ContactSection } from "../components/ContactSection"
import { Footer } from "../components/Footer"
import { HeroSection } from "../components/HeroSection"
import { Navbar } from "../components/Navbar"
import { ProjectsSection } from "../components/ProjectsSection"
import { SkillsSection } from "../components/SkillsSection"
import { StarBackground } from "../components/StarBackground"
import { ThemeToggle } from "@/components/ThemeToggle"
import { WorkExperienceSection } from "../components/WorkExperienceSection";

export const Home=()=>{
    return(
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            {/* Theme Toggle */}
            <ThemeToggle />
            {/* Background Effects */}
            <StarBackground />
            {/* Navbar */}
            <Navbar />

            {/* Main content : Hero, about, etc */}
            <main>
                <HeroSection />
                <AboutSection />
                <WorkExperienceSection />
                <SkillsSection />
                <ProjectsSection />
                <ContactSection />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    )
}