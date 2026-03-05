import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Meme from "@/models/meme";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function PATCH(req: Request) {
  try {
    // 1. 🔐 Security Check: Verify Admin Token from Cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("adminToken")?.value;
    
    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access" }, 
        { status: 401 }
      );
    }

    await connectDB();
    const body = await req.json();
    
    // Destructure fields from the review modal
    const { id, title, category, tags, description } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Meme ID is required" }, 
        { status: 400 }
      );
    }

    // 2. ⚡ Optimized & Future-proof Update
    // Humne 'new: true' ki jagah 'returnDocument: after' use kiya hai warning hatane ke liye
    const updatedMeme = await Meme.findByIdAndUpdate(
      id, 
      { 
        isApproved: true,
        ...(title && { title }),
        ...(category && { category }),
        ...(tags && { tags }),
        ...(description && { description })
      },
      { 
        returnDocument: 'after', 
        runValidators: true 
      }
    );

    if (!updatedMeme) {
      return NextResponse.json(
        { success: false, error: "Meme not found" }, 
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: "Meme approved and details updated successfully!",
      data: updatedMeme 
    }, { status: 200 });

  } catch (error) {
    console.error("Approve API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}