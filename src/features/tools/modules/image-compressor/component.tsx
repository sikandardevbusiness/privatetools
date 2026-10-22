"use client";

import { saveAs } from "file-saver";
import { Settings2 } from "lucide-react";
import { memo, useRef, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { FileList } from "@/features/tools/shared/components/uploads/file-list";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";

import type { BaseTool, ProcessedFile } from "@/features/tools/shared/types";
import { createAndDownloadZip, type ZipFile } from "@/lib/zip";
import { compressImage, type CompressOptions } from "./lib";

type QualityPreset = "small" | "medium" | "large" | "custom";
type Format = "original" | "jpeg" | "png" | "webp";
type SizeUnit = "kb" | "mb";

const CompressionSettings = memo(function CompressionSettings({
    sizeUnit,
    targetSize,
    setSizeUnit,
    outputFormat,
    setTargetSize,
    qualityPreset,
    setOutputFormat,
    setQualityPreset,
}: {
    targetSize: string;
    sizeUnit: SizeUnit;
    outputFormat: Format;
    qualityPreset: QualityPreset;
    setSizeUnit: (v: SizeUnit) => void;
    setTargetSize: (v: string) => void;
    setOutputFormat: (v: Format) => void;
    setQualityPreset: (v: QualityPreset) => void;
}) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                <Settings2 className="w-4 h-4 text-primary" />
                Compression Settings
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Quality Preset</Label>
                    <Select
                        value={qualityPreset}
                        onValueChange={(v) => setQualityPreset(v as QualityPreset)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                            <SelectItem value="small">Small (Low Quality)</SelectItem>
                            <SelectItem value="medium">Medium (Standard Quality)</SelectItem>
                            <SelectItem value="large">Large (High Quality)</SelectItem>
                            <SelectItem value="custom">Custom Parameters</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Output Format</Label>
                    <Select
                        value={outputFormat}
                        onValueChange={(v) => setOutputFormat(v as Format)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                            <SelectItem value="original">Keep Original</SelectItem>
                            <SelectItem value="jpeg">JPEG</SelectItem>
                            <SelectItem value="png">PNG</SelectItem>
                            <SelectItem value="webp">WebP (Recommended)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Target Size (Optional)</Label>
                    <div className="flex w-full rounded-md border border-input bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                        <Input
                            type="number"
                            step="0.1"
                            min="0.1"
                            value={targetSize}
                            onChange={(e) => setTargetSize(e.target.value)}
                            placeholder="Leave empty"
                            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-none h-9"
                        />
                        <Select value={sizeUnit} onValueChange={(v) => setSizeUnit(v as SizeUnit)}>
                            <SelectTrigger className="w-20 rounded-l-none border-0 border-l border-input focus:ring-0 focus:ring-offset-0 h-9 bg-background">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="mb">MB</SelectItem>
                                <SelectItem value="kb">KB</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                        Approximates target size by adjusting dimensions and quality.
                    </p>
                </div>
            </div>
        </div>
    );
});

export default function CompressorClient({}: { tool: BaseTool }) {
    const [files, setFiles] = useState<ProcessedFile[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const [qualityPreset, setQualityPreset] = useState<QualityPreset>("medium");
    const [targetSize, setTargetSize] = useState("");
    const [sizeUnit, setSizeUnit] = useState<SizeUnit>("mb");
    const [outputFormat, setOutputFormat] = useState<Format>("webp");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (selectedFiles: File[]) => {
        const newFiles: ProcessedFile[] = selectedFiles.map((file) => ({
            id: crypto.randomUUID(),
            file,
            targetFormat:
                outputFormat === "original" ? file.type.split("/")[1] || "jpeg" : outputFormat,
            status: "pending",
            progress: 0,
        }));
        setFiles((prev) => [...prev, ...newFiles]);
    };

    const removeFile = (id: string) => {
        setFiles((prev) => prev.filter((f) => f.id !== id));
    };

    const getCompressionOptions = (): CompressOptions => {
        const target = parseFloat(targetSize);
        let targetSizeMB: number | undefined = undefined;
        let quality: number | undefined = undefined;

        if (!isNaN(target) && target > 0) {
            targetSizeMB = sizeUnit === "mb" ? target : target / 1024;
        } else {
            if (qualityPreset === "small") quality = 0.4;
            else if (qualityPreset === "medium") quality = 0.7;
            else if (qualityPreset === "large") quality = 0.9;
            else quality = 0.8;
        }

        return {
            targetSizeMB,
            quality,
            format: outputFormat === "original" ? undefined : outputFormat,
        };
    };

    const processFiles = async () => {
        setIsProcessing(true);
        const pendingFiles = files.filter((f) => f.status === "pending" || f.status === "error");
        const options = getCompressionOptions();

        for (const fileObj of pendingFiles) {
            setFiles((prev) =>
                prev.map((f) =>
                    f.id === fileObj.id ? { ...f, status: "processing", progress: 0 } : f,
                ),
            );

            try {
                const blob = await compressImage(fileObj.file, {
                    ...options,
                    onProgress: (p) => {
                        setFiles((prev) =>
                            prev.map((f) => (f.id === fileObj.id ? { ...f, progress: p } : f)),
                        );
                    },
                });
                const ext = options.format || fileObj.file.type.split("/")[1] || "jpeg";

                setFiles((prev) =>
                    prev.map((f) =>
                        f.id === fileObj.id
                            ? {
                                  ...f,
                                  outputBlob: new File(
                                      [blob],
                                      fileObj.file.name.replace(/\.[^/.]+$/, "") +
                                          `-compressed.${ext}`,
                                      { type: blob.type },
                                  ),
                                  status: "completed",
                                  progress: 100,
                              }
                            : f,
                    ),
                );
            } catch (error) {
                console.error("Compression error:", error);
                setFiles((prev) =>
                    prev.map((f) =>
                        f.id === fileObj.id
                            ? { ...f, status: "error", error: "Failed to compress", progress: 0 }
                            : f,
                    ),
                );
            }
        }
        setIsProcessing(false);
    };

    const processSingle = async (id: string) => {
        const fileObj = files.find((f) => f.id === id);
        if (!fileObj) return;

        setIsProcessing(true);
        setFiles((prev) =>
            prev.map((f) => (f.id === id ? { ...f, status: "processing", progress: 0 } : f)),
        );

        try {
            const options = getCompressionOptions();
            const blob = await compressImage(fileObj.file, {
                ...options,
                onProgress: (p) => {
                    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, progress: p } : f)));
                },
            });
            const ext = options.format || fileObj.file.type.split("/")[1] || "jpeg";

            // ✅ FIX: Set the standard 'outputBlob' property
            setFiles((prev) =>
                prev.map((f) =>
                    f.id === id
                        ? {
                              ...f,
                              outputBlob: new File(
                                  [blob],
                                  fileObj.file.name.replace(/\.[^/.]+$/, "") + `-compressed.${ext}`,
                                  { type: blob.type },
                              ),
                              status: "completed",
                              progress: 100,
                          }
                        : f,
                ),
            );
        } catch {
            setFiles((prev) =>
                prev.map((f) =>
                    f.id === id
                        ? { ...f, status: "error", error: "Failed to compress", progress: 0 }
                        : f,
                ),
            );
        }
        setIsProcessing(false);
    };

    const handleDownload = (id: string) => {
        const fileObj = files.find((f) => f.id === id);
        if (!fileObj?.outputBlob || !(fileObj.outputBlob instanceof Blob)) return;
        saveAs(fileObj.outputBlob, (fileObj.outputBlob as File).name);
    };

    const handleDownloadAll = async () => {
        const completed = files.filter(
            (f) => f.status === "completed" && f.outputBlob instanceof Blob,
        );
        if (completed.length === 0) return;

        const zipFiles: ZipFile[] = completed.map((f) => ({
            name: (f.outputBlob as File).name,
            content: f.outputBlob as Blob,
        }));

        await createAndDownloadZip(zipFiles, "compressed-images.zip");
    };

    // Empty State (Upload Only)
    if (files.length === 0) {
        return (
            <ToolShell>
                <FileUpload
                    accept="image/*"
                    maxSizeMB={50}
                    multiple={true}
                    onFilesSelected={handleFileSelect}
                    allowedFormats={["jpg", "jpeg", "png", "webp", "gif", "bmp"]}
                />
            </ToolShell>
        );
    }

    // Main Editor UI with 2/3 + 1/3 Grid
    return (
        <ToolShell>
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Side: File List (2/3 width) */}
                <div className="lg:col-span-2">
                    <FileList
                        files={files}
                        supportedFormats={["jpeg", "png", "webp"]}
                        isProcessing={isProcessing}
                        onRemoveFile={removeFile}
                        onDownload={handleDownload}
                        onProcess={processFiles}
                        onProcessSingle={processSingle}
                        onDownloadAll={handleDownloadAll}
                        onAddMoreFiles={() => fileInputRef.current?.click()}
                    />
                </div>

                {/* Right Side: Settings Panel (1/3 width, sticky) */}
                <Card className="sticky top-4">
                    <CardContent>
                        <CompressionSettings
                            qualityPreset={qualityPreset}
                            setQualityPreset={setQualityPreset}
                            targetSize={targetSize}
                            setTargetSize={setTargetSize}
                            sizeUnit={sizeUnit}
                            setSizeUnit={setSizeUnit}
                            outputFormat={outputFormat}
                            setOutputFormat={setOutputFormat}
                        />
                    </CardContent>
                </Card>
            </div>

            {/* Hidden file input for adding more */}
            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
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
