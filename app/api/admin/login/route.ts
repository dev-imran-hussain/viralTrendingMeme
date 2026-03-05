import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(request: Request) {
  try {
    await connectDB();

    const { email, password } = await request.json();

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return NextResponse.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return NextResponse.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json({
      success: true,
    });

    // 🔐 Store token in secure HTTP-only cookie
    response.cookies.set("adminToken", token, {
      httpOnly: true,
      secure: false, // change to true in production (HTTPS)
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
    });
  }
}