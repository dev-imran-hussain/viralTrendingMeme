"use client";
import { useRef, useState } from "react";

export default function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true); // True initially if autoPlay is on

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();

    if (videoRef.current) {
      if (videoRef.current.paused) {
        // 🔥 NEW LOGIC: Pause all other videos before playing this one
        const allVideos = document.querySelectorAll("video");
        allVideos.forEach((vid) => {
          if (vid !== videoRef.current) {
            vid.pause();
          }
        });

        // Now play the video the user actually clicked
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div 
      className="relative w-full h-full cursor-pointer group"
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        loop
        playsInline
        preload="metadata"
        className="w-full h-64 object-cover"
        controlsList="nodownload noremoteplayback"
        disablePictureInPicture
        // Keeps the Play button overlay in sync automatically!
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)} 
      />

      {/* The Play Button Overlay (Only visible when paused) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity z-10">
          <div className="bg-white/30 backdrop-blur-sm p-4 rounded-full shadow-lg transform transition-transform scale-100 group-hover:scale-110">
            {/* SVG Play Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-10 h-10 text-white pl-1"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}