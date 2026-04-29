"use client";

import { motion } from "framer-motion";
import { Code2, MonitorSmartphone, Zap, Layout } from "lucide-react";

const skills = [
  {
    icon: <Code2 className="w-6 h-6 text-blue-400" />,
    title: "Desarrollo Limpio",
    description: "Escribo código escalable, mantenible y siguiendo los mejores estándares y patrones de diseño."
  },
  {
    icon: <Layout className="w-6 h-6 text-blue-400" />,
    title: "Diseño UI/UX",
    description: "Creación de interfaces modernas, atractivas e intuitivas centradas en el usuario."
  },
  {
    icon: <MonitorSmartphone className="w-6 h-6 text-blue-400" />,
    title: "Diseño Adaptable",
    description: "Experiencias perfectas en móviles, tablets y escritorio con enfoque Mobile-First."
  },
  {
    icon: <Zap className="w-6 h-6 text-blue-400" />,
    title: "Alto Rendimiento",
    description: "Optimización extrema de Core Web Vitals para una carga y navegación instantáneas."
  }
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-zinc-900/30 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-center mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Sobre Mí
            </h2>
            <div className="w-20 h-1 bg-blue-500 rounded-full mb-6"></div>
            <p className="text-zinc-400 text-lg leading-relaxed mb-6">
              Soy un desarrollador apasionado por la intersección entre el diseño visual y la ingeniería de software. 
              Me especializo en crear aplicaciones web modernas utilizando el ecosistema de <strong>React</strong> y <strong>Next.js</strong>.
            </p>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Mi enfoque siempre es la calidad: código limpio, accesibilidad, y un rendimiento inigualable. 
              Disfruto resolviendo problemas complejos y transformándolos en soluciones simples y elegantes.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full grid grid-cols-2 gap-4"
          >
            {/* Pequeña cuadrícula decorativa de tecnologías */}
            <div className="bg-zinc-800/50 rounded-2xl p-6 border border-zinc-800/80 flex flex-col items-center justify-center text-center aspect-square hover:bg-zinc-800 transition-colors">
              <span className="text-4xl font-bold text-white mb-2">3+</span>
              <span className="text-zinc-400 text-sm">Años Experiencia</span>
            </div>
            <div className="bg-blue-600/10 rounded-2xl p-6 border border-blue-500/20 flex flex-col items-center justify-center text-center aspect-square hover:bg-blue-600/20 transition-colors">
              <span className="text-4xl font-bold text-blue-400 mb-2">20+</span>
              <span className="text-zinc-400 text-sm">Proyectos</span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-blue-500/50 hover:bg-zinc-800/50 transition-all duration-300 group shadow-lg shadow-black/20"
            >
              <div className="w-14 h-14 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500/10 transition-all duration-300">
                {skill.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{skill.title}</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                {skill.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
