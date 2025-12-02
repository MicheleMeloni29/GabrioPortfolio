"use client";

import { motion, type Transition } from "motion/react";
import { useEffect, useRef, useState } from "react";

type SplitTextProps = {
  text?: string;
  className?: string;
  delay?: number; // milliseconds between letters
  duration?: number; // seconds each letter animation lasts
  ease?: Transition["ease"];
  splitType?: "chars" | "words";
  from?: Record<string, string | number>;
  to?: Record<string, string | number>;
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "center" | "right";
  onLetterAnimationComplete?: () => void;
};

const SplitText: React.FC<SplitTextProps> = ({
  text = "",
  className = "",
  delay = 60,
  duration = 0.4,
  ease = "easeOut",
  splitType = "chars",
  from = { opacity: 0, y: 20 },
  to = { opacity: 1, y: 0 },
  threshold = 0.15,
  rootMargin = "0px",
  textAlign = "left",
  onLetterAnimationComplete,
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [isActive, setIsActive] = useState(false);
  const segments =
    splitType === "words" ? text.split(" ") : Array.from(text || "");

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <p ref={ref} className={`split-text ${className}`} style={{ textAlign }}>
      {segments.map((segment, index) => (
        <motion.span
          key={`${segment}-${index}`}
          initial={from}
          animate={isActive ? to : from}
          transition={{
            duration,
            ease,
            delay: isActive ? (index * (delay ?? 0)) / 1000 : 0,
          }}
          onAnimationComplete={
            index === segments.length - 1 ? onLetterAnimationComplete : undefined
          }
          style={{ display: "inline-block" }}
        >
          {segment === " " ? "\u00A0" : segment}
          {splitType === "words" && index < segments.length - 1 ? "\u00A0" : null}
        </motion.span>
      ))}
    </p>
  );
};

export default SplitText;
