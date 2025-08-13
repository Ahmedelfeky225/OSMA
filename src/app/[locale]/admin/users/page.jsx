"use client";
import { useTranslations, useLocale } from "next-intl";
import UsersTable from "@/components/ui/dashboard/users/UsersTable";
import { Users, Plus, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "@/components/ui/dashboard/Navbar";

export default function UsersPage() {
  const locale = useLocale();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const t = useTranslations("users");
  const router = useRouter();
  const isRTL = locale === "ar";

  return (
    <div>
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div
        className="max-w-[90%] mb-2 mt-6 mx-auto space-y-6"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 hover:shadow-md hover:scale-105"
            style={{
              color: "#7a99c0",
              borderColor: "#7a99c0",
              backgroundColor: "transparent",
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            {t("back")}
          </button> */}

            <div className={isRTL ? "text-right" : "text-left"}>
              <h1 className="text-3xl font-bold tracking-wide flex items-center gap-3 text-[#7a99c0]">
                <Users className="h-8 w-8" />
                {t("manageUsers")}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm md:text-base">
                {t("manageUsersDescription")}
              </p>
            </div>
          </div>

          {/* <button
          onClick={() => router.push("/admin/users/create")}
          className="flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105"
          style={{ backgroundColor: "#1c283b" }}
        >
          <Plus className="h-5 w-5" />
          {t("createUser")}
        </button> */}
        </div>

        {/* Users Table */}
        <UsersTable />
      </div>
    </div>
  );
}
