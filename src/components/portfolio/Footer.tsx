"use client";

import { motion } from "framer-motion";
import { Github, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative dark:bg-zinc-950 bg-white py-16 overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 w-full h-px dark:bg-gradient-to-r bg-gradient-to-r from-transparent dark:via-zinc-800/50 via-zinc-200/50 to-transparent" />

      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-blue-500/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center gap-8">
          {/* Brand */}
          <motion.a
            href="#hero"
            className="text-3xl font-bold dark:text-white text-zinc-900 tracking-tighter group"
            whileHover={{ scale: 1.05 }}
          >
            Saul
            <span className="text-blue-500 group-hover:text-blue-400 transition-colors">
              .dev
            </span>
          </motion.a>

          {/* Nav links */}
          <div className="flex items-center gap-8">
            {["Inicio", "Sobre Mí", "Proyectos", "Contacto"].map((name) => (
              <motion.a
                key={name}
                href={`#${name === "Inicio" ? "hero" : name === "Sobre Mí" ? "about" : name === "Proyectos" ? "projects" : "contact"}`}
                className="dark:text-zinc-500 text-zinc-400 hover:text-blue-500 text-sm transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                {name}
              </motion.a>
            ))}
          </div>

          {/* Social + copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <motion.a
              href="https://github.com/Saulcoben"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3, scale: 1.1 }}
              className="p-2 dark:text-zinc-500 text-zinc-400 hover:text-blue-500 transition-colors"
            >
              <Github className="w-5 h-5" />
            </motion.a>

            <span className="dark:text-zinc-700 text-zinc-300 hidden sm:inline">•</span>

            <p className="dark:text-zinc-600 text-zinc-400 text-sm flex items-center gap-1.5">
              © {new Date().getFullYear()} Hecho con{" "}
              <Heart className="w-3.5 h-3.5 text-red-500/60 fill-red-500/60" />{" "}
              por Saul
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
