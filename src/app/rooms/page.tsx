import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InnerPageTemplate from "@/components/home/InnerPageTemplate";
import { hotelData } from "@/data/hotelData";

export const metadata: Metadata = {
  title: "Rooms at Hibis Morjim | Compare Stays",
  description: "Explore room categories at Hibis Morjim and compare occupancy, comfort features, and available rate visibility.",
  alternates: { canonical: "/rooms" },
};

export default function RoomsPage() {
  return (
    <InnerPageTemplate
      title="Find Your Hibis Room"
      subtitle="A conversion-first room layout designed to simplify decisions before booking."
      image={hotelData.images.premium}
    >
      <div className="grid gap-5 md:grid-cols-2">
        {hotelData.rooms.map((room) => (
          <article key={room.id} className="overflow-hidden rounded-3xl border border-white/15 bg-[#14130f]">
            <div className="relative h-64">
              <Image src={room.image} alt={room.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="space-y-3 p-6">
              <h2 className="text-2xl">{room.name}</h2>
              <p className="text-sm text-blue-100/80">{room.shortDescription}</p>
              <p className="text-sm text-blue-100/80">Ideal for: {room.idealFor}</p>
              <p className="text-sm text-blue-100/80">Rate: {room.rate ?? "On request"}</p>
              <div className="flex gap-3 pt-2">
                <Link href={`/rooms/${room.id}`} className="rounded-full border border-white/25 px-4 py-2 text-xs uppercase tracking-[0.15em]">
                  View Details
                </Link>
                <a
                  href={hotelData.booking.morjim}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[#b8893e] px-4 py-2 text-xs uppercase tracking-[0.15em] text-[#0b0b08] hover:bg-[#d6ad63]"
                >
                  Book Room
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </InnerPageTemplate>
  );
}
