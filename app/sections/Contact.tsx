import { Instagram, Linkedin, MessageCircle } from "lucide-react";

const CONTACT_INFO = {
    email: "ciao@tuobrand.com",
    instagram: "https://www.instagram.com/corestudio_design/",
    linkedin: "https://www.linkedin.com/in/tuo-profilo",
    whatsapp: "https://wa.me/393331234567"
};

export default function ContactSection() {
    return (
        <section
            id="contacts"
            className="snap-start flex min-h-screen w-full shrink-0 flex-col items-center bg-rame-sabbia text-carbone px-6 py-12 sm:px-12 lg:px-24"
        >
            <div className="mx-auto w-full max-w-5xl text-center text-carbone pt-12 pb-8">
                <h1 className="text-4xl font-bold uppercase sm:text-5xl lg:text-6xl">Cosa faccio</h1>
            </div>
            <div className="text-center text-md">
                <h2>
                    Pronto a dare forma al cuore del tuo brand?
                </h2>
                <h2>
                    Scrivimi per iniziare un nuovo progetto.
                </h2>
            </div>

            <div className="mt-6 flex w-full max-w-xl flex-col items-center gap-12">
                <div className="flex w-full flex-row items-center justify-center gap-6 px-4 lg:flex-row lg:flex-nowrap lg:justify-center lg:gap-66">
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
                </div>

                <form
                    className="w-full rounded-[2.5rem] bg-carbone p-5 shadow-xl backdrop-blur lg:max-w-5xl"
                    action={`mailto:${CONTACT_INFO.email}`}
                    method="POST"
                    encType="text/plain"
                >
                    <div className="flex flex-col gap-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="text-left">
                                <label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.3em] text-rame-sabbia">
                                    Nome e Cognome
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    placeholder="Come ti chiami?"
                                    className="mt-3 w-full border-b border-rame-sabbia/20 bg-transparent px-1 pb-2 text-xs text-rame-sabbia placeholder:text-rame-sabbia/40 outline-none transition focus:border-rame-sabbia"
                                />
                            </div>
                            <div className="text-left">
                                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.3em] text-rame-sabbia">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Inserisci la tua email"
                                    className="mt-3 w-full border-b border-rame-sabbia/20 bg-transparent px-1 pb-2 text-xs lowercase text-rame-sabbia placeholder:text-rame-sabbia/40 outline-none transition focus:border-rame-sabbia"
                                />
                            </div>
                        </div>
                        <div className="text-left">
                            <label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.3em] text-rame-sabbia">
                                Messaggio
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={2}
                                placeholder="Raccontami la tua idea in poche righe..."
                                className="mt-3 w-full rounded-2xl border border-rame-sabbia/20 bg-transparent px-4 py-3 text-xs text-rame-sabbia placeholder:text-rame-sabbia/40 outline-none transition focus:border-rame-sabbia"
                            />
                        </div>
                    </div>
                    <div className="mt-2 flex justify-end">
                        <button
                            type="submit"
                            className="rounded-full px-8 py-2 border border-rame-sabbia text-sm font-semibold uppercase tracking-[0.4em] text-rame-sabbia transition hover:bg-rame-sabbia hover:text-carbone"
                        >
                            Invia
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
