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
        name: "casa-giardino",
        label: "Casa & Giardino",
        description: "Luxury furniture showcase. Brutalist Raffinato.",
        context: "LUXURY - Arredamento Lago di Garda",
        colors: { primary: "#C45C26", secondary: "#7D8471" },
        features: ["Luxury", "Serif", "Bilingual"],
        status: "ready",
    },
    {
        name: "casa-giardino-terracotta",
        label: "C&G Terracotta",
        description: "Mediterranean outdoor living. Earthy warmth.",
        context: "OUTDOOR - Collezione Giardino",
        colors: { primary: "#C45C26", secondary: "#8B9A6B" },
        features: ["Outdoor", "Mediterranean", "Warm"],
        status: "ready",
    },
    {
        name: "casa-giardino-greenhouse",
        label: "C&G Greenhouse",
        description: "Botanical garden luxury. Victorian elegance.",
        context: "GARDEN - Collezione Veranda",
        colors: { primary: "#3D7A5A", secondary: "#9AB88D" },
        features: ["Botanical", "Glass", "Green"],
        status: "ready",
    },
    {
        name: "casa-giardino-campfire",
        label: "C&G Campfire",
        description: "Alpine chalet warmth. Mountain craftsmanship.",
        context: "CHALET - Collezione Montagna",
        colors: { primary: "#D4734A", secondary: "#8B6914" },
        features: ["Alpine", "Wood", "Cozy"],
        status: "ready",
    },
    {
        name: "casa-giardino-arctic",
        label: "C&G Arctic",
        description: "Nordic minimalism. The essence of emptiness.",
        context: "NORDIC - Collezione Minimal",
        colors: { primary: "#4AA3C7", secondary: "#E8EEF2" },
        features: ["Minimal", "Light", "Nordic"],
        status: "ready",
    },
    {
        name: "casa-giardino-obsidian",
        label: "C&G Obsidian",
        description: "Midnight luxury. Premium dark elegance.",
        context: "PREMIUM - Collezione Dark",
        colors: { primary: "#D4A943", secondary: "#1A1A1F" },
        features: ["Dark", "Gold", "Prestige"],
        status: "ready",
    },
    {
        name: "casa-giardino-bauhaus",
        label: "C&G Bauhaus",
        description: "Form follows function. Primary color rationalism.",
        context: "DESIGN - Collezione Contemporaneo",
        colors: { primary: "#E53935", secondary: "#FFD54F" },
        features: ["Geometric", "Primary", "Rational"],
        status: "ready",
    },
    {
        name: "casa-giardino-synthwave",
        label: "C&G Synthwave",
        description: "Retro 80s neon luxury. The future is now.",
        context: "RETRO - Collezione 80s Luxe",
        colors: { primary: "#FF4DA6", secondary: "#00E5FF" },
        features: ["Neon", "Retro", "Electric"],
        status: "ready",
    },
    {
        name: "casa-giardino-gelato",
        label: "C&G Gelato",
        description: "Italian riviera pastels. La dolce vita.",
        context: "DOLCE VITA - Collezione Pastel",
        colors: { primary: "#E8A0B0", secondary: "#A8D8B0" },
        features: ["Pastel", "Soft", "Playful"],
        status: "ready",
    },
    {
        name: "casa-giardino-darkroom",
        label: "C&G Darkroom",
        description: "Analog photography aesthetic. Silver prints.",
        context: "GALLERY - Collezione Fotografica",
        colors: { primary: "#B33B3B", secondary: "#1A1A1A" },
        features: ["Film", "Grain", "Monochrome"],
        status: "ready",
    },
    {
        name: "casa-giardino-nightclub",
        label: "C&G Nightclub",
        description: "VIP lounge luxury. Berlin meets Milano.",
        context: "LOUNGE - Collezione Entertainment",
        colors: { primary: "#CC66FF", secondary: "#0099FF" },
        features: ["Velvet", "Neon", "VIP"],
        status: "ready",
    },
    {
        name: "casa-giardino-neomemphis",
        label: "C&G Neo-Memphis",
        description: "Radical design revival. Sottsass tribute.",
        context: "POP - Collezione Postmodern",
        colors: { primary: "#FF3366", secondary: "#33CCAA" },
        features: ["Memphis", "Radical", "Colorful"],
        status: "ready",
    },
    {
        name: "casa-giardino-retrofuture",
        label: "C&G Retrofuture",
        description: "Space Age Italian design. The future of yesterday.",
        context: "ORBITAL - Collezione Space Age",
        colors: { primary: "#FF6B35", secondary: "#0088FF" },
        features: ["Space Age", "Capsule", "Orbital"],
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
