"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full bg-transparent border border-transparent transition-colors duration-500 focus:outline-none overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Cambiar tema"
    >
      {/* Track background glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          background: theme === "dark"
            ? "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)"
            : "linear-gradient(135deg, #dbeafe 0%, #93c5fd 100%)",
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Stars/dots for dark mode */}
      <AnimatePresence>
        {theme === "dark" && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="absolute w-1 h-1 bg-white/60 rounded-full"
              style={{ top: 6, left: 8 }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="absolute w-0.5 h-0.5 bg-white/40 rounded-full"
              style={{ top: 14, left: 5 }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="absolute w-0.5 h-0.5 bg-white/50 rounded-full"
              style={{ top: 4, left: 16 }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Sliding circle with icon */}
      <motion.div
        className="absolute top-1 w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
        animate={{
          x: theme === "dark" ? 2 : 28,
          backgroundColor: theme === "dark" ? "#1e1b4b" : "#fbbf24",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
      >
        <AnimatePresence mode="wait">
          {theme === "dark" ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-3.5 h-3.5 text-blue-300" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-3.5 h-3.5 text-amber-600" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
}
