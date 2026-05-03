import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Projects from "@/components/portfolio/Projects";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import ScrollProgress from "@/components/portfolio/ScrollProgress";
import CursorGlow from "@/components/portfolio/CursorGlow";

export const metadata = {
  title: "Saul.dev | Portfolio Frontend",
  description: "Portfolio personal de un Desarrollador Frontend con experiencia en React, Next.js y Tailwind CSS.",
};

export default function Home() {
  return (
    <main className="dark:bg-zinc-950 bg-zinc-50 dark:text-zinc-50 text-zinc-900 min-h-screen font-sans relative transition-colors duration-300">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
