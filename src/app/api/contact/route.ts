import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { first_name, last_name, phone, email, company, service, location, message } = body;

    // Validate required fields
    if (!first_name?.trim() || !phone?.trim() || !service || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields (First Name, Phone, Service, Message)." },
        { status: 400 }
      );
    }

    // Validate phone format
    const phoneClean = phone.replace(/\D/g, "");
    if (phoneClean.length < 10 || phoneClean.length > 13) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid phone number." },
        { status: 400 }
      );
    }

    // Validate email if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Save to database (Turso or local SQLite)
    const inquiry = await db.contactInquiry.create({
      data: {
        firstName: first_name.trim(),
        lastName: last_name?.trim() || "",
        phone: phoneClean,
        email: email?.trim() || "",
        company: company?.trim() || "",
        service,
        location: location?.trim() || "",
        message: message.trim(),
      },
    });

    console.log("📩 New inquiry saved:", inquiry.id);

    return NextResponse.json({
      success: true,
      message: "Thank you! We've received your inquiry and will get back to you within 24 hours.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again or call us directly." },
      { status: 500 }
    );
  }
}

// GET endpoint for admin dashboard
export async function GET() {
  try {
    const inquiries = await db.contactInquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json({ success: true, data: inquiries });
  } catch (error) {
    console.error("Fetch inquiries error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch inquiries." },
      { status: 500 }
    );
  }
}
