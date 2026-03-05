"use client";
import { useState } from "react";

interface MemeActionsProps {
  title: string;
  mediaUrl: string;
}

export default function MemeActions({ title, mediaUrl }: MemeActionsProps) {
  const [downloading, setDownloading] = useState(false);

  // 📥 MAGIC DOWNLOAD FUNCTION
  const handleDownload = async () => {
    setDownloading(true);
    try {
      // Cloudinary se direct download force karne ki trick
      const downloadUrl = mediaUrl.replace("/upload/", "/upload/fl_attachment/");
      
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `${title.replace(/[^a-zA-Z0-9]/g, "_")}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      alert("Network error! Download failed.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="mt-8 max-w-sm mx-auto animate-in slide-in-from-bottom-4 fade-in duration-500 delay-300">
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="w-full bg-black text-white py-4 rounded-2xl font-black text-xl hover:bg-purple-600 hover:shadow-2xl hover:shadow-purple-500/30 active:scale-95 transition-all flex justify-center items-center gap-3 disabled:bg-gray-400"
      >
        {downloading ? (
          <>
            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            Downloading...
          </>
        ) : (
          <>
            <span className="text-2xl">📥</span> Download Meme
          </>
        )}
      </button>
    </div>
  );
}