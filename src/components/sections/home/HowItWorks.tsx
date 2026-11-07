
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
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function HowItWorks() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-[#FBF8F1] py-16 text-[#354B3B] md:py-20">
      {/* Background details */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-48 top-0 h-[500px] w-[500px] rounded-full border border-[#819078]/10" />
        <div className="absolute -right-32 top-16 h-[360px] w-[360px] rounded-full border border-[#819078]/10" />
        <div className="absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#B65F38]/[0.035] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-[700px] text-center"
        >
         

          <h2 className="font-serif text-[clamp(38px,5vw,64px)] leading-[1.08] tracking-[-0.04em]">
            From your first enquiry
            <br />
            to a <span className="italic text-[#B65F38]">sacred beginning.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-[540px] text-[13px] leading-[1.9] text-[#667467] sm:text-[14px]">
            Every ritual has its own significance. We make the arrangements
            simple, personal and carefully coordinated, one step at a time.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative mt-16 lg:mt-20">
          {/* Desktop connecting line */}
          <div className="absolute left-[12.5%] right-[12.5%] top-[31px] hidden h-px bg-[#819078]/25 lg:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.4,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full origin-left bg-[#B65F38]/60"
            />
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  key={step.number}
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    delay: reduceMotion ? 0 : index * 0.12,
                  }}
                  className="group relative"
                >
                  {/* Step marker */}
                  <div className="relative z-10 flex items-center justify-center">
                    <div className="flex h-[64px] w-[64px] items-center justify-center rounded-full border border-[#B65F38]/30 bg-[#FBF8F1] transition-all duration-500 group-hover:border-[#B65F38] group-hover:bg-[#B65F38]">
                      <Icon
                        size={23}
                        strokeWidth={1.35}
                        className="text-[#B65F38] transition-colors duration-500 group-hover:text-[#FFF8EF]"
                      />
                    </div>
                  </div>

                  {/* Step content */}
                  <div className="mt-7 text-center">
                    <span className="font-serif text-[12px] italic tracking-wide text-[#B65F38]">
                      STEP {step.number}
                    </span>

                    <h3 className="mx-auto mt-3 max-w-[250px] font-serif text-[23px] leading-[1.15] tracking-[-0.025em] text-[#354B3B]">
                      {step.title}
                    </h3>

                    <p className="mx-auto mt-4 max-w-[290px] text-[12px] leading-[1.9] text-[#667467] sm:text-[13px]">
                      {step.description}
                    </p>

                  
                  </div>

                  {/* Mobile timeline connector */}
                  {index !== steps.length - 1 && (
                    <div className="absolute left-1/2 top-[76px] h-[calc(100%+24px)] w-px -translate-x-1/2 bg-[#819078]/20 lg:hidden" />
                  )}
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Closing note */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-[#819078]/20 pt-8 sm:flex-row lg:mt-20"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#B65F38]/30">
              <Check size={16} className="text-[#B65F38]" />
            </div>
            <p className="text-[12px] leading-relaxed text-[#667467]">
              One point of contact. Every important detail taken care of.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B65F38]">
            <span>Your journey, made simpler</span>
            <ArrowUpRight size={14} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
