// Homepage loading skeleton — shown during route transitions via Next.js streaming
export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F4F4F5] text-gray-900 pb-10 overflow-x-hidden">
      {/* Navbar Skeleton */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="hidden md:flex gap-8">
            <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-5 w-14 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </header>

      <div className="h-28"></div>

      {/* Hero Skeleton */}
      <section className="max-w-4xl mx-auto px-6 py-10 text-center flex flex-col items-center">
        <div className="h-16 w-3/4 bg-gray-200 rounded-2xl animate-pulse mb-4"></div>
        <div className="h-10 w-1/2 bg-gray-200 rounded-2xl animate-pulse mb-6"></div>
        <div className="h-5 w-2/3 bg-gray-200 rounded-lg animate-pulse mb-10"></div>
        <div className="h-16 w-full max-w-2xl bg-gray-200 rounded-2xl animate-pulse mb-10"></div>
        <div className="flex gap-2">
          <div className="h-12 w-24 bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="h-12 w-24 bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="h-12 w-24 bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
      </section>

      {/* Grid Skeleton */}
      <main className="max-w-7xl mx-auto px-6 mt-12">
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
      </main>
    </div>
  );
}
