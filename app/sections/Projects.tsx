import { projectsData } from "../data/projects";

export default function ProjectsSection() {
    return (
        <section
            id="projects"
            className="snap-start flex h-screen w-full shrink-0 flex-col bg-nero px-6 py-12 text-bianco sm:px-10 sm:py-16 lg:px-16 lg:py-20"
        >
            <div className="mx-auto flex max-w-6xl flex-1 flex-col gap-10">
                <div
                    data-allow-scroll="true"
                    className="no-scrollbar mt-12 flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-6 sm:mt-16 lg:mt-8 cursor-grab"
                    role="list"
                    aria-label="Progetti in evidenza"
                >
                    {projectsData.map((project) => (
                        <article
                            key={project.id}
                            role="listitem"
                            className="flex min-w-[280px] flex-col rounded-3xl bg-white/5 p-5 text-left shadow-lg shadow-black/30 backdrop-blur sm:min-w-[320px] sm:p-4 lg:min-w-[360px] xl:min-w-[400px] snap-center"
                        >
                            <div
                                className="relative aspect-4/3 w-full overflow-hidden rounded-2xl sm:aspect-video"
                                style={{ background: project.coverGradient }}
                            >
                            </div>

                            <div className="mt-3 grid grid-cols-3 gap-1.5 sm:grid-cols-4">
                                {project.images.slice(0, 7).map((image) => (
                                    <div
                                        key={image.id}
                                        className="aspect-square overflow-hidden rounded-xl border border-white/10"
                                        style={{ background: image.gradient }}
                                    >
                                        <span className="sr-only">{image.id}</span>
                                    </div>
                                ))}
                            </div>

                            <h3 className="mt-3 text-lg font-semibold text-white">{project.title}</h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-white/70">{project.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
