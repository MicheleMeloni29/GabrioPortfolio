import { Instagram, Linkedin, MessageCircle, Mail } from "lucide-react";

const CONTACT_INFO = {
    email: "ciao@tuobrand.com",
    instagram: "https://www.instagram.com/corestudio_design/",
    linkedin: "https://www.linkedin.com/in/tuo-profilo",
    whatsapp: "https://wa.me/393331234567",
    mail: "mailto:ciao@tuobrand.com?subject=Nuovo%20progetto",
    mailLabel: "ciao@tuobrand.com",
};

export default function ContactSection() {
    return (
        <section
            id="contacts"
            className="snap-start flex min-h-screen w-full shrink-0 flex-col items-center justify-center bg-rame-sabbia text-carbone px-6 py-12 sm:px-12 lg:px-24"
        >
            <div className="mx-auto w-full max-w-5xl text-center text-carbone pb-8">
                <h1 className="text-4xl font-bold uppercase sm:text-5xl md:text-6xl lg:text-6xl xl:text-6xl 2xl:text-6xl">Parliamone</h1>
            </div>
            <div className="text-center text-lg sm:text-lg md:text-lg xl:text-2xl 2xl:text-3xl text">
                <h2>
                    Pronto a dare forma al cuore del tuo brand?
                </h2>
                <h2>
                    Scrivimi per iniziare un nuovo progetto.
                </h2>
            </div>

            <div className="mt-10 flex w-full max-w-xl flex-col items-center gap-6">
                <div className="flex w-full flex-row flex-wrap items-center justify-center gap-7 px-4">
                    <div className="group relative flex items-center">
                        <a
                            href={CONTACT_INFO.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Apri il profilo Instagram"
                            className="flex h-16 w-16 items-center justify-center rounded-full bg-transparent text-carbone/50 transition hover:-translate-y-1 hover:bg-carbone"
                        >
                            <Instagram className="h-10 w-10 text-carbone transition-colors duration-200 group-hover:text-rame-sabbia" />
                        </a>
                        <span className="pointer-events-none absolute left-full ml-4 whitespace-nowrap text-sm font-semibold uppercase tracking-[0.2em] text-carbone/70 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
                            @corestudio_design
                        </span>
                    </div>
                    <div className="group relative flex items-center">
                        <a
                            href={CONTACT_INFO.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Apri la chat WhatsApp"
                            className="flex h-16 w-16 items-center justify-center rounded-full bg-transparent text-carbone/50 transition hover:-translate-y-1 hover:bg-carbone"
                        >
                            <MessageCircle className="h-10 w-10 text-carbone transition-colors duration-200 group-hover:text-rame-sabbia" />
                        </a>
                        <span className="pointer-events-none absolute left-full ml-4 whitespace-nowrap text-sm font-semibold uppercase tracking-[0.2em] text-carbone/70 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
                            WhatsApp: 393331234567
                        </span>
                    </div>
                    <div className="group relative flex items-center">
                        <a
                            href={CONTACT_INFO.mail}
                            aria-label="Invia una email"
                            className="flex h-16 w-16 items-center justify-center rounded-full bg-transparent text-carbone/50 transition hover:-translate-y-1 hover:bg-carbone"
                        >
                            <Mail className="h-10 w-10 text-carbone transition-colors duration-200 group-hover:text-rame-sabbia" />
                        </a>
                        <span className="pointer-events-none absolute left-full ml-4 whitespace-nowrap text-sm font-semibold uppercase tracking-[0.2em] text-carbone/70 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
                            {CONTACT_INFO.mailLabel}
                        </span>
                    </div>
                </div>

            </div>
        </section>
    );
}
