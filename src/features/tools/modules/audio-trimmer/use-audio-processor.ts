import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { useCallback, useEffect, useRef, useState } from "react";

export interface AudioFile {
    id: string;
    file: File;
    name: string;
    duration: number;
    url: string;
}

export function useAudioProcessor() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [files, setFiles] = useState<AudioFile[]>([]);
    const [activeFileIndex, setActiveFileIndex] = useState(0);

    // ✅ FIX: Lazy initialization to avoid setState in useEffect
    const [isLowRam] = useState(() => {
        if (typeof window !== "undefined") {
            const nav = navigator as Navigator & { deviceMemory?: number };
            return (nav.deviceMemory || 8) < 4;
        }
        return false;
    });

    const [error, setError] = useState<string | null>(null);
    const [fileDurations, setFileDurations] = useState<Record<string, number>>({});

    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);

    const ffmpegRef = useRef<FFmpeg | null>(null);
    const filesRef = useRef<AudioFile[]>([]);

    useEffect(() => {
        filesRef.current = files;
    }, [files]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const loadFFmpeg = async () => {
            try {
                if (!ffmpegRef.current) {
                    ffmpegRef.current = new FFmpeg();
                    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
                    await ffmpegRef.current.load({
                        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
                        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
                    });
                }
                setIsLoaded(true);
            } catch {
                setError("Failed to load audio processing engine.");
            }
        };
        loadFFmpeg();

        return () => {
            filesRef.current.forEach((f) => URL.revokeObjectURL(f.url));
        };
    }, []);

    const activeFile = files[activeFileIndex];

    // ✅ FIX: Robust file selection with safe state updates
    const handleFileSelect = (selectedFiles: File[]) => {
        if (!selectedFiles || selectedFiles.length === 0) return;

        const newFiles: AudioFile[] = selectedFiles.map((file) => ({
            id: crypto.randomUUID(),
            file,
            name: file.name,
            duration: 0,
            url: URL.createObjectURL(file),
        }));

        setFiles((prev) => {
            // Only set active index to 0 if this is the very first file being added
            if (prev.length === 0) {
                setActiveFileIndex(0);
            }
            return [...prev, ...newFiles];
        });
    };

    const setFileDuration = (fileId: string, duration: number) => {
        setFileDurations((prev) => ({ ...prev, [fileId]: duration }));
    };

    const removeFile = (id: string) => {
        setFiles((prev) => {
            const fileToRemove = prev.find((f) => f.id === id);
            if (fileToRemove) URL.revokeObjectURL(fileToRemove.url);
            const newFiles = prev.filter((f) => f.id !== id);
            if (activeFileIndex >= newFiles.length) {
                setActiveFileIndex(Math.max(0, newFiles.length - 1));
            }
            return newFiles;
        });
        setFileDurations((prev) => {
            const newDurations = { ...prev };
            delete newDurations[id];
            return newDurations;
        });
    };

    const handleProcess = useCallback(async () => {
        if (!isLoaded || files.length === 0 || !ffmpegRef.current || !activeFile) return;
        setIsProcessing(true);
        setProgress(0);
        setError(null);

        const ffmpeg = ffmpegRef.current;
        try {
            const inputName = "input" + getExtension(activeFile.name);
            const outputName = "output.mp3";

            await ffmpeg.writeFile(inputName, await fetchFile(activeFile.file));
            const duration = endTime - startTime;

            ffmpeg.on("progress", ({ progress: p }) =>
                setProgress(Math.min(100, Math.round(p * 100))),
            );

            await ffmpeg.exec([
                "-ss",
                `${startTime}`,
                "-i",
                inputName,
                "-t",
                `${duration}`,
                "-y",
                outputName,
            ]);

            const data = await ffmpeg.readFile(outputName);
            const uint8Array =
                data instanceof Uint8Array ? data : new TextEncoder().encode(data as string);
            const arrayBuffer = (uint8Array.buffer as ArrayBuffer).slice(
                uint8Array.byteOffset,
                uint8Array.byteOffset + uint8Array.byteLength,
            );

            triggerDownload(
                new Blob([arrayBuffer], { type: "audio/mp3" }),
                `trimmed_${activeFile.name.replace(/\.[^/.]+$/, "")}.mp3`,
            );
            await ffmpeg.deleteFile(inputName);
            await ffmpeg.deleteFile(outputName);
            setProgress(100);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Processing failed.");
        } finally {
            setIsProcessing(false);
        }
    }, [isLoaded, files, startTime, endTime, activeFile]);

    return {
        isLoaded,
        isProcessing,
        progress,
        files,
        activeFileIndex,
        isLowRam,
        error,
        startTime,
        endTime,
        fileDurations,
        setStartTime,
        setEndTime,
        setFileDuration,
        handleFileSelect,
        removeFile,
        setActiveFileIndex,
        handleProcess,
        activeFile,
    };
}

function getExtension(filename: string): string {
    const parts = filename.split(".");
    return parts.length > 1 ? `.${parts.pop()?.toLowerCase()}` : ".mp3";
}

function triggerDownload(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
