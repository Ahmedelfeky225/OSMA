// // "use client";
// // import { Navbar } from "@/components/navbar";
// // import Footer from "@/components/footer";
// // import { ReduxProvider } from "@/components/ReduxProvider";
// // import { Toaster } from "react-hot-toast";
// // import { Suspense } from "react";
// // import FixedWhatsappButton from "./fixedWhatsappButton";

// // export default function ClientLayoutStructure({ children, userData }) {
// //   return (
// //     <ReduxProvider>
// //       <Navbar userData={userData} />
// //       <main>{children}</main>
// //       <Footer />
// //       <Toaster
// //         position="top-center"
// //         toastOptions={{
// //           className: "react-hot-toast",
// //           duration: 4000,
// //           style: { background: "#ffffff", color: "#131212" },
// //         }}
// //       />
// //       <Suspense fallback={null}>
// //         <FixedWhatsappButton />
// //       </Suspense>
// //     </ReduxProvider>
// //   );
// // }

// "use client";
// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";
// import rtlPlugin from "stylis-plugin-rtl";
// import { Navbar } from "./navbar";
// import Footer from "./footer";
// import { Toaster } from "react-hot-toast";
// import { Suspense } from "react";
// import FixedWhatsappButton from "./fixedWhatsappButton";
// import { ReduxProvider } from "./ReduxProvider"; // تأكد من مسار الـ Provider

// // إنشاء كاش افتراضي و RTL
// const cacheDefault = createCache({ key: "mui" });
// const cacheRtl = createCache({ key: "muirtl", stylisPlugins: [rtlPlugin] });

// export default function ClientLayoutStructure({ children, userData, locale }) {
//   const isRtl = locale === "ar";

//   return (
//     <ReduxProvider>
//       <CacheProvider value={isRtl ? cacheRtl : cacheDefault}>
//         <div dir={isRtl ? "rtl" : "ltr"}>
//           <Navbar userData={userData} />
//           <main>{children}</main>
//           <Footer />
//           <Toaster
//             position="top-center"
//             toastOptions={{
//               className: "react-hot-toast",
//               duration: 4000,
//               style: { background: "#ffffff", color: "#131212" },
//             }}
//           />
//           <Suspense
//             fallback={
//               <div className="fixed bottom-4 right-4 w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
//             }
//           >
//             <FixedWhatsappButton />
//           </Suspense>
//         </div>
//       </CacheProvider>
//     </ReduxProvider>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";
// import rtlPlugin from "stylis-plugin-rtl";
// import { Navbar } from "./navbar";
// import Footer from "./footer";
// import { Toaster } from "react-hot-toast";
// import { Suspense } from "react";
// import FixedWhatsappButton from "./fixedWhatsappButton";
// import { ReduxProvider } from "./ReduxProvider";
// import { CircularProgress, Box } from "@mui/material";

// // إنشاء كاش افتراضي و RTL
// const cacheDefault = createCache({ key: "mui" });
// const cacheRtl = createCache({ key: "muirtl", stylisPlugins: [rtlPlugin] });

// export default function ClientLayoutStructure({ children, userData, locale }) {
//   const isRtl = locale === "ar";

//   // حالة التحميل للصفحة
//   const [pageLoading, setPageLoading] = useState(true);

//   useEffect(() => {
//     // بعد أول render على الكلاين، نوقف الـ overlay
//     const timer = setTimeout(() => setPageLoading(false), 50);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <ReduxProvider>
//       <CacheProvider value={isRtl ? cacheRtl : cacheDefault}>
//         <div dir={isRtl ? "rtl" : "ltr"} className="relative min-h-screen">
//           {/* Overlay كامل أثناء التحميل */}
//           {pageLoading && (
//             <Box
//               sx={{
//                 position: "fixed",
//                 inset: 0,
//                 bgcolor: "rgba(255,255,255,0.8)",
//                 zIndex: 2000,
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <CircularProgress size={60} />
//             </Box>
//           )}

//           <Navbar userData={userData} />
//           <main>{children}</main>
//           <Footer />

