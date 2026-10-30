"use client";

import { useRef, useState } from "react";

import { ImageGrid } from "@/features/tools/shared/components/image-grid";
import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { FileList } from "@/features/tools/shared/components/uploads/file-list";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";

import type { BaseTool, ProcessedFile } from "@/features/tools/shared/types";
import {
    cropManhwaPanels,
    type ManhwaCropOptions,
} from "../../../../../../packages/packages/manhwa-cropper";
import { pdfToPageFiles } from "../../../../../../packages/packages/file-converter/src";
import { CropperSettings } from "./settings";

export default function ManhwaCropperClient({ tool }: { tool: BaseTool }) {
    const [files, setFiles] = useState<ProcessedFile[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const [autoBg, setAutoBg] = useState(true);
    const [quality, setQuality] = useState("92");
    const [format, setFormat] = useState("image/png");
    const [keepMargin, setKeepMargin] = useState("10");
    const [safeMargin, setSafeMargin] = useState("180");
    const [gapStrength, setGapStrength] = useState("0.97");
    const [targetHeight, setTargetHeight] = useState("2400");
    const [minPanelHeight, setMinPanelHeight] = useState("240");
    const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
    const [splitMode, setSplitMode] = useState<"auto" | "fixed">("auto");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (selected: File[]) => {
        const sorted = [...selected].sort((a, b) =>
            a.name.localeCompare(b.name, undefined, { numeric: true }),
        );
        setFiles((prev) => [
            ...prev,
            ...sorted.map<ProcessedFile>((file) => ({
                id: crypto.randomUUID(),
                file,
                targetFormat: format === "image/jpeg" ? "jpg" : "png",
                status: "pending",
                progress: 0,
            })),
        ]);
    };

    const removePanel = (id: string) => {
        setFiles((prev) => prev.filter((f) => f.id !== id));
    };

    const processFiles = async () => {
        const pending = files.filter((f) => f.status === "pending" || f.status === "error");
        if (pending.length === 0) return;

        setIsProcessing(true);
        setFiles((prev) =>
            prev.map((f) =>
                pending.some((p) => p.id === f.id)
                    ? { ...f, status: "processing", progress: 0 }
                    : f,
            ),
        );

        try {
            const filesToProcess: File[] = [];

            // 1. Convert any PDFs to per-page PNG files
            for (const f of pending) {
                const isPdf =
                    f.file.type === "application/pdf" || f.file.name.toLowerCase().endsWith(".pdf");

                if (isPdf) {
                    setFiles((prev) =>
                        prev.map((x) => (x.id === f.id ? { ...x, progress: 5 } : x)),
                    );
                    try {
                        const pageFiles = await pdfToPageFiles(f.file, 2);
                        filesToProcess.push(...pageFiles);
                    } catch (e) {
                        console.error("PDF Conversion Failed:", e);
                        setFiles((prev) =>
                            prev.map((x) =>
                                x.id === f.id
                                    ? {
                                          ...x,
                                          status: "error",
                                          error:
                                              e instanceof Error
                                                  ? e.message
                                                  : "Failed to convert PDF",
                                          progress: 0,
                                      }
                                    : x,
                            ),
                        );
                    }
                } else {
                    filesToProcess.push(f.file);
                }
            }

            if (filesToProcess.length === 0) {
                setIsProcessing(false);
                return;
            }

            const options: ManhwaCropOptions = {
                splitMode,
                targetHeight: parseInt(targetHeight) || 2400,
                safeMargin: parseInt(safeMargin) || 180,
                gapStrength: parseFloat(gapStrength) || 0.97,
                minPanelHeight: parseInt(minPanelHeight) || 240,
                minGapHeight: 35,
                keepMargin: parseInt(keepMargin) || 10,
                autoDetectBackground: autoBg,
                backgroundColor,
                format: format as "image/jpeg" | "image/png",
                quality: parseInt(quality) || 92,
                onProgress: (p) =>
                    setFiles((prev) =>
                        prev.map((f) =>
                            pending.some((x) => x.id === f.id) ? { ...f, progress: p } : f,
                        ),
                    ),
            };

            const panels = await cropManhwaPanels(filesToProcess, options);

            const panelFiles: ProcessedFile[] = panels.map((file) => ({
                id: crypto.randomUUID(),
                file,
                targetFormat: format === "image/jpeg" ? "jpg" : "png",
                status: "completed",
                progress: 100,
                outputBlob: file,
            }));

            setFiles((prev) => [
                ...prev.filter((f) => !pending.some((p) => p.id === f.id)),
                ...panelFiles,
            ]);
        } catch (error) {
            setFiles((prev) =>
                prev.map((f) =>
                    pending.some((p) => p.id === f.id)
                        ? {
                              ...f,
                              status: "error",
                              error: error instanceof Error ? error.message : "Failed",
                              progress: 0,
                          }
                        : f,
                ),
            );
        } finally {
            setIsProcessing(false);
        }
    };

    const completed = files.filter((f) => f.status === "completed" && f.outputBlob instanceof Blob);
    const hasPendingFiles = files.some((f) => f.status !== "completed");

    return (
        <ToolShell>
            <ToolHeader title={tool.name} description={tool.description}>
                {files.length === 0 ? (
                    <FileUpload
                        maxSizeMB={100}
                        multiple={true}
                        accept="image/png, image/jpeg, image/webp, application/pdf"
                        allowedFormats={["png", "jpg", "jpeg", "webp", "pdf"]}
                        onFilesSelected={handleFileSelect}
                    />
                ) : (
                    <CropperSettings
                        autoBg={autoBg}
                        format={format}
                        quality={quality}
                        splitMode={splitMode}
                        setFormat={setFormat}
                        setAutoBg={setAutoBg}
                        safeMargin={safeMargin}
                        keepMargin={keepMargin}
                        setQuality={setQuality}
                        gapStrength={gapStrength}
                        isDisabled={isProcessing}
                        setSplitMode={setSplitMode}
                        targetHeight={targetHeight}
                        setSafeMargin={setSafeMargin}
                        setKeepMargin={setKeepMargin}
                        minPanelHeight={minPanelHeight}
                        setGapStrength={setGapStrength}
                        backgroundColor={backgroundColor}
                        setTargetHeight={setTargetHeight}
                        setMinPanelHeight={setMinPanelHeight}
                        setBackgroundColor={setBackgroundColor}
                    />
                )}
            </ToolHeader>

            {files.length > 0 && (
                <div className="px-4 pt-8 -mb-4">
                    {/* Visual Grid for Completed Panels */}
                    {completed.length > 0 && (
                        <ImageGrid panels={completed} onRemove={removePanel} />
                    )}

                    {/* File List for Pending/Processing Files */}
                    {hasPendingFiles && (
                        <FileList
                            onProcess={processFiles}
                            onRemoveFile={removePanel}
                            isProcessing={isProcessing}
                            onAddMoreFiles={() => fileInputRef.current?.click()}
                            files={files.filter((f) => f.status !== "completed")}
                            supportedFormats={["png", "jpg", "jpeg", "webp", "pdf"]}
                        />
                    )}
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/png, image/jpeg, image/webp, application/pdf"
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
