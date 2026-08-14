import { NextResponse } from "next/server";
import { fetchMongoCMSData, saveMongoCMSData, CMSData } from "@/lib/cms/store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const data = await fetchMongoCMSData();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch CMS data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const current = await fetchMongoCMSData();

    if (body.type === "inquiry") {
      // New visitor inquiry from Contact Form
      const newInquiry = {
        id: `inq-${Date.now()}`,
        name: body.name,
        email: body.email,
        projectType: body.projectType,
        budget: body.budget,
        message: body.message,
        timestamp: new Date().toISOString(),
        read: false,
      };
      current.inquiries.unshift(newInquiry);
      await saveMongoCMSData(current);
      return NextResponse.json({ success: true, inquiry: newInquiry, data: current });
    }

    if (body.type === "updateAll") {
      const updated: CMSData = body.data;
      await saveMongoCMSData(updated);
      return NextResponse.json({ success: true, data: updated });
    }

    return NextResponse.json({ error: "Invalid POST type" }, { status: 400 });
  } catch (error) {
    console.error("API POST error:", error);
    return NextResponse.json({ error: "Failed to update CMS data" }, { status: 500 });
  }
}
