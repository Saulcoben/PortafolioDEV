"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, ShoppingCart, Server, Palette, ArrowRight, Store, Workflow, BarChart3 } from "lucide-react";

const projects = [
  {
    title: "E-commerce WordPress & SEO",
    description:
      "Tienda online de alto rendimiento con WooCommerce, optimizada para SEO técnico y Core Web Vitals (PageSpeed 99/100).",
    tags: ["WordPress", "WooCommerce", "SEO", "PHP"],
    demo: "#",
    color: "emerald",
    icon: <ShoppingCart className="w-16 h-16 text-emerald-400" />,
    gradient: "dark:from-emerald-500/20 from-emerald-500/10 dark:via-emerald-600/5 via-emerald-400/5 to-transparent",
    glowColor: "rgba(52, 211, 153, 0.15)",
    tagBg: "dark:bg-emerald-500/10 bg-emerald-500/5 dark:text-emerald-300 text-emerald-600 dark:border-emerald-500/20 border-emerald-300/20",
    btnBg: "from-emerald-500/20 to-emerald-400/20 hover:from-emerald-500/30 hover:to-teal-500/30 border-emerald-500/20 hover:border-emerald-400/30",
    workflow: [
      {
        step: "1. Auditoría & Estrategia SEO",
        tooltip: "Análisis de palabras clave y estructura óptima para indexación.",
      },
      {
        step: "2. Desarrollo Custom",
        tooltip: "Creación de theme a medida sin constructores pesados.",
      },
      {
        step: "3. Optimización WPO",
        tooltip: "Minificación, caché avanzada y optimización de imágenes.",
      },
      {
        step: "4. Integración y Analítica",
        tooltip: "Conexión con pasarelas de pago y Google Analytics 4.",
      },
    ],
  },
  {
    title: "Plataforma Web con CI/CD",
    description:
      "Aplicación full-stack escalable, desplegada mediante pipelines automatizados de DevOps para cero tiempo de inactividad.",
    tags: ["Next.js", "Docker", "DevOps", "Node.js"],
    demo: "#",
    color: "blue",
    icon: <Server className="w-16 h-16 text-blue-400" />,
    gradient: "dark:from-blue-500/20 from-blue-500/10 dark:via-blue-600/5 via-blue-400/5 to-transparent",
    glowColor: "rgba(96, 165, 250, 0.15)",
    tagBg: "dark:bg-blue-500/10 bg-blue-500/5 dark:text-blue-300 text-blue-600 dark:border-blue-500/20 border-blue-300/20",
    btnBg: "from-blue-500/20 to-blue-400/20 hover:from-blue-500/30 hover:to-cyan-500/30 border-blue-500/20 hover:border-blue-400/30",
    workflow: [
      {
        step: "1. Arquitectura Microservicios",
        tooltip: "Separación de responsabilidades entre frontend y backend.",
      },
      {
        step: "2. Dockerización",
        tooltip: "Contenedores ligeros para despliegue consistente en cualquier entorno.",
      },
      {
        step: "3. Pipeline CI/CD",
        tooltip: "Tests automáticos y despliegue continuo con GitHub Actions.",
      },
      {
        step: "4. Monitoreo",
        tooltip: "Dashboard de salud de servicios en tiempo real.",
      },
    ],
  },
  {
    title: "Rediseño UX/UI B2B",
    description:
      "Transformación completa de una plataforma corporativa aplicando investigación UX, aumentando la retención en un 40%.",
    tags: ["Figma", "UI/UX", "React", "Tailwind"],
    demo: "#",
    color: "purple",
    icon: <Palette className="w-16 h-16 text-purple-400" />,
    gradient: "dark:from-purple-500/20 from-purple-500/10 dark:via-purple-600/5 via-purple-400/5 to-transparent",
    glowColor: "rgba(192, 132, 252, 0.15)",
    tagBg: "dark:bg-purple-500/10 bg-purple-500/5 dark:text-purple-300 text-purple-600 dark:border-purple-500/20 border-purple-300/20",
    btnBg: "from-purple-500/20 to-purple-400/20 hover:from-purple-500/30 hover:to-pink-500/30 border-purple-500/20 hover:border-purple-400/30",
    workflow: [
      {
        step: "1. Investigación UX",
        tooltip: "Entrevistas a usuarios y análisis heurístico del sistema anterior.",
      },
      {
        step: "2. Wireframes & Prototipos",
        tooltip: "Diseño iterativo en Figma con flujos de alta fidelidad.",
      },
      {
        step: "3. Sistema de Diseño",
        tooltip: "Creación de componentes reutilizables y consistentes.",
      },
      {
        step: "4. Implementación React",
        tooltip: "Desarrollo pixel-perfect de la nueva interfaz con Tailwind CSS.",
      },
    ],
  },
  {
    title: "Sistema POS & Dashboard Admin",
    description:
      "Sistema de punto de venta táctil con gestión de inventario en tiempo real y panel de administración avanzado.",
    tags: ["React", "Tailwind CSS", "Recharts", "React State"],
    demo: "/demo-pos",
    color: "emerald",
    icon: <Store className="w-16 h-16 text-emerald-400" />,
    gradient: "dark:from-emerald-500/20 from-emerald-500/10 dark:via-emerald-600/5 via-emerald-400/5 to-transparent",
    glowColor: "rgba(52, 211, 153, 0.15)",
    tagBg: "dark:bg-emerald-500/10 bg-emerald-500/5 dark:text-emerald-300 text-emerald-600 dark:border-emerald-500/20 border-emerald-300/20",
    btnBg: "from-emerald-500/20 to-emerald-400/20 hover:from-emerald-500/30 hover:to-teal-500/30 border-emerald-500/20 hover:border-emerald-400/30",
    workflow: [
      {
        step: "1. Venta (Cliente)",
        tooltip:
          "Interfaz táctil rápida para agregar productos al carrito y procesar el pago.",
      },
      {
        step: "2. Inventario Automático",
        tooltip:
          "Descuento automático de stock y bloqueo en tiempo real si el producto se agota.",
      },
      {
        step: "3. Dashboard",
        tooltip:
          "Métricas clave, gráficas de ventas y análisis del producto más vendido.",
      },
      {
        step: "4. Gestión",
        tooltip:
          "CRUD de productos/servicios con diferenciación de lógica de inventario.",
      },
    ],
  },
  {
    title: "Automatización Inteligente de Leads",
    description:
      "Prototipo funcional de automatización comercial que prioriza clientes potenciales mediante reglas de negocio, simulando flujo de integración con CRM.",
    tags: ["Next.js", "API Routes", "Tailwind CSS", "React State"],
    demo: "/demo-leads",
    color: "blue",
    icon: <Workflow className="w-16 h-16 text-blue-400" />,
    gradient: "dark:from-blue-500/20 from-blue-500/10 dark:via-blue-600/5 via-blue-400/5 to-transparent",
    glowColor: "rgba(96, 165, 250, 0.15)",
    tagBg: "dark:bg-blue-500/10 bg-blue-500/5 dark:text-blue-300 text-blue-600 dark:border-blue-500/20 border-blue-300/20",
    btnBg: "from-blue-500/20 to-blue-400/20 hover:from-blue-500/30 hover:to-cyan-500/30 border-blue-500/20 hover:border-blue-400/30",
    workflow: [
      {
        step: "1. Captura de Datos",
        tooltip:
          "Captura datos desde un formulario y los normaliza para su procesamiento.",
      },
      {
        step: "2. Clasificación Automática",
        tooltip:
          "Un algoritmo clasifica al lead como Alto o Bajo valor según reglas definidas.",
      },
      {
        step: "3. Feedback Visual",
        tooltip:
          "Muestra el resultado de la clasificación visualmente y en tiempo real.",
      },
      {
        step: "4. Mini Panel CRM",
        tooltip:
          "Guarda y organiza los leads procesados en un panel tipo Kanban.",
      },
    ],
  },
  {
    title: "SaaS Dashboard Analítico",
    description:
      "Plataforma de inteligencia de negocios interactiva que transforma datos en métricas estratégicas.",
    tags: ["React", "Tailwind CSS", "Recharts", "Data Analysis"],
    demo: "/demo-analytics",
    color: "purple",
    icon: <BarChart3 className="w-16 h-16 text-purple-400" />,
    gradient: "dark:from-purple-500/20 from-purple-500/10 dark:via-purple-600/5 via-purple-400/5 to-transparent",
    glowColor: "rgba(192, 132, 252, 0.15)",
    tagBg: "dark:bg-purple-500/10 bg-purple-500/5 dark:text-purple-300 text-purple-600 dark:border-purple-500/20 border-purple-300/20",
    btnBg: "from-purple-500/20 to-purple-400/20 hover:from-purple-500/30 hover:to-pink-500/30 border-purple-500/20 hover:border-purple-400/30",
    workflow: [
      {
        step: "1. KPIs Dinámicos",
        tooltip:
          "Cálculo en tiempo real de ingresos, promedios, crecimiento y días destacados.",
      },
      {
        step: "2. Gráficas Avanzadas",
        tooltip:
          "Visualización interactiva de tendencia y distribución de productos usando Recharts.",
      },
      {
        step: "3. Simulación de Datos",
        tooltip:
          "Motor de datos que permite inyectar ventas, simular picos o resetear el estado.",
      },
      {
        step: "4. Filtros Temporales",
        tooltip:
          "Segmentación de datos por rangos de fecha que re-calculan el dashboard al instante.",
      },
    ],
  },
];

