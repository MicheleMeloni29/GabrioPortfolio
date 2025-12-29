"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";

import type { Locale } from "../locales";
import { useLanguage } from "../providers/LanguageProvider";

// Elenco delle sezioni della pagina da usare per i link del menu di navigazione.
const sections = [
    { id: "hero", labelKey: "hero" },
    { id: "about", labelKey: "about" },
    { id: "services", labelKey: "services" },
    { id: "process", labelKey: "process" },
    { id: "projects", labelKey: "projects" },
    { id: "why-core", labelKey: "whyCore" },
    { id: "contacts", labelKey: "contacts" },
] as const;

const primarySections = sections.filter((section) => section.id !== "contacts");
const contactSection = sections.find((section) => section.id === "contacts");

type SectionConfig = (typeof sections)[number];
type SectionId = SectionConfig["id"];
type SectionLabelKey = SectionConfig["labelKey"];

const LANGUAGE_OPTIONS: ReadonlyArray<{ code: Locale; label: string }> = [
    { code: "it", label: "IT" },
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
];

export default function NavBar() {
    const [activeSection, setActiveSection] = useState<SectionId>("hero");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showMobileLayout, setShowMobileLayout] = useState(true);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const desktopRowRef = useRef<HTMLDivElement | null>(null);
    const { dictionary } = useLanguage();
    const navStrings = dictionary.navigation;
    const navSectionLabels = navStrings.sections;
    const getSectionLabel = useCallback(
        (key: SectionLabelKey) => navSectionLabels[key] ?? key,
        [navSectionLabels]
    );
    const menuToggleAria = navStrings.menu.toggleAria;
    const ctaLabel = navStrings.cta.label;

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
            { threshold: 0.2, rootMargin: "-30% 0px -30% 0px" }
        );

        sections.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleNavigate = (id: SectionId) => {
        // Scroll morbido verso la sezione selezionata e chiusura del menu mobile.
        document
            .getElementById(id)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        setIsMenuOpen(false);
        setActiveSection(id);
    };

    const evaluateLayout = useCallback(() => {
        const wrapper = wrapperRef.current;
        const desktopRow = desktopRowRef.current;
        const viewportWidth =
            typeof window !== "undefined" ? window.innerWidth : 0;
        const belowBreakpoint = viewportWidth <= 768;
        let overflow = false;
        if (wrapper) {
            overflow = wrapper.scrollWidth - wrapper.clientWidth > 2;
        }
        if (!overflow && desktopRow && desktopRow.isConnected) {
            overflow =
                desktopRow.scrollWidth - desktopRow.clientWidth > 2 ||
                desktopRow.getBoundingClientRect().right >
                    (wrapper?.getBoundingClientRect().right ?? Infinity);
        }
        setShowMobileLayout(belowBreakpoint || overflow);
    }, []);

    useEffect(() => {
        evaluateLayout();
        const handleResize = () => evaluateLayout();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [evaluateLayout]);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper || typeof ResizeObserver === "undefined") {
            return;
        }
        const observer = new ResizeObserver(() => evaluateLayout());
        observer.observe(wrapper);
        return () => observer.disconnect();
    }, [evaluateLayout]);

    useEffect(() => {
        if (!showMobileLayout && isMenuOpen) {
            setIsMenuOpen(false);
        }
    }, [showMobileLayout, isMenuOpen]);

    const linkBase =
        "rounded-full px-3 py-2 text-sm font-semibold transition duration-300 md:px-4";

    // Render del componente NavBar per desktop e mobile.
    return (
        <Navbar
            isBordered
            className="fixed top-4 left-0 z-50 w-full border-none bg-transparent px-0 shadow-none backdrop-blur-none"
        >
            <div
                ref={wrapperRef}
                className="relative mx-auto w-[90%] rounded-full border px-5 py-3 text-bianco shadow-[0_18px_35px_rgba(3,4,12,0.65)] backdrop-blur"
                style={{
                    borderColor: "rgba(13, 13, 13, 0.7)",
                    backgroundColor: "rgba(33, 36, 37, 0.92)",
                }}
            >    
                
                <NavbarContent
                className={`w-full ${
                    showMobileLayout
                        ? "relative flex"
                        : "absolute left-0 top-0 opacity-0 pointer-events-none"
                }`}
                    justify="start"
                >
                    <div className="flex w-full items-center justify-between">
                        <NavbarBrand className="h-8 shrink-0">
                            <Image
                                src="/images/Core_logo.png"
                                alt={navStrings.logoAlt}
                                width={240}
                                height={65}
                                priority
                                className="h-full w-auto"
                            />
                        </NavbarBrand>
                        <button
                            type="button"
                            aria-label={menuToggleAria}
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

                <div
                    ref={desktopRowRef}
                className={`flex w-full items-center gap-4 ${
                    showMobileLayout
                        ? "absolute left-0 top-0 opacity-0 pointer-events-none"
                        : "relative"
                }`}
                >
                    <NavbarBrand className="h-10 flex-shrink-0">
                        <Image
                            src="/images/Core_logo.png"
                            alt={navStrings.logoAlt}
                            width={320}
                            height={95}
                            priority
                            className="h-full w-auto"
                        />
                    </NavbarBrand>
                    <div className="flex flex-1 items-center justify-center gap-3 px-2">
                        {primarySections.map(({ id, labelKey }) => {
                            const label = getSectionLabel(labelKey);
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
                    <div className="flex items-center gap-3">
                        <LanguageSwitcher />
                        {contactSection ? (
                            <Link
                                href={`#${contactSection.id}`}
                                onClick={(event) => {
                                    event.preventDefault();
                                    handleNavigate(contactSection.id as SectionId);
                                }}
                                className="group relative flex-shrink-0 rounded-full p-[2px] text-base font-semibold uppercase tracking-[0.35em] text-rame-sabbia focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rame-sabbia"
                                style={{ letterSpacing: "0.35em" }}
                            >
                                <span
                                    className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-white via-rame-sabbia to-white"
                                    aria-hidden
                                />
                                <span
                                    className={`relative block rounded-full px-5 py-2 transition-colors duration-300 ${
                                        activeSection === "contacts"
                                            ? "bg-rame-sabbia text-nero"
                                            : "bg-carbone text-rame-sabbia group-hover:bg-rame-sabbia group-hover:text-nero group-focus:bg-rame-sabbia group-focus:text-nero group-active:bg-rame-sabbia group-active:text-nero"
                                    }`}
                                >
                                    {ctaLabel}
                                </span>
                            </Link>
                        ) : null}
                    </div>
                </div>

                {showMobileLayout && isMenuOpen ? (
                    <div className="absolute right-4 top-full mt-4 w-56 rounded-3xl bg-[rgba(13,13,13,0.85)] p-4 shadow-2xl">
                        <div className="flex flex-col gap-3 text-sm font-semibold">
                            {[...primarySections, contactSection]
                                .filter(
                                    (s): s is (typeof sections)[number] =>
                                        s !== undefined
                                )
                                .map(({ id, labelKey }) => {
                                    const label = getSectionLabel(labelKey);
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
                            <LanguageSwitcher className="mt-2" fullWidth />
                        </div>
                    </div>
                ) : null}
            </div>
        </Navbar>
    );
}

type LanguageSwitcherProps = {
    className?: string;
    fullWidth?: boolean;
};

function LanguageSwitcher({ className = "", fullWidth = false }: LanguageSwitcherProps) {
    const { locale, setLocale, dictionary } = useLanguage();
    const ariaLabel = dictionary.navigation.languageToggle?.ariaLabel ?? "Change language";

    const handleSelect = (next: Locale) => {
        if (next === locale) return;
        setLocale(next);
    };

    return (
        <div
            className={`flex items-center gap-1 rounded-full border border-white/15 bg-[rgba(12,12,12,0.65)] p-1 text-xs font-semibold uppercase tracking-[0.3em] text-rame-sabbia ${fullWidth ? "w-full justify-between" : ""} ${className}`}
            role="group"
            aria-label={ariaLabel}
        >
            {LANGUAGE_OPTIONS.map(({ code, label }) => {
                const isActive = code === locale;
                return (
                    <button
                        key={code}
                        type="button"
                        onClick={() => handleSelect(code)}
                        aria-pressed={isActive}
                        className={`rounded-full px-3 py-1 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rame-sabbia ${fullWidth ? "flex-1" : ""} ${isActive ? "bg-rame-sabbia text-nero" : "text-rame-sabbia hover:bg-white/10 hover:text-white"}`}
                    >
                        {label}
                    </button>
                );
            })}
        </div>
    );
}
