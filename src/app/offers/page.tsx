import type { Metadata } from "next";
import Image from "next/image";
import InnerPageTemplate from "@/components/home/InnerPageTemplate";
import { hotelData } from "@/data/hotelData";

export const metadata: Metadata = {
  title: "Offers at Hibis Hotels & Resorts",
  description: "Explore verified Hibis offers including early booking and Goa sightseeing packages.",
  alternates: { canonical: "/offers" },
};

export default function OffersPage() {
  return (
    <InnerPageTemplate
      title="Exclusive Offers"
      subtitle="Verified and non-duplicated offers in one premium, easy-to-update system."
      image={hotelData.images.premium}
    >
      <div className="grid gap-5 md:grid-cols-2">
        {hotelData.offers.map((offer) => (
          <article key={offer.id} className="overflow-hidden rounded-3xl border border-white/15 bg-[#14130f]">
            <div className="relative h-56">
              <Image src={offer.image} alt={offer.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="space-y-3 p-6">
              <h2 className="text-2xl">{offer.title}</h2>
              <p className="text-sm text-blue-100/80">{offer.description}</p>
              <p className="text-xs uppercase tracking-[0.14em] text-blue-200">Terms: {offer.terms}</p>
              <p className="text-xs uppercase tracking-[0.14em] text-blue-200">Validity: {offer.validity}</p>
            </div>
          </article>
        ))}
      </div>
    </InnerPageTemplate>
  );
}
