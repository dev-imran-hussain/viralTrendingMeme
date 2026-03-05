import Meme from "@/models/meme";
import { connectDB } from "@/lib/db";
import MemeAdminCard from "@/app/components/MemeAdminCard";
import Link from "next/link";
import { revalidatePath } from "next/cache"; 
import { requireAdmin } from "@/lib/auth"; // 👇 Naya Auth

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };
}

export default async function ApprovePage(props: Props) {
  // 👇 Purana 15 line ka JWT logic hat gaya, sirf 1 line!
  await requireAdmin();

  // Search keyword nikalna URL se (?q=keyword)
  const resolvedSearchParams = await props.searchParams;
  const q = typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q : "";

  await connectDB();

  // 1. SMART DATABASE QUERY (Search by Title, Tags, or Category)
  const query: any = { isApproved: { $ne: true } };
  
  if (q) {
    query.$or = [
      { title: { $regex: q, $options: "i" } },
      { tags: { $regex: q, $options: "i" } },
      { category: { $regex: q, $options: "i" } }
    ];
  }

  const pendingMemes = await Meme.find(query).sort({ createdAt: -1 }).lean();

  // 2. SMART BULK APPROVE
  async function handleApproveAll() {
    "use server"; 
    await connectDB();
    await Meme.updateMany(query, { isApproved: true }); 
    
    revalidatePath("/admin/approve");
    revalidatePath("/admin/dashboard");
    revalidatePath("/");
  }

  return (
    <div className="min-h-screen bg-[#F4F4F5] text-gray-900 pb-20">
      <div className="bg-gray-900 px-8 py-8 text-center border-b-4 border-yellow-500 relative shadow-md">
        <Link href="/admin/dashboard" className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-400 hover:text-white transition-colors bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full font-semibold text-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          <span className="hidden sm:inline">Dashboard</span>
        </Link>
        <h2 className="text-3xl font-extrabold text-white tracking-widest uppercase flex items-center justify-center gap-3">
          Review Queue
        </h2>
        <p className="text-gray-400 text-sm mt-2">Review, edit, and approve public submissions</p>
      </div>

      <main className="max-w-7xl mx-auto px-6 mt-10">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <form method="GET" className="flex w-full md:w-2/3 gap-2">
            <input 
              type="text" 
              name="q" 
              defaultValue={q} 
              placeholder="Search by title, tags, or category..." 
              className="flex-1 px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none transition-all text-gray-800"
            />
            <button type="submit" className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-yellow-500 hover:text-black transition-colors shadow-sm">
              Search
            </button>
            {q && (
              <Link href="/admin/approve" className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center justify-center">
                Clear
              </Link>
            )}
          </form>

          {pendingMemes.length > 0 && (
            <form action={handleApproveAll} className="w-full md:w-auto">
              <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-extrabold py-3 px-6 rounded-xl transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                Approve {q ? `Found (${pendingMemes.length})` : `All (${pendingMemes.length})`}
              </button>
            </form>
          )}
        </div>

        <div className="flex justify-between items-end mb-6 border-b border-gray-300 pb-2">
          <h3 className="text-xl font-extrabold text-gray-800">
            {q ? `Search Results for "${q}"` : "Pending Memes"}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pendingMemes.map((meme: any) => (
            <MemeAdminCard
              key={meme._id.toString()}
              meme={{
                _id: meme._id.toString(),
                title: meme.title || "",
                mediaUrl: meme.mediaUrl || "",
                mediaType: meme.mediaType || "image",
                isApproved: meme.isApproved || false,
                category: meme.category || "",
                tags: meme.tags || "",
                description: meme.description || ""
              }}
            />
          ))}
        </div>

        {pendingMemes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 shadow-sm mt-6">
            <h4 className="text-xl font-bold text-gray-800 mb-2">{q ? "No matches found!" : "All Caught Up!"}</h4>
            <p className="text-gray-500 font-medium">{q ? "Try searching with a different keyword." : "There are no pending memes to review right now."}</p>
          </div>
        )}
      </main>
    </div>
  );
}