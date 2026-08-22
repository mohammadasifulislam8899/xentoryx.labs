"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, CheckCircle2, AlertCircle, Loader2, Link2, X } from "lucide-react";

interface CloudinaryImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function CloudinaryImageUploader({
  value,
  onChange,
  label = "Upload Image via Cloudinary",
}: CloudinaryImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Cloudinary upload failed");
      }

      onChange(data.url);
      setSuccessMsg("Uploaded successfully to Cloudinary!");
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setError(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#BBCCD7] block">
          {label}
        </label>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Preview Thumbnail */}
        {value && (
          <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#D7E2EA]/20 bg-[#141414] shrink-0 group">
            <Image
              src={value}
              alt="Uploaded preview"
              fill
              unoptimized
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute inset-0 bg-[#0C0C0C]/80 opacity-0 group-hover:opacity-100 flex items-center justify-center text-red-400 transition-opacity"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Upload Button */}
        <div className="flex-1 w-full space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 rounded-xl bg-[#D7E2EA]/10 border border-[#D7E2EA]/20 text-[#D7E2EA] hover:bg-[#D7E2EA]/20 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#BBCCD7]" />
                  <span>Uploading to Cloudinary...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-3.5 h-3.5 text-[#BBCCD7]" />
                  <span>Upload Image (Cloudinary)</span>
                </>
              )}
            </button>
          </div>

          {/* Or URL input */}
          <div className="flex items-center gap-2">
            <Link2 className="w-3.5 h-3.5 text-[#BBCCD7]/60 shrink-0" />
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Or paste image URL (Cloudinary / CDN / /assets/...)"
              className="w-full bg-[#141414] border border-[#D7E2EA]/15 rounded-lg px-3 py-1.5 text-xs text-[#D7E2EA] placeholder-[#D7E2EA]/40 font-mono focus:outline-none focus:border-[#BBCCD7]"
            />
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 pt-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Error Notification */}
      {error && (
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-rose-400 pt-1">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
