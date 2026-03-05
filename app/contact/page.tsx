"use client";
import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 1. Form ka data nikalna
    const formData = {
      name: e.target[0].value,
      email: e.target[1].value,
      topic: e.target[2].value,
      message: e.target[3].value,
    };

    try {
      // 2. Apni nayi API ko data bhejna
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setSubmitted(true);
        e.target.reset(); // Form clear karna
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Network error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F5] text-gray-900 selection:bg-purple-300 pb-20">
      
      {/* Navbar Minimal */}
      <header className="bg-white/80 backdrop-blur-xl border-b-2 border-black sticky top-0 z-40 transition-all">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-gray-900 font-bold flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-xl transition-colors border-2 border-transparent hover:border-black text-sm">
            <span className="text-lg leading-none">←</span> Back Home
          </Link>
          <Link href="/" className="text-2xl font-black tracking-tight text-gray-900">
            ViralTrending<span className="text-purple-600">Meme</span>
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 mt-16 animate-in fade-in zoom-in-95 duration-500">
        
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black mb-4 tracking-tight">
            Holla At Us! 🤙
          </h1>
          <p className="text-gray-500 font-medium text-lg">
            Got feedback, found a bug, or just want to say hi? Drop us a message below.
          </p>
        </div>
        
        {submitted ? (
          <div className="bg-white p-10 rounded-4xl shadow-sm border-2 border-black text-center animate-in scale-in-95 duration-300">
            <div className="bg-[#E6F4EA] text-[#137333] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-3xl font-black mb-3">Message Sent!</h2>
            <p className="text-gray-600 font-medium mb-8 text-lg">Thanks for reaching out. Our meme monkeys will get back to you soon.</p>
            <button onClick={() => setSubmitted(false)} className="px-8 py-3 bg-gray-100 text-black font-bold border-2 border-black rounded-xl hover:bg-gray-200 transition">
              Send Another
            </button>
          </div>
        ) : (
          <div className="bg-white p-8 md:p-10 rounded-4xl shadow-sm border-2 border-black">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black text-gray-900 uppercase tracking-wide mb-2">Your Name</label>
                  <input required type="text" placeholder="John Doe" className="w-full p-4 border-2 border-black rounded-xl bg-[#F8F9FA] focus:bg-white focus:ring-4 focus:ring-purple-500/20 outline-none transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-black text-gray-900 uppercase tracking-wide mb-2">Email Address</label>
                  <input required type="email" placeholder="john@example.com" className="w-full p-4 border-2 border-black rounded-xl bg-[#F8F9FA] focus:bg-white focus:ring-4 focus:ring-purple-500/20 outline-none transition-all font-medium" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-black text-gray-900 uppercase tracking-wide mb-2">What is this regarding?</label>
                <select className="w-full p-4 border-2 border-black rounded-xl bg-[#F8F9FA] focus:bg-white focus:ring-4 focus:ring-purple-500/20 outline-none transition-all font-medium appearance-none cursor-pointer">
                  <option value="feedback">💡 General Feedback</option>
                  <option value="bug">🐛 Report a Bug</option>
                  <option value="content">🗑️ Content Removal Request</option>
                  <option value="other">💬 Just saying Hi</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-black text-gray-900 uppercase tracking-wide mb-2">Your Message</label>
                <textarea required rows={5} placeholder="Type your message here..." className="w-full p-4 border-2 border-black rounded-xl bg-[#F8F9FA] focus:bg-white focus:ring-4 focus:ring-purple-500/20 outline-none transition-all font-medium resize-none" />
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-black text-white font-black text-lg rounded-xl hover:bg-purple-600 transition-all border-2 border-black flex justify-center items-center gap-2 disabled:opacity-70 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                {isSubmitting ? "Sending..." : "Send Message 🚀"}
              </button>

            </form>
          </div>
        )}

      </main>
    </div>
  );
}