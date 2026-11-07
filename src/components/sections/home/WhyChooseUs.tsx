"use client";

import { useReducedMotion, motion } from "framer-motion";
import {
  UsersRound,
  ReceiptText,
  HandHeart,
  ShieldCheck,
  Sparkles,
  Check,
  Compass,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    number: "01",
    title: "Gotra-Specific Purohits",
    description:
      "Every family has its own traditions. We connect you with experienced purohits who understand your Gotra, customs and specific ritual requirements.",
    icon: UsersRound,
    
  },
  {
    number: "02",
    title: "Complete Transparency",
    description:
      "Know exactly what you are paying for. Get a clear breakdown of ritual arrangements, samagri and associated expenses before confirming your booking.",
    icon: ReceiptText,
  
  },
  {
    number: "03",
    title: "End-to-End Assistance",
    description:
      "From your first conversation to the completion of your ceremony, we coordinate arrangements and guide you through every important detail.",
    icon: HandHeart,
  
  },
  {
    number: "04",
    title: "Dedicated Ritual Monitoring",
    description:
      "We stay involved throughout the ceremony, helping coordinate arrangements and monitor the proceedings to ensure everything follows the agreed plan.",
    icon: ShieldCheck,
  
  },
];

const highlights = [
  "Ritual arrangements",
  "Trusted purohits",
  "Travel assistance",
  "Accommodation",
];

