"use client";

import { compressImage, type CompressOptions } from "@sikandardevbusiness/image-compressor";
import { saveAs } from "file-saver";
import { useRef, useState } from "react";

import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { FileList } from "@/features/tools/shared/components/uploads/file-list";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";
import { CompressionSettings, type Format, type QualityPreset, type SizeUnit } from "./settings";

import type { BaseTool, ProcessedFile } from "@/features/tools/shared/types";
import { createAndDownloadZip, type ZipFile } from "@/lib/zip";

export default function ImageCompressorClient({ tool }: { tool: BaseTool }) {
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

    return (
        <ToolShell>
            <ToolHeader title={tool.name} description={tool.description}>
                {files.length === 0 ? (
                    <FileUpload
                        accept="image/*"
                        maxSizeMB={50}
                        multiple={true}
                        onFilesSelected={handleFileSelect}
                        allowedFormats={["jpg", "jpeg", "png", "webp", "gif", "bmp"]}
                    />
                ) : (
                    <CompressionSettings
                        qualityPreset={qualityPreset}
                        setQualityPreset={setQualityPreset}
                        targetSize={targetSize}
                        setTargetSize={setTargetSize}
                        sizeUnit={sizeUnit}
                        setSizeUnit={setSizeUnit}
                        outputFormat={outputFormat}
                        setOutputFormat={setOutputFormat}
                        isDisabled={isProcessing}
                    />
                )}
            </ToolHeader>

            {files.length > 0 && (
                <div className="w-full max-w-4xl mx-auto space-y-6">
                    <FileList
                        files={files}
                        supportedFormats={["jpeg", "png", "webp", "jpg", "gif", "bmp"]}
                        isProcessing={isProcessing}
                        onRemoveFile={removeFile}
                        onDownload={handleDownload}
                        onProcess={processFiles}
                        onProcessSingle={processSingle}
                        onDownloadAll={handleDownloadAll}
                        onAddMoreFiles={() => fileInputRef.current?.click()}
                    />
                </div>
            )}

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
