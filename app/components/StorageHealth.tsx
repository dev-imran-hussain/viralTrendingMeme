import cloudinary from "@/lib/cloudinary";

// 🧮 Bytes ko MB ya GB mein convert karne ka smart function
function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export default async function StorageHealth() {
  let usageData: any = null;
  let error = null;

  try {
    // ⚡ Cloudinary API se usage data fetch kar rahe hain
    usageData = await cloudinary.api.usage();
  } catch (err) {
    console.error("Cloudinary API Error:", err);
    error = "Could not fetch storage data.";
  }

  // Agar error aaye toh basic UI dikhao taaki dashboard crash na ho
  if (error || !usageData) {
    return (
      <div className="bg-red-50 border border-red-200 p-6 rounded-2xl shadow-sm w-full">
        <h3 className="text-red-600 font-bold flex items-center gap-2">
          <span>⚠️</span> Cloud Storage Health Error
        </h3>
        <p className="text-sm text-red-500 mt-1">{error}</p>
      </div>
    );
  }

  // Cloudinary Data Extraction
  const storageUsed = usageData.storage.usage;
  const storageLimit = usageData.storage.limit;
  const storagePercent = usageData.storage.used_percent;

  const bandwidthUsed = usageData.bandwidth.usage;
  const bandwidthLimit = usageData.bandwidth.limit;
  const bandwidthPercent = usageData.bandwidth.used_percent;

  const totalFiles = usageData.objects.usage; // Total images/videos uploaded

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 w-full mb-8">
      <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
        <h3 className="text-xl font-black text-gray-800 flex items-center gap-2">
          <span>☁️</span> Cloud Storage Health
        </h3>
        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
          {usageData.plan} Plan
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. Storage Bar */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
          <div className="flex justify-between text-sm font-bold text-gray-600 mb-2">
            <span>💾 Storage Space</span>
            <span className={storagePercent > 80 ? "text-red-500" : "text-gray-900"}>
              {storagePercent.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 overflow-hidden">
            <div 
              className={`h-2.5 rounded-full ${storagePercent > 80 ? 'bg-red-500' : 'bg-green-500'}`} 
              style={{ width: `${Math.min(storagePercent, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs font-medium text-gray-500 text-right">
            {formatBytes(storageUsed)} / {formatBytes(storageLimit)}
          </p>
        </div>

        {/* 2. Bandwidth Bar */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
          <div className="flex justify-between text-sm font-bold text-gray-600 mb-2">
            <span>🌐 Bandwidth (Monthly)</span>
            <span className={bandwidthPercent > 80 ? "text-red-500" : "text-gray-900"}>
              {bandwidthPercent.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 overflow-hidden">
            <div 
              className={`h-2.5 rounded-full ${bandwidthPercent > 80 ? 'bg-red-500' : 'bg-blue-500'}`} 
              style={{ width: `${Math.min(bandwidthPercent, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs font-medium text-gray-500 text-right">
            {formatBytes(bandwidthUsed)} / {formatBytes(bandwidthLimit)}
          </p>
        </div>

        {/* 3. Total Files Stat */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col justify-center items-center text-center">
          <span className="text-3xl mb-1">📁</span>
          <span className="text-2xl font-black text-gray-900">{totalFiles}</span>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Total Media Files</span>
        </div>

      </div>
    </div>
  );
}