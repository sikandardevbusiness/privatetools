"use client";

import { useRef, useState } from "react";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { splitPdfBySize, type SplitResultItem } from "@sikandardevbusiness/pdf-toolkit";

import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { FileList } from "@/features/tools/shared/components/uploads/file-list";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";

import { SplitterSettings, type SizeUnit } from "./settings";
import type { BaseTool, ProcessedFile } from "@/features/tools/shared/types";

interface SplitProcessedFile extends ProcessedFile {
    splitResults?: SplitResultItem[];
}

export default function PdfSizeSplitterClient({ tool }: { tool: BaseTool }) {
    const [files, setFiles] = useState<SplitProcessedFile[]>([]);
    const [targetSize, setTargetSize] = useState<string>("10");
    const [sizeUnit, setSizeUnit] = useState<SizeUnit>("mb");
    const [isProcessing, setIsProcessing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (selectedFiles: File[]) => {
        const newFiles: SplitProcessedFile[] = selectedFiles.map((file) => ({
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

    const processFiles = async () => {
        const pendingFiles = files.filter((f) => f.status === "pending" || f.status === "error");
        if (pendingFiles.length === 0) return;

        setIsProcessing(true);
        const maxSizeMB =
            sizeUnit === "mb" ? parseFloat(targetSize) : parseFloat(targetSize) / 1024;

        for (const fileObj of pendingFiles) {
            setFiles((prev) =>
                prev.map((f) =>
                    f.id === fileObj.id ? { ...f, status: "processing", progress: 0 } : f,
                ),
            );

            try {
                const splitResults = await splitPdfBySize(fileObj.file, maxSizeMB, (prog) => {
                    setFiles((prev) =>
                        prev.map((f) => (f.id === fileObj.id ? { ...f, progress: prog } : f)),
                    );
                });

                const tempZip = new JSZip();
                const baseName = fileObj.file.name.replace(/\.pdf$/i, "");
                splitResults.forEach((r) => tempZip.file(`${baseName}-${r.fileName}`, r.blob));
                const zipBlob = await tempZip.generateAsync({ type: "blob", compression: "STORE" });
                const zipFile = new File([zipBlob], `${baseName}-parts.zip`, {
                    type: "application/zip",
                });

                setFiles((prev) =>
                    prev.map((f) =>
                        f.id === fileObj.id
                            ? {
                                  ...f,
                                  status: "completed",
                                  progress: 100,
                                  outputBlob: zipFile,
                                  splitResults,
                              }
                            : f,
                    ),
                );
            } catch (err) {
                const msg = err instanceof Error ? err.message : "Splitting failed";
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

        const maxSizeMB =
            sizeUnit === "mb" ? parseFloat(targetSize) : parseFloat(targetSize) / 1024;

        try {
            const splitResults = await splitPdfBySize(fileObj.file, maxSizeMB, (prog) => {
                setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, progress: prog } : f)));
            });

            const tempZip = new JSZip();
            const baseName = fileObj.file.name.replace(/\.pdf$/i, "");
            splitResults.forEach((r) => tempZip.file(`${baseName}-${r.fileName}`, r.blob));
            const zipBlob = await tempZip.generateAsync({ type: "blob", compression: "STORE" });
            const zipFile = new File([zipBlob], `${baseName}-parts.zip`, {
                type: "application/zip",
            });

            setFiles((prev) =>
                prev.map((f) =>
                    f.id === id
                        ? {
                              ...f,
                              status: "completed",
                              progress: 100,
                              outputBlob: zipFile,
                              splitResults,
                          }
                        : f,
                ),
            );
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Splitting failed";
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
        if (!item?.outputBlob) return;
        saveAs(item.outputBlob, (item.outputBlob as File).name);
    };

    const handleDownloadAll = async () => {
        const completedFiles = files.filter(
            (f) => f.status === "completed" && f.splitResults && f.outputBlob,
        );
        if (completedFiles.length === 0) return;

        if (completedFiles.length === 1) {
            handleDownload(completedFiles[0].id);
            return;
        }

        const zip = new JSZip();
        for (const item of completedFiles) {
            const baseName = item.file.name.replace(/\.pdf$/i, "");
            if (item.splitResults) {
                for (const result of item.splitResults) {
                    zip.file(`${baseName}-${result.fileName}`, result.blob);
                }
            }
        }

        const zipBlob = await zip.generateAsync({ type: "blob", compression: "STORE" });
        saveAs(zipBlob, "split-pdfs.zip");
    };

    return (
        <ToolShell>
            <ToolHeader tool={tool}>
                {files.length === 0 ? (
                    <FileUpload
                        multiple={true}
                        onFilesSelected={handleFileSelect}
                        accept="application/pdf"
                        allowedFormats={["pdf"]}
                    />
                ) : (
                    <SplitterSettings
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
                accept="application/pdf"
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
