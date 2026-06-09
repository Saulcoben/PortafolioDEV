"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Settings, Search, Layout } from "lucide-react";

const skills = [
  {
    icon: <Code2 className="w-6 h-6 text-blue-400" />,
    title: "Desarrollo & DevOps",
    description:
      "Código escalable, CI/CD y despliegues eficientes con las últimas tecnologías web.",
    gradient: "dark:from-blue-500/20 from-blue-500/10 dark:to-blue-600/5 to-blue-600/5",
    borderColor: "hover:border-blue-500/50",
    glowColor: "group-hover:shadow-blue-500/20",
  },
  {
    icon: <Settings className="w-6 h-6 text-emerald-400" />,
    title: "Experto WordPress",
    description:
      "Desarrollo a medida, WooCommerce, Divi (Elegant Themes) y optimización avanzada.",
    gradient: "dark:from-emerald-500/20 from-emerald-500/10 dark:to-emerald-600/5 to-emerald-600/5",
    borderColor: "hover:border-emerald-500/50",
    glowColor: "group-hover:shadow-emerald-500/20",
  },
  {
    icon: <Search className="w-6 h-6 text-purple-400" />,
    title: "Estrategia SEO",
    description:
      "Optimización técnica y de contenido para dominar los Core Web Vitals y el posicionamiento.",
    gradient: "dark:from-purple-500/20 from-purple-500/10 dark:to-purple-600/5 to-purple-600/5",
    borderColor: "hover:border-purple-500/50",
    glowColor: "group-hover:shadow-purple-500/20",
  },
  {
    icon: <Layout className="w-6 h-6 text-cyan-400" />,
    title: "Diseño UI/UX",
    description:
      "Creación de interfaces modernas, altamente conversoras y centradas en el usuario.",
    gradient: "dark:from-cyan-500/20 from-cyan-500/10 dark:to-cyan-600/5 to-cyan-600/5",
    borderColor: "hover:border-cyan-500/50",
    glowColor: "group-hover:shadow-cyan-500/20",
  },
];

function AnimatedCounter({
  target,
  suffix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      const startTime = performance.now();
      const animate = (currentTime: number) => {
        const elapsed = (currentTime - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * target));
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(target);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, hasAnimated, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: y * -10, y: x * 10 });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovering(false);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: isHovering ? 1.02 : 1,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{ perspective: "1000px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section id="about" ref={sectionRef} className="py-28 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px dark:bg-gradient-to-r bg-gradient-to-r from-transparent dark:via-zinc-800/50 via-zinc-200/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px dark:bg-gradient-to-r bg-gradient-to-r from-transparent dark:via-zinc-800/50 via-zinc-200/50 to-transparent" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-blue-500/3 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full dark:bg-blue-500/10 bg-blue-500/5 border dark:border-blue-500/20 border-blue-500/10 text-blue-400 text-xs font-medium mb-6"
            >
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              SOBRE MÍ
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-zinc-900 mb-6 tracking-tight">
              Pasión por el
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                {" "}
                código
              </span>
            </h2>

            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-8" />

            <p className="dark:text-zinc-400 text-zinc-600 text-lg leading-relaxed mb-6">
              Soy un profesional versátil que combina el poder del <strong className="dark:text-zinc-200 text-zinc-800">Desarrollo Web Full Stack</strong>, <strong className="dark:text-zinc-200 text-zinc-800">DevOps</strong>, y la optimización <strong className="dark:text-zinc-200 text-zinc-800">SEO</strong>. Domino ecosistemas modernos como React y Next.js, así como plataformas maduras como <strong className="dark:text-zinc-200 text-zinc-800">WordPress</strong>.
            </p>
            <p className="dark:text-zinc-400 text-zinc-600 text-lg leading-relaxed">
              Mi enfoque es integral: desde un <strong className="dark:text-zinc-200 text-zinc-800">UX/UI</strong> atractivo que convierte usuarios, hasta arquitecturas backend escalables e integraciones continuas, garantizando siempre el máximo rendimiento y posicionamiento.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-1 w-full grid grid-cols-2 gap-5"
          >
            <TiltCard className="dark:bg-gradient-to-br bg-gradient-to-br dark:from-zinc-800/60 from-white dark:to-zinc-900/60 to-zinc-50 rounded-2xl p-8 border dark:border-zinc-800/60 border-zinc-200/60 flex flex-col items-center justify-center text-center aspect-square hover:border-blue-500/30 transition-colors duration-300 dark:shadow-xl shadow-xl shadow-black/20 shadow-black/5">
              <span className="text-5xl font-bold dark:text-white text-zinc-900 mb-3">
                <AnimatedCounter target={6} suffix="+" />
              </span>
              <span className="dark:text-zinc-400 text-zinc-500 text-sm font-medium">
                Años Experiencia
              </span>
            </TiltCard>

            <TiltCard className="dark:bg-gradient-to-br bg-gradient-to-br dark:from-blue-600/10 from-blue-500/5 dark:to-blue-900/10 to-blue-100/50 rounded-2xl p-8 border dark:border-blue-500/20 border-blue-200/40 flex flex-col items-center justify-center text-center aspect-square hover:border-blue-400/40 transition-colors duration-300 shadow-xl dark:shadow-blue-950/20 shadow-blue-100/30">
              <span className="text-5xl font-bold text-blue-400 mb-3">
                <AnimatedCounter target={50} suffix="+" />
              </span>
              <span className="dark:text-zinc-400 text-zinc-500 text-sm font-medium">
                Proyectos
              </span>
            </TiltCard>
          </motion.div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                delay: 0.3 + index * 0.1,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <TiltCard
                className={`bg-gradient-to-br ${skill.gradient} border dark:border-zinc-800/60 border-zinc-200/60 p-8 rounded-2xl ${skill.borderColor} transition-all duration-500 group shadow-lg dark:shadow-black/20 shadow-black/5 ${skill.glowColor} group-hover:shadow-lg h-full cursor-default`}
              >
                <div className="w-14 h-14 dark:bg-zinc-950/80 bg-white border dark:border-zinc-800/60 border-zinc-200/60 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-zinc-700 transition-all duration-500">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-semibold dark:text-white text-zinc-900 mb-3 transition-colors duration-300">
                  {skill.title}
                </h3>
                <p className="dark:text-zinc-400 text-zinc-500 leading-relaxed text-sm">
                  {skill.description}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-center mb-10"
          >
            <h3 className="text-2xl font-bold dark:text-white text-zinc-900 mb-2">Stack Tecnológico</h3>
            <p className="dark:text-zinc-400 text-zinc-500 text-sm">Herramientas y tecnologías con las que trabajo diariamente</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Docker", "WordPress", "WooCommerce", "Divi (Elegant Themes)", "Figma", "SEO Técnico", "Google Analytics", "GitHub Actions", "AWS"].map((tech) => (
              <span key={tech} className="px-4 py-2 rounded-full border dark:border-zinc-800/60 border-zinc-200/60 dark:bg-zinc-900/50 bg-white/50 dark:text-zinc-300 text-zinc-700 text-sm font-medium hover:dark:border-blue-500/50 hover:border-blue-500/50 transition-colors">
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
