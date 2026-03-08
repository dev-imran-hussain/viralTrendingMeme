import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Meme from "@/models/meme";
import cloudinary from "@/lib/cloudinary";

// ⚡ OPTIMIZATION LIMITS
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB limit for images
const MAX_VIDEO_SIZE = 30 * 1024 * 1024; // 30MB limit for videos
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
    await connectDB();

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const tags = (formData.get("tags") as string) || "";
    const description = (formData.get("description") as string) || "";
    const file = formData.get("file") as File;

    // 1. Basic Field Validation (Description is now required)
    if (!file || !title || !category || !description) {
      return NextResponse.json(
        { success: false, error: "Title, Category, Description, and File are required!" }, 
        { status: 400 }
      );
    }

    // 🛡️ 2. SECURITY CHECK: File Type Validation (MIME Type)
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Invalid format! Only JPG, PNG, GIF, WEBP, MP4, and WEBM are allowed." }, 
        { status: 400 }
      );
    }

    // 🛡️ 3. SECURITY CHECK: File Size Validation
    const isVideo = file.type.startsWith("video/");
    const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;

    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: `File too large! Max size for ${isVideo ? 'video is 15MB' : 'image is 5MB'}.` }, 
        { status: 400 }
      );
    }

    // 4. File to Buffer (Safe now because size is checked)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 5. ☁️ Optimized Cloudinary Upload (🔥 BANDWIDTH SAVER ACTIVATED)
    const uploadResponse: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { 
          resource_type: "auto", 
          folder: "memes",
          quality: "auto", // Auto-compress images and videos smartly
          fetch_format: "auto" // Auto-convert to lightest format (WebP/WebM)
        },
        (error, result) => { 
          if (error) reject(error); 
          else resolve(result); 
        }
      ).end(buffer);
    });

    // 6. 📝 Save to Database (Pending State)
    const meme = await Meme.create({
      title: title.trim(), // Remove extra spaces
      slug: title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now(),
      mediaUrl: uploadResponse.secure_url,
      mediaType: uploadResponse.resource_type === "video" ? "video" : "image",
      category,
      tags: tags.split(",").map(t => t.trim()).filter(t => t !== ""), // Clean tags
      description: description.trim(),
      isApproved: false, 
      uploaderRole: "user" 
    });

    return NextResponse.json({ 
      success: true, 
      message: "Meme submitted successfully! Waiting for admin approval." 
    }, { status: 201 });

  } catch (error: any) {
    console.error("Public Upload Error:", error);
    return NextResponse.json(
      { success: false, error: "Upload failed. Please try again later." }, 
      { status: 500 }
    );
  }
}