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
// CAMPFIRE - Collezione Chalet/Montagna
// Inspired by: Alpine lodges, warm hearths, mountain craftsmanship
// Typography: Bitter + Work Sans
// ═══════════════════════════════════════════════════════════════════════════════

const campfireStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Work+Sans:wght@300;400;500&display=swap');

  :root {
    --camp-bg: 30 20% 12%;
    --camp-fg: 35 30% 92%;
    --camp-card: 28 18% 16%;
    --camp-primary: 25 85% 55%;
    --camp-secondary: 35 40% 30%;
    --camp-accent: 40 70% 60%;
    --camp-muted: 30 10% 50%;
    --camp-border: 28 15% 25%;
  }

  .font-display-camp {
    font-family: 'Bitter', Georgia, serif;
    font-weight: 500;
  }

  .font-body-camp {
    font-family: 'Work Sans', -apple-system, sans-serif;
    font-weight: 400;
  }

  .text-hero-camp {
    font-size: clamp(3rem, 10vw, 9rem);
    line-height: 0.9;
    letter-spacing: -0.02em;
  }

  .text-display-camp {
    font-size: clamp(2rem, 5vw, 4.5rem);
    line-height: 1;
  }

  @keyframes fireFlicker {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    25% {
      opacity: 0.9;
      transform: scale(1.02);
    }
    50% {
      opacity: 1;
      transform: scale(0.98);
    }
    75% {
      opacity: 0.95;
      transform: scale(1.01);
    }
  }

  @keyframes emberGlow {
    0%, 100% {
      box-shadow: 0 0 20px 5px hsl(25 85% 55% / 0.3);
    }
    50% {
      box-shadow: 0 0 40px 10px hsl(25 85% 55% / 0.5);
    }
  }

  @keyframes smokeRise {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes crackle {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-1px); }
    75% { transform: translateX(1px); }
  }

  .animate-fire {
    animation: fireFlicker 3s ease-in-out infinite;
  }

  .animate-ember {
    animation: emberGlow 2s ease-in-out infinite;
  }

  .animate-smoke {
    animation: smokeRise 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .animate-crackle {
    animation: crackle 0.3s ease-in-out infinite;
  }

  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
  .delay-500 { animation-delay: 500ms; }

  .hover-campfire {
    transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .hover-campfire:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 40px -10px hsl(25 85% 55% / 0.3);
  }

  .wood-texture {
    background-image: repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      hsl(30 20% 15% / 0.5) 2px,
      hsl(30 20% 15% / 0.5) 4px
    );
  }

  .warm-gradient {
    background: linear-gradient(180deg,
      hsl(30 20% 12%) 0%,
      hsl(25 25% 10%) 50%,
      hsl(20 30% 8%) 100%);
  }

  .gallery-scroll-camp {
    display: flex;
    gap: 2rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding: 2rem;
    scrollbar-width: none;
  }

  .gallery-scroll-camp::-webkit-scrollbar {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-fire,
    .animate-ember,
    .animate-smoke,
    .animate-crackle,
    .hover-campfire {
      animation: none !important;
      transition: none !important;
    }
  }
