// import { NextIntlClientProvider, hasLocale } from "next-intl";
// import { notFound } from "next/navigation";
// import "./globals.css";
// import { Poppins, Rubik } from "next/font/google";
// import { routing } from "@/i18n/routing";
// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";
// import LayoutStructure from "@/components/layoutStructure";
// import { ThemeProvider } from "@/components/themeProvider";
// import TopLoader from "@/components/topLoader";
// import { Suspense } from "react";

// // Fonts
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

// // JWT
// async function getUserAuth() {
//   try {
//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;
//     if (!token) return null;
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     return decoded?.id ? decoded : null;
//   } catch {
//     return null;
//   }
// }

// // Load messages
// async function getMessages(locale) {
//   try {
//     return (await import(`../../../messages/${locale}.json`)).default;
//   } catch (error) {
//     if (locale !== "en") {
//       try {
//         return (await import(`../../../messages/en.json`)).default;
//       } catch {
//         return {};
//       }
//     }
//     return {};
//   }
// }

// export default async function LocaleLayout({ children, params }) {
//   const locale = (await params).locale;
//   if (!hasLocale(routing.locales, locale)) notFound();

//   const dir = locale === "ar" ? "rtl" : "ltr";
//   const [messages, userAuth] = await Promise.all([
//     getMessages(locale),
//     getUserAuth(),
//   ]);

//   const fontClass = locale === "ar" ? rubik.variable : poppins.variable;
//   const fontDisplay = locale === "ar" ? rubik.className : poppins.className;

//   return (
//     <html lang={locale} dir={dir} className={`${fontDisplay} ${fontClass}`}>
//       <head>
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link
//           rel="preconnect"
//           href="https://fonts.gstatic.com"
//           crossOrigin="anonymous"
//         />
//         <link rel="alternate" hrefLang="en" href="/en" />
//         <link rel="alternate" hrefLang="ar" href="/ar" />
//         <link rel="alternate" hrefLang="x-default" href="/en" />
//         <link rel="canonical" href={`https://osma-perfumes.com/${locale}`} />
//         <link
//           rel="manifest"
//           href={locale === "ar" ? "/manifest.ar.json" : "/manifest.en.json"}
//         />
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
//         <TopLoader />
//         <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
//           <NextIntlClientProvider
//             locale={locale}
//             messages={messages}
//             timeZone="Africa/Cairo"
//           >
//             <Suspense
//               fallback={
//                 <div className="min-h-screen flex items-center justify-center">
//                   Loading...
//                 </div>
//               }
//             >
//               <LayoutStructure userAuth={userAuth}>{children}</LayoutStructure>
//             </Suspense>
//           </NextIntlClientProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }

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
import { ThemeProvider } from "@/components/themeProvider";
import TopLoader from "@/components/topLoader";
import { Suspense } from "react";

// Fonts
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

// JWT
async function getUserAuth() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded?.id ? decoded : null;
  } catch {
    return null;
  }
}

// Load messages
async function getMessages(locale) {
  try {
    return (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    if (locale !== "en") {
      try {
        return (await import(`../../../messages/en.json`)).default;
      } catch {
        return {};
      }
    }
    return {};
  }
}

export default async function LocaleLayout({ children, params }) {
  const locale = (await params).locale;
  if (!hasLocale(routing.locales, locale)) notFound();

  const dir = locale === "ar" ? "rtl" : "ltr";
  const [messages, userAuth] = await Promise.all([
    getMessages(locale),
    getUserAuth(),
  ]);

  const fontClass = locale === "ar" ? rubik.variable : poppins.variable;
  const fontDisplay = locale === "ar" ? rubik.className : poppins.className;

  return (
    <html lang={locale} dir={dir} className={`${fontDisplay} ${fontClass}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider
            locale={locale}
            messages={messages}
            timeZone="Africa/Cairo"
          >
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center">
                  Loading...
                </div>
              }
            >
              <LayoutStructure userAuth={userAuth}>{children}</LayoutStructure>
            </Suspense>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
