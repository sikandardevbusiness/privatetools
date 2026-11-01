"use client";

import { usePDFRedactor, type TextOverlayType } from "@sikandardevbusiness/pdf-redactor";
import { Trash2, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ToolFullScreen } from "@/features/tools/shared/components/layouts/tool-fullscreen";
import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";
import { PDFRedactorSettings } from "./settings";

import type { BaseTool } from "@/features/tools/shared/types";

// Keep this local as it's only used for UI styling
type ResizeDirection = "nw" | "n" | "ne" | "e" | "se" | "s" | "sw" | "w";

export default function PDFRedactorClient({ tool }: { tool: BaseTool }) {
    const {
        file,
        past,
        scale,
        pdfDoc,
        future,
        pageNum,
        settings,
        canvasRef,
        redactions,
        currentBox,
        isProcessing,
        containerRef,

        // Functions
        reset,
        setScale,
        setPageNum,
        handleUndo,
        handleRedo,
        setSettings,
        startBoxAction,
        deleteRedaction,
        handleFileSelect,
        handleContainerMouseUp,
        handleApplyAndDownload,
        handleContainerMouseDown,
        handleContainerMouseMove,
    } = usePDFRedactor();

    const [isFullScreen, setIsFullScreen] = useState(false);

    const handleUpload = (selected: File[]) => {
        if (selected.length > 0) {
            handleFileSelect(selected[0]);
            setIsFullScreen(true);
        }
    };

    const handleOverlayTextChange = (value: string | null) => {
        if (value) {
            setSettings({ ...settings, overlayText: value as TextOverlayType });
        }
    };

    // Upload Screen
    if (!file) {
        return (
            <ToolHeader tool={tool}>
                <FileUpload
                    accept="application/pdf"
                    maxSizeMB={50}
                    multiple={false}
                    onFilesSelected={handleUpload}
                    allowedFormats={["pdf"]}
                />
            </ToolHeader>
        );
    }

    // Fullscreen Editor Screen
    return (
        <ToolFullScreen
            title={tool.name}
            isFullScreen={isFullScreen}
            onToggleFullScreen={() => setIsFullScreen(!isFullScreen)}
            sidebar={
                <PDFRedactorSettings
                    settings={settings}
                    setSettings={setSettings}
                    pastLength={past.length}
                    futureLength={future.length}
                    redactionsLength={redactions.length}
                    isProcessing={isProcessing}
                    onUndo={handleUndo}
                    onRedo={handleRedo}
                    onApplyAndDownload={handleApplyAndDownload}
                    onReset={reset}
                    onOverlayTextChange={handleOverlayTextChange}
                />
            }
        >
            {/* Main Canvas Area */}
            <div className="flex flex-col items-center gap-4 w-full h-full">
                {/* Toolbar */}
                <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border border-border rounded-lg p-2 flex items-center gap-2 shadow-sm">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setScale((s) => Math.max(0.5, s - 0.25))}
                    >
                        <ZoomOut className="w-4 h-4" />
                    </Button>
                    <span className="text-sm font-medium w-12 text-center">
                        {Math.round(scale * 100)}%
                    </span>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setScale((s) => Math.min(3, s + 0.25))}
                    >
                        <ZoomIn className="w-4 h-4" />
                    </Button>
                    <div className="w-px h-6 bg-border mx-1" />
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={pageNum <= 1}
                        onClick={() => setPageNum((p) => p - 1)}
                    >
                        Previous
                    </Button>
                    <span className="text-sm font-medium min-w-20 text-center">
                        Page {pageNum} of {pdfDoc?.numPages || 1}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={pageNum >= (pdfDoc?.numPages || 1)}
                        onClick={() => setPageNum((p) => p + 1)}
                    >
                        Next
                    </Button>
                </div>

                {/* Canvas Container */}
                <div
                    ref={containerRef}
                    className="relative shadow-lg border border-border bg-white"
                    style={{ cursor: "crosshair", display: "inline-block" }}
                    onMouseDown={handleContainerMouseDown}
                    onMouseMove={handleContainerMouseMove}
                    onMouseUp={handleContainerMouseUp}
                    onMouseLeave={handleContainerMouseUp}
                >
                    <canvas ref={canvasRef} className="block" />

                    {/* Render Redactions */}
                    {redactions
                        .filter((r) => r.pageIndex === pageNum - 1)
                        .map((box) => {
                            const textToDisplay =
                                box.overlayText === "CUSTOM"
                                    ? settings.customText || "REDACTED"
                                    : box.overlayText;

                            const resizeHandles: { dir: ResizeDirection; className: string }[] = [
                                { dir: "nw", className: "-top-1.5 -left-1.5 cursor-nw-resize" },
                                {
                                    dir: "n",
                                    className: "-top-1.5 left-1/2 -translate-x-1/2 cursor-n-resize",
                                },
                                { dir: "ne", className: "-top-1.5 -right-1.5 cursor-ne-resize" },
                                {
                                    dir: "e",
                                    className:
                                        "top-1/2 -right-1.5 -translate-y-1/2 cursor-e-resize",
                                },
                                { dir: "se", className: "-bottom-1.5 -right-1.5 cursor-se-resize" },
                                {
                                    dir: "s",
                                    className:
                                        "-bottom-1.5 left-1/2 -translate-x-1/2 cursor-s-resize",
                                },
                                { dir: "sw", className: "-bottom-1.5 -left-1.5 cursor-sw-resize" },
                                {
                                    dir: "w",
                                    className: "top-1/2 -left-1.5 -translate-y-1/2 cursor-w-resize",
                                },
                            ];

                            return (
                                <div
                                    key={box.id}
                                    className="absolute redaction-box"
                                    style={{
                                        left: box.x * scale,
                                        top: box.y * scale,
                                        width: box.width * scale,
                                        height: box.height * scale,
                                    }}
                                >
                                    <div
                                        className="w-full h-full border-2 border-red-500 relative group"
                                        style={{
                                            backgroundColor: box.color + "80",
                                            cursor: "move",
                                        }}
                                        onMouseDown={(e) => startBoxAction(e, box, "move")}
                                    >
                                        {box.overlayText !== "Blank" && (
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden p-1">
                                                <span className="text-white font-bold text-[10px] md:text-sm drop-shadow-md text-center wrap-break-word leading-tight">
                                                    {textToDisplay}
                                                </span>
                                            </div>
                                        )}

                                        {/* Resize Handles - Only show on hover */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                            {resizeHandles.map(({ dir, className }) => (
                                                <div
                                                    key={dir}
                                                    className={`absolute w-3 h-3 bg-white border border-red-500 pointer-events-auto ${className}`}
                                                    onMouseDown={(e) => {
                                                        e.stopPropagation();
                                                        startBoxAction(
                                                            e,
                                                            box,
                                                            `resize-${dir}` as `resize-${ResizeDirection}`,
                                                        );
                                                    }}
                                                />
                                            ))}

                                            {/* Delete Button */}
                                            <button
                                                className="absolute -top-4 -right-4 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-sm pointer-events-auto hover:bg-red-700 transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteRedaction(box.id);
                                                }}
                                                title="Delete this box"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                    {/* Drawing Box Preview */}
                    {currentBox && (
                        <div
                            className="absolute border-2 border-red-500 pointer-events-none"
                            style={{
                                left: currentBox.x,
                                top: currentBox.y,
                                width: Math.abs(currentBox.width),
                                height: Math.abs(currentBox.height),
                                backgroundColor: settings.color + "80",
                            }}
                        />
                    )}
                </div>

                <p className="text-center text-xs text-muted-foreground pb-4">
                    Click and drag to draw. Drag inside a box to move, use any edge or corner handle
                    to resize.
                </p>
            </div>
        </ToolFullScreen>
    );
}
