import { useState, useRef } from "react";
import {
  Button,
  Card,
  CardContent,
  Input,
  Badge,
  Checkbox,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@crazyone/ui-brutalist";

import "@crazyone/ui-brutalist/styles.css";

// ═══════════════════════════════════════════════════════════════════════════════
// NEO-MEMPHIS - Collezione Vaporwave/Post-Modern
// Inspired by: Memphis Design, Vaporwave, 80s/90s Italian Design, Sottsass
// Typography: Bungee + Outfit
// ═══════════════════════════════════════════════════════════════════════════════

const neoMemphisStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bungee&family=Outfit:wght@300;400;500;600&display=swap');

  :root {
    --nm-bg: 280 40% 95%;
    --nm-fg: 280 80% 20%;
    --nm-card: 0 0% 100%;
    --nm-primary: 345 100% 60%;
    --nm-secondary: 175 80% 50%;
    --nm-tertiary: 45 100% 60%;
    --nm-accent: 280 80% 60%;
    --nm-muted: 280 20% 60%;
    --nm-border: 280 30% 85%;
  }

  .font-display-nm {
    font-family: 'Bungee', Impact, sans-serif;
    font-weight: 400;
    text-transform: uppercase;
  }

  .font-body-nm {
    font-family: 'Outfit', -apple-system, sans-serif;
    font-weight: 400;
  }

  .text-hero-nm {
    font-size: clamp(3.5rem, 13vw, 12rem);
    line-height: 0.95;
    letter-spacing: 0.02em;
  }

  .text-display-nm {
    font-size: clamp(2rem, 5vw, 5rem);
    line-height: 1;
    letter-spacing: 0.01em;
  }

  @keyframes wiggle {
    0%, 100% {
      transform: rotate(-2deg);
    }
    50% {
      transform: rotate(2deg);
    }
  }

  @keyframes bounce-soft {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes zigzag {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: 100% 100%;
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(30px) rotate(-3deg);
    }
    to {
      opacity: 1;
      transform: translateY(0) rotate(0);
    }
  }

  @keyframes colorCycle {
    0% { color: hsl(345 100% 60%); }
    33% { color: hsl(175 80% 50%); }
    66% { color: hsl(45 100% 60%); }
    100% { color: hsl(345 100% 60%); }
  }

  @keyframes shapeMorph {
    0%, 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
    50% { border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%; }
  }

  /* NEW: Squiggle animation */
  @keyframes squiggleMove {
    0%, 100% {
      d: path('M0,50 Q25,0 50,50 T100,50');
    }
    50% {
      d: path('M0,50 Q25,100 50,50 T100,50');
    }
  }

  @keyframes squiggleFloat {
    0% {
      transform: translateY(100vh) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 0.6;
    }
    90% {
      opacity: 0.6;
    }
    100% {
      transform: translateY(-100vh) rotate(360deg);
      opacity: 0;
    }
  }

  /* NEW: Confetti explosion */
  @keyframes confettiPop {
    0% {
      transform: scale(0) rotate(0deg);
      opacity: 0;
    }
    50% {
      transform: scale(1.5) rotate(180deg);
      opacity: 1;
    }
    100% {
      transform: scale(0) rotate(360deg);
      opacity: 0;
    }
  }

  @keyframes confettiFall {
    0% {
      transform: translateY(-20px) rotate(0deg);
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }

  /* NEW: Terrazzo pattern movement */
  @keyframes terrazzoShift {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: 100% 100%;
    }
  }

  /* NEW: Shape pop */
  @keyframes shapePop {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
  }

  .animate-wiggle {
    animation: wiggle 3s ease-in-out infinite;
  }

  .animate-bounce-soft {
    animation: bounce-soft 2s ease-in-out infinite;
  }

  .animate-slide-in {
    animation: slideIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .animate-color-cycle {
    animation: colorCycle 6s linear infinite;
  }

  .animate-morph {
    animation: shapeMorph 8s ease-in-out infinite;
  }

  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
  .delay-500 { animation-delay: 500ms; }
  .delay-600 { animation-delay: 600ms; }

  .hover-memphis {
    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .hover-memphis:hover {
    transform: translateY(-8px) rotate(1deg);
    box-shadow: 12px 12px 0 hsl(280 80% 60%);
  }

  .memphis-pattern {
    background-image:
      radial-gradient(circle at 20% 30%, hsl(345 100% 60% / 0.15) 2px, transparent 2px),
      radial-gradient(circle at 80% 70%, hsl(175 80% 50% / 0.15) 3px, transparent 3px),
      linear-gradient(45deg, hsl(45 100% 60% / 0.1) 25%, transparent 25%);
    background-size: 60px 60px, 80px 80px, 40px 40px;
  }

  .squiggle-border {
    position: relative;
    border: 4px solid hsl(280 80% 60%);
  }

  .squiggle-border::before {
    content: '';
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    border: 3px solid hsl(345 100% 60%);
    z-index: -1;
  }

  .geometric-shape {
    position: absolute;
    pointer-events: none;
    opacity: 0.6;
  }

  .shape-circle {
    width: 80px;
    height: 80px;
    background: hsl(345 100% 60%);
    border-radius: 50%;
  }

  .shape-triangle {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 87px solid hsl(175 80% 50%);
  }

  .shape-zigzag {
    width: 100px;
    height: 30px;
    background: repeating-linear-gradient(
      90deg,
      hsl(45 100% 60%) 0px,
      hsl(45 100% 60%) 10px,
      transparent 10px,
      transparent 20px
    );
  }

  .animate-shape-pop {
    animation: shapePop 2s ease-in-out infinite;
  }

  /* Floating squiggles */
  .squiggle {
    position: fixed;
    width: 80px;
    height: 30px;
    pointer-events: none;
    z-index: 50;
    animation: squiggleFloat 25s linear infinite;
  }

  .squiggle svg {
    width: 100%;
    height: 100%;
  }

  .squiggle:nth-child(1) { left: 5%; animation-delay: 0s; }
  .squiggle:nth-child(2) { left: 25%; animation-delay: 5s; }
  .squiggle:nth-child(3) { left: 45%; animation-delay: 10s; }
  .squiggle:nth-child(4) { left: 65%; animation-delay: 15s; }
  .squiggle:nth-child(5) { left: 85%; animation-delay: 20s; }

  /* Confetti pieces */
  .confetti {
    position: fixed;
    pointer-events: none;
    z-index: 100;
    animation: confettiFall 15s linear infinite;
  }

  .confetti-circle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  .confetti-square {
    width: 8px;
    height: 8px;
  }

  .confetti-triangle {
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 10px solid currentColor;
  }

  .confetti:nth-child(1) { left: 8%; color: hsl(345 100% 60%); animation-delay: 0s; }
  .confetti:nth-child(2) { left: 18%; color: hsl(175 80% 50%); animation-delay: 1s; }
  .confetti:nth-child(3) { left: 28%; color: hsl(45 100% 60%); animation-delay: 2s; }
  .confetti:nth-child(4) { left: 38%; color: hsl(280 80% 60%); animation-delay: 3s; }
  .confetti:nth-child(5) { left: 48%; color: hsl(345 100% 60%); animation-delay: 4s; }
  .confetti:nth-child(6) { left: 58%; color: hsl(175 80% 50%); animation-delay: 5s; }
  .confetti:nth-child(7) { left: 68%; color: hsl(45 100% 60%); animation-delay: 6s; }
  .confetti:nth-child(8) { left: 78%; color: hsl(280 80% 60%); animation-delay: 7s; }
  .confetti:nth-child(9) { left: 88%; color: hsl(345 100% 60%); animation-delay: 8s; }
  .confetti:nth-child(10) { left: 95%; color: hsl(175 80% 50%); animation-delay: 9s; }

  /* Dynamic terrazzo background */
  .terrazzo-bg {
    position: relative;
  }

  .terrazzo-bg::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(ellipse 8px 5px at 15% 20%, hsl(345 100% 70%) 50%, transparent 50%),
      radial-gradient(ellipse 6px 8px at 35% 45%, hsl(175 80% 60%) 50%, transparent 50%),
      radial-gradient(ellipse 10px 6px at 55% 25%, hsl(45 100% 70%) 50%, transparent 50%),
      radial-gradient(ellipse 5px 7px at 75% 65%, hsl(280 80% 70%) 50%, transparent 50%),
      radial-gradient(ellipse 7px 5px at 25% 75%, hsl(145 70% 60%) 50%, transparent 50%),
      radial-gradient(ellipse 6px 9px at 85% 35%, hsl(345 100% 70%) 50%, transparent 50%),
      radial-gradient(ellipse 8px 6px at 45% 85%, hsl(175 80% 60%) 50%, transparent 50%),
      radial-gradient(ellipse 5px 8px at 65% 15%, hsl(45 100% 70%) 50%, transparent 50%);
    background-size: 200px 200px;
    opacity: 0.3;
    animation: terrazzoShift 30s linear infinite;
    pointer-events: none;
  }

  /* Floating Memphis shapes (enhanced) */
  .memphis-float {
    position: fixed;
    pointer-events: none;
    z-index: 40;
    opacity: 0.5;
  }

  .memphis-float.circle-1 {
    width: 100px;
    height: 100px;
    background: hsl(345 100% 60%);
    border-radius: 50%;
    top: 10%;
    right: 8%;
    animation: bounce-soft 4s ease-in-out infinite, shapePop 8s ease-in-out infinite;
  }

  .memphis-float.triangle-1 {
    width: 0;
    height: 0;
    border-left: 40px solid transparent;
    border-right: 40px solid transparent;
    border-bottom: 70px solid hsl(175 80% 50%);
    bottom: 15%;
    left: 5%;
    animation: wiggle 5s ease-in-out infinite;
  }

  .memphis-float.square-1 {
    width: 60px;
    height: 60px;
    background: hsl(45 100% 60%);
    top: 50%;
    left: 3%;
    animation: bounce-soft 3s ease-in-out infinite;
    animation-delay: -1s;
  }

  .memphis-float.squiggle-line {
    width: 120px;
    height: 40px;
    background: repeating-linear-gradient(
      90deg,
      hsl(280 80% 60%) 0px,
      hsl(280 80% 60%) 15px,
      transparent 15px,
      transparent 30px
    );
    top: 30%;
    right: 5%;
    animation: wiggle 4s ease-in-out infinite;
    animation-delay: -2s;
  }

  .gallery-scroll-nm {
    display: flex;
    gap: 2rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding: 2rem;
    scrollbar-width: none;
  }

  .gallery-scroll-nm::-webkit-scrollbar {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-wiggle,
    .animate-bounce-soft,
    .animate-slide-in,
    .animate-color-cycle,
    .animate-morph,
    .animate-shape-pop,
    .hover-memphis,
    .squiggle,
    .confetti,
    .memphis-float,
    .terrazzo-bg::before {
      animation: none !important;
      transition: none !important;
    }
  }
`;

const SERVIZI = [
  {
    numeral: "01",
    title: "Incontro Creativo",
    subtitle: "Creative Meeting",
    description: "Esplosione di idee. Mood board colorato. Concept senza limiti.",
    color: "hsl(345 100% 60%)",
    shape: "circle",
  },
  {
    numeral: "02",
    title: "Design Radicale",
    subtitle: "Radical Design",
    description: "Forme anti-funzionali. Colori audaci. Memphis revolution.",
    color: "hsl(175 80% 50%)",
    shape: "triangle",
  },
  {
    numeral: "03",
    title: "Produzione Pop",
    subtitle: "Pop Production",
    description: "Laminati lucidi. Plastica nobile. Materiali irriverenti.",
    color: "hsl(45 100% 60%)",
    shape: "square",
  },
  {
    numeral: "04",
    title: "Consegna WOW",
    subtitle: "WOW Delivery",
    description: "Installazione teatrale. Sorpresa garantita. Gioia pura.",
    color: "hsl(280 80% 60%)",
    shape: "zigzag",
  },
];

const COLLEZIONI = [
  {
    id: "sottsass",
    name: "Collezione Sottsass",
    subtitle: "Living Room",
    price: "da / from 16.000",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=1000&fit=crop&q=80",
    tag: "Icon",
    accent: "hsl(345 100% 60%)",
  },
  {
    id: "radical",
    name: "Collezione Radical",
    subtitle: "Dining",
    price: "da / from 22.000",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&h=1000&fit=crop&q=80",
    tag: "Pop",
    accent: "hsl(175 80% 50%)",
  },
  {
    id: "laminate",
    name: "Collezione Laminato",
    subtitle: "Kitchen",
    price: "da / from 28.000",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=1000&fit=crop&q=80",
    tag: "Bold",
    accent: "hsl(45 100% 60%)",
  },
  {
    id: "terrazzo",
    name: "Collezione Terrazzo",
    subtitle: "Bathroom",
    price: "da / from 19.000",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1000&fit=crop&q=80",
    tag: "Fun",
    accent: "hsl(280 80% 60%)",
  },
  {
    id: "neon",
    name: "Collezione Neon",
    subtitle: "Kids Room",
    price: "da / from 12.000",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=1000&fit=crop&q=80",
    tag: "Play",
    accent: "hsl(145 70% 50%)",
  },
];

const STATS = [
  { value: "∞", label: "Colori", sublabel: "Infinite colors" },
  { value: "0", label: "Limiti", sublabel: "Zero limits" },
  { value: "100%", label: "Fun", sublabel: "Pure joy" },
];

export function CasaGiardinoNeoMemphisDemo() {
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  const scrollGallery = (direction: "left" | "right") => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({
        left: direction === "left" ? -400 : 400,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <style>{neoMemphisStyles}</style>
      <div
        className="relative overflow-x-hidden memphis-pattern terrazzo-bg"
        style={{
          fontFamily: "'Outfit', sans-serif",
          backgroundColor: "hsl(280 40% 95%)",
          color: "hsl(280 80% 20%)",
        }}
      >
        {/* Enhanced Memphis Floating Shapes */}
        <div className="memphis-float circle-1 hidden lg:block" aria-hidden="true" />
        <div className="memphis-float triangle-1 hidden lg:block" aria-hidden="true" />
        <div className="memphis-float square-1 hidden lg:block" aria-hidden="true" />
        <div className="memphis-float squiggle-line hidden lg:block" aria-hidden="true" />

        {/* Floating Squiggles */}
        {[...Array(5)].map((_, i) => (
          <div key={`squiggle-${i}`} className="squiggle hidden lg:block" aria-hidden="true">
            <svg viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0,15 Q25,0 50,15 T100,15"
                fill="none"
                stroke={["hsl(345 100% 60%)", "hsl(175 80% 50%)", "hsl(45 100% 60%)", "hsl(280 80% 60%)", "hsl(145 70% 50%)"][i]}
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>
        ))}

        {/* Falling Confetti */}
        {[...Array(10)].map((_, i) => {
          const shapes = ["confetti-circle", "confetti-square", "confetti-triangle"];
          return (
            <div
              key={`confetti-${i}`}
              className={`confetti ${shapes[i % 3]} hidden lg:block`}
              style={{ backgroundColor: i % 3 !== 2 ? "currentColor" : undefined }}
              aria-hidden="true"
            />
          );
        })}

        {/* ═══════════════════════════════════════════════════════════════════════
            HERO - Neo-Memphis Fun
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="min-h-screen relative">
          <nav className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-6 md:px-12 lg:px-24 py-8">
            <span
              className="font-display-nm text-2xl opacity-0 animate-slide-in animate-color-cycle"
            >
              C&G
            </span>
            <div className="flex items-center gap-8">
              <span
                className="font-body-nm text-[11px] uppercase tracking-[0.4em] opacity-0 animate-slide-in delay-100 hidden md:block"
                style={{ color: "hsl(280 20% 50%)" }}
              >
                Lago di Garda
              </span>
              <Badge
                className="font-display-nm text-[10px] px-5 py-2 tracking-[0.2em] opacity-0 animate-slide-in delay-200 animate-wiggle"
                style={{
                  backgroundColor: "hsl(345 100% 60%)",
                  color: "white",
                  border: "none",
                  borderRadius: "0",
                  transform: "rotate(-3deg)",
                }}
              >
                POP!
              </Badge>
            </div>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
            <div className="flex flex-col justify-center px-6 md:px-12 lg:px-24 py-32 lg:py-0">
              <p
                className="font-body-nm text-[11px] uppercase tracking-[0.6em] mb-12 opacity-0 animate-slide-in delay-300"
                style={{ color: "hsl(280 80% 60%)" }}
              >
                Neo-Memphis Design
              </p>

              <h1 className="font-display-nm text-hero-nm opacity-0 animate-slide-in delay-400">
                <span className="block" style={{ color: "hsl(345 100% 60%)" }}>Casa</span>
                <span className="block animate-color-cycle">&</span>
                <span className="block" style={{ color: "hsl(175 80% 50%)" }}>Giardino</span>
              </h1>

              <p
                className="font-body-nm text-xl md:text-2xl mt-12 max-w-lg opacity-0 animate-slide-in delay-500"
                style={{ color: "hsl(280 30% 40%)" }}
              >
                Design che
                <br />fa sorridere
              </p>

              <p
                className="font-body-nm text-sm mt-4 opacity-0 animate-slide-in delay-500"
                style={{ color: "hsl(280 20% 55%)" }}
              >
                Design that makes you smile
              </p>

              <div className="mt-20 flex items-center gap-8 opacity-0 animate-slide-in delay-600">
                {/* Colorful dots */}
                <div className="flex gap-2">
                  {["hsl(345 100% 60%)", "hsl(175 80% 50%)", "hsl(45 100% 60%)", "hsl(280 80% 60%)"].map((color, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-full animate-bounce-soft"
                      style={{ backgroundColor: color, animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
                <div>
                  <p className="font-body-nm text-[10px] uppercase tracking-[0.4em]" style={{ color: "hsl(280 20% 50%)" }}>
                    Coordinate
                  </p>
                  <p className="font-display-nm text-base mt-1" style={{ color: "hsl(280 80% 60%)" }}>
                    45.4654° N
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-[60vh] lg:h-auto opacity-0 animate-slide-in delay-300">
              <div className="absolute inset-8 lg:inset-16 squiggle-border overflow-hidden">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=1600&fit=crop&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  role="img"
                  aria-label="Colorful Memphis-style interior"
                />
                {/* Color overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(135deg, hsl(345 100% 60% / 0.1), hsl(175 80% 50% / 0.1))" }}
                  aria-hidden="true"
                />
              </div>
              <div
                className="absolute bottom-12 left-12 right-12 lg:bottom-20 lg:left-20 lg:right-20 p-6"
                style={{
                  backgroundColor: "hsl(45 100% 60%)",
                  border: "4px solid hsl(280 80% 20%)",
                  transform: "rotate(-2deg)",
                }}
              >
                <p className="font-display-nm text-sm mb-1" style={{ color: "hsl(280 80% 20%)" }}>
                  NEW DROP
                </p>
                <p className="font-body-nm text-base" style={{ color: "hsl(280 80% 20%)" }}>
                  Collezione Sottsass Revival
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            PHILOSOPHY
        ═══════════════════════════════════════════════════════════════════════ */}
        <section
          className="py-40 md:py-56 px-6 md:px-12 lg:px-24 relative"
          style={{ backgroundColor: "hsl(175 80% 50%)" }}
        >
          {/* Decorative shapes */}
          <div
            className="absolute top-20 right-20 w-32 h-32 animate-morph"
            style={{ backgroundColor: "hsl(345 100% 60%)" }}
            aria-hidden="true"
          />

          <div className="max-w-5xl relative">
            <p
              className="font-body-nm text-[11px] uppercase tracking-[0.6em] mb-12"
              style={{ color: "hsl(280 80% 20%)" }}
            >
              Filosofia / Philosophy
            </p>

            <h2 className="font-display-nm text-display-nm">
              <span style={{ color: "hsl(0 0% 100%)" }}>Basta con </span>
              <span style={{ color: "hsl(280 80% 20%)" }}>il grigio</span>
              <span style={{ color: "hsl(0 0% 100%)" }}>.</span>
              <br />
              <span style={{ color: "hsl(0 0% 100%)" }}>Viva </span>
              <span style={{ color: "hsl(45 100% 60%)" }}>il colore</span>
              <span style={{ color: "hsl(0 0% 100%)" }}>!</span>
            </h2>

            <p
              className="font-body-nm text-lg mt-16 max-w-2xl leading-relaxed"
              style={{ color: "hsl(280 80% 20%)" }}
            >
              Enough with gray. Long live color! We believe design should spark joy.
              Inspired by Ettore Sottsass and the Memphis movement, we create spaces
              that reject boring minimalism in favor of radical, playful beauty.
            </p>

            <div className="mt-20 flex flex-wrap gap-4">
              {["Laminate", "Terrazzo", "Neon", "Squiggle", "Postmodern"].map((material, i) => {
                const colors = ["hsl(345 100% 60%)", "hsl(175 80% 50%)", "hsl(45 100% 60%)", "hsl(280 80% 60%)", "hsl(145 70% 50%)"];
                return (
                  <span
                    key={material}
                    className="font-display-nm text-[11px] tracking-[0.2em] px-6 py-3"
                    style={{
                      backgroundColor: colors[i],
                      color: i === 2 ? "hsl(280 80% 20%)" : "white",
                      border: "3px solid hsl(280 80% 20%)",
                      transform: `rotate(${(i - 2) * 2}deg)`,
                    }}
                  >
                    {material}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SERVIZI
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-32 md:py-48 px-6 md:px-12 lg:px-24" style={{ backgroundColor: "hsl(280 40% 95%)" }}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20">
            <div>
              <p className="font-body-nm text-[11px] uppercase tracking-[0.6em] mb-4" style={{ color: "hsl(280 20% 50%)" }}>
                Il Processo
              </p>
              <h2 className="font-display-nm text-display-nm">
                <span style={{ color: "hsl(345 100% 60%)" }}>4</span> Steps to Fun
              </h2>
            </div>
            <div className="flex gap-2 mt-8 md:mt-0">
              {["hsl(345 100% 60%)", "hsl(175 80% 50%)", "hsl(45 100% 60%)", "hsl(280 80% 60%)"].map((color, i) => (
                <div
                  key={i}
                  className="w-10 h-3"
                  style={{ backgroundColor: color, transform: `rotate(${(i - 1.5) * 3}deg)` }}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVIZI.map((servizio, index) => (
              <Card
                key={servizio.numeral}
                className="hover-memphis group relative overflow-hidden"
                style={{
                  backgroundColor: "white",
                  border: `4px solid ${servizio.color}`,
                  borderRadius: "0",
                  minHeight: "360px",
                  transform: `rotate(${(index - 1.5) * 1}deg)`,
                }}
              >
                <CardContent className="p-8 h-full flex flex-col justify-between">
                  <div>
                    <span
                      className="font-display-nm text-6xl"
                      style={{ color: servizio.color }}
                    >
                      {servizio.numeral}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display-nm text-lg">{servizio.title}</h3>
                    <p className="font-body-nm text-[10px] uppercase tracking-[0.3em] mt-2" style={{ color: servizio.color }}>
                      {servizio.subtitle}
                    </p>
                    <p
                      className="font-body-nm text-sm mt-6 leading-relaxed"
                      style={{ color: "hsl(280 30% 40%)" }}
                    >
                      {servizio.description}
                    </p>
                  </div>
                </CardContent>

                {/* Shape decoration */}
                <div
                  className="absolute -bottom-4 -right-4 w-16 h-16 group-hover:scale-125 transition-transform"
                  style={{
                    backgroundColor: servizio.color,
                    borderRadius: servizio.shape === "circle" ? "50%" : "0",
                    clipPath: servizio.shape === "triangle" ? "polygon(50% 0%, 0% 100%, 100% 100%)" : undefined,
                  }}
                  aria-hidden="true"
                />
              </Card>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            COLLEZIONI
        ═══════════════════════════════════════════════════════════════════════ */}
        <section
          className="py-32 md:py-48"
          style={{ backgroundColor: "hsl(45 100% 60%)" }}
        >
          <div className="px-6 md:px-12 lg:px-24 mb-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-body-nm text-[11px] uppercase tracking-[0.6em] mb-4" style={{ color: "hsl(280 80% 20%)" }}>
                  Collezioni
                </p>
                <h2 className="font-display-nm text-display-nm" style={{ color: "hsl(280 80% 20%)" }}>
                  Radical Selection
                </h2>
              </div>

              <div className="flex gap-4 mt-8 md:mt-0">
                <button
                  onClick={() => scrollGallery("left")}
                  className="w-12 h-12 flex items-center justify-center border-4 transition-all hover:bg-[hsl(345_100%_60%)] hover:text-white"
                  style={{ borderColor: "hsl(280 80% 20%)", color: "hsl(280 80% 20%)" }}
                  aria-label="Previous"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollGallery("right")}
                  className="w-12 h-12 flex items-center justify-center border-4 transition-all hover:bg-[hsl(345_100%_60%)] hover:text-white"
                  style={{ borderColor: "hsl(280 80% 20%)", color: "hsl(280 80% 20%)" }}
                  aria-label="Next"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div ref={galleryRef} className="gallery-scroll-nm pl-6 md:pl-12 lg:pl-24 pr-6">
            {COLLEZIONI.map((collezione, index) => (
              <article
                key={collezione.id}
                className="flex-shrink-0 group cursor-pointer"
                style={{ width: "320px", transform: `rotate(${(index - 2) * 1.5}deg)` }}
              >
                <div
                  className="relative overflow-hidden mb-6"
                  style={{
                    aspectRatio: "3/4",
                    border: `4px solid ${collezione.accent}`,
                  }}
                >
                  <img
                    src={collezione.image}
                    alt={`${collezione.name} - ${collezione.subtitle}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <Badge
                    className="absolute top-4 left-4 font-display-nm text-[10px] px-4 py-2"
                    style={{
                      backgroundColor: collezione.accent,
                      color: "white",
                      border: "none",
                      borderRadius: "0",
                      transform: "rotate(-5deg)",
                    }}
                  >
                    {collezione.tag}
                  </Badge>
                </div>

                <h3 className="font-display-nm text-base mb-1" style={{ color: "hsl(280 80% 20%)" }}>
                  {collezione.name}
                </h3>
                <p className="font-body-nm text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: "hsl(280 30% 40%)" }}>
                  {collezione.subtitle}
                </p>
                <p className="font-display-nm text-lg" style={{ color: collezione.accent }}>
                  {collezione.price}
                </p>
              </article>
            ))}
            <div className="flex-shrink-0 w-8" aria-hidden="true" />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SHOWROOM
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[80vh]" style={{ backgroundColor: "hsl(345 100% 60%)" }}>
          {/* Decorative elements */}
          <div
            className="absolute top-20 left-20 w-40 h-40 animate-morph"
            style={{ backgroundColor: "hsl(175 80% 50%)" }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-20 right-20 w-24 h-24 rounded-full animate-bounce-soft"
            style={{ backgroundColor: "hsl(45 100% 60%)" }}
            aria-hidden="true"
          />

          <div className="relative z-10 min-h-[80vh] flex flex-col justify-end px-6 md:px-12 lg:px-24 py-20">
            <p className="font-body-nm text-[11px] uppercase tracking-[0.6em] mb-8" style={{ color: "white" }}>
              Showroom
            </p>
            <h2 className="font-display-nm text-display-nm max-w-4xl" style={{ color: "white" }}>
              600 mq di pura
              <br />
              <span style={{ color: "hsl(45 100% 60%)" }}>FOLLIA</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20 pt-12 border-t-4" style={{ borderColor: "white" }}>
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display-nm text-5xl md:text-6xl mb-3" style={{ color: "hsl(45 100% 60%)" }}>
                    {stat.value}
                  </p>
                  <p className="font-body-nm text-base" style={{ color: "white" }}>{stat.label}</p>
                  <p className="font-body-nm text-sm mt-1" style={{ color: "hsl(345 100% 85%)" }}>{stat.sublabel}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            CONTACT
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-40 md:py-56 px-6 md:px-12 lg:px-24" style={{ backgroundColor: "hsl(280 80% 60%)" }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-body-nm text-[11px] uppercase tracking-[0.6em] mb-8" style={{ color: "hsl(45 100% 60%)" }}>
              Let's Play
            </p>

            <h2 className="font-display-nm text-display-nm mb-12" style={{ color: "white" }}>
              Pronti per
              <br />
              <span style={{ color: "hsl(45 100% 60%)" }}>divertirvi?</span>
            </h2>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="font-display-nm text-[12px] px-16 py-6 tracking-[0.2em] hover-memphis"
                  style={{
                    backgroundColor: "hsl(45 100% 60%)",
                    color: "hsl(280 80% 20%)",
                    border: "4px solid hsl(280 80% 20%)",
                    borderRadius: "0",
                    transform: "rotate(-2deg)",
                  }}
                >
                  Start the Fun!
                </Button>
              </DialogTrigger>
              <DialogContent
                className="max-w-lg"
                style={{
                  borderRadius: "0",
                  border: "4px solid hsl(280 80% 60%)",
                  backgroundColor: "white",
                  color: "hsl(280 80% 20%)",
                }}
              >
                <DialogHeader className="pb-6 border-b-4" style={{ borderColor: "hsl(345 100% 60%)" }}>
                  <DialogTitle className="font-display-nm text-xl">
                    Join the Party!
                  </DialogTitle>
                  <DialogDescription className="font-body-nm text-sm mt-3" style={{ color: "hsl(280 30% 40%)" }}>
                    Ti ricontatteremo per iniziare l'avventura creativa.
                  </DialogDescription>
                </DialogHeader>

                <form className="space-y-5 pt-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="font-body-nm text-[10px] uppercase tracking-[0.2em] block mb-2" style={{ color: "hsl(280 30% 40%)" }}>Nome</label>
                      <Input
                        id="name"
                        placeholder="Mario"
                        className="font-body-nm"
                        style={{ borderRadius: "0", border: "3px solid hsl(345 100% 60%)" }}
                      />
                    </div>
                    <div>
                      <label htmlFor="surname" className="font-body-nm text-[10px] uppercase tracking-[0.2em] block mb-2" style={{ color: "hsl(280 30% 40%)" }}>Cognome</label>
                      <Input
                        id="surname"
                        placeholder="Rossi"
                        className="font-body-nm"
                        style={{ borderRadius: "0", border: "3px solid hsl(175 80% 50%)" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="font-body-nm text-[10px] uppercase tracking-[0.2em] block mb-2" style={{ color: "hsl(280 30% 40%)" }}>Email</label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="mario.rossi@email.it"
                      className="font-body-nm"
                      style={{ borderRadius: "0", border: "3px solid hsl(45 100% 60%)" }}
                    />
                  </div>

                  <div>
                    <label htmlFor="interest" className="font-body-nm text-[10px] uppercase tracking-[0.2em] block mb-2" style={{ color: "hsl(280 30% 40%)" }}>Stile Preferito</label>
                    <Select>
                      <SelectTrigger id="interest" className="font-body-nm" style={{ borderRadius: "0", border: "3px solid hsl(280 80% 60%)" }}>
                        <SelectValue placeholder="Seleziona..." />
                      </SelectTrigger>
                      <SelectContent style={{ borderRadius: "0", border: "3px solid hsl(280 80% 60%)" }}>
                        <SelectItem value="sottsass">Collezione Sottsass</SelectItem>
                        <SelectItem value="radical">Radical Design</SelectItem>
                        <SelectItem value="laminate">Laminato Pop</SelectItem>
                        <SelectItem value="mix">Mix Creativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer pt-2">
                    <Checkbox checked={privacyAccepted} onCheckedChange={(c) => setPrivacyAccepted(c === true)} className="mt-0.5" />
                    <span className="font-body-nm text-[11px] leading-relaxed" style={{ color: "hsl(280 30% 40%)" }}>
                      Accetto la Privacy Policy.
                    </span>
                  </label>

                  <Button
                    type="submit"
                    className="w-full font-display-nm text-[11px] py-4 tracking-[0.2em]"
                    style={{
                      backgroundColor: privacyAccepted ? "hsl(345 100% 60%)" : "hsl(280 20% 80%)",
                      color: privacyAccepted ? "white" : "hsl(280 20% 50%)",
                      border: "none",
                      borderRadius: "0",
                      cursor: privacyAccepted ? "pointer" : "not-allowed",
                    }}
                    disabled={!privacyAccepted}
                  >
                    Let's Go!
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <div className="mt-20 flex justify-center gap-16">
              <div>
                <p className="font-body-nm text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: "hsl(280 60% 80%)" }}>Telefono</p>
                <a href="tel:+390309912345" className="font-body-nm text-lg" style={{ color: "white" }}>+39 030 991 2345</a>
              </div>
              <div>
                <p className="font-body-nm text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: "hsl(280 60% 80%)" }}>Email</p>
                <a href="mailto:fun@casaegiardino.it" className="font-body-nm text-lg" style={{ color: "white" }}>fun@casaegiardino.it</a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            FOOTER
        ═══════════════════════════════════════════════════════════════════════ */}
        <footer className="py-16 px-6 md:px-12 lg:px-24 border-t-4" style={{ borderColor: "hsl(345 100% 60%)", backgroundColor: "white" }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h3 className="font-display-nm text-xl mb-4 animate-color-cycle">Casa & Giardino</h3>
              <p className="font-body-nm text-sm max-w-xs leading-relaxed" style={{ color: "hsl(280 30% 40%)" }}>
                Design radicale dal 1998. Fun guaranteed.
              </p>
            </div>

            <div className="md:col-span-3">
              <p className="font-body-nm text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: "hsl(280 20% 50%)" }}>Showroom</p>
              <address className="font-body-nm text-sm not-italic leading-relaxed" style={{ color: "hsl(280 30% 40%)" }}>
                Via del Lago, 42<br />25015 Desenzano del Garda<br />Italia
              </address>
            </div>

            <div className="md:col-span-3">
              <p className="font-body-nm text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: "hsl(280 20% 50%)" }}>Orari</p>
              <p className="font-body-nm text-sm leading-relaxed" style={{ color: "hsl(280 30% 40%)" }}>
                Mar - Sab<br />10:00 - 19:00
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="font-body-nm text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: "hsl(280 20% 50%)" }}>Legal</p>
              <ul className="space-y-2">
                {["Privacy", "Cookie", "Terms"].map((link) => (
                  <li key={link}><a href="#" className="font-body-nm text-sm" style={{ color: "hsl(280 30% 40%)" }}>{link}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t-4 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: "hsl(175 80% 50%)" }}>
            <a href="/" className="font-body-nm text-[11px] uppercase tracking-[0.2em] flex items-center gap-2" style={{ color: "hsl(280 30% 40%)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
              Gallery
            </a>
            <span className="font-display-nm text-sm" style={{ color: "hsl(345 100% 60%)" }}>45.4654° N, 10.6339° E</span>
          </div>

          <div className="mt-8 text-center">
            <p className="font-body-nm text-[10px] uppercase tracking-[0.2em]" style={{ color: "hsl(280 20% 60%)" }}>
              2024 Casa & Giardino - CrazyOne UI / Neo-Memphis
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
