"use client";

import { callFrame } from "@/until/animate";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import _ from "lodash/fp";
import Zdog from "zdog";

const animateStart = (cvsEl: HTMLCanvasElement) => {
    const ctrler = new AbortController();

    if (!cvsEl) return null;

    const illo = new Zdog.Illustration({
        dragRotate: true,
        resize: true,
        element: cvsEl,
        rotate: { x: -0.5 },
    });

    const group = new Zdog.Group({
        addTo: illo,
    });

    const len = 5;
    const size = 5;
    const margin = 150;

    const boxSet = _.range(0, len)
        .map((x) =>
            _.range(0, len).map((y) =>
                _.range(0, len).map((z) => {
                    const box = new Zdog.Box({
                        translate: {
                            x: ((len - 1) / 2 - x) * (size + margin),
                            y: ((len - 1) / 2 - y) * (size + margin),
                            z: ((len - 1) / 2 - z) * (size + margin),
                        },
                        width: size,
                        height: size,
                        depth: size,
                        stroke: 0,
                        fill: false,
                        color: `rgb(252, 165, 165)`,
                    });

                    return box;
                })
            )
        )
        .flat(3);

    boxSet.forEach((box) => group.addChild(box));

    illo.updateRenderGraph();

    const intervals = _.range(0, 10).map(() => {
        return setInterval(() => {
            const idx = Math.floor(boxSet.length * Math.random());

            boxSet[idx].stroke = 0.2;
            boxSet[idx].fill = !boxSet[idx].fill;
        }, 300);
    });

    callFrame(
        (delta) => {
            group.rotate.y += 0.0001 * delta;

            illo.updateRenderGraph();
        },
        { signal: ctrler.signal }
    );

    ctrler.signal.addEventListener("abort", () =>
        intervals.forEach(clearInterval)
    );

    return ctrler;
};

export default function RAM() {
    const cvsRef = useRef<HTMLCanvasElement>(null);
    const [cvsSize, setSvgSize] = useState([
        document.body.clientWidth,
        document.body.clientHeight,
    ]);

    useEffect(() => {
        const svgEl = cvsRef.current;

        if (!svgEl || !cvsRef.current) return;

        const ctrler = new AbortController();

        let initAbort = animateStart(cvsRef.current);

        addEventListener(
            "resize",
            () => {
                initAbort?.abort();

                setSvgSize([innerWidth, innerHeight]);
            },
            {
                signal: ctrler.signal,
            }
        );

        return () => {
            ctrler.abort();
        };
    }, []);

    const lastInitAbort: MutableRefObject<AbortController | null> =
        useRef(null);

    useEffect(() => {
        if (!cvsSize || !cvsRef.current) return;

        lastInitAbort.current?.abort();

        lastInitAbort.current = animateStart(cvsRef.current);
    }, [cvsSize]);

    return (
        <canvas ref={cvsRef} className="absolute top-0 left-0 w-full h-full" />
    );
}
