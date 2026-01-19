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
// OBSIDIAN - Collezione Premium Dark
// Inspired by: Volcanic glass, midnight luxury, Japanese minimalism
// Typography: Playfair Display + Satoshi
// ═══════════════════════════════════════════════════════════════════════════════

const obsidianStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Satoshi:wght@300;400;500&display=swap');

  :root {
    --obs-bg: 240 5% 6%;
    --obs-fg: 40 10% 95%;
    --obs-card: 240 5% 10%;
    --obs-primary: 45 90% 55%;
    --obs-secondary: 240 5% 18%;
    --obs-accent: 0 0% 100%;
    --obs-muted: 240 5% 45%;
    --obs-border: 240 5% 15%;
  }

  .font-display-obs {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 400;
  }

  .font-body-obs {
    font-family: 'Satoshi', -apple-system, sans-serif;
    font-weight: 400;
  }

  .text-hero-obs {
    font-size: clamp(3.5rem, 12vw, 11rem);
    line-height: 0.85;
    letter-spacing: -0.03em;
  }

  .text-display-obs {
    font-size: clamp(2.2rem, 5vw, 5rem);
    line-height: 0.95;
    letter-spacing: -0.02em;
  }

  @keyframes goldShimmer {
    0%, 100% {
      background-position: -200% center;
    }
    50% {
      background-position: 200% center;
    }
  }

  @keyframes fadeFromBlack {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulseGold {
    0%, 100% {
      box-shadow: 0 0 0 0 hsl(45 90% 55% / 0.4);
    }
    50% {
      box-shadow: 0 0 20px 5px hsl(45 90% 55% / 0.2);
    }
  }

  @keyframes subtleFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }

  .animate-gold-shimmer {
    background: linear-gradient(90deg, transparent 0%, hsl(45 90% 55% / 0.3) 50%, transparent 100%);
    background-size: 200% 100%;
    animation: goldShimmer 3s ease-in-out infinite;
  }

  .animate-fade-black {
    animation: fadeFromBlack 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .animate-pulse-gold {
    animation: pulseGold 3s ease-in-out infinite;
  }

  .animate-float {
    animation: subtleFloat 6s ease-in-out infinite;
  }

  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
  .delay-500 { animation-delay: 500ms; }
  .delay-600 { animation-delay: 600ms; }

  .hover-obsidian {
    transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .hover-obsidian:hover {
    transform: translateY(-6px);
    box-shadow: 0 30px 60px -15px hsl(45 90% 55% / 0.15);
  }

  .glass-dark {
    background: linear-gradient(135deg,
      hsl(240 5% 10% / 0.95) 0%,
      hsl(240 5% 8% / 0.9) 100%);
    backdrop-filter: blur(20px);
    border: 1px solid hsl(240 5% 18%);
  }

  .gold-border {
    position: relative;
  }

  .gold-border::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, hsl(45 90% 55%), transparent);
  }

  .gallery-scroll-obs {
    display: flex;
    gap: 2rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding: 2rem;
    scrollbar-width: none;
  }

  .gallery-scroll-obs::-webkit-scrollbar {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-gold-shimmer,
    .animate-fade-black,
    .animate-pulse-gold,
    .animate-float,
    .hover-obsidian {
      animation: none !important;
      transition: none !important;
    }
  }
