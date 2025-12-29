'use client';

import Timeline from "../components/TimeLine";
import { useLanguage } from "../providers/LanguageProvider";

export default function WorksProcess() {
    const { dictionary } = useLanguage();
    const processTitle = dictionary.process?.title ?? "Process";

    return (
        <section
            id="process"
            data-scroll-lock="#process-timeline-scroll"
            className="snap-start flex min-h-screen w-full shrink-0 flex-col bg-nero px-6 py-14 text-rame-sabbia sm:px-12 lg:px-24"
        >
            <div className="mx-auto w-full max-w-5xl text-center pt-16 text-rame-sabbia">
                <h1 className="text-4xl font-bold uppercase sm:text-5xl lg:text-6xl">{processTitle}</h1>
            </div>

            <div className="mt-12 flex w-full flex-1 overflow-hidden min-h-0">
                <div
                    id="process-timeline-scroll"
                    data-allow-scroll="true"
                    className="no-scrollbar h-full w-full overflow-y-auto pr-4 sm:pr-6 min-h-0"
                >
                    <Timeline id="process-timeline" className="pb-34" />
                </div>
            </div>
        </section>
    );
}
