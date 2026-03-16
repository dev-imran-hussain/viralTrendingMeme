import { connectDB } from "@/lib/db";
import Meme from "@/models/meme";
import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create a new ratelimiter, that allows 10 requests per 10 seconds
// Initialize it conditionally to prevent crashes if env vars are missing during build
const ratelimit = process.env.UPSTASH_REDIS_REST_URL 
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(20, "10 s"), // 20 requests per 10 seconds per IP
      analytics: true,
    })
  : null;

export async function GET(request: Request) {
  try {
    // RATE LIMITING PROTECTION
    if (ratelimit) {
      // Get the IP address from the request headers or fallback to a string
      const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
      const { success, limit, reset, remaining } = await ratelimit.limit(ip);

      if (!success) {
        return NextResponse.json(
          { 
            success: false, 
            error: "Too many requests. Please try again later." 
          }, 
          { 
            status: 429,
            headers: {
              "X-RateLimit-Limit": limit.toString(),
              "X-RateLimit-Remaining": remaining.toString(),
              "X-RateLimit-Reset": reset.toString(),
            }
          }
        );
      }
    }

    await connectDB();

    const { searchParams } = new URL(request.url);

    // Filter params
    const type = searchParams.get("type") || "all";
    const page = parseInt(searchParams.get("page") || "1");
    const limitParams = 9; // Grid ke liye 9 ya 12 best hota hai

    // 🔎 1. STRICT FILTER: Sirf wahi memes dikhao jo admin ne approve kiye hain
    const query: any = { isApproved: true };

    // 2. MEDIA TYPE FILTER: Image ya Video
    if (type !== "all") {
      query.mediaType = type;
    }

    // 3. OPTIMIZED FETCH — fetch one extra to check if there's a next page
    const memes = await Meme.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limitParams)
      .limit(limitParams + 1)
      .select("title mediaUrl mediaType category slug description tags")
      .lean();

    // If we got more than limitParams, there are more pages
    const hasMore = memes.length > limitParams;
    const results = hasMore ? memes.slice(0, limitParams) : memes;

    return NextResponse.json({
      success: true,
      memes: results,
      currentPage: page,
      hasMore,
    }, { status: 200 });

  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch memes",
    }, { status: 500 });
  }
}