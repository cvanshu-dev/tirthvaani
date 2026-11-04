import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function About() {
  return (
    <section className="relative isolate overflow-hidden bg-[#faf1e7] px-5 py-20 text-[#35281e] md:px-12 lg:px-24 lg:py-32">
      {/* Large background circle */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[850px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#cba77d]/25" />

      {/* Horizontal decorative lines */}
      <div className="pointer-events-none absolute left-[4%] right-[4%] top-[12%] border-t border-[#cba77d]/25" />
      <div className="pointer-events-none absolute bottom-[12%] left-[4%] right-[4%] border-t border-[#cba77d]/25" />

      {/* Central ornament */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-[#b98a5a]/45 lg:block" />
      <div className="pointer-events-none absolute left-1/2 top-7 hidden h-3 w-3 -translate-x-1/2 rotate-45 bg-[#bd9068] lg:block" />
      <div className="pointer-events-none absolute bottom-7 left-1/2 hidden h-3 w-3 -translate-x-1/2 rotate-45 bg-[#bd9068] lg:block" />

      {/* Top circle ornament */}
      <div className="pointer-events-none absolute left-1/2 top-[-55px] hidden h-28 w-28 -translate-x-1/2 rounded-full border border-[#cba77d]/35 lg:block" />

      {/* Botanical corner details */}
      <div className="pointer-events-none absolute bottom-0 left-0 hidden h-36 w-36 opacity-40 md:block">
        <span className="absolute bottom-8 left-5 h-24 w-12 -rotate-45 rounded-[100%_0] border border-[#cba77d]" />
        <span className="absolute bottom-5 left-14 h-20 w-10 rotate-[35deg] rounded-[100%_0] border border-[#cba77d]" />
        <span className="absolute bottom-2 left-24 h-16 w-8 rotate-[65deg] rounded-[100%_0] border border-[#cba77d]" />
      </div>

      <div className="pointer-events-none absolute bottom-0 right-0 hidden h-36 w-36 rotate-180 opacity-40 md:block">
        <span className="absolute bottom-8 left-5 h-24 w-12 -rotate-45 rounded-[100%_0] border border-[#cba77d]" />
        <span className="absolute bottom-5 left-14 h-20 w-10 rotate-[35deg] rounded-[100%_0] border border-[#cba77d]" />
        <span className="absolute bottom-2 left-24 h-16 w-8 rotate-[65deg] rounded-[100%_0] border border-[#cba77d]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1290px] items-center gap-14 lg:grid-cols-2 lg:gap-24">
        {/* Image panel */}
        <div className="relative h-[470px] overflow-hidden rounded-[30px_145px_30px_30px] bg-[#38271d] shadow-[0_25px_60px_rgba(70,42,20,0.16)] md:h-[650px]">
          <Image
            src="/hero.jpg"
            alt="Priest performing Ganga Aarti beside the River Ganga in Varanasi"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />

          {/* Image corner frame */}
          <div className="absolute left-5 top-5 h-12 w-12 border-l border-t border-[#f5dfb8]/80" />
          <div className="absolute bottom-5 right-5 h-12 w-12 border-b border-r border-[#f5dfb8]/80" />

          <div className="absolute bottom-6 left-7 right-7 flex items-center gap-4 text-[11px] tracking-[0.3em] text-white md:text-sm">
            <span>VARANASI</span>
            <span className="h-px flex-1 bg-white/60" />
            <span>THE ETERNAL CITY</span>
          </div>
        </div>

        {/* Text panel */}
        <div className="max-w-[590px]">
          <p className="mb-7 text-xs font-semibold tracking-[0.35em] text-[#a96835] md:text-sm">
            OUR HERITAGE <span className="px-2">·</span> OUR FAITH
          </p>

          <h2 className="font-serif text-[48px] font-normal leading-[0.98] tracking-[-2px] md:text-[76px]">
            Culturally and
            <em className="block text-[#bd8146]">Spiritually</em>
            Rooted in Kashi.
          </h2>

          <div className="my-9 flex w-24 items-center gap-2">
            <span className="h-px flex-1 bg-[#ae7845]" />
            <span className="h-2 w-2 rotate-45 bg-[#ae7845]" />
            <span className="h-px flex-1 bg-[#ae7845]" />
          </div>

          <p className="mb-6 font-serif text-base leading-7 text-[#66584e] md:text-lg">
            Varanasi, one of India’s most sacred cities, is deeply rooted in
            ancient traditions and spiritual wisdom. Revered as the city of
            Lord Shiva, Kashi holds a timeless place in the journey towards
            spiritual liberation and moksha.
          </p>

          <p className="mb-9 font-serif text-base leading-7 text-[#66584e] md:text-lg">
            At Tirth Kshetra Purohit, we connect devotees with experienced
            Pandits and Purohits for authentic Vedic homams, pujas and sacred
            rituals in Kashi, helping preserve traditions and make every
            spiritual journey meaningful.
          </p>

          <Link
            href="/about-us"
            className="group inline-flex items-center gap-8 rounded-full border border-[#bd8b60] px-7 py-4 font-serif text-base text-[#493328] transition-all duration-300 hover:-translate-y-1 hover:bg-[#a95731] hover:text-white"
          >
            <span>More About Us</span>
            <ArrowUpRight
              size={20}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}