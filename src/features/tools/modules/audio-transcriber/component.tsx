"use client";

import { useRef, useState, useEffect, useMemo } from "react";
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
import type { ProgressUpdate, ExportFormat } from "@sikandardevbusiness/audio-transcriber";

import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { FileList } from "@/features/tools/shared/components/uploads/file-list";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";
import { TranscriberSettings, type TranscriptionTask } from "./settings";

import type { BaseTool } from "@/features/tools/shared/types";
import { useFileProcessor } from "@/features/tools/shared/hooks/use-file-processor";

export default function AudioTranscriberClient({ tool }: { tool: BaseTool }) {
    const [language, setLanguage] = useState<string>("auto");
    const [task, setTask] = useState<TranscriptionTask>("transcribe");
    const [wordsPerSegment, setWordsPerSegment] = useState<number>(8);
    const [modelId, setModelId] = useState<string>("Xenova/whisper-small");
    const [exportFormat, setExportFormat] = useState<ExportFormat>("srt");

    const transcriberRef = useRef<LocalTranscriber | null>(null);

    useEffect(() => {
        transcriberRef.current = new LocalTranscriber();
        return () => {
            transcriberRef.current?.destroy();
        };
    }, []);

    // MEMOIZE: Guarantees the config object is stable and correctly formed.
    // It only recreates when the actual settings change, preventing unnecessary re-renders.
    const processorConfig = useMemo(
        () => ({
            defaultFormat: exportFormat,
            getSupportedFormats: () => [...EXPORT_FORMATS],
            processFile: async (
                file: File,
                targetFormat: string,
                updateProgress: (p: number) => void,
            ) => {
                if (!transcriberRef.current) throw new Error("Transcriber not initialized");

                const result = await transcriberRef.current.transcribe(
                    file,
                    { modelId, language, task, wordsPerSegment, quantized: true, device: "wasm" },
                    (p: ProgressUpdate) => updateProgress(p.progress),
                );

                if (!result.text || result.text.trim() === "") {
                    throw new Error(
                        "Transcription returned empty text. The audio may be too quiet or contain no speech.",
                    );
                }

                const groupedSegments = groupWordsIntoSegments(result.segments, wordsPerSegment);
                const dynamicResult = { ...result, segments: groupedSegments };
                const fmt = targetFormat as ExportFormat;

                let content = "";
                switch (fmt) {
                    case "srt":
                        content = toSRT(dynamicResult);
                        break;
                    case "vtt":
                        content = toVTT(dynamicResult);
                        break;
                    case "txt":
                        content = toTXT(dynamicResult);
                        break;
                    case "json":
                        content = toJSON(dynamicResult);
                        break;
                    case "ass":
                        content = toASS(dynamicResult, {});
                        break;
                    case "csv":
                        content = toCSV(dynamicResult);
                        break;
                    default:
                        content = toTXT(dynamicResult);
                }

                // ✅ Return a Blob. The hook will automatically wrap it in a File with the correct name.
                return new Blob([content], { type: "text/plain" });
            },
            getOutputFileName: (originalName: string, targetFormat: string) => {
                const baseName = originalName.replace(/\.[^/.]+$/, "");
                const ext = targetFormat === "ass" ? "ass" : targetFormat;
                return `${baseName}_transcript.${ext}`;
            },
        }),
        [exportFormat, modelId, language, task, wordsPerSegment],
    );

    const processor = useFileProcessor(processorConfig);

    // ✅ Automatically reset completed files to "pending" when transcription settings change
    useEffect(() => {
        processor.resetCompletedFiles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modelId, language, task, wordsPerSegment, exportFormat]);

    // ✅ Update pending files when the global export format changes
    const handleExportFormatChange = (value: ExportFormat) => {
        setExportFormat(value);
        processor.updateAllPendingFormats(value);
    };

    return (
        <ToolShell>
            <ToolHeader tool={tool}>
                {processor.files.length === 0 ? (
                    <FileUpload
                        multiple={true}
                        onFilesSelected={processor.addFiles}
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

            {processor.files.length > 0 && (
                <div className="w-full max-w-4xl mx-auto space-y-6 px-4">
                    <FileList
                        files={processor.files}
                        isProcessing={processor.isProcessing}
                        acceptTypes="audio/*,video/*,.mp4,.mkv,.mov,.wav,.mp3,.webm,.aac,.ogg"
                        onFilesAdded={processor.addFiles}
                        onProcess={processor.processAll}
                        onRemoveFile={processor.removeFile}
                        onDownload={processor.downloadFile}
                        onProcessSingle={processor.processSingle}
                        onFormatChange={processor.updateFileFormat}
                        onDownloadAll={processor.downloadAll}
                        getSupportedFormats={processor.getSupportedFormatsForFile}
                        supportFormats={[...EXPORT_FORMATS]}
                    />
                </div>
            )}
        </ToolShell>
    );
}
