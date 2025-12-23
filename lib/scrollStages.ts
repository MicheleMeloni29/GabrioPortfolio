export type ScrollDirection = 1 | -1 | 0;

export type StageChangeDetail = {
    stageIndex: number;
    maxStage: number;
    direction: ScrollDirection;
};

export const SECTION_STAGE_EVENT = "section-stage-change";

export const clampStageIndex = (stage: number, maxStage: number) => {
    if (!Number.isFinite(stage)) return 0;
    if (maxStage <= 0) return 0;
    const upperBound = maxStage - 1;
    if (upperBound <= 0) return 0;
    return Math.min(Math.max(stage, 0), upperBound);
};
