import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "./ClientLayoutWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://xentoryx.com"),
  title: "Xentoryx Labs | Founder Asif — Scalable Software & IoT Systems",
  description:
    "Official website of Xentoryx Labs and Founder Asif. Building high-performance Android applications, embedded IoT systems, scalable backend architectures, and intelligent web experiences.",
  keywords: [
    "Xentoryx Labs",
    "Asif Founder",
    "Android Developer",
    "IoT Engineer",
    "ESP32 C++",
    "Jetpack Compose",
    "Next.js 15",
    "Dipannita IoT",
    "Expensey",
  ],
  authors: [{ name: "Asif", url: "https://xentoryx.com" }],
  openGraph: {
    title: "Xentoryx Labs | Founder Asif",
    description:
      "Building Scalable Software, IoT Systems, and Intelligent Technologies.",
    url: "https://xentoryx.com",
    siteName: "Xentoryx Labs",
    images: [
      {
        url: "/assets/founder-asif.jpg",
        width: 1200,
        height: 630,
        alt: "Asif — Founder of Xentoryx Labs",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xentoryx Labs | Founder Asif",
    description:
      "Building Scalable Software, IoT Systems, and Intelligent Technologies.",
    images: ["/assets/founder-asif.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <body className="bg-[#0F1115] text-[#F5F5F5] antialiased selection:bg-brand-red selection:text-white">
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
