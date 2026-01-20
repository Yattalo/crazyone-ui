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
// GREENHOUSE - Collezione Garden/Veranda
// Inspired by: Victorian conservatories, botanical gardens, verdant luxury
// Typography: Newsreader + Outfit
// ═══════════════════════════════════════════════════════════════════════════════

const greenhouseStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500&family=Outfit:wght@300;400;500&display=swap');

  :root {
    --green-bg: 140 20% 95%;
    --green-fg: 150 30% 10%;
    --green-card: 140 25% 98%;
    --green-primary: 145 45% 32%;
    --green-secondary: 85 25% 75%;
    --green-accent: 35 60% 50%;
    --green-muted: 140 10% 50%;
    --green-border: 140 15% 85%;
  }

  .font-display-green {
    font-family: 'Newsreader', Georgia, serif;
    font-weight: 400;
  }

  .font-body-green {
    font-family: 'Outfit', -apple-system, sans-serif;
    font-weight: 400;
  }

  .text-hero-green {
    font-size: clamp(3rem, 10vw, 8rem);
    line-height: 0.95;
    letter-spacing: -0.01em;
  }

  .text-display-green {
    font-size: clamp(2rem, 5vw, 4rem);
    line-height: 1.05;
  }

  @keyframes growUp {
    from {
      opacity: 0;
      transform: translateY(50px) scale(0.98);
      filter: blur(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }

  @keyframes leafSway {
    0%, 100% { transform: rotate(-2deg); }
    50% { transform: rotate(2deg); }
  }

  @keyframes photosynthesis {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  @keyframes dewDrop {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.1); }
  }

  /* NEW: Condensation droplet animation */
  @keyframes condensationDrip {
    0% {
      transform: translateY(0) scaleY(1);
      opacity: 0;
    }
    10% {
      opacity: 0.6;
    }
    70% {
      transform: translateY(0) scaleY(1);
      opacity: 0.6;
    }
    90% {
      transform: translateY(100px) scaleY(1.5);
      opacity: 0.3;
    }
    100% {
      transform: translateY(120px) scaleY(0.5);
      opacity: 0;
    }
  }

  /* NEW: Fog/mist animation */
  @keyframes mistFloat {
    0%, 100% {
      transform: translateX(-20px) translateY(0);
      opacity: 0.15;
    }
    50% {
      transform: translateX(20px) translateY(-10px);
      opacity: 0.25;
    }
  }

  /* NEW: Glass refraction shimmer */
  @keyframes glassShimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  /* NEW: Botanical leaf pattern float */
  @keyframes botanicalFloat {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    25% {
      transform: translateY(-5px) rotate(1deg);
    }
    75% {
      transform: translateY(5px) rotate(-1deg);
    }
  }

  .animate-grow-up {
    animation: growUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .animate-leaf-sway {
    animation: leafSway 6s ease-in-out infinite;
  }

  .animate-photosynthesis {
    background-size: 200% 200%;
    animation: photosynthesis 8s ease infinite;
  }

  .animate-dew {
    animation: dewDrop 3s ease-in-out infinite;
  }

  .animate-mist {
    animation: mistFloat 8s ease-in-out infinite;
  }

  .animate-botanical-float {
    animation: botanicalFloat 10s ease-in-out infinite;
  }

  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
  .delay-500 { animation-delay: 500ms; }

  .hover-greenhouse {
    transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .hover-greenhouse:hover {
    transform: translateY(-8px);
    box-shadow: 0 30px 60px -15px hsl(145 45% 32% / 0.2);
  }

  /* Enhanced glass panel with realistic glass effect */
  .glass-panel {
    background: linear-gradient(135deg,
      hsl(140 25% 98% / 0.92) 0%,
      hsl(140 30% 96% / 0.85) 50%,
      hsl(140 25% 98% / 0.9) 100%);
    backdrop-filter: blur(20px) saturate(1.2);
    border: 1px solid hsl(145 45% 32% / 0.12);
    box-shadow:
      inset 0 1px 0 0 hsl(0 0% 100% / 0.4),
      inset 0 -1px 0 0 hsl(145 45% 32% / 0.05),
      0 4px 12px -2px hsl(145 45% 32% / 0.08);
    position: relative;
    overflow: hidden;
  }

  /* Glass refraction highlight */
  .glass-panel::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      hsl(0 0% 100% / 0.15) 50%,
      transparent 100%
    );
    transform: skewX(-20deg);
    pointer-events: none;
    transition: left 0.8s ease;
  }

  .glass-panel:hover::before {
    left: 200%;
  }

  /* Condensation effect overlay */
  .glass-condensation {
    position: relative;
  }

  .glass-condensation::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(circle at 20% 30%, hsl(200 50% 90% / 0.4) 0%, transparent 2px),
      radial-gradient(circle at 60% 15%, hsl(200 50% 90% / 0.3) 0%, transparent 3px),
      radial-gradient(circle at 80% 45%, hsl(200 50% 90% / 0.35) 0%, transparent 2px),
      radial-gradient(circle at 15% 70%, hsl(200 50% 90% / 0.3) 0%, transparent 2px),
      radial-gradient(circle at 40% 85%, hsl(200 50% 90% / 0.4) 0%, transparent 3px),
      radial-gradient(circle at 70% 75%, hsl(200 50% 90% / 0.25) 0%, transparent 2px),
      radial-gradient(circle at 90% 20%, hsl(200 50% 90% / 0.35) 0%, transparent 2px),
      radial-gradient(circle at 35% 50%, hsl(200 50% 90% / 0.3) 0%, transparent 4px);
    pointer-events: none;
    opacity: 0.7;
  }

  /* Botanical background pattern */
  .botanical-bg {
    position: relative;
  }

  .botanical-bg::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 C30 5 20 15 20 25 C20 35 30 40 30 40 C30 40 40 35 40 25 C40 15 30 5 30 5Z' fill='%233D7A5A' fill-opacity='0.03'/%3E%3Cpath d='M30 8 L30 38' stroke='%233D7A5A' stroke-opacity='0.05' stroke-width='0.5'/%3E%3C/svg%3E");
    background-size: 60px 60px;
    opacity: 0.8;
    pointer-events: none;
  }

  .botanical-border {
    border: 1px solid hsl(145 45% 32% / 0.15);
    position: relative;
  }

  .botanical-border::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 20px;
    right: 20px;
    height: 3px;
    background: linear-gradient(90deg, transparent, hsl(145 45% 32%), transparent);
  }

  /* Victorian greenhouse frame decoration */
  .greenhouse-frame {
    position: relative;
  }

  .greenhouse-frame::before,
  .greenhouse-frame::after {
    content: '';
    position: absolute;
    background: hsl(145 45% 32% / 0.15);
    pointer-events: none;
  }

  .greenhouse-frame::before {
    top: 0;
    bottom: 0;
    left: 50%;
    width: 1px;
  }

  .greenhouse-frame::after {
    left: 0;
    right: 0;
    top: 50%;
    height: 1px;
  }

  /* Mist/fog overlay */
  .mist-overlay {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 20% 80%, hsl(140 30% 95% / 0.4) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 20%, hsl(140 30% 95% / 0.3) 0%, transparent 40%),
      radial-gradient(ellipse at 50% 50%, hsl(140 30% 95% / 0.2) 0%, transparent 60%);
    pointer-events: none;
    animation: mistFloat 12s ease-in-out infinite;
  }

  .gallery-scroll-green {
    display: flex;
    gap: 2rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding: 2rem;
    scrollbar-width: none;
  }

  .gallery-scroll-green::-webkit-scrollbar {
    display: none;
  }

  /* Condensation drip element */
  .condensation-drip {
    position: absolute;
    width: 3px;
    height: 8px;
    background: linear-gradient(
      180deg,
      hsl(200 50% 90% / 0.6) 0%,
      hsl(200 50% 90% / 0.2) 100%
    );
    border-radius: 50%;
    pointer-events: none;
    animation: condensationDrip 8s ease-in-out infinite;
  }

  .condensation-drip:nth-child(1) { left: 15%; animation-delay: 0s; }
  .condensation-drip:nth-child(2) { left: 35%; animation-delay: 2s; }
  .condensation-drip:nth-child(3) { left: 55%; animation-delay: 4s; }
  .condensation-drip:nth-child(4) { left: 75%; animation-delay: 6s; }
  .condensation-drip:nth-child(5) { left: 90%; animation-delay: 1s; }

  @media (prefers-reduced-motion: reduce) {
    .animate-grow-up,
    .animate-leaf-sway,
    .animate-photosynthesis,
    .animate-dew,
    .animate-mist,
    .animate-botanical-float,
    .hover-greenhouse,
    .mist-overlay,
    .condensation-drip,
    .glass-panel::before {
      animation: none !important;
      transition: none !important;
    }

    .glass-panel:hover::before {
      left: -100%;
    }
  }
