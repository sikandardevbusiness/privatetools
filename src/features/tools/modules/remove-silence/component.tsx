"use client";

import { saveAs } from "file-saver";
import { Settings2 } from "lucide-react";
import { useRef, useState } from "react";

import { Label } from "@/components/ui/label";
import { PropSlider } from "@/components/ui/prop-slider";
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
import { removeSilenceFromAudio } from "./lib";

type OutputFormat = "mp3" | "wav";

const SilenceSettings = ({
    threshold,
    minDuration,
    outputFormat,
    onThresholdChange,
    onMinDurationChange,
    onOutputFormatChange,
    isDisabled,
}: {
    threshold: number;
    minDuration: number;
    outputFormat: OutputFormat;
    onThresholdChange: (v: number) => void;
    onMinDurationChange: (v: number) => void;
    onOutputFormatChange: (v: OutputFormat) => void;
    isDisabled: boolean;
}) => {
    return (
        <div
            className={cn(
                "bg-card border border-border rounded-xl p-6 sticky top-4 transition-all duration-300",
                isDisabled && "opacity-40 pointer-events-none select-none grayscale",
            )}
        >
            <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-6">
                <Settings2 className="w-4 h-4 text-primary" /> Silence Detection Settings
            </div>
            <div className="grid grid-cols-1 gap-6 w-full">
                <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Output Format</Label>
                    <Select
                        value={outputFormat}
                        onValueChange={(v) => onOutputFormatChange(v as OutputFormat)}
                        disabled={isDisabled}
                    >
                        <SelectTrigger className="w-full bg-background text-foreground">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="w-full bg-background text-foreground">
                            <SelectItem value="mp3">MP3 (Compressed, smaller file)</SelectItem>
                            <SelectItem value="wav">WAV (Lossless, higher quality)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Silence Threshold with Description */}
                <div className="space-y-2">
                    <PropSlider
                        label="Silence Threshold"
                        value={threshold}
                        onChange={onThresholdChange}
                        min={-100}
                        max={0}
                        step={1}
                        unit="dB"
                    />
                    <p className="text-[11px] text-muted-foreground">
                        How quiet a sound must be to be considered silence. Lower values are
                        stricter.
                    </p>
                </div>

                {/* Min Silence Duration with Description */}
                <div className="space-y-2">
                    <PropSlider
                        label="Min Silence Duration"
                        value={minDuration}
                        onChange={onMinDurationChange}
                        min={0.05}
                        max={2}
                        step={0.05}
                        unit="s"
                    />
                    <p className="text-[11px] text-muted-foreground">
                        The minimum length of a pause to be removed.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default function RemoveSilenceAudioClient({}: { tool: BaseTool }) {
    const [files, setFiles] = useState<ProcessedFile[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const [threshold, setThreshold] = useState(-40);
    const [minDuration, setMinDuration] = useState(0.35);
    const [outputFormat, setOutputFormat] = useState<OutputFormat>("mp3");

    const fileInputRef = useRef<HTMLInputElement>(null);

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

    return (
        <ToolShell>
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Side: File Upload / File List (2/3 width) */}
                <div className="lg:col-span-2">
                    {files.length === 0 ? (
                        <FileUpload
                            accept="audio/*"
                            maxSizeMB={100}
                            multiple={true}
                            onFilesSelected={handleFileSelect}
                            allowedFormats={["mp3", "wav", "ogg", "m4a", "aac", "flac", "webm"]}
                        />
                    ) : (
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
                    )}
                </div>

                {/* Right Side: Settings Panel (1/3 width, sticky, disabled when no files) */}
                <div className="space-y-6">
                    <SilenceSettings
                        threshold={threshold}
                        minDuration={minDuration}
                        outputFormat={outputFormat}
                        onThresholdChange={setThreshold}
                        onMinDurationChange={setMinDuration}
                        onOutputFormatChange={handleFormatChange}
                        isDisabled={files.length === 0}
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
            </div>
        </ToolShell>
    );
}
