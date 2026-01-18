export interface ThemeDef {
    name: string;
    label: string;
    description: string;
    context: string;
    colors: {
        primary: string;
        secondary: string;
    };
    features: string[];
    status: "ready" | "coming-soon";
}

export const themes: ThemeDef[] = [
    {
        name: "brutalist",
        label: "Brutalist",
        description: "Raw, unpolished, and bold.",
        context: "ARCHITECTS - Design Studio",
        colors: { primary: "#000000", secondary: "#f0f0f0" },
        features: ["Sharp Edges", "Mono Type"],
        status: "ready",
    },
    {
        name: "vaporwave",
        label: "Vaporwave",
        description: "A nostalgic trip to the 80s.",
        context: "RETRO - Music Label",
        colors: { primary: "#ff71ce", secondary: "#01cdfe" },
        features: ["Gradients", "Neon"],
        status: "ready",
    },
    {
        name: "cyberdeck",
        label: "Cyberdeck",
        description: "High-tech interface for hackers.",
        context: "CYBERSEC - Terminal",
        colors: { primary: "#0f0", secondary: "#000" },
        features: ["Matrix", "Glitch"],
        status: "ready",
    },
    {
        name: "arctic",
        label: "Arctic",
        description: "Cold, clean, and minimal.",
        context: "SAAS - Enterprise",
        colors: { primary: "#00b4d8", secondary: "#caf0f8" },
        features: ["Clean", "Professional"],
        status: "coming-soon",
    },
    {
        name: "bauhaus",
        label: "Bauhaus",
        description: "Form follows function.",
        context: "ART - Gallery",
        colors: { primary: "#ff0000", secondary: "#fac800" },
        features: ["Geometric", "Primary"],
        status: "coming-soon",
    },
    // Add more placeholders to reach 25 generally
];

const placeholders = [
    "bioluminescent", "blackletter", "bubblegum", "campfire", "core",
    "darkroom", "gelato", "greenhouse", "hologram", "lyra", "maia",
    "mira", "nightclub", "nova", "obsidian", "retrofuture",
    "synthwave", "terracotta", "thunderstorm", "vega", "wireframe"
];

const contexts = ["Startup", "Agency", "Portfolio", "E-commerce", "Blog"];

placeholders.forEach((name, i) => {
    if (themes.find(t => t.name === name)) return;
    themes.push({
        name,
        label: name.charAt(0).toUpperCase() + name.slice(1),
        description: "Distinctive design system theme.",
        context: `BUSINESS - ${contexts[i % contexts.length]}`,
        colors: { primary: "#666", secondary: "#ccc" }, // generic
        features: ["Unique"],
        status: "coming-soon"
    })
});
