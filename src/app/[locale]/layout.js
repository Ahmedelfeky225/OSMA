// import { NextIntlClientProvider, hasLocale } from "next-intl";
// import { notFound } from "next/navigation";
// import "./globals.css";
// import { Poppins, Rubik } from "next/font/google";
// import { routing } from "@/i18n/routing";
// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";
// import LayoutStructure from "@/components/layoutStructure";
// import FixedWhatsappButton from "@/components/fixedWhatsappButton";
// import { ThemeProvider } from "@/components/themeProvider";
// import { Suspense } from "react";
// import TopLoader from "@/components/topLoader";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["200", "300", "400", "500", "600", "700", "800"],
//   display: "swap",
//   variable: "--font-poppins",
// });

// const rubik = Rubik({
//   subsets: ["arabic"],
//   weight: ["300", "400", "500", "600", "700", "800"],
//   display: "swap",
//   variable: "--font-rubik",
// });

// // ✅ إضافة metadata
// export const metadata = {
//   title: {
//     template: "%s | OSMA Perfumes",
//     default: "OSMA Perfumes - Premium Fragrances",
//   },
//   description: "Discover premium perfumes and fragrances at OSMA Perfumes",
//   keywords: ["perfumes", "fragrances", "عطور", "OSMA"],
//   authors: [{ name: "OSMA Perfumes" }],
//   creator: "OSMA Perfumes",
//   publisher: "OSMA Perfumes",
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },
//   openGraph: {
//     type: "website",
//     locale: "en_US",
//     alternateLocale: ["ar_EG"],
//     url: "https://osma-perfumes.com",
//     siteName: "OSMA Perfumes",
//     title: "OSMA Perfumes - Premium Fragrances",
//     description: "Discover premium perfumes and fragrances at OSMA Perfumes",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "OSMA Perfumes - Premium Fragrances",
//     description: "Discover premium perfumes and fragrances at OSMA Perfumes",
//   },
// };

// // ✅ إضافة viewport
// export const viewport = {
//   width: "device-width",
//   initialScale: 1,
//   maximumScale: 5,
//   userScalable: true,
//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "#ffffff" },
//     { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
//   ],
// };

// // ✅ دالة مساعدة للتحقق من الـ JWT
// async function getUserAuth() {
//   try {
//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;

//     if (!token) return null;

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     return decoded && decoded.id ? decoded : null;
//   } catch (err) {
//     // ✅ تسجيل الخطأ بشكل أفضل
//     if (process.env.NODE_ENV === "development") {
//       // console.error("JWT verification failed:", err.message);
//     }
//     return null;
//   }
// }

// // ✅ دالة تحميل الرسائل مع error handling
// async function getMessages(locale) {
//   try {
//     const messages = (await import(`../../../messages/${locale}.json`)).default;
//     return messages;
//   } catch (error) {
//     // console.error(`Failed to load messages for locale: ${locale}`, error);
//     // ✅ fallback للإنجليزية
//     if (locale !== "en") {
//       try {
//         return (await import(`../../../messages/en.json`)).default;
//       } catch (fallbackError) {
//         // console.error("Failed to load fallback messages", fallbackError);
//         return {};
//       }
//     }
//     return {};
//   }
// }

// export default async function LocaleLayout({ children, params }) {
//   const locale = (await params).locale;

//   // ✅ التحقق من صحة الـ locale
//   if (!hasLocale(routing.locales, locale)) {
//     notFound();
//   }

//   const dir = locale === "ar" ? "rtl" : "ltr";

//   // ✅ تحميل البيانات بشكل متوازي
//   const [messages, userAuth] = await Promise.all([
//     getMessages(locale),
//     getUserAuth(),
//   ]);

//   // ✅ تحديد الخط بناءً على اللغة
//   const fontClass = locale === "ar" ? rubik.variable : poppins.variable;
//   const fontDisplay = locale === "ar" ? rubik.className : poppins.className;

