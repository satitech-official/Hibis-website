import type { Metadata } from "next";
import Image from "next/image";
import InnerPageTemplate from "@/components/home/InnerPageTemplate";
import { hotelData } from "@/data/hotelData";

export const metadata: Metadata = {
  title: "Experiences at Hibis Morjim",
  description: "Explore beach, pool, wellness, dining, and lifestyle experiences at Hibis Morjim.",
  alternates: { canonical: "/experiences" },
};

export default function ExperiencesPage() {
  return (
    <InnerPageTemplate
      title="Experiences at Hibis"
      subtitle="From beach calm to social evenings, each moment is designed to feel intentional."
      image={hotelData.images.hero}
    >
      <div className="grid auto-rows-[180px] grid-cols-2 gap-4 md:grid-cols-4">
        {hotelData.experiences.map((exp, index) => (
          <article
            key={`${exp.title}-${index}`}
            className={`relative overflow-hidden rounded-3xl border border-white/15 ${
              exp.tone === "wide" ? "col-span-2" : "col-span-1"
            } ${exp.tone === "tall" ? "row-span-2" : "row-span-1"}`}
          >
            <Image
              src={exp.image}
              alt={exp.title}
              fill
              sizes={exp.tone === "wide" ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b08]/85 to-transparent" />
            <h2 className="absolute bottom-4 left-4 text-base">{exp.title}</h2>
          </article>
        ))}
      </div>
    </InnerPageTemplate>
  );
}
