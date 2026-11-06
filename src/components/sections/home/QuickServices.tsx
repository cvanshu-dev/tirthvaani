
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Pind Daan",
    subtitle: "ANCESTRAL RITUAL",
    description:
      "Perform sacred rites to honour your ancestors and pray for the peace and liberation of departed souls.",
    image: "/images/services/pind-daan.jpg",
    href: "/services/pind-daan",
  },
  {
    number: "02",
    title: "Asthi Visarjan",
    subtitle: "SACRED IMMERSION",
    description:
      "Complete the final rites with devotion through the sacred immersion of ashes in holy rivers.",
    image: "/images/services/asthi-visarjan.jpg",
    href: "/services/asthi-visarjan",
  },
  {
    number: "03",
    title: "Rudra Abhishek",
    subtitle: "SHIVA WORSHIP",
    description:
      "Seek the blessings of Lord Shiva through sacred offerings, Vedic mantras and traditional rituals.",
    image: "/images/services/rudra-abhishek.jpg",
    href: "/services/rudra-abhishek",
  },
  {
    number: "04",
    title: "Anna Daan",
    subtitle: "THE GIFT OF FOOD",
    description:
      "Embrace the spirit of seva by offering food to those in need. A sacred act of compassion and generosity.",
    image: "/images/services/anna-daan.jpg",
    href: "/services/anna-daan",
  },
];

export  function QuickServices() {
  return (
    <section className="relative overflow-hidden bg-[#F8F6F0] py-24 md:py-32">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-40 top-10 h-[420px] w-[420px] rounded-full border border-[#B58B4B]/10" />
      <div className="pointer-events-none absolute -right-24 top-24 h-[300px] w-[300px] rounded-full border border-[#B58B4B]/10" />

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        {/* Section heading */}
        <div className="mb-14 flex flex-col justify-between gap-7 md:mb-16 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
            className="max-w-2xl"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-9 bg-[#AE8142]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#A47B40]">
                Explore Tirthvaani
              </span>
            </div>

            <h2 className="font-serif text-4xl leading-[1.12] tracking-tight text-[#30291F] md:text-5xl lg:text-[64px]">
              Sacred rituals.
              <br />
              <span className="italic text-[#A67B42]">
                Timeless devotion.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="max-w-sm md:pb-2"
          >
            <p className="text-sm leading-7 text-[#777064] md:text-[15px]">
              From ancestral ceremonies to sacred offerings, discover
              thoughtfully arranged rituals guided by tradition, faith
              and devotion.
            </p>
          </motion.div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.55,
                delay: index * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={service.href}
                className="group block"
                aria-label={`Explore ${service.title}`}
              >
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-[#E8E1D5]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                  />

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#211A12]/65 via-transparent to-[#211A12]/10 opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

                  {/* Number */}
                  <span className="absolute left-5 top-5 text-xs font-medium tracking-[0.2em] text-white/90">
                    {service.number}
                  </span>

                  {/* Arrow */}
                  <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/50 text-white backdrop-blur-md transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-[#443321]">
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover:rotate-45"
                    />
                  </div>

                  {/* Image title */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <span className="mb-3 block text-[9px] font-semibold uppercase tracking-[0.25em] text-[#E9C991]">
                      {service.subtitle}
                    </span>

                    <h3 className="font-serif text-[27px] leading-tight text-white md:text-[29px]">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col border-b border-[#DCD4C6] pb-5 pt-5">
                  <p className="min-h-[72px] text-[13px] leading-[1.9] text-[#777064]">
                    {service.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9B733D] transition-colors duration-300 group-hover:text-[#5E4120]">
                      Explore service
                    </span>

                    <ArrowUpRight
                      size={15}
                      className="text-[#A47B40] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
       
      </div>
    </section>
  );
}
