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
    const file = formData.get("file") as File;

    // Basic Field Validation
    if (!file || !title || !category || !description) {
      return NextResponse.json(
        { success: false, error: "Title, Category, Description, and File are required!" }, 
        { status: 400 }
      );
    }

    // File Type Validation (MIME Type)
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Invalid format! Only JPG, PNG, GIF, WEBP, MP4, and WEBM are allowed." }, 
        { status: 400 }
      );
    }

    // 🛡️ 3. SECURITY CHECK: File Size Validation (Fixed Error Message)
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

    // 📝 Save to Database (Pending State)
    const meme = await Meme.create({
      title: title.trim(),
      slug: title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now(),
      mediaUrl: uploadResponse.secure_url,
      mediaType: uploadResponse.resource_type === "video" ? "video" : "image",
      category,
      tags: tags.split(",").map(t => t.trim()).filter(t => t !== ""), 
      description: description.trim(),
      isApproved: false, // ⚠️ Goes to Review Queue
      uploaderRole: "admin" // 👈 Changed to admin
    });

    // 🚀 INDEX NOW PING
    if (meme.isApproved) {
      await pingIndexNow("https://viraltrendingmemes.com/");
      await pingIndexNow(`https://viraltrendingmemes.com/?type=${meme.mediaType}`);
    }

    return NextResponse.json({ 
      success: true, 
      message: "Meme submitted successfully! Saved to Review Queue." 
    }, { status: 201 });

  } catch (error: any) {
    console.error("Admin Upload Error:", error);
    return NextResponse.json(
      { success: false, error: "Upload failed. Please try again later." }, 
      { status: 500 }
    );
  }
}