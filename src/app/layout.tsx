import type { Metadata } from "next";
import type { ReactNode } from "react";
import BasePathGuard from "@/components/BasePathGuard";
import "./globals.css";

const title = "HIBIS Hotels & Resorts | The Blue Hibiscus Escape";
const description =
  "Discover Hibis Morjim, a boutique North Goa escape blending tropical calm, wellness, premium stays, and soulful dining near Morjim Beach.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hibishotelsandresorts.com"),
  title,
  description,
  keywords: [
    "Hibis Hotels and Resorts",
    "Hibis Morjim",
    "Morjim Beach Resort",
    "Resort near Morjim Beach",
    "North Goa Resort",
    "Wellness Resort Goa",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "HIBIS Hotels & Resorts",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Hibis Morjim cinematic hero view",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0b0b08] text-white antialiased">
        <BasePathGuard />
        {children}
      </body>
    </html>
  );
}
