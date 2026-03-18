import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

// Configure Cloudinary (Safe to do inside or outside the handler)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST() {
  try {
    // 1. Security Check: Only allow logged-in Admins
    const cookieStore = await cookies();
    const token = cookieStore.get("adminToken")?.value;

    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin access required" },
        { status: 401 }
      );
    }

    // 2. Define Upload Parameters
    // Everything included here MUST be sent by the frontend in the same way
    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = "memes";

    const paramsToSign = {
      timestamp: timestamp,
      folder: folder,
    };

    // 3. Generate the Secure Signature
    // This uses your API_SECRET (which stays on the server) to sign the params
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET!
    );

    // 4. Return keys to Frontend
    return NextResponse.json({
      success: true,
      signature,
      timestamp,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder: folder
    });

  } catch (error: any) {
    console.error("Cloudinary Signature Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error during signing" },
      { status: 500 }
    );
  }
}