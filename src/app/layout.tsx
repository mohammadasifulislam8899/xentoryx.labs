import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "./ClientLayoutWrapper";

const kanit = Kanit({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-kanit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.xentoryxlabs.site"),
  title: "Asif -- Founder & IoT Engineer | Xentoryx Labs",
  description:
    "Founder building scalable software, intelligent IoT hardware, and modern web experiences at Xentoryx Labs.",
  keywords: [
    "Asif",
    "Founder",
    "IoT Engineer",
    "Mohammad Asiful Islam",
    "Xentoryx Labs",
    "ESP32",
    "Android Developer",
    "Kotlin",
    "Jetpack Compose",
    "Next.js"
  ],
  authors: [{ name: "Asif", url: "https://www.xentoryxlabs.site" }],
  icons: {
    icon: [
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  alternates: {
    canonical: "https://www.xentoryxlabs.site",
  },
  openGraph: {
    title: "Asif -- Founder & IoT Engineer | Xentoryx Labs",
    description:
      "Founder building scalable software, intelligent IoT hardware, and modern web experiences at Xentoryx Labs.",
    url: "https://www.xentoryxlabs.site",
    siteName: "Xentoryx Labs",
    images: [
      {
        url: "/assets/founder-asif.jpg",
        width: 1200,
        height: 630,
        alt: "Asif -- Founder & IoT Engineer | Xentoryx Labs",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asif -- Founder & IoT Engineer | Xentoryx Labs",
    description:
      "Founder building scalable software, intelligent IoT hardware, and modern web experiences at Xentoryx Labs.",
    images: ["/assets/founder-asif.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${kanit.variable} font-sans antialiased bg-[#0C0C0C] text-[#D7E2EA] selection:bg-[#BBCCD7] selection:text-[#0C0C0C] overflow-x-hidden`}
      >
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
