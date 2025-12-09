export type TimelineEntry = {
    step: string;
    title: string;
    description: string;
};

// Dati timeline 
export const timelineData: TimelineEntry[] = [
    {
        step: "I",
        title: "Analisi del Core",
        description: "Studio dell’essenza del brand, valori, identità, target e concorrenza.",
    },
    {
        step: "II",
        title: "Concept & Brainstorming",
        description: "Moodboard, ricerca visiva, idee e primissimi schizzi a mano.",
    },
    {
        step: "III",
        title: "Proposta & Bozze",
        description: "1–2 direzioni di logo e identità con palette, layout e stile.",
    },
    {
        step: "IV",
        title: "Sistema di Design",
        description: "Costruzione del linguaggio visivo: tipografie, moduli, pattern, icone, griglie.",
    },
    {
        step: "V",
        title: "Applicazioni Reali",
        description: "Materiali concreti: social, stampa, mockup, presentazioni. File finali pronti per utilizzo professionale.",
    },
   
    
];