const reveal = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function WhyChooseUs() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-[#FBF8F1] py-16 text-[#354B3B] md:py-20">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-[260px] top-[5%] h-[620px] w-[620px] rounded-full border border-[#819078]/[0.13]" />
        <div className="absolute -left-[190px] top-[12%] h-[480px] w-[480px] rounded-full border border-[#819078]/[0.13]" />
        <div className="absolute -right-[300px] top-[38%] h-[620px] w-[620px] rounded-full border border-[#B65F38]/[0.08]" />

        <div className="absolute right-[8%] top-[10%] h-[280px] w-[280px] rounded-full bg-[#B65F38]/[0.035] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        {/* MAIN SECTION */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12 xl:gap-16">
          {/* LEFT INTRO */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex h-full flex-col justify-between"
          >
            <div>
              {/* Eyebrow */}
              <div className="mb-7 flex items-center gap-3">
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: 36 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="h-px bg-[#B65F38]"
                />


              </div>

              {/* Heading */}
              <h2 className="max-w-[560px] font-serif text-[clamp(42px,5vw,72px)] leading-[1.04] tracking-[-0.045em] text-[#354B3B]">
                Your faith deserves{" "}
                <span className="relative inline-block italic text-[#B65F38]">
                  thoughtful care.
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.9,
                      delay: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute -bottom-2 left-0 h-px w-full origin-left bg-[#B65F38]/45"
                  />
                </span>
              </h2>

              <p className="mt-8 max-w-[490px] text-[13px] leading-[2] text-[#667467] sm:text-[14px] lg:text-[15px]">
                Sacred rituals deserve more than arrangements. They
                deserve understanding, attention and respect for the
                traditions that make them meaningful. At Tirthvaani,
                we bring every detail together so you can focus on
                what truly matters.
              </p>
            </div>

            {/* Trust statement */}
            <div className="mt-8 flex items-center gap-4 border-t border-[#819078]/25 pt-5 sm:mt-10 lg:mt-12">
              
            
                
             

            </div>
          </motion.div>

          {/* RIGHT FEATURE GRID */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.08,
                },
              },
            }}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
          >
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <motion.article
                  key={feature.number}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 30,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -6,
                          transition: {
                            duration: 0.3,
                            ease: "easeOut",
                          },
                        }
                  }
                  className="group relative flex min-h-[215px] flex-col overflow-hidden border border-[#819078]/25 bg-white/55 p-5 transition-colors duration-500 hover:border-[#B65F38]/45 hover:bg-white/85 sm:min-h-[225px] sm:p-6 lg:p-6"
                >
                  {/* Subtle hover glow */}
                  <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#B65F38]/[0.045] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />

                  {/* Card top */}
                  <div className="relative flex items-start justify-between">
                    <span className="font-serif text-[14px] italic text-[#819078]">
                      {feature.number}
                    </span>

                    <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#B65F38]/25 bg-[#B65F38]/[0.06] transition-all duration-500 group-hover:border-[#B65F38] group-hover:bg-[#B65F38]">
                      <Icon
                        size={19}
                        strokeWidth={1.35}
                        className="text-[#B65F38] transition-colors duration-500 group-hover:text-[#FFF8EF]"
                      />
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="relative mt-auto pt-8">
                    <h3 className="max-w-[280px] font-serif text-[24px] leading-[1.12] tracking-[-0.025em] text-[#354B3B] sm:text-[25px] lg:text-[27px]">
                      {feature.title}
                    </h3>

                    <p className="mt-4 text-[12px] leading-[1.85] text-[#667467] sm:text-[12.5px]">
                      {feature.description}
                    </p>

                    {/* Bottom detail */}
            
                  </div>

                  {/* Decorative corner rings */}
                  <div className="pointer-events-none absolute -bottom-14 -right-14 h-32 w-32 rounded-full border border-[#819078]/15 transition-transform duration-700 group-hover:scale-125" />
                  <div className="pointer-events-none absolute -bottom-10 -right-10 h-24 w-24 rounded-full border border-[#819078]/10 transition-transform duration-700 group-hover:scale-125" />
                </motion.article>
              );
            })}
          </motion.div>
        </div>

        {/* BOTTOM BRAND STATEMENT */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          variants={reveal}
          className="relative mt-10 overflow-hidden bg-[#354B3B] px-6 py-7 sm:mt-12 sm:px-9 sm:py-8 lg:mt-12 lg:px-12 lg:py-9"
        >
          {/* Background details */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-24 -top-44 h-[420px] w-[420px] rounded-full border border-[#FFF8EF]/[0.12]" />
            <div className="absolute -right-8 -top-28 h-[300px] w-[300px] rounded-full border border-[#FFF8EF]/[0.12]" />
            <div className="absolute right-12 -top-12 h-[190px] w-[190px] rounded-full border border-[#FFF8EF]/[0.10]" />
            <div className="absolute -left-24 -bottom-40 h-[300px] w-[300px] rounded-full bg-[#B65F38]/[0.10] blur-[80px]" />
          </div>

          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
            {/* Closing message */}
            <div>
              <div className="mb-6 flex items-center gap-3">
            
              </div>

              <h3 className="max-w-[800px] font-serif text-[clamp(34px,4.4vw,58px)] leading-[1.1] tracking-[-0.035em] text-[#FFF8EF]">
                Everything your sacred journey needs,{" "}
                <span className="italic text-[#E5A080]">
                  in one place.
                </span>
              </h3>

              <p className="mt-6 max-w-[650px] text-[12px] leading-[1.9] text-white/70 sm:text-[13px] sm:leading-[2]">
                From finding the right purohit and arranging sacred
                ceremonies to travel, accommodation and on-ground
                assistance — Tirthvaani brings your entire pilgrimage
                experience together.
              </p>

              {/* Service highlights */}
              <div className="mt-8 flex flex-wrap gap-x-7 gap-y-4">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + index * 0.08,
                    }}
                    className="flex items-center gap-2"
                  >
                    <Check
                      size={13}
                      strokeWidth={1.8}
                      className="text-[#E5A080]"
                    />
                    <span className="text-[10px] tracking-wide text-white/80">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Decorative emblem */}
            <div className="relative mx-auto hidden h-40 w-40 shrink-0 items-center justify-center lg:flex">
              <motion.div
                animate={
                  reduceMotion ? undefined : { rotate: 360 }
                }
                transition={{
                  duration: 50,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full border border-dashed border-[#FFF8EF]/30"
              />

              <div className="absolute inset-3 rounded-full border border-[#FFF8EF]/20" />
              <div className="absolute inset-7 rounded-full border border-[#FFF8EF]/15" />

              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : { rotate: [0, 5, 0, -5, 0] }
                }
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Compass
                  size={48}
                  strokeWidth={0.8}
                  className="text-[#E5A080]"
                />
              </motion.div>

              <div className="absolute right-1 top-5 h-2 w-2 rounded-full bg-[#E5A080]" />
              <div className="absolute bottom-5 left-1 h-1.5 w-1.5 rounded-full bg-[#E5A080]/70" />
            </div>
          </div>

          {/* Bottom decorative line */}
          <div className="relative mt-10 h-px w-full bg-white/15">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-px w-full origin-left bg-[#E5A080]/70"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}