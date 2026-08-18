"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { hotelData } from "@/data/hotelData";

const filters = ["all", "rooms", "cottages", "pool", "dining", "wellness", "beach", "experiences"];

export default function GalleryPageClient() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeImage, setActiveImage] = useState<number | null>(null);

  const filteredGallery = useMemo(() => {
    return activeFilter === "all" ? hotelData.gallery : hotelData.gallery.filter((img) => img.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveImage(null);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.14em] ${
              activeFilter === filter ? "border-[#d6ad63] bg-[#4b3718]" : "border-white/20"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3">
        {filteredGallery.map((img, index) => (
          <button key={`${img.src}-${index}`} className="w-full overflow-hidden rounded-2xl border border-white/15" onClick={() => setActiveImage(index)}>
            <Image src={img.src} alt={img.alt} width={900} height={650} className="h-auto w-full object-cover transition duration-700 hover:scale-105" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeImage !== null ? (
          <motion.dialog
            open
            className="fixed inset-0 z-50 m-0 flex h-screen w-screen items-center justify-center bg-black/85 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
          >
            <button className="absolute right-6 top-6 text-white" onClick={() => setActiveImage(null)} aria-label="Close lightbox">
              <X size={20} />
            </button>
            <div className="relative h-[72vh] w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
              <Image
                src={filteredGallery[activeImage]?.src ?? filteredGallery[0].src}
                alt={filteredGallery[activeImage]?.alt ?? "Hibis gallery image"}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </motion.dialog>
        ) : null}
      </AnimatePresence>
    </>
  );
}
