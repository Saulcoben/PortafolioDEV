"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Gamepad2 } from "lucide-react";
import SnakeGame from "./games/SnakeGame";
import RunnerGame from "./games/RunnerGame";

export default function InteractiveProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef} className="py-28 relative overflow-hidden bg-[#050505] transition-colors duration-300">
      
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A0A0A] border border-zinc-800 text-zinc-300 text-xs font-bold mb-6 shadow-xl"
          >
            <div className="p-1 bg-purple-500/20 rounded-full">
              <Gamepad2 className="w-3.5 h-3.5 text-purple-400" />
            </div>
            ZONA INTERACTIVA
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight"
          >
            Lógica &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500">
              Rendimiento Visual
            </span>
          </motion.h2>

          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-purple-500 rounded-full mx-auto mb-8" />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Una demostración de programación orientada a objetos, renderizado en HTML5 Canvas y física gestionada a 60 FPS desde React.
          </motion.p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
             transition={{ delay: 0.3, duration: 0.6 }}
          >
             <SnakeGame />
          </motion.div>

          <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
             transition={{ delay: 0.4, duration: 0.6 }}
          >
             <RunnerGame />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
