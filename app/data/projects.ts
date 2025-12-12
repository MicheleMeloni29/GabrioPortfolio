export type ProjectPreview = {
    id: string;
    title: string;
    description: string;
    coverGradient: string;
    images: Array<{
        id: string;
        gradient: string;
    }>;
};

export const projectsData: readonly ProjectPreview[] = [
    {
        id: "reverse-pub",
        title: "Reverse Pub",
        description:
            "Brand Visual, Flyer, palette, stile comunicazione",
        coverGradient: "linear-gradient(135deg,#F7EDD4,#E9CFA5,#B98B5A)",
        images: [
            { id: "mood", gradient: "linear-gradient(135deg,#F1CAB8,#EA8C55)" },
            { id: "packaging", gradient: "linear-gradient(135deg,#FDF0CB,#F3C178)" },
            { id: "editorial", gradient: "linear-gradient(135deg,#F3D9DC,#CBA0B1)" },
            { id: "digital", gradient: "linear-gradient(135deg,#FFE1C6,#F37381)" },
        ],
    },
    {
        id: "pescheria-fresco",
        title: "Pescheria Fresco",
        description:
            "Identita' e social kit. Biglietti, layout feed, sito base",
        coverGradient: "linear-gradient(135deg,#0D0D0D,#212425)",
        images: [
            { id: "stampa", gradient: "linear-gradient(135deg,#4F5F73,#94A6B3)" },
            { id: "poster", gradient: "linear-gradient(135deg,#B98B5A,#F2D0A9)" },
            { id: "set", gradient: "linear-gradient(135deg,#1C1C1C,#595959)" },
            { id: "lookbook", gradient: "linear-gradient(135deg,#FFCFDF,#F3A6D3)" },
        ],
    },
    {
        id: "elite-five-cup",
        title: "Elite Five Cup",
        description:
            "Visual Sportivo, Locandine, identita' evento, social branding.",
        coverGradient: "linear-gradient(135deg,#FEE3EC,#B087B8)",
        images: [
            { id: "lookbook", gradient: "linear-gradient(135deg,#FFCFDF,#F3A6D3)" },
            { id: "details", gradient: "linear-gradient(135deg,#D3BBDD,#A594F9)" },
            { id: "paper", gradient: "linear-gradient(135deg,#FDF2E9,#F9C784)" },
            { id: "backstage", gradient: "linear-gradient(135deg,#2E1F27,#6C4A4A)" },
        ],
    },
    {
        id: "ricevitoria-superenalotto",
        title: "Ricevitoria Superenalotto",
        description:
            "Comunicazione locale, display, materiali stampati.",
        coverGradient: "linear-gradient(135deg,#0D0D0D,#4A1F3D)",
        images: [
            { id: "totem", gradient: "linear-gradient(135deg,#281C2D,#614051)" },
            { id: "motion", gradient: "linear-gradient(135deg,#C33764,#1D2671)" },
            { id: "map", gradient: "linear-gradient(135deg,#302B63,#0F0C29)" },
            { id: "gift", gradient: "linear-gradient(135deg,#FF8C42,#FF3C38)" },
        ],
    },
    {
        id: "V-miglio-sestu",
        title: "V Miglio Sestu",
        description:
            "Comunicazione locale, display, materiali stampati.",
        coverGradient: "linear-gradient(135deg,#0D0D0D,#4A1F3D)",
        images: [
            { id: "totem", gradient: "linear-gradient(135deg,#281C2D,#614051)" },
            { id: "motion", gradient: "linear-gradient(135deg,#C33764,#1D2671)" },
            { id: "map", gradient: "linear-gradient(135deg,#302B63,#0F0C29)" },
            { id: "gift", gradient: "linear-gradient(135deg,#FF8C42,#FF3C38)" },
        ],
    },
] as const;
