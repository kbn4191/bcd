import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ─── Site-wide constants ──────────────────────────────────────────────────────

const siteUrl = "https://www.bcdees.com";
const siteName = "BCDees";
const siteTitle = "BCDees — Smart, Simple & Safe FX Trading in Nigeria";
const siteDescription =
  "BCDees is Nigeria's safest peer-to-peer FX community. Buy and sell foreign currency with real people using escrow-secured protection, locked rates, and zero stress.";
const siteKeywords = [
  "BCDees",
  "FX trading Nigeria",
  "peer-to-peer currency exchange",
  "NGN escrow",
  "buy foreign currency Nigeria",
  "sell dollars Nigeria",
  "safe FX exchange",
  "P2P forex Nigeria",
  "currency trading app Nigeria",
  "BCDees Global",
];

// ─── Viewport ─────────────────────────────────────────────────────────────────

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563EB",
};

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  // ── Core ──────────────────────────────────────────────────────────────────
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: "BCDees Global", url: siteUrl }],
  creator: "BCDees Global",
  publisher: "BCDees Global",

  // ── Canonical ─────────────────────────────────────────────────────────────
  alternates: {
    canonical: siteUrl,
  },

  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og-image.png", // place a 1200×630 image at public/og-image.png
        width: 1200,
        height: 630,
        alt: "BCDees — Smart, Simple & Safe FX Trading",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X ───────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    site: "@BCDeesGlobal", // update when handle is live
    creator: "@BCDeesGlobal",
    images: ["/og-image.png"],
  },

  // ── Robots ────────────────────────────────────────────────────────────────
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

  // ── App / PWA hints ───────────────────────────────────────────────────────
  applicationName: siteName,
  appleWebApp: {
    capable: true,
    title: siteName,
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },

  // ── Icons ─────────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },

  // ── Manifest ──────────────────────────────────────────────────────────────
  manifest: "/site.webmanifest",

  // ── Verification (add keys when ready) ───────────────────────────────────
  verification: {
    // google: "your-google-site-verification-token",
    // yandex: "your-yandex-token",
  },

  // ── Category ──────────────────────────────────────────────────────────────
  category: "finance",
};

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Structured data — Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "BCDees Global",
              url: siteUrl,
              logo: `${siteUrl}/logo.png`,
              description: siteDescription,
              address: {
                "@type": "PostalAddress",
                streetAddress: "20 Aso Rock St, Abule Ijoko",
                addressRegion: "Ogun State",
                addressCountry: "NG",
              },
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+234-803-411-5756",
                  contactType: "customer support",
                  email: "info@bcdees.com",
                  availableLanguage: "English",
                },
              ],
              sameAs: [
                // "https://twitter.com/BCDeesGlobal",
                // "https://www.instagram.com/bcdeesglobal",
              ],
            }),
          }}
        />

        {/* Structured data — WebSite + Sitelinks searchbox */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteName,
              url: siteUrl,
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
