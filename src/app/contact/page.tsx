import type { Metadata } from "next";
import InnerPageTemplate from "@/components/home/InnerPageTemplate";
import ContactPageClient from "@/components/home/ContactPageClient";
import { hotelData } from "@/data/hotelData";

export const metadata: Metadata = {
  title: "Contact Hibis Hotels & Resorts",
  description: "Plan your stay with Hibis through verified contact channels and a premium inquiry flow.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <InnerPageTemplate
      title="Let’s Plan Your Escape"
      subtitle="Speak with the Hibis reservations team for your Morjim stay plans."
      image={hotelData.images.story}
    >
      <ContactPageClient />
    </InnerPageTemplate>
  );
}
