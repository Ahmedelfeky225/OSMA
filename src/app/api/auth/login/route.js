//app/api/auth/login/route.js
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  const { email, password } = await request.json();

  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/auth/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
          AppId: process.env.NEXT_PUBLIC_APPID,
        },
        withCredentials: true,
      }
    );

    const cookies = response.headers["set-cookie"];

    const res = NextResponse.json(
      {
        user: response.data.user,
        message: response.data.message,
      },
      { status: 200 }
    );

    if (cookies) {
      res.headers.set("Set-Cookie", cookies);
    }

    return res;
  } catch (error) {
    return NextResponse.json({ message: "Login failed" }, { status: 401 });
  }
}
