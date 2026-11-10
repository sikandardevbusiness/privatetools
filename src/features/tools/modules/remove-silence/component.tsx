"use client";

import { removeSilenceFromAudio } from "@sikandardevbusiness/remove-silence";
import { useState, useMemo, useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { FileList } from "@/features/tools/shared/components/uploads/file-list";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";
import { SilenceSettings } from "./settings";

import type { BaseTool } from "@/features/tools/shared/types";
import { useFileProcessor } from "@/features/tools/shared/hooks/use-file-processor";

type OutputFormat = "mp3" | "wav";

export default function RemoveSilenceAudioClient({ tool }: { tool: BaseTool }) {
    const [threshold, setThreshold] = useState(-40);
    const [minDuration, setMinDuration] = useState(0.35);
    const [outputFormat, setOutputFormat] = useState<OutputFormat>("mp3");

    // ✅ MEMOIZE: Guarantees the config object is stable and correctly formed.
    const processorConfig = useMemo(
        () => ({
            defaultFormat: outputFormat,
            getSupportedFormats: () => ["mp3", "wav"],
            processFile: async (
                file: File,
                targetFormat: string,
                updateProgress: (p: number) => void,
            ) => {
                const result = await removeSilenceFromAudio(
                    file,
                    threshold,
                    minDuration,
                    targetFormat as OutputFormat,
                    updateProgress,
                );
                return result.blob;
            },
            getOutputFileName: (originalName: string, targetFormat: string) => {
                return originalName.replace(/\.[^/.]+$/, "") + `_clean.${targetFormat}`;
            },
        }),
        [outputFormat, threshold, minDuration],
    );

    const processor = useFileProcessor(processorConfig);

    // Automatically reset completed files to "pending" when audio settings change
    useEffect(() => {
        processor.resetCompletedFiles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [threshold, minDuration, outputFormat]);

    // Update pending files and reset completed ones when global format changes
    const handleFormatChange = (newFormat: OutputFormat) => {
        setOutputFormat(newFormat);
        processor.updateAllPendingFormats(newFormat);
        processor.resetCompletedFiles();
    };

    return (
        <ToolShell>
            <ToolHeader tool={tool}>
                {processor.files.length === 0 ? (
                    <FileUpload
                        accept="audio/*"
                        maxSizeMB={100}
                        multiple={true}
                        onFilesSelected={processor.addFiles}
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

            {processor.files.length > 0 && (
                <div className="w-full max-w-4xl mx-auto space-y-6 px-4">
                    <FileList
                        files={processor.files}
                        isProcessing={processor.isProcessing}
                        acceptTypes="audio/*"
                        onFilesAdded={processor.addFiles}
                        onProcess={processor.processAll}
                        onRemoveFile={processor.removeFile}
                        onDownload={processor.downloadFile}
                        onProcessSingle={processor.processSingle}
                        onFormatChange={processor.updateFileFormat}
                        onDownloadAll={processor.downloadAll}
                        getSupportedFormats={processor.getSupportedFormatsForFile}
                    />
                </div>
            )}
        </ToolShell>
    );
}
