"use client";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function MuiProvider({ children, locale }) {
  const isRtl = locale === "ar";

  const theme = createTheme({
    direction: isRtl ? "rtl" : "ltr",
    typography: {
      fontFamily: isRtl ? "Rubik, sans-serif" : "Poppins, sans-serif",
    },
  });

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  const cacheLtr = createCache({ key: "muiltr" });

  return (
    <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
