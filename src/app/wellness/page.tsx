import type { Metadata } from "next";
import Image from "next/image";
import InnerPageTemplate from "@/components/home/InnerPageTemplate";
import { hotelData } from "@/data/hotelData";

export const metadata: Metadata = {
  title: "HIBIS SAATMYA Wellness | Hibis Morjim",
  description: "Return to yourself through yoga, mindfulness, and Ayurvedic wellness at Hibis Saatmya.",
  alternates: { canonical: "/wellness" },
};

const wellnessSteps = [
  { title: "Reset", copy: "Breath-led morning movement and coastal calm." },
  { title: "Restore", copy: "Ayurvedic-inspired therapies and restorative care." },
  { title: "Reconnect", copy: "Mindful routines designed for lasting balance." },
];

export default function WellnessPage() {
  return (
    <InnerPageTemplate
      title="HIBIS SAATMYA"
      subtitle="A wellness world where ocean air and holistic care meet." 
      image={hotelData.images.family}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-[#c5a66a]/30 bg-[#1b180f] p-7">
          <h2 className="text-3xl">RETURN TO YOURSELF</h2>
          <p className="mt-4 text-sm text-[#eadfca]/85">
            Verified Hibis wellness positioning emphasizes yoga, ayurvedic therapies, mindfulness, and holistic relaxation.
          </p>
          <div className="mt-6 space-y-3">
            {wellnessSteps.map((step) => (
              <article key={step.title} className="rounded-2xl border border-[#c5a66a]/25 bg-[#332b1b]/45 p-4">
                <h3 className="text-xl">{step.title}</h3>
                <p className="mt-1 text-sm text-[#eadfca]/85">{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="relative h-[420px] overflow-hidden rounded-3xl border border-[#c5a66a]/30">
          <Image src={hotelData.images.wellness} alt="Hibis wellness setting" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        </div>
      </div>
    </InnerPageTemplate>
  );
}
