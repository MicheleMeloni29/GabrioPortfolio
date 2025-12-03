'use client';

import Image from "next/image";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import SplitText from "../components/SplitText";

const FIRST_TEXT = "DAL CUORE";
const SECOND_TEXT = "ALLA FORMA";

const CHAR_DELAY = 120; // ms, come il delay di SplitText
const SPLIT_DURATION = 0.6 * 1000; // 0.6s -> ms (duration di SplitText)
const SUBTITLE_DURATION = 600; // ms, come motion del subtitle

// Calcola durata totale di uno SplitText in ms
const calcSplitDuration = (text: string) => {
    const letters = text.replace(/\s+/g, "").length; // ignora gli spazi
    if (letters <= 0) return SPLIT_DURATION;
    return (letters - 1) * CHAR_DELAY + SPLIT_DURATION;
};

export default function Hero() {
    const [showFirstSplit, setShowFirstSplit] = useState(false);
    const [showSecondLine, setShowSecondLine] = useState(false);
    const [showSubtitle, setShowSubtitle] = useState(false);
    const [showLogo, setShowLogo] = useState(false);
    const sectionRef = useRef<HTMLElement | null>(null);
    const timersRef = useRef<number[]>([]);
    const wasVisibleRef = useRef(false);

    const clearTimers = useCallback(() => {
        timersRef.current.forEach((timerId) => clearTimeout(timerId));
        timersRef.current = [];
    }, []);

    const resetStates = useCallback(() => {
        setShowFirstSplit(false);
        setShowSecondLine(false);
        setShowSubtitle(false);
        setShowLogo(false);
    }, []);

    const startSequence = useCallback(() => {
        clearTimers();
        resetStates();

        const initialDelay = 2000; // 2) dopo 2 secondi parte il primo SplitText
        const firstSplitTime = calcSplitDuration(FIRST_TEXT);
        const secondSplitTime = calcSplitDuration(SECOND_TEXT);

        const timers: number[] = [];
        timers.push(
            window.setTimeout(() => {
                setShowFirstSplit(true);
            }, initialDelay)
        );

        timers.push(
            window.setTimeout(() => {
                setShowSecondLine(true);
            }, initialDelay + firstSplitTime)
        );

        timers.push(
            window.setTimeout(() => {
                setShowSubtitle(true);
            }, initialDelay + firstSplitTime + secondSplitTime)
        );

        timers.push(
            window.setTimeout(() => {
                setShowLogo(true);
            }, initialDelay + firstSplitTime + secondSplitTime + SUBTITLE_DURATION)
        );

        timersRef.current = timers;
    }, [clearTimers, resetStates]);

    useEffect(() => {
        const node = sectionRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (!wasVisibleRef.current) {
                            wasVisibleRef.current = true;
                            startSequence();
                        }
                    } else if (wasVisibleRef.current) {
                        wasVisibleRef.current = false;
                        clearTimers();
                        resetStates();
                    }
                });
            },
            { threshold: 0.25 }
        );

        observer.observe(node);
        wasVisibleRef.current = true;
        startSequence();

        return () => {
            observer.disconnect();
            clearTimers();
            wasVisibleRef.current = false;
        };
    }, [startSequence, clearTimers, resetStates]);

    return (
        <section
            id="hero"
            ref={sectionRef}
            className="relative snap-start flex h-screen w-full shrink-0 flex-col items-center justify-center overflow-hidden bg-nero px-4 pt-24 pb-6 text-white sm:px-6 lg:pt-32"
        >
            {/* 1) Immagine centrale invariata */}
            <div className="pointer-events-none select-none absolute inset-x-0 top-24 flex justify-center z-0 sm:top-[clamp(2.5rem,8vw,4.5rem)] md:top-[clamp(3.5rem,12vw,6rem)]">
                <Image
                    src="/Core_Icon.png"
                    alt="Core icon beating"
                    width={541}
                    height={541}
                    priority
                    className="heartbeat-logo size-[16rem] sm:size-[clamp(10rem,30vw,17rem)] md:size-[clamp(18rem,32vw,22rem)]"
                />
            </div>

            {/* 2) Primo SplitText */}
            <div className="z-10 mt-[clamp(10rem,42vw,18rem)] flex flex-col items-center text-center px-2 sm:px-6 md:mt-[clamp(11rem,34vw,18rem)] md:min-h-[12rem] lg:absolute lg:inset-x-0 lg:top-[clamp(10rem,28vh,16rem)] lg:px-4 xl:top-[clamp(9rem,24vh,15rem)] 2xl:top-[clamp(8rem,20vh,14rem)]">
                {showFirstSplit ? (
                    <div className="flex flex-col gap-1 min-h-[9rem] sm:min-h-[10.5rem] md:min-h-[12rem]">
                        <SplitText
                            text={FIRST_TEXT}
                            className="text-[clamp(1.5rem,6vw,2.6rem)] font-black uppercase tracking-[0.2em] text-rame-sabbia sm:text-[clamp(1.9rem,5vw,3rem)] md:text-[clamp(2.3rem,4vw,3.6rem)] lg:text-[clamp(3.2rem,3vw,5.5rem)] 2xl:text-[clamp(3.6rem,2.4vw,6.5rem)]"
                            textAlign="center"
                            splitType="chars"
                            delay={CHAR_DELAY}
                            duration={0.6}
                            ease={[0.5, 1.5, 0.5, 1.5]}
                            from={{ opacity: 0, y: 24 }}
                            to={{ opacity: 1, y: 0 }}
                        />

                        {/* 3) Secondo SplitText, solo dopo il primo */}
                        {showSecondLine ? (
                            <SplitText
                                text={SECOND_TEXT}
                                className="text-[clamp(1.5rem,6vw,2.6rem)] font-black uppercase tracking-[0.2em] text-rame-sabbia sm:text-[clamp(1.9rem,5vw,3rem)] md:text-[clamp(2.3rem,4vw,3.6rem)] lg:text-[clamp(3.2rem,3vw,5.5rem)] 2xl:text-[clamp(3.6rem,2.4vw,6.5rem)]"
                                textAlign="center"
                                splitType="chars"
                                delay={CHAR_DELAY}
                                duration={0.6}
                                ease={[0.5, 1.5, 0.5, 1.5]}
                                from={{ opacity: 0, y: 24 }}
                                to={{ opacity: 1, y: 0 }}
                            />
                        ) : null}
                    </div>
                ) : null}
            </div>

            {/* 4) Subtitle con ease-in, solo dopo i due SplitText */}
            <div className="z-10 absolute inset-x-0 bottom-[clamp(7.5rem,18vw,4rem)] flex justify-center px-4 text-center sm:bottom-[clamp(3rem,13vw,4rem)] md:bottom-[clamp(3.5rem,12vw,4.5rem)] lg:bottom-auto lg:top-[clamp(18rem,40vh,26rem)] lg:px-4 xl:top-[clamp(17rem,36vh,24rem)] 2xl:top-[clamp(16rem,32vh,22rem)]">
                {showSubtitle ? (
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeIn" }}
                        className="text-[clamp(0.75rem,3.8vw,1rem)] font-semibold uppercase tracking-[0.32em] text-bianco sm:text-[clamp(0.85rem,3.2vw,1.15rem)] md:text-[clamp(1.05rem,2.6vw,1.4rem)] lg:text-[clamp(1.35rem,2vw,1.9rem)]"
                    >
                        L&apos;ESSENZA DIVENTA IDENTITA&apos;
                    </motion.p>
                ) : null}
            </div>
        </section>
    );
}
