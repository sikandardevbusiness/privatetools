"use client";

import { Image as ImageIcon, Type, Wand2 } from "lucide-react";
import React, { memo, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PropSlider } from "@/components/ui/prop-slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
    type WatermarkImageConfig,
    type WatermarkTextConfig,
} from "../../../../../../packages/packages/video-watermark/src/index";

export type LocalWatermarkImageConfig = WatermarkImageConfig & { previewUrl?: string | null };

export interface WatermarkSettingsProps {
    watermarkType: "text" | "image";
    setWatermarkType: (type: "text" | "image") => void;
    textConfig: WatermarkTextConfig;
    imageConfig: LocalWatermarkImageConfig;
    onTextChange: (cfg: Partial<WatermarkTextConfig>) => void;
    onImageChange: (cfg: Partial<LocalWatermarkImageConfig>) => void;
    videoDimensions: { width: number; height: number } | null;
}

export const WatermarkSettings = memo(function WatermarkSettings({
    watermarkType,
    setWatermarkType,
    textConfig,
    imageConfig,
    onTextChange,
    onImageChange,
    videoDimensions,
}: WatermarkSettingsProps) {
    const imgInputRef = useRef<HTMLInputElement>(null);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const previewUrl = URL.createObjectURL(file);

        const img = new Image();
        img.onload = () => {
            if (videoDimensions) {
                const targetWidth = videoDimensions.width * 0.3;
                const targetHeight = videoDimensions.height * 0.3;
                const scaleX = targetWidth / img.width;
                const scaleY = targetHeight / img.height;
                const optimalScale = Math.min(scaleX, scaleY);
                onImageChange({ file, previewUrl, scale: optimalScale });
            } else {
                onImageChange({ file, previewUrl });
            }
        };
        img.src = previewUrl;
    };

    const setQuickPosition = (x: number, y: number, isImage: boolean = false) => {
        if (isImage) {
            onImageChange({ x, y });
        } else {
            onTextChange({ x, y });
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                <Wand2 className="w-4 h-4 text-primary" /> Watermark Settings
            </div>

            <Tabs
                value={watermarkType}
                onValueChange={(v) => setWatermarkType(v as "text" | "image")}
            >
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="text">
                        <span className="flex items-center gap-2">
                            <Type className="w-4 h-4" /> Text
                        </span>
                    </TabsTrigger>
                    <TabsTrigger value="image">
                        <span className="flex items-center gap-2">
                            <ImageIcon className="w-4 h-4" /> Image
                        </span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="text" className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Text Content</Label>
                        <Input
                            value={textConfig.text}
                            onChange={(e) => onTextChange({ text: e.target.value })}
                            placeholder="Enter watermark text..."
                            className="h-9"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Color</Label>
                        <Input
                            type="color"
                            value={textConfig.color}
                            onChange={(e) => onTextChange({ color: e.target.value })}
                            className="h-9 cursor-pointer p-1 w-full"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Quick Position</Label>
                        <div className="grid grid-cols-3 gap-1.5">
                            {[
                                { label: "TL", x: 5, y: 5 },
                                { label: "TC", x: 50, y: 5 },
                                { label: "TR", x: 95, y: 5 },
                                { label: "CL", x: 5, y: 50 },
                                { label: "C", x: 50, y: 50 },
                                { label: "CR", x: 95, y: 50 },
                                { label: "BL", x: 5, y: 95 },
                                { label: "BC", x: 50, y: 95 },
                                { label: "BR", x: 95, y: 95 },
                            ].map((pos) => (
                                <Button
                                    key={pos.label}
                                    variant="outline"
                                    size="sm"
                                    className="text-[10px] h-7"
                                    onClick={() => setQuickPosition(pos.x, pos.y, false)}
                                >
                                    {pos.label}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <PropSlider
                        label="Position X"
                        value={textConfig.x}
                        onChange={(v) => onTextChange({ x: v })}
                        min={-100}
                        max={200}
                        step={1}
                        unit="%"
                    />
                    <PropSlider
                        label="Position Y"
                        value={textConfig.y}
                        onChange={(v) => onTextChange({ y: v })}
                        min={-100}
                        max={200}
                        step={1}
                        unit="%"
                    />
                    <PropSlider
                        label="Font Size"
                        value={textConfig.fontSize}
                        onChange={(v) => onTextChange({ fontSize: v })}
                        min={12}
                        max={200}
                        step={1}
                        unit="px"
                    />
                    <PropSlider
                        label="Opacity"
                        value={textConfig.opacity}
                        onChange={(v) => onTextChange({ opacity: v })}
                        min={0}
                        max={1}
                        step={0.05}
                    />
                </TabsContent>

                <TabsContent value="image" className="space-y-4 mt-4">
                    <input
                        ref={imgInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageSelect}
                    />
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => imgInputRef.current?.click()}
                        className="w-full h-9"
                    >
                        {imageConfig.file ? "Change Logo Image" : "Upload Logo Image"}
                    </Button>

                    {imageConfig.file ? (
                        <>
                            <p className="text-[10px] text-muted-foreground text-center truncate">
                                Selected: {imageConfig.file.name}
                            </p>

                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground">
                                    Quick Position
                                </Label>
                                <div className="grid grid-cols-3 gap-1.5">
                                    {[
                                        { label: "TL", x: 5, y: 5 },
                                        { label: "TC", x: 50, y: 5 },
                                        { label: "TR", x: 95, y: 5 },
                                        { label: "CL", x: 5, y: 50 },
                                        { label: "C", x: 50, y: 50 },
                                        { label: "CR", x: 95, y: 50 },
                                        { label: "BL", x: 5, y: 95 },
                                        { label: "BC", x: 50, y: 95 },
                                        { label: "BR", x: 95, y: 95 },
                                    ].map((pos) => (
                                        <Button
                                            key={pos.label}
                                            variant="outline"
                                            size="sm"
                                            className="text-[10px] h-7"
                                            onClick={() => setQuickPosition(pos.x, pos.y, true)}
                                        >
                                            {pos.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <PropSlider
                                label="Position X"
                                value={imageConfig.x}
                                onChange={(v) => onImageChange({ x: v })}
                                min={-100}
                                max={200}
                                step={1}
                                unit="%"
                            />
                            <PropSlider
                                label="Position Y"
                                value={imageConfig.y}
                                onChange={(v) => onImageChange({ y: v })}
                                min={-100}
                                max={200}
                                step={1}
                                unit="%"
                            />
                            <PropSlider
                                label="Scale"
                                value={imageConfig.scale}
                                onChange={(v) => onImageChange({ scale: v })}
                                min={0.1}
                                max={5}
                                step={0.05}
                            />
                            <PropSlider
                                label="Opacity"
                                value={imageConfig.opacity}
                                onChange={(v) => onImageChange({ opacity: v })}
                                min={0}
                                max={1}
                                step={0.05}
                            />
                        </>
                    ) : (
                        <div className="text-center py-6 text-muted-foreground border border-dashed border-border rounded-lg">
                            <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p className="text-xs">Upload an image to configure</p>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
});
