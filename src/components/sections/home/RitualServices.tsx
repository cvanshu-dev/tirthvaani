
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Flower2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/* =========================================================
   SAPTA JIHVA — SEVEN TONGUES OF AGNI
========================================================= */

const sacredFlames = [
  { x: 72, scale: 0.68, angle: -12, delay: 0.1 },
  { x: 138, scale: 0.82, angle: -8, delay: 0.45 },
  { x: 204, scale: 0.94, angle: -4, delay: 0.2 },
  { x: 270, scale: 1.3, angle: 0, delay: 0.65 },
  { x: 336, scale: 0.94, angle: 4, delay: 0.3 },
  { x: 402, scale: 0.82, angle: 8, delay: 0.55 },
  { x: 468, scale: 0.68, angle: 12, delay: 0.15 },
];

function AgniFlame({
  x,
  scale,
  angle,
  delay,
  reduced,
}: {
  x: number;
  scale: number;
  angle: number;
  delay: number;
  reduced: boolean;
}) {
  return (
    <motion.g
      transform={`translate(${x} 250) scale(${scale}) rotate(${angle})`}
      animate={
        reduced
          ? undefined
          : {
              scale: [scale, scale * 1.035, scale],
              y: [250, 245, 250],
            }
      }
      transition={{
        duration: 2.8 + delay,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ transformOrigin: `${x}px 250px` }}
    >
      {/* Outer golden flame */}
      <path
        d="
          M0 0
          C-12 -20 -39 -45 -30 -91
          C-26 -116 -10 -136 3 -162
          C3 -135 25 -126 30 -101
          C41 -62 22 -25 0 0Z
        "
        fill="url(#agniOuter)"
        stroke="#A76B34"
        strokeWidth="1.1"
        strokeOpacity=".65"
      />

      {/* Inner flame */}
      <path
        d="
          M0 -4
          C-8 -24 -20 -45 -13 -72
          C-9 -87 -2 -99 4 -113
          C8 -91 20 -78 18 -57
          C17 -34 9 -16 0 -4Z
        "
        fill="url(#agniInner)"
        opacity=".88"
      />

      {/* Bright flame heart */}
      <path
        d="
          M0 -8
          C-7 -25 -7 -41 1 -59
          C12 -43 14 -24 0 -8Z
        "
        fill="#FFF0C4"
        fillOpacity=".82"
      />

      {/* Flame detailing */}
      <path
        d="M0 -20 Q-15 -55 2 -93"
        stroke="#FFF0C4"
        strokeOpacity=".5"
        strokeWidth="1"
        fill="none"
      />

      {/* Base glow */}
      <ellipse
        cx="0"
        cy="-2"
        rx="17"
        ry="3"
        fill="#E5B76E"
        fillOpacity=".3"
      />
    </motion.g>
  );
}

