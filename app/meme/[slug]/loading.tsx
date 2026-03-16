// Meme detail page loading skeleton — shown during route transitions
export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F4F4F5] pb-20">
      {/* Navbar Skeleton */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="h-9 w-20 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-7 w-44 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 mt-10">
        {/* Category Badge */}
        <div className="flex justify-center mb-6">
          <div className="h-8 w-28 bg-gray-200 rounded-full animate-pulse"></div>
        </div>

        {/* Title Skeleton */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-10 w-3/4 bg-gray-200 rounded-xl animate-pulse mb-3"></div>
          <div className="h-10 w-1/2 bg-gray-200 rounded-xl animate-pulse"></div>
        </div>

        {/* Media Skeleton */}
        <div className="bg-white p-2 rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden mx-auto max-w-2xl">
          <div className="rounded-4xl overflow-hidden bg-gray-200 h-96 animate-pulse"></div>
        </div>

        {/* Details Skeleton */}
        <div className="mt-8 max-w-2xl mx-auto bg-white p-8 rounded-4xl shadow-sm border border-gray-100">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="space-y-2">
            <div className="h-5 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-5 w-2/3 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mt-8 mb-4"></div>
          <div className="flex gap-2">
            <div className="h-9 w-20 bg-gray-200 rounded-xl animate-pulse"></div>
            <div className="h-9 w-24 bg-gray-200 rounded-xl animate-pulse"></div>
            <div className="h-9 w-16 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
        </div>

        {/* Download Button Skeleton */}
        <div className="mt-8 max-w-sm mx-auto">
          <div className="h-16 w-full bg-gray-200 rounded-2xl animate-pulse"></div>
        </div>
      </main>
    </div>
  );
}
