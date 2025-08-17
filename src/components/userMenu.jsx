"use client";
import { useState, useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useTranslations, useLocale } from "next-intl";
import { logoutUser } from "@/store/auth/auth";
import toast from "react-hot-toast";

export default function UserMenu({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const t = useTranslations("UserMenu");
  const tLogout = useTranslations("Auth");
  const locale = useLocale();
  const dispatch = useDispatch();
  const router = useRouter();

  const displayName = useMemo(() => {
    const name = user?.user?.name?.trim();
    const email = user?.user?.email;

    if (name) return name;

    if (email) {
      const emailPart = email.split("@")[0];
      return emailPart
        .replace(/[._]/g, " ")
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    }

    return t("defaultUserName");
  }, [user?.user?.name, user?.user?.email, t]);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);

  const handleLogout = useCallback(async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    handleClose(); // Close dropdown immediately

    try {
      const loadingToast = toast.loading(
        tLogout("Logout.loggingOut") || "جاري تسجيل الخروج..."
      );

      const resultAction = await dispatch(logoutUser());

      toast.dismiss(loadingToast);

      if (logoutUser.fulfilled.match(resultAction)) {
        toast.success(
          tLogout("Logout.logoutSuccess") || "تم تسجيل الخروج بنجاح",
          {
            duration: 3000,
            position: "top-center",
          }
        );
        router.push("/auth/login");
      } else {
        const errorMessage =
          resultAction.payload ||
          resultAction.error?.message ||
          tLogout("Logout.logoutFailed") ||
          "فشل في تسجيل الخروج";
        toast.error(errorMessage, {
          duration: 4000,
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error(tLogout("Logout.logoutFailed") || "فشل في تسجيل الخروج", {
        duration: 4000,
        position: "top-center",
      });
    } finally {
      setIsLoggingOut(false);
    }
  }, [dispatch, router, tLogout, isLoggingOut]);

  return (
    <div className="relative">
      {/* Avatar Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleToggle}
        className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-md"
      >
        <div className="relative">
          {user?.user?.image ? (
            <img
              src={user.user.image}
              alt={displayName}
              className="w-8 h-8 rounded-full object-cover border-2 border-[var(--primary-color)]/20 transition-all duration-300 group-hover:border-[var(--primary-color)]/40"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[var(--primary-color)] flex items-center justify-center transition-all duration-300 group-hover:bg-[var(--primary-color)]/90">
              <UserIcon className="w-4 h-4 text-white" />
            </div>
          )}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
        </div>

        <ChevronDownIcon
          className={`w-4 h-4 text-gray-600 dark:text-gray-300 transition-all duration-300 ${
            isOpen
              ? "rotate-180 text-[var(--primary-color)]"
              : "group-hover:text-[var(--primary-color)]"
          }`}
        />
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40 cursor-pointer"
              onClick={handleClose}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`absolute ${
                locale === "en" ? "right-0" : "left-0"
              } top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden backdrop-blur-sm`}
            >
              {/* User Info */}
              <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    {user?.user?.image ? (
                      <img
                        src={user.user.image}
                        alt={displayName}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[var(--primary-color)]/30"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[var(--primary-color)] flex items-center justify-center">
                        <UserIcon className="w-6 h-6 text-white" />
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">
                      {displayName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                      {user?.user?.email || t("defaultEmail")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <div className="px-4 py-2">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t("accountSection")}
                  </p>
                </div>

                {/* Status */}
                <div className="px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {t("status")}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    {t("online")}
                  </span>
                </div>

                <div className="my-2 border-t border-gray-200 dark:border-gray-600"></div>

                {/* Logout */}
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-300 group cursor-pointer relative overflow-hidden ${
                    isLoggingOut
                      ? "text-red-400 bg-red-50/50 dark:bg-red-900/10 cursor-not-allowed"
                      : "text-red-600 hover:text-red-700 dark:hover:text-red-400"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-50 via-red-100 to-red-50 dark:from-red-900/20 dark:via-red-800/30 dark:to-red-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <ArrowRightOnRectangleIcon
                    className={`w-5 h-5 relative z-10 transition-all duration-300 ${
                      isLoggingOut
                        ? "text-red-400 animate-spin"
                        : "text-red-500 group-hover:text-red-600 group-hover:rotate-12"
                    }`}
                  />
                  <span
                    className={`font-medium relative z-10 ${
                      isLoggingOut ? "opacity-70" : ""
                    }`}
                  >
                    {isLoggingOut
                      ? tLogout("Logout.loggingOut") || "جاري الخروج..."
                      : t("logout")}
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
