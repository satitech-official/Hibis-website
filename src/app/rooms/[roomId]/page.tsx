import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import InnerPageTemplate from "@/components/home/InnerPageTemplate";
import { hotelData } from "@/data/hotelData";

type RoomPageProps = { params: Promise<{ roomId: string }> };

export async function generateStaticParams() {
  return hotelData.rooms.map((room) => ({ roomId: room.id }));
}

export async function generateMetadata({ params }: RoomPageProps): Promise<Metadata> {
  const { roomId } = await params;
  const room = hotelData.rooms.find((item) => item.id === roomId);

  if (!room) {
    return { title: "Room Not Found" };
  }

  return {
    title: `${room.name} | Hibis Morjim`,
    description: room.shortDescription,
    alternates: { canonical: `/rooms/${room.id}` },
  };
}

export default async function RoomDetailPage({ params }: RoomPageProps) {
  const { roomId } = await params;
  const room = hotelData.rooms.find((item) => item.id === roomId);

  if (!room) notFound();

  return (
    <InnerPageTemplate title={room.name} subtitle={room.shortDescription} image={room.image}>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {room.gallery.map((img) => (
              <div key={img} className="relative h-56 overflow-hidden rounded-2xl border border-white/15">
                <Image src={img} alt={`${room.name} visual`} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-white/15 bg-[#14130f] p-6">
            <h2 className="text-2xl">Room Highlights</h2>
            <ul className="mt-4 grid gap-2 text-sm text-blue-100/80 sm:grid-cols-2">
              {room.amenities.map((amenity) => (
                <li key={amenity}>• {amenity}</li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-white/15 bg-[#14130f] p-6">
          <h3 className="text-xl">Quick Specs</h3>
          <ul className="mt-4 space-y-2 text-sm text-blue-100/80">
            <li>Occupancy: {room.occupancy}</li>
            <li>Bed: {room.bed}</li>
            <li>Balcony: {room.balcony}</li>
            <li>Rate: {room.rate ?? "On request"}</li>
          </ul>
          <a
            href={hotelData.booking.morjim}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#b8893e] px-4 py-3 text-xs uppercase tracking-[0.16em] text-[#0b0b08] hover:bg-[#d6ad63]"
          >
            Book This Room
          </a>
        </aside>
      </div>
    </InnerPageTemplate>
  );
}
