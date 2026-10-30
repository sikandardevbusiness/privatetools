"use client";

import { saveAs } from "file-saver";
import { useRef, useState } from "react";

import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { FileList } from "@/features/tools/shared/components/uploads/file-list";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";

import type { BaseTool, ProcessedFile } from "@/features/tools/shared/types";
import { createAndDownloadZip, type ZipFile } from "@/lib/zip";

import {
    compressPdf,
    type PdfCompressOptions,
} from "../../../../../../packages/packages/pdf-compressor/src/index";
import { CompressionSettings, type QualityPreset, type SizeUnit } from "./settings";

export default function PdfCompressorClient({ tool }: { tool: BaseTool }) {
    const [files, setFiles] = useState<ProcessedFile[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

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
        if (pendingFiles.length === 0) return;

        setIsProcessing(true);
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
        setIsProcessing(false);
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
            <ToolHeader title={tool.name} description={tool.description}>
                {files.length === 0 ? (
                    <FileUpload
                        maxSizeMB={100}
                        multiple={true}
                        accept="application/pdf"
                        allowedFormats={["pdf"]}
                        onFilesSelected={handleFileSelect}
                    />
                ) : (
                    <CompressionSettings
                        qualityPreset={qualityPreset}
                        setQualityPreset={setQualityPreset}
                        targetSize={targetSize}
                        setTargetSize={setTargetSize}
                        sizeUnit={sizeUnit}
                        setSizeUnit={setSizeUnit}
                        customDpi={customDpi}
                        setCustomDpi={setCustomDpi}
                        isDisabled={isProcessing}
                    />
                )}
            </ToolHeader>

            {files.length > 0 && (
                <div className="w-full max-w-4xl mx-auto space-y-6">
                    <FileList
                        files={files}
                        supportedFormats={["pdf"]}
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
        </ToolShell>
    );
}
