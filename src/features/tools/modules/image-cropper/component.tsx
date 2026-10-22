"use client";

import { Download, RotateCcw, Upload } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Cropper, CropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";

import type { BaseTool } from "@/features/tools/shared/types";
import { cn } from "@/lib/utils";

export default function ImageCropperTool({}: { tool: BaseTool }) {
    const [image, setImage] = useState<string | null>(null);
    const [outputFormat, setOutputFormat] = useState("png");
    const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);
    const cropperRef = useRef<CropperRef>(null);

    const handleFilesSelected = useCallback((files: File[]) => {
        if (files.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(files[0]);
        }
    }, []);

    const handleDownload = useCallback(() => {
        if (!cropperRef.current) return;
        const canvas = cropperRef.current.getCanvas();
        if (canvas) {
            const link = document.createElement("a");
            link.href = canvas.toDataURL(`image/${outputFormat}`);
            link.download = `cropped-image.${outputFormat}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }, [outputFormat]);

    const handleReset = useCallback(() => {
        cropperRef.current?.reset();
    }, []);

    const handleNewImage = useCallback(() => {
        setImage(null);
    }, []);

    // Cropper State
    return (
        <ToolShell>
            {image ? (
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cropper Area */}
                    <div className="lg:col-span-2">
                        <Card className="border-border bg-card">
                            <CardContent>
                                <div className="relative bg-muted/30">
                                    <Cropper
                                        ref={cropperRef}
                                        src={image}
                                        stencilProps={{
                                            aspectRatio,
                                            movable: true,
                                            resizable: true,
                                        }}
                                        className="cropper-container"
                                    />
                                </div>
                                <p className="text-sm text-muted-foreground text-center mt-4">
                                    <span className="font-medium">Tip:</span> Drag to move • Drag
                                    edges to resize • Scroll to zoom
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Settings Panel */}
                    <div className="space-y-6">
                        <Card
                            className={cn(
                                "border-border bg-card sticky top-4 transition-all duration-300",
                            )}
                        >
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-lg mb-4">Crop Settings</h3>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Aspect Ratio</Label>
                                            <Select
                                                value={aspectRatio?.toString() || "free"}
                                                onValueChange={(value) => {
                                                    if (value === "free" || value === null) {
                                                        setAspectRatio(undefined);
                                                    } else {
                                                        setAspectRatio(parseFloat(value));
                                                    }
                                                }}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select ratio" />
                                                </SelectTrigger>
                                                <SelectContent className="w-full">
                                                    <SelectItem value="free">Free Form</SelectItem>
                                                    <SelectItem value="1">1:1 (Square)</SelectItem>
                                                    <SelectItem value="1.7778">
                                                        16:9 (Landscape)
                                                    </SelectItem>
                                                    <SelectItem value="1.3333">
                                                        4:3 (Standard)
                                                    </SelectItem>
                                                    <SelectItem value="0.75">
                                                        3:4 (Portrait)
                                                    </SelectItem>
                                                    <SelectItem value="0.5625">
                                                        9:16 (Story)
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Output Format</Label>
                                            <Select
                                                value={outputFormat}
                                                onValueChange={(value) => {
                                                    if (value) setOutputFormat(value);
                                                }}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="w-full">
                                                    {["png", "jpg", "webp"].map((fmt) => (
                                                        <SelectItem key={fmt} value={fmt}>
                                                            {fmt.toUpperCase()}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-border space-y-3">
                                    <Button
                                        onClick={handleDownload}
                                        className="w-full gap-2"
                                        size="lg"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download Image
                                    </Button>

                                    <div className="grid grid-cols-2 gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={handleReset}
                                            className="gap-2"
                                        >
                                            <RotateCcw className="w-4 h-4" />
                                            Reset
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={handleNewImage}
                                            className="gap-2"
                                        >
                                            <Upload className="w-4 h-4" />
                                            New Image
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            ) : (
                <div className="relative">
                    <div className="absolute inset-0 rounded-2xl blur-xl" />
                    <FileUpload
                        accept="image/*"
                        maxSizeMB={50}
                        multiple={false}
                        onFilesSelected={handleFilesSelected}
                        allowedFormats={["jpg", "jpeg", "png", "webp", "gif", "bmp"]}
                    />
                </div>
            )}
        </ToolShell>
    );
}
