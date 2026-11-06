"use client";

import { useState } from "react";
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
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Download, Loader2, Plus } from "lucide-react";
import { AudioTrack, type Track, mergeAudioFiles } from "@sikandardevbusiness/audio-toolkit";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";

import type { BaseTool } from "@/features/tools/shared/types";

// Sortable wrapper for drag-and-drop
function SortableTrack({ track, onRemove }: { track: Track; onRemove: (id: string) => void }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: track.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style}>
            <AudioTrack
                track={track}
                draggable={true}
                onRemove={onRemove}
                isDragging={isDragging}
                dragListeners={listeners}
                dragAttributes={attributes}
            />
        </div>
    );
}

export default function AudioMergerClient({ tool }: { tool: BaseTool }) {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [isMerging, setIsMerging] = useState(false);
    const [progress, setProgress] = useState(0);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    );

    const handleFilesSelected = (files: File[]) => {
        const newTracks: Track[] = files.map((file) => ({
            id: Math.random().toString(36).substr(2, 9),
            file,
            url: URL.createObjectURL(file),
            duration: 0,
        }));
        setTracks((prev) => [...prev, ...newTracks]);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setTracks((items) => {
                const oldIndex = items.findIndex((i) => i.id === active.id);
                const newIndex = items.findIndex((i) => i.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleRemoveTrack = (id: string) => {
        setTracks((prev) => prev.filter((t) => t.id !== id));
    };

    const handleMerge = async () => {
        if (tracks.length < 2) return;
        setIsMerging(true);
        setProgress(0);

        try {
            const filesToMerge = tracks.map((t) => t.file);
            await mergeAudioFiles(filesToMerge, {
                autoDownload: true,
                fileName: `merged_${Date.now()}.mp3`,
                onProgress: setProgress,
            });
        } catch (error) {
            console.error("Merge failed:", error);
        } finally {
            setIsMerging(false);
        }
    };

    return (
        <ToolShell>
            <ToolHeader tool={tool}>
                {!tracks.length ? (
                    <FileUpload
                        accept="audio/*"
                        maxSizeMB={1000}
                        multiple={true}
                        onFilesSelected={handleFilesSelected}
                        allowedFormats={["mp3", "wav", "m4a", "ogg", "flac", "aac"]}
                    />
                ) : (
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xl font-medium">Audio Merger</CardTitle>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setTracks([])}
                            >
                                Clear All
                            </Button>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {/* Add Files Button */}
                            <div className="relative">
                                <input
                                    id="add-more-files"
                                    type="file"
                                    accept="audio/*"
                                    multiple
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            handleFilesSelected(Array.from(e.target.files));
                                            e.target.value = "";
                                        }
                                    }}
                                />
                                <Button variant="outline" className="w-full pointer-events-none">
                                    <Plus />
                                    Add More Files
                                </Button>
                            </div>

                            {/* Track List */}
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >
                                <SortableContext
                                    items={tracks.map((t) => t.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <div className="space-y-3">
                                        {tracks.map((track) => (
                                            <SortableTrack
                                                key={track.id}
                                                track={track}
                                                onRemove={handleRemoveTrack}
                                            />
                                        ))}
                                    </div>
                                </SortableContext>
                            </DndContext>

                            {/* Merge Button */}
                            <Button
                                onClick={handleMerge}
                                disabled={tracks.length < 2 || isMerging}
                                className="w-full gap-2"
                                size="lg"
                            >
                                {isMerging ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Merging... {progress}%
                                    </>
                                ) : (
                                    <>
                                        <Download className="h-4 w-4" />
                                        Merge & Download ({tracks.length} files)
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </ToolHeader>
        </ToolShell>
    );
}
