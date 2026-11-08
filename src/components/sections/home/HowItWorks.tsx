
"use client";

import { useReducedMotion, motion } from "framer-motion";
import {
  ClipboardList,
  SearchCheck,
  CalendarCheck,
  HandHeart,
  ArrowUpRight,
  Check,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Tell Us What You Need",
    description:
      "Start by filling out a simple enquiry form. Share the ritual you have in mind, your preferred location, dates and any specific requirements.",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "We Understand Your Needs",
    description:
      "Our team reviews your requirements, family traditions, Gotra and ceremony details to understand exactly what your sacred occasion calls for.",
    icon: SearchCheck,
  },
  {
    number: "03",
    title: "We Plan Your Ritual",
    description:
      "We identify a suitable purohit and coordinate the necessary arrangements, including samagri, travel and accommodation wherever needed.",
    icon: CalendarCheck,
  },
  {
    number: "04",
    title: "You're Ready to Begin",
    description:
      "Once you review and confirm the arrangements, we guide and assist you through the ceremony so you can focus on what truly matters.",
    icon: HandHeart,
  },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function HowItWorks() {
  const reduceMotion = useReducedMotion();

  const motionInitial = reduceMotion ? false : "hidden";

  return (
    <section className="relative isolate overflow-hidden bg-[#FBF8F1] py-14 text-[#354B3B] sm:py-16 md:py-20 lg:py-24">

      {/* Background details */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-48 top-0 hidden h-[500px] w-[500px] rounded-full border border-[#819078]/10 sm:block" />

        <div className="absolute -right-32 top-16 hidden h-[360px] w-[360px] rounded-full border border-[#819078]/10 md:block" />

        <div className="absolute -left-40 bottom-0 h-[300px] w-[300px] rounded-full bg-[#B65F38]/[0.035] blur-[90px] sm:h-[420px] sm:w-[420px]" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-7 md:px-10 lg:px-16">

        {/* Header */}
        <motion.div
          variants={reveal}
          initial={motionInitial}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-[700px] text-center"
        >
          <h2 className="font-serif text-[clamp(32px,6vw,64px)] leading-[1.12] tracking-[-0.04em] sm:text-[clamp(40px,5vw,64px)]">
            From your first enquiry
            <br className="hidden sm:block" />
            <span className="block sm:inline">
              {" "}to a{" "}
            </span>
            <span className="italic text-[#B65F38]">
              sacred beginning.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-[540px] text-[12px] leading-[1.85] text-[#667467] sm:mt-6 sm:text-[14px] sm:leading-[1.9]">
            Every ritual has its own significance. We make the arrangements
            simple, personal and carefully coordinated, one step at a time.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative mt-12 sm:mt-14 lg:mt-20">

          {/* Desktop connecting line */}
          <div className="absolute left-[12.5%] right-[12.5%] top-[31px] hidden h-px bg-[#819078]/25 lg:block">
            <motion.div
              initial={reduceMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: reduceMotion ? 0 : 1.4,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full origin-left bg-[#B65F38]/60"
            />
          </div>

          {/* Responsive grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-7 sm:gap-y-12 lg:grid-cols-4 lg:gap-7">

            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === steps.length - 1;

              return (
                <motion.article
                  key={step.number}
                  variants={reveal}
                  initial={motionInitial}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    delay: reduceMotion ? 0 : index * 0.1,
                  }}
                  className="group relative flex min-w-0 items-start gap-4 sm:gap-5 lg:block"
                >

                  {/* Mobile connecting line */}
                  {!isLast && (
                    <div className="absolute left-[27px] top-[64px] h-[calc(100%+2rem)] w-px bg-gradient-to-b from-[#B65F38]/40 via-[#819078]/25 to-[#819078]/10 lg:hidden" />
                  )}

                  {/* Icon marker */}
                  <div className="relative z-10 flex shrink-0 items-center justify-center lg:mx-auto">
                    <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full border border-[#B65F38]/30 bg-[#FBF8F1] transition-all duration-500 group-hover:border-[#B65F38] group-hover:bg-[#B65F38] sm:h-[64px] sm:w-[64px]">

                      <Icon
                        size={21}
                        strokeWidth={1.4}
                        className="text-[#B65F38] transition-colors duration-500 group-hover:text-[#FFF8EF] sm:h-[23px] sm:w-[23px]"
                      />
                    </div>
                  </div>

                  {/* Step content */}
                  <div className="min-w-0 flex-1 pb-1 text-left lg:mt-7 lg:text-center">

                    <span className="font-serif text-[11px] italic tracking-wide text-[#B65F38] sm:text-[12px]">
                      STEP {step.number}
                    </span>

                    <h3 className="mt-1.5 max-w-[280px] font-serif text-[19px] leading-[1.2] tracking-[-0.025em] text-[#354B3B] sm:text-[21px] lg:mx-auto lg:mt-3 lg:text-[23px] lg:leading-[1.15]">
                      {step.title}
                    </h3>

                    <p className="mt-2 max-w-[420px] text-[12px] leading-[1.75] text-[#667467] sm:text-[13px] sm:leading-[1.85] lg:mx-auto lg:mt-4 lg:max-w-[290px] lg:leading-[1.9]">
                      {step.description}
                    </p>

                  </div>
                </motion.article>
              );
            })}

          </div>
        </div>

        {/* Closing note */}
        <motion.div
          variants={reveal}
          initial={motionInitial}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 flex flex-col items-start gap-4 border-t border-[#819078]/20 pt-6 sm:mt-14 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:pt-8 lg:mt-20"
        >

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#B65F38]/30">
              <Check size={16} className="text-[#B65F38]" />
            </div>

            <p className="text-[11px] leading-relaxed text-[#667467] sm:text-[12px]">
              One point of contact. Every important detail taken care of.
            </p>
          </div>

          <div className="flex items-center gap-2 pl-12 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#B65F38] sm:pl-0 sm:text-[10px] sm:tracking-[0.18em]">
            <span>Your journey, made simpler</span>
            <ArrowUpRight size={14} />
          </div>

        </motion.div>

      </div>
    </section>
  );
}
