import Link from "next/link";

const footerLinks = [
  { label: "Rituals", href: "/services" },
  { label: "Destinations", href: "/destinations" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#d8c6ad] bg-[#2b1d16] text-[#fff8ed]">
      <div className="mx-auto max-w-[1240px] px-6 py-14 sm:px-10 lg:px-12 lg:py-18">
        <div className="grid gap-12 md:grid-cols-[1.4fr_0.8fr_0.8fr] md:gap-16">
          <div>
            <Link
              href="/"
              className="inline-block font-serif text-4xl font-normal tracking-[-0.04em] text-[#fff8ed] transition-colors hover:text-[#e2bb82]"
            >
              TirthVaani
            </Link>

            <p className="mt-4 max-w-md text-[11px] font-semibold uppercase leading-6 tracking-[0.24em] text-[#d6a276]">
              Where sacred journeys find their meaning.
            </p>

            <p className="mt-5 max-w-md text-sm leading-7 text-[#cbb9a6]">
              Meaningful rituals, trusted guidance and sacred journeys
              across India&apos;s timeless spiritual destinations.
            </p>
          </div>

          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#e2bb82]">
              Explore
            </p>

            <nav className="flex flex-col items-start gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#fff8ed] transition-colors hover:text-[#e2bb82]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#e2bb82]">
              Sacred destinations
            </p>

            <p className="text-sm leading-7 text-[#cbb9a6]">
              Varanasi
              <br />
              Gaya
              <br />
              Prayagraj
            </p>
          </div>
        </div>

        <div className="my-10 flex items-center gap-4 text-[#b3834d]">
          <span className="h-px flex-1 bg-[#735443]" />
          <span className="text-lg">✥</span>
          <span className="h-px flex-1 bg-[#735443]" />
        </div>

        <div className="flex flex-col gap-3 text-xs text-[#bda995] sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} TirthVaani
          </span>

          <span>
            Created with care, for journeys that matter.
          </span>
        </div>
      </div>
    </footer>
  );
}