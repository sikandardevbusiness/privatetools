"use client";

import { saveAs } from "file-saver";
import { Settings2 } from "lucide-react";
import { useRef, useState } from "react";

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
import { cn } from "@/lib/utils";
import { createAndDownloadZip, type ZipFile } from "@/lib/zip";
import { useCompressPdf, type PdfCompressOptions } from "./use-compress-pdf";

type QualityPreset = "default" | "small" | "medium" | "large" | "custom";
type SizeUnit = "kb" | "mb";

const CompressionSettings = function CompressionSettings({
    qualityPreset,
    setQualityPreset,
    targetSize,
    setTargetSize,
    sizeUnit,
    setSizeUnit,
    customDpi,
    setCustomDpi,
    isDisabled,
}: {
    qualityPreset: QualityPreset;
    targetSize: string;
    sizeUnit: SizeUnit;
    customDpi: string;
    setQualityPreset: (v: QualityPreset) => void;
    setTargetSize: (v: string) => void;
    setSizeUnit: (v: SizeUnit) => void;
    setCustomDpi: (v: string) => void;
    isDisabled: boolean;
}) {
    return (
        <Card className={cn("border-border bg-card sticky top-4 transition-all duration-300")}>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                    <Settings2 className="w-4 h-4 text-primary" />
                    Compression Settings
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Compression Level</Label>
                        <Select
                            value={qualityPreset}
                            onValueChange={(v) => setQualityPreset(v as QualityPreset)}
                            disabled={isDisabled}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                                <SelectItem value="default">Default (Always Smaller)</SelectItem>
                                <SelectItem value="small">Small (Extreme)</SelectItem>
                                <SelectItem value="medium">Medium (Balanced)</SelectItem>
                                <SelectItem value="large">Large (High Quality)</SelectItem>
                                <SelectItem value="custom">Custom Parameters</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-[10px] text-muted-foreground">
                            Used only when DPI and Target Size are blank.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">
                            Custom DPI (Optional)
                        </Label>
                        <Input
                            type="number"
                            min="1"
                            max="600"
                            value={customDpi}
                            onChange={(e) => setCustomDpi(e.target.value)}
                            placeholder="Exact render resolution"
                            className="h-9"
                            disabled={isDisabled}
                        />
                        <p className="text-[10px] text-muted-foreground">
                            Overrides everything: that DPI in, that output out.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">
                            Target Size (Optional)
                        </Label>
                        <div className="flex w-full rounded-md border border-input bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                            <Input
                                type="number"
                                step="0.1"
                                min="0.1"
                                value={targetSize}
                                onChange={(e) => setTargetSize(e.target.value)}
                                placeholder="Leave empty"
                                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-none h-9"
                                disabled={isDisabled}
                            />
                            <Select
                                value={sizeUnit}
                                onValueChange={(v) => setSizeUnit(v as SizeUnit)}
                                disabled={isDisabled}
                            >
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
                            Overrides the preset. Engine iterates until it hits this size.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default function PdfCompressorClient({}: { tool: BaseTool }) {
    const [files, setFiles] = useState<ProcessedFile[]>([]);

    const { compressPdf, isCompressing } = useCompressPdf();

    const [qualityPreset, setQualityPreset] = useState<QualityPreset>("default");
    const [targetSize, setTargetSize] = useState("");
    const [sizeUnit, setSizeUnit] = useState<SizeUnit>("mb");
    const [customDpi, setCustomDpi] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (selectedFiles: File[]) => {
        const newFiles: ProcessedFile[] = selectedFiles.map((file) => ({
            id: crypto.randomUUID(),
            file,
            targetFormat: "pdf",
            status: "pending",
            progress: 0,
        }));
        setFiles((prev) => [...prev, ...newFiles]);
    };

    const removeFile = (id: string) => {
        setFiles((prev) => prev.filter((f) => f.id !== id));
    };

    const getCompressionOptions = (): PdfCompressOptions => {
        const target = parseFloat(targetSize);
        const dpi = parseInt(customDpi);
        let targetBytes: number | undefined = undefined;

        if (!isNaN(target) && target > 0) {
            targetBytes = sizeUnit === "mb" ? target * 1024 * 1024 : target * 1024;
        }

        return {
            targetBytes,
            preset: qualityPreset,
            dpi: !isNaN(dpi) && dpi > 0 ? dpi : undefined,
        };
    };

    const handleResult = (fileObj: ProcessedFile, blob: Blob) => {
        const isUncompressible = blob.size >= fileObj.file.size;
        const outputFile = new File(
            [blob],
            fileObj.file.name.replace(/\.[^/.]+$/, "") +
                (isUncompressible ? "" : "-compressed") +
                ".pdf",
            { type: "application/pdf" },
        );

        setFiles((prev) =>
            prev.map((f) =>
                f.id === fileObj.id
                    ? {
                          ...f,
                          outputBlob: outputFile,
                          status: "completed",
                          progress: 100,
                          error: isUncompressible ? "Already fully optimized" : undefined,
                      }
                    : f,
            ),
        );
    };

    const processFiles = async () => {
        const pendingFiles = files.filter((f) => f.status === "pending" || f.status === "error");
        const options = getCompressionOptions();

        for (const fileObj of pendingFiles) {
            setFiles((prev) =>
                prev.map((f) =>
                    f.id === fileObj.id ? { ...f, status: "processing", progress: 0 } : f,
                ),
            );

            try {
                const blob = await compressPdf(fileObj.file, {
                    ...options,
                    onProgress: (p) => {
                        setFiles((prev) =>
                            prev.map((f) => (f.id === fileObj.id ? { ...f, progress: p } : f)),
                        );
                    },
                });
                handleResult(fileObj, blob);
            } catch (error) {
                console.error("PDF Compression error:", error);
                setFiles((prev) =>
                    prev.map((f) =>
                        f.id === fileObj.id
                            ? { ...f, status: "error", error: "Failed to compress", progress: 0 }
                            : f,
                    ),
                );
            }
        }
    };

    const processSingle = async (id: string) => {
        const fileObj = files.find((f) => f.id === id);
        if (!fileObj) return;

        setFiles((prev) =>
            prev.map((f) => (f.id === id ? { ...f, status: "processing", progress: 0 } : f)),
        );

        try {
            const options = getCompressionOptions();
            const blob = await compressPdf(fileObj.file, {
                ...options,
                onProgress: (p) => {
                    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, progress: p } : f)));
                },
            });
            handleResult(fileObj, blob);
        } catch {
            setFiles((prev) =>
                prev.map((f) =>
                    f.id === id
                        ? { ...f, status: "error", error: "Failed to compress", progress: 0 }
                        : f,
                ),
            );
        }
    };

    const handleDownload = (id: string) => {
        const fileObj = files.find((f) => f.id === id);
        if (!fileObj?.outputBlob || !(fileObj.outputBlob instanceof Blob)) return;
        saveAs(fileObj.outputBlob, (fileObj.outputBlob as File).name || fileObj.file.name);
    };

    const handleDownloadAll = async () => {
        const completed = files.filter(
            (f) => f.status === "completed" && f.outputBlob instanceof Blob,
        );
        if (completed.length === 0) return;

        const zipFiles: ZipFile[] = completed.map((f) => ({
            name: (f.outputBlob as File).name || f.file.name,
            content: f.outputBlob as Blob,
        }));

        await createAndDownloadZip(zipFiles, "compressed-pdfs.zip");
    };

    return (
        <ToolShell>
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Side: File Upload / File List (2/3 width) */}
                <div className="lg:col-span-2">
                    {files.length === 0 ? (
                        <FileUpload
                            accept="application/pdf"
                            maxSizeMB={100}
                            multiple={true}
                            onFilesSelected={handleFileSelect}
                            allowedFormats={["pdf"]}
                        />
                    ) : (
                        <FileList
                            files={files}
                            supportedFormats={["pdf"]}
                            isProcessing={isCompressing}
                            onRemoveFile={removeFile}
                            onDownload={handleDownload}
                            onProcess={processFiles}
                            onProcessSingle={processSingle}
                            onDownloadAll={handleDownloadAll}
                            onAddMoreFiles={() => fileInputRef.current?.click()}
                        />
                    )}
                </div>

                {/* Right Side: Settings Panel (1/3 width, sticky) */}
                <div className="space-y-6">
                    <CompressionSettings
                        qualityPreset={qualityPreset}
                        setQualityPreset={setQualityPreset}
                        targetSize={targetSize}
                        setTargetSize={setTargetSize}
                        sizeUnit={sizeUnit}
                        setSizeUnit={setSizeUnit}
                        customDpi={customDpi}
                        setCustomDpi={setCustomDpi}
                        isDisabled={files.length === 0}
                    />
                </div>

                {/* Hidden file input for "Add More" functionality */}
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => {
                        if (e.target.files) {
                            handleFileSelect(Array.from(e.target.files));
                            e.target.value = "";
                        }
                    }}
                />
            </div>
        </ToolShell>
    );
}
