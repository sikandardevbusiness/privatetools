"use client";

import { saveAs } from "file-saver";
import { Image as ImageIcon, Type, Video, Wand2 } from "lucide-react";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PropSlider } from "@/components/ui/prop-slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";

import type { BaseTool } from "@/features/tools/shared/types";
import type { WatermarkImageConfig, WatermarkTextConfig } from "./lib";
import { processVideoWatermark } from "./lib";

const WatermarkSettings = memo(function WatermarkSettings({
    watermarkType,
    setWatermarkType,
    textConfig,
    imageConfig,
    onTextChange,
    onImageChange,
    videoDimensions,
}: {
    watermarkType: "text" | "image";
    setWatermarkType: (type: "text" | "image") => void;
    textConfig: WatermarkTextConfig;
    imageConfig: WatermarkImageConfig;
    onTextChange: (cfg: Partial<WatermarkTextConfig>) => void;
    onImageChange: (cfg: Partial<WatermarkImageConfig>) => void;
    videoDimensions: { width: number; height: number } | null;
}) {
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

export default function VideoWatermarkClient({}: { tool: BaseTool }) {
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [videoSrc, setVideoSrc] = useState<string | null>(null);
    const [outputVideoUrl, setOutputVideoUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [watermarkType, setWatermarkType] = useState<"text" | "image">("text");
    const [videoDimensions, setVideoDimensions] = useState<{
        width: number;
        height: number;
    } | null>(null);

    const [textConfig, setTextConfig] = useState<WatermarkTextConfig>({
        text: "CONFIDENTIAL",
        x: 50,
        y: 50,
        fontSize: 72,
        opacity: 0.8,
        color: "#ffffff",
    });

    const [imageConfig, setImageConfig] = useState<WatermarkImageConfig>({
        file: null,
        previewUrl: null,
        x: 50,
        y: 50,
        scale: 0.3,
        opacity: 0.8,
    });

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (files: File[]) => {
        if (files.length === 0) return;
        const file = files[0];
        setVideoFile(file);
        setVideoSrc(URL.createObjectURL(file));
        setOutputVideoUrl(null);
    };

    const handleTypeChange = useCallback((type: "text" | "image") => {
        setWatermarkType(type);
        if (type === "text") {
            setImageConfig({
                file: null,
                previewUrl: null,
                x: 50,
                y: 50,
                scale: 0.3,
                opacity: 0.8,
            });
        } else {
            setTextConfig({
                text: "CONFIDENTIAL",
                x: 50,
                y: 50,
                fontSize: 48,
                opacity: 0.8,
                color: "#ffffff",
            });
        }
    }, []);

    const handleTextChange = useCallback(
        (cfg: Partial<WatermarkTextConfig>) => setTextConfig((prev) => ({ ...prev, ...cfg })),
        [],
    );
    const handleImageChange = useCallback(
        (cfg: Partial<WatermarkImageConfig>) => setImageConfig((prev) => ({ ...prev, ...cfg })),
        [],
    );

    const drawLivePreview = useCallback(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas || video.readyState < 2) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
            canvas.width = video.videoWidth || 1280;
            canvas.height = video.videoHeight || 720;
            setVideoDimensions({ width: canvas.width, height: canvas.height });
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (watermarkType === "image" && imageConfig.previewUrl) {
            const img = new Image();
            img.src = imageConfig.previewUrl;
            if (img.complete) {
                const imgW = img.width * imageConfig.scale;
                const imgH = img.height * imageConfig.scale;
                const imgX = (canvas.width * imageConfig.x) / 100;
                const imgY = (canvas.height * imageConfig.y) / 100;
                ctx.save();
                ctx.globalAlpha = imageConfig.opacity;
                ctx.drawImage(img, imgX - imgW / 2, imgY - imgH / 2, imgW, imgH);
                ctx.restore();
            }
        }
        if (watermarkType === "text" && textConfig.text.trim().length > 0) {
            ctx.save();
            ctx.globalAlpha = textConfig.opacity;
            ctx.fillStyle = textConfig.color;
            ctx.strokeStyle = "black";
            ctx.lineWidth = Math.max(2, textConfig.fontSize / 15);
            ctx.lineJoin = "round";
            ctx.font = `bold ${textConfig.fontSize}px sans-serif`;

            const textMetrics = ctx.measureText(textConfig.text);
            const textWidth = textMetrics.width;
            const textHeight = textConfig.fontSize;

            const textX = (canvas.width * textConfig.x) / 100;
            const textY = (canvas.height * textConfig.y) / 100;

            ctx.strokeText(textConfig.text, textX - textWidth / 2, textY + textHeight / 2);
            ctx.fillText(textConfig.text, textX - textWidth / 2, textY + textHeight / 2);
            ctx.restore();
        }
    }, [watermarkType, textConfig, imageConfig]);

    useEffect(() => {
        let animationFrameId: number;
        const renderLoop = () => {
            drawLivePreview();
            animationFrameId = requestAnimationFrame(renderLoop);
        };
        renderLoop();
        return () => cancelAnimationFrame(animationFrameId);
    }, [drawLivePreview]);

    const handleExport = async () => {
        if (!videoFile) return;
        setIsProcessing(true);
        setProgress(0);
        setOutputVideoUrl(null);

        try {
            const blob = await processVideoWatermark(
                videoFile,
                textConfig,
                imageConfig,
                watermarkType,
                (p) => setProgress(p),
            );
            const url = URL.createObjectURL(blob);
            setOutputVideoUrl(url);
        } catch (e) {
            console.error(e);
            alert("Failed to process video. Please check console for details.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownload = () => {
        if (!outputVideoUrl) return;
        saveAs(outputVideoUrl, `watermarked_${videoFile?.name || "video.mp4"}`);
    };

    return (
        <ToolShell>
            {!videoFile ? (
                <FileUpload
                    accept="video/*"
                    maxSizeMB={500}
                    multiple={false}
                    onFilesSelected={handleFileSelect}
                    allowedFormats={["mp4", "webm", "mov", "avi"]}
                />
            ) : (
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Side: Video Preview (2/3 width) */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="relative aspect-video w-full bg-background border border-border rounded-xl overflow-hidden shadow-sm">
                            {outputVideoUrl ? (
                                <video
                                    src={outputVideoUrl}
                                    controls
                                    playsInline
                                    className="absolute inset-0 w-full h-full object-contain"
                                />
                            ) : (
                                <>
                                    <video
                                        ref={videoRef}
                                        src={videoSrc!}
                                        controls
                                        playsInline
                                        className="absolute inset-0 w-full h-full object-contain"
                                    />
                                    <canvas
                                        ref={canvasRef}
                                        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                                    />
                                </>
                            )}
                        </div>

                        <div className="flex gap-2">
                            {!outputVideoUrl ? (
                                <Button
                                    onClick={handleExport}
                                    disabled={isProcessing}
                                    className="flex-1 gap-2"
                                    size="lg"
                                >
                                    <Wand2 className="w-4 h-4" />
                                    {isProcessing
                                        ? `Processing... ${progress}%`
                                        : "Export Watermarked Video"}
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        onClick={() => {
                                            setOutputVideoUrl(null);
                                            setProgress(0);
                                        }}
                                        variant="outline"
                                        className="flex-1 gap-2"
                                        size="lg"
                                    >
                                        Edit Again
                                    </Button>
                                    <Button
                                        onClick={handleDownload}
                                        className="flex-1 gap-2"
                                        size="lg"
                                    >
                                        <Video className="w-4 h-4" />
                                        Download Video
                                    </Button>
                                </>
                            )}
                        </div>
                        {isProcessing && (
                            <div className="w-full bg-muted rounded-full h-2">
                                <div
                                    className="bg-primary h-2 rounded-full transition-all"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Right Side: Settings Panel (1/3 width, sticky) */}
                    <div className="space-y-6">
                        <Card className="border-border bg-card sticky top-4">
                            <CardContent className="p-4 md:p-6">
                                <WatermarkSettings
                                    watermarkType={watermarkType}
                                    setWatermarkType={handleTypeChange}
                                    textConfig={textConfig}
                                    imageConfig={imageConfig}
                                    onTextChange={handleTextChange}
                                    onImageChange={handleImageChange}
                                    videoDimensions={videoDimensions}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}

            {/* Hidden file input for adding more */}
            <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => {
                    if (e.target.files) {
                        handleFileSelect(Array.from(e.target.files));
                        e.target.value = "";
                    }
                }}
            />
        </ToolShell>
    );
}
