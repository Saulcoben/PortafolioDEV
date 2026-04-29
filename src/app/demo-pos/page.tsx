"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Bath, Droplet, Coffee, Package, 
  TrendingUp, DollarSign, ShoppingCart, Plus, 
  Trash2, X, AlertCircle, CheckCircle2, User, LayoutDashboard, History,
  Edit2, PlusCircle, Power
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

type ItemType = "product" | "service";

interface Item {
  id: string;
  name: string;
  price: number;
  type: ItemType;
  stock?: number;
  active: boolean;
  icon: string;
}

interface CartItem {
  item: Item;
  qty: number;
}

interface Sale {
  id: string;
  items: CartItem[];
  total: number;
  date: Date;
}

const ICONS: Record<string, React.ReactNode> = {
  Bath: <Bath className="w-8 h-8" />,
  Droplet: <Droplet className="w-8 h-8" />,
  Coffee: <Coffee className="w-8 h-8" />,
  Package: <Package className="w-8 h-8" />,
};

const INITIAL_ITEMS: Item[] = [
  { id: "1", name: "Servicio de baño", price: 1000, type: "service", active: true, icon: "Bath" },
  { id: "2", name: "Agua", price: 2000, type: "product", stock: 15, active: true, icon: "Droplet" },
  { id: "3", name: "Gaseosa", price: 3000, type: "product", stock: 8, active: true, icon: "Coffee" },
  { id: "4", name: "Bombones", price: 500, type: "product", stock: 30, active: true, icon: "Package" },
];

