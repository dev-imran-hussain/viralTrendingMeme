"use client";

import { useState } from "react";

export default function ComingSoonLink({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navigation Link */}
      <button
        onClick={() => setIsOpen(true)}
        className="hover:text-black transition-colors cursor-pointer text-base bg-transparent border-none p-0 m-0 font-bold"
      >
        {children}
      </button>

      {/* Modal Popup Container */}
      {isOpen && (
        // 👇 Yahan fixed, inset-0, w-screen aur h-[100dvh] use kiya hai absolute center ke liye
        <div className="fixed inset-0 z-[100] flex items-center justify-center w-screen h-[100dvh] px-4 overflow-hidden">
          
          {/* Background Overlay */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Main Popup Box */}
          <div className="relative bg-white/90 backdrop-blur-xl backdrop-saturate-150 rounded-3xl shadow-2xl border border-gray-200/50 p-8 w-full max-w-sm flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
            
            {/* Cross (✖) Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-500 rounded-full hover:bg-red-100 hover:text-red-600 hover:rotate-90 transition-all text-sm font-bold"
              title="Close"
            >
              ✖
            </button>

            {/* Popup Content */}
            <div className="text-center w-full mt-2">
              <div className="text-6xl mb-4 animate-bounce">🚀</div>
              <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">
                Coming <span className="text-purple-600">Soon!</span>
              </h3>
              <p className="text-gray-500 font-medium leading-relaxed mb-6">
                Ye feature abhi ban raha hai. Bahut jald yahan naye memes aur categories milenge!
              </p>
              
              {/* Action Button */}
              <button 
                onClick={() => setIsOpen(false)}
                className="w-full bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-600 active:scale-95 transition-all"
              >
                Got it, Thanks!
              </button>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}