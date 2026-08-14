import { NextResponse } from "next/server";
import { getCMSData, saveCMSData, CMSData } from "@/lib/cms/store";

export async function GET() {
  try {
    const data = getCMSData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch CMS data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const current = getCMSData();

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
      saveCMSData(current);
      return NextResponse.json({ success: true, inquiry: newInquiry });
    }

    if (body.type === "updateAll") {
      const updated: CMSData = body.data;
      saveCMSData(updated);
      return NextResponse.json({ success: true, data: updated });
    }

    return NextResponse.json({ error: "Invalid POST type" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update CMS data" }, { status: 500 });
  }
}
