"use client";

import { saveAs } from "file-saver";
import {
    Archive,
    Download,
    ImageIcon,
    LayoutGrid,
    Monitor,
    Moon,
    Play,
    Plus,
    RotateCcw,
    Ruler,
    Search,
    Smartphone,
    Sun,
    X,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToolShell } from "@/features/tools//shared/components/layouts/tool-shell";
import { ToolFullScreen } from "@/features/tools/shared/components/layouts/tool-fullscreen";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";

import type { BaseTool } from "@/features/tools/shared/types";
import { cn } from "@/lib/utils";
import { createAndDownloadZip, type ZipFile } from "@/lib/zip";
import { heightOf, renderSizeBlob, SIZE_FRAMES, YT_THEMES, type YTTheme } from "./lib";

interface ThumbVariant {
    id: string;
    src: string;
    name: string;
}

export default function ThumbnailPreviewClient({ tool }: { tool: BaseTool }) {
    const [thumbs, setThumbs] = useState<ThumbVariant[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [videoTitle, setVideoTitle] = useState("Your amazing video title appears right here");
    const [channelName, setChannelName] = useState("Your Channel Name");
    const [view, setView] = useState<"feed" | "sizes">("feed");
    const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
    const [ytTheme, setYtTheme] = useState<"dark" | "light">("dark");
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [zipping, setZipping] = useState(false);

    const addInputRef = useRef<HTMLInputElement>(null);

    const selected = thumbs.find((t) => t.id === selectedId) ?? thumbs[0] ?? null;
    const baseName = selected?.name?.trim().replace(/\s+/g, "-") || "thumbnail";
    const theme = YT_THEMES[ytTheme];

    const addFiles = async (files: File[]) => {
        const variants = await Promise.all(
            files.map(
                (file) =>
                    new Promise<ThumbVariant>((resolve) => {
                        const reader = new FileReader();
                        reader.onload = (e) =>
                            resolve({
                                id: crypto.randomUUID(),
                                src: e.target?.result as string,
                                name: file.name.replace(/\.[^/.]+$/, ""),
                            });
                        reader.readAsDataURL(file);
                    }),
            ),
        );
        setThumbs((prev) => [...prev, ...variants]);
        setSelectedId((cur) => cur ?? variants[0]?.id ?? null);
        setIsFullScreen(true); // ✅ Auto-enter fullscreen on upload
    };

    const removeThumb = (id: string) => {
        const next = thumbs.filter((t) => t.id !== id);
        setThumbs(next);
        if (selectedId === id) setSelectedId(next[0]?.id ?? null);
    };

    const renameThumb = (id: string, name: string) =>
        setThumbs((prev) => prev.map((t) => (t.id === id ? { ...t, name } : t)));

    const resetAll = () => {
        setThumbs([]);
        setSelectedId(null);
        setVideoTitle("Your amazing video title appears right here");
        setChannelName("Your Channel Name");
        setIsFullScreen(false);
    };

    const downloadSize = async (width: number, height: number) => {
        if (!selected) return;
        const blob = await renderSizeBlob(selected.src, width, height);
        saveAs(blob, `${baseName}-${width}x${height}.jpg`);
    };

    const downloadAllSizes = async () => {
        if (!selected) return;
        setZipping(true);
        try {
            const zipFiles: ZipFile[] = await Promise.all(
                SIZE_FRAMES.map(async (f) => {
                    const h = heightOf(f.width);
                    const blob = await renderSizeBlob(selected.src, f.width, h);
                    return { name: `${baseName}-${f.width}x${h}.jpg`, content: blob };
                }),
            );
            await createAndDownloadZip(zipFiles, `${baseName}-all-sizes.zip`);
        } finally {
            setZipping(false);
        }
    };

    // Upload Screen
    if (thumbs.length === 0) {
        return (
            <ToolShell>
                <FileUpload
                    accept="image/*"
                    maxSizeMB={10}
                    multiple={true}
                    onFilesSelected={addFiles}
                    allowedFormats={["jpg", "jpeg", "png", "webp"]}
                />
            </ToolShell>
        );
    }

    // Fullscreen Editor Screen
    return (
        <ToolFullScreen
            title={tool.name}
            isFullScreen={isFullScreen}
            onToggleFullScreen={() => setIsFullScreen(!isFullScreen)}
            sidebar={
                <div className="space-y-6">
                    {/* Thumbnails Gallery */}
                    <div className="bg-card border border-border rounded-xl p-4">
                        <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">
                            Thumbnails ({thumbs.length})
                        </Label>
                        <div className="grid grid-cols-3 gap-2 mb-3">
                            {thumbs.map((t) => (
                                <div key={t.id} className="relative group">
                                    <button
                                        onClick={() => setSelectedId(t.id)}
                                        className={cn(
                                            "relative w-full aspect-video rounded-lg overflow-hidden border-2 transition-all",
                                            selected?.id === t.id
                                                ? "border-primary ring-2 ring-primary/20"
                                                : "border-border hover:border-muted-foreground",
                                        )}
                                    >
                                        <Image
                                            src={t.src}
                                            alt={t.name}
                                            fill
                                            sizes="96px"
                                            unoptimized
                                            className="object-cover"
                                        />
                                    </button>
                                    <button
                                        onClick={() => removeThumb(t.id)}
                                        className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-destructive text-destructive-foreground items-center justify-center hidden group-hover:flex transition-colors shadow-sm"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => addInputRef.current?.click()}
                                className="aspect-video rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                                title="Add thumbnail"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                        {selected && (
                            <Input
                                value={selected.name}
                                onChange={(e) => renameThumb(selected.id, e.target.value)}
                                placeholder="Name it..."
                                className="text-xs h-8"
                            />
                        )}
                    </div>

                    {/* Metadata */}
                    <div className="bg-card border border-border rounded-xl p-4 space-y-4">
                        <div className="space-y-2">
                            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                                Video Title
                            </Label>
                            <Input
                                value={videoTitle}
                                onChange={(e) => setVideoTitle(e.target.value)}
                                className="h-9"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                                Channel Name
                            </Label>
                            <Input
                                value={channelName}
                                onChange={(e) => setChannelName(e.target.value)}
                                className="h-9"
                            />
                        </div>
                    </div>

                    {/* View Settings */}
                    <div className="bg-card border border-border rounded-xl p-4 space-y-4">
                        <div className="space-y-2">
                            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                                Preview Mode
                            </Label>
                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    variant={view === "feed" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setView("feed")}
                                    className="gap-2"
                                >
                                    <LayoutGrid className="w-4 h-4" /> Feed
                                </Button>
                                <Button
                                    variant={view === "sizes" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setView("sizes")}
                                    className="gap-2"
                                >
                                    <Ruler className="w-4 h-4" /> Sizes
                                </Button>
                            </div>
                        </div>

                        {view === "feed" && (
                            <div className="space-y-2">
                                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                                    Device
                                </Label>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        variant={device === "desktop" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setDevice("desktop")}
                                        className="gap-2"
                                    >
                                        <Monitor className="w-4 h-4" /> Desktop
                                    </Button>
                                    <Button
                                        variant={device === "mobile" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setDevice("mobile")}
                                        className="gap-2"
                                    >
                                        <Smartphone className="w-4 h-4" /> Mobile
                                    </Button>
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                                Theme
                            </Label>
                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    variant={ytTheme === "dark" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setYtTheme("dark")}
                                    className="gap-2"
                                >
                                    <Moon className="w-4 h-4" /> Dark
                                </Button>
                                <Button
                                    variant={ytTheme === "light" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setYtTheme("light")}
                                    className="gap-2"
                                >
                                    <Sun className="w-4 h-4" /> Light
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                        <Button
                            onClick={downloadAllSizes}
                            disabled={!selected || zipping}
                            className="w-full gap-2"
                            size="lg"
                        >
                            <Archive className="w-4 h-4" />
                            {zipping ? "Preparing ZIP..." : "Download All Sizes"}
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full text-muted-foreground gap-2"
                            onClick={resetAll}
                        >
                            <RotateCcw className="w-4 h-4" /> Reset All
                        </Button>
                    </div>
                </div>
            }
        >
            {/* Main Preview Area */}
            <div className={cn("w-full h-full flex flex-col", theme.bg)}>
                <div
                    className={cn(
                        "flex-1 overflow-y-auto p-4 md:p-8 transition-colors duration-300",
                        theme.bg,
                    )}
                >
                    <div className="max-w-5xl mx-auto space-y-8">
                        {/* Fake YouTube Header */}
                        <div
                            className={cn(
                                "flex items-center gap-3 md:gap-6 pb-4 border-b",
                                theme.border,
                            )}
                        >
                            <div className="flex items-center gap-1.5 shrink-0">
                                <span className="w-8 h-6 rounded-md bg-red-600 flex items-center justify-center">
                                    <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
                                </span>
                                <span
                                    className={cn(
                                        "font-semibold tracking-tighter text-lg hidden sm:block",
                                        theme.textPrimary,
                                    )}
                                >
                                    YouTube
                                </span>
                            </div>
                            <div className="flex-1 max-w-lg mx-auto flex items-center">
                                <div
                                    className={cn(
                                        "flex-1 h-9 rounded-l-full border flex items-center px-4",
                                        theme.inputBg,
                                        theme.border,
                                    )}
                                >
                                    <span
                                        className={cn("text-sm truncate", theme.inputPlaceholder)}
                                    >
                                        Search
                                    </span>
                                </div>
                                <div
                                    className={cn(
                                        "h-9 w-12 rounded-r-full border border-l-0 flex items-center justify-center",
                                        theme.buttonBg,
                                    )}
                                >
                                    <Search className={cn("w-4 h-4", theme.textSecondary)} />
                                </div>
                            </div>
                            <div
                                className={cn(
                                    "w-8 h-8 rounded-full shrink-0 hidden sm:block",
                                    theme.avatar,
                                )}
                            />
                        </div>

                        {/* Content View */}
                        {view === "feed" ? (
                            <div
                                className={cn(
                                    "grid gap-x-6 gap-y-8",
                                    device === "desktop"
                                        ? "sm:grid-cols-2 lg:grid-cols-3"
                                        : "grid-cols-1 max-w-sm mx-auto",
                                )}
                            >
                                {thumbs.map((t) => (
                                    <VerticalCard
                                        key={t.id}
                                        src={t.src}
                                        title={videoTitle}
                                        channel={channelName}
                                        theme={theme}
                                    />
                                ))}
                            </div>
                        ) : (
                            <SizesView
                                thumb={selected}
                                onDownloadSize={downloadSize}
                                theme={theme}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Hidden file input for adding more thumbnails */}
            <input
                type="file"
                ref={addInputRef}
                className="hidden"
                accept="image/*"
                multiple
                onChange={(e) => e.target.files && addFiles(Array.from(e.target.files))}
            />
        </ToolFullScreen>
    );
}

/* ---------- YouTube-scoped sub-components ---------- */

function VerticalCard({
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

function SizesView({
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
