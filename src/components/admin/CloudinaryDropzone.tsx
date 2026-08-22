"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, CheckCircle2, AlertCircle, Loader2, X, RefreshCw } from "lucide-react";

interface CloudinaryDropzoneProps {
  value: string;
  publicId?: string;
  onChange: (url: string, publicId?: string) => void;
  folder?: string;
  label?: string;
  aspect?: string;
  helpText?: string;
}

export default function CloudinaryDropzone({
  value,
  publicId,
  onChange,
  folder = "xentoryx/general",
  label,
  aspect = "aspect-video",
  helpText,
}: CloudinaryDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    setUploading(true);
    setError(null);
    setSuccess(false);
    setProgress(20);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      setProgress(50);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      setProgress(85);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Upload failed");
      }

      onChange(data.secure_url, data.public_id);
      setProgress(100);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3500);
    } catch (err: any) {
      setError(err.message || "Failed to upload image to Cloudinary");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      uploadFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (publicId) {
      try {
        await fetch("/api/admin/upload", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ public_id: publicId }),
        });
      } catch (err) {
        console.error("Failed to delete from Cloudinary:", err);
      }
    }
    onChange("", "");
  };

  return (
    <div className="space-y-2 w-full">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#BBCCD7] block">
            {label}
          </label>
          {helpText && (
            <span className="text-[11px] font-mono text-[#D7E2EA]/50">{helpText}</span>
          )}
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* If an image is already present: Show Preview + Replace Button */}
      {value ? (
        <div className={`relative w-full ${aspect} rounded-[24px] overflow-hidden border-2 border-[#D7E2EA]/20 bg-[#151515] group shadow-lg`}>
          <Image
            src={value}
            alt="Uploaded Preview"
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-102"
          />

          {/* Hover Overlay with Replace and Delete Buttons */}
          <div className="absolute inset-0 bg-[#0C0C0C]/80 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 rounded-full border border-[#D7E2EA] text-[#D7E2EA] hover:bg-[#D7E2EA] hover:text-[#0C0C0C] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Replace</span>
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="p-2.5 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 hover:bg-rose-900 transition-colors cursor-pointer"
              title="Remove Asset"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-full bg-[#0C0C0C]/80 border border-[#D7E2EA]/20 text-[10px] font-mono text-[#BBCCD7] truncate max-w-[80%]">
            {folder}
          </div>
        </div>
      ) : (
        /* Drag-and-Drop Upload Zone */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`relative w-full ${aspect} rounded-[24px] border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-6 text-center cursor-pointer ${
            isDragging
              ? "border-[#B600A8] bg-[#B600A8]/10 shadow-[0_0_30px_rgba(182,0,168,0.2)]"
              : "border-[#D7E2EA]/30 hover:border-[#BBCCD7] bg-[#151515]/60 hover:bg-[#151515]"
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 text-[#BBCCD7] animate-spin" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#D7E2EA]">
                Uploading to Cloudinary... ({progress}%)
              </span>
              <div className="w-48 h-1.5 bg-[#0C0C0C] rounded-full overflow-hidden border border-[#D7E2EA]/20">
                <div
                  style={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-[#B600A8] to-[#D9A648] transition-all duration-300"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-[#D7E2EA]/10 border border-[#D7E2EA]/20 flex items-center justify-center text-[#BBCCD7] mb-1">
                <UploadCloud className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D7E2EA]">
                Drop image here or click to upload
              </span>
              <span className="text-[11px] font-sans text-[#D7E2EA]/50 max-w-xs">
                Auto-optimized with Cloudinary webp/avif delivery ({folder})
              </span>
            </div>
          )}
        </div>
      )}

      {/* Notifications */}
      {success && (
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Image uploaded and linked via Cloudinary!</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-rose-400">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
