'use client';
import FuzzyText from "../components/FuzzyText";
import GradientText from "../components/SplashColors";

const hoverIntensity = 0.5;
const enableHover = true;

export default function Hero() {
    return (
        <section
            id="hero"
            className="snap-start flex h-screen w-full shrink-0 items-center justify-center bg-nero px-6 pt-28 pb-6 text-white"
        >
            <div className="max-w-2xl text-center mb-6">
                <FuzzyText
                    fontSize="clamp(2.6rem, 10vw, 4rem)"
                    baseIntensity={0.1}
                    hoverIntensity={0.5}
                    enableHover
                    className="mb-6 max-w-full scale-[1.4] sm:scale-[1.1] lg:scale-[0.85] origin-center"
                >
                    DAL CUORE ALLA FORMA
                </FuzzyText>
                <GradientText
                    colors={[
                        "var(--color-bianco)",
                        "var(--color-rame-sabbia)",
                        "var(--color-bianco)",
                        "var(--color-rame-sabbia)",
                    ]}
                    animationSpeed={2}
                    showBorder={false}
                    textClassName="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-wide"
                    className="custom-class"
                >
                    L&apos;essenza diventa identita&apos;
                </GradientText>
                <h3 className="mt-4 text-sm sm:text-base">
                    Brand Design Studio - Italy / WorldWide
                </h3>
            </div>
        </section>
    );
}
