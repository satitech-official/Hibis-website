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
    <div className="min-h-screen bg-[#0b0b08] text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0f0f0c]/80 px-4 py-4 backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="text-xs uppercase tracking-[0.24em] text-blue-100">
            HIBIS
          </Link>
          <nav className="flex gap-4 text-xs uppercase tracking-[0.12em] text-blue-100/75">
            <Link href="/morjim">Morjim</Link>
            <Link href="/rooms">Rooms</Link>
            <Link href="/wellness">Wellness</Link>
            <Link href="/dining">Dining</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </header>
      <section className="relative isolate mx-auto flex h-[48vh] max-w-6xl items-end overflow-hidden rounded-b-[2rem] border-x border-b border-white/10 px-6 py-10 sm:px-10">
        <Image src={image} alt={title} fill sizes="(max-width: 1152px) 100vw, 1152px" className="object-cover opacity-55" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b08] via-[#0b0b08]/40" />
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.22em] text-blue-200">HIBIS Collection</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm text-blue-100/80 sm:text-base">{subtitle}</p>
        </div>
      </section>
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-8">{children}</main>
    </div>
  );
}
