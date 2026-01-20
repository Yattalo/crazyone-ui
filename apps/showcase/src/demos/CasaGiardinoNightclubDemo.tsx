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
// NIGHTCLUB - Collezione Lounge/Entertainment
// Inspired by: Berlin clubs, velvet lounges, Art Deco bars, ambient lighting
// Typography: Bebas Neue + Space Grotesk
// ═══════════════════════════════════════════════════════════════════════════════

const nightclubStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600&display=swap');

  :root {
    --nc-bg: 270 25% 5%;
    --nc-fg: 280 10% 95%;
    --nc-card: 270 20% 8%;
    --nc-primary: 280 100% 60%;
    --nc-secondary: 200 100% 50%;
    --nc-accent: 45 100% 60%;
    --nc-muted: 270 10% 45%;
    --nc-border: 270 15% 15%;
  }

  .font-display-nc {
    font-family: 'Bebas Neue', Impact, sans-serif;
    font-weight: 400;
    text-transform: uppercase;
  }

  .font-body-nc {
    font-family: 'Space Grotesk', -apple-system, sans-serif;
    font-weight: 400;
  }

  .text-hero-nc {
    font-size: clamp(4rem, 15vw, 14rem);
    line-height: 0.85;
    letter-spacing: 0.05em;
  }

  .text-display-nc {
    font-size: clamp(2.5rem, 6vw, 6rem);
    line-height: 0.9;
    letter-spacing: 0.03em;
  }

  @keyframes strobeFlash {
    0%, 100% {
      opacity: 0;
    }
    50% {
      opacity: 0.1;
    }
  }

  @keyframes neonGlow {
    0%, 100% {
      text-shadow:
        0 0 10px hsl(280 100% 60%),
        0 0 20px hsl(280 100% 60%),
        0 0 40px hsl(280 100% 60%);
    }
    50% {
      text-shadow:
        0 0 5px hsl(280 100% 60%),
        0 0 10px hsl(280 100% 60%),
        0 0 20px hsl(280 100% 60%);
    }
  }

  @keyframes laserSweep {
    0% {
      transform: rotate(-15deg) translateX(-100%);
    }
    100% {
      transform: rotate(15deg) translateX(100%);
    }
  }

  @keyframes beatPulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.02);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes colorShift {
    0% {
      filter: hue-rotate(0deg);
    }
    50% {
      filter: hue-rotate(30deg);
    }
    100% {
      filter: hue-rotate(0deg);
    }
  }

  /* NEW: Disco ball reflections */
  @keyframes discoBall {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes discoReflection {
    0%, 100% {
      opacity: 0.3;
      transform: translate(0, 0);
    }
    25% {
      opacity: 0.7;
      transform: translate(20px, -15px);
    }
    50% {
      opacity: 0.4;
      transform: translate(-10px, 20px);
    }
    75% {
      opacity: 0.8;
      transform: translate(15px, 10px);
    }
  }

  /* NEW: Smoke/fog drift */
  @keyframes smokeDrift {
    0% {
      transform: translateX(-50%) translateY(0) scale(1);
      opacity: 0.15;
    }
    50% {
      transform: translateX(-30%) translateY(-30px) scale(1.2);
      opacity: 0.2;
    }
    100% {
      transform: translateX(-50%) translateY(0) scale(1);
      opacity: 0.15;
    }
  }

  /* NEW: Spotlight sweep */
  @keyframes spotlightSweep {
    0% {
      transform: rotate(-30deg);
    }
    50% {
      transform: rotate(30deg);
    }
    100% {
      transform: rotate(-30deg);
    }
  }

  /* NEW: Floor glow pulse */
  @keyframes floorGlow {
    0%, 100% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 0.6;
      transform: scale(1.05);
    }
  }

  /* NEW: Laser beam enhanced */
  @keyframes laserBeamSweep {
    0% {
      transform: translateX(-100%) rotate(-5deg);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateX(200%) rotate(5deg);
      opacity: 0;
    }
  }

  .animate-strobe {
    animation: strobeFlash 0.1s ease-in-out infinite;
  }

  .animate-neon {
    animation: neonGlow 2s ease-in-out infinite;
  }

  .animate-laser {
    animation: laserSweep 3s ease-in-out infinite;
  }

  .animate-beat {
    animation: beatPulse 0.5s ease-in-out infinite;
  }

  .animate-slide-up {
    animation: slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .animate-color-shift {
    animation: colorShift 10s ease-in-out infinite;
  }

  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
  .delay-500 { animation-delay: 500ms; }
  .delay-600 { animation-delay: 600ms; }

  .hover-nightclub {
    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .hover-nightclub:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow:
      0 20px 40px -10px hsl(280 100% 60% / 0.3),
      0 0 60px -10px hsl(200 100% 50% / 0.2);
  }

  .velvet-gradient {
    background: linear-gradient(135deg,
      hsl(270 25% 5%) 0%,
      hsl(280 30% 8%) 50%,
      hsl(270 25% 5%) 100%);
  }

  .neon-border {
    position: relative;
  }

  .neon-border::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(135deg, hsl(280 100% 60%), hsl(200 100% 50%));
    z-index: -1;
    opacity: 0.5;
    filter: blur(8px);
    transition: opacity 0.3s;
  }

  .neon-border:hover::before {
    opacity: 1;
  }

  .laser-line {
    position: absolute;
    width: 200%;
    height: 2px;
    background: linear-gradient(90deg, transparent, hsl(280 100% 60%), transparent);
    pointer-events: none;
    opacity: 0.3;
  }

  .vip-badge {
    background: linear-gradient(135deg, hsl(45 100% 60%) 0%, hsl(35 100% 50%) 100%);
    color: hsl(0 0% 0%);
    font-weight: 600;
  }

  .gallery-scroll-nc {
    display: flex;
    gap: 2rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding: 2rem;
    scrollbar-width: none;
  }

  .gallery-scroll-nc::-webkit-scrollbar {
    display: none;
  }

  .eq-bar {
    width: 4px;
    background: linear-gradient(to top, hsl(280 100% 60%), hsl(200 100% 50%));
    animation: eqBounce 0.4s ease-in-out infinite alternate;
  }

  @keyframes eqBounce {
    from { height: 10px; }
    to { height: 30px; }
  }

  /* Disco ball */
  .disco-ball {
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: radial-gradient(
      circle at 30% 30%,
      hsl(0 0% 90%) 0%,
      hsl(0 0% 50%) 40%,
      hsl(0 0% 20%) 100%
    );
    box-shadow:
      0 0 30px hsl(0 0% 100% / 0.2),
      inset 0 0 20px hsl(0 0% 0% / 0.5);
    animation: discoBall 20s linear infinite;
    pointer-events: none;
    z-index: 100;
  }

  /* Disco reflections (scattered squares) */
  .disco-reflection {
    position: fixed;
    width: 8px;
    height: 8px;
    background: hsl(0 0% 100%);
    pointer-events: none;
    z-index: 90;
    animation: discoReflection 3s ease-in-out infinite;
  }

  .disco-reflection:nth-child(1) { top: 15%; left: 20%; animation-delay: 0s; background: hsl(280 100% 80%); }
  .disco-reflection:nth-child(2) { top: 25%; left: 70%; animation-delay: 0.3s; background: hsl(200 100% 80%); }
  .disco-reflection:nth-child(3) { top: 40%; left: 30%; animation-delay: 0.6s; background: hsl(45 100% 80%); }
  .disco-reflection:nth-child(4) { top: 55%; left: 80%; animation-delay: 0.9s; background: hsl(280 100% 80%); }
  .disco-reflection:nth-child(5) { top: 65%; left: 15%; animation-delay: 1.2s; background: hsl(200 100% 80%); }
  .disco-reflection:nth-child(6) { top: 75%; left: 60%; animation-delay: 1.5s; background: hsl(45 100% 80%); }
  .disco-reflection:nth-child(7) { top: 35%; left: 50%; animation-delay: 1.8s; background: hsl(280 100% 80%); }
  .disco-reflection:nth-child(8) { top: 85%; left: 40%; animation-delay: 2.1s; background: hsl(200 100% 80%); }

  /* Smoke/fog machine effect */
  .smoke-layer {
    position: fixed;
    bottom: 0;
    left: 50%;
    width: 200vw;
    height: 40vh;
    background: radial-gradient(
      ellipse at center bottom,
      hsl(270 30% 20% / 0.4) 0%,
      hsl(270 20% 10% / 0.2) 40%,
      transparent 70%
    );
    animation: smokeDrift 15s ease-in-out infinite;
    pointer-events: none;
    z-index: 50;
  }

  /* Spotlights */
  .spotlight {
    position: fixed;
    top: 0;
    width: 200px;
    height: 100vh;
    background: conic-gradient(
      from 180deg at 50% 0%,
      transparent 35%,
      hsl(280 100% 60% / 0.1) 45%,
      hsl(280 100% 60% / 0.15) 50%,
      hsl(280 100% 60% / 0.1) 55%,
      transparent 65%
    );
    pointer-events: none;
    z-index: 60;
    transform-origin: top center;
    animation: spotlightSweep 6s ease-in-out infinite;
  }

  .spotlight.left {
    left: 20%;
    animation-delay: 0s;
  }

  .spotlight.right {
    right: 20%;
    background: conic-gradient(
      from 180deg at 50% 0%,
      transparent 35%,
      hsl(200 100% 50% / 0.1) 45%,
      hsl(200 100% 50% / 0.15) 50%,
      hsl(200 100% 50% / 0.1) 55%,
      transparent 65%
    );
    animation-delay: -3s;
  }

  /* Enhanced laser beams */
  .laser-beam {
    position: fixed;
    height: 3px;
    pointer-events: none;
    z-index: 80;
    animation: laserBeamSweep 5s linear infinite;
  }

  .laser-purple {
    width: 400px;
    top: 25%;
    background: linear-gradient(90deg, transparent, hsl(280 100% 60%), hsl(280 100% 70%), hsl(280 100% 60%), transparent);
    box-shadow: 0 0 15px hsl(280 100% 60%), 0 0 30px hsl(280 100% 60%);
    animation-delay: 0s;
  }

  .laser-cyan {
    width: 350px;
    top: 50%;
    background: linear-gradient(90deg, transparent, hsl(200 100% 50%), hsl(200 100% 60%), hsl(200 100% 50%), transparent);
    box-shadow: 0 0 15px hsl(200 100% 50%), 0 0 30px hsl(200 100% 50%);
    animation-delay: 1.5s;
  }

  .laser-gold {
    width: 300px;
    top: 75%;
    background: linear-gradient(90deg, transparent, hsl(45 100% 60%), hsl(45 100% 70%), hsl(45 100% 60%), transparent);
    box-shadow: 0 0 15px hsl(45 100% 60%), 0 0 30px hsl(45 100% 60%);
    animation-delay: 3s;
  }

  /* Dance floor glow */
  .floor-glow {
    position: fixed;
    bottom: 0;
    left: 25%;
    right: 25%;
    height: 10px;
    background: linear-gradient(90deg,
      hsl(280 100% 60%),
      hsl(200 100% 50%),
      hsl(45 100% 60%),
      hsl(280 100% 60%)
    );
    filter: blur(20px);
    animation: floorGlow 2s ease-in-out infinite;
    pointer-events: none;
    z-index: 55;
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-strobe,
    .animate-neon,
    .animate-laser,
    .animate-beat,
    .animate-slide-up,
    .animate-color-shift,
    .hover-nightclub,
    .eq-bar,
    .disco-ball,
    .disco-reflection,
    .smoke-layer,
    .spotlight,
    .laser-beam,
    .floor-glow {
      animation: none !important;
      transition: none !important;
    }
    .eq-bar { height: 20px; }
  }
