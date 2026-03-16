"use client";
import { useState, useEffect } from "react";

export default function InterstitialAd() {
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    // Only show the ad after a delay AND only if user has visited 2+ pages
    // This avoids Google's "intrusive interstitial" policy violation
    const pageViews = parseInt(sessionStorage.getItem("vtm_page_views") || "0") + 1;
    sessionStorage.setItem("vtm_page_views", String(pageViews));

    // Only show ad popup after user has browsed at least 3 pages
    if (pageViews >= 3) {
      // Check if we already showed the ad this session
      const alreadyShown = sessionStorage.getItem("vtm_ad_shown");
      if (!alreadyShown) {
        // Delay the popup by 5 seconds to avoid being "intrusive"
        const timer = setTimeout(() => {
          setShowAd(true);
          sessionStorage.setItem("vtm_ad_shown", "true");
        }, 5000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  if (!showAd) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Non-intrusive bottom sheet on mobile, centered card on desktop */}
      <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative animate-in slide-in-from-bottom-4 duration-300 border border-gray-100">
        
        {/* Close Button */}
        <button
          onClick={() => setShowAd(false)}
          className="absolute top-4 right-4 bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-600 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all z-10"
          title="Close"
          aria-label="Close advertisement"
        >
          ✕
        </button>

        <div className="p-8 text-center">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block">
            Advertisement
          </span>
          
          {/* Ad unit placeholder (will be replaced by real AdSense auto ads) */}
          <div className="w-full min-h-[250px] bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center justify-center mb-6">
            {/* TODO: After AdSense approval, create an ad unit and replace with real slot ID */}
            <ins
              className="adsbygoogle"
              style={{ display: "block", width: "100%", minHeight: "250px" }}
              data-ad-client="ca-pub-8865004522012498"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
          </div>
          
          {/* Continue Button */}
          <button
            onClick={() => setShowAd(false)}
            className="w-full py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all shadow-lg active:scale-95"
          >
            Continue to Meme →
          </button>
        </div>
      </div>
    </div>
  );
}