`;

const SERVIZI = [
  {
    numeral: "I",
    title: "Sopralluogo Alpino",
    subtitle: "Alpine Survey",
    description: "Rilievo della baita. Analisi strutturale. Studio dell'esposizione e del paesaggio circostante.",
    image: "https://images.unsplash.com/photo-1520984032042-162d526883e0?w=600&h=800&fit=crop&q=80",
  },
  {
    numeral: "II",
    title: "Design Montano",
    subtitle: "Mountain Design",
    description: "Progettazione in stile alpino. Legno massello, pietra locale, tessuti tradizionali.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop&q=80",
  },
  {
    numeral: "III",
    title: "Artigianato",
    subtitle: "Craftsmanship",
    description: "Collaborazione con artigiani locali. Lavorazioni a mano, tecniche tradizionali.",
    image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=600&h=800&fit=crop&q=80",
  },
  {
    numeral: "IV",
    title: "Installazione",
    subtitle: "Installation",
    description: "Montaggio professionale. Cura dei dettagli. Preparazione per ogni stagione.",
    image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=600&h=800&fit=crop&q=80",
  },
];

const COLLEZIONI = [
  {
    id: "stube",
    name: "Collezione Stube",
    subtitle: "Living Room",
    price: "da / from 9.800",
    image: "https://images.unsplash.com/photo-1520984032042-162d526883e0?w=800&h=1000&fit=crop&q=80",
    tag: "Signature",
  },
  {
    id: "caminetto",
    name: "Collezione Caminetto",
    subtitle: "Fireplace Suite",
    price: "da / from 15.500",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=1000&fit=crop&q=80",
    tag: "Premium",
  },
  {
    id: "maso",
    name: "Collezione Maso",
    subtitle: "Bedroom",
    price: "da / from 7.200",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=1000&fit=crop&q=80",
    tag: "Bestseller",
  },
  {
    id: "malga",
    name: "Collezione Malga",
    subtitle: "Dining",
    price: "da / from 6.400",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&h=1000&fit=crop&q=80",
    tag: "Rustic",
  },
  {
    id: "rifugio",
    name: "Collezione Rifugio",
    subtitle: "Accessories",
    price: "da / from 1.200",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=1000&fit=crop&q=80",
    tag: "New 2024",
  },
];

const STATS = [
  { value: "120+", label: "Baite arredate", sublabel: "Chalets furnished" },
  { value: "28", label: "Artigiani partner", sublabel: "Partner craftsmen" },
  { value: "1.400m", label: "Altitudine media", sublabel: "Average altitude" },
];

export function CasaGiardinoCampfireDemo() {
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
      <style>{campfireStyles}</style>
      <div
        className="warm-gradient relative overflow-x-hidden"
        style={{
          fontFamily: "'Work Sans', sans-serif",
          color: "hsl(35 30% 92%)",
        }}
      >
        {/* ═══════════════════════════════════════════════════════════════════════
            HERO - Warm Hearth
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="min-h-screen relative">
          {/* Decorative ember */}
          <div
            className="absolute top-1/3 right-20 w-4 h-4 rounded-full animate-ember hidden lg:block"
            style={{ backgroundColor: "hsl(25 85% 55%)" }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-1/4 left-32 w-2 h-2 rounded-full animate-ember delay-300 hidden lg:block"
            style={{ backgroundColor: "hsl(40 70% 60%)" }}
            aria-hidden="true"
          />

          <nav className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-6 md:px-12 lg:px-20 py-6">
            <span
              className="font-display-camp text-2xl opacity-0 animate-smoke"
              style={{ color: "hsl(25 85% 55%)" }}
            >
              C&G
            </span>
            <div className="flex items-center gap-8">
              <span
                className="font-body-camp text-xs uppercase tracking-[0.3em] opacity-0 animate-smoke delay-100 hidden md:block"
                style={{ color: "hsl(30 10% 50%)" }}
              >
                Lago di Garda
              </span>
              <Badge
                className="font-body-camp text-[10px] px-4 py-2 uppercase tracking-[0.2em] opacity-0 animate-smoke delay-200"
                style={{
                  backgroundColor: "hsl(25 85% 55%)",
                  color: "hsl(30 20% 12%)",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Chalet Living
              </Badge>
            </div>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
            <div className="flex flex-col justify-center px-6 md:px-12 lg:px-20 py-32 lg:py-0 relative">
              <p
                className="font-body-camp text-xs uppercase tracking-[0.5em] mb-8 opacity-0 animate-smoke delay-300"
                style={{ color: "hsl(40 70% 60%)" }}
              >
                Il calore della tradizione
              </p>

              <h1 className="font-display-camp text-hero-camp opacity-0 animate-smoke delay-400">
                <span className="block" style={{ color: "hsl(35 30% 92%)" }}>Casa</span>
                <span className="block animate-fire" style={{ color: "hsl(25 85% 55%)" }}>&</span>
                <span className="block" style={{ color: "hsl(35 30% 92%)" }}>Giardino</span>
              </h1>

              <p
                className="font-display-camp text-2xl md:text-3xl mt-10 max-w-md italic opacity-0 animate-smoke delay-500"
                style={{ color: "hsl(30 10% 50%)" }}
              >
                Dove ogni fiamma
                <br />racconta una storia
              </p>

              <p
                className="font-body-camp text-sm mt-4 opacity-0 animate-smoke delay-500"
                style={{ color: "hsl(30 10% 45%)" }}
              >
                Where every flame tells a story
              </p>

              <div className="mt-16 flex items-center gap-6 opacity-0 animate-smoke delay-500">
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center wood-texture animate-ember"
                  style={{ backgroundColor: "hsl(28 18% 16%)" }}
                >
                  <span className="font-display-camp text-2xl" style={{ color: "hsl(25 85% 55%)" }}>🔥</span>
                </div>
                <div>
                  <p className="font-body-camp text-[10px] uppercase tracking-[0.3em]" style={{ color: "hsl(30 10% 50%)" }}>
                    Temperatura focolare
                  </p>
                  <p className="font-display-camp text-xl" style={{ color: "hsl(40 70% 60%)" }}>
                    22° Sempre caldo
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-[60vh] lg:h-auto opacity-0 animate-smoke delay-300">
              <div
                className="absolute inset-0 lg:inset-12 lg:rounded-2xl overflow-hidden"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1520984032042-162d526883e0?w=1200&h=1600&fit=crop&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                role="img"
                aria-label="Cozy alpine chalet interior with fireplace"
              />
              <div
                className="absolute bottom-8 left-8 right-8 lg:bottom-20 lg:left-20 lg:right-20 p-6 rounded-xl"
                style={{
                  backgroundColor: "hsl(28 18% 16% / 0.95)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid hsl(28 15% 25%)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full animate-fire" style={{ backgroundColor: "hsl(25 85% 55%)" }} />
                  <p className="font-body-camp text-xs uppercase tracking-[0.2em]" style={{ color: "hsl(40 70% 60%)" }}>
                    Live from chalet
                  </p>
                </div>
                <p className="font-display-camp text-xl mt-2" style={{ color: "hsl(35 30% 92%)" }}>
                  Fuoco acceso, neve fuori
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
          style={{ backgroundColor: "hsl(28 18% 16%)" }}
        >
          <div className="max-w-5xl">
            <p
              className="font-body-camp text-xs uppercase tracking-[0.5em] mb-8"
              style={{ color: "hsl(40 70% 60%)" }}
            >
              La nostra filosofia / Our philosophy
            </p>

            <h2 className="font-display-camp text-display-camp">
              <span style={{ color: "hsl(35 30% 92%)" }}>Il legno </span>
              <em className="animate-fire inline-block" style={{ color: "hsl(25 85% 55%)" }}>vive</em>
              <span style={{ color: "hsl(35 30% 92%)" }}>,</span>
              <br />
              <span style={{ color: "hsl(35 30% 92%)" }}>la pietra </span>
              <em style={{ color: "hsl(40 70% 60%)" }}>resiste</em>
              <span style={{ color: "hsl(35 30% 92%)" }}>,</span>
              <br />
              <span style={{ color: "hsl(35 30% 92%)" }}>la casa </span>
              <em style={{ color: "hsl(35 40% 30%)" }}>accoglie</em>
              <span style={{ color: "hsl(35 30% 92%)" }}>.</span>
            </h2>

            <p
              className="font-body-camp text-lg mt-12 max-w-2xl leading-relaxed"
              style={{ color: "hsl(30 10% 55%)" }}
            >
              Wood lives, stone endures, home embraces. We bring mountain craftsmanship
              to your chalet, creating spaces where the warmth of the hearth meets
              the majesty of the Alps.
            </p>

            <div className="mt-16 flex flex-wrap gap-4">
              {["Larice", "Noce", "Granito", "Lana cotta"].map((material) => (
                <span
                  key={material}
                  className="font-body-camp text-xs uppercase tracking-[0.2em] px-5 py-3 rounded-lg wood-texture"
                  style={{
                    backgroundColor: "hsl(35 40% 30%)",
                    color: "hsl(35 30% 92%)",
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
        <section className="py-24 md:py-40 px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <p className="font-body-camp text-xs uppercase tracking-[0.5em] mb-4" style={{ color: "hsl(30 10% 50%)" }}>
                Il nostro processo
              </p>
              <h2 className="font-display-camp text-display-camp">
                Quattro fasi
              </h2>
            </div>
            <div className="flex gap-2 mt-6 md:mt-0">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full animate-fire"
                  style={{
                    backgroundColor: "hsl(25 85% 55%)",
                    animationDelay: `${i * 200}ms`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVIZI.map((servizio) => (
              <Card
                key={servizio.numeral}
                className="hover-campfire group relative overflow-hidden"
                style={{
                  backgroundColor: "hsl(28 18% 16%)",
                  border: "1px solid hsl(28 15% 25%)",
                  borderRadius: "12px",
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
                  className="absolute inset-0 opacity-0 group-hover:opacity-90 transition-opacity duration-700"
                  style={{ backgroundColor: "hsl(28 18% 16%)" }}
                  aria-hidden="true"
                />

                <CardContent className="relative z-10 h-full flex flex-col justify-between p-8">
                  <div className="flex justify-between items-start">
                    <span
                      className="font-display-camp text-5xl"
                      style={{ color: "hsl(25 85% 55% / 0.4)" }}
                    >
                      {servizio.numeral}
                    </span>
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center wood-texture"
                      style={{ backgroundColor: "hsl(35 40% 30%)" }}
                    >
                      <span style={{ color: "hsl(40 70% 60%)" }}>✦</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display-camp text-2xl">{servizio.title}</h3>
                    <p className="font-body-camp text-xs uppercase tracking-[0.2em] mt-1" style={{ color: "hsl(40 70% 60%)" }}>
                      {servizio.subtitle}
                    </p>
                    <p
                      className="font-body-camp text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: "hsl(30 10% 60%)" }}
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
          className="py-24 md:py-40"
          style={{
            backgroundColor: "hsl(25 85% 55%)",
            color: "hsl(30 20% 12%)",
          }}
        >
          <div className="px-6 md:px-12 lg:px-20 mb-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-body-camp text-xs uppercase tracking-[0.5em] mb-4" style={{ color: "hsl(30 20% 12% / 0.7)" }}>
                  Le nostre collezioni
                </p>
                <h2 className="font-display-camp text-display-camp">
                  Alpine Living
                </h2>
              </div>

              <div className="flex gap-3 mt-8 md:mt-0">
                <button
                  onClick={() => scrollGallery("left")}
                  className="w-12 h-12 flex items-center justify-center rounded-lg border-2 transition-colors hover:bg-black/10"
                  style={{ borderColor: "hsl(30 20% 12% / 0.3)" }}
                  aria-label="Scroll left"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollGallery("right")}
                  className="w-12 h-12 flex items-center justify-center rounded-lg border-2 transition-colors hover:bg-black/10"
                  style={{ borderColor: "hsl(30 20% 12% / 0.3)" }}
                  aria-label="Scroll right"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div ref={galleryRef} className="gallery-scroll-camp pl-6 md:pl-12 lg:pl-20 pr-6">
            {COLLEZIONI.map((collezione) => (
              <article key={collezione.id} className="flex-shrink-0 group cursor-pointer" style={{ width: "320px" }}>
                <div className="relative overflow-hidden mb-6 rounded-xl" style={{ aspectRatio: "4/5" }}>
                  <img
                    src={collezione.image}
                    alt={`${collezione.name} - ${collezione.subtitle}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <Badge
                    className="absolute top-4 left-4 font-body-camp text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 rounded"
                    style={{
                      backgroundColor: "hsl(30 20% 12%)",
                      color: "hsl(25 85% 55%)",
                      border: "none",
                    }}
                  >
                    {collezione.tag}
                  </Badge>
                </div>

                <h3 className="font-display-camp text-xl mb-1">{collezione.name}</h3>
                <p className="font-body-camp text-xs uppercase tracking-[0.15em] mb-3" style={{ color: "hsl(30 20% 12% / 0.7)" }}>
                  {collezione.subtitle}
                </p>
                <p className="font-display-camp text-lg" style={{ color: "hsl(30 20% 12%)" }}>
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
              backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
            role="img"
            aria-label="Mountain chalet showroom"
          />
          <div className="absolute inset-0" style={{ backgroundColor: "hsl(30 20% 12% / 0.75)" }} aria-hidden="true" />

          <div className="relative z-10 min-h-[80vh] flex flex-col justify-end px-6 md:px-12 lg:px-20 py-20">
            <p className="font-body-camp text-xs uppercase tracking-[0.5em] mb-4" style={{ color: "hsl(40 70% 60%)" }}>
              Il nostro chalet showroom
            </p>
            <h2 className="font-display-camp text-display-camp max-w-3xl" style={{ color: "hsl(35 30% 92%)" }}>
              800 mq di tradizione
              <br />
              <span style={{ color: "hsl(40 70% 60%)" }}>tra lago e montagna</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-12 border-t" style={{ borderColor: "hsl(35 30% 92% / 0.2)" }}>
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display-camp text-5xl md:text-6xl mb-2 animate-fire" style={{ color: "hsl(25 85% 55%)" }}>
                    {stat.value}
                  </p>
                  <p className="font-body-camp text-sm" style={{ color: "hsl(35 30% 92%)" }}>{stat.label}</p>
                  <p className="font-body-camp text-xs mt-0.5" style={{ color: "hsl(35 30% 92% / 0.6)" }}>{stat.sublabel}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            CONTACT
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-32 md:py-48 px-6 md:px-12 lg:px-20" style={{ backgroundColor: "hsl(28 18% 16%)" }}>
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-body-camp text-xs uppercase tracking-[0.5em] mb-6" style={{ color: "hsl(40 70% 60%)" }}>
              Inizia il tuo progetto / Start your project
            </p>

            <h2 className="font-display-camp text-display-camp mb-8">
              Il tuo rifugio
              <br />
              <span className="animate-fire inline-block" style={{ color: "hsl(25 85% 55%)" }}>ti aspetta</span>
            </h2>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="font-body-camp text-sm px-12 py-6 uppercase tracking-[0.2em] hover-campfire rounded-lg"
                  style={{
                    backgroundColor: "hsl(25 85% 55%)",
                    color: "hsl(30 20% 12%)",
                    border: "none",
                  }}
                >
                  Prenota visita
                </Button>
              </DialogTrigger>
              <DialogContent
                className="max-w-lg"
                style={{
                  backgroundColor: "hsl(28 18% 16%)",
                  borderRadius: "12px",
                  border: "1px solid hsl(28 15% 25%)",
                }}
              >
                <DialogHeader className="pb-6 border-b" style={{ borderColor: "hsl(28 15% 25%)" }}>
                  <DialogTitle className="font-display-camp text-2xl" style={{ color: "hsl(35 30% 92%)" }}>
                    Visita il Chalet
                  </DialogTitle>
                  <DialogDescription className="font-body-camp text-sm mt-2" style={{ color: "hsl(30 10% 55%)" }}>
                    Prenota una visita al nostro showroom alpino.
                  </DialogDescription>
                </DialogHeader>

                <form className="space-y-5 pt-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="font-body-camp text-xs uppercase tracking-[0.15em] block mb-2" style={{ color: "hsl(30 10% 55%)" }}>Nome</label>
                      <Input id="name" placeholder="Mario" className="font-body-camp" style={{ borderRadius: "8px", backgroundColor: "hsl(30 20% 12%)", borderColor: "hsl(28 15% 25%)", color: "hsl(35 30% 92%)" }} />
                    </div>
                    <div>
                      <label htmlFor="surname" className="font-body-camp text-xs uppercase tracking-[0.15em] block mb-2" style={{ color: "hsl(30 10% 55%)" }}>Cognome</label>
                      <Input id="surname" placeholder="Rossi" className="font-body-camp" style={{ borderRadius: "8px", backgroundColor: "hsl(30 20% 12%)", borderColor: "hsl(28 15% 25%)", color: "hsl(35 30% 92%)" }} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="font-body-camp text-xs uppercase tracking-[0.15em] block mb-2" style={{ color: "hsl(30 10% 55%)" }}>Email</label>
                    <Input id="email" type="email" placeholder="mario.rossi@email.it" className="font-body-camp" style={{ borderRadius: "8px", backgroundColor: "hsl(30 20% 12%)", borderColor: "hsl(28 15% 25%)", color: "hsl(35 30% 92%)" }} />
                  </div>

                  <div>
                    <label htmlFor="interest" className="font-body-camp text-xs uppercase tracking-[0.15em] block mb-2" style={{ color: "hsl(30 10% 55%)" }}>Area di interesse</label>
                    <Select>
                      <SelectTrigger id="interest" className="font-body-camp" style={{ borderRadius: "8px", backgroundColor: "hsl(30 20% 12%)", borderColor: "hsl(28 15% 25%)", color: "hsl(35 30% 92%)" }}>
                        <SelectValue placeholder="Seleziona..." />
                      </SelectTrigger>
                      <SelectContent style={{ borderRadius: "8px", backgroundColor: "hsl(28 18% 16%)", borderColor: "hsl(28 15% 25%)" }}>
                        <SelectItem value="stube">Stube & Living</SelectItem>
                        <SelectItem value="camera">Camera & Suite</SelectItem>
                        <SelectItem value="cucina">Cucina & Dining</SelectItem>
                        <SelectItem value="completo">Progetto Completo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer pt-2">
                    <Checkbox checked={privacyAccepted} onCheckedChange={(c) => setPrivacyAccepted(c === true)} className="mt-0.5" />
                    <span className="font-body-camp text-xs leading-relaxed" style={{ color: "hsl(30 10% 55%)" }}>
                      Accetto la Privacy Policy e acconsento al trattamento dei dati.
                    </span>
                  </label>

                  <Button
                    type="submit"
                    className="w-full font-body-camp text-sm py-5 uppercase tracking-[0.15em] rounded-lg"
                    style={{
                      backgroundColor: privacyAccepted ? "hsl(25 85% 55%)" : "hsl(28 15% 25%)",
                      color: privacyAccepted ? "hsl(30 20% 12%)" : "hsl(30 10% 50%)",
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
                <p className="font-body-camp text-[10px] uppercase tracking-[0.3em] mb-1" style={{ color: "hsl(30 10% 50%)" }}>Telefono</p>
                <a href="tel:+390309912345" className="font-display-camp text-lg" style={{ color: "hsl(35 30% 92%)" }}>+39 030 991 2345</a>
              </div>
              <div>
                <p className="font-body-camp text-[10px] uppercase tracking-[0.3em] mb-1" style={{ color: "hsl(30 10% 50%)" }}>Email</p>
                <a href="mailto:chalet@casaegiardino.it" className="font-display-camp text-lg" style={{ color: "hsl(35 30% 92%)" }}>chalet@casaegiardino.it</a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            FOOTER
        ═══════════════════════════════════════════════════════════════════════ */}
        <footer className="py-16 px-6 md:px-12 lg:px-20 border-t" style={{ borderColor: "hsl(28 15% 25%)", backgroundColor: "hsl(30 20% 12%)" }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            <div className="md:col-span-4">
              <h3 className="font-display-camp text-3xl mb-4" style={{ color: "hsl(25 85% 55%)" }}>Casa & Giardino</h3>
              <p className="font-body-camp text-sm max-w-xs" style={{ color: "hsl(30 10% 55%)" }}>
                Arredamento alpino dal 1998. Tra il Lago di Garda e le Dolomiti.
              </p>
            </div>

            <div className="md:col-span-3">
              <p className="font-body-camp text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: "hsl(30 10% 50%)" }}>Showroom</p>
              <address className="font-body-camp text-sm not-italic" style={{ color: "hsl(30 10% 55%)" }}>
                Via del Lago, 42<br />25015 Desenzano del Garda<br />Brescia, Italia
              </address>
            </div>

            <div className="md:col-span-3">
              <p className="font-body-camp text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: "hsl(30 10% 50%)" }}>Orari</p>
              <p className="font-body-camp text-sm" style={{ color: "hsl(30 10% 55%)" }}>
                Lun - Sab: 9:00 - 18:00<br />Dom: Su appuntamento<br />Inverno: orario continuato
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="font-body-camp text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: "hsl(30 10% 50%)" }}>Legal</p>
              <ul className="space-y-2">
                {["Privacy", "Cookie", "Terms"].map((link) => (
                  <li key={link}><a href="#" className="font-body-camp text-sm" style={{ color: "hsl(30 10% 55%)" }}>{link}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: "hsl(28 15% 25%)" }}>
            <a href="/" className="font-body-camp text-xs uppercase tracking-[0.2em] flex items-center gap-2" style={{ color: "hsl(30 10% 55%)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
              Torna alla Gallery
            </a>
            <span className="font-display-camp text-sm" style={{ color: "hsl(25 85% 55%)" }}>45.4654° N, 10.6339° E</span>
          </div>

          <div className="mt-8 text-center">
            <p className="font-body-camp text-[10px] uppercase tracking-[0.3em]" style={{ color: "hsl(30 10% 50%)" }}>
              2024 Casa & Giardino S.r.l. - CrazyOne UI / Campfire
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
