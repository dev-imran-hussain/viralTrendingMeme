import { connectDB } from "@/lib/db";
import Message from "@/models/message";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth"; 

export default async function AdminMessagesPage() {
  await requireAdmin();
  await connectDB();

  // 👇 YAHAN HAI MAGIC FIX! 👇
  // Jaise hi tu ye page kholega, saare 'Unread' messages database mein 'Read' ho jayenge!
  await Message.updateMany({ isRead: false }, { isRead: true });

  // Naye messages pehle dikhane ke liye sort createdAt -1
  const messages = await Message.find({}).sort({ createdAt: -1 }).lean() as any[];

  // Topic ke hisaab se color tag
  const getTopicStyle = (topic: string) => {
    switch(topic) {
      case 'bug': return "bg-red-100 text-red-700 border-red-300";
      case 'feedback': return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case 'content': return "bg-orange-100 text-orange-800 border-orange-300";
      default: return "bg-blue-100 text-blue-700 border-blue-300";
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F5] text-gray-900 pb-20">
      
      {/* HEADER */}
      <div className="bg-gray-900 px-8 py-8 text-center border-b-4 border-purple-500 relative shadow-md">
        <Link href="/admin/dashboard" className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-400 hover:text-white transition-colors bg-gray-800 px-4 py-2 rounded-xl font-bold border-2 border-transparent hover:border-gray-500 text-sm">
          <span className="text-lg">←</span> Dashboard
        </Link>
        <h2 className="text-3xl font-black text-white tracking-widest uppercase flex items-center justify-center gap-3">
          User Inbox 📬
        </h2>
        <p className="text-gray-400 font-medium text-sm mt-2">Manage feedback, bug reports, and user messages ({messages.length} total)</p>
      </div>

      <main className="max-w-5xl mx-auto px-6 mt-10">
        
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] mt-6">
            <div className="text-6xl mb-4">📭</div>
            <h4 className="text-2xl font-black text-gray-900 mb-2">Inbox is Empty</h4>
            <p className="text-gray-500 font-medium">No one has messaged you yet. Go make some memes viral!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {messages.map((msg) => (
              <div key={msg._id.toString()} className="bg-white p-6 rounded-4xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex flex-col">
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-black text-xl text-gray-900">{msg.name}</h3>
                    <a href={`mailto:${msg.email}`} className="text-sm font-bold text-purple-600 hover:underline">{msg.email}</a>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider border-2 ${getTopicStyle(msg.topic)}`}>
                    {msg.topic}
                  </span>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex-1 mb-4">
                  <p className="text-gray-700 font-medium whitespace-pre-wrap">{msg.content}</p>
                </div>

                <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
                  <span className="text-xs font-bold text-gray-400">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                  
                  {/* Reply via email direct button */}
                  <a href={`mailto:${msg.email}?subject=Re: Your message to ViralTrendingMeme`} className="px-5 py-2 bg-black text-white font-bold rounded-xl text-sm border-2 border-black hover:bg-white hover:text-black transition-colors">
                    Reply ✉️
                  </a>
                </div>

              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}