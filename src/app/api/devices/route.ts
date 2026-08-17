import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      status: "online",
      server: "Xentoryx Labs IoT Gateway v2.4",
      telemetry: {
        activeNodes: 15,
        pingMs: 12,
        protocol: "MQTT/HTTPS",
        firmwareVersion: "2.4.0-esp32",
      },
      devices: [
        {
          id: "dipannita-node-01",
          name: "Dipannita IoT Core",
          type: "ESP32 C++ Microcontroller",
          status: "active",
          lastSeen: new Date().toISOString(),
        },
      ],
    },
    { status: 200 }
  );
}
