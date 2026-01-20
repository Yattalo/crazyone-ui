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
// RETROFUTURE - Collezione Space Age Italian
// Inspired by: 60s Space Age, Italian Radical Design, Colombo, Artemide, Kartell
// Typography: Syne + Inter
// ═══════════════════════════════════════════════════════════════════════════════

const retrofutureStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500&display=swap');

  :root {
    --rf-bg: 0 0% 98%;
    --rf-fg: 0 0% 10%;
    --rf-card: 0 0% 100%;
    --rf-primary: 14 100% 57%;
    --rf-secondary: 0 0% 15%;
    --rf-accent: 210 100% 50%;
    --rf-muted: 0 0% 55%;
    --rf-border: 0 0% 88%;
  }

  .font-display-rf {
    font-family: 'Syne', -apple-system, sans-serif;
    font-weight: 700;
  }

  .font-body-rf {
    font-family: 'Inter', -apple-system, sans-serif;
    font-weight: 400;
  }

  .text-hero-rf {
    font-size: clamp(4rem, 14vw, 13rem);
    line-height: 0.85;
    letter-spacing: -0.04em;
  }

  .text-display-rf {
    font-size: clamp(2.5rem, 6vw, 5.5rem);
    line-height: 0.9;
    letter-spacing: -0.03em;
  }

  @keyframes orbit {
    from {
      transform: rotate(0deg) translateX(100px) rotate(0deg);
    }
    to {
      transform: rotate(360deg) translateX(100px) rotate(-360deg);
    }
  }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse-ring {
    0% {
      transform: scale(0.95);
      opacity: 0.5;
    }
    50% {
      transform: scale(1);
      opacity: 0.8;
    }
    100% {
      transform: scale(0.95);
      opacity: 0.5;
    }
  }

  @keyframes rotate-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 20px hsl(14 100% 57% / 0.3);
    }
    50% {
      box-shadow: 0 0 40px hsl(14 100% 57% / 0.5);
    }
  }

  /* NEW: Rocket trail */
  @keyframes rocketTrail {
    0% {
      transform: translateY(100vh) scale(0.5);
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) scale(1.2);
      opacity: 0;
    }
  }

  /* NEW: Hologram scanlines */
  @keyframes hologramScan {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(100%);
    }
  }

  /* NEW: Star twinkle */
  @keyframes starTwinkle {
    0%, 100% {
      opacity: 0.4;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.3);
    }
  }

  /* NEW: Planet rotate */
  @keyframes planetRotate {
    0% {
      transform: rotate(0deg) scale(1);
    }
    50% {
      transform: rotate(180deg) scale(1.1);
    }
    100% {
      transform: rotate(360deg) scale(1);
    }
  }

  /* NEW: Orbit path pulse */
  @keyframes orbitPathPulse {
    0%, 100% {
      opacity: 0.2;
      stroke-dashoffset: 0;
    }
    50% {
      opacity: 0.5;
      stroke-dashoffset: 50;
    }
  }

  /* NEW: Signal transmission */
  @keyframes signalTransmit {
    0% {
      transform: scaleX(0);
      opacity: 0;
    }
    50% {
      transform: scaleX(1);
      opacity: 1;
    }
    100% {
      transform: scaleX(0);
      opacity: 0;
    }
  }

  .animate-orbit {
    animation: orbit 20s linear infinite;
  }

  .animate-fade-up {
    animation: fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .animate-pulse-ring {
    animation: pulse-ring 3s ease-in-out infinite;
  }

  .animate-rotate {
    animation: rotate-slow 30s linear infinite;
  }

  .animate-glow {
    animation: glow 2s ease-in-out infinite;
  }

  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
  .delay-500 { animation-delay: 500ms; }
  .delay-600 { animation-delay: 600ms; }

  .hover-retrofuture {
    transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .hover-retrofuture:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 30px 60px -15px hsl(14 100% 57% / 0.2);
  }

  .space-gradient {
    background: radial-gradient(ellipse at top, hsl(210 30% 95%), hsl(0 0% 98%));
  }

  .orbit-ring {
    border: 1px solid hsl(0 0% 90%);
    border-radius: 50%;
    position: absolute;
  }

  .orbit-dot {
    width: 8px;
    height: 8px;
    background: hsl(14 100% 57%);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -4px 0 0 -4px;
  }

  .capsule {
    border-radius: 9999px;
  }

  .pod-shape {
    border-radius: 50% 50% 40% 40%;
  }

  .gallery-scroll-rf {
    display: flex;
    gap: 2.5rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding: 2rem;
    scrollbar-width: none;
  }

  .gallery-scroll-rf::-webkit-scrollbar {
    display: none;
  }

  /* Rocket trail effect */
  .rocket-trail {
    position: fixed;
    width: 4px;
    height: 80px;
    background: linear-gradient(180deg,
      hsl(14 100% 57%) 0%,
      hsl(45 100% 60%) 30%,
      transparent 100%
    );
    border-radius: 2px;
    pointer-events: none;
    z-index: 50;
    animation: rocketTrail 15s linear infinite;
    filter: blur(1px);
  }

  .rocket-trail:nth-child(1) { left: 10%; animation-delay: 0s; }
  .rocket-trail:nth-child(2) { left: 30%; animation-delay: 3s; }
  .rocket-trail:nth-child(3) { left: 60%; animation-delay: 6s; }
  .rocket-trail:nth-child(4) { left: 85%; animation-delay: 9s; }

  /* Hologram overlay */
  .hologram-overlay {
    position: fixed;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent 0px,
      transparent 2px,
      hsl(210 100% 60% / 0.02) 2px,
      hsl(210 100% 60% / 0.02) 4px
    );
    pointer-events: none;
    z-index: 1000;
  }

  .hologram-scan {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(180deg,
      transparent 0%,
      hsl(210 100% 60% / 0.05) 50%,
      transparent 100%
    );
    pointer-events: none;
    z-index: 1001;
    animation: hologramScan 8s linear infinite;
  }

  /* Stars background */
  .star {
    position: fixed;
    width: 3px;
    height: 3px;
    background: hsl(0 0% 100%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 5;
    animation: starTwinkle 4s ease-in-out infinite;
  }

  .star:nth-child(1) { top: 8%; left: 12%; animation-delay: 0s; width: 2px; height: 2px; }
  .star:nth-child(2) { top: 15%; left: 35%; animation-delay: 0.5s; }
  .star:nth-child(3) { top: 5%; left: 55%; animation-delay: 1s; width: 2px; height: 2px; }
  .star:nth-child(4) { top: 20%; left: 75%; animation-delay: 1.5s; }
  .star:nth-child(5) { top: 12%; left: 90%; animation-delay: 2s; width: 2px; height: 2px; }
  .star:nth-child(6) { top: 25%; left: 20%; animation-delay: 2.5s; }
  .star:nth-child(7) { top: 8%; left: 45%; animation-delay: 3s; width: 2px; height: 2px; }
  .star:nth-child(8) { top: 18%; left: 65%; animation-delay: 3.5s; }

  /* Animated planet */
  .planet-decoration {
    position: fixed;
    border-radius: 50%;
    pointer-events: none;
    z-index: 30;
  }

  .planet-orange {
    width: 40px;
    height: 40px;
    top: 15%;
    right: 15%;
    background: radial-gradient(
      circle at 30% 30%,
      hsl(30 90% 65%) 0%,
      hsl(14 100% 57%) 50%,
      hsl(14 80% 35%) 100%
    );
    animation: planetRotate 30s linear infinite;
    box-shadow: inset -10px -10px 20px hsl(0 0% 0% / 0.3);
  }

  .planet-blue {
    width: 25px;
    height: 25px;
    bottom: 25%;
    left: 10%;
    background: radial-gradient(
      circle at 30% 30%,
      hsl(210 80% 70%) 0%,
      hsl(210 100% 50%) 50%,
      hsl(210 80% 30%) 100%
    );
    animation: planetRotate 25s linear infinite reverse;
    animation-delay: -5s;
    box-shadow: inset -6px -6px 12px hsl(0 0% 0% / 0.3);
  }

  /* Animated orbit paths SVG */
  .orbit-path-animated {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 20;
  }

  .orbit-path-animated circle {
    fill: none;
    stroke: hsl(0 0% 80%);
    stroke-width: 1;
    stroke-dasharray: 10 10;
    animation: orbitPathPulse 4s ease-in-out infinite;
  }

  /* Signal transmission line */
  .signal-line {
    position: fixed;
    height: 2px;
    background: linear-gradient(90deg,
      transparent 0%,
      hsl(14 100% 57%) 50%,
      transparent 100%
    );
    pointer-events: none;
    z-index: 35;
    animation: signalTransmit 4s ease-in-out infinite;
  }

  .signal-line-1 {
    width: 200px;
    top: 30%;
    left: 5%;
    animation-delay: 0s;
  }

  .signal-line-2 {
    width: 150px;
    top: 60%;
    right: 5%;
    transform-origin: right;
    animation-delay: 2s;
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-orbit,
    .animate-fade-up,
    .animate-pulse-ring,
    .animate-rotate,
    .animate-glow,
    .hover-retrofuture,
    .rocket-trail,
    .hologram-scan,
    .star,
    .planet-decoration,
    .planet-orange,
    .planet-blue,
    .orbit-path-animated circle,
    .signal-line {
      animation: none !important;
      transition: none !important;
    }
  }
`;

const SERVIZI = [
  {
    numeral: "01",
    title: "Missione Briefing",
    subtitle: "Mission Briefing",
    description: "Analisi delle coordinate spaziali. Definizione dell'orbita progettuale. Countdown iniziato.",
    icon: "rocket",
  },
  {
    numeral: "02",
    title: "Design Orbitale",
    subtitle: "Orbital Design",
    description: "Progettazione modulare. Forme organiche. Materiali spaziali: ABS, fibra di vetro, alluminio.",
    icon: "planet",
  },
  {
    numeral: "03",
    title: "Costruzione Pod",
    subtitle: "Pod Construction",
    description: "Realizzazione capsule abitabili. Integrazione sistemi. Test di pressurizzazione.",
    icon: "pod",
  },
  {
    numeral: "04",
    title: "Landing",
    subtitle: "Soft Landing",
    description: "Atterraggio morbido. Installazione in situ. Benvenuti nel futuro.",
    icon: "landing",
  },
];

const COLLEZIONI = [
  {
    id: "artemide",
    name: "Collezione Artemide",
    subtitle: "Illuminazione",
    price: "da / from 8.500",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=1000&fit=crop&q=80",
    tag: "Iconic",
  },
  {
    id: "colombo",
    name: "Collezione Colombo",
    subtitle: "Living Pod",
    price: "da / from 24.000",
    image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&h=1000&fit=crop&q=80",
    tag: "Module",
  },
  {
    id: "kartell",
    name: "Collezione Kartell",
    subtitle: "Seating",
    price: "da / from 12.000",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&h=1000&fit=crop&q=80",
    tag: "Plastic",
  },
  {
    id: "orbital",
    name: "Collezione Orbital",
    subtitle: "Bedroom",
    price: "da / from 32.000",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=1000&fit=crop&q=80",
    tag: "Capsule",
  },
  {
    id: "luna",
    name: "Collezione Luna",
    subtitle: "Outdoor",
    price: "da / from 18.000",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=1000&fit=crop&q=80",
    tag: "Garden",
  },
];

const STATS = [
  { value: "1969", label: "Anno zero", sublabel: "The moon landing" },
  { value: "2001", label: "Odissea", sublabel: "Space odyssey" },
  { value: "∞", label: "Futuro", sublabel: "Infinite future" },
];

export function CasaGiardinoRetrofutureDemo() {
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  const scrollGallery = (direction: "left" | "right") => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({
        left: direction === "left" ? -420 : 420,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <style>{retrofutureStyles}</style>
      <div
        className="relative overflow-x-hidden space-gradient"
        style={{
          fontFamily: "'Inter', sans-serif",
          backgroundColor: "hsl(0 0% 98%)",
          color: "hsl(0 0% 10%)",
        }}
      >
        {/* Hologram Overlay & Scan Effect */}
        <div className="hologram-overlay hidden lg:block" aria-hidden="true" />
        <div className="hologram-scan hidden lg:block" aria-hidden="true" />

        {/* Twinkling Stars */}
        {[...Array(8)].map((_, i) => (
          <div key={`star-${i}`} className="star hidden lg:block" aria-hidden="true" />
        ))}

        {/* Rocket Trails */}
        {[...Array(4)].map((_, i) => (
          <div key={`rocket-${i}`} className="rocket-trail hidden lg:block" aria-hidden="true" />
        ))}

        {/* Animated Planets */}
        <div className="planet-decoration planet-orange hidden lg:block" aria-hidden="true" />
        <div className="planet-decoration planet-blue hidden lg:block" aria-hidden="true" />

        {/* Signal Lines */}
        <div className="signal-line signal-line-1 hidden lg:block" aria-hidden="true" />
        <div className="signal-line signal-line-2 hidden lg:block" aria-hidden="true" />

        {/* Animated Orbit Paths */}
        <svg className="orbit-path-animated hidden lg:block" width="800" height="800" viewBox="0 0 800 800" aria-hidden="true">
          <circle cx="400" cy="400" r="150" style={{ animationDelay: "0s" }} />
          <circle cx="400" cy="400" r="250" style={{ animationDelay: "0.5s" }} />
          <circle cx="400" cy="400" r="350" style={{ animationDelay: "1s" }} />
        </svg>

        {/* ═══════════════════════════════════════════════════════════════════════
            HERO - Space Age
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="min-h-screen relative overflow-hidden">
          {/* Orbital rings decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
            <div className="orbit-ring w-[300px] h-[300px] animate-rotate" style={{ animationDuration: "40s" }} />
            <div className="orbit-ring w-[500px] h-[500px] animate-rotate" style={{ animationDuration: "60s", animationDirection: "reverse" }} />
            <div className="orbit-ring w-[700px] h-[700px] animate-rotate" style={{ animationDuration: "80s" }} />
            <div className="orbit-dot animate-orbit" style={{ animationDuration: "8s" }} />
          </div>

          <nav className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-6 md:px-12 lg:px-24 py-8">
            <span
              className="font-display-rf text-2xl opacity-0 animate-fade-up"
              style={{ color: "hsl(14 100% 57%)" }}
            >
              C&G
            </span>
            <div className="flex items-center gap-8">
              <span
                className="font-body-rf text-[11px] uppercase tracking-[0.4em] opacity-0 animate-fade-up delay-100 hidden md:block"
                style={{ color: "hsl(0 0% 55%)" }}
              >
                Lago di Garda
              </span>
              <Badge
                className="font-body-rf text-[10px] px-6 py-2 uppercase tracking-[0.3em] opacity-0 animate-fade-up delay-200 capsule"
                style={{
                  backgroundColor: "hsl(14 100% 57%)",
                  color: "white",
                  border: "none",
                }}
              >
                Space Age
              </Badge>
            </div>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
            <div className="flex flex-col justify-center px-6 md:px-12 lg:px-24 py-32 lg:py-0 relative z-10">
              <p
                className="font-body-rf text-[11px] uppercase tracking-[0.6em] mb-12 opacity-0 animate-fade-up delay-300"
                style={{ color: "hsl(14 100% 57%)" }}
              >
                Italian Space Age Design
              </p>

              <h1 className="font-display-rf text-hero-rf opacity-0 animate-fade-up delay-400">
                <span className="block" style={{ color: "hsl(0 0% 10%)" }}>Casa</span>
                <span className="block" style={{ color: "hsl(14 100% 57%)" }}>&</span>
                <span className="block" style={{ color: "hsl(0 0% 10%)" }}>Giardino</span>
              </h1>

              <p
                className="font-body-rf text-xl md:text-2xl mt-12 max-w-lg opacity-0 animate-fade-up delay-500"
                style={{ color: "hsl(0 0% 45%)" }}
              >
                Il futuro
                <br />di ieri, oggi
              </p>

              <p
                className="font-body-rf text-sm mt-4 opacity-0 animate-fade-up delay-500"
                style={{ color: "hsl(0 0% 60%)" }}
              >
                Yesterday's future, today
              </p>

              <div className="mt-20 flex items-center gap-10 opacity-0 animate-fade-up delay-600">
                {/* Orbit indicator */}
                <div className="relative w-16 h-16">
                  <div
                    className="absolute inset-0 rounded-full animate-pulse-ring"
                    style={{ border: "2px solid hsl(14 100% 57% / 0.3)" }}
                  />
                  <div
                    className="absolute inset-2 rounded-full"
                    style={{ border: "2px solid hsl(14 100% 57% / 0.5)" }}
                  />
                  <div
                    className="absolute inset-4 rounded-full animate-glow"
                    style={{ backgroundColor: "hsl(14 100% 57%)" }}
                  />
                </div>
                <div>
                  <p className="font-body-rf text-[10px] uppercase tracking-[0.4em]" style={{ color: "hsl(0 0% 55%)" }}>
                    Coordinate Orbitali
                  </p>
                  <p className="font-display-rf text-lg mt-1" style={{ color: "hsl(14 100% 57%)" }}>
                    45.4654° N, 10.6339° E
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-[60vh] lg:h-auto opacity-0 animate-fade-up delay-300">
              <div
                className="absolute inset-8 lg:inset-16 rounded-[60px] overflow-hidden"
                style={{ border: "3px solid hsl(0 0% 90%)" }}
              >
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&h=1600&fit=crop&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  role="img"
                  aria-label="Retrofuturistic interior design"
                />
              </div>
              <div
                className="absolute bottom-12 left-12 right-12 lg:bottom-20 lg:left-20 lg:right-20 p-6 capsule"
                style={{
                  backgroundColor: "white",
                  boxShadow: "0 20px 40px -10px hsl(0 0% 0% / 0.1)",
                }}
              >
                <p className="font-body-rf text-[10px] uppercase tracking-[0.3em] mb-1" style={{ color: "hsl(14 100% 57%)" }}>
                  Mission Status
                </p>
                <p className="font-display-rf text-lg">
                  Collezione Orbital 2024
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
          style={{ backgroundColor: "hsl(0 0% 10%)", color: "white" }}
        >
          <div className="max-w-5xl">
            <p
              className="font-body-rf text-[11px] uppercase tracking-[0.6em] mb-12"
              style={{ color: "hsl(14 100% 57%)" }}
            >
              Filosofia / Philosophy
            </p>

            <h2 className="font-display-rf text-display-rf">
              <span style={{ color: "white" }}>Dove finisce </span>
              <span style={{ color: "hsl(14 100% 57%)" }}>la terra</span>
              <span style={{ color: "white" }}>,</span>
              <br />
              <span style={{ color: "white" }}>inizia </span>
              <span style={{ color: "hsl(210 100% 60%)" }}>l'infinito</span>
              <span style={{ color: "white" }}>.</span>
            </h2>

            <p
              className="font-body-rf text-lg mt-16 max-w-2xl leading-relaxed"
              style={{ color: "hsl(0 0% 65%)" }}
            >
              Where Earth ends, infinity begins. Inspired by the Space Age optimism of the 1960s,
              we create environments that channel the visionary spirit of Italian radical design.
              Colombo, Artemide, Kartell: the future as our ancestors imagined it.
            </p>

            <div className="mt-20 flex flex-wrap gap-4">
              {["ABS Plastic", "Fiberglass", "Chrome", "Acrylic", "Rotomolding"].map((material, i) => (
                <span
                  key={material}
                  className="font-body-rf text-[11px] uppercase tracking-[0.2em] px-6 py-3 capsule"
                  style={{
                    color: i === 0 ? "hsl(14 100% 57%)" : "hsl(0 0% 70%)",
                    border: `2px solid ${i === 0 ? "hsl(14 100% 57%)" : "hsl(0 0% 25%)"}`,
                  }}
                >
                  {material}
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
              <p className="font-body-rf text-[11px] uppercase tracking-[0.6em] mb-4" style={{ color: "hsl(0 0% 55%)" }}>
                Mission Protocol
              </p>
              <h2 className="font-display-rf text-display-rf">
                <span style={{ color: "hsl(14 100% 57%)" }}>4</span> Fasi Orbitali
              </h2>
            </div>
            <p className="font-body-rf text-sm mt-8 md:mt-0" style={{ color: "hsl(0 0% 55%)" }}>
              T-minus launch sequence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVIZI.map((servizio, index) => (
              <Card
                key={servizio.numeral}
                className="hover-retrofuture group relative overflow-hidden"
                style={{
                  backgroundColor: "white",
                  border: "2px solid hsl(0 0% 92%)",
                  borderRadius: "32px",
                  minHeight: "380px",
                }}
              >
                <CardContent className="p-8 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span
                      className="font-display-rf text-5xl"
                      style={{ color: "hsl(14 100% 57%)" }}
                    >
                      {servizio.numeral}
                    </span>
                    {/* Orbit indicator */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "hsl(14 100% 57% / 0.1)" }}
                    >
                      <div
                        className="w-4 h-4 rounded-full group-hover:animate-glow"
                        style={{ backgroundColor: "hsl(14 100% 57%)" }}
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display-rf text-xl">{servizio.title}</h3>
                    <p className="font-body-rf text-[10px] uppercase tracking-[0.3em] mt-2" style={{ color: "hsl(14 100% 57%)" }}>
                      {servizio.subtitle}
                    </p>
                    <p
                      className="font-body-rf text-sm mt-6 leading-relaxed"
                      style={{ color: "hsl(0 0% 50%)" }}
                    >
                      {servizio.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            COLLEZIONI
        ═══════════════════════════════════════════════════════════════════════ */}
        <section
          className="py-32 md:py-48"
          style={{ backgroundColor: "hsl(210 30% 97%)" }}
        >
          <div className="px-6 md:px-12 lg:px-24 mb-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-body-rf text-[11px] uppercase tracking-[0.6em] mb-4" style={{ color: "hsl(14 100% 57%)" }}>
                  Collezioni
                </p>
                <h2 className="font-display-rf text-display-rf">
                  Orbital Collection
                </h2>
              </div>

              <div className="flex gap-4 mt-8 md:mt-0">
                <button
                  onClick={() => scrollGallery("left")}
                  className="w-14 h-14 flex items-center justify-center rounded-full border-2 transition-all hover:bg-[hsl(14_100%_57%)] hover:border-[hsl(14_100%_57%)] hover:text-white"
                  style={{ borderColor: "hsl(0 0% 85%)" }}
                  aria-label="Previous orbit"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollGallery("right")}
                  className="w-14 h-14 flex items-center justify-center rounded-full border-2 transition-all hover:bg-[hsl(14_100%_57%)] hover:border-[hsl(14_100%_57%)] hover:text-white"
                  style={{ borderColor: "hsl(0 0% 85%)" }}
                  aria-label="Next orbit"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div ref={galleryRef} className="gallery-scroll-rf pl-6 md:pl-12 lg:pl-24 pr-6">
            {COLLEZIONI.map((collezione) => (
              <article key={collezione.id} className="flex-shrink-0 group cursor-pointer" style={{ width: "340px" }}>
                <div
                  className="relative overflow-hidden mb-8"
                  style={{
                    aspectRatio: "3/4",
                    borderRadius: "40px",
                    border: "3px solid hsl(0 0% 92%)",
                  }}
                >
                  <img
                    src={collezione.image}
                    alt={`${collezione.name} - ${collezione.subtitle}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <Badge
                    className="absolute top-6 left-6 font-body-rf text-[9px] uppercase tracking-[0.2em] px-5 py-2 capsule"
                    style={{
                      backgroundColor: "hsl(14 100% 57%)",
                      color: "white",
                      border: "none",
                    }}
                  >
                    {collezione.tag}
                  </Badge>
                </div>

                <h3 className="font-display-rf text-lg mb-1">{collezione.name}</h3>
                <p className="font-body-rf text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: "hsl(0 0% 55%)" }}>
                  {collezione.subtitle}
                </p>
                <p className="font-display-rf text-lg" style={{ color: "hsl(14 100% 57%)" }}>
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
        <section className="relative min-h-[80vh]" style={{ backgroundColor: "hsl(14 100% 57%)" }}>
          {/* Floating orbs */}
          <div
            className="absolute top-20 left-20 w-32 h-32 rounded-full animate-pulse-ring"
            style={{ backgroundColor: "hsl(0 0% 100% / 0.2)" }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-20 right-20 w-20 h-20 rounded-full animate-pulse-ring"
            style={{ backgroundColor: "hsl(0 0% 100% / 0.15)", animationDelay: "1s" }}
            aria-hidden="true"
          />

          <div className="relative z-10 min-h-[80vh] flex flex-col justify-end px-6 md:px-12 lg:px-24 py-20">
            <p className="font-body-rf text-[11px] uppercase tracking-[0.6em] mb-8" style={{ color: "hsl(0 0% 100% / 0.8)" }}>
              Base Station
            </p>
            <h2 className="font-display-rf text-display-rf max-w-4xl" style={{ color: "white" }}>
              600 mq di puro
              <br />
              <span style={{ color: "hsl(0 0% 10%)" }}>retrofuturo</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20 pt-12 border-t" style={{ borderColor: "hsl(0 0% 100% / 0.3)" }}>
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display-rf text-5xl md:text-6xl mb-3" style={{ color: "white" }}>
                    {stat.value}
                  </p>
                  <p className="font-body-rf text-base" style={{ color: "hsl(0 0% 100% / 0.9)" }}>{stat.label}</p>
                  <p className="font-body-rf text-sm mt-1" style={{ color: "hsl(0 0% 100% / 0.6)" }}>{stat.sublabel}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            CONTACT
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-40 md:py-56 px-6 md:px-12 lg:px-24" style={{ backgroundColor: "hsl(0 0% 10%)", color: "white" }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-body-rf text-[11px] uppercase tracking-[0.6em] mb-8" style={{ color: "hsl(14 100% 57%)" }}>
              Launch Request
            </p>

            <h2 className="font-display-rf text-display-rf mb-12">
              Pronti per
              <br />
              <span style={{ color: "hsl(14 100% 57%)" }}>il decollo?</span>
            </h2>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="font-body-rf text-[11px] px-16 py-6 uppercase tracking-[0.3em] hover-retrofuture capsule"
                  style={{
                    backgroundColor: "hsl(14 100% 57%)",
                    color: "white",
                    border: "none",
                  }}
                >
                  Inizia la Missione
                </Button>
              </DialogTrigger>
              <DialogContent
                className="max-w-lg"
                style={{
                  borderRadius: "32px",
                  border: "2px solid hsl(0 0% 90%)",
                  backgroundColor: "white",
                  color: "hsl(0 0% 10%)",
                }}
              >
                <DialogHeader className="pb-6 border-b" style={{ borderColor: "hsl(0 0% 92%)" }}>
                  <DialogTitle className="font-display-rf text-xl">
                    Mission Control
                  </DialogTitle>
                  <DialogDescription className="font-body-rf text-sm mt-3" style={{ color: "hsl(0 0% 50%)" }}>
                    Un operatore vi contattera entro 24 ore per il briefing.
                  </DialogDescription>
                </DialogHeader>

                <form className="space-y-5 pt-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="font-body-rf text-[10px] uppercase tracking-[0.2em] block mb-2" style={{ color: "hsl(0 0% 50%)" }}>Nome</label>
                      <Input
                        id="name"
                        placeholder="Mario"
                        className="font-body-rf capsule"
                        style={{ borderRadius: "9999px", border: "2px solid hsl(0 0% 90%)" }}
                      />
                    </div>
                    <div>
                      <label htmlFor="surname" className="font-body-rf text-[10px] uppercase tracking-[0.2em] block mb-2" style={{ color: "hsl(0 0% 50%)" }}>Cognome</label>
                      <Input
                        id="surname"
                        placeholder="Rossi"
                        className="font-body-rf capsule"
                        style={{ borderRadius: "9999px", border: "2px solid hsl(0 0% 90%)" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="font-body-rf text-[10px] uppercase tracking-[0.2em] block mb-2" style={{ color: "hsl(0 0% 50%)" }}>Email</label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="mario.rossi@email.it"
                      className="font-body-rf capsule"
                      style={{ borderRadius: "9999px", border: "2px solid hsl(0 0% 90%)" }}
                    />
                  </div>

                  <div>
                    <label htmlFor="interest" className="font-body-rf text-[10px] uppercase tracking-[0.2em] block mb-2" style={{ color: "hsl(0 0% 50%)" }}>Collezione</label>
                    <Select>
                      <SelectTrigger id="interest" className="font-body-rf capsule" style={{ borderRadius: "9999px", border: "2px solid hsl(0 0% 90%)" }}>
                        <SelectValue placeholder="Seleziona..." />
                      </SelectTrigger>
                      <SelectContent style={{ borderRadius: "16px", border: "2px solid hsl(0 0% 90%)" }}>
                        <SelectItem value="artemide">Collezione Artemide</SelectItem>
                        <SelectItem value="colombo">Collezione Colombo</SelectItem>
                        <SelectItem value="orbital">Collezione Orbital</SelectItem>
                        <SelectItem value="complete">Missione Completa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer pt-2">
                    <Checkbox checked={privacyAccepted} onCheckedChange={(c) => setPrivacyAccepted(c === true)} className="mt-0.5" />
                    <span className="font-body-rf text-[11px] leading-relaxed" style={{ color: "hsl(0 0% 50%)" }}>
                      Accetto la Privacy Policy.
                    </span>
                  </label>

                  <Button
                    type="submit"
                    className="w-full font-body-rf text-[11px] py-4 uppercase tracking-[0.2em] capsule"
                    style={{
                      backgroundColor: privacyAccepted ? "hsl(14 100% 57%)" : "hsl(0 0% 90%)",
                      color: privacyAccepted ? "white" : "hsl(0 0% 60%)",
                      borderRadius: "9999px",
                      cursor: privacyAccepted ? "pointer" : "not-allowed",
                    }}
                    disabled={!privacyAccepted}
                  >
                    Launch Mission
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <div className="mt-20 flex justify-center gap-16">
              <div>
                <p className="font-body-rf text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: "hsl(0 0% 55%)" }}>Mission Control</p>
                <a href="tel:+390309912345" className="font-body-rf text-lg" style={{ color: "white" }}>+39 030 991 2345</a>
              </div>
              <div>
                <p className="font-body-rf text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: "hsl(0 0% 55%)" }}>Comm Link</p>
                <a href="mailto:orbit@casaegiardino.it" className="font-body-rf text-lg" style={{ color: "white" }}>orbit@casaegiardino.it</a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            FOOTER
        ═══════════════════════════════════════════════════════════════════════ */}
        <footer className="py-16 px-6 md:px-12 lg:px-24 border-t" style={{ borderColor: "hsl(0 0% 92%)" }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h3 className="font-display-rf text-xl mb-4" style={{ color: "hsl(14 100% 57%)" }}>Casa & Giardino</h3>
              <p className="font-body-rf text-sm max-w-xs leading-relaxed" style={{ color: "hsl(0 0% 50%)" }}>
                Il futuro di ieri, oggi. Space Age dal 1998.
              </p>
            </div>

            <div className="md:col-span-3">
              <p className="font-body-rf text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: "hsl(0 0% 55%)" }}>Base Station</p>
              <address className="font-body-rf text-sm not-italic leading-relaxed" style={{ color: "hsl(0 0% 50%)" }}>
                Via del Lago, 42<br />25015 Desenzano del Garda<br />Italia
              </address>
            </div>

            <div className="md:col-span-3">
              <p className="font-body-rf text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: "hsl(0 0% 55%)" }}>Orari Missione</p>
              <p className="font-body-rf text-sm leading-relaxed" style={{ color: "hsl(0 0% 50%)" }}>
                Mar - Sab<br />10:00 - 19:00
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="font-body-rf text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: "hsl(0 0% 55%)" }}>Legal</p>
              <ul className="space-y-2">
                {["Privacy", "Cookie", "Terms"].map((link) => (
                  <li key={link}><a href="#" className="font-body-rf text-sm" style={{ color: "hsl(0 0% 50%)" }}>{link}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: "hsl(0 0% 92%)" }}>
            <a href="/" className="font-body-rf text-[11px] uppercase tracking-[0.2em] flex items-center gap-2" style={{ color: "hsl(0 0% 50%)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
              Gallery
            </a>
            <span className="font-display-rf text-sm" style={{ color: "hsl(14 100% 57%)" }}>45.4654° N, 10.6339° E</span>
          </div>

          <div className="mt-8 text-center">
            <p className="font-body-rf text-[10px] uppercase tracking-[0.2em]" style={{ color: "hsl(0 0% 70%)" }}>
              2024 Casa & Giardino - CrazyOne UI / Retrofuture
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
