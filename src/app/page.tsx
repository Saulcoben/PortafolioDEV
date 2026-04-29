import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Saul.dev | Portfolio Frontend",
  description: "Portfolio personal de un Desarrollador Frontend con experiencia en React, Next.js y Tailwind CSS.",
};

export default function Home() {
  return (
    <main className="bg-zinc-950 text-zinc-50 min-h-screen font-sans selection:bg-blue-500/30 relative">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
