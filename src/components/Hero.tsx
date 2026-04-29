"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Elementos de fondo */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-zinc-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Disponible para nuevos proyectos
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              Construyendo <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                experiencias digitales
              </span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl mb-10 leading-relaxed">
              Soy un Desarrollador Frontend apasionado por React, Next.js y Tailwind CSS. 
              Transformo ideas complejas en interfaces de usuario elegantes, intuitivas y de alto rendimiento.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <a
                href="#projects"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-full font-medium transition-all flex items-center justify-center gap-2 group"
              >
                Ver Mis Proyectos
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-3.5 rounded-full font-medium transition-all flex items-center justify-center"
              >
                Contactar
              </a>
            </div>
            
            <div className="mt-12 flex items-center gap-6 justify-center md:justify-start">
              <a href="https://github.com/Saulcoben" target="_blank" rel="noreferrer" className="p-2 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 hover:text-white hover:border-zinc-700 transition-all">
                <FaGithub className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 hidden lg:flex justify-end relative"
          >
            {/* Animación abstracta decorativa */}
            <div className="relative w-[450px] h-[450px]">
              <div className="absolute inset-0 rounded-full border border-zinc-800/60 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-8 rounded-full border border-blue-900/30 animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-16 rounded-full border border-zinc-800/40 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full backdrop-blur-3xl" />
              
              {/* Elementos flotantes simulando código/UI */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-10 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 p-4 rounded-xl shadow-2xl"
              >
                <div className="flex gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-24 bg-zinc-800 rounded" />
                  <div className="h-2 w-32 bg-blue-500/50 rounded" />
                  <div className="h-2 w-20 bg-zinc-800 rounded" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
