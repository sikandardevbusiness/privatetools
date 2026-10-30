"use client";

import {
    processVideoWatermark,
    type WatermarkImageConfig,
    type WatermarkTextConfig,
} from "@sikandardevbusiness/video-watermark";
import { saveAs } from "file-saver";
import { Video, Wand2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";

import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import type { BaseTool } from "@/features/tools/shared/types";
import { WatermarkSettings, type LocalWatermarkImageConfig } from "./settings";

export default function VideoWatermarkClient({ tool }: { tool: BaseTool }) {
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

    const [imageConfig, setImageConfig] = useState<LocalWatermarkImageConfig>({
        file: null,
        previewUrl: null,
        x: 50,
        y: 50,
        scale: 0.3,
        opacity: 0.8,
    });

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

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
        (cfg: Partial<LocalWatermarkImageConfig>) =>
            setImageConfig((prev) => ({ ...prev, ...cfg })),
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
            const packageImageConfig: WatermarkImageConfig = {
                file: imageConfig.file!,
                opacity: imageConfig.opacity,
                scale: imageConfig.scale,
                x: imageConfig.x,
                y: imageConfig.y,
            };

            const blob = await processVideoWatermark(
                videoFile,
                textConfig,
                packageImageConfig,
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
            <ToolHeader title={tool.name} description={tool.description}>
                {!videoFile ? (
                    <FileUpload
                        accept="video/*"
                        maxSizeMB={500}
                        multiple={false}
                        onFilesSelected={handleFileSelect}
                        allowedFormats={["mp4", "webm", "mov", "avi"]}
                    />
                ) : (
                    <div>
                        {/* 1. Video Preview at the top (replaces the upload area) */}
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

                        {/* 2. Action Buttons */}
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
                            <div className="w-full bg-muted rounded-full h-2 mt-2">
                                <div
                                    className="bg-primary h-2 rounded-full transition-all"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        )}
                    </div>
                )}
            </ToolHeader>

            {videoFile && (
                <div className="w-full max-w-4xl mx-auto pt-8 space-y-6">
                    <Card>
                        <CardContent className="py-2 px-4">
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
            )}
        </ToolShell>
    );
}
