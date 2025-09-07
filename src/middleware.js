import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req) {
  const res = intlMiddleware(req);
  const pathname = req.nextUrl.pathname;

  const authHeader = req.headers.get("authorization");
  let token = authHeader?.split(" ")[1];

  if (!token) {
    token = req.cookies.get("token")?.value;
  }

  // console.log(
  //   "🔍 Token source:",
  //   authHeader ? "Header" : token ? "Cookie" : "None"
  // );

  if (!process.env.JWT_SECRET) {
    // console.error("🚨 JWT_SECRET is NOT defined in environment variables!");
  }

  const pathWithoutLocale = pathname.replace(/^\/(en|ar|fr)/, "");

  const protectedPaths = ["/profile", "/admin"];
  const publicPaths = ["/auth/login", "/auth/register"];

  const needsAuth = protectedPaths.some((path) =>
    pathWithoutLocale.startsWith(path)
  );

  if (publicPaths.some((path) => pathWithoutLocale.startsWith(path)) && token) {
    try {
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      return NextResponse.redirect(new URL("/", req.url));
    } catch {}
  }

  if (!needsAuth) {
    return res;
  }

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    // تحقق من الدور
    if (pathWithoutLocale.startsWith("/admin") && payload.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return res;
  } catch {
    // التوكن غير صالح → رجع المستخدم لصفحة تسجيل الدخول
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
