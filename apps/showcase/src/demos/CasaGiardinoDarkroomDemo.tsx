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
// DARKROOM - Collezione Fotografica/Galleria
// Inspired by: Analog photography, red safelight, contact sheets, film grain
// Typography: Bodoni Moda + IBM Plex Mono
// ═══════════════════════════════════════════════════════════════════════════════

const darkroomStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,500;0,600;1,400;1,500&family=IBM+Plex+Mono:wght@300;400;500&display=swap');

  :root {
    --dr-bg: 0 0% 5%;
    --dr-fg: 0 0% 95%;
    --dr-card: 0 0% 8%;
    --dr-primary: 0 85% 45%;
    --dr-secondary: 0 0% 15%;
    --dr-accent: 35 100% 60%;
    --dr-muted: 0 0% 40%;
    --dr-border: 0 0% 12%;
    --dr-safelight: 0 100% 25%;
  }

  .font-display-dr {
    font-family: 'Bodoni Moda', 'Didot', Georgia, serif;
    font-weight: 400;
  }

  .font-body-dr {
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 400;
  }

  .text-hero-dr {
    font-size: clamp(3.5rem, 12vw, 10rem);
    line-height: 0.85;
    letter-spacing: -0.02em;
  }

  .text-display-dr {
    font-size: clamp(2.2rem, 5vw, 4.5rem);
    line-height: 0.95;
    letter-spacing: -0.01em;
  }

  @keyframes safelightPulse {
    0%, 100% {
      opacity: 0.3;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes filmDevelop {
    0% {
      opacity: 0;
      filter: blur(10px) brightness(0.5);
    }
    50% {
      opacity: 0.8;
      filter: blur(2px) brightness(0.9);
    }
    100% {
      opacity: 1;
      filter: blur(0) brightness(1);
    }
  }

  @keyframes grainShift {
    0%, 100% {
      transform: translate(0, 0);
    }
    10% {
      transform: translate(-1%, -1%);
    }
    20% {
      transform: translate(1%, 1%);
    }
    30% {
      transform: translate(-1%, 1%);
    }
    40% {
      transform: translate(1%, -1%);
    }
    50% {
      transform: translate(-0.5%, 0.5%);
    }
  }

  @keyframes contactSheet {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes chemicalWash {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  /* NEW: Developer tray liquid animation */
  @keyframes developerLiquid {
    0%, 100% {
      transform: translateY(0) scaleX(1);
      opacity: 0.1;
    }
    25% {
      transform: translateY(-3px) scaleX(1.02);
      opacity: 0.15;
    }
    50% {
      transform: translateY(3px) scaleX(0.98);
      opacity: 0.1;
    }
    75% {
      transform: translateY(-2px) scaleX(1.01);
      opacity: 0.12;
    }
  }

  /* NEW: Light leak */
  @keyframes lightLeak {
    0%, 100% {
      opacity: 0;
      transform: translateX(-100%);
    }
    50% {
      opacity: 0.1;
      transform: translateX(100%);
    }
  }

  /* NEW: Film advance */
  @keyframes filmAdvance {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-100%);
    }
  }

  /* NEW: Safelight flicker */
  @keyframes safelightFlicker {
    0%, 90%, 100% {
      opacity: 0.25;
    }
    92% {
      opacity: 0.35;
    }
    94% {
      opacity: 0.2;
    }
    96% {
      opacity: 0.4;
    }
    98% {
      opacity: 0.25;
    }
  }

  /* NEW: Enlarger light cone */
  @keyframes enlargerLight {
    0%, 100% {
      opacity: 0;
    }
    50% {
      opacity: 0.1;
    }
  }

  .animate-safelight {
    animation: safelightPulse 4s ease-in-out infinite;
  }

  .animate-develop {
    animation: filmDevelop 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .animate-grain {
    animation: grainShift 8s steps(5) infinite;
  }

  .animate-contact {
    animation: contactSheet 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
  .delay-500 { animation-delay: 500ms; }
  .delay-600 { animation-delay: 600ms; }

  .hover-darkroom {
    transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .hover-darkroom:hover {
    transform: scale(1.02);
    box-shadow: 0 0 40px hsl(0 85% 45% / 0.15);
  }

  .grain-overlay {
    position: relative;
  }

  .grain-overlay::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    opacity: 0.03;
    pointer-events: none;
    mix-blend-mode: overlay;
  }

  .safelight-glow {
    background: radial-gradient(ellipse at top right, hsl(0 100% 25% / 0.15), transparent 60%);
  }

  .animate-safelight-flicker {
    animation: safelightFlicker 10s ease-in-out infinite;
  }

  /* Atmospheric safelight lamp */
  .safelight-lamp {
    position: fixed;
    top: 20px;
    right: 40px;
    width: 80px;
    height: 40px;
    background: hsl(0 100% 30%);
    border-radius: 4px;
    box-shadow:
      0 0 60px 30px hsl(0 100% 30% / 0.3),
      0 0 120px 60px hsl(0 100% 25% / 0.15);
    animation: safelightFlicker 8s ease-in-out infinite;
    pointer-events: none;
    z-index: 100;
  }

  .safelight-lamp::after {
    content: '';
    position: absolute;
    bottom: -100vh;
    left: 50%;
    width: 200vw;
    height: 100vh;
    background: radial-gradient(ellipse at top, hsl(0 100% 25% / 0.1), transparent 70%);
    transform: translateX(-50%);
    pointer-events: none;
  }

  /* Developer tray */
  .developer-tray {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: linear-gradient(180deg,
      transparent 0%,
      hsl(0 100% 25% / 0.05) 50%,
      hsl(0 100% 20% / 0.1) 100%
    );
    animation: developerLiquid 6s ease-in-out infinite;
    pointer-events: none;
    z-index: 50;
  }

  /* Light leak effect */
  .light-leak {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      transparent 0%,
      hsl(30 100% 60% / 0.05) 50%,
      transparent 100%
    );
    animation: lightLeak 20s ease-in-out infinite;
    pointer-events: none;
    z-index: 40;
  }

  /* Film strip border with sprocket holes */
  .film-strip-border {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 32px;
    background: hsl(0 0% 6%);
    pointer-events: none;
    z-index: 60;
  }

  .film-strip-border.left {
    left: 0;
  }

  .film-strip-border.right {
    right: 0;
  }

  .film-strip-border::before,
  .film-strip-border::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 16px;
    height: 10px;
    background: hsl(0 0% 3%);
    border-radius: 2px;
  }

  /* Multiple sprocket holes */
  .sprocket-strip {
    position: fixed;
    top: 0;
    width: 32px;
    height: 200%;
    background-image: repeating-linear-gradient(
      180deg,
      transparent 0px,
      transparent 20px,
      hsl(0 0% 3%) 20px,
      hsl(0 0% 3%) 32px,
      transparent 32px,
      transparent 60px
    );
    pointer-events: none;
    z-index: 61;
    animation: filmAdvance 30s linear infinite;
  }

  .sprocket-strip.left {
    left: 8px;
  }

  .sprocket-strip.right {
    right: 8px;
  }

  /* Enlarger cone */
  .enlarger-cone {
    position: fixed;
    top: 0;
    left: 30%;
    width: 40%;
    height: 60vh;
    background: conic-gradient(
      from 180deg at 50% 0%,
      transparent 35%,
      hsl(0 0% 100% / 0.02) 45%,
      hsl(0 0% 100% / 0.03) 50%,
      hsl(0 0% 100% / 0.02) 55%,
      transparent 65%
    );
    animation: enlargerLight 15s ease-in-out infinite;
    pointer-events: none;
    z-index: 30;
  }

  .contact-frame {
    position: relative;
    border: 2px solid hsl(0 0% 20%);
    padding: 4px;
    background: hsl(0 0% 8%);
  }

  .contact-frame::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 16px;
    width: 24px;
    height: 8px;
    background: hsl(0 0% 25%);
  }

  .sprocket-holes {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px 0;
  }

  .sprocket-hole {
    width: 12px;
    height: 8px;
    background: hsl(0 0% 3%);
    border-radius: 1px;
  }

  .gallery-scroll-dr {
    display: flex;
    gap: 1.5rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding: 2rem;
    scrollbar-width: none;
  }

  .gallery-scroll-dr::-webkit-scrollbar {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-safelight,
    .animate-develop,
    .animate-grain,
    .animate-contact,
    .animate-safelight-flicker,
    .hover-darkroom,
    .safelight-lamp,
    .developer-tray,
    .light-leak,
    .sprocket-strip,
    .enlarger-cone {
      animation: none !important;
      transition: none !important;
    }
  }
`;

const SERVIZI = [
  {
    numeral: "I",
    title: "Sopralluogo Fotografico",
    subtitle: "Photo Survey",
    description: "Documentazione fotografica dello spazio. Analisi della luce naturale. Studio delle prospettive.",
    frame: "FRAME 001",
  },
  {
    numeral: "II",
    title: "Sviluppo Concept",
    subtitle: "Concept Development",
    description: "Composizione visiva. Selezione dei pezzi. Creazione della narrativa.",
    frame: "FRAME 012",
  },
  {
    numeral: "III",
    title: "Camera Chiara",
    subtitle: "Installation",
    description: "Posizionamento scenografico. Gioco di luci e ombre. Perfetta esposizione.",
    frame: "FRAME 024",
  },
  {
    numeral: "IV",
    title: "Print Finale",
    subtitle: "Final Reveal",
    description: "Consegna dell'opera. Documentazione completa. Memoria dell'ambiente.",
    frame: "FRAME 036",
  },
];

const COLLEZIONI = [
  {
    id: "noir",
    name: "Collezione Noir",
    subtitle: "Living Room",
    price: "da / from 18.000",
    image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&h=1000&fit=crop&q=80",
    exposure: "f/2.8 1/60s ISO 400",
  },
  {
    id: "contrast",
    name: "Collezione Alto Contrasto",
    subtitle: "Dining",
    price: "da / from 24.000",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&h=1000&fit=crop&q=80",
    exposure: "f/4 1/125s ISO 200",
  },
  {
    id: "silver",
    name: "Collezione Silver Gelatin",
    subtitle: "Bedroom",
    price: "da / from 32.000",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=1000&fit=crop&q=80",
    exposure: "f/5.6 1/250s ISO 100",
  },
  {
    id: "platinum",
    name: "Collezione Platinum",
    subtitle: "Study",
    price: "da / from 42.000",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1000&fit=crop&q=80",
    exposure: "f/8 1/500s ISO 100",
  },
  {
    id: "cyanotype",
    name: "Collezione Cyanotype",
    subtitle: "Garden",
    price: "da / from 15.000",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=1000&fit=crop&q=80",
    exposure: "f/11 1/1000s ISO 50",
  },
];

const STATS = [
  { value: "1/125", label: "Precisione", sublabel: "Precision timing" },
  { value: "f/2.8", label: "Apertura", sublabel: "Wide perspective" },
  { value: "ISO 100", label: "Purita", sublabel: "Grain-free clarity" },
];

export function CasaGiardinoDarkroomDemo() {
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  const scrollGallery = (direction: "left" | "right") => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({
        left: direction === "left" ? -380 : 380,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <style>{darkroomStyles}</style>
      <div
        className="relative overflow-x-hidden grain-overlay"
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          backgroundColor: "hsl(0 0% 5%)",
          color: "hsl(0 0% 95%)",
        }}
      >
        {/* Safelight Lamp */}
        <div className="safelight-lamp hidden lg:block" aria-hidden="true" />

        {/* Film Strip Borders with Sprocket Holes */}
        <div className="film-strip-border left hidden lg:block" aria-hidden="true" />
        <div className="film-strip-border right hidden lg:block" aria-hidden="true" />
        <div className="sprocket-strip left hidden lg:block" aria-hidden="true" />
        <div className="sprocket-strip right hidden lg:block" aria-hidden="true" />

        {/* Developer Tray Chemical Effect */}
        <div className="developer-tray hidden lg:block" aria-hidden="true" />

        {/* Light Leak */}
        <div className="light-leak hidden lg:block" aria-hidden="true" />

        {/* Enlarger Light Cone */}
        <div className="enlarger-cone hidden lg:block" aria-hidden="true" />

        {/* ═══════════════════════════════════════════════════════════════════════
            HERO - Darkroom Aesthetic
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="min-h-screen relative safelight-glow">
          {/* Safelight corner glow */}
          <div
            className="absolute top-0 right-0 w-96 h-96 animate-safelight"
            style={{
              background: "radial-gradient(circle, hsl(0 100% 25% / 0.3), transparent 70%)",
              filter: "blur(60px)",
            }}
            aria-hidden="true"
          />

          <nav className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-6 md:px-12 lg:px-24 py-8">
            <span
              className="font-display-dr text-2xl italic opacity-0 animate-develop"
              style={{ color: "hsl(0 0% 95%)" }}
            >
              C&G
            </span>
            <div className="flex items-center gap-10">
              <span
                className="font-body-dr text-[10px] uppercase tracking-[0.3em] opacity-0 animate-develop delay-100 hidden md:block"
                style={{ color: "hsl(0 0% 50%)" }}
              >
                Lago di Garda
              </span>
              <Badge
                className="font-body-dr text-[9px] px-4 py-2 uppercase tracking-[0.2em] opacity-0 animate-develop delay-200"
                style={{
                  backgroundColor: "hsl(0 85% 45%)",
                  color: "hsl(0 0% 95%)",
                  border: "none",
                  borderRadius: "0",
                }}
              >
                Galleria
              </Badge>
            </div>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
            <div className="flex flex-col justify-center px-6 md:px-12 lg:px-24 py-32 lg:py-0">
              <p
                className="font-body-dr text-[10px] uppercase tracking-[0.5em] mb-12 opacity-0 animate-develop delay-300"
                style={{ color: "hsl(0 85% 45%)" }}
              >
                Camera oscura dal 1998
              </p>

              <h1 className="font-display-dr text-hero-dr opacity-0 animate-develop delay-400">
                <span className="block italic" style={{ color: "hsl(0 0% 95%)" }}>Casa</span>
                <span className="block" style={{ color: "hsl(0 85% 45%)" }}>&</span>
                <span className="block italic" style={{ color: "hsl(0 0% 95%)" }}>Giardino</span>
              </h1>

              <p
                className="font-display-dr text-2xl md:text-3xl italic mt-12 max-w-lg opacity-0 animate-develop delay-500"
                style={{ color: "hsl(0 0% 55%)" }}
              >
                Sviluppiamo
                <br />il vostro spazio
              </p>

              <p
                className="font-body-dr text-xs mt-4 opacity-0 animate-develop delay-500"
                style={{ color: "hsl(0 0% 40%)" }}
              >
                We develop your space
              </p>

              <div className="mt-20 flex items-center gap-8 opacity-0 animate-develop delay-600">
                <div className="sprocket-holes">
                  <div className="sprocket-hole" />
                  <div className="sprocket-hole" />
                  <div className="sprocket-hole" />
                </div>
                <div>
                  <p className="font-body-dr text-[9px] uppercase tracking-[0.3em]" style={{ color: "hsl(0 0% 50%)" }}>
                    Coordinate
                  </p>
                  <p className="font-body-dr text-sm mt-1" style={{ color: "hsl(0 0% 75%)" }}>
                    45.4654° N, 10.6339° E
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-[60vh] lg:h-auto opacity-0 animate-develop delay-300">
              <div className="absolute inset-8 lg:inset-16 contact-frame">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&h=1600&fit=crop&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "grayscale(100%) contrast(1.1)",
                  }}
                  role="img"
                  aria-label="Black and white interior photograph"
                />
                <div
                  className="absolute bottom-4 left-4 right-4 p-4"
                  style={{ backgroundColor: "hsl(0 0% 5% / 0.9)" }}
                >
                  <p className="font-body-dr text-[9px] uppercase tracking-[0.2em]" style={{ color: "hsl(0 85% 45%)" }}>
                    Frame 001 / 36
                  </p>
                  <p className="font-body-dr text-[10px] mt-1" style={{ color: "hsl(0 0% 60%)" }}>
                    f/2.8 &nbsp; 1/60s &nbsp; ISO 400 &nbsp; 35mm
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            PHILOSOPHY
        ═══════════════════════════════════════════════════════════════════════ */}
        <section
          className="py-40 md:py-56 px-6 md:px-12 lg:px-24"
          style={{ backgroundColor: "hsl(0 0% 3%)" }}
        >
          <div className="max-w-5xl">
            <p
              className="font-body-dr text-[10px] uppercase tracking-[0.5em] mb-12"
              style={{ color: "hsl(0 85% 45%)" }}
            >
              Filosofia / Philosophy
            </p>

            <h2 className="font-display-dr text-display-dr italic">
              <span style={{ color: "hsl(0 0% 95%)" }}>Nel buio, </span>
              <span style={{ color: "hsl(0 0% 60%)" }}>l'immagine</span>
              <span style={{ color: "hsl(0 0% 95%)" }}>.</span>
              <br />
              <span style={{ color: "hsl(0 0% 95%)" }}>Nel tempo, </span>
              <span style={{ color: "hsl(0 85% 45%)" }}>la perfezione</span>
              <span style={{ color: "hsl(0 0% 95%)" }}>.</span>
            </h2>

            <p
              className="font-body-dr text-sm mt-16 max-w-2xl leading-relaxed"
              style={{ color: "hsl(0 0% 55%)" }}
            >
              In darkness, the image. In time, perfection. Like an analog photograph
              developed in a darkroom, we craft spaces with patience and precision.
              Every detail emerges slowly, deliberately, eternally.
            </p>

            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Ilford", "Kodak Tri-X", "Silver Print", "Contact Sheet"].map((material, i) => (
                <span
                  key={material}
                  className="font-body-dr text-[10px] uppercase tracking-[0.2em] px-4 py-3 text-center"
                  style={{
                    color: i === 2 ? "hsl(0 85% 45%)" : "hsl(0 0% 55%)",
                    border: `1px solid ${i === 2 ? "hsl(0 85% 45% / 0.5)" : "hsl(0 0% 15%)"}`,
                    backgroundColor: "hsl(0 0% 6%)",
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
              <p className="font-body-dr text-[10px] uppercase tracking-[0.5em] mb-4" style={{ color: "hsl(0 0% 50%)" }}>
                Il processo
              </p>
              <h2 className="font-display-dr text-display-dr italic">
                <span style={{ color: "hsl(0 85% 45%)" }}>36</span> esposizioni
              </h2>
            </div>
            <p className="font-body-dr text-xs mt-8 md:mt-0" style={{ color: "hsl(0 0% 40%)" }}>
              Roll 01 / Negative development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVIZI.map((servizio, index) => (
              <Card
                key={servizio.numeral}
                className="hover-darkroom group relative overflow-hidden opacity-0 animate-contact"
                style={{
                  backgroundColor: "hsl(0 0% 8%)",
                  border: "1px solid hsl(0 0% 15%)",
                  borderRadius: "0",
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <CardContent className="p-6 h-full flex flex-col justify-between min-h-[320px]">
                  <div>
                    <div className="flex justify-between items-start mb-8">
                      <span
                        className="font-display-dr text-5xl italic opacity-20"
                        style={{ color: "hsl(0 85% 45%)" }}
                      >
                        {servizio.numeral}
                      </span>
                      <span
                        className="font-body-dr text-[8px] uppercase tracking-[0.2em] px-2 py-1"
                        style={{ backgroundColor: "hsl(0 0% 12%)", color: "hsl(0 0% 50%)" }}
                      >
                        {servizio.frame}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display-dr text-lg italic">{servizio.title}</h3>
                    <p className="font-body-dr text-[9px] uppercase tracking-[0.2em] mt-2" style={{ color: "hsl(0 85% 45%)" }}>
                      {servizio.subtitle}
                    </p>
                    <p
                      className="font-body-dr text-xs mt-4 leading-relaxed"
                      style={{ color: "hsl(0 0% 50%)" }}
                    >
                      {servizio.description}
                    </p>
                  </div>
                </CardContent>

                {/* Red safelight glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(circle at center, hsl(0 100% 25% / 0.1), transparent 70%)" }}
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
          style={{ backgroundColor: "hsl(0 0% 3%)" }}
        >
          <div className="px-6 md:px-12 lg:px-24 mb-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-body-dr text-[10px] uppercase tracking-[0.5em] mb-4" style={{ color: "hsl(0 85% 45%)" }}>
                  Collezioni / Contact Sheet
                </p>
                <h2 className="font-display-dr text-display-dr italic">
                  Silver Prints
                </h2>
              </div>

              <div className="flex gap-3 mt-8 md:mt-0">
                <button
                  onClick={() => scrollGallery("left")}
                  className="w-10 h-10 flex items-center justify-center border transition-all hover:border-[hsl(0_85%_45%_/_0.5)] hover:bg-[hsl(0_85%_45%_/_0.1)]"
                  style={{ borderColor: "hsl(0 0% 20%)" }}
                  aria-label="Previous frame"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollGallery("right")}
                  className="w-10 h-10 flex items-center justify-center border transition-all hover:border-[hsl(0_85%_45%_/_0.5)] hover:bg-[hsl(0_85%_45%_/_0.1)]"
                  style={{ borderColor: "hsl(0 0% 20%)" }}
                  aria-label="Next frame"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div ref={galleryRef} className="gallery-scroll-dr pl-6 md:pl-12 lg:pl-24 pr-6">
            {COLLEZIONI.map((collezione, index) => (
              <article key={collezione.id} className="flex-shrink-0 group cursor-pointer" style={{ width: "300px" }}>
                <div className="contact-frame mb-6" style={{ aspectRatio: "4/5" }}>
                  <img
                    src={collezione.image}
                    alt={`${collezione.name} - ${collezione.subtitle}`}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:contrast-125"
                    style={{ filter: "grayscale(100%) contrast(1.05)" }}
                    loading="lazy"
                  />
                  <div
                    className="absolute top-2 left-2 font-body-dr text-[8px] uppercase px-2 py-1"
                    style={{ backgroundColor: "hsl(0 0% 5%)", color: "hsl(0 0% 60%)" }}
                  >
                    Frame {String(index + 1).padStart(3, "0")}
                  </div>
                </div>

                <h3 className="font-display-dr text-base italic mb-1">{collezione.name}</h3>
                <p className="font-body-dr text-[9px] uppercase tracking-[0.2em] mb-2" style={{ color: "hsl(0 0% 50%)" }}>
                  {collezione.subtitle}
                </p>
                <p className="font-body-dr text-[8px] mb-3" style={{ color: "hsl(0 0% 40%)" }}>
                  {collezione.exposure}
                </p>
                <p className="font-display-dr text-base italic" style={{ color: "hsl(0 85% 45%)" }}>
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
              backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
              filter: "grayscale(100%) brightness(0.25) contrast(1.3)",
            }}
            role="img"
            aria-label="Darkroom gallery space"
          />

          {/* Film border overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderLeft: "24px solid hsl(0 0% 8%)",
              borderRight: "24px solid hsl(0 0% 8%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 min-h-[80vh] flex flex-col justify-end px-6 md:px-12 lg:px-24 py-20">
            <p className="font-body-dr text-[10px] uppercase tracking-[0.5em] mb-8" style={{ color: "hsl(0 85% 45%)" }}>
              Studio / Darkroom
            </p>
            <h2 className="font-display-dr text-display-dr italic max-w-4xl">
              600 mq di silenzio
              <br />
              <span style={{ color: "hsl(0 0% 60%)" }}>sul Lago di Garda</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20 pt-12 border-t" style={{ borderColor: "hsl(0 0% 20%)" }}>
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-body-dr text-3xl md:text-4xl mb-3" style={{ color: "hsl(0 85% 45%)" }}>
                    {stat.value}
                  </p>
                  <p className="font-body-dr text-xs">{stat.label}</p>
                  <p className="font-body-dr text-[10px] mt-1" style={{ color: "hsl(0 0% 45%)" }}>{stat.sublabel}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            CONTACT
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-40 md:py-56 px-6 md:px-12 lg:px-24" style={{ backgroundColor: "hsl(0 0% 6%)" }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-body-dr text-[10px] uppercase tracking-[0.5em] mb-8" style={{ color: "hsl(0 85% 45%)" }}>
              Prenotazione Studio
            </p>

            <h2 className="font-display-dr text-display-dr italic mb-12">
              Esposizione
              <br />
              <span style={{ color: "hsl(0 0% 60%)" }}>su appuntamento</span>
            </h2>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="font-body-dr text-[10px] px-12 py-5 uppercase tracking-[0.3em] hover-darkroom"
                  style={{
                    backgroundColor: "hsl(0 85% 45%)",
                    color: "hsl(0 0% 95%)",
                    border: "none",
                    borderRadius: "0",
                  }}
                >
                  Prenota Sessione
                </Button>
              </DialogTrigger>
              <DialogContent
                className="max-w-lg"
                style={{
                  borderRadius: "0",
                  border: "1px solid hsl(0 0% 15%)",
                  backgroundColor: "hsl(0 0% 6%)",
                  color: "hsl(0 0% 95%)",
                }}
              >
                <DialogHeader className="pb-6 border-b" style={{ borderColor: "hsl(0 0% 15%)" }}>
                  <DialogTitle className="font-display-dr text-xl italic">
                    Prenotazione Studio
                  </DialogTitle>
                  <DialogDescription className="font-body-dr text-xs mt-3" style={{ color: "hsl(0 0% 55%)" }}>
                    Vi ricontatteremo entro 24 ore per confermare la sessione.
                  </DialogDescription>
                </DialogHeader>

                <form className="space-y-5 pt-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="font-body-dr text-[9px] uppercase tracking-[0.2em] block mb-2" style={{ color: "hsl(0 0% 55%)" }}>Nome</label>
                      <Input
                        id="name"
                        placeholder="Mario"
                        className="font-body-dr text-sm"
                        style={{ borderRadius: "0", backgroundColor: "hsl(0 0% 10%)", borderColor: "hsl(0 0% 18%)", color: "hsl(0 0% 95%)" }}
                      />
                    </div>
                    <div>
                      <label htmlFor="surname" className="font-body-dr text-[9px] uppercase tracking-[0.2em] block mb-2" style={{ color: "hsl(0 0% 55%)" }}>Cognome</label>
                      <Input
                        id="surname"
                        placeholder="Rossi"
                        className="font-body-dr text-sm"
                        style={{ borderRadius: "0", backgroundColor: "hsl(0 0% 10%)", borderColor: "hsl(0 0% 18%)", color: "hsl(0 0% 95%)" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="font-body-dr text-[9px] uppercase tracking-[0.2em] block mb-2" style={{ color: "hsl(0 0% 55%)" }}>Email</label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="mario.rossi@email.it"
                      className="font-body-dr text-sm"
                      style={{ borderRadius: "0", backgroundColor: "hsl(0 0% 10%)", borderColor: "hsl(0 0% 18%)", color: "hsl(0 0% 95%)" }}
                    />
                  </div>

                  <div>
                    <label htmlFor="interest" className="font-body-dr text-[9px] uppercase tracking-[0.2em] block mb-2" style={{ color: "hsl(0 0% 55%)" }}>Collezione</label>
                    <Select>
                      <SelectTrigger
                        id="interest"
                        className="font-body-dr text-sm"
                        style={{ borderRadius: "0", backgroundColor: "hsl(0 0% 10%)", borderColor: "hsl(0 0% 18%)", color: "hsl(0 0% 95%)" }}
                      >
                        <SelectValue placeholder="Seleziona..." />
                      </SelectTrigger>
                      <SelectContent style={{ borderRadius: "0", backgroundColor: "hsl(0 0% 10%)", borderColor: "hsl(0 0% 18%)" }}>
                        <SelectItem value="noir">Collezione Noir</SelectItem>
                        <SelectItem value="contrast">Alto Contrasto</SelectItem>
                        <SelectItem value="silver">Silver Gelatin</SelectItem>
                        <SelectItem value="platinum">Platinum</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer pt-2">
                    <Checkbox checked={privacyAccepted} onCheckedChange={(c) => setPrivacyAccepted(c === true)} className="mt-0.5" />
                    <span className="font-body-dr text-[10px] leading-relaxed" style={{ color: "hsl(0 0% 55%)" }}>
                      Accetto la Privacy Policy.
                    </span>
                  </label>

                  <Button
                    type="submit"
                    className="w-full font-body-dr text-[10px] py-4 uppercase tracking-[0.2em]"
                    style={{
                      backgroundColor: privacyAccepted ? "hsl(0 85% 45%)" : "hsl(0 0% 18%)",
                      color: privacyAccepted ? "hsl(0 0% 95%)" : "hsl(0 0% 45%)",
                      borderRadius: "0",
                      cursor: privacyAccepted ? "pointer" : "not-allowed",
                    }}
                    disabled={!privacyAccepted}
                  >
                    Conferma Prenotazione
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <div className="mt-20 flex justify-center gap-16">
              <div>
                <p className="font-body-dr text-[9px] uppercase tracking-[0.2em] mb-2" style={{ color: "hsl(0 0% 45%)" }}>Studio</p>
                <a href="tel:+390309912345" className="font-body-dr text-sm">+39 030 991 2345</a>
              </div>
              <div>
                <p className="font-body-dr text-[9px] uppercase tracking-[0.2em] mb-2" style={{ color: "hsl(0 0% 45%)" }}>Email</p>
                <a href="mailto:studio@casaegiardino.it" className="font-body-dr text-sm">studio@casaegiardino.it</a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            FOOTER
        ═══════════════════════════════════════════════════════════════════════ */}
        <footer className="py-16 px-6 md:px-12 lg:px-24 border-t" style={{ borderColor: "hsl(0 0% 12%)" }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h3 className="font-display-dr text-xl italic mb-4">Casa & Giardino</h3>
              <p className="font-body-dr text-xs max-w-xs leading-relaxed" style={{ color: "hsl(0 0% 55%)" }}>
                Sviluppiamo spazi dal 1998. Camera oscura sul Lago di Garda.
              </p>
            </div>

            <div className="md:col-span-3">
              <p className="font-body-dr text-[9px] uppercase tracking-[0.2em] mb-4" style={{ color: "hsl(0 0% 45%)" }}>Studio</p>
              <address className="font-body-dr text-xs not-italic leading-relaxed" style={{ color: "hsl(0 0% 55%)" }}>
                Via del Lago, 42<br />25015 Desenzano del Garda<br />Italia
              </address>
            </div>

            <div className="md:col-span-3">
              <p className="font-body-dr text-[9px] uppercase tracking-[0.2em] mb-4" style={{ color: "hsl(0 0% 45%)" }}>Orari</p>
              <p className="font-body-dr text-xs leading-relaxed" style={{ color: "hsl(0 0% 55%)" }}>
                Solo su appuntamento<br />Lun - Sab
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="font-body-dr text-[9px] uppercase tracking-[0.2em] mb-4" style={{ color: "hsl(0 0% 45%)" }}>Legal</p>
              <ul className="space-y-2">
                {["Privacy", "Cookie", "Terms"].map((link) => (
                  <li key={link}><a href="#" className="font-body-dr text-xs" style={{ color: "hsl(0 0% 55%)" }}>{link}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: "hsl(0 0% 12%)" }}>
            <a href="/" className="font-body-dr text-[10px] uppercase tracking-[0.2em] flex items-center gap-2" style={{ color: "hsl(0 0% 55%)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
              Gallery
            </a>
            <span className="font-body-dr text-xs" style={{ color: "hsl(0 0% 45%)" }}>45.4654° N, 10.6339° E</span>
          </div>

          <div className="mt-8 text-center">
            <p className="font-body-dr text-[9px] uppercase tracking-[0.2em]" style={{ color: "hsl(0 0% 30%)" }}>
              2024 Casa & Giardino - CrazyOne UI / Darkroom
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
