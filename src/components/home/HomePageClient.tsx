"use client";

import Image from "next/image";
import Link from "next/link";
import { type ComponentProps, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  ArrowRight,
  BedDouble,
  Calendar,
  Check,
  ChevronDown,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Minus,
  Phone,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { hotelData, navItems } from "@/data/hotelData";

const immersiveScenes = [
  { num: "01", title: "Wake by the Sea", copy: "Salt air, quiet dawns, and beach walks before breakfast." },
  { num: "02", title: "Float Into the Afternoon", copy: "Poolside ease with tropical shade and unhurried time." },
  { num: "03", title: "Dine After Dark", copy: "Cocktails, conversation, and warm evening energy." },
  { num: "04", title: "Return to Yourself", copy: "A wellness rhythm that feels personal and restorative." },
];

const journeySteps = [
  { id: "stays", number: "01", label: "Welcome" },
  { id: "rooms", number: "02", label: "Stay" },
  { id: "experiences", number: "03", label: "Experience" },
  { id: "gallery", number: "04", label: "Discover" },
  { id: "reserve", number: "05", label: "Reserve" },
];

const galleryFilters = ["all", "rooms", "cottages", "pool", "dining", "wellness", "beach", "experiences"];

function PremiumCursor() {
  const [label, setLabel] = useState("EXPLORE");
  const [enabled, setEnabled] = useState(false);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mq.matches);
    const update = (event: MouseEvent) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    };

    const listener = (event: Event) => {
      const target = event.target as HTMLElement;
      const state = target?.closest("[data-cursor]")?.getAttribute("data-cursor") ?? "EXPLORE";
      setLabel(state);
    };

    window.addEventListener("mousemove", update);
    window.addEventListener("mouseover", listener);
    return () => {
      window.removeEventListener("mousemove", update);
      window.removeEventListener("mouseover", listener);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[120] hidden h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/45 bg-[#11110d]/25 text-center text-[9px] tracking-[0.2em] text-white/95 backdrop-blur-[2px] transition-[width,height,background-color] duration-300 md:flex"
      aria-hidden
    >
      <span className="absolute h-1.5 w-1.5 rounded-full bg-[#e8dcc8] shadow-[0_0_18px_#e8dcc8]" />
      <span className="relative rounded-full bg-[#0b0b08]/55 px-2 py-1">{label}</span>
    </div>
  );
}

function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[130] flex flex-col items-center justify-center bg-[#0b0b08]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeOut" } }}
    >
      <motion.svg width="170" height="170" viewBox="0 0 200 200" initial={{ scale: 0.9, opacity: 0.5 }} animate={{ scale: 1, opacity: 1 }}>
        <motion.path
          d="M100 100 C150 30, 180 100, 100 140 C20 100, 50 30, 100 100"
          fill="none"
          stroke="#d6ad63"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.circle
          cx="100"
          cy="102"
          r="10"
          fill="#d6ad63"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        />
      </motion.svg>
      <motion.h1
        className="mt-5 text-3xl tracking-[0.28em] text-white"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        HIBIS
      </motion.h1>
      <motion.p
        className="mt-3 text-center text-xs uppercase tracking-[0.18em] text-blue-100/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.45 }}
      >
        Holistic Innovations Bringing Inspiring Stays
      </motion.p>
    </motion.div>
  );
}

function SectionTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-[#d6ad63]">{eyebrow}</p>
      <h2 className="mt-3 text-4xl font-medium text-[#f6efe3] sm:text-5xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-sm text-[#d8cbb6] sm:text-base">{subtitle}</p> : null}
    </div>
  );
}

function MagneticLink({ className = "", children, onPointerLeave, onPointerMove, ...props }: ComponentProps<"a">) {
  return (
    <a
      {...props}
      className={`magnetic-link inline-flex ${className}`}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
        event.currentTarget.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        onPointerMove?.(event);
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.transform = "translate3d(0, 0, 0)";
        onPointerLeave?.(event);
      }}
    >
      {children}
    </a>
  );
}

