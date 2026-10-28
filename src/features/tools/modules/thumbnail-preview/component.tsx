"use client";

import { saveAs } from "file-saver";
import { Play, Search } from "lucide-react";
import { useState } from "react";

import { ToolFullScreen } from "@/features/tools/shared/components/layouts/tool-fullscreen";
import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";
import { SizesView, VerticalCard, type ThumbVariant } from "./preview";
import { ThumbnailSettings } from "./settings";

import type { BaseTool } from "@/features/tools/shared/types";
import { cn } from "@/lib/utils";
import { createAndDownloadZip, type ZipFile } from "@/lib/zip";
import { heightOf, renderSizeBlob, SIZE_FRAMES, YT_THEMES } from "./lib";

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
        setIsFullScreen(true);
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
            <ToolHeader title={tool.name} description={tool.description}>
                <FileUpload
                    accept="image/*"
                    maxSizeMB={10}
                    multiple={true}
                    onFilesSelected={addFiles}
                    allowedFormats={["jpg", "jpeg", "png", "webp"]}
                />
            </ToolHeader>
        );
    }

    return (
        <ToolFullScreen
            title={tool.name}
            isFullScreen={isFullScreen}
            onToggleFullScreen={() => setIsFullScreen(!isFullScreen)}
            sidebar={
                <ThumbnailSettings
                    thumbs={thumbs}
                    selectedId={selectedId}
                    videoTitle={videoTitle}
                    channelName={channelName}
                    view={view}
                    device={device}
                    ytTheme={ytTheme}
                    zipping={zipping}
                    onSelectThumb={setSelectedId}
                    onRemoveThumb={removeThumb}
                    onRenameThumb={renameThumb}
                    onAddFiles={addFiles}
                    onVideoTitleChange={setVideoTitle}
                    onChannelNameChange={setChannelName}
                    onViewChange={setView}
                    onDeviceChange={setDevice}
                    onYtThemeChange={setYtTheme}
                    onDownloadAllSizes={downloadAllSizes}
                    onResetAll={resetAll}
                />
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
        </ToolFullScreen>
    );
}
