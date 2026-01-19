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
// GELATO - Collezione Dolce Vita Pastel
// Inspired by: Italian Riviera, gelato colors, la dolce vita
// Typography: Lora + Nunito
// ═══════════════════════════════════════════════════════════════════════════════

const gelatoStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Nunito:wght@300;400;500;600&display=swap');

  :root {
    --gelato-bg: 40 60% 97%;
    --gelato-fg: 350 30% 20%;
    --gelato-card: 0 0% 100%;
    --gelato-pink: 350 70% 75%;
    --gelato-mint: 160 50% 70%;
    --gelato-lemon: 50 80% 70%;
    --gelato-peach: 25 80% 75%;
    --gelato-lavender: 270 50% 75%;
    --gelato-muted: 350 15% 55%;
    --gelato-border: 350 20% 88%;
  }

  .font-display-gelato {
    font-family: 'Lora', Georgia, serif;
    font-weight: 500;
  }

  .font-body-gelato {
    font-family: 'Nunito', sans-serif;
    font-weight: 400;
  }

  .text-hero-gelato {
    font-size: clamp(3rem, 10vw, 9rem);
    line-height: 0.95;
    letter-spacing: -0.02em;
  }

  .text-display-gelato {
    font-size: clamp(2rem, 5vw, 4.5rem);
    line-height: 1;
    letter-spacing: -0.01em;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @keyframes melt {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes shimmer {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
  }

  @keyframes scoopBounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  .animate-float {
    animation: float 4s ease-in-out infinite;
  }

  .animate-melt {
    animation: melt 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .animate-shimmer {
    animation: shimmer 3s ease-in-out infinite;
  }

  .animate-scoop {
    animation: scoopBounce 2s ease-in-out infinite;
  }

  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
  .delay-500 { animation-delay: 500ms; }

  .hover-gelato {
    transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .hover-gelato:hover {
    transform: translateY(-8px) rotate(2deg);
    box-shadow: 0 25px 50px -12px hsl(350 70% 75% / 0.25);
  }

  .pastel-gradient {
    background: linear-gradient(135deg,
      hsl(350 70% 95%) 0%,
      hsl(40 60% 97%) 50%,
      hsl(160 50% 95%) 100%);
  }

  .wafer-pattern {
    background-image:
      repeating-linear-gradient(
        45deg,
        hsl(40 50% 85%) 0px,
        hsl(40 50% 85%) 2px,
        transparent 2px,
        transparent 10px
      );
  }

  .gallery-scroll-gelato {
    display: flex;
    gap: 2rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding: 2rem;
    scrollbar-width: none;
  }

  .gallery-scroll-gelato::-webkit-scrollbar {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-float,
    .animate-melt,
    .animate-shimmer,
    .animate-scoop,
    .hover-gelato {
      animation: none !important;
      transition: none !important;
    }
  }
`;

const SERVIZI = [
  {
    numeral: "I",
    title: "Assaggio",
    subtitle: "Tasting",
    description: "Scopriamo insieme i vostri gusti. Un viaggio sensoriale nel colore e nella forma.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=800&fit=crop&q=80",
    color: "hsl(350 70% 75%)",
  },
  {
    numeral: "II",
    title: "Ricetta",
    subtitle: "Recipe",
    description: "Creiamo la vostra combinazione perfetta. Colori, tessuti, forme in armonia.",
    image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=600&h=800&fit=crop&q=80",
    color: "hsl(160 50% 70%)",
  },
  {
    numeral: "III",
    title: "Preparazione",
    subtitle: "Preparation",
    description: "Artigiani italiani al lavoro. Tradizione e creativita in ogni pezzo.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=800&fit=crop&q=80",
    color: "hsl(50 80% 70%)",
  },
  {
    numeral: "IV",
    title: "Servizio",
    subtitle: "Service",
    description: "Consegna con cura. Il vostro dolce sogno diventa realta.",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&h=800&fit=crop&q=80",
    color: "hsl(25 80% 75%)",
  },
];

const COLLEZIONI = [
  {
    id: "fragola",
    name: "Collezione Fragola",
    subtitle: "Living Room",
    price: "da / from 5.800",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=1000&fit=crop&q=80",
    tag: "Dolce",
    color: "hsl(350 70% 75%)",
  },
  {
    id: "pistacchio",
    name: "Collezione Pistacchio",
    subtitle: "Bedroom",
    price: "da / from 4.900",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=1000&fit=crop&q=80",
    tag: "Fresco",
    color: "hsl(160 50% 70%)",
  },
  {
    id: "limone",
    name: "Collezione Limone",
    subtitle: "Kitchen",
    price: "da / from 6.200",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&h=1000&fit=crop&q=80",
    tag: "Vivace",
    color: "hsl(50 80% 70%)",
  },
  {
    id: "pesca",
    name: "Collezione Pesca",
    subtitle: "Dining",
    price: "da / from 5.400",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=1000&fit=crop&q=80",
    tag: "Morbido",
    color: "hsl(25 80% 75%)",
  },
  {
    id: "lavanda",
    name: "Collezione Lavanda",
    subtitle: "Bathroom",
    price: "da / from 3.200",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=1000&fit=crop&q=80",
    tag: "Relax",
    color: "hsl(270 50% 75%)",
  },
];

const STATS = [
  { value: "5", label: "Gusti esclusivi", sublabel: "Exclusive flavors" },
  { value: "∞", label: "Combinazioni", sublabel: "Combinations" },
  { value: "1", label: "Dolce vita", sublabel: "Sweet life" },
];

export function CasaGiardinoGelatoDemo() {
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
      <style>{gelatoStyles}</style>
      <div
        className="pastel-gradient relative overflow-x-hidden"
        style={{
          fontFamily: "'Nunito', sans-serif",
          color: "hsl(350 30% 20%)",
        }}
      >
        {/* ═══════════════════════════════════════════════════════════════════════
            HERO - Dolce Vita
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="min-h-screen relative">
          {/* Floating gelato scoops */}
          <div
            className="absolute top-32 right-20 w-20 h-20 rounded-full animate-float hidden lg:block"
            style={{ backgroundColor: "hsl(350 70% 75%)", opacity: 0.6 }}
            aria-hidden="true"
          />
          <div
            className="absolute top-1/2 right-32 w-16 h-16 rounded-full animate-float delay-200 hidden lg:block"
            style={{ backgroundColor: "hsl(160 50% 70%)", opacity: 0.5 }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-40 left-20 w-14 h-14 rounded-full animate-float delay-400 hidden lg:block"
            style={{ backgroundColor: "hsl(50 80% 70%)", opacity: 0.5 }}
            aria-hidden="true"
          />

          <nav className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-6 md:px-12 lg:px-20 py-6">
            <span
              className="font-display-gelato text-2xl italic opacity-0 animate-melt"
              style={{ color: "hsl(350 70% 65%)" }}
            >
              C&G
            </span>
            <div className="flex items-center gap-8">
              <span
                className="font-body-gelato text-sm tracking-[0.2em] opacity-0 animate-melt delay-100 hidden md:block"
                style={{ color: "hsl(350 15% 55%)" }}
              >
                Lago di Garda
              </span>
              <Badge
                className="font-body-gelato text-[11px] px-5 py-2 tracking-[0.15em] opacity-0 animate-melt delay-200"
                style={{
                  backgroundColor: "hsl(350 70% 75%)",
                  color: "hsl(0 0% 100%)",
                  border: "none",
                  borderRadius: "9999px",
                }}
              >
                Dolce Vita
              </Badge>
            </div>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
            <div className="flex flex-col justify-center px-6 md:px-12 lg:px-20 py-32 lg:py-0">
              <div className="flex gap-3 mb-8 opacity-0 animate-melt delay-300">
                {["hsl(350 70% 75%)", "hsl(160 50% 70%)", "hsl(50 80% 70%)", "hsl(25 80% 75%)", "hsl(270 50% 75%)"].map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full animate-scoop"
                    style={{ backgroundColor: color, animationDelay: `${i * 200}ms` }}
                  />
                ))}
              </div>

              <p
                className="font-body-gelato text-sm uppercase tracking-[0.4em] mb-8 opacity-0 animate-melt delay-300"
                style={{ color: "hsl(350 70% 65%)" }}
              >
                La dolce vita
              </p>

              <h1 className="font-display-gelato text-hero-gelato italic opacity-0 animate-melt delay-400">
                <span className="block" style={{ color: "hsl(350 30% 20%)" }}>Casa</span>
                <span className="block" style={{ color: "hsl(350 70% 65%)" }}>&</span>
                <span className="block" style={{ color: "hsl(350 30% 20%)" }}>Giardino</span>
              </h1>

              <p
                className="font-display-gelato text-2xl md:text-3xl mt-10 max-w-md italic opacity-0 animate-melt delay-500"
                style={{ color: "hsl(350 15% 55%)" }}
              >
                La vita e dolce
                <br />quando e colorata
              </p>

              <p
                className="font-body-gelato text-sm mt-4 opacity-0 animate-melt delay-500"
                style={{ color: "hsl(350 15% 45%)" }}
              >
                Life is sweet when it's colorful
              </p>

              <div className="mt-16 flex items-center gap-6 opacity-0 animate-melt delay-600">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center wafer-pattern animate-shimmer"
                  style={{ backgroundColor: "hsl(40 60% 92%)" }}
                >
                  <span className="font-display-gelato text-lg italic" style={{ color: "hsl(350 70% 65%)" }}>26°</span>
                </div>
                <div>
                  <p className="font-body-gelato text-xs uppercase tracking-[0.3em]" style={{ color: "hsl(350 15% 55%)" }}>
                    Temperatura perfetta
                  </p>
                  <p className="font-display-gelato text-lg italic" style={{ color: "hsl(350 70% 65%)" }}>
                    45.4654° N
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-[60vh] lg:h-auto opacity-0 animate-melt delay-300">
              <div
                className="absolute inset-0 lg:inset-8 rounded-[3rem] overflow-hidden"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=1600&fit=crop&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                role="img"
                aria-label="Bright pastel interior with soft colors"
              />
              <div
                className="absolute bottom-8 left-8 right-8 lg:bottom-16 lg:left-16 lg:right-16 p-6 rounded-2xl"
                style={{
                  backgroundColor: "hsl(0 0% 100% / 0.95)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="flex gap-2 mb-2">
                  {["hsl(350 70% 75%)", "hsl(160 50% 70%)", "hsl(50 80% 70%)"].map((color, i) => (
                    <div key={i} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
                  ))}
                </div>
                <p className="font-display-gelato text-lg italic" style={{ color: "hsl(350 30% 20%)" }}>
                  Collezione Primavera 2024
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            PHILOSOPHY
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-32 md:py-48 px-6 md:px-12 lg:px-20" style={{ backgroundColor: "hsl(0 0% 100%)" }}>
          <div className="max-w-5xl mx-auto text-center">
            <p
              className="font-body-gelato text-sm uppercase tracking-[0.4em] mb-8"
              style={{ color: "hsl(350 70% 65%)" }}
            >
              La nostra filosofia / Our philosophy
            </p>

            <h2 className="font-display-gelato text-display-gelato italic">
              <span style={{ color: "hsl(350 30% 20%)" }}>Ogni colore </span>
              <span style={{ color: "hsl(350 70% 65%)" }}>e un'emozione</span>
              <span style={{ color: "hsl(350 30% 20%)" }}>,</span>
              <br />
              <span style={{ color: "hsl(350 30% 20%)" }}>ogni stanza </span>
              <span style={{ color: "hsl(160 50% 60%)" }}>un sogno</span>
              <span style={{ color: "hsl(350 30% 20%)" }}>.</span>
            </h2>

            <p
              className="font-body-gelato text-lg mt-12 max-w-2xl mx-auto leading-relaxed"
              style={{ color: "hsl(350 15% 45%)" }}
            >
              Every color is an emotion, every room a dream. We bring the joy of Italian summer
              into your home with soft pastels, playful forms, and the sweetness of la dolce vita.
            </p>

            <div className="mt-16 flex flex-wrap justify-center gap-4">
              {[
                { name: "Rosa", color: "hsl(350 70% 75%)" },
                { name: "Menta", color: "hsl(160 50% 70%)" },
                { name: "Limone", color: "hsl(50 80% 70%)" },
                { name: "Pesca", color: "hsl(25 80% 75%)" },
                { name: "Lavanda", color: "hsl(270 50% 75%)" },
              ].map((gusto) => (
                <div
                  key={gusto.name}
                  className="flex items-center gap-2 px-5 py-3 rounded-full"
                  style={{ backgroundColor: gusto.color }}
                >
                  <span className="font-body-gelato text-sm" style={{ color: "hsl(0 0% 100%)" }}>
                    {gusto.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SERVIZI
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-24 md:py-40 px-6 md:px-12 lg:px-20 pastel-gradient">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <p className="font-body-gelato text-sm uppercase tracking-[0.4em] mb-4" style={{ color: "hsl(350 15% 55%)" }}>
                Il nostro processo
              </p>
              <h2 className="font-display-gelato text-display-gelato italic">
                Quattro gusti
              </h2>
            </div>
            <div className="flex gap-2 mt-6 md:mt-0">
              {SERVIZI.map((s, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full animate-scoop"
                  style={{ backgroundColor: s.color, animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVIZI.map((servizio) => (
              <Card
                key={servizio.numeral}
                className="hover-gelato group relative overflow-hidden"
                style={{
                  backgroundColor: "hsl(0 0% 100%)",
                  border: "none",
                  borderRadius: "2rem",
                  minHeight: "340px",
                  boxShadow: "0 10px 40px -10px hsl(350 70% 75% / 0.2)",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-2 rounded-t-2xl"
                  style={{ backgroundColor: servizio.color }}
                  aria-hidden="true"
                />

                <CardContent className="h-full flex flex-col justify-between p-6">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: servizio.color }}
                  >
                    <span className="font-display-gelato text-lg italic" style={{ color: "hsl(0 0% 100%)" }}>
                      {servizio.numeral}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display-gelato text-xl italic">{servizio.title}</h3>
                    <p className="font-body-gelato text-xs uppercase tracking-[0.2em] mt-1" style={{ color: servizio.color }}>
                      {servizio.subtitle}
                    </p>
                    <p className="font-body-gelato text-sm mt-4" style={{ color: "hsl(350 15% 45%)" }}>
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
          style={{ backgroundColor: "hsl(350 70% 75%)", color: "hsl(0 0% 100%)" }}
        >
          <div className="px-6 md:px-12 lg:px-20 mb-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-body-gelato text-sm uppercase tracking-[0.4em] mb-4" style={{ color: "hsl(0 0% 100% / 0.8)" }}>
                  Le nostre collezioni
                </p>
                <h2 className="font-display-gelato text-display-gelato italic">
                  Cinque gusti
                </h2>
              </div>

              <div className="flex gap-3 mt-8 md:mt-0">
                <button
                  onClick={() => scrollGallery("left")}
                  className="w-12 h-12 flex items-center justify-center rounded-full border-2 transition-colors hover:bg-white/20"
                  style={{ borderColor: "hsl(0 0% 100% / 0.5)" }}
                  aria-label="Scroll left"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollGallery("right")}
                  className="w-12 h-12 flex items-center justify-center rounded-full border-2 transition-colors hover:bg-white/20"
                  style={{ borderColor: "hsl(0 0% 100% / 0.5)" }}
                  aria-label="Scroll right"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div ref={galleryRef} className="gallery-scroll-gelato pl-6 md:pl-12 lg:pl-20 pr-6">
            {COLLEZIONI.map((collezione) => (
              <article key={collezione.id} className="flex-shrink-0 group cursor-pointer" style={{ width: "300px" }}>
                <div
                  className="relative overflow-hidden mb-6 rounded-3xl"
                  style={{ aspectRatio: "3/4" }}
                >
                  <img
                    src={collezione.image}
                    alt={`${collezione.name} - ${collezione.subtitle}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <Badge
                    className="absolute top-4 left-4 font-body-gelato text-[11px] tracking-[0.1em] px-4 py-2 rounded-full"
                    style={{
                      backgroundColor: collezione.color,
                      color: "hsl(0 0% 100%)",
                      border: "none",
                    }}
                  >
                    {collezione.tag}
                  </Badge>
                </div>

                <h3 className="font-display-gelato text-lg italic mb-1">{collezione.name}</h3>
                <p className="font-body-gelato text-sm mb-3" style={{ color: "hsl(0 0% 100% / 0.7)" }}>
                  {collezione.subtitle}
                </p>
                <p className="font-display-gelato text-lg italic">{collezione.price}</p>
              </article>
            ))}
            <div className="flex-shrink-0 w-8" aria-hidden="true" />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SHOWROOM
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[70vh]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            role="img"
            aria-label="Pastel-toned showroom"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, hsl(350 70% 75% / 0.6) 0%, hsl(40 60% 97% / 0.9) 100%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 min-h-[70vh] flex flex-col justify-end px-6 md:px-12 lg:px-20 py-20">
            <p className="font-body-gelato text-sm uppercase tracking-[0.4em] mb-4" style={{ color: "hsl(350 70% 55%)" }}>
              Il nostro showroom
            </p>
            <h2 className="font-display-gelato text-display-gelato italic max-w-3xl" style={{ color: "hsl(350 30% 20%)" }}>
              1.800 mq di dolcezza
              <br />
              <span style={{ color: "hsl(350 70% 55%)" }}>sul Lago di Garda</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 pt-12 border-t" style={{ borderColor: "hsl(350 70% 75% / 0.3)" }}>
              {STATS.map((stat, i) => (
                <div key={stat.label}>
                  <p
                    className="font-display-gelato text-5xl md:text-6xl italic mb-3"
                    style={{ color: ["hsl(350 70% 65%)", "hsl(160 50% 55%)", "hsl(50 80% 55%)"][i] }}
                  >
                    {stat.value}
                  </p>
                  <p className="font-body-gelato text-sm" style={{ color: "hsl(350 30% 20%)" }}>{stat.label}</p>
                  <p className="font-body-gelato text-xs mt-1" style={{ color: "hsl(350 15% 45%)" }}>{stat.sublabel}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            CONTACT
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-32 md:py-48 px-6 md:px-12 lg:px-20" style={{ backgroundColor: "hsl(0 0% 100%)" }}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center gap-2 mb-8">
              {["hsl(350 70% 75%)", "hsl(160 50% 70%)", "hsl(50 80% 70%)"].map((color, i) => (
                <div key={i} className="w-6 h-6 rounded-full animate-scoop" style={{ backgroundColor: color, animationDelay: `${i * 150}ms` }} />
              ))}
            </div>

            <h2 className="font-display-gelato text-display-gelato italic mb-8">
              La dolce vita
              <br />
              <span style={{ color: "hsl(350 70% 65%)" }}>ti aspetta</span>
            </h2>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="font-body-gelato text-sm px-10 py-6 tracking-[0.15em] hover-gelato rounded-full"
                  style={{
                    backgroundColor: "hsl(350 70% 75%)",
                    color: "hsl(0 0% 100%)",
                    border: "none",
                  }}
                >
                  Prenota un assaggio
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg" style={{ borderRadius: "2rem", border: "none", boxShadow: "0 25px 50px -12px hsl(350 70% 75% / 0.3)" }}>
                <DialogHeader className="pb-6 border-b" style={{ borderColor: "hsl(350 20% 90%)" }}>
                  <DialogTitle className="font-display-gelato text-2xl italic" style={{ color: "hsl(350 30% 20%)" }}>
                    Visita lo Showroom
                  </DialogTitle>
                  <DialogDescription className="font-body-gelato text-sm mt-2" style={{ color: "hsl(350 15% 45%)" }}>
                    Compila il form per assaggiare la dolce vita.
                  </DialogDescription>
                </DialogHeader>

                <form className="space-y-5 pt-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="font-body-gelato text-xs uppercase tracking-[0.15em] block mb-2" style={{ color: "hsl(350 15% 45%)" }}>Nome</label>
                      <Input id="name" placeholder="Mario" className="font-body-gelato" style={{ borderRadius: "1rem", borderColor: "hsl(350 20% 88%)" }} />
                    </div>
                    <div>
                      <label htmlFor="surname" className="font-body-gelato text-xs uppercase tracking-[0.15em] block mb-2" style={{ color: "hsl(350 15% 45%)" }}>Cognome</label>
                      <Input id="surname" placeholder="Rossi" className="font-body-gelato" style={{ borderRadius: "1rem", borderColor: "hsl(350 20% 88%)" }} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="font-body-gelato text-xs uppercase tracking-[0.15em] block mb-2" style={{ color: "hsl(350 15% 45%)" }}>Email</label>
                    <Input id="email" type="email" placeholder="mario.rossi@email.it" className="font-body-gelato" style={{ borderRadius: "1rem", borderColor: "hsl(350 20% 88%)" }} />
                  </div>

                  <div>
                    <label htmlFor="gusto" className="font-body-gelato text-xs uppercase tracking-[0.15em] block mb-2" style={{ color: "hsl(350 15% 45%)" }}>Gusto preferito</label>
                    <Select>
                      <SelectTrigger id="gusto" className="font-body-gelato" style={{ borderRadius: "1rem", borderColor: "hsl(350 20% 88%)" }}>
                        <SelectValue placeholder="Seleziona..." />
                      </SelectTrigger>
                      <SelectContent style={{ borderRadius: "1rem" }}>
                        <SelectItem value="fragola">Fragola - Living</SelectItem>
                        <SelectItem value="pistacchio">Pistacchio - Bedroom</SelectItem>
                        <SelectItem value="limone">Limone - Kitchen</SelectItem>
                        <SelectItem value="misto">Misto - Progetto Completo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer pt-2">
                    <Checkbox checked={privacyAccepted} onCheckedChange={(c) => setPrivacyAccepted(c === true)} className="mt-0.5" />
                    <span className="font-body-gelato text-xs leading-relaxed" style={{ color: "hsl(350 15% 45%)" }}>
                      Accetto la Privacy Policy.
                    </span>
                  </label>

                  <Button
                    type="submit"
                    className="w-full font-body-gelato text-sm py-5 tracking-[0.15em] rounded-full"
                    style={{
                      backgroundColor: privacyAccepted ? "hsl(350 70% 75%)" : "hsl(350 20% 88%)",
                      color: privacyAccepted ? "hsl(0 0% 100%)" : "hsl(350 15% 55%)",
                      cursor: privacyAccepted ? "pointer" : "not-allowed",
                    }}
                    disabled={!privacyAccepted}
                  >
                    Prenota
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <div className="mt-16 flex justify-center gap-16">
              <div>
                <p className="font-body-gelato text-xs uppercase tracking-[0.3em] mb-1" style={{ color: "hsl(350 15% 55%)" }}>Telefono</p>
                <a href="tel:+390309912345" className="font-display-gelato text-lg italic" style={{ color: "hsl(350 30% 20%)" }}>+39 030 991 2345</a>
              </div>
              <div>
                <p className="font-body-gelato text-xs uppercase tracking-[0.3em] mb-1" style={{ color: "hsl(350 15% 55%)" }}>Email</p>
                <a href="mailto:dolcevita@casaegiardino.it" className="font-display-gelato text-lg italic" style={{ color: "hsl(350 30% 20%)" }}>dolcevita@casaegiardino.it</a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            FOOTER
        ═══════════════════════════════════════════════════════════════════════ */}
        <footer className="py-16 px-6 md:px-12 lg:px-20 border-t" style={{ borderColor: "hsl(350 20% 88%)", backgroundColor: "hsl(40 60% 97%)" }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h3 className="font-display-gelato text-2xl italic mb-4" style={{ color: "hsl(350 70% 65%)" }}>Casa & Giardino</h3>
              <p className="font-body-gelato text-sm max-w-xs" style={{ color: "hsl(350 15% 45%)" }}>
                La dolce vita dal 1998. Sul Lago di Garda.
              </p>
              <div className="flex gap-2 mt-4">
                {["hsl(350 70% 75%)", "hsl(160 50% 70%)", "hsl(50 80% 70%)", "hsl(25 80% 75%)", "hsl(270 50% 75%)"].map((color, i) => (
                  <div key={i} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
                ))}
              </div>
            </div>

            <div className="md:col-span-3">
              <p className="font-body-gelato text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "hsl(350 15% 55%)" }}>Showroom</p>
              <address className="font-body-gelato text-sm not-italic" style={{ color: "hsl(350 15% 45%)" }}>
                Via del Lago, 42<br />25015 Desenzano del Garda<br />Italia
              </address>
            </div>

            <div className="md:col-span-3">
              <p className="font-body-gelato text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "hsl(350 15% 55%)" }}>Orari</p>
              <p className="font-body-gelato text-sm" style={{ color: "hsl(350 15% 45%)" }}>
                Mar - Sab: 10:00 - 19:00<br />Dom: 11:00 - 17:00<br />Lun: Chiuso
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="font-body-gelato text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "hsl(350 15% 55%)" }}>Legal</p>
              <ul className="space-y-2">
                {["Privacy", "Cookie", "Terms"].map((link) => (
                  <li key={link}><a href="#" className="font-body-gelato text-sm" style={{ color: "hsl(350 15% 45%)" }}>{link}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: "hsl(350 20% 88%)" }}>
            <a href="/" className="font-body-gelato text-xs uppercase tracking-[0.2em] flex items-center gap-2" style={{ color: "hsl(350 15% 45%)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
              Torna alla Gallery
            </a>
            <span className="font-display-gelato text-sm italic" style={{ color: "hsl(350 70% 65%)" }}>45.4654° N, 10.6339° E</span>
          </div>

          <div className="mt-8 text-center">
            <p className="font-body-gelato text-xs uppercase tracking-[0.3em]" style={{ color: "hsl(350 15% 55%)" }}>
              2024 Casa & Giardino S.r.l. - CrazyOne UI / Gelato
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
