"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PublicUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleUpload = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target);

    try {
      const res = await fetch("/api/upload", { 
        method: "POST", 
        body: formData 
      });
      const data = await res.json();
      
      if (data.success) {
        setSuccess(true);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Something went wrong! Check your internet.");
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS SCREEN
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F4F5] p-6">
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md w-full border border-gray-100">
          
          <div className="w-20 h-20 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-green-100">
            <span className="text-4xl">✅</span>
          </div>

          <h2 className="text-2xl font-black text-gray-900 mb-2">Meme Submitted!</h2>
          <p className="text-gray-500 mb-8 font-medium text-sm">
            Thanks for sharing! Admin tumhare meme ko review karega. Approve hote hi ye live ho jayega. 🔥
          </p>

          <div className="space-y-4">
            <button 
              onClick={() => {
                setSuccess(false); 
                setFile(null);     
                setPreview(null);  
              }} 
              className="w-full py-4 bg-black text-white rounded-xl font-bold hover:bg-purple-600 transition-all shadow-lg flex justify-center items-center gap-2"
            >
              <span className="text-lg">📤</span> Upload Another Meme
            </button>

            <button 
              onClick={() => router.push("/")} 
              className="w-full py-4 bg-white text-gray-800 border-2 border-gray-200 rounded-xl font-bold hover:border-black hover:bg-gray-50 transition-all flex justify-center items-center gap-2"
            >
              🏠 Back to Home
            </button>
          </div>

        </div>
      </div>
    );
  }

  // UPLOAD FORM
  return (
    <div className="min-h-screen bg-[#F4F4F5] flex flex-col items-center justify-center p-4 py-12">
      
      <div className="max-w-xl w-full mb-4">
        <button 
          onClick={() => router.back()} 
          className="flex items-center text-sm font-bold text-gray-500 hover:text-black transition-colors"
        >
          <span className="mr-2 text-lg">←</span> Back
        </button>
      </div>

      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-black p-6 text-center border-b-4 border-purple-500">
          <h1 className="text-2xl font-black text-white tracking-wide">UPLOAD A MEME</h1>
          <p className="text-purple-300 text-sm mt-1">Make the internet laugh today! 😂</p>
        </div>

        {/* Form */}
        <form onSubmit={handleUpload} className="p-8 space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Meme Title *</label>
            <input 
              name="title" 
              required 
              placeholder="e.g., Me debugging at 3 AM..." 
              className="w-full p-4 bg-gray-50 rounded-xl border-2 border-gray-100 focus:border-purple-500 outline-none font-bold text-gray-900 placeholder-gray-400 transition-colors" 
            />
          </div>
          
          {/* 👇 Category (Ab user khud type karega) 👇 */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Category *</label>
            <input 
              name="category" 
              required 
              placeholder="e.g., Gaming, Bollywood, Anime, Dank..." 
              className="w-full p-4 bg-gray-50 rounded-xl border-2 border-gray-100 focus:border-purple-500 outline-none font-bold text-gray-900 placeholder-gray-400 transition-colors" 
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Tags (Optional)</label>
            <input 
              name="tags" 
              placeholder="e.g., coding, cat, sleep" 
              className="w-full p-4 bg-gray-50 rounded-xl border-2 border-gray-100 focus:border-purple-500 outline-none font-bold text-gray-900 placeholder-gray-400 transition-colors" 
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Description *</label>
            <textarea 
              name="description" 
              required 
              rows={4}
              placeholder="Write a killer SEO-friendly description for your meme..." 
              className="w-full p-4 bg-gray-50 rounded-xl border-2 border-gray-100 focus:border-purple-500 outline-none font-bold text-gray-900 placeholder-gray-400 transition-colors resize-none" 
            />
          </div>

          {/* File Upload Area */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Media File (Image/Video) *</label>
            <div className="relative border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:bg-purple-50 hover:border-purple-300 transition-all cursor-pointer">
              <input 
                type="file" 
                name="file" 
                required 
                accept="image/*,video/*" 
                className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if(f) { 
                    setFile(f); 
                    setPreview(URL.createObjectURL(f)); 
                  }
                }} 
              />
              
              {preview ? (
                <div className="flex flex-col items-center">
                  {file?.type.startsWith("video") ? (
                    <span className="text-5xl">🎥</span>
                  ) : (
                    <img src={preview} alt="Preview" className="max-h-48 rounded-lg object-contain shadow-sm" />
                  )}
                  <p className="text-sm mt-3 font-bold text-purple-600 truncate max-w-xs">{file?.name}</p>
                </div>
              ) : (
                <div className="py-4 pointer-events-none">
                  <div className="text-4xl mb-2">📤</div>
                  <p className="text-gray-600 font-bold text-sm">Tap or Drag & Drop File Here</p>
                  <p className="text-xs text-gray-400 mt-1">Supports JPG, PNG, GIF, MP4</p>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button 
            disabled={loading} 
            className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-purple-600 transition-all shadow-lg disabled:bg-gray-400 flex justify-center items-center gap-3"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Uploading...
              </>
            ) : "Submit Meme"}
          </button>
        </form>
      </div>
    </div>
  );
}