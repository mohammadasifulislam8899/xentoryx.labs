import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "./ClientLayoutWrapper";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

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
  metadataBase: new URL("https://www.xentoryxlabs.site"),
  title: "Xentoryx Labs | Founder Asif — Software & Hardware Engineering Studio",
  description:
    "Official website of Xentoryx Labs and Founder Asif. Building high-performance Android applications, embedded IoT systems, scalable backend architectures, and intelligent web experiences.",
  keywords: [
    "Xentoryx Labs",
    "Xentoryx",
    "XentoryxLabs",
    "xentoryxlabs.site",
    "Asif Founder",
    "Mohammad Asiful Islam",
    "Android Developer",
    "IoT Engineer",
    "ESP32 C++",
    "Jetpack Compose",
    "Next.js 15",
    "Dipannita IoT",
    "Expensey",
  ],
  authors: [{ name: "Asif", url: "https://www.xentoryxlabs.site" }],
  icons: {
    icon: [
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  alternates: {
    canonical: "https://www.xentoryxlabs.site",
  },
  openGraph: {
    title: "Xentoryx Labs | Founder Asif",
    description:
      "Building Scalable Software, IoT Systems, and Intelligent Technologies.",
    url: "https://www.xentoryxlabs.site",
    siteName: "Xentoryx Labs",
    images: [
      {
        url: "/assets/logo-dark.png",
        width: 1200,
        height: 630,
        alt: "Xentoryx Labs — Software & Hardware Studio",
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
    images: ["/assets/logo-dark.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Google Structured Data Schema (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.xentoryxlabs.site/#organization",
        name: "Xentoryx Labs",
        url: "https://www.xentoryxlabs.site",
        logo: "https://www.xentoryxlabs.site/assets/logo-dark.png",
        description: "R&D Software & Hardware Engineering Studio building native Android apps, IoT telemetry infrastructure, and modern web platforms.",
        founder: {
          "@type": "Person",
          name: "Asif",
          jobTitle: "Founder & Lead Architect",
          sameAs: [
            "https://github.com/mohammadasifulislam8899",
            "https://linkedin.com/in/mohammadasifulislam"
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.xentoryxlabs.site/#website",
        url: "https://www.xentoryxlabs.site",
        name: "Xentoryx Labs",
        description: "Building Scalable Software, IoT Systems and Intelligent Technologies"
      }
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-brand-red selection:text-white font-sans transition-colors duration-300`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
