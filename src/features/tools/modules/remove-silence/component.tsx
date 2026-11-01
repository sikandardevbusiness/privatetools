"use client";

import { removeSilenceFromAudio } from "@sikandardevbusiness/remove-silence";
import { saveAs } from "file-saver";
import { useRef, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { FileList } from "@/features/tools/shared/components/uploads/file-list";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";
import { SilenceSettings } from "./settings";

import type { BaseTool, ProcessedFile } from "@/features/tools/shared/types";
import { createAndDownloadZip, type ZipFile } from "@/lib/zip";

type OutputFormat = "mp3" | "wav";

export default function RemoveSilenceAudioClient({ tool }: { tool: BaseTool }) {
    const [files, setFiles] = useState<ProcessedFile[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

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

    const removeFile = (id: string) => {
        setFiles((prev) => prev.filter((f) => f.id !== id));
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
            } catch (err) {
                console.error("[Process Error]", err);
                const message = err instanceof Error ? err.message : "Failed to process";
                setFiles((prev) =>
                    prev.map((f) =>
                        f.id === fileObj.id
                            ? { ...f, status: "error", error: message, progress: 0 }
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
        } catch (err) {
            console.error("[Process Single Error]", err);
            const message = err instanceof Error ? err.message : "Failed to process";
            setFiles((prev) =>
                prev.map((f) =>
                    f.id === id ? { ...f, status: "error", error: message, progress: 0 } : f,
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

    return (
        <ToolShell>
            <ToolHeader tool={tool}>
                {files.length === 0 ? (
                    <FileUpload
                        accept="audio/*"
                        maxSizeMB={100}
                        multiple={true}
                        onFilesSelected={handleFileSelect}
                        allowedFormats={["mp3", "wav", "ogg", "m4a", "aac", "flac", "webm"]}
                    />
                ) : (
                    <Card>
                        <CardContent>
                            <SilenceSettings
                                threshold={threshold}
                                minDuration={minDuration}
                                outputFormat={outputFormat}
                                onThresholdChange={setThreshold}
                                onMinDurationChange={setMinDuration}
                                onOutputFormatChange={handleFormatChange}
                            />
                        </CardContent>
                    </Card>
                )}
            </ToolHeader>

            {files.length > 0 && (
                <FileList
                    files={files}
                    onProcess={processFiles}
                    onRemoveFile={removeFile}
                    isProcessing={isProcessing}
                    onDownload={handleDownload}
                    onProcessSingle={processSingle}
                    onDownloadAll={handleDownloadAll}
                    supportedFormats={["mp3", "wav"]}
                    onAddMoreFiles={() => fileInputRef.current?.click()}
                />
            )}

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
        </ToolShell>
    );
}
