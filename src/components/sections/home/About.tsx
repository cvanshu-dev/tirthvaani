"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

export function About() {
  const imageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <section className="relative overflow-hidden bg-[#FBF8F1] px-[6%] py-14 text-[#354B3B] sm:py-16 lg:py-20">
      {/* Background detail */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-[#819078]/[0.07]"
      />

      <div className="relative mx-auto grid w-full max-w-[1440px] items-center gap-8 md:grid-cols-[0.95fr_1.05fr] md:gap-16 lg:gap-20 xl:gap-[96px]">
        {/* IMAGE */}
        <motion.div
          ref={imageRef}
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease }}
          className="relative w-full"
        >
          <div className="group relative h-[340px] overflow-hidden rounded-[3px_76px_3px_3px] bg-[#354B3B] sm:h-[420px] md:h-[460px] lg:h-[510px] xl:h-[540px]">
            <motion.div
              className="absolute inset-0"
              style={{ y: reducedMotion ? 0 : imageY }}
            >
              <Image
                src="/hero.jpg"
                alt="Ganga Aarti beside the River Ganga in Varanasi"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 48vw"
                className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.045]"
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#18271E]/75 via-[#18271E]/10 to-transparent" />

          
            <div className="absolute bottom-7 left-6 right-6 sm:bottom-9 sm:left-8 sm:right-8">
             

              <h3 className="font-serif text-[clamp(4rem,7vw,6.5rem)] leading-[0.85] tracking-[-0.06em] text-white">
                Kashi<span className="text-[#B65F38]">.</span>
              </h3>

              <div className="mt-5 flex items-center gap-4">
                <span className="text-[9px] tracking-[0.23em] text-white/85">
                  VARANASI
                </span>
                <span className="h-px w-12 bg-white/50" />
                <span className="text-[9px] tracking-[0.2em] text-white/65">
                  INDIA
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CONTENT */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.12 }}
          className="relative flex w-full min-w-0 flex-col justify-center md:py-2"
        >
          {/* Eyebrow */}
          <motion.div
            variants={reveal}
            className="mb-5 flex flex-wrap items-center gap-3"
          >
            
         
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={reveal}
            className="max-w-[650px] font-serif text-[clamp(2.7rem,4.7vw,5rem)] leading-[0.98] tracking-[-0.055em] text-[#354B3B]"
          >
            Culturally and
            <span className="block italic text-[#B65F38]">
              spiritually
            </span>
            rooted in Kashi.
          </motion.h2>

          {/* Decorative divider */}
          <motion.div
            variants={reveal}
            className="my-6 flex items-center gap-2"
          >
            <span className="h-[2px] w-12 bg-[#B65F38]" />
            <span className="h-[2px] w-5 bg-[#819078]/70" />
            <span className="h-[2px] w-2 bg-[#819078]/35" />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={reveal}
            className="mb-4 w-full font-serif text-[14px] leading-[1.85] text-[#667467] sm:text-[15px] lg:text-[16px]"
          >
            Varanasi, one of India&apos;s most sacred cities, is deeply rooted
            in ancient traditions and spiritual wisdom. Revered as the city
            of Lord Shiva, Kashi holds a timeless place in the journey
            towards spiritual liberation and moksha.
          </motion.p>

          <motion.p
            variants={reveal}
            className="mb-7 max-w-[590px] font-serif text-[14px] leading-[1.85] text-[#667467] sm:text-[15px] lg:text-[16px]"
          >
            At Tirth Kshetra Purohit, we connect devotees with experienced
            Pandits and Purohits for authentic Vedic homams, pujas and sacred
            rituals in Kashi, helping preserve traditions and make every
            spiritual journey meaningful.
          </motion.p>

          {/* CTA */}
          <motion.div variants={reveal}>
            <Link
              href="/about-us"
              className="group inline-flex items-center gap-5 rounded-full bg-[#B65F38] py-2 pl-6 pr-2 text-[#FFF8EF] shadow-[0_6px_18px_rgba(53,75,59,0.10)] transition-all duration-500 hover:-translate-y-1 hover:bg-[#A95130] hover:shadow-[0_12px_25px_rgba(53,75,59,0.16)]"
            >
              <span className="font-serif text-[15px]">
                More About Us
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 transition-all duration-500 group-hover:rotate-45 group-hover:bg-white/10">
                <ArrowUpRight size={17} strokeWidth={1.5} />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}