function SpotlightCard({
  children,
  className,
  glowColor,
  isInView,
  index,
}: {
  children: React.ReactNode;
  className?: string;
  glowColor: string;
  isInView: boolean;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    []
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        delay: 0.3 + index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`${className} relative overflow-hidden`}
    >
      {/* Spotlight effect */}
      {isHovered && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300 z-0"
          style={{
            left: mousePos.x - 150,
            top: mousePos.y - 150,
            width: 300,
            height: 300,
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            borderRadius: "50%",
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section id="projects" ref={sectionRef} className="py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-purple-500/3 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-blue-500/3 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full dark:bg-blue-500/10 bg-blue-500/5 border dark:border-blue-500/20 border-blue-500/10 text-blue-400 text-xs font-medium mb-6"
          >
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            PROYECTOS
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold dark:text-white text-zinc-900 mb-6 tracking-tight"
          >
            Mis Proyectos{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Destacados
            </span>
          </motion.h2>

          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6" />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="dark:text-zinc-400 text-zinc-500 text-lg leading-relaxed"
          >
            Una selección de mis trabajos recientes. Cada proyecto representa un
            desafío único resuelto con tecnologías modernas y las mejores
            prácticas.
          </motion.p>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <SpotlightCard
              key={project.title}
              glowColor={project.glowColor}
              isInView={isInView}
              index={index}
              className={`dark:bg-zinc-900/80 bg-white/80 border dark:border-zinc-800/60 border-zinc-200/60 rounded-2xl flex flex-col hover:dark:border-zinc-700/80 hover:border-zinc-300/80 transition-all duration-500 group backdrop-blur-sm shadow-lg dark:shadow-black/20 shadow-black/5`}
            >
              {/* Project icon area */}
              <div className="h-52 relative overflow-hidden shrink-0">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute inset-0 bg-gradient-to-t dark:from-zinc-900 from-white via-transparent to-transparent z-10" />

                {/* Animated glow behind icon */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div
                    className="absolute w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: project.glowColor.replace("0.15", "0.3"),
                    }}
                  />
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="relative"
                  >
                    {project.icon}
                  </motion.div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold dark:text-white text-zinc-900 mb-3 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="dark:text-zinc-400 text-zinc-500 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Workflow */}
                {project.workflow && (
                  <div className="mb-6 space-y-2 flex-1">
                    <p className="text-xs font-semibold dark:text-zinc-500 text-zinc-400 uppercase tracking-wider mb-3">
                      Flujo del Sistema
                    </p>
                    <div className="flex flex-col gap-2">
                      {project.workflow.map((item, i) => (
                        <motion.div
                          key={item.step}
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ delay: 0.5 + index * 0.15 + i * 0.05, duration: 0.4 }}
                          className="flex flex-col dark:bg-zinc-950/40 bg-zinc-50/80 px-4 py-2.5 rounded-lg border dark:border-zinc-800/40 border-zinc-200/40 group-hover:dark:border-zinc-700/40 group-hover:border-zinc-300/40 transition-colors"
                        >
                          <span className="text-sm font-medium dark:text-white text-black mb-0.5">
                            {item.step}
                          </span>
                          <span className="text-xs dark:text-zinc-500 text-zinc-400 leading-relaxed">
                            {item.tooltip}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${project.tagBg} transition-all duration-300`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-4 pt-4 border-t dark:border-zinc-800/40 border-zinc-200/40 mt-auto">
                  <motion.a
                    href={project.demo}
                    className={`w-full bg-gradient-to-r ${project.btnBg} dark:text-white text-black border backdrop-blur-md transition-all flex items-center justify-center gap-2 text-sm font-medium py-3 rounded-xl`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Ver Demo Interactiva
                    <ArrowRight className="w-3 h-3" />
                  </motion.a>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
