import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar/Navbar";
import ContactFloat from "@/components/layout/footer/ContactFloat";
import Footer from "@/components/layout/footer/Footer";
import ConvexClientProvider from "./ConvexClientProvider";
import SiteAnnouncement from "@/components/cms/SiteAnnouncement";
import CmsPageController from "@/components/cms/CmsPageController";

export const metadata: Metadata = {
  metadataBase: new URL("https://tait.tz"),
  title: {
    default: "TAIT — Tanzania Adventist Institute of Technology",
    template: "%s | TAIT",
  },

  description:
    "TAIT empowers the Church through technology, media, and research — practical solutions for mission and education.",

  keywords: ["TAIT", "technology", "digital mission", "media", "research"],

  authors: [{ name: "Tanzania Adventist Institute of Technology", url: "https://tait.tz" }],

  creator: "TAIT",
  publisher: "TAIT",

  icons: {
    icon: [{ url: "/images/TAIT.jpg", type: "image/jpeg" }],
    shortcut: "/images/TAIT.jpg",
    apple: "/images/TAIT.jpg",
  },

  manifest: "/manifest.json",

  openGraph: {
    title: "TAIT — Tanzania Adventist Institute of Technology",
    description:
      "Practical technology, media and research solutions for Church mission and education in Tanzania.",
    url: "https://tait.tz",
    siteName: "TAIT",
    type: "website",
    images: [
      {
        url: "/images/TAIT.jpg",
        width: 1200,
        height: 630,
        alt: "TAIT",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "TAIT — Practical tech for mission",
    description:
      "TAIT empowers the Church through technology, media and research.",
    images: ["/images/TAIT.jpg"],
    creator: "@tait",
  },

  applicationName: "TAIT",
  category: "education",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // `themeColor`, `colorScheme`, and `viewport` are intentionally omitted here
  // to avoid App Router metadata warnings. Add `generateViewport` if custom
  // viewport or theme-color behavior is required per-route.
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Fonts (CDN kept as requested) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />

        {/* Font Awesome (CDN kept) */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />

        {/* Viewport and theme-color for modern metadata */}
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#fbf8f5" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1f1f23" media="(prefers-color-scheme: dark)" />

      </head>

      <body className="font-sans bg-[#fbf8f5] text-gray-900 antialiased">
        <ConvexClientProvider>
          <Navbar />
          <div aria-hidden="true" className="h-24 lg:h-28" />
          <SiteAnnouncement />
          <ContactFloat />

          <main className="min-h-screen"><CmsPageController>{children}</CmsPageController></main>

          <Footer />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
