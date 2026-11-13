import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const benefits = [
  "Experienced pandits and purohits",
  "Traditional Vedic mantras and procedures",
  "Homam samagri arranged for your ceremony",
  "Support for individual and family occasions",
];

export function HomamPage() {
  return (
    <main className="overflow-hidden bg-[#faf3ea] text-[#35281e]">
      <section className="relative min-h-[440px] overflow-hidden md:min-h-[560px]">
        <Image
          src="/pitru.webp"
          alt="Traditional sacred fire ceremony in Varanasi"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#21160f]/60" />
        <div className="relative mx-auto flex min-h-[440px] max-w-5xl items-center px-5 py-20 text-center text-[#fff8ed] md:min-h-[560px] md:px-12">
          <div className="mx-auto">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-[#e2b47d]">
              Sacred Fire Ceremony
            </p>
            <h1 className="font-serif text-6xl font-normal tracking-[-2px] md:text-8xl">
              Homam
            </h1>
            <p className="mx-auto mt-7 max-w-2xl font-serif text-lg leading-8 text-[#f0dfcc] md:text-xl">
              Offer prayers through the sacred fire and seek divine blessings
              with a traditional Homam arranged in the holy city of Kashi.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-12 lg:px-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#a96835]">
              Havan and Homam in Varanasi
            </p>
            <h2 className="font-serif text-5xl font-normal leading-[1.05] tracking-[-2px] md:text-7xl">
              A sacred offering
              <em className="block text-[#bd8146]">through divine fire</em>
            </h2>
            <div className="my-8 flex w-24 items-center gap-2">
              <span className="h-px flex-1 bg-[#ae7845]" />
              <span className="h-2 w-2 rotate-45 bg-[#ae7845]" />
              <span className="h-px flex-1 bg-[#ae7845]" />
            </div>
            <div className="space-y-5 font-serif text-base leading-7 text-[#66584e] md:text-lg">
              <p>
                Homam is a Vedic fire ceremony in which sacred offerings are
                made into consecrated fire while mantras are recited. It is
                performed with devotion for peace, prosperity, protection, and
                spiritual well-being.
              </p>
              <p>
                Every ceremony can be arranged according to your family
                tradition, purpose, and chosen deity. Our team helps coordinate
                the pandit, samagri, venue, and other essential details.
              </p>
            </div>
          </div>

          <div className="rounded-[30px] bg-[#38271d] p-8 text-[#fff8ed] shadow-xl md:p-12">
            <p className="mb-7 text-xs font-semibold uppercase tracking-[0.3em] text-[#d9a66d]">
              What we arrange
            </p>
            <ul className="space-y-5">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-4">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#d9a66d] text-[#d9a66d]">
                    <Check size={14} />
                  </span>
                  <span className="font-serif text-lg text-[#eadbca]">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-3 rounded-full border border-[#d9a66d] px-7 py-3 font-serif transition hover:bg-[#d9a66d] hover:text-[#38271d]"
            >
              Plan your Homam
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f3e8da] px-5 py-20 text-center md:px-12 lg:px-24 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-[#a96835]">
            Begin with devotion
          </p>
          <h2 className="font-serif text-5xl font-normal md:text-6xl">
            Let us help you prepare
          </h2>
          <p className="mx-auto mt-6 font-serif text-lg leading-8 text-[#796d60]">
            Share your requirements with us, and we will help you arrange a
            meaningful Homam in Varanasi.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#38271d] px-8 py-4 font-serif text-[#fff8ed] transition hover:bg-[#a95731]"
          >
            Contact TirthVaani
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
