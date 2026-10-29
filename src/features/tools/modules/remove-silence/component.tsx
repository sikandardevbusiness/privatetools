"use client";

import { saveAs } from "file-saver";
import { useRef, useState } from "react";

import { ToolFullScreen } from "@/features/tools/shared/components/layouts/tool-fullscreen";
import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { FileList } from "@/features/tools/shared/components/uploads/file-list";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";
import { SilenceSettings } from "./settings";

import type { BaseTool, ProcessedFile } from "@/features/tools/shared/types";
import { createAndDownloadZip, type ZipFile } from "@/lib/zip";
import { removeSilenceFromAudio } from "./lib";

type OutputFormat = "mp3" | "wav";

export default function RemoveSilenceAudioClient({ tool }: { tool: BaseTool }) {
    const [files, setFiles] = useState<ProcessedFile[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const [threshold, setThreshold] = useState(-40);
    const [minDuration, setMinDuration] = useState(0.35);
    const [outputFormat, setOutputFormat] = useState<OutputFormat>("mp3");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (selectedFiles: File[]) => {
        const newFiles: ProcessedFile[] = selectedFiles.map((file) => ({
            id: crypto.randomUUID(),
            file,
            targetFormat: outputFormat,
            status: "pending",
            progress: 0,
        }));
        setFiles((prev) => [...prev, ...newFiles]);
        setIsFullScreen(true); // ✅ Auto-enter fullscreen on upload
    };

    const handleFormatChange = (newFormat: OutputFormat) => {
        setOutputFormat(newFormat);
        setFiles((prev) =>
            prev.map((f) => ({
                ...f,
                targetFormat: newFormat,
                status: f.status === "completed" ? "pending" : f.status,
            })),
        );
    };

    const clearFiles = () => {
        setFiles([]);
        setIsFullScreen(false); // ✅ Remove files and exit fullscreen
    };

    const removeFile = (id: string) => {
        setFiles((prev) => {
            const updated = prev.filter((f) => f.id !== id);
            if (updated.length === 0) {
                setIsFullScreen(false); // ✅ Exit fullscreen if last file is removed
            }
            return updated;
        });
    };

    const processFiles = async () => {
        setIsProcessing(true);
        const pendingFiles = files.filter((f) => f.status === "pending" || f.status === "error");

        for (const fileObj of pendingFiles) {
            setFiles((prev) =>
                prev.map((f) =>
                    f.id === fileObj.id ? { ...f, status: "processing", progress: 0 } : f,
                ),
            );

            try {
                const result = await removeSilenceFromAudio(
                    fileObj.file,
                    threshold,
                    minDuration,
                    outputFormat,
                    (p) => {
                        setFiles((prev) =>
                            prev.map((f) => (f.id === fileObj.id ? { ...f, progress: p } : f)),
                        );
                    },
                );

                setFiles((prev) =>
                    prev.map((f) =>
                        f.id === fileObj.id
                            ? {
                                  ...f,
                                  outputBlob: new File(
                                      [result.blob],
                                      fileObj.file.name.replace(/\.[^/.]+$/, "") +
                                          `_clean.${outputFormat}`,
                                      { type: result.blob.type },
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
                        f.id === fileObj.id
                            ? { ...f, status: "error", error: "Failed to process", progress: 0 }
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
            const result = await removeSilenceFromAudio(
                fileObj.file,
                threshold,
                minDuration,
                outputFormat,
                (p) => {
                    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, progress: p } : f)));
                },
            );
            setFiles((prev) =>
                prev.map((f) =>
                    f.id === id
                        ? {
                              ...f,
                              outputBlob: new File(
                                  [result.blob],
                                  fileObj.file.name.replace(/\.[^/.]+$/, "") +
                                      `_clean.${outputFormat}`,
                                  { type: result.blob.type },
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
                        ? { ...f, status: "error", error: "Failed to process", progress: 0 }
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

        await createAndDownloadZip(zipFiles, "cleaned-audio.zip");
    };

    // 1. Show Header + Upload Screen if no files are loaded
    if (files.length === 0) {
        return (
            <ToolHeader title={tool.name} description={tool.description}>
                <FileUpload
                    accept="audio/*"
                    maxSizeMB={100}
                    multiple={true}
                    onFilesSelected={handleFileSelect}
                    allowedFormats={["mp3", "wav", "ogg", "m4a", "aac", "flac", "webm"]}
                />
            </ToolHeader>
        );
    }

    // 2. Show Fullscreen Editor if files are loaded
    return (
        <ToolFullScreen
            title={tool.name}
            isFullScreen={isFullScreen}
            onToggleFullScreen={clearFiles}
            sidebar={
                <SilenceSettings
                    threshold={threshold}
                    minDuration={minDuration}
                    outputFormat={outputFormat}
                    onThresholdChange={setThreshold}
                    onMinDurationChange={setMinDuration}
                    onOutputFormatChange={handleFormatChange}
                />
            }
        >
            <div className="w-full max-w-4xl mx-auto p-4">
                <FileList
                    files={files}
                    supportedFormats={["mp3", "wav"]}
                    isProcessing={isProcessing}
                    onProcess={processFiles}
                    onRemoveFile={removeFile}
                    onDownload={handleDownload}
                    onProcessSingle={processSingle}
                    onDownloadAll={handleDownloadAll}
                    onAddMoreFiles={() => fileInputRef.current?.click()}
                />
            </div>

            {/* Hidden file input for "Add More" functionality */}
            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="audio/*"
                className="hidden"
                onChange={(e) => {
                    if (e.target.files) {
                        handleFileSelect(Array.from(e.target.files));
                        e.target.value = "";
                    }
                }}
            />
        </ToolFullScreen>
    );
}
