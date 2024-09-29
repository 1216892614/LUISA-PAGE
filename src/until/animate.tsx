export const callFrame = (
    f: (delta: number) => void,
    opt?: { signal: AbortSignal }
) => {
    let lastTime = 0;
    const animate: FrameRequestCallback = (time) => {
        if (opt?.signal.aborted) return;

        const delta = time - lastTime;
        lastTime = time;

        f(delta);

        requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
};
