"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, TrendingUp, TrendingDown, DollarSign, 
  Calendar, BarChart3, Package, Zap, RefreshCcw, Plus, Activity
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid,
  BarChart, Bar, Cell
} from 'recharts';

type ProductSale = { name: string; qty: number; revenue: number };

interface DailySale {
  id: string;
  date: string; // YYYY-MM-DD
  total: number;
  transactions: number;
  products: ProductSale[];
}

// Generate some realistic initial data
const generateInitialData = (): DailySale[] => {
  const data: DailySale[] = [];
  const today = new Date();
  
  for (let i = 14; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Base amount with some random fluctuation
    const baseTotal = 1500 + Math.random() * 2000;
    // Add weekend bumps
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const finalTotal = isWeekend ? baseTotal * 1.5 : baseTotal;
    const transactions = Math.floor(finalTotal / 50);

    data.push({
      id: Math.random().toString(36).substring(7),
      date: dateStr,
      total: Math.round(finalTotal),
      transactions,
      products: [
        { name: "Licencia Pro", qty: Math.floor(transactions * 0.4), revenue: Math.round(finalTotal * 0.6) },
        { name: "Licencia Basic", qty: Math.floor(transactions * 0.5), revenue: Math.round(finalTotal * 0.3) },
        { name: "Soporte Extra", qty: Math.floor(transactions * 0.1), revenue: Math.round(finalTotal * 0.1) }
      ]
    });
  }
  return data.reverse(); // Newest first
};

const INITIAL_DATA = generateInitialData();

