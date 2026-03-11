"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import VideoPlayer from "./VideoPlayer";

export default function MemeAdminCard({ meme = {} }: { meme?: any }) {
  const safeMeme = {
    _id: meme?._id || "",
    title: meme?.title || "",
    mediaUrl: meme?.mediaUrl || "",
    mediaType: meme?.mediaType || "image",
    isApproved: meme?.isApproved || false,
    category: meme?.category || "",
    tags: meme?.tags || "",
    description: meme?.description || "",
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  // 👇 Naya state Delete Success Confirmation ke liye
  const [isDeleted, setIsDeleted] = useState(false);

  const [editData, setEditData] = useState({
    title: safeMeme.title,
    category: safeMeme.category,
    tags: safeMeme.tags,
    description: safeMeme.description,
  });

  const router = useRouter();

  const handleApproveWithEdits = async () => {
    setIsApproving(true);
    try {
      const res = await fetch(`/api/admin/approve-meme`, {
        method: "PATCH",
        body: JSON.stringify({ id: safeMeme._id, ...editData }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setShowReviewModal(false);
        router.refresh();
      } else {
        alert("Failed to approve the meme.");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setIsApproving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/delete-meme`, {
        method: "DELETE",
        body: JSON.stringify({ id: safeMeme._id }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        // 👇 Delete hone ke baad Green Success Animation
        setIsDeleted(true);
        setTimeout(() => {
          setShowDeleteModal(false);
          setIsDeleted(false); // Reset state
          router.refresh();
        }, 1500); // 1.5 seconds ke liye message dikhega
      } else {
        const data = await res.json();
        alert(`Failed to delete: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      alert("Network error while deleting.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* 👇 YAHAN CHANGE KIYA: border-2 border-black add kiya aur bg colors clean kiye */}
      <div
        className={`rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border-2 border-black relative flex flex-col h-full ${safeMeme.isApproved ? "bg-white" : "bg-yellow-50"}`}
      >
        {!safeMeme.isApproved && (
          <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-md z-20 shadow-sm border border-black">
            Pending
          </div>
        )}

        {/* Video/Image Container */}
        <div className="h-48 w-full bg-black relative overflow-hidden shrink-0 border-b-2 border-black">
          {safeMeme.mediaType === "video" ? (
            <VideoPlayer src={safeMeme.mediaUrl} />
          ) : (
            <img
              src={safeMeme.mediaUrl}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="p-4 flex flex-col gap-3 flex-1 bg-white">
          <p
            className="font-bold text-gray-800 truncate"
            title={safeMeme.title}
          >
            {safeMeme.title || "Untitled"}
          </p>

          {!safeMeme.isApproved ? (
            <div className="flex gap-2 mt-auto">
              <button
                type="button"
                onClick={() => setShowReviewModal(true)}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-extrabold py-2.5 rounded-xl transition flex justify-center items-center gap-1.5 shadow-sm border border-black text-sm"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  ></path>
                </svg>
                Review
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="flex-1 bg-[#FFF5F5] hover:bg-red-50 text-red-600 font-extrabold py-2.5 rounded-xl transition flex justify-center items-center gap-1.5 shadow-sm border border-black text-sm"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
                Delete
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="w-full bg-[#FFF5F5] hover:bg-red-50 text-red-600 font-extrabold py-2.5 rounded-xl transition mt-auto flex justify-center items-center gap-2 shadow-sm border border-black"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
              Delete Meme
            </button>
          )}
        </div>
      </div>

      {/* ======================= REVIEW MODAL ======================= */}
      {showReviewModal && (
        <div className="fixed inset-0 z-99999 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden max-h-[90vh] transform scale-100 animate-in zoom-in-95 duration-200 border-2 border-black">
            <div className="w-full md:w-1/2 bg-black flex items-center justify-center relative h-48 md:h-auto border-r-2 border-black">
              {safeMeme.mediaType === "video" ? (
                <VideoPlayer src={safeMeme.mediaUrl} />
              ) : (
                <img
                  src={safeMeme.mediaUrl}
                  className="h-full w-full object-contain"
                />
              )}
            </div>
            <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col bg-[#F8F9FA]">
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-4 md:mb-6 border-b-2 border-purple-600 pb-2 inline-block w-max">
                Review Meme
              </h2>
              <div className="space-y-4 flex-1">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border-2 border-black rounded-xl bg-white focus:ring-purple-600 outline-none"
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Category"
                    className="w-full p-3 border-2 border-black rounded-xl bg-white focus:ring-purple-600 outline-none"
                    value={editData.category}
                    onChange={(e) =>
                      setEditData({ ...editData, category: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                    Tags
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border-2 border-black rounded-xl bg-white focus:ring-purple-600 outline-none"
                    value={editData.tags}
                    onChange={(e) =>
                      setEditData({ ...editData, tags: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    className="w-full p-3 border-2 border-black rounded-xl bg-white focus:ring-purple-600 outline-none resize-none"
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6 pt-4 border-t border-black">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="w-1/3 py-3 rounded-xl bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition border-2 border-black"
                  disabled={isApproving}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApproveWithEdits}
                  disabled={isApproving}
                  className="w-2/3 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-extrabold shadow-md transition flex justify-center items-center border-2 border-black"
                >
                  {isApproving ? "Saving..." : "✅ Save & Publish"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================= DELETE MODAL & SUCCESS ======================= */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-99999 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          {isDeleted ? (
            // 👇 THE NEW SUCCESS CONFIRMATION UI
            <div className="bg-white p-8 rounded-4xl shadow-2xl w-full max-w-85 text-center transform scale-100 animate-in zoom-in-95 duration-200 border-2 border-black">
              <div className="bg-[#E6F4EA] text-[#137333] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner border border-[#137333]">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h2 className="text-[22px] font-extrabold mb-2 text-gray-900 tracking-tight">
                Deleted!
              </h2>
              <p className="text-[15px] text-gray-500 font-medium leading-relaxed">
                Meme removed successfully.
              </p>
            </div>
          ) : (
            // NORMAL DELETE CONFIRMATION
            <div className="bg-white p-8 rounded-4xl shadow-2xl w-full max-w-85 text-center transform scale-100 animate-in slide-in-from-top-10 duration-300 border-2 border-black">
              <div className="bg-[#FFEAEA] text-[#E10000] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 border border-[#E10000]">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </div>

              <h2 className="text-[22px] font-extrabold mb-2 text-gray-900 tracking-tight">
                Delete Meme?
              </h2>
              <p className="mb-8 text-[15px] text-gray-500 font-medium leading-relaxed">
                Do you want to permanently delete{" "}
                <br className="hidden sm:block" />{" "}
                <strong className="text-gray-900">
                  {safeMeme.title || "this meme"}
                </strong>
                ? This action cannot be undone.
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-3 bg-[#F4F4F5] text-gray-800 font-bold rounded-xl hover:bg-gray-200 transition text-[15px] border-2 border-black"
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex-1 py-3 bg-[#E10000] text-white font-bold rounded-xl hover:bg-red-700 transition text-[15px] shadow-sm flex justify-center items-center gap-2 border-2 border-black"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          className="opacity-25"
                        ></circle>
                        <path
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          className="opacity-75"
                        ></path>
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
