import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "./ClientLayoutWrapper";
import { ThemeProvider } from "@/context/ThemeContext";

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
    <html lang="en" suppressHydrationWarning className="dark scroll-smooth">
      <head>
        {/* Blocking script to prevent flash-of-wrong-theme on page load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('xentoryx-theme');
                  var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
                  var theme = saved === 'light' || saved === 'dark' ? saved : (prefersLight ? 'light' : 'dark');
                  document.documentElement.setAttribute('data-theme', theme);
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  } else {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${kanit.variable} font-sans antialiased bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--text-heading-gradient-end)] selection:text-[var(--bg-primary)] overflow-x-hidden`}
      >
        <ThemeProvider>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
