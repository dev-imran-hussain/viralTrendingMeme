"use client";

import { useState } from "react";

export default function DownloadButton({
  url,
  title,
  fileSize,
}: {
  url: string;
  title: string;
  fileSize?: number;
}) {
  const [status, setStatus] = useState<"idle" | "downloading" | "done">("idle");

  const handleDownload = () => {
    setStatus("downloading");

    const downloadUrl = url.replace("/upload/", "/upload/fl_attachment/");

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = title;
    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => {
      setStatus("done");
    }, 1000);
  };

  return (
    <div className="mt-6">

      {fileSize && (
        <p className="text-sm text-gray-500 mb-2">
          Size: {(fileSize / 1024 / 1024).toFixed(2)} MB
        </p>
      )}

      <button
        onClick={handleDownload}
        disabled={status === "downloading"}
        className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition disabled:opacity-50"
      >
        {status === "idle" && "Download Meme"}
        {status === "downloading" && "Starting Download..."}
        {status === "done" && "Downloaded ✅"}
      </button>

    </div>
  );
}