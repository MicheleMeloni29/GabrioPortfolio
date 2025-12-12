'use client';

import { motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import FlowingMenu from "../components/FlowingMenu";

export default function ServicesSection() {
    const [showMenu, setShowMenu] = useState(false);
    const sectionRef = useRef<HTMLElement | null>(null);
    const timersRef = useRef<number[]>([]);
    const hasPlayedRef = useRef(false);

    const menuItems = useMemo(
        () => [
            {
                link: "#",
                text: "Brand Identity",
                image: "",
                details: ["Identità visive complete: logo, palette, tipografia, sistema visivo e linee guida. Progettate per essere riconoscibili, coerenti e professionali."],
            },
            {
                link: "#",
                text: "Visual & Social Design",
                image: "",
                details: ["Template grafici, format visivi, design per post e contenuti. Linea estetica chiara e professionale per attività, eventi e progetti digitali."],
            },
            {
                link: "#",
                text: "Materiali per attività locali",
                image: "",
                details: ["Menu, biglietti da visita, locandine, vetrofanie e materiali stampati. File pronti per la stampa e applicazioni reali."],
            },
            {
                link: "#",
                text: "Rebranding",
                image: "",
                details: ["Restyling e modernizzazione dell’identità per attività già avviate. Pulizia, ordine e coerenza per una percezione più forte."],
            },
        ],
        []
    );

    const clearTimers = useCallback(() => {
        timersRef.current.forEach((id) => clearTimeout(id));
        timersRef.current = [];
    }, []);

    const resetSequence = useCallback(() => {
        setShowMenu(false);
    }, []);

    const startSequence = useCallback(() => {
        clearTimers();
        resetSequence();

        const timers: number[] = [];

        timers.push(
            window.setTimeout(() => {
                setShowMenu(true);
            }, 300)
        );

        timersRef.current = timers;
    }, [clearTimers, resetSequence]);

    useEffect(() => {
        const node = sectionRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasPlayedRef.current) {
                        hasPlayedRef.current = true;
                        startSequence();
                    } else if (!entry.isIntersecting && hasPlayedRef.current) {
                        hasPlayedRef.current = false;
                        clearTimers();
                        resetSequence();
                    }
                });
            },
            { threshold: 0.25 }
        );

        observer.observe(node);

        return () => {
            observer.disconnect();
            clearTimers();
        };
    }, [startSequence, clearTimers, resetSequence]);

    return (
        <section
            id="services"
            ref={sectionRef}
            className="snap-start flex min-h-screen w-full shrink-0 flex-col items-center bg-rame-sabbia text-carbone px-6 py-16 sm:px-12 lg:px-24"
        >
            <div className="mx-auto w-full max-w-5xl text-center text-carbone pt-12">
                <h1 className="text-4xl font-bold uppercase sm:text-5xl lg:text-6xl">Cosa faccio</h1>
            </div>

            <div className="mt-10 sm:mt-10 flex w-full flex-1 md:max-w-5xl  md:justify-center">
                {showMenu ? (
                    <motion.div
                        className="w-full h-full"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <FlowingMenu items={menuItems} />
                    </motion.div>
                ) : null}
            </div>
        </section>
    );
}
