import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      version: "2.4.0-esp32",
      releaseDate: "2026-08-15",
      firmwareUrl: "https://www.xentoryxlabs.site/assets/firmware/dipannita_v2.4.0.bin",
      minHardwareVersion: "ESP32-WROOM-32",
      changelog: "Enhanced WiFi reconnect stability, optimized MQTT packet payload compression.",
    },
    { status: 200 }
  );
}
