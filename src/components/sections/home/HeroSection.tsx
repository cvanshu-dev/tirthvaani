
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const GOD_IMAGE = "/shiv.png";

const petals = Array.from({ length: 16 }, (_, i) => i);
const rays = Array.from({ length: 96 }, (_, i) => i);

/* =========================================
   FLUID IMAGE REVEAL
========================================= */

type TrailPoint = {
  x: number;
  y: number;
  life: number;
  radius: number;
};

function FluidImageReveal({ src }: { src: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<TrailPoint[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
    });
    if (!ctx) return;

    const maskCanvas = document.createElement("canvas");
    const maskCtx = maskCanvas.getContext("2d", { alpha: true });
    const imageCanvas = document.createElement("canvas");
    const imageCtx = imageCanvas.getContext("2d", { alpha: true });

    if (!maskCtx || !imageCtx) return;

    const image = new window.Image();
    image.decoding = "async";
    image.src = src;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let lastTime = 0;
    let previousPointer: { x: number; y: number } | null = null;
    let disposed = false;
    let imageReady = false;

    const drawCachedImage = () => {
      if (!imageReady || !width || !height) return;

      const scale = Math.min(
        width / image.naturalWidth,
        height / image.naturalHeight
      );

      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      const drawX = (width - drawWidth) / 2;
      const drawY = height - drawHeight;

      imageCanvas.width = canvas.width;
      imageCanvas.height = canvas.height;

      imageCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      imageCtx.clearRect(0, 0, width, height);
      imageCtx.filter = "saturate(1.12) contrast(1.04)";
      imageCtx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
      imageCtx.filter = "none";
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      const pixelWidth = Math.max(1, Math.round(width * dpr));
      const pixelHeight = Math.max(1, Math.round(height * dpr));

      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
      maskCanvas.width = pixelWidth;
      maskCanvas.height = pixelHeight;
      imageCanvas.width = pixelWidth;
      imageCanvas.height = pixelHeight;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      maskCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      imageCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      pointsRef.current = [];
      previousPointer = null;
      ctx.clearRect(0, 0, width, height);
      maskCtx.clearRect(0, 0, width, height);

      drawCachedImage();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const addPoint = (x: number, y: number, radius: number) => {
      pointsRef.current.push({ x, y, life: 1, radius });
    };

    const schedule = () => {
      if (!frame && !disposed) {
        frame = requestAnimationFrame(render);
      }
    };

    const handleMove = (event: globalThis.PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

      if (previousPointer) {
        const dx = x - previousPointer.x;
        const dy = y - previousPointer.y;
        const distance = Math.hypot(dx, dy);
        const radius = Math.min(112, 68 + distance * 0.2);
        const steps = Math.min(16, Math.max(1, Math.ceil(distance / 10)));

        for (let i = 1; i <= steps; i++) {
          const t = i / steps;
          addPoint(
            previousPointer.x + dx * t,
            previousPointer.y + dy * t,
            radius
          );
        }
      } else {
        addPoint(x, y, 72);
      }

      previousPointer = { x, y };

      if (pointsRef.current.length > 120) {
        pointsRef.current.splice(0, pointsRef.current.length - 120);
      }

      schedule();
    };

    const handleLeave = () => {
      previousPointer = null;
    };

    function render(time: number) {
      frame = 0;
      if (disposed || !imageReady) return;

      const delta = lastTime ? Math.min(time - lastTime, 40) : 16;
      lastTime = time;

      const points = pointsRef.current;

      maskCtx.clearRect(0, 0, width, height);
      maskCtx.save();
      maskCtx.filter = "blur(8px)";
      maskCtx.globalCompositeOperation = "source-over";
      maskCtx.lineCap = "round";
      maskCtx.lineJoin = "round";

      for (let i = 1; i < points.length; i++) {
        const previous = points[i - 1];
        const current = points[i];
        const life = Math.min(previous.life, current.life);

        if (life <= 0) continue;

        maskCtx.beginPath();
        maskCtx.moveTo(previous.x, previous.y);
        maskCtx.lineTo(current.x, current.y);
        maskCtx.lineWidth =
          Math.min(previous.radius, current.radius) * 1.45;
        maskCtx.strokeStyle = `rgba(255,255,255,${life * 0.9})`;
        maskCtx.stroke();
      }

      for (const point of points) {
        if (point.life <= 0) continue;

        const radius = point.radius * (0.72 + point.life * 0.28);
        const gradient = maskCtx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, radius
        );

        gradient.addColorStop(0, `rgba(255,255,255,${point.life})`);
        gradient.addColorStop(0.52, `rgba(255,255,255,${point.life * 0.92})`);
        gradient.addColorStop(0.82, `rgba(255,255,255,${point.life * 0.48})`);
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        maskCtx.fillStyle = gradient;
        maskCtx.beginPath();
        maskCtx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        maskCtx.fill();
      }

      maskCtx.restore();

      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.drawImage(imageCanvas, 0, 0, width, height);
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(maskCanvas, 0, 0, width, height);
      ctx.restore();

      pointsRef.current = points.filter((point) => {
        point.life -= delta / 1150;
        return point.life > 0;
      });

      if (pointsRef.current.length > 0) {
        schedule();
      } else {
        lastTime = 0;
      }
    }

    image.onload = () => {
      if (disposed) return;
      imageReady = true;
      drawCachedImage();
      schedule();
    };

    if (image.complete && image.naturalWidth) {
      imageReady = true;
      drawCachedImage();
      schedule();
    }

    canvas.addEventListener("pointermove", handleMove, { passive: true });
    canvas.addEventListener("pointerleave", handleLeave, { passive: true });

    return () => {
      disposed = true;
      observer.disconnect();
      canvas.removeEventListener("pointermove", handleMove);
      canvas.removeEventListener("pointerleave", handleLeave);

      if (frame) cancelAnimationFrame(frame);

      image.onload = null;
      pointsRef.current = [];
    };
  }, [src]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full touch-pan-y"
      style={{ pointerEvents: "auto" }}
    />
  );
}

