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
} from "@crazyone/ui-vaporwave";

// Import theme CSS
import "@crazyone/ui-vaporwave/styles.css";

export function VaporwaveDemo() {
  return (
    <div
      data-theme="vaporwave"
      className="min-h-screen p-8"
      style={{
        fontFamily: "var(--font-family, 'Russo One', Impact, sans-serif)",
        backgroundColor: "hsl(var(--background))",
        color: "hsl(var(--foreground))",
      }}
    >
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <header className="border-b pb-6" style={{ borderColor: "hsl(var(--border))" }}>
          <h1 className="text-4xl font-bold uppercase tracking-wider">
            V A P O R W A V E
          </h1>
          <p className="text-lg mt-2" style={{ color: "hsl(var(--muted-foreground))" }}>
            Dead malls, eternal sunset. Hot pink and cyan. VHS aesthetic.
          </p>
        </header>

        {/* Buttons Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold uppercase tracking-wider pb-2">
            B U T T O N S
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        {/* Cards Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold uppercase tracking-wider pb-2">
            C A R D S
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ＤＲＥＡＭ</CardTitle>
                <CardDescription>A e s t h e t i c   v i b e s</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Nostalgia for a future that never happened. Palm trees and sunsets forever.</p>
              </CardContent>
              <CardFooter>
                <Button>E N T E R</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>ＭＡＬＬ</CardTitle>
                <CardDescription>S h o p p i n g   p a r a d i s e</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>FLOOR 1</span>
                    <Badge>OPEN</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>FLOOR 2</span>
                    <Badge variant="secondary">CLOSING</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>FLOOR 3</span>
                    <Badge variant="destructive">ABANDONED</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Inputs Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold uppercase tracking-wider pb-2">
            F O R M S
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Input placeholder="Enter your name" />
              <Input placeholder="Email address" type="email" />
              <Input placeholder="Disabled" disabled />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Checkbox id="retro" />
                <label htmlFor="retro">Enable retro mode</label>
              </div>
              <div className="flex items-center gap-3">
                <Switch id="neon" />
                <label htmlFor="neon">Neon lights</label>
              </div>
              <div className="space-y-2">
                <label>Sunset intensity</label>
                <Slider defaultValue={[80]} max={100} step={1} />
              </div>
            </div>
          </div>
        </section>

        {/* Alerts Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold uppercase tracking-wider pb-2">
            A L E R T S
          </h2>
          <div className="space-y-4">
            <Alert>
              <AlertTitle>ＮＯＴＩＣＥ</AlertTitle>
              <AlertDescription>Welcome to the eternal sunset. Enjoy your stay.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>ＷＡＲＮＩＮＧ</AlertTitle>
              <AlertDescription>Reality distortion field detected.</AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold uppercase tracking-wider pb-2">
            T A B S
          </h2>
          <Tabs defaultValue="music">
            <TabsList>
              <TabsTrigger value="music">Music</TabsTrigger>
              <TabsTrigger value="video">Video</TabsTrigger>
              <TabsTrigger value="art">Art</TabsTrigger>
            </TabsList>
            <TabsContent value="music" className="p-4 border mt-2" style={{ borderColor: "hsl(var(--border))" }}>
              <p>♪ Smooth jazz plays softly in the empty food court ♪</p>
            </TabsContent>
            <TabsContent value="video" className="p-4 border mt-2" style={{ borderColor: "hsl(var(--border))" }}>
              <p>▶ VHS tracking lines dance across the screen</p>
            </TabsContent>
            <TabsContent value="art" className="p-4 border mt-2" style={{ borderColor: "hsl(var(--border))" }}>
              <p>◆ Greek statues and palm trees in digital paradise</p>
            </TabsContent>
          </Tabs>
        </section>

        {/* Badges Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold uppercase tracking-wider pb-2">
            B A D G E S
          </h2>
          <div className="flex flex-wrap gap-3">
            <Badge>AESTHETIC</Badge>
            <Badge variant="secondary">RETRO</Badge>
            <Badge variant="outline">NEON</Badge>
            <Badge variant="destructive">GLITCH</Badge>
          </div>
        </section>

        {/* Back Link */}
        <footer className="pt-8 border-t" style={{ borderColor: "hsl(var(--border))" }}>
          <a href="/" className="text-lg font-bold hover:underline uppercase tracking-wider">
            ← B A C K
          </a>
        </footer>
      </div>
    </div>
  );
}
