export interface ResizeOptions {
    width?: number;
    height?: number;
    quality?: number;
    maintainAspectRatio?: boolean;
    format?: "png" | "jpeg" | "webp";
}

export async function resizeImage(file: File, options: ResizeOptions): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);

        img.onload = () => {
            try {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                if (!ctx) {
                    reject(new Error("Could not get canvas context"));
                    return;
                }

                let width = options.width || img.width;
                let height = options.height || img.height;

                if (options.maintainAspectRatio) {
                    const aspectRatio = img.width / img.height;
                    if (options.width && !options.height) {
                        height = Math.round(width / aspectRatio);
                    } else if (options.height && !options.width) {
                        width = Math.round(height * aspectRatio);
                    }
                }

                canvas.width = width;
                canvas.height = height;

                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = "high";
                ctx.drawImage(img, 0, 0, width, height);

                const format = options.format || "png";
                const quality = options.quality || 0.9;

                canvas.toBlob(
                    (blob) => {
                        if (!blob) {
                            reject(new Error("Failed to create blob"));
                            return;
                        }
                        resolve(blob);
                        URL.revokeObjectURL(url);
                    },
                    `image/${format}`,
                    quality,
                );
            } catch (error) {
                URL.revokeObjectURL(url);
                reject(error);
            }
        };

        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error("Failed to load image"));
        };

        img.src = url;
    });
}

export async function resizeImageToSizes(
    file: File,
    sizes: { width: number; height: number }[],
    options?: Omit<ResizeOptions, "width" | "height">,
): Promise<Blob[]> {
    const results = await Promise.all(
        sizes.map((size) =>
            resizeImage(file, {
                ...options,
                width: size.width,
                height: size.height,
            }),
        ),
    );
    return results;
}
