import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Message from "@/models/message";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Rate limiter for contact form: 3 messages per 60 seconds per IP
// Prevents spam bots from flooding your inbox
const ratelimit = process.env.UPSTASH_REDIS_REST_URL
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(3, "60 s"),
      prefix: "contact",
    })
  : null;

// Sanitize a string: strip HTML tags, trim, and enforce max length
function sanitize(input: unknown, maxLength = 500): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>/g, "")    // Strip HTML tags
    .replace(/[<>{}$]/g, "")    // Remove chars used in MongoDB/NoSQL injection
    .trim()
    .slice(0, maxLength);
}

// Validate email format
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Allowed topic values (whitelist)
const ALLOWED_TOPICS = ["feedback", "bug", "content", "other"];

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting — Block spam
    if (ratelimit) {
      const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
      const { success } = await ratelimit.limit(ip);

      if (!success) {
        return NextResponse.json(
          { success: false, error: "Too many messages. Please wait a minute before trying again." },
          { status: 429 }
        );
      }
    }

    // 2. Parse & Validate request body
    const body = await req.json();

    const name = sanitize(body.name, 100);
    const email = sanitize(body.email, 254);
    const topic = sanitize(body.topic, 50);
    const message = sanitize(body.message, 2000);

    // Field validation
    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, error: "Name is required (min 2 characters)." },
        { status: 400 }
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!ALLOWED_TOPICS.includes(topic)) {
      return NextResponse.json(
        { success: false, error: "Invalid topic selected." },
        { status: 400 }
      );
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        { success: false, error: "Message is required (min 10 characters)." },
        { status: 400 }
      );
    }

    // 3. Save to database with sanitized values only
    await connectDB();
    await Message.create({
      name,
      email,
      topic,
      content: message,
    });

    return NextResponse.json({ success: true, message: "Message sent!" });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}