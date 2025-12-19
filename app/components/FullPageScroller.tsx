"use client";

/*
    FullPageScroller mantiene l’indice delle sezioni nell’ordine definito in app/page.tsx, blocca l’animazione finché non termina lo scroll in corso 
    e gestisce wheel/touch con soglie chiare. Ogni scroll porta alla schermata successiva/precedente con scrollIntoView, 
    quindi l’ordine è sempre rispettato.

    Ho introdotto un meccanismo di “scroll lock”: per la sezione attiva verifico se espone data-scroll-lock. 
    Nel caso di WorkProcess intercetto gli eventi wheel/touch, scorro manualmente il contenitore della timeline 
    e impedisco il passaggio al prossimo blocco finché non raggiunge il fondo/capo. 
    Gli altri elementi con data-allow-scroll (es. caroselli) continuano a comportarsi in modo nativo.

    Ho aggiornato WorksProcess per dichiarare data-scroll-lock="#process-timeline-scroll" 
    e garantire che la timeline occupi tutta l’altezza disponibile (min-h-0 sulla gerarchia) 
    così lo scroller può gestirla correttamente (app/sections/WorksProcess.tsx (line 1)).
*/

import { ReactNode, useEffect, useRef } from "react";

type FullPageScrollerProps = {
    children: ReactNode;
    className?: string;
};

const WHEEL_THRESHOLD = 40;
const TOUCH_THRESHOLD = 45;
const SCROLL_ANIMATION_MS = 900;
const SCROLL_COOLDOWN_MS = 350;