`;

const SERVIZI = [
  {
    numeral: "01",
    title: "VIP Consultation",
    subtitle: "Consulenza Esclusiva",
    description: "Incontro privato nel nostro lounge. Ambient lighting. Cocktail su misura.",
    icon: "diamond",
  },
  {
    numeral: "02",
    title: "Sound Design",
    subtitle: "Progettazione Acustica",
    description: "Sistemi audio immersivi. Illuminazione scenografica. Atmosfera unica.",
    icon: "speaker",
  },
  {
    numeral: "03",
    title: "Installation",
    subtitle: "Realizzazione",
    description: "Artigiani specializzati. Materiali premium. Finiture di lusso.",
    icon: "tool",
  },
  {
    numeral: "04",
    title: "Grand Opening",
    subtitle: "Inaugurazione",
    description: "Consegna spettacolare. Effetti speciali. Momento memorabile.",
    icon: "star",
  },
];

const COLLEZIONI = [
  {
    id: "velvet",
    name: "Collezione Velvet",
    subtitle: "Lounge Seating",
    price: "da / from 22.000",
    image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&h=1000&fit=crop&q=80",
    tag: "VIP",
  },
  {
    id: "chrome",
    name: "Collezione Chrome",
    subtitle: "Bar Counter",
    price: "da / from 35.000",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&h=1000&fit=crop&q=80",
    tag: "Limited",
  },
  {
    id: "mirror",
    name: "Collezione Mirror Ball",
    subtitle: "Dance Floor",
    price: "da / from 48.000",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=1000&fit=crop&q=80",
    tag: "Exclusive",
  },
  {
    id: "booth",
    name: "Collezione Booth",
    subtitle: "DJ Station",
    price: "da / from 28.000",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1000&fit=crop&q=80",
    tag: "Pro",
  },
  {
    id: "ambient",
    name: "Collezione Ambient",
    subtitle: "Chill Zone",
    price: "da / from 18.000",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=1000&fit=crop&q=80",
    tag: "Signature",
  },
];

const STATS = [
  { value: "140", label: "BPM", sublabel: "Peak energy" },
  { value: "24/7", label: "Service", sublabel: "Always on" },
  { value: "5", label: "Stelle", sublabel: "Five star rated" },
];

export function CasaGiardinoNightclubDemo() {
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
      <style>{nightclubStyles}</style>
      <div
        className="relative overflow-x-hidden velvet-gradient"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          backgroundColor: "hsl(270 25% 5%)",
          color: "hsl(280 10% 95%)",
        }}
      >
        {/* Disco Ball */}
        <div className="disco-ball hidden lg:block" aria-hidden="true" />

        {/* Disco Reflections */}
        {[...Array(8)].map((_, i) => (
          <div key={`disco-${i}`} className="disco-reflection hidden lg:block" aria-hidden="true" />
        ))}

        {/* Laser Beams */}
        <div className="laser-beam laser-purple hidden lg:block" aria-hidden="true" />
        <div className="laser-beam laser-cyan hidden lg:block" aria-hidden="true" />
        <div className="laser-beam laser-gold hidden lg:block" aria-hidden="true" />

        {/* Spotlights */}
        <div className="spotlight left hidden lg:block" aria-hidden="true" />
        <div className="spotlight right hidden lg:block" aria-hidden="true" />

        {/* Smoke/Fog Layer */}
        <div className="smoke-layer hidden lg:block" aria-hidden="true" />

        {/* Dance Floor Glow */}
        <div className="floor-glow hidden lg:block" aria-hidden="true" />

        {/* ═══════════════════════════════════════════════════════════════════════
            HERO - Nightclub Energy
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="min-h-screen relative overflow-hidden">
          {/* Ambient light effects */}
          <div
            className="absolute top-0 left-1/4 w-[600px] h-[600px] opacity-30 animate-color-shift"
            style={{
              background: "radial-gradient(circle, hsl(280 100% 60% / 0.4), transparent 60%)",
              filter: "blur(80px)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 right-1/4 w-[500px] h-[500px] opacity-20"
            style={{
              background: "radial-gradient(circle, hsl(200 100% 50% / 0.4), transparent 60%)",
              filter: "blur(60px)",
            }}
            aria-hidden="true"
          />

          {/* Laser lines */}
          <div className="laser-line top-1/3 animate-laser" style={{ animationDuration: "4s" }} aria-hidden="true" />
          <div className="laser-line top-2/3 animate-laser" style={{ animationDuration: "5s", animationDelay: "1s" }} aria-hidden="true" />

          <nav className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-6 md:px-12 lg:px-24 py-8">
            <span
              className="font-display-nc text-3xl opacity-0 animate-slide-up animate-neon"
              style={{ color: "hsl(280 100% 60%)" }}
            >
              C&G
            </span>
            <div className="flex items-center gap-8">
              <span
                className="font-body-nc text-[11px] uppercase tracking-[0.4em] opacity-0 animate-slide-up delay-100 hidden md:block"
                style={{ color: "hsl(270 10% 50%)" }}
              >
                Lago di Garda
              </span>
              <Badge
                className="font-body-nc text-[10px] px-5 py-2 uppercase tracking-[0.3em] opacity-0 animate-slide-up delay-200 vip-badge"
              >
                VIP
              </Badge>
            </div>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
            <div className="flex flex-col justify-center px-6 md:px-12 lg:px-24 py-32 lg:py-0">
              <p
                className="font-body-nc text-[11px] uppercase tracking-[0.6em] mb-12 opacity-0 animate-slide-up delay-300"
                style={{ color: "hsl(280 100% 60%)" }}
              >
                Lounge & Entertainment
              </p>

              <h1 className="font-display-nc text-hero-nc opacity-0 animate-slide-up delay-400">
                <span className="block" style={{ color: "hsl(280 10% 95%)" }}>Casa</span>
                <span className="block animate-neon" style={{ color: "hsl(280 100% 60%)" }}>&</span>
                <span className="block" style={{ color: "hsl(280 10% 95%)" }}>Giardino</span>
              </h1>

              <p
                className="font-body-nc text-xl md:text-2xl mt-12 max-w-lg opacity-0 animate-slide-up delay-500"
                style={{ color: "hsl(270 10% 55%)" }}
              >
                Dove il lusso
                <br />incontra la notte
              </p>

              <p
                className="font-body-nc text-sm mt-4 opacity-0 animate-slide-up delay-500"
                style={{ color: "hsl(270 10% 40%)" }}
              >
                Where luxury meets the night
              </p>

              <div className="mt-20 flex items-center gap-8 opacity-0 animate-slide-up delay-600">
                {/* Equalizer bars */}
                <div className="flex items-end gap-1 h-10">
                  {[1,2,3,4,5].map((i) => (
                    <div
                      key={i}
                      className="eq-bar"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
                <div>
                  <p className="font-body-nc text-[10px] uppercase tracking-[0.4em]" style={{ color: "hsl(270 10% 50%)" }}>
                    Coordinate
                  </p>
                  <p className="font-body-nc text-base mt-1" style={{ color: "hsl(280 100% 60%)" }}>
                    45.4654° N, 10.6339° E
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-[60vh] lg:h-auto opacity-0 animate-slide-up delay-300">
              <div
                className="absolute inset-0 lg:inset-y-16 lg:left-0 lg:right-16"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=1200&h=1600&fit=crop&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                role="img"
                aria-label="Luxury nightclub lounge"
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0 lg:inset-y-16 lg:left-0 lg:right-16"
                style={{
                  background: "linear-gradient(135deg, hsl(280 100% 60% / 0.2) 0%, transparent 50%, hsl(200 100% 50% / 0.2) 100%)",
                }}
                aria-hidden="true"
              />
              <div
                className="absolute bottom-8 left-8 right-8 lg:bottom-24 lg:left-8 lg:right-24 p-6"
                style={{
                  backgroundColor: "hsl(270 25% 8% / 0.9)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid hsl(280 100% 60% / 0.3)",
                }}
              >
                <p className="font-body-nc text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: "hsl(280 100% 60%)" }}>
                  Now Playing
                </p>
                <p className="font-display-nc text-xl" style={{ color: "hsl(280 10% 95%)" }}>
                  Collezione Velvet Lounge
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            PHILOSOPHY
        ═══════════════════════════════════════════════════════════════════════ */}
        <section
          className="py-40 md:py-56 px-6 md:px-12 lg:px-24"
          style={{ backgroundColor: "hsl(270 30% 4%)" }}
        >
          <div className="max-w-5xl">
            <p
              className="font-body-nc text-[11px] uppercase tracking-[0.6em] mb-12"
              style={{ color: "hsl(280 100% 60%)" }}
            >
              Filosofia / Philosophy
            </p>

            <h2 className="font-display-nc text-display-nc">
              <span style={{ color: "hsl(280 10% 95%)" }}>Nella notte, </span>
              <span style={{ color: "hsl(280 100% 60%)" }}>l'energia</span>
              <span style={{ color: "hsl(280 10% 95%)" }}>.</span>
              <br />
              <span style={{ color: "hsl(280 10% 95%)" }}>Nel lusso, </span>
              <span style={{ color: "hsl(200 100% 50%)" }}>l'emozione</span>
              <span style={{ color: "hsl(280 10% 95%)" }}>.</span>
            </h2>

            <p
              className="font-body-nc text-lg mt-16 max-w-2xl leading-relaxed"
              style={{ color: "hsl(270 10% 55%)" }}
            >
              In the night, energy. In luxury, emotion. We create spaces that pulse
              with life, where every beat resonates with refined taste. VIP experiences
              that transform ordinary evenings into extraordinary memories.
            </p>

            <div className="mt-20 flex flex-wrap gap-4">
              {["Velvet", "Chrome", "LED", "Surround Sound", "Exclusive"].map((feature, i) => (
                <span
                  key={feature}
                  className="font-body-nc text-[11px] uppercase tracking-[0.2em] px-6 py-3 neon-border"
                  style={{
                    color: i === 0 ? "hsl(280 100% 60%)" : "hsl(270 10% 60%)",
                    backgroundColor: "hsl(270 25% 8%)",
                    border: `1px solid ${i === 0 ? "hsl(280 100% 60% / 0.5)" : "hsl(270 15% 20%)"}`,
                  }}
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SERVIZI
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-32 md:py-48 px-6 md:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20">
            <div>
              <p className="font-body-nc text-[11px] uppercase tracking-[0.6em] mb-4" style={{ color: "hsl(270 10% 50%)" }}>
                The Experience
              </p>
              <h2 className="font-display-nc text-display-nc">
                <span style={{ color: "hsl(280 100% 60%)" }}>4</span> Steps to VIP
              </h2>
            </div>
            <div className="flex gap-2 mt-8 md:mt-0">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-2"
                  style={{
                    background: i === 1
                      ? "linear-gradient(90deg, hsl(280 100% 60%), hsl(200 100% 50%))"
                      : "hsl(270 15% 15%)",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVIZI.map((servizio, index) => (
              <Card
                key={servizio.numeral}
                className="hover-nightclub group relative overflow-hidden"
                style={{
                  backgroundColor: "hsl(270 20% 8%)",
                  border: "1px solid hsl(270 15% 15%)",
                  borderRadius: "0",
                  minHeight: "380px",
                }}
              >
                {/* Gradient overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(135deg, hsl(280 100% 60% / 0.1) 0%, hsl(200 100% 50% / 0.1) 100%)",
                  }}
                  aria-hidden="true"
                />

                <CardContent className="relative z-10 h-full flex flex-col justify-between p-8">
                  <div>
                    <span
                      className="font-display-nc text-6xl opacity-30"
                      style={{ color: "hsl(280 100% 60%)" }}
                    >
                      {servizio.numeral}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display-nc text-xl">{servizio.title}</h3>
                    <p className="font-body-nc text-[10px] uppercase tracking-[0.3em] mt-2" style={{ color: "hsl(200 100% 50%)" }}>
                      {servizio.subtitle}
                    </p>
                    <p
                      className="font-body-nc text-sm mt-6 leading-relaxed"
                      style={{ color: "hsl(270 10% 55%)" }}
                    >
                      {servizio.description}
                    </p>
                  </div>
                </CardContent>

                {/* Neon bottom border */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "linear-gradient(90deg, hsl(280 100% 60%), hsl(200 100% 50%))" }}
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
          style={{ backgroundColor: "hsl(270 30% 4%)" }}
        >
          <div className="px-6 md:px-12 lg:px-24 mb-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-body-nc text-[11px] uppercase tracking-[0.6em] mb-4" style={{ color: "hsl(280 100% 60%)" }}>
                  Collezioni
                </p>
                <h2 className="font-display-nc text-display-nc">
                  VIP Selection
                </h2>
              </div>

              <div className="flex gap-4 mt-8 md:mt-0">
                <button
                  onClick={() => scrollGallery("left")}
                  className="w-12 h-12 flex items-center justify-center border transition-all hover:border-[hsl(280_100%_60%_/_0.7)] hover:bg-[hsl(280_100%_60%_/_0.1)]"
                  style={{ borderColor: "hsl(270 15% 20%)" }}
                  aria-label="Previous"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollGallery("right")}
                  className="w-12 h-12 flex items-center justify-center border transition-all hover:border-[hsl(280_100%_60%_/_0.7)] hover:bg-[hsl(280_100%_60%_/_0.1)]"
                  style={{ borderColor: "hsl(270 15% 20%)" }}
                  aria-label="Next"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div ref={galleryRef} className="gallery-scroll-nc pl-6 md:pl-12 lg:pl-24 pr-6">
            {COLLEZIONI.map((collezione) => (
              <article key={collezione.id} className="flex-shrink-0 group cursor-pointer" style={{ width: "320px" }}>
                <div className="relative overflow-hidden mb-8" style={{ aspectRatio: "3/4" }}>
                  <img
                    src={collezione.image}
                    alt={`${collezione.name} - ${collezione.subtitle}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "linear-gradient(to top, hsl(270 30% 5% / 0.8) 0%, transparent 50%)" }}
                    aria-hidden="true"
                  />
                  <Badge
                    className={`absolute top-4 left-4 font-body-nc text-[9px] uppercase tracking-[0.2em] px-4 py-2 ${
                      collezione.tag === "VIP" ? "vip-badge" : ""
                    }`}
                    style={
                      collezione.tag !== "VIP"
                        ? {
                            backgroundColor: "hsl(280 100% 60%)",
                            color: "hsl(0 0% 100%)",
                            border: "none",
                            borderRadius: "0",
                          }
                        : { borderRadius: "0" }
                    }
                  >
                    {collezione.tag}
                  </Badge>
                </div>

                <h3 className="font-display-nc text-lg mb-1">{collezione.name}</h3>
                <p className="font-body-nc text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: "hsl(270 10% 50%)" }}>
                  {collezione.subtitle}
                </p>
                <p className="font-body-nc text-lg" style={{ color: "hsl(280 100% 60%)" }}>
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
        <section className="relative min-h-[80vh]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1571266028243-d220c6a89f97?w=1920&h=1080&fit=crop&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
            role="img"
            aria-label="Luxury nightclub interior"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, hsl(270 30% 5% / 0.7), hsl(270 30% 5% / 0.9))",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 min-h-[80vh] flex flex-col justify-end px-6 md:px-12 lg:px-24 py-20">
            <p className="font-body-nc text-[11px] uppercase tracking-[0.6em] mb-8" style={{ color: "hsl(280 100% 60%)" }}>
              Flagship Lounge
            </p>
            <h2 className="font-display-nc text-display-nc max-w-4xl">
              600 mq di puro
              <br />
              <span className="animate-neon" style={{ color: "hsl(280 100% 60%)" }}>entertainment</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20 pt-12 border-t" style={{ borderColor: "hsl(280 100% 60% / 0.3)" }}>
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display-nc text-5xl md:text-6xl mb-3" style={{ color: "hsl(280 100% 60%)" }}>
                    {stat.value}
                  </p>
                  <p className="font-body-nc text-sm">{stat.label}</p>
                  <p className="font-body-nc text-[11px] mt-1" style={{ color: "hsl(270 10% 45%)" }}>{stat.sublabel}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            CONTACT
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-40 md:py-56 px-6 md:px-12 lg:px-24" style={{ backgroundColor: "hsl(270 25% 6%)" }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-body-nc text-[11px] uppercase tracking-[0.6em] mb-8" style={{ color: "hsl(280 100% 60%)" }}>
              VIP Access
            </p>

            <h2 className="font-display-nc text-display-nc mb-12">
              Lista d'attesa
              <br />
              <span style={{ color: "hsl(200 100% 50%)" }}>esclusiva</span>
            </h2>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="font-body-nc text-[11px] px-16 py-6 uppercase tracking-[0.3em] hover-nightclub"
                  style={{
                    background: "linear-gradient(135deg, hsl(280 100% 60%), hsl(200 100% 50%))",
                    color: "hsl(0 0% 100%)",
                    border: "none",
                    borderRadius: "0",
                  }}
                >
                  Request VIP Access
                </Button>
              </DialogTrigger>
              <DialogContent
                className="max-w-lg"
                style={{
                  borderRadius: "0",
                  border: "1px solid hsl(270 15% 20%)",
                  backgroundColor: "hsl(270 25% 6%)",
                  color: "hsl(280 10% 95%)",
                }}
              >
                <DialogHeader className="pb-8 border-b" style={{ borderColor: "hsl(270 15% 20%)" }}>
                  <DialogTitle className="font-display-nc text-2xl">
                    VIP Application
                  </DialogTitle>
                  <DialogDescription className="font-body-nc text-sm mt-3" style={{ color: "hsl(270 10% 55%)" }}>
                    A personal concierge will contact you within 24 hours.
                  </DialogDescription>
                </DialogHeader>

                <form className="space-y-6 pt-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="font-body-nc text-[10px] uppercase tracking-[0.2em] block mb-3" style={{ color: "hsl(270 10% 55%)" }}>Nome</label>
                      <Input id="name" placeholder="Mario" className="font-body-nc" style={{ borderRadius: "0", backgroundColor: "hsl(270 20% 10%)", borderColor: "hsl(270 15% 20%)", color: "hsl(280 10% 95%)" }} />
                    </div>
                    <div>
                      <label htmlFor="surname" className="font-body-nc text-[10px] uppercase tracking-[0.2em] block mb-3" style={{ color: "hsl(270 10% 55%)" }}>Cognome</label>
                      <Input id="surname" placeholder="Rossi" className="font-body-nc" style={{ borderRadius: "0", backgroundColor: "hsl(270 20% 10%)", borderColor: "hsl(270 15% 20%)", color: "hsl(280 10% 95%)" }} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="font-body-nc text-[10px] uppercase tracking-[0.2em] block mb-3" style={{ color: "hsl(270 10% 55%)" }}>Email</label>
                    <Input id="email" type="email" placeholder="mario.rossi@email.it" className="font-body-nc" style={{ borderRadius: "0", backgroundColor: "hsl(270 20% 10%)", borderColor: "hsl(270 15% 20%)", color: "hsl(280 10% 95%)" }} />
                  </div>

                  <div>
                    <label htmlFor="interest" className="font-body-nc text-[10px] uppercase tracking-[0.2em] block mb-3" style={{ color: "hsl(270 10% 55%)" }}>Interest</label>
                    <Select>
                      <SelectTrigger id="interest" className="font-body-nc" style={{ borderRadius: "0", backgroundColor: "hsl(270 20% 10%)", borderColor: "hsl(270 15% 20%)", color: "hsl(280 10% 95%)" }}>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent style={{ borderRadius: "0", backgroundColor: "hsl(270 20% 10%)", borderColor: "hsl(270 15% 20%)" }}>
                        <SelectItem value="lounge">Lounge Seating</SelectItem>
                        <SelectItem value="bar">Bar Counter</SelectItem>
                        <SelectItem value="dancefloor">Dance Floor</SelectItem>
                        <SelectItem value="complete">Complete Project</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <label className="flex items-start gap-4 cursor-pointer pt-4">
                    <Checkbox checked={privacyAccepted} onCheckedChange={(c) => setPrivacyAccepted(c === true)} className="mt-0.5" />
                    <span className="font-body-nc text-[11px] leading-relaxed" style={{ color: "hsl(270 10% 55%)" }}>
                      I accept the Privacy Policy.
                    </span>
                  </label>

                  <Button
                    type="submit"
                    className="w-full font-body-nc text-[11px] py-5 uppercase tracking-[0.2em]"
                    style={{
                      background: privacyAccepted
                        ? "linear-gradient(135deg, hsl(280 100% 60%), hsl(200 100% 50%))"
                        : "hsl(270 15% 18%)",
                      color: privacyAccepted ? "hsl(0 0% 100%)" : "hsl(270 10% 45%)",
                      borderRadius: "0",
                      cursor: privacyAccepted ? "pointer" : "not-allowed",
                    }}
                    disabled={!privacyAccepted}
                  >
                    Submit Application
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <div className="mt-20 flex justify-center gap-16">
              <div>
                <p className="font-body-nc text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: "hsl(270 10% 45%)" }}>VIP Line</p>
                <a href="tel:+390309912345" className="font-body-nc text-lg">+39 030 991 2345</a>
              </div>
              <div>
                <p className="font-body-nc text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: "hsl(270 10% 45%)" }}>Email</p>
                <a href="mailto:vip@casaegiardino.it" className="font-body-nc text-lg">vip@casaegiardino.it</a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            FOOTER
        ═══════════════════════════════════════════════════════════════════════ */}
        <footer className="py-20 px-6 md:px-12 lg:px-24 border-t" style={{ borderColor: "hsl(270 15% 12%)" }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            <div className="md:col-span-4">
              <h3 className="font-display-nc text-2xl mb-6" style={{ color: "hsl(280 100% 60%)" }}>Casa & Giardino</h3>
              <p className="font-body-nc text-sm max-w-xs leading-relaxed" style={{ color: "hsl(270 10% 55%)" }}>
                Luxury entertainment spaces since 1998. Lake Garda.
              </p>
            </div>

            <div className="md:col-span-3">
              <p className="font-body-nc text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: "hsl(270 10% 45%)" }}>Flagship</p>
              <address className="font-body-nc text-sm not-italic leading-relaxed" style={{ color: "hsl(270 10% 55%)" }}>
                Via del Lago, 42<br />25015 Desenzano del Garda<br />Italia
              </address>
            </div>

            <div className="md:col-span-3">
              <p className="font-body-nc text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: "hsl(270 10% 45%)" }}>Hours</p>
              <p className="font-body-nc text-sm leading-relaxed" style={{ color: "hsl(270 10% 55%)" }}>
                By appointment only<br />Thu - Sun, 21:00 - 04:00
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="font-body-nc text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: "hsl(270 10% 45%)" }}>Legal</p>
              <ul className="space-y-3">
                {["Privacy", "Cookie", "Terms"].map((link) => (
                  <li key={link}><a href="#" className="font-body-nc text-sm" style={{ color: "hsl(270 10% 55%)" }}>{link}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6" style={{ borderColor: "hsl(270 15% 12%)" }}>
            <a href="/" className="font-body-nc text-[11px] uppercase tracking-[0.2em] flex items-center gap-3" style={{ color: "hsl(270 10% 55%)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
              Gallery
            </a>
            <span className="font-body-nc text-sm" style={{ color: "hsl(280 100% 60%)" }}>45.4654° N, 10.6339° E</span>
          </div>

          <div className="mt-12 text-center">
            <p className="font-body-nc text-[10px] uppercase tracking-[0.3em]" style={{ color: "hsl(270 10% 35%)" }}>
              2024 Casa & Giardino - CrazyOne UI / Nightclub
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
