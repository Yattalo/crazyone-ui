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

// Import theme CSS as base
import "@crazyone/ui-brutalist/styles.css";

// ═══════════════════════════════════════════════════════════════════════════════
// BRUTALIST RAFFINATO - Tadao Ando meets Acne Studios meets Van Duysen
// ═══════════════════════════════════════════════════════════════════════════════

const luxuryStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500&display=swap');

  :root {
    --lux-bg: 30 11% 89%;
    --lux-fg: 0 0% 10%;
    --lux-card: 30 20% 97%;
    --lux-primary: 20 70% 46%;
    --lux-secondary: 90 8% 48%;
    --lux-accent: 30 36% 58%;
    --lux-muted: 0 0% 35%;
    --lux-border: 30 8% 70%;
  }

  /* ─────────────────────────────────────────────────────────────────────────────
     TYPOGRAPHY SYSTEM
  ───────────────────────────────────────────────────────────────────────────── */

  .font-display {
    font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
    font-weight: 500;
  }

  .font-body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    font-weight: 400;
  }

  .text-hero {
    font-size: clamp(3.5rem, 12vw, 11rem);
    line-height: 0.85;
    letter-spacing: -0.03em;
  }

  .text-display {
    font-size: clamp(2.5rem, 6vw, 5rem);
    line-height: 0.95;
    letter-spacing: -0.02em;
  }

  .text-statement {
    font-size: clamp(1.5rem, 3.5vw, 3rem);
    line-height: 1.2;
  }

  /* ─────────────────────────────────────────────────────────────────────────────
     ANIMATIONS - GPU-accelerated, transform/opacity only
  ───────────────────────────────────────────────────────────────────────────── */

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

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-60px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(60px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  @keyframes grain {
    0%, 100% { transform: translate(0, 0); }
    10% { transform: translate(-5%, -10%); }
    30% { transform: translate(3%, -15%); }
    50% { transform: translate(12%, 9%); }
    70% { transform: translate(9%, 4%); }
    90% { transform: translate(-1%, 7%); }
  }

  .animate-fade-up {
    animation: fadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .animate-fade-in {
    animation: fadeIn 1.2s ease-out forwards;
  }

  .animate-slide-left {
    animation: slideInLeft 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .animate-slide-right {
    animation: slideInRight 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .animate-marquee {
    animation: marquee 40s linear infinite;
  }

  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
  .delay-500 { animation-delay: 500ms; }
  .delay-600 { animation-delay: 600ms; }

  /* ─────────────────────────────────────────────────────────────────────────────
     MICRO-INTERACTIONS
  ───────────────────────────────────────────────────────────────────────────── */

  .hover-lift {
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: transform;
  }

  .hover-lift:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.15);
  }

  .hover-scale {
    transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: transform;
  }

  .hover-scale:hover {
    transform: scale(1.03);
  }

  .hover-reveal .reveal-content {
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .hover-reveal:hover .reveal-content {
    opacity: 1;
    transform: translateY(0);
  }

  .hover-line::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: hsl(var(--lux-primary));
    transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .hover-line:hover::after {
    width: 100%;
  }

  /* ─────────────────────────────────────────────────────────────────────────────
     TEXTURE & DEPTH
  ───────────────────────────────────────────────────────────────────────────── */

  .grain-overlay::before {
    content: '';
    position: fixed;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    opacity: 0.025;
    pointer-events: none;
    animation: grain 8s steps(10) infinite;
    z-index: 1000;
  }

  /* ─────────────────────────────────────────────────────────────────────────────
     HORIZONTAL SCROLL GALLERY
  ───────────────────────────────────────────────────────────────────────────── */

  .gallery-scroll {
    display: flex;
    gap: 1.5rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding: 2rem;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .gallery-scroll::-webkit-scrollbar {
    display: none;
  }

  .gallery-item {
    flex: 0 0 auto;
    scroll-snap-align: start;
  }

  /* ─────────────────────────────────────────────────────────────────────────────
     REDUCED MOTION
  ───────────────────────────────────────────────────────────────────────────── */

  @media (prefers-reduced-motion: reduce) {
    .animate-fade-up,
    .animate-fade-in,
    .animate-slide-left,
    .animate-slide-right,
    .animate-marquee,
    .hover-lift,
    .hover-scale,
    .hover-reveal .reveal-content,
    .grain-overlay::before {
      animation: none !important;
      transform: none !important;
      transition: none !important;
    }
  }
`;

// ═══════════════════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════════════════

const SERVIZI = [
  {
    numeral: "I",
    title: "Consulenza",
    subtitle: "Consultation",
    description: "Analisi architettonica dello spazio. Comprensione delle esigenze estetiche e funzionali. Proposta di concept su misura.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=800&fit=crop&q=80",
  },
  {
    numeral: "II",
    title: "Progettazione",
    subtitle: "Design",
    description: "Sviluppo del progetto in dettaglio. Selezione materiali e finiture. Visualizzazione 3D fotorealistica.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=800&fit=crop&q=80",
  },
  {
    numeral: "III",
    title: "Realizzazione",
    subtitle: "Execution",
    description: "Coordinamento artigiani e fornitori. Gestione tempi e qualita. Cura del dettaglio in ogni fase.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=800&fit=crop&q=80",
  },
  {
    numeral: "IV",
    title: "Consegna",
    subtitle: "Delivery",
    description: "Installazione professionale. Verifica finale di ogni elemento. Assistenza post-vendita dedicata.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=800&fit=crop&q=80",
  },
];

const COLLEZIONI = [
  {
    id: "garda",
    name: "Collezione Garda",
    subtitle: "Living & Lounge",
    price: "da / from 8.900",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=1000&fit=crop&q=80",
    tag: "Bestseller",
  },
  {
    id: "sirmione",
    name: "Collezione Sirmione",
    subtitle: "Dining & Kitchen",
    price: "da / from 6.500",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&h=1000&fit=crop&q=80",
    tag: "New 2024",
  },
  {
    id: "malcesine",
    name: "Collezione Malcesine",
    subtitle: "Bedroom & Suite",
    price: "da / from 7.200",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=1000&fit=crop&q=80",
    tag: "Premium",
  },
  {
    id: "gardone",
    name: "Collezione Gardone",
    subtitle: "Outdoor & Terrace",
    price: "da / from 5.400",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=1000&fit=crop&q=80",
    tag: "Exclusive",
  },
  {
    id: "limone",
    name: "Collezione Limone",
    subtitle: "Accessories & Lighting",
    price: "da / from 890",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=1000&fit=crop&q=80",
    tag: "Curated",
  },
];

const STATS = [
  { value: "XXVI", label: "Anni di esperienza", sublabel: "Years of experience" },
  { value: "2.847", label: "Progetti completati", sublabel: "Projects completed" },
  { value: "45+", label: "Brand partner", sublabel: "Partner brands" },
];

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export function CasaGiardinoDemo() {
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
      <style>{luxuryStyles}</style>
      <div
        className="grain-overlay relative overflow-x-hidden"
        style={{
          fontFamily: "'Inter', sans-serif",
          backgroundColor: "hsl(30 11% 89%)",
          color: "hsl(0 0% 10%)",
        }}
      >
        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 1: HERO - Split Layout with Asymmetric Typography
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="min-h-screen relative">
          {/* Navigation Minimal */}
          <nav className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-6 md:px-12 lg:px-20 py-6">
            <span
              className="font-display text-xl tracking-wide opacity-0 animate-fade-in"
              style={{ color: "hsl(0 0% 10%)" }}
            >
              C&G
            </span>
            <div className="flex items-center gap-8">
              <span
                className="font-body text-xs uppercase tracking-[0.3em] opacity-0 animate-fade-in delay-100 hidden md:block"
                style={{ color: "hsl(0 0% 35%)" }}
              >
                Desenzano del Garda
              </span>
              <Badge
                className="font-body text-[10px] px-3 py-1.5 uppercase tracking-[0.2em] opacity-0 animate-fade-in delay-200"
                style={{
                  backgroundColor: "hsl(90 8% 48%)",
                  color: "hsl(30 20% 97%)",
                  border: "none",
                  borderRadius: "0",
                }}
              >
                Since 1998
              </Badge>
            </div>
          </nav>

          {/* Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
            {/* Left: Typography */}
            <div className="flex flex-col justify-center px-6 md:px-12 lg:px-20 py-32 lg:py-0 relative">
              {/* Decorative Line */}
              <div
                className="absolute left-6 md:left-12 lg:left-20 top-1/4 w-px h-24 opacity-0 animate-fade-in delay-200"
                style={{ backgroundColor: "hsl(30 36% 58%)" }}
                aria-hidden="true"
              />

              <p
                className="font-body text-xs uppercase tracking-[0.4em] mb-6 opacity-0 animate-slide-left delay-300"
                style={{ color: "hsl(0 0% 35%)" }}
              >
                Arredamento di lusso
              </p>

              <h1 className="font-display text-hero uppercase opacity-0 animate-slide-left delay-400">
                <span className="block" style={{ color: "hsl(0 0% 10%)" }}>Casa</span>
                <span className="block -mt-2 md:-mt-4" style={{ color: "hsl(20 70% 46%)" }}>&</span>
                <span className="block -mt-2 md:-mt-4" style={{ color: "hsl(0 0% 10%)" }}>Giardino</span>
              </h1>

              <p
                className="font-display text-statement italic mt-8 max-w-md opacity-0 animate-fade-up delay-500"
                style={{ color: "hsl(0 0% 35%)" }}
              >
                L'eleganza che nasce
                <br />dalla materia
              </p>

              <p
                className="font-body text-sm mt-4 opacity-0 animate-fade-up delay-600"
                style={{ color: "hsl(0 0% 45%)" }}
              >
                Elegance born from matter
              </p>

              {/* Coordinates */}
              <div className="mt-16 opacity-0 animate-fade-in delay-600">
                <p
                  className="font-body text-[10px] uppercase tracking-[0.4em] mb-2"
                  style={{ color: "hsl(0 0% 45%)" }}
                >
                  Showroom Location
                </p>
                <p
                  className="font-display text-2xl"
                  style={{ color: "hsl(30 36% 58%)" }}
                >
                  45.4654° N, 10.6339° E
                </p>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative h-[60vh] lg:h-auto opacity-0 animate-fade-in delay-300">
              <div
                className="absolute inset-0 lg:inset-y-20 lg:right-0 lg:left-8"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&h=1600&fit=crop&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                role="img"
                aria-label="Elegant living room interior with contemporary furniture"
              />
              {/* Overlay gradient */}
              <div
                className="absolute inset-0 lg:inset-y-20 lg:right-0 lg:left-8"
                style={{
                  background: "linear-gradient(to bottom, transparent 60%, hsl(30 11% 89% / 0.3))"
                }}
                aria-hidden="true"
              />
              {/* Floating stat */}
              <div
                className="absolute bottom-8 right-8 lg:bottom-28 lg:right-12 text-right opacity-0 animate-fade-up delay-500"
              >
                <p
                  className="font-display text-6xl lg:text-7xl"
                  style={{ color: "hsl(30 20% 97%)" }}
                >
                  XXVI
                </p>
                <p
                  className="font-body text-xs uppercase tracking-[0.2em] mt-1"
                  style={{ color: "hsl(30 20% 97% / 0.8)" }}
                >
                  Anni / Years
                </p>
              </div>
            </div>
          </div>

          {/* Marquee Strip */}
          <div
            className="absolute bottom-0 left-0 right-0 py-4 overflow-hidden"
            style={{
              backgroundColor: "hsl(0 0% 10%)",
              color: "hsl(30 20% 97%)"
            }}
            aria-hidden="true"
          >
            <div className="animate-marquee flex whitespace-nowrap">
              {[...Array(6)].map((_, i) => (
                <span key={i} className="font-body text-[10px] uppercase tracking-[0.5em] px-12">
                  Consulenza  Progettazione  Realizzazione  Consegna
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 2: PHILOSOPHY - Typographic Statement
        ═══════════════════════════════════════════════════════════════════════ */}
        <section
          className="py-32 md:py-48 px-6 md:px-12 lg:px-20"
          style={{ backgroundColor: "hsl(30 20% 97%)" }}
        >
          <div className="max-w-5xl">
            <p
              className="font-body text-xs uppercase tracking-[0.4em] mb-8"
              style={{ color: "hsl(90 8% 48%)" }}
            >
              La nostra filosofia / Our philosophy
            </p>

            <h2 className="font-display text-display leading-tight">
              <span style={{ color: "hsl(0 0% 10%)" }}>Dal </span>
              <span style={{ color: "hsl(20 70% 46%)" }}>1998</span>
              <span style={{ color: "hsl(0 0% 10%)" }}>, trasformiamo</span>
              <br />
              <span style={{ color: "hsl(0 0% 10%)" }}>spazi in </span>
              <em className="not-italic" style={{ color: "hsl(30 36% 58%)" }}>santuari</em>
              <br />
              <span style={{ color: "hsl(0 0% 10%)" }}>di bellezza.</span>
            </h2>

            <p
              className="font-body text-lg mt-12 max-w-2xl"
              style={{ color: "hsl(0 0% 35%)" }}
            >
              Since 1998, we transform spaces into sanctuaries of beauty.
              Every piece we curate tells a story of craftsmanship,
              material integrity, and timeless design.
            </p>

            {/* Decorative line */}
            <div
              className="mt-16 w-32 h-px"
              style={{ backgroundColor: "hsl(30 8% 70%)" }}
              aria-hidden="true"
            />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 3: SERVIZI - Asymmetric Bento Grid
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-24 md:py-40 px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <p
                className="font-body text-xs uppercase tracking-[0.4em] mb-4"
                style={{ color: "hsl(0 0% 35%)" }}
              >
                Il nostro processo
              </p>
              <h2 className="font-display text-display">
                Quattro fasi
              </h2>
              <p
                className="font-body text-sm mt-2"
                style={{ color: "hsl(0 0% 45%)" }}
              >
                Four phases
              </p>
            </div>
            <p
              className="font-display text-6xl md:text-8xl mt-6 md:mt-0"
              style={{ color: "hsl(30 8% 80%)" }}
              aria-hidden="true"
            >
              I-IV
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6">
            {SERVIZI.map((servizio, index) => {
              // Asymmetric grid spans
              const gridClasses = [
                "lg:col-span-7 lg:row-span-2",  // Large
                "lg:col-span-5",                 // Medium top
                "lg:col-span-5",                 // Medium bottom
                "lg:col-span-7",                 // Wide
              ][index];

              const isLarge = index === 0;

              return (
                <Card
                  key={servizio.numeral}
                  className={`hover-reveal hover-lift group relative overflow-hidden ${gridClasses}`}
                  style={{
                    backgroundColor: "hsl(30 20% 97%)",
                    border: "1px solid hsl(30 8% 80%)",
                    borderRadius: "2px",
                    minHeight: isLarge ? "500px" : "280px",
                  }}
                >
                  {/* Background Image */}
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
                    className="absolute inset-0 opacity-0 group-hover:opacity-90 transition-opacity duration-700"
                    style={{ backgroundColor: "hsl(30 20% 97%)" }}
                    aria-hidden="true"
                  />

                  <CardContent className="relative z-10 h-full flex flex-col justify-between p-8 lg:p-10">
                    <div>
                      <span
                        className="font-display text-5xl lg:text-6xl block mb-4"
                        style={{ color: "hsl(20 70% 46%)" }}
                        aria-hidden="true"
                      >
                        {servizio.numeral}
                      </span>
                      <h3 className="font-display text-2xl lg:text-3xl">
                        {servizio.title}
                      </h3>
                      <p
                        className="font-body text-xs uppercase tracking-[0.2em] mt-1"
                        style={{ color: "hsl(90 8% 48%)" }}
                      >
                        {servizio.subtitle}
                      </p>
                    </div>

                    <p
                      className="reveal-content font-body text-sm mt-6 max-w-sm"
                      style={{ color: "hsl(0 0% 35%)" }}
                    >
                      {servizio.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 4: COLLEZIONI - Horizontal Scroll Gallery
        ═══════════════════════════════════════════════════════════════════════ */}
        <section
          className="py-24 md:py-40"
          style={{ backgroundColor: "hsl(0 0% 10%)", color: "hsl(30 20% 97%)" }}
        >
          <div className="px-6 md:px-12 lg:px-20 mb-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div>
                <p
                  className="font-body text-xs uppercase tracking-[0.4em] mb-4"
                  style={{ color: "hsl(30 36% 58%)" }}
                >
                  Le nostre collezioni
                </p>
                <h2 className="font-display text-display">
                  Cinque mondi
                </h2>
                <p
                  className="font-body text-sm mt-2"
                  style={{ color: "hsl(30 8% 65%)" }}
                >
                  Five worlds to explore
                </p>
              </div>

              {/* Gallery Navigation */}
              <div className="flex gap-3 mt-8 md:mt-0">
                <button
                  onClick={() => scrollGallery("left")}
                  className="w-12 h-12 flex items-center justify-center border transition-colors hover:bg-white/10"
                  style={{
                    borderColor: "hsl(30 8% 40%)",
                    borderRadius: "2px",
                  }}
                  aria-label="Scroll gallery left"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollGallery("right")}
                  className="w-12 h-12 flex items-center justify-center border transition-colors hover:bg-white/10"
                  style={{
                    borderColor: "hsl(30 8% 40%)",
                    borderRadius: "2px",
                  }}
                  aria-label="Scroll gallery right"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div
            ref={galleryRef}
            className="gallery-scroll pl-6 md:pl-12 lg:pl-20 pr-6"
          >
            {COLLEZIONI.map((collezione) => (
              <article
                key={collezione.id}
                className="gallery-item hover-scale group cursor-pointer"
                style={{ width: "320px" }}
              >
                {/* Image Container */}
                <div
                  className="relative overflow-hidden mb-6"
                  style={{
                    aspectRatio: "4/5",
                    borderRadius: "2px",
                  }}
                >
                  <img
                    src={collezione.image}
                    alt={`${collezione.name} - ${collezione.subtitle}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Tag */}
                  <Badge
                    className="absolute top-4 left-4 font-body text-[10px] uppercase tracking-[0.15em] px-3 py-1.5"
                    style={{
                      backgroundColor: "hsl(30 20% 97%)",
                      color: "hsl(0 0% 10%)",
                      border: "none",
                      borderRadius: "0",
                    }}
                  >
                    {collezione.tag}
                  </Badge>
                </div>

                {/* Info */}
                <h3 className="font-display text-xl mb-1">
                  {collezione.name}
                </h3>
                <p
                  className="font-body text-xs uppercase tracking-[0.15em] mb-3"
                  style={{ color: "hsl(30 8% 55%)" }}
                >
                  {collezione.subtitle}
                </p>
                <p
                  className="font-display text-lg"
                  style={{ color: "hsl(30 36% 58%)" }}
                >
                  {collezione.price}
                </p>
              </article>
            ))}
            {/* Spacer for last item */}
            <div className="flex-shrink-0 w-8" aria-hidden="true" />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 5: SHOWROOM - Full Bleed with Stats Overlay
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[80vh]">
          {/* Background Image */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1920&h=1080&fit=crop&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
            role="img"
            aria-label="Luxurious showroom interior"
          />
          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "hsl(0 0% 10% / 0.65)" }}
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10 min-h-[80vh] flex flex-col justify-end px-6 md:px-12 lg:px-20 py-20">
            <p
              className="font-body text-xs uppercase tracking-[0.4em] mb-4"
              style={{ color: "hsl(30 36% 58%)" }}
            >
              Il nostro showroom
            </p>
            <h2
              className="font-display text-display max-w-3xl"
              style={{ color: "hsl(30 20% 97%)" }}
            >
              3.000 mq di ispirazione
              <br />
              <span style={{ color: "hsl(30 8% 65%)" }}>sul Lago di Garda</span>
            </h2>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-12 border-t" style={{ borderColor: "hsl(30 20% 97% / 0.2)" }}>
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p
                    className="font-display text-5xl md:text-6xl mb-2"
                    style={{ color: "hsl(20 70% 46%)" }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="font-body text-sm"
                    style={{ color: "hsl(30 20% 97%)" }}
                  >
                    {stat.label}
                  </p>
                  <p
                    className="font-body text-xs mt-0.5"
                    style={{ color: "hsl(30 8% 55%)" }}
                  >
                    {stat.sublabel}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 6: CONTACT - CTA with Dialog
        ═══════════════════════════════════════════════════════════════════════ */}
        <section
          className="py-32 md:py-48 px-6 md:px-12 lg:px-20"
          style={{ backgroundColor: "hsl(30 20% 97%)" }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <p
              className="font-body text-xs uppercase tracking-[0.4em] mb-6"
              style={{ color: "hsl(90 8% 48%)" }}
            >
              Inizia il tuo progetto / Start your project
            </p>

            <h2 className="font-display text-display mb-8">
              Ogni grande spazio
              <br />
              <span style={{ color: "hsl(20 70% 46%)" }}>inizia da una conversazione</span>
            </h2>

            <p
              className="font-body text-lg mb-12 max-w-xl mx-auto"
              style={{ color: "hsl(0 0% 35%)" }}
            >
              Prenota una consulenza gratuita presso il nostro showroom.
              I nostri esperti ti guideranno nella creazione del tuo spazio ideale.
            </p>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="font-body text-sm px-12 py-6 uppercase tracking-[0.2em] hover-lift"
                  style={{
                    backgroundColor: "hsl(0 0% 10%)",
                    color: "hsl(30 20% 97%)",
                    borderRadius: "2px",
                    border: "none",
                  }}
                >
                  Prenota consulenza
                </Button>
              </DialogTrigger>
              <DialogContent
                className="max-w-lg"
                style={{
                  backgroundColor: "hsl(30 20% 97%)",
                  borderRadius: "2px",
                  border: "1px solid hsl(30 8% 80%)",
                }}
              >
                <DialogHeader className="pb-6 border-b" style={{ borderColor: "hsl(30 8% 85%)" }}>
                  <DialogTitle className="font-display text-2xl">
                    Richiedi Consulenza
                  </DialogTitle>
                  <DialogDescription
                    className="font-body text-sm mt-2"
                    style={{ color: "hsl(0 0% 35%)" }}
                  >
                    Compila il form per essere ricontattato entro 24 ore.
                  </DialogDescription>
                </DialogHeader>

                <form className="space-y-5 pt-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="font-body text-xs uppercase tracking-[0.15em] block mb-2"
                        style={{ color: "hsl(0 0% 35%)" }}
                      >
                        Nome
                      </label>
                      <Input
                        id="contact-name"
                        placeholder="Mario"
                        className="font-body"
                        style={{ borderRadius: "2px" }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-surname"
                        className="font-body text-xs uppercase tracking-[0.15em] block mb-2"
                        style={{ color: "hsl(0 0% 35%)" }}
                      >
                        Cognome
                      </label>
                      <Input
                        id="contact-surname"
                        placeholder="Rossi"
                        className="font-body"
                        style={{ borderRadius: "2px" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="font-body text-xs uppercase tracking-[0.15em] block mb-2"
                      style={{ color: "hsl(0 0% 35%)" }}
                    >
                      Email
                    </label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="mario.rossi@email.it"
                      className="font-body"
                      style={{ borderRadius: "2px" }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="font-body text-xs uppercase tracking-[0.15em] block mb-2"
                      style={{ color: "hsl(0 0% 35%)" }}
                    >
                      Telefono
                    </label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      placeholder="+39 333 123 4567"
                      className="font-body"
                      style={{ borderRadius: "2px" }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-interest"
                      className="font-body text-xs uppercase tracking-[0.15em] block mb-2"
                      style={{ color: "hsl(0 0% 35%)" }}
                    >
                      Area di interesse
                    </label>
                    <Select>
                      <SelectTrigger
                        id="contact-interest"
                        className="font-body"
                        style={{ borderRadius: "2px" }}
                      >
                        <SelectValue placeholder="Seleziona..." />
                      </SelectTrigger>
                      <SelectContent style={{ borderRadius: "2px" }}>
                        <SelectItem value="living">Living & Lounge</SelectItem>
                        <SelectItem value="dining">Dining & Kitchen</SelectItem>
                        <SelectItem value="bedroom">Bedroom & Suite</SelectItem>
                        <SelectItem value="outdoor">Outdoor & Terrace</SelectItem>
                        <SelectItem value="complete">Progetto Completo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer pt-2">
                    <Checkbox
                      id="contact-privacy"
                      checked={privacyAccepted}
                      onCheckedChange={(checked) => setPrivacyAccepted(checked === true)}
                      className="mt-0.5"
                    />
                    <span
                      className="font-body text-xs leading-relaxed"
                      style={{ color: "hsl(0 0% 35%)" }}
                    >
                      Accetto la Privacy Policy e acconsento al trattamento dei miei dati personali per essere ricontattato.
                    </span>
                  </label>

                  <Button
                    type="submit"
                    className="w-full font-body text-sm py-5 uppercase tracking-[0.15em]"
                    style={{
                      backgroundColor: privacyAccepted ? "hsl(20 70% 46%)" : "hsl(30 8% 70%)",
                      color: "hsl(30 20% 97%)",
                      borderRadius: "2px",
                      cursor: privacyAccepted ? "pointer" : "not-allowed",
                    }}
                    disabled={!privacyAccepted}
                  >
                    Invia Richiesta
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            {/* Contact info minimal */}
            <div className="mt-16 flex flex-col md:flex-row justify-center gap-8 md:gap-16">
              <div>
                <p
                  className="font-body text-[10px] uppercase tracking-[0.3em] mb-1"
                  style={{ color: "hsl(0 0% 45%)" }}
                >
                  Telefono
                </p>
                <a
                  href="tel:+390309912345"
                  className="font-display text-lg hover-line relative inline-block"
                  style={{ color: "hsl(0 0% 10%)" }}
                >
                  +39 030 991 2345
                </a>
              </div>
              <div>
                <p
                  className="font-body text-[10px] uppercase tracking-[0.3em] mb-1"
                  style={{ color: "hsl(0 0% 45%)" }}
                >
                  Email
                </p>
                <a
                  href="mailto:info@casaegiardino.it"
                  className="font-display text-lg hover-line relative inline-block"
                  style={{ color: "hsl(0 0% 10%)" }}
                >
                  info@casaegiardino.it
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 7: FOOTER - Minimal Architectural
        ═══════════════════════════════════════════════════════════════════════ */}
        <footer
          className="py-16 px-6 md:px-12 lg:px-20 border-t"
          style={{
            borderColor: "hsl(30 8% 75%)",
            backgroundColor: "hsl(30 11% 89%)"
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            {/* Brand */}
            <div className="md:col-span-4">
              <h3 className="font-display text-3xl mb-4">
                Casa & Giardino
              </h3>
              <p
                className="font-body text-sm max-w-xs"
                style={{ color: "hsl(0 0% 35%)" }}
              >
                Arredamento di lusso per interni ed esterni dal 1998.
                Sul Lago di Garda.
              </p>
            </div>

            {/* Address */}
            <div className="md:col-span-3">
              <p
                className="font-body text-[10px] uppercase tracking-[0.3em] mb-4"
                style={{ color: "hsl(0 0% 45%)" }}
              >
                Showroom
              </p>
              <address
                className="font-body text-sm not-italic"
                style={{ color: "hsl(0 0% 35%)" }}
              >
                Via del Lago, 42<br />
                25015 Desenzano del Garda<br />
                Brescia, Italia
              </address>
            </div>

            {/* Hours */}
            <div className="md:col-span-3">
              <p
                className="font-body text-[10px] uppercase tracking-[0.3em] mb-4"
                style={{ color: "hsl(0 0% 45%)" }}
              >
                Orari
              </p>
              <p
                className="font-body text-sm"
                style={{ color: "hsl(0 0% 35%)" }}
              >
                Lun - Ven: 9:00 - 19:00<br />
                Sab: 10:00 - 18:00<br />
                Dom: Su appuntamento
              </p>
            </div>

            {/* Legal */}
            <div className="md:col-span-2">
              <p
                className="font-body text-[10px] uppercase tracking-[0.3em] mb-4"
                style={{ color: "hsl(0 0% 45%)" }}
              >
                Legal
              </p>
              <nav aria-label="Footer legal links">
                <ul className="space-y-2">
                  {["Privacy", "Cookie", "Terms"].map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="font-body text-sm hover-line relative inline-block"
                        style={{ color: "hsl(0 0% 35%)" }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            style={{ borderColor: "hsl(30 8% 75%)" }}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <a
                href="/"
                className="font-body text-xs uppercase tracking-[0.2em] transition-transform hover:translate-x-1 inline-flex items-center gap-2"
                style={{ color: "hsl(0 0% 35%)" }}
                aria-label="Return to gallery"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                Torna alla Gallery
              </a>
              <span
                className="font-body text-xs"
                style={{ color: "hsl(0 0% 55%)" }}
              >
                P.IVA IT 0123456789
              </span>
            </div>

            <div className="flex items-center gap-6">
              <span
                className="font-display text-sm"
                style={{ color: "hsl(30 36% 58%)" }}
              >
                45.4654° N, 10.6339° E
              </span>
            </div>
          </div>

          {/* Credits */}
          <div className="mt-8 text-center">
            <p
              className="font-body text-[10px] uppercase tracking-[0.3em]"
              style={{ color: "hsl(0 0% 55%)" }}
            >
              2024 Casa & Giardino S.r.l. - CrazyOne UI / Brutalist Raffinato
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
