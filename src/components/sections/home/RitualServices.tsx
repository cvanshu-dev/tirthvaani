"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/* =========================================================
   SERVICE IMAGE
========================================================= */

function ServiceImage({
  href,
  src,
  alt,
  caption,
  priority = false,
}: {
  href: string;
  src: string;
  alt: string;
  caption: string;
  priority?: boolean;
}) {
  return (
    <Link
      href={href}
      className="ritual-showcase-image"
      aria-label={alt}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1050px) 100vw, 28vw"
        priority={priority}
        className="ritual-image"
      />

      <span className="ritual-showcase-image-shade" />
      <span className="ritual-image-caption">{caption}</span>
    </Link>
  );
}

export function RitualServices() {
  return (
    <section
      className="ritual-showcase"
      aria-label="Pandit and Purohit Services"
    >
      <div className="ritual-layout-shell">
        <header className="ritual-layout-heading">
          <h2>
            <span>Best Pandit &amp; Purohit</span>
            <em>Services</em>
          </h2>
          <p>Varanasi (Kashi) · Gaya · Prayagraj</p>
        </header>

        <div className="ritual-layout-grid">
          <article className="ritual-showcase-card ritual-card-pitru">
            <div className="ritual-showcase-copy">
              <h3>
                <span>Pitru</span>
                <em>Rituals</em>
              </h3>

              <p>
                Sacred rites for the peace, liberation and blessings of our
                ancestors.
              </p>

              <Link
                href="/pitru-rituals"
                className="ritual-showcase-button"
              >
                <span>Explore Pitru Rituals</span>
                <ArrowUpRight size={20} strokeWidth={1.6} />
              </Link>
            </div>
            <ServiceImage
              href="/pitru-rituals"
              src="/pitru-rituals.webp"
              alt="Explore Pitru Rituals"
              caption="ANCESTRAL RITES"
              priority
            />

          </article>

          <article className="ritual-showcase-card ritual-card-dev">
            <div className="ritual-showcase-copy">
              <h3>
                <span>Dev</span>
                <em>Rituals</em>
              </h3>

              <p>
                Vedic worship and sacred ceremonies to seek the grace of the
                divine.
              </p>

              <Link
                href="/dev-rituals"
                className="ritual-showcase-button"
              >
                <span>Explore Dev Rituals</span>
                <ArrowUpRight size={20} strokeWidth={1.6} />
              </Link>
            </div>
            <ServiceImage
              href="/dev-rituals"
              src="/dev-rituals.webp"
              alt="Explore Dev Rituals"
              caption="DIVINE WORSHIP"
              priority
            />

          </article>
        </div>
      </div>

      <style jsx>{`
        .ritual-showcase {
          --ritual-green: #354b3b;
          --ritual-saffron: #b65f38;
          --ritual-gold: #bc925b;

          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding: 80px 0;
          color: var(--ritual-green);

          background:
            radial-gradient(
              ellipse at 50% 10%,
              rgba(226, 191, 137, 0.2),
              transparent 42%
            ),
            linear-gradient(
              180deg,
              #fffaf2 0%,
              #fbf8f1 52%,
              #f7f2e8 100%
            );
        }

        .ritual-layout-shell {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 16px;
        }

        /* Shared horizontal gutters: match the other page sections */
        @media (min-width: 640px) {
          .ritual-layout-shell {
            padding-right: 28px;
            padding-left: 28px;
          }
        }

        @media (min-width: 768px) {
          .ritual-layout-shell {
            padding-right: 40px;
            padding-left: 40px;
          }
        }

        @media (min-width: 1024px) {
          .ritual-layout-shell {
            padding-right: 64px;
            padding-left: 64px;
          }
        }

        /* HEADING */

        .ritual-layout-heading {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 36px;
        }

        .ritual-heading-emblem {
          position: absolute;
          width: clamp(220px, 22vw, 260px);
          height: clamp(220px, 22vw, 260px);
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: -1;
          pointer-events: none;
          opacity: 0.72;
        }

        /* SAPTA JIHVA */

        .sapta-jihva {
          position: relative;
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          overflow: visible;
        }

        .agni-aura {
          position: absolute;
          width: 78%;
          height: 78%;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(227, 164, 80, 0.21) 0%,
            rgba(223, 174, 103, 0.09) 42%,
            transparent 72%
          );
          filter: blur(8px);
        }

        .agni-ring {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .agni-ring-outer {
          filter: drop-shadow(
            0 0 8px rgba(188, 146, 91, 0.1)
          );
        }

        .agni-ring-inner {
          opacity: 0.8;
        }

        .agni-flames {
          position: absolute;
          width: 92%;
          height: 65%;
          left: 4%;
          bottom: 17%;
          overflow: visible;
          filter: drop-shadow(
            0 0 12px rgba(214, 146, 70, 0.2)
          );
        }

        .agni-orbit {
          position: absolute;
          inset: 16%;
          border: 1px dashed rgba(183, 122, 61, 0.22);
          border-radius: 50%;
        }

        .agni-orbit span {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c38b4c;
          box-shadow: 0 0 12px rgba(195, 139, 76, 0.55);
        }

        .agni-orbit span:nth-child(1) {
          top: -3px;
          left: 50%;
        }

        .agni-orbit span:nth-child(2) {
          right: -3px;
          top: 50%;
        }

        .agni-orbit span:nth-child(3) {
          bottom: -3px;
          left: 50%;
        }

        .agni-orbit span:nth-child(4) {
          left: -3px;
          top: 50%;
        }

        .agni-halo {
          position: absolute;
          inset: 10%;
          border: 1px solid rgba(188, 146, 91, 0.1);
          border-radius: 50%;
          box-shadow:
            0 0 45px rgba(188, 146, 91, 0.06),
            inset 0 0 45px rgba(188, 146, 91, 0.04);
          pointer-events: none;
        }

        /* EYEBROW */

        .ritual-eyebrow {
          display: flex;
          align-items: center;
          gap: 13px;
          color: #9b7952;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 3px;
          margin-bottom: 16px;
        }

        .ritual-eyebrow span {
          display: block;
          width: 25px;
          height: 1px;
          background: #bc925b;
          opacity: 0.7;
        }

        .ritual-layout-heading h2 {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 1px;
          margin: 0;
          color: var(--ritual-green);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(37px, 4.4vw, 61px);
          font-weight: 400;
          line-height: 1.04;
          letter-spacing: -1.9px;
        }

        .ritual-layout-heading h2 em {
          color: var(--ritual-saffron);
          font-weight: 400;
        }

        .ritual-layout-heading > p {
          margin: 20px 0 0;
          color: #788272;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        /* SERVICE GRID */

        .ritual-layout-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 34px;
        }

        .ritual-showcase-copy {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          padding: 36px 25px 36px 32px;
          overflow: hidden;
        }

        .ritual-showcase-copy h3 {
          display: flex;
          flex-direction: column;
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(33px, 3vw, 43px);
          font-weight: 400;
          line-height: 1.04;
          letter-spacing: -1px;
          color: #354b3b;
        }

        .ritual-showcase-copy h3 em {
          margin-top: 3px;
          font-weight: 400;
          color: #b65f38;
        }

        .ritual-showcase-copy p {
          max-width: 235px;
          margin: 17px 0 24px;
          color: #73796d;
          font-size: 12px;
          line-height: 1.85;
        }

        /* BUTTON */

        .ritual-showcase-button {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          color: #a95130;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.7px;
          text-decoration: none;
        }

        .ritual-copy-leaf::after {
          inset: 32px;
        }

        /* IMAGE */

        .ritual-showcase-image {
          position: relative;
          display: block;
          min-height: 380px;
          overflow: hidden;
          isolation: isolate;
          background: #e9dfcf;
        }

        .ritual-image {
          object-fit: cover;
          z-index: 0;
          transform: none;
        }

        .ritual-showcase-image-shade {
          position: absolute;
          z-index: 1;
          inset: 0;
          background: linear-gradient(
            180deg,
            transparent 45%,
            rgba(23, 34, 26, 0.38) 100%
          );
          pointer-events: none;
        }

        .ritual-image-caption {
          position: absolute;
          z-index: 2;
          bottom: 20px;
          left: 21px;
          color: #fff9ef;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 2px;
          pointer-events: none;
        }

        /* SECTION DECORATION */

        /* TABLET */

        @media (max-width: 1050px) {
          .ritual-layout-grid {
            gap: 24px;
          }

          .ritual-showcase-card {
            grid-template-columns: 1fr;
            min-height: 0;
          }

          .ritual-showcase-copy {
            padding: 28px;
          }

          .ritual-showcase-image {
            min-height: 250px;
          }
        }

        /* MOBILE: KEEP BOTH SERVICE CARDS SIDE BY SIDE */

        @media (max-width: 640px) {
          .ritual-showcase {
            padding: 48px 0 54px;
          }

          .ritual-layout-heading {
            margin-bottom: 24px;
          }

          .ritual-layout-heading h2 {
            font-size: clamp(27px, 7.5vw, 36px);
            line-height: 1.08;
            letter-spacing: -0.9px;
          }

          .ritual-layout-heading > p {
            margin-top: 10px;
            font-size: 8px;
            line-height: 1.6;
            letter-spacing: 1px;
          }

          .ritual-layout-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
            align-items: stretch;
          }

          .ritual-showcase-card {
            display: flex;
            flex-direction: column;
            min-width: 0;
            min-height: 0;
            border-radius: 3px 22px 3px 3px;
            box-shadow: 0 8px 22px rgba(72, 58, 36, 0.06);
          }

          .ritual-showcase-image {
            position: relative;
            order: 0;
            display: block;
            width: 100%;
            height: clamp(105px, 30vw, 150px);
            min-height: 0;
            flex: 0 0 auto;
          }

          .ritual-showcase-copy {
            order: 1;
            display: flex;
            flex: 1;
            flex-direction: column;
            align-items: flex-start;
            min-width: 0;
            padding: 13px 11px 14px;
            overflow: visible;
          }

          .ritual-showcase-copy h3 {
            font-size: clamp(21px, 5.8vw, 29px);
            line-height: 1;
            letter-spacing: -0.6px;
          }

          .ritual-showcase-copy h3 em {
            margin-top: 2px;
          }

          .ritual-showcase-copy p {
            margin: 9px 0 13px;
            font-size: 10px;
            line-height: 1.55;
          }

          .ritual-showcase-button {
            width: 100%;
            min-height: 38px;
            justify-content: space-between;
            gap: 4px;
            margin-top: auto;
            padding: 8px 9px;
            font-size: 8px;
            line-height: 1.25;
            letter-spacing: 0;
          }

          .ritual-showcase-button svg {
            width: 14px;
            height: 14px;
            flex: 0 0 auto;
          }

          .ritual-image-caption {
            left: 9px;
            bottom: 9px;
            font-size: 7px;
            letter-spacing: 1px;
          }

          .ritual-image {
            transform: none;
          }
        }

        @media (max-width: 360px) {
          /* Keep the same 16px outer gutter on compact phones. */

          .ritual-layout-grid {
            gap: 8px;
          }

          .ritual-showcase-copy {
            padding: 11px 9px 12px;
          }

          .ritual-showcase-copy h3 {
            font-size: 21px;
          }

          .ritual-showcase-copy p {
            font-size: 9px;
          }

          .ritual-showcase-button {
            font-size: 8px;
            padding: 7px 6px;
          }
        }

      `}</style>
    </section>
  );
}
