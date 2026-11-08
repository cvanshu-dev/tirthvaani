
"use client";

import { useReducedMotion, motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Quote,
  Star,
} from "lucide-react";
import { useState } from "react";

const galleryImages = [
  {
    src: "/hero.webp",
    alt: "Sacred rituals performed on the banks of the Ganga",
    category: "Sacred ceremonies",
    title: "A moment of devotion",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/gaya.webp",
    alt: "Traditional Hindu puja arrangements",
    category: "Traditions",
    title: "Rooted in tradition",
    className: "",
  },
  {
    src: "/images/gallery/river-ghat.webp",
    alt: "A peaceful view of a sacred river ghat",
    category: "Sacred places",
    title: "Where faith finds peace",
    className: "",
  },
  {
    src: "/images/gallery/ritual-offerings.webp",
    alt: "Traditional offerings arranged for a Hindu ceremony",
    category: "Ritual moments",
    title: "Every detail has meaning",
    className: "",
  },
  {
    src: "/images/gallery/priest.webp",
    alt: "A priest preparing for a sacred ceremony",
    category: "Our traditions",
    title: "Guided by knowledge",
    className: "",
  },
];

const testimonials = [
  {
    quote:
      "Replace this with a genuine customer review describing their experience arranging a ritual through Tirthvaani.",
    name: "Customer name",
    location: "City, India",
    ritual: "Ritual booked",
  },
  {
    quote:
      "Add a verified review about the support, communication and arrangements provided throughout the ceremony.",
    name: "Customer name",
    location: "City, India",
    ritual: "Ritual booked",
  },
  {
    quote:
      "Use an authentic customer account explaining what made their pilgrimage or ceremony easier.",
    name: "Customer name",
    location: "City, India",
    ritual: "Ritual booked",
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



export function GallerySection() {
  const reduceMotion = useReducedMotion();

  const images = [
    {
      src: "/hero.webp",
      alt: "Sacred pilgrimage and spiritual journey",
      category: "Sacred journeys",
      title: "A journey of faith",
      position: "center 45%",
      layout: "large",
    },
    {
      src: "/gaya.webp",
      alt: "Traditional Hindu rituals",
      category: "Sacred traditions",
      title: "Rooted in tradition",
      position: "center center",
      layout: "small",
    },
    {
      src: "/images/gallery/river-ghat.webp",
      alt: "Sacred river ghat",
      category: "Sacred places",
      title: "Where faith finds peace",
      position: "center center",
      layout: "small",
    },
    {
      src: "/images/gallery/ritual-offerings.webp",
      alt: "Traditional ritual offerings",
      category: "Ritual moments",
      title: "Every detail matters",
      position: "center center",
      layout: "small",
    },
    {
      src: "/images/gallery/priest.webp",
      alt: "Priest preparing a sacred ceremony",
      category: "Our traditions",
      title: "Guided by knowledge",
      position: "center center",
      layout: "small",
    },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-[#FBF8F1] py-16 text-[#354B3B] md:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 top-0 h-[400px] w-[400px] rounded-full border border-[#819078]/10" />
        <div className="absolute -left-40 bottom-0 h-[350px] w-[350px] rounded-full bg-[#B65F38]/[0.035] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">

        {/* Header */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-9 flex flex-col justify-between gap-5 md:mb-11 md:flex-row md:items-end"
        >
          <div className="max-w-[700px]">
           

            <h2 className="font-serif text-[clamp(38px,5vw,66px)] leading-[1.06] tracking-[-0.04em]">
              Faith, captured in{" "}
              <span className="italic text-[#B65F38]">moments.</span>
            </h2>

            <p className="mt-4 max-w-[490px] text-[13px] leading-[1.9] text-[#667467] sm:text-[14px]">
              A glimpse into sacred ceremonies, timeless traditions
              and the journeys that bring families closer to their faith.
            </p>
          </div>

          <div className="flex items-center gap-2 pb-1">
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#819078]">
              A visual journey
            </span>
            <ArrowUpRight size={15} className="text-[#B65F38]" />
          </div>
        </motion.div>

        {/* Compact visual mosaic */}
        <div className="grid h-[430px] grid-cols-2 grid-rows-[1.1fr_1fr_1fr] gap-2.5 sm:h-[470px] sm:gap-3 lg:h-[390px] lg:grid-cols-4 lg:grid-rows-2">

          {images.map((image, index) => (
            <motion.figure
              key={image.src}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.65,
                delay: reduceMotion ? 0 : index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`group relative isolate min-h-0 overflow-hidden bg-[#E9E4D8] ${
                index === 0
                  ? "col-span-2 row-span-1 lg:col-span-2 lg:row-span-2"
                  : "col-span-1 row-span-1"
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: image.position }}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.06]"
              />

              {/* Cinematic overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#18271E]/80 via-[#18271E]/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Hover border */}
              <div className="pointer-events-none absolute inset-0 border border-white/10 transition-colors duration-500 group-hover:border-[#E5A080]/70" />

              {/* Image caption */}
              <figcaption className="absolute inset-x-0 bottom-0 p-3.5 sm:p-5 lg:p-4 xl:p-5">
                <span className="text-[7px] font-semibold uppercase tracking-[0.2em] text-[#E5A080] sm:text-[8px]">
                  {image.category}
                </span>

                <div className="mt-1.5 flex items-end justify-between gap-2">
                  <h3
                    className={`font-serif leading-tight text-[#FFF8EF] ${
                      index === 0
                        ? "text-[22px] sm:text-[30px] lg:text-[32px]"
                        : "text-[16px] sm:text-[19px]"
                    }`}
                  >
                    {image.title}
                  </h3>

                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/40 text-white transition-all duration-500 group-hover:border-[#E5A080] group-hover:bg-[#B65F38] sm:h-8 sm:w-8">
                    <ArrowUpRight size={13} />
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-7 flex items-center justify-center gap-3"
        >
        
        </motion.div>
      </div>
    </section>
  );
}



export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const testimonial = testimonials[active];

  const previous = () => {
    setActive((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  const next = () => {
    setActive((current) =>
      current === testimonials.length - 1 ? 0 : current + 1
    );
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#F3F0E7] py-16 text-[#354B3B] md:py-20">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full border border-[#819078]/10" />
        <div className="absolute -left-24 -top-24 h-[290px] w-[290px] rounded-full border border-[#819078]/10" />
        <div className="absolute -right-48 bottom-0 h-[500px] w-[500px] rounded-full bg-[#B65F38]/[0.035] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Left introduction */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
           

            <h2 className="max-w-[510px] font-serif text-[clamp(38px,5vw,64px)] leading-[1.08] tracking-[-0.04em]">
              Trust built on
              <span className="italic text-[#B65F38]"> experience.</span>
            </h2>

            <p className="mt-6 max-w-[420px] text-[13px] leading-[1.95] text-[#667467] sm:text-[14px]">
              Behind every sacred journey is a family, a tradition and a
              story. Hear from people who have experienced the care and
              support of Tirthvaani.
            </p>

            <div className="mt-9 flex items-center gap-4 border-t border-[#819078]/25 pt-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#B65F38]/30">
                <Quote
                  size={19}
                  strokeWidth={1.3}
                  className="text-[#B65F38]"
                />
              </div>

              <div>
                <p className="font-serif text-[18px]">
                  Real experiences. Real voices.
                </p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-[#819078]">
                  Shared with permission
                </p>
              </div>
            </div>
          </motion.div>

          {/* Testimonial card */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden border border-[#819078]/20 bg-[#FBF8F1] p-7 sm:p-10 lg:p-12"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#819078]/10" />
            <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full border border-[#819078]/10" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <Quote
                  size={39}
                  strokeWidth={1}
                  className="text-[#B65F38]"
                />

                <div className="flex items-center gap-1 text-[#B65F38]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={12}
                      fill="currentColor"
                      strokeWidth={1}
                    />
                  ))}
                </div>
              </div>

              <motion.div
                key={active}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <blockquote className="mt-9 min-h-[150px] font-serif text-[clamp(22px,3vw,32px)] leading-[1.45] tracking-[-0.02em] text-[#354B3B]">
                  “{testimonial.quote}”
                </blockquote>

                <div className="mt-9 flex flex-col justify-between gap-5 border-t border-[#819078]/20 pt-6 sm:flex-row sm:items-center">
                  <div>
                    <p className="font-serif text-[19px] text-[#354B3B]">
                      {testimonial.name}
                    </p>
                    <p className="mt-1 text-[10px] text-[#819078]">
                      {testimonial.location}
                    </p>
                    <p className="mt-2 text-[8px] font-semibold uppercase tracking-[0.17em] text-[#B65F38]">
                      {testimonial.ritual}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={previous}
                      aria-label="Previous testimonial"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#819078]/30 text-[#354B3B] transition-colors hover:border-[#B65F38] hover:bg-[#B65F38] hover:text-white"
                    >
                      <ArrowLeft size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={next}
                      aria-label="Next testimonial"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#819078]/30 text-[#354B3B] transition-colors hover:border-[#B65F38] hover:bg-[#B65F38] hover:text-white"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Pagination */}
              <div className="mt-7 flex items-center gap-2">
                {testimonials.map((item, index) => (
                  <button
                    key={item.name + index}
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={`Show testimonial ${index + 1}`}
                    aria-current={active === index ? "true" : undefined}
                    className={`h-1 transition-all duration-300 ${
                      active === index
                        ? "w-9 bg-[#B65F38]"
                        : "w-4 bg-[#819078]/30 hover:bg-[#819078]/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
