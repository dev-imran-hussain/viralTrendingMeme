import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("adminToken")?.value;
    
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder: "memes" },
      process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({ 
      success: true, 
      timestamp, 
      signature, 
      apiKey: process.env.CLOUDINARY_API_KEY, 
      cloudName: process.env.CLOUDINARY_CLOUD_NAME 
    });
  } catch (error) {
    console.error("Signature Error:", error);
    return NextResponse.json({ success: false, error: "Failed to create signature" }, { status: 500 });
  }
}
