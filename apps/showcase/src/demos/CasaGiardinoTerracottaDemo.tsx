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
// TERRACOTTA - Collezione Outdoor/Giardino
// Inspired by: Mediterranean pottery, sun-baked earth, Tuscan gardens
// Typography: Libre Baskerville + DM Sans
// ═══════════════════════════════════════════════════════════════════════════════

const terracottaStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,400&display=swap');

  :root {
    --terra-bg: 28 35% 92%;
    --terra-fg: 20 40% 12%;
    --terra-card: 30 40% 96%;
    --terra-primary: 16 65% 48%;
    --terra-secondary: 45 30% 65%;
    --terra-accent: 150 25% 35%;
    --terra-muted: 25 15% 55%;
    --terra-border: 28 20% 78%;
  }

  .font-display-terra {
    font-family: 'Libre Baskerville', Georgia, serif;
    font-weight: 400;
  }

  .font-body-terra {
    font-family: 'DM Sans', -apple-system, sans-serif;
    font-weight: 400;
  }

  .text-hero-terra {
    font-size: clamp(3rem, 10vw, 9rem);
    line-height: 0.9;
    letter-spacing: -0.02em;
  }

  .text-display-terra {
    font-size: clamp(2rem, 5vw, 4.5rem);
    line-height: 1;
    letter-spacing: -0.01em;
  }

  @keyframes sunRise {
    from {
      opacity: 0;
      transform: translateY(60px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes warmGlow {
    0%, 100% {
      box-shadow: 0 0 0 0 hsl(16 65% 48% / 0.15);
    }
    50% {
      box-shadow: 0 0 40px 10px hsl(16 65% 48% / 0.08);
    }
  }

  @keyframes driftIn {
    from {
      opacity: 0;
      transform: translateX(-40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes potterySpin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* NEW: Swaying leaf animation */
  @keyframes leafSway {
    0%, 100% {
      transform: rotate(-3deg) translateX(0);
    }
    25% {
      transform: rotate(2deg) translateX(3px);
    }
    50% {
      transform: rotate(-1deg) translateX(-2px);
    }
    75% {
      transform: rotate(3deg) translateX(2px);
    }
  }

  @keyframes leafFloat {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 0.6;
    }
    90% {
      opacity: 0.6;
    }
    100% {
      transform: translateY(100vh) rotate(360deg);
      opacity: 0;
    }
  }

  /* NEW: Heat shimmer effect */
  @keyframes heatShimmer {
    0%, 100% {
      filter: blur(0px);
      transform: scaleY(1);
    }
    50% {
      filter: blur(0.3px);
      transform: scaleY(1.002);
    }
  }

  /* NEW: Warmth pulse on hover */
  @keyframes warmthPulse {
    0% {
      box-shadow:
        0 25px 50px -12px hsl(16 65% 48% / 0.25),
        inset 0 0 0 0 hsl(16 65% 48% / 0);
    }
    50% {
      box-shadow:
        0 30px 60px -12px hsl(16 65% 48% / 0.35),
        inset 0 0 30px 0 hsl(16 65% 48% / 0.05);
    }
    100% {
      box-shadow:
        0 25px 50px -12px hsl(16 65% 48% / 0.25),
        inset 0 0 0 0 hsl(16 65% 48% / 0);
    }
  }

  .animate-sun-rise {
    animation: sunRise 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  .animate-warm-glow {
    animation: warmGlow 4s ease-in-out infinite;
  }

  .animate-drift-in {
    animation: driftIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .animate-leaf-sway {
    animation: leafSway 4s ease-in-out infinite;
    transform-origin: top center;
  }

  .animate-heat-shimmer {
    animation: heatShimmer 3s ease-in-out infinite;
  }

  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
  .delay-500 { animation-delay: 500ms; }

  .hover-terracotta {
    transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
    position: relative;
  }

  .hover-terracotta::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(
      135deg,
      hsl(16 65% 48% / 0) 0%,
      hsl(16 65% 48% / 0) 100%
    );
    transition: background 0.5s ease;
    pointer-events: none;
  }

  .hover-terracotta:hover {
    transform: translateY(-6px) rotate(-1deg);
    animation: warmthPulse 2s ease-in-out infinite;
  }

  .hover-terracotta:hover::before {
    background: linear-gradient(
      135deg,
      hsl(16 65% 48% / 0.03) 0%,
      hsl(25 60% 55% / 0.05) 100%
    );
  }

  /* Enhanced terracotta texture */
  .texture-clay {
    position: relative;
  }

  .texture-clay::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"),
      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.5' numOctaves='2' seed='15'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E");
    opacity: 0.035;
    pointer-events: none;
    mix-blend-mode: multiply;
  }

  /* Subtle terracotta grain overlay */
  .texture-clay::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 20% 30%, hsl(16 65% 48% / 0.03) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 70%, hsl(25 60% 55% / 0.02) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, hsl(45 30% 65% / 0.02) 0%, transparent 70%);
    pointer-events: none;
  }

  /* Floating leaf element */
  .floating-leaf {
    position: fixed;
    width: 20px;
    height: 30px;
    pointer-events: none;
    z-index: 100;
    opacity: 0;
    animation: leafFloat 15s linear infinite;
  }

  .floating-leaf svg {
    width: 100%;
    height: 100%;
    fill: hsl(150 25% 35% / 0.4);
    animation: leafSway 3s ease-in-out infinite;
  }

  .floating-leaf:nth-child(1) { left: 10%; animation-delay: 0s; }
  .floating-leaf:nth-child(2) { left: 30%; animation-delay: 3s; }
  .floating-leaf:nth-child(3) { left: 50%; animation-delay: 6s; }
  .floating-leaf:nth-child(4) { left: 70%; animation-delay: 9s; }
  .floating-leaf:nth-child(5) { left: 90%; animation-delay: 12s; }

  /* Decorative olive branch */
  .olive-branch {
    position: absolute;
    pointer-events: none;
    opacity: 0.15;
  }

  .olive-branch svg {
    animation: leafSway 5s ease-in-out infinite;
    transform-origin: left center;
  }

  .gallery-scroll-terra {
    display: flex;
    gap: 2rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding: 2rem;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .gallery-scroll-terra::-webkit-scrollbar {
    display: none;
  }

  /* Card warmth effect on hover */
  .card-warmth {
    position: relative;
    overflow: hidden;
  }

  .card-warmth::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      hsl(16 65% 48% / 0.08) 0%,
      transparent 50%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .card-warmth:hover::after {
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-sun-rise,
    .animate-warm-glow,
    .animate-drift-in,
    .animate-leaf-sway,
    .animate-heat-shimmer,
    .hover-terracotta,
    .floating-leaf,
    .olive-branch svg {
      animation: none !important;
      transition: none !important;
    }

    .hover-terracotta:hover {
      animation: none !important;
      box-shadow: 0 25px 50px -12px hsl(16 65% 48% / 0.25);
    }
  }
`;

const SERVIZI = [
  {
    numeral: "I",
    title: "Sopralluogo",
    subtitle: "Site Visit",
    description: "Valutiamo il vostro spazio esterno. Analisi del terreno, esposizione solare, microclima. Progettazione su misura.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop&q=80",
  },
  {
    numeral: "II",
    title: "Concept Verde",
    subtitle: "Garden Design",
    description: "Selezione botanica. Armonie cromatiche stagionali. Sistemi di irrigazione intelligenti.",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&h=800&fit=crop&q=80",
  },
  {
    numeral: "III",
    title: "Arredo Esterno",
    subtitle: "Outdoor Living",
    description: "Mobili in teak, ferro battuto, pietra. Resistenza e bellezza per ogni stagione.",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&h=800&fit=crop&q=80",
  },
  {
    numeral: "IV",
    title: "Manutenzione",
    subtitle: "Care Program",
    description: "Programma annuale di cura. Potature, trattamenti, preparazione stagionale.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=800&fit=crop&q=80",
  },
];

const COLLEZIONI = [
  {
    id: "mediterraneo",
    name: "Collezione Mediterraneo",
    subtitle: "Terrace & Patio",
    price: "da / from 4.200",
    image: "https://images.unsplash.com/photo-1600566752229-250ed79470f8?w=800&h=1000&fit=crop&q=80",
    tag: "Bestseller",
  },
  {
    id: "agrumeto",
    name: "Collezione Agrumeto",
    subtitle: "Citrus Garden",
    price: "da / from 5.800",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=1000&fit=crop&q=80",
    tag: "Exclusive",
  },
  {
    id: "pergolato",
    name: "Collezione Pergolato",
    subtitle: "Shade Structures",
    price: "da / from 8.900",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&h=1000&fit=crop&q=80",
    tag: "Premium",
  },
  {
    id: "fontana",
    name: "Collezione Fontana",
    subtitle: "Water Features",
    price: "da / from 3.400",
    image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=800&h=1000&fit=crop&q=80",
    tag: "New 2024",
  },
  {
    id: "vasi",
    name: "Collezione Vasi",
    subtitle: "Planters & Urns",
    price: "da / from 890",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&h=1000&fit=crop&q=80",
    tag: "Handcrafted",
  },
];

const STATS = [
  { value: "180+", label: "Giardini realizzati", sublabel: "Gardens completed" },
  { value: "12", label: "Vivai partner", sublabel: "Partner nurseries" },
  { value: "4", label: "Stagioni di cura", sublabel: "Seasons of care" },
];

export function CasaGiardinoTerracottaDemo() {
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  const scrollGallery = (direction: "left" | "right") => {
    if (galleryRef.current) {
      const scrollAmount = 400;
      galleryRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <style>{terracottaStyles}</style>

      {/* Floating olive leaves */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className="floating-leaf" aria-hidden="true">
          <svg viewBox="0 0 24 36" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C12 0 4 8 4 18C4 28 12 36 12 36C12 36 20 28 20 18C20 8 12 0 12 0Z" />
            <path d="M12 6V30" stroke="hsl(150 25% 25%)" strokeWidth="0.5" fill="none" />
          </svg>
        </div>
      ))}

      <div
        className="texture-clay relative overflow-x-hidden"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          backgroundColor: "hsl(28 35% 92%)",
          color: "hsl(20 40% 12%)",
        }}
      >
        {/* ═══════════════════════════════════════════════════════════════════════
            HERO - Terracotta Warmth
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="min-h-screen relative">
          <nav className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-6 md:px-12 lg:px-20 py-6">
            <span
              className="font-display-terra text-2xl opacity-0 animate-drift-in"
              style={{ color: "hsl(16 65% 48%)" }}
            >
              C&G
            </span>
            <div className="flex items-center gap-8">
              <span
                className="font-body-terra text-xs uppercase tracking-[0.3em] opacity-0 animate-drift-in delay-100 hidden md:block"
                style={{ color: "hsl(25 15% 55%)" }}
              >
                Lago di Garda
              </span>
              <Badge
                className="font-body-terra text-[10px] px-4 py-2 uppercase tracking-[0.2em] opacity-0 animate-drift-in delay-200"
                style={{
                  backgroundColor: "hsl(16 65% 48%)",
                  color: "hsl(30 40% 96%)",
                  border: "none",
                  borderRadius: "9999px",
                }}
              >
                Outdoor Living
              </Badge>
            </div>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
            <div className="flex flex-col justify-center px-6 md:px-12 lg:px-20 py-32 lg:py-0 relative">
              {/* Decorative terracotta pot silhouette */}
              <div
                className="absolute -left-20 top-1/3 w-40 h-40 rounded-full opacity-10"
                style={{ backgroundColor: "hsl(16 65% 48%)" }}
                aria-hidden="true"
              />

              {/* Decorative olive branch */}
              <div className="olive-branch absolute -right-16 top-1/4 hidden lg:block" aria-hidden="true">
                <svg width="120" height="200" viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M60 0C60 0 60 200 60 200" stroke="hsl(150 25% 35%)" strokeWidth="2" />
                  <ellipse cx="40" cy="30" rx="15" ry="25" fill="hsl(150 25% 35%)" transform="rotate(-20 40 30)" />
                  <ellipse cx="80" cy="50" rx="15" ry="25" fill="hsl(150 25% 35%)" transform="rotate(20 80 50)" />
                  <ellipse cx="35" cy="80" rx="15" ry="25" fill="hsl(150 25% 35%)" transform="rotate(-25 35 80)" />
                  <ellipse cx="85" cy="110" rx="15" ry="25" fill="hsl(150 25% 35%)" transform="rotate(15 85 110)" />
                  <ellipse cx="40" cy="140" rx="15" ry="25" fill="hsl(150 25% 35%)" transform="rotate(-15 40 140)" />
                  <ellipse cx="75" cy="170" rx="15" ry="25" fill="hsl(150 25% 35%)" transform="rotate(25 75 170)" />
                </svg>
              </div>

              <p
                className="font-body-terra text-xs uppercase tracking-[0.5em] mb-8 opacity-0 animate-drift-in delay-300"
                style={{ color: "hsl(150 25% 35%)" }}
              >
                Vivere all'aperto
              </p>

              <h1 className="font-display-terra text-hero-terra italic opacity-0 animate-sun-rise delay-400">
                <span className="block" style={{ color: "hsl(20 40% 12%)" }}>Casa</span>
                <span className="block" style={{ color: "hsl(16 65% 48%)" }}>&</span>
                <span className="block" style={{ color: "hsl(20 40% 12%)" }}>Giardino</span>
              </h1>

              <p
                className="font-display-terra text-2xl md:text-3xl mt-10 max-w-md opacity-0 animate-drift-in delay-500"
                style={{ color: "hsl(25 15% 55%)" }}
              >
                Dove la terra
                <br />incontra il cielo
              </p>

              <p
                className="font-body-terra text-sm mt-4 opacity-0 animate-drift-in delay-500"
                style={{ color: "hsl(25 15% 45%)" }}
              >
                Where earth meets sky
              </p>

              <div className="mt-16 flex items-center gap-8 opacity-0 animate-drift-in delay-500">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center animate-warm-glow"
                  style={{ backgroundColor: "hsl(16 65% 48%)" }}
                >
                  <span className="font-display-terra text-lg" style={{ color: "hsl(30 40% 96%)" }}>26°</span>
                </div>
                <div>
                  <p className="font-body-terra text-[10px] uppercase tracking-[0.3em]" style={{ color: "hsl(25 15% 45%)" }}>
                    Temperatura ideale
                  </p>
                  <p className="font-display-terra text-lg" style={{ color: "hsl(16 65% 48%)" }}>
                    45.4654° N
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-[60vh] lg:h-auto opacity-0 animate-sun-rise delay-300">
              <div
                className="absolute inset-0 lg:inset-8 rounded-3xl overflow-hidden"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=1600&fit=crop&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                role="img"
                aria-label="Mediterranean terrace with terracotta pots and lush greenery"
              />
              <div
                className="absolute bottom-12 left-12 right-12 lg:left-20 lg:right-20 p-6 rounded-2xl"
                style={{ backgroundColor: "hsl(30 40% 96% / 0.95)", backdropFilter: "blur(10px)" }}
              >
                <p className="font-body-terra text-xs uppercase tracking-[0.2em] mb-2" style={{ color: "hsl(150 25% 35%)" }}>
                  Featured
                </p>
                <p className="font-display-terra text-xl" style={{ color: "hsl(20 40% 12%)" }}>
                  Collezione Mediterraneo 2024
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            PHILOSOPHY
        ═══════════════════════════════════════════════════════════════════════ */}
        <section
          className="py-32 md:py-48 px-6 md:px-12 lg:px-20"
          style={{ backgroundColor: "hsl(30 40% 96%)" }}
        >
          <div className="max-w-5xl">
            <p
              className="font-body-terra text-xs uppercase tracking-[0.5em] mb-8"
              style={{ color: "hsl(150 25% 35%)" }}
            >
              La nostra filosofia / Our philosophy
            </p>

            <h2 className="font-display-terra text-display-terra">
              <span style={{ color: "hsl(20 40% 12%)" }}>Il giardino è </span>
              <em style={{ color: "hsl(16 65% 48%)" }}>un'estensione</em>
              <br />
              <span style={{ color: "hsl(20 40% 12%)" }}>dell'anima.</span>
            </h2>

            <p
              className="font-body-terra text-lg mt-12 max-w-2xl leading-relaxed"
              style={{ color: "hsl(25 15% 45%)" }}
            >
              The garden is an extension of the soul. We craft outdoor spaces that
              breathe with the seasons, age with grace like terracotta under the sun,
              and become more beautiful with every passing year.
            </p>

            <div className="mt-16 flex gap-4">
              {["Teak", "Terracotta", "Pietra", "Ferro"].map((material) => (
                <span
                  key={material}
                  className="font-body-terra text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full"
                  style={{
                    backgroundColor: "hsl(16 65% 48% / 0.1)",
                    color: "hsl(16 65% 48%)",
                  }}
                >
                  {material}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SERVIZI - Organic Grid
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-24 md:py-40 px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <p
                className="font-body-terra text-xs uppercase tracking-[0.5em] mb-4"
                style={{ color: "hsl(25 15% 55%)" }}
              >
                Il nostro processo
              </p>
              <h2 className="font-display-terra text-display-terra italic">
                Quattro stagioni
              </h2>
              <p
                className="font-body-terra text-sm mt-2"
                style={{ color: "hsl(25 15% 45%)" }}
              >
                Four seasons of care
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVIZI.map((servizio, index) => (
              <Card
                key={servizio.numeral}
                className="hover-terracotta card-warmth group relative overflow-hidden"
                style={{
                  backgroundColor: "hsl(30 40% 96%)",
                  border: "none",
                  borderRadius: "1.5rem",
                  minHeight: "320px",
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
                  className="absolute inset-0 opacity-0 group-hover:opacity-80 transition-opacity duration-700"
                  style={{ backgroundColor: "hsl(30 40% 96%)" }}
                  aria-hidden="true"
                />

                <CardContent className="relative z-10 h-full flex flex-col justify-between p-8 lg:p-10">
                  <div className="flex justify-between items-start">
                    <span
                      className="font-display-terra text-6xl"
                      style={{ color: "hsl(16 65% 48% / 0.3)" }}
                      aria-hidden="true"
                    >
                      {servizio.numeral}
                    </span>
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "hsl(150 25% 35% / 0.1)" }}
                    >
                      <span style={{ color: "hsl(150 25% 35%)" }}>
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display-terra text-2xl italic">
                      {servizio.title}
                    </h3>
                    <p
                      className="font-body-terra text-xs uppercase tracking-[0.2em] mt-1"
                      style={{ color: "hsl(150 25% 35%)" }}
                    >
                      {servizio.subtitle}
                    </p>
                    <p
                      className="font-body-terra text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ color: "hsl(25 15% 45%)" }}
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
            COLLEZIONI - Horizontal Gallery
        ═══════════════════════════════════════════════════════════════════════ */}
        <section
          className="py-24 md:py-40"
          style={{ backgroundColor: "hsl(16 65% 48%)", color: "hsl(30 40% 96%)" }}
        >
          <div className="px-6 md:px-12 lg:px-20 mb-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div>
                <p
                  className="font-body-terra text-xs uppercase tracking-[0.5em] mb-4"
                  style={{ color: "hsl(45 30% 65%)" }}
                >
                  Le nostre collezioni
                </p>
                <h2 className="font-display-terra text-display-terra italic">
                  Outdoor Living
                </h2>
              </div>

              <div className="flex gap-3 mt-8 md:mt-0">
                <button
                  onClick={() => scrollGallery("left")}
                  className="w-12 h-12 flex items-center justify-center rounded-full border-2 transition-colors"
                  style={{ borderColor: "hsl(30 40% 96% / 0.3)" }}
                  aria-label="Scroll left"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollGallery("right")}
                  className="w-12 h-12 flex items-center justify-center rounded-full border-2 transition-colors"
                  style={{ borderColor: "hsl(30 40% 96% / 0.3)" }}
                  aria-label="Scroll right"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div
            ref={galleryRef}
            className="gallery-scroll-terra pl-6 md:pl-12 lg:pl-20 pr-6"
          >
            {COLLEZIONI.map((collezione) => (
              <article
                key={collezione.id}
                className="flex-shrink-0 group cursor-pointer"
                style={{ width: "340px" }}
              >
                <div
                  className="relative overflow-hidden mb-6 rounded-2xl"
                  style={{ aspectRatio: "4/5" }}
                >
                  <img
                    src={collezione.image}
                    alt={`${collezione.name} - ${collezione.subtitle}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <Badge
                    className="absolute top-4 left-4 font-body-terra text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: "hsl(30 40% 96%)",
                      color: "hsl(16 65% 48%)",
                      border: "none",
                    }}
                  >
                    {collezione.tag}
                  </Badge>
                </div>

                <h3 className="font-display-terra text-xl italic mb-1">
                  {collezione.name}
                </h3>
                <p
                  className="font-body-terra text-xs uppercase tracking-[0.15em] mb-3"
                  style={{ color: "hsl(30 40% 96% / 0.7)" }}
                >
                  {collezione.subtitle}
                </p>
                <p
                  className="font-display-terra text-lg"
                  style={{ color: "hsl(45 30% 65%)" }}
                >
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
              backgroundImage: "url('https://images.unsplash.com/photo-1600566752229-250ed79470f8?w=1920&h=1080&fit=crop&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
            role="img"
            aria-label="Outdoor showroom with garden furniture"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "hsl(20 40% 12% / 0.6)" }}
            aria-hidden="true"
          />

          <div className="relative z-10 min-h-[80vh] flex flex-col justify-end px-6 md:px-12 lg:px-20 py-20">
            <p
              className="font-body-terra text-xs uppercase tracking-[0.5em] mb-4"
              style={{ color: "hsl(45 30% 65%)" }}
            >
              Il nostro giardino showroom
            </p>
            <h2
              className="font-display-terra text-display-terra italic max-w-3xl"
              style={{ color: "hsl(30 40% 96%)" }}
            >
              5.000 mq di verde
              <br />
              <span style={{ color: "hsl(45 30% 65%)" }}>sul Lago di Garda</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-12 border-t" style={{ borderColor: "hsl(30 40% 96% / 0.2)" }}>
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p
                    className="font-display-terra text-5xl md:text-6xl mb-2"
                    style={{ color: "hsl(16 65% 48%)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="font-body-terra text-sm" style={{ color: "hsl(30 40% 96%)" }}>
                    {stat.label}
                  </p>
                  <p className="font-body-terra text-xs mt-0.5" style={{ color: "hsl(30 40% 96% / 0.6)" }}>
                    {stat.sublabel}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            CONTACT
        ═══════════════════════════════════════════════════════════════════════ */}
        <section
          className="py-32 md:py-48 px-6 md:px-12 lg:px-20"
          style={{ backgroundColor: "hsl(30 40% 96%)" }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <p
              className="font-body-terra text-xs uppercase tracking-[0.5em] mb-6"
              style={{ color: "hsl(150 25% 35%)" }}
            >
              Inizia il tuo progetto / Start your project
            </p>

            <h2 className="font-display-terra text-display-terra italic mb-8">
              Il tuo giardino
              <br />
              <span style={{ color: "hsl(16 65% 48%)" }}>ti aspetta</span>
            </h2>

            <p
              className="font-body-terra text-lg mb-12 max-w-xl mx-auto"
              style={{ color: "hsl(25 15% 45%)" }}
            >
              Prenota una visita al nostro giardino showroom.
              Scopri come trasformare il tuo spazio esterno.
            </p>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="font-body-terra text-sm px-12 py-6 uppercase tracking-[0.2em] hover-terracotta rounded-full"
                  style={{
                    backgroundColor: "hsl(16 65% 48%)",
                    color: "hsl(30 40% 96%)",
                    border: "none",
                  }}
                >
                  Prenota visita
                </Button>
              </DialogTrigger>
              <DialogContent
                className="max-w-lg"
                style={{
                  backgroundColor: "hsl(30 40% 96%)",
                  borderRadius: "1.5rem",
                  border: "none",
                }}
              >
                <DialogHeader className="pb-6 border-b" style={{ borderColor: "hsl(28 20% 85%)" }}>
                  <DialogTitle className="font-display-terra text-2xl italic">
                    Visita il Giardino
                  </DialogTitle>
                  <DialogDescription className="font-body-terra text-sm mt-2" style={{ color: "hsl(25 15% 45%)" }}>
                    Compila il form per prenotare una visita guidata.
                  </DialogDescription>
                </DialogHeader>

                <form className="space-y-5 pt-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="font-body-terra text-xs uppercase tracking-[0.15em] block mb-2" style={{ color: "hsl(25 15% 45%)" }}>
                        Nome
                      </label>
                      <Input id="contact-name" placeholder="Mario" className="font-body-terra rounded-xl" />
                    </div>
                    <div>
                      <label htmlFor="contact-surname" className="font-body-terra text-xs uppercase tracking-[0.15em] block mb-2" style={{ color: "hsl(25 15% 45%)" }}>
                        Cognome
                      </label>
                      <Input id="contact-surname" placeholder="Rossi" className="font-body-terra rounded-xl" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="font-body-terra text-xs uppercase tracking-[0.15em] block mb-2" style={{ color: "hsl(25 15% 45%)" }}>
                      Email
                    </label>
                    <Input id="contact-email" type="email" placeholder="mario.rossi@email.it" className="font-body-terra rounded-xl" />
                  </div>

                  <div>
                    <label htmlFor="contact-interest" className="font-body-terra text-xs uppercase tracking-[0.15em] block mb-2" style={{ color: "hsl(25 15% 45%)" }}>
                      Area di interesse
                    </label>
                    <Select>
                      <SelectTrigger id="contact-interest" className="font-body-terra rounded-xl">
                        <SelectValue placeholder="Seleziona..." />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="terrace">Terrace & Patio</SelectItem>
                        <SelectItem value="garden">Garden Design</SelectItem>
                        <SelectItem value="pergola">Pergole & Gazebo</SelectItem>
                        <SelectItem value="water">Water Features</SelectItem>
                        <SelectItem value="complete">Progetto Completo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer pt-2">
                    <Checkbox
                      checked={privacyAccepted}
                      onCheckedChange={(checked) => setPrivacyAccepted(checked === true)}
                      className="mt-0.5"
                    />
                    <span className="font-body-terra text-xs leading-relaxed" style={{ color: "hsl(25 15% 45%)" }}>
                      Accetto la Privacy Policy e acconsento al trattamento dei miei dati personali.
                    </span>
                  </label>

                  <Button
                    type="submit"
                    className="w-full font-body-terra text-sm py-5 uppercase tracking-[0.15em] rounded-xl"
                    style={{
                      backgroundColor: privacyAccepted ? "hsl(16 65% 48%)" : "hsl(28 20% 78%)",
                      color: "hsl(30 40% 96%)",
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
                <p className="font-body-terra text-[10px] uppercase tracking-[0.3em] mb-1" style={{ color: "hsl(25 15% 55%)" }}>
                  Telefono
                </p>
                <a href="tel:+390309912345" className="font-display-terra text-lg" style={{ color: "hsl(20 40% 12%)" }}>
                  +39 030 991 2345
                </a>
              </div>
              <div>
                <p className="font-body-terra text-[10px] uppercase tracking-[0.3em] mb-1" style={{ color: "hsl(25 15% 55%)" }}>
                  Email
                </p>
                <a href="mailto:giardino@casaegiardino.it" className="font-display-terra text-lg" style={{ color: "hsl(20 40% 12%)" }}>
                  giardino@casaegiardino.it
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            FOOTER
        ═══════════════════════════════════════════════════════════════════════ */}
        <footer
          className="py-16 px-6 md:px-12 lg:px-20 border-t"
          style={{ borderColor: "hsl(28 20% 78%)", backgroundColor: "hsl(28 35% 92%)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            <div className="md:col-span-4">
              <h3 className="font-display-terra text-3xl italic mb-4" style={{ color: "hsl(16 65% 48%)" }}>
                Casa & Giardino
              </h3>
              <p className="font-body-terra text-sm max-w-xs" style={{ color: "hsl(25 15% 45%)" }}>
                Outdoor living di lusso dal 1998.
                Sul Lago di Garda.
              </p>
            </div>

            <div className="md:col-span-3">
              <p className="font-body-terra text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: "hsl(25 15% 55%)" }}>
                Showroom
              </p>
              <address className="font-body-terra text-sm not-italic" style={{ color: "hsl(25 15% 45%)" }}>
                Via del Lago, 42<br />
                25015 Desenzano del Garda<br />
                Brescia, Italia
              </address>
            </div>

            <div className="md:col-span-3">
              <p className="font-body-terra text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: "hsl(25 15% 55%)" }}>
                Orari Giardino
              </p>
              <p className="font-body-terra text-sm" style={{ color: "hsl(25 15% 45%)" }}>
                Mar - Sab: 9:00 - 19:00<br />
                Dom: 10:00 - 17:00<br />
                Lun: Chiuso
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="font-body-terra text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: "hsl(25 15% 55%)" }}>
                Legal
              </p>
              <ul className="space-y-2">
                {["Privacy", "Cookie", "Terms"].map((link) => (
                  <li key={link}>
                    <a href="#" className="font-body-terra text-sm" style={{ color: "hsl(25 15% 45%)" }}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: "hsl(28 20% 78%)" }}>
            <a href="/" className="font-body-terra text-xs uppercase tracking-[0.2em] flex items-center gap-2" style={{ color: "hsl(25 15% 45%)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Torna alla Gallery
            </a>

            <span className="font-display-terra text-sm" style={{ color: "hsl(16 65% 48%)" }}>
              45.4654° N, 10.6339° E
            </span>
          </div>

          <div className="mt-8 text-center">
            <p className="font-body-terra text-[10px] uppercase tracking-[0.3em]" style={{ color: "hsl(25 15% 55%)" }}>
              2024 Casa & Giardino S.r.l. - CrazyOne UI / Terracotta
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
