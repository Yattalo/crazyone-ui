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
} from "@crazyone/ui-cyberdeck";

// Import theme CSS
import "@crazyone/ui-cyberdeck/styles.css";

export function CyberdeckDemo() {
  return (
    <div
      data-theme="cyberdeck"
      className="min-h-screen p-8"
      style={{
        fontFamily: "var(--font-family, 'JetBrains Mono', monospace)",
        backgroundColor: "hsl(var(--background))",
        color: "hsl(var(--foreground))",
      }}
    >
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <header className="border-b pb-6" style={{ borderColor: "hsl(var(--border))" }}>
          <h1 className="text-4xl font-bold uppercase tracking-wider">
            &gt; CYBERDECK_THEME.exe
          </h1>
          <p className="text-lg mt-2" style={{ color: "hsl(var(--muted-foreground))" }}>
            // Neon-lit hacker aesthetic. Matrix green. Terminal black.
          </p>
        </header>

        {/* Buttons Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold uppercase tracking-wider pb-2">
            [BUTTONS]
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button>Execute</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Abort</Button>
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
            [SYSTEM_CARDS]
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>&gt; PROCESS_001</CardTitle>
                <CardDescription>// Active neural interface</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Connection established. Data stream active. Monitoring all channels.</p>
              </CardContent>
              <CardFooter>
                <Button>Access Terminal</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>&gt; SYSTEM_STATUS</CardTitle>
                <CardDescription>// Runtime diagnostics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>MAINFRAME</span>
                    <Badge>ONLINE</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>FIREWALL</span>
                    <Badge variant="secondary">ACTIVE</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>INTRUSION</span>
                    <Badge variant="destructive">DETECTED</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Inputs Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold uppercase tracking-wider pb-2">
            [INPUT_FIELDS]
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Input placeholder="Enter_username" />
              <Input placeholder="Enter_password" type="password" />
              <Input placeholder="[DISABLED]" disabled />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Checkbox id="encrypt" />
                <label htmlFor="encrypt">[x] Enable encryption</label>
              </div>
              <div className="flex items-center gap-3">
                <Switch id="stealth" />
                <label htmlFor="stealth">[x] Stealth mode</label>
              </div>
              <div className="space-y-2">
                <label>// Signal strength</label>
                <Slider defaultValue={[75]} max={100} step={1} />
              </div>
            </div>
          </div>
        </section>

        {/* Alerts Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold uppercase tracking-wider pb-2">
            [SYSTEM_ALERTS]
          </h2>
          <div className="space-y-4">
            <Alert>
              <AlertTitle>&gt; INFO</AlertTitle>
              <AlertDescription>System operating within normal parameters.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>&gt; CRITICAL</AlertTitle>
              <AlertDescription>Security breach detected. Countermeasures initiated.</AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold uppercase tracking-wider pb-2">
            [NAVIGATION_TABS]
          </h2>
          <Tabs defaultValue="terminal">
            <TabsList>
              <TabsTrigger value="terminal">Terminal</TabsTrigger>
              <TabsTrigger value="network">Network</TabsTrigger>
              <TabsTrigger value="config">Config</TabsTrigger>
            </TabsList>
            <TabsContent value="terminal" className="p-4 border mt-2" style={{ borderColor: "hsl(var(--border))" }}>
              <p>&gt; Ready for input...</p>
              <p>&gt; _</p>
            </TabsContent>
            <TabsContent value="network" className="p-4 border mt-2" style={{ borderColor: "hsl(var(--border))" }}>
              <p>&gt; Scanning network nodes...</p>
              <p>&gt; 42 active connections found</p>
            </TabsContent>
            <TabsContent value="config" className="p-4 border mt-2" style={{ borderColor: "hsl(var(--border))" }}>
              <p>&gt; Configuration loaded</p>
              <p>&gt; All systems nominal</p>
            </TabsContent>
          </Tabs>
        </section>

        {/* Badges Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold uppercase tracking-wider pb-2">
            [STATUS_BADGES]
          </h2>
          <div className="flex flex-wrap gap-3">
            <Badge>ACTIVE</Badge>
            <Badge variant="secondary">STANDBY</Badge>
            <Badge variant="outline">OFFLINE</Badge>
            <Badge variant="destructive">ERROR</Badge>
          </div>
        </section>

        {/* Back Link */}
        <footer className="pt-8 border-t" style={{ borderColor: "hsl(var(--border))" }}>
          <a href="/" className="text-lg font-bold hover:underline uppercase tracking-wider">
            &lt;-- EXIT_DEMO
          </a>
        </footer>
      </div>
    </div>
  );
}
