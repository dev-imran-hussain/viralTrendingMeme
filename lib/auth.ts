import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const JWT_SECRET = process.env.JWT_SECRET as string;

// 1. Token Verify karne ke liye (Sabhi APIs mein use hoga)
export function verifyToken(token: string) {
  try {
    // JWT_SECRET ko confirm karta hai aur token decode karta hai
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    // Agar token expire ya galat ho toh null return karega
    return null;
  }
}

// 2. Pages ko protect karne ke liye (Server Components mein use hoga)
export async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("adminToken")?.value;

  // Agar cookie mein token nahi hai, seedha login page par redirect
  if (!token) {
    redirect("/admin/login");
  }

  const decoded = verifyToken(token);
  
  // Agar token verify nahi hua (Invalid/Expired), toh bhi login par bhej do
  if (!decoded) {
    redirect("/admin/login");
  }

  // Sab sahi hone par decoded data return karega
  return decoded;
}