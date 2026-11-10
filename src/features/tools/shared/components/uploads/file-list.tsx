"use client";

import { useRef } from "react";
import { Download, RotateCw, Upload, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { FileItem } from "./file-item";

import type { ProcessedFile } from "@/features/tools/shared/types";
import { cn } from "@/lib/utils";

export function FileList({
    files,
    selectedId,
    acceptTypes,
    supportFormats,
    isProcessing = false,
    onProcess,
    onDownload,
    onRemoveFile,
    onSelectFile,
    onDownloadAll,
    onFilesAdded,
    onFormatChange,
    onProcessSingle,
    getSupportedFormats,
}: {
    acceptTypes?: string;
    files: ProcessedFile[];
    isProcessing?: boolean;
    supportFormats?: string[];
    selectedId?: string | null;
    onProcess?: () => void;
    onDownloadAll?: () => void;
    onDownload?: (id: string) => void;
    onRemoveFile: (id: string) => void;
    onSelectFile?: (id: string) => void;
    onFilesAdded?: (files: File[]) => void;
    onProcessSingle?: (id: string) => void;
    getSupportedFormats?: (file: File) => string[];
    onFormatChange?: (id: string, format: string) => void;
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const completedCount = files.filter((f) => f.status === "completed").length;
    const pendingCount = files.filter((f) => f.status === "pending" || f.status === "error").length;
    const hasDownloadAll = completedCount > 0;

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0 && onFilesAdded) {
            onFilesAdded(Array.from(e.target.files));
            e.target.value = ""; // Reset input for re-selection
        }
    };

    return (
        <section className="max-w-4xl mx-auto px-4 sm:px-0 space-y-6 pt-12">
            {acceptTypes && onFilesAdded && (
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept={acceptTypes}
                    className="hidden"
                    onChange={handleFileSelect}
                />
            )}

            {/* Sticky Action Bar */}
            {onProcess && onFilesAdded && (
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <ButtonGroup className="w-full sm:w-auto">
                        <Button
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isProcessing}
                            className="flex-1 sm:flex-none"
                        >
                            <Upload className="w-4 h-4" /> Add More
                        </Button>
                    </ButtonGroup>

                    {hasDownloadAll && (
                        <Button
                            variant="outline"
                            onClick={onDownloadAll}
                            disabled={isProcessing}
                            className="flex-1 sm:flex-none"
                        >
                            <Download className="w-4 h-4" /> Download All
                        </Button>
                    )}

                    <Button
                        onClick={onProcess}
                        disabled={isProcessing || pendingCount === 0}
                        className="flex-1 sm:flex-none bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                        {isProcessing ? (
                            <>
                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <Zap className="w-4 h-4" />{" "}
                                {pendingCount === files.length
                                    ? "Process All"
                                    : "Process Remaining"}
                            </>
                        )}
                    </Button>
                </div>
            )}

            {/* File List */}
            <div className="space-y-3">
                {files.map((item) => (
                    <FileItem
                        key={item.id}
                        item={item}
                        onSelect={onSelectFile}
                        onRemove={onRemoveFile}
                        onFormatChange={onFormatChange}
                        supportedFormats={
                            getSupportedFormats ? getSupportedFormats(item.file) : supportFormats
                        }
                        isSelected={selectedId === item.id}
                    >
                        {item.status === "completed" && onDownload ? (
                            <Button
                                variant="default"
                                onClick={() => onDownload(item.id)}
                                className="gap-2"
                            >
                                <Download className="w-4 h-4" /> Download
                            </Button>
                        ) : (
                            onProcessSingle && (
                                <Button
                                    variant="outline"
                                    onClick={() => onProcessSingle(item.id)}
                                    disabled={item.status === "processing"}
                                    className="gap-2 min-w-25"
                                >
                                    <RotateCw
                                        className={cn(
                                            "w-4 h-4",
                                            item.status === "processing" && "animate-spin",
                                        )}
                                    />
                                    {item.outputBlob ? "Reprocess" : "Process"}
                                </Button>
                            )
                        )}
                    </FileItem>
                ))}
            </div>
        </section>
    );
}
