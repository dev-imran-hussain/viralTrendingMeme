"use client";
import dynamic from "next/dynamic";

// Lazy-load the interstitial ad — don't block initial page render
const InterstitialAd = dynamic(() => import("./InterstitialAd"), {
  ssr: false,
});

export default function LazyInterstitialAd() {
  return <InterstitialAd />;
}
