/* ---------- Canvas helpers (client-side resize) ---------- */

export function loadImageEl(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = src;
    });
}

export async function renderSizeBlob(
    src: string,
    width: number,
    height: number,
    format: "image/jpeg" | "image/png" = "image/jpeg",
    quality = 0.92,
): Promise<Blob> {
    const img = await loadImageEl(src);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");

    // Cover-crop so the aspect ratio is never stretched
    const srcRatio = img.width / img.height;
    const targetRatio = width / height;
    let sw = img.width;
    let sh = img.height;
    let sx = 0;
    let sy = 0;

    if (srcRatio > targetRatio) {
        sw = img.height * targetRatio;
        sx = (img.width - sw) / 2;
    } else {
        sh = img.width / targetRatio;
        sy = (img.height - sh) / 2;
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, width, height);

    return new Promise<Blob>((resolve, reject) =>
        canvas.toBlob(
            (b) => (b ? resolve(b) : reject(new Error("Export failed"))),
            format,
            quality,
        ),
    );
}

export const heightOf = (width: number) => Math.round((width * 9) / 16);

export const SIZE_FRAMES = [
    { label: "Home Feed", width: 360 },
    { label: "Mobile Home", width: 320 },
    { label: "Channel Page", width: 270 },
    { label: "Search Result", width: 246 },
    { label: "Sidebar Suggested", width: 168 },
    { label: "TV / Watch Later", width: 540 },
] as const;

/* ---------- YouTube Theme Configuration ---------- */

export interface YTTheme {
    bg: string;
    surface: string;
    surfaceHover: string;
    textPrimary: string;
    textSecondary: string;
    border: string;
    inputBg: string;
    inputText: string;
    inputPlaceholder: string;
    avatar: string;
    buttonBg: string;
    buttonText: string;
}

export const YT_THEMES: Record<"dark" | "light", YTTheme> = {
    dark: {
        bg: "bg-zinc-950",
        surface: "bg-zinc-900",
        surfaceHover: "hover:bg-zinc-800",
        textPrimary: "text-white",
        textSecondary: "text-zinc-400",
        border: "border-zinc-800",
        inputBg: "bg-zinc-900",
        inputText: "text-zinc-100",
        inputPlaceholder: "text-zinc-500",
        avatar: "bg-zinc-800",
        buttonBg: "bg-zinc-800",
        buttonText: "text-zinc-300",
    },
    light: {
        bg: "bg-zinc-50",
        surface: "bg-white",
        surfaceHover: "hover:bg-zinc-100",
        textPrimary: "text-zinc-900",
        textSecondary: "text-zinc-600",
        border: "border-zinc-300",
        inputBg: "bg-white",
        inputText: "text-zinc-900",
        inputPlaceholder: "text-zinc-500",
        avatar: "bg-zinc-300",
        buttonBg: "bg-zinc-100",
        buttonText: "text-zinc-700",
    },
};
