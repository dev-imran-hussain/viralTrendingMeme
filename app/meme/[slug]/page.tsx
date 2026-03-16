import { connectDB } from "@/lib/db";
import Meme from "@/models/meme";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { cache } from "react"; // 👇 Ye import kiya for performance
import VideoPlayer from "@/app/components/VideoPlayer";
import MemeActions from "@/app/components/MemeActions";
import InterstitialAd from "@/app/components/InterstitialAd";
import { CldImage } from "next-cloudinary";

// 🚀 1. CACHED FETCH FUNCTION (Taaki DB 2 baar hit na ho)
const getMeme = cache(async (slug: string) => {
  await connectDB();
  return await Meme.findOne({ slug, isApproved: true }).lean() as any;
});

// 🚀 2. DYNAMIC SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  // 👇 Ab ye fast cached function use karega
  const meme = await getMeme(slug);

  if (!meme) return { title: "Meme Not Found | ViralTrendingMemes" };

  const parsedTags = Array.isArray(meme.tags) 
    ? meme.tags 
    : typeof meme.tags === "string" 
      ? meme.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
      : [];

  // Base metadata config
  const metadata: Metadata = {
    title: `${meme.title} - Free Download | ViralTrendingMemes`,
    description: meme.description || `Download this hilarious ${meme.category} meme! We update daily with the internet's best funny videos and dank photos.`,
    keywords: ["memes", meme.category, ...parsedTags],
    alternates: {
      canonical: `https://viraltrendingmemes.com/meme/${slug}`,
    },
    openGraph: {
      title: meme.title,
      description: meme.description || `Download this hilarious ${meme.category} meme!`,
      url: `https://viraltrendingmemes.com/meme/${slug}`,
      siteName: "ViralTrendingMemes",
      images: meme.mediaType === "image" ? [
        {
          url: meme.mediaUrl,
          width: 800,
          height: 800,
          alt: meme.title
        }
      ] : [],
      type: "video.other",
    },
    twitter: {
      card: meme.mediaType === "video" ? "player" : "summary_large_image",
      title: meme.title,
      description: meme.description || `Download this hilarious ${meme.category} meme!`,
    },
  };

  // If it's a video, append specific OpenGraph video properties
  // This allows Discord/Twitter/iMessage to play the video natively!
  if (meme.mediaType === "video" && metadata.openGraph) {
    metadata.openGraph.videos = [
      {
        url: meme.mediaUrl,
      }
    ];
  }

  return metadata;
}

// 🚀 3. MAIN PAGE
export default async function SingleMemePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // 👇 Yahan DB wapas hit nahi hoga, cache se data instantly aayega!
  const meme = await getMeme(slug);

  if (!meme) {
    notFound();
  }

  // 🛡️ Safe Tags Parsing Logic (Crash bachaane ke liye)
  let safeTags: string[] = [];
  if (Array.isArray(meme.tags)) {
    safeTags = meme.tags;
  } else if (typeof meme.tags === "string") {
    safeTags = (meme.tags as string)
      .split(",")
      .map((tag: string) => tag.trim())
      .filter(Boolean);
  }

  // Google Search Console Video Indexing Fix:
  // thumbnailUrl MUST be an image, not an .mp4 or .webm file.
  // We can automatically generate a poster image using Cloudinary by replacing the extension with .jpg
  const thumbnailUrl = meme.mediaType === "video" 
    ? meme.mediaUrl.replace(/\.[^/.]+$/, ".jpg") 
    : meme.mediaUrl;

  // 🚀 SEO MAGIC 3: JSON-LD for Search Engines
  const jsonLd = meme.mediaType === "video" ? {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": meme.title,
    "description": meme.description || `Download this hilarious ${meme.category} meme!`,
    "thumbnailUrl": [thumbnailUrl],
    "uploadDate": meme.createdAt || new Date().toISOString(),
    "contentUrl": meme.mediaUrl
  } : {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "name": meme.title,
    "description": meme.description || `Download this hilarious ${meme.category} meme!`,
    "contentUrl": meme.mediaUrl,
    "datePublished": meme.createdAt || new Date().toISOString()
  };

  return (
    <div className="min-h-screen bg-[#F4F4F5] pb-20 relative selection:bg-purple-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 🛑 THE AD POPUP */}
      <InterstitialAd />

      {/* 1. Minimal Navbar */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-40 transition-all">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-gray-500 hover:text-black font-bold flex items-center gap-2 transition-colors bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 text-sm">
            <span className="text-lg leading-none">←</span> Back
          </Link>
          <Link href="/" className="text-xl font-black tracking-tight text-gray-900">
            ViralTrending<span className="text-purple-600">Memes</span>
          </Link>
        </div>
      </header>

      {/* 2. Main Focused Content */}
      <main className="max-w-3xl mx-auto px-4 mt-10 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Category Badge */}
        <div className="flex justify-center mb-6">
          <Link href={`/?type=all&q=${meme.category}`} className="bg-purple-100 text-purple-700 hover:bg-purple-200 hover:text-purple-800 px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] border border-purple-200 transition-colors cursor-pointer">
            {meme.category}
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-black text-center text-gray-900 mb-8 leading-tight px-4">
          {meme.title}
        </h1>

        {/* 3. The Meme Media */}
        <div className="bg-white p-2 rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden mx-auto max-w-2xl">
          <div className="rounded-4xl overflow-hidden bg-gray-50 flex items-center justify-center min-h-75 relative group">
            {meme.mediaType === "video" ? (
              <div className="w-full">
                 <VideoPlayer src={meme.mediaUrl} poster={thumbnailUrl} />
              </div>
            ) : (
              <CldImage 
                src={meme.mediaUrl} 
                alt={meme.title} 
                width="1200"
                height="1200"
                crop="fit"
                format="auto"
                quality="auto"
                className="w-full max-h-[65vh] object-contain"
              />
            )}
          </div>
        </div>

        {/* 4. IMPROVED DETAILS SECTION (Description & Tags) */}
        <div className="mt-8 max-w-2xl mx-auto bg-white p-8 rounded-4xl shadow-sm border border-gray-100">
          
          {/* DESCRIPTION WALA PART */}
          <div className="mb-8">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-100 pb-2">
              Description
            </h3>
            <p className="text-gray-800 font-medium text-lg leading-relaxed">
              {meme.description ? meme.description : "No description provided for this meme. Just enjoy the laughs! 😂"}
            </p>
          </div>

          {/* TAGS WALA PART (Ab Crash nahi hoga) */}
          {safeTags.length > 0 && (
            <div>
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-100 pb-2">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {safeTags.map((tag: string, index: number) => (
                  <Link 
                    key={index} 
                    href={`/?q=${tag}`} 
                    className="bg-gray-100 hover:bg-gray-200 hover:text-black text-gray-500 border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold transition-all"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 5. The Download Action */}
        <MemeActions title={meme.title} mediaUrl={meme.mediaUrl} />

      </main>
    </div>
  );
}