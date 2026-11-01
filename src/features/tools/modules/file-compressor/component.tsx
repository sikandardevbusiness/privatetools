"use client";

import {
    compressor,
    type CompressorOptions,
    type Preset,
} from "@sikandardevbusiness/file-compressor";
import { saveAs } from "file-saver";
import { useRef, useState } from "react";

import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { FileList } from "@/features/tools/shared/components/uploads/file-list";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";
import { CompressionSettings, type SizeUnit } from "./settings";

import type { BaseTool, ProcessedFile } from "@/features/tools/shared/types";
import { createAndDownloadZip, type ZipFile } from "@/lib/zip";
import { fileCompressorToolConfigMap } from "./index";

export default function FileCompressorClient({ tool }: { tool: BaseTool }) {
    const [files, setFiles] = useState<ProcessedFile[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const [qualityPreset, setQualityPreset] = useState<Preset>("default");

    const config = fileCompressorToolConfigMap[tool.id];
    const defaultFormat = config.defaultFormat;

    // ✅ Initialize target size and unit from config if provided
    const initialTargetSize = config.defaultTargetSizeKB
        ? config.defaultTargetSizeKB >= 1024
            ? (config.defaultTargetSizeKB / 1024).toString()
            : config.defaultTargetSizeKB.toString()
        : "";
    const initialSizeUnit: SizeUnit =
        config.defaultTargetSizeKB && config.defaultTargetSizeKB >= 1024 ? "mb" : "kb";

    const [targetSize, setTargetSize] = useState<string>(initialTargetSize);
    const [sizeUnit, setSizeUnit] = useState<SizeUnit>(initialSizeUnit);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (selectedFiles: File[]) => {
        const newFiles: ProcessedFile[] = selectedFiles.map((file) => {
            const ext = file.name.split(".").pop()?.toLowerCase() || "";
            const supportedOutputs = compressor.getSupportedOutputFormats(ext);

            return {
                id: crypto.randomUUID(),
                file,
                targetFormat:
                    defaultFormat || (supportedOutputs.length > 0 ? supportedOutputs[0] : "png"),
                status: "pending",
                progress: 0,
            };
        });
        setFiles((prev) => [...prev, ...newFiles]);
    };

    const removeFile = (id: string) => {
        setFiles((prev) => prev.filter((f) => f.id !== id));
    };

    const getSupportedFormatsForFile = (file: File) => {
        const ext = file.name.split(".").pop()?.toLowerCase() || "";
        return compressor.getSupportedOutputFormats(ext).map((f) => f.toLowerCase());
    };

    const getCompressionOptions = (): CompressorOptions => {
        const target = parseFloat(targetSize);
        let targetSizeKB: number | undefined = undefined;

        if (!isNaN(target) && target > 0) {
            targetSizeKB = sizeUnit === "mb" ? target * 1024 : target;
        }

        return {
            targetSizeKB,
            preset: qualityPreset,
        };
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
                const blob = await compressor.convert(
                    fileObj.file,
                    fileObj.targetFormat.toLowerCase(),
                    options,
                    (prog) => {
                        setFiles((prev) =>
                            prev.map((f) => (f.id === fileObj.id ? { ...f, progress: prog } : f)),
                        );
                    },
                );

                const ext =
                    fileObj.targetFormat.toLowerCase() === "jpeg"
                        ? "jpg"
                        : fileObj.targetFormat.toLowerCase();
                const newName = fileObj.file.name.replace(/\.[^/.]+$/, "") + `-compressed.${ext}`;

                setFiles((prev) =>
                    prev.map((f) =>
                        f.id === fileObj.id
                            ? {
                                  ...f,
                                  status: "completed",
                                  progress: 100,
                                  outputBlob: new File([blob], newName, { type: blob.type }),
                              }
                            : f,
                    ),
                );
            } catch (err) {
                const msg = err instanceof Error ? err.message : "Compression failed";
                setFiles((prev) =>
                    prev.map((f) =>
                        f.id === fileObj.id
                            ? { ...f, status: "error", progress: 0, error: msg }
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
            const blob = await compressor.convert(
                fileObj.file,
                fileObj.targetFormat.toLowerCase(),
                options,
                (prog) => {
                    setFiles((prev) =>
                        prev.map((f) => (f.id === id ? { ...f, progress: prog } : f)),
                    );
                },
            );

            const ext =
                fileObj.targetFormat.toLowerCase() === "jpeg"
                    ? "jpg"
                    : fileObj.targetFormat.toLowerCase();
            const newName = fileObj.file.name.replace(/\.[^/.]+$/, "") + `-compressed.${ext}`;

            setFiles((prev) =>
                prev.map((f) =>
                    f.id === id
                        ? {
                              ...f,
                              status: "completed",
                              progress: 100,
                              outputBlob: new File([blob], newName, { type: blob.type }),
                          }
                        : f,
                ),
            );
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Compression failed";
            setFiles((prev) =>
                prev.map((f) =>
                    f.id === id ? { ...f, status: "error", progress: 0, error: msg } : f,
                ),
            );
        }
        setIsProcessing(false);
    };

    const handleDownload = (id: string) => {
        const item = files.find((f) => f.id === id);
        if (!item?.outputBlob || !(item.outputBlob instanceof Blob)) return;
        saveAs(item.outputBlob, (item.outputBlob as File).name);
    };

    const handleDownloadAll = async () => {
        const completedFiles = files.filter(
            (f) => f.status === "completed" && f.outputBlob instanceof Blob,
        );
        if (completedFiles.length === 0) return;

        if (completedFiles.length === 1) {
            handleDownload(completedFiles[0].id);
            return;
        }

        const zipFiles: ZipFile[] = completedFiles.map((item) => ({
            name: (item.outputBlob as File).name,
            content: item.outputBlob as Blob,
        }));

        await createAndDownloadZip(zipFiles, "compressed-files.zip");
    };

    return (
        <ToolShell>
            <ToolHeader tool={tool}>
                {files.length === 0 ? (
                    <FileUpload
                        multiple={true}
                        onFilesSelected={handleFileSelect}
                        accept={config.acceptType}
                        allowedFormats={config.inputFormats}
                    />
                ) : (
                    <CompressionSettings
                        qualityPreset={qualityPreset}
                        setQualityPreset={setQualityPreset}
                        targetSize={targetSize}
                        setTargetSize={setTargetSize}
                        sizeUnit={sizeUnit}
                        setSizeUnit={setSizeUnit}
                    />
                )}
            </ToolHeader>

            {files.length > 0 && (
                <div className="w-full max-w-4xl mx-auto space-y-6 px-4">
                    <FileList
                        files={files}
                        getSupportedFormats={getSupportedFormatsForFile}
                        onProcess={processFiles}
                        onRemoveFile={removeFile}
                        onDownload={handleDownload}
                        isProcessing={isProcessing}
                        onProcessSingle={processSingle}
                        onDownloadAll={handleDownloadAll}
                        onAddMoreFiles={() => fileInputRef.current?.click()}
                    />
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={config.acceptType}
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
