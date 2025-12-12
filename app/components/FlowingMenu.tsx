'use client';

import React from 'react';
import { gsap } from 'gsap';

interface MenuItemProps {
    link: string;
    text: string;
    image: string;
    details?: string[];
}

interface FlowingMenuProps {
    items?: MenuItemProps[];
}

type MenuItemComponentProps = MenuItemProps & {
    isActive: boolean;
    isTouchMode: boolean;
};

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [] }) => {
    const [isTouchMode, setIsTouchMode] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

    React.useEffect(() => {
        if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
            return;
        }

        const coarseQuery = window.matchMedia('(pointer: coarse)');
        const hoverNoneQuery = window.matchMedia('(hover: none)');

        const updateTouchMode = () => {
            setIsTouchMode(coarseQuery.matches || hoverNoneQuery.matches);
        };

        updateTouchMode();

        const attachListener = (query: MediaQueryList) => {
            if (typeof query.addEventListener === 'function') {
                query.addEventListener('change', updateTouchMode);
                return () => query.removeEventListener('change', updateTouchMode);
            }
            if (typeof query.addListener === 'function') {
                query.addListener(updateTouchMode);
                return () => query.removeListener(updateTouchMode);
            }
            return () => undefined;
        };

        const removeCoarseListener = attachListener(coarseQuery);
        const removeHoverListener = attachListener(hoverNoneQuery);

        return () => {
            removeCoarseListener();
            removeHoverListener();
        };
    }, []);

    React.useEffect(() => {
        if (!isTouchMode || items.length === 0) {
            setActiveIndex(null);
            return;
        }

        // ⏳ Delay iniziale per evitare pannello vuoto
        const startTimeout = window.setTimeout(() => {
            setActiveIndex(0);
        }, 150);

        const intervalId = window.setInterval(() => {
            setActiveIndex((prev) => {
                if (prev === null) return 0;
                return (prev + 1) % items.length;
            });
        }, 3500);

        return () => {
            window.clearTimeout(startTimeout);
            window.clearInterval(intervalId);
        };
    }, [isTouchMode, items.length]);


    return (
        <div className="relative w-full h-full overflow-hidden">
            <nav className="flex h-full flex-col items-stretch justify-start gap-0 m-0 p-0 md:flex-row md:items-center md:justify-center md:gap-0">
                {items.map((item, idx) => (
                    <MenuItem
                        key={idx}
                        {...item}
                        isTouchMode={isTouchMode}
                        isActive={isTouchMode && activeIndex === idx}
                    />
                ))}
            </nav>
        </div>
    );
};

const MenuItem: React.FC<MenuItemComponentProps> = ({
    link,
    text,
    image,
    details,
    isActive,
    isTouchMode
}) => {
    const itemRef = React.useRef<HTMLDivElement>(null);
    const marqueeRef = React.useRef<HTMLDivElement>(null);
    const marqueeInnerRef = React.useRef<HTMLDivElement>(null);

    const animationDefaults = React.useRef({ duration: 0.6, ease: 'expo' }).current;

    // ✅ useLayoutEffect avoids the initial “colored but empty” frame
    React.useLayoutEffect(() => {
        if (!marqueeRef.current || !marqueeInnerRef.current) return;

        // Force a deterministic hidden initial state
        gsap.set(marqueeRef.current, { y: '101%' });
        gsap.set(marqueeInnerRef.current, { y: '-101%' });
    }, []);

    const findClosestEdge = (
        mouseX: number,
        mouseY: number,
        width: number,
        height: number
    ): 'top' | 'bottom' => {
        const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
        const bottomEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
        return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
    };

    const animateIn = React.useCallback(
        (edge: 'top' | 'bottom') => {
            if (!marqueeRef.current || !marqueeInnerRef.current) return;
            const tl = gsap.timeline({ defaults: animationDefaults });
            tl.set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
                .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' })
                .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' });
        },
        [animationDefaults]
    );

    const animateOut = React.useCallback(
        (edge: 'top' | 'bottom') => {
            if (!marqueeRef.current || !marqueeInnerRef.current) return;
            const tl = gsap.timeline({ defaults: animationDefaults });
            tl.to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }).to(marqueeInnerRef.current, {
                y: edge === 'top' ? '101%' : '-101%'
            });
        },
        [animationDefaults]
    );

    const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
        if (!itemRef.current) return;
        const rect = itemRef.current.getBoundingClientRect();
        const edge = findClosestEdge(
            ev.clientX - rect.left,
            ev.clientY - rect.top,
            rect.width,
            rect.height
        );
        animateIn(edge);
    };

    const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
        if (!itemRef.current) return;
        const rect = itemRef.current.getBoundingClientRect();
        const edge = findClosestEdge(
            ev.clientX - rect.left,
            ev.clientY - rect.top,
            rect.width,
            rect.height
        );
        animateOut(edge);
    };

    const detailTexts = React.useMemo(() => {
        if (details && details.length > 0) return details;
        return [text];
    }, [details, text]);

    const detailContent = React.useMemo(() => {
        return detailTexts.map((detail, idx) => (
            <p
                key={`${detail}-${idx}`}
                className="text-center text-rame-sabbia text-[1.8vh] sm:text-[2vh] lg:text-[2.8vh] font-semibold leading-loose py-2 sm:py-3"
            >
                {detail}
            </p>
        ));
    }, [detailTexts]);

    React.useEffect(() => {
        if (!isTouchMode) {
            animateOut('bottom');
            return;
        }

        if (isActive) {
            animateIn('top');
        } else {
            animateOut('bottom');
        }
    }, [isTouchMode, isActive, animateIn, animateOut]);

    return (
        <div
            ref={itemRef}
            className="group relative flex-1 min-w-0 w-full overflow-hidden text-center bg-rame-sabbia text-carbone transition-colors duration-500 shadow-[-1px_0_0_0_rgba(23,27,28,0.45)] rounded-none md:rounded-none border-t border-carbone/30 first:border-t-0 md:border-0 min-h-0 md:h-[45vh] lg:h-[50vh] group-hover:bg-carbone group-focus-within:bg-carbone"
        >
            <div
                className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none transition-opacity duration-500"
                style={{ backgroundImage: `url(${image})` }}
            />

            <a
                className="relative flex h-full w-full items-center justify-center px-6 cursor-pointer uppercase no-underline font-bold text-carbone text-[2.6vh] sm:text-[3vh] md:text-[3.5vh] transition-colors duration-500 group-hover:text-rame-sabbia group-focus-within:text-rame-sabbia focus:text-rame-sabbia focus-visible:text-rame-sabbia"
                href={link}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {text}
            </a>

            <div
                className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-carbone translate-y-[101%] transform-gpu will-change-transform"
                ref={marqueeRef}
            >
                <div
                    className="flex h-full w-full items-center justify-center px-6 transform-gpu will-change-transform"
                    ref={marqueeInnerRef}
                >
                    <div className="flex h-full w-full flex-col justify-center gap-4">{detailContent}</div>
                </div>
            </div>
        </div>
    );
};

export default FlowingMenu;
