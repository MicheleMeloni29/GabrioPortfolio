export type ProjectPreview = {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    coverImage: string;
    images: Array<{
        id: string;
        gradient: string;
    }>;
};

export const projectsData: readonly ProjectPreview[] = [
    {
        id: "fish-shop",
        title: "FISH SHOP",
        subtitle: "Pescheria - Sestu (CA)",
        description: "Fresco • Locale • Chiaro",
        coverImage: "/images/projects/FishShop/FishShop.png",
        images: [
            { id: "blu mare", gradient: "linear-gradient(#0B63B6)" },
            { id: "azzurro chiaro", gradient: "linear-gradient(#6FAED9)" },
            { id: "bianco ghiaccio", gradient: "linear-gradient(#F5F7F8)" },
            { id: "grigio antracite", gradient: "linear-gradient(#2E2E2E)" },
        ],
    },
    {
        id: "luca-pizza",
        title: "LUCA PIZZA",
        subtitle: "Pizzeria - Sardegna (ITA)",
        description: "Diretto • Riconoscibile • Essenziale",
        coverImage: "/images/projects/LucaPizza/LucaPizza.png",
        images: [
            { id: "rosso pizza", gradient: "linear-gradient(#C62828)" },
            { id: "nero carbone", gradient: "linear-gradient(#1E1E1E)" },
            { id: "bianco panna", gradient: "linear-gradient(#FAFAF7)" },
            { id: "verde oliva", gradient: "linear-gradient(#3F6B3C)" },
        ],
    },
    {
        id: "VI-miglio",
        title: "VI MIGLIO ASD",
        subtitle: "Padel - Sestu (CA)",
        description: "Sport • Appartenenza • Identità",
        coverImage: "/images/projects/VI_Miglio/VI_Miglio.jpeg",
        images: [
            { id: "blu sport", gradient: "linear-gradient(#0A4E8A)" },
            { id: "azzurro campo", gradient: "linear-gradient(#4FA3D1)" },
            { id: "beige sabbia", gradient: "linear-gradient(#D2B48C)" },
            { id: "bianco puro", gradient: "linear-gradient(#FFFFFF)" },
        ],
    },
    
] as const;