export default function POSDemo() {
  const [view, setView] = useState<"admin" | "client">("client");
  
  // State
  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS);
  const [sales, setSales] = useState<Sale[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Admin Form State
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Item>>({ type: "product", active: true, icon: "Package" });

  // --- Client Logic ---
  const addToCart = (item: Item) => {
    if (item.type === "product" && item.stock !== undefined && item.stock <= 0) return;
    
    setCart(prev => {
      const existing = prev.find(c => c.item.id === item.id);
      if (existing) {
        if (item.type === "product" && existing.qty >= (item.stock || 0)) return prev;
        return prev.map(c => c.item.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, { item, qty: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(c => c.item.id !== itemId));
  };

  const cartTotal = cart.reduce((sum, c) => sum + (c.item.price * c.qty), 0);

  const confirmPayment = () => {
    if (cart.length === 0) return;

    // Deduct stock
    setItems(prev => prev.map(item => {
      const inCart = cart.find(c => c.item.id === item.id);
      if (inCart && item.type === "product" && item.stock !== undefined) {
        const newStock = Math.max(0, item.stock - inCart.qty);
        return { ...item, stock: newStock, active: newStock > 0 ? item.active : false };
      }
      return item;
    }));

    // Record sale
    const newSale: Sale = {
      id: Math.random().toString(36).substring(7),
      items: [...cart],
      total: cartTotal,
      date: new Date()
    };
    setSales(prev => [newSale, ...prev]);
    
    // Clear cart
    setCart([]);
  };

  // --- Admin Logic ---
  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    const newItem: Item = {
      id: formData.id || Math.random().toString(36).substring(7),
      name: formData.name,
      price: Number(formData.price),
      type: formData.type as ItemType,
      stock: formData.type === "product" ? Number(formData.stock || 0) : undefined,
      active: formData.active !== false,
      icon: formData.icon || "Package"
    };

    if (formData.id) {
      setItems(prev => prev.map(i => i.id === formData.id ? newItem : i));
    } else {
      setItems(prev => [...prev, newItem]);
    }
    
    setShowForm(false);
    setFormData({ type: "product", active: true, icon: "Package" });
  };

  const toggleItemActive = (id: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, active: !i.active } : i));
  };

  const deleteItem = (id: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este ítem?")) {
      setItems(prev => prev.filter(i => i.id !== id));
    }
  };

  const handleEditItem = (item: Item) => {
    setFormData(item);
    setShowForm(true);
  };

  const promptAddStock = (id: string) => {
    const amount = window.prompt("¿Cuánto stock deseas reabastecer?", "10");
    if (amount && !isNaN(Number(amount)) && Number(amount) > 0) {
      setItems(prev => prev.map(i => i.id === id && i.type === 'product' ? { ...i, stock: (i.stock || 0) + Number(amount), active: true } : i));
    }
  };

  // Metrics
  const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);
  const totalSalesCount = sales.length;
  
  const topProduct = useMemo(() => {
    if (sales.length === 0) return "Ninguno";
    const counts: Record<string, number> = {};
    sales.forEach(s => s.items.forEach(c => {
      counts[c.item.name] = (counts[c.item.name] || 0) + c.qty;
    }));
    return Object.entries(counts).sort((a,b) => b[1] - a[1])[0]?.[0] || "Ninguno";
  }, [sales]);

  const chartData = useMemo(() => {
    // Agrupar ventas en "simulaciones" de horas o simplemente ventas consecutivas
    return sales.slice().reverse().map((s, i) => ({
      name: `Venta ${i+1}`,
      total: s.total
    }));
  }, [sales]);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${view === 'admin' ? 'bg-zinc-950 text-zinc-50' : 'bg-slate-100 text-slate-900'}`}>
      {/* Top Navigation Control */}
      <div className={`${view === 'admin' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'} border-b p-4 sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/#projects" className={`inline-flex items-center gap-2 transition-colors ${view === 'admin' ? 'text-zinc-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Volver al Portfolio</span>
          </Link>
          
          <div className="flex bg-zinc-800/20 p-1 rounded-xl">
            <button 
              onClick={() => setView('client')}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${view === 'client' ? 'bg-blue-600 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-400'}`}
            >
              <ShoppingCart className="w-4 h-4" />
              Vista POS (Caja)
            </button>
            <button 
              onClick={() => setView('admin')}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${view === 'admin' ? 'bg-blue-600 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-400'}`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Vista Admin
            </button>
          </div>
        </div>
      </div>

      {/* ===================== CLIENT VIEW ===================== */}
      {view === 'client' && (
        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6 lg:h-[calc(100vh-80px)]">
          {/* Products Grid */}
          <div className="flex-1 overflow-y-auto pr-1 sm:pr-2">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Package className="text-blue-600" /> Catálogo de Productos
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {items.map(item => {
                const isOutOfStock = item.type === "product" && item.stock !== undefined && item.stock <= 0;
                const isDisabled = !item.active || isOutOfStock;
                
                return (
                  <button
                    key={item.id}
                    disabled={isDisabled}
                    onClick={() => addToCart(item)}
                    className={`relative p-3 sm:p-6 rounded-2xl flex flex-col items-center justify-center gap-2 sm:gap-4 text-center transition-all shadow-sm
                      ${isDisabled ? 'bg-slate-200 opacity-60 cursor-not-allowed' : 'bg-white hover:bg-blue-50 hover:shadow-md hover:-translate-y-1 hover:border-blue-200 border border-transparent'}
                    `}
                  >
                    <div className={`p-3 sm:p-4 rounded-full ${isDisabled ? 'bg-slate-300 text-slate-500' : 'bg-blue-100 text-blue-600'}`}>
                      {ICONS[item.icon] || ICONS["Package"]}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm sm:text-base line-clamp-1">{item.name}</h3>
                      <p className="text-blue-600 font-black mt-1 text-sm sm:text-base">${item.price.toLocaleString()}</p>
                    </div>
                    {item.type === "product" && (
                      <div className={`absolute top-2 right-2 sm:top-3 sm:right-3 text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-full ${isOutOfStock ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-700'}`}>
                        {isOutOfStock ? 'Agotado' : `Stock: ${item.stock}`}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="w-full lg:w-96 bg-white rounded-3xl shadow-xl flex flex-col h-[55vh] lg:h-full overflow-hidden border border-slate-200 shrink-0">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
                Pedido Actual
              </h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <ShoppingCart className="w-12 h-12 mb-4 opacity-20" />
                  <p>El carrito está vacío</p>
                </div>
              ) : (
                cart.map((c, i) => (
                  <div key={i} className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">
                        x{c.qty}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{c.item.name}</p>
                        <p className="text-xs text-slate-500">${c.item.price.toLocaleString()} c/u</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-800">${(c.item.price * c.qty).toLocaleString()}</span>
                      <button onClick={() => removeFromCart(c.item.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-200">
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-500 font-medium">Total a Pagar</span>
                <span className="text-3xl font-black text-slate-900">${cartTotal.toLocaleString()}</span>
              </div>
              <button 
                onClick={confirmPayment}
                disabled={cart.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-blue-600/20"
              >
                <CheckCircle2 className="w-5 h-5" />
                Confirmar Pago
              </button>
            </div>
          </div>
        </main>
      )}

      {/* ===================== ADMIN VIEW ===================== */}
      {view === 'admin' && (
        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Dashboard de Administración</h1>
              <p className="text-zinc-400">Gestiona tu inventario y analiza el rendimiento del negocio.</p>
            </div>
            <button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
              <Plus className="w-4 h-4" />
              Nuevo Ítem
            </button>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 text-zinc-400 mb-2">
                <DollarSign className="w-5 h-5 text-green-500" />
                <h3 className="font-medium text-sm">Ingresos Totales</h3>
              </div>
              <p className="text-3xl font-bold text-white">${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 text-zinc-400 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <h3 className="font-medium text-sm">Ventas Registradas</h3>
              </div>
              <p className="text-3xl font-bold text-white">{totalSalesCount}</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 text-zinc-400 mb-2">
                <Package className="w-5 h-5 text-purple-500" />
                <h3 className="font-medium text-sm">Producto Estrella</h3>
              </div>
              <p className="text-2xl font-bold text-white truncate" title={topProduct}>{topProduct}</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 text-zinc-400 mb-2">
                <AlertCircle className="w-5 h-5 text-orange-500" />
                <h3 className="font-medium text-sm">Ítems Activos</h3>
              </div>
              <p className="text-3xl font-bold text-white">
                {items.filter(i => i.active).length} <span className="text-zinc-600 text-lg">/ {items.length}</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Chart */}
            <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-6">Tendencia de Ingresos</h3>
              <div className="h-64">
                {sales.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                      <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                      <RechartsTooltip 
                        cursor={{ fill: '#27272a' }}
                        contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                        itemStyle={{ color: '#60a5fa' }}
                      />
                      <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500">
                    <History className="w-12 h-12 mb-3 opacity-20" />
                    <p>No hay ventas registradas aún</p>
                  </div>
                )}
              </div>
            </div>

            {/* Inventory Management */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-lg flex flex-col">
              <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Gestión de Ítems</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {items.map(item => (
                  <div key={item.id} className={`p-4 rounded-xl border flex items-center justify-between ${!item.active ? 'border-zinc-800 bg-zinc-950/50 opacity-60' : 'border-zinc-700 bg-zinc-800/50'}`}>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-sm">{item.name}</h4>
                        <span className={`text-[10px] px-1.5 rounded uppercase font-bold ${item.type === 'product' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                          {item.type === 'product' ? 'Prod' : 'Serv'}
                        </span>
                      </div>
                      <div className="text-xs text-zinc-400 mt-1 flex items-center gap-3">
                        <span>${item.price}</span>
                        {item.type === 'product' && (
                          <span className={`${item.stock === 0 ? 'text-red-400 font-bold' : ''}`}>
                            Stock: {item.stock}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      {item.type === 'product' && (
                        <button onClick={() => promptAddStock(item.id)} title="Reabastecer Stock" className="p-1.5 sm:p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors">
                          <PlusCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button onClick={() => handleEditItem(item)} title="Editar Ítem" className="p-1.5 sm:p-2 rounded-lg bg-zinc-700/50 text-zinc-300 hover:bg-zinc-700 transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteItem(item.id)} title="Eliminar Ítem" className="p-1.5 sm:p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => toggleItemActive(item.id)} title={item.active ? 'Desactivar Ítem' : 'Activar Ítem'} className={`p-1.5 sm:p-2 rounded-lg transition-colors ${item.active ? 'bg-zinc-700/50 text-zinc-500 hover:text-white' : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'}`}>
                        <Power className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-white mb-6">Crear Nuevo Ítem</h3>
            
            <form onSubmit={handleSaveItem} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Nombre</label>
                <input required type="text" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Precio ($)</label>
                  <input required type="number" min="0" value={formData.price || ''} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Tipo</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as ItemType})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500">
                    <option value="product">Producto</option>
                    <option value="service">Servicio</option>
                  </select>
                </div>
              </div>
              
              {formData.type === 'product' && (
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Stock Inicial</label>
                  <input required type="number" min="0" value={formData.stock || 0} onChange={e => setFormData({...formData, stock: Number(e.target.value)})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Icono Visual</label>
                <div className="flex gap-2">
                  {Object.keys(ICONS).map(icon => (
                    <button type="button" key={icon} onClick={() => setFormData({...formData, icon})} className={`p-3 rounded-xl border ${formData.icon === icon ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:text-white'}`}>
                      {ICONS[icon]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800">
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-colors">
                  Guardar Ítem
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
