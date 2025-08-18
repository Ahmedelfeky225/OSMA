// src/components/MuiProviders.jsx
"use client";

import { useLocale } from "next-intl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

export default function MuiProviders({ children }) {
  const locale = useLocale();
  const isRtl = locale === "ar";

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  const cacheLtr = createCache({ key: "muiltr" });

  return (
    <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
      {children}
    </CacheProvider>
  );
}
