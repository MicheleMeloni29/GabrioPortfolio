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
            {/* Qui per modificare posizionamento dell'icona grande attraverso i vari formati */}
            <div className="pointer-events-none select-none absolute inset-x-0 top-24 flex justify-center z-0 
            sm:top-[clamp(2.5rem,2vw,4.5rem)]
            md:top-[clamp(6.7rem,2vw,8.7rem)]
            2xl:top-[clamp(7.5rem,3vw,8.51rem)]">
                <Image
                    src="/Core_Icon.png"
                    alt="Core icon beating"
                    width={541}
                    height={541}
                    priority
                    /* Modifica delle dimensioni dell'icona grande attraverso i vari formati*/
                    className="heartbeat-logo size-[16rem] 
                                sm:size-[clamp(10rem,7vw,17rem)]     
                                md:size-[clamp(14rem,7vw,21rem)]
                                2xl:size-[clamp(18rem,2vw,20rem)]"
                />
            </div>

            {/* 2) Primo SplitText */}
            {/* Qui per modificare posizionamento degli SplitText attraverso i vari formati */}
            <div className="z-10 flex flex-col items-center text-center
                            px-2 sm:px-2 lg:px-4
                            relative lg:absolute lg:inset-x-0
                            top-[clamp(7rem,32vw,14rem)]
                            sm:top-[clamp(2rem,10vw,4rem)]
                            md:top-[clamp(4rem,20vw,8rem)]
                            2xl:top-[clamp(26rem,2vh,28rem)]">
                {showFirstSplit ? (
                    <div className="flex flex-col gap-0 sm:gap-0 md:gap-0 min-h-[9rem] sm:min-h-[10.5rem] md:min-h-[12rem]">
                        <SplitText
                            text={FIRST_TEXT}
                            /* Modifica dimensione testo primo SplitText attraverso i vari formati*/
                            className="font-black uppercase tracking-[0.2em] text-rame-sabbia m-0 leading-tight
                                        text-[clamp(1.6rem,9vw,2.3rem)]
                                        sm:text-[clamp(4.4rem,6vw,3.4rem)] 
                                        md:text-[clamp(2.3rem,4vw,3.6rem)] 
                                        2xl:text-[clamp(3.5rem,1vw,4.5rem)]"
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
                                /* Modifica dimensione testo secondo SplitText attraverso i vari formati*/
                                className="m-0 leading-tight
                                            font-black uppercase tracking-[0.2em] text-rame-sabbia
                                            text-[clamp(1.6rem,9vw,2.3rem)]
                                            sm:text-[clamp(4.4rem,6vw,3.4rem)] 
                                            md:text-[clamp(2.3rem,4vw,3.6rem)] 
                                            2xl:text-[clamp(3.5rem,1vw,4.5rem)]"
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
            {/* Qui per modificare posizionamento del subtitle attraverso i vari formati */}
            <div
                className="
                            z-10 flex justify-center text-center
                            px-4 lg:px-4
                            absolute inset-x-0
                            top-[clamp(30rem,44vw,32rem)]
                            sm:top-[clamp(40rem,28vw,42rem)]
                            md:top-[clamp(30rem,32vw,34rem)]
                            2xl:top-[clamp(36rem,36vw,42rem)]
                        "
            >
                {showSubtitle ? (
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeIn" }}
                        /* Modifica la dimensione del testo nei vari formati */
                        className="font-semibold uppercase tracking-[0.32em] text-bianco 
                        text-[clamp(1rem,1vw,1.25rem)]
                        sm:text-[clamp(1.1rem,1vw,1.1rem)] 
                        md:text-[clamp(1.05rem,2.6vw,1.4rem)] 
                        2xl:text-[clamp(1.5rem,1vw,2.5rem)]"
                    >
                        L&apos;ESSENZA DIVENTA IDENTITA&apos;
                    </motion.p>
                ) : null}
            </div>
        </section>
    );
}
