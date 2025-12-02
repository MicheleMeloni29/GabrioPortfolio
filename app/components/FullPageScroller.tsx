"use client";

import { ReactNode, useEffect, useRef } from "react";

type FullPageScrollerProps = {
    children: ReactNode;
    className?: string;
};

export default function FullPageScroller({
    children,
    className = "",
}: FullPageScrollerProps) {
    const containerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const sections = Array.from(container.children) as HTMLElement[];
        let currentIndex = 0;
        let isAnimating = false;
        let animationTimeout: ReturnType<typeof setTimeout> | null = null;
        let touchStartY = 0;

        const scrollToIndex = (index: number) => {
            const target = sections[index];
            if (!target) return;
            isAnimating = true;
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            if (animationTimeout) {
                clearTimeout(animationTimeout);
            }
            animationTimeout = setTimeout(() => {
                isAnimating = false;
            }, 650);
            currentIndex = index;
        };

        const onWheel = (event: WheelEvent) => {
            event.preventDefault();
            if (isAnimating) return;
            if (event.deltaY > 0 && currentIndex < sections.length - 1) {
                scrollToIndex(currentIndex + 1);
            } else if (event.deltaY < 0 && currentIndex > 0) {
                scrollToIndex(currentIndex - 1);
            }
        };

        const onTouchStart = (event: TouchEvent) => {
            touchStartY = event.touches[0].clientY;
        };

        const onTouchEnd = (event: TouchEvent) => {
            const deltaY = touchStartY - event.changedTouches[0].clientY;
            if (Math.abs(deltaY) < 45 || isAnimating) return;
            if (deltaY > 0 && currentIndex < sections.length - 1) {
                scrollToIndex(currentIndex + 1);
            } else if (deltaY < 0 && currentIndex > 0) {
                scrollToIndex(currentIndex - 1);
            }
        };

        container.addEventListener("wheel", onWheel, { passive: false });
        container.addEventListener("touchstart", onTouchStart, { passive: true });
        container.addEventListener("touchend", onTouchEnd, { passive: true });

        return () => {
            container.removeEventListener("wheel", onWheel);
            container.removeEventListener("touchstart", onTouchStart);
            container.removeEventListener("touchend", onTouchEnd);
            if (animationTimeout) {
                clearTimeout(animationTimeout);
            }
        };
    }, []);

    return (
        <main
            ref={containerRef}
            className={`no-scrollbar flex h-full w-full snap-y snap-mandatory flex-col overflow-y-auto scroll-smooth ${className}`}
        >
            {children}
        </main>
    );
}
