"use client";

import { saveAs } from "file-saver";
import { Archive, FileImage, RotateCcw } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ImageCard } from "@/features/tools/shared/components/image-card";
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

export default function EmoteResizerClient({}: { tool: BaseTool }) {
    const [currentFile, setCurrentFile] = useState<EmoteFile | null>(null);
    const [, setIsProcessing] = useState(false);
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

    const reset = () => {
        setCurrentFile(null);
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

    // Single File Editor UI
    return (
        <ToolShell>
            {!currentFile ? (
                <FileUpload
                    accept="image/*"
                    maxSizeMB={10}
                    multiple={false}
                    onFilesSelected={handleFileSelect}
                    allowedFormats={["png", "jpg", "jpeg", "webp"]}
                />
            ) : (
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Header Actions */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Resizing: {currentFile.file.name}</h2>
                        <Button variant="outline" onClick={reset} className="gap-2">
                            <RotateCcw className="w-4 h-4" /> Upload New File
                        </Button>
                    </div>

                    {/* Original Image Card */}
                    <ImageCard
                        index={0}
                        onRemove={reset}
                        isSelected={true}
                        file={currentFile.file}
                        disabledCheckbox={true}
                        onDownload={downloadZip}
                    />

                    {/* Resized Outputs Grid using ImageCard */}
                    {currentFile.status === "completed" && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold flex items-center gap-2">
                                    <FileImage className="w-4 h-4 text-primary" />
                                    Resized Outputs
                                </h3>
                                <Button onClick={downloadZip} disabled={zipping} className="gap-2">
                                    <Archive className="w-4 h-4" />
                                    {zipping ? "Preparing ZIP..." : "Download All Sizes (ZIP)"}
                                </Button>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {EMOTE_SIZES.map(({ size }, index) => {
                                    const blob = currentFile.resizedBlobs[size];
                                    if (!blob) return null;

                                    // Create a File object from the Blob so ImageCard can render it perfectly
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
                </div>
            )}
        </ToolShell>
    );
}
