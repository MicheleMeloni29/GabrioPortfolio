"use client";

import ScrollVelocity from "../components/ScrollVelocity";
import BlurText from "../components/BlurText";
import SplitText from "../components/SplitText";

export default function AboutSection() {
    const velocity = -18.0;
    const handleAnimationComplete = () => {
        // Hook for future interactions once the blur animation ends.
        return;
    };



    return (
        <section
            id="about"
            className="snap-start flex min-h-screen w-full shrink-0 items-center justify-center bg-rame-sabbia px-6 py-16 text-nero sm:px-12 lg:px-24"
        >
            <div className="w-full max-w-6xl text-center">
                <ScrollVelocity
                    texts={[
                        "Sono Gabrio Serra. Trasformo visioni in identita' capaci di vivere nel mondo reale.",
                    ]}
                    velocity={velocity}
                    className="custom-scroll-text"
                    parallaxClassName="px-6 sm:px-12 lg:px-20"
                />
                <BlurText
                    text="Lavoro tra Sardegna e ovunque mi porti il design"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className="text-2xl mb-8 mt-16 font-semibold sm:text-3xl lg:text-4xl"
                />
                <SplitText
                    text="Credo nella semplicita' che comunica, nel nucleo che da' forma e nelle identita' che parlano da sole."
                    className="text-2xl font-semibold text-center mt-13 "
                    delay={100}
                    duration={0.6}
                    ease="easeOut"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="center"
                    onLetterAnimationComplete={handleAnimationComplete}
                />
            </div>
        </section>
    );
}
