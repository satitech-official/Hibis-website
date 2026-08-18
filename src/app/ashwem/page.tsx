import type { Metadata } from "next";
import InnerPageTemplate from "@/components/home/InnerPageTemplate";
import { hotelData } from "@/data/hotelData";

export const metadata: Metadata = {
  title: "Hibis Ashwem, Goa | Coastal Retreat",
  description: "Discover Hibis Ashwem, a serene North Goa stay concept near Mandrem and Arambol.",
  alternates: { canonical: "/ashwem" },
};

export default function AshwemPage() {
  return (
    <InnerPageTemplate
      title="Hibis Ashwem"
      subtitle="A calm, design-led coastal retreat concept within the Hibis collection."
      image={hotelData.images.story}
    >
      <div className="rounded-3xl border border-white/15 bg-[#14130f] p-8">
        <p className="text-sm text-blue-100/80">
          Ashwem is presented as a quieter sister destination—focused on tropical stillness, beach access, and slow-living hospitality.
          Final room inventory and property-level details should be confirmed in the centralized configuration before public launch.
        </p>
      </div>
    </InnerPageTemplate>
  );
}
