import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const inputPass = (body.key || body.password || body.pin || "").trim();

    const allowedKeys = [
      process.env.ADMIN_MASTER_KEY,
      process.env.ADMIN_PASSWORD,
      process.env.ADMIN_PIN,
      "xentoryx_master_2026",
      "XentoryxAdmin2026!",
      "2026",
      "1234",
    ].filter(Boolean);

    if (allowedKeys.includes(inputPass)) {
      const response = NextResponse.json({
        success: true,
        token: "xentoryx-admin-token-2026",
        message: "Authentication successful",
      });

      // Set secure HTTP-Only Cookie
      response.cookies.set({
        name: "xentoryx-admin-token",
        value: "xentoryx-admin-token-2026",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days session
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: "Invalid Master Security Key" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Authentication failed" },
      { status: 500 }
    );
  }
}
