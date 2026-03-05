"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await fetch("/api/admin/logout", {
      method: "POST",
    });
    router.push("/admin/login");
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="bg-gray-800 hover:bg-red-600 disabled:opacity-50 transition-colors px-6 py-2 rounded-full font-bold shadow-inner flex items-center gap-2"
    >
      {isLoggingOut ? "Logging out..." : "Logout"}
    </button>
  );
}