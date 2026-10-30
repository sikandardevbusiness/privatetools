"use client";

import { saveAs } from "file-saver";
import { Archive } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ImageCard } from "@/features/tools/shared/components/image-card";
import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";

import type { BaseTool, ProcessedFile } from "@/features/tools/shared/types";
import { resizeImageToSizes } from "@/lib/image-resizer";
import { createAndDownloadZip, type ZipFile } from "@/lib/zip";

const EMOTE_SIZES = [
    { size: 128, label: "128×128", platform: "Discord" },
    { size: 112, label: "112×112", platform: "Twitch" },
    { size: 56, label: "56×56", platform: "Twitch" },
    { size: 28, label: "28×28", platform: "Twitch" },
];

interface EmoteFile extends ProcessedFile {
    resizedBlobs: Record<number, Blob>;
}

export default function EmoteResizerClient({ tool }: { tool: BaseTool }) {
    const [currentFile, setCurrentFile] = useState<EmoteFile | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [zipping, setZipping] = useState(false);

    const processFile = async (file: File) => {
        setIsProcessing(true);
        try {
            const sizes = EMOTE_SIZES.map((s) => ({ width: s.size, height: s.size }));
            const blobs = await resizeImageToSizes(file, sizes, { format: "png", quality: 0.9 });

            const resizedBlobs: Record<number, Blob> = {};
            blobs.forEach((blob, index) => {
                const size = EMOTE_SIZES[index].size;
                resizedBlobs[size] = blob;
            });

            setCurrentFile({
                id: crypto.randomUUID(),
                file,
                targetFormat: "png",
                status: "completed",
                progress: 100,
                resizedBlobs,
            });
        } catch {
            setCurrentFile({
                id: crypto.randomUUID(),
                file,
                targetFormat: "png",
                status: "error",
                progress: 0,
                error: "Failed to process image",
                resizedBlobs: {},
            });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleFileSelect = (selectedFiles: File[]) => {
        if (selectedFiles.length > 0) {
            void processFile(selectedFiles[0]);
        }
    };

    const downloadZip = async () => {
        if (!currentFile || currentFile.status !== "completed") return;
        setZipping(true);
        try {
            const name = currentFile.file.name.replace(/\.[^/.]+$/, "");
            const zipFiles: ZipFile[] = EMOTE_SIZES.map(({ size }) => ({
                name: `${name}_${size}x${size}.png`,
                content: currentFile.resizedBlobs[size],
            })).filter((zf) => zf.content);

            await createAndDownloadZip(zipFiles, `${name}_emotes.zip`);
        } finally {
            setZipping(false);
        }
    };

    const downloadSize = (size: number) => {
        if (!currentFile?.resizedBlobs[size]) return;
        const name = currentFile.file.name.replace(/\.[^/.]+$/, "");
        saveAs(currentFile.resizedBlobs[size], `${name}_${size}x${size}.png`);
    };

    return (
        <ToolShell>
            <ToolHeader title={tool.name} description={tool.description}>
                {!currentFile ? (
                    <FileUpload
                        accept="image/*"
                        maxSizeMB={10}
                        multiple={false}
                        onFilesSelected={handleFileSelect}
                        allowedFormats={["png", "jpg", "jpeg", "webp"]}
                    />
                ) : (
                    <ImageCard
                        index={0}
                        file={currentFile.file}
                        disabledRemove={true}
                        disabledCheckbox={true}
                        onDownload={downloadZip}
                    />
                )}
            </ToolHeader>

            {currentFile && currentFile.status === "completed" && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 pt-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                            <Archive className="w-4 h-4 text-primary" />
                            Resized Emote Outputs
                        </div>
                        <Button
                            onClick={downloadZip}
                            disabled={zipping || isProcessing}
                            className="gap-2"
                        >
                            <Archive className="w-4 h-4" />
                            {zipping ? "Preparing ZIP..." : "Download All Sizes (ZIP)"}
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {EMOTE_SIZES.map(({ size }, index) => {
                            const blob = currentFile.resizedBlobs[size];
                            if (!blob) return null;

                            const baseName = currentFile.file.name.replace(/\.[^/.]+$/, "");
                            const resizedFile = new File(
                                [blob],
                                `${baseName}_${size}x${size}.png`,
                                { type: "image/png" },
                            );

                            return (
                                <ImageCard
                                    key={size}
                                    index={index}
                                    file={resizedFile}
                                    disabledRemove={true}
                                    disabledCheckbox={true}
                                    onDownload={() => downloadSize(size)}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </ToolShell>
    );
}
