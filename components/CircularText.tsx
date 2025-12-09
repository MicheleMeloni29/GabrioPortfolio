import React, { useEffect } from 'react';
import { motion, useAnimation, useMotionValue, MotionValue, Transition } from 'motion/react';
interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: 'slowDown' | 'speedUp' | 'pause' | 'goBonkers';
  className?: string;
  size?: number;
  direction?: 'clockwise' | 'counterclockwise';
}

const getRotationTransition = (
  duration: number,
  from: number,
  directionMultiplier: number,
  loop: boolean = true
) => ({
  from,
  to: from + 360 * directionMultiplier,
  ease: 'linear' as const,
  duration,
  type: 'tween' as const,
  repeat: loop ? Infinity : 0
});

const getTransition = (duration: number, from: number, directionMultiplier: number) => ({
  rotate: getRotationTransition(duration, from, directionMultiplier),
  scale: {
    type: 'spring' as const,
    damping: 20,
    stiffness: 300
  }
});

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 20,
  onHover = 'speedUp',
  className = '',
  size = 280,
  direction = 'clockwise'
}) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation: MotionValue<number> = useMotionValue(0);
  const radius = Math.max(size / 2 - 16, 0);
  const directionMultiplier = direction === 'counterclockwise' ? -1 : 1;

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360 * directionMultiplier,
      scale: 1,
      transition: getTransition(spinDuration, start, directionMultiplier)
    });
  }, [spinDuration, text, onHover, controls, directionMultiplier]);

  const handleHoverStart = () => {
    const start = rotation.get();

    if (!onHover) return;

    let transitionConfig: ReturnType<typeof getTransition> | Transition;
    let scaleVal = 1;

    switch (onHover) {
      case 'slowDown':
        transitionConfig = getTransition(spinDuration * 2, start, directionMultiplier);
        break;
      case 'speedUp':
        transitionConfig = getTransition(spinDuration / 4, start, directionMultiplier);
        break;
      case 'pause':
        transitionConfig = {
          rotate: { type: 'spring', damping: 20, stiffness: 300 },
          scale: { type: 'spring', damping: 20, stiffness: 300 }
        };
        break;
      case 'goBonkers':
        transitionConfig = getTransition(spinDuration / 20, start, directionMultiplier);
        scaleVal = 0.8;
        break;
      default:
        transitionConfig = getTransition(spinDuration, start, directionMultiplier);
    }

    controls.start({
      rotate: start + 360 * directionMultiplier,
      scale: scaleVal,
      transition: transitionConfig
    });
  };

  const handleHoverEnd = () => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360 * directionMultiplier,
      scale: 1,
      transition: getTransition(spinDuration, start, directionMultiplier)
    });
  };

  return (
    <motion.div
      className={`m-0 mx-auto rounded-full relative font-black text-center text-2xl cursor-pointer origin-center ${className}`}
      style={{ rotate: rotation, width: size, height: size }}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const transform = `rotate(${rotationDeg}deg) translateY(-${radius}px)`;

        return (
          <span
            key={i}
            className="absolute inline-block inset-0 transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]"
            style={{ transform, WebkitTransform: transform }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;
