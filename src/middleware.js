// import createMiddleware from "next-intl/middleware";
// import { routing } from "./i18n/routing";
// import { NextResponse } from "next/server";
// import { jwtVerify } from "jose";

// const intlMiddleware = createMiddleware(routing);

// export default async function middleware(req) {
//   const res = intlMiddleware(req);
//   const pathname = req.nextUrl.pathname;

//   const token = req.cookies.get("token")?.value;

//   // إزالة بادئة اللغة من المسار (/en, /ar, /fr, ...)
//   const pathWithoutLocale = pathname.replace(/^\/(en|ar|fr)/, "");

//   const protectedPaths = ["/profile", "/admin"];
//   const needsAuth = protectedPaths.some((path) =>
//     pathWithoutLocale.startsWith(path)
//   );

//   const publicPaths = ["/auth/login", "/auth/register"];

//   // ✅ إذا المستخدم داخل صفحة تسجيل الدخول أو التسجيل وعنده توكن صالح → رجعه للصفحة الرئيسية
//   if (publicPaths.some((path) => pathWithoutLocale.startsWith(path)) && token) {
//     try {
//       await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
//       return NextResponse.redirect(new URL("/", req.url));
//     } catch (err) {
//       // console.log("Token invalid:", err.message);
//     }
//   }

//   // ✅ الصفحات العامة لا تحتاج تحقق
//   if (!needsAuth) {
//     return res;
//   }

//   // ✅ إذا مفيش توكن → رجعه لتسجيل الدخول
//   if (!token) {
//     return NextResponse.redirect(new URL("/auth/login", req.url));
//   }

//   try {
//     const { payload } = await jwtVerify(
//       token,
//       new TextEncoder().encode(process.env.JWT_SECRET)
//     );
//     // console.log("Decoded token payload:", payload);

//     // ✅ لو المسار يبدأ بـ /admin → لازم يكون الدور Admin
//     if (pathWithoutLocale.startsWith("/admin") && payload.role !== "admin") {
//       return NextResponse.redirect(new URL("/", req.url));
//     }

//     return res;
//   } catch (err) {
//     // console.log("JWT verification error:", err.message);
//     return NextResponse.redirect(new URL("/auth/login", req.url));
//   }
// }

// export const config = {
//   matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
// };

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req) {
  const res = intlMiddleware(req);
  const pathname = req.nextUrl.pathname;

  // 👇 نقرأ التوكن من الكوكيز بطريقة تتوافق مع Edge Runtime (مهمة جدًا)
  const token = req.cookies.get("token")?.value;

  const pathWithoutLocale = pathname.replace(/^\/(en|ar|fr)/, "");

  const protectedPaths = ["/profile", "/admin"];
  const publicPaths = ["/auth/login", "/auth/register"];

  const needsAuth = protectedPaths.some((path) =>
    pathWithoutLocale.startsWith(path)
  );

  // 🔁 إذا المستخدم فاتح صفحة login/register وعنده توكن → رجعه للرئيسية
  if (publicPaths.some((path) => pathWithoutLocale.startsWith(path)) && token) {
    try {
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      return NextResponse.redirect(new URL("/", req.url));
    } catch (err) {
      // التوكن مش صالح → خليه يكمل في صفحة login
    }
  }

  // 🟢 الصفحات العامة مش محتاجة تحقق
  if (!needsAuth) {
    return res;
  }

  // 🔒 لو الصفحة محمية ومفيش توكن → رجعه للّوجين
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    // 🔒 تحقق من الدور لو داخل admin
    if (pathWithoutLocale.startsWith("/admin") && payload.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return res;
  } catch (err) {
    // JWT غير صالح → رجعه لتسجيل الدخول
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}
///
export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
