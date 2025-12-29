"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { TouchEvent, WheelEvent as ReactWheelEvent } from "react";
import { projectsData } from "../data/projects";
import { useLanguage } from "../providers/LanguageProvider";

const LOOP_MULTIPLIER = 5;
const MIDDLE_LOOP_INDEX = Math.floor(LOOP_MULTIPLIER / 2);

const formatIndicator = (template: string, title: string) =>
    template.replace(/\{\{\s*title\s*\}\}/g, title);

export default function ProjectsSection() {
    const { dictionary } = useLanguage();
    const projectsCopy = dictionary.projects;

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const segmentWidthRef = useRef(0);
    const scrollIndicatorFrameRef = useRef<number | null>(null);
    const activeProjectIndexRef = useRef(0);
    const [activeProjectIndex, setActiveProjectIndex] = useState(0);

    const externalTouchMapRef = useRef<Map<number, { startX: number; startY: number }>>(new Map());
    const isHoveringRef = useRef(false);

    const localizedProjects = useMemo(() => {
        const items = projectsCopy?.items ?? [];
        return projectsData.map((project) => {
            const override = items.find((item) => item?.id === project.id);
            return {
                ...project,
                title: override?.title ?? project.title,
                description: override?.description ?? project.description,
            };
        });
    }, [projectsCopy]);

    const projectsCount = localizedProjects.length;

    const infiniteProjects = useMemo(
        () =>
            Array.from({ length: LOOP_MULTIPLIER }, (_, loopIndex) =>
                localizedProjects.map((project) => ({ project, loopIndex }))
            ).flat(),
        [localizedProjects]
    );

    const listLabel = projectsCopy?.accessibility?.list ?? "Featured projects";
    const indicatorTemplate = projectsCopy?.accessibility?.indicator ?? "Show project {{title}}";
    const projectsHeading = projectsCopy?.heading ?? "Projects";

    const handleCarouselWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const absX = Math.abs(event.deltaX);
        const absY = Math.abs(event.deltaY);

        if (absY > absX) {
            event.preventDefault();
            event.stopPropagation();
            container.scrollLeft += event.deltaY;
            return;
        }

        if (absX > 0) {
            event.stopPropagation();
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container || !projectsCount) return;

        let segmentWidth = 0;
        let frameId: number | null = null;

        const calculateSegmentWidth = () => {
            segmentWidth = container.scrollWidth / LOOP_MULTIPLIER;
            segmentWidthRef.current = segmentWidth;
            if (segmentWidth > 0) {
                const perProjectWidth = projectsCount > 0 ? segmentWidth / projectsCount : 0;
                const offset = perProjectWidth * activeProjectIndexRef.current || 0;
                container.scrollLeft = segmentWidth * MIDDLE_LOOP_INDEX + offset;
            }
        };

        frameId = requestAnimationFrame(calculateSegmentWidth);

        let isAdjusting = false;
        const handleScroll = () => {
            if (!segmentWidth || isAdjusting) return;

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
    }, [projectsCount]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const previousBodyOverflowX = document.body.style.overflowX;
        const previousDocumentOverflowX = document.documentElement.style.overflowX;

        document.body.style.overflowX = "hidden";
        document.documentElement.style.overflowX = "hidden";

        return () => {
            document.body.style.overflowX = previousBodyOverflowX;
            document.documentElement.style.overflowX = previousDocumentOverflowX;
        };
    }, []);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container || !projectsCount) return;

        const updateActiveIndex = () => {
            scrollIndicatorFrameRef.current = null;
            const segmentWidth = segmentWidthRef.current || container.scrollWidth / LOOP_MULTIPLIER;
            if (!segmentWidth || !projectsCount) return;

            const perProjectWidth = segmentWidth / projectsCount;
            if (!perProjectWidth) return;

            const normalized = ((container.scrollLeft % segmentWidth) + segmentWidth) % segmentWidth;
            const nextIndex = Math.round(normalized / perProjectWidth) % projectsCount;

            if (nextIndex !== activeProjectIndexRef.current) {
                activeProjectIndexRef.current = nextIndex;
                setActiveProjectIndex(nextIndex);
            }
        };

        const handleScroll = () => {
            if (scrollIndicatorFrameRef.current !== null) return;
            scrollIndicatorFrameRef.current = requestAnimationFrame(updateActiveIndex);
        };

        container.addEventListener("scroll", handleScroll, { passive: true });
        updateActiveIndex();

        const resizeObserver =
            typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateActiveIndex) : null;
        resizeObserver?.observe(container);

        return () => {
            container.removeEventListener("scroll", handleScroll);
            if (scrollIndicatorFrameRef.current !== null) {
                cancelAnimationFrame(scrollIndicatorFrameRef.current);
            }
            resizeObserver?.disconnect();
        };
    }, [projectsCount]);

    const scrollToProject = (index: number) => {
        const container = scrollContainerRef.current;
        if (!container || !projectsCount) return;

        const segmentWidth = segmentWidthRef.current || container.scrollWidth / LOOP_MULTIPLIER;
        if (!segmentWidth) return;

        const perProjectWidth = segmentWidth / projectsCount;
        if (!perProjectWidth) return;

        const target = segmentWidth * MIDDLE_LOOP_INDEX + perProjectWidth * index;
        container.scrollTo({ left: target, behavior: "smooth" });
    };

    const isTouchInsideCarousel = (target: EventTarget | null) => {
        const carousel = scrollContainerRef.current;
        return !!(carousel && target instanceof Node && carousel.contains(target));
    };

    const handleSectionTouchStart = (event: TouchEvent<HTMLElement>) => {
        for (const touch of Array.from(event.changedTouches)) {
            if (isTouchInsideCarousel(touch.target)) continue;
            externalTouchMapRef.current.set(touch.identifier, {
                startX: touch.clientX,
                startY: touch.clientY,
            });
        }
    };

    const handleSectionTouchMove = (event: TouchEvent<HTMLElement>) => {
        for (const touch of Array.from(event.changedTouches)) {
            const tracked = externalTouchMapRef.current.get(touch.identifier);
            if (!tracked) continue;

            const deltaX = Math.abs(touch.clientX - tracked.startX);
            const deltaY = Math.abs(touch.clientY - tracked.startY);

            if (deltaX > deltaY) {
                event.preventDefault();
                return;
            }
        }
    };

    const cleanupTouchTracking = (event: TouchEvent<HTMLElement>) => {
        for (const touch of Array.from(event.changedTouches)) {
            externalTouchMapRef.current.delete(touch.identifier);
        }
    };

    return (
        <section
            id="projects"
            onTouchStart={handleSectionTouchStart}
            onTouchMove={handleSectionTouchMove}
            onTouchEnd={cleanupTouchTracking}
            onTouchCancel={cleanupTouchTracking}
            className="snap-start flex h-screen w-full shrink-0 flex-col bg-carbone px-4 py-12 text-bianco sm:px-10 sm:py-16 lg:px-16 lg:py-20 overflow-x-clip overscroll-x-none touch-pan-y"
        >
            <div className="mx-auto flex w-full max-w-8xl flex-1 flex-col gap-6 sm:gap-8 mt-12 xl:mt-2 2xl:mt-14">
                <div className="sr-only">
                    <h2>{projectsHeading}</h2>
                </div>
                <div className="flex w-full flex-1 flex-col items-center gap-2 sm:gap-3 lg:gap-2 lg:justify-between">
                    <div
                        data-allow-scroll="true"
                        ref={scrollContainerRef}
                        role="list"
                        aria-label={listLabel}
                        style={{ touchAction: "pan-x" }}
                        onWheel={handleCarouselWheel}
                        onMouseEnter={() => {
                            isHoveringRef.current = true;
                        }}
                        onMouseLeave={() => {
                            isHoveringRef.current = false;
                        }}
                        className="
              no-scrollbar
              mt-12
              flex
              w-full
              max-w-8xl
              min-w-0
              snap-x snap-mandatory
              gap-6
              overflow-x-auto overflow-y-hidden
              pb-3 sm:pb-4
              sm:mt-16
              lg:mt-8
              cursor-grab
              touch-pan-x
              overscroll-x-contain
              px-4 sm:px-10 lg:px-16
            "
                    >
                        {infiniteProjects.map(({ project, loopIndex }) => (
                            <article
                                key={`${project.id}-${loopIndex}`}
                                role="listitem"
                                aria-hidden={loopIndex !== MIDDLE_LOOP_INDEX}
                                className="flex min-w-[240px] flex-col rounded-3xl bg-white/5 p-4 text-left shadow-lg shadow-black/30 backdrop-blur 
                                        sm:min-w-[220px] md:min-w-[300px] lg:min-w-[320px] xl:min-w-[400px] max-h-[80vh] snap-center"
                            >
                                <div
                                    className="relative aspect-4/3 w-full overflow-hidden rounded-2xl sm:aspect-video"
                                    style={{ background: project.coverGradient }}
                                ></div>

                                <div className="mt-3 grid grid-cols-4 gap-1.5 sm:grid-cols-4">
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

                                <h3 className="mt-22 md:mt-18 lg:mt-20 xl:mt-28 text-lg font-semibold text-rame-sabbia">
                                    {project.title}
                                </h3>
                                <p className="mt-1 text-sm leading-relaxed text-rame-sabbia/70">
                                    {project.description}
                                </p>
                            </article>
                        ))}
                    </div>
                    <div
                        className="mt-2 flex w-full items-center justify-center gap-2 pb-2 sm:mt-2 sm:gap-3 sm:pb-2 lg:mt-0"
                        style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}
                    >
                        {localizedProjects.map((project, index) => {
                            const isActive = index === activeProjectIndex;
                            const ariaLabel = formatIndicator(indicatorTemplate, project.title);
                            return (
                                <button
                                    key={project.id}
                                    type="button"
                                    aria-label={ariaLabel}
                                    onClick={() => scrollToProject(index)}
                                    className={`h-2 rounded-full transition-all duration-200 ${
                                        isActive
                                            ? "w-8 bg-rame-sabbia"
                                            : "w-2 bg-white/25 hover:bg-white/40 focus-visible:bg-white/50"
                                    }`}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
