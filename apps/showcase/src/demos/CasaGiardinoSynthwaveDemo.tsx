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
// SYNTHWAVE - Collezione Retro 80s Luxe
// Inspired by: 80s neon, Miami Vice, retro-futurism
// Typography: Orbitron + Rajdhani
// ═══════════════════════════════════════════════════════════════════════════════

const synthwaveStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Rajdhani:wght@300;400;500;600&display=swap');

  :root {
    --synth-bg: 260 30% 8%;
    --synth-fg: 300 100% 95%;
    --synth-card: 260 30% 12%;
    --synth-pink: 320 100% 60%;
    --synth-cyan: 185 100% 55%;
    --synth-purple: 280 100% 65%;
    --synth-orange: 30 100% 55%;
    --synth-muted: 260 20% 50%;
    --synth-border: 260 30% 20%;
  }

  .font-display-synth {
    font-family: 'Orbitron', sans-serif;
    font-weight: 600;
  }

  .font-body-synth {
    font-family: 'Rajdhani', sans-serif;
    font-weight: 400;
  }

  .text-hero-synth {
    font-size: clamp(3rem, 10vw, 9rem);
    line-height: 0.9;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .text-display-synth {
    font-size: clamp(2rem, 5vw, 4.5rem);
    line-height: 0.95;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }

  @keyframes neonPulse {
    0%, 100% {
      text-shadow:
        0 0 10px hsl(320 100% 60%),
        0 0 20px hsl(320 100% 60%),
        0 0 40px hsl(320 100% 60%);
    }
    50% {
      text-shadow:
        0 0 5px hsl(320 100% 60%),
        0 0 10px hsl(320 100% 60%),
        0 0 20px hsl(320 100% 60%);
    }
  }

  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }

  @keyframes gridMove {
    0% { background-position: 0 0; }
    100% { background-position: 0 50px; }
  }

  @keyframes glowPulse {
    0%, 100% {
      box-shadow: 0 0 20px hsl(185 100% 55% / 0.5);
    }
    50% {
      box-shadow: 0 0 40px hsl(185 100% 55% / 0.8);
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

  .animate-neon {
    animation: neonPulse 2s ease-in-out infinite;
  }

  .animate-glow {
    animation: glowPulse 3s ease-in-out infinite;
  }

  .animate-slide-up {
    animation: slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
  .delay-500 { animation-delay: 500ms; }

  .hover-synth {
    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .hover-synth:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow:
      0 0 30px hsl(320 100% 60% / 0.3),
      0 0 60px hsl(185 100% 55% / 0.2);
  }

  .retro-grid {
    background-image:
      linear-gradient(hsl(320 100% 60% / 0.1) 1px, transparent 1px),
      linear-gradient(90deg, hsl(320 100% 60% / 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: gridMove 4s linear infinite;
  }

  .chrome-text {
    background: linear-gradient(180deg,
      hsl(185 100% 75%) 0%,
      hsl(185 100% 55%) 50%,
      hsl(260 30% 30%) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .neon-border {
    border: 2px solid hsl(320 100% 60%);
    box-shadow:
      0 0 10px hsl(320 100% 60% / 0.5),
      inset 0 0 10px hsl(320 100% 60% / 0.1);
  }

  .scanlines::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      hsl(260 30% 8% / 0.1) 2px,
      hsl(260 30% 8% / 0.1) 4px
    );
    pointer-events: none;
    z-index: 1000;
  }

  .gallery-scroll-synth {
    display: flex;
    gap: 2rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding: 2rem;
    scrollbar-width: none;
  }

  .gallery-scroll-synth::-webkit-scrollbar {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-neon,
    .animate-glow,
    .animate-slide-up,
    .hover-synth,
    .retro-grid {
      animation: none !important;
      transition: none !important;
    }
  }
`;

const SERVIZI = [
  {
    numeral: "01",
    title: "SCAN",
    subtitle: "Analysis",
    description: "Scansione digitale dello spazio. Analisi delle vibrazioni. Mappatura dell'energia.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=800&fit=crop&q=80",
    color: "hsl(320 100% 60%)",
  },
  {
    numeral: "02",
    title: "DESIGN",
    subtitle: "Creation",
    description: "Progettazione neon. Palette elettrica. Geometrie retrofuturiste.",
    image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=600&h=800&fit=crop&q=80",
    color: "hsl(185 100% 55%)",
  },
  {
    numeral: "03",
    title: "BUILD",
    subtitle: "Craft",
    description: "Costruzione high-tech. Materiali cromati. LED integrati.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=800&fit=crop&q=80",
    color: "hsl(280 100% 65%)",
  },
  {
    numeral: "04",
    title: "LAUNCH",
    subtitle: "Delivery",
    description: "Installazione notturna. Accensione del sistema. Viaggio nel tempo.",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&h=800&fit=crop&q=80",
    color: "hsl(30 100% 55%)",
  },
];

const COLLEZIONI = [
  {
    id: "neon",
    name: "NEON NIGHTS",
    subtitle: "Living Lounge",
    price: "da / from 12.800",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=1000&fit=crop&q=80",
    tag: "ELECTRIC",
    color: "hsl(320 100% 60%)",
  },
  {
    id: "chrome",
    name: "CHROME DREAMS",
    subtitle: "Dining Suite",
    price: "da / from 9.400",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&h=1000&fit=crop&q=80",
    tag: "SHINE",
    color: "hsl(185 100% 55%)",
  },
  {
    id: "miami",
    name: "MIAMI VICE",
    subtitle: "Bedroom",
    price: "da / from 8.200",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=1000&fit=crop&q=80",
    tag: "SUNSET",
    color: "hsl(30 100% 55%)",
  },
  {
    id: "laser",
    name: "LASER GRID",
    subtitle: "Office",
    price: "da / from 6.900",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=1000&fit=crop&q=80",
    tag: "FUTURE",
    color: "hsl(280 100% 65%)",
  },
  {
    id: "arcade",
    name: "ARCADE",
    subtitle: "Game Room",
    price: "da / from 15.500",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=1000&fit=crop&q=80",
    tag: "PLAY",
    color: "hsl(320 100% 60%)",
  },
];

const STATS = [
  { value: "1985", label: "Lo spirito dell'era", sublabel: "The spirit of the era" },
  { value: "∞", label: "Luci al neon", sublabel: "Neon lights" },
  { value: "24/7", label: "L'atmosfera", sublabel: "The atmosphere" },
];

export function CasaGiardinoSynthwaveDemo() {
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
      <style>{synthwaveStyles}</style>
      <div
        className="scanlines relative overflow-x-hidden"
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          backgroundColor: "hsl(260 30% 8%)",
          color: "hsl(300 100% 95%)",
        }}
      >
        {/* ═══════════════════════════════════════════════════════════════════════
            HERO - Neon Dreams
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="min-h-screen relative retro-grid overflow-hidden">
          {/* Sun/Moon gradient */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-60"
            style={{
              background: "linear-gradient(180deg, hsl(30 100% 55%) 0%, hsl(320 100% 60%) 50%, transparent 100%)",
              borderRadius: "50% 50% 0 0",
              filter: "blur(40px)",
            }}
            aria-hidden="true"
          />

          <nav className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-6 md:px-12 lg:px-20 py-6">
            <span
              className="font-display-synth text-xl opacity-0 animate-slide-up animate-neon"
              style={{ color: "hsl(320 100% 60%)" }}
            >
              C&G
            </span>
            <div className="flex items-center gap-8">
              <span
                className="font-body-synth text-sm uppercase tracking-[0.3em] opacity-0 animate-slide-up delay-100 hidden md:block"
                style={{ color: "hsl(260 20% 50%)" }}
              >
                Lago di Garda
              </span>
              <Badge
                className="font-display-synth text-[10px] px-4 py-2 uppercase tracking-[0.2em] opacity-0 animate-slide-up delay-200 neon-border"
                style={{
                  backgroundColor: "transparent",
                  color: "hsl(320 100% 60%)",
                  borderRadius: "0",
                }}
              >
                SYNTHWAVE
              </Badge>
            </div>
          </nav>

          <div className="flex flex-col justify-center items-center min-h-screen px-6 text-center">
            <p
              className="font-body-synth text-lg uppercase tracking-[0.8em] mb-8 opacity-0 animate-slide-up delay-300"
              style={{ color: "hsl(185 100% 55%)" }}
            >
              Ritorno al futuro
            </p>

            <h1 className="font-display-synth text-hero-synth opacity-0 animate-slide-up delay-400">
              <span className="block animate-neon" style={{ color: "hsl(320 100% 60%)" }}>CASA</span>
              <span className="block chrome-text">&</span>
              <span className="block" style={{ color: "hsl(185 100% 55%)", textShadow: "0 0 30px hsl(185 100% 55%)" }}>GIARDINO</span>
            </h1>

            <p
              className="font-body-synth text-2xl md:text-3xl mt-10 max-w-lg opacity-0 animate-slide-up delay-500"
              style={{ color: "hsl(260 20% 60%)" }}
            >
              Il futuro e adesso.
              <br />Sempre e per sempre.
            </p>

            <p
              className="font-body-synth text-sm mt-4 opacity-0 animate-slide-up delay-500"
              style={{ color: "hsl(260 20% 45%)" }}
            >
              The future is now. Forever and ever.
            </p>

            <div className="mt-16 flex items-center gap-8 opacity-0 animate-slide-up delay-600">
              <div
                className="w-16 h-16 flex items-center justify-center animate-glow"
                style={{
                  border: "2px solid hsl(185 100% 55%)",
                  background: "linear-gradient(135deg, hsl(260 30% 12%) 0%, hsl(260 30% 8%) 100%)",
                }}
              >
                <span className="font-display-synth text-lg" style={{ color: "hsl(185 100% 55%)" }}>45°</span>
              </div>
              <div className="text-left">
                <p className="font-body-synth text-xs uppercase tracking-[0.4em]" style={{ color: "hsl(260 20% 50%)" }}>
                  COORDINATES
                </p>
                <p className="font-display-synth text-lg mt-1" style={{ color: "hsl(320 100% 60%)" }}>
                  45.4654° N
                </p>
              </div>
            </div>
          </div>

          {/* Horizon line */}
          <div
            className="absolute bottom-20 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(320 100% 60%), hsl(185 100% 55%), hsl(320 100% 60%), transparent)",
            }}
            aria-hidden="true"
          />
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            PHILOSOPHY
        ═══════════════════════════════════════════════════════════════════════ */}
        <section
          className="py-32 md:py-48 px-6 md:px-12 lg:px-20"
          style={{ backgroundColor: "hsl(260 30% 6%)" }}
        >
          <div className="max-w-5xl mx-auto text-center">
            <p
              className="font-body-synth text-lg uppercase tracking-[0.6em] mb-8"
              style={{ color: "hsl(320 100% 60%)" }}
            >
              FILOSOFIA / PHILOSOPHY
            </p>

            <h2 className="font-display-synth text-display-synth">
              <span style={{ color: "hsl(300 100% 95%)" }}>IL </span>
              <span className="animate-neon" style={{ color: "hsl(320 100% 60%)" }}>NEON</span>
              <br />
              <span style={{ color: "hsl(300 100% 95%)" }}>NON MUORE </span>
              <span style={{ color: "hsl(185 100% 55%)", textShadow: "0 0 20px hsl(185 100% 55%)" }}>MAI</span>
            </h2>

            <p
              className="font-body-synth text-xl mt-12 max-w-2xl mx-auto leading-relaxed"
              style={{ color: "hsl(260 20% 55%)" }}
            >
              Neon never dies. We capture the electric spirit of the 80s and bring it
              into your living space. Chrome, glass, and light merge into a timeless
              vision of retro-futurism.
            </p>

            <div className="mt-16 flex justify-center gap-6">
              {["CHROME", "NEON", "LASER", "GRID"].map((material, i) => (
                <span
                  key={material}
                  className="font-display-synth text-xs tracking-[0.2em] px-6 py-3"
                  style={{
                    color: ["hsl(185 100% 55%)", "hsl(320 100% 60%)", "hsl(280 100% 65%)", "hsl(30 100% 55%)"][i],
                    border: `1px solid ${["hsl(185 100% 55% / 0.5)", "hsl(320 100% 60% / 0.5)", "hsl(280 100% 65% / 0.5)", "hsl(30 100% 55% / 0.5)"][i]}`,
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
        <section className="py-24 md:py-40 px-6 md:px-12 lg:px-20 retro-grid">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <p className="font-body-synth text-lg uppercase tracking-[0.5em] mb-4" style={{ color: "hsl(260 20% 50%)" }}>
                PROCESSO
              </p>
              <h2 className="font-display-synth text-display-synth">
                <span style={{ color: "hsl(320 100% 60%)" }}>QUATTRO</span> FASI
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVIZI.map((servizio) => (
              <Card
                key={servizio.numeral}
                className="hover-synth group relative overflow-hidden"
                style={{
                  backgroundColor: "hsl(260 30% 12%)",
                  border: `1px solid ${servizio.color}`,
                  borderRadius: "0",
                  minHeight: "350px",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{
                    background: `linear-gradient(90deg, ${servizio.color}, transparent)`,
                  }}
                  aria-hidden="true"
                />

                <CardContent className="h-full flex flex-col justify-between p-6">
                  <div>
                    <span
                      className="font-display-synth text-4xl"
                      style={{ color: servizio.color, textShadow: `0 0 20px ${servizio.color}` }}
                    >
                      {servizio.numeral}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display-synth text-xl" style={{ color: servizio.color }}>
                      {servizio.title}
                    </h3>
                    <p className="font-body-synth text-sm uppercase tracking-[0.2em] mt-1" style={{ color: "hsl(260 20% 50%)" }}>
                      {servizio.subtitle}
                    </p>
                    <p className="font-body-synth text-sm mt-4" style={{ color: "hsl(260 20% 55%)" }}>
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
          className="py-24 md:py-40"
          style={{
            background: "linear-gradient(180deg, hsl(260 30% 8%) 0%, hsl(320 50% 15%) 50%, hsl(260 30% 8%) 100%)",
          }}
        >
          <div className="px-6 md:px-12 lg:px-20 mb-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-body-synth text-lg uppercase tracking-[0.5em] mb-4" style={{ color: "hsl(185 100% 55%)" }}>
                  COLLEZIONI
                </p>
                <h2 className="font-display-synth text-display-synth">
                  RETRO <span className="animate-neon" style={{ color: "hsl(320 100% 60%)" }}>LUXE</span>
                </h2>
              </div>

              <div className="flex gap-3 mt-8 md:mt-0">
                <button
                  onClick={() => scrollGallery("left")}
                  className="w-12 h-12 flex items-center justify-center neon-border hover:bg-[hsl(320_100%_60%_/_0.1)] transition-colors"
                  aria-label="Scroll left"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(320 100% 60%)" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollGallery("right")}
                  className="w-12 h-12 flex items-center justify-center neon-border hover:bg-[hsl(320_100%_60%_/_0.1)] transition-colors"
                  aria-label="Scroll right"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(320 100% 60%)" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div ref={galleryRef} className="gallery-scroll-synth pl-6 md:pl-12 lg:pl-20 pr-6">
            {COLLEZIONI.map((collezione) => (
              <article key={collezione.id} className="flex-shrink-0 group cursor-pointer" style={{ width: "320px" }}>
                <div
                  className="relative overflow-hidden mb-6"
                  style={{
                    aspectRatio: "3/4",
                    border: `2px solid ${collezione.color}`,
                    boxShadow: `0 0 20px ${collezione.color}40`,
                  }}
                >
                  <img
                    src={collezione.image}
                    alt={`${collezione.name} - ${collezione.subtitle}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    style={{ filter: "brightness(0.8) contrast(1.2) saturate(1.3)" }}
                    loading="lazy"
                  />
                  <Badge
                    className="absolute top-4 left-4 font-display-synth text-[10px] uppercase tracking-[0.15em] px-3 py-1.5"
                    style={{
                      backgroundColor: collezione.color,
                      color: "hsl(260 30% 8%)",
                      border: "none",
                      borderRadius: "0",
                    }}
                  >
                    {collezione.tag}
                  </Badge>
                  {/* Scanline overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(260 30% 8% / 0.1) 2px, hsl(260 30% 8% / 0.1) 4px)",
                    }}
                    aria-hidden="true"
                  />
                </div>

                <h3 className="font-display-synth text-lg mb-1" style={{ color: collezione.color }}>
                  {collezione.name}
                </h3>
                <p className="font-body-synth text-sm uppercase tracking-[0.15em] mb-3" style={{ color: "hsl(260 20% 50%)" }}>
                  {collezione.subtitle}
                </p>
                <p className="font-display-synth text-lg" style={{ color: "hsl(185 100% 55%)" }}>
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
              filter: "brightness(0.3) saturate(1.5) hue-rotate(280deg)",
            }}
            role="img"
            aria-label="Synthwave showroom"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, hsl(260 30% 8% / 0.7) 0%, transparent 50%, hsl(260 30% 8% / 0.9) 100%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 min-h-[80vh] flex flex-col justify-end px-6 md:px-12 lg:px-20 py-20">
            <p className="font-body-synth text-lg uppercase tracking-[0.5em] mb-4" style={{ color: "hsl(320 100% 60%)" }}>
              SHOWROOM
            </p>
            <h2 className="font-display-synth text-display-synth max-w-3xl">
              2.000 MQ DI
              <br />
              <span className="animate-neon" style={{ color: "hsl(320 100% 60%)" }}>NEON DREAMS</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 pt-12 border-t" style={{ borderColor: "hsl(320 100% 60% / 0.3)" }}>
              {STATS.map((stat, i) => (
                <div key={stat.label}>
                  <p
                    className="font-display-synth text-5xl md:text-6xl mb-3"
                    style={{
                      color: ["hsl(320 100% 60%)", "hsl(185 100% 55%)", "hsl(30 100% 55%)"][i],
                      textShadow: `0 0 20px ${["hsl(320 100% 60%)", "hsl(185 100% 55%)", "hsl(30 100% 55%)"][i]}`,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p className="font-body-synth text-sm">{stat.label}</p>
                  <p className="font-body-synth text-xs mt-1" style={{ color: "hsl(260 20% 50%)" }}>{stat.sublabel}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            CONTACT
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-32 md:py-48 px-6 md:px-12 lg:px-20 retro-grid">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-body-synth text-lg uppercase tracking-[0.5em] mb-8" style={{ color: "hsl(185 100% 55%)" }}>
              CONTATTO
            </p>

            <h2 className="font-display-synth text-display-synth mb-12">
              IL <span className="animate-neon" style={{ color: "hsl(320 100% 60%)" }}>FUTURO</span>
              <br />TI ASPETTA
            </h2>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="font-display-synth text-sm px-12 py-6 uppercase tracking-[0.2em] hover-synth neon-border"
                  style={{
                    backgroundColor: "transparent",
                    color: "hsl(320 100% 60%)",
                    borderRadius: "0",
                  }}
                >
                  PRENOTA ORA
                </Button>
              </DialogTrigger>
              <DialogContent
                className="max-w-lg"
                style={{
                  backgroundColor: "hsl(260 30% 10%)",
                  borderRadius: "0",
                  border: "2px solid hsl(320 100% 60%)",
                  boxShadow: "0 0 40px hsl(320 100% 60% / 0.3)",
                }}
              >
                <DialogHeader className="pb-6 border-b" style={{ borderColor: "hsl(260 30% 20%)" }}>
                  <DialogTitle className="font-display-synth text-xl" style={{ color: "hsl(320 100% 60%)" }}>
                    VISITA LO SHOWROOM
                  </DialogTitle>
                  <DialogDescription className="font-body-synth text-sm mt-2" style={{ color: "hsl(260 20% 55%)" }}>
                    Compila il form per entrare nel futuro.
                  </DialogDescription>
                </DialogHeader>

                <form className="space-y-5 pt-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="font-display-synth text-[10px] uppercase tracking-[0.15em] block mb-2" style={{ color: "hsl(185 100% 55%)" }}>Nome</label>
                      <Input id="name" placeholder="Mario" className="font-body-synth" style={{ borderRadius: "0", backgroundColor: "hsl(260 30% 12%)", borderColor: "hsl(260 30% 20%)", color: "hsl(300 100% 95%)" }} />
                    </div>
                    <div>
                      <label htmlFor="surname" className="font-display-synth text-[10px] uppercase tracking-[0.15em] block mb-2" style={{ color: "hsl(185 100% 55%)" }}>Cognome</label>
                      <Input id="surname" placeholder="Rossi" className="font-body-synth" style={{ borderRadius: "0", backgroundColor: "hsl(260 30% 12%)", borderColor: "hsl(260 30% 20%)", color: "hsl(300 100% 95%)" }} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="font-display-synth text-[10px] uppercase tracking-[0.15em] block mb-2" style={{ color: "hsl(185 100% 55%)" }}>Email</label>
                    <Input id="email" type="email" placeholder="mario.rossi@email.it" className="font-body-synth" style={{ borderRadius: "0", backgroundColor: "hsl(260 30% 12%)", borderColor: "hsl(260 30% 20%)", color: "hsl(300 100% 95%)" }} />
                  </div>

                  <div>
                    <label htmlFor="interest" className="font-display-synth text-[10px] uppercase tracking-[0.15em] block mb-2" style={{ color: "hsl(185 100% 55%)" }}>Interesse</label>
                    <Select>
                      <SelectTrigger id="interest" className="font-body-synth" style={{ borderRadius: "0", backgroundColor: "hsl(260 30% 12%)", borderColor: "hsl(260 30% 20%)", color: "hsl(300 100% 95%)" }}>
                        <SelectValue placeholder="Seleziona..." />
                      </SelectTrigger>
                      <SelectContent style={{ borderRadius: "0", backgroundColor: "hsl(260 30% 12%)", borderColor: "hsl(260 30% 20%)" }}>
                        <SelectItem value="neon">Neon Nights</SelectItem>
                        <SelectItem value="chrome">Chrome Dreams</SelectItem>
                        <SelectItem value="miami">Miami Vice</SelectItem>
                        <SelectItem value="complete">Progetto Completo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer pt-2">
                    <Checkbox checked={privacyAccepted} onCheckedChange={(c) => setPrivacyAccepted(c === true)} className="mt-0.5" />
                    <span className="font-body-synth text-xs leading-relaxed" style={{ color: "hsl(260 20% 55%)" }}>
                      Accetto la Privacy Policy.
                    </span>
                  </label>

                  <Button
                    type="submit"
                    className="w-full font-display-synth text-sm py-5 uppercase tracking-[0.15em]"
                    style={{
                      backgroundColor: privacyAccepted ? "hsl(320 100% 60%)" : "hsl(260 30% 20%)",
                      color: privacyAccepted ? "hsl(260 30% 8%)" : "hsl(260 20% 50%)",
                      borderRadius: "0",
                      cursor: privacyAccepted ? "pointer" : "not-allowed",
                    }}
                    disabled={!privacyAccepted}
                  >
                    INVIA
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <div className="mt-16 flex justify-center gap-16">
              <div>
                <p className="font-display-synth text-[10px] uppercase tracking-[0.3em] mb-1" style={{ color: "hsl(260 20% 50%)" }}>TEL</p>
                <a href="tel:+390309912345" className="font-body-synth text-lg" style={{ color: "hsl(320 100% 60%)" }}>+39 030 991 2345</a>
              </div>
              <div>
                <p className="font-display-synth text-[10px] uppercase tracking-[0.3em] mb-1" style={{ color: "hsl(260 20% 50%)" }}>EMAIL</p>
                <a href="mailto:neon@casaegiardino.it" className="font-body-synth text-lg" style={{ color: "hsl(185 100% 55%)" }}>neon@casaegiardino.it</a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            FOOTER
        ═══════════════════════════════════════════════════════════════════════ */}
        <footer
          className="py-16 px-6 md:px-12 lg:px-20 border-t"
          style={{ borderColor: "hsl(320 100% 60% / 0.3)", backgroundColor: "hsl(260 30% 6%)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h3 className="font-display-synth text-2xl mb-4 animate-neon" style={{ color: "hsl(320 100% 60%)" }}>
                CASA & GIARDINO
              </h3>
              <p className="font-body-synth text-sm max-w-xs" style={{ color: "hsl(260 20% 55%)" }}>
                Retro-futurismo dal 1998. Lago di Garda.
              </p>
            </div>

            <div className="md:col-span-3">
              <p className="font-display-synth text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: "hsl(185 100% 55%)" }}>SHOWROOM</p>
              <address className="font-body-synth text-sm not-italic" style={{ color: "hsl(260 20% 55%)" }}>
                Via del Lago, 42<br />25015 Desenzano del Garda<br />Italia
              </address>
            </div>

            <div className="md:col-span-3">
              <p className="font-display-synth text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: "hsl(185 100% 55%)" }}>ORARI</p>
              <p className="font-body-synth text-sm" style={{ color: "hsl(260 20% 55%)" }}>
                Mar - Sab: 18:00 - 02:00<br />Dom - Lun: Chiuso
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="font-display-synth text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: "hsl(185 100% 55%)" }}>LEGAL</p>
              <ul className="space-y-2">
                {["Privacy", "Cookie", "Terms"].map((link) => (
                  <li key={link}><a href="#" className="font-body-synth text-sm" style={{ color: "hsl(260 20% 55%)" }}>{link}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: "hsl(320 100% 60% / 0.2)" }}>
            <a href="/" className="font-display-synth text-xs uppercase tracking-[0.2em] flex items-center gap-2" style={{ color: "hsl(260 20% 55%)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
              GALLERY
            </a>
            <span className="font-display-synth text-sm" style={{ color: "hsl(320 100% 60%)" }}>45.4654° N</span>
          </div>

          <div className="mt-8 text-center">
            <p className="font-display-synth text-[10px] uppercase tracking-[0.3em]" style={{ color: "hsl(260 20% 40%)" }}>
              2024 CASA & GIARDINO - CRAZYONE UI / SYNTHWAVE
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
