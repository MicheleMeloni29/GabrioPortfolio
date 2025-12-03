"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";

// Elenco delle sezioni della pagina da usare per i link del menu di navigazione.
const sections = [
    { id: "hero", label: "Hero" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contacts", label: "Contacts" },
] as const;

const primarySections = sections.filter((section) => section.id !== "contacts");
const contactSection = sections.find((section) => section.id === "contacts");

type SectionId = (typeof sections)[number]["id"];

export default function NavBar() {
    const [activeSection, setActiveSection] = useState<SectionId>("hero");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        // Osserva l'intersezione delle sezioni per evidenziare il link attivo durante lo scroll.
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id as SectionId);
                    }
                });
            },
            { threshold: 0.35 }
        );

        sections.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleNavigate = (id: SectionId) => {
        // Scroll morbido verso la sezione selezionata e chiusura del menu mobile.
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setIsMenuOpen(false);
    };

    const linkBase =
        "rounded-full px-4 py-2 text-sm font-semibold transition duration-300";

    return (
        <Navbar
            isBordered
            className="fixed top-4 left-0 z-50 w-full border-none bg-transparent px-0 shadow-none backdrop-blur-none"
        >
            <div
                className="relative mx-auto w-[92%] max-w-5xl rounded-full border px-5 py-3 text-bianco shadow-[0_18px_35px_rgba(3,4,12,0.65)] backdrop-blur"
                style={{
                    borderColor: "rgba(13, 13, 13, 0.7)",
                    backgroundColor: "rgba(33, 36, 37, 0.92)",
                }}
            >
                <NavbarContent className="w-full md:hidden" justify="start">
                    <div className="flex w-full items-center justify-between">
                        <NavbarBrand className="h-8 shrink-0">
                            <Image
                                src="/Core_logo.png"
                                alt="Core logo"
                                width={240}
                                height={65}
                                priority
                                className="h-full w-auto"
                            />
                        </NavbarBrand>
                        <button
                            type="button"
                            aria-label="Apri menu"
                            aria-expanded={isMenuOpen}
                            onClick={() => setIsMenuOpen((open) => !open)}
                            className={`rounded-full px-3 py-2 text-sm font-semibold uppercase tracking-[0.3em] transition duration-300 ${isMenuOpen
                                ? "bg-rame-sabbia text-nero"
                                : "text-bianco hover:bg-bianco/10"
                            }`}
                        >
                            <span className="flex flex-col items-center gap-1.5">
                                <span
                                    className={`h-0.5 w-5 bg-current transition-transform ${isMenuOpen ? "translate-y-1.5 rotate-45" : ""
                                        }`}
                                />
                                <span
                                    className={`h-0.5 w-5 bg-current transition-opacity ${isMenuOpen ? "opacity-0" : "opacity-100"
                                        }`}
                                />
                                <span
                                    className={`h-0.5 w-5 bg-current transition-transform ${isMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
                                        }`}
                                />
                            </span>
                        </button>
                    </div>
                </NavbarContent>

                <div className="hidden md:flex items-center justify-center gap-6">
                    <NavbarBrand className="h-10 shrink-0">
                        <Image
                            src="/Core_logo.png"
                            alt="Core logo"
                            width={320}
                            height={95}
                            priority
                            className="h-full w-auto"
                        />
                    </NavbarBrand>
                    <div className="flex flex-1 items-center justify-center gap-4">
                        {primarySections.map(({ id, label }) => {
                            const isActive = activeSection === id;
                            return (
                                <Link
                                    key={id}
                                    href={`#${id}`}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        handleNavigate(id);
                                    }}
                                    className={`${linkBase} ${isActive
                                            ? "bg-rame-sabbia text-nero"
                                            : "text-rame-sabbia hover:bg-bianco/10 hover:text-bianco"
                                        }`}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </div>
                    {contactSection ? (
                        <Link
                            href={`#${contactSection.id}`}
                            onClick={(event) => {
                                event.preventDefault();
                                handleNavigate(contactSection.id as SectionId);
                            }}
                            className="rounded-full border border-rame-sabbia px-3 py-1 text-sm font-semibold uppercase tracking-[0.4em] text-rame-sabbia transition hover:bg-rame-sabbia hover:text-nero"
                        >
                            Start Now
                        </Link>
                    ) : null}
                </div>

                {isMenuOpen ? (
                    <div className="absolute right-4 top-full mt-4 w-48 rounded-3xl bg-[rgba(13,13,13,0.85)] p-4 shadow-2xl md:hidden">
                        <div className="flex flex-col gap-3 text-sm font-semibold">
                            {[...primarySections, contactSection]
                                .filter(
                                    (s): s is (typeof sections)[number] =>
                                        s !== undefined
                                )
                                .map(({ id, label }) => {
                                    const isActive = activeSection === id;
                                    return (
                                        <Link
                                            key={id}
                                            href={`#${id}`}
                                            onClick={(event) => {
                                                event.preventDefault();
                                                handleNavigate(id);
                                            }}
                                            className={`${linkBase} text-center uppercase ${isActive
                                                    ? "bg-rame-sabbia text-nero"
                                                    : "text-rame-sabbia hover:bg-bianco/10 hover:text-bianco"
                                                }`}
                                        >
                                            {label}
                                        </Link>
                                    );
                                })}
                        </div>
                    </div>
                ) : null}
            </div>
        </Navbar>
    );
}
