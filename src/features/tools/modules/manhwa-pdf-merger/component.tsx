"use client";

import { useState, useCallback, useRef } from "react";
import { saveAs } from "file-saver";
import { Plus } from "lucide-react";
import type { BaseTool } from "@/features/tools/shared/types";
import { mergeImagesToPdf, type MergeToPdfOptions } from "@sikandardevbusiness/manhwa-toolkit";

import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
} from "@dnd-kit/sortable";

import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";
import { Button } from "@/components/ui/button";
import { ImageCard } from "@/features/tools/shared/components/image-card";

import { manhwaPdfMergerToolConfigMap } from "./index";
import { MergerSettings } from "./settings";

interface MergedFile {
    id: string;
    file: File;
}

export default function ManhwaPdfMergerClient({ tool }: { tool: BaseTool }) {
    const [files, setFiles] = useState<MergedFile[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isMerged, setIsMerged] = useState(false);
    const [mergedBlob, setMergedBlob] = useState<Blob | null>(null);
    const [mergedFileName, setMergedFileName] = useState<string>("");

    // Inside ManhwaPdfMergerClient component:
    const config = manhwaPdfMergerToolConfigMap[tool.id];

    // 3. Initialize state using the config values
    const [singlePage, setSinglePage] = useState(config.singlePage);
    const [quality, setQuality] = useState(config.quality);
    const [scaleFactor, setScaleFactor] = useState(config.scaleFactor);
    const [pageSize, setPageSize] = useState<"original" | "a4">(config.pageSize);
    const [imagesPerPage, setImagesPerPage] = useState(config.imagesPerPage);
    const [marginX, setMarginX] = useState(config.marginX);
    const [marginY, setMarginY] = useState(config.marginY);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    );

    const handleFileSelect = useCallback((selectedFiles: File[]) => {
        const imageFiles = selectedFiles.filter((f) => f.type.startsWith("image/"));
        const newFiles: MergedFile[] = imageFiles.map((file) => ({
            id: crypto.randomUUID(),
            file,
        }));

        newFiles.sort((a, b) =>
            a.file.name.localeCompare(b.file.name, undefined, { numeric: true }),
        );
        setFiles((prev) => [...prev, ...newFiles]);
        setIsMerged(false);
        setMergedBlob(null);
    }, []);

    const removeFile = useCallback((id: string) => {
        setFiles((prev) => prev.filter((f) => f.id !== id));
        setIsMerged(false);
        setMergedBlob(null);
    }, []);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setFiles((items) => {
                const oldIndex = items.findIndex((i) => i.id === active.id);
                const newIndex = items.findIndex((i) => i.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleReset = useCallback(() => {
        setFiles([]);
        setIsMerged(false);
        setMergedBlob(null);
        setSinglePage(true);
        setQuality(100);
        setPageSize("original");
        setScaleFactor(0.4);
        setImagesPerPage(1);
        setMarginX(0);
        setMarginY(0);
    }, []);

    const handleMerge = async () => {
        if (files.length === 0) return;
        setIsProcessing(true);
        setProgress(0);

        try {
            const options: MergeToPdfOptions = {
                singlePage, // Pass the singlePage boolean
                pageSize,
                scaleFactor,
                imagesPerPage,
                marginX,
                marginY,
                quality: quality / 100,
            };

            const result = await mergeImagesToPdf(
                files.map((f) => f.file),
                options,
                (p) => setProgress(p),
            );

            const fileName =
                files.length > 1
                    ? `${files[0].file.name.replace(/\.[^/.]+$/, "")}_merged.pdf`
                    : `${files[0].file.name.replace(/\.[^/.]+$/, "")}.pdf`;

            setMergedBlob(result.pdfBlob);
            setMergedFileName(fileName);
            setIsMerged(true);

            saveAs(result.pdfBlob, fileName);
        } catch (error) {
            console.error("Merge failed:", error);
            alert("Failed to merge images. Please ensure they are valid image files.");
        } finally {
            setIsProcessing(false);
            setProgress(0);
        }
    };

    const handleDownload = () => {
        if (mergedBlob) {
            saveAs(mergedBlob, mergedFileName);
        }
    };

    const handleIndividualDownload = (file: File) => {
        saveAs(file, file.name);
    };

    return (
        <ToolShell>
            <ToolHeader tool={tool}>
                {files.length === 0 ? (
                    <FileUpload
                        multiple={true}
                        onFilesSelected={handleFileSelect}
                        accept="image/png, image/jpeg, image/webp"
                        allowedFormats={["png", "jpg", "jpeg", "webp"]}
                    />
                ) : (
                    <MergerSettings
                        singlePage={singlePage}
                        setSinglePage={setSinglePage}
                        pageSize={pageSize}
                        quality={quality}
                        isProcessing={isProcessing}
                        isMerged={isMerged}
                        progress={progress}
                        scaleFactor={scaleFactor}
                        imagesPerPage={imagesPerPage}
                        marginX={marginX}
                        marginY={marginY}
                        setScaleFactor={setScaleFactor}
                        setImagesPerPage={setImagesPerPage}
                        setMarginX={setMarginX}
                        setMarginY={setMarginY}
                        setPageSize={setPageSize}
                        setQuality={setQuality}
                        onMerge={handleMerge}
                        onDownload={handleDownload}
                        onReset={handleReset}
                    />
                )}
            </ToolHeader>

            {files.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
                    <div className="flex items-center justify-between pb-4">
                        <h3 className="text-lg font-semibold text-foreground">Images</h3>
                        <Button
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isProcessing}
                        >
                            <Plus />
                            Add File
                        </Button>
                    </div>

                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={files.map((f) => f.id)}
                            strategy={rectSortingStrategy}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {files.map((item, index) => (
                                    <ImageCard
                                        key={item.id}
                                        id={item.id}
                                        file={item.file}
                                        index={index}
                                        draggable={true}
                                        disabledCheckbox={true}
                                        disabledDownload={true}
                                        disabledRemove={isProcessing}
                                        onRemove={() => removeFile(item.id)}
                                        onDownload={() => handleIndividualDownload(item.file)}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>

                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/png, image/jpeg, image/webp"
                        className="hidden"
                        onChange={(e) => {
                            if (e.target.files) {
                                handleFileSelect(Array.from(e.target.files));
                                e.target.value = "";
                            }
                        }}
                    />
                </div>
            )}
        </ToolShell>
    );
}
