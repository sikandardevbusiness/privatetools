"use client";

import { Download, RotateCw, Upload, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { FileItem } from "./file-item";

import type { ProcessedFile } from "@/features/tools/shared/types";
import { cn } from "@/lib/utils";

export function FileList({
    files,
    supportedFormats,
    isProcessing = false,
    onProcess,
    onRemoveFile,
    onDownload,
    onDownloadAll,
    onAddMoreFiles,
    onFormatChange,
    onProcessSingle,
    selectedId,
    onSelectFile,
}: {
    files: ProcessedFile[];
    isProcessing?: boolean;
    selectedId?: string | null;
    supportedFormats?: string[];
    onProcess?: () => void;
    onDownloadAll?: () => void;
    onAddMoreFiles?: () => void;
    onDownload?: (id: string) => void;
    onRemoveFile: (id: string) => void;
    onSelectFile?: (id: string) => void;
    onProcessSingle?: (id: string) => void;
    onFormatChange?: (id: string, format: string) => void;
}) {
    const completedCount = files.filter((f) => f.status === "completed").length;
    const pendingCount = files.filter((f) => f.status === "pending" || f.status === "error").length;
    const hasDownloadAll = completedCount > 0;

    return (
        <section className="max-w-4xl mx-auto px-4 sm:px-0 space-y-6">
            {/* Sticky Action Bar */}
            {onProcess && onAddMoreFiles && (
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <ButtonGroup className="w-full sm:w-auto">
                        <Button
                            variant="outline"
                            onClick={onAddMoreFiles}
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
                                <Zap className="w-4 h-4" /> Process All
                            </>
                        )}
                    </Button>
                </div>
            )}

            {/* File List */}
            <div className="space-y-3">
                {files.map((item) => {
                    const isDisabled = item.status === "processing" || item.status === "completed";

                    return (
                        <FileItem
                            key={item.id}
                            item={item}
                            onRemove={onRemoveFile}
                            onFormatChange={onFormatChange}
                            supportedFormats={supportedFormats}
                            isSelected={selectedId === item.id}
                            onSelect={onSelectFile}
                        >
                            {item.status === "completed" ? (
                                <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() => onDownload?.(item.id)}
                                    className="gap-2"
                                >
                                    <Download className="w-4 h-4" />
                                    Download
                                </Button>
                            ) : (
                                onProcessSingle && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onProcessSingle(item.id)}
                                        disabled={isDisabled}
                                        className="gap-2 min-w-25"
                                    >
                                        <RotateCw
                                            className={cn(
                                                "w-4 h-4",
                                                item.status === "processing" && "animate-spin",
                                            )}
                                        />
                                        {item.status === "processing" ? "Processing" : "Process"}
                                    </Button>
                                )
                            )}
                        </FileItem>
                    );
                })}
            </div>
        </section>
    );
}
