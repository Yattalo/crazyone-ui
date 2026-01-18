import { Route, Switch } from "wouter";
import { themes } from "./data/themes";
import { ThemeCard } from "./components/ThemeCard";
import { useState } from "react";
import { cn } from "./lib/utils";

// Import real theme demos
import { BrutalistDemo } from "./demos/BrutalistDemo";
import { CyberdeckDemo } from "./demos/CyberdeckDemo";
import { VaporwaveDemo } from "./demos/VaporwaveDemo";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <div className="mr-4 flex">
            <a className="mr-6 flex items-center space-x-2 font-bold" href="/">
              CrazyOne UI
            </a>
          </div>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <a href="#" className="transition-colors hover:text-foreground/80">Documentation</a>
            <a href="#" className="transition-colors hover:text-foreground/80">Themes</a>
            <a href="#" className="transition-colors hover:text-foreground/80">GitHub</a>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}

function HomePage() {
  const [filter, setFilter] = useState("All");

  // Sort: Ready first
  const sortedThemes = [...themes].sort((a, b) => {
    if (a.status === "ready" && b.status !== "ready") return -1;
    if (a.status !== "ready" && b.status === "ready") return 1;
    return 0;
  });

  return (
    <div className="container py-10">
      {/* Hero */}
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          CrazyOne Design System Hub
        </h1>
        <p className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
          The central registry for all 25+ themes.
          <span className="block mt-2 font-semibold">12+ Components • 100% TypeScript • SBCE Factory</span>
        </p>
        <div className="mt-4 flex gap-2">
          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
            3 Themes Ready
          </span>
          <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
            22 Coming Soon
          </span>
        </div>
      </section>

      {/* Filters (Mock) */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {["All", "Bold", "Retro", "Dark", "Nature", "Playful", "Professional"].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              "rounded-full px-4 py-1 text-sm font-medium transition-colors border",
              filter === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-muted-foreground hover:bg-muted"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedThemes.map(theme => (
          <ThemeCard key={theme.name} theme={theme} />
        ))}
      </div>
    </div>
  )
}

// Map theme names to their demo components
const THEME_DEMOS: Record<string, React.ComponentType> = {
  brutalist: BrutalistDemo,
  cyberdeck: CyberdeckDemo,
  vaporwave: VaporwaveDemo,
};

function DemoPage({ params }: { params: { name: string } }) {
  const theme = themes.find(t => t.name === params.name);
  if (!theme) return <div className="p-10">Theme not found</div>;

  // Check if we have a real demo for this theme
  const DemoComponent = THEME_DEMOS[params.name];

  if (DemoComponent) {
    // Render the real demo with actual components
    return <DemoComponent />;
  }

  // Fallback for themes without real demos yet
  return (
    <Layout>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-4">{theme.label} Theme</h1>
        <div className="p-10 border rounded-lg shadow-lg" style={{
          background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`
        }}>
          <div className="bg-white/90 p-6 rounded text-black max-w-md">
            <h2 className="text-xl font-bold">Coming Soon</h2>
            <p className="mb-4">The {theme.label} theme components are not yet available.</p>
            <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
              {theme.status === "coming-soon" ? "In Development" : "Ready"}
            </span>
          </div>
        </div>
        <div className="mt-8">
          <a href="/" className="text-primary hover:underline">&larr; Back to Gallery</a>
        </div>
      </div>
    </Layout>
  );
}

function App() {
  return (
    <Switch>
      <Route path="/">
        <Layout>
          <HomePage />
        </Layout>
      </Route>
      <Route path="/demo/:name" component={DemoPage} />
      <Route>
        <Layout>
          <div className="container py-10">404: No such page!</div>
        </Layout>
      </Route>
    </Switch>
  )
}

export default App
