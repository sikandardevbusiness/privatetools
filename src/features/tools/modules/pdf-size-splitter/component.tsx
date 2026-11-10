"use client";

import { useState, useMemo, useEffect } from "react";
import JSZip from "jszip";
import { splitPdfBySize } from "@sikandardevbusiness/pdf-toolkit";

import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { FileList } from "@/features/tools/shared/components/uploads/file-list";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";

import { SplitterSettings, type SizeUnit } from "./settings";
import type { BaseTool } from "@/features/tools/shared/types";
import { useFileProcessor } from "@/features/tools/shared/hooks/use-file-processor";

export default function PdfSizeSplitterClient({ tool }: { tool: BaseTool }) {
    const [sizeUnit, setSizeUnit] = useState<SizeUnit>("mb");
    const [targetSize, setTargetSize] = useState<string>("10");

    // MEMOIZE: Guarantees the config object is stable and correctly formed.
    const processorConfig = useMemo(
        () => ({
            defaultFormat: "zip",
            getSupportedFormats: () => ["zip"],
            processFile: async (
                file: File,
                _targetFormat: string,
                updateProgress: (p: number) => void,
            ) => {
                const maxSizeMB =
                    sizeUnit === "mb" ? parseFloat(targetSize) : parseFloat(targetSize) / 1024;

                // 1. Split the PDF
                const splitResults = await splitPdfBySize(file, maxSizeMB, (prog) => {
                    updateProgress(prog);
                });

                // 2. Zip the resulting parts into a single Blob
                const tempZip = new JSZip();
                const baseName = file.name.replace(/\.pdf$/i, "");
                splitResults.forEach((r) => tempZip.file(`${baseName}-${r.fileName}`, r.blob));

                return await tempZip.generateAsync({ type: "blob", compression: "STORE" });
            },
            getOutputFileName: (originalName: string) => {
                return originalName.replace(/\.pdf$/i, "") + "-parts.zip";
            },
        }),
        [targetSize, sizeUnit],
    );

    const processor = useFileProcessor(processorConfig);

    // Automatically reset completed files to "pending" when split settings change
    useEffect(() => {
        processor.resetCompletedFiles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetSize, sizeUnit]);

    return (
        <ToolShell>
            <ToolHeader tool={tool}>
                {processor.files.length === 0 ? (
                    <FileUpload
                        multiple={true}
                        onFilesSelected={processor.addFiles}
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

            {processor.files.length > 0 && (
                <div className="w-full max-w-4xl mx-auto space-y-6 px-4">
                    <FileList
                        files={processor.files}
                        isProcessing={processor.isProcessing}
                        acceptTypes="application/pdf"
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
