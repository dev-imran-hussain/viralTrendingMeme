import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Meme from "@/models/meme";
import cloudinary from "@/lib/cloudinary";
import { pingIndexNow } from "@/lib/indexNow";
// 👇 1. Naye Imports Security/Auth ke liye
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

// ⚡ OPTIMIZATION LIMITS (UPGRADED!)
const MAX_IMAGE_SIZE = 20 * 1024 * 1024; // 20MB limit for images
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB limit for videos
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "video/mp4",
  "video/webm"
];

export async function POST(request: Request) {
  try {
    // 🔒 2. THE ULTIMATE SECURITY CHECK (Admin Only API)
    const cookieStore = await cookies();
    const token = cookieStore.get("adminToken")?.value;

    // Agar token nahi hai ya galat hai, seedha bahar nikal do
    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access! Only Admins can upload." },
        { status: 401 }
      );
    }

    await connectDB();

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const tags = (formData.get("tags") as string) || "";
    const description = (formData.get("description") as string) || "";

    // Accept either a raw file OR a direct Cloudinary URL from the client
    const file = formData.get("file") as File | null;
    const mediaUrl = formData.get("mediaUrl") as string | null;
    const mediaType = formData.get("mediaType") as string | null;

    // Basic Field Validation
    if (!title || !category || !description) {
      return NextResponse.json(
        { success: false, error: "Title, Category, and Description are required!" },
        { status: 400 }
      );
    }

    if (!file && !mediaUrl) {
      return NextResponse.json(
        { success: false, error: "Either a File or a direct Media URL is required!" },
        { status: 400 }
      );
    }

    let finalMediaUrl = mediaUrl || "";
    let finalMediaType = mediaType || "image";

    // If the client sent a raw file (fallback for small files < 4.5MB)
    if (file) {
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        return NextResponse.json(
          { success: false, error: "Invalid format! Only JPG, PNG, GIF, WEBP, MP4, and WEBM are allowed." },
          { status: 400 }
        );
      }

      // 🛡️ 3. SECURITY CHECK: File Size Validation (Fixed Error Message)
      // 🛡️ SECURITY CHECK: File Size Validation
      const isVideo = file.type.startsWith("video/");
      const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;

      if (file.size > maxSize) {
        return NextResponse.json(
          { success: false, error: `File too large! Max size for ${isVideo ? 'video is 50MB' : 'image is 20MB'}.` },
          { status: 400 }
        );
      }

      // File to Buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // ☁️ Optimized Cloudinary Upload
      const uploadResponse: any = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            resource_type: "auto",
            folder: "memes",
            quality: "auto",
            fetch_format: "auto"
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      finalMediaUrl = uploadResponse.secure_url;
      finalMediaType = uploadResponse.resource_type === "video" ? "video" : "image";
    }

    // 📝 Save to Database (Pending State)
    const meme = await Meme.create({
      title: title.trim(),
      slug: title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") + "-" + Math.random().toString(36).substring(2, 6),
      mediaUrl: finalMediaUrl,
      mediaType: finalMediaType,
      category,
      tags: tags.split(",").map(t => t.trim()).filter(t => t !== ""),
      description: description.trim(),
      isApproved: true, // ⚠️ Goes to published
      uploaderRole: "admin" // 👈 Changed to admin
    });

    // 🚀 INDEX NOW PING — notify search engines about the new meme page
    if (meme.isApproved) {
      await pingIndexNow(`https://www.viraltrendingmemes.com/meme/${meme.slug}`);
      await pingIndexNow("https://www.viraltrendingmemes.com/");
    }

    return NextResponse.json({
      success: true,
      message: "Meme submitted successfully and published immediately!"
    }, { status: 201 });

  } catch (error: any) {
    console.error("Admin Upload Error:", error);
    return NextResponse.json(
      { success: false, error: "Upload failed. Please try again later." },
      { status: 500 }
    );
  }
}