import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = React.memo(({ theme, onToggle }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onToggle}
    className="relative cursor-pointer p-2 xl:p-3 rounded-xl border border-border dark:hover:bg-gray-800 hover:bg-gray-100 duration-300 transition-all group overflow-hidden"
    aria-label="Toggle theme"
  >
    <AnimatePresence mode="wait">
      {theme === "dark" ? (
        <motion.div
          key="sun"
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Sun
            size={16}
            className="xl:w-[18px] xl:h-[18px] text-orange-400 group-hover:text-orange-300 transition-colors"
          />
        </motion.div>
      ) : (
        <motion.div
          key="moon"
          initial={{ rotate: 90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: -90, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Moon
            size={16}
            className="xl:w-[18px] xl:h-[18px] text-slate-600 group-hover:text-slate-500 transition-colors"
          />
        </motion.div>
      )}
    </AnimatePresence>
    <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
  </motion.button>
));

export default ThemeToggle;
