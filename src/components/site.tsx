"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";

export type NavigationLink = {
  label: string;
  href: string;
  target?: string;
  children?: NavigationLink[];
};

export const defaultNavigation: NavigationLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Pitru Karyas", href: "/pitru-rituals" },
  { label: "Dev Karyas", href: "/dev-rituals" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

export function Navigation({
  items,
  brandName = "TirthVaani",
  logoUrl = "/logo.webp",
}: {
  items?: NavigationLink[];
  brandName?: string;
  logoUrl?: string;
}) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const navigationItems = items?.length ? items : defaultNavigation;

  const contactHref =
    navigationItems.find((item) =>
      item.label.toLowerCase().includes("contact")
    )?.href ?? "/contact";

  const mainItems = navigationItems.filter(
    (item) => !item.label.toLowerCase().includes("contact")
  );

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setServicesOpen(false);
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeMenu = () => {
    setOpen(false);
    setServicesOpen(false);
  };

  return (
  <header
  ref={headerRef}
  className="fixed top-0 left-0 z-[100] w-full px-4 pt-0 sm:px-6 lg:px-8 pointer-events-none"
>
      {/* MAIN NAVBAR */}
      <div
        className="
          pointer-events-auto relative mx-auto
          flex h-[70px] max-w-[1380px]
          items-center justify-between
          rounded-full
          border border-white/70
          bg-[#FBF8F1]/65
          px-5 sm:px-7 lg:px-9
          shadow-[0_4px_24px_rgba(53,75,59,0.07),inset_0_1px_0_rgba(255,255,255,0.85)]
          backdrop-blur-[32px]
          backdrop-saturate-[180%]
          transition-all duration-500
          hover:bg-[#FBF8F1]/80
        "
      >
        {/* Glass reflection */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          <div className="absolute inset-x-[10%] top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />
        </div>

        {/* IMAGE LOGO */}
        <Link
          href="/"
          onClick={closeMenu}
          aria-label={`${brandName} home`}
          className="relative z-10 flex shrink-0 items-center"
        >
          <Image
            src={logoUrl}
            alt={`${brandName} logo`}
            width={190}
            height={60}
            priority
            unoptimized
            className="h-[44px] w-auto object-contain"
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav
          aria-label="Main navigation"
          className="relative z-10 hidden items-center gap-1 lg:flex"
        >
          {mainItems.map((item) => {
            if (item.children?.length) {
              return (
                <div
                  key={item.href + item.label}
                  className="relative"
                >
                  <button
                    type="button"
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    aria-controls="apple-services-menu"
                    onClick={() =>
                      setServicesOpen((value) => !value)
                    }
                    className={`
                      group relative flex items-center gap-2
                      rounded-full px-4 py-3
                      font-sans text-[10px] font-semibold
                      uppercase tracking-[1.5px]
                      transition-all duration-300
                      ${
                        servicesOpen
                          ? "bg-white/70 text-[#B65F38] shadow-[0_2px_8px_rgba(53,75,59,0.04)]"
                          : "text-[#354B3B] hover:bg-white/60 hover:text-[#B65F38]"
                      }
                    `}
                  >
                    {item.label}

                    <ChevronDown
                      size={13}
                      strokeWidth={1.6}
                      className={`transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${
                        servicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* DROPDOWN */}
                  <div
                    id="apple-services-menu"
                    aria-hidden={!servicesOpen}
                    className={`
                      absolute left-1/2 top-full z-50
                      mt-3 w-[350px] -translate-x-1/2
                      rounded-[24px]
                      border border-white/80
                      bg-[#FBF8F1]/90
                      p-2
                      shadow-[0_20px_60px_rgba(53,75,59,0.12)]
                      backdrop-blur-[35px]
                      backdrop-saturate-[180%]
                      transition-all duration-500
                      ease-[cubic-bezier(.2,.8,.2,1)]
                      ${
                        servicesOpen
                          ? "visible translate-y-0 scale-100 opacity-100"
                          : "invisible -translate-y-3 scale-[0.97] opacity-0 pointer-events-none"
                      }
                    `}
                  >
                    <div className="rounded-[17px] bg-white/40 px-5 pb-5 pt-5">
                      <p className="font-sans text-[9px] font-semibold uppercase tracking-[2px] text-[#71816D]">
                        Explore our traditions
                      </p>

                      <h3 className="mt-2 font-serif text-[23px] leading-tight text-[#354B3B]">
                        Every ritual has
                        <br />
                        a deeper meaning.
                      </h3>
                    </div>

                    <div className="mt-1 space-y-1">
                      {item.children.map((child, index) => (
                        <Link
                          key={child.href + child.label}
                          href={child.href}
                          target={child.target}
                          onClick={closeMenu}
                          tabIndex={servicesOpen ? 0 : -1}
                          className="
                            group flex items-center justify-between
                            rounded-[15px] px-5 py-4
                            transition-all duration-300
                            hover:bg-white/75
                          "
                        >
                          <div className="flex items-center gap-4">
                            <span className="font-serif text-[12px] italic text-[#B65F38]">
                              0{index + 1}
                            </span>

                            <span className="font-serif text-[15px] text-[#354B3B] transition-colors group-hover:text-[#B65F38]">
                              {child.label}
                            </span>
                          </div>

                          <ArrowUpRight
                            size={15}
                            className="text-[#B65F38] opacity-50 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100"
                          />
                        </Link>
                      ))}
                    </div>

                    <div className="border-t border-[#71816D]/20 px-4 py-3">
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        tabIndex={servicesOpen ? 0 : -1}
                        className="flex items-center justify-between rounded-lg px-2 py-2 font-sans text-[9px] font-bold uppercase tracking-[1.6px] text-[#71816D] transition-colors hover:text-[#B65F38]"
                      >
                        View all services
                        <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                target={item.target}
                className="
                  relative rounded-full
                  px-4 py-3
                  font-sans text-[10px] font-semibold
                  uppercase tracking-[1.5px]
                  text-[#354B3B]
                  transition-all duration-300
                  hover:bg-white/60
                  hover:text-[#B65F38]
                "
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* DESKTOP CTA */}
        <div className="relative z-10 hidden lg:flex">
          <Link
            href={contactHref}
            className="
              group flex h-[43px] items-center gap-3
              rounded-full
              border border-[#A95130]/35
              bg-[#B65F38]
              py-1 pl-5 pr-1
              font-sans text-[9px] font-bold
              uppercase tracking-[1.5px]
              text-[#FFF8EF]
              shadow-[0_3px_12px_rgba(53,75,59,0.10)]
              transition-all duration-500
              hover:bg-[#A95130]
              hover:shadow-[0_7px_20px_rgba(53,75,59,0.17)]
            "
          >
            <span>Plan your journey</span>

            <span
              className="
                flex h-[34px] w-[34px] items-center justify-center
                rounded-full bg-white/15
                transition-all duration-500
                group-hover:rotate-45 group-hover:bg-white/25
              "
            >
              <ArrowUpRight size={15} strokeWidth={1.5} />
            </span>
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => {
            setOpen((value) => !value);
            setServicesOpen(false);
          }}
          className="
            relative z-[110] flex h-10 w-10
            items-center justify-center
            rounded-full border border-white/80
            bg-white/50 text-[#354B3B]
            transition-all duration-300
            hover:bg-white/85
            lg:hidden
          "
        >
          {open ? (
            <X size={19} strokeWidth={1.5} />
          ) : (
            <Menu size={19} strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        aria-hidden={!open}
        className={`
          pointer-events-auto absolute left-4 right-4 top-[calc(100%+10px)]
          z-[105] overflow-hidden
          rounded-[24px]
          border border-white/80
          bg-[#FBF8F1]/95
          p-2
          shadow-[0_18px_50px_rgba(53,75,59,0.12)]
          backdrop-blur-[35px]
          backdrop-saturate-[180%]
          transition-all duration-500
          ease-[cubic-bezier(.2,.8,.2,1)]
          sm:left-6 sm:right-6 lg:hidden
          ${
            open
              ? "visible translate-y-0 scale-100 opacity-100"
              : "invisible -translate-y-3 scale-[0.98] opacity-0 pointer-events-none"
          }
        `}
      >
        <div className="rounded-[17px] bg-white/40 px-5 py-5">
          <p className="font-sans text-[9px] font-semibold uppercase tracking-[2px] text-[#71816D]">
            Welcome to TirthVaani
          </p>

          <p className="mt-2 font-serif text-[23px] text-[#354B3B]">
            Find your sacred path.
          </p>
        </div>

        <nav className="px-2 py-2" aria-label="Mobile navigation">
          {navigationItems.map((item, index) => {
            if (item.children?.length) {
              return (
                <div
                  key={item.href + item.label}
                  className="border-b border-[#71816D]/20"
                >
                  <button
                    type="button"
                    aria-expanded={servicesOpen}
                    onClick={() =>
                      setServicesOpen((value) => !value)
                    }
                    className="
                      flex w-full items-center justify-between
                      rounded-xl px-3 py-4
                      font-serif text-[19px] text-[#354B3B]
                      transition-colors hover:bg-white/60
                    "
                  >
                    {item.label}

                    <ChevronDown
                      size={17}
                      className={`text-[#B65F38] transition-transform duration-300 ${
                        servicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ${
                      servicesOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-3 pl-5">
                        {item.children.map((child) => (
                          <Link
                            key={child.href + child.label}
                            href={child.href}
                            target={child.target}
                            onClick={closeMenu}
                            tabIndex={
                              open && servicesOpen ? 0 : -1
                            }
                            className="flex items-center justify-between py-3 font-serif text-[15px] text-[#667467] hover:text-[#B65F38]"
                          >
                            {child.label}
                            <ArrowUpRight size={14} />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                target={item.target}
                onClick={closeMenu}
                className="
                  flex items-center justify-between
                  rounded-xl border-b border-[#71816D]/20
                  px-3 py-4
                  font-serif text-[19px] text-[#354B3B]
                  transition-all duration-300
                  hover:bg-white/60 hover:text-[#B65F38]
                "
              >
                {item.label}

                <span className="font-sans text-[10px] text-[#819078]">
                  0{index + 1}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-2">
          <Link
            href={contactHref}
            onClick={closeMenu}
            className="
              flex h-[51px] items-center justify-between
              rounded-full bg-[#B65F38]
              pl-5 pr-2
              font-sans text-[10px] font-bold
              uppercase tracking-[1.5px]
              text-[#FFF8EF]
              transition-colors hover:bg-[#A95130]
            "
          >
            Plan your sacred journey

            <span className="flex h-[37px] w-[37px] items-center justify-center rounded-full bg-white/15">
              <ArrowUpRight size={16} />
            </span>
          </Link>
        </div>

        <p className="pb-3 pt-2 text-center font-serif text-[12px] italic text-[#819078]">
          Rooted in tradition. Guided with care.
        </p>
      </div>
    </header>
  );
}