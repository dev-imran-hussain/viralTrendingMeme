import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Validate JWT_SECRET exists at module load time
// This prevents cryptic runtime crashes if the env var is missing
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET && process.env.NODE_ENV !== "production") {
  console.warn(
    "⚠️ JWT_SECRET is not set in environment variables. Admin authentication will fail."
  );
}

function getSecret(): string {
  if (!JWT_SECRET) {
    throw new Error(
      "JWT_SECRET is not defined. Please set it in your .env.local file."
    );
  }
  return JWT_SECRET;
}

// Verify a JWT token and return the decoded payload, or null if invalid
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, getSecret());
  } catch (error) {
    return null;
  }
}

// Server Component guard — redirects to login if not authenticated
export async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("adminToken")?.value;

  if (!token) {
    redirect("/admin/login");
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    redirect("/admin/login");
  }

  return decoded;
}