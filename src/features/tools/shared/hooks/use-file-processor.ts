"use client";

import { useState, useCallback } from "react";
import { saveAs } from "file-saver";

import type { ProcessedFile } from "@/features/tools/shared/types";
import { createAndDownloadZip, type ZipFile } from "@/lib/zip";

export interface FileProcessorConfig {
    defaultFormat: string;
    getSupportedFormats: (ext: string) => string[];
    processFile: (
        file: File,
        targetFormat: string,
        updateProgress: (progress: number) => void,
    ) => Promise<Blob>;
    getOutputFileName?: (originalName: string, targetFormat: string) => string;
    onSuccess?: (file: ProcessedFile, outputFile: File) => void;
    onError?: (file: ProcessedFile, error: Error) => void;
}

export function useFileProcessor(config: FileProcessorConfig) {
    const [files, setFiles] = useState<ProcessedFile[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const addFiles = useCallback(
        (newFiles: File[]) => {
            const processed: ProcessedFile[] = newFiles.map((file) => {
                const ext = file.name.split(".").pop()?.toLowerCase() || "";
                const supported = config.getSupportedFormats(ext);
                return {
                    id: crypto.randomUUID(),
                    file,
                    targetFormat:
                        config.defaultFormat || (supported.length > 0 ? supported[0] : "png"),
                    status: "pending",
                    progress: 0,
                };
            });
            setFiles((prev) => [...prev, ...processed]);
        },
        [config],
    );

    const removeFile = useCallback((id: string) => {
        setFiles((prev) => prev.filter((f) => f.id !== id));
    }, []);

    const updateFileFormat = useCallback((id: string, newFormat: string) => {
        setFiles((prev) =>
            prev.map((f) =>
                f.id === id
                    ? {
                          ...f,
                          targetFormat: newFormat,
                          status: "pending",
                          progress: 0,
                          outputBlob: undefined,
                          error: undefined,
                      }
                    : f,
            ),
        );
    }, []);

    const resetCompletedFiles = useCallback(() => {
        setFiles((prev) => {
            const needsReset = prev.some((f) => f.status === "completed" || f.status === "error");
            if (!needsReset) return prev; // Bail-out to prevent infinite loops

            return prev.map((f) =>
                f.status === "completed" || f.status === "error"
                    ? {
                          ...f,
                          status: "pending",
                          progress: 0,
                          outputBlob: undefined,
                          error: undefined,
                      }
                    : f,
            );
        });
    }, []);

    const processSingle = useCallback(
        async (id: string) => {
            const fileObj = files.find((f) => f.id === id);
            if (!fileObj || fileObj.status === "processing") return;

            setIsProcessing(true);
            setFiles((prev) =>
                prev.map((f) =>
                    f.id === id ? { ...f, status: "processing", progress: 0, error: undefined } : f,
                ),
            );

            try {
                // ✅ Directly uses config.processFile. No ref hacks, no stale closures.
                const blob = await config.processFile(
                    fileObj.file,
                    fileObj.targetFormat,
                    (prog) => {
                        setFiles((prev) =>
                            prev.map((f) => (f.id === id ? { ...f, progress: prog } : f)),
                        );
                    },
                );

                const defaultName =
                    fileObj.file.name.replace(/\.[^/.]+$/, "") +
                    `.${fileObj.targetFormat.toLowerCase()}`;
                const finalName = config.getOutputFileName
                    ? config.getOutputFileName(fileObj.file.name, fileObj.targetFormat)
                    : defaultName;
                const outputFile = new File([blob], finalName, { type: blob.type });

                setFiles((prev) =>
                    prev.map((f) =>
                        f.id === id
                            ? { ...f, status: "completed", progress: 100, outputBlob: outputFile }
                            : f,
                    ),
                );
                config.onSuccess?.(fileObj, outputFile);
            } catch (err) {
                const error = err instanceof Error ? err : new Error("Processing failed");
                setFiles((prev) =>
                    prev.map((f) =>
                        f.id === id
                            ? { ...f, status: "error", progress: 0, error: error.message }
                            : f,
                    ),
                );
                config.onError?.(fileObj, error);
            } finally {
                setFiles((prev) => {
                    if (!prev.some((f) => f.status === "processing")) setIsProcessing(false);
                    return prev;
                });
            }
        },
        [files, config], // ✅ 'config' is safely in the dependency array
    );

    const processAll = useCallback(async () => {
        const pendingFiles = files.filter((f) => f.status === "pending" || f.status === "error");
        if (pendingFiles.length === 0) return;

        setIsProcessing(true);
        for (const fileObj of pendingFiles) {
            await processSingle(fileObj.id);
        }
    }, [files, processSingle]);

    const downloadFile = useCallback(
        (id: string) => {
            const item = files.find((f) => f.id === id);
            if (!item?.outputBlob) return;
            saveAs(item.outputBlob, (item.outputBlob as File).name);
        },
        [files],
    );

    const downloadAll = useCallback(async () => {
        const completedFiles = files.filter((f) => f.status === "completed" && f.outputBlob);
        if (completedFiles.length === 0) return;
        if (completedFiles.length === 1) {
            downloadFile(completedFiles[0].id);
            return;
        }
        const zipFiles: ZipFile[] = completedFiles.map((item) => ({
            name: (item.outputBlob as File).name,
            content: item.outputBlob as Blob,
        }));
        await createAndDownloadZip(zipFiles, "processed-files.zip");
    }, [files, downloadFile]);

    const getSupportedFormatsForFile = useCallback(
        (file: File) => {
            const ext = file.name.split(".").pop()?.toLowerCase() || "";
            return config.getSupportedFormats(ext).map((f) => f.toLowerCase());
        },
        [config],
    );

    const updateAllPendingFormats = useCallback((newFormat: string) => {
        setFiles((prev) =>
            prev.map((f) =>
                f.status === "pending" || f.status === "error"
                    ? {
                          ...f,
                          targetFormat: newFormat,
                          progress: 0,
                          outputBlob: undefined,
                          error: undefined,
                      }
                    : f,
            ),
        );
    }, []);

    return {
        files,
        isProcessing,
        addFiles,
        removeFile,
        processAll,
        downloadAll,
        downloadFile,
        processSingle,
        updateFileFormat,
        resetCompletedFiles,
        updateAllPendingFormats,
        getSupportedFormatsForFile,
    };
}
