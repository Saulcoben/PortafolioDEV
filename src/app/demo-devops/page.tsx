"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Server, Github, CheckCircle2, CircleDashed, Terminal, ArrowLeft, Play, Box } from "lucide-react";
import Link from "next/link";

const steps = [
  { id: "lint", label: "Linting & Testing", duration: 1500 },
  { id: "build", label: "Building Next.js App", duration: 2500 },
  { id: "docker", label: "Dockerizing Container", duration: 2000 },
  { id: "deploy", label: "Deploying to Production", duration: 1500 },
];

export default function DemoDevops() {
  const [deployStatus, setDeployStatus] = useState<"idle" | "running" | "success">("idle");
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [logs, setLogs] = useState<string[]>(["> Ready for deployment. Waiting for trigger..."]);

  const triggerDeploy = () => {
    if (deployStatus === "running") return;
    setDeployStatus("running");
    setCurrentStepIndex(0);
    setLogs(["> Starting deployment pipeline..."]);
  };

  useEffect(() => {
    if (deployStatus === "running" && currentStepIndex >= 0 && currentStepIndex < steps.length) {
      const step = steps[currentStepIndex];
      
      const logInterval = setInterval(() => {
        setLogs(prev => [...prev, `[${step.id}] processing data chunk...`]);
      }, 400);

      const stepTimer = setTimeout(() => {
        clearInterval(logInterval);
        setLogs(prev => [...prev, `✓ [${step.id}] completed successfully.`]);
        setCurrentStepIndex(prev => prev + 1);
      }, step.duration);

      return () => {
        clearInterval(logInterval);
        clearTimeout(stepTimer);
      };
    } else if (deployStatus === "running" && currentStepIndex === steps.length) {
      setDeployStatus("success");
      setLogs(prev => [...prev, "> Deployment finished successfully!", "> Application is now live."]);
    }
  }, [deployStatus, currentStepIndex]);

  const displayLogs = logs.slice(-15);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-mono flex flex-col selection:bg-blue-500/30">
      {/* Header */}
      <header className="border-b border-zinc-800/80 bg-[#0A0A0A]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-5 text-white">
          <Link href="/" className="p-2 hover:bg-zinc-800/80 rounded-lg transition-colors border border-transparent hover:border-zinc-700">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2.5 font-bold text-lg">
            <div className="p-1.5 bg-blue-500/10 rounded-md">
              <Server className="w-5 h-5 text-blue-500" />
            </div>
            <span>DevOps<span className="text-zinc-500 font-normal">Pipeline</span></span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-400 text-xs uppercase tracking-wider">System Healthy</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Pipeline State */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0F0F0F] border border-zinc-800/80 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 opacity-50" />
            
            <h2 className="text-white font-bold mb-8 flex items-center gap-3 text-lg">
              <Activity className="w-5 h-5 text-blue-400" />
              Deployment Status
            </h2>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:h-full before:w-[2px] before:bg-zinc-800/80">
              {steps.map((step, index) => {
                const isCompleted = currentStepIndex > index || deployStatus === "success";
                const isCurrent = currentStepIndex === index;
                
                return (
                  <div key={step.id} className="relative flex items-center gap-5 group">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 bg-[#0F0F0F] ring-4 ring-[#0F0F0F] transition-colors duration-500 ${isCompleted ? 'text-emerald-500' : isCurrent ? 'text-blue-500' : 'text-zinc-600'}`}>
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : isCurrent ? <CircleDashed className="w-5 h-5 animate-spin" /> : <div className="w-2 h-2 rounded-full bg-zinc-700" />}
                    </div>
                    <div className={`flex-1 transition-colors duration-300 ${isCompleted ? 'text-emerald-400 font-medium' : isCurrent ? 'text-blue-400 font-bold' : 'text-zinc-500'}`}>
                      {step.label}
                    </div>
                  </div>
                );
              })}
            </div>

            <button 
              onClick={triggerDeploy}
              disabled={deployStatus === "running"}
              className={`mt-10 w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 text-sm tracking-wide ${deployStatus === "running" ? 'bg-zinc-800/50 text-zinc-500 cursor-not-allowed border border-zinc-700/50' : deployStatus === "success" ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20' : 'bg-blue-600 text-white hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] border border-blue-500'}`}
            >
              {deployStatus === "running" ? (
                <><CircleDashed className="w-4 h-4 animate-spin" /> RUNNING PIPELINE...</>
              ) : deployStatus === "success" ? (
                <><CheckCircle2 className="w-4 h-4" /> DEPLOY SUCCESS - RETRIGGER?</>
              ) : (
                <><Play className="w-4 h-4 fill-current" /> TRIGGER DEPLOYMENT</>
              )}
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#0F0F0F] border border-zinc-800/80 rounded-2xl p-6"
          >
            <h3 className="text-zinc-500 text-xs font-bold mb-4 uppercase tracking-wider flex items-center gap-2">
              <Github className="w-4 h-4" />
              Environment Info
            </h3>
            <div className="space-y-4 text-sm font-sans">
              <div className="flex justify-between items-center pb-3 border-b border-zinc-800/50">
                <span className="text-zinc-400">Branch</span>
                <span className="text-zinc-200 font-medium bg-zinc-800/80 px-2 py-0.5 rounded text-xs">main</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-zinc-800/50">
                <span className="text-zinc-400">Commit</span>
                <span className="text-blue-400 font-mono text-xs">#a7f92bc</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Target Environment</span>
                <span className="text-zinc-200 font-medium flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Production (AWS)
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Logs & Stats */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 bg-[#0A0A0A] border border-zinc-800/80 rounded-2xl overflow-hidden flex flex-col shadow-2xl relative min-h-[400px]"
          >
            {/* Terminal Header */}
            <div className="bg-[#151515] px-4 py-3 border-b border-zinc-800/80 flex items-center gap-2 z-20">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-zinc-700" />
                <div className="w-3 h-3 rounded-full bg-zinc-700" />
                <div className="w-3 h-3 rounded-full bg-zinc-700" />
              </div>
              <div className="mx-auto flex items-center gap-2 text-xs text-zinc-500 font-medium font-sans">
                <Terminal className="w-3.5 h-3.5" />
                build-process.log
              </div>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 p-6 overflow-hidden flex flex-col justify-end text-[13px] leading-relaxed relative font-mono">
              <AnimatePresence>
                {deployStatus === "success" && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="absolute inset-0 bg-emerald-500/5 pointer-events-none z-0" 
                  />
                )}
              </AnimatePresence>

              <div className="space-y-1.5 relative z-10">
                <AnimatePresence>
                  {displayLogs.map((log, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={log.includes("✓") || log.includes("success") ? "text-emerald-400" : log.includes("Error") ? "text-red-400" : log.includes(">") ? "text-blue-400" : "text-zinc-400"}
                    >
                      {log}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {deployStatus === "running" && (
                  <motion.div 
                    animate={{ opacity: [1, 0, 1] }} 
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2 h-4 bg-zinc-500 mt-1 inline-block" 
                  />
                )}
              </div>
            </div>
          </motion.div>
          
          {/* Quick Stats Grid below terminal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#0F0F0F] border border-zinc-800/80 rounded-xl p-5 hover:border-zinc-700 transition-colors"
            >
              <div className="text-zinc-500 text-xs mb-2 font-medium uppercase tracking-wider">Docker Image Size</div>
              <div className="text-2xl font-bold text-white flex items-baseline gap-1">
                68 <span className="text-sm text-zinc-500 font-normal">MB</span>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#0F0F0F] border border-zinc-800/80 rounded-xl p-5 hover:border-zinc-700 transition-colors"
            >
              <div className="text-zinc-500 text-xs mb-2 font-medium uppercase tracking-wider">Build Time</div>
              <div className="text-2xl font-bold text-white flex items-baseline gap-1">
                {deployStatus === "success" ? "7.5" : "-"} <span className="text-sm text-zinc-500 font-normal">s</span>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#0F0F0F] border border-zinc-800/80 rounded-xl p-5 hover:border-zinc-700 transition-colors"
            >
              <div className="text-zinc-500 text-xs mb-2 font-medium uppercase tracking-wider">Active Containers</div>
              <div className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
                <Box className="w-5 h-5" /> 4
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
