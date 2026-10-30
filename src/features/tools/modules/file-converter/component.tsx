"use client";

import { converter } from "@sikandardevbusiness/file-converter";
import { saveAs } from "file-saver";
import { useRef, useState } from "react";

import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { FileList } from "@/features/tools/shared/components/uploads/file-list";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";

import type { BaseTool, ProcessedFile } from "@/features/tools/shared/types";
import { createAndDownloadZip, type ZipFile } from "@/lib/zip";
import { fileConverterToolConfigMap } from "./index";

export default function FileConverterClient({ tool }: { tool: BaseTool }) {
    const [files, setFiles] = useState<ProcessedFile[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Get the default format from config
    const defaultFormat = fileConverterToolConfigMap[tool.id].defaultFormat;

    const handleFileSelect = (selectedFiles: File[]) => {
        const newFiles: ProcessedFile[] = selectedFiles.map((file) => {
            const ext = file.name.split(".").pop()?.toLowerCase() || "";
            const supportedOutputs = converter.getSupportedOutputFormats(ext);

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

    const updateFileFormat = (id: string, newFormat: string) => {
        setFiles((prev) =>
            prev.map((f) =>
                f.id === id ? { ...f, targetFormat: newFormat, status: "pending", progress: 0 } : f,
            ),
        );
    };

    const processFiles = async () => {
        const pendingFiles = files.filter((f) => f.status === "pending" || f.status === "error");
        if (pendingFiles.length === 0) return;

        setIsProcessing(true);

        for (const fileObj of pendingFiles) {
            setFiles((prev) =>
                prev.map((f) =>
                    f.id === fileObj.id ? { ...f, status: "processing", progress: 0 } : f,
                ),
            );

            try {
                const blob = await converter.convert(
                    fileObj.file,
                    fileObj.targetFormat.toLowerCase(),
                    undefined,
                    (prog) => {
                        setFiles((prev) =>
                            prev.map((f) => (f.id === fileObj.id ? { ...f, progress: prog } : f)),
                        );
                    },
                );

                setFiles((prev) =>
                    prev.map((f) =>
                        f.id === fileObj.id
                            ? { ...f, status: "completed", progress: 100, outputBlob: blob }
                            : f,
                    ),
                );
            } catch (err) {
                const msg = err instanceof Error ? err.message : "Conversion failed";
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
            const blob = await converter.convert(
                fileObj.file,
                fileObj.targetFormat.toLowerCase(),
                undefined,
                (prog) => {
                    setFiles((prev) =>
                        prev.map((f) => (f.id === id ? { ...f, progress: prog } : f)),
                    );
                },
            );

            setFiles((prev) =>
                prev.map((f) =>
                    f.id === id
                        ? { ...f, status: "completed", progress: 100, outputBlob: blob }
                        : f,
                ),
            );
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Conversion failed";
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

        const newName =
            item.file.name.replace(/\.[^/.]+$/, "") +
            `.${item.targetFormat?.toLowerCase() || "converted"}`;
        saveAs(item.outputBlob, newName);
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

        const zipFiles: ZipFile[] = completedFiles.map((item) => {
            const newName =
                item.file.name.replace(/\.[^/.]+$/, "") +
                `.${item.targetFormat?.toLowerCase() || "converted"}`;
            return { name: newName, content: item.outputBlob as Blob };
        });

        await createAndDownloadZip(zipFiles, "converted-files.zip");
    };

    const getSupportedFormatsForFile = (file: File) => {
        const ext = file.name.split(".").pop()?.toLowerCase() || "";
        return converter.getSupportedOutputFormats(ext).map((f) => f.toLowerCase());
    };

    return (
        <ToolShell>
            <ToolHeader title={tool.name} description={tool.description}>
                <FileUpload
                    maxSizeMB={50}
                    multiple={true}
                    onFilesSelected={handleFileSelect}
                    accept={fileConverterToolConfigMap[tool.id].acceptType}
                    allowedFormats={fileConverterToolConfigMap[tool.id].inputFormats}
                />
            </ToolHeader>

            {files.length > 0 && (
                <div className="w-full max-w-4xl mx-auto space-y-6 px-4">
                    <FileList
                        files={files}
                        onProcess={processFiles}
                        onRemoveFile={removeFile}
                        onDownload={handleDownload}
                        isProcessing={isProcessing}
                        onProcessSingle={processSingle}
                        onFormatChange={updateFileFormat}
                        onDownloadAll={handleDownloadAll}
                        getSupportedFormats={getSupportedFormatsForFile}
                        onAddMoreFiles={() => fileInputRef.current?.click()}
                    />
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={fileConverterToolConfigMap[tool.id].acceptType}
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
