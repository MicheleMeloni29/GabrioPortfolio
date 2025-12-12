"use client";

import { useEffect, useRef } from "react";
import { projectsData } from "../data/projects";

const LOOP_MULTIPLIER = 5;
const MIDDLE_LOOP_INDEX = Math.floor(LOOP_MULTIPLIER / 2);
const infiniteProjects = Array.from({ length: LOOP_MULTIPLIER }, (_, loopIndex) =>
    projectsData.map((project) => ({ project, loopIndex }))
).flat();

export default function ProjectsSection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        let segmentWidth = 0;
        let frameId: number | null = null;

        const calculateSegmentWidth = () => {
            if (!container) return;
            segmentWidth = container.scrollWidth / LOOP_MULTIPLIER;
            if (segmentWidth > 0) {
                container.scrollLeft = segmentWidth * MIDDLE_LOOP_INDEX;
            }
        };

        frameId = requestAnimationFrame(calculateSegmentWidth);

        let isAdjusting = false;
        const handleScroll = () => {
            if (!container || !segmentWidth || isAdjusting) return;

            const startBoundary = segmentWidth * (MIDDLE_LOOP_INDEX - 1);
            const endBoundary = segmentWidth * (MIDDLE_LOOP_INDEX + 1);
            const current = container.scrollLeft;

            if (current <= startBoundary) {
                isAdjusting = true;
                container.scrollLeft = current + segmentWidth;
                requestAnimationFrame(() => {
                    isAdjusting = false;
                });
            } else if (current >= endBoundary) {
                isAdjusting = true;
                container.scrollLeft = current - segmentWidth;
                requestAnimationFrame(() => {
                    isAdjusting = false;
                });
            }
        };

        const handleResize = () => calculateSegmentWidth();

        container.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleResize);

        return () => {
            if (frameId) cancelAnimationFrame(frameId);
            container.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <section
            id="projects"
            className="overflow-x-hidden snap-start flex h-screen w-full shrink-0 flex-col bg-nero px-6 py-12 text-bianco sm:px-10 sm:py-16 lg:px-16 lg:py-20"
        >
            <div className="mx-auto flex max-w-8xl flex-1 flex-col gap-10">
                <div
                    data-allow-scroll="true"
                    className="no-scrollbar mt-12 flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-6 sm:mt-16 lg:mt-8 cursor-grab touch-pan-x"
                    ref={scrollContainerRef}
                    role="list"
                    aria-label="Progetti in evidenza"
                >
                    {infiniteProjects.map(({ project, loopIndex }) => (
                        <article
                            key={`${project.id}-${loopIndex}`}
                            role="listitem"
                            aria-hidden={loopIndex !== MIDDLE_LOOP_INDEX}
                            className="flex min-w-[290px] flex-col rounded-3xl bg-white/5 p-5 text-left shadow-lg shadow-black/30 backdrop-blur 
                                        sm:min-w-[220px] md:min-w-[300px] lg:min-w-[320px] xl:min-w-[400px] max-h-[80vh] sm:max-h-[85vh] md:max-h-[90vh] snap-center"
                        >
                            <div
                                className="relative aspect-4/3 w-full overflow-hidden rounded-2xl sm:aspect-video"
                                style={{ background: project.coverGradient }}
                            >
                            </div>

                            <div className="mt-3 grid grid-cols-3 gap-1.5 sm:grid-cols-4">
                                {project.images.slice(0, 7).map((image) => (
                                    <div
                                        key={image.id}
                                        className="aspect-square overflow-hidden rounded-xl border border-white/10"
                                        style={{ background: image.gradient }}
                                    >
                                        <span className="sr-only">{image.id}</span>
                                    </div>
                                ))}
                            </div>

                            <h3 className="mt-2 md:mt-22 lg:mt-24 xl:mt-32 text-lg font-semibold text-rame-sabbia">{project.title}</h3>
                            <p className="mt-1 mb-4 text-sm leading-relaxed text-rame-sabbia/70">{project.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
