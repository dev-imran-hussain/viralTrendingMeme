import Meme from "@/models/meme";
import Message from "@/models/message"; // 👇 Naya Message model import kiya
import { connectDB } from "@/lib/db";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth"; 
import LogoutButton from "@/app/admin/logout/LogoutButton"; 

export default async function Dashboard() {
  
  await requireAdmin();
  await connectDB();

  // 👇 MAGIC: Promise.all use kiya taaki teeno count ek sath load ho, site super fast rahe! 🚀
  const [pendingCount, publishedCount, unreadMessages] = await Promise.all([
    Meme.countDocuments({ isApproved: false }),
    Meme.countDocuments({ isApproved: true }),
    Message.countDocuments({ isRead: false }) // 👈 Unread messages ka count
  ]);

  return (
    <div className="min-h-screen bg-[#F4F4F5] text-gray-900 pb-20">
      
      {/* 1. Top Navbar */}
      <nav className="bg-black text-white border-b-4 border-purple-600 px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <div className="bg-gray-800 px-6 py-2 rounded-full font-bold text-lg tracking-wide shadow-inner cursor-default">
          Admin
        </div>
        <LogoutButton />
      </nav>

      <main className="max-w-6xl mx-auto px-6 mt-10">
        
        {/* 2. Dashboard Title Box */}
        <div className="flex justify-center mb-10">
          <h1 className="bg-gray-800 text-white px-16 py-4 rounded-4xl text-3xl font-extrabold shadow-xl tracking-wide">
            Dashboard
          </h1>
        </div>

        {/* 3. The 4 Action Squares Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          
          <Link href="/upload" className="bg-white hover:bg-purple-50 hover:border-purple-300 border-2 border-transparent transition-all shadow-md hover:shadow-lg rounded-3xl aspect-square flex flex-col items-center justify-center gap-3 group">
            <div className="bg-purple-100 text-purple-600 p-4 rounded-full group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
            </div>
            <span className="font-bold text-lg text-gray-700">Upload</span>
          </Link>

          <Link href="/admin/approve" className="bg-white hover:bg-yellow-50 hover:border-yellow-400 border-2 border-transparent transition-all shadow-md hover:shadow-lg rounded-3xl aspect-square flex flex-col items-center justify-center gap-3 group cursor-pointer">
            <div className="bg-yellow-100 text-yellow-600 p-4 rounded-full group-hover:scale-110 transition-transform relative">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              {pendingCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full animate-bounce shadow-md">
                  {pendingCount}
                </span>
              )}
            </div>
            <span className="font-bold text-lg text-gray-700">Approve</span>
          </Link>

          <Link href="/admin/published" className="bg-white hover:bg-green-50 hover:border-green-300 border-2 border-transparent transition-all shadow-md hover:shadow-lg rounded-3xl aspect-square flex flex-col items-center justify-center gap-3 group cursor-pointer">
            <div className="bg-green-100 text-green-600 p-4 rounded-full group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <span className="font-bold text-lg text-gray-700">Published ({publishedCount})</span>
          </Link>

          {/* 👇 NAYA INBOX SQUARE 👇 */}
          <Link href="/admin/messages" className="bg-white hover:bg-blue-50 hover:border-blue-400 border-2 border-transparent transition-all shadow-md hover:shadow-lg rounded-3xl aspect-square flex flex-col items-center justify-center gap-3 group cursor-pointer">
            <div className="bg-blue-100 text-blue-600 p-4 rounded-full group-hover:scale-110 transition-transform relative">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              
              {/* Naya Notification Badge jo pulse (blink) karega */}
              {unreadMessages > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full animate-pulse shadow-md">
                  {unreadMessages}
                </span>
              )}
            </div>
            <span className="font-bold text-lg text-gray-700">Inbox</span>
          </Link>

        </div>

        {/* 4. View Site Button */}
        <div className="flex justify-center mb-16">
          <Link href="/" target="_blank" className="bg-gray-800 hover:bg-purple-600 text-white transition-colors px-10 py-4 rounded-full font-bold shadow-lg flex items-center gap-3 text-lg">
            View Site
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
          </Link>
        </div>
      </main>
    </div>
  );
}