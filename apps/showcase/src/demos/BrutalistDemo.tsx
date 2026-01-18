import { useState, useEffect, useRef } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Badge,
  Alert,
  AlertTitle,
  AlertDescription,
  Checkbox,
  Switch,
  Slider,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@crazyone/ui-brutalist";

// Import theme CSS
import "@crazyone/ui-brutalist/styles.css";

// Custom styles embedded for demo-specific brutalist effects
const customStyles = `
  @keyframes brutalist-marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  @keyframes brutalist-glitch-hero {
    0%, 100% {
      clip-path: inset(0 0 0 0);
      transform: translate(0);
    }
    5% {
      clip-path: inset(40% 0 20% 0);
      transform: translate(-4px, 2px);
    }
    10% {
      clip-path: inset(10% 0 60% 0);
      transform: translate(4px, -2px);
    }
    15% {
      clip-path: inset(80% 0 5% 0);
      transform: translate(-2px, 4px);
    }
    20% {
      clip-path: inset(0 0 0 0);
      transform: translate(0);
    }
  }

  @keyframes brutalist-scan {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }

  @keyframes brutalist-cursor-blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }

  @keyframes brutalist-shake-infinite {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    10% { transform: translate(-2px, -1px) rotate(-0.5deg); }
    20% { transform: translate(2px, 1px) rotate(0.5deg); }
    30% { transform: translate(-1px, 2px) rotate(-0.5deg); }
    40% { transform: translate(1px, -1px) rotate(0.5deg); }
    50% { transform: translate(-2px, 1px) rotate(-0.5deg); }
    60% { transform: translate(2px, -1px) rotate(0.5deg); }
    70% { transform: translate(-1px, -2px) rotate(-0.5deg); }
    80% { transform: translate(1px, 2px) rotate(0.5deg); }
    90% { transform: translate(-2px, -1px) rotate(-0.5deg); }
  }

  @keyframes brutalist-flicker-text {
    0%, 100% { opacity: 1; }
    92% { opacity: 1; }
    93% { opacity: 0.1; }
    94% { opacity: 0.9; }
    95% { opacity: 0.2; }
    96% { opacity: 1; }
  }

  @keyframes noise {
    0%, 100% { background-position: 0 0; }
    10% { background-position: -5% -10%; }
    20% { background-position: -15% 5%; }
    30% { background-position: 7% -25%; }
    40% { background-position: 20% 25%; }
    50% { background-position: -25% 10%; }
    60% { background-position: 15% 5%; }
    70% { background-position: 0 15%; }
    80% { background-position: 25% 35%; }
    90% { background-position: -10% 10%; }
  }

  .brutalist-hero-text:hover {
    animation: brutalist-glitch-hero 0.5s ease-in-out;
  }

  .brutalist-marquee-track {
    animation: brutalist-marquee 20s linear infinite;
  }

  .brutalist-scan-line {
    animation: brutalist-scan 4s linear infinite;
  }

  .brutalist-flicker {
    animation: brutalist-flicker-text 3s infinite;
  }

  .brutalist-shake-hover:hover {
    animation: brutalist-shake-infinite 0.3s ease-in-out;
  }

  .brutalist-cursor::after {
    content: '_';
    animation: brutalist-cursor-blink 0.8s step-end infinite;
  }

  .brutalist-noise::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    opacity: 0.03;
    pointer-events: none;
    animation: noise 1s steps(2) infinite;
  }

  .brutalist-invert:hover {
    filter: invert(1);
  }

  @media (prefers-reduced-motion: reduce) {
    .brutalist-hero-text:hover,
    .brutalist-marquee-track,
    .brutalist-scan-line,
    .brutalist-flicker,
    .brutalist-shake-hover:hover,
    .brutalist-cursor::after,
    .brutalist-noise::before {
      animation: none !important;
    }
  }
`;

