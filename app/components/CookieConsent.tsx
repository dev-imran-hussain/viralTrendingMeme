"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("vtm_cookie_consent");
    
    // If they already accepted in a previous session, tell Google to start tracking
    if (consent === "accepted") {
      if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
        (window as any).gtag("consent", "update", {
          analytics_storage: "granted",
          ad_storage: "granted",
        });
      }
    } 
    // If no consent is found, show the banner
    else if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("vtm_cookie_consent", "accepted");
    setShowBanner(false);
    
    // Tell Google the user opted IN
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      (window as any).gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
      });
    }
  };

  const declineCookies = () => {
    localStorage.setItem("vtm_cookie_consent", "declined");
    setShowBanner(false);
    
    // Tell Google the user opted OUT
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      (window as any).gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
      });
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-transparent pointer-events-none animate-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 pointer-events-auto">
        {/* Text */}
        <div className="flex-1">
          <p className="text-gray-800 font-bold text-sm mb-1">🍪 We use cookies</p>
          <p className="text-gray-500 text-sm font-medium">
            We use cookies for analytics and to serve personalized ads via Google AdSense.
            By clicking &quot;Accept&quot;, you consent to our use of cookies.{" "}
            <Link
              href="/privacy"
              className="text-purple-600 underline font-bold hover:text-purple-800"
            >
              Learn more
            </Link>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 shrink-0">
          <button
            onClick={declineCookies}
            className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all"
          >
            Decline
          </button>
          <button
            onClick={acceptCookies}
            className="px-5 py-2.5 bg-black text-white rounded-xl font-bold text-sm hover:bg-purple-600 transition-all active:scale-95"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}