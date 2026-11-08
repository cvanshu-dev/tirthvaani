
"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

type Destination = {
  id: string;
  name: string;
  sanskrit: string;
  description: string;
  ritual: string;
  image: string;
  symbol: string;
};

const destinations: Destination[] = [
  {
    id: "varanasi",
    name: "Varanasi",
    sanskrit: "काशी",
    description:
      "In Kashi, Shiva is revered as the eternal presence beyond birth and death. Along the Ganga, ancient traditions of worship, remembrance and liberation continue to shape the spiritual life of the city.",
    ritual: "Kashi Darshan · Ganga Aarti · Pind Daan",
    image: "/varanasi.webp",
    symbol: "01",
  },
  {
    id: "prayagraj",
    name: "Prayagraj",
    sanskrit: "प्रयागराज",
    description:
      "The Triveni Sangam is revered as the meeting point of the Ganga, Yamuna and the traditionally invisible Saraswati. A confluence associated with sacred bathing, prayer and ancestral offerings.",
    ritual: "Triveni Snan · Tarpan · Pind Daan",
    image: "/prayagraj.webp",
    symbol: "02",
  },
  {
    id: "gaya",
    name: "Gaya",
    sanskrit: "गया",
    description:
      "At the sacred Vishnupad Temple, tradition associates the footprints of Lord Vishnu with the spiritual significance of Gaya. Families travel here to perform ancestral rites and offer prayers.",
    ritual: "Pind Daan · Shraddha · Tarpan",
    image: "/gaya.webp",
    symbol: "03",
  },
  {
    id: "rameswaram",
    name: "Rameswaram",
    sanskrit: "रामेश्वरम्",
    description:
      "Deeply connected with the Ramayana tradition, Rameswaram represents the devotion of Lord Rama to Lord Shiva. Its sacred waters and ancient corridors make it one of India's most revered pilgrimage destinations.",
    ritual: "Teerth Snanam · Jyotirlinga Darshan",
    image: "/rameswaram.webp",
    symbol: "04",
  },
  {
    id: "haridwar",
    name: "Haridwar",
    sanskrit: "हरिद्वार",
    description:
      "The story of Bhagiratha and the descent of Ganga gives this sacred city a profound place in Hindu tradition. At Har Ki Pauri, devotion meets the flowing river in an enduring daily ritual.",
    ritual: "Ganga Snan · Ganga Aarti · Tarpan",
    image: "/haridwar.webp",
    symbol: "05",
  },
  {
    id: "narmada",
    name: "Narmada",
    sanskrit: "नर्मदा",
    description:
      "The Narmada is worshipped as a sacred river and goddess. Its Parikrama is a remarkable pilgrimage tradition, undertaken as an expression of discipline, faith and devotion.",
    ritual: "Narmada Snan · Narmada Parikrama",
    image: "/narmada.webp",
    symbol: "06",
  },
  {
    id: "ujjain",
    name: "Ujjain",
    sanskrit: "उज्जयिनी",
    description:
      "Ujjain is home to Mahakaleshwar, one of the twelve Jyotirlingas. Here, Lord Shiva is worshipped as Mahakaal — the divine beyond the boundaries of time.",
    ritual: "Mahakaleshwar Darshan · Bhasma Aarti",
    image: "/ujjain.webp",
    symbol: "07",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

/* =========================================
   DESTINATION IMAGE
========================================= */

function DestinationVisual({
  destination,
  reducedMotion,
  index,
}: {
  destination: Destination;
  reducedMotion: boolean;
  index: number;
}) {
  return (
    <div
      className="
        relative h-[190px] overflow-hidden
        rounded-[4px_42px_4px_4px]
        bg-[#354B3B]
        shadow-[0_15px_40px_rgba(53,75,59,0.13)]
        sm:h-[260px]
        md:h-[min(62vh,540px)]
        md:min-h-[390px]
        md:rounded-[4px_76px_4px_4px]
        md:shadow-[0_24px_65px_rgba(53,75,59,0.13)]
      "
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={destination.id}
          initial={
            reducedMotion ? false : { opacity: 0, scale: 1.035 }
          }
          animate={{ opacity: 1, scale: 1 }}
          exit={
            reducedMotion ? undefined : { opacity: 0, scale: 1.015 }
          }
          transition={{
            duration: reducedMotion ? 0 : 0.6,
            ease,
          }}
          className="absolute inset-0"
        >
          <Image
            src={destination.image}
            alt={`${destination.name} sacred destination`}
            fill
            priority={index === 0}
            sizes="(max-width: 767px) 90vw, 50vw"
            className="object-cover"
          />

          {/* Image overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#18271E]/85 via-[#18271E]/15 to-transparent" />

          {/* Sanskrit */}
          <div className="absolute right-5 top-5 md:right-8 md:top-8">
            <span className="font-serif text-sm text-[#FBF8F1]">
              {destination.sanskrit}
            </span>
          </div>

          {/* Destination name */}
          <div className="absolute bottom-6 left-5 right-5 md:bottom-9 md:left-9 md:right-9">
            <h3 className="font-serif text-[clamp(36px,5vw,66px)] leading-none tracking-[-0.04em] text-white">
              {destination.name}
            </h3>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Inner border */}
      <div
        className="
          pointer-events-none absolute inset-2
          rounded-[3px_34px_3px_3px]
          border border-white/20
          md:inset-4
          md:rounded-[3px_62px_3px_3px]
        "
      />

      {/* Bottom accent */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-[#B65F38]" />
    </div>
  );
}

/* =========================================
   PROGRESS INDICATOR
========================================= */

function ProgressRail({
  activeIndex,
  reducedMotion,
}: {
  activeIndex: number;
  reducedMotion: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-1 items-center gap-1.5">
        {destinations.map((destination, index) => (
          <div
            key={destination.id}
            className="h-[3px] flex-1 overflow-hidden rounded-full bg-[#819078]/20"
          >
            <motion.div
              className="h-full origin-left rounded-full bg-[#B65F38]"
              animate={{
                scaleX: index <= activeIndex ? 1 : 0,
              }}
              transition={{
                duration: reducedMotion ? 0 : 0.4,
                ease,
              }}
            />
          </div>
        ))}
      </div>

      <span className="min-w-[48px] text-right font-serif text-sm text-[#354B3B]">
        {String(activeIndex + 1).padStart(2, "0")}
        <span className="text-[#819078]"> / 07</span>
      </span>
    </div>
  );
}

/* =========================================
   MAIN DESTINATIONS SECTION
========================================= */

export function Destinations() {
  const trackRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const reducedMotion = useReducedMotion() ?? false;

  /*
   * Track only the seven destination chapters.
   * The same scroll tracking works on mobile and desktop.
   */
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 25%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.min(
      destinations.length - 1,
      Math.floor(latest * destinations.length)
    );

    setActiveIndex((current) =>
      current === nextIndex ? current : nextIndex
    );
  });

  const active = destinations[activeIndex];

  return (
    <section
      id="destinations"
      className="
        relative isolate overflow-clip
        bg-[#FBF8F1]
        px-[5%] py-12
        text-[#354B3B]
        sm:px-[6%] sm:py-16
        md:py-20
        lg:py-24
      "
    >
      {/* =================================
          BACKGROUND GEOMETRY
      ================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -left-40 top-40
          h-[420px] w-[420px] rounded-full
          border border-[#819078]/15
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -left-28 top-52
          h-[300px] w-[300px] rounded-full
          border border-[#819078]/15
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -right-52 bottom-0
          h-[520px] w-[520px] rounded-full
          border border-[#819078]/15
        "
      />

      <div className="relative mx-auto w-full max-w-[1440px]">

        {/* =================================
            SECTION HEADING
        ================================= */}

        <div className="mb-9 md:mb-14 lg:mb-16">
          <h2
            className="
              font-serif
              text-[clamp(36px,5.2vw,70px)]
              leading-[1.04]
              tracking-[-0.045em]
              text-[#354B3B]
            "
          >
            Seven sacred places.
            <br />

            <span className="italic text-[#B65F38]">
              Seven timeless stories.
            </span>
          </h2>
        </div>

        {/* =================================
            DESTINATION EXPERIENCE
        ================================= */}

        <div
          className="
            grid grid-cols-1 items-start
            gap-0
            md:grid-cols-[1.02fr_0.98fr]
            md:gap-12
            lg:gap-16
            xl:gap-[80px]
          "
        >

          {/* =================================
              DESKTOP STICKY IMAGE
          ================================= */}

          <div className="sticky top-24 hidden self-start md:block">
            <DestinationVisual
              destination={active}
              reducedMotion={reducedMotion}
              index={activeIndex}
            />

            <div className="mt-5">
              <ProgressRail
                activeIndex={activeIndex}
                reducedMotion={reducedMotion}
              />
            </div>
          </div>

          {/* =================================
              CHAPTER COLUMN
          ================================= */}

          <div className="relative min-w-0">

            {/* MOBILE STICKY IMAGE */}

            <div
              className="
                sticky top-0 z-30
                -mx-[5.56%]
                bg-[#FBF8F1]
                px-[5.56%]
                pb-3 pt-2
                md:hidden
              "
            >
              <DestinationVisual
                destination={active}
                reducedMotion={reducedMotion}
                index={activeIndex}
              />

              <div className="mt-3">
                <ProgressRail
                  activeIndex={activeIndex}
                  reducedMotion={reducedMotion}
                />
              </div>
            </div>

            {/* =================================
                DESTINATION CHAPTERS
            ================================= */}

            <div
              ref={trackRef}
              className="relative min-w-0"
              aria-label="Seven sacred destinations"
            >

              {/* Timeline line */}

              <div
                className="
                  absolute bottom-8 left-[13px] top-8
                  w-px bg-[#819078]/25
                  md:left-[17px]
                "
              />

              {destinations.map((destination, index) => {
                const isActive = activeIndex === index;

                return (
                  <motion.article
                    key={destination.id}
                    className="
                      relative flex
                      min-h-[clamp(250px,48svh,340px)]
                      flex-col justify-center
                      py-8 pl-10
                      sm:min-h-[360px]
                      sm:pl-11
                      md:min-h-[420px]
                      md:py-12 md:pl-14
                    "
                    initial={
                      reducedMotion
                        ? false
                        : { opacity: 0.65, y: 18 }
                    }
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.15,
                    }}
                    transition={{
                      duration: reducedMotion ? 0 : 0.65,
                      ease,
                    }}
                  >

                    {/* TIMELINE NODE */}

                    <div
                      className={`
                        absolute left-0 top-1/2 z-10
                        flex h-[27px] w-[27px]
                        -translate-y-1/2
                        items-center justify-center
                        rounded-full border
                        transition-all duration-500
                        md:h-[35px] md:w-[35px]
                        ${
                          isActive
                            ? "border-[#B65F38] bg-[#B65F38] text-white shadow-[0_0_0_5px_rgba(182,95,56,0.12)] md:shadow-[0_0_0_6px_rgba(182,95,56,0.12)]"
                            : "border-[#819078]/50 bg-[#FBF8F1] text-[#819078]"
                        }
                      `}
                    >
                      <span className="font-serif text-[9px] md:text-[10px]">
                        {destination.symbol}
                      </span>
                    </div>

                    {/* DESTINATION CONTENT */}

                    <button
                      type="button"
                      id={`chapter-${destination.id}`}
                      aria-label={`View ${destination.name}`}
                      aria-current={isActive ? "step" : undefined}
                      onClick={() => {
                        document
                          .getElementById(`chapter-${destination.id}`)
                          ?.scrollIntoView({
                            behavior: reducedMotion ? "auto" : "smooth",
                            block: "center",
                          });
                      }}
                      className="
                        group block w-full min-w-0
                        touch-manipulation text-left
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-[#B65F38]
                        focus-visible:ring-offset-4
                      "
                    >

                      {/* SANSKRIT */}

                      <p
                        className="
                          mb-1 font-serif
                          text-lg text-[#B65F38]
                          md:text-2xl
                        "
                      >
                        {destination.sanskrit}
                      </p>

                      {/* TITLE ROW */}

                      <div className="flex items-center justify-between gap-3 md:gap-4">
                        <h3
                          className="
                            min-w-0 font-serif
                            text-[clamp(28px,3.2vw,44px)]
                            leading-[1.05]
                            tracking-[-0.035em]
                            text-[#354B3B]
                            transition-colors duration-300
                            group-hover:text-[#B65F38]
                          "
                        >
                          {destination.name}
                        </h3>

                        <span
                          className={`
                            flex h-9 w-9 shrink-0
                            items-center justify-center
                            rounded-full border
                            transition-all duration-300
                            md:mt-2 md:h-10 md:w-10
                            ${
                              isActive
                                ? "border-[#B65F38] bg-[#B65F38]/10 text-[#B65F38]"
                                : "border-[#819078]/30 text-[#71816D] group-hover:border-[#B65F38] group-hover:text-[#B65F38]"
                            }
                          `}
                        >
                          <ArrowUpRight
                            size={17}
                            className="
                              transition-transform duration-300
                              group-hover:-translate-y-0.5
                              group-hover:translate-x-0.5
                            "
                          />
                        </span>
                      </div>

                      {/* DESCRIPTION */}

                      <p
                        className="
                          mt-3 w-full
                          text-[12px]
                          leading-[1.8]
                          text-[#667467]
                          sm:text-[13px]
                          md:mt-4
                        "
                      >
                        {destination.description}
                      </p>

                      {/* RITUAL DETAILS */}

                      <div
                        className="
                          mt-4 flex flex-wrap
                          items-start gap-x-2 gap-y-2
                          text-[9px] font-medium
                          uppercase leading-[1.7]
                          tracking-[0.1em]
                          text-[#71816D]
                          md:mt-5 md:tracking-[0.12em]
                        "
                      >
                        <MapPin
                          size={12}
                          className="mt-0.5 shrink-0 text-[#B65F38]"
                        />

                        <span>{destination.ritual}</span>
                      </div>
                    </button>

                    {/* CHAPTER DIVIDER */}

                    <div className="mt-6 h-px w-full bg-[#819078]/20 md:mt-8" />

                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>

        {/* =================================
            CLOSING SECTION
        ================================= */}

        <div
          className="
            mt-9 flex flex-col
            items-center justify-between
            gap-5 border-t border-[#819078]/25
            pt-7 text-center
            sm:flex-row sm:text-left
            md:mt-12 md:pt-8
          "
        >
          <div>
            <p className="font-serif text-lg text-[#354B3B] md:text-xl">
              Every journey begins with faith.
            </p>

            <p className="mt-1 text-[10px] tracking-[0.12em] text-[#819078]">
              श्रद्धा · सेवा · संस्कार
            </p>
          </div>

          <Link
            href="/destinations"
            className="
              group inline-flex w-full
              items-center justify-center gap-3
              rounded-full border border-[#A95130]
              bg-[#B65F38]
              px-6 py-3.5
              text-[10px] font-semibold
              uppercase tracking-[0.16em]
              text-[#FFF8EF]
              shadow-[0_8px_20px_rgba(182,95,56,0.12)]
              transition-all duration-300
              hover:border-[#934628]
              hover:bg-[#A95130]
              sm:w-auto
            "
          >
            Explore all destinations

            <ArrowUpRight
              size={15}
              className="
                transition-transform duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