export default function HomePageClient() {
  const [loading, setLoading] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [selectedRooms, setSelectedRooms] = useState<string[]>(["classic-plus", "premium-king"]);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [activeJourney, setActiveJourney] = useState("stays");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    property: "morjim",
    dates: "",
    guests: "2",
    message: "",
  });
  const [formMessage, setFormMessage] = useState("");
  const roomsTrackRef = useRef<HTMLDivElement | null>(null);

  const filteredGallery = useMemo(() => {
    return activeFilter === "all" ? hotelData.gallery : hotelData.gallery.filter((img) => img.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sections = journeySteps
      .map((step) => document.getElementById(step.id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target.id) setActiveJourney(visible.target.id);
      },
      { threshold: 0.35 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > 24);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      smoothWheel: !reduce,
      duration: reduce ? 0 : 1.2,
    });

    let raf = 0;
    const frame = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!roomsTrackRef.current || window.matchMedia("(max-width: 1023px)").matches) return;

    const section = roomsTrackRef.current;
    const horizontalDistance = section.scrollWidth - window.innerWidth + 80;

    const tween = gsap.to(section, {
      x: -horizontalDistance,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top 17%",
        end: () => `+=${horizontalDistance}`,
        scrub: true,
        pin: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveImage(null);
      if (activeImage === null) return;
      if (event.key === "ArrowRight") {
        setActiveImage((prev) => {
          if (prev === null) return 0;
          return (prev + 1) % filteredGallery.length;
        });
      }
      if (event.key === "ArrowLeft") {
        setActiveImage((prev) => {
          if (prev === null) return 0;
          return (prev - 1 + filteredGallery.length) % filteredGallery.length;
        });
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeImage, filteredGallery.length]);

  const toggleRoomSelection = (roomId: string) => {
    setSelectedRooms((prev) => {
      if (prev.includes(roomId)) return prev.filter((id) => id !== roomId);
      if (prev.length >= 3) return [...prev.slice(1), roomId];
      return [...prev, roomId];
    });
  };

  const comparedRooms = hotelData.rooms.filter((room) => selectedRooms.includes(room.id));

  const submitContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.name || !formState.phone || !formState.email) {
      setFormMessage("Please complete name, phone, and email.");
      return;
    }

    setFormMessage("Demo mode: your inquiry is validated locally. Connect an email/CRM backend to send submissions.");
  };

  return (
    <>
      <PremiumCursor />
      <AnimatePresence>{loading ? <Preloader /> : null}</AnimatePresence>

      <div className="bg-[#0b0b08] text-white">
        <header className="fixed inset-x-0 top-0 z-[90] px-4 py-4 sm:px-8">
          <nav
            className={`mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border px-4 py-3 backdrop-blur-xl transition-all duration-500 md:px-6 ${
              isScrolled ? "border-white/15 bg-[#0f0f0c]/80 shadow-[0_12px_40px_rgba(0,0,0,0.22)]" : "border-white/10 bg-[#0f0f0c]/25"
            }`}
          >
            <Link href="/" className="text-sm tracking-[0.24em] text-blue-100" data-cursor="VIEW">
              HIBIS
            </Link>
            <div className="hidden items-center gap-6 lg:flex">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="text-xs uppercase tracking-[0.15em] text-blue-100/80 transition hover:text-white" data-cursor="EXPLORE">
                  {item.label}
                </a>
              ))}
            </div>
            <div className="hidden items-center gap-1 rounded-full border border-white/20 bg-white/5 p-1 xl:flex">
              {hotelData.properties.map((property) => (
                <Link
                  key={property.slug}
                  href={property.slug === "morjim" ? "/morjim" : `/${property.slug}`}
                  className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-blue-100/85 hover:bg-white/10"
                >
                  {property.slug}
                </Link>
              ))}
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-blue-50 lg:hidden"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileMenuOpen((open) => !open)}
              data-cursor="EXPLORE"
            >
              <span className="flex w-3 flex-col gap-1" aria-hidden>
                <span className={`h-px w-full bg-current transition-transform ${mobileMenuOpen ? "translate-y-[3px] rotate-45" : ""}`} />
                <span className={`h-px w-full bg-current transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`} />
                <span className={`h-px w-full bg-current transition-transform ${mobileMenuOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
              </span>
              Menu
            </button>
            <a
              href={hotelData.booking.primaryUrl}
              target="_blank"
              className="rounded-full bg-gradient-to-r from-[#b8893e] to-[#d6ad63] px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-white"
              rel="noreferrer"
              data-cursor="BOOK"
            >
              <span className="hidden sm:inline">Book Your Escape</span>
              <span className="sm:hidden">Book</span>
            </a>
          </nav>
          <AnimatePresence>
            {mobileMenuOpen ? (
              <motion.nav
                id="mobile-navigation"
                aria-label="Mobile navigation"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mx-auto mt-2 grid max-w-7xl grid-cols-2 gap-1 rounded-3xl border border-white/15 bg-[#0f0f0c]/95 p-3 shadow-2xl backdrop-blur-xl lg:hidden"
              >
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-2xl px-3 py-3 text-xs uppercase tracking-[0.14em] text-blue-50/85 hover:bg-white/10"
                  >
                    {item.label}
                  </a>
                ))}
              </motion.nav>
            ) : null}
          </AnimatePresence>
        </header>

        <aside className="pointer-events-none fixed left-5 top-1/2 z-[80] hidden -translate-y-1/2 2xl:block" aria-label="Page journey">
          <ol className="space-y-3 border-l border-white/20 pl-4">
            {journeySteps.map((step) => {
              const active = activeJourney === step.id;
              return (
                <li key={step.id} className={`text-[9px] uppercase tracking-[0.2em] transition-colors ${active ? "text-white" : "text-blue-100/45"}`}>
                  <span className="mr-2 text-blue-200">{step.number}</span>
                  {step.label}
                </li>
              );
            })}
          </ol>
        </aside>

        <main>
          <section className="hero-stage relative isolate flex min-h-[100svh] items-end overflow-hidden px-4 pb-12 pt-28 sm:px-8 lg:min-h-[780px]" id="stays">
            <Image
              src="/images/hibis/hero-royal-v2.png"
              alt="Grand Hibis resort at twilight"
              fill
              priority
              className="object-cover object-[62%_center]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,10,8,0.88)_0%,rgba(9,10,8,0.62)_42%,rgba(9,10,8,0.12)_70%,rgba(9,10,8,0.18)_100%)]" />
            <div className="relative z-10 mx-auto w-full max-w-7xl">
              <div className="max-w-2xl pb-4">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#d6ad63]">HIBIS · MORJIM, GOA</p>
                <h1 className="mt-5 font-serif text-[clamp(3.6rem,7.5vw,7rem)] leading-[0.88] tracking-[-0.045em] text-[#f6f0e5]">
                  EXPERIENCE<br />TIMELESS BEAUTY
                </h1>
                <p className="mt-6 max-w-md text-sm leading-7 text-[#ede4d3]/85 sm:text-base">At Hibis, every moment is crafted with quiet elegance—so your stay feels as memorable as the destination.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <MagneticLink href="#morjim-story" className="group rounded-sm bg-[#b8893e] px-6 py-3 text-xs uppercase tracking-[0.16em] text-[#0b0b08] shadow-[0_10px_30px_rgba(0,0,0,0.2)]" data-cursor="EXPLORE">
                    Explore Hibis <ArrowRight className="ml-3 transition-transform duration-200 group-hover:translate-x-1" size={15} />
                  </MagneticLink>
                  <MagneticLink href="#gallery" className="rounded-sm border border-[#d6ad63]/70 bg-black/10 px-6 py-3 text-xs uppercase tracking-[0.16em] text-[#f6f0e5]" data-cursor="VIEW">
                    View gallery
                  </MagneticLink>
                </div>
                <div className="mt-12 flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-[#e8dcc8]/80">
                  <span className="h-8 w-px bg-[#d6ad63]" />
                  Scroll to explore
                </div>
              </div>
            </div>
          </section>

          <section className="relative z-20 -mt-10 px-4 sm:px-8">
            <div className="mx-auto max-w-7xl rounded-3xl border border-white/15 bg-[#14130f]/85 p-4 backdrop-blur-xl sm:p-5">
              <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr_1fr_0.7fr_0.5fr_auto]">
                {[
                  { icon: MapPin, label: "Destination", value: "Morjim" },
                  { icon: Calendar, label: "Check-in", value: "Select" },
                  { icon: Calendar, label: "Check-out", value: "Select" },
                  { icon: Users, label: "Guests", value: "2" },
                  { icon: BedDouble, label: "Rooms", value: "1" },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-left"
                    onClick={() => setBookingOpen(true)}
                    data-cursor="BOOK"
                  >
                    <item.icon size={16} className="text-blue-200" />
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-blue-100/70">{item.label}</p>
                      <p className="text-sm text-white">{item.value}</p>
                    </div>
                  </button>
                ))}
                <a
                  href={hotelData.booking.morjim}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#a9792f] to-[#d6ad63] px-5 py-3 text-xs uppercase tracking-[0.18em]"
                  data-cursor="BOOK"
                >
                  Check Availability
                </a>
              </div>
            </div>
          </section>

          <section id="morjim-story" className="mx-auto grid max-w-7xl gap-10 px-4 py-24 sm:px-8 lg:grid-cols-2">
            <div className="relative h-[420px] overflow-hidden rounded-[2.2rem] border border-white/15">
              <Image src={hotelData.images.story} alt="Welcome to Morjim story visual" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-xs uppercase tracking-[0.28em] text-blue-200">Welcome to Morjim</p>
              <h2 className="mt-4 text-4xl font-medium sm:text-5xl">WHERE GOA SLOWS DOWN</h2>
              <p className="mt-5 max-w-xl text-blue-100/80">
                Slow mornings. Longer sunsets. A shoreline where wellness, food, and nightlife can coexist without losing the peace.
              </p>
              <div className="mt-7 h-1 w-full overflow-hidden rounded bg-white/10">
                <motion.div className="h-full bg-gradient-to-r from-[#c99c4b] to-[#e8dcc8]" initial={{ width: 0 }} whileInView={{ width: "85%" }} viewport={{ once: true }} />
              </div>
            </div>
          </section>

          <section className="px-4 py-20 sm:px-8">
            <SectionTitle
              eyebrow="Immersive Property Experience"
              title="The Other Side of Goa"
              subtitle="From sunrise beach calm to after-dark dining, every moment has a distinct mood."
            />
            <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-4">
              {immersiveScenes.map((scene) => (
                <article key={scene.num} className="rounded-3xl border border-white/15 bg-white/[0.04] p-6">
                  <p className="text-sm text-blue-200">{scene.num}</p>
                  <h3 className="mt-2 text-2xl">{scene.title}</h3>
                  <p className="mt-3 text-sm text-blue-100/75">{scene.copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="overflow-hidden py-20" id="rooms">
            <SectionTitle eyebrow="Rooms" title="Find Your Pace by the Sea" subtitle="Designed to clarify category differences and speed up booking decisions." />
            <div ref={roomsTrackRef} className="flex gap-6 px-4 lg:w-max lg:px-8">
              {hotelData.rooms.map((room) => (
                <article
                  key={room.id}
                  className="room-card group w-[86vw] overflow-hidden border bg-[#17140e] sm:w-[420px]"
                  data-cursor="VIEW"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image src={room.image} alt={room.name} fill sizes="(max-width: 640px) 86vw, 420px" className="object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b08]/65 via-transparent" />
                  </div>
                  <div className="space-y-3 px-7 pb-9 pt-6">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#d6ad63]">Hibis Collection</p>
                    <h3 className="text-2xl text-[#f6efe3]">{room.name}</h3>
                    <p className="text-sm text-blue-100/75">{room.shortDescription}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-blue-100/80">
                      <p>Occupancy: {room.occupancy}</p>
                      <p>Bed: {room.bed}</p>
                      <p>Balcony: {room.balcony}</p>
                      <p>Rate: {room.rate ?? "On request"}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.slice(0, 4).map((amenity) => (
                        <span key={amenity} className="rounded-full border border-white/20 px-3 py-1 text-[11px] text-blue-100/80">
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Link href="/rooms" className="rounded-sm border border-[#d6ad63]/70 px-4 py-2 text-xs uppercase tracking-[0.15em] text-[#f6efe3]">
                        View Room
                      </Link>
                      <a
                        href={hotelData.booking.morjim}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-sm bg-[#b8893e] px-4 py-2 text-xs uppercase tracking-[0.15em] text-[#0b0b08]"
                      >
                        Book Room
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="px-4 py-20 sm:px-8" id="comparison">
            <SectionTitle eyebrow="Find Your Hibis Stay" title="Room Comparison" />
            <div className="mx-auto max-w-7xl rounded-3xl border border-white/15 bg-[#12110d] p-6">
              <div className="mb-6 flex flex-wrap gap-2">
                {hotelData.rooms.map((room) => {
                  const isActive = selectedRooms.includes(room.id);
                  return (
                    <button
                      key={room.id}
                      onClick={() => toggleRoomSelection(room.id)}
                      className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.14em] ${
                        isActive ? "border-[#d6ad63] bg-[#3d2e16] text-white" : "border-white/25 text-blue-100/80"
                      }`}
                    >
                      {room.name}
                    </button>
                  );
                })}
              </div>
              <div className="grid gap-4 lg:grid-cols-3">
                {comparedRooms.map((room) => (
                  <article key={room.id} className="rounded-2xl border border-white/15 bg-white/[0.03] p-5">
                    <h3 className="text-xl">{room.name}</h3>
                    <p className="mt-3 text-sm text-blue-100/80">Ideal for: {room.idealFor}</p>
                    <ul className="mt-4 space-y-2 text-sm text-blue-100/80">
                      <li>Bed: {room.bed}</li>
                      <li>Balcony: {room.balcony}</li>
                      <li>Capacity: {room.occupancy}</li>
                      <li>Price: {room.rate ?? "On request"}</li>
                    </ul>
                    <a
                      href={hotelData.booking.morjim}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-sm text-[#d6ad63]"
                    >
                      Check availability <ArrowRight size={16} />
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-8 lg:grid-cols-2" id="wellness">
            <div className="relative overflow-hidden rounded-[2rem] border border-[#c5a66a]/35 bg-[#18150e] p-8">
              <p className="text-xs uppercase tracking-[0.24em] text-[#d7bd85]">Hibis Saatmya Wellness</p>
              <h2 className="mt-4 text-4xl">RETURN TO YOURSELF</h2>
              <p className="mt-4 text-sm text-[#eadfca]/85">
                Reset with yoga, restore through Ayurvedic rituals, and reconnect in a softer tropical rhythm.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { title: "Reset", copy: "Guided breath and morning movement" },
                  { title: "Restore", copy: "Ayurvedic and mindful therapies" },
                  { title: "Reconnect", copy: "Nature-led calm and digital slowdown" },
                ].map((step) => (
                  <div key={step.title} className="rounded-xl border border-[#c5a66a]/30 bg-[#2b2518]/40 p-4">
                    <h3 className="text-lg text-white">{step.title}</h3>
                    <p className="mt-1 text-xs text-[#eadfca]/80">{step.copy}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[420px] overflow-hidden rounded-[2rem] border border-[#c5a66a]/30">
              <Image src={hotelData.images.wellness} alt="Wellness at Hibis Morjim" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </section>

          <section id="experiences" className="px-4 py-20 sm:px-8">
            <SectionTitle eyebrow="Experiences" title="Beyond the Room" subtitle="A visual grid of what guests can actually do during their stay." />
            <div className="mx-auto grid max-w-7xl auto-rows-[170px] grid-cols-2 gap-4 md:grid-cols-4">
              {hotelData.experiences.map((exp, index) => (
                <article
                  key={`${exp.title}-${index}`}
                  className={`group relative overflow-hidden rounded-3xl border border-white/15 ${
                    exp.tone === "wide" ? "col-span-2" : "col-span-1"
                  } ${exp.tone === "tall" ? "row-span-2" : "row-span-1"}`}
                >
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    sizes={exp.tone === "wide" ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b08]/85 via-[#0b0b08]/20" />
                  <p className="absolute bottom-4 left-4 text-sm tracking-[0.14em] text-white">{exp.title}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="dining" className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-8 lg:grid-cols-2">
            <div className="relative h-[420px] overflow-hidden rounded-[2rem] border border-white/15">
              <Image src={hotelData.images.dining} alt="Dining at Hibis" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-xs uppercase tracking-[0.24em] text-blue-200">Dine After Dark</p>
              <h2 className="mt-4 text-4xl">Restaurant &amp; Bar Experiences</h2>
              <p className="mt-4 text-sm text-blue-100/80">
                Signature space configured as <strong>{hotelData.confirmationFlags.RESTAURANT_NAME}</strong>. From relaxed dining to cocktail-driven evenings, the experience stays intimate and polished.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-blue-100/80">
                <li>• Restaurant dining</li>
                <li>• Bar and cocktails</li>
                <li>• Dine under the stars</li>
                <li>• Couple and private setups</li>
              </ul>
              <a
                href={hotelData.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-white/30 px-5 py-2 text-xs uppercase tracking-[0.16em]"
              >
                Reserve a Table <ArrowRight size={14} />
              </a>
            </div>
          </section>

          <section className="px-4 py-20 sm:px-8">
            <SectionTitle eyebrow="Stories from Hibis" title="Social Moments, Curated" />
            <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
              {[...hotelData.gallery, ...hotelData.gallery.slice(0, 3)].map((img, idx) => (
                <article key={`${img.src}-${idx}`} className="group relative h-56 overflow-hidden rounded-2xl border border-white/15">
                  <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a08]/90 to-transparent opacity-70" />
                  <p className="absolute bottom-3 left-3 text-xs uppercase tracking-[0.16em]">Story {idx + 1}</p>
                </article>
              ))}
            </div>
            <div className="mx-auto mt-8 max-w-7xl text-center">
              <a href={hotelData.social.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2 text-xs uppercase tracking-[0.16em]">
                Follow the Hibis Story <ArrowRight size={14} />
              </a>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
            <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-[#14130f] p-8">
              <p className="text-xs uppercase tracking-[0.24em] text-blue-200">Community & Events</p>
              <h2 className="mt-4 text-4xl">COME AS GUESTS. LEAVE WITH STORIES.</h2>
              <div className="mt-8 flex gap-4 overflow-x-auto pb-3">
                {hotelData.gallery.map((img) => (
                  <div key={`strip-${img.src}`} className="relative h-48 min-w-60 overflow-hidden rounded-2xl border border-white/15">
                    <Image src={img.src} alt={img.alt} fill sizes="240px" className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="offers" className="px-4 py-20 sm:px-8">
            <SectionTitle eyebrow="Offers" title="Exclusive Escapes" />
            <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2">
              {hotelData.offers.map((offer) => (
                <article key={offer.id} className="overflow-hidden rounded-[2rem] border border-white/15 bg-[#14130f]">
                  <div className="relative h-56">
                    <Image src={offer.image} alt={offer.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl">{offer.title}</h3>
                    <p className="mt-3 text-sm text-blue-100/80">{offer.description}</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.16em] text-blue-200">{offer.terms}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-blue-200">{offer.validity}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
            <SectionTitle eyebrow="Real Guest Love" title="Feedback from Public Hibis Reviews" />
            <div className="grid gap-4 md:grid-cols-2">
              {hotelData.reviews.map((review) => (
                <article key={review.name} className="rounded-3xl border border-white/15 bg-[#14130f] p-6">
                  <p className="text-lg">“{review.quote}”</p>
                  <p className="mt-5 text-sm text-blue-200">
                    {review.name} • {review.source}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-blue-100/70">{review.theme}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-8 lg:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-blue-200">Morjim, Beyond the Room</p>
              <h2 className="mt-4 text-4xl">The Destination Layer</h2>
              <ul className="mt-5 space-y-2 text-sm text-blue-100/80">
                <li>Morjim Beach</li>
                <li>Ashwem shoreline</li>
                <li>Chapora Fort</li>
                <li>Sunset and water experiences</li>
              </ul>
              <a
                href="https://maps.google.com/?q=Morjim%20Beach%20Road%20Tembwada%20Pernem%20Goa%20403512"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2 text-xs uppercase tracking-[0.15em]"
              >
                Get Directions <ArrowRight size={14} />
              </a>
            </div>
            <iframe
              title="Hibis Morjim Location"
              src={hotelData.contact.mapEmbedUrl}
              loading="lazy"
              className="h-[360px] w-full rounded-[1.5rem] border border-white/20"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </section>

          <section id="gallery" className="px-4 py-20 sm:px-8">
            <SectionTitle eyebrow="Premium Gallery" title="A Curated Visual Story" />
            <div className="mx-auto mb-8 flex max-w-7xl flex-wrap gap-2">
              {galleryFilters.map((filter) => (
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
            <div className="mx-auto columns-1 gap-4 space-y-4 sm:columns-2 lg:max-w-7xl lg:columns-3">
              {filteredGallery.map((img, index) => (
                <button
                  key={`${img.src}-${index}`}
                  className="relative w-full overflow-hidden rounded-2xl border border-white/15"
                  onClick={() => setActiveImage(index)}
                  aria-label={`Open image: ${img.alt}`}
                  data-cursor="VIEW"
                >
                  <Image src={img.src} alt={img.alt} width={900} height={650} className="h-auto w-full object-cover transition duration-700 hover:scale-105" />
                </button>
              ))}
            </div>
          </section>

          <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
            <div className="rounded-[2rem] border border-white/15 bg-gradient-to-b from-[#1c170e] to-[#12110e] p-8">
              <p className="text-xs uppercase tracking-[0.24em] text-blue-200">Brand Story</p>
              <h2 className="mt-4 text-4xl">A RARE FLOWER. A DIFFERENT WAY TO STAY.</h2>
              <p className="mt-4 max-w-3xl text-sm text-blue-100/85">
                Hibis draws inspiration from the rare blue hibiscus: vitality, sincerity, and warmth. The hospitality approach is simple—beautiful spaces, attentive people, and restorative experiences that feel deeply personal.
              </p>
            </div>
          </section>

          <section id="reserve" className="px-4 py-20 sm:px-8">
            <div className="relative mx-auto isolate min-h-[560px] max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/20 p-7 sm:p-12">
              <Image src={hotelData.images.story} alt="Tropical resort pool setting" fill className="object-cover" sizes="(max-width: 1280px) 100vw, 1280px" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,10,25,0.93),rgba(3,10,25,0.45)_56%,rgba(3,10,25,0.16)),linear-gradient(0deg,rgba(3,10,25,0.74),transparent_55%)]" />
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex min-h-[500px] max-w-2xl flex-col justify-end"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-blue-100">05 · Reserve</p>
                <h2 className="mt-4 font-serif text-5xl leading-[0.9] tracking-[-0.05em] sm:text-7xl">EXPERIENCE HIBIS.</h2>
                <p className="mt-5 max-w-lg text-sm leading-7 text-blue-50/85 sm:text-base">Your next coastal pause begins with a room, but it stays with you as a feeling.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <MagneticLink
                    href={hotelData.booking.morjim}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-[#b8893e] px-6 py-3 text-xs uppercase tracking-[0.16em] text-[#0b0b08] hover:bg-[#d6ad63]"
                    data-cursor="BOOK"
                  >
                    Book your stay <ArrowRight className="ml-2" size={15} />
                  </MagneticLink>
                  <MagneticLink href="/rooms" className="rounded-full border border-white/45 bg-white/5 px-6 py-3 text-xs uppercase tracking-[0.16em] text-white" data-cursor="VIEW">
                    Explore rooms
                  </MagneticLink>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="px-4 py-20 sm:px-8">
            <SectionTitle eyebrow="Explore Hibis" title="Multi-Property Collection" />
            <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-4">
              {hotelData.properties.map((property) => (
                <article key={property.slug} className="group overflow-hidden rounded-3xl border border-white/15 bg-[#12120e]">
                  <div className="relative h-52 overflow-hidden">
                    <Image src={property.image} alt={property.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg">{property.name}</h3>
                    <p className="mt-2 text-xs text-blue-100/80">{property.label}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-4xl px-4 py-20 sm:px-8">
            <SectionTitle eyebrow="FAQ" title="Travel Details at a Glance" />
            <div className="space-y-3">
              {hotelData.faq.map((item, index) => {
                const isOpen = faqOpen === index;
                return (
                  <article key={item.q} className="rounded-2xl border border-white/15 bg-[#14130f]">
                    <button
                      className="flex w-full items-center justify-between p-5 text-left"
                      onClick={() => setFaqOpen(isOpen ? null : index)}
                      aria-expanded={isOpen}
                    >
                      <span>{item.q}</span>
                      {isOpen ? <Minus size={16} /> : <ChevronDown size={16} />}
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-5 text-sm text-blue-100/80">{item.a}</p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-8" id="contact">
            <div className="grid gap-8 rounded-[2rem] border border-white/15 bg-[#14130f] p-8 lg:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-blue-200">Contact</p>
                <h2 className="mt-4 text-4xl">LET&apos;S PLAN YOUR ESCAPE</h2>
                <div className="mt-6 space-y-3 text-sm text-blue-100/85">
                  <p className="inline-flex items-center gap-2">
                    <Phone size={14} /> {hotelData.contact.phone}
                  </p>
                  <p className="inline-flex items-center gap-2">
                    <Mail size={14} /> {hotelData.contact.email}
                  </p>
                  <p className="inline-flex items-center gap-2">
                    <MapPin size={14} /> {hotelData.contact.address}
                  </p>
                  <p className="inline-flex items-center gap-2">
                    <Clock3 size={14} /> Check-in {hotelData.confirmationFlags.CHECK_IN_TIME} • Check-out {hotelData.confirmationFlags.CHECK_OUT_TIME}
                  </p>
                </div>
              </div>
              <form onSubmit={submitContact} className="grid gap-3">
                <input
                  className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm outline-none ring-blue-300 focus:ring"
                  placeholder="Name"
                  value={formState.name}
                  onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
                  required
                />
                <input
                  className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm outline-none ring-blue-300 focus:ring"
                  placeholder="Phone"
                  value={formState.phone}
                  onChange={(event) => setFormState((prev) => ({ ...prev, phone: event.target.value }))}
                  required
                />
                <input
                  className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm outline-none ring-blue-300 focus:ring"
                  placeholder="Email"
                  type="email"
                  value={formState.email}
                  onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
                  required
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <select
                    className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm outline-none ring-blue-300 focus:ring"
                    value={formState.property}
                    onChange={(event) => setFormState((prev) => ({ ...prev, property: event.target.value }))}
                  >
                    {hotelData.properties.map((property) => (
                      <option key={property.slug} value={property.slug} className="text-black">
                        {property.name}
                      </option>
                    ))}
                  </select>
                  <input
                    className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm outline-none ring-blue-300 focus:ring"
                    placeholder="Dates"
                    value={formState.dates}
                    onChange={(event) => setFormState((prev) => ({ ...prev, dates: event.target.value }))}
                  />
                </div>
                <textarea
                  className="min-h-28 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm outline-none ring-blue-300 focus:ring"
                  placeholder="Message"
                  value={formState.message}
                  onChange={(event) => setFormState((prev) => ({ ...prev, message: event.target.value }))}
                />
                <button className="rounded-full bg-[#b8893e] px-5 py-3 text-xs uppercase tracking-[0.16em] text-[#0b0b08] hover:bg-[#d6ad63]">
                  Submit Inquiry
                </button>
                {formMessage ? <p className="text-xs text-blue-100/75">{formMessage}</p> : null}
              </form>
            </div>
          </section>
        </main>

        <footer className="relative overflow-hidden border-t border-white/10 px-4 pb-10 pt-14 sm:px-8">
          <p className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 text-[22vw] font-semibold leading-none text-white/[0.03]">
            HIBIS
          </p>
          <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-blue-200">HIBIS Hotels & Resorts</p>
              <p className="mt-2 text-2xl">STAY. BREATHE. BELONG.</p>
            </div>
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.14em] text-blue-100/80">
              <Link href="/morjim">Morjim</Link>
              <Link href="/ashwem">Ashwem</Link>
              <Link href="/katra">Katra</Link>
              <Link href="/faridabad">Faridabad</Link>
              <Link href="/rooms">Rooms</Link>
              <Link href="/wellness">Wellness</Link>
              <Link href="/dining">Dining</Link>
              <Link href="/offers">Offers</Link>
              <Link href="/gallery">Gallery</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </footer>

        <a
          href={`https://wa.me/${hotelData.contact.whatsapp}?text=Hello%20Hibis%20Hotels%20%26%20Resorts%2C%20I%20would%20like%20help%20planning%20my%20stay%20at%20Hibis%20Morjim.`}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-4 right-4 z-[95] hidden items-center gap-2 rounded-full border border-[#c99c4b] bg-[#17140d] px-4 py-3 text-xs uppercase tracking-[0.14em] shadow-[0_20px_40px_rgba(18,90,190,0.35)] md:flex"
          data-cursor="BOOK"
        >
          <MessageCircle size={16} /> Plan Your Stay
        </a>

        <button
          className="fixed bottom-4 left-4 right-4 z-[95] rounded-full bg-gradient-to-r from-[#b8893e] to-[#d6ad63] px-5 py-3 text-xs uppercase tracking-[0.16em] md:hidden"
          onClick={() => setBookingOpen(true)}
        >
          Book Your Stay
        </button>
      </div>

      <AnimatePresence>
        {bookingOpen ? (
          <motion.div className="fixed inset-0 z-[110] bg-black/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="absolute bottom-0 left-0 right-0 rounded-t-3xl border border-white/20 bg-[#15130e] p-6"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
            >
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.16em]">Book Your Escape</p>
                <button onClick={() => setBookingOpen(false)} aria-label="Close booking panel">
                  <X size={18} />
                </button>
              </div>
              <div className="grid gap-3">
                <button className="rounded-xl border border-white/20 bg-white/5 p-3 text-left text-sm">Destination: Morjim</button>
                <button className="rounded-xl border border-white/20 bg-white/5 p-3 text-left text-sm">Check-in / Check-out</button>
                <button className="rounded-xl border border-white/20 bg-white/5 p-3 text-left text-sm">Guests & Rooms</button>
                <a
                  href={hotelData.booking.morjim}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#b8893e] px-4 py-3 text-xs uppercase tracking-[0.16em] text-[#0b0b08] hover:bg-[#d6ad63]"
                >
                  Check Availability <Check size={14} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {activeImage !== null ? (
          <motion.dialog
            open
            className="fixed inset-0 z-[115] m-0 flex h-screen w-screen items-center justify-center bg-black/85 p-4"
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
