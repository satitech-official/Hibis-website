import Image from "next/image";
import Link from "next/link";

type InnerPageTemplateProps = {
  title: string;
  subtitle: string;
  image: string;
  children: React.ReactNode;
};

export default function InnerPageTemplate({ title, subtitle, image, children }: InnerPageTemplateProps) {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#0b0b08] text-white">
      <header className="absolute inset-x-0 top-0 z-30 border-b border-white/15 bg-gradient-to-b from-[#090906]/85 to-transparent px-5 py-5 sm:px-8 sm:py-6 lg:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-xs uppercase tracking-[0.24em] text-blue-100">
            HIBIS
          </Link>
          <nav className="hidden gap-5 text-[11px] uppercase tracking-[0.12em] text-blue-100/85 lg:flex">
            <Link href="/morjim">Morjim</Link>
            <Link href="/rooms">Rooms</Link>
            <Link href="/wellness">Wellness</Link>
            <Link href="/dining">Dining</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden rounded-full bg-[#c5a66a] px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[#15130e] transition hover:bg-[#e0bd79] lg:inline-flex"
            >
              Book your stay
            </Link>
            <details className="relative lg:hidden">
              <summary className="cursor-pointer list-none rounded-full border border-white/30 bg-[#0b0b08]/35 px-3.5 py-2 text-[10px] uppercase tracking-[0.14em] text-blue-100 backdrop-blur [&::-webkit-details-marker]:hidden">
                Menu
              </summary>
              <nav className="absolute right-0 top-full z-40 mt-3 grid w-48 gap-1 rounded-2xl border border-white/15 bg-[#15130e] p-2 shadow-2xl">
                <Link href="/morjim" className="rounded-xl px-3 py-2 text-xs uppercase tracking-[0.12em]">Morjim</Link>
                <Link href="/rooms" className="rounded-xl px-3 py-2 text-xs uppercase tracking-[0.12em]">Rooms</Link>
                <Link href="/experiences" className="rounded-xl px-3 py-2 text-xs uppercase tracking-[0.12em]">Experiences</Link>
                <Link href="/wellness" className="rounded-xl px-3 py-2 text-xs uppercase tracking-[0.12em]">Wellness</Link>
                <Link href="/dining" className="rounded-xl px-3 py-2 text-xs uppercase tracking-[0.12em]">Dining</Link>
                <Link href="/offers" className="rounded-xl px-3 py-2 text-xs uppercase tracking-[0.12em]">Offers</Link>
                <Link href="/gallery" className="rounded-xl px-3 py-2 text-xs uppercase tracking-[0.12em]">Gallery</Link>
                <Link href="/about" className="rounded-xl px-3 py-2 text-xs uppercase tracking-[0.12em]">About</Link>
                <Link href="/contact" className="rounded-xl px-3 py-2 text-xs uppercase tracking-[0.12em]">Contact</Link>
              </nav>
            </details>
          </div>
        </div>
      </header>
      <section className="relative isolate flex h-[68svh] min-h-[520px] items-end overflow-hidden border-b border-white/10 px-5 pb-10 pt-28 sm:h-[72svh] sm:min-h-[580px] sm:px-8 sm:pb-14 sm:pt-32 lg:h-[78svh] lg:min-h-[640px] lg:px-12 lg:pb-20">
        <Image src={image} alt={title} fill sizes="100vw" className="object-cover object-center" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b08]/95 via-[#0b0b08]/64 to-[#0b0b08]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b08] via-[#0b0b08]/18 to-transparent" />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-[#e0bd79] sm:text-xs">
            <span className="h-px w-9 bg-[#c5a66a]" />
            Hibis Collection
          </div>
          <h1 className="mt-5 max-w-5xl text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.86] tracking-[-0.04em] sm:mt-6">{title}</h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-blue-100/90 sm:mt-6 sm:text-lg">{subtitle}</p>
          <div className="mt-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-blue-100/75 sm:mt-10">
            <span className="flex h-6 w-4 items-start justify-center rounded-full border border-white/50 p-1"><span className="h-1.5 w-px rounded-full bg-[#e0bd79]" /></span>
            Scroll to discover
          </div>
        </div>
      </section>
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">{children}</main>
    </div>
  );
}
