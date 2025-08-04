// app/save-token/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { token } = body;

    // Validate the token
    if (!token) {
      // console.log("token not exist");
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    // Save the token to your database or backend service
    // console.log("Received FCM token:", token);

    // Example: Save token to a database (e.g., MongoDB, Firebase Firestore, etc.)
    // await saveTokenToDatabase(token);

    // Respond with success
    return NextResponse.json(
      { message: "Token saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    // console.error("Error saving token:", error);
    return NextResponse.json(
      { error: "Failed to save token" },
      { status: 500 }
    );
  }
}
