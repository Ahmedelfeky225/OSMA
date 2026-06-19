import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import "./globals.css";
import { Poppins, Rubik } from "next/font/google";
import { routing } from "@/i18n/routing";
import LayoutStructure from "@/components/layoutStructure";
import { ThemeProvider } from "@/components/themeProvider";
import TopLoader from "@/components/topLoader";
import { Suspense } from "react";
import { getMessages } from "next-intl/server";

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

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const dir = locale === "ar" ? "rtl" : "ltr";
  const messages = await getMessages();

  const fontClass = locale === "ar" ? rubik.variable : poppins.variable;
  const fontDisplay = locale === "ar" ? rubik.className : poppins.className;

  const baseUrl = "https://osma-perfume.vercel.app";
  const currentUrl = `${baseUrl}/${locale}`;

  return (
    <html lang={locale} dir={dir} className={`${fontDisplay} ${fontClass}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="alternate" hrefLang="en" href={`${baseUrl}/en`} />
        <link rel="alternate" hrefLang="ar" href={`${baseUrl}/ar`} />
        <link rel="alternate" hrefLang="x-default" href={baseUrl} />
        <link rel="canonical" href={currentUrl} />
        <link
          rel="manifest"
          href={locale === "ar" ? "/manifest.ar.json" : "/manifest.en.json"}
        />
        <meta
          name="google-site-verification"
          content="bis8LxKfPq78IJryewkziKaq2bZf3Jy-H21Gdx1eulk"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:locale"
          content={locale === "ar" ? "ar_AR" : "en_US"}
        />
        <meta property="og:url" content={currentUrl} />
        <meta
          property="og:title"
          content={
            locale === "ar"
              ? "عطور اوسما | روائح فاخرة تحدد شخصيتك"
              : "OSMA Perfume | Luxury Scents that Define You"
          }
        />
        <meta
          property="og:description"
          content={
            locale === "ar"
              ? "اكتشف مجموعتنا الواسعة من العطور الرجالية والنسائية والمشتركة. نمزج التقاليد بالابتكار لنقدم لك روائح آسرة لا تُنسى."
              : "Discover our wide collection of men’s, women’s, and unisex perfumes. Blending tradition with innovation to create captivating scents."
          }
        />
        <meta
          property="og:image"
          content="https://osma-perfume.vercel.app/OSMAOPENGRAPH.jpg"
        />
        <meta property="og:site_name" content="OSMA Perfume" />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'system';
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const actualTheme = theme === 'system' ? systemTheme : theme;
                document.documentElement.classList.toggle('dark', actualTheme === 'dark');
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
              <LayoutStructure locale={locale}>{children}</LayoutStructure>
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
