"use client";

import {
    Archive,
    LayoutGrid,
    Monitor,
    Moon,
    Plus,
    RotateCcw,
    Ruler,
    Smartphone,
    Sun,
    X,
} from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import type { ThumbVariant } from "./preview";

interface ThumbnailSettingsProps {
    zipping: boolean;
    videoTitle: string;
    channelName: string;
    view: "feed" | "sizes";
    thumbs: ThumbVariant[];
    selectedId: string | null;
    ytTheme: "dark" | "light";
    device: "desktop" | "mobile";
    onResetAll: () => void;
    onDownloadAllSizes: () => void;
    onSelectThumb: (id: string) => void;
    onRemoveThumb: (id: string) => void;
    onAddFiles: (files: File[]) => void;
    onVideoTitleChange: (val: string) => void;
    onChannelNameChange: (val: string) => void;
    onViewChange: (val: "feed" | "sizes") => void;
    onYtThemeChange: (val: "dark" | "light") => void;
    onRenameThumb: (id: string, name: string) => void;
    onDeviceChange: (val: "desktop" | "mobile") => void;
}

export function ThumbnailSettings({
    view,
    thumbs,
    device,
    ytTheme,
    zipping,
    selectedId,
    videoTitle,
    channelName,
    onAddFiles,
    onResetAll,
    onViewChange,
    onSelectThumb,
    onRemoveThumb,
    onRenameThumb,
    onDeviceChange,
    onYtThemeChange,
    onVideoTitleChange,
    onChannelNameChange,
    onDownloadAllSizes,
}: ThumbnailSettingsProps) {
    const addInputRef = useRef<HTMLInputElement>(null);
    const selected = thumbs.find((t) => t.id === selectedId) ?? thumbs[0] ?? null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            onAddFiles(Array.from(e.target.files));
            e.target.value = "";
        }
    };

    return (
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
                                onClick={() => onSelectThumb(t.id)}
                                className={cn(
                                    "relative w-full aspect-video rounded-lg overflow-hidden border-2 transition-all",
                                    selectedId === t.id
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
                                onClick={() => onRemoveThumb(t.id)}
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
                        onChange={(e) => onRenameThumb(selected.id, e.target.value)}
                        placeholder="Name it..."
                        className="text-xs h-8"
                    />
                )}
                <input
                    type="file"
                    ref={addInputRef}
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                />
            </div>

            {/* Metadata */}
            <div className="bg-card border border-border rounded-xl p-4 space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                        Video Title
                    </Label>
                    <Input
                        value={videoTitle}
                        onChange={(e) => onVideoTitleChange(e.target.value)}
                        className="h-9"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                        Channel Name
                    </Label>
                    <Input
                        value={channelName}
                        onChange={(e) => onChannelNameChange(e.target.value)}
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
                            onClick={() => onViewChange("feed")}
                            className="gap-2"
                        >
                            <LayoutGrid className="w-4 h-4" /> Feed
                        </Button>
                        <Button
                            variant={view === "sizes" ? "default" : "outline"}
                            size="sm"
                            onClick={() => onViewChange("sizes")}
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
                                onClick={() => onDeviceChange("desktop")}
                                className="gap-2"
                            >
                                <Monitor className="w-4 h-4" /> Desktop
                            </Button>
                            <Button
                                variant={device === "mobile" ? "default" : "outline"}
                                size="sm"
                                onClick={() => onDeviceChange("mobile")}
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
                            onClick={() => onYtThemeChange("dark")}
                            className="gap-2"
                        >
                            <Moon className="w-4 h-4" /> Dark
                        </Button>
                        <Button
                            variant={ytTheme === "light" ? "default" : "outline"}
                            size="sm"
                            onClick={() => onYtThemeChange("light")}
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
                    onClick={onDownloadAllSizes}
                    disabled={!selected || zipping}
                    className="w-full gap-2"
                    size="lg"
                >
                    <Archive className="w-4 h-4" />
                    {zipping ? "Preparing ZIP..." : "Download All Sizes"}
                </Button>
                <Button variant="outline" size="lg" className="w-full gap-2" onClick={onResetAll}>
                    <RotateCcw className="w-4 h-4" /> Reset All
                </Button>
            </div>
        </div>
    );
}
