"use client";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

interface MemeActionsProps {
  title: string;
  mediaUrl: string;
}

export default function MemeActions({ title, mediaUrl }: MemeActionsProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    trackEvent("download_meme", { event_category: "engagement", event_label: title });

    try {
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
    <button
      onClick={handleDownload}
      disabled={downloading}
      className="flex w-full h-full items-center justify-center gap-3 px-6 py-4 bg-gray-900 text-white text-lg font-bold rounded-2xl hover:bg-purple-600 transition-all active:scale-95 shadow-xl shadow-gray-200 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {downloading ? (
        <>
          <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          Downloading...
        </>
      ) : (
        <>
          {/* Replaced Emoji with an SVG icon matching the Share button dimensions */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download Meme
        </>
      )}
    </button>
  );
}