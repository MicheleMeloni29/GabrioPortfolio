"use client";

import BlurText from "../components/BlurText";

export default function StudioSection() {
    const velocity = -18.0;
    const handleAnimationComplete = () => {
        // Hook for future interactions once the blur animation ends.
        return;
    };



    return (
        <section
            id="about"
            className="snap-start flex min-h-screen w-full shrink-0 items-center justify-center bg-sfondo2 px-6 py-16 text-nero sm:px-12 lg:px-24"
        >
            <div className="w-full max-w-6xl text-center">
                <BlurText
                    text="Lavoro tra Sardegna e ovunque mi porti il design"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className="CORE STUDIO nasce dall'dea che ogni brand ha un cuore: un nucleo, un centro, un significato profondo."
                />
                <BlurText
                    text="Lavoro tra Sardegna e ovunque mi porti il design"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className="Il mio lavoro e' trasformare quell'essenza in identita' visiva, strategia e presenza. 
                                Creo sistemi visivi chiari, memorabili e preimum, pensati per brand locali e imprenditori
                                che vogliono distinguersi nel mercato italiano e internazionale."
                />

            </div>
        </section>
    );
}
