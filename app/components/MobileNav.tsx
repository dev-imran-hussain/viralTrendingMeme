"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on route change / escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-[60] w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        id="mobile-menu-toggle"
      >
        <span
          className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-[4px]" : ""
          }`}
        />
        <span
          className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${
            isOpen ? "opacity-0 scale-0" : ""
          }`}
        />
        <span
          className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-[4px]" : ""
          }`}
        />
      </button>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[55] animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Slide-out Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white/95 backdrop-blur-xl shadow-2xl z-[58] transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="flex flex-col h-full pt-24 px-6">
          {/* Nav Links */}
          <nav className="flex flex-col gap-2" id="mobile-nav-links">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-gray-800 hover:bg-purple-50 hover:text-purple-700 transition-all text-lg"
            >
              <span className="text-xl">🔥</span> Home
            </Link>
            <Link
              href="/?type=video"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-gray-800 hover:bg-purple-50 hover:text-purple-700 transition-all text-lg"
            >
              <span className="text-xl">🎥</span> Videos
            </Link>
            <Link
              href="/?type=image"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-gray-800 hover:bg-purple-50 hover:text-purple-700 transition-all text-lg"
            >
              <span className="text-xl">📸</span> Photos
            </Link>

            <div className="h-px bg-gray-200 my-2" />

            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-gray-500 hover:bg-gray-50 hover:text-black transition-all"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-gray-500 hover:bg-gray-50 hover:text-black transition-all"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-gray-500 hover:bg-gray-50 hover:text-black transition-all"
            >
              Privacy Policy
            </Link>
          </nav>

          {/* Bottom Branding */}
          <div className="mt-auto pb-8">
            <p className="text-sm text-gray-400 font-medium text-center">
              © {new Date().getFullYear()} ViralTrendingMemes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
