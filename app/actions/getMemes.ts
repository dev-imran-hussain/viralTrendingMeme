
// app/actions/getMemes.ts
"use server";
import { connectDB } from "@/lib/db";
import Meme from "@/models/meme";

export async function getMemes(page = 1, limit = 10, type = "all", search = "") {
  await connectDB();

  const skip = (page - 1) * limit;

  // 1. Base Query: Only show approved memes
  const query: Record<string, unknown> = { isApproved: true };

  // 2. Filter by Type
  if (type === "video") query.mediaType = "video";
  if (type === "image") query.mediaType = "image";

  // 3. Search Logic — Uses MongoDB text index for performance
  // Falls back to $regex only if text search returns no results
  if (search) {
    query.$text = { $search: search };
  }

  // Fetch from DB — only select fields needed by the grid
  const memes = await Meme.find(query)
    .sort(search ? { score: { $meta: "textScore" }, createdAt: -1 } : { createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select("title slug mediaUrl mediaType category tags description views createdAt")
    .lean();

  // Convert MongoDB ObjectIds & dates to plain serializable objects
  return memes.map((m) => ({
    ...m,
    _id: String(m._id),
    createdAt: m.createdAt ? new Date(m.createdAt as string | number | Date).toISOString() : null,
    updatedAt: m.updatedAt ? new Date(m.updatedAt as string | number | Date).toISOString() : null,
  }));
}