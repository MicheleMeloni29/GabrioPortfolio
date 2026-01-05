'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import SplitText from "../components/SplitText";
import { useLanguage } from "../providers/LanguageProvider";

const CHAR_DELAY = 80; // ms, come il delay di SplitText
const SPLIT_DURATION = 0.6 * 1000; // 0.6s -> ms (duration di SplitText)

// Calcola durata totale di uno SplitText in ms
const calcSplitDuration = (text: string) => {
    const letters = text.replace(/\s+/g, "").length; // ignora gli spazi
    if (letters <= 0) return SPLIT_DURATION;
    return (letters - 1) * CHAR_DELAY + SPLIT_DURATION;
};

export default function Hero() {
    const { dictionary } = useLanguage();
    const heroCopy = dictionary.hero;
    const firstText = heroCopy.headlineFirst ?? "";
    const secondText = heroCopy.headlineSecond ?? "";
    const subtitleText = heroCopy.subtitle ?? "";
    const ctaWorkLabel = heroCopy.ctaWorkLabel ?? "Explore projects";
    const ctaWorkHref = heroCopy.ctaWorkHref ?? "#projects";
    const ctaContactLabel = heroCopy.ctaContactLabel ?? "Contact me";
    const ctaContactHref = heroCopy.ctaContactHref ?? "#contacts";
    const logoAlt = heroCopy.logoAlt ?? "Hero logo";

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

        const initialDelay = 1500; // 2) dopo 2 secondi parte il primo SplitText
        const firstSplitTime = calcSplitDuration(firstText);
        const secondSplitTime = calcSplitDuration(secondText);

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
    }, [clearTimers, resetStates, firstText, secondText]);

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
            className="relative snap-start flex min-h-screen w-full shrink-0 flex-col overflow-hidden bg-nero px-4 py-20 text-white sm:px-6 lg:px-12 lg:py-20 md:py-8"
        >
            <div className="flex h-full w-full flex-col items-center justify-center gap-10 text-center sm:gap-12 md:gap-10">
                <div className="pointer-events-none select-none [@media(min-width:1440px)_and_(max-width:1599px)]:-mt-6">
                    <Image
                        src="/images/Core_Icon.png"
                        alt={logoAlt}
                        width={541}
                        height={541}
                        priority
                        className="heartbeat-logo mx-auto w-[clamp(14rem,60vw,20rem)] sm:w-[clamp(16rem,45vw,24rem)] md:w-[clamp(18rem,35vw,28rem)] lg:w-[clamp(18rem,24vw,26rem)]"
                    />
                </div>

                <div className="flex w-full max-w-4xl flex-col items-center gap-2 px-2 sm:gap-3 md:gap-4 sm:px-4 lg:gap-0 lg:-mt-5 xl:mt-4">
                    <div className="flex w-full justify-center text-center min-h-[2.75rem] sm:min-h-[3.25rem] md:min-h-[4rem] lg:min-h-[-1rem]">
                        {showFirstSplit ? (
                            <SplitText
                                text={firstText}
                                className="m-0 font-black uppercase tracking-[0.18em] text-rame-sabbia leading-tight
                                            text-[clamp(1.8rem,8vw,2.4rem)]
                                            sm:text-[clamp(2.6rem,6vw,3.2rem)]
                                            md:text-[clamp(3rem,4.5vw,3.8rem)]
                                            lg:text-[clamp(3rem,4vw,3.4rem)]
                                            2xl:text-[clamp(3.5rem,3vw,4.4rem)]"
                                textAlign="center"
                                splitType="chars"
                                delay={CHAR_DELAY}
                                duration={0.6}
                                ease={[0.5, 1.5, 0.5, 1.5]}
                                from={{ opacity: 0, y: 24 }}
                                to={{ opacity: 1, y: 0 }}
                            />
                        ) : (
                            <span aria-hidden="true" className="inline-block h-full w-full opacity-0">
                                &nbsp;
                            </span>
                        )}
                    </div>

                    <div className="flex w-full justify-center text-center min-h-[2.75rem] sm:min-h-[3.25rem] md:min-h-[4rem] lg:min-h-[1rem] ">
                        {showSecondLine ? (
                            <SplitText
                                text={secondText}
                                className="m-0 font-black uppercase tracking-[0.18em] text-rame-sabbia leading-tight
                                            text-[clamp(1.8rem,8vw,2.4rem)]
                                            sm:text-[clamp(2.6rem,6vw,3.2rem)]
                                            md:text-[clamp(3rem,4.5vw,3.8rem)]
                                            lg:text-[clamp(3rem,4vw,3.4rem)]
                                            2xl:text-[clamp(3.5rem,3vw,4.4rem)]"
                                textAlign="center"
                                splitType="chars"
                                delay={CHAR_DELAY}
                                duration={0.6}
                                ease={[0.5, 1.5, 0.5, 1.5]}
                                from={{ opacity: 0, y: 24 }}
                                to={{ opacity: 1, y: 0 }}
                            />
                        ) : (
                            <span aria-hidden="true" className="inline-block h-full w-full opacity-0">
                                &nbsp;
                            </span>
                        )}
                    </div>
                </div>

                <div className="min-h-[2.5rem] md:mt-2 md:min-h-[1.5rem] px-4 lg:-mt-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={showSubtitle ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                        transition={{ duration: 0.6, ease: "easeIn" }}
                        className="flex w-full flex-col items-center gap-4"
                        aria-hidden={showSubtitle ? undefined : true}
                    >
                        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-bianco sm:text-sm md:text-base">
                            {subtitleText}
                        </p>
                        <motion.div
                            initial={false}
                            animate={showSubtitle ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                            transition={{ duration: 0.45, ease: "easeOut", delay: showSubtitle ? 0.4 : 0 }}
                            className={`mt-1 flex w-full max-w-xs flex-col gap-3 sm:hidden ${
                                showSubtitle ? "" : "pointer-events-none select-none"
                            }`}
                            aria-hidden={showSubtitle ? undefined : true}
                        >
                            <Link
                                href={ctaWorkHref}
                                tabIndex={showSubtitle ? undefined : -1}
                                className="inline-flex w-full items-center justify-center rounded-full border border-rame-sabbia bg-rame-sabbia px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-nero transition hover:translate-y-0.5 hover:bg-rame-sabbia/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rame-sabbia"
                            >
                                {ctaWorkLabel}
                            </Link>
                            <Link
                                href={ctaContactHref}
                                tabIndex={showSubtitle ? undefined : -1}
                                className="inline-flex w-full items-center justify-center rounded-full border border-bianco/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-bianco transition hover:-translate-y-0.5 hover:border-bianco/60 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rame-sabbia"
                            >
                                {ctaContactLabel}
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