export default function AnalyticsDemo() {
  const [data, setData] = useState<DailySale[]>(INITIAL_DATA);
  const [range, setRange] = useState<"7D" | "14D" | "ALL">("14D");

  // Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ date: new Date().toISOString().split('T')[0], total: 3500, transactions: 45 });

  // -------------------------
  // Calculadora de Métricas
  // -------------------------
  const filteredData = useMemo(() => {
    let days = data.length;
    if (range === "7D") days = 7;
    if (range === "14D") days = 14;
    return data.slice(0, days);
  }, [data, range]);

  const previousPeriodData = useMemo(() => {
    let days = data.length;
    if (range === "7D") days = 7;
    if (range === "14D") days = 14;
    if (range === "ALL") return []; // No previous period to compare if ALL
    return data.slice(days, days * 2);
  }, [data, range]);

  const metrics = useMemo(() => {
    if (filteredData.length === 0) return null;

    const totalRevenue = filteredData.reduce((sum, d) => sum + d.total, 0);
    const prevRevenue = previousPeriodData.reduce((sum, d) => sum + d.total, 0);
    
    let growth = 0;
    if (prevRevenue > 0) {
      growth = ((totalRevenue - prevRevenue) / prevRevenue) * 100;
    }

    const dailyAverage = totalRevenue / filteredData.length;
    
    let bestDay = filteredData[0];
    let worstDay = filteredData[0];
    const productStats: Record<string, { qty: number; revenue: number }> = {};

    filteredData.forEach(d => {
      if (d.total > bestDay.total) bestDay = d;
      if (d.total < worstDay.total) worstDay = d;

      d.products.forEach(p => {
        if (!productStats[p.name]) productStats[p.name] = { qty: 0, revenue: 0 };
        productStats[p.name].qty += p.qty;
        productStats[p.name].revenue += p.revenue;
      });
    });

    const topProduct = Object.entries(productStats)
      .sort((a, b) => b[1].revenue - a[1].revenue)[0]?.[0] || "N/A";

    // Format chart data (chronological order)
    const chartData = [...filteredData].reverse().map(d => ({
      date: new Date(d.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
      total: d.total,
      transactions: d.transactions
    }));

    const productChartData = Object.entries(productStats)
      .sort((a, b) => b[1].revenue - a[1].revenue)
      .map(([name, stats]) => ({
        name,
        revenue: stats.revenue
      })).slice(0, 5); // Top 5

    return { totalRevenue, growth, dailyAverage, bestDay, worstDay, topProduct, chartData, productChartData };
  }, [filteredData, previousPeriodData]);

  // -------------------------
  // Acciones Interactivas
  // -------------------------
  const handleReset = () => setData(INITIAL_DATA);

  const handleSimulateSpike = () => {
    const today = new Date();
    const newData: DailySale[] = [];
    for (let i = 0; i < 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i + 1); // Future dates to make it visible at the top
      
      const spikeTotal = 8000 + Math.random() * 4000; // Huge spike
      newData.push({
        id: Math.random().toString(36).substring(7),
        date: date.toISOString().split('T')[0],
        total: Math.round(spikeTotal),
        transactions: Math.floor(spikeTotal / 40),
        products: [
          { name: "Licencia Enterprise", qty: 5, revenue: Math.round(spikeTotal * 0.8) },
          { name: "Soporte Extra", qty: 20, revenue: Math.round(spikeTotal * 0.2) }
        ]
      });
    }
    setData(prev => [...newData.reverse(), ...prev]);
  };

  const handleAddManual = (e: React.FormEvent) => {
    e.preventDefault();
    const newSale: DailySale = {
      id: Math.random().toString(36).substring(7),
      date: formData.date,
      total: formData.total,
      transactions: formData.transactions,
      products: [
        { name: "Venta Manual", qty: formData.transactions, revenue: formData.total }
      ]
    };
    
    // Insert and sort by date descending
    const newData = [...data, newSale].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setData(newData);
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-50 font-sans selection:bg-blue-500/30">
      {/* Header */}
      <header className="bg-zinc-900/50 backdrop-blur-md border-b border-zinc-800/50 p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Volver al Portfolio
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-zinc-800/50 p-1 rounded-lg">
              <button onClick={() => setRange("7D")} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${range === '7D' ? 'bg-zinc-700 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'}`}>7 Días</button>
              <button onClick={() => setRange("14D")} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${range === '14D' ? 'bg-zinc-700 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'}`}>14 Días</button>
              <button onClick={() => setRange("ALL")} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${range === 'ALL' ? 'bg-zinc-700 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'}`}>Todo</button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-blue-500" />
              SaaS Analytics
            </h1>
            <p className="text-zinc-400 max-w-2xl text-sm">
              Dashboard interactivo. Selecciona rangos de fecha o inyecta datos usando el panel lateral para ver cómo reaccionan las métricas y gráficas en tiempo real.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Dashboard Area */}
          <div className="xl:col-span-3 space-y-6">
            
            {/* KPIs */}
            {metrics && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><DollarSign className="w-16 h-16 text-blue-500" /></div>
                  <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">Ingresos</p>
                  <h3 className="text-2xl font-black text-white mb-2">${metrics.totalRevenue.toLocaleString()}</h3>
                  {range !== "ALL" && (
                    <div className={`flex items-center gap-1 text-xs font-medium ${metrics.growth >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {metrics.growth >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {Math.abs(metrics.growth).toFixed(1)}% vs periodo anterior
                    </div>
                  )}
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Activity className="w-16 h-16 text-indigo-500" /></div>
                  <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">Promedio Diario</p>
                  <h3 className="text-2xl font-black text-white mb-2">${Math.round(metrics.dailyAverage).toLocaleString()}</h3>
                  <div className="text-xs text-zinc-500">En el rango seleccionado</div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Calendar className="w-16 h-16 text-orange-500" /></div>
                  <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">Día Récord</p>
                  <h3 className="text-xl font-black text-emerald-400 mb-1">${metrics.bestDay.total.toLocaleString()}</h3>
                  <div className="text-xs text-zinc-500">{new Date(metrics.bestDay.date).toLocaleDateString('es-ES', { weekday: 'long', month: 'short', day: 'numeric' })}</div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Package className="w-16 h-16 text-purple-500" /></div>
                  <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">Top Producto</p>
                  <h3 className="text-xl font-black text-white mb-1 line-clamp-1" title={metrics.topProduct}>{metrics.topProduct}</h3>
                  <div className="text-xs text-zinc-500">Generador principal</div>
                </div>
              </div>
            )}

            {/* Charts Area */}
            {metrics && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Evolution Chart */}
                <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-sm font-bold text-white">Evolución de Ingresos</h3>
                      <p className="text-xs text-zinc-500">Tendencia en el rango seleccionado</p>
                    </div>
                  </div>
                  <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={metrics.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                        <XAxis dataKey="date" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} minTickGap={20} />
                        <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={val => `$${val/1000}k`} />
                        <RechartsTooltip 
                          contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                          itemStyle={{ color: '#60a5fa', fontWeight: 'bold' }}
                          formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Ingresos']}
                          labelStyle={{ color: '#a1a1aa', marginBottom: '4px' }}
                        />
                        <Area type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" activeDot={{ r: 6, fill: '#3b82f6', stroke: '#09090b', strokeWidth: 2 }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Top Products Bar Chart */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-lg flex flex-col">
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-white">Distribución por Producto</h3>
                    <p className="text-xs text-zinc-500">Ingresos generados</p>
                  </div>
                  <div className="flex-1 h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={metrics.productChartData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#27272a" />
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={80} stroke="#a1a1aa" fontSize={10} tickLine={false} axisLine={false} />
                        <RechartsTooltip 
                          cursor={{ fill: '#27272a' }}
                          contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                          formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Ingresos']}
                        />
                        <Bar dataKey="revenue" radius={[0, 4, 4, 0]} barSize={24}>
                          {metrics.productChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? '#8b5cf6' : '#4c1d95'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
              </div>
            )}
          </div>

          {/* Sidebar / Interaction Panel */}
          <div className="xl:col-span-1 space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-blue-400 flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4" />
                Motor de Simulación
              </h3>
              <p className="text-xs text-blue-100/60 leading-relaxed mb-4">
                Utiliza estas herramientas para alterar los datos históricos y observar cómo el dashboard recalcula y re-dibuja todas las gráficas instantáneamente.
              </p>

              <div className="space-y-3">
                <button 
                  onClick={handleSimulateSpike}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-900/20 active:scale-[0.98]"
                >
                  <TrendingUp className="w-4 h-4" />
                  Simular "Semana Intensa"
                </button>
                
                <button 
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <Plus className="w-4 h-4" />
                  Agregar Venta Manual
                </button>

                <button 
                  onClick={handleReset}
                  className="w-full bg-transparent hover:bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <RefreshCcw className="w-3 h-3" />
                  Resetear Datos
                </button>
              </div>
            </div>

            {/* Manual Form */}
            {showAddForm && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xl animate-in fade-in slide-in-from-top-4">
                <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-wider">Nueva Entrada</h4>
                <form onSubmit={handleAddManual} className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-medium text-zinc-500 mb-1 uppercase tracking-wider">Fecha</label>
                    <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-zinc-500 mb-1 uppercase tracking-wider">Ingresos Totales ($)</label>
                    <input type="number" min="0" required value={formData.total} onChange={e => setFormData({...formData, total: Number(e.target.value)})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-zinc-500 mb-1 uppercase tracking-wider">Nº Transacciones</label>
                    <input type="number" min="1" required value={formData.transactions} onChange={e => setFormData({...formData, transactions: Number(e.target.value)})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
                  </div>
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2.5 rounded-lg transition-colors mt-2">
                    Guardar
                  </button>
                </form>
              </div>
            )}
            
            <div className="text-[10px] text-zinc-600 px-4 mt-6 text-center">
              Todo funciona 100% en memoria del navegador utilizando hooks de React. No hay llamadas a backend real.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
