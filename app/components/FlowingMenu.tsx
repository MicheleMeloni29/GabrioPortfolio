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

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [] }) => {
    return (
        <div className="w-full h-full overflow-hidden">
            <nav className="flex flex-row h-full m-0 p-0">
                {items.map((item, idx) => (
                    <MenuItem key={idx} {...item} />
                ))}
            </nav>
        </div>
    );
};

const MenuItem: React.FC<MenuItemProps> = ({ link, text, image, details }) => {
    const itemRef = React.useRef<HTMLDivElement>(null);
    const marqueeRef = React.useRef<HTMLDivElement>(null);
    const marqueeInnerRef = React.useRef<HTMLDivElement>(null);

    const animationDefaults = { duration: 0.6, ease: 'expo' };

    const findClosestEdge = (
        mouseX: number,
        mouseY: number,
        width: number,
        height: number
    ): 'top' | 'bottom' => {
        const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
        const bottomEdgeDist =
            Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
        return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
    };

    const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
        if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
        const rect = itemRef.current.getBoundingClientRect();
        const edge = findClosestEdge(
            ev.clientX - rect.left,
            ev.clientY - rect.top,
            rect.width,
            rect.height
        );

        const tl = gsap.timeline({ defaults: animationDefaults });
        tl.set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
            .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' })
            .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' });
    };

    const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
        if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
        const rect = itemRef.current.getBoundingClientRect();
        const edge = findClosestEdge(
            ev.clientX - rect.left,
            ev.clientY - rect.top,
            rect.width,
            rect.height
        );

        const tl = gsap.timeline({ defaults: animationDefaults }) as TimelineMax;
        tl.to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }).to(
            marqueeInnerRef.current,
            {
                y: edge === 'top' ? '101%' : '-101%'
            }
        );
    };

    const detailTexts = React.useMemo(() => {
        if (details && details.length > 0) {
            return details;
        }
        return [text];
    }, [details, text]);

    const detailContent = React.useMemo(() => {
        return detailTexts.map((detail, idx) => (
            <p
                key={`${detail}-${idx}`}
                className="text-center text-rame-sabbia text-[1.8vh] sm:text-[2vh] lg:text-[2.8vh] font-semibold leading-relaxed"
            >
                {detail}
            </p>
        ));
    }, [detailTexts]);

    return (
        <div
            ref={itemRef}
            className="group flex-1 min-w-0 relative overflow-hidden text-center bg-rame-sabbia text-carbone transition-colors duration-500 shadow-[-1px_0_0_0_rgba(23,27,28,0.45)] h-[40vh] sm:h-[45vh] md:h-[50vh] group-hover:bg-carbone group-focus-within:bg-carbone"
        >
            <div
                className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none transition-opacity duration-500"
                style={{ backgroundImage: `url(${image})` }}
            />
            <a
                className="relative flex h-full w-full items-center justify-center px-6 cursor-pointer uppercase no-underline font-bold text-carbone text-[3vh] sm:text-[3.5vh] transition-colors duration-500 group-hover:text-rame-sabbia group-focus-within:text-rame-sabbia focus:text-rame-sabbia focus-visible:text-rame-sabbia"
                href={link}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {text}
            </a>
            <div
                className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-carbone translate-y-[101%]"
                ref={marqueeRef}
            >
                <div
                    className="flex h-full w-full items-center justify-center px-6"
                    ref={marqueeInnerRef}
                >
                    <div className="flex h-full w-full flex-col justify-center gap-4">
                        {detailContent}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlowingMenu;
