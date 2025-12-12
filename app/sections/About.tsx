'use client';

import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const FIRST_TEXT = "CORE STUDIO nasce dall'idea che ogni brand abbia un cuore: un nucleo, un centro, un significato profondo. Il mio lavoro parte sempre da lì: dalla ricerca dell’essenza, di ciò che un brand è davvero";
const SECOND_TEXT = "Trasformo questa essenza in identità visive, strategie e una presenza riconoscibile. Do forma alle visioni dei miei clienti con coerenza e carattere, facendo emergere valori, stile e personalità attraverso il design.";
const THIRD_TEXT = "Creo sistemi visivi chiari, memorabili e premium, pensati per brand locali e imprenditori che vogliono distinguersi nel mercato italiano e internazionale. Dalla Sardegna al mondo, seguo il design ovunque mi porti.";

export default function AboutSection() {
    const [showFirstSplit, setShowFirstSplit] = useState(false);
    const [showSecondSplit, setShowSecondSplit] = useState(false);
    const [showThirdSplit, setShowThirdSplit] = useState(false);
    const sectionRef = useRef<HTMLElement | null>(null);
    const timersRef = useRef<number[]>([]);
    const hasPlayedRef = useRef(false);

    const clearTimers = useCallback(() => {
        timersRef.current.forEach((id) => clearTimeout(id));
        timersRef.current = [];
    }, []);

    const resetSequence = useCallback(() => {
        setShowFirstSplit(false);
        setShowSecondSplit(false);
        setShowThirdSplit(false);
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
                setShowThirdSplit(true);
            }, 1200)
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
            id="about"
            ref={sectionRef}
            className="snap-start flex h-screen w-full shrink-0 flex-col bg-carbone px-6 py-16 text-sabbia-rame sm:px-12 lg:px-24"
        >
            <div className="mx-auto w-full max-w-5xl text-center pt-12 text-rame-sabbia">
                <h1 className="text-4xl font-bold uppercase sm:text-5xl lg:text-6xl">Chi sono</h1>
            </div>

            <div className="mx-auto mt-6 sm:mt-8 flex w-full max-w-7xl flex-1 flex-col justify-center gap-14 md:gap-18 text-rame-sabbia text-[0.8rem] sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">
                <motion.p
                    className="max-w-4xl text-left font-semibold leading-snug"
                    initial={{ x: "-45vw", opacity: 0 }}
                    animate={showFirstSplit ? { x: 0, opacity: 1 } : { x: "-45vw", opacity: 0 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                >
                    {FIRST_TEXT}
                </motion.p>
                <motion.p
                    className="ml-auto max-w-4xl text-right font-semibold leading-snug"
                    initial={{ x: "45vw", opacity: 0 }}
                    animate={showSecondSplit ? { x: 0, opacity: 1 } : { x: "45vw", opacity: 0 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                >
                    {SECOND_TEXT}
                </motion.p>
                <motion.p
                    className="max-w-4xl text-left font-semibold leading-snug"
                    initial={{ x: "-45vw", opacity: 0 }}
                    animate={showThirdSplit ? { x: 0, opacity: 1 } : { x: "-45vw", opacity: 0 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                >
                    {THIRD_TEXT}
                </motion.p>
            </div>
        </section>
    );
}
