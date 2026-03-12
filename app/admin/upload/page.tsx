import { requireAdmin } from "@/lib/auth";
import UploadForm from "./UploadForm"; // 👈 Upar jo nayi file banai, wo yahan aayegi

export default async function AdminUploadPage() {
  // 🔒 THE GATEKEEPER: Ye check karega ki browser mein Admin Token hai ya nahi
  // Agar tu admin nahi hai, toh ye function yahi rok dega aur form load hi nahi hoga!
  await requireAdmin();

  // Agar token sahi hai, tabhi form dikhega
  return <UploadForm />;
}