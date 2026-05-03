"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Send, Github } from "lucide-react";

function AnimatedBorderCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative group ${className}`}>
      {/* Animated gradient border */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 opacity-0 group-hover:opacity-40 transition-opacity duration-500 animate-border-rotate" />

      {/* Inner content */}
      <div className="relative dark:bg-zinc-900/90 bg-white/90 backdrop-blur-xl rounded-2xl z-10">
        {children}
      </div>
    </div>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section id="contact" ref={sectionRef} className="py-28 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px dark:bg-gradient-to-r bg-gradient-to-r from-transparent dark:via-zinc-800/50 via-zinc-200/50 to-transparent" />
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-blue-500/4 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-500/4 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center"
        >
          {/* Section badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full dark:bg-blue-500/10 bg-blue-500/5 border dark:border-blue-500/20 border-blue-500/10 text-blue-400 text-xs font-medium mb-6"
          >
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            CONTACTO
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-zinc-900 mb-6 tracking-tight">
            ¿Trabajamos{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              juntos
            </span>
            ?
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-8" />

          <p className="dark:text-zinc-400 text-zinc-500 text-lg leading-relaxed mb-14 max-w-2xl mx-auto">
            Actualmente estoy abierto a nuevas oportunidades. Si tienes un
            proyecto en mente o simplemente quieres saludar, envíame un correo y
            te responderé lo antes posible.
          </p>

          {/* Email card with animated border */}
          <AnimatedBorderCard className="w-full max-w-lg mb-10">
            <a
              href="mailto:saul1324@hotmail.com"
              className="flex items-center gap-6 p-6 sm:px-8 cursor-pointer group/card"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.4 }}
                className="w-14 h-14 dark:bg-zinc-950/80 bg-zinc-50 border dark:border-zinc-800/60 border-zinc-200/60 rounded-xl flex items-center justify-center text-blue-400 group-hover/card:bg-blue-600 group-hover/card:text-white transition-colors duration-300 shrink-0"
              >
                <Mail className="w-6 h-6" />
              </motion.div>
              <div className="text-left">
                <p className="text-sm dark:text-zinc-500 text-zinc-400 mb-1">Escríbeme a</p>
                <p className="dark:text-white text-zinc-900 font-medium text-lg sm:text-xl group-hover/card:text-blue-400 transition-colors duration-300">
                  saul1324@hotmail.com
                </p>
              </div>
              <motion.div
                className="ml-auto dark:text-zinc-600 text-zinc-400 group-hover/card:text-blue-400 transition-colors"
                whileHover={{ x: 4 }}
              >
                <Send className="w-5 h-5" />
              </motion.div>
            </a>
          </AnimatedBorderCard>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <motion.a
              href="https://github.com/Saulcoben"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -4, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 dark:bg-zinc-900/60 bg-white border dark:border-zinc-800/60 border-zinc-200/60 rounded-xl dark:text-zinc-400 text-zinc-500 hover:text-white dark:hover:border-zinc-700 hover:border-zinc-300 dark:hover:bg-zinc-800/60 hover:bg-zinc-50 transition-all backdrop-blur-sm"
            >
              <Github className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
