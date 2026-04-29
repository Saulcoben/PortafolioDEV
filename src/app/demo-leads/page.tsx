"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Settings, User, Building, DollarSign, Mail } from "lucide-react";
import Link from "next/link";

type Lead = {
  id: string;
  name: string;
  email: string;
  budget: number;
  employees: number;
  status: "NUEVO" | "ALTO_VALOR" | "BAJO_VALOR";
};

export default function DemoLeads() {
  const [leads, setLeads] = useState<Lead[]>([
    { id: "1", name: "Empresa Alpha", email: "contacto@alpha.com", budget: 10000, employees: 120, status: "ALTO_VALOR" },
    { id: "2", name: "Startup Beta", email: "hola@beta.io", budget: 2000, employees: 10, status: "BAJO_VALOR" },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "",
    employees: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [lastProcessed, setLastProcessed] = useState<Lead | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const newLead: Lead = {
      id: Math.random().toString(36).substring(7),
      name: formData.name,
      email: formData.email,
      budget: Number(formData.budget),
      employees: Number(formData.employees),
      status: "NUEVO",
    };

    // Simulando el ingreso de datos al sistema central
    setTimeout(() => {
      // Regla de Negocio
      let finalStatus: "ALTO_VALOR" | "BAJO_VALOR" = "BAJO_VALOR";
      if (newLead.budget > 5000 && newLead.employees > 50) {
        finalStatus = "ALTO_VALOR";
      }

      newLead.status = finalStatus;
      setLastProcessed(newLead);
      setLeads((prev) => [newLead, ...prev]);
      setIsProcessing(false);
      setFormData({ name: "", email: "", budget: "", employees: "" });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans">
      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-800 p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Volver al Portfolio
          </Link>
          <div className="text-sm font-medium px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
            Demo Funcional
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">Automatización Inteligente de Leads</h1>
          <p className="text-zinc-400 max-w-3xl">
            Este prototipo demuestra cómo se puede capturar información de clientes potenciales, procesarla mediante un 
            motor de reglas de negocio y clasificarla automáticamente en un CRM.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Columna 1: Captura */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-[50px]"></div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-blue-400">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">1. Captura</h2>
                  <p className="text-xs text-zinc-500">Formulario simulado</p>
                </div>
              </div>

              <div className="text-sm text-blue-100/70 mb-6 bg-blue-500/5 border border-blue-500/20 p-4 rounded-xl">
                <strong className="text-blue-400 flex items-center gap-2 mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">i</span>
                  ¿Qué pasa aquí?
                </strong>
                El usuario (o una integración API) envía los datos. El sistema los recibe e inicia el flujo de clasificación.
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Nombre / Empresa</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Ej. Acme Corp" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="contacto@acme.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">Presupuesto ($)</label>
                    <div className="relative">
                      <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <input required type="number" min="0" value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-2 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="5000" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">Empleados</label>
                    <div className="relative">
                      <Building className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <input required type="number" min="1" value={formData.employees} onChange={(e) => setFormData({...formData, employees: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-2 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="50" />
                    </div>
                  </div>
                </div>
                <button disabled={isProcessing} type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4">
                  {isProcessing ? "Procesando..." : "Simular Ingreso"}
                  {!isProcessing && <Send className="w-4 h-4" />}
                </button>
              </form>
            </div>
          </div>

          {/* Columna 2: Motor de Reglas */}
          <div className="lg:col-span-3 flex flex-col justify-center items-center relative">
            {/* Conectores visuales (solo desktop) */}
            <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-8 border-t-2 border-dashed border-zinc-700 -z-10"></div>
            <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-8 border-t-2 border-dashed border-zinc-700 -z-10"></div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center shadow-xl w-full">
              <div className="w-16 h-16 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-center text-blue-500 mx-auto mb-4 relative">
                <Settings className={`w-8 h-8 ${isProcessing ? 'animate-spin' : ''}`} />
                {isProcessing && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                  </span>
                )}
              </div>
              <h2 className="text-lg font-bold text-white mb-2">2. Motor de Reglas</h2>
              <div className="text-xs text-blue-100/70 text-left mb-6 bg-blue-500/5 border border-blue-500/20 p-4 rounded-xl">
                <strong className="text-blue-400 flex items-center gap-2 mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">i</span>
                  Regla Activa
                </strong>
                Si el presupuesto {'>'} $5,000 <span className="text-blue-400 font-semibold mx-1">Y</span> empleados {'>'} 50 <br/>
                <span className="text-blue-400 font-semibold mt-1 inline-block">➔</span> Se clasifica como <strong>Alto Valor</strong>.<br/>
                <span className="text-zinc-500 font-semibold mt-1 inline-block">➔</span> De lo contrario, <strong>Bajo Valor</strong>.
              </div>

              <div className="h-16 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {lastProcessed && !isProcessing && (
                    <motion.div 
                      key={lastProcessed.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
                        lastProcessed.status === 'ALTO_VALOR' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                      }`}
                    >
                      Resultado: {lastProcessed.status.replace('_', ' ')}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Columna 3: Mini CRM Kanban */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl h-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white">3. Panel CRM</h2>
                  <p className="text-xs text-zinc-500">Distribución Automática</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Columna Alto Valor */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs font-bold text-zinc-300">Alto Valor</span>
                    <span className="text-[10px] bg-zinc-800 px-1.5 rounded-full ml-auto text-zinc-400">
                      {leads.filter(l => l.status === 'ALTO_VALOR').length}
                    </span>
                  </div>
                  <div className="space-y-2 h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                    <AnimatePresence>
                      {leads.filter(l => l.status === 'ALTO_VALOR').map(lead => (
                        <motion.div 
                          key={lead.id}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-zinc-900 border border-green-500/20 rounded-lg p-3"
                        >
                          <p className="text-sm font-medium text-white truncate">{lead.name}</p>
                          <p className="text-[10px] text-zinc-500 mb-2 truncate">{lead.email}</p>
                          <div className="flex items-center gap-3 text-[10px] text-zinc-400">
                            <span className="flex items-center gap-1"><DollarSign className="w-3 h-3 text-green-400"/> {lead.budget}</span>
                            <span className="flex items-center gap-1"><Building className="w-3 h-3 text-zinc-500"/> {lead.employees}</span>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Columna Bajo Valor */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span className="text-xs font-bold text-zinc-300">Bajo Valor</span>
                    <span className="text-[10px] bg-zinc-800 px-1.5 rounded-full ml-auto text-zinc-400">
                      {leads.filter(l => l.status === 'BAJO_VALOR').length}
                    </span>
                  </div>
                  <div className="space-y-2 h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                    <AnimatePresence>
                      {leads.filter(l => l.status === 'BAJO_VALOR').map(lead => (
                        <motion.div 
                          key={lead.id}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-zinc-900 border border-orange-500/20 rounded-lg p-3"
                        >
                          <p className="text-sm font-medium text-white truncate">{lead.name}</p>
                          <p className="text-[10px] text-zinc-500 mb-2 truncate">{lead.email}</p>
                          <div className="flex items-center gap-3 text-[10px] text-zinc-400">
                            <span className="flex items-center gap-1"><DollarSign className="w-3 h-3 text-orange-400"/> {lead.budget}</span>
                            <span className="flex items-center gap-1"><Building className="w-3 h-3 text-zinc-500"/> {lead.employees}</span>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
