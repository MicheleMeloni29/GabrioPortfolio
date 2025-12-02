import { projectsData } from "../data/projects";

export default function ProjectsSection() {
    return (
        <section
            id="projects"
            className="snap-start min-h-screen w-full shrink-0 bg-nero px-6 pt-12 pb-12 text-bianco sm:min-h-[95vh] sm:px-10 sm:pt-20 lg:min-h-[90vh] lg:px-16 lg:pt-28"
        >
            <div className="mx-auto flex max-w-6xl flex-col gap-10">
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
                                <div className="absolute inset-0 flex items-end justify-between p-4 text-xs uppercase tracking-[0.3em] text-white/80">
                                    <span>{project.category}</span>
                                    <span>{project.year}</span>
                                </div>
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
