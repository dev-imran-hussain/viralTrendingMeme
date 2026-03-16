import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | ViralTrendingMeme",
    description: "Read our privacy policy to understand how ViralTrendingMeme collects and uses data.",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#F4F4F5] text-gray-900 pb-20">
            <header className="bg-white/80 backdrop-blur-xl border-b-2 border-black sticky top-0 z-40">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="text-gray-900 font-bold flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-xl border-2 border-transparent hover:border-black text-sm transition-all">
                        <span className="text-lg">←</span> Back Home
                    </Link>
                    <span className="text-2xl font-black tracking-tight">ViralTrending<span className="text-purple-600">Meme</span></span>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 mt-16 animate-in fade-in slide-in-from-bottom-5 duration-500">
                <h1 className="text-5xl font-black mb-8 tracking-tight">Privacy Policy</h1>

                <div className="bg-white p-8 md:p-12 rounded-4xl shadow-sm border-2 border-black space-y-8">
                    <section>
                        <h2 className="text-2xl font-extrabold mb-4 border-b-2 border-black pb-2 inline-block">1. Introduction 🔒</h2>
                        <p className="text-gray-600 font-medium leading-relaxed">
                            At ViralTrendingMeme, accessible from your domain, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-extrabold mb-4 border-b-2 border-black pb-2 inline-block">2. Google AdSense & Cookies 🍪</h2>
                        <p className="text-gray-600 font-medium leading-relaxed">
                            Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet.
                        </p>
                    </section>

                    <div className="bg-purple-50 p-6 rounded-2xl border-2 border-black">
                        <h3 className="font-black text-xl mb-2 text-purple-900">Data Protection</h3>
                        <p className="text-purple-700 font-medium text-sm">
                            We do not sell or share your personal search data. We only use cookies to improve your user experience and for ad performance.
                        </p>
                    </div>

                    <section>
                        <h2 className="text-2xl font-extrabold mb-4 border-b-2 border-black pb-2 inline-block">3. Contact Us</h2>
                        <p className="text-gray-600 font-medium leading-relaxed">
                            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}