`;

const SERVIZI = [
  {
    numeral: "I",
    title: "Progettazione Botanica",
    subtitle: "Botanical Planning",
    description: "Studio delle essenze, microclima e orientamento. Selezione di piante rare e autoctone per ogni ambiente.",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&h=800&fit=crop&q=80",
  },
  {
    numeral: "II",
    title: "Serra Design",
    subtitle: "Conservatory Design",
    description: "Progettazione di serre e verande. Vetrate strutturali, sistemi climatici, illuminazione naturale.",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&h=800&fit=crop&q=80",
  },
  {
    numeral: "III",
    title: "Arredi Veranda",
    subtitle: "Conservatory Furniture",
    description: "Mobili in rattan, vimini, bamboo. Tessuti resistenti UV. Comfort tutto l'anno.",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&h=800&fit=crop&q=80",
  },
  {
    numeral: "IV",
    title: "Cura del Verde",
    subtitle: "Plant Care",
    description: "Servizio di giardinaggio professionale. Potature, concimazioni, controllo fitosanitario.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=800&fit=crop&q=80",
  },
];

const COLLEZIONI = [
  {
    id: "orangerie",
    name: "Collezione Orangerie",
    subtitle: "Citrus Conservatory",
    price: "da / from 12.500",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1000&fit=crop&q=80",
    tag: "Signature",
  },
  {
    id: "palmhouse",
    name: "Collezione Palm House",
    subtitle: "Tropical Lounge",
    price: "da / from 8.900",
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&h=1000&fit=crop&q=80",
    tag: "Exotic",
  },
  {
    id: "fern",
    name: "Collezione Fern",
    subtitle: "Shade Garden",
    price: "da / from 5.400",
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&h=1000&fit=crop&q=80",
    tag: "Bestseller",
  },
  {
    id: "orchid",
    name: "Collezione Orchidea",
    subtitle: "Rare Species",
    price: "da / from 15.000",
    image: "https://images.unsplash.com/photo-1567331711402-509c12c41959?w=800&h=1000&fit=crop&q=80",
    tag: "Premium",
  },
  {
    id: "herb",
    name: "Collezione Erbe",
    subtitle: "Kitchen Garden",
    price: "da / from 2.800",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&h=1000&fit=crop&q=80",
    tag: "New 2024",
  },
];

const STATS = [
  { value: "340+", label: "Specie botaniche", sublabel: "Botanical species" },
  { value: "85", label: "Serre progettate", sublabel: "Conservatories designed" },
  { value: "∞", label: "Sfumature di verde", sublabel: "Shades of green" },
];

export function CasaGiardinoGreenhouseDemo() {
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
      <style>{greenhouseStyles}</style>

      {/* Condensation drips on "glass" */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className="condensation-drip" style={{ top: '10%' }} aria-hidden="true" />
      ))}

      <div
        className="relative overflow-x-hidden botanical-bg"
        style={{
          fontFamily: "'Outfit', sans-serif",
          backgroundColor: "hsl(140 20% 95%)",
          color: "hsl(150 30% 10%)",
        }}
      >
        {/* Mist overlay for greenhouse atmosphere */}
        <div className="mist-overlay" aria-hidden="true" />

        {/* ═══════════════════════════════════════════════════════════════════════
            HERO - Verdant Elegance
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="min-h-screen relative overflow-hidden">
          {/* Decorative leaves */}
          <div
            className="absolute top-20 right-10 w-32 h-32 opacity-20 animate-leaf-sway"
            style={{
              background: "radial-gradient(ellipse, hsl(145 45% 32%) 0%, transparent 70%)",
              borderRadius: "0 100% 0 100%",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-40 left-10 w-24 h-24 opacity-15 animate-leaf-sway delay-300"
            style={{
              background: "radial-gradient(ellipse, hsl(85 25% 55%) 0%, transparent 70%)",
              borderRadius: "100% 0 100% 0",
            }}
            aria-hidden="true"
          />

          <nav className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-6 md:px-12 lg:px-20 py-6">
            <span
              className="font-display-green text-2xl italic opacity-0 animate-grow-up"
              style={{ color: "hsl(145 45% 32%)" }}
            >
              C&G
            </span>
            <div className="flex items-center gap-8">
              <span
                className="font-body-green text-xs uppercase tracking-[0.3em] opacity-0 animate-grow-up delay-100 hidden md:block"
                style={{ color: "hsl(140 10% 50%)" }}
              >
                Lago di Garda
              </span>
              <Badge
                className="font-body-green text-[10px] px-4 py-2 uppercase tracking-[0.2em] opacity-0 animate-grow-up delay-200 glass-panel"
                style={{
                  color: "hsl(145 45% 32%)",
                  borderRadius: "4px",
                }}
              >
                Greenhouse
              </Badge>
            </div>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
            <div className="flex flex-col justify-center px-6 md:px-12 lg:px-20 py-32 lg:py-0">
              <div className="relative">
                {/* Decorative botanical frame */}
                <div
                  className="absolute -left-4 -top-4 w-16 h-16 border-l-2 border-t-2 opacity-0 animate-grow-up delay-200"
                  style={{ borderColor: "hsl(145 45% 32% / 0.3)" }}
                  aria-hidden="true"
                />

                <p
                  className="font-body-green text-xs uppercase tracking-[0.5em] mb-8 opacity-0 animate-grow-up delay-300"
                  style={{ color: "hsl(145 45% 32%)" }}
                >
                  Giardini d'inverno
                </p>

                <h1 className="font-display-green text-hero-green opacity-0 animate-grow-up delay-400">
                  <span className="block" style={{ color: "hsl(150 30% 10%)" }}>Casa</span>
                  <span className="block italic" style={{ color: "hsl(145 45% 32%)" }}>&</span>
                  <span className="block" style={{ color: "hsl(150 30% 10%)" }}>Giardino</span>
                </h1>

                <p
                  className="font-display-green text-2xl md:text-3xl italic mt-10 max-w-md opacity-0 animate-grow-up delay-500"
                  style={{ color: "hsl(140 10% 50%)" }}
                >
                  Dove la natura
                  <br />diventa architettura
                </p>

                <p
                  className="font-body-green text-sm mt-4 opacity-0 animate-grow-up delay-500"
                  style={{ color: "hsl(140 10% 40%)" }}
                >
                  Where nature becomes architecture
                </p>

                {/* Decorative botanical frame */}
                <div
                  className="absolute -right-4 -bottom-4 w-16 h-16 border-r-2 border-b-2 opacity-0 animate-grow-up delay-500"
                  style={{ borderColor: "hsl(145 45% 32% / 0.3)" }}
                  aria-hidden="true"
                />
              </div>

              <div className="mt-16 flex items-center gap-6 opacity-0 animate-grow-up delay-500">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 animate-dew"
                      style={{
                        backgroundColor: `hsl(${140 + i * 10} 30% ${70 - i * 5}%)`,
                        borderColor: "hsl(140 20% 95%)",
                        animationDelay: `${i * 200}ms`,
                      }}
                    />
                  ))}
                </div>
                <div>
                  <p className="font-body-green text-[10px] uppercase tracking-[0.3em]" style={{ color: "hsl(140 10% 50%)" }}>
                    Temperatura serra
                  </p>
                  <p className="font-display-green text-xl italic" style={{ color: "hsl(145 45% 32%)" }}>
                    22° Costanti
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-[60vh] lg:h-auto opacity-0 animate-grow-up delay-300">
              <div
                className="absolute inset-0 lg:inset-8"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&h=1600&fit=crop&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "0 0 0 60px",
                }}
                role="img"
                aria-label="Lush greenhouse interior with tropical plants"
              />
              <div
                className="absolute bottom-12 left-8 right-8 lg:left-16 lg:right-16 p-6 glass-panel glass-condensation"
                style={{ borderRadius: "8px" }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-2 h-2 rounded-full animate-dew"
                    style={{ backgroundColor: "hsl(145 45% 32%)" }}
                  />
                  <p className="font-body-green text-xs uppercase tracking-[0.2em]" style={{ color: "hsl(145 45% 32%)" }}>
                    Live from greenhouse
                  </p>
                </div>
                <p className="font-display-green text-xl italic mt-2" style={{ color: "hsl(150 30% 10%)" }}>
                  Orchidee in fioritura
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            PHILOSOPHY
        ═══════════════════════════════════════════════════════════════════════ */}
        <section
          className="py-32 md:py-48 px-6 md:px-12 lg:px-20 botanical-border"
          style={{ backgroundColor: "hsl(140 25% 98%)" }}
        >
          <div className="max-w-5xl">
            <p
              className="font-body-green text-xs uppercase tracking-[0.5em] mb-8"
              style={{ color: "hsl(145 45% 32%)" }}
            >
              La nostra filosofia / Our philosophy
            </p>

            <h2 className="font-display-green text-display-green">
              <span style={{ color: "hsl(150 30% 10%)" }}>Ogni pianta ha </span>
              <em style={{ color: "hsl(145 45% 32%)" }}>una storia</em>
              <span style={{ color: "hsl(150 30% 10%)" }}>,</span>
              <br />
              <span style={{ color: "hsl(150 30% 10%)" }}>ogni serra </span>
              <em style={{ color: "hsl(35 60% 50%)" }}>un'anima</em>
              <span style={{ color: "hsl(150 30% 10%)" }}>.</span>
            </h2>

            <p
              className="font-body-green text-lg mt-12 max-w-2xl leading-relaxed"
              style={{ color: "hsl(140 10% 40%)" }}
            >
              Every plant has a story, every conservatory a soul. We design living spaces
              where the boundary between interior and garden dissolves, creating sanctuaries
              of perpetual spring on the shores of Lake Garda.
            </p>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Rattan", "Vetro", "Bamboo", "Pietra"].map((material) => (
                <div
                  key={material}
                  className="p-4 text-center glass-panel"
                  style={{ borderRadius: "8px" }}
                >
                  <span
                    className="font-body-green text-xs uppercase tracking-[0.2em]"
                    style={{ color: "hsl(145 45% 32%)" }}
                  >
                    {material}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SERVIZI
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-24 md:py-40 px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <p
                className="font-body-green text-xs uppercase tracking-[0.5em] mb-4"
                style={{ color: "hsl(140 10% 50%)" }}
              >
                Il nostro processo
              </p>
              <h2 className="font-display-green text-display-green italic">
                Quattro fasi
              </h2>
            </div>
            <p
              className="font-display-green text-7xl mt-6 md:mt-0 opacity-20"
              style={{ color: "hsl(145 45% 32%)" }}
            >
              I—IV
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVIZI.map((servizio) => (
              <Card
                key={servizio.numeral}
                className="hover-greenhouse group relative overflow-hidden glass-panel"
                style={{
                  borderRadius: "16px",
                  minHeight: "300px",
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    backgroundImage: `url('${servizio.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-85 transition-opacity duration-700 glass-panel"
                  aria-hidden="true"
                />

                <CardContent className="relative z-10 h-full flex flex-col justify-between p-8">
                  <span
                    className="font-display-green text-5xl italic opacity-30"
                    style={{ color: "hsl(145 45% 32%)" }}
                  >
                    {servizio.numeral}
                  </span>

                  <div>
                    <h3 className="font-display-green text-2xl italic">
                      {servizio.title}
                    </h3>
                    <p
                      className="font-body-green text-xs uppercase tracking-[0.2em] mt-1"
                      style={{ color: "hsl(145 45% 32%)" }}
                    >
                      {servizio.subtitle}
                    </p>
                    <p
                      className="font-body-green text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: "hsl(140 10% 40%)" }}
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
          className="py-24 md:py-40 animate-photosynthesis"
          style={{
            background: "linear-gradient(135deg, hsl(145 45% 32%) 0%, hsl(150 40% 25%) 50%, hsl(145 45% 32%) 100%)",
            color: "hsl(140 25% 98%)",
          }}
        >
          <div className="px-6 md:px-12 lg:px-20 mb-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div>
                <p
                  className="font-body-green text-xs uppercase tracking-[0.5em] mb-4"
                  style={{ color: "hsl(85 25% 75%)" }}
                >
                  Le nostre collezioni
                </p>
                <h2 className="font-display-green text-display-green italic">
                  Botanical Living
                </h2>
              </div>

              <div className="flex gap-3 mt-8 md:mt-0">
                <button
                  onClick={() => scrollGallery("left")}
                  className="w-12 h-12 flex items-center justify-center rounded-lg border transition-colors hover:bg-white/10"
                  style={{ borderColor: "hsl(140 25% 98% / 0.3)" }}
                  aria-label="Scroll left"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollGallery("right")}
                  className="w-12 h-12 flex items-center justify-center rounded-lg border transition-colors hover:bg-white/10"
                  style={{ borderColor: "hsl(140 25% 98% / 0.3)" }}
                  aria-label="Scroll right"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div ref={galleryRef} className="gallery-scroll-green pl-6 md:pl-12 lg:pl-20 pr-6">
            {COLLEZIONI.map((collezione) => (
              <article key={collezione.id} className="flex-shrink-0 group cursor-pointer" style={{ width: "320px" }}>
                <div className="relative overflow-hidden mb-6" style={{ aspectRatio: "4/5", borderRadius: "12px" }}>
                  <img
                    src={collezione.image}
                    alt={`${collezione.name} - ${collezione.subtitle}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <Badge
                    className="absolute top-4 left-4 font-body-green text-[10px] uppercase tracking-[0.15em] px-3 py-1.5"
                    style={{
                      backgroundColor: "hsl(140 25% 98%)",
                      color: "hsl(145 45% 32%)",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  >
                    {collezione.tag}
                  </Badge>
                </div>

                <h3 className="font-display-green text-xl italic mb-1">{collezione.name}</h3>
                <p className="font-body-green text-xs uppercase tracking-[0.15em] mb-3" style={{ color: "hsl(140 25% 98% / 0.7)" }}>
                  {collezione.subtitle}
                </p>
                <p className="font-display-green text-lg" style={{ color: "hsl(85 25% 75%)" }}>
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
              backgroundImage: "url('https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1920&h=1080&fit=crop&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
            role="img"
            aria-label="Botanical garden showroom"
          />
          <div className="absolute inset-0" style={{ backgroundColor: "hsl(150 30% 10% / 0.7)" }} aria-hidden="true" />

          <div className="relative z-10 min-h-[80vh] flex flex-col justify-end px-6 md:px-12 lg:px-20 py-20">
            <p className="font-body-green text-xs uppercase tracking-[0.5em] mb-4" style={{ color: "hsl(85 25% 75%)" }}>
              La nostra serra showroom
            </p>
            <h2 className="font-display-green text-display-green italic max-w-3xl" style={{ color: "hsl(140 25% 98%)" }}>
              2.500 mq di verde
              <br />
              <span style={{ color: "hsl(85 25% 75%)" }}>sul Lago di Garda</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-12 border-t" style={{ borderColor: "hsl(140 25% 98% / 0.2)" }}>
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display-green text-5xl md:text-6xl italic mb-2" style={{ color: "hsl(145 45% 50%)" }}>
                    {stat.value}
                  </p>
                  <p className="font-body-green text-sm" style={{ color: "hsl(140 25% 98%)" }}>{stat.label}</p>
                  <p className="font-body-green text-xs mt-0.5" style={{ color: "hsl(140 25% 98% / 0.6)" }}>{stat.sublabel}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            CONTACT
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-32 md:py-48 px-6 md:px-12 lg:px-20" style={{ backgroundColor: "hsl(140 25% 98%)" }}>
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-body-green text-xs uppercase tracking-[0.5em] mb-6" style={{ color: "hsl(145 45% 32%)" }}>
              Inizia il tuo progetto / Start your project
            </p>

            <h2 className="font-display-green text-display-green italic mb-8">
              La tua serra
              <br />
              <span style={{ color: "hsl(145 45% 32%)" }}>ti aspetta</span>
            </h2>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="font-body-green text-sm px-12 py-6 uppercase tracking-[0.2em] hover-greenhouse"
                  style={{
                    backgroundColor: "hsl(145 45% 32%)",
                    color: "hsl(140 25% 98%)",
                    border: "none",
                    borderRadius: "8px",
                  }}
                >
                  Prenota visita
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg glass-panel" style={{ borderRadius: "16px" }}>
                <DialogHeader className="pb-6 border-b" style={{ borderColor: "hsl(140 15% 85%)" }}>
                  <DialogTitle className="font-display-green text-2xl italic">Visita la Serra</DialogTitle>
                  <DialogDescription className="font-body-green text-sm mt-2" style={{ color: "hsl(140 10% 40%)" }}>
                    Prenota una visita guidata alla nostra serra botanica.
                  </DialogDescription>
                </DialogHeader>

                <form className="space-y-5 pt-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="font-body-green text-xs uppercase tracking-[0.15em] block mb-2" style={{ color: "hsl(140 10% 40%)" }}>Nome</label>
                      <Input id="name" placeholder="Mario" className="font-body-green" style={{ borderRadius: "8px" }} />
                    </div>
                    <div>
                      <label htmlFor="surname" className="font-body-green text-xs uppercase tracking-[0.15em] block mb-2" style={{ color: "hsl(140 10% 40%)" }}>Cognome</label>
                      <Input id="surname" placeholder="Rossi" className="font-body-green" style={{ borderRadius: "8px" }} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="font-body-green text-xs uppercase tracking-[0.15em] block mb-2" style={{ color: "hsl(140 10% 40%)" }}>Email</label>
                    <Input id="email" type="email" placeholder="mario.rossi@email.it" className="font-body-green" style={{ borderRadius: "8px" }} />
                  </div>

                  <div>
                    <label htmlFor="interest" className="font-body-green text-xs uppercase tracking-[0.15em] block mb-2" style={{ color: "hsl(140 10% 40%)" }}>Area di interesse</label>
                    <Select>
                      <SelectTrigger id="interest" className="font-body-green" style={{ borderRadius: "8px" }}>
                        <SelectValue placeholder="Seleziona..." />
                      </SelectTrigger>
                      <SelectContent style={{ borderRadius: "8px" }}>
                        <SelectItem value="conservatory">Serre & Verande</SelectItem>
                        <SelectItem value="botanical">Progettazione Botanica</SelectItem>
                        <SelectItem value="furniture">Arredi Veranda</SelectItem>
                        <SelectItem value="care">Cura del Verde</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer pt-2">
                    <Checkbox checked={privacyAccepted} onCheckedChange={(c) => setPrivacyAccepted(c === true)} className="mt-0.5" />
                    <span className="font-body-green text-xs leading-relaxed" style={{ color: "hsl(140 10% 40%)" }}>
                      Accetto la Privacy Policy e acconsento al trattamento dei dati.
                    </span>
                  </label>

                  <Button
                    type="submit"
                    className="w-full font-body-green text-sm py-5 uppercase tracking-[0.15em]"
                    style={{
                      backgroundColor: privacyAccepted ? "hsl(145 45% 32%)" : "hsl(140 15% 85%)",
                      color: "hsl(140 25% 98%)",
                      borderRadius: "8px",
                      cursor: privacyAccepted ? "pointer" : "not-allowed",
                    }}
                    disabled={!privacyAccepted}
                  >
                    Prenota Visita
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <div className="mt-16 flex flex-col md:flex-row justify-center gap-8 md:gap-16">
              <div>
                <p className="font-body-green text-[10px] uppercase tracking-[0.3em] mb-1" style={{ color: "hsl(140 10% 50%)" }}>Telefono</p>
                <a href="tel:+390309912345" className="font-display-green text-lg italic" style={{ color: "hsl(150 30% 10%)" }}>+39 030 991 2345</a>
              </div>
              <div>
                <p className="font-body-green text-[10px] uppercase tracking-[0.3em] mb-1" style={{ color: "hsl(140 10% 50%)" }}>Email</p>
                <a href="mailto:serra@casaegiardino.it" className="font-display-green text-lg italic" style={{ color: "hsl(150 30% 10%)" }}>serra@casaegiardino.it</a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            FOOTER
        ═══════════════════════════════════════════════════════════════════════ */}
        <footer className="py-16 px-6 md:px-12 lg:px-20 border-t" style={{ borderColor: "hsl(140 15% 85%)", backgroundColor: "hsl(140 20% 95%)" }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            <div className="md:col-span-4">
              <h3 className="font-display-green text-3xl italic mb-4" style={{ color: "hsl(145 45% 32%)" }}>Casa & Giardino</h3>
              <p className="font-body-green text-sm max-w-xs" style={{ color: "hsl(140 10% 40%)" }}>
                Serre e giardini d'inverno dal 1998. Sul Lago di Garda.
              </p>
            </div>

            <div className="md:col-span-3">
              <p className="font-body-green text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: "hsl(140 10% 50%)" }}>Showroom</p>
              <address className="font-body-green text-sm not-italic" style={{ color: "hsl(140 10% 40%)" }}>
                Via del Lago, 42<br />25015 Desenzano del Garda<br />Brescia, Italia
              </address>
            </div>

            <div className="md:col-span-3">
              <p className="font-body-green text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: "hsl(140 10% 50%)" }}>Orari Serra</p>
              <p className="font-body-green text-sm" style={{ color: "hsl(140 10% 40%)" }}>
                Mar - Dom: 9:00 - 18:00<br />Lun: Chiuso<br />Visite guidate su prenotazione
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="font-body-green text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: "hsl(140 10% 50%)" }}>Legal</p>
              <ul className="space-y-2">
                {["Privacy", "Cookie", "Terms"].map((link) => (
                  <li key={link}><a href="#" className="font-body-green text-sm" style={{ color: "hsl(140 10% 40%)" }}>{link}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: "hsl(140 15% 85%)" }}>
            <a href="/" className="font-body-green text-xs uppercase tracking-[0.2em] flex items-center gap-2" style={{ color: "hsl(140 10% 40%)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
              Torna alla Gallery
            </a>
            <span className="font-display-green text-sm italic" style={{ color: "hsl(145 45% 32%)" }}>45.4654° N, 10.6339° E</span>
          </div>

          <div className="mt-8 text-center">
            <p className="font-body-green text-[10px] uppercase tracking-[0.3em]" style={{ color: "hsl(140 10% 50%)" }}>
              2024 Casa & Giardino S.r.l. - CrazyOne UI / Greenhouse
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