//   return (
//     <html
//       lang={locale}
//       dir={dir}
//       className={`${fontDisplay} ${fontClass}`}
//       suppressHydrationWarning // ✅ ضروري للـ theme provider
//     >
//       <head>
//         {/* ✅ إضافة preconnect للخطوط */}
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link
//           rel="preconnect"
//           href="https://fonts.gstatic.com"
//           crossOrigin="anonymous"
//         />

//         {/* ✅ إضافة alternate languages */}
//         <link rel="alternate" hrefLang="en" href="/en" />
//         <link rel="alternate" hrefLang="ar" href="/ar" />
//         <link rel="alternate" hrefLang="x-default" href="/en" />

//         {/* ✅ إضافة canonical URL */}
//         <link rel="canonical" href={`https://osma-perfumes.com/${locale}`} />

//         {/* ✅ منع FOUC (Flash of Unstyled Content) */}
//         <script
//           dangerouslySetInnerHTML={{
//             __html: `
//               try {
//                 const theme = localStorage.getItem('theme') || 'system';
//                 const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
//                 const actualTheme = theme === 'system' ? systemTheme : theme;
//                 if (actualTheme === 'dark') {
//                   document.documentElement.classList.add('dark');
//                 } else {
//                   document.documentElement.classList.remove('dark');
//                 }
//               } catch (e) {}
//             `,
//           }}
//         />
//       </head>

//       <body className="antialiased overflow-auto">
//         {/* ✅ إضافة noscript fallback */}
//         <TopLoader />
//         <noscript>
//           <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
//             <div className="text-center p-8">
//               <h1 className="text-2xl font-bold mb-4">JavaScript Required</h1>
//               <p className="text-gray-600 dark:text-gray-400">
//                 This website requires JavaScript to function properly. Please
//                 enable JavaScript in your browser.
//               </p>
//             </div>
//           </div>
//         </noscript>

//         {/* ✅ Theme Provider مع تحسينات */}
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="system"
//           enableSystem
//           disableTransitionOnChange={false} // ✅ تمكين الانتقالات
//           suppressHydrationWarning
//         >
//           {/* ✅ NextIntl Provider مع error boundary */}
//           <NextIntlClientProvider
//             locale={locale}
//             messages={messages}
//             timeZone="Africa/Cairo" // ✅ إضافة timezone
//             now={new Date()} // ✅ إضافة current time للـ SSR consistency
//           >
//             {/* ✅ Suspense boundary للـ layout */}
//             <Suspense
//               fallback={
//                 <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
//                   <div className="text-center">
//                     <div className="w-16 h-16 border-4 border-[#7a99c0] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//                     <p className="text-slate-600 dark:text-gray-400">
//                       {locale === "ar" ? "جاري التحميل..." : "Loading..."}
//                     </p>
//                   </div>
//                 </div>
//               }
//             >
//               <LayoutStructure userAuth={userAuth}>{children}</LayoutStructure>
//             </Suspense>

//             {/* ✅ WhatsApp Button مع Suspense */}
//           </NextIntlClientProvider>
//         </ThemeProvider>

//         {/* ✅ إضافة service worker registration */}
//         <script
//           dangerouslySetInnerHTML={{
//             __html: `
//               if ('serviceWorker' in navigator) {
//                 window.addEventListener('load', function() {
//                   navigator.serviceWorker.register('/sw.js')
//                     .then(function(registration) {
//                       // console.log('SW registered: ', registration);
//                     })
//                     .catch(function(registrationError) {
//                       // console.log('SW registration failed: ', registrationError);
//                     });
//                 });
//               }
//             `,
//           }}
//         />
//       </body>
//     </html>
//   );
// }

// // ✅ إضافة generateStaticParams للـ static generation //
// export async function generateStaticParams() {
//   return routing.locales.map((locale) => ({ locale }));
// }

import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import "./globals.css";
import { Poppins, Rubik } from "next/font/google";
import { routing } from "@/i18n/routing";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import LayoutStructure from "@/components/layoutStructure";
import FixedWhatsappButton from "@/components/fixedWhatsappButton";
import { ThemeProvider } from "@/components/themeProvider";
import { Suspense } from "react";
import TopLoader from "@/components/topLoader";
import MuiProviders from "@/components/MuiProviders";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

const rubik = Rubik({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-rubik",
});

