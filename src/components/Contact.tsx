"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-zinc-900/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Trabajamos juntos?
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
            Actualmente estoy abierto a nuevas oportunidades. Si tienes un proyecto en mente 
            o simplemente quieres saludar, envíame un correo y te responderé lo antes posible.
          </p>
          
          <a href="mailto:saul1324@hotmail.com" className="inline-flex items-center gap-6 group cursor-pointer bg-zinc-900/80 border border-zinc-800 p-6 sm:px-10 rounded-2xl hover:border-blue-500/50 hover:bg-zinc-800/50 transition-all shadow-xl">
            <div className="w-14 h-14 bg-zinc-950 border border-zinc-800 rounded-full flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Mail className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="text-sm text-zinc-500 mb-1">Escríbeme a</p>
              <p className="text-white font-medium text-lg sm:text-xl group-hover:text-blue-400 transition-colors">saul1324@hotmail.com</p>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
