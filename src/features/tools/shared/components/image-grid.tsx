"use client";

import { saveAs } from "file-saver";
import { memo, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ImageCard } from "@/features/tools/shared/components/image-card";

import type { ProcessedFile } from "@/features/tools/shared/types";
import { createAndDownloadZip, type ZipFile } from "@/lib/zip";

interface ImageGridProps {
    panels: ProcessedFile[];
    onRemove: (id: string) => void;
}

export const ImageGrid = memo(function ImageGrid({ panels, onRemove }: ImageGridProps) {
    // Internal state for selection, completely managed by this component
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    // Auto-select new panels when they are added, and clean up removed ones
    useEffect(() => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            let changed = false;

            // Add new panels to selection
            for (const p of panels) {
                if (!next.has(p.id)) {
                    next.add(p.id);
                    changed = true;
                }
            }

            // Remove panels that no longer exist in the parent
            const panelIds = new Set(panels.map((p) => p.id));
            for (const id of prev) {
                if (!panelIds.has(id)) {
                    next.delete(id);
                    changed = true;
                }
            }

            return changed ? next : prev;
        });
    }, [panels]);

    const handleRemove = (id: string) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
        });
        onRemove(id);
    };

    const toggleSelect = (id: string) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const toggleSelectAll = () => {
        if (selectedIds.size === panels.length && panels.length > 0) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(panels.map((p) => p.id)));
        }
    };

    const handleDownloadSelected = async () => {
        const toDownload = panels.filter((f) => selectedIds.has(f.id));
        if (toDownload.length === 0) return;

        if (toDownload.length === 1) {
            saveAs(toDownload[0].outputBlob as Blob, (toDownload[0].outputBlob as File).name);
            return;
        }

        const zipFiles: ZipFile[] = toDownload.map((f) => ({
            name: (f.outputBlob as File).name,
            content: f.outputBlob as Blob,
        }));
        await createAndDownloadZip(zipFiles, "manhwa-panels.zip");
    };

    if (panels.length === 0) return null;

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
                <h3 className="text-lg font-semibold">Extracted Panels ({panels.length})</h3>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={toggleSelectAll}>
                        {selectedIds.size === panels.length ? "Deselect All" : "Select All"}
                    </Button>
                    <Button onClick={handleDownloadSelected} disabled={selectedIds.size === 0}>
                        Download Selected ({selectedIds.size})
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {panels.map((panel, i) => (
                    <ImageCard
                        key={panel.id}
                        file={panel.outputBlob as File}
                        index={i}
                        isSelected={selectedIds.has(panel.id)}
                        onToggleSelect={() => toggleSelect(panel.id)}
                        onRemove={() => handleRemove(panel.id)}
                        onDownload={() =>
                            saveAs(panel.outputBlob as Blob, (panel.outputBlob as File).name)
                        }
                    />
                ))}
            </div>
        </div>
    );
});
