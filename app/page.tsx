import { Suspense } from "react";
import { connectDB } from "@/lib/db";
import Link from "next/link";
import { getMemes } from "@/app/actions/getMemes";
import MemeGrid from "@/app/components/MemeGrid";
import { Metadata } from "next";

// 🚀 SEO MAGIC 1: Dynamic Metadata Generation
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; q?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const type = params?.type || "all";
  const q = params?.q || "";

  // Base SEO Default
  let title = "Viral Trending Memes - Unlimited Laughs & Daily Memes";
  let description =
    "The internet's best collection of funny videos, dank photos, dark humor, and viral trends. Updated every single day.";

  // Dynamic SEO based on User Action
  if (q) {
    // Uppercase first letter of search query for better look
    const capQ = q.charAt(0).toUpperCase() + q.slice(1);
    title = `${capQ} Memes - Top Viral ${capQ} Videos & Pics | ViralTrendingMemes`;
    description = `Explore the best and funniest ${q} memes. We have a huge collection of viral ${q} videos, dark humor, and relatable pictures.`;
  } else if (type === "video") {
    title = "Funny Video Memes & Viral Clips - ViralTrendingMemes";
    description =
      "Watch the funniest viral video memes, TikTok trends, and short comedy clips updated daily.";
  } else if (type === "image") {
    title = "Dank Photos & Funny Picture Memes - ViralTrendingMemes";
    description =
      "Browse our massive gallery of relatable pictures, dank photos, and hilarious image memes.";
  }

  return {
    title,
    description,
    keywords: [
      "memes",
      "funny videos",
      "dank memes",
      "viral",
      "relatable",
      q,
    ].filter(Boolean),
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "ViralTrendingMemes",
      url: "https://viraltrendingmemes.com",
      images: [
        {
          url: "https://viraltrendingmemes.com/og-image.jpg", // Create this default image later
          width: 1200,
          height: 630,
          alt: "ViralTrendingMemes - The internet's best collection of funny videos and photos",
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://viraltrendingmemes.com/og-image.jpg"],
    },
    alternates: {
      canonical: `https://viraltrendingmemes.com${q ? `/?q=${q}` : ""}${type !== "all" ? `/?type=${type}` : ""}`,
    },
  };
}

// 🚀 SKELETON LOADER
function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse flex flex-col"
        >
          <div className="h-64 bg-gray-200 w-full"></div>
          <div className="p-4 flex items-center justify-between gap-3">
            <div className="h-6 bg-gray-200 rounded-md w-2/3"></div>
            <div className="h-8 bg-gray-200 rounded-xl w-16"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// 🚀 DATA FETCHING COMPONENT
async function MemeFeed({ type, q }: { type: string; q: string }) {
  const memes = await getMemes(1, 8, type, q);

  if (memes.length === 0) {
    return (
      <div className="text-center py-20 animate-in fade-in duration-500">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-2xl font-black text-gray-800">No memes found!</h3>
        <p className="text-gray-500 font-medium mt-2">
          Try searching for something else or clear the search.
        </p>
      </div>
    );
  }

  return (
    <MemeGrid
      key={`${type}-${q}`}
      initialMemes={memes}
      type={type}
      searchQuery={q}
    />
  );
}