/* =========================================
   CHAKRA
========================================= */

function Chakra() {
  return (
    <svg
      viewBox="0 0 800 800"
      fill="none"
      className="h-full w-full overflow-visible"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="chakraCore">
          <stop offset="0%" stopColor="#fff5d6" stopOpacity=".95" />
          <stop offset="35%" stopColor="#e9ad50" stopOpacity=".4" />
          <stop offset="100%" stopColor="#d59a3b" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="chakraGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f9d99b" />
          <stop offset="50%" stopColor="#c48627" />
          <stop offset="100%" stopColor="#f5d18b" />
        </linearGradient>

        <filter id="chakraGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle
        cx="400"
        cy="400"
        r="245"
        fill="url(#chakraCore)"
        className="animate-pulse"
        style={{ animationDuration: "7s" }}
      />

      {/* Outer rotating mechanical ring */}
      <g
        className="origin-center animate-spin [will-change:transform]"
        style={{ animationDuration: "100s" }}
      >
        <circle cx="400" cy="400" r="382" stroke="url(#chakraGold)" strokeWidth="1.4" />
        <circle cx="400" cy="400" r="368" stroke="#D79B43" strokeOpacity=".65" />
        <circle cx="400" cy="400" r="350" stroke="#D79B43" strokeOpacity=".4" strokeDasharray="2 8" />

        {rays.map((i) => (
          <line
            key={i}
            x1="400"
            y1="18"
            x2="400"
            y2={i % 4 === 0 ? "54" : i % 2 === 0 ? "40" : "30"}
            transform={`rotate(${i * 3.75} 400 400)`}
            stroke="#C88A30"
            strokeWidth={i % 4 === 0 ? "1.5" : ".8"}
            opacity={i % 4 === 0 ? ".9" : ".55"}
          />
        ))}

        {petals.map((i) => (
          <circle
            key={i}
            cx="400"
            cy="35"
            r="3"
            fill="#D69A36"
            transform={`rotate(${i * 22.5} 400 400)`}
          />
        ))}
      </g>

      {/* Counter rotating inner geometry */}
      <g
        className="origin-center animate-spin [will-change:transform]"
        style={{
          animationDuration: "75s",
          animationDirection: "reverse",
        }}
      >
        <circle cx="400" cy="400" r="326" stroke="#D99B3E" strokeOpacity=".65" />
        <circle cx="400" cy="400" r="310" stroke="#D99B3E" strokeDasharray="1 6" />
        <circle cx="400" cy="400" r="270" stroke="#DAA34C" strokeWidth="1.3" />

        {petals.map((i) => (
          <g key={i} transform={`rotate(${i * 22.5} 400 400)`}>
            <path
              d="M400 125 C355 180 342 235 400 290 C458 235 445 180 400 125Z"
              stroke="url(#chakraGold)"
              strokeWidth="1.5"
              fill="#E9B75C"
              fillOpacity=".035"
            />
            <path
              d="M400 125 Q400 210 400 290"
              stroke="#C98A32"
              strokeOpacity=".65"
              strokeWidth=".8"
            />
          </g>
        ))}
      </g>

      {/* Inner lotus geometry */}
      <g
        className="origin-center animate-spin [will-change:transform]"
        style={{ animationDuration: "55s" }}
      >
        <circle cx="400" cy="400" r="225" stroke="#DAA34C" strokeOpacity=".7" />
        <circle cx="400" cy="400" r="195" stroke="#DAA34C" strokeOpacity=".5" />

        {Array.from({ length: 12 }, (_, i) => (
          <g key={i} transform={`rotate(${i * 30} 400 400)`}>
            <path
              d="M400 205 C370 250 365 300 400 340 C435 300 430 250 400 205Z"
              fill="#E7B15C"
              fillOpacity=".07"
              stroke="#D39A43"
              strokeWidth="1.3"
            />
          </g>
        ))}
      </g>

      {/* Sacred central mandala */}
      <g filter="url(#chakraGlow)">
        <circle cx="400" cy="400" r="135" stroke="#D9A34E" strokeOpacity=".6" />
        <circle cx="400" cy="400" r="118" stroke="#D9A34E" strokeDasharray="3 5" />

        {Array.from({ length: 8 }, (_, i) => (
          <g key={i} transform={`rotate(${i * 45} 400 400)`}>
            <path
              d="M400 290 Q350 345 400 400 Q450 345 400 290Z"
              stroke="#D69A36"
              strokeWidth="1.5"
              fill="#D9A34E"
              fillOpacity=".06"
            />
          </g>
        ))}

        <circle cx="400" cy="400" r="45" fill="url(#chakraCore)" />
        <circle cx="400" cy="400" r="22" stroke="#C68A32" strokeWidth="1.5" />
        <circle cx="400" cy="400" r="8" fill="#D49A3E" />
        <circle cx="400" cy="400" r="3" fill="#FFF4D4" />
      </g>
    </svg>
  );
}

