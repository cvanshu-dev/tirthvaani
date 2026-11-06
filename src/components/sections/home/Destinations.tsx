
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const destinations = [
  {
    number: "01",
    name: "Varanasi",
    region: "Uttar Pradesh, India",
    description:
      "Where the sacred Ganga flows through centuries of faith, devotion and timeless traditions.",
    image: "/varanasi.jpg",
    className: "lg:col-span-7 lg:row-span-2",
    featured: true,
    imagePosition: "center 55%",
  },
  {
    number: "02",
    name: "Prayagraj",
    region: "Uttar Pradesh, India",
    description: "The sacred confluence of three holy rivers.",
    image: "/prayagraj.jpg",
    className: "lg:col-span-5",
    imagePosition: "center 50%",
  },
  {
    number: "03",
    name: "Gaya",
    region: "Bihar, India",
    description: "A timeless land of ancestral rituals and devotion.",
    image: "/gaya.jpg",
    className: "lg:col-span-5",
    imagePosition: "center 50%",
  },
  {
    number: "04",
    name: "Rameswaram",
    region: "Tamil Nadu, India",
    description: "An island of sacred traditions and divine heritage.",
    image: "/rameswaram.jpg",
    className: "lg:col-span-3",
    imagePosition: "center 50%",
  },
  {
    number: "05",
    name: "Haridwar",
    region: "Uttarakhand, India",
    description: "Where the holy Ganga descends into the plains.",
    image: "/haridwar.jpg",
    className: "lg:col-span-3",
    imagePosition: "center 50%",
  },
  {
    number: "06",
    name: "Narmada",
    region: "Central India",
    description: "A sacred river revered through generations.",
    image: "/narmada.jpg",
    className: "lg:col-span-3",
    imagePosition: "center 50%",
  },
  {
    number: "07",
    name: "Ujjain",
    region: "Madhya Pradesh, India",
    description: "An ancient spiritual city devoted to Mahakaleshwar.",
    image: "/ujjain.jpg",
    className: "lg:col-span-3",
    imagePosition: "center 50%",
  },
];

export function Destinations() {
  return (
    <section className="relative overflow-hidden bg-[#F8F6F0] py-24 md:py-32">

      {/* Background details */}
      <div className="pointer-events-none absolute -right-52 top-20 h-[600px] w-[600px] rounded-full border border-[#B58B4B]/[0.08]" />
      <div className="pointer-events-none absolute -right-36 top-36 h-[420px] w-[420px] rounded-full border border-[#B58B4B]/[0.08]" />

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">

        {/* SECTION HEADER */}
        <div className="mb-14 grid grid-cols-1 items-end gap-8 md:mb-16 md:grid-cols-2">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-9 bg-[#AD8249]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A47B40]">
                Sacred Places of India
              </span>
            </div>

            <h2 className="font-serif text-[42px] leading-[1.08] tracking-[-0.035em] text-[#30291F] sm:text-5xl lg:text-[68px]">
              Places of faith.
              <br />
              <span className="font-normal italic text-[#A67B42]">
                Journeys of the soul.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col justify-end md:items-end"
          >
            <p className="max-w-[390px] text-[14px] leading-[2] text-[#777064] md:text-[15px] md:text-right">
              Across India's sacred landscapes, every destination
              holds a story of devotion, a tradition of faith and
              a connection that transcends generations.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="h-px w-8 bg-[#C5A574]" />
              <span className="text-[9px] uppercase tracking-[0.22em] text-[#A18B6B]">
                Seven timeless destinations
              </span>
            </div>
          </motion.div>
        </div>

        {/* DESTINATION COLLECTION */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[270px_270px_310px] lg:gap-5">

          {destinations.map((destination, index) => {
            const featured = destination.featured;

            return (
              <motion.article
                key={destination.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.75,
                  delay: (index % 4) * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group relative min-h-[340px] overflow-hidden bg-[#DCD4C5] ${
                  featured
                    ? "sm:col-span-2 lg:min-h-0"
                    : "lg:min-h-0"
                } ${destination.className}`}
              >

                {/* IMAGE */}
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={destination.image}
                    alt={`${destination.name}, ${destination.region}`}
                    fill
                    priority={featured}
                    sizes={
                      featured
                        ? "(max-width: 1024px) 100vw, 58vw"
                        : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 35vw"
                    }
                    style={{
                      objectPosition: destination.imagePosition,
                    }}
                    className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.055]"
                  />
                </div>

                {/* IMAGE COLOR GRADING */}
                <div className="absolute inset-0 bg-[#30271C]/[0.08] mix-blend-multiply" />

                {/* GRADIENT */}
                <div
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    featured
                      ? "bg-gradient-to-t from-[#17130F]/90 via-[#17130F]/20 to-[#17130F]/10"
                      : "bg-gradient-to-t from-[#17130F]/85 via-[#17130F]/15 to-[#17130F]/5"
                  }`}
                />

                {/* TOP BORDER FRAME */}
                <div className="pointer-events-none absolute inset-[10px] border border-white/20 opacity-70 transition-all duration-700 group-hover:inset-[14px] group-hover:border-white/40" />

                {/* TOP INFORMATION */}
                <div className="absolute left-7 right-7 top-7 flex items-center justify-between md:left-8 md:right-8 md:top-8">

                  <div className="flex items-center gap-3">
                    <span className="font-serif text-[13px] italic text-white/90">
                      {destination.number}
                    </span>

                    <span className="h-px w-7 bg-white/50" />
                    
                    <span className="text-[8px] font-medium uppercase tracking-[0.24em] text-white/80">
                      {featured ? "Featured destination" : "Sacred destination"}
                    </span>
                  </div>

                  <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/80">
                    {destination.region}
                  </span>
                </div>

                {/* BOTTOM CONTENT */}
                <div className="absolute bottom-0 left-0 right-0 p-7 md:p-8">

                  {featured && (
                    <div className="mb-4 flex items-center gap-3">
                      <span className="h-px w-8 bg-[#D8B47A]" />
                      <span className="text-[9px] uppercase tracking-[0.25em] text-[#E7C995]">
                        The eternal city
                      </span>
                    </div>
                  )}

                  <h3
                    className={`font-serif leading-[0.98] tracking-[-0.035em] text-white ${
                      featured
                        ? "text-[58px] sm:text-7xl lg:text-[88px]"
                        : "text-[42px] sm:text-[46px] lg:text-[48px]"
                    }`}
                  >
                    {destination.name}
                  </h3>

                  <div className="mt-4 flex items-end justify-between gap-4">

                    <p
                      className={`max-w-[350px] text-white/80 ${
                        featured
                          ? "text-[13px] leading-[1.9] md:text-[14px]"
                          : "text-[11px] leading-[1.8] md:text-[12px]"
                      }`}
                    >
                      {destination.description}
                    </p>

                    {featured && (
                      <span className="hidden font-serif text-[12px] italic tracking-wide text-white/55 sm:block">
                        India
                      </span>
                    )}
                  </div>
                </div>

              </motion.article>
            );
          })}

        </div>

        {/* SECTION FOOTER */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 flex flex-col justify-between gap-4 border-t border-[#DFD8CB] pt-7 sm:flex-row sm:items-center"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#AE8142]" />
            <span className="text-[9px] font-medium uppercase tracking-[0.23em] text-[#898174]">
              Rooted in faith. Connected through devotion.
            </span>
          </div>

          <span className="font-serif text-sm italic text-[#A18B6B]">
            Tirthvaani · Sacred journeys
          </span>
        </motion.div>

      </div>
    </section>
  );
}
