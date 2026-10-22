"use client";

import { useCallback, useState } from "react";

export interface PdfCompressOptions {
    targetBytes?: number;
    preset?: "default" | "small" | "medium" | "large" | "custom";
    dpi?: number;
    onProgress?: (progress: number) => void;
}

const MAX_DIM = 8192;
const MAX_AREA = 67108864; // 64 Megapixels

async function rasterizeAndCompress(
    file: File | Blob,
    quality: number,
    scale: number,
    onProgress?: (p: number) => void,
): Promise<Blob> {
    const [{ PDFDocument }, pdfjsLib] = await Promise.all([
        import("pdf-lib"),
        import("pdfjs-dist"),
    ]);

    if (typeof window !== "undefined") {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer.slice(0) }).promise;
    const newPdf = await PDFDocument.create();
    const numPages = pdf.numPages;

    for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const origViewport = page.getViewport({ scale: 1.0 });

        let w = Math.max(1, Math.floor(origViewport.width * scale));
        let h = Math.max(1, Math.floor(origViewport.height * scale));

        if (w > MAX_DIM || h > MAX_DIM) {
            const r = Math.min(MAX_DIM / w, MAX_DIM / h);
            w = Math.floor(w * r);
            h = Math.floor(h * r);
        }
        if (w * h > MAX_AREA) {
            const r = Math.sqrt(MAX_AREA / (w * h));
            w = Math.floor(w * r);
            h = Math.floor(h * r);
        }

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;

        const context = canvas.getContext("2d")!;
        context.fillStyle = "#FFFFFF";
        context.fillRect(0, 0, canvas.width, canvas.height);

        await page.render({
            canvasContext: context,
            canvas: canvas,
            viewport: page.getViewport({ scale: w / origViewport.width }),
            background: "#FFFFFF",
            intent: "display",
        }).promise;

        const blob = await new Promise<Blob>((resolve, reject) =>
            canvas.toBlob(
                (b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
                "image/jpeg",
                quality,
            ),
        );

        const imgBytes = await blob.arrayBuffer();
        const jpgImage = await newPdf.embedJpg(imgBytes);
        const newPage = newPdf.addPage([origViewport.width, origViewport.height]);
        newPage.drawImage(jpgImage, {
            x: 0,
            y: 0,
            width: origViewport.width,
            height: origViewport.height,
        });

        context.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = 0;
        canvas.height = 0;
        page.cleanup();
        onProgress?.(Math.floor((i / numPages) * 100));
    }

    const pdfBytes = await newPdf.save({ useObjectStreams: true });
    return new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
}

