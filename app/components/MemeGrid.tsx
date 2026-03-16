"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import VideoPlayer from "./VideoPlayer";
import { getMemes } from "@/app/actions/getMemes";
import { CldImage } from "next-cloudinary";
import { useInView } from "react-intersection-observer";

interface MemeGridProps {
  initialMemes: any[];
  type: string;
  searchQuery?: string;
}

export default function MemeGrid({ initialMemes, type, searchQuery = "" }: MemeGridProps) {
  const [memes, setMemes] = useState(initialMemes);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialMemes.length >= 8);

  // Infinite Scroll Trigger Hook
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "400px", // Trigger earlier before hitting the actual bottom
  });

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMoreMemes();
    }
  }, [inView, hasMore, loading]);

  const loadMoreMemes = async () => {
    setLoading(true);
    const nextPage = page + 1;

    const newMemes = await getMemes(nextPage, 8, type, searchQuery);

    if (newMemes.length < 8) {
      setHasMore(false);
    }

    setMemes((prevMemes) => {
      const uniqueNewMemes = newMemes.filter(
        (newMeme: any) => !prevMemes.some((prevMeme) => prevMeme._id === newMeme._id)
      );
      return [...prevMemes, ...uniqueNewMemes];
    });

    setPage(nextPage);
    setLoading(false);
  };

  // Using next-cloudinary CldImage for automatic optimization

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {memes.map((meme: any) => {
          const posterUrl = meme.mediaType === "video"
            ? meme.mediaUrl.replace(/\.[^/.]+$/, ".jpg")
            : undefined;

          return (
            <div
              key={meme._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-black group flex flex-col"
            >
              {/* Top Media Area */}
              <Link href={`/meme/${meme.slug}`} className="block overflow-hidden relative bg-gray-50 border-b-2 border-black">
                {meme.mediaType === "video" ? (
                  <VideoPlayer src={meme.mediaUrl} poster={posterUrl} />
                ) : (
                  <CldImage
                    src={meme.mediaUrl}
                    alt={meme.title}
                    width="800"
                    height="800"
                    crop="fill"
                    format="auto"
                    quality="auto"
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
              </Link>

              {/* Bottom Info & Download Area */}
              <div className="p-4 flex items-center justify-between gap-3 bg-white">
                <Link href={`/meme/${meme.slug}`} className="flex-1 min-w-0">
                  <p className="font-bold text-lg text-gray-800 truncate hover:text-purple-600 transition-colors">
                    {meme.title}
                  </p>
                </Link>

                <Link
                  href={`/meme/${meme.slug}`}
                  className="shrink-0 bg-gray-100 hover:bg-purple-600 hover:text-white text-gray-800 px-4 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 group/btn border-2 border-black"
                  title="Download Meme"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-500 group-hover/btn:text-white transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Get
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More Trigger Area */}
      {hasMore && (
        <div ref={ref} className="flex justify-center mt-12 mb-4">
          <button
            onClick={loadMoreMemes}
            disabled={loading}
            className="px-8 py-3 bg-black text-white border-2 border-black font-bold rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 shadow-md"
          >
            {loading ? "Loading..." : "↓ Scroll to Load More"}
          </button>
        </div>
      )}

      {!hasMore && memes.length > 0 && (
        <div className="text-center text-gray-400 mt-12 mb-4 font-semibold">
          You've reached the end! 🎉
        </div>
      )}

      {memes.length === 0 && (
        <div className="text-center text-gray-500 mt-12 mb-4 font-bold text-xl">
          No memes found for this search! 😢
        </div>
      )}
    </div>
  );
}