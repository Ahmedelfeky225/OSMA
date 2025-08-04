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
          AppId: process.env.NEXT_PUBLIC_APPID, // لازم تكون مظبوطة من .env.local
        },
        withCredentials: true,
      }
    );

    const user = response.data.user;

    if (!user) {
      return NextResponse.json({ message: "Login failed" }, { status: 401 });
    }

    return NextResponse.json(
      { user, message: response.data.message },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    return NextResponse.json({ message: "Login failed" }, { status: 401 });
  }
}
