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
// BAUHAUS - Collezione Design Contemporaneo
// Inspired by: Bauhaus school, primary colors, geometric forms
// Typography: Space Mono + Archivo
// ═══════════════════════════════════════════════════════════════════════════════

const bauhausStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Archivo:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

  :root {
    --bau-bg: 60 5% 96%;
    --bau-fg: 0 0% 8%;
    --bau-card: 0 0% 100%;
    --bau-red: 0 85% 50%;
    --bau-yellow: 50 95% 55%;
    --bau-blue: 220 85% 50%;
    --bau-muted: 0 0% 50%;
    --bau-border: 0 0% 85%;
  }

  .font-display-bau {
    font-family: 'Space Mono', monospace;
    font-weight: 700;
  }

  .font-body-bau {
    font-family: 'Archivo', -apple-system, sans-serif;
    font-weight: 400;
  }

  .text-hero-bau {
    font-size: clamp(3rem, 10vw, 8rem);
    line-height: 0.95;
    letter-spacing: -0.02em;
    text-transform: uppercase;
  }

  .text-display-bau {
    font-size: clamp(2rem, 5vw, 4rem);
    line-height: 1;
    text-transform: uppercase;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  @keyframes colorShift {
    0%, 100% { background-color: hsl(0 85% 50%); }
    33% { background-color: hsl(50 95% 55%); }
    66% { background-color: hsl(220 85% 50%); }
  }

  .animate-slide-in {
    animation: slideIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .animate-rotate {
    animation: rotate 20s linear infinite;
  }

  .animate-pulse-bau {
    animation: pulse 2s ease-in-out infinite;
  }

  .animate-color-shift {
    animation: colorShift 6s ease-in-out infinite;
  }

  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
  .delay-500 { animation-delay: 500ms; }

  .hover-bauhaus {
    transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .hover-bauhaus:hover {
    transform: translate(-4px, -4px);
    box-shadow: 8px 8px 0 hsl(0 0% 8%);
  }

  .grid-overlay {
    background-image:
      linear-gradient(hsl(0 0% 85%) 1px, transparent 1px),
      linear-gradient(90deg, hsl(0 0% 85%) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  .gallery-scroll-bau {
    display: flex;
    gap: 2rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding: 2rem;
    scrollbar-width: none;
  }

  .gallery-scroll-bau::-webkit-scrollbar {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-slide-in,
    .animate-rotate,
    .animate-pulse-bau,
    .animate-color-shift,
    .hover-bauhaus {
      animation: none !important;
      transition: none !important;
    }
  }
`;

const SERVIZI = [
  {
    numeral: "01",
    title: "ANALISI",
    subtitle: "Analysis",
    description: "Ricerca formale. Studio delle proporzioni. Definizione del sistema geometrico.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=800&fit=crop&q=80",
    color: "hsl(0 85% 50%)",
  },
  {
    numeral: "02",
    title: "PROGETTO",
    subtitle: "Design",
    description: "Forma segue funzione. Geometrie pure. Colori primari come accenti.",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&h=800&fit=crop&q=80",
    color: "hsl(50 95% 55%)",
  },
  {
    numeral: "03",
    title: "PROTOTIPO",
    subtitle: "Prototype",
    description: "Realizzazione artigianale. Test dei materiali. Verifica delle proporzioni.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=800&fit=crop&q=80",
    color: "hsl(220 85% 50%)",
  },
  {
    numeral: "04",
    title: "PRODUZIONE",
    subtitle: "Production",
    description: "Manifattura precisa. Controllo qualita. Consegna in guanti bianchi.",
    image: "https://images.unsplash.com/photo-600210492486-724fe5c67fb0?w=600&h=800&fit=crop&q=80",
    color: "hsl(0 0% 8%)",
  },
];

const COLLEZIONI = [
  {
    id: "weimar",
    name: "COLLEZIONE WEIMAR",
    subtitle: "Living System",
    price: "da / from 7.800",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=1000&fit=crop&q=80",
    tag: "ICONIC",
    color: "hsl(0 85% 50%)",
  },
  {
    id: "dessau",
    name: "COLLEZIONE DESSAU",
    subtitle: "Dining Module",
    price: "da / from 5.400",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&h=1000&fit=crop&q=80",
    tag: "FORM",
    color: "hsl(50 95% 55%)",
  },
  {
    id: "berlin",
    name: "COLLEZIONE BERLIN",
    subtitle: "Bedroom Unit",
    price: "da / from 6.200",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=1000&fit=crop&q=80",
    tag: "FUNCTION",
    color: "hsl(220 85% 50%)",
  },
  {
    id: "gropius",
    name: "COLLEZIONE GROPIUS",
    subtitle: "Office System",
    price: "da / from 4.900",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=1000&fit=crop&q=80",
    tag: "RATIONAL",
    color: "hsl(0 0% 8%)",
  },
  {
    id: "kandinsky",
    name: "COLLEZIONE KANDINSKY",
    subtitle: "Art Objects",
    price: "da / from 1.200",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=1000&fit=crop&q=80",
    tag: "ABSTRACT",
    color: "hsl(0 85% 50%)",
  },
];

const STATS = [
  { value: "1919", label: "Lo spirito del Bauhaus", sublabel: "The Bauhaus spirit" },
  { value: "3", label: "Colori primari", sublabel: "Primary colors" },
  { value: "∞", label: "Forme possibili", sublabel: "Possible forms" },
];

export function CasaGiardinoBauhausDemo() {
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
      <style>{bauhausStyles}</style>
      <div
        className="relative overflow-x-hidden"
        style={{
          fontFamily: "'Archivo', sans-serif",
          backgroundColor: "hsl(60 5% 96%)",
          color: "hsl(0 0% 8%)",
        }}
      >
        {/* ═══════════════════════════════════════════════════════════════════════
            HERO - Geometric Revolution
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="min-h-screen relative grid-overlay">
          {/* Geometric shapes */}
          <div
            className="absolute top-20 right-20 w-32 h-32 animate-rotate hidden lg:block"
            style={{ backgroundColor: "hsl(0 85% 50%)" }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-40 left-20 w-24 h-24 rounded-full animate-pulse-bau hidden lg:block"
            style={{ backgroundColor: "hsl(50 95% 55%)" }}
            aria-hidden="true"
          />
          <div
            className="absolute top-1/3 right-1/4 w-0 h-0 hidden lg:block"
            style={{
              borderLeft: "40px solid transparent",
              borderRight: "40px solid transparent",
              borderBottom: "70px solid hsl(220 85% 50%)",
            }}
            aria-hidden="true"
          />

          <nav className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-6 md:px-12 lg:px-20 py-6">
            <span
              className="font-display-bau text-xl opacity-0 animate-slide-in"
              style={{ color: "hsl(0 0% 8%)" }}
            >
              C&G
            </span>
            <div className="flex items-center gap-8">
              <span
                className="font-body-bau text-xs uppercase tracking-[0.3em] opacity-0 animate-slide-in delay-100 hidden md:block"
                style={{ color: "hsl(0 0% 50%)" }}
              >
                Lago di Garda
              </span>
              <Badge
                className="font-display-bau text-[10px] px-4 py-2 uppercase tracking-[0.2em] opacity-0 animate-slide-in delay-200 hover-bauhaus"
                style={{
                  backgroundColor: "hsl(0 85% 50%)",
                  color: "hsl(0 0% 100%)",
                  border: "none",
                  borderRadius: "0",
                }}
              >
                BAUHAUS
              </Badge>
            </div>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
            <div className="flex flex-col justify-center px-6 md:px-12 lg:px-20 py-32 lg:py-0">
              <div className="flex items-center gap-4 mb-8 opacity-0 animate-slide-in delay-300">
                <div className="w-4 h-4" style={{ backgroundColor: "hsl(0 85% 50%)" }} />
                <div className="w-4 h-4" style={{ backgroundColor: "hsl(50 95% 55%)" }} />
                <div className="w-4 h-4" style={{ backgroundColor: "hsl(220 85% 50%)" }} />
              </div>

              <p
                className="font-display-bau text-xs uppercase tracking-[0.5em] mb-8 opacity-0 animate-slide-in delay-300"
                style={{ color: "hsl(0 0% 50%)" }}
              >
                Forma segue funzione
              </p>

              <h1 className="font-display-bau text-hero-bau opacity-0 animate-slide-in delay-400">
                <span className="block" style={{ color: "hsl(0 0% 8%)" }}>CASA</span>
                <span className="block" style={{ color: "hsl(0 85% 50%)" }}>&</span>
                <span className="block" style={{ color: "hsl(0 0% 8%)" }}>GIARDINO</span>
              </h1>

              <p
                className="font-body-bau text-xl md:text-2xl mt-10 max-w-md opacity-0 animate-slide-in delay-500"
                style={{ color: "hsl(0 0% 50%)" }}
              >
                Less is more.
                <br />Design is not decoration.
              </p>

              <div className="mt-16 flex items-center gap-8 opacity-0 animate-slide-in delay-600">
                <div
                  className="w-16 h-16 flex items-center justify-center hover-bauhaus"
                  style={{ backgroundColor: "hsl(0 0% 8%)" }}
                >
                  <span className="font-display-bau text-lg" style={{ color: "hsl(50 95% 55%)" }}>45°</span>
                </div>
                <div>
                  <p className="font-display-bau text-[10px] uppercase tracking-[0.3em]" style={{ color: "hsl(0 0% 50%)" }}>
                    COORDINATE
                  </p>
                  <p className="font-body-bau text-lg mt-1" style={{ color: "hsl(0 0% 8%)" }}>
                    45.4654° N, 10.6339° E
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-[60vh] lg:h-auto opacity-0 animate-slide-in delay-300">
              <div
                className="absolute inset-0 lg:inset-12"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=1600&fit=crop&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                role="img"
                aria-label="Modern geometric interior design"
              />
              {/* Color bars overlay */}
              <div className="absolute bottom-0 left-0 right-0 lg:left-12 lg:right-12 flex" aria-hidden="true">
                <div className="flex-1 h-2" style={{ backgroundColor: "hsl(0 85% 50%)" }} />
                <div className="flex-1 h-2" style={{ backgroundColor: "hsl(50 95% 55%)" }} />
                <div className="flex-1 h-2" style={{ backgroundColor: "hsl(220 85% 50%)" }} />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            PHILOSOPHY
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-32 md:py-48 px-6 md:px-12 lg:px-20" style={{ backgroundColor: "hsl(0 0% 8%)", color: "hsl(60 5% 96%)" }}>
          <div className="max-w-5xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-1" style={{ backgroundColor: "hsl(0 85% 50%)" }} />
              <p className="font-display-bau text-xs uppercase tracking-[0.5em]" style={{ color: "hsl(0 0% 50%)" }}>
                FILOSOFIA / PHILOSOPHY
              </p>
            </div>

            <h2 className="font-display-bau text-display-bau">
              <span style={{ color: "hsl(60 5% 96%)" }}>LA </span>
              <span style={{ color: "hsl(0 85% 50%)" }}>FORMA</span>
              <br />
              <span style={{ color: "hsl(60 5% 96%)" }}>SEGUE LA </span>
              <span style={{ color: "hsl(50 95% 55%)" }}>FUNZIONE</span>
            </h2>

            <p className="font-body-bau text-lg mt-12 max-w-2xl leading-relaxed" style={{ color: "hsl(0 0% 60%)" }}>
              Form follows function. We believe in the radical simplicity of the Bauhaus masters.
              Every line has purpose. Every color communicates. Every form serves life.
            </p>

            <div className="mt-16 flex gap-6">
              {["CERCHIO", "QUADRATO", "TRIANGOLO"].map((shape, i) => (
                <div key={shape} className="flex items-center gap-3">
                  <div
                    className="w-6 h-6"
                    style={{
                      backgroundColor: ["hsl(50 95% 55%)", "hsl(0 85% 50%)", "hsl(220 85% 50%)"][i],
                      borderRadius: i === 0 ? "50%" : "0",
                      clipPath: i === 2 ? "polygon(50% 0%, 0% 100%, 100% 100%)" : "none",
                    }}
                  />
                  <span className="font-display-bau text-xs tracking-[0.2em]" style={{ color: "hsl(0 0% 60%)" }}>
                    {shape}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SERVIZI
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-24 md:py-40 px-6 md:px-12 lg:px-20 grid-overlay">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-1" style={{ backgroundColor: "hsl(220 85% 50%)" }} />
                <p className="font-display-bau text-xs uppercase tracking-[0.5em]" style={{ color: "hsl(0 0% 50%)" }}>
                  PROCESSO
                </p>
              </div>
              <h2 className="font-display-bau text-display-bau">QUATTRO FASI</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVIZI.map((servizio) => (
              <Card
                key={servizio.numeral}
                className="hover-bauhaus group relative overflow-hidden"
                style={{
                  backgroundColor: "hsl(0 0% 100%)",
                  border: "2px solid hsl(0 0% 8%)",
                  borderRadius: "0",
                  minHeight: "350px",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-2"
                  style={{ backgroundColor: servizio.color }}
                  aria-hidden="true"
                />

                <CardContent className="h-full flex flex-col justify-between p-6">
                  <div>
                    <span
                      className="font-display-bau text-4xl"
                      style={{ color: servizio.color }}
                    >
                      {servizio.numeral}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display-bau text-xl">{servizio.title}</h3>
                    <p className="font-body-bau text-xs uppercase tracking-[0.2em] mt-1" style={{ color: "hsl(0 0% 50%)" }}>
                      {servizio.subtitle}
                    </p>
                    <p className="font-body-bau text-sm mt-4" style={{ color: "hsl(0 0% 40%)" }}>
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
        <section className="py-24 md:py-40" style={{ backgroundColor: "hsl(50 95% 55%)" }}>
          <div className="px-6 md:px-12 lg:px-20 mb-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-1" style={{ backgroundColor: "hsl(0 0% 8%)" }} />
                  <p className="font-display-bau text-xs uppercase tracking-[0.5em]" style={{ color: "hsl(0 0% 8% / 0.6)" }}>
                    COLLEZIONI
                  </p>
                </div>
                <h2 className="font-display-bau text-display-bau" style={{ color: "hsl(0 0% 8%)" }}>
                  DESIGN SYSTEM
                </h2>
              </div>

              <div className="flex gap-2 mt-8 md:mt-0">
                <button
                  onClick={() => scrollGallery("left")}
                  className="w-12 h-12 flex items-center justify-center border-2 hover-bauhaus"
                  style={{ borderColor: "hsl(0 0% 8%)", backgroundColor: "transparent" }}
                  aria-label="Scroll left"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollGallery("right")}
                  className="w-12 h-12 flex items-center justify-center border-2 hover-bauhaus"
                  style={{ borderColor: "hsl(0 0% 8%)", backgroundColor: "transparent" }}
                  aria-label="Scroll right"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div ref={galleryRef} className="gallery-scroll-bau pl-6 md:pl-12 lg:pl-20 pr-6">
            {COLLEZIONI.map((collezione) => (
              <article key={collezione.id} className="flex-shrink-0 group cursor-pointer" style={{ width: "300px" }}>
                <div className="relative overflow-hidden mb-6" style={{ aspectRatio: "3/4", border: "2px solid hsl(0 0% 8%)" }}>
                  <img
                    src={collezione.image}
                    alt={`${collezione.name} - ${collezione.subtitle}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <Badge
                    className="absolute top-4 left-4 font-display-bau text-[10px] uppercase tracking-[0.15em] px-3 py-1.5"
                    style={{
                      backgroundColor: collezione.color,
                      color: collezione.color === "hsl(50 95% 55%)" ? "hsl(0 0% 8%)" : "hsl(0 0% 100%)",
                      border: "none",
                      borderRadius: "0",
                    }}
                  >
                    {collezione.tag}
                  </Badge>
                </div>

                <h3 className="font-display-bau text-lg mb-1" style={{ color: "hsl(0 0% 8%)" }}>{collezione.name}</h3>
                <p className="font-body-bau text-xs uppercase tracking-[0.15em] mb-3" style={{ color: "hsl(0 0% 8% / 0.6)" }}>
                  {collezione.subtitle}
                </p>
                <p className="font-display-bau text-lg" style={{ color: "hsl(0 0% 8%)" }}>
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
            }}
            role="img"
            aria-label="Bauhaus-inspired showroom"
          />
          <div className="absolute inset-0" style={{ backgroundColor: "hsl(0 0% 8% / 0.85)" }} aria-hidden="true" />

          <div className="relative z-10 min-h-[80vh] flex flex-col justify-end px-6 md:px-12 lg:px-20 py-20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-1" style={{ backgroundColor: "hsl(0 85% 50%)" }} />
              <p className="font-display-bau text-xs uppercase tracking-[0.5em]" style={{ color: "hsl(0 0% 50%)" }}>
                SHOWROOM
              </p>
            </div>
            <h2 className="font-display-bau text-display-bau max-w-3xl" style={{ color: "hsl(60 5% 96%)" }}>
              1.500 MQ DI
              <br />
              <span style={{ color: "hsl(50 95% 55%)" }}>DESIGN RAZIONALE</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 pt-12 border-t-2" style={{ borderColor: "hsl(60 5% 96% / 0.2)" }}>
              {STATS.map((stat, i) => (
                <div key={stat.label}>
                  <p
                    className="font-display-bau text-5xl md:text-6xl mb-3"
                    style={{ color: ["hsl(0 85% 50%)", "hsl(50 95% 55%)", "hsl(220 85% 50%)"][i] }}
                  >
                    {stat.value}
                  </p>
                  <p className="font-body-bau text-sm" style={{ color: "hsl(60 5% 96%)" }}>{stat.label}</p>
                  <p className="font-body-bau text-xs mt-1" style={{ color: "hsl(0 0% 50%)" }}>{stat.sublabel}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            CONTACT
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-32 md:py-48 px-6 md:px-12 lg:px-20 grid-overlay">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center items-center gap-4 mb-8">
              <div className="w-4 h-4" style={{ backgroundColor: "hsl(0 85% 50%)" }} />
              <div className="w-4 h-4" style={{ backgroundColor: "hsl(50 95% 55%)" }} />
              <div className="w-4 h-4" style={{ backgroundColor: "hsl(220 85% 50%)" }} />
            </div>

            <h2 className="font-display-bau text-display-bau mb-8">
              IL DESIGN
              <br />
              <span style={{ color: "hsl(220 85% 50%)" }}>TI ASPETTA</span>
            </h2>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="font-display-bau text-sm px-12 py-6 uppercase tracking-[0.2em] hover-bauhaus"
                  style={{
                    backgroundColor: "hsl(0 0% 8%)",
                    color: "hsl(60 5% 96%)",
                    border: "none",
                    borderRadius: "0",
                  }}
                >
                  PRENOTA VISITA
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg" style={{ borderRadius: "0", border: "2px solid hsl(0 0% 8%)" }}>
                <DialogHeader className="pb-6 border-b-2" style={{ borderColor: "hsl(0 0% 85%)" }}>
                  <DialogTitle className="font-display-bau text-xl">VISITA LO SHOWROOM</DialogTitle>
                  <DialogDescription className="font-body-bau text-sm mt-2" style={{ color: "hsl(0 0% 50%)" }}>
                    Compila il form per prenotare.
                  </DialogDescription>
                </DialogHeader>

                <form className="space-y-5 pt-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="font-display-bau text-[10px] uppercase tracking-[0.15em] block mb-2">Nome</label>
                      <Input id="name" placeholder="Mario" className="font-body-bau" style={{ borderRadius: "0", border: "2px solid hsl(0 0% 8%)" }} />
                    </div>
                    <div>
                      <label htmlFor="surname" className="font-display-bau text-[10px] uppercase tracking-[0.15em] block mb-2">Cognome</label>
                      <Input id="surname" placeholder="Rossi" className="font-body-bau" style={{ borderRadius: "0", border: "2px solid hsl(0 0% 8%)" }} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="font-display-bau text-[10px] uppercase tracking-[0.15em] block mb-2">Email</label>
                    <Input id="email" type="email" placeholder="mario.rossi@email.it" className="font-body-bau" style={{ borderRadius: "0", border: "2px solid hsl(0 0% 8%)" }} />
                  </div>

                  <div>
                    <label htmlFor="interest" className="font-display-bau text-[10px] uppercase tracking-[0.15em] block mb-2">Interesse</label>
                    <Select>
                      <SelectTrigger id="interest" className="font-body-bau" style={{ borderRadius: "0", border: "2px solid hsl(0 0% 8%)" }}>
                        <SelectValue placeholder="Seleziona..." />
                      </SelectTrigger>
                      <SelectContent style={{ borderRadius: "0" }}>
                        <SelectItem value="living">Living System</SelectItem>
                        <SelectItem value="dining">Dining Module</SelectItem>
                        <SelectItem value="bedroom">Bedroom Unit</SelectItem>
                        <SelectItem value="complete">Progetto Completo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer pt-2">
                    <Checkbox checked={privacyAccepted} onCheckedChange={(c) => setPrivacyAccepted(c === true)} className="mt-0.5" />
                    <span className="font-body-bau text-xs leading-relaxed" style={{ color: "hsl(0 0% 50%)" }}>
                      Accetto la Privacy Policy.
                    </span>
                  </label>

                  <Button
                    type="submit"
                    className="w-full font-display-bau text-sm py-5 uppercase tracking-[0.15em]"
                    style={{
                      backgroundColor: privacyAccepted ? "hsl(0 85% 50%)" : "hsl(0 0% 85%)",
                      color: privacyAccepted ? "hsl(0 0% 100%)" : "hsl(0 0% 50%)",
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
                <p className="font-display-bau text-[10px] uppercase tracking-[0.3em] mb-1" style={{ color: "hsl(0 0% 50%)" }}>TEL</p>
                <a href="tel:+390309912345" className="font-body-bau text-lg">+39 030 991 2345</a>
              </div>
              <div>
                <p className="font-display-bau text-[10px] uppercase tracking-[0.3em] mb-1" style={{ color: "hsl(0 0% 50%)" }}>EMAIL</p>
                <a href="mailto:bauhaus@casaegiardino.it" className="font-body-bau text-lg">bauhaus@casaegiardino.it</a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            FOOTER
        ═══════════════════════════════════════════════════════════════════════ */}
        <footer className="py-16 px-6 md:px-12 lg:px-20" style={{ backgroundColor: "hsl(0 0% 8%)", color: "hsl(60 5% 96%)" }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h3 className="font-display-bau text-2xl mb-4">CASA & GIARDINO</h3>
              <p className="font-body-bau text-sm max-w-xs" style={{ color: "hsl(0 0% 60%)" }}>
                Design razionale dal 1998. Lago di Garda.
              </p>
              <div className="flex gap-2 mt-4">
                <div className="w-4 h-4" style={{ backgroundColor: "hsl(0 85% 50%)" }} />
                <div className="w-4 h-4" style={{ backgroundColor: "hsl(50 95% 55%)" }} />
                <div className="w-4 h-4" style={{ backgroundColor: "hsl(220 85% 50%)" }} />
              </div>
            </div>

            <div className="md:col-span-3">
              <p className="font-display-bau text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: "hsl(0 0% 50%)" }}>SHOWROOM</p>
              <address className="font-body-bau text-sm not-italic" style={{ color: "hsl(0 0% 60%)" }}>
                Via del Lago, 42<br />25015 Desenzano del Garda<br />Italia
              </address>
            </div>

            <div className="md:col-span-3">
              <p className="font-display-bau text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: "hsl(0 0% 50%)" }}>ORARI</p>
              <p className="font-body-bau text-sm" style={{ color: "hsl(0 0% 60%)" }}>
                Mar - Sab: 10:00 - 19:00<br />Dom - Lun: Chiuso
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="font-display-bau text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: "hsl(0 0% 50%)" }}>LEGAL</p>
              <ul className="space-y-2">
                {["Privacy", "Cookie", "Terms"].map((link) => (
                  <li key={link}><a href="#" className="font-body-bau text-sm" style={{ color: "hsl(0 0% 60%)" }}>{link}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t-2 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: "hsl(60 5% 96% / 0.2)" }}>
            <a href="/" className="font-display-bau text-xs uppercase tracking-[0.2em] flex items-center gap-2" style={{ color: "hsl(0 0% 60%)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
              GALLERY
            </a>
            <span className="font-display-bau text-sm" style={{ color: "hsl(50 95% 55%)" }}>45.4654° N</span>
          </div>

          <div className="mt-8 text-center">
            <p className="font-display-bau text-[10px] uppercase tracking-[0.3em]" style={{ color: "hsl(0 0% 50%)" }}>
              2024 CASA & GIARDINO - CRAZYONE UI / BAUHAUS
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
