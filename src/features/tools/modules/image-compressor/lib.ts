export interface CompressOptions {
    quality?: number;
    targetSizeKB?: number;
    targetSizeMB?: number;
    format?: "png" | "jpeg" | "webp";
    onProgress?: (progress: number) => void;
}

// 🛡️ FIX 1: Raised to modern browser maximums (Chrome/Firefox/Safari support this)
const MAX_CANVAS_DIMENSION = 16384;
const MAX_CANVAS_AREA = 268435456; // 256 Megapixels

const loadImage = (file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.onload = () => {
            URL.revokeObjectURL(url);
            resolve(img);
        };
        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error("Failed to load image file"));
        };
        img.src = url;
    });
};

const compressToBlob = (
    img: HTMLImageElement,
    width: number,
    height: number,
    quality: number,
    format: string,
): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        let safeW = Math.max(16, Math.floor(width));
        let safeH = Math.max(16, Math.floor(height));

        if (safeW > MAX_CANVAS_DIMENSION || safeH > MAX_CANVAS_DIMENSION) {
            const ratio = Math.min(MAX_CANVAS_DIMENSION / safeW, MAX_CANVAS_DIMENSION / safeH);
            safeW = Math.floor(safeW * ratio);
            safeH = Math.floor(safeH * ratio);
        }
        if (safeW * safeH > MAX_CANVAS_AREA) {
            const ratio = Math.sqrt(MAX_CANVAS_AREA / (safeW * safeH));
            safeW = Math.floor(safeW * ratio);
            safeH = Math.floor(safeH * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = safeW;
        canvas.height = safeH;

        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Failed to acquire 2D canvas context"));

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, safeW, safeH);

        const mimeType =
            format === "png" ? "image/png" : format === "webp" ? "image/webp" : "image/jpeg";
        const safeQuality = format === "png" ? undefined : Math.max(0.01, Math.min(1.0, quality));

        canvas.toBlob(
            (blob) => {
                if (blob) resolve(blob);
                else reject(new Error("Failed to generate blob"));
            },
            mimeType,
            safeQuality,
        );
    });
};

export async function compressImage(file: File, options: CompressOptions): Promise<Blob> {
    const img = await loadImage(file);
    const format = options.format || "jpeg";
    const targetBytes = options.targetSizeKB
        ? options.targetSizeKB * 1024
        : options.targetSizeMB
          ? options.targetSizeMB * 1024 * 1024
          : null;

    const updateProgress = (p: number) => options.onProgress?.(Math.min(99, Math.floor(p)));

    // Standard compression (no exact target)
    if (!targetBytes) {
        updateProgress(50);
        const blob = await compressToBlob(
            img,
            img.width,
            img.height,
            options.quality ?? 0.8,
            format,
        );
        updateProgress(100);
        return blob;
    }

    const maxPossibleScale = Math.min(
        MAX_CANVAS_DIMENSION / img.width,
        MAX_CANVAS_DIMENSION / img.height,
        Math.sqrt(MAX_CANVAS_AREA / (img.width * img.height)),
    );

    // 1. Establish minimum possible size
    const minBlob = await compressToBlob(img, 16, 16, format === "png" ? 1.0 : 0.01, format);
    updateProgress(5);
    if (targetBytes <= minBlob.size) {
        updateProgress(100);
        return minBlob;
    }

    // 2. Quick baseline to estimate the right mathematical neighborhood
    const baseBlob = await compressToBlob(
        img,
        img.width,
        img.height,
        format === "png" ? 1.0 : 0.95,
        format,
    );
    updateProgress(10);

    // Initialize bestBlob to baseBlob to guarantee it's never null
    let bestBlob: Blob = baseBlob;
    let minDiff = Math.abs(baseBlob.size - targetBytes);
    let bestW = img.width;
    let bestH = img.height;

    // Early exit: if baseline is already within 5% of target, we are done!
    if (minDiff / targetBytes < 0.05) {
        updateProgress(100);
        return bestBlob;
    }

    // 3. Smart initial bounds based on baseline
    let lowScale: number;
    let highScale: number;

    if (targetBytes > baseBlob.size) {
        // 🛡️ FIX 2: UPSCALE LOGIC
        const est = Math.sqrt(targetBytes / baseBlob.size);
        lowScale = Math.max(1.0, est * 0.5);
        // If the target is huge, allow the search to go all the way to the absolute browser limit
        highScale = Math.min(maxPossibleScale, Math.max(maxPossibleScale, est * 1.5));
    } else {
        // DOWNSCALE LOGIC (This was already working perfectly)
        const est = Math.sqrt(targetBytes / baseBlob.size);
        lowScale = Math.max(0.01, est * 0.5);
        highScale = Math.min(1.0, est * 1.5);
    }

    // Phase 1: Scale Search (8 iterations)
    for (let i = 0; i < 8; i++) {
        const midScale = (lowScale + highScale) / 2;
        const testW = Math.max(16, Math.floor(img.width * midScale));
        const testH = Math.max(16, Math.floor(img.height * midScale));

        const testQ = format === "png" ? 1.0 : 0.95;
        const blob = await compressToBlob(img, testW, testH, testQ, format);
        const diff = Math.abs(blob.size - targetBytes);

        updateProgress(10 + ((i + 1) / 8) * 40); // 10% to 50%

        if (diff < minDiff) {
            minDiff = diff;
            bestBlob = blob;
            bestW = testW;
            bestH = testH;
        }

        // Early exit if we hit within 2%
        if (diff / targetBytes < 0.02) {
            updateProgress(100);
            return bestBlob;
        }

        if (blob.size < targetBytes) lowScale = midScale;
        else highScale = midScale;
    }

    // Phase 2: Quality Search (JPEG/WebP only)
    if (format !== "png") {
        let lowQ = 0.01;
        let highQ = 1.0;

        for (let i = 0; i < 6; i++) {
            const midQ = (lowQ + highQ) / 2;
            const blob = await compressToBlob(img, bestW, bestH, midQ, format);
            const diff = Math.abs(blob.size - targetBytes);

            updateProgress(50 + ((i + 1) / 6) * 45); // 50% to 95%

            if (diff < minDiff) {
                minDiff = diff;
                bestBlob = blob;
            }

            // Early exit
            if (diff / targetBytes < 0.02) break;

            if (blob.size > targetBytes) highQ = midQ;
            else lowQ = midQ;
        }
    }

    updateProgress(100);
    return bestBlob;
}

export function getFileSize(bytes: number): { kb: number; mb: number } {
    return { kb: bytes / 1024, mb: bytes / (1024 * 1024) };
}
