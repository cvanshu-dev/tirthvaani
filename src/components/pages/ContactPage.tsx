import Link from "next/link";
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export function Contact({ hideHero = false }: { hideHero?: boolean }) {
  return (
    <main className="overflow-hidden bg-[#faf3ea] text-[#35281e]">
      {/* Hero */}

      {!hideHero && (
      <section className="relative border-b border-[#d8c09f]/40 px-5 py-20 text-center md:px-12 lg:px-24 lg:py-28">
        <div className="absolute left-1/2 top-0 h-full w-px bg-[#bd9068]/20" />

        <div className="relative mx-auto max-w-5xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-[#a96835]">
            Tirth Kshetra Purohit
          </p>

          <h1 className="font-serif text-6xl font-normal tracking-[-2px] md:text-8xl">
            Contact
          </h1>

          <div className="mt-7 flex items-center justify-center gap-3 text-sm text-[#796d60]">
            <Link href="/" className="transition hover:text-[#a95731]">
              Home
            </Link>
            <span className="text-[#b88758]">·</span>
            <span>Contact</span>
          </div>
        </div>
      </section>
      )}

      {/* Contact content */}
      <section className="relative px-5 py-20 md:px-12 lg:px-24 lg:py-32">
        <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#cba77d]/20 lg:block" />

        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          {/* Contact information */}
          <div>
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-[#a96835]">
              Get In Touch
            </p>

            <h2 className="font-serif text-5xl font-normal leading-[1.05] tracking-[-2px] md:text-7xl">
              We are here to
              <em className="block text-[#bd8146]">help you.</em>
            </h2>

            <div className="my-9 flex w-24 items-center gap-2">
              <span className="h-px flex-1 bg-[#ae7845]" />
              <span className="h-2 w-2 rotate-45 bg-[#ae7845]" />
              <span className="h-px flex-1 bg-[#ae7845]" />
            </div>

            <p className="max-w-lg font-serif text-lg leading-8 text-[#66584e]">
              Would you have any enquiry, please feel free to contact us. Our
              team will be happy to help you plan your sacred journey and
              rituals in Kashi.
            </p>

            <div className="mt-10 space-y-7">
              <div className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#c69a6b] text-[#a95731]">
                  <MapPin size={21} strokeWidth={1.4} />
                </div>

                <div>
                  <h3 className="mb-2 font-serif text-2xl">Address</h3>
                  <p className="max-w-xs font-serif leading-7 text-[#796d60]">
                    Varansi, Uttar Pradesh, India
                    <br />
                    Varanasi - 221001
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#c69a6b] text-[#a95731]">
                  <Mail size={21} strokeWidth={1.4} />
                </div>

                <div>
                  <h3 className="mb-2 font-serif text-2xl">Email Us</h3>
                  <div className="space-y-1 font-serif text-[#796d60]">
                    <a
                      href="mailto:info@tirthpurohit.org"
                      className="block transition hover:text-[#a95731]"
                    >
                      xyz@gmail.com
                    </a>
                    <a
                      href="mailto:support@tirthpurohit.org"
                      className="block transition hover:text-[#a95731]"
                    >
                     abcd@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#c69a6b] text-[#a95731]">
                  <Phone size={21} strokeWidth={1.4} />
                </div>

                <div>
                  <h3 className="mb-2 font-serif text-2xl">Call Now</h3>
                  <div className="space-y-1 font-serif text-[#796d60]">
                    <a
                      href="tel:+91xxxxxxxxx"
                      className="block transition hover:text-[#a95731]"
                    >
                      +91-xxxxxxxxx
                    </a>
                    <a
                      href="tel:+91xxxxxxxx"
                      className="block transition hover:text-[#a95731]"
                    >
                      +91-xxxxxxxxx
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-[28px] border border-[#ded0bd] bg-[#fffaf4] p-7 shadow-[0_20px_50px_rgba(70,42,20,0.07)] md:p-10 lg:p-14">
            <div className="mb-9">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#a96835]">
                Contact Us
              </p>

              <h2 className="font-serif text-4xl md:text-5xl">
                Have Any <em className="text-[#bd8146]">Question?</em>
              </h2>
            </div>

            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block font-serif text-sm text-[#66584e]">
                    Your Name*
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your name"
                    className="w-full border-b border-[#cdb99d] bg-transparent px-0 py-3 font-serif text-[#35281e] outline-none placeholder:text-[#ad9c89] focus:border-[#a95731]"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block font-serif text-sm text-[#66584e]">
                    Your Phone*
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Enter your phone"
                    className="w-full border-b border-[#cdb99d] bg-transparent px-0 py-3 font-serif text-[#35281e] outline-none placeholder:text-[#ad9c89] focus:border-[#a95731]"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block font-serif text-sm text-[#66584e]">
                  Your Email
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full border-b border-[#cdb99d] bg-transparent px-0 py-3 font-serif text-[#35281e] outline-none placeholder:text-[#ad9c89] focus:border-[#a95731]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block font-serif text-sm text-[#66584e]">
                  Address
                </span>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  className="w-full border-b border-[#cdb99d] bg-transparent px-0 py-3 font-serif text-[#35281e] outline-none placeholder:text-[#ad9c89] focus:border-[#a95731]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block font-serif text-sm text-[#66584e]">
                  Message...
                </span>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Write your message"
                  className="w-full resize-none border-b border-[#cdb99d] bg-transparent px-0 py-3 font-serif text-[#35281e] outline-none placeholder:text-[#ad9c89] focus:border-[#a95731]"
                />
              </label>

              <button
                type="submit"
                className="group mt-3 inline-flex items-center gap-8 rounded-full border border-[#bd8b60] px-8 py-4 font-serif text-base text-[#493328] transition hover:-translate-y-1 hover:bg-[#a95731] hover:text-white"
              >
                <span>Get in Touch</span>
                <ArrowRight
                  size={19}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#38271d] px-5 py-16 text-center text-[#fff8ed] md:px-12">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#d9a66d]">
          Sacred Journeys Begin Here
        </p>

        <h2 className="font-serif text-4xl md:text-6xl">
          Let us plan your <em className="text-[#e0ae78]">ritual.</em>
        </h2>
      </section>
    </main>
  );
}