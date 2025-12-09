'use client';

import Image from "next/image";
import CircularText from '../components/CircularText';
import { useEffect, useRef, useState } from "react";

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
            className="snap-start flex min-h-screen w-full shrink-0 flex-col bg-nero px-6 py-12 sm:px-12 lg:px-24"
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

                <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 pt-36 text-center">
                    <div className="relative flex items-center justify-center">
                        <CircularText
                            text=" OGNI BRAND HA UN CUORE -"
                            onHover="speedUp"
                            spinDuration={50}
                            size={280}
                            className="text-rame-sabbia text-8xl sm:text-6xl lg:text-7xl font-bold"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <CircularText
                                text=" IO GLI DO FORMA -"
                                onHover="speedUp"
                                spinDuration={40}
                                size={160}
                                direction="counterclockwise"
                                className="text-rame-sabbia text-5xl sm:text-4xl lg:text-5xl font-bold"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