// 🚀 MAIN PAGE COMPONENT
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; q?: string }>;
}) {
  await connectDB();

  const params = await searchParams;
  const type = params?.type || "all";
  const q = params?.q || "";

  // 🚀 SEO MAGIC 2: JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ViralTrendingMemes",
    url: "https://viraltrendingmemes.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://viraltrendingmemes.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div className="min-h-screen bg-[#F4F4F5] text-gray-900 selection:bg-purple-300 selection:text-white pb-10 overflow-x-hidden">
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8865004522012498"
        crossOrigin="anonymous" strategy="afterInteractive"></script>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Ultra-Premium Frosted Glass Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl backdrop-saturate-150 border-b border-gray-200/50 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* 👇 YAHAN LOGO CHANGE KIYA HAI 👇 */}
          <Link
            href="/"
            className="text-2xl font-black tracking-tight text-gray-900 hover:text-purple-600 transition-colors"
          >
            ViralTrending<span className="text-purple-600">Memes</span>
          </Link>

          <nav className="hidden md:flex gap-8 font-bold text-gray-500">
            <Link href="/" className="hover:text-black transition-colors">
              Trending
            </Link>
            <Link href="/" className="hover:text-black transition-colors">
              Categories
            </Link>
            <Link href="/about" className="hover:text-black transition-colors">About</Link>
          </nav>
        </div>
      </header>

      <div className="h-28"></div>

      {/* 2. Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-10 text-center flex flex-col items-center animate-in slide-in-from-bottom-4 fade-in duration-700 ease-out">
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-gray-900 leading-tight">
          Unlimited Laughs.
          <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-black">
            Daily Memes.
          </span>
        </h1>
        <h2 className="text-lg text-gray-500 font-medium max-w-2xl mb-10">
          The internet's best collection of funny videos, dark humor, and viral
          trends. Updated every single day.
        </h2>

        {/* 🔍 3. Smooth Search Bar */}
        <form action="/" className="w-full max-w-2xl mb-10 relative group z-10">
          <input type="hidden" name="type" value={type} />
          <input
            type="text"
            name="q"
            defaultValue={q}
            autoComplete="off"
            spellCheck="false"
            placeholder="Search memes, tags, or categories..."
            className="w-full p-5 pl-14 pr-36 bg-white rounded-2xl border-2 border-transparent focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none font-bold text-gray-900 placeholder-gray-400 transition-all shadow-sm group-hover:shadow-md"
          />
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl text-gray-400 select-none">
            🔍
          </span>

          {q && (
            <Link
              href={`/?type=${type}`}
              className="absolute right-32 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-500 rounded-full hover:bg-red-100 hover:text-red-600 hover:rotate-90 transition-all text-sm font-bold"
              title="Clear Search"
            >
              ✖
            </Link>
          )}

          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-600 active:scale-95 transition-all"
          >
            Search
          </button>
        </form>

        {/* 4. Animated Pill-shaped Filters */}
        <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 flex gap-1 z-0 relative">
          <Link
            href={`/?type=all${q ? `&q=${q}` : ""}`}
            className={`px-6 sm:px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${type === "all"
              ? "bg-black text-white shadow-md scale-100"
              : "text-gray-500 hover:text-black hover:bg-gray-50 active:scale-95"
              }`}
          >
            🔥 All
          </Link>
          <Link
            href={`/?type=video${q ? `&q=${q}` : ""}`}
            className={`px-6 sm:px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${type === "video"
              ? "bg-black text-white shadow-md scale-100"
              : "text-gray-500 hover:text-black hover:bg-gray-50 active:scale-95"
              }`}
          >
            🎥 Videos
          </Link>
          <Link
            href={`/?type=image${q ? `&q=${q}` : ""}`}
            className={`px-6 sm:px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${type === "image"
              ? "bg-black text-white shadow-md scale-100"
              : "text-gray-500 hover:text-black hover:bg-gray-50 active:scale-95"
              }`}
          >
            📸 Photos
          </Link>
        </div>
      </section>

      {/* 5. Sleek Horizontal Ad Banner */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="w-full h-24 bg-white/50 backdrop-blur-sm rounded-2xl flex items-center justify-center text-gray-400 font-black text-xs border-2 border-dashed border-gray-200 uppercase tracking-[0.2em] transition-colors hover:border-gray-300">
          Sponsored Ad Space
        </div>
      </div>

      {/* 6. Main Content Area with Suspense */}
      <main className="max-w-7xl mx-auto px-6 min-h-[50vh]">
        <Suspense key={`${type}-${q}`} fallback={<GridSkeleton />}>
          <MemeFeed type={type} q={q} />
        </Suspense>
      </main>

      {/* Footer with Copyright */}
      <footer className="max-w-7xl mx-auto px-6 py-10 mt-20 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 font-bold text-sm">
          © {new Date().getFullYear()} ViralTrendingMeme. All rights reserved.
        </p>
        <div className="flex gap-6 font-bold text-sm text-gray-500">
          <Link href="/privacy" className="hover:text-black transition-colors">
            Privacy Policy
          </Link>
          <Link href="/about" className="hover:text-black transition-colors">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-black transition-colors">
            Contact & Feedback
          </Link>
        </div>
      </footer>
    </div>
  );
}
