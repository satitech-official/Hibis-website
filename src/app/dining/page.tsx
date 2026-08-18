import type { Metadata } from "next";
import Image from "next/image";
import InnerPageTemplate from "@/components/home/InnerPageTemplate";
import { hotelData } from "@/data/hotelData";

export const metadata: Metadata = {
  title: "Dining at Hibis Morjim | Dine After Dark",
  description: "Discover restaurant and bar moments at Hibis Morjim, from relaxed meals to after-dark cocktails.",
  alternates: { canonical: "/dining" },
};

export default function DiningPage() {
  return (
    <InnerPageTemplate
      title="DINE AFTER DARK"
      subtitle="Restaurant, bar, and under-the-stars moments designed for memorable evenings."
      image={hotelData.images.diningTable}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="relative h-[380px] overflow-hidden rounded-3xl border border-white/15">
          <Image src={hotelData.images.dining} alt="Evening dining and DJ atmosphere" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        </div>
        <div className="rounded-3xl border border-white/15 bg-[#14130f] p-7">
          <p className="text-xs uppercase tracking-[0.22em] text-blue-200">Configurable Naming</p>
          <h2 className="mt-3 text-3xl">{hotelData.confirmationFlags.RESTAURANT_NAME}</h2>
          <p className="mt-4 text-sm text-blue-100/80">
            Public references use this naming for the in-house dining and bar concept. Keep this value in configuration until final brand confirmation.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-blue-100/80">
            <li>• Restaurant service</li>
            <li>• Bar and cocktail menu</li>
            <li>• Dine under the stars</li>
            <li>• Couple/private setups</li>
          </ul>
          <a
            href={hotelData.social.instagram}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex rounded-full border border-white/25 px-5 py-2 text-xs uppercase tracking-[0.16em]"
          >
            Reserve a Table
          </a>
        </div>
      </div>
    </InnerPageTemplate>
  );
}
