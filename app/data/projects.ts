export type ProjectPreview = {
    id: string;
    title: string;
    category: string;
    year: string;
    description: string;
    coverGradient: string;
    images: Array<{
        id: string;
        gradient: string;
    }>;
};

export const projectsData: readonly ProjectPreview[] = [
    {
        id: "aurora-skinlab",
        title: "Aurora Skinlab",
        category: "Branding",
        year: "2024",
        description:
            "Sistema visivo per un brand beauty clean. Palette sabbia/oro, materiali editoriali e packaging a pannelli magnetici.",
        coverGradient: "linear-gradient(135deg,#F7EDD4,#E9CFA5,#B98B5A)",
        images: [
            { id: "mood", gradient: "linear-gradient(135deg,#F1CAB8,#EA8C55)" },
            { id: "packaging", gradient: "linear-gradient(135deg,#FDF0CB,#F3C178)" },
            { id: "editorial", gradient: "linear-gradient(135deg,#F3D9DC,#CBA0B1)" },
            { id: "digital", gradient: "linear-gradient(135deg,#FFE1C6,#F37381)" },
        ],
    },
    {
        id: "terra-collective",
        title: "Terra Collective",
        category: "Art Direction",
        year: "2023",
        description:
            "Campagna itinerante per valorizzare artigiani e terroir. Visual modulare che alterna fotografia e pattern tattili.",
        coverGradient: "linear-gradient(135deg,#0D0D0D,#212425)",
        images: [
            { id: "stampa", gradient: "linear-gradient(135deg,#4F5F73,#94A6B3)" },
            { id: "poster", gradient: "linear-gradient(135deg,#B98B5A,#F2D0A9)" },
            { id: "set", gradient: "linear-gradient(135deg,#1C1C1C,#595959)" },
        ],
    },
    {
        id: "atelier-nuage",
        title: "Atelier Nuage",
        category: "Editorial",
        year: "2024",
        description:
            "Catalogo moda in tre atti. Layout a colonne dinamiche, fotografia granulosa e inserti per texture reali.",
        coverGradient: "linear-gradient(135deg,#FEE3EC,#B087B8)",
        images: [
            { id: "lookbook", gradient: "linear-gradient(135deg,#FFCFDF,#F3A6D3)" },
            { id: "details", gradient: "linear-gradient(135deg,#D3BBDD,#A594F9)" },
            { id: "paper", gradient: "linear-gradient(135deg,#FDF2E9,#F9C784)" },
            { id: "backstage", gradient: "linear-gradient(135deg,#2E1F27,#6C4A4A)" },
            { id: "print", gradient: "linear-gradient(135deg,#FFECD1,#FF928B)" },
        ],
    },
    {
        id: "vox-museum",
        title: "VOX Museum",
        category: "Exhibition",
        year: "2022",
        description:
            "Segnaletica e multimedia per mostra immersiva. Tipografia extra-condensed e supporti retroilluminati.",
        coverGradient: "linear-gradient(135deg,#0D0D0D,#4A1F3D)",
        images: [
            { id: "totem", gradient: "linear-gradient(135deg,#281C2D,#614051)" },
            { id: "motion", gradient: "linear-gradient(135deg,#C33764,#1D2671)" },
            { id: "map", gradient: "linear-gradient(135deg,#302B63,#0F0C29)" },
            { id: "gift", gradient: "linear-gradient(135deg,#FF8C42,#FF3C38)" },
        ],
    },
    {
        id: "cobalto-type",
        title: "Cobalto Type",
        category: "Typography",
        year: "2024",
        description:
            "Famiglia display per magazine indipendente. Versioni serif e sans, variabili di contrasto e set alternativo.",
        coverGradient: "linear-gradient(135deg,#1D3557,#457B9D)",
        images: [
            { id: "glyphs", gradient: "linear-gradient(135deg,#E63946,#F1FAEE)" },
            { id: "poster", gradient: "linear-gradient(135deg,#A8DADC,#457B9D)" },
            { id: "print2", gradient: "linear-gradient(135deg,#F5F3F4,#C9ADA7)" },
        ],
    },
    {
        id: "luna-rossa",
        title: "Luna Rossa Spirits",
        category: "Packaging",
        year: "2023",
        description:
            "Linea di liquori artigianali. Bottiglie satin e rilievi rame, etichette modulari per raccontare tre territori.",
        coverGradient: "linear-gradient(135deg,#1A1A1A,#B98B5A)",
        images: [
            { id: "bottle", gradient: "linear-gradient(135deg,#03045E,#023E8A)" },
            { id: "label", gradient: "linear-gradient(135deg,#CAF0F8,#ADE8F4)" },
            { id: "kit", gradient: "linear-gradient(135deg,#F7B267,#F79D65)" },
            { id: "detail", gradient: "linear-gradient(135deg,#4F000B,#720026)" },
            { id: "shelf", gradient: "linear-gradient(135deg,#0D0D0D,#434343)" },
            { id: "shoot", gradient: "linear-gradient(135deg,#E29587,#D66D75)" },
        ],
    },
] as const;
