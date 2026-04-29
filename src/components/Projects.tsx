"use client";

import { motion } from "framer-motion";
import { ExternalLink, Workflow, Store, BarChart3 } from "lucide-react";

const projects = [
  {
    title: "Automatización Inteligente de Leads",
    description: "Prototipo funcional de automatización comercial que prioriza clientes potenciales mediante reglas de negocio, simulando flujo de integración con CRM.",
    tags: ["Next.js", "API Routes", "Tailwind CSS", "Zustand"],
    demo: "/demo-leads",
    icon: <Workflow className="w-20 h-20 text-blue-400 drop-shadow-[0_0_20px_rgba(96,165,250,0.6)] group-hover:scale-110 group-hover:drop-shadow-[0_0_30px_rgba(96,165,250,0.8)] transition-all duration-500" />,
    workflow: [
      { step: "1. Captura de Datos", tooltip: "Captura datos desde un formulario y los normaliza para su procesamiento." },
      { step: "2. Clasificación Automática", tooltip: "Un algoritmo clasifica al lead como Alto o Bajo valor según reglas definidas (ej. presupuesto)." },
      { step: "3. Feedback Visual", tooltip: "Muestra el resultado de la clasificación visualmente y en tiempo real al usuario." },
      { step: "4. Mini Panel CRM", tooltip: "Guarda y organiza los leads procesados en un panel tipo Kanban para su gestión." }
    ]
  },
  {
    title: "Sistema POS & Dashboard Admin",
    description: "Sistema de punto de venta táctil con gestión de inventario en tiempo real y panel de administración avanzado.",
    tags: ["React", "Tailwind CSS", "Recharts", "Zustand"],
    demo: "/demo-pos",
    icon: <Store className="w-20 h-20 text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.6)] group-hover:scale-110 group-hover:drop-shadow-[0_0_30px_rgba(52,211,153,0.8)] transition-all duration-500" />,
    workflow: [
      { step: "1. Venta (Cliente)", tooltip: "Interfaz táctil rápida para agregar productos al carrito y procesar el pago." },
      { step: "2. Inventario Automático", tooltip: "Descuento automático de stock y bloqueo en tiempo real si el producto se agota." },
      { step: "3. Dashboard", tooltip: "Métricas clave, gráficas de ventas y análisis del producto más vendido." },
      { step: "4. Gestión", tooltip: "CRUD de productos/servicios con diferenciación de lógica de inventario." }
    ]
  },
  {
    title: "SaaS Dashboard Analítico",
    description: "Plataforma de inteligencia de negocios interactiva que transforma datos en métricas estratégicas.",
    tags: ["React", "Tailwind CSS", "Recharts", "Data Analysis"],
    demo: "/demo-analytics",
    icon: <BarChart3 className="w-20 h-20 text-purple-400 drop-shadow-[0_0_20px_rgba(192,132,252,0.6)] group-hover:scale-110 group-hover:drop-shadow-[0_0_30px_rgba(192,132,252,0.8)] transition-all duration-500" />,
    workflow: [
      { step: "1. KPIs Dinámicos", tooltip: "Cálculo en tiempo real de ingresos, promedios, crecimiento y días destacados." },
      { step: "2. Gráficas Avanzadas", tooltip: "Visualización interactiva de tendencia y distribución de productos usando Recharts." },
      { step: "3. Simulación de Datos", tooltip: "Motor de datos que permite inyectar ventas, simular picos o resetear el estado." },
      { step: "4. Filtros Temporales", tooltip: "Segmentación de datos por rangos de fecha que re-calculan el dashboard al instante." }
    ]
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Mis Proyectos Destacados
          </motion.h2>
          <div className="w-20 h-1 bg-blue-500 rounded-full mx-auto mb-6"></div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-lg leading-relaxed"
          >
            Una selección de mis trabajos recientes. Cada proyecto representa un desafío único 
            resuelto con tecnologías modernas y las mejores prácticas.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col hover:border-zinc-700 hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300 group"
            >
              {/* Espacio para imagen - mockup */}
              <div className="h-48 bg-zinc-950 relative overflow-hidden shrink-0 border-b border-zinc-800">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10" />
                <div className="w-full h-full flex items-center justify-center relative z-20">
                  {project.icon}
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                {project.workflow && (
                  <div className="mb-6 space-y-2 flex-1">
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Flujo del Sistema</p>
                    <div className="flex flex-col gap-3">
                      {project.workflow.map(item => (
                        <div key={item.step} className="flex flex-col bg-zinc-950/50 px-4 py-3 rounded-lg border border-zinc-800/50">
                          <span className="text-sm font-medium text-blue-400 mb-1">{item.step}</span>
                          <span className="text-xs text-zinc-400 leading-relaxed">{item.tooltip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className={`flex flex-wrap gap-2 mb-6 ${!project.workflow && 'mt-auto'}`}>
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 pt-4 border-t border-zinc-800/50 mt-auto">
                  <a href={project.demo} className="w-full bg-zinc-800 hover:bg-blue-600 text-white transition-colors flex items-center justify-center gap-2 text-sm font-medium py-2 rounded-lg">
                    <ExternalLink className="w-4 h-4" />
                    Ver Demo Interactiva
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
