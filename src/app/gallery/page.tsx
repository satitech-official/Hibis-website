import type { Metadata } from "next";
import InnerPageTemplate from "@/components/home/InnerPageTemplate";
import GalleryPageClient from "@/components/home/GalleryPageClient";
import { hotelData } from "@/data/hotelData";

export const metadata: Metadata = {
  title: "Hibis Gallery | Morjim Visual Story",
  description: "Browse Hibis Morjim rooms, pool, wellness, and destination imagery through a curated visual gallery.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <InnerPageTemplate
      title="Hibis Gallery"
      subtitle="A full-screen style editorial gallery with categorized visuals."
      image={hotelData.images.heroRoyal}
    >
      <GalleryPageClient />
    </InnerPageTemplate>
  );
}
