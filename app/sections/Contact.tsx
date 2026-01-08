'use client';

import { Instagram, MessageCircle, Mail } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useLanguage } from "../providers/LanguageProvider";

const CONTACT_INFO = {
    email: "michele.meloni2@icloud.com",
    instagram: "https://www.instagram.com/corestudio_design/",
    whatsapp: "https://wa.me/393473728852",
    whatsappLabel: "+39 347 372 8852",
    mail: "mailto:gabriele.serra@yahoo.it?subject=Nuovo%20progetto",
    mailLabel: "Gabriele.serra97@yahoo.it",
};

const CONTACT_METHODS = [
    {
        id: "instagram",
        icon: Instagram,
        href: CONTACT_INFO.instagram,
        label: "@corestudio_design",
        ariaLabel: "Apri il profilo Instagram",
        external: true,
    },
    {
        id: "whatsapp",
        icon: MessageCircle,
        href: CONTACT_INFO.whatsapp,
        label: `WhatsApp: ${CONTACT_INFO.whatsappLabel}`,
        ariaLabel: "Apri la chat WhatsApp",
        external: true,
    },
    {
        id: "mail",
        icon: Mail,
        href: CONTACT_INFO.mail,
        label: CONTACT_INFO.mailLabel,
        ariaLabel: "Invia una email",
        external: true,
    },
];

export default function ContactSection() {
    const { dictionary } = useLanguage();
    const contactCopy = dictionary.contact ?? {};
    const introTexts = contactCopy.intro ?? [];
    const contactTitle = contactCopy.title ?? "Parliamone";

    const contactMethods = useMemo(() => {
        const localizedMethods = contactCopy.methods ?? [];
        return CONTACT_METHODS.map((method) => {
            const override = localizedMethods.find((item) => item?.id === method.id);
            return {
                ...method,
                label: override?.label ?? method.label,
                ariaLabel: override?.ariaLabel ?? method.ariaLabel,
            };
        });
    }, [contactCopy.methods]);

    const mailSubject = contactCopy.mailSubject ?? "Nuovo progetto";

    const handleMailClick = useCallback(() => {
        if (typeof window !== "undefined") {
            const mailUrl = `mailto:gabriele.serra@yahoo.it?subject=${encodeURIComponent(mailSubject)}`;
            window.location.href = mailUrl;
        }
    }, [mailSubject]);

    return (
        <section
            id="contacts"
            className="snap-start flex min-h-screen w-full shrink-0 flex-col items-center justify-center bg-rame-sabbia text-carbone px-6 py-12 sm:px-12 lg:px-24"
        >
            <div className="mx-auto w-full max-w-5xl text-center text-carbone pb-8">
                <h1 className="text-4xl font-bold uppercase sm:text-5xl md:text-6xl lg:text-6xl xl:text-6xl 2xl:text-6xl">
                    {contactTitle}
                </h1>
            </div>
            <div className="text-center text-lg sm:text-lg md:text-lg xl:text-2xl 2xl:text-3xl text">
                {introTexts.map((line, idx) => (
                    <h2 key={`${line}-${idx}`}>{line}</h2>
                ))}
            </div>

            <div className="mt-10 w-full max-w-5xl px-4">
                <div className="flex w-full flex-col items-center gap-8 md:flex-row md:flex-wrap md:justify-center md:gap-16 lg:flex-nowrap lg:gap-24 xl:gap-32">
                    {contactMethods.map(({ id, icon: Icon, href, label, ariaLabel, external }) => {
                        const isMailLink = id === "mail";
                        return (
                            <div key={id} className="flex flex-col items-center text-center md:w-[220px] lg:w-[260px]">
                                <div className="group relative flex items-center justify-center">
                                    <a
                                        href={href}
                                        target={external ? "_blank" : undefined}
                                        rel={external ? "noopener noreferrer" : undefined}
                                        onClick={isMailLink ? handleMailClick : undefined}
                                        aria-label={ariaLabel}
                                        className="flex h-16 w-16 items-center justify-center rounded-full bg-transparent text-carbone/60 transition duration-200 hover:-translate-y-1 hover:bg-carbone"
                                    >
                                        <Icon className="h-10 w-10 text-carbone transition-colors duration-200 group-hover:text-rame-sabbia" />
                                    </a>
                                    <span className="pointer-events-none absolute left-full ml-4 hidden whitespace-nowrap text-sm font-semibold uppercase tracking-[0.2em] text-carbone/70 opacity-0 transition-all duration-200 lg:inline-block lg:group-hover:translate-x-1 lg:group-hover:opacity-100">
                                        {label}
                                    </span>
                                </div>
                                <span className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-carbone/70 lg:hidden">
                                    {label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
