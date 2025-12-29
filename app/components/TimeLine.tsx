'use client';

import { motion } from "framer-motion";
import { ComponentPropsWithoutRef, useMemo } from "react";

import { useLanguage } from "../providers/LanguageProvider";

type TimelineProps = ComponentPropsWithoutRef<"section"> & {
    heading?: string;
};

export default function Timeline({
    className = "",
    id = "timeline",
    ...sectionProps
}: TimelineProps) {
    const { dictionary } = useLanguage();
    const timelineItems = useMemo(() => dictionary.process?.timeline?.items ?? [], [dictionary]);

    return (
        <section
            id={id}
            {...sectionProps}
            className={`w-full ${className}`}
            aria-labelledby={`${id}-title`}
        >
            <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-8 sm:pt-10 pb-12 sm:pb-16">
                <div className="space-y-30 sm:space-y-26 md:space-y-30 text-center">
                    {timelineItems.map((item, idx) => (
                        <motion.div
                            key={`${item.title}-${idx}`}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.35, delay: idx * 0.05 }}
                            className="relative"
                        >
                            <h3 className="md:text-xl xl:text-2xl  2xl:text-2xl uppercase tracking-[0.25em] text-rame-sabbia/60">
                                {item.step}
                            </h3>
                            <h2 className="mt-2 md:text-2xl xl:text-3xl 2xl:text-3xl font-semibold text-rame-sabbia">
                                {item.title}
                            </h2>
                            <p className="mt-2  md:text-md xl:text-lg 2xl:text-lg leading-relaxed text-rame-sabbia/80">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
