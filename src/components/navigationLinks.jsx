import Link from "next/link";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import CategoryMegaMenu from "./CategoryMegaMenu";

const NavigationLinks = React.memo(({ routes, pathname, t }) => (
  <div className="hidden lg:flex text-foreground items-center gap-x-4 xl:gap-x-6">
    {routes.map((item, index) =>
      item.subItems ? (
        <div key={item.label}>
          <CategoryMegaMenu item={item} />
        </div>
      ) : (
        <div key={item.href}>
          <Link
            href={item.href}
            className={`text-sm xl:text-[15px] font-medium transition-all duration-300 text-nowrap tracking-wide relative group px-2 xl:px-3 py-2 rounded-lg hover:bg-[var(--card)/5] ${
              pathname === item.href
                ? "text-[var(--primary-color)] bg-[var(--card)/5]"
                : "text-foreground hover:text-[var(--primary-color)]"
            }`}
          >
            <span className="relative z-10">{t(item.label)}</span>
            <motion.span
              className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary-color)] rounded-full"
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
              initial={{ width: pathname === item.href ? "100%" : "0%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-color)]/5 to-[var(--primary-color)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
          </Link>
        </div>
      )
    )}
  </div>
));

export default NavigationLinks;