export function BrutalistDemo() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [sliderValue, setSliderValue] = useState([50]);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <style>{customStyles}</style>
      <div
        data-theme="brutalist"
        className="min-h-screen relative overflow-x-hidden brutalist-noise"
        style={{
          fontFamily: "var(--font-family, 'JetBrains Mono', monospace)",
          backgroundColor: "hsl(var(--background))",
          color: "hsl(var(--foreground))",
          cursor: "crosshair",
        }}
      >
        {/* Scan Line Effect */}
        <div
          className="brutalist-scan-line fixed top-0 left-0 w-full h-[2px] pointer-events-none z-50"
          style={{ backgroundColor: "hsl(var(--primary) / 0.3)" }}
        />

        {/* Grid Coordinates Overlay */}
        <div className="fixed top-4 left-4 text-[10px] uppercase tracking-[0.3em] brutalist-flicker z-40"
          style={{ color: "hsl(var(--muted-foreground))" }}>
          [{Math.floor(mousePos.x / 100)}.{Math.floor(mousePos.y / 100)}]
        </div>

        {/* HERO SECTION */}
        <section
          ref={heroRef}
          className="min-h-screen flex flex-col justify-center relative border-b-4 border-current"
        >
          {/* Giant Typography */}
          <div className="px-4 md:px-8">
            <h1
              className="brutalist-hero-text text-[18vw] md:text-[20vw] font-black uppercase leading-[0.8] tracking-[-0.02em] select-none"
              style={{
                textShadow: "8px 8px 0 hsl(var(--primary))",
                WebkitTextStroke: "2px currentColor",
              }}
            >
              BRUTAL
            </h1>
            <h1
              className="brutalist-hero-text text-[18vw] md:text-[20vw] font-black uppercase leading-[0.8] tracking-[-0.02em] select-none -mt-[2vw]"
              style={{
                color: "transparent",
                WebkitTextStroke: "3px currentColor",
              }}
            >
              IST
            </h1>
          </div>

          {/* Manifesto Strip */}
          <div
            className="absolute bottom-0 left-0 right-0 border-t-4 border-current py-4 overflow-hidden"
            style={{ backgroundColor: "hsl(var(--foreground))", color: "hsl(var(--background))" }}
          >
            <div className="brutalist-marquee-track flex whitespace-nowrap">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="text-sm md:text-base uppercase tracking-[0.5em] px-8">
                  RAW CONCRETE / ZERO PRETENSE / EXPOSED STRUCTURE / HARSH SHADOWS / NO APOLOGIES /
                </span>
              ))}
            </div>
          </div>

          {/* Floating Badge */}
          <div className="absolute top-8 right-8 rotate-12">
            <Badge
              className="text-lg md:text-xl px-6 py-3 brutalist-shake-hover"
              style={{
                backgroundColor: "hsl(var(--primary))",
                boxShadow: "6px 6px 0 0 hsl(var(--foreground))",
              }}
            >
              UI SYSTEM
            </Badge>
          </div>

          {/* Coordinates */}
          <div className="absolute bottom-20 right-8 text-right">
            <p className="text-xs uppercase tracking-[0.4em]" style={{ color: "hsl(var(--muted-foreground))" }}>
              GRID_REF
            </p>
            <p className="text-2xl md:text-4xl font-bold">51.5074 N</p>
            <p className="text-2xl md:text-4xl font-bold">0.1278 W</p>
          </div>
        </section>

        {/* MANIFESTO SECTION */}
        <section className="py-24 md:py-32 px-4 md:px-8 border-b-4 border-current">
          <div className="max-w-none">
            <p className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase leading-[1.1] tracking-tight">
              WE DON'T <span style={{ color: "hsl(var(--primary))" }}>APOLOGIZE</span> FOR OUR{" "}
              <span className="brutalist-invert inline-block px-2 transition-all duration-100">DESIGN</span>.{" "}
              WE BUILD WITH <span className="line-through">ROUNDED CORNERS</span>{" "}
              <span className="brutalist-cursor">SHARP EDGES</span>.
            </p>
          </div>
        </section>

        {/* COMPONENTS CHAOS GRID */}
        <section className="py-16 md:py-24 px-4 md:px-8 relative">
          {/* Section Label */}
          <div
            className="absolute top-8 left-4 md:left-8 writing-mode-vertical text-xs uppercase tracking-[0.5em] brutalist-flicker"
            style={{
              writingMode: "vertical-rl",
              color: "hsl(var(--muted-foreground))",
            }}
          >
            COMPONENTS_SHOWCASE
          </div>

          {/* Asymmetric Grid */}
          <div className="grid grid-cols-12 gap-4 md:gap-6">

            {/* BUTTONS - Large block */}
            <div
              className="col-span-12 lg:col-span-7 relative"
              onMouseEnter={() => setActiveSection("buttons")}
              onMouseLeave={() => setActiveSection(null)}
            >
              <Card className={`transition-all duration-200 ${activeSection === "buttons" ? "-translate-x-2 -translate-y-2" : ""}`}>
                <div className="absolute -top-3 -left-3 text-[10px] uppercase tracking-[0.3em] px-2 py-1 border-2 border-current"
                  style={{ backgroundColor: "hsl(var(--background))" }}>
                  [01.BUTTONS]
                </div>
                <CardContent className="p-8 md:p-12">
                  <div className="space-y-8">
                    <div className="flex flex-wrap gap-4">
                      <Button className="text-lg px-8 py-6">PRIMARY_ACTION</Button>
                      <Button variant="outline" className="text-lg px-8 py-6">OUTLINE</Button>
                      <Button variant="destructive" className="text-lg px-8 py-6">DESTROY</Button>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="secondary">SECONDARY</Button>
                      <Button variant="ghost">GHOST</Button>
                      <Button size="sm">SM</Button>
                      <Button size="lg">LARGE_BTN</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* BADGE Stack - Small block */}
            <div className="col-span-12 lg:col-span-5 lg:row-span-2 relative">
              <Card
                className="h-full"
                onMouseEnter={() => setActiveSection("badges")}
                onMouseLeave={() => setActiveSection(null)}
              >
                <div className="absolute -top-3 -left-3 text-[10px] uppercase tracking-[0.3em] px-2 py-1 border-2 border-current"
                  style={{ backgroundColor: "hsl(var(--background))" }}>
                  [02.BADGES]
                </div>
                <CardContent className="p-8 flex flex-col justify-center h-full">
                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-3">
                      <Badge className="text-xl px-6 py-2">STATUS_OK</Badge>
                      <Badge variant="secondary" className="text-xl px-6 py-2">PENDING</Badge>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="outline" className="text-lg px-4 py-1">v4.2.0</Badge>
                      <Badge variant="destructive" className="text-lg px-4 py-1">CRITICAL</Badge>
                    </div>
                    <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "hsl(var(--muted-foreground))" }}>
                      4 VARIANT TYPES / INFINITE POSSIBILITIES
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* INPUT Block */}
            <div className="col-span-12 lg:col-span-7">
              <Card
                onMouseEnter={() => setActiveSection("inputs")}
                onMouseLeave={() => setActiveSection(null)}
              >
                <div className="absolute -top-3 -left-3 text-[10px] uppercase tracking-[0.3em] px-2 py-1 border-2 border-current"
                  style={{ backgroundColor: "hsl(var(--background))" }}>
                  [03.FORMS]
                </div>
                <CardContent className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="YOUR_NAME" className="text-lg" />
                    <Input placeholder="YOUR_EMAIL" type="email" className="text-lg" />
                  </div>
                  <div className="flex flex-wrap items-center gap-8">
                    <label className="flex items-center gap-3 cursor-pointer brutalist-shake-hover">
                      <Checkbox
                        id="brutal-check"
                        checked={checkboxChecked}
                        onCheckedChange={(checked) => setCheckboxChecked(checked === true)}
                      />
                      <span className="uppercase text-sm tracking-wider">I_ACCEPT_CHAOS</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer brutalist-shake-hover">
                      <Switch
                        id="brutal-switch"
                        checked={switchChecked}
                        onCheckedChange={setSwitchChecked}
                      />
                      <span className="uppercase text-sm tracking-wider">DARK_MODE</span>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ALERT Block - Full width with offset */}
            <div className="col-span-12 relative">
              <div className="lg:ml-[8%] lg:mr-[4%]">
                <Alert className="border-4">
                  <AlertTitle className="text-2xl font-bold uppercase tracking-wider">
                    SYSTEM_NOTICE
                  </AlertTitle>
                  <AlertDescription className="text-lg uppercase tracking-wide mt-2">
                    THIS IS NOT A DRILL. BRUTALISM IS NOW YOUR DEFAULT STATE.
                  </AlertDescription>
                </Alert>
                <Alert variant="destructive" className="border-4 mt-4">
                  <AlertTitle className="text-2xl font-bold uppercase tracking-wider">
                    WARNING_CRITICAL
                  </AlertTitle>
                  <AlertDescription className="text-lg uppercase tracking-wide mt-2">
                    ROUNDED CORNERS DETECTED. IMMEDIATE ACTION REQUIRED.
                  </AlertDescription>
                </Alert>
              </div>
            </div>

            {/* SLIDER Block */}
            <div className="col-span-12 lg:col-span-6">
              <Card>
                <div className="absolute -top-3 -left-3 text-[10px] uppercase tracking-[0.3em] px-2 py-1 border-2 border-current"
                  style={{ backgroundColor: "hsl(var(--background))" }}>
                  [04.SLIDER]
                </div>
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm uppercase tracking-wider">AGGRESSION_LEVEL</span>
                      <span className="text-4xl font-bold">{sliderValue[0]}%</span>
                    </div>
                    <Slider
                      value={sliderValue}
                      onValueChange={setSliderValue}
                      max={100}
                      step={1}
                      className="py-4"
                    />
                    <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "hsl(var(--muted-foreground))" }}>
                      DRAG TO ADJUST / RELEASE TO COMMIT
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* TABS Block */}
            <div className="col-span-12 lg:col-span-6">
              <Card>
                <div className="absolute -top-3 -left-3 text-[10px] uppercase tracking-[0.3em] px-2 py-1 border-2 border-current"
                  style={{ backgroundColor: "hsl(var(--background))" }}>
                  [05.TABS]
                </div>
                <CardContent className="p-8">
                  <Tabs defaultValue="structure">
                    <TabsList className="w-full">
                      <TabsTrigger value="structure" className="flex-1">STRUCTURE</TabsTrigger>
                      <TabsTrigger value="shadow" className="flex-1">SHADOW</TabsTrigger>
                      <TabsTrigger value="grid" className="flex-1">GRID</TabsTrigger>
                    </TabsList>
                    <TabsContent value="structure" className="p-4 border-2 border-current mt-4">
                      <p className="uppercase tracking-wide">RAW MATERIALS. EXPOSED BONES. NO DECORATION.</p>
                    </TabsContent>
                    <TabsContent value="shadow" className="p-4 border-2 border-current mt-4">
                      <p className="uppercase tracking-wide">HARD OFFSET. ZERO BLUR. MAXIMUM CONTRAST.</p>
                    </TabsContent>
                    <TabsContent value="grid" className="p-4 border-2 border-current mt-4">
                      <p className="uppercase tracking-wide">COORDINATES EXPOSED. SYSTEM VISIBLE. TRUTH.</p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

          </div>
        </section>

        {/* CARDS SHOWCASE - Overlapping */}
        <section className="py-16 md:py-24 px-4 md:px-8 border-t-4 border-current relative overflow-visible">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tight mb-16">
            CARDS<span style={{ color: "hsl(var(--primary))" }}>.</span>
          </h2>

          <div className="relative h-[600px] md:h-[500px]">
            {/* Card 1 */}
            <Card className="absolute top-0 left-0 w-[90%] md:w-[45%] z-10 hover:z-30 transition-all duration-300">
              <CardHeader className="border-b-2 border-current">
                <CardTitle className="text-3xl uppercase tracking-wider">PROJECT_ALPHA</CardTitle>
                <CardDescription className="uppercase tracking-wide">CONCRETE FOUNDATIONS</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="uppercase tracking-wide">
                  RAW, UNFILTERED DESIGN THAT DOESN'T APOLOGIZE FOR ITS EXISTENCE.
                </p>
              </CardContent>
              <CardFooter className="border-t-2 border-current pt-6">
                <Button className="w-full">VIEW_DETAILS</Button>
              </CardFooter>
            </Card>

            {/* Card 2 - Offset */}
            <Card
              className="absolute top-16 md:top-8 left-[10%] md:left-[30%] w-[90%] md:w-[45%] z-20 hover:z-30 transition-all duration-300"
              style={{ backgroundColor: "hsl(var(--foreground))", color: "hsl(var(--background))" }}
            >
              <CardHeader className="border-b-2 border-current">
                <CardTitle className="text-3xl uppercase tracking-wider">SYSTEM_STATUS</CardTitle>
                <CardDescription className="uppercase tracking-wide" style={{ color: "hsl(var(--background) / 0.7)" }}>
                  ALL SYSTEMS OPERATIONAL
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-3">
                <div className="flex justify-between items-center border-b border-current pb-2">
                  <span className="uppercase tracking-wide">SERVER</span>
                  <Badge style={{ backgroundColor: "hsl(var(--background))", color: "hsl(var(--foreground))" }}>
                    ONLINE
                  </Badge>
                </div>
                <div className="flex justify-between items-center border-b border-current pb-2">
                  <span className="uppercase tracking-wide">DATABASE</span>
                  <Badge variant="secondary">SYNCING</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="uppercase tracking-wide">CACHE</span>
                  <Badge variant="outline" style={{ borderColor: "hsl(var(--background))", color: "hsl(var(--background))" }}>
                    WARM
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Card 3 - More offset */}
            <Card className="absolute top-32 md:top-16 left-[5%] md:left-[55%] w-[90%] md:w-[40%] z-10 hover:z-30 transition-all duration-300 -rotate-1">
              <CardHeader>
                <CardTitle className="text-2xl uppercase tracking-wider">METRICS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-6xl md:text-7xl font-black" style={{ color: "hsl(var(--primary))" }}>
                  99.9%
                </div>
                <p className="text-sm uppercase tracking-[0.3em] mt-2" style={{ color: "hsl(var(--muted-foreground))" }}>
                  UPTIME_GUARANTEED
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA FOOTER */}
        <footer
          className="py-24 md:py-32 px-4 md:px-8 border-t-4 border-current relative"
          style={{ backgroundColor: "hsl(var(--foreground))", color: "hsl(var(--background))" }}
        >
          {/* Background text */}
          <div
            className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none"
            style={{ opacity: 0.03 }}
          >
            <span className="text-[40vw] font-black uppercase">
              RAW
            </span>
          </div>

          <div className="relative z-10 max-w-4xl">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tight mb-8">
              STOP<br />
              BEING<br />
              <span style={{ color: "hsl(var(--primary))" }}>POLITE</span>
            </h2>

            <p className="text-xl md:text-2xl uppercase tracking-[0.2em] mb-12 max-w-2xl">
              JOIN THE BRUTALIST MOVEMENT. EMBRACE THE RAW. REJECT THE ROUNDED.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                className="text-xl md:text-2xl px-12 py-8 brutalist-shake-hover"
                style={{
                  backgroundColor: "hsl(var(--background))",
                  color: "hsl(var(--foreground))",
                  boxShadow: "8px 8px 0 0 hsl(var(--primary))",
                }}
              >
                GET_STARTED
              </Button>
              <Button
                variant="outline"
                className="text-xl md:text-2xl px-12 py-8"
                style={{
                  borderColor: "hsl(var(--background))",
                  color: "hsl(var(--background))",
                }}
              >
                VIEW_DOCS
              </Button>
            </div>
          </div>

          {/* Back link */}
          <div className="relative z-10 mt-24 pt-8 border-t-2" style={{ borderColor: "hsl(var(--background) / 0.3)" }}>
            <a
              href="/"
              className="text-lg font-bold uppercase tracking-[0.3em] brutalist-shake-hover inline-block transition-all hover:translate-x-2"
              style={{ color: "hsl(var(--background))" }}
            >
              [&larr; RETURN_TO_GALLERY]
            </a>

            <div className="mt-8 flex flex-wrap gap-8 text-xs uppercase tracking-[0.3em]" style={{ color: "hsl(var(--background) / 0.5)" }}>
              <span>CRAZYONE_UI</span>
              <span>/</span>
              <span>BRUTALIST_THEME</span>
              <span>/</span>
              <span>V1.0.0</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
