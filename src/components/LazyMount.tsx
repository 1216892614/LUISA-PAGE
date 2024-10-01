"use client";

import React, { useState, useRef, useEffect } from "react";

const LazyMount: React.FC<{
    children: React.ReactNode;
    className?: string;
    mountThreshold?: number;
    unmountThreshold?: number;
}> = ({
    children,
    className,
    mountThreshold = 0.1,
    unmountThreshold = 0.1,
}) => {
    const [isMounted, setIsMounted] = useState(false);
    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                const ratio = entry.intersectionRatio;

                if (ratio >= mountThreshold && !isMounted) {
                    setIsMounted(true);
                } else if (ratio < unmountThreshold && isMounted) {
                    setIsMounted(false);
                }
            },
            { threshold: Array.from({ length: 11 }, (_, i) => i * 0.1) }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [mountThreshold, unmountThreshold, isMounted]);

    return (
        <div className={className} ref={observerRef}>
            {isMounted ? children : null}
        </div>
    );
};

export default LazyMount;
