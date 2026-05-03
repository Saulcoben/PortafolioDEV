"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      pulse: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = Math.min(80, Math.floor(window.innerWidth / 15));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const currentOpacity = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${currentOpacity})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(96, 165, 250, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let i = 0;

    const startTyping = () => {
      timeout = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timeout);
          setTimeout(() => setShowCursor(false), 2000);
        }
      }, 60);
    };

    const delayTimeout = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(delayTimeout);
      clearInterval(timeout);
    };
  }, [text, delay]);

  return (
    <span>
      {displayed}
      {showCursor && (
        <span className="animate-cursor-blink text-blue-400 ml-[2px]">|</span>
      )}
    </span>
  );
}

function MagneticButton({
  children,
  className,
  href,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { clientX, clientY } = e;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const x = clientX - (rect.left + rect.width / 2);
      const y = clientY - (rect.top + rect.height / 2);
      setPosition({ x: x * 0.15, y: y * 0.15 });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {href ? (
        <a href={href} className={className}>
          {children}
        </a>
      ) : (
        <button onClick={onClick} className={className}>
          {children}
        </button>
      )}
    </motion.div>
  );
}

export default function Hero() {
  return (
    <HeroContent />
  );
}

function HeroContent() {
  const [mounted, setMounted] = useState(false);

  // Using requestAnimationFrame to avoid synchronous setState in effect
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden"
    >
      {/* Particles background */}
      <Particles />

      {/* Gradient orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[700px] h-[700px] bg-blue-500/8 rounded-full blur-[150px] animate-orb-1" />
        <div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] animate-orb-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-1 max-w-2xl"
          >
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={mounted ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full dark:bg-zinc-900/80 bg-white/80 border dark:border-zinc-800/80 border-zinc-200/80 dark:text-zinc-300 text-zinc-600 text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
              </span>
              Disponible para nuevos proyectos
            </motion.div>

            {/* Main heading with shimmer gradient */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold dark:text-white text-zinc-900 mb-6 tracking-tight leading-[1.1]">
              Construyendo
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 animate-shimmer bg-[linear-gradient(110deg,#60a5fa,22%,#22d3ee,50%,#818cf8,78%,#60a5fa)]">
                experiencias
                <br />
                digitales
              </span>
            </h1>

            {/* Description with typewriter */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={mounted ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="dark:text-zinc-400 text-zinc-500 text-lg md:text-xl mb-10 leading-relaxed max-w-lg"
            >
              {mounted && (
                <TypewriterText
                  text="Desarrollador Frontend apasionado por React, Next.js y Tailwind CSS. Transformo ideas en interfaces elegantes y de alto rendimiento."
                  delay={500}
                />
              )}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start"
            >
              <MagneticButton
                href="#projects"
                className="w-full sm:w-auto relative group bg-transparent border border-blue-500/50 dark:text-white text-zinc-900 px-8 py-3.5 rounded-full font-medium transition-all flex items-center justify-center gap-2 overflow-hidden backdrop-blur-sm"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Ver Mis Proyectos
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors duration-300" />
              </MagneticButton>

              <MagneticButton
                href="#contact"
                className="w-full sm:w-auto relative group bg-transparent dark:text-white text-zinc-900 px-8 py-3.5 rounded-full font-medium transition-all flex items-center justify-center gap-2 border dark:border-zinc-600/40 border-zinc-400/40 overflow-hidden backdrop-blur-sm"
              >
                <span className="relative z-10">Contactar</span>
                <span className="absolute inset-0 dark:bg-zinc-700/30 bg-zinc-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </MagneticButton>
            </motion.div>

            {/* Social link removed */}
          </motion.div>

          {/* Decorative 3D Orbit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={mounted ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex-1 hidden lg:flex justify-end relative"
          >
            <div className="relative w-[450px] h-[450px]">
              {/* Orbit rings */}
              <div className="absolute inset-0 rounded-full border dark:border-zinc-800/40 border-zinc-300/40 animate-[spin_20s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500/60 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
              </div>
              <div className="absolute inset-8 rounded-full border border-blue-900/20 animate-[spin_15s_linear_infinite_reverse]">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 bg-cyan-400/60 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.5)]" />
              </div>
              <div className="absolute inset-16 rounded-full border dark:border-zinc-800/30 border-zinc-300/30 animate-[spin_10s_linear_infinite]">
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-purple-400/60 rounded-full shadow-[0_0_10px_rgba(192,132,252,0.5)]" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/8 to-transparent rounded-full backdrop-blur-3xl" />

              {/* Floating code card */}
              <motion.div
                animate={{ y: [0, -12, 0], rotateY: [0, 2, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-16 right-8 dark:bg-zinc-900/70 bg-white/70 backdrop-blur-xl border dark:border-zinc-800/60 border-zinc-200/60 p-5 rounded-2xl shadow-2xl shadow-blue-950/20"
                style={{ perspective: "1000px" }}
              >
                <div className="flex gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="space-y-2.5">
                  <div className="h-2 w-16 dark:bg-zinc-700/60 bg-zinc-300/60 rounded" />
                  <div className="h-2 w-28 bg-blue-500/40 rounded" />
                  <div className="h-2 w-20 dark:bg-zinc-700/40 bg-zinc-300/40 rounded" />
                  <div className="h-2 w-24 bg-cyan-500/30 rounded" />
                </div>
              </motion.div>

              {/* Floating terminal card */}
              <motion.div
                animate={{ y: [0, 8, 0], rotateY: [0, -1, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute bottom-20 left-4 dark:bg-zinc-900/70 bg-white/70 backdrop-blur-xl border dark:border-zinc-800/60 border-zinc-200/60 p-4 rounded-2xl shadow-2xl shadow-purple-950/20"
                style={{ perspective: "1000px" }}
              >
                <div className="text-[10px] font-mono dark:text-zinc-500 text-zinc-400 mb-1">
                  terminal
                </div>
                <div className="font-mono text-xs">
                  <span className="text-emerald-400">$</span>{" "}
                  <span className="dark:text-zinc-300 text-zinc-600">npm run dev</span>
                </div>
                <div className="font-mono text-[10px] dark:text-zinc-500 text-zinc-400 mt-1">
                  ✓ Ready in 2.3s
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 dark:border-zinc-700 border-zinc-300 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
