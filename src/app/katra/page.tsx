import type { Metadata } from "next";
import InnerPageTemplate from "@/components/home/InnerPageTemplate";
import { hotelData } from "@/data/hotelData";

export const metadata: Metadata = {
  title: "Hibis Devi Grand Katra",
  description: "Discover Hibis Devi Grand Katra, a comfortable stay near Vaishno Devi with warm service and practical convenience.",
  alternates: { canonical: "/katra" },
};

export default function KatraPage() {
  return (
    <InnerPageTemplate
      title="Hibis Devi Grand Katra"
      subtitle="A pilgrimage-friendly stay concept built on comfort, access, and thoughtful hospitality."
      image={hotelData.images.cottage}
    >
      <div className="rounded-3xl border border-white/15 bg-[#14130f] p-8 text-sm text-blue-100/80">
        Verified Katra inventory, facilities, and booking details can be managed centrally before full public rollout.
      </div>
    </InnerPageTemplate>
  );
}
