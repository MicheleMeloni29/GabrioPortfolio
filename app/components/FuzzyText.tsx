import React, { useEffect, useRef } from 'react';

interface FuzzyTextProps {
    children: React.ReactNode;
    fontSize?: number | string;
    fontWeight?: string | number;
    fontFamily?: string;
    color?: string;
    enableHover?: boolean;
    baseIntensity?: number;
    hoverIntensity?: number;
    className?: string;
    style?: React.CSSProperties;
    canvasClassName?: string;
}

const FuzzyText: React.FC<FuzzyTextProps> = ({
    children,
    fontSize = 'clamp(2rem, 8vw, 8rem)',
    fontWeight = 900,
    fontFamily = 'inherit',
    color = '#fff',
    enableHover = true,
    baseIntensity = 0.18,
    hoverIntensity = 0.5,
    className = '',
    style,
    canvasClassName = ''
}) => {
    const canvasRef = useRef<HTMLCanvasElement & { cleanupFuzzyText?: () => void }>(null);

    useEffect(() => {
        let animationFrameId: number;
        let isCancelled = false;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const init = async () => {
            if (document.fonts?.ready) {
                await document.fonts.ready;
            }
            if (isCancelled) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const computedFontFamily =
                fontFamily === 'inherit' ? window.getComputedStyle(canvas).fontFamily || 'sans-serif' : fontFamily;

            const fontSizeStr = typeof fontSize === 'number' ? `${fontSize}px` : fontSize;
            let numericFontSize: number;
            if (typeof fontSize === 'number') {
                numericFontSize = fontSize;
            } else {
                const temp = document.createElement('span');
                temp.style.fontSize = fontSize;
                document.body.appendChild(temp);
                const computedSize = window.getComputedStyle(temp).fontSize;
                numericFontSize = parseFloat(computedSize);
                document.body.removeChild(temp);
            }

            const rawText = React.Children.toArray(children).join('').trim();

            const offscreen = document.createElement('canvas');
            const offCtx = offscreen.getContext('2d');
            if (!offCtx) return;

            offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
            offCtx.textBaseline = 'alphabetic';
            const metrics = offCtx.measureText(rawText);

            const actualLeft = metrics.actualBoundingBoxLeft ?? 0;
            const actualRight = metrics.actualBoundingBoxRight ?? metrics.width;
            const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize;
            const actualDescent = metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;

            const baseLineHeight = Math.ceil(actualAscent + actualDescent);
            const viewportWidth = window.innerWidth;
            const idealWidth = Math.min(viewportWidth * 0.9, 900);

            const words = rawText.split(' ').filter(Boolean);
            const lines: string[] = [];
            let currentLine = '';

            if (words.length <= 1) {
                lines.push(rawText);
            } else {
                for (const word of words) {
                    const candidate = currentLine ? `${currentLine} ${word}` : word;
                    const candidateWidth = offCtx.measureText(candidate).width;
                    if (candidateWidth > idealWidth && currentLine) {
                        lines.push(currentLine);
                        currentLine = word;
                    } else {
                        currentLine = candidate;
                    }
                }
                if (currentLine) {
                    lines.push(currentLine);
                }
            }

            const lineGap = Math.max(numericFontSize * 0.18, 6);
            const lineWidths = lines.map((line) => offCtx.measureText(line).width);
            const widestLine = Math.max(...lineWidths, 1);

            const extraWidthBuffer = 20;
            const offscreenWidth = Math.ceil(widestLine + extraWidthBuffer);
            const offscreenHeight = Math.ceil(lines.length * (baseLineHeight + lineGap));

            offscreen.width = offscreenWidth;
            offscreen.height = offscreenHeight;

            const xOffset = extraWidthBuffer / 2;
            offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
            offCtx.textBaseline = 'alphabetic';
            offCtx.fillStyle = color;
            lines.forEach((line, index) => {
                const yOffset = actualAscent + index * (tightHeight + lineGap);
                offCtx.fillText(line, xOffset, yOffset);
            });

            const responsiveScale = Math.min(1, viewportWidth / 1024);
            const horizontalMargin = Math.max(16, 40 * responsiveScale);
            const verticalMargin = Math.max(0, 8 * responsiveScale);
            canvas.width = offscreenWidth + horizontalMargin * 2;
            canvas.height = offscreenHeight + verticalMargin * 2;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.translate(horizontalMargin, verticalMargin);

            const interactiveLeft = horizontalMargin + xOffset;
            const interactiveTop = verticalMargin;
            const interactiveRight = interactiveLeft + widestLine;
            const interactiveBottom = interactiveTop + offscreenHeight;

            let isHovering = false;
            const isMobile = window.innerWidth < 640;
            const fuzzRange = isMobile ? 15 : 30;
            const adjustedBaseIntensity = isMobile ? baseIntensity * 0.5 : baseIntensity;

            const run = () => {
                if (isCancelled) return;
                ctx.clearRect(-fuzzRange, -fuzzRange, offscreenWidth + 2 * fuzzRange, offscreenHeight + 2 * fuzzRange);
                const intensity = isHovering ? hoverIntensity : adjustedBaseIntensity;
                for (let j = 0; j < offscreenHeight; j++) {
                    const dx = Math.floor(intensity * (Math.random() - 0.5) * fuzzRange);
                    ctx.drawImage(offscreen, 0, j, offscreenWidth, 1, dx, j, offscreenWidth, 1);
                }
                animationFrameId = window.requestAnimationFrame(run);
            };

            run();

            const isInsideTextArea = (x: number, y: number) =>
                x >= interactiveLeft && x <= interactiveRight && y >= interactiveTop && y <= interactiveBottom;

            const handleMouseMove = (e: MouseEvent) => {
                if (!enableHover) return;
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                isHovering = isInsideTextArea(x, y);
            };

            const handleMouseLeave = () => {
                isHovering = false;
            };

            const handleTouchMove = (e: TouchEvent) => {
                if (!enableHover) return;
                e.preventDefault();
                const rect = canvas.getBoundingClientRect();
                const touch = e.touches[0];
                const x = touch.clientX - rect.left;
                const y = touch.clientY - rect.top;
                isHovering = isInsideTextArea(x, y);
            };

            const handleTouchEnd = () => {
                isHovering = false;
            };

            if (enableHover) {
                canvas.addEventListener('mousemove', handleMouseMove);
                canvas.addEventListener('mouseleave', handleMouseLeave);
                canvas.addEventListener('touchmove', handleTouchMove, {
                    passive: false
                });
                canvas.addEventListener('touchend', handleTouchEnd);
            }

            const cleanup = () => {
                window.cancelAnimationFrame(animationFrameId);
                if (enableHover) {
                    canvas.removeEventListener('mousemove', handleMouseMove);
                    canvas.removeEventListener('mouseleave', handleMouseLeave);
                    canvas.removeEventListener('touchmove', handleTouchMove);
                    canvas.removeEventListener('touchend', handleTouchEnd);
                }
            };

            canvas.cleanupFuzzyText = cleanup;
        };

        init();

        return () => {
            isCancelled = true;
            window.cancelAnimationFrame(animationFrameId);
            if (canvas && canvas.cleanupFuzzyText) {
                canvas.cleanupFuzzyText();
            }
        };
    }, [children, fontSize, fontWeight, fontFamily, color, enableHover, baseIntensity, hoverIntensity]);

    const wrapperClasses = ['flex justify-center', className].filter(Boolean).join(' ');
    const canvasClasses = ['block', canvasClassName].filter(Boolean).join(' ');

    return (
        <div className={wrapperClasses} style={style}>
            <canvas ref={canvasRef} className={canvasClasses} />
        </div>
    );
};

export default FuzzyText;
