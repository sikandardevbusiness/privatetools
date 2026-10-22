"use client";

import { Download, Trash2 } from "lucide-react";
import { memo, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { cn, formatFileSize } from "@/lib/utils";

interface ImageCardProps {
    file: File;
    index: number;
    className?: string;
    isSelected?: boolean;
    onRemove?: () => void;
    onDownload: () => void;
    disabledRemove?: boolean;
    disabledCheckbox?: boolean;
    onToggleSelect?: () => void;
}

export const ImageCard = memo(function ImageCard({
    file,
    index,
    className,
    onDownload,
    isSelected = false,
    disabledRemove = false,
    disabledCheckbox = false,
    onRemove = () => {},
    onToggleSelect = () => {},
}: ImageCardProps) {
    const [url, setUrl] = useState("");

    useEffect(() => {
        const u = URL.createObjectURL(file);
        setUrl(u);
        return () => URL.revokeObjectURL(u);
    }, [file]);

    return (
        <div
            className={cn(
                "relative flex flex-col rounded-xl border border-border bg-card overflow-hidden",
                "hover:border-primary/50 transition-colors group",
                className,
            )}
        >
            {/* Top Left: Remove Button */}
            {!disabledRemove && (
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-2 right-2 z-10 h-7 w-7 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                    title="Remove panel"
                >
                    <Trash2 className="h-3.5 w-3.5" />
                </Button>
            )}

            {/* Top Right: Checkbox */}
            {!disabledCheckbox && (
                <div
                    className="absolute top-2 left-2 z-10 bg-background/80 backdrop-blur-sm rounded-md p-1"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => onToggleSelect()}
                        aria-label={`Select panel ${index + 1}`}
                        className="h-4 w-4 border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                </div>
            )}

            {/* Fixed-height preview: image always fully visible, letterboxed on theme background */}
            <div className="relative h-80 w-full shrink-0 bg-background flex items-center justify-center overflow-hidden">
                {url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={url}
                        alt={file.name}
                        className="max-h-full max-w-full object-contain select-none"
                        draggable={false}
                    />
                ) : null}
            </div>

            <div className="flex items-center justify-between gap-2 p-3 border-t border-border">
                <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-foreground">{file.name}</p>
                    <p className="text-[10px] text-muted-foreground">
                        #{String(index + 1).padStart(3, "0")} · {formatFileSize(file.size)}
                    </p>
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0"
                    onClick={onDownload}
                >
                    <Download className="h-3.5 w-3.5" />
                </Button>
            </div>
        </div>
    );
});
