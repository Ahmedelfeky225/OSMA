import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req) {
  const res = intlMiddleware(req);
  const pathname = req.nextUrl.pathname;

  const authHeader = req.headers.get("authorization");
  let token = authHeader?.split(" ")[1] || req.cookies.get("token")?.value;

  const pathWithoutLocale = pathname.replace(/^\/(en|ar|fr)/, "");
  const protectedPaths = ["/profile", "/admin"];
  const publicPaths = ["/auth/login", "/auth/register"];

  const needsAuth = protectedPaths.some((path) =>
    pathWithoutLocale.startsWith(path),
  );

  if (publicPaths.some((path) => pathWithoutLocale.startsWith(path)) && token) {
    try {
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      return NextResponse.redirect(new URL("/", req.url));
    } catch {}
  }

  if (!needsAuth) {
    if (token) {
      try {
        const { payload } = await jwtVerify(
          token,
          new TextEncoder().encode(process.env.JWT_SECRET),
        );
        res.headers.set("x-user-auth", JSON.stringify(payload));
      } catch {}
    }
    return res;
  }

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET),
    );

    if (pathWithoutLocale.startsWith("/admin") && payload.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    res.headers.set("x-user-auth", JSON.stringify(payload));
    return res;
  } catch {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
