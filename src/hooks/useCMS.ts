"use client";

import { useState, useEffect } from "react";
import { CMSData, SiteSettings } from "@/lib/cms/store";

export function useCMS() {
  const [data, setData] = useState<CMSData | null>(null);

  useEffect(() => {
    fetch("/api/admin/data")
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch((err) => console.error("CMS load error:", err));
  }, []);

  return {
    data,
    settings: data?.settings,
    email: data?.settings.email || "asif@xentoryx.com",
    founderName: data?.settings.founderName || "Asif",
    companyName: data?.settings.companyName || "Xentoryx Labs",
    tagline: data?.settings.tagline || "Building Scalable Software, IoT Systems and Intelligent Technologies",
  };
}
