"use client";

import { callFrame } from "@/until/animate";
import {
    MutableRefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import _ from "lodash/fp";
import Zdog from "zdog";

const animateStart = (svgEl: SVGSVGElement) => {
    const ctrler = new AbortController();

    if (!svgEl) return null;

    // Initialize Zdog Illustration
    const illo = new Zdog.Illustration({
        element: svgEl,
    });

    const group = new Zdog.Group({
        addTo: illo,
        rotate: { z: 0.2 },
    });

    const boxSet = _.range(0, 3)
        .map((x) =>
            _.range(0, 3).map((y) =>
                _.range(0, 3).map((z) => {
                    const size = 10;
                    const margin = 50;

                    const box = new Zdog.Box({
                        fill: false,
                        translate: {
                            x: (1 - x) * (size + margin),
                            y: (1 - y) * (size + margin),
                            z: (1 - z) * (size + margin),
                        },
                        width: size,
                        height: size,
                        depth: size,
                        stroke: 0.5,
                        color: `rgb(252, 165, 165)`,
                    });

                    return box;
                })
            )
        )
        .flat(3);

    boxSet.forEach((box) => group.addChild(box));

    // Initial render
    illo.updateRenderGraph();

    _.range(0, 3).forEach(() => {
        let lastIdx: number = 0;
        setInterval(() => {
            const idx = Math.floor(boxSet.length * Math.random());

            boxSet[idx].fill = true;
            boxSet[lastIdx].fill = false;

            lastIdx = idx;
        }, 50);
    });

    // Animation loop
    callFrame(
        (delta) => {
            group.rotate.y += 0.001 * delta;

            illo.updateRenderGraph();
        },
        { signal: ctrler.signal }
    );

    return ctrler;
};

export default function TestComp() {
    const svgRef = useRef<SVGSVGElement>(null);
    const [svgSize, setSvgSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    useEffect(() => {
        const svgEl = svgRef.current;

        if (!svgEl || !svgRef.current) return;

        const ctrler = new AbortController();

        let initAbort = animateStart(svgRef.current);

        window.addEventListener(
            "resize",
            () => {
                initAbort?.abort();

                setSvgSize([window.innerWidth, window.innerHeight]);
            },
            {
                signal: ctrler.signal,
            }
        );

        // Clean up
        return () => {
            ctrler.abort();
        };
    }, []);

    const lastInitAbort: MutableRefObject<AbortController | null> =
        useRef(null);

    useEffect(() => {
        if (!svgSize || !svgRef.current) return;

        lastInitAbort.current?.abort();

        lastInitAbort.current = animateStart(svgRef.current);
    }, [svgSize]);

    return (
        <main className="w-screen h-screen overflow-hidden bg-slate-900 text-slate-900">
            <svg
                ref={svgRef}
                width={svgSize[0]}
                height={svgSize[1]}
                viewBox={`0 0 ${svgSize[0]} ${svgSize[1]}`}
                className="absolute top-0 left-0 w-full h-full"
            />
        </main>
    );
}
