"use client";

import Image from "next/image";
import CircularText from "../components/CircularText";
import { useEffect, useRef, useState } from "react";

type CircleSizes = {
    outer: number;
    inner: number;
};

const getCircleSizes = (width: number): CircleSizes => {
    if (width >= 1440) return { outer: 300, inner: 150 };
    if (width >= 1024) return { outer: 270, inner: 145 };
    if (width >= 768) return { outer: 220, inner: 130 };
    if (width >= 640) return { outer: 190, inner: 115 };
    return { outer: 160, inner: 100 };
};
const INITIAL_CIRCLE_SIZES: CircleSizes = getCircleSizes(0);

export default function WhyCoreSection() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const hasIntersectedRef = useRef(false);
    const [replayKey, setReplayKey] = useState(0);
    const [circleSizes, setCircleSizes] = useState<CircleSizes>(INITIAL_CIRCLE_SIZES);

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

    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleResize = () => {
            setCircleSizes(getCircleSizes(window.innerWidth));
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section
            id="why-core"
            ref={sectionRef}
            className="snap-start flex min-h-screen w-full shrink-0 flex-col bg-nero px-6 py-12 sm:px-12 lg:px-24"
        >
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
                <div className="pointer-events-none absolute inset-x-0 top-10 z-10 mx-auto w-full max-w-4xl px-6 text-center">
                    <h1 className="text-4xl font-bold uppercase sm:text-5xl md:text-6xl lg:text-7xl">
                        Perche' Core
                    </h1>
                </div>

                <div className="pointer-events-none flex h-full w-full items-center justify-center opacity-20">
                    <Image
                        src="/Core_Icon.png"
                        alt="Logo Core pulsante"
                        width={760}
                        height={760}
                        priority
                        className="heartbeat-logo--why drop-shadow-[0_20px_60px_rgba(0,0,0,0.45)] h-auto w-[320px] max-w-full sm:w-[420px] md:w-[520px] lg:w-[640px]"
                    />
                </div>

                <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 pt-16 text-center sm:pt-20 md:pt-28 lg:pt-36">
                    <div className="relative flex items-center justify-center">
                        <CircularText
                            key={`outer-${replayKey}`}
                            text=" OGNI BRAND HA UN CUORE -"
                            onHover="speedUp"
                            spinDuration={50}
                            size={circleSizes.outer}
                            className="text-rame-sabbia text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <CircularText
                                key={`inner-${replayKey}`}
                                text=" IO GLI DO FORMA -"
                                onHover="speedUp"
                                spinDuration={40}
                                size={circleSizes.inner}
                                direction="counterclockwise"
                                className="text-rame-sabbia text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
