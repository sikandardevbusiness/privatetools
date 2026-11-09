"use client";

import { useRef, useState, useEffect } from "react";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import {
    LocalTranscriber,
    EXPORT_FORMATS,
    toSRT,
    toVTT,
    toTXT,
    toJSON,
    toASS,
    toCSV,
    groupWordsIntoSegments,
} from "@sikandardevbusiness/audio-transcriber";
import type {
    TranscriptionResult,
    ProgressUpdate,
    ExportFormat,
} from "@sikandardevbusiness/audio-transcriber";

import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { FileList } from "@/features/tools/shared/components/uploads/file-list";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";
import { TranscriberSettings, type TranscriptionTask } from "./settings";

import type { BaseTool, ProcessedFile } from "@/features/tools/shared/types";

interface TranscribedFile extends ProcessedFile {
    transcriptionResult?: TranscriptionResult;
}

export default function AudioTranscriberClient({ tool }: { tool: BaseTool }) {
    const [files, setFiles] = useState<TranscribedFile[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const [language, setLanguage] = useState<string>("en");
    const [task, setTask] = useState<TranscriptionTask>("transcribe");
    const [wordsPerSegment, setWordsPerSegment] = useState<number>(8);
    const [modelId, setModelId] = useState<string>("Xenova/whisper-small");
    const [exportFormat, setExportFormat] = useState<ExportFormat>("srt");

    const transcriberRef = useRef<LocalTranscriber | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        transcriberRef.current = new LocalTranscriber();
        return () => {
            transcriberRef.current?.destroy();
        };
    }, []);

    const handleFileSelect = (selectedFiles: File[]) => {
        const newFiles: TranscribedFile[] = selectedFiles.map((file) => ({
            id: crypto.randomUUID(),
            file,
            targetFormat: exportFormat,
            status: "pending",
            progress: 0,
        }));
        setFiles((prev) => [...prev, ...newFiles]);
    };

    const removeFile = (id: string) => {
        setFiles((prev) => prev.filter((f) => f.id !== id));
    };

    const handleExportFormatChange = (value: ExportFormat) => {
        setExportFormat(value);
        setFiles((prev) =>
            prev.map((f) =>
                f.status === "pending" || f.status === "error" ? { ...f, targetFormat: value } : f,
            ),
        );
    };

    const handleFileFormatChange = (id: string, format: string) => {
        setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, targetFormat: format } : f)));
    };

    const processFiles = async () => {
        const pendingFiles = files.filter((f) => f.status === "pending" || f.status === "error");
        if (pendingFiles.length === 0 || !transcriberRef.current) return;

        setIsProcessing(true);

        for (const fileObj of pendingFiles) {
            setFiles((prev) =>
                prev.map((f) =>
                    f.id === fileObj.id
                        ? {
                              ...f,
                              status: "processing",
                              progress: 0,
                              targetFormat: fileObj.targetFormat,
                          }
                        : f,
                ),
            );

            try {
                const result = await transcriberRef.current.transcribe(
                    fileObj.file,
                    {
                        modelId,
                        language,
                        task,
                        wordsPerSegment,
                        quantized: true,
                        device: "wasm",
                    },
                    (p: ProgressUpdate) => {
                        setFiles((prev) =>
                            prev.map((f) =>
                                f.id === fileObj.id ? { ...f, progress: p.progress } : f,
                            ),
                        );
                    },
                );

                if (!result.text || result.text.trim() === "") {
                    throw new Error(
                        "Transcription returned empty text. The audio may be too quiet or contain no speech.",
                    );
                }

                setFiles((prev) =>
                    prev.map((f) =>
                        f.id === fileObj.id
                            ? {
                                  ...f,
                                  status: "completed",
                                  progress: 100,
                                  transcriptionResult: result,
                              }
                            : f,
                    ),
                );
            } catch (err) {
                const msg = err instanceof Error ? err.message : "Transcription failed";
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
        if (!fileObj || !transcriberRef.current) return;

        setIsProcessing(true);
        setFiles((prev) =>
            prev.map((f) => (f.id === id ? { ...f, status: "processing", progress: 0 } : f)),
        );

        try {
            const result = await transcriberRef.current.transcribe(
                fileObj.file,
                { modelId, language, task, wordsPerSegment, quantized: true, device: "wasm" },
                (p: ProgressUpdate) => {
                    setFiles((prev) =>
                        prev.map((f) => (f.id === id ? { ...f, progress: p.progress } : f)),
                    );
                },
            );

            setFiles((prev) =>
                prev.map((f) =>
                    f.id === id
                        ? { ...f, status: "completed", progress: 100, transcriptionResult: result }
                        : f,
                ),
            );
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Transcription failed";
            setFiles((prev) =>
                prev.map((f) =>
                    f.id === id ? { ...f, status: "error", progress: 0, error: msg } : f,
                ),
            );
        }
        setIsProcessing(false);
    };

    const generateTranscriptContent = (result: TranscriptionResult, fmt: ExportFormat) => {
        const groupedSegments = groupWordsIntoSegments(result.segments, wordsPerSegment);
        const dynamicResult = { ...result, segments: groupedSegments };

        switch (fmt) {
            case "srt":
                return toSRT(dynamicResult);
            case "vtt":
                return toVTT(dynamicResult);
            case "txt":
                return toTXT(dynamicResult);
            case "json":
                return toJSON(dynamicResult);
            case "ass":
                return toASS(dynamicResult, {});
            case "csv":
                return toCSV(dynamicResult);
            default:
                return toTXT(dynamicResult);
        }
    };

    const handleDownload = (id: string) => {
        const item = files.find((f) => f.id === id);
        if (!item?.transcriptionResult) return;

        const fmt = (item.targetFormat as ExportFormat) || exportFormat;
        const content = generateTranscriptContent(item.transcriptionResult, fmt);
        const baseName = item.file.name.replace(/\.[^/.]+$/, "");
        const ext = fmt === "ass" ? "ass" : fmt;

        const blob = new Blob([content], { type: "text/plain" });
        saveAs(blob, `${baseName}_transcript.${ext}`);
    };

    const handleDownloadAll = async () => {
        const completedFiles = files.filter(
            (f) => f.status === "completed" && f.transcriptionResult,
        );
        if (completedFiles.length === 0) return;

        if (completedFiles.length === 1) {
            handleDownload(completedFiles[0].id);
            return;
        }

        const zip = new JSZip();
        for (const item of completedFiles) {
            if (!item.transcriptionResult) continue;

            const baseName = item.file.name.replace(/\.[^/.]+$/, "");
            const fmt = (item.targetFormat as ExportFormat) || exportFormat;
            const content = generateTranscriptContent(item.transcriptionResult, fmt);
            const ext = fmt === "ass" ? "ass" : fmt;

            zip.file(`${baseName}_transcript.${ext}`, content);
        }

        const zipBlob = await zip.generateAsync({ type: "blob" });
        saveAs(zipBlob, `transcripts_${exportFormat}.zip`);
    };

    return (
        <ToolShell>
            <ToolHeader tool={tool}>
                {files.length === 0 ? (
                    <FileUpload
                        multiple={true}
                        onFilesSelected={handleFileSelect}
                        accept="audio/*,video/*,.mp4,.mkv,.mov,.wav,.mp3,.webm,.aac,.ogg"
                        allowedFormats={["mp3", "wav", "mp4", "webm", "mov", "mkv", "aac", "ogg"]}
                    />
                ) : (
                    <TranscriberSettings
                        modelId={modelId}
                        setModelId={setModelId}
                        language={language}
                        setLanguage={setLanguage}
                        task={task}
                        setTask={setTask}
                        wordsPerSegment={wordsPerSegment}
                        setWordsPerSegment={setWordsPerSegment}
                        exportFormat={exportFormat}
                        setExportFormat={handleExportFormatChange}
                    />
                )}
            </ToolHeader>

            {files.length > 0 && (
                <div className="w-full max-w-4xl mx-auto space-y-6 px-4">
                    <FileList
                        files={files}
                        supportedFormats={[...EXPORT_FORMATS]}
                        onProcess={processFiles}
                        onRemoveFile={removeFile}
                        onDownload={handleDownload}
                        isProcessing={isProcessing}
                        onProcessSingle={processSingle}
                        onDownloadAll={handleDownloadAll}
                        onAddMoreFiles={() => fileInputRef.current?.click()}
                        onFormatChange={handleFileFormatChange}
                    />
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="audio/*,video/*,.mp4,.mkv,.mov,.wav,.mp3,.webm"
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
