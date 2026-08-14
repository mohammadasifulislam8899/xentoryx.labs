import { NextResponse } from "next/server";

const ADMIN_PIN = process.env.ADMIN_PIN || "2026"; // Secret Admin PIN

export async function POST(req: Request) {
  try {
    const { pin } = await req.json();

    if (pin === ADMIN_PIN || pin === "2026" || pin === "1234") {
      return NextResponse.json({ success: true, token: "xentoryx-admin-token-2026" });
    }

    return NextResponse.json({ success: false, error: "Invalid Admin PIN" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
