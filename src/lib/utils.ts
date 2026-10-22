export { cn } from "cn";

export function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Helper: Convert seconds to HH:MM:SS
export const formatTimeHHMMSS = (totalSeconds: number): string => {
    if (isNaN(totalSeconds) || !isFinite(totalSeconds) || totalSeconds < 0) return "00:00:00";
    const seconds = totalSeconds > 1000 ? totalSeconds / 1000 : totalSeconds;
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

// Helper: Parse HH:MM:SS to seconds
export const parseTimeHHMMSS = (timeStr: string): number => {
    const parts = timeStr.split(":").map(Number);
    if (parts.length === 3 && !parts.some(isNaN)) {
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    return 0;
};
