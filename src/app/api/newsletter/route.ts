import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email format
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const emailLower = email.trim().toLowerCase();

    // Check if already subscribed
    const existing = await db.newsletterSubscriber.findUnique({
      where: { email: emailLower },
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "You're already subscribed! We'll keep you updated.",
      });
    }

    // Save to database (Turso or local SQLite)
    await db.newsletterSubscriber.create({
      data: { email: emailLower },
    });

    console.log("📧 New newsletter subscriber:", emailLower);

    return NextResponse.json({
      success: true,
      message: "Thanks for subscribing! You'll hear from us soon.",
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
