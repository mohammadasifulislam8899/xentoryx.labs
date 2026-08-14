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
    email: data?.settings?.email || "mohammadasifulislam8899@gmail.com",
    founderName: data?.settings?.founderName || "Asif",
    companyName: data?.settings?.companyName || "Xentoryx Labs",
    tagline: data?.settings?.tagline || "Building Scalable Software, IoT Systems and Intelligent Technologies",
    githubUrl: data?.settings?.githubUrl || "https://github.com/mohammadasifulislam8899",
    linkedinUrl: data?.settings?.linkedinUrl || "https://linkedin.com/in/mohammadasifulislam",
    twitterUrl: data?.settings?.twitterUrl || "https://x.com/xentoryxlabs",
    socialLinks: data?.settings?.socialLinks || [
      { id: "s-1", name: "GitHub", url: "https://github.com/mohammadasifulislam8899", icon: "Github", active: true },
      { id: "s-2", name: "LinkedIn", url: "https://linkedin.com/in/mohammadasifulislam", icon: "Linkedin", active: true },
      { id: "s-3", name: "Twitter / X", url: "https://x.com/xentoryxlabs", icon: "Twitter", active: true },
      { id: "s-4", name: "Email Direct", url: "mailto:mohammadasifulislam8899@gmail.com", icon: "Mail", active: true },
    ],
  };
}