function SaptaJihva({ reduced }: { reduced: boolean }) {
  const embers = [
    { x: 85, y: 82, delay: 0 },
    { x: 150, y: 48, delay: 0.7 },
    { x: 220, y: 24, delay: 1.4 },
    { x: 320, y: 33, delay: 0.4 },
    { x: 390, y: 55, delay: 1.1 },
    { x: 455, y: 94, delay: 0.8 },
    { x: 180, y: 155, delay: 1.6 },
    { x: 360, y: 145, delay: 0.3 },
  ];

  return (
    <div className="sapta-jihva">
      {/* Ambient aura */}
      <motion.div
        className="agni-aura"
        animate={
          reduced
            ? undefined
            : {
                opacity: [0.45, 0.8, 0.45],
                scale: [0.95, 1.04, 0.95],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Outer rotating engraved ring */}
      <motion.svg
        viewBox="0 0 600 600"
        className="agni-ring agni-ring-outer"
        aria-hidden="true"
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{
          duration: 150,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <circle
          cx="300"
          cy="300"
          r="275"
          stroke="#B9894E"
          strokeOpacity=".42"
          strokeWidth="1"
          fill="none"
        />

        <circle
          cx="300"
          cy="300"
          r="258"
          stroke="#B9894E"
          strokeOpacity=".3"
          strokeWidth=".8"
          strokeDasharray="2 8"
          fill="none"
        />

        <circle
          cx="300"
          cy="300"
          r="235"
          stroke="#B9894E"
          strokeOpacity=".25"
          strokeWidth="1"
          fill="none"
        />

        {Array.from({ length: 48 }, (_, i) => (
          <g
            key={i}
            transform={`rotate(${i * 7.5} 300 300)`}
          >
            <path
              d="M300 25 L300 43"
              stroke="#B9894E"
              strokeOpacity={i % 4 === 0 ? ".8" : ".4"}
              strokeWidth={i % 4 === 0 ? "1.4" : ".7"}
            />

            {i % 2 === 0 && (
              <circle
                cx="300"
                cy="51"
                r="1.8"
                fill="#B9894E"
                fillOpacity=".6"
              />
            )}
          </g>
        ))}

        {/* Directional ornaments */}
        {[0, 45, 90, 135].map((angle) => (
          <g
            key={angle}
            transform={`rotate(${angle} 300 300)`}
          >
            <path
              d="M300 65 L292 81 L300 96 L308 81 Z"
              stroke="#B9894E"
              strokeOpacity=".65"
              fill="#D6AE73"
              fillOpacity=".06"
            />
          </g>
        ))}
      </motion.svg>

      {/* Inner rotating rings */}
      <motion.svg
        viewBox="0 0 600 600"
        className="agni-ring agni-ring-inner"
        aria-hidden="true"
        animate={reduced ? undefined : { rotate: -360 }}
        transition={{
          duration: 190,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <circle
          cx="300"
          cy="300"
          r="205"
          stroke="#BA8A4E"
          strokeOpacity=".32"
          strokeWidth="1"
          fill="none"
        />

        <circle
          cx="300"
          cy="300"
          r="190"
          stroke="#BA8A4E"
          strokeOpacity=".35"
          strokeWidth="1"
          strokeDasharray="3 7"
          fill="none"
        />

        <circle
          cx="300"
          cy="300"
          r="172"
          stroke="#BA8A4E"
          strokeOpacity=".2"
          strokeWidth="1"
          fill="none"
        />

        {Array.from({ length: 16 }, (_, i) => (
          <g
            key={i}
            transform={`rotate(${i * 22.5} 300 300)`}
          >
            <path
              d="M300 95 L300 120"
              stroke="#B9894E"
              strokeOpacity=".65"
              strokeWidth="1"
            />
            <path
              d="M300 132 L294 143 L300 154 L306 143 Z"
              stroke="#B9894E"
              strokeOpacity=".5"
              fill="#D6AE73"
              fillOpacity=".08"
            />
          </g>
        ))}
      </motion.svg>

      {/* Seven sacred flames */}
      <svg
        viewBox="0 0 540 300"
        className="agni-flames"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="agniOuter"
            x1="0"
            y1="-160"
            x2="0"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F8DDA0" />
            <stop offset=".38" stopColor="#D9A65B" />
            <stop offset=".76" stopColor="#BD6D35" />
            <stop offset="1" stopColor="#9B472C" />
          </linearGradient>

          <linearGradient
            id="agniInner"
            x1="0"
            y1="-110"
            x2="0"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFF3D1" />
            <stop offset=".48" stopColor="#F4C77E" />
            <stop offset="1" stopColor="#E18C43" />
          </linearGradient>

          <radialGradient id="agniFloor">
            <stop stopColor="#D89C4E" stopOpacity=".35" />
            <stop offset="1" stopColor="#D89C4E" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Fire bed */}
        <ellipse
          cx="270"
          cy="247"
          rx="235"
          ry="38"
          fill="url(#agniFloor)"
        />

        {/* Seven individually animated tongues */}
        {sacredFlames.map((flame, index) => (
          <AgniFlame
            key={index}
            {...flame}
            reduced={reduced}
          />
        ))}

        {/* Decorative fire base */}
        <path
          d="M52 258 Q160 270 270 258 Q380 270 488 258"
          stroke="#B9894E"
          strokeOpacity=".5"
          strokeWidth="1"
        />

        <path
          d="M105 269 Q270 286 435 269"
          stroke="#B9894E"
          strokeOpacity=".3"
          strokeWidth=".8"
        />

        {/* Embers */}
        {embers.map((ember, i) => (
          <motion.circle
            key={i}
            cx={ember.x}
            cy={ember.y}
            r={i % 3 === 0 ? 2.2 : 1.3}
            fill="#D59A51"
            animate={
              reduced
                ? undefined
                : {
                    opacity: [0.15, 0.9, 0.15],
                    y: [0, -12, -22],
                    scale: [0.7, 1.2, 0.6],
                  }
            }
            transition={{
              duration: 3 + ember.delay,
              delay: ember.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Small orbiting light points */}
      <motion.div
        className="agni-orbit"
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{
          duration: 38,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <span />
        <span />
        <span />
        <span />
      </motion.div>

      {/* Subtle halo */}
      <div className="agni-halo" />
    </div>
  );
}

/* =========================================================
   FLOATING PARTICLES
========================================================= */

function FloatingParticles({ reduced }: { reduced: boolean }) {
  const particles = [
    { x: "12%", y: "20%", delay: 0 },
    { x: "84%", y: "15%", delay: 1.2 },
    { x: "92%", y: "72%", delay: 2.1 },
    { x: "7%", y: "76%", delay: 0.8 },
    { x: "48%", y: "8%", delay: 1.7 },
    { x: "55%", y: "90%", delay: 2.8 },
  ];

  return (
    <div className="ritual-particles" aria-hidden="true">
      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className="ritual-particle"
          style={{
            left: particle.x,
            top: particle.y,
          }}
          animate={
            reduced
              ? undefined
              : {
                  y: [0, -12, 0],
                  opacity: [0.2, 0.7, 0.2],
                  scale: [0.8, 1.2, 0.8],
                }
          }
          transition={{
            duration: 5 + index * 0.6,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

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

/* =========================================================
   MAIN RITUAL SERVICES SECTION
========================================================= */

export function RitualServices() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      className="ritual-showcase"
      aria-label="Pandit and Purohit Services"
    >
      {/* Ambient background */}
      <div className="ritual-showcase-decoration ritual-decoration-top" />
      <div className="ritual-showcase-decoration ritual-decoration-bottom" />

      <div className="ritual-showcase-leaf ritual-leaf-left" />
      <div className="ritual-showcase-leaf ritual-leaf-right" />

      <FloatingParticles reduced={reduced} />

      <div className="ritual-layout-shell">

        {/* SECTION HEADING */}
        <motion.header
          className="ritual-layout-heading"
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease }}
        >
          {/* SAPTA JIHVA ARTWORK */}
          <div className="ritual-heading-emblem">
            <SaptaJihva reduced={reduced} />
          </div>


          <h2>
            <span>Best Pandit &amp; Purohit</span>
            <em>Services</em>
          </h2>

          <p>Varanasi (Kashi) · Gaya · Prayagraj</p>
        </motion.header>

        {/* SERVICE CARDS */}
        <div className="ritual-layout-grid">

          {/* PITRU RITUALS */}
          <motion.article
            className="ritual-showcase-card ritual-card-pitru"
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ duration: 0.75, ease }}
            whileHover={reduced ? undefined : { y: -6 }}
          >
            <div className="ritual-showcase-copy">
              <motion.div
                className="ritual-showcase-symbol"
                whileHover={
                  reduced ? undefined : { rotate: 12, scale: 1.08 }
                }
                transition={{ duration: 0.45 }}
              >
                <Flower2 size={43} strokeWidth={1.15} />
              </motion.div>

              <div className="ritual-small-divider">
                <span />
                <i />
                <span />
              </div>

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

              <div className="ritual-copy-leaf" />
            </div>

            <ServiceImage
              href="/pitru-rituals"
              src="/pitru-rituals.png"
              alt="Explore Pitru Rituals"
              caption="ANCESTRAL RITES"
              priority
            />
          </motion.article>

          {/* DEV RITUALS */}
          <motion.article
            className="ritual-showcase-card ritual-card-dev"
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{
              duration: 0.75,
              delay: 0.15,
              ease,
            }}
            whileHover={reduced ? undefined : { y: -6 }}
          >
            <div className="ritual-showcase-copy">
              <motion.div
                className="ritual-showcase-symbol"
                whileHover={
                  reduced ? undefined : { scale: 1.08 }
                }
                transition={{ duration: 0.45 }}
              >
                <span className="ritual-om-symbol">ॐ</span>
              </motion.div>

              <div className="ritual-small-divider">
                <span />
                <i />
                <span />
              </div>

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

              <div className="ritual-copy-leaf" />
            </div>

            <ServiceImage
              href="/dev-rituals"
              src="/dev-rituals.jpg"
              alt="Explore Dev Rituals"
              caption="DIVINE WORSHIP"
              priority
            />
          </motion.article>
        </div>
      </div>

      {/* =====================================================
          SECTION STYLES
      ===================================================== */}

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
          padding: 0 64px;
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

        .ritual-showcase-card {
          position: relative;
          display: grid;
          grid-template-columns: 0.88fr 1.12fr;
          min-height: 380px;
          overflow: hidden;
          border: 1px solid rgba(176, 139, 91, 0.22);
          background: rgba(255, 253, 248, 0.82);
          box-shadow: 0 15px 45px rgba(72, 58, 36, 0.045);

          transition:
            border-color 0.5s ease,
            box-shadow 0.5s ease;
        }

        .ritual-showcase-card:hover {
          border-color: rgba(182, 95, 56, 0.38);
          box-shadow: 0 22px 55px rgba(72, 58, 36, 0.1);
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

        .ritual-showcase-symbol {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 67px;
          height: 67px;
          margin-bottom: 22px;
          color: #a97745;
          border: 1px solid rgba(188, 146, 91, 0.42);
          border-radius: 50%;
          background: rgba(218, 181, 124, 0.09);
          transition:
            background 0.4s ease,
            border-color 0.4s ease;
        }

        .ritual-showcase-card:hover .ritual-showcase-symbol {
          background: rgba(218, 181, 124, 0.19);
          border-color: rgba(188, 146, 91, 0.75);
        }

        .ritual-om-symbol {
          font-family: serif;
          font-size: 39px;
          line-height: 1;
          color: #a97745;
        }

        .ritual-small-divider {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 18px;
        }

        .ritual-small-divider span {
          width: 23px;
          height: 1px;
          background: #c69b65;
        }

        .ritual-small-divider i {
          width: 5px;
          height: 5px;
          background: #b65f38;
          transform: rotate(45deg);
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
          transition:
            gap 0.35s ease,
            color 0.35s ease;
        }

        .ritual-showcase-button:hover {
          gap: 20px;
          color: #843f28;
        }

        .ritual-showcase-button svg {
          transition: transform 0.35s ease;
        }

        .ritual-showcase-button:hover svg {
          transform: translate(3px, -3px);
        }

        .ritual-copy-leaf {
          position: absolute;
          right: -70px;
          bottom: -85px;
          width: 180px;
          height: 180px;
          border: 1px solid rgba(188, 146, 91, 0.13);
          border-radius: 50%;
          pointer-events: none;
        }

        .ritual-copy-leaf::before,
        .ritual-copy-leaf::after {
          content: "";
          position: absolute;
          inset: 15px;
          border: 1px solid rgba(188, 146, 91, 0.12);
          border-radius: 50%;
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
          transform: scale(1);
          transition: transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .ritual-showcase-image:hover .ritual-image {
          transform: scale(1.055);
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

        .ritual-showcase-decoration {
          position: absolute;
          z-index: 0;
          width: 420px;
          height: 420px;
          border: 1px solid rgba(188, 146, 91, 0.12);
          border-radius: 50%;
          pointer-events: none;
        }

        .ritual-decoration-top {
          top: -280px;
          left: -190px;
        }

        .ritual-decoration-bottom {
          right: -270px;
          bottom: -290px;
          width: 520px;
          height: 520px;
        }

        .ritual-showcase-leaf {
          position: absolute;
          width: 130px;
          height: 220px;
          z-index: 0;
          opacity: 0.12;
          pointer-events: none;
        }

        .ritual-leaf-left {
          left: -50px;
          top: 36%;
          border-left: 1px solid #a98255;
          border-radius: 100% 0;
          transform: rotate(-25deg);
        }

        .ritual-leaf-right {
          right: -50px;
          top: 25%;
          border-right: 1px solid #a98255;
          border-radius: 0 100%;
          transform: rotate(25deg);
        }

        /* PARTICLES */

        .ritual-particles {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }

        .ritual-particle {
          position: absolute;
          display: block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #c49a62;
          box-shadow: 0 0 12px rgba(196, 154, 98, 0.45);
        }

        /* TABLET */

        @media (max-width: 1050px) {
          .ritual-layout-shell {
            padding: 0 40px;
          }

          .ritual-layout-grid {
            gap: 28px;
          }

          .ritual-showcase-card {
            grid-template-columns: 1fr;
          }

          .ritual-showcase-copy {
            padding: 30px;
          }

          .ritual-showcase-image {
            min-height: 290px;
          }
        }

        /* MOBILE */

        @media (max-width: 640px) {
          .ritual-showcase {
            padding: 64px 0;
          }

          .ritual-layout-shell {
            padding: 0 20px;
          }

          .ritual-layout-heading {
            margin-bottom: 30px;
          }

          .ritual-heading-emblem {
            width: 190px;
            height: 190px;
            top: -20px;
            opacity: 0.62;
          }

          .agni-flames {
            width: 96%;
            height: 60%;
            left: 2%;
            bottom: 19%;
          }

          .ritual-layout-heading h2 {
            font-size: clamp(35px, 10vw, 46px);
            letter-spacing: -1.4px;
          }

          .ritual-layout-heading > p {
            font-size: 9px;
            letter-spacing: 1.5px;
            margin-top: 15px;
          }

          .ritual-layout-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .ritual-showcase-card {
            grid-template-columns: 1fr 1fr;
            min-height: 280px;
          }

          .ritual-showcase-copy {
            padding: 24px 15px 24px 19px;
          }

          .ritual-showcase-symbol {
            width: 51px;
            height: 51px;
            margin-bottom: 17px;
          }

          .ritual-showcase-symbol svg {
            width: 30px;
            height: 30px;
          }

          .ritual-om-symbol {
            font-size: 31px;
          }

          .ritual-showcase-copy h3 {
            font-size: clamp(27px, 7vw, 35px);
          }

          .ritual-showcase-copy p {
            font-size: 10px;
            line-height: 1.7;
            margin: 12px 0 18px;
          }

          .ritual-showcase-button {
            gap: 5px;
            font-size: 8px;
            letter-spacing: 0;
          }

          .ritual-showcase-button svg {
            width: 16px;
            height: 16px;
          }

          .ritual-showcase-image {
            min-height: 280px;
          }

          .ritual-image-caption {
            left: 10px;
            bottom: 12px;
            font-size: 7px;
            letter-spacing: 1px;
          }

          .ritual-particles {
            opacity: 0.55;
          }
        }

        /* ACCESSIBILITY */

        @media (prefers-reduced-motion: reduce) {
          .ritual-image {
            transition: none;
            transform: none !important;
          }

          .ritual-showcase-card,
          .ritual-showcase-button,
          .ritual-showcase-button svg {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
