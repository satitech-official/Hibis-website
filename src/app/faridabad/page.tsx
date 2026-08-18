import type { Metadata } from "next";
import InnerPageTemplate from "@/components/home/InnerPageTemplate";
import { hotelData } from "@/data/hotelData";

export const metadata: Metadata = {
  title: "Gaia Emerald by Hibis, Faridabad",
  description: "Explore Gaia Emerald by Hibis in Faridabad, where urban ease meets mindful hospitality.",
  alternates: { canonical: "/faridabad" },
};

export default function FaridabadPage() {
  return (
    <InnerPageTemplate
      title="Gaia Emerald by Hibis"
      subtitle="An urban sanctuary balancing contemporary comfort with wellness-led hospitality."
      image={hotelData.images.cityPool}
    >
      <div className="rounded-3xl border border-white/15 bg-[#14130f] p-8 text-sm text-blue-100/80">
        Faridabad content is structured for future property-level expansion with route-ready design consistency.
      </div>
    </InnerPageTemplate>
  );
}
