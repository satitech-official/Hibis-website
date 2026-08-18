import type { Metadata } from "next";
import InnerPageTemplate from "@/components/home/InnerPageTemplate";
import { hotelData } from "@/data/hotelData";

export const metadata: Metadata = {
  title: "About Hibis Hotels & Resorts",
  description: "Discover the Hibis philosophy inspired by the rare blue hibiscus and a wellness-led approach to hospitality.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <InnerPageTemplate
      title="A Rare Flower. A Different Way to Stay."
      subtitle="The Hibis story blends vitality, sincerity, and tropical warmth across every destination."
      image={hotelData.images.hero}
    >
      <div className="space-y-5 rounded-3xl border border-white/15 bg-[#14130f] p-8 text-sm text-blue-100/85">
        <p>{hotelData.brand.signatureStory}</p>
        <p>
          Hibis emerged in Goa in 2021 and continues to expand with a focus on elevated comfort, wellness programming, and heartfelt hospitality.
        </p>
        <p>
          Every property is designed to feel local yet premium, where the stay experience goes beyond rooms into food, experiences, and meaningful moments.
        </p>
      </div>
    </InnerPageTemplate>
  );
}
