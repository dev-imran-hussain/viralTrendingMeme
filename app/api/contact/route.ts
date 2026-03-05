import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Message from "@/models/message";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    
    // Database mein naya message save kar rahe hain
    await Message.create({
      name: body.name,
      email: body.email,
      topic: body.topic,
      content: body.message, // Contact form se 'message' aayega
    });

    return NextResponse.json({ success: true, message: "Message sent!" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 });
  }
}