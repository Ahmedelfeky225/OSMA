import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Logo = React.memo(() => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="relative group flex-shrink-0"
  >
    <Link href="/" className="flex items-center">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 80"
        width="120"
        height="48"
        className="transition-all duration-300 group-hover:drop-shadow-lg w-[100px] sm:w-[120px]"
        whileHover={{ rotate: [0, -1, 1, 0] }}
        transition={{ duration: 0.6 }}
      >
        <defs>
          <linearGradient
            id="footerTextGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#7a99c0" />
            <stop offset="50%" stopColor="#7a99c0ac" />
            <stop offset="100%" stopColor="#7a99c07e" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <text
          x="100"
          y="50"
          fontFamily="Georgia, serif"
          fontSize="42"
          fontWeight="bold"
          fill="url(#footerTextGradient)"
          textAnchor="middle"
          letterSpacing="2px"
          filter="url(#glow)"
          className="group-hover:filter-none transition-all duration-300"
        >
          OSMA
        </text>
      </motion.svg>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--primary-color)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg blur-sm" />
    </Link>
  </motion.div>
));

export default Logo;
