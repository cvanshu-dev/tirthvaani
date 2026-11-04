import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Car,
  Check,
  Hotel,
  Map,
  Plane,
  Utensils,
} from "lucide-react";

const highlights = [
  {
    title: "Lord Shiva & Kashi",
    text: "Kashi is known to be the favorite place of Lord Shiva. It is believed that those who visit Kashi and take a holy dip in the River Ganges attain liberation.",
    image: "/images/lord-shiva-kashi.jpg",
  },
  {
    title: "About Kashi",
    text: "Varanasi, also known as Kashi, is the holy city of India, filled with spiritual traditions and sacred rituals. Performing rituals here with devotion is believed to lead towards moksha.",
    image: "/images/about-kashi.jpg",
  },
  {
    title: "Kashi & River Ganga",
    text: "Kashi, situated on the banks of the River Ganga, is a sacred place where pilgrims perform rituals and seek spiritual purification. Ganga Aarti is performed every evening after sunset.",
    image: "/images/river-ganga.jpg",
  },
  {
    title: "Sacred Vedic Traditions",
    text: "Our rituals and services are performed according to the Vedic scriptures, preserving the spiritual heritage of Kashi for every devotee.",
    image: "/images/vedic-rituals.jpg",
  },
];

const facilities = [
  {
    title: "A/C and Non A/C Rooms",
    text: "Ideal accommodation solutions for pilgrims and tourists visiting Kashi.",
    icon: Hotel,
  },
  {
    title: "Guide Service",
    text: "Experienced guides to help you discover the sacred places of Kashi.",
    icon: Map,
  },
  {
    title: "Nitya Annadana Satram",
    text: "Free food for devotees visiting this holy place and performing rituals.",
    icon: Utensils,
  },
  {
    title: "Travel Support",
    text: "A/C and non A/C vehicles for visiting destinations during your Kashi Yatra.",
    icon: Car,
  },
  {
    title: "Station & Airport Pickup",
    text: "Reliable pickup and drop services from the bus station, railway station and airport.",
    icon: Plane,
  },
  {
    title: "Ritual Arrangements",
    text: "Complete ritual arrangements at Kashi, Gaya and Prayag.",
    icon: Check,
  },
];