export default function FullPageScroller({
    children,
    className = "",
}: FullPageScrollerProps) {
    const containerRef = useRef<HTMLElement | null>(null);
    const sectionsRef = useRef<HTMLElement[]>([]);
    const currentIndexRef = useRef(0);
    const isAnimatingRef = useRef(false);
    const wheelDeltaRef = useRef(0);
    const wheelDirectionRef = useRef<1 | -1 | 0>(0);
    const animationTimeoutRef = useRef<number | null>(null);
    const touchStartYRef = useRef(0);
    const touchLastYRef = useRef(0);
    const touchScrollContainerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const updateSections = () => {
            sectionsRef.current = Array.from(container.children) as HTMLElement[];
        };

        updateSections();

        const observer = new MutationObserver(updateSections);
        observer.observe(container, { childList: true });

        const clearAnimationTimeout = () => {
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
                animationTimeoutRef.current = null;
            }
        };

        const scrollToIndex = (index: number) => {
            const target = sectionsRef.current[index];
            if (!target) return;

            isAnimatingRef.current = true;
            target.scrollIntoView({ behavior: "smooth", block: "start" });

            clearAnimationTimeout();
            animationTimeoutRef.current = window.setTimeout(() => {
                isAnimatingRef.current = false;
            }, SCROLL_ANIMATION_MS + SCROLL_COOLDOWN_MS);

            currentIndexRef.current = index;
        };

        const moveToDirection = (direction: 1 | -1) => {
            if (isAnimatingRef.current) return;
            const nextIndex = currentIndexRef.current + direction;
            if (nextIndex < 0 || nextIndex >= sectionsRef.current.length) return;
            wheelDeltaRef.current = 0;
            wheelDirectionRef.current = 0;
            scrollToIndex(nextIndex);
        };

        const getAllowScrollTarget = (target: HTMLElement | null) =>
            (target?.closest("[data-allow-scroll='true']") as HTMLElement | null) ?? null;

        const getScrollLockContainer = () => {
            const currentSection = sectionsRef.current[currentIndexRef.current];
            if (!currentSection) return null;
            const selector = currentSection.getAttribute("data-scroll-lock");
            if (!selector) return null;
            if (selector === "self") return currentSection;
            try {
                return currentSection.querySelector(selector) as HTMLElement | null;
            } catch {
                return null;
            }
        };

        const hasScrollSpace = (container: HTMLElement, direction: 1 | -1) => {
            const { scrollTop, scrollHeight, clientHeight } = container;
            const maxScrollTop = scrollHeight - clientHeight;
            if (maxScrollTop <= 0) return false;
            const epsilon = 1;
            if (direction > 0) {
                return scrollTop < maxScrollTop - epsilon;
            }
            return scrollTop > epsilon;
        };

        const applyManualScroll = (container: HTMLElement, delta: number) => {
            container.scrollTop += delta;
        };

        const onWheel = (event: WheelEvent) => {
            const target = event.target as HTMLElement | null;
            const allowTarget = getAllowScrollTarget(target);
            const isHorizontalScroll = Math.abs(event.deltaX) > Math.abs(event.deltaY);
            if (isHorizontalScroll) {
                if (!allowTarget) {
                    event.preventDefault();
                }
                return;
            }

            if (isAnimatingRef.current) {
                event.preventDefault();
                return;
            }

            const lockContainer = getScrollLockContainer();
            const deltaY = event.deltaY;
            const direction =
                deltaY > 0 ? 1 : deltaY < 0 ? -1 : 0;

            if (lockContainer && direction !== 0 && hasScrollSpace(lockContainer, direction)) {
                event.preventDefault();
                applyManualScroll(lockContainer, deltaY);
                return;
            }

            if (allowTarget) {
                return;
            }

            event.preventDefault();
            if (direction === 0) {
                return;
            }

            if (wheelDirectionRef.current !== direction) {
                wheelDirectionRef.current = direction;
                wheelDeltaRef.current = 0;
            }

            wheelDeltaRef.current += Math.abs(deltaY);
            if (wheelDeltaRef.current < WHEEL_THRESHOLD) {
                return;
            }

            wheelDeltaRef.current = 0;
            moveToDirection(direction);
        };

        const onTouchStart = (event: TouchEvent) => {
            const startY = event.touches[0].clientY;
            touchStartYRef.current = startY;
            touchLastYRef.current = startY;
            const allowTarget = getAllowScrollTarget(event.target as HTMLElement | null);
            touchScrollContainerRef.current =
                allowTarget ?? getScrollLockContainer();
        };

        const onTouchMove = (event: TouchEvent) => {
            const container = touchScrollContainerRef.current;
            if (!container) return;

            const currentY = event.touches[0].clientY;
            const delta = touchLastYRef.current - currentY;
            if (Math.abs(delta) < 2) return;

            const isLockContainer = container === getScrollLockContainer();

            if (isLockContainer) {
                const direction = delta > 0 ? 1 : -1;
                if (hasScrollSpace(container, direction)) {
                    event.preventDefault();
                    applyManualScroll(container, delta);
                    touchLastYRef.current = currentY;
                    return;
                }
            }

            if (!isLockContainer) {
                // let native scroll happen inside allow-target containers
                return;
            }
        };

        const onTouchEnd = (event: TouchEvent) => {
            if (isAnimatingRef.current) {
                touchScrollContainerRef.current = null;
                return;
            }

            const deltaY = touchStartYRef.current - event.changedTouches[0].clientY;
            if (Math.abs(deltaY) < TOUCH_THRESHOLD) {
                touchScrollContainerRef.current = null;
                return;
            }

            const direction: 1 | -1 = deltaY > 0 ? 1 : -1;
            const lockContainer = getScrollLockContainer();
            if (lockContainer && hasScrollSpace(lockContainer, direction)) {
                touchScrollContainerRef.current = null;
                return;
            }

            const allowTarget = touchScrollContainerRef.current;
            touchScrollContainerRef.current = null;
            if (allowTarget && allowTarget !== lockContainer) {
                return;
            }

            moveToDirection(direction);
        };

        container.addEventListener("wheel", onWheel, { passive: false });
        container.addEventListener("touchstart", onTouchStart, { passive: true });
        container.addEventListener("touchmove", onTouchMove, { passive: false });
        container.addEventListener("touchend", onTouchEnd, { passive: true });

        return () => {
            container.removeEventListener("wheel", onWheel);
            container.removeEventListener("touchstart", onTouchStart);
            container.removeEventListener("touchmove", onTouchMove);
            container.removeEventListener("touchend", onTouchEnd);
            observer.disconnect();
            clearAnimationTimeout();
        };
    }, [children]);

    return (
        <main
            ref={containerRef}
            className={`no-scrollbar flex h-full w-full max-w-full snap-y snap-mandatory flex-col overflow-y-auto overflow-x-hidden overscroll-x-none touch-pan-y scroll-smooth ${className}`}
        >
            {children}
        </main>
    );
}
