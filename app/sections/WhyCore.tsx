'use client';

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import GradientText from "../components/GradientText";

export default function WhyCoreSection() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const hasIntersectedRef = useRef(false);
    const [replayKey, setReplayKey] = useState(0);

    useEffect(() => {
        const node = sectionRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.target !== node) return;
                    if (entry.isIntersecting && !hasIntersectedRef.current) {
                        hasIntersectedRef.current = true;
                        setReplayKey((prev) => prev + 1);
                    } else if (!entry.isIntersecting && hasIntersectedRef.current) {
                        hasIntersectedRef.current = false;
                    }
                });
            },
            { threshold: 0.4 }
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="why-core"
            ref={sectionRef}
            className="snap-start flex min-h-screen w-full shrink-0 flex-col bg-nero px-6 py-12 text-rame-sabbia sm:px-12 lg:px-24"
        >
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
                <div className="pointer-events-none absolute inset-x-0 top-12 z-10 mx-auto w-full max-w-4xl px-6 text-center pt-6">
                    <h1 className="text-4xl font-bold uppercase sm:text-5xl lg:text-6xl">Perché Core</h1>
                </div>

                <div className="pointer-events-none select-none flex items-center justify-center w-full h-full opacity-20">
                    <Image
                        src="/Core_Icon.png"
                        alt="Logo Core pulsante"
                        width={760}
                        height={760}
                        priority
                        className="heartbeat-logo--why drop-shadow-[0_20px_60px_rgba(0,0,0,0.45)] max-w-full h-auto w-[360px] sm:w-[460px] md:w-[580px] lg:w-[640px]"
                    />
                </div>

                <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 pt-24 text-center">
                    <div className="flex flex-col items-center gap-6 text-5xl sm:text-6xl font-bold">
                        <motion.div
                            key={`first-${replayKey}`}
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                        >
                            <GradientText
                                colors={["#ffffff", "#c6a37a", "#ffffff", "#c6a37a", "#ffffff"]}
                                animationSpeed={3}
                                showBorder={false}
                                className="uppercase"
                            >
                                Ogni brand ha un cuore
                            </GradientText>
                        </motion.div>
                        <motion.div
                            key={replayKey}
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 1.5, ease: "easeIn" }}
                        >
                            <GradientText
                                colors={["#c6a37a", "#ffffff", "#c6a37a", "#ffffff", "#c6a37a"]}
                                animationSpeed={3}
                                showBorder={false}
                                className="uppercase"
                            >
                                Io gli do forma
                            </GradientText>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