export function About() {
  return (
    <main className="overflow-hidden bg-[#faf3ea] text-[#35281e]">
      {/* Breadcrumb Hero */}
      <section className="relative border-b border-[#d8c09f]/40 px-5 py-20 md:px-12 lg:px-24 lg:py-28">
        <div className="absolute left-1/2 top-0 h-full w-px bg-[#bd9068]/20" />

        <div className="relative mx-auto max-w-7xl text-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-[#a96835]">
            Tirth Kshetra Purohit
          </p>

          <h1 className="font-serif text-6xl font-normal tracking-[-2px] md:text-8xl">
            About
          </h1>

          <div className="mt-7 flex items-center justify-center gap-3 text-sm text-[#796d60]">
            <Link href="/" className="transition hover:text-[#a95731]">
              Home
            </Link>
            <span className="text-[#b88758]">·</span>
            <span>About</span>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="relative px-5 py-20 md:px-12 lg:px-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div className="relative h-[430px] overflow-hidden rounded-[30px_140px_30px_30px] shadow-2xl md:h-[600px]">
            <Image
              src="/images/about-varanasi.jpg"
              alt="Sacred ghats of Varanasi beside the River Ganga"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <p className="absolute bottom-7 left-7 text-xs tracking-[0.3em] text-white">
              KASHI · THE SACRED CITY
            </p>
          </div>

          <div>
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-[#a96835]">
              Our Heritage · Our Faith
            </p>

            <h2 className="font-serif text-5xl font-normal leading-[1.02] tracking-[-2px] md:text-7xl">
              Planner of Your
              <em className="block text-[#bd8146]">Perfect Rituals</em>
            </h2>

            <div className="my-8 flex w-24 items-center gap-2">
              <span className="h-px flex-1 bg-[#ae7845]" />
              <span className="h-2 w-2 rotate-45 bg-[#ae7845]" />
              <span className="h-px flex-1 bg-[#ae7845]" />
            </div>

            <div className="space-y-5 font-serif text-base leading-7 text-[#66584e] md:text-lg">
              <p>
                According to our Vedic scriptures, after visiting a Tirtha
                Kshetra, one is obliged to perform necessary rites and rituals
                like Vrata and Shradh Karma for the fulfillment of the
                fourfold purpose of life: Dharma, Artha, Kama and Moksha.
              </p>

              <p>
                We are privileged to help devotees perform these rituals in
                Kashi through our customized Purohit services in Varanasi.
              </p>

              <p>
                We were offered this opportunity five centuries ago. Since
                then, the government of Kashi and its rulers have supported us
                in providing Pandits in Varanasi.
              </p>

              <p>
                We were granted Raja Ghat by Maharaja Peshwa on the banks of
                the River Ganga to perform Kashi Yatra rituals according to
                the Vedic scriptures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sacred Places */}
      <section className="bg-[#f3e8da] px-5 py-20 md:px-12 lg:px-24 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#a96835]">
              Discover the Sacred City
            </p>
            <h2 className="font-serif text-5xl font-normal md:text-6xl">
              The Spirit of <em className="text-[#bd8146]">Kashi</em>
            </h2>
          </div>

          <div className="grid gap-7 md:grid-cols-2">
            {highlights.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-[24px] border border-[#d8c09f]/50 bg-[#fffaf4] shadow-sm"
              >
                <div className="relative h-64">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                <div className="p-7 md:p-9">
                  <h3 className="mb-4 font-serif text-3xl">{item.title}</h3>
                  <p className="mb-6 font-serif leading-7 text-[#796d60]">
                    {item.text}
                  </p>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#a95731]"
                  >
                    Read More
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="px-5 py-20 md:px-12 lg:px-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#a96835]">
              Tirth Kshetra Purohit
            </p>
            <h2 className="font-serif text-5xl font-normal md:text-6xl">
              We Also Provide
              <em className="block text-[#bd8146]">These Facilities</em>
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility) => {
              const Icon = facility.icon;

              return (
                <article
                  key={facility.title}
                  className="group rounded-2xl border border-[#ded0bd] bg-[#fffaf4] p-7 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#c69a6b] text-[#a95731]">
                    <Icon size={22} strokeWidth={1.4} />
                  </div>

                  <h3 className="mb-3 font-serif text-2xl">
                    {facility.title}
                  </h3>

                  <p className="font-serif leading-7 text-[#796d60]">
                    {facility.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pind Daan CTA */}
      <section className="relative overflow-hidden bg-[#38271d] px-5 py-20 text-[#fff8ed] md:px-12 lg:px-24 lg:py-28">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d1a26e]/25" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-[#d9a66d]">
            Sacred Ancestor Rituals
          </p>

          <h2 className="font-serif text-5xl md:text-7xl">
            Pind <em className="text-[#e0ae78]">Daan</em>
          </h2>

          <p className="mx-auto mt-7 max-w-3xl font-serif text-lg leading-8 text-[#eadbca]">
            Pind Daan is considered a sacred process for attaining mukti,
            helping free the atma of the departed from the cycle of birth and
            death. We arrange authentic Pind Daan rituals with experienced
            Purohits in Kashi, Gaya and Prayag.
          </p>

          <Link
            href="/contact"
            className="mt-9 inline-flex items-center gap-8 rounded-full border border-[#d9a66d] px-8 py-4 font-serif transition hover:bg-[#d9a66d] hover:text-[#38271d]"
          >
            Contact Us
            <ArrowRight size={19} />
          </Link>
        </div>
      </section>
    </main>
  );
}