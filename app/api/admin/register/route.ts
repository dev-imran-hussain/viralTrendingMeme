import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST() {
  try {
    await connectDB();

    const hashedPassword = await bcrypt.hash("Admin123", 10);

    const admin = await Admin.create({
      name: "Imran",
      email: "admin@example.com",
      password: hashedPassword,
    });

    return NextResponse.json({
      success: true,
      admin,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
    });
  }
}