
"use client";

import { useReducedMotion, motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
} from "lucide-react";



const petals = Array.from({ length: 16 }, (_, i) => i);
const rays = Array.from({ length: 72 }, (_, i) => i);

function BookingChakra() {
  return (
    <svg
      viewBox="0 0 800 800"
      fill="none"
      className="h-full w-full overflow-visible"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="bookingChakraCore">
          <stop offset="0%" stopColor="#FFF3D0" stopOpacity=".95" />
          <stop offset="38%" stopColor="#E9AD50" stopOpacity=".35" />
          <stop offset="100%" stopColor="#D59A3B" stopOpacity="0" />
        </radialGradient>

        <linearGradient
          id="bookingChakraGold"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#F9D99B" />
          <stop offset="50%" stopColor="#C48627" />
          <stop offset="100%" stopColor="#F5D18B" />
        </linearGradient>

        <filter id="bookingChakraGlow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Central golden aura */}
      <circle
        cx="400"
        cy="400"
        r="245"
        fill="url(#bookingChakraCore)"
      />

      {/* Outer rotating ring */}
      <g
        className="origin-center animate-spin"
        style={{ animationDuration: "100s" }}
      >
        <circle
          cx="400"
          cy="400"
          r="382"
          stroke="url(#bookingChakraGold)"
          strokeWidth="1.5"
        />

        <circle
          cx="400"
          cy="400"
          r="368"
          stroke="#D79B43"
          strokeOpacity=".6"
        />

        <circle
          cx="400"
          cy="400"
          r="350"
          stroke="#D79B43"
          strokeOpacity=".4"
          strokeDasharray="2 8"
        />

        {rays.map((i) => (
          <line
            key={i}
            x1="400"
            y1="18"
            x2="400"
            y2={i % 4 === 0 ? "55" : i % 2 === 0 ? "40" : "30"}
            transform={`rotate(${i * 5} 400 400)`}
            stroke="#C88A30"
            strokeWidth={i % 4 === 0 ? "1.5" : ".8"}
            opacity={i % 4 === 0 ? ".9" : ".55"}
          />
        ))}

        {petals.map((i) => (
          <circle
            key={i}
            cx="400"
            cy="35"
            r="3"
            fill="#D69A36"
            transform={`rotate(${i * 22.5} 400 400)`}
          />
        ))}
      </g>

      {/* Inner petal geometry */}
      <g
        className="origin-center animate-spin"
        style={{
          animationDuration: "75s",
          animationDirection: "reverse",
        }}
      >
        <circle
          cx="400"
          cy="400"
          r="326"
          stroke="#D99B3E"
          strokeOpacity=".65"
        />

        <circle
          cx="400"
          cy="400"
          r="310"
          stroke="#D99B3E"
          strokeDasharray="1 6"
        />

        <circle
          cx="400"
          cy="400"
          r="270"
          stroke="#DAA34C"
          strokeWidth="1.3"
        />

        {petals.map((i) => (
          <g key={i} transform={`rotate(${i * 22.5} 400 400)`}>
            <path
              d="M400 125 C355 180 342 235 400 290 C458 235 445 180 400 125Z"
              stroke="url(#bookingChakraGold)"
              strokeWidth="1.5"
              fill="#E9B75C"
              fillOpacity=".035"
            />
            <path
              d="M400 125 Q400 210 400 290"
              stroke="#C98A32"
              strokeOpacity=".65"
              strokeWidth=".8"
            />
          </g>
        ))}
      </g>

      {/* Inner lotus */}
      <g
        className="origin-center animate-spin"
        style={{ animationDuration: "55s" }}
      >
        <circle
          cx="400"
          cy="400"
          r="225"
          stroke="#DAA34C"
          strokeOpacity=".7"
        />

        <circle
          cx="400"
          cy="400"
          r="195"
          stroke="#DAA34C"
          strokeOpacity=".5"
        />

        {Array.from({ length: 12 }, (_, i) => (
          <g key={i} transform={`rotate(${i * 30} 400 400)`}>
            <path
              d="M400 205 C370 250 365 300 400 340 C435 300 430 250 400 205Z"
              fill="#E7B15C"
              fillOpacity=".07"
              stroke="#D39A43"
              strokeWidth="1.3"
            />
          </g>
        ))}
      </g>

      {/* Sacred central mandala */}
      <g filter="url(#bookingChakraGlow)">
        <circle
          cx="400"
          cy="400"
          r="135"
          stroke="#D9A34E"
          strokeOpacity=".6"
        />

        <circle
          cx="400"
          cy="400"
          r="118"
          stroke="#D9A34E"
          strokeDasharray="3 5"
        />

        {Array.from({ length: 8 }, (_, i) => (
          <g key={i} transform={`rotate(${i * 45} 400 400)`}>
            <path
              d="M400 290 Q350 345 400 400 Q450 345 400 290Z"
              stroke="#D69A36"
              strokeWidth="1.5"
              fill="#D9A34E"
              fillOpacity=".06"
            />
          </g>
        ))}

        <circle
          cx="400"
          cy="400"
          r="45"
          fill="url(#bookingChakraCore)"
        />

        <circle
          cx="400"
          cy="400"
          r="22"
          stroke="#C68A32"
          strokeWidth="1.5"
        />

        <circle cx="400" cy="400" r="8" fill="#D49A3E" />
        <circle cx="400" cy="400" r="3" fill="#FFF4D4" />
      </g>
    </svg>
  );
}

export function BookingCTA() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="booking"
      className="relative isolate flex min-h-[780px] w-full items-center overflow-hidden bg-[#FBF8F1] text-[#354B3B] lg:min-h-[850px]"
    >
      {/* Same warm atmosphere as Hero */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_76%_46%,rgba(255,217,166,0.35),transparent_47%),radial-gradient(ellipse_at_12%_60%,#fffdf9,transparent_52%),linear-gradient(110deg,#fff9f2,#fdf0e3)]" />

      {/* Golden ambient glow */}
      <div className="pointer-events-none absolute -z-10 left-[48%] top-[20%] h-[600px] w-[600px] rounded-full bg-[#E8B65D]/[0.12] blur-[110px]" />

      {/* Large Chakra */}
      <div className="pointer-events-none absolute -z-10 right-[-5%] top-1/2 aspect-square w-[68vw] max-w-[900px] -translate-y-1/2 opacity-[0.82] max-lg:right-[-23%] max-lg:w-[85vw] max-md:right-[-40%] max-md:top-[62%] max-md:w-[110vw] max-md:opacity-[0.32]">
        <motion.div
          className="h-full w-full"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <BookingChakra />
        </motion.div>
      </div>

      {/* Independent outer halo */}
      <div className="pointer-events-none absolute -z-10 right-[10%] top-[12%] h-[520px] w-[520px] rounded-full border border-[#D9A34E]/20 max-lg:hidden">
        <div className="absolute inset-4 rounded-full border border-dashed border-[#D9A34E]/30" />
        <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[#E6B65E] shadow-[0_0_18px_#d69a36]" />
      </div>

      {/* Floating golden particles */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {Array.from({ length: 16 }, (_, i) => (
          <span
            key={i}
            className="absolute h-[3px] w-[3px] rounded-full bg-[#D69A36] animate-pulse"
            style={{
              left: `${8 + ((i * 19) % 85)}%`,
              top: `${10 + ((i * 23) % 78)}%`,
              opacity: 0.2 + (i % 4) * 0.12,
              animationDuration: `${4 + (i % 5)}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative mx-auto w-full max-w-[1600px] px-[6%] py-28 md:py-32 lg:py-36">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-[2] max-w-[720px]"
        >
          {/* Eyebrow */}
       

          {/* Heading */}
          <h2 className="font-serif text-[clamp(46px,6.2vw,86px)] font-medium leading-[1.04] tracking-[-0.045em] text-[#354B3B]">
            Let faith lead
            <br />
            <span className="italic">the way.</span>
            <br />
            <span className="relative inline-block text-[#B65F38]">
              We'll take care
              <br />
              of the rest.
              
            </span>
          </h2>

          {/* Decorative separator */}
       

          {/* Description */}
          <p className="max-w-[510px] text-[15px] leading-[1.95] text-[#667467] sm:text-[17px]">
            From choosing the right ritual and finding an experienced
            Purohit to arranging every important detail, let Tirthvaani
            help you plan a sacred journey with confidence and care.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-6">
            <a
              href="#booking-form"
              className="group relative inline-flex min-h-[60px] items-center gap-7 overflow-hidden rounded-[3px] border border-[#A95130] bg-[#B65F38] px-8 text-[11px] font-bold uppercase tracking-[1.6px] text-[#FFF8EF] shadow-[0_7px_20px_rgba(182,95,56,0.18)] transition-all duration-500 hover:-translate-y-1 hover:border-[#934628] hover:bg-[#A95130] hover:shadow-[0_12px_26px_rgba(169,81,48,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B65F38]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <span className="relative">
                Begin Your Enquiry
              </span>

              <ArrowUpRight
                size={19}
                className="relative text-[#FFE0C5] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

            <a
              href="#how-it-works"
              className="group inline-flex items-center gap-2 border-b border-[#819078]/45 pb-2 text-[12px] font-semibold tracking-wide text-[#354B3B] transition-colors duration-300 hover:border-[#B65F38] hover:text-[#B65F38] sm:text-[13px]"
            >
              See how it works
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>

          {/* Reassurance */}
        
        </motion.div>

        {/* Closing brand signature */}
        </div>

      {/* Bottom golden atmospheric glow */}
      <div className="pointer-events-none absolute bottom-[-150px] left-[20%] h-[220px] w-[70%] bg-[radial-gradient(ellipse,rgba(255,211,161,0.3),transparent_70%)] blur-[30px]" />
    </section>
  );
}
