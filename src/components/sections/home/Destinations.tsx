"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";

type Destination = {
  id: string;
  name: string;
  sanskrit: string;
  subtitle: string;
  description: string;
  ritual: string;
  image: string;
  symbol: string;
  mythology: string;
};

const destinations: Destination[] = [
  {
    id: "varanasi",
    name: "Varanasi",
    sanskrit: "काशी",
    subtitle: "",
    description:
      "In Kashi, Shiva is revered as the eternal presence beyond birth and death. Along the Ganga, ancient traditions of worship, remembrance and liberation continue to shape the spiritual life of the city.",
    ritual: "Kashi Darshan · Ganga Aarti · Pind Daan",
    image: "/varanasi.jpg",
    symbol: "01",
    mythology: "",
  },
  {
    id: "prayagraj",
    name: "Prayagraj",
    sanskrit: "प्रयागराज",
    subtitle: "",
    description:
      "The Triveni Sangam is revered as the meeting point of the Ganga, Yamuna and the traditionally invisible Saraswati. A confluence associated with sacred bathing, prayer and ancestral offerings.",
    ritual: "Triveni Snan · Tarpan · Pind Daan",
    image: "/prayagraj.jpg",
    symbol: "02",
    mythology: "",
  },
  {
    id: "gaya",
    name: "Gaya",
    sanskrit: "गया",
    subtitle: "",
    description:
      "At the sacred Vishnupad Temple, tradition associates the footprints of Lord Vishnu with the spiritual significance of Gaya. Families travel here to perform ancestral rites and offer prayers.",
    ritual: "Pind Daan · Shraddha · Tarpan",
    image: "/gaya.jpg",
    symbol: "03",
    mythology: "",
  },
  {
    id: "rameswaram",
    name: "Rameswaram",
    sanskrit: "रामेश्वरम्",
    subtitle: "",
    description:
      "Deeply connected with the Ramayana tradition, Rameswaram represents the devotion of Lord Rama to Lord Shiva. Its sacred waters and ancient corridors make it one of India's most revered pilgrimage destinations.",
    ritual: "Teerth Snanam · Jyotirlinga Darshan",
    image: "/rameswaram.jpg",
    symbol: "04",
    mythology: "",
  },
  {
    id: "haridwar",
    name: "Haridwar",
    sanskrit: "हरिद्वार",
    subtitle: "",
    description:
      "The story of Bhagiratha and the descent of Ganga gives this sacred city a profound place in Hindu tradition. At Har Ki Pauri, devotion meets the flowing river in an enduring daily ritual.",
    ritual: "Ganga Snan · Ganga Aarti · Tarpan",
    image: "/haridwar.jpg",
    symbol: "05",
    mythology: "",
  },
  {
    id: "narmada",
    name: "Narmada",
    sanskrit: "नर्मदा",
    subtitle: "",
    description:
      "The Narmada is worshipped as a sacred river and goddess. Its Parikrama is a remarkable pilgrimage tradition, undertaken as an expression of discipline, faith and devotion.",
    ritual: "Narmada Snan · Narmada Parikrama",
    image: "/narmada.jpg",
    symbol: "06",
    mythology: "",
  },
  {
    id: "ujjain",
    name: "Ujjain",
    sanskrit: "उज्जयिनी",
    subtitle: "",
    description:
      "Ujjain is home to Mahakaleshwar, one of the twelve Jyotirlingas. Here, Lord Shiva is worshipped as Mahakaal — the divine beyond the boundaries of time.",
    ritual: "Mahakaleshwar Darshan · Bhasma Aarti",
    image: "/ujjain.jpg",
    symbol: "07",
    mythology: "",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

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
    <div className="relative h-[340px] overflow-hidden rounded-[4px_76px_4px_4px] bg-[#354B3B] shadow-[0_24px_65px_rgba(53,75,59,0.13)] sm:h-[420px] md:h-[min(62vh,540px)] md:min-h-[390px]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={destination.id}
          initial={
            reducedMotion ? false : { opacity: 0, scale: 1.035 }
          }
          animate={{ opacity: 1, scale: 1 }}
          exit={
            reducedMotion
              ? undefined
              : { opacity: 0, scale: 1.015 }
          }
          transition={{
            duration: reducedMotion ? 0 : 0.7,
            ease,
          }}
          className="absolute inset-0"
        >
          <Image
            src={destination.image}
            alt={`${destination.name} sacred destination`}
            fill
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#18271E]/80 via-[#18271E]/15 to-transparent" />

  <div className="absolute right-6 top-6 md:right-8 md:top-8">
  <span className="font-serif text-sm text-[#FBF8F1]">
    {destination.sanskrit}
  </span>
</div>

          <div className="absolute bottom-7 left-6 right-6 md:bottom-9 md:left-9 md:right-9">
           

            <h3 className="font-serif text-[clamp(42px,5vw,66px)] leading-none tracking-[-0.04em] text-white">
              {destination.name}
            </h3>

         
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-3 rounded-[3px_62px_3px_3px] border border-white/20 md:inset-4" />

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-[#B65F38]" />
    </div>
  );
}

export function Destinations() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion() ?? false;

  // Track only the destination chapters, not the entire two-column layout.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
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

  const scrollToDestination = (id: string) => {
    document.getElementById(`chapter-${id}`)?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "center",
    });
  };

  return (
    <section
      id="destinations"
      className="relative overflow-clip bg-[#FBF8F1] px-[6%] py-16 text-[#354B3B] md:py-20 lg:py-24"
    >
      {/* Background geometry */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-40 h-[420px] w-[420px] rounded-full border border-[#819078]/15"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-52 h-[300px] w-[300px] rounded-full border border-[#819078]/15"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-52 bottom-0 h-[520px] w-[520px] rounded-full border border-[#819078]/15"
      />

      <div className="relative mx-auto w-full max-w-[1440px]">
        {/* Heading */}
        <div className="mb-10 grid gap-6 md:mb-14 md:grid-cols-[1fr_320px] md:items-end lg:mb-16">
          <div>
            

            <h2 className="font-serif text-[clamp(38px,5.2vw,70px)] leading-[1.02] tracking-[-0.045em] text-[#354B3B]">
              Seven sacred places.
              <br />
              <span className="italic text-[#B65F38]">
                Seven timeless stories.
              </span>
            </h2>
          </div>

       
        </div>

        {/* Decorative signature */}
       

        {/* Two-column destination layout */}
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1.02fr_0.98fr] md:gap-12 lg:gap-16 xl:gap-[80px]">
          {/* Sticky visual */}
          <div className="self-start md:sticky md:top-24">
            <DestinationVisual
              destination={active}
              reducedMotion={reducedMotion}
              index={activeIndex}
            />

            {/* Progress rail */}
            <div className="mt-5 flex items-center justify-between gap-4">
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
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                ))}
              </div>

              <span className="min-w-[48px] text-right font-serif text-sm text-[#354B3B]">
                {String(activeIndex + 1).padStart(2, "0")}
                <span className="text-[#819078]"> / 07</span>
              </span>
            </div>

           
          </div>

          {/* Destination chapters */}
          <div
            ref={trackRef}
            className="relative min-w-0"
            aria-label="Seven sacred destinations"
          >
            {/* Timeline */}
            <div className="absolute bottom-10 left-[13px] top-10 w-px bg-[#819078]/25 md:left-[17px]" />

            {destinations.map((destination, index) => {
              const isActive = activeIndex === index;

              return (
                <motion.article
                  key={destination.id}
                  className="relative flex min-h-[330px] flex-col justify-center py-10 pl-11 sm:min-h-[360px] md:min-h-[420px] md:py-12 md:pl-14"
                  initial={
                    reducedMotion
                      ? false
                      : { opacity: 0.65, y: 20 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.65,
                    ease,
                  }}
                >
                  {/* Timeline node */}
                  <div
                    className={`absolute left-0 top-1/2 z-10 flex h-[27px] w-[27px] -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-500 md:h-[35px] md:w-[35px] ${
                      isActive
                        ? "border-[#B65F38] bg-[#B65F38] text-white shadow-[0_0_0_6px_rgba(182,95,56,0.12)]"
                        : "border-[#819078]/50 bg-[#FBF8F1] text-[#819078]"
                    }`}
                  >
                    <span className="font-serif text-[9px] md:text-[10px]">
                      {destination.symbol}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => scrollToDestination(destination.id)}
                    id={`chapter-${destination.id}`}
                    aria-label={`View ${destination.name}`}
                    aria-current={isActive ? "step" : undefined}
                    className="group block w-full min-w-0 text-left"
                  >
                    {/* Eyebrow */}
                 

                    {/* Title row */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="mb-1 font-serif text-xl text-[#B65F38] md:text-2xl">
                          {destination.sanskrit}
                        </p>

                        <h3 className="font-serif text-[clamp(30px,3.2vw,44px)] leading-[1.05] tracking-[-0.035em] text-[#354B3B] transition-colors duration-300 group-hover:text-[#B65F38]">
                          {destination.name}
                        </h3>

                       
                      </div>

                      <span
                        className={`mt-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isActive
                            ? "border-[#B65F38] bg-[#B65F38]/10 text-[#B65F38]"
                            : "border-[#819078]/30 text-[#71816D] group-hover:border-[#B65F38] group-hover:text-[#B65F38]"
                        }`}
                      >
                        <ArrowUpRight
                          size={17}
                          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>

                    {/* Description */}
                    <p className="mt-4 w-full text-[12px] leading-[1.85] text-[#667467] md:text-[13px]">
                      {destination.description}
                    </p>

                    {/* Ritual details */}
                    <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2 text-[9px] font-medium uppercase tracking-[0.12em] text-[#71816D]">
                      <MapPin size={12} className="shrink-0 text-[#B65F38]" />
                      <span>{destination.ritual}</span>
                    </div>
                  </button>

                  {/* Chapter divider */}
                  <div className="mt-8 h-px w-full bg-[#819078]/20" />
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Closing */}
        <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-[#819078]/25 pt-8 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-serif text-xl text-[#354B3B]">
              Every journey begins with faith.
            </p>

            <p className="mt-1 text-[10px] tracking-[0.12em] text-[#819078]">
              श्रद्धा · सेवा · संस्कार
            </p>
          </div>

          <Link
            href="/destinations"
            className="group inline-flex items-center gap-3 rounded-full border border-[#A95130] bg-[#B65F38] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#FFF8EF] shadow-[0_8px_20px_rgba(182,95,56,0.12)] transition-all duration-300 hover:border-[#934628] hover:bg-[#A95130]"
          >
            Explore all destinations

            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}