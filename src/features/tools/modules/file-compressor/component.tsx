"use client";

import {
    compressor,
    type CompressorOptions,
    type Preset,
} from "@sikandardevbusiness/file-compressor";
import { useState, useEffect, useMemo } from "react";

import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { FileList } from "@/features/tools/shared/components/uploads/file-list";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";
import { CompressionSettings, type SizeUnit } from "./settings";

import type { BaseTool } from "@/features/tools/shared/types";
import { fileCompressorToolConfigMap } from "./index";
import { useFileProcessor } from "@/features/tools/shared/hooks/use-file-processor";

export default function FileCompressorClient({ tool }: { tool: BaseTool }) {
    const config = fileCompressorToolConfigMap[tool.id];

    const [qualityPreset, setQualityPreset] = useState<Preset>("default");

    const initialTargetSize = config.defaultTargetSizeKB
        ? config.defaultTargetSizeKB >= 1024
            ? (config.defaultTargetSizeKB / 1024).toString()
            : config.defaultTargetSizeKB.toString()
        : "";
    const initialSizeUnit: SizeUnit =
        config.defaultTargetSizeKB && config.defaultTargetSizeKB >= 1024 ? "mb" : "kb";

    const [targetSize, setTargetSize] = useState<string>(initialTargetSize);
    const [sizeUnit, setSizeUnit] = useState<SizeUnit>(initialSizeUnit);

    const processorConfig = useMemo(
        () => ({
            defaultFormat: config.defaultFormat,
            getSupportedFormats: (ext: string) => compressor.getSupportedOutputFormats(ext),
            processFile: async (
                file: File,
                targetFormat: string,
                updateProgress: (p: number) => void,
            ) => {
                const target = parseFloat(targetSize);
                let targetSizeKB: number | undefined = undefined;
                if (!isNaN(target) && target > 0) {
                    targetSizeKB = sizeUnit === "mb" ? target * 1024 : target;
                }
                const options: CompressorOptions = { targetSizeKB, preset: qualityPreset };
                return await compressor.convert(
                    file,
                    targetFormat.toLowerCase(),
                    options,
                    updateProgress,
                );
            },
            getOutputFileName: (originalName: string, targetFormat: string) => {
                const ext =
                    targetFormat.toLowerCase() === "jpeg" ? "jpg" : targetFormat.toLowerCase();
                return originalName.replace(/\.[^/.]+$/, "") + `-compressed.${ext}`;
            },
        }),
        [config.defaultFormat, targetSize, sizeUnit, qualityPreset],
    );

    const processor = useFileProcessor(processorConfig);

    // Automatically reset completed files to "pending" when settings change
    useEffect(() => {
        processor.resetCompletedFiles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [qualityPreset, targetSize, sizeUnit]);

    return (
        <ToolShell>
            <ToolHeader tool={tool}>
                {processor.files.length === 0 ? (
                    <FileUpload
                        multiple={true}
                        onFilesSelected={processor.addFiles}
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

            {processor.files.length > 0 && (
                <div className="w-full max-w-4xl mx-auto space-y-6 px-4">
                    <FileList
                        files={processor.files}
                        isProcessing={processor.isProcessing}
                        acceptTypes={config.acceptType}
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
