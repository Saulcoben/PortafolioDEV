"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Star, Zap, Filter, ArrowLeft } from "lucide-react";
import Link from "next/link";

const products = [
  { id: 1, name: "Auriculares Quantum Noise-Cancelling", price: 299, category: "Audio", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60" },
  { id: 2, name: "Smartwatch Ultra Series X", price: 399, category: "Wearables", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60" },
  { id: 3, name: "Lente Fotográfico Pro 50mm", price: 899, category: "Fotografía", image: "https://images.unsplash.com/photo-1617005082833-1eb585703f05?w=500&auto=format&fit=crop&q=60" },
  { id: 4, name: "Teclado Mecánico K-Slim", price: 159, category: "Periféricos", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&auto=format&fit=crop&q=60" },
  { id: 5, name: "Drone Explorer V2", price: 1200, category: "Fotografía", image: "https://images.unsplash.com/photo-1507580461462-f1555a6d53bc?w=500&auto=format&fit=crop&q=60" },
  { id: 6, name: "Altavoz Bluetooth Nomad", price: 89, category: "Audio", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60" },
];

export default function DemoEcommerce() {
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filter, setFilter] = useState("Todos");

  const categories = ["Todos", "Audio", "Wearables", "Fotografía", "Periféricos"];

  const filteredProducts = filter === "Todos" ? products : products.filter(p => p.category === filter);

  const addToCart = (product: any) => {
    setCart([...cart, product]);
    setIsCartOpen(true);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
      {/* Vitals Badge */}
      <div className="fixed bottom-4 left-4 z-50 bg-green-500/10 border border-green-500/20 backdrop-blur-md px-3 py-2 rounded-full flex items-center gap-2 text-xs font-medium text-green-600 dark:text-green-400 shadow-lg shadow-green-500/10">
        <Zap className="w-3 h-3" />
        LCP: 0.8s | FID: 12ms | CLS: 0
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/70 dark:bg-zinc-950/70 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors flex items-center justify-center">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <span className="font-bold text-xl tracking-tight">NEXUS<span className="text-blue-500">STORE</span></span>
          </div>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors flex items-center justify-center"
          >
            <ShoppingBag className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.5 }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full dark:bg-blue-500/10 bg-blue-500/5 border dark:border-blue-500/20 border-blue-500/10 text-blue-500 text-xs font-medium mb-6"
          >
             Headless E-commerce Demo
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6"
          >
            Rendimiento <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Extremo</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl dark:text-zinc-400 text-zinc-600 max-w-2xl mx-auto mb-10"
          >
            Experiencia de compra instantánea impulsada por Next.js y un Headless CMS (WooCommerce). Optimizado al máximo para SEO y Core Web Vitals.
          </motion.p>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 relative z-10">
        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          <Filter className="w-5 h-5 dark:text-zinc-500 text-zinc-400 mr-2 hidden sm:block" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === cat ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-md' : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800'}`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map(product => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                className="group relative bg-white dark:bg-zinc-900/80 backdrop-blur-sm rounded-3xl overflow-hidden border dark:border-zinc-800 border-zinc-200 shadow-lg shadow-zinc-200/50 dark:shadow-black/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-2.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> 4.9
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-xs font-bold text-blue-500 mb-2 uppercase tracking-wider">{product.category}</div>
                  <h3 className="text-xl font-bold mb-4 line-clamp-2 dark:text-white text-zinc-900 leading-tight">{product.name}</h3>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <span className="text-2xl font-extrabold dark:text-white text-zinc-900">${product.price}</span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-5 py-2.5 rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-md"
                    >
                      Añadir
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm z-50 transition-opacity"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-zinc-950 z-50 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
                <h2 className="text-xl font-extrabold flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 text-blue-500 rounded-full">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  Tu Carrito ({cart.length})
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-zinc-500">
                    <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-6">
                      <ShoppingBag className="w-10 h-10 opacity-40" />
                    </div>
                    <p className="text-lg font-medium">Tu carrito está vacío</p>
                    <p className="text-sm mt-2 opacity-70">Agrega algunos productos para empezar.</p>
                  </div>
                ) : (
                  <AnimatePresence>
                    {cart.map((item, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800/50"
                      >
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-sm line-clamp-2 mb-1">{item.name}</h4>
                          <p className="text-blue-500 text-xs font-semibold uppercase">{item.category}</p>
                        </div>
                        <div className="font-extrabold text-lg">${item.price}</div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80">
                  <div className="flex justify-between items-center mb-6 text-xl font-extrabold">
                    <span>Total estimado</span>
                    <span className="text-blue-500">${total}</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-[0.98]">
                    Proceder al Pago Seguro
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
