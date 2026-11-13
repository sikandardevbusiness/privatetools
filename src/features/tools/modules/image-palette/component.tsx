"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { X, Settings2 } from "lucide-react";
import { extractPaletteFromImage } from "@sikandardevbusiness/css-toolkit";

import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ColorPlateCard } from "@/components/ui/color-plate-card";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";

import type { BaseTool } from "@/features/tools/shared/types";

export default function ImagePaletteClient({ tool }: { tool: BaseTool }) {
    const [preview, setPreview] = useState<string | null>(null);
    const [palette, setPalette] = useState<string[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);

    const runExtract = useCallback(() => {
        const canvas = canvasRef.current;
        const img = imgRef.current;
        if (!canvas || !img) return;
        setIsProcessing(true);
        // No count passed — package auto-detects distinct colors, capped at 30.
        const colors = extractPaletteFromImage(canvas, img);
        if (colors.length === 0) setError("Could not extract colors.");
        else setError(null);
        setPalette(colors);
        setIsProcessing(false);
    }, []);

    const processImage = useCallback(
        (file: File) => {
            setError(null);
            setIsProcessing(true);
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new window.Image();
                img.onload = () => {
                    imgRef.current = img;
                    setPreview(URL.createObjectURL(file));
                    runExtract();
                };
                img.onerror = () => {
                    setIsProcessing(false);
                    setError("Failed to load image data.");
                };
                img.src = e.target?.result as string;
            };
            reader.onerror = () => {
                setIsProcessing(false);
                setError("Failed to read file.");
            };
            reader.readAsDataURL(file);
        },
        [runExtract],
    );

    const handleFiles = (files: File[]) => {
        const file = files[0];
        if (file && file.type.startsWith("image/")) {
            setPalette([]);
            processImage(file);
        }
    };

    const handleReset = () => {
        setPreview(null);
        setPalette([]);
        setError(null);
        imgRef.current = null;
    };

    return (
        <ToolShell>
            <ToolHeader tool={tool}>
                {!preview ? (
                    <FileUpload
                        multiple={false}
                        onFilesSelected={handleFiles}
                        accept="image/*"
                        allowedFormats={["jpg", "jpeg", "png", "webp", "gif", "bmp"]}
                    />
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Settings2 className="h-4 w-4 text-primary" />
                                Image to Color Palette
                            </CardTitle>
                            <p className="text-xs text-muted-foreground">
                                Drop an image to instantly extract its dominant colors.
                            </p>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <div className="space-y-6">
                                {/* Image Preview */}
                                <div className="relative w-full rounded-lg overflow-hidden border border-border bg-muted/30 flex items-center justify-center min-h-50 aspect-video">
                                    <Image
                                        src={preview}
                                        alt="Uploaded preview"
                                        fill
                                        unoptimized
                                        className="object-contain"
                                    />
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="absolute top-2 right-2 z-10"
                                        onClick={handleReset}
                                    >
                                        <X /> Remove
                                    </Button>
                                </div>

                                {isProcessing && (
                                    <div className="flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground">
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                        Extracting dominant colors...
                                    </div>
                                )}

                                {error && !isProcessing && (
                                    <div className="text-center text-sm text-destructive py-4 bg-destructive/10 rounded-lg border border-destructive/20">
                                        {error}
                                    </div>
                                )}

                                {palette.length > 0 && !isProcessing && (
                                    <ColorPlateCard
                                        title="Extracted Palette"
                                        scale={palette.map((hex, i) => ({ label: i + 1, hex }))}
                                    />
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </ToolHeader>

            <canvas ref={canvasRef} className="hidden" />
        </ToolShell>
    );
}
