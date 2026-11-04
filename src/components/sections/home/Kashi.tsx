
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Kashi() {
  return (
    <section className="relative isolate flex min-h-[560px] items-center justify-center overflow-hidden bg-stone-950 px-6 py-24 text-center md:min-h-[680px]">

      {/* Background Image */}
      <Image
        src="/hero.jpg"
        alt="Kashi Vishwanath Temple in Varanasi"
        fill
        priority={false}
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover"
      />

      {/* Cinematic Overlay */}
      <div className="absolute inset-0 -z-10 bg-black/55" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/30 via-black/35 to-black/70" />

      {/* Content */}
      <div className="relative mx-auto max-w-4xl">

        <span className="mb-8 block text-xs font-medium uppercase tracking-[0.35em] text-amber-200">
          The Divine City of Kashi
        </span>

        <h2 className="font-[var(--font-lora)] text-5xl font-medium leading-tight tracking-tight text-white md:text-7xl lg:text-8xl">
          Har Har
          <br />
          <span className="italic text-amber-200">
            Mahadev
          </span>
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/85 md:text-xl md:leading-9">
          One darshan at Kashi Vishwanath Temple in Varanasi
          feels like a lifetime of prayers answered.
        </p>

        <Link
          href="/contact"
          className="group mt-10 inline-flex items-center gap-4 border border-amber-200/70 bg-amber-100 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-stone-900 transition-all duration-300 hover:bg-white"
        >
          Contact Now
          <ArrowUpRight
            size={18}
            className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </Link>

      </div>
    </section>
  );
}