// ✅ metadata
export const metadata = {
  title: {
    template: "%s | OSMA Perfumes",
    default: "OSMA Perfumes - Premium Fragrances",
  },
  description: "Discover premium perfumes and fragrances at OSMA Perfumes",
  keywords: ["perfumes", "fragrances", "عطور", "OSMA"],
  authors: [{ name: "OSMA Perfumes" }],
  creator: "OSMA Perfumes",
  publisher: "OSMA Perfumes",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_EG"],
    url: "https://osma-perfumes.com",
    siteName: "OSMA Perfumes",
    title: "OSMA Perfumes - Premium Fragrances",
    description: "Discover premium perfumes and fragrances at OSMA Perfumes",
  },
  twitter: {
    card: "summary_large_image",
    title: "OSMA Perfumes - Premium Fragrances",
    description: "Discover premium perfumes and fragrances at OSMA Perfumes",
  },
};

// ✅ viewport
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

// ✅ JWT
async function getUserAuth() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded && decoded.id ? decoded : null;
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      // console.error("JWT verification failed:", err.message);
    }
    return null;
  }
}

// ✅ load messages
async function getMessages(locale) {
  try {
    const messages = (await import(`../../../messages/${locale}.json`)).default;
    return messages;
  } catch (error) {
    if (locale !== "en") {
      try {
        return (await import(`../../../messages/en.json`)).default;
      } catch (fallbackError) {
        return {};
      }
    }
    return {};
  }
}

export default async function LocaleLayout({ children, params }) {
  const locale = (await params).locale;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const dir = locale === "ar" ? "rtl" : "ltr";

  const [messages, userAuth] = await Promise.all([
    getMessages(locale),
    getUserAuth(),
  ]);

  const fontClass = locale === "ar" ? rubik.variable : poppins.variable;
  const fontDisplay = locale === "ar" ? rubik.className : poppins.className;

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${fontDisplay} ${fontClass}`}
      suppressHydrationWarning
    >
      <head>
        {/* ✅ إضافة preconnect للخطوط */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* ✅ إضافة alternate languages */}
        <link rel="alternate" hrefLang="en" href="/en" />
        <link rel="alternate" hrefLang="ar" href="/ar" />
        <link rel="alternate" hrefLang="x-default" href="/en" />

        {/* ✅ إضافة canonical URL */}
        <link rel="canonical" href={`https://osma-perfumes.com/${locale}`} />

        {/* ✅ manifest متعدد اللغات */}
        <link
          rel="manifest"
          href={locale === "ar" ? "/manifest.ar.json" : "/manifest.en.json"}
        />

        {/* ✅ منع FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
        try {
          const theme = localStorage.getItem('theme') || 'system';
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          const actualTheme = theme === 'system' ? systemTheme : theme;
          if (actualTheme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        } catch (e) {}
      `,
          }}
        />
      </head>

      <body className="antialiased overflow-auto">
        <TopLoader />
        <noscript>
          <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
            <div className="text-center p-8">
              <h1 className="text-2xl font-bold mb-4">JavaScript Required</h1>
              <p className="text-gray-600 dark:text-gray-400">
                This website requires JavaScript to function properly. Please
                enable JavaScript in your browser.
              </p>
            </div>
          </div>
        </noscript>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          suppressHydrationWarning
        >
          <NextIntlClientProvider
            locale={locale}
            messages={messages}
            timeZone="Africa/Cairo"
            // now={new Date()}
          >
            <Suspense
              fallback={
                <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#7a99c0] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600 dark:text-gray-400">
                      {locale === "ar" ? "جاري التحميل..." : "Loading..."}
                    </p>
                  </div>
                </div>
              }
            >
              {/* <LayoutStructure userAuth={userAuth}> */}
              {/* <Suspense fallback={<div>Loading...</div>}> */}
              <LayoutStructure>{children}</LayoutStructure>
              {/* </Suspense> */}
              {/* </LayoutStructure> */}
            </Suspense>
          </NextIntlClientProvider>
        </ThemeProvider>

        {/* ✅ register service worker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      // console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      // console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}

// ✅ generateStaticParams
export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