/* =========================================
   FLOATING PARTICLES
========================================= */

function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 24 }, (_, i) => (
        <span
          key={i}
          className="absolute h-[3px] w-[3px] rounded-full bg-[#D69A36] animate-float-particle"
          style={{
            left: `${10 + ((i * 17) % 80)}%`,
            top: `${10 + ((i * 23) % 75)}%`,
            opacity: 0.25 + (i % 4) * 0.12,
            animationDuration: `${7 + (i % 5) * 2}s`,
            animationDelay: `${i * -0.5}s`,
          }}
        />
      ))}
    </div>
  );
}

/* =========================================
   HERO SECTION
========================================= */

export function HeroSection() {
  return (
    <section className="relative isolate h-[940px] min-h-[850px] w-full overflow-hidden bg-[#fff7ee] text-[#351e18] lg:h-[100svh] lg:min-h-[900px]">

      {/* Background */}
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(ellipse_at_76%_46%,rgba(255,217,166,0.35),transparent_47%),radial-gradient(ellipse_at_12%_60%,#fffdf9,transparent_52%),linear-gradient(110deg,#fff9f2,#fdf0e3)]" />

      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -z-10 left-[40%] top-[10%] h-[650px] w-[650px] rounded-full bg-[#e8b65d]/10 blur-[100px] animate-pulse [animation-duration:8s]" />

      {/* Chakra */}
      <div className="pointer-events-none absolute -z-10 left-[36%] top-[5%] aspect-square w-[54vw] max-w-[850px] opacity-[0.83] max-lg:left-0 max-lg:top-[48%] max-lg:w-[110%] max-lg:opacity-50">
        <Chakra />
      </div>

      {/* Independent outer halo */}
      <div className="pointer-events-none absolute -z-10 left-[48%] top-[20%] h-[450px] w-[450px] rounded-full border border-[#D9A34E]/20 animate-spin [animation-duration:100s] max-lg:hidden">
        <div className="absolute inset-[12px] rounded-full border border-dashed border-[#D9A34E]/30" />
        <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[#E6B65E] shadow-[0_0_18px_#d69a36]" />
      </div>

      {/* Golden aura behind Shiva */}
      <div className="pointer-events-none absolute -z-10 left-[53%] top-[29%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(232,175,84,0.32),rgba(237,189,115,0.12)_50%,transparent_72%)] blur-2xl animate-pulse [animation-duration:6s]" />

      {/* Shiva image */}
      <div className="pointer-events-none absolute bottom-[-2%] right-[-3%] z-[1] h-[90%] w-[68%] max-lg:bottom-0 max-lg:right-[-9%] max-lg:h-[47%] max-lg:w-[105%] max-sm:h-[42%]">
        <Image
          src={GOD_IMAGE}
          alt="Lord Shiva"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 68vw"
          className="pointer-events-none object-contain object-bottom drop-shadow-[0_15px_25px_rgba(91,48,25,0.12)]"
        />

        <div className="pointer-events-none absolute inset-0 z-[2]">
          <FluidImageReveal src="/rudrashi.png" />
        </div>
      </div>

      <FloatingParticles />

      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <div className="absolute left-[6%] top-[14.5%] z-[5] w-[560px] max-w-[44%] max-lg:left-[5%] max-lg:top-[13%] max-lg:max-w-[49%] max-md:relative max-md:left-auto max-md:top-auto max-md:w-full max-md:max-w-none max-md:px-[6%] max-md:pb-[390px] max-md:pt-[105px]">

      
{/* =====================================
    SACRED JOURNEY — EDITORIAL CONTENT
===================================== */}


{/* =====================================
    SACRED JOURNEY — EDITORIAL CONTENT
===================================== */}

<div className="relative z-[6] max-w-[590px]">

  {/* Eyebrow */}
  <div className="mb-7 flex items-center gap-4">
    <span className="h-px w-10 bg-[#b18a55]" />
    <span className="font-sans text-[10px] font-semibold uppercase tracking-[3px] text-[#92734d]">
      A Journey Rooted in Tradition
    </span>
    <span className="h-px w-10 bg-[#b18a55]/50" />
  </div>

  {/* Heading */}
  <h2 className="font-serif text-[clamp(43px,5vw,68px)] font-medium leading-[1.06] tracking-[-2.5px] text-[#493629]">
    Every family has
    <br />
    a sacred path.
    <br />
    <span className="relative inline-block italic text-[#a77b43]">
      Find yours.
      <span className="absolute -bottom-2 left-0 h-[1px] w-[75%] bg-[#b18a55]/70" />
    </span>
  </h2>

  {/* Decorative separator */}
  <div className="my-8 flex items-center gap-3">
    <span className="h-[5px] w-[5px] rotate-45 bg-[#b18a55]" />
    <span className="h-px w-16 bg-gradient-to-r from-[#b18a55] to-transparent" />
  </div>

  {/* Description */}
  <p className="max-w-[470px] font-serif text-[16px] leading-[1.9] text-[#74604e] md:text-[17px]">
    Discover sacred destinations, understand the rituals that honour
    your traditions, and find experienced Pandits to guide your
    family's spiritual journey.
  </p>

  {/* CTA and brand promise */}
  <div className="mt-9 flex flex-wrap items-center gap-7">

    <Link
      href="/destinations"
      className="group relative flex min-h-[56px] items-center gap-7 overflow-hidden border border-[#a88a60] bg-[#826746] px-7 text-[10px] font-bold uppercase tracking-[1.8px] text-[#fffaf0] shadow-[0_7px_20px_rgba(91,68,42,0.12)] transition-all duration-500 hover:-translate-y-1 hover:border-[#70563a] hover:bg-[#70563a] hover:shadow-[0_12px_26px_rgba(91,68,42,0.18)]"
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      <span className="relative">
        Explore Sacred Journeys
      </span>

      <span className="relative text-[18px] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
        ↗
      </span>
    </Link>

    {/* Brand promise */}
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#b18a55]/50 bg-[#f7eddf]">
        <span className="font-serif text-[19px] text-[#92734d]">
          ॐ
        </span>
      </div>

      <div>
        <p className="font-sans text-[9px] font-bold uppercase tracking-[1.7px] text-[#594534]">
          Rooted in tradition
        </p>
        <p className="mt-1 font-serif text-[13px] italic text-[#92734d]">
          Guided with care
        </p>
      </div>
    </div>

  </div>

</div>


        {/* Pagination */}
        <div className="absolute left-0 top-[725px] flex items-center gap-[9px] max-md:bottom-[350px] max-md:top-auto max-sm:bottom-[305px]">
          <span className="h-[3px] w-8 bg-[#a50919]" />
          <span className="h-[3px] w-[30px] bg-[#f0d0a7]" />
          <span className="h-[3px] w-[30px] bg-[#f0d0a7]" />
        </div>
      </div>

      {/* =====================================
          BOTTOM TRUST HIGHLIGHTS
      ===================================== */}

      <div className="absolute bottom-[22px] left-1/2 z-[10] grid w-[min(1120px,88%)] -translate-x-1/2 grid-cols-4 items-center rounded-[3px] border border-[#d8b77f]/45 bg-[#fffaf3]/80 px-5 py-[17px] shadow-[0_8px_30px_rgba(91,48,25,0.06)] backdrop-blur-md max-md:bottom-[14px] max-md:w-[90%] max-md:grid-cols-2 max-md:gap-y-3 max-md:px-3 max-md:py-3">
        {[
          "Gotra-specific Purohit",
          "No Hidden Charges",
          "End-to-End Support",
          "Special Monitoring",
        ].map((item, index) => (
          <div
            key={item}
            className={`flex min-w-0 items-center justify-center gap-3 px-3 font-sans text-[10px] font-bold uppercase tracking-[1.25px] text-[#56372a] max-md:justify-start max-md:px-2 max-md:text-[9px] max-md:tracking-[0.7px] ${
              index !== 0
                ? "border-l border-[#cda66b]/45 max-md:border-l-0"
                : ""
            }`}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#c99645]/55 text-[13px] text-[#a50919] max-md:h-6 max-md:w-6">
              {index === 0
                ? "ॐ"
                : index === 1
                  ? "✓"
                  : index === 2
                    ? "↗"
                    : "✦"}
            </span>
            <span className="leading-[1.4]">{item}</span>
          </div>
        ))}
      </div>

      {/* Bottom atmospheric glow */}
      <div className="pointer-events-none absolute bottom-[-180px] left-[25%] z-[2] h-[250px] w-[65%] bg-[radial-gradient(ellipse,rgba(255,211,161,0.32),transparent_70%)] blur-[30px]" />
    </section>
  );
}
