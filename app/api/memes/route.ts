import { connectDB } from "@/lib/db";
import Meme from "@/models/meme";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    // Filter params
    const type = searchParams.get("type") || "all";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 9; // Grid ke liye 9 ya 12 best hota hai

    // 🔎 1. STRICT FILTER: Sirf wahi memes dikhao jo admin ne approve kiye hain
    const query: any = { isApproved: true };

    // 2. MEDIA TYPE FILTER: Image ya Video
    if (type !== "all") {
      query.mediaType = type;
    }

    // 3. OPTIMIZED FETCH
    const memes = await Meme.find(query)
      .sort({ createdAt: -1 }) // Naye memes pehle
      .skip((page - 1) * limit)
      .limit(limit)
      .select("title mediaUrl mediaType category slug description tags"); // ⚡ Faltu data (fileSize, etc.) nahi bhej rahe

    // Total count pagination ke liye
    const total = await Meme.countDocuments(query);

    return NextResponse.json({
      success: true,
      memes,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalMemes: total,
    }, { status: 200 });

  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch memes",
    }, { status: 500 });
  }
}