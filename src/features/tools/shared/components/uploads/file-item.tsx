"use client";

import { Download, FileAudio, RotateCw, X } from "lucide-react";
import Image from "next/image";
import { memo, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import type { ProcessedFile } from "@/features/tools/shared/types";
import { isAudioFile } from "@/features/tools/shared/utils";
import { getFileConfig } from "@/lib/files";
import { cn, formatFileSize } from "@/lib/utils";

const getOutputBlobSize = (item: ProcessedFile): number | undefined => {
    if (item.outputBlob instanceof Blob) return item.outputBlob.size;
    return undefined;
};

export const FileItem = memo(function FileItem({
    item,
    children,
    isSelected,
    onRemove,
    onSelect,
    onDownload,
    onFormatChange,
    onProcessSingle,
    supportedFormats,
}: {
    item: ProcessedFile;
    isSelected?: boolean;
    children?: React.ReactNode;
    supportedFormats?: string[];
    onSelect?: (id: string) => void;
    onRemove: (id: string) => void;
    onDownload?: (id: string) => void;
    onProcessSingle?: (id: string) => void;
    onFormatChange?: (id: string, format: string) => void;
}) {
    const currentFormat = item.targetFormat || supportedFormats?.[0] || "";
    const isDisabled = item.status === "processing" || item.status === "completed";
    const { icon: Icon, color } = getFileConfig(item.file.name);
    const isImage = item.file.type.startsWith("image/");
    const isAudio = isAudioFile(item.file);

    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [processedUrl, setProcessedUrl] = useState<string | null>(null);
    const [originalUrl, setOriginalUrl] = useState<string>("");
    const [playing, setPlaying] = useState(false);
    const [hovered, setHovered] = useState(false);

    // Create URL for original file (fixes "cannot play uploaded file" error)
    useEffect(() => {
        if (isImage) {
            const url = URL.createObjectURL(item.file);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        }
        if (isAudio) {
            const url = URL.createObjectURL(item.file);
            setOriginalUrl(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [isImage, isAudio, item.file]);

    // Create URL for processed file
    useEffect(() => {
        if (isAudio && item.outputBlob) {
            let url: string;
            if (typeof item.outputBlob === "string") {
                url = item.outputBlob;
            } else {
                url = URL.createObjectURL(item.outputBlob);
            }
            setProcessedUrl(url);
            return () => {
                if (typeof item.outputBlob !== "string") {
                    URL.revokeObjectURL(url);
                }
            };
        }
    }, [isAudio, item.outputBlob]);

    const pauseOthers = () => {
        document.querySelectorAll("audio").forEach((a) => {
            if (a.dataset.trackId !== item.id) a.pause();
        });
    };

    const outputSize = getOutputBlobSize(item);
    const originalSize = item.file.size;

    // Show player ONLY on hover or when actively playing
    const showPlayer = isAudio && (hovered || playing);

    const handleFormatChange = (value: string | null) => {
        if (value) {
            onFormatChange?.(item.id, value);
        }
    };

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onSelect ? () => onSelect(item.id) : undefined}
            className={cn(
                "flex flex-col gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-200 group",
                onSelect && "cursor-pointer",
                isSelected && "border-primary ring-2 ring-primary/20 hover:border-primary",
            )}
        >
            <div className="flex items-start gap-3">
                {/* 1. Preview/Icon/Player - FIXED: Proper width handling */}
                <div
                    className={cn(
                        "shrink-0 relative transition-all duration-300",
                        showPlayer ? "w-full sm:w-84 h-10" : "w-10 h-10",
                    )}
                >
                    {/* Default View: Icon (hides when player shows) */}
                    <div
                        className={cn(
                            "absolute inset-0 transition-all duration-300 ease-in-out",
                            showPlayer
                                ? "opacity-0 scale-95 pointer-events-none"
                                : "opacity-100 scale-100",
                        )}
                    >
                        {isImage && previewUrl ? (
                            <div className="relative w-10 h-10 rounded-md border border-border bg-muted overflow-hidden">
                                <Image
                                    src={previewUrl}
                                    alt=""
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                        ) : isAudio ? (
                            <div className="p-2 rounded-md bg-muted border border-border flex items-center justify-center">
                                <FileAudio className="w-6 h-6 text-primary" />
                            </div>
                        ) : (
                            <div className="p-2 rounded-md bg-muted border border-border flex items-center justify-center">
                                <Icon className={cn("w-6 h-6", color)} />
                            </div>
                        )}
                    </div>

                    {/* Audio Player (swaps with icon on hover/play) */}
                    {isAudio && (
                        <div
                            className={cn(
                                "absolute inset-0 flex items-center transition-all duration-300 ease-in-out",
                                showPlayer
                                    ? "opacity-100 scale-100"
                                    : "opacity-0 scale-95 pointer-events-none",
                            )}
                        >
                            <audio
                                controls
                                preload="metadata"
                                data-track-id={item.id}
                                onPlay={() => {
                                    setPlaying(true);
                                    pauseOthers();
                                }}
                                onPause={() => setPlaying(false)}
                                onEnded={() => setPlaying(false)}
                                src={processedUrl || originalUrl || undefined}
                                className="w-full h-10"
                            />
                        </div>
                    )}
                </div>

                {/* 2. File Info (Name, Size, Progress, Error) - EXACTLY LIKE OLD CODE */}
                <div className="flex-1 min-w-0">
                    {/* Name and Size (hides smoothly when audio player shows) */}
                    <div
                        className={cn(
                            "transition-all duration-300 ease-in-out",
                            isAudio && showPlayer
                                ? "opacity-0 h-0 overflow-hidden"
                                : "opacity-100 h-auto",
                        )}
                    >
                        <p className="text-sm font-semibold text-foreground truncate">
                            {item.file.name}
                        </p>

                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <span>{formatFileSize(originalSize)}</span>

                            {/* 👈 Auto-show size when completed (works for ALL tools including audio) */}
                            {item.status === "completed" && outputSize && (
                                <>
                                    <span>→</span>
                                    <span className="text-green-600 font-medium">
                                        {formatFileSize(outputSize)}
                                    </span>
                                    {currentFormat && (
                                        <span className="text-xs text-muted-foreground uppercase">
                                            ({currentFormat})
                                        </span>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Progress Bar (exactly where it was in old code) */}
                    {item.status === "processing" && (
                        <div className="mt-2 w-full">
                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all duration-300 ease-out"
                                    style={{ width: `${item.progress || 50}%` }}
                                />
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Processing...</p>
                        </div>
                    )}

                    {/* Error */}
                    {item.status === "error" && (
                        <p className="text-xs text-destructive mt-1">
                            {item.error || "Processing failed"}
                        </p>
                    )}
                </div>

                {/* 3. Actions */}
                <div className="flex items-center gap-2">
                    {supportedFormats && supportedFormats.length > 0 && (
                        <Select
                            value={currentFormat}
                            onValueChange={handleFormatChange}
                            disabled={isDisabled}
                        >
                            <SelectTrigger className="h-9 w-24">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="w-24">
                                {supportedFormats.map((format) => (
                                    <SelectItem key={format} value={format} className="text-xs">
                                        {format}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}

                    {children}

                    {item.status === "completed" && onDownload ? (
                        <Button variant="outline" onClick={() => onDownload(item.id)}>
                            <Download className="w-4 h-4" />
                        </Button>
                    ) : (
                        onProcessSingle && (
                            <Button
                                variant="outline"
                                className="py-10"
                                onClick={() => onProcessSingle(item.id)}
                                disabled={isDisabled}
                            >
                                <RotateCw
                                    className={cn(
                                        "w-4 h-4",
                                        item.status === "processing" && "animate-spin",
                                    )}
                                />
                            </Button>
                        )
                    )}

                    <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => onRemove(item.id)}
                        disabled={item.status === "processing"}
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
});
