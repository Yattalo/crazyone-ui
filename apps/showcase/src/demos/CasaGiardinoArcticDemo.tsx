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
// ARCTIC - Collezione Minimal Nordico
// Inspired by: Scandinavian design, Arctic light, hygge minimalism
// Typography: Instrument Serif + Geist
// ═══════════════════════════════════════════════════════════════════════════════

const arcticStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500&display=swap');

  :root {
    --arctic-bg: 210 25% 98%;
    --arctic-fg: 215 30% 12%;
    --arctic-card: 210 30% 100%;
    --arctic-primary: 200 70% 50%;
    --arctic-secondary: 210 15% 92%;
    --arctic-accent: 45 80% 55%;
    --arctic-muted: 210 10% 60%;
    --arctic-border: 210 20% 90%;
  }

  .font-display-arctic {
    font-family: 'Instrument Serif', Georgia, serif;
    font-weight: 400;
  }

  .font-body-arctic {
    font-family: 'Geist', -apple-system, sans-serif;
    font-weight: 400;
  }

  .text-hero-arctic {
    font-size: clamp(3.5rem, 12vw, 10rem);
    line-height: 0.85;
    letter-spacing: -0.03em;
  }

  .text-display-arctic {
    font-size: clamp(2.2rem, 5vw, 4.5rem);
    line-height: 0.95;
    letter-spacing: -0.02em;
  }

  @keyframes auroraShift {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  @keyframes crystalFade {
    from {
      opacity: 0;
      transform: translateY(20px);
      filter: blur(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0);
    }
  }

  @keyframes snowfall {
    0% { transform: translateY(-10px); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(10px); opacity: 0; }
  }

  @keyframes breathe {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
  }

  .animate-aurora {
    background-size: 200% 200%;
    animation: auroraShift 10s ease infinite;
  }

  .animate-crystal {
    animation: crystalFade 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .animate-snow {
    animation: snowfall 3s ease-in-out infinite;
  }

  .animate-breathe {
    animation: breathe 4s ease-in-out infinite;
  }

  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
  .delay-500 { animation-delay: 500ms; }
  .delay-600 { animation-delay: 600ms; }

  .hover-arctic {
    transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .hover-arctic:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px -15px hsl(200 70% 50% / 0.15);
  }

  .frost-glass {
    background: linear-gradient(135deg,
      hsl(210 30% 100% / 0.95) 0%,
      hsl(210 30% 100% / 0.85) 100%);
    backdrop-filter: blur(30px);
    border: 1px solid hsl(210 20% 90%);
  }

  .nordic-shadow {
    box-shadow: 0 4px 20px -5px hsl(215 30% 12% / 0.08);
  }

  .gallery-scroll-arctic {
    display: flex;
    gap: 2rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding: 2rem;
    scrollbar-width: none;
  }

  .gallery-scroll-arctic::-webkit-scrollbar {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-aurora,
    .animate-crystal,
    .animate-snow,
    .animate-breathe,
    .hover-arctic {
      animation: none !important;
      transition: none !important;
    }
  }
`;

const SERVIZI = [
  {
    numeral: "01",
    title: "Analisi",
    subtitle: "Analysis",
    description: "Studio della luce naturale. Comprensione dello spazio. Definizione del concetto di vuoto.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=800&fit=crop&q=80",
  },
  {
    numeral: "02",
    title: "Concept",
    subtitle: "Design",
    description: "Minimalismo funzionale. Selezione materiali naturali. Palette neutra con accenti caldi.",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&h=800&fit=crop&q=80",
  },
  {
    numeral: "03",
    title: "Produzione",
    subtitle: "Craft",
    description: "Artigianato nordico. Legni chiari, tessuti naturali. Qualita senza compromessi.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=800&fit=crop&q=80",
  },
  {
    numeral: "04",
    title: "Consegna",
    subtitle: "Delivery",
    description: "Installazione silenziosa. Ogni pezzo al suo posto. L'essenza dello spazio.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=800&fit=crop&q=80",
  },
];

const COLLEZIONI = [
  {
    id: "fjord",
    name: "Collezione Fjord",
    subtitle: "Living",
    price: "da / from 5.400",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=1000&fit=crop&q=80",
    tag: "Essential",
  },
  {
    id: "tundra",
    name: "Collezione Tundra",
    subtitle: "Bedroom",
    price: "da / from 4.200",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=1000&fit=crop&q=80",
    tag: "Pure",
  },
  {
    id: "aurora",
    name: "Collezione Aurora",
    subtitle: "Lighting",
    price: "da / from 890",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=1000&fit=crop&q=80",
    tag: "Light",
  },
  {
    id: "glacier",
    name: "Collezione Glacier",
    subtitle: "Dining",
    price: "da / from 6.800",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&h=1000&fit=crop&q=80",
    tag: "Form",
  },
  {
    id: "hygge",
    name: "Collezione Hygge",
    subtitle: "Accessories",
    price: "da / from 320",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=1000&fit=crop&q=80",
    tag: "Comfort",
  },
];

const STATS = [
  { value: "—", label: "L'essenza del vuoto", sublabel: "The essence of emptiness" },
  { value: "∞", label: "Sfumature di bianco", sublabel: "Shades of white" },
  { value: "1", label: "Filosofia di design", sublabel: "Design philosophy" },
];

export function CasaGiardinoArcticDemo() {
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
      <style>{arcticStyles}</style>
      <div
        className="relative overflow-x-hidden"
        style={{
          fontFamily: "'Geist', sans-serif",
          backgroundColor: "hsl(210 25% 98%)",
          color: "hsl(215 30% 12%)",
        }}
      >
        {/* ═══════════════════════════════════════════════════════════════════════
            HERO - Nordic Light
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="min-h-screen relative">
          {/* Subtle aurora gradient */}
          <div
            className="absolute top-0 right-0 w-1/2 h-1/2 opacity-30 animate-aurora"
            style={{
              background: "linear-gradient(135deg, hsl(200 70% 90%) 0%, hsl(45 80% 90%) 50%, hsl(200 70% 90%) 100%)",
              filter: "blur(100px)",
            }}
            aria-hidden="true"
          />

          <nav className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-6 md:px-12 lg:px-24 py-8">
            <span
              className="font-display-arctic text-2xl italic opacity-0 animate-crystal"
              style={{ color: "hsl(200 70% 50%)" }}
            >
              C&G
            </span>
            <div className="flex items-center gap-10">
              <span
                className="font-body-arctic text-[11px] uppercase tracking-[0.4em] opacity-0 animate-crystal delay-100 hidden md:block"
                style={{ color: "hsl(210 10% 60%)" }}
              >
                Lago di Garda
              </span>
              <Badge
                className="font-body-arctic text-[10px] px-4 py-2 uppercase tracking-[0.3em] opacity-0 animate-crystal delay-200"
                style={{
                  backgroundColor: "transparent",
                  color: "hsl(215 30% 12%)",
                  border: "1px solid hsl(210 20% 90%)",
                  borderRadius: "0",
                }}
              >
                Nordic
              </Badge>
            </div>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
            <div className="lg:col-span-7 flex flex-col justify-center px-6 md:px-12 lg:px-24 py-32 lg:py-0">
              <p
                className="font-body-arctic text-[11px] uppercase tracking-[0.5em] mb-12 opacity-0 animate-crystal delay-300"
                style={{ color: "hsl(200 70% 50%)" }}
              >
                L'essenza del vuoto
              </p>

              <h1 className="font-display-arctic text-hero-arctic opacity-0 animate-crystal delay-400">
                <span className="block italic" style={{ color: "hsl(215 30% 12%)" }}>Casa</span>
                <span className="block" style={{ color: "hsl(200 70% 50%)" }}>&</span>
                <span className="block italic" style={{ color: "hsl(215 30% 12%)" }}>Giardino</span>
              </h1>

              <p
                className="font-display-arctic text-2xl md:text-3xl italic mt-12 max-w-lg opacity-0 animate-crystal delay-500"
                style={{ color: "hsl(210 10% 60%)" }}
              >
                Meno e di piu.
                <br />Lo spazio respira.
              </p>

              <p
                className="font-body-arctic text-sm mt-4 opacity-0 animate-crystal delay-500"
                style={{ color: "hsl(210 10% 50%)" }}
              >
                Less is more. Space breathes.
              </p>

              <div className="mt-20 opacity-0 animate-crystal delay-600">
                <div className="flex items-center gap-8">
                  <div className="w-px h-12" style={{ backgroundColor: "hsl(210 20% 90%)" }} />
                  <div>
                    <p className="font-body-arctic text-[10px] uppercase tracking-[0.4em]" style={{ color: "hsl(210 10% 60%)" }}>
                      Coordinate
                    </p>
                    <p className="font-display-arctic text-lg italic mt-1" style={{ color: "hsl(200 70% 50%)" }}>
                      45.4654° N
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-[60vh] lg:h-auto opacity-0 animate-crystal delay-300">
              <div
                className="absolute inset-0 lg:inset-y-20 lg:left-0 lg:right-12"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=1600&fit=crop&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                role="img"
                aria-label="Minimalist Scandinavian interior with clean lines"
              />
            </div>
          </div>

          {/* Minimal scroll indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0 animate-crystal delay-600">
            <div className="w-px h-8 animate-snow" style={{ backgroundColor: "hsl(210 20% 85%)" }} />
            <span className="font-body-arctic text-[9px] uppercase tracking-[0.4em]" style={{ color: "hsl(210 10% 60%)" }}>
              Scroll
            </span>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            PHILOSOPHY
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-40 md:py-56 px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl mx-auto text-center">
            <p
              className="font-body-arctic text-[11px] uppercase tracking-[0.5em] mb-12"
              style={{ color: "hsl(200 70% 50%)" }}
            >
              Filosofia / Philosophy
            </p>

            <h2 className="font-display-arctic text-display-arctic italic">
              <span style={{ color: "hsl(215 30% 12%)" }}>Il silenzio </span>
              <span style={{ color: "hsl(200 70% 50%)" }}>parla</span>
              <span style={{ color: "hsl(215 30% 12%)" }}>.</span>
              <br />
              <span style={{ color: "hsl(215 30% 12%)" }}>La luce </span>
              <span style={{ color: "hsl(45 80% 55%)" }}>disegna</span>
              <span style={{ color: "hsl(215 30% 12%)" }}>.</span>
            </h2>

            <p
              className="font-body-arctic text-lg mt-16 max-w-xl mx-auto leading-relaxed"
              style={{ color: "hsl(210 10% 50%)" }}
            >
              Silence speaks. Light draws. We believe in the power of negative space,
              the warmth of natural materials, and the quiet confidence of Nordic design.
            </p>

            <div className="mt-20 flex justify-center gap-12">
              {["Frassino", "Lino", "Lana", "Vetro"].map((material, i) => (
                <span
                  key={material}
                  className="font-body-arctic text-[11px] uppercase tracking-[0.3em]"
                  style={{ color: i === 0 ? "hsl(200 70% 50%)" : "hsl(210 10% 60%)" }}
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
        <section
          className="py-32 md:py-48 px-6 md:px-12 lg:px-24"
          style={{ backgroundColor: "hsl(210 30% 100%)" }}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20">
            <div>
              <p className="font-body-arctic text-[11px] uppercase tracking-[0.5em] mb-4" style={{ color: "hsl(210 10% 60%)" }}>
                Processo
              </p>
              <h2 className="font-display-arctic text-display-arctic italic">
                Quattro passi
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVIZI.map((servizio) => (
              <Card
                key={servizio.numeral}
                className="hover-arctic group relative overflow-hidden frost-glass nordic-shadow"
                style={{
                  borderRadius: "0",
                  minHeight: "380px",
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
                  className="absolute inset-0 opacity-0 group-hover:opacity-95 transition-opacity duration-700 frost-glass"
                  aria-hidden="true"
                />

                <CardContent className="relative z-10 h-full flex flex-col justify-between p-8">
                  <span
                    className="font-body-arctic text-[11px] tracking-[0.3em]"
                    style={{ color: "hsl(200 70% 50%)" }}
                  >
                    {servizio.numeral}
                  </span>

                  <div>
                    <h3 className="font-display-arctic text-2xl italic">{servizio.title}</h3>
                    <p className="font-body-arctic text-[11px] uppercase tracking-[0.2em] mt-2" style={{ color: "hsl(210 10% 60%)" }}>
                      {servizio.subtitle}
                    </p>
                    <p
                      className="font-body-arctic text-sm mt-6 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: "hsl(210 10% 50%)" }}
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
          style={{
            backgroundColor: "hsl(215 30% 12%)",
            color: "hsl(210 25% 98%)",
          }}
        >
          <div className="px-6 md:px-12 lg:px-24 mb-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-body-arctic text-[11px] uppercase tracking-[0.5em] mb-4" style={{ color: "hsl(200 70% 60%)" }}>
                  Collezioni
                </p>
                <h2 className="font-display-arctic text-display-arctic italic">
                  Nordic Living
                </h2>
              </div>

              <div className="flex gap-4 mt-8 md:mt-0">
                <button
                  onClick={() => scrollGallery("left")}
                  className="w-12 h-12 flex items-center justify-center border transition-colors hover:bg-white/5"
                  style={{ borderColor: "hsl(210 25% 98% / 0.2)" }}
                  aria-label="Scroll left"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollGallery("right")}
                  className="w-12 h-12 flex items-center justify-center border transition-colors hover:bg-white/5"
                  style={{ borderColor: "hsl(210 25% 98% / 0.2)" }}
                  aria-label="Scroll right"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div ref={galleryRef} className="gallery-scroll-arctic pl-6 md:pl-12 lg:pl-24 pr-6">
            {COLLEZIONI.map((collezione) => (
              <article key={collezione.id} className="flex-shrink-0 group cursor-pointer" style={{ width: "300px" }}>
                <div className="relative overflow-hidden mb-8" style={{ aspectRatio: "3/4" }}>
                  <img
                    src={collezione.image}
                    alt={`${collezione.name} - ${collezione.subtitle}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                    loading="lazy"
                  />
                  <Badge
                    className="absolute top-4 left-4 font-body-arctic text-[9px] uppercase tracking-[0.2em] px-3 py-1.5"
                    style={{
                      backgroundColor: "hsl(210 25% 98%)",
                      color: "hsl(215 30% 12%)",
                      border: "none",
                      borderRadius: "0",
                    }}
                  >
                    {collezione.tag}
                  </Badge>
                </div>

                <h3 className="font-display-arctic text-xl italic mb-1">{collezione.name}</h3>
                <p className="font-body-arctic text-[11px] uppercase tracking-[0.2em] mb-4" style={{ color: "hsl(210 25% 98% / 0.5)" }}>
                  {collezione.subtitle}
                </p>
                <p className="font-body-arctic text-sm" style={{ color: "hsl(200 70% 60%)" }}>
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
        <section className="relative min-h-[70vh]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
            role="img"
            aria-label="Minimal Nordic showroom"
          />
          <div className="absolute inset-0" style={{ backgroundColor: "hsl(210 25% 98% / 0.85)" }} aria-hidden="true" />

          <div className="relative z-10 min-h-[70vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20">
            <div className="max-w-4xl">
              <p className="font-body-arctic text-[11px] uppercase tracking-[0.5em] mb-8" style={{ color: "hsl(200 70% 50%)" }}>
                Showroom
              </p>
              <h2 className="font-display-arctic text-display-arctic italic" style={{ color: "hsl(215 30% 12%)" }}>
                1.200 mq di silenzio
                <br />
                <span style={{ color: "hsl(210 10% 60%)" }}>sul Lago di Garda</span>
              </h2>

              <div className="grid grid-cols-3 gap-16 mt-20">
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display-arctic text-4xl md:text-5xl italic mb-3" style={{ color: "hsl(200 70% 50%)" }}>
                      {stat.value}
                    </p>
                    <p className="font-body-arctic text-sm" style={{ color: "hsl(215 30% 12%)" }}>{stat.label}</p>
                    <p className="font-body-arctic text-[11px] mt-1" style={{ color: "hsl(210 10% 60%)" }}>{stat.sublabel}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            CONTACT
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-40 md:py-56 px-6 md:px-12 lg:px-24">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-body-arctic text-[11px] uppercase tracking-[0.5em] mb-8" style={{ color: "hsl(200 70% 50%)" }}>
              Contatto / Contact
            </p>

            <h2 className="font-display-arctic text-display-arctic italic mb-12">
              Lo spazio
              <br />
              <span style={{ color: "hsl(200 70% 50%)" }}>ti aspetta</span>
            </h2>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="font-body-arctic text-[11px] px-12 py-5 uppercase tracking-[0.3em] hover-arctic"
                  style={{
                    backgroundColor: "hsl(215 30% 12%)",
                    color: "hsl(210 25% 98%)",
                    border: "none",
                    borderRadius: "0",
                  }}
                >
                  Prenota
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg frost-glass" style={{ borderRadius: "0" }}>
                <DialogHeader className="pb-8 border-b" style={{ borderColor: "hsl(210 20% 90%)" }}>
                  <DialogTitle className="font-display-arctic text-2xl italic">Visita lo Showroom</DialogTitle>
                  <DialogDescription className="font-body-arctic text-sm mt-3" style={{ color: "hsl(210 10% 50%)" }}>
                    Prenota una visita nel silenzio.
                  </DialogDescription>
                </DialogHeader>

                <form className="space-y-6 pt-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="font-body-arctic text-[10px] uppercase tracking-[0.2em] block mb-3" style={{ color: "hsl(210 10% 50%)" }}>Nome</label>
                      <Input id="name" placeholder="Mario" className="font-body-arctic" style={{ borderRadius: "0", borderColor: "hsl(210 20% 90%)" }} />
                    </div>
                    <div>
                      <label htmlFor="surname" className="font-body-arctic text-[10px] uppercase tracking-[0.2em] block mb-3" style={{ color: "hsl(210 10% 50%)" }}>Cognome</label>
                      <Input id="surname" placeholder="Rossi" className="font-body-arctic" style={{ borderRadius: "0", borderColor: "hsl(210 20% 90%)" }} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="font-body-arctic text-[10px] uppercase tracking-[0.2em] block mb-3" style={{ color: "hsl(210 10% 50%)" }}>Email</label>
                    <Input id="email" type="email" placeholder="mario.rossi@email.it" className="font-body-arctic" style={{ borderRadius: "0", borderColor: "hsl(210 20% 90%)" }} />
                  </div>

                  <div>
                    <label htmlFor="interest" className="font-body-arctic text-[10px] uppercase tracking-[0.2em] block mb-3" style={{ color: "hsl(210 10% 50%)" }}>Interesse</label>
                    <Select>
                      <SelectTrigger id="interest" className="font-body-arctic" style={{ borderRadius: "0", borderColor: "hsl(210 20% 90%)" }}>
                        <SelectValue placeholder="Seleziona..." />
                      </SelectTrigger>
                      <SelectContent style={{ borderRadius: "0" }}>
                        <SelectItem value="living">Living</SelectItem>
                        <SelectItem value="bedroom">Bedroom</SelectItem>
                        <SelectItem value="dining">Dining</SelectItem>
                        <SelectItem value="complete">Progetto Completo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <label className="flex items-start gap-4 cursor-pointer pt-4">
                    <Checkbox checked={privacyAccepted} onCheckedChange={(c) => setPrivacyAccepted(c === true)} className="mt-0.5" />
                    <span className="font-body-arctic text-[11px] leading-relaxed" style={{ color: "hsl(210 10% 50%)" }}>
                      Accetto la Privacy Policy.
                    </span>
                  </label>

                  <Button
                    type="submit"
                    className="w-full font-body-arctic text-[11px] py-5 uppercase tracking-[0.2em]"
                    style={{
                      backgroundColor: privacyAccepted ? "hsl(215 30% 12%)" : "hsl(210 20% 90%)",
                      color: privacyAccepted ? "hsl(210 25% 98%)" : "hsl(210 10% 60%)",
                      borderRadius: "0",
                      cursor: privacyAccepted ? "pointer" : "not-allowed",
                    }}
                    disabled={!privacyAccepted}
                  >
                    Prenota
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <div className="mt-20 flex justify-center gap-16">
              <div>
                <p className="font-body-arctic text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: "hsl(210 10% 60%)" }}>Tel</p>
                <a href="tel:+390309912345" className="font-display-arctic text-lg italic" style={{ color: "hsl(215 30% 12%)" }}>+39 030 991 2345</a>
              </div>
              <div>
                <p className="font-body-arctic text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: "hsl(210 10% 60%)" }}>Email</p>
                <a href="mailto:nordic@casaegiardino.it" className="font-display-arctic text-lg italic" style={{ color: "hsl(215 30% 12%)" }}>nordic@casaegiardino.it</a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            FOOTER
        ═══════════════════════════════════════════════════════════════════════ */}
        <footer className="py-20 px-6 md:px-12 lg:px-24 border-t" style={{ borderColor: "hsl(210 20% 90%)" }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            <div className="md:col-span-4">
              <h3 className="font-display-arctic text-2xl italic mb-6" style={{ color: "hsl(200 70% 50%)" }}>Casa & Giardino</h3>
              <p className="font-body-arctic text-sm max-w-xs leading-relaxed" style={{ color: "hsl(210 10% 50%)" }}>
                Design nordico dal 1998. Sul Lago di Garda.
              </p>
            </div>

            <div className="md:col-span-3">
              <p className="font-body-arctic text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: "hsl(210 10% 60%)" }}>Showroom</p>
              <address className="font-body-arctic text-sm not-italic leading-relaxed" style={{ color: "hsl(210 10% 50%)" }}>
                Via del Lago, 42<br />25015 Desenzano del Garda<br />Italia
              </address>
            </div>

            <div className="md:col-span-3">
              <p className="font-body-arctic text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: "hsl(210 10% 60%)" }}>Orari</p>
              <p className="font-body-arctic text-sm leading-relaxed" style={{ color: "hsl(210 10% 50%)" }}>
                Mar - Sab: 10:00 - 18:00<br />Dom - Lun: Chiuso
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="font-body-arctic text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: "hsl(210 10% 60%)" }}>Legal</p>
              <ul className="space-y-3">
                {["Privacy", "Cookie", "Terms"].map((link) => (
                  <li key={link}><a href="#" className="font-body-arctic text-sm" style={{ color: "hsl(210 10% 50%)" }}>{link}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6" style={{ borderColor: "hsl(210 20% 90%)" }}>
            <a href="/" className="font-body-arctic text-[11px] uppercase tracking-[0.2em] flex items-center gap-3" style={{ color: "hsl(210 10% 50%)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M15 18l-6-6 6-6" /></svg>
              Gallery
            </a>
            <span className="font-display-arctic text-sm italic" style={{ color: "hsl(200 70% 50%)" }}>45.4654° N, 10.6339° E</span>
          </div>

          <div className="mt-12 text-center">
            <p className="font-body-arctic text-[10px] uppercase tracking-[0.3em]" style={{ color: "hsl(210 10% 60%)" }}>
              2024 Casa & Giardino - CrazyOne UI / Arctic
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
