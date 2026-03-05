import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | ViralTrendingMeme",
  description: "Learn more about ViralTrendingMeme, your ultimate destination for daily laughs, viral trends, and the best memes on the internet.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F4F4F5] text-gray-900 selection:bg-purple-300 pb-20">
      
      {/* Navbar Minimal */}
      <header className="bg-white/80 backdrop-blur-xl border-b-2 border-black sticky top-0 z-40 transition-all">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-gray-900 font-bold flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-xl transition-colors border-2 border-transparent hover:border-black text-sm">
            <span className="text-lg leading-none">←</span> Back Home
          </Link>
          <Link href="/" className="text-2xl font-black tracking-tight text-gray-900 hover:text-purple-600 transition-colors">
            ViralTrending<span className="text-purple-600">Meme</span>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 mt-16 animate-in fade-in slide-in-from-bottom-5 duration-500">
        
        <h1 className="text-5xl md:text-6xl font-black mb-8 tracking-tight text-center">
          About <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-black">ViralTrendingMeme</span>
        </h1>
        
        <div className="bg-white p-8 md:p-12 rounded-4xl shadow-sm border-2 border-black space-y-8">
          
          <section>
            <h2 className="text-2xl font-extrabold mb-4 border-b-2 border-black pb-2 inline-block">Our Mission 🚀</h2>
            <p className="text-lg text-gray-600 font-medium leading-relaxed">
              Welcome to ViralTrendingMeme! We believe the internet should be a fun place. Our mission is simple: to curate and deliver the internet's best collection of funny videos, dank photos, relatable moments, and viral trends—updated every single day.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold mb-4 border-b-2 border-black pb-2 inline-block">Why We Built This 💡</h2>
            <p className="text-lg text-gray-600 font-medium leading-relaxed">
              We were tired of scrolling through endless feeds just to find that one perfect meme to send to a friend. So, we built ViralTrendingMeme. A lightning-fast, ad-lite platform where you can search, discover, and download memes in seconds.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="bg-purple-50 p-6 rounded-2xl border-2 border-black">
              <h3 className="font-black text-xl mb-2 text-purple-900">Community First</h3>
              <p className="text-purple-700 font-medium text-sm">Everything here is driven by what makes people laugh. Have a funny meme? Submit it and share the joy.</p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-2xl border-2 border-black">
              <h3 className="font-black text-xl mb-2 text-yellow-900">Always Free</h3>
              <p className="text-yellow-700 font-medium text-sm">Downloading and sharing memes from our platform will always be 100% free. No hidden paywalls.</p>
            </div>
          </div>

        </div>

        <div className="mt-12 text-center">
          <Link href="/contact" className="inline-block bg-black text-white px-8 py-4 rounded-xl font-black text-lg hover:bg-purple-600 hover:scale-105 transition-all shadow-md border-2 border-black">
            Get In Touch
          </Link>
        </div>

      </main>
    </div>
  );
}