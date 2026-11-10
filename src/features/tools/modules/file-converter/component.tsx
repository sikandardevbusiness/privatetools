"use client";

import { converter } from "@sikandardevbusiness/file-converter";
import { useMemo } from "react";

import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { FileList } from "@/features/tools/shared/components/uploads/file-list";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";

import type { BaseTool } from "@/features/tools/shared/types";
import { fileConverterToolConfigMap } from "./index";
import { useFileProcessor } from "@/features/tools/shared/hooks/use-file-processor";

export default function FileConverterClient({ tool }: { tool: BaseTool }) {
    const config = fileConverterToolConfigMap[tool.id];

    const processorConfig = useMemo(
        () => ({
            defaultFormat: config.defaultFormat,
            getSupportedFormats: (ext: string) => converter.getSupportedOutputFormats(ext),
            processFile: async (
                file: File,
                targetFormat: string,
                updateProgress: (p: number) => void,
            ) => {
                return await converter.convert(
                    file,
                    targetFormat.toLowerCase(),
                    {},
                    updateProgress,
                );
            },
            getOutputFileName: (originalName: string, targetFormat: string) => {
                return originalName.replace(/\.[^/.]+$/, "") + `.${targetFormat.toLowerCase()}`;
            },
        }),
        [config.defaultFormat],
    );

    const processor = useFileProcessor(processorConfig);

    return (
        <ToolShell>
            <ToolHeader tool={tool}>
                <FileUpload
                    multiple={true}
                    onFilesSelected={processor.addFiles}
                    accept={config.acceptType}
                    allowedFormats={config.inputFormats}
                />
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
