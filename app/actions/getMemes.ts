
// app/actions/getMemes.ts
"use server";
import { connectDB } from "@/lib/db";
import Meme from "@/models/meme";

export async function getMemes(page = 1, limit = 10, type = "all", search = "") {
  await connectDB();

  const skip = (page - 1) * limit;
  
  // 1. Base Query: Only show approved memes
  const query: any = { isApproved: true };

  // 2. Filter by Type
  if (type === "video") query.mediaType = "video";
  if (type === "image") query.mediaType = "image";

  // 3. Search Logic (Title, Category, or Tags)
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } }
    ];
  }

  // Fetch from DB
  const memes = await Meme.find(query)
    .sort({ createdAt: -1 }) // Newest first
    .skip(skip)
    .limit(limit)
    .lean();

  // Convert MongoDB ObjectIds to strings
  return JSON.parse(JSON.stringify(memes));
}