export function useCompressPdf() {
    const [isCompressing, setIsCompressing] = useState(false);

    const compressPdf = useCallback(
        async (file: File, options: PdfCompressOptions): Promise<Blob> => {
            // 🛡️ CRITICAL FIX: Prevent Next.js SSR from executing client-only compression logic
            if (typeof window === "undefined") {
                return file;
            }

            const { targetBytes, preset = "default", dpi, onProgress } = options;
            setIsCompressing(true);

            const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
                const msg = event.reason?.message || event.reason?.toString() || "";
                if (msg.includes("compressed data") || msg.includes("Junk found")) {
                    event.preventDefault();
                }
            };

            window.addEventListener("unhandledrejection", handleUnhandledRejection);

            const { compressPDF } = await import("@fileslim/compress");

            const fileslim = async (
                mode: "low" | "balanced" | "high" | "maximum",
                imageQuality: number,
                maxImageDimension: number,
                from: number,
                to: number,
            ): Promise<Blob> => {
                const result = await compressPDF(file, {
                    mode,
                    imageQuality,
                    maxImageDimension,
                    stripMetadata: true,
                    onProgress: (_phase, percent) =>
                        onProgress?.(Math.floor(from + (percent / 100) * (to - from))),
                });
                return result.blob;
            };

            const pickSmallest = (blobs: (Blob | null)[], mustReduce: boolean): Blob => {
                const valid = blobs.filter((b): b is Blob => !!b);
                if (valid.length === 0) return file;
                valid.sort((a, b) => a.size - b.size);
                if (mustReduce && valid[0].size >= file.size) return file;
                return valid[0];
            };

            try {
                onProgress?.(2);

                if (dpi && dpi > 0) {
                    const blob = await rasterizeAndCompress(file, 0.8, dpi / 72, (p) =>
                        onProgress?.(5 + Math.floor(p * 0.95)),
                    );
                    onProgress?.(100);
                    return blob;
                }

                if (targetBytes && targetBytes > 0) {
                    let best: Blob = file;
                    let bestDiff = Infinity;

                    const consider = (b: Blob): Blob => {
                        const d = Math.abs(b.size - targetBytes);
                        if (d < bestDiff) {
                            bestDiff = d;
                            best = b;
                        }
                        return b;
                    };

                    const evalRender = async (scale: number, quality: number): Promise<Blob> => {
                        try {
                            return await rasterizeAndCompress(file, quality, scale);
                        } catch (e) {
                            console.warn("Render failed at scale", scale, "quality", quality, e);
                            throw e;
                        }
                    };

                    try {
                        const base = await evalRender(1.0, 0.95);
                        consider(base);
                        onProgress?.(5);

                        if (bestDiff / targetBytes < 0.05) {
                            onProgress?.(100);
                            return best;
                        }

                        const minB = await evalRender(0.05, 0.05);
                        consider(minB);
                        onProgress?.(10);

                        if (targetBytes <= minB.size) {
                            onProgress?.(100);
                            return minB;
                        }

                        const overhead = minB.size;
                        const baseContent = Math.max(1024, base.size - overhead);
                        const targetContent = Math.max(1024, targetBytes - overhead);
                        const estScale = Math.sqrt(targetContent / baseContent);

                        let lowScale: number;
                        let highScale: number;
                        let maxB: Blob | undefined;

                        if (targetBytes > base.size) {
                            const maxProbeScale = 32.0;

                            if (targetBytes > base.size * 2) {
                                onProgress?.(15);
                                maxB = await evalRender(maxProbeScale, 1.0);
                                consider(maxB);

                                if (targetBytes >= maxB.size) {
                                    console.warn(
                                        `Target ${targetBytes} is unreachable. Capped at ${maxB.size}`,
                                    );
                                    onProgress?.(100);
                                    return maxB;
                                }

                                lowScale = Math.max(1.0, estScale * 0.5);
                                highScale = Math.min(maxProbeScale, estScale * 2.0);
                                if (highScale < 8.0 && maxProbeScale > 8.0) highScale = 8.0;
                            } else {
                                lowScale = 1.0;
                                highScale = Math.max(2.0, estScale * 1.5);
                            }
                        } else {
                            lowScale = Math.max(0.05, estScale * 0.6);
                            highScale = Math.min(1.0, estScale * 1.4);
                        }

                        let bestScale = estScale;
                        let currentBestDiff = Infinity;

                        for (let i = 0; i < 8; i++) {
                            const midScale = (lowScale + highScale) / 2;
                            const b = await evalRender(midScale, 0.95);
                            const diff = Math.abs(b.size - targetBytes);

                            consider(b);
                            if (diff < currentBestDiff) {
                                currentBestDiff = diff;
                                bestScale = midScale;
                            }

                            onProgress?.(20 + ((i + 1) / 8) * 40);

                            if (diff / targetBytes < 0.02) {
                                onProgress?.(100);
                                return best;
                            }

                            if (b.size < targetBytes) lowScale = midScale;
                            else highScale = midScale;
                        }

                        let lowQ = targetBytes > base.size ? 0.6 : 0.05;
                        let highQ = 1.0;

                        for (let i = 0; i < 6; i++) {
                            const midQ = (lowQ + highQ) / 2;
                            const b = await evalRender(bestScale, midQ);
                            const diff = Math.abs(b.size - targetBytes);

                            consider(b);
                            onProgress?.(60 + ((i + 1) / 6) * 40);

                            if (diff / targetBytes < 0.02) {
                                onProgress?.(100);
                                return best;
                            }

                            if (b.size > targetBytes) highQ = midQ;
                            else lowQ = midQ;
                        }
                    } catch (e) {
                        console.error("Target size binary search failed:", e);
                    }

                    onProgress?.(100);
                    return best;
                }

                if (preset === "small") {
                    let a: Blob | null = null;
                    let b: Blob | null = null;
                    try {
                        a = await fileslim("maximum", 0.3, 1000, 5, 45);
                    } catch (e) {
                        console.warn(e);
                    }
                    try {
                        b = await rasterizeAndCompress(file, 0.3, 0.8, (p) =>
                            onProgress?.(45 + Math.floor(p * 0.55)),
                        );
                    } catch (e) {
                        console.warn(e);
                    }
                    onProgress?.(100);
                    return pickSmallest([a, b], true);
                }

                if (preset === "medium") {
                    let a: Blob | null = null;
                    let b: Blob | null = null;
                    try {
                        a = await fileslim("balanced", 0.6, 1400, 5, 45);
                    } catch (e) {
                        console.warn(e);
                    }
                    try {
                        b = await rasterizeAndCompress(file, 0.55, 1.0, (p) =>
                            onProgress?.(45 + Math.floor(p * 0.55)),
                        );
                    } catch (e) {
                        console.warn(e);
                    }
                    onProgress?.(100);
                    return pickSmallest([a, b], true);
                }

                if (preset === "large") {
                    let a: Blob | null = null;
                    try {
                        a = await fileslim("low", 0.85, 2000, 5, 95);
                    } catch (e) {
                        console.warn(e);
                    }
                    onProgress?.(100);
                    return pickSmallest([a], true);
                }

                let a: Blob | null = null;
                let b: Blob | null = null;
                try {
                    a = await fileslim("balanced", 0.65, 1600, 5, 45);
                } catch (e) {
                    console.warn(e);
                }
                if (!a || a.size >= file.size * 0.9) {
                    try {
                        b = await rasterizeAndCompress(file, 0.6, 1.0, (p) =>
                            onProgress?.(45 + Math.floor(p * 0.55)),
                        );
                    } catch (e) {
                        console.warn(e);
                    }
                }
                onProgress?.(100);
                const candidates = [a, b].filter((x): x is Blob => !!x && x.size < file.size);
                if (candidates.length === 0) return file;
                candidates.sort((x, y) => x.size - y.size);
                return candidates[0];
            } catch (error) {
                console.error("PDF compression failed completely:", error);
                onProgress?.(100);
                return file;
            } finally {
                window.removeEventListener("unhandledrejection", handleUnhandledRejection);
                setIsCompressing(false);
            }
        },
        [],
    );

    return { compressPdf, isCompressing };
}
