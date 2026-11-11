"use client";

import { Download, Trash2, GripVertical } from "lucide-react";
import { memo, useEffect, useState } from "react";
import Image from "next/image";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn, formatFileSize } from "@/lib/utils";

interface ImageCardProps {
    id?: string;
    file: File;
    index: number;
    className?: string;
    isSelected?: boolean;
    onRemove?: () => void;
    onDownload: () => void;
    disabledRemove?: boolean;
    disabledCheckbox?: boolean;
    disabledDownload?: boolean;
    onToggleSelect?: () => void;
    draggable?: boolean;
}

export const ImageCard = memo(function ImageCard({
    id = "static-id",
    file,
    index,
    className,
    onDownload,
    isSelected = false,
    disabledRemove = false,
    disabledCheckbox = false,
    disabledDownload = false,
    onRemove = () => {},
    onToggleSelect = () => {},
    draggable = false,
}: ImageCardProps) {
    const [url, setUrl] = useState("");

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id,
        disabled: !draggable,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    useEffect(() => {
        const u = URL.createObjectURL(file);
        setUrl(u);
        return () => URL.revokeObjectURL(u);
    }, [file]);

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "relative flex flex-col rounded-xl border border-border bg-card overflow-hidden",
                "hover:border-primary/50 transition-colors group",
                draggable && "cursor-grab active:cursor-grabbing",
                className,
            )}
        >
            {/* Remove Button */}
            {!disabledRemove && (
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-2 right-2 z-30 h-7 w-7 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                    title="Remove panel"
                >
                    <Trash2 className="h-3.5 w-3.5" />
                </Button>
            )}

            {/* Checkbox */}
            {!disabledCheckbox && (
                <div
                    className="absolute top-2 left-2 z-30 bg-background/80 backdrop-blur-sm rounded-md p-1"
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

            <div className="relative h-80 w-full shrink-0 bg-background flex items-center justify-center overflow-hidden">
                {url && (
                    <Image
                        src={url}
                        alt={file.name}
                        fill
                        className="object-contain select-none pointer-events-none"
                        unoptimized
                        draggable={false}
                    />
                )}
            </div>

            <div className="flex items-center justify-between gap-2 p-3 border-t border-border">
                <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-foreground">{file.name}</p>
                    <p className="text-[10px] text-muted-foreground">
                        #{String(index + 1).padStart(3, "0")} · {formatFileSize(file.size)}
                    </p>
                </div>

                {/* Download Button */}
                {!disabledDownload && (
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 shrink-0 z-30"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDownload();
                        }}
                    >
                        <Download className="h-3.5 w-3.5" />
                    </Button>
                )}
            </div>

            {/* Drag Handle - ONLY this area triggers drag */}
            {draggable && (
                <div
                    className="absolute top-2 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing p-1"
                    {...attributes}
                    {...listeners}
                >
                    <GripVertical className="h-5 w-5 text-muted-foreground bg-background/80 rounded-md" />
                </div>
            )}
        </div>
    );
});
