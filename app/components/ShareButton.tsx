"use client";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

interface ShareButtonProps {
  title: string;
  url: string;
}

export default function ShareButton({ title, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    trackEvent("share_meme", { event_category: "engagement", event_label: title });

    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this hilarious meme: ${title}`,
          url: url,
        });
        return; 
      } catch (error) {
        console.log("User cancelled share.");
      }
    }

    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleShare}
      className="flex w-full h-full items-center justify-center gap-3 px-6 py-4 bg-gray-900 text-white text-lg font-bold rounded-2xl hover:bg-purple-600 transition-all active:scale-95 shadow-xl shadow-gray-200"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3"></circle>
        <circle cx="6" cy="12" r="3"></circle>
        <circle cx="18" cy="19" r="3"></circle>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
      </svg>
      {copied ? "Link Copied!" : "Share Meme"}
    </button>
  );
}