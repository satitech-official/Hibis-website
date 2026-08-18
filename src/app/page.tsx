import HomePageClient from "@/components/home/HomePageClient";
import { hotelData } from "@/data/hotelData";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: hotelData.faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const hotelSchema = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: hotelData.properties[0].name,
  description: hotelData.properties[0].blurb,
  image: [
    "https://www.hibishotelsandresorts.com/og.png",
    "https://www.hibishotelsandresorts.com/images/hibis/pool.jpg",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: hotelData.contact.address,
    addressLocality: "Morjim",
    addressRegion: "Goa",
    addressCountry: "IN",
  },
  telephone: hotelData.contact.phone,
  email: hotelData.contact.email,
  sameAs: [hotelData.social.instagram, hotelData.social.facebook],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HomePageClient />
    </>
  );
}
