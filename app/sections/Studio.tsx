"use client";

import { motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import FlowingMenu from "../components/FlowingMenu";

const FIRST_TEXT =
    "CORE STUDIO nasce dall'idea che ogni brand ha un cuore: un nucleo, un centro, un significato profondo.";
const SECOND_TEXT =
    "Il mio lavoro e' trasformare quell'essenza in identita' visiva, strategia e presenza. Creo sistemi visivi chiari, memorabili e premium, pensati per brand locali e imprenditori che vogliono distinguersi nel mercato italiano e internazionale.";

export default function StudioSection() {
    const [showFirstSplit, setShowFirstSplit] = useState(false);
    const [showSecondSplit, setShowSecondSplit] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const sectionRef = useRef<HTMLElement | null>(null);
    const timersRef = useRef<number[]>([]);
    const hasPlayedRef = useRef(false);

    const menuItems = useMemo(
        () => [
            { link: "#", text: "Brand Strategy", image: "/images/menu1.jpg" },
            { link: "#", text: "Visual Identity", image: "/images/menu2.jpg" },
            { link: "#", text: "Digital Experience", image: "/images/menu3.jpg" },
        ],
        []
    );

    const clearTimers = useCallback(() => {
        timersRef.current.forEach((id) => clearTimeout(id));
        timersRef.current = [];
    }, []);

    const resetSequence = useCallback(() => {
        setShowFirstSplit(false);
        setShowSecondSplit(false);
        setShowMenu(false);
    }, []);

    const startSequence = useCallback(() => {
        clearTimers();
        resetSequence();

        const timers: number[] = [];

        timers.push(
            window.setTimeout(() => {
                setShowFirstSplit(true);
            }, 200)
        );

        timers.push(
            window.setTimeout(() => {
                setShowSecondSplit(true);
            }, 700)
        );

        timers.push(
            window.setTimeout(() => {
                setShowMenu(true);
            }, 1300)
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
            id="studio"
            ref={sectionRef}
            className="relative snap-start flex h-screen w-full shrink-0 flex-col bg-sfondo2 text-sabbia-rame"
        >
            <div className="absolute left-10 right-10 top-1/2 h-px -translate-y-1/2 bg-sabbia-rame/30" />

            <div className="flex h-1/2 w-full items-center justify-center px-10">
                <div className="flex w-full max-w-6xl justify-between gap-16 text-rame-sabbia">
                    <motion.p
                        className="flex-1 pr-8 text-2xl font-semibold leading-snug text-center"
                        initial={{ x: "-45vw", opacity: 0 }}
                        animate={
                            showFirstSplit
                                ? { x: 0, opacity: 1 }
                                : { x: "-45vw", opacity: 0 }
                        }
                        transition={{ duration: 2, ease: "easeOut" }}
                    >
                        {FIRST_TEXT}
                    </motion.p>
                    <motion.p
                        className="flex-1 pl-8  text-xl font-semibold leading-snug text-center"
                        initial={{ x: "45vw", opacity: 0 }}
                        animate={
                            showSecondSplit
                                ? { x: 0, opacity: 1 }
                                : { x: "45vw", opacity: 0 }
                        }
                        transition={{ duration: 2, ease: "easeOut" }}
                    >
                        {SECOND_TEXT}
                    </motion.p>
                </div>
            </div>

            <div className="flex h-1/2 w-full items-end justify-center px-10 pb-10">
                {showMenu ? (
                    <motion.div
                        className="w-full max-w-5xl"
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
