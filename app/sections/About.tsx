'use client';

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import {
    SECTION_STAGE_EVENT,
    ScrollDirection,
    StageChangeDetail,
    clampStageIndex,
} from "@/lib/scrollStages";

const FIRST_TEXT =
    "CORE STUDIO nasce dall'idea che ogni brand abbia un cuore: un nucleo, un centro, un significato profondo. Il mio lavoro parte sempre da là: dalla ricerca dell'essenza, di ciò che un brand è davvero";
const SECOND_TEXT =
    "Trasformo questa essenza in identità visive, strategie e una presenza riconoscibile. Do forma alle visioni dei miei clienti con coerenza e carattere, facendo emergere valori, stile e personalità attraverso il design.";
const THIRD_TEXT =
    "Creo sistemi visivi chiari, memorabili e premium, pensati per brand locali e imprenditori che vogliono distinguersi nel mercato italiano e internazionale. Dalla Sardegna al mondo, seguo il design ovunque mi porti.";

type StageConfig = {
    id: string;
    text: string;
    enterFrom: string;
    verticalPosition: "top" | "center" | "bottom";
    horizontalClass: string;
    textAlignClass: string;
    widthClass: string;
};

const STAGE_CONFIGS: StageConfig[] = [
    {
        id: "first",
        text: FIRST_TEXT,
        enterFrom: "-35%",
        verticalPosition: "top",
        horizontalClass: "justify-start",
        textAlignClass: "text-left",
        widthClass: "w-full max-w-3xl md:max-w-[55%]",
    },
    {
        id: "second",
        text: SECOND_TEXT,
        enterFrom: "0%",
        verticalPosition: "center",
        horizontalClass: "justify-center",
        textAlignClass: "text-center",
        widthClass: "w-full max-w-3xl md:max-w-[45%]",
    },
    {
        id: "third",
        text: THIRD_TEXT,
        enterFrom: "35%",
        verticalPosition: "bottom",
        horizontalClass: "justify-end",
        textAlignClass: "text-right",
        widthClass: "w-full max-w-3xl md:max-w-[55%]",
    },
];

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [activeStage, setActiveStage] = useState(0);
    const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(0);

    useEffect(() => {
        const node = sectionRef.current;
        if (!node) return;

        const handleStageChange = (event: Event) => {
            const { detail } = event as CustomEvent<StageChangeDetail>;
            if (!detail) return;
            const safeIndex = clampStageIndex(detail.stageIndex, STAGE_CONFIGS.length);
            setActiveStage(safeIndex);
            setScrollDirection(detail.direction);
        };

        node.addEventListener(SECTION_STAGE_EVENT, handleStageChange as EventListener);

        const initialStage = Number(node.getAttribute("data-scroll-stage-index"));
        if (!Number.isNaN(initialStage)) {
            setActiveStage(clampStageIndex(initialStage, STAGE_CONFIGS.length));
        }

        return () => {
            node.removeEventListener(SECTION_STAGE_EVENT, handleStageChange as EventListener);
        };
    }, []);

    const currentStage = useMemo(() => STAGE_CONFIGS[activeStage], [activeStage]);
    const exitX = scrollDirection > 0 ? "-12%" : scrollDirection < 0 ? "12%" : "0%";
    const verticalClass =
        currentStage.verticalPosition === "top"
            ? "justify-start pt-6"
            : currentStage.verticalPosition === "bottom"
              ? "justify-end pb-6"
              : "justify-center";
    const isCenterStage = currentStage.id === "second";
    const motionInitial = isCenterStage
        ? { opacity: 0, scale: 0.45 }
        : { opacity: 0, x: currentStage.enterFrom };
    const motionAnimate = isCenterStage
        ? { opacity: 1, scale: 1 }
        : { opacity: 1, x: "0%" };
    const motionExit = isCenterStage
        ? { opacity: 0, scale: 1 }
        : { opacity: 0, x: exitX };

    return (
        <section
            id="about"
            ref={sectionRef}
            data-scroll-stages={STAGE_CONFIGS.length}
            className="snap-start flex h-screen w-full shrink-0 flex-col bg-carbone px-6 py-16 text-sabbia-rame sm:px-12 lg:px-24"
        >
            <div className="mx-auto w-full max-w-5xl pt-12 text-center text-rame-sabbia">
                <h1 className="text-4xl font-bold uppercase sm:text-5xl lg:text-6xl">Chi sono</h1>
            </div>

            <div className="relative mx-auto mt-4 flex w-full max-w-7xl flex-1 flex-col items-center overflow-hidden text-rame-sabbia/70 text-xl sm:mt-8 sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-5xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStage.id}
                        className={`flex h-full w-full flex-col ${verticalClass}`}
                        initial={motionInitial}
                        animate={motionAnimate}
                        exit={motionExit}
                        transition={{ duration: 0.85, ease: "easeOut" }}
                    >
                        <div className={`flex w-full px-2 md:px-0 ${currentStage.horizontalClass}`}>
                            <div className={`${currentStage.widthClass} ${currentStage.textAlignClass}`}>
                                <p className="font-semibold leading-snug">{currentStage.text}</p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
