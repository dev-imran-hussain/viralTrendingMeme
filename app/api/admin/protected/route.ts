import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({
      success: false,
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  const decoded = verifyToken(token);

  if (!decoded) {
    return NextResponse.json({
      success: false,
      message: "Invalid token",
    });
  }

  return NextResponse.json({
    success: true,
    message: "Access granted",
  });
}