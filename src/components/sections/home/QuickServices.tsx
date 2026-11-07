
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight, MoveDown } from "lucide-react";

const BRAND = {
  background: "#FBF8F1",
  green: "#354B3B",
  bhagwa: "#B65F38",
  eyebrow: "#71816D",
  paragraph: "#667467",
  muted: "#819078",
  light: "#FFF8EF",
  border: "#819078",
};

const services = [
  {
   
   
    name: "Pind Daan",
    subtitle: "Honour the roots that made you.",
    description:
      "A sacred offering in remembrance of ancestors. We help arrange experienced purohits, traditional samagri and the ritual details that make the ceremony meaningful.",
    image: "/pitru-rituals.png",
    href: "/services/pind-daan",
   
  
  },
  {
   
    name: "Asthi Visarjan",
    subtitle: "A meaningful farewell, guided with care.",
    description:
      "A deeply personal journey to sacred waters. From choosing the right destination to arranging the ceremony, every detail is handled with dignity.",
    image: "/astiv.png",
    href: "/services/asthi-visarjan",

  },
  {
   
    name: "Rudrabhishek",
    subtitle: "An offering in devotion to Mahadev.",
    description:
      "Perform the sacred abhishek of Lord Shiva with traditional offerings, knowledgeable purohits and guidance through each step of the puja.",
    image: "/Rudrabhishek.png",
    href: "/services/rudra-abhishek",

  },
  {
  
    name: "Anna Daan",
    subtitle: "Let generosity become your offering.",
    description:
      "An act of giving rooted in compassion. We help coordinate food offerings and arrangements so your daan can be performed with care and purpose.",
    image: "/anna.png",
    href: "/services/anna-daan",
   
  },
];

const stops = [0, 1 / 3, 2 / 3, 1];

const springConfig = {
  stiffness: 115,
  damping: 28,
  mass: 0.28,
};

function getPositions(index: number) {
  return stops.map((_, active) => {
    if (index === active) {
      return {
        y: 0,
        scale: 1,
        opacity: 1,
        rotate: 0,
        rotateX: 0,
      };
    }

    if (index > active) {
      const depth = index - active;

      return {
        y: 17 + (depth - 1) * 13,
        scale: 0.975 - (depth - 1) * 0.018,
        opacity: 1,
        rotate: depth % 2 === 0 ? 0.35 : -0.2,
        rotateX: 0,
      };
    }

    const depth = active - index;

    return {
      y: -75 - (depth - 1) * 18,
      scale: 0.91 - (depth - 1) * 0.025,
      opacity: Math.max(0.12, 0.42 - (depth - 1) * 0.13),
      rotate: depth % 2 === 0 ? -0.5 : 0.3,
      rotateX: -1.2,
    };
  });
}

function DeckCard({
  service,
  index,
  progress,
  activeIndex,
}: {
  service: (typeof services)[number];
  index: number;
  progress: MotionValue<number>;
  activeIndex: number;
}) {
  const reducedMotion = useReducedMotion();
  const positions = getPositions(index);

  const y = useTransform(
    progress,
    stops,
    positions.map((p) => p.y)
  );

  const scale = useTransform(
    progress,
    stops,
    positions.map((p) => p.scale)
  );

  const opacity = useTransform(
    progress,
    stops,
    positions.map((p) => p.opacity)
  );

  const rotate = useTransform(
    progress,
    stops,
    positions.map((p) => p.rotate)
  );

  const rotateX = useTransform(
    progress,
    stops,
    positions.map((p) => p.rotateX)
  );

  const isActive = index === activeIndex;

  return (
    <motion.div
      className="absolute inset-0 origin-top"
      style={{
        y: reducedMotion ? 0 : y,
        scale: reducedMotion ? 1 : scale,
        opacity: reducedMotion ? (isActive ? 1 : 0.9) : opacity,
        rotate: reducedMotion ? 0 : rotate,
        rotateX: reducedMotion ? 0 : rotateX,
        transformPerspective: 1400,
        transformStyle: "preserve-3d",
        zIndex: isActive ? 100 : index < activeIndex ? 10 + index : 50 - index,
        pointerEvents: isActive ? "auto" : "none",
      }}
    >
      {/* Physical layers behind each card */}
      <div
        className="absolute inset-0 rounded-[5px] border border-[#819078]/20 bg-[#EDEFE7]"
        style={{
          transform: "translate3d(0, 13px, -18px) scale(0.985)",
          boxShadow: "0 15px 35px rgba(53,75,59,0.08)",
        }}
      />

      <div
        className="absolute inset-0 rounded-[5px] border border-[#819078]/15 bg-[#F3F3EB]"
        style={{
          transform: "translate3d(0, 7px, -9px) scale(0.993)",
        }}
      />

      {/* Main card */}
      <article
        className="relative h-full w-full overflow-hidden rounded-[5px] border border-[#819078]/25 bg-[#FBF8F1]"
        style={{
          boxShadow: isActive
            ? "0 35px 90px rgba(53,75,59,0.14), 0 8px 20px rgba(53,75,59,0.07), inset 0 1px 0 rgba(255,255,255,0.7)"
            : "0 15px 35px rgba(53,75,59,0.08)",
        }}
      >
        <div className="grid h-full grid-cols-1 md:grid-cols-[1.04fr_0.96fr]">
          {/* Photography */}
          <div className="group relative min-h-[220px] overflow-hidden md:min-h-0">
            <Image
              src={service.image}
              alt={service.name}
              fill
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.04]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#18271E]/75 via-[#18271E]/5 to-[#18271E]/15" />

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#18271E]/10" />

            {/* Fine image frame */}
            <div className="pointer-events-none absolute inset-4 border border-white/20 md:inset-6" />

            <div className="absolute left-7 top-7 flex items-center gap-3 md:left-10 md:top-10">
              <span
                className="h-[2px] w-8"
                style={{ backgroundColor: BRAND.bhagwa }}
              />

              
            </div>

          

            <div className="absolute right-7 top-7 h-2 w-2 rounded-full border border-white/70 md:right-10 md:top-10" />
          </div>

          {/* Editorial content */}
          <div className="relative flex flex-col justify-between overflow-hidden p-6 sm:p-9 md:p-11 lg:p-14">
            {/* Quiet ornamental background */}
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#819078]/15"
              style={{
                boxShadow:
                  "0 0 0 22px rgba(129,144,120,0.025), 0 0 0 44px rgba(129,144,120,0.02)",
              }}
            />

            <div className="relative">
            

              <div className="mt-6 md:mt-9">
                <h3 className="font-serif text-[clamp(2.8rem,5vw,5.2rem)] leading-[0.94] tracking-[-0.055em] text-[#354B3B]">
                  {service.name}
                </h3>

                <p className="mt-3 font-serif text-lg italic text-[#B65F38] md:text-xl">
                  {service.subtitle}
                </p>

                <div className="my-8 flex items-center gap-3">
                  <span className="h-[2px] w-12 bg-[#B65F38]" />
                  <span className="h-[2px] w-2 bg-[#B65F38]/35" />
                  <span className="h-[2px] w-2 bg-[#B65F38]/20" />
                </div>

                <p className="max-w-[390px] text-[13px] leading-[1.8] text-[#667467] md:text-[14px]">
                  {service.description}
                </p>
              </div>
            </div>

            <div className="relative mt-7 flex items-end justify-between gap-5">
              <Link
                href={service.href}
                tabIndex={isActive ? 0 : -1}
                className="group inline-flex items-center gap-4 border-b border-[#B65F38]/60 pb-3 text-[10px] tracking-[0.2em] text-[#354B3B] transition-colors duration-300 hover:border-[#B65F38] hover:text-[#B65F38]"
              >
                DISCOVER THIS RITUAL

                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>

            
            </div>

            <div className="pointer-events-none absolute bottom-0 right-0 h-24 w-24 border-b border-r border-[#819078]/25" />
          </div>
        </div>
      </article>
    </motion.div>
  );
}

export function QuickServices() {
  const stackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  // Smooth out small scroll fluctuations without hijacking native scrolling.
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = Math.min(
      services.length - 1,
      Math.max(0, Math.round(latest * (services.length - 1)))
    );

    setActiveIndex((previous) => (previous === next ? previous : next));
  });

  const progressWidth = useTransform(
    smoothProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <section className="relative overflow-clip bg-[#FBF8F1] text-[#354B3B]">
      {/* Paper-like background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(#71816D 0.6px, transparent 0.6px)",
          backgroundSize: "17px 17px",
        }}
      />

      {/* Intro */}
      <div className="relative w-full px-[6%] max-lg:px-[5%] max-md:px-[6%] pb-14 pt-24 md:pb-20 md:pt-32">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
           

            <h2 className="font-serif text-[clamp(3rem,7vw,6.8rem)] leading-[0.91] tracking-[-0.06em] text-[#354B3B]">
              Sacred acts.
              <br />
              <span className="italic text-[#B65F38]">
                Lasting meaning.
              </span>
            </h2>
          </div>

         {/*} <div className="max-w-[275px] pb-1">
            <p className="text-[13px] leading-[1.7] text-[#667467]">
              Four meaningful traditions. Each with its own story, purpose
              and place in the journey.
            </p>

          
          </div>*/}
        </div>
      </div>

      {/* Scroll-driven stack */}
      <div
        ref={stackRef}
        className="relative"
        style={{ height: `${services.length * 100}svh` }}
      >
       <div className="sticky top-0 flex h-[100svh] items-center justify-center px-[6%] md:px-[4%] lg:px-[5%] min-[1440px]:px-[6%]">
  <div className="relative h-[min(66vh,620px)] min-h-[440px] w-full max-w-[1440px]">
            {/* Cards */}
            {services.map((service, index) => (
              <DeckCard
               key={service.href}
                service={service}
                index={index}
                progress={smoothProgress}
                activeIndex={activeIndex}
              />
            ))}

            {/* Stage progress marker */}
            <div className="absolute -bottom-9 left-0 right-0 flex items-center justify-between">
              <span className="text-[9px] tracking-[0.2em] text-[#71816D]">
               
              </span>

              <div className="flex items-center gap-3">
                <span className="font-serif text-sm text-[#354B3B]">
                
                </span>

                <div className="h-px w-16 overflow-hidden bg-[#819078]/30">
                  <motion.div
                    className="h-full bg-[#B65F38]"
                    style={{ width: progressWidth }}
                  />
                </div>

               
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Closing */}
     
    </section>
  );
}
