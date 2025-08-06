import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import CustomImage from "./customImage";
import enTranslate from "@/assets/imgs/united-states-of-america-flag-square-icon-256.png";
import arTranslate from "@/assets/imgs/saudi-arabia-flag-square-icon-256.png";

const LanguageSwitcher = React.memo(({ locale, onChangeLanguage }) => (
  <Menu as="div" className="relative">
    {({ open }) => (
      <>
        <MenuButton className="inline-flex items-center gap-1 xl:gap-2 text-foreground rounded-xl dark:hover:bg-gray-800 hover:bg-gray-100 cursor-pointer px-2 xl:px-4 py-2 xl:py-3 text-xs xl:text-sm transition-all duration-300 group border border-transparent hover:border-border">
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <GlobeAltIcon className="w-4 h-4 xl:w-5 xl:h-5 text-[var(--primary-color)] group-hover:scale-110 transition-transform duration-300" />
          </motion.div>
          <span className="font-medium group-hover:text-[var(--primary-color)] transition-colors hidden sm:inline">
            {locale === "ar" ? "العربية" : "English"}
          </span>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDownIcon className="w-3 h-3 xl:w-4 xl:h-4 transition-colors group-hover:text-[var(--primary-color)]" />
          </motion.div>
        </MenuButton>

        <AnimatePresence>
          {open && (
            <MenuItems
              as={motion.div}
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-[1000] right-0 mt-2 w-40 xl:w-48 origin-top-right card rounded-xl shadow-xl backdrop-blur-sm border border-border overflow-hidden"
              // الحل البسيط - منع الـ portal
              static
            >
              <MenuItem>
                {({ active }) => (
                  <motion.button
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-2 xl:gap-3 w-full px-3 xl:px-4 py-2 xl:py-3 text-xs xl:text-sm cursor-pointer transition-all duration-200 ${
                      active ? "bg-[var(--card)] text-accent-foreground" : ""
                    } ${locale === "ar" ? "bg-[var(--card)/5]" : ""}`}
                    onClick={() => onChangeLanguage("ar")}
                  >
                    <CustomImage
                      src={arTranslate}
                      width={20}
                      height={20}
                      priority={true}
                      className="rounded-full ring-2 ring-transparent group-hover:ring-[var(--primary-color)]/20 transition-all"
                    />
                    <span className="font-medium">العربية</span>
                    {locale === "ar" && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto w-2 h-2 bg-[var(--primary-color)] rounded-full"
                      />
                    )}
                  </motion.button>
                )}
              </MenuItem>

              <MenuItem>
                {({ active }) => (
                  <motion.button
                    whileHover={{ x: 4 }}
                    className={`cursor-pointer flex items-center gap-2 xl:gap-3 w-full px-3 xl:px-4 py-2 xl:py-3 text-xs xl:text-sm transition-all duration-200 ${
                      active ? "bg-[var(--card)] text-accent-foreground" : ""
                    } ${locale === "en" ? "bg-[var(--card)/5]" : ""}`}
                    onClick={() => onChangeLanguage("en")}
                  >
                    <CustomImage
                      src={enTranslate}
                      width={20}
                      height={20}
                      priority={true}
                      className="rounded-full ring-2 ring-transparent group-hover:ring-[var(--primary-color)]/20 transition-all"
                    />
                    <span className="font-medium">English</span>
                    {locale === "en" && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto w-2 h-2 bg-[var(--primary-color)] rounded-full"
                      />
                    )}
                  </motion.button>
                )}
              </MenuItem>
            </MenuItems>
          )}
        </AnimatePresence>
      </>
    )}
  </Menu>
));

export default LanguageSwitcher;
