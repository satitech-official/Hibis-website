import type { Metadata } from "next";
import HomePageClient from "@/components/home/HomePageClient";

export const metadata: Metadata = {
  title: "Hibis Morjim, Goa | Boutique Resort Near Morjim Beach",
  description:
    "Experience Hibis Morjim: cinematic coastal stays, curated wellness, tropical dining, and refined rooms near Morjim Beach in North Goa.",
  alternates: { canonical: "/morjim" },
};

export default function MorjimPage() {
  return <HomePageClient />;
}
