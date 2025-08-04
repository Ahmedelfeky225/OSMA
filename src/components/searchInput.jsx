"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useDebounce } from "use-debounce";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

export default function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("search");

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 700);

  // ✅ sync initial value from URL (once on mount)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const initialSearch = urlParams.get("search") || "";
      setSearchTerm(initialSearch);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const current = new URLSearchParams(window.location.search);

    if (debouncedSearchTerm.length >= 3) {
      current.set("search", debouncedSearchTerm);
    } else {
      current.delete("search");
    }

    current.delete("page");

    startTransition(() => {
      router.push(`${pathname}?${current.toString()}`);
    });
  }, [debouncedSearchTerm, pathname, router]);

  return (
    <div className="relative sm:w-full px-1 lg:w-1/2 w-full mx-auto mb-6">
      <Input
        type="text"
        placeholder={t("placeholder")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full block ps-3 !py-6 border-1 border-[var(--primary-color)] rounded-sm focus:!border-[var(--primary-color)] outline-0 focus:!ring-0 focus:!outline-none"
        disabled={isPending}
        aria-label={t("placeholder")}
      />
      <Search className="absolute end-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
    </div>
  );
}
