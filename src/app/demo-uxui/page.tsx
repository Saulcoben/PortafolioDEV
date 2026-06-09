"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, DollarSign, ArrowUpRight, ArrowDownRight, Briefcase, FileText, LayoutTemplate, ArrowLeft, Activity } from "lucide-react";
import Link from "next/link";

export default function DemoUXUI() {
  const [viewMode, setViewMode] = useState<"before" | "after">("after");

  const toggleMode = () => {
    setViewMode(prev => prev === "before" ? "after" : "before");
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 ${viewMode === "after" ? "bg-zinc-50 dark:bg-zinc-950 font-sans" : "bg-gray-200 text-black font-serif"}`}>
      
      {/* Header & Controls */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-700 ${viewMode === "after" ? "bg-white/70 dark:bg-zinc-900/70 border-zinc-200 dark:border-zinc-800" : "bg-gray-300 border-gray-400"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className={`p-2 rounded-full transition-colors ${viewMode === "after" ? "hover:bg-zinc-100 dark:hover:bg-zinc-800" : "hover:bg-gray-400"}`}>
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex flex-col">
              <span className={`font-bold ${viewMode === "after" ? "text-xl dark:text-white" : "text-lg text-black"}`}>
                CorporateApp
              </span>
              {viewMode === "after" && <span className="text-xs text-blue-500 font-medium tracking-wider uppercase">Redesign V2.0</span>}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className={`text-sm font-medium ${viewMode === "before" ? "text-red-600 font-bold" : "text-zinc-500 dark:text-zinc-400"}`}>Legacy UI</span>
            <button 
              onClick={toggleMode}
              className={`relative w-16 h-8 rounded-full transition-colors duration-500 flex items-center px-1 ${viewMode === "after" ? "bg-blue-500" : "bg-gray-500"}`}
            >
              <motion.div 
                layout
                className={`w-6 h-6 rounded-full shadow-md ${viewMode === "after" ? "bg-white" : "bg-gray-200"}`}
                style={{ marginLeft: viewMode === "after" ? "auto" : "0" }}
              />
            </button>
            <span className={`text-sm font-medium ${viewMode === "after" ? "text-blue-500 font-bold" : "text-gray-500"}`}>Modern UI</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {viewMode === "before" ? (
            <motion.div
              key="before"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col md:flex-row gap-4 text-black"
            >
              {/* Legacy Sidebar */}
              <div className="w-full md:w-64 bg-gray-300 border border-gray-400 p-4">
                <ul className="space-y-2">
                  <li className="bg-gray-400 p-2 font-bold cursor-pointer underline">Dashboard</li>
                  <li className="p-2 cursor-pointer text-blue-800 hover:bg-gray-400">Users</li>
                  <li className="p-2 cursor-pointer text-blue-800 hover:bg-gray-400">Reports</li>
                  <li className="p-2 cursor-pointer text-blue-800 hover:bg-gray-400">Settings</li>
                </ul>
              </div>

              {/* Legacy Main Area */}
              <div className="flex-1 bg-white border border-gray-400 p-6">
                <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="border border-gray-500 p-4 w-48 bg-gray-100">
                    <div>Total Revenue</div>
                    <div className="text-xl font-bold text-green-700">$14,500.00</div>
                  </div>
                  <div className="border border-gray-500 p-4 w-48 bg-gray-100">
                    <div>Active Users</div>
                    <div className="text-xl font-bold text-black">1,250</div>
                  </div>
                  <div className="border border-gray-500 p-4 w-48 bg-gray-100">
                    <div>Bounce Rate</div>
                    <div className="text-xl font-bold text-red-700">45%</div>
                  </div>
                </div>

                <h2 className="text-xl mb-4">Recent Transactions</h2>
                <table className="w-full border-collapse border border-gray-500 text-sm">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="border border-gray-500 p-2 text-left">ID</th>
                      <th className="border border-gray-500 p-2 text-left">Date</th>
                      <th className="border border-gray-500 p-2 text-left">Amount</th>
                      <th className="border border-gray-500 p-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-500 p-2">TRX-001</td>
                      <td className="border border-gray-500 p-2">10/12/2023</td>
                      <td className="border border-gray-500 p-2">$450.00</td>
                      <td className="border border-gray-500 p-2 text-green-700">Completed</td>
                    </tr>
                    <tr className="bg-gray-100">
                      <td className="border border-gray-500 p-2">TRX-002</td>
                      <td className="border border-gray-500 p-2">10/12/2023</td>
                      <td className="border border-gray-500 p-2">$120.00</td>
                      <td className="border border-gray-500 p-2 text-red-700">Failed</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-500 p-2">TRX-003</td>
                      <td className="border border-gray-500 p-2">11/12/2023</td>
                      <td className="border border-gray-500 p-2">$890.00</td>
                      <td className="border border-gray-500 p-2 text-orange-600">Pending</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="after"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col md:flex-row gap-8"
            >
              {/* Modern Sidebar */}
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-full md:w-64 bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-black/20 shrink-0"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 p-3 rounded-xl font-bold transition-all cursor-pointer">
                    <LayoutTemplate className="w-5 h-5" /> Dashboard
                  </div>
                  <div className="flex items-center gap-3 text-zinc-500 hover:text-zinc-900 dark:hover:text-white p-3 rounded-xl font-medium transition-all cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <Users className="w-5 h-5" /> Users
                  </div>
                  <div className="flex items-center gap-3 text-zinc-500 hover:text-zinc-900 dark:hover:text-white p-3 rounded-xl font-medium transition-all cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <FileText className="w-5 h-5" /> Reports
                  </div>
                  <div className="flex items-center gap-3 text-zinc-500 hover:text-zinc-900 dark:hover:text-white p-3 rounded-xl font-medium transition-all cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <Briefcase className="w-5 h-5" /> Settings
                  </div>
                </div>

                {/* Engagement metric snippet */}
                <div className="mt-12 p-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl text-white relative overflow-hidden group">
                  <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTIwIDIwTDAgMjBMMjAgMEwyMCAyMHoiIGZpbGw9IiNmZmYiLz4KPC9zdmc+')]"></div>
                  <div className="relative z-10">
                    <div className="text-sm font-medium mb-1 opacity-90">User Retention</div>
                    <div className="text-3xl font-extrabold flex items-center gap-2">
                      84% <ArrowUpRight className="w-5 h-5 text-green-300" />
                    </div>
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                </div>
              </motion.div>

              {/* Modern Main Area */}
              <div className="flex-1 space-y-8 min-w-0">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                  <div>
                    <motion.h1 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-3xl md:text-4xl font-bold dark:text-white text-zinc-900 tracking-tight mb-2"
                    >
                      Dashboard Overview
                    </motion.h1>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-zinc-500 text-lg"
                    >
                      Your metrics look excellent today.
                    </motion.p>
                  </div>
                  <motion.button 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-3 rounded-full font-bold hover:scale-105 active:scale-95 transition-all shadow-lg text-sm whitespace-nowrap"
                  >
                    Download Report
                  </motion.button>
                </div>
                
                {/* Modern Stats Grid */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-6"
                >
                  <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl dark:hover:shadow-black/20 transition-all group">
                    <div className="flex items-center gap-3 mb-4 text-zinc-500 font-medium">
                      <div className="p-2.5 bg-blue-50 dark:bg-blue-500/10 text-blue-500 rounded-xl group-hover:scale-110 transition-transform"><DollarSign className="w-5 h-5" /></div>
                      Total Revenue
                    </div>
                    <div className="text-3xl font-extrabold dark:text-white text-zinc-900 mb-2">$14,500.00</div>
                    <div className="flex items-center gap-1 text-sm font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 w-fit px-2 py-1 rounded-lg">
                      <ArrowUpRight className="w-4 h-4" /> +12.5%
                    </div>
                  </div>
                  <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl dark:hover:shadow-black/20 transition-all group">
                    <div className="flex items-center gap-3 mb-4 text-zinc-500 font-medium">
                      <div className="p-2.5 bg-purple-50 dark:bg-purple-500/10 text-purple-500 rounded-xl group-hover:scale-110 transition-transform"><Users className="w-5 h-5" /></div>
                      Active Users
                    </div>
                    <div className="text-3xl font-extrabold dark:text-white text-zinc-900 mb-2">1,250</div>
                    <div className="flex items-center gap-1 text-sm font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 w-fit px-2 py-1 rounded-lg">
                      <ArrowUpRight className="w-4 h-4" /> +8.2%
                    </div>
                  </div>
                  <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl dark:hover:shadow-black/20 transition-all group">
                    <div className="flex items-center gap-3 mb-4 text-zinc-500 font-medium">
                      <div className="p-2.5 bg-orange-50 dark:bg-orange-500/10 text-orange-500 rounded-xl group-hover:scale-110 transition-transform"><Activity className="w-5 h-5" /></div>
                      Bounce Rate
                    </div>
                    <div className="text-3xl font-extrabold dark:text-white text-zinc-900 mb-2">24%</div>
                    <div className="flex items-center gap-1 text-sm font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 w-fit px-2 py-1 rounded-lg">
                      <ArrowDownRight className="w-4 h-4" /> -21%
                    </div>
                  </div>
                </motion.div>

                {/* Modern Table */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm"
                >
                  <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold dark:text-white text-zinc-900">Recent Transactions</h2>
                    <button className="text-blue-500 text-sm font-bold hover:underline">View All</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-zinc-50 dark:bg-zinc-950/50 text-zinc-500 uppercase tracking-wider text-xs font-bold">
                        <tr>
                          <th className="px-6 py-4">Transaction ID</th>
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4">Amount</th>
                          <th className="px-6 py-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                          <td className="px-6 py-4 font-mono text-zinc-600 dark:text-zinc-400">TRX-001</td>
                          <td className="px-6 py-4 font-medium dark:text-white text-zinc-900">10 Dec, 2023</td>
                          <td className="px-6 py-4 font-bold dark:text-white text-zinc-900">$450.00</td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Completed</span>
                          </td>
                        </tr>
                        <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                          <td className="px-6 py-4 font-mono text-zinc-600 dark:text-zinc-400">TRX-002</td>
                          <td className="px-6 py-4 font-medium dark:text-white text-zinc-900">10 Dec, 2023</td>
                          <td className="px-6 py-4 font-bold dark:text-white text-zinc-900">$120.00</td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400">Failed</span>
                          </td>
                        </tr>
                        <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                          <td className="px-6 py-4 font-mono text-zinc-600 dark:text-zinc-400">TRX-003</td>
                          <td className="px-6 py-4 font-medium dark:text-white text-zinc-900">11 Dec, 2023</td>
                          <td className="px-6 py-4 font-bold dark:text-white text-zinc-900">$890.00</td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400">Processing</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
