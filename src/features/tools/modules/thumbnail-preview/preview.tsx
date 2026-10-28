"use client";

import { Download, ImageIcon } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { heightOf, SIZE_FRAMES, type YTTheme } from "./lib";

export interface ThumbVariant {
    id: string;
    src: string;
    name: string;
}

export function VerticalCard({
    src,
    title,
    channel,
    theme,
}: {
    src: string;
    title: string;
    channel: string;
    theme: YTTheme;
}) {
    return (
        <div className="space-y-3">
            <div
                className={cn(
                    "relative aspect-video rounded-xl overflow-hidden group cursor-pointer",
                    theme.surface,
                )}
            >
                <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 text-white text-[11px] font-medium">
                    12:34
                </span>
            </div>
            <div className="flex gap-3">
                <div
                    className={cn(
                        "w-9 h-9 rounded-full shrink-0 flex items-center justify-center",
                        theme.avatar,
                    )}
                >
                    <ImageIcon className={cn("w-4 h-4", theme.textSecondary)} />
                </div>
                <div className="min-w-0 flex-1">
                    <p
                        className={cn(
                            "text-sm font-medium line-clamp-2 leading-snug",
                            theme.textPrimary,
                        )}
                    >
                        {title}
                    </p>
                    <p className={cn("text-xs mt-1 line-clamp-1", theme.textSecondary)}>
                        {channel}
                    </p>
                    <p className={cn("text-xs", theme.textSecondary)}>123K views • 1 hour ago</p>
                </div>
            </div>
        </div>
    );
}

export function SizesView({
    thumb,
    onDownloadSize,
    theme,
}: {
    thumb: ThumbVariant | null;
    onDownloadSize: (width: number, height: number) => void;
    theme: YTTheme;
}) {
    if (!thumb) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {SIZE_FRAMES.map((f) => {
                const h = heightOf(f.width);
                return (
                    <div key={f.label} className="space-y-3 w-full" style={{ maxWidth: f.width }}>
                        <div className="flex items-center justify-between">
                            <p className={cn("text-xs font-medium", theme.textSecondary)}>
                                {f.label}
                            </p>
                            <button
                                onClick={() => onDownloadSize(f.width, h)}
                                className={cn(
                                    "flex items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-medium transition-colors",
                                    theme.border,
                                    theme.buttonText,
                                    theme.surfaceHover,
                                )}
                            >
                                <Download className="w-2.5 h-2.5" />
                                {f.width}×{h}
                            </button>
                        </div>
                        <div
                            className={cn(
                                "relative aspect-video rounded-lg overflow-hidden shadow-sm group cursor-pointer",
                                theme.surface,
                            )}
                        >
                            <Image
                                src={thumb.src}
                                alt=""
                                fill
                                sizes={`${f.width}px`}
                                unoptimized
                                className="object-cover"
                            />
                            <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/80 text-white text-[10px]">
                                12:34
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
