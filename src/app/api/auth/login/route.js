export const runtime = "nodejs";

import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
          AppId: process.env.NEXT_PUBLIC_APPID,
        },
        // مهم عشان يجيب الكوكي كاملة
        withCredentials: true,
        // عشان يجيب الـ headers الأصلية
        validateStatus: () => true,
      }
    );

    // الكوكي زي ما رجعت من السيرفر بالattributes
    const cookies = response.headers["set-cookie"];

    const res = NextResponse.json(
      {
        user: response.data.user,
        message: response.data.message,
      },
      { status: response.status }
    );

    if (cookies && cookies.length > 0) {
      cookies.forEach((cookie) => {
        // نرجع الكوكي بالattributes كاملة
        res.headers.append("set-cookie", cookie);
      });
    }

    return res;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    return NextResponse.json({ message: "Login failed" }, { status: 401 });
  }
}
