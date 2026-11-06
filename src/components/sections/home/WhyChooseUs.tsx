
"use client";

import { motion } from "framer-motion";
import {
  UsersRound,
  ReceiptText,
  HandHeart,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  Check,
  Compass,
} from "lucide-react";

const features = [
  {
    number: "01",
    title: "Gotra-Specific Purohits",
    description:
      "Every family has its own traditions. We help connect you with experienced purohits who understand your Gotra, customs and specific ritual requirements.",
    icon: UsersRound,
    detail: "Rooted in your traditions",
  },
  {
    number: "02",
    title: "Complete Transparency",
    description:
      "Know exactly what you are paying for. Get a clear breakdown of ritual arrangements, samagri and associated expenses before confirming your booking.",
    icon: ReceiptText,
    detail: "No unexpected expenses",
  },
  {
    number: "03",
    title: "End-to-End Assistance",
    description:
      "From your first conversation to the completion of your ceremony, we coordinate the arrangements and guide you through every important detail.",
    icon: HandHeart,
    detail: "Support at every step",
  },
  {
    number: "04",
    title: "Dedicated Ritual Monitoring",
    description:
      "We stay involved throughout the ceremony, helping coordinate arrangements and monitor the proceedings to ensure everything follows the agreed plan.",
    icon: ShieldCheck,
    detail: "Carefully coordinated rituals",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-[#F8F6F0] py-24 md:py-32">

      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-60 top-20 h-[500px] w-[500px] rounded-full border border-[#B58B4B]/[0.08]" />
      <div className="pointer-events-none absolute -left-40 top-40 h-[350px] w-[350px] rounded-full border border-[#B58B4B]/[0.08]" />

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">

        {/* SECTION INTRO */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="flex flex-col justify-between"
          >
            <div>
              <div className="mb-7 flex items-center gap-3">
                <span className="h-px w-9 bg-[#AD8249]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#A47B40]">
                  The Tirthvaani Difference
                </span>
              </div>

              <h2 className="font-serif text-[43px] leading-[1.08] tracking-[-0.035em] text-[#30291F] sm:text-5xl lg:text-[65px]">
                Your faith
                <br />
                deserves
                <br />
                <span className="italic text-[#A67B42]">
                  thoughtful care.
                </span>
              </h2>

              <p className="mt-8 max-w-[410px] text-[14px] leading-[2] text-[#777064] md:text-[15px]">
                Sacred rituals deserve more than arrangements.
                They deserve understanding, attention and respect
                for the traditions that make them meaningful.
                At Tirthvaani, we bring every detail together
                so you can focus on what truly matters.
              </p>
            </div>

            {/* Trust statement */}
            <div className="mt-12 flex items-center gap-5 border-t border-[#DED6C9] pt-7 lg:mt-16">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#C5A574]/50">
                <Sparkles
                  size={19}
                  strokeWidth={1.3}
                  className="text-[#A47B40]"
                />
              </div>

              <div>
                <p className="font-serif text-lg text-[#40372B]">
                  Tradition, with care.
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.17em] text-[#898174]">
                  Every detail matters
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE - FEATURE CARDS */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.number}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.09,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative flex min-h-[290px] flex-col overflow-hidden border border-[#E5DED1] bg-[#FCFAF5] p-7 transition-all duration-500 hover:border-[#C8AB7C] hover:bg-white md:p-8"
                >

                  {/* Number */}
                  <div className="flex items-start justify-between">
                    <span className="font-serif text-[13px] italic text-[#AD8A56]">
                      {feature.number}
                    </span>

                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E5DCCB] bg-[#F8F4EB] transition-all duration-500 group-hover:border-[#B28C55] group-hover:bg-[#B28C55]">
                      <Icon
                        size={19}
                        strokeWidth={1.4}
                        className="text-[#A47B40] transition-colors duration-500 group-hover:text-white"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mt-auto pt-12">
                    <h3 className="font-serif text-[25px] leading-tight tracking-[-0.02em] text-[#30291F] md:text-[27px]">
                      {feature.title}
                    </h3>

                    <p className="mt-4 text-[12px] leading-[1.95] text-[#777064] md:text-[13px]">
                      {feature.description}
                    </p>

                    <div className="mt-6 flex items-center gap-2">
                      <span className="h-px w-5 bg-[#B58B4B] transition-all duration-500 group-hover:w-9" />
                      <span className="text-[9px] font-medium uppercase tracking-[0.17em] text-[#A47B40]">
                        {feature.detail}
                      </span>
                    </div>
                  </div>

                  {/* Decorative hover detail */}
                  <div className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full border border-[#B58B4B]/10 transition-transform duration-700 group-hover:scale-150" />

                </motion.div>
              );
            })}

          </div>
        </div>

        {/* BOTTOM BRAND STATEMENT */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="relative mt-20 overflow-hidden bg-[#293B30] px-7 py-12 md:mt-24 md:px-14 md:py-14 lg:px-16"
        >

          {/* Decorative rings */}
          <div className="pointer-events-none absolute -right-16 -top-36 h-[390px] w-[390px] rounded-full border border-[#D9BD8D]/15" />
          <div className="pointer-events-none absolute -right-4 -top-24 h-[270px] w-[270px] rounded-full border border-[#D9BD8D]/15" />
          <div className="pointer-events-none absolute -right-16 -top-10 h-[150px] w-[150px] rounded-full border border-[#D9BD8D]/10" />

          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto]">

            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-[#D9BD8D]" />
                <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#D9BD8D]">
                  More than just rituals
                </span>
              </div>

              <h3 className="max-w-[780px] font-serif text-[36px] leading-[1.13] tracking-[-0.025em] text-[#F8F5EC] md:text-5xl lg:text-[57px]">
                Everything your sacred
                <br className="hidden sm:block" />
                journey needs,{" "}
                <span className="italic text-[#D9BD8D]">
                  in one place.
                </span>
              </h3>

              <p className="mt-6 max-w-[620px] text-[13px] leading-[2] text-white/65 md:text-[14px]">
                From finding the right purohit and arranging sacred
                ceremonies to travel, accommodation and on-ground
                assistance — Tirthvaani brings your entire pilgrimage
                experience together.
              </p>

              {/* Service highlights */}
              <div className="mt-8 flex flex-wrap gap-x-7 gap-y-4">
                {[
                  "Ritual arrangements",
                  "Trusted purohits",
                  "Travel assistance",
                  "Accommodation",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2"
                  >
                    <Check
                      size={13}
                      strokeWidth={1.8}
                      className="text-[#D9BD8D]"
                    />
                    <span className="text-[10px] tracking-wide text-white/75">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative emblem */}
            <div className="relative hidden h-36 w-36 shrink-0 items-center justify-center lg:flex">
              <div className="absolute inset-0 rounded-full border border-[#D9BD8D]/30" />
              <div className="absolute inset-3 rounded-full border border-[#D9BD8D]/20" />
              <div className="absolute inset-6 rounded-full border border-[#D9BD8D]/20" />
              <Compass
                size={46}
                strokeWidth={0.8}
                className="text-[#D9BD8D]"
              />
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
