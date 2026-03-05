"use client";
import { useState, useEffect } from "react";

export default function InterstitialAd() {
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    // Jaise hi user page par aayega, ad pop-up ho jayega
    setShowAd(true);
  }, []);

  if (!showAd) return null; // Agar ad close ho gaya, toh component gayab

  return (
    <div className="fixed inset-0 z-100 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      {/* Ad Box */}
      <div className="bg-white rounded-4xl max-w-lg w-full overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300 border border-gray-100">
        
        {/* ❌ Cross Button (Top Right) */}
        <button
          onClick={() => setShowAd(false)}
          className="absolute top-4 right-4 bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-600 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all z-10"
          title="Close Ad"
        >
          ✖
        </button>

        <div className="p-8 text-center">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block">
            Sponsored Advertisement
          </span>
          
          {/* Ad Banner Image Placeholder */}
          <div className="w-full h-48 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center mb-6 hover:bg-purple-50 hover:border-purple-300 transition-colors cursor-pointer">
             <span className="text-4xl mb-2">🚀</span>
             <span className="text-gray-400 font-bold text-lg">Your Ad Banner Here</span>
          </div>
          
          <h3 className="text-2xl font-black text-gray-900 mb-2">
            Meme Generator Pro
          </h3>
          <p className="text-gray-500 mb-6 font-medium text-sm">
            Create viral memes in seconds without watermarks. Click below to check it out or skip to see your meme!
          </p>
          
          {/* Skip Ad Button */}
          <button
            onClick={() => setShowAd(false)}
            className="w-full py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all shadow-lg active:scale-95"
          >
            Skip Ad & View Meme
          </button>
        </div>
      </div>
    </div>
  );
}