import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Meme from "@/models/meme";
import cloudinary from "@/lib/cloudinary"; 
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function DELETE(req: Request) {
  try {
    // 1. 🔐 Security Check (Sirf Admin delete kar sake)
    const cookieStore = await cookies();
    const token = cookieStore.get("adminToken")?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    await connectDB();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Meme ID is required" }, { status: 400 });
    }

    // 2. Pehle meme dhoondo taaki mediaUrl mil sake
    const meme = await Meme.findById(id);
    if (!meme) {
      return NextResponse.json({ error: "Meme not found" }, { status: 404 });
    }

    // 3. 🗑️ Cloudinary Cleanup Logic
    if (meme.mediaUrl) {
      try {
        // Cloudinary URL se public_id nikalne ka best tarika:
        // URL: .../upload/v12345/memes/filename.jpg -> Result: memes/filename
        const urlParts = meme.mediaUrl.split("/");
        const fileNameWithExt = urlParts[urlParts.length - 1]; // e.g., "abc.jpg"
        const folderName = urlParts[urlParts.length - 2]; // e.g., "memes"
        const publicId = `${folderName}/${fileNameWithExt.split(".")[0]}`; 

        // Cloudinary se file delete karo
        await cloudinary.uploader.destroy(publicId, {
          resource_type: meme.mediaType === "video" ? "video" : "image",
        });
        
        console.log(`Cloudinary file deleted: ${publicId}`);
      } catch (cloudinaryErr) {
        console.error("Cloudinary delete failed, but continuing with DB delete:", cloudinaryErr);
      }
    }

    // 4. Sabse aakhir mein Database se delete karo
    await Meme.findByIdAndDelete(id);

    return NextResponse.json({ 
      success: true, 
      message: "Meme and Cloudinary file deleted successfully" 
    }, { status: 200 });

  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}