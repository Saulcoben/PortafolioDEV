import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Projects from "@/components/portfolio/Projects";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import ScrollProgress from "@/components/portfolio/ScrollProgress";
import CursorGlow from "@/components/portfolio/CursorGlow";

export const metadata = {
  title: "Saul.dev | Web Developer, SEO & WordPress Expert",
  description: "Portfolio personal de un Desarrollador Web Full Stack, Especialista en SEO, Experto en WordPress, DevOps y Diseño UX/UI.",
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
