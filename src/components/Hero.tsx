"use client";

import { useEffect, useState } from "react";

import meshSvg from "@/assets/mesh.svg";
import Image from "next/image";

const FEATURE_WORDS = [
    "A GPU/CPU",
    "A HIGH_PERFORMANCE",
    "A CROSS_PLATFORM",
    "AN OPEN_SOURCE",
    "A C++",
    "A Rust",
    "A Python",
    "A DSL",
];

const Hero = () => {
    const [featureWords, setFeatureWords] = useState({
        str: FEATURE_WORDS[0],
        isSelected: false,
        idx: 0,
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (featureWords.isSelected)
                return setFeatureWords({
                    str: "",
                    isSelected: false,
                    idx: (featureWords.idx + 1) % FEATURE_WORDS.length,
                });

            if (
                featureWords.str.length ===
                FEATURE_WORDS[featureWords.idx].length
            )
                return setTimeout(
                    () =>
                        setFeatureWords({ ...featureWords, isSelected: true }),
                    1000
                );

            setFeatureWords({
                ...featureWords,
                str: FEATURE_WORDS[featureWords.idx].slice(
                    0,
                    featureWords.str.length + 1
                ),
            });
        }, 150);

        return () => clearTimeout(timeout);
    }, [featureWords]);

    return (
        <div className="w-screen h-[calc(100vh-5rem)] bg-primary relative border-t-2 border-slate-800 font-[Dinkie]">
            <Image
                src={meshSvg}
                alt="mesh"
                className="absolute -right-8 -bottom-2 max-w-[1300px] min-w-[1000px]"
            />

            <h1 className="absolute w-full px-14 left-1/2 top-32 -translate-x-1/2 text-4xl">
                <div>
                    <span
                        className={
                            featureWords.isSelected
                                ? "bg-primary-content text-primary"
                                : ""
                        }
                    >
                        {`${featureWords.str}`}
                    </span>
                    <span className="h-full mr-4 ml-1 relative">
                        {!featureWords.isSelected && (
                            <span className="absolute bg-slate-800 h-10 w-1 -left-1" />
                        )}
                    </span>
                    Computing Framework
                </div>

                <div className="mt-4">For Graphics and BEYOND!</div>
            </h1>

            <div className="absolute left-20 bottom-20 flex flex-col">
                <a
                    className="hover:text-primary-content"
                    href="https://github.com/LuisaGroup/LuisaCompute"
                >
                    {"> Luisa Compute"}
                </a>
                <a
                    className="hover:text-primary-content"
                    href="https://github.com/LuisaGroup/LuisaRender"
                >
                    {"> Luisa Render"}
                </a>
            </div>
        </div>
    );
};

export default Hero;
