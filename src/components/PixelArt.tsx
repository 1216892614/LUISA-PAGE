"use client";

import { useEffect, useRef, useCallback } from "react";

interface PixelArtCanvasProps {
    imageSrc: string; // 图片路径
    className?: string; // 允许传递 className
}

// 纯函数来计算 canvas 的宽高
const calculateCanvasSize = (
    clientWidth: number | undefined,
    clientHeight: number | undefined,
    imgWidth: number,
    imgHeight: number
) => {
    if (!clientWidth && !clientHeight)
        return { width: imgWidth, height: imgHeight };

    if (!clientWidth)
        return {
            width: (clientHeight! * imgWidth) / imgHeight,
            height: clientHeight,
        };

    if (!clientHeight)
        return {
            width: clientWidth,
            height: (clientWidth * imgHeight) / imgWidth,
        };

    return { width: clientWidth, height: clientHeight };
};

// 纯函数来计算裁剪区域
const calculateCropArea = (
    canvasWidth: number,
    canvasHeight: number,
    imgWidth: number,
    imgHeight: number
) => {
    const canvasAspect = canvasWidth / canvasHeight;
    const imgAspect = imgWidth / imgHeight;

    if (imgAspect > canvasAspect) {
        const sWidth = imgHeight * canvasAspect;
        const sx = (imgWidth - sWidth) / 2;
        return { sx, sy: 0, sWidth, sHeight: imgHeight };
    }

    if (imgAspect < canvasAspect) {
        const sHeight = imgWidth / canvasAspect;
        const sy = (imgHeight - sHeight) / 2;
        return { sx: 0, sy, sWidth: imgWidth, sHeight };
    }

    return { sx: 0, sy: 0, sWidth: imgWidth, sHeight: imgHeight };
};

const PixelArt = ({ imageSrc, className }: PixelArtCanvasProps) => {
    const divRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);

    // 计算并绘制图片的函数，包裹在 useCallback 以避免重新创建
    const drawImage = useCallback(
        (canvas: HTMLCanvasElement, img: HTMLImageElement) => {
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;

            const { sx, sy, sWidth, sHeight } = calculateCropArea(
                canvasWidth,
                canvasHeight,
                img.width,
                img.height
            );

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.imageSmoothingEnabled = false;

            ctx.drawImage(
                img,
                sx,
                sy,
                sWidth,
                sHeight,
                0,
                0,
                canvasWidth,
                canvasHeight
            );
        },
        []
    );

    const createCanvas = useCallback(
        (div: HTMLDivElement, img: HTMLImageElement) => {
            const { clientWidth, clientHeight } = div;

            const { width, height } = calculateCanvasSize(
                clientWidth,
                clientHeight,
                img.width,
                img.height
            );

            const canvas = document.createElement("canvas");

            canvas.width = width;
            canvas.height = height ?? 0;

            drawImage(canvas, img);

            return canvas;
        },
        [drawImage]
    );

    useEffect(() => {
        const div = divRef.current;

        if (!div) return;

        // 图片加载并缓存后，生成 canvas
        const handleImageLoad = (img: HTMLImageElement) => {
            imgRef.current = img;
            const canvas = createCanvas(div, img);
            div.appendChild(canvas);
        };

        // 加载图片
        const img = new Image();

        img.src = imageSrc;
        img.onload = () => handleImageLoad(img);

        // 当 div 尺寸变化时重新渲染 canvas
        const resizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(() => {
                if (imgRef.current) {
                    // 清除之前的 canvas
                    while (div.firstChild) {
                        div.removeChild(div.firstChild);
                    }
                    const canvas = createCanvas(div, imgRef.current);
                    div.appendChild(canvas);
                }
            });
        });

        resizeObserver.observe(div);

        return () => {
            resizeObserver.disconnect();
        };
    }, [imageSrc, createCanvas]);

    return <div ref={divRef} className={`${className} overflow-hidden`} />;
};

export default PixelArt;