//           <Toaster
//             position="top-center"
//             toastOptions={{
//               className: "react-hot-toast",
//               duration: 4000,
//               style: { background: "#ffffff", color: "#131212" },
//             }}
//           />

//           <Suspense
//             fallback={
//               <div className="fixed bottom-4 right-4 w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
//             }
//           >
//             <FixedWhatsappButton />
//           </Suspense>
//         </div>
//       </CacheProvider>
//     </ReduxProvider>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { Navbar } from "./navbar";
import Footer from "./footer";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import FixedWhatsappButton from "./fixedWhatsappButton";
import { ReduxProvider } from "./ReduxProvider";
import { CircularProgress, Box, Typography, Fade } from "@mui/material";

// إنشاء كاش افتراضي و RTL
const cacheDefault = createCache({ key: "mui" });
const cacheRtl = createCache({ key: "muirtl", stylisPlugins: [rtlPlugin] });

export default function ClientLayoutStructure({ children, userData, locale }) {
  const isRtl = locale === "ar";

  const [pageLoading, setPageLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const minLoadTime = 800;
    const startTime = Date.now();

    const timer = setTimeout(() => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsed);

      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => setPageLoading(false), 300);
      }, remainingTime);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ReduxProvider>
      <CacheProvider value={isRtl ? cacheRtl : cacheDefault}>
        <div dir={isRtl ? "rtl" : "ltr"} className="relative min-h-screen">
          {pageLoading && (
            <Fade in={!fadeOut} timeout={300}>
              <Box
                sx={{
                  position: "fixed",
                  inset: 0,
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.98) 100%)",
                  backdropFilter: "blur(8px)",
                  zIndex: 2000,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Outer pulsing ring */}
                  <Box
                    sx={{
                      position: "absolute",
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      border: "2px solid rgba(25, 118, 210, 0.1)",
                      animation: "pulse 2s ease-in-out infinite",
                      "@keyframes pulse": {
                        "0%, 100%": {
                          transform: "scale(1)",
                          opacity: 0.3,
                        },
                        "50%": {
                          transform: "scale(1.1)",
                          opacity: 0.1,
                        },
                      },
                    }}
                  />

                  {/* Main spinner */}
                  <CircularProgress
                    size={60}
                    thickness={3}
                    sx={{
                      color: "#1976d2",
                      "& .MuiCircularProgress-circle": {
                        strokeLinecap: "round",
                      },
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    textAlign: "center",
                    animation: "fadeInOut 2s ease-in-out infinite",
                    "@keyframes fadeInOut": {
                      "0%, 100%": { opacity: 0.6 },
                      "50%": { opacity: 1 },
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#1976d2",
                      fontWeight: 500,
                      mb: 1,
                      fontSize: { xs: "1.1rem", sm: "1.25rem" },
                    }}
                  >
                    {isRtl ? "جاري التحميل..." : "Loading..."}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666",
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                    }}
                  >
                    {isRtl ? "يرجى الانتظار قليلاً" : "Please wait a moment"}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    gap: 0.5,
                    mt: 1,
                  }}
                >
                  {[0, 1, 2].map((index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "#1976d2",
                        animation: `bounce 1.4s ease-in-out ${
                          index * 0.16
                        }s infinite both`,
                        "@keyframes bounce": {
                          "0%, 80%, 100%": {
                            transform: "scale(0.8)",
                            opacity: 0.5,
                          },
                          "40%": {
                            transform: "scale(1)",
                            opacity: 1,
                          },
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Fade>
          )}

          <Navbar userData={userData} />
          <main>{children}</main>
          <Footer />

          <Toaster
            position="top-center"
            toastOptions={{
              className: "react-hot-toast",
              duration: 4000,
              style: { background: "#ffffff", color: "#131212" },
            }}
          />

          <Suspense
            fallback={
              <div className="fixed bottom-4 right-4 w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full animate-pulse shadow-lg" />
            }
          >
            <FixedWhatsappButton />
          </Suspense>
        </div>
      </CacheProvider>
    </ReduxProvider>
  );
}
