"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const RAM = dynamic(() => import("./RAM"), { ssr: false });
const LazyMount = dynamic(() => import("./LazyMount"), { ssr: false });

const FEATURE_WORDS = [
    "HIGH_PERFORMANCE",
    "CROSS_PLATFORM",
    "BSD_3_CLAUSE",
    "C++",
    "Rust",
    "Python",
    "GPU/CPU",
    "DSL",
    "DirectX",
    "CUDA",
    "Metal",
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
        <div className="w-screen h-[calc(100vh-5rem)] bg-primary relative font-[Dinkie] overflow-hidden">
            <LazyMount className="absolute left-0 top-0 w-full h-full">
                <RAM />
            </LazyMount>

            <h1 className="absolute w-full mx-[10vw] left-1/2 top-24 md:top-20 lg:top-16 font-[Sarasa] font-bold -translate-x-1/2 text-4xl md:text-5xl lg:text-7xl">
                <span className="text-blue-400">L</span>
                <span className="text-green-400">U</span>
                <span className="text-yellow-400">I</span>
                <span className="text-orange-400">S</span>
                <span className="text-red-400">A</span>
            </h1>

            <h2 className="absolute w-full mx-[10vw] left-1/2 top-36 -translate-x-1/2 text-xl md:text-3xl lg:text-5xl">
                <div>
                    A
                    <span
                        className={`ml-2 ${
                            featureWords.isSelected
                                ? "bg-primary-content text-primary"
                                : ""
                        }`}
                    >
                        {`${featureWords.str}`}
                    </span>
                    <span className="h-full mr-2 ml-1 relative">
                        {!featureWords.isSelected && (
                            <span className="absolute bg-slate-800 h-6 lg:h-10 w-1 -left-1" />
                        )}
                    </span>
                </div>

                <div>Computing Framework</div>

                <div className="mt-4">For Graphics and BEYOND!</div>
            </h2>

            <div className="absolute w-full mx-[10vw] left-1/2 top-64 md:top-72 lg:top-80 -translate-x-1/2 md:text-bg lg:text-xl flex flex-col sm:flex-row items-start pr-2 [&>*]:my-1 [&>*]:mx-2 [&>*]:px-1">
                <a className="hover:text-primary hover:bg-blue-400 text-slate-800 cursor-pointer">
                    Get Started
                </a>

                <a className="hover:text-primary hover:bg-green-400 text-slate-800 cursor-pointer">
                    Why LUISA?
                </a>

                <a className="hover:text-primary hover:bg-yellow-400 text-slate-800 cursor-pointer">
                    Migrate from...
                </a>
            </div>

            <div className="absolute w-full mx-[10vw] left-0 bottom-20 flex flex-col">
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