`;

const SERVIZI = [
  {
    numeral: "I",
    title: "Consulenza Privata",
    subtitle: "Private Consultation",
    description: "Incontro esclusivo. Analisi delle esigenze. Definizione del concept di lusso.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=800&fit=crop&q=80",
  },
  {
    numeral: "II",
    title: "Design Su Misura",
    subtitle: "Bespoke Design",
    description: "Progettazione personalizzata. Materiali pregiati. Finiture di alta sartoria.",
    image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=600&h=800&fit=crop&q=80",
  },
  {
    numeral: "III",
    title: "Manifattura",
    subtitle: "Craftsmanship",
    description: "Realizzazione artigianale. Maestri del legno, del marmo, dei metalli.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=800&fit=crop&q=80",
  },
  {
    numeral: "IV",
    title: "White Glove",
    subtitle: "Premium Delivery",
    description: "Installazione discreta. Servizio di guanti bianchi. Cura assoluta.",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&h=800&fit=crop&q=80",
  },
];

const COLLEZIONI = [
  {
    id: "nero",
    name: "Collezione Nero Assoluto",
    subtitle: "Master Bedroom",
    price: "da / from 45.000",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=1000&fit=crop&q=80",
    tag: "Prestige",
  },
  {
    id: "oro",
    name: "Collezione Oro",
    subtitle: "Dining Suite",
    price: "da / from 68.000",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&h=1000&fit=crop&q=80",
    tag: "Limited",
  },
  {
    id: "marmo",
    name: "Collezione Marmo Nero",
    subtitle: "Living",
    price: "da / from 52.000",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=1000&fit=crop&q=80",
    tag: "Exclusive",
  },
  {
    id: "seta",
    name: "Collezione Seta",
    subtitle: "Dressing Room",
    price: "da / from 28.000",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=1000&fit=crop&q=80",
    tag: "Couture",
  },
  {
    id: "cristallo",
    name: "Collezione Cristallo",
    subtitle: "Lighting",
    price: "da / from 15.000",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=1000&fit=crop&q=80",
    tag: "Artisan",
  },
];

const STATS = [
  { value: "47", label: "Clienti privati", sublabel: "Private clients" },
  { value: "12", label: "Maestri artigiani", sublabel: "Master craftsmen" },
  { value: "∞", label: "Possibilita", sublabel: "Possibilities" },
];

export function CasaGiardinoObsidianDemo() {
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
      <style>{obsidianStyles}</style>
      <div
        className="relative overflow-x-hidden"
        style={{
          fontFamily: "'Satoshi', sans-serif",
          backgroundColor: "hsl(240 5% 6%)",
          color: "hsl(40 10% 95%)",
        }}
      >
        {/* ═══════════════════════════════════════════════════════════════════════
            HERO - Midnight Luxury
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="min-h-screen relative">
          {/* Gold accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-px animate-gold-shimmer"
            style={{ background: "linear-gradient(90deg, transparent, hsl(45 90% 55%), transparent)" }}
            aria-hidden="true"
          />

          <nav className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-6 md:px-12 lg:px-24 py-8">
            <span
              className="font-display-obs text-2xl italic opacity-0 animate-fade-black"
              style={{ color: "hsl(45 90% 55%)" }}
            >
              C&G
            </span>
            <div className="flex items-center gap-10">
              <span
                className="font-body-obs text-[11px] uppercase tracking-[0.4em] opacity-0 animate-fade-black delay-100 hidden md:block"
                style={{ color: "hsl(240 5% 45%)" }}
              >
                Lago di Garda
              </span>
              <Badge
                className="font-body-obs text-[10px] px-5 py-2 uppercase tracking-[0.3em] opacity-0 animate-fade-black delay-200"
                style={{
                  backgroundColor: "transparent",
                  color: "hsl(45 90% 55%)",
                  border: "1px solid hsl(45 90% 55% / 0.3)",
                  borderRadius: "0",
                }}
              >
                Premium
              </Badge>
            </div>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
            <div className="flex flex-col justify-center px-6 md:px-12 lg:px-24 py-32 lg:py-0">
              <p
                className="font-body-obs text-[11px] uppercase tracking-[0.6em] mb-12 opacity-0 animate-fade-black delay-300"
                style={{ color: "hsl(45 90% 55%)" }}
              >
                Lusso senza tempo
              </p>

              <h1 className="font-display-obs text-hero-obs opacity-0 animate-fade-black delay-400">
                <span className="block italic" style={{ color: "hsl(40 10% 95%)" }}>Casa</span>
                <span className="block" style={{ color: "hsl(45 90% 55%)" }}>&</span>
                <span className="block italic" style={{ color: "hsl(40 10% 95%)" }}>Giardino</span>
              </h1>

              <p
                className="font-display-obs text-2xl md:text-3xl italic mt-12 max-w-lg opacity-0 animate-fade-black delay-500"
                style={{ color: "hsl(240 5% 45%)" }}
              >
                L'oscurita
                <br />rivela la luce
              </p>

              <p
                className="font-body-obs text-sm mt-4 opacity-0 animate-fade-black delay-500"
                style={{ color: "hsl(240 5% 35%)" }}
              >
                Darkness reveals light
              </p>

              <div className="mt-20 flex items-center gap-10 opacity-0 animate-fade-black delay-600">
                <div
                  className="w-16 h-16 flex items-center justify-center animate-pulse-gold"
                  style={{ border: "1px solid hsl(45 90% 55% / 0.3)" }}
                >
                  <span className="font-display-obs text-xl italic" style={{ color: "hsl(45 90% 55%)" }}>Au</span>
                </div>
                <div>
                  <p className="font-body-obs text-[10px] uppercase tracking-[0.4em]" style={{ color: "hsl(240 5% 45%)" }}>
                    Coordinate
                  </p>
                  <p className="font-display-obs text-lg italic mt-1" style={{ color: "hsl(45 90% 55%)" }}>
                    45.4654° N
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-[60vh] lg:h-auto opacity-0 animate-fade-black delay-300">
              <div
                className="absolute inset-0 lg:inset-y-16 lg:left-0 lg:right-16"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&h=1600&fit=crop&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "brightness(0.9) contrast(1.1)",
                }}
                role="img"
                aria-label="Dark luxury interior with gold accents"
              />
              {/* Gold frame overlay */}
              <div
                className="absolute inset-0 lg:inset-y-16 lg:left-0 lg:right-16 pointer-events-none"
                style={{ border: "1px solid hsl(45 90% 55% / 0.1)" }}
                aria-hidden="true"
              />
              <div
                className="absolute bottom-8 left-8 right-8 lg:bottom-24 lg:left-8 lg:right-24 p-8 glass-dark"
              >
                <p className="font-body-obs text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: "hsl(45 90% 55%)" }}>
                  Now showing
                </p>
                <p className="font-display-obs text-xl italic" style={{ color: "hsl(40 10% 95%)" }}>
                  Collezione Nero Assoluto
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            PHILOSOPHY
        ═══════════════════════════════════════════════════════════════════════ */}
        <section
          className="py-40 md:py-56 px-6 md:px-12 lg:px-24 gold-border"
          style={{ backgroundColor: "hsl(240 5% 8%)" }}
        >
          <div className="max-w-5xl">
            <p
              className="font-body-obs text-[11px] uppercase tracking-[0.6em] mb-12"
              style={{ color: "hsl(45 90% 55%)" }}
            >
              Filosofia / Philosophy
            </p>

            <h2 className="font-display-obs text-display-obs italic">
              <span style={{ color: "hsl(40 10% 95%)" }}>Nel nero, </span>
              <span style={{ color: "hsl(45 90% 55%)" }}>l'oro</span>
              <span style={{ color: "hsl(40 10% 95%)" }}>.</span>
              <br />
              <span style={{ color: "hsl(40 10% 95%)" }}>Nel silenzio, </span>
              <span style={{ color: "hsl(0 0% 100%)" }}>l'essenza</span>
              <span style={{ color: "hsl(40 10% 95%)" }}>.</span>
            </h2>

            <p
              className="font-body-obs text-lg mt-16 max-w-2xl leading-relaxed"
              style={{ color: "hsl(240 5% 55%)" }}
            >
              In black, gold. In silence, essence. We craft spaces for those who understand
              that true luxury whispers. Every piece is a meditation on perfection,
              every room a sanctuary of refined darkness.
            </p>

            <div className="mt-20 flex gap-8">
              {["Ebano", "Oro 24k", "Marmo Nero", "Seta"].map((material, i) => (
                <span
                  key={material}
                  className="font-body-obs text-[11px] uppercase tracking-[0.3em] px-6 py-3"
                  style={{
                    color: i === 1 ? "hsl(45 90% 55%)" : "hsl(240 5% 55%)",
                    border: `1px solid ${i === 1 ? "hsl(45 90% 55% / 0.3)" : "hsl(240 5% 18%)"}`,
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
              <p className="font-body-obs text-[11px] uppercase tracking-[0.6em] mb-4" style={{ color: "hsl(240 5% 45%)" }}>
                Il processo
              </p>
              <h2 className="font-display-obs text-display-obs italic">
                Quattro fasi
              </h2>
            </div>
            <div className="flex gap-2 mt-8 md:mt-0">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-1"
                  style={{ backgroundColor: i === 1 ? "hsl(45 90% 55%)" : "hsl(240 5% 18%)" }}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVIZI.map((servizio) => (
              <Card
                key={servizio.numeral}
                className="hover-obsidian group relative overflow-hidden"
                style={{
                  backgroundColor: "hsl(240 5% 10%)",
                  border: "1px solid hsl(240 5% 15%)",
                  borderRadius: "0",
                  minHeight: "400px",
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    backgroundImage: `url('${servizio.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "brightness(0.4)",
                  }}
                  aria-hidden="true"
                />

                <CardContent className="relative z-10 h-full flex flex-col justify-between p-8">
                  <div>
                    <span
                      className="font-display-obs text-6xl italic opacity-20"
                      style={{ color: "hsl(45 90% 55%)" }}
                    >
                      {servizio.numeral}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display-obs text-xl italic">{servizio.title}</h3>
                    <p className="font-body-obs text-[10px] uppercase tracking-[0.3em] mt-2" style={{ color: "hsl(45 90% 55%)" }}>
                      {servizio.subtitle}
                    </p>
                    <p
                      className="font-body-obs text-sm mt-6 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: "hsl(240 5% 65%)" }}
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
          className="py-32 md:py-48 gold-border"
          style={{ backgroundColor: "hsl(240 5% 4%)" }}
        >
          <div className="px-6 md:px-12 lg:px-24 mb-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-body-obs text-[11px] uppercase tracking-[0.6em] mb-4" style={{ color: "hsl(45 90% 55%)" }}>
                  Collezioni
                </p>
                <h2 className="font-display-obs text-display-obs italic">
                  Midnight Luxury
                </h2>
              </div>

              <div className="flex gap-4 mt-8 md:mt-0">
                <button
                  onClick={() => scrollGallery("left")}
                  className="w-12 h-12 flex items-center justify-center border transition-all hover:border-[hsl(45_90%_55%_/_0.5)]"
                  style={{ borderColor: "hsl(240 5% 18%)" }}
                  aria-label="Scroll left"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollGallery("right")}
                  className="w-12 h-12 flex items-center justify-center border transition-all hover:border-[hsl(45_90%_55%_/_0.5)]"
                  style={{ borderColor: "hsl(240 5% 18%)" }}
                  aria-label="Scroll right"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div ref={galleryRef} className="gallery-scroll-obs pl-6 md:pl-12 lg:pl-24 pr-6">
            {COLLEZIONI.map((collezione) => (
              <article key={collezione.id} className="flex-shrink-0 group cursor-pointer" style={{ width: "320px" }}>
                <div className="relative overflow-hidden mb-8" style={{ aspectRatio: "3/4" }}>
                  <img
                    src={collezione.image}
                    alt={`${collezione.name} - ${collezione.subtitle}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "brightness(0.85) contrast(1.1)" }}
                    loading="lazy"
                  />
                  <Badge
                    className="absolute top-4 left-4 font-body-obs text-[9px] uppercase tracking-[0.2em] px-4 py-2"
                    style={{
                      backgroundColor: "hsl(45 90% 55%)",
                      color: "hsl(240 5% 6%)",
                      border: "none",
                      borderRadius: "0",
                    }}
                  >
                    {collezione.tag}
                  </Badge>
                </div>

                <h3 className="font-display-obs text-lg italic mb-1">{collezione.name}</h3>
                <p className="font-body-obs text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: "hsl(240 5% 45%)" }}>
                  {collezione.subtitle}
                </p>
                <p className="font-display-obs text-lg italic" style={{ color: "hsl(45 90% 55%)" }}>
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
              filter: "brightness(0.3) contrast(1.2)",
            }}
            role="img"
            aria-label="Premium dark showroom"
          />

          <div className="relative z-10 min-h-[80vh] flex flex-col justify-end px-6 md:px-12 lg:px-24 py-20">
            <p className="font-body-obs text-[11px] uppercase tracking-[0.6em] mb-8" style={{ color: "hsl(45 90% 55%)" }}>
              Atelier Privato
            </p>
            <h2 className="font-display-obs text-display-obs italic max-w-4xl">
              600 mq di esclusivita
              <br />
              <span style={{ color: "hsl(45 90% 55%)" }}>sul Lago di Garda</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20 pt-12 border-t" style={{ borderColor: "hsl(45 90% 55% / 0.2)" }}>
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display-obs text-5xl md:text-6xl italic mb-3" style={{ color: "hsl(45 90% 55%)" }}>
                    {stat.value}
                  </p>
                  <p className="font-body-obs text-sm">{stat.label}</p>
                  <p className="font-body-obs text-[11px] mt-1" style={{ color: "hsl(240 5% 45%)" }}>{stat.sublabel}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            CONTACT
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-40 md:py-56 px-6 md:px-12 lg:px-24" style={{ backgroundColor: "hsl(240 5% 8%)" }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-body-obs text-[11px] uppercase tracking-[0.6em] mb-8" style={{ color: "hsl(45 90% 55%)" }}>
              Appuntamento Privato
            </p>

            <h2 className="font-display-obs text-display-obs italic mb-12">
              L'eccellenza
              <br />
              <span style={{ color: "hsl(45 90% 55%)" }}>vi attende</span>
            </h2>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="font-body-obs text-[11px] px-16 py-6 uppercase tracking-[0.3em] hover-obsidian"
                  style={{
                    backgroundColor: "hsl(45 90% 55%)",
                    color: "hsl(240 5% 6%)",
                    border: "none",
                    borderRadius: "0",
                  }}
                >
                  Richiedi Appuntamento
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg glass-dark" style={{ borderRadius: "0", border: "1px solid hsl(240 5% 18%)" }}>
                <DialogHeader className="pb-8 border-b" style={{ borderColor: "hsl(240 5% 18%)" }}>
                  <DialogTitle className="font-display-obs text-2xl italic" style={{ color: "hsl(40 10% 95%)" }}>
                    Appuntamento Privato
                  </DialogTitle>
                  <DialogDescription className="font-body-obs text-sm mt-3" style={{ color: "hsl(240 5% 55%)" }}>
                    Un consulente dedicato vi ricontattera entro 24 ore.
                  </DialogDescription>
                </DialogHeader>

                <form className="space-y-6 pt-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="font-body-obs text-[10px] uppercase tracking-[0.2em] block mb-3" style={{ color: "hsl(240 5% 55%)" }}>Nome</label>
                      <Input id="name" placeholder="Mario" className="font-body-obs" style={{ borderRadius: "0", backgroundColor: "hsl(240 5% 10%)", borderColor: "hsl(240 5% 18%)", color: "hsl(40 10% 95%)" }} />
                    </div>
                    <div>
                      <label htmlFor="surname" className="font-body-obs text-[10px] uppercase tracking-[0.2em] block mb-3" style={{ color: "hsl(240 5% 55%)" }}>Cognome</label>
                      <Input id="surname" placeholder="Rossi" className="font-body-obs" style={{ borderRadius: "0", backgroundColor: "hsl(240 5% 10%)", borderColor: "hsl(240 5% 18%)", color: "hsl(40 10% 95%)" }} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="font-body-obs text-[10px] uppercase tracking-[0.2em] block mb-3" style={{ color: "hsl(240 5% 55%)" }}>Email</label>
                    <Input id="email" type="email" placeholder="mario.rossi@email.it" className="font-body-obs" style={{ borderRadius: "0", backgroundColor: "hsl(240 5% 10%)", borderColor: "hsl(240 5% 18%)", color: "hsl(40 10% 95%)" }} />
                  </div>

                  <div>
                    <label htmlFor="interest" className="font-body-obs text-[10px] uppercase tracking-[0.2em] block mb-3" style={{ color: "hsl(240 5% 55%)" }}>Interesse</label>
                    <Select>
                      <SelectTrigger id="interest" className="font-body-obs" style={{ borderRadius: "0", backgroundColor: "hsl(240 5% 10%)", borderColor: "hsl(240 5% 18%)", color: "hsl(40 10% 95%)" }}>
                        <SelectValue placeholder="Seleziona..." />
                      </SelectTrigger>
                      <SelectContent style={{ borderRadius: "0", backgroundColor: "hsl(240 5% 10%)", borderColor: "hsl(240 5% 18%)" }}>
                        <SelectItem value="bedroom">Master Bedroom</SelectItem>
                        <SelectItem value="living">Living Suite</SelectItem>
                        <SelectItem value="dining">Dining Suite</SelectItem>
                        <SelectItem value="complete">Progetto Completo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <label className="flex items-start gap-4 cursor-pointer pt-4">
                    <Checkbox checked={privacyAccepted} onCheckedChange={(c) => setPrivacyAccepted(c === true)} className="mt-0.5" />
                    <span className="font-body-obs text-[11px] leading-relaxed" style={{ color: "hsl(240 5% 55%)" }}>
                      Accetto la Privacy Policy.
                    </span>
                  </label>

                  <Button
                    type="submit"
                    className="w-full font-body-obs text-[11px] py-5 uppercase tracking-[0.2em]"
                    style={{
                      backgroundColor: privacyAccepted ? "hsl(45 90% 55%)" : "hsl(240 5% 18%)",
                      color: privacyAccepted ? "hsl(240 5% 6%)" : "hsl(240 5% 45%)",
                      borderRadius: "0",
                      cursor: privacyAccepted ? "pointer" : "not-allowed",
                    }}
                    disabled={!privacyAccepted}
                  >
                    Invia Richiesta
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <div className="mt-20 flex justify-center gap-16">
              <div>
                <p className="font-body-obs text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: "hsl(240 5% 45%)" }}>Linea Privata</p>
                <a href="tel:+390309912345" className="font-display-obs text-lg italic">+39 030 991 2345</a>
              </div>
              <div>
                <p className="font-body-obs text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: "hsl(240 5% 45%)" }}>Email</p>
                <a href="mailto:prestige@casaegiardino.it" className="font-display-obs text-lg italic">prestige@casaegiardino.it</a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            FOOTER
        ═══════════════════════════════════════════════════════════════════════ */}
        <footer className="py-20 px-6 md:px-12 lg:px-24 border-t" style={{ borderColor: "hsl(240 5% 15%)" }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            <div className="md:col-span-4">
              <h3 className="font-display-obs text-2xl italic mb-6" style={{ color: "hsl(45 90% 55%)" }}>Casa & Giardino</h3>
              <p className="font-body-obs text-sm max-w-xs leading-relaxed" style={{ color: "hsl(240 5% 55%)" }}>
                Lusso senza tempo dal 1998. Sul Lago di Garda.
              </p>
            </div>

            <div className="md:col-span-3">
              <p className="font-body-obs text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: "hsl(240 5% 45%)" }}>Atelier</p>
              <address className="font-body-obs text-sm not-italic leading-relaxed" style={{ color: "hsl(240 5% 55%)" }}>
                Via del Lago, 42<br />25015 Desenzano del Garda<br />Italia
              </address>
            </div>

            <div className="md:col-span-3">
              <p className="font-body-obs text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: "hsl(240 5% 45%)" }}>Orari</p>
              <p className="font-body-obs text-sm leading-relaxed" style={{ color: "hsl(240 5% 55%)" }}>
                Solo su appuntamento<br />7 giorni su 7
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="font-body-obs text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: "hsl(240 5% 45%)" }}>Legal</p>
              <ul className="space-y-3">
                {["Privacy", "Cookie", "Terms"].map((link) => (
                  <li key={link}><a href="#" className="font-body-obs text-sm" style={{ color: "hsl(240 5% 55%)" }}>{link}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6" style={{ borderColor: "hsl(240 5% 15%)" }}>
            <a href="/" className="font-body-obs text-[11px] uppercase tracking-[0.2em] flex items-center gap-3" style={{ color: "hsl(240 5% 55%)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M15 18l-6-6 6-6" /></svg>
              Gallery
            </a>
            <span className="font-display-obs text-sm italic" style={{ color: "hsl(45 90% 55%)" }}>45.4654° N, 10.6339° E</span>
          </div>

          <div className="mt-12 text-center">
            <p className="font-body-obs text-[10px] uppercase tracking-[0.3em]" style={{ color: "hsl(240 5% 35%)" }}>
              2024 Casa & Giardino - CrazyOne UI / Obsidian
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
