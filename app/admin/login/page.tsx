"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Inline error state
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin/dashboard");
      } else {
        // Show sleek error message instead of alert
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  // Wireframe ka "Reset" functionality
  const handleReset = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    // Background matches the dashboard's soft gray
    <div className="min-h-screen flex items-center justify-center bg-[#F4F4F5] px-4 selection:bg-purple-300">
      
      {/* Premium Login Card */}
      <div className="max-w-md w-full bg-white rounded-4xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Top Header (Matches wireframe "ADMIN" text and line) */}
        <div className="bg-gray-900 px-8 py-6 text-center border-b-4 border-purple-600">
          <h2 className="text-3xl font-extrabold text-white tracking-widest">ADMIN</h2>
          <p className="text-gray-400 text-sm mt-1">Secure Login Portal</p>
        </div>

        <form onSubmit={handleLogin} className="p-8">
          
          {/* Inline Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm font-semibold rounded-xl text-center border border-red-100 animate-pulse">
              {error}
            </div>
          )}

          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-gray-700 font-extrabold mb-2 ml-1 text-sm uppercase tracking-wide">
              Enter e-mail
            </label>
            <input
              type="email"
              placeholder="admin@memesite.com"
              className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all text-gray-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-8">
            <label className="block text-gray-700 font-extrabold mb-2 ml-1 text-sm uppercase tracking-wide">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all text-gray-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Buttons Layout (Reset & Login) */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleReset}
              className="w-1/3 bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors shadow-sm"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="w-2/3 bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-purple-600 transition-colors shadow-md disabled:opacity-70 flex justify-center items-center"
            >
              {isLoading ? "Authenticating..." : "Login"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}