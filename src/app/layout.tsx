import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/footer/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://tait.tz"),

  title: {
    default: "TAIT - Tanzania Adventist Institute of Technology",
    template: "%s | TAIT",
  },

  description:
    "Technology at the Heart of the Mission — empowering digital transformation for the Church through systems, media, research, and innovation.",

  keywords: [
    "TAIT",
    "Tanzania Adventist Institute of Technology",
    "Adventist Technology",
    "Church Systems",
    "Digital Mission",
    "Media Evangelism",
    "Research and Innovation",
  ],

  authors: [{ name: "TAIT" }],

  icons: {
    icon: [
      { url: "/TAIT.svg", type: "image/svg+xml" },
      { url: "/TAIT.jpg", type: "image/jpeg" },
    ],
    shortcut: "/TAIT.jpg",
    apple: "/TAIT.jpg",
  },

  openGraph: {
    title: "TAIT",
    description:
      "Technology at the Heart of the Mission — digital transformation for the Church.",
    url: "https://tait.tz",
    siteName: "TAIT",
    type: "website",
    images: [
      {
        url: "/TAIT.jpg",
        width: 1200,
        height: 630,
        alt: "TAIT Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "TAIT",
    description:
      "Technology at the Heart of the Mission — digital transformation for the Church.",
    images: ["/TAIT.jpg"],
  },
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

        {/* Tailwind CDN (must stay before config) */}
        <script src="https://cdn.tailwindcss.com"></script>

        {/* Tailwind Config */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      primary: '#7f264a'
                    },
                    fontFamily: {
                      sans: ['Noto Sans', 'sans-serif']
                    }
                  }
                }
              }
            `,
          }}
        />
      </head>

      <body className="font-sans bg-white text-gray-800 antialiased">
        {/* NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main className="min-h-screen">{children}</main>

        {/* FOOTER */}
        <Footer />
      </body>
    </html>
  );
}