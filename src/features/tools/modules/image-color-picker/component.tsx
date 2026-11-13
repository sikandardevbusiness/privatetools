"use client";

import { Move, Pipette, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";
import { useImageColorPicker } from "@sikandardevbusiness/css-toolkit";

import { ToolFullScreen } from "@/features/tools/shared/components/layouts/tool-fullscreen";
import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";
import { ColorPlateCard } from "@/components/ui/color-plate-card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PropSlider } from "@/components/ui/prop-slider";

import { cn } from "@/lib/utils";
import type { BaseTool } from "@/features/tools/shared/types";

// Eyedropper cursor (data-URI SVG). Hotspot at the tip (2,16).
// Visible on light & dark backgrounds; `crosshair` is the fallback.
const EYEDROPPER_CURSOR = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><path fill='%23fff' stroke='%23000' stroke-width='1.2' d='M2 18l1.6-4.2 7-7 2.6 2.6-7 7L2 18z'/><path fill='%23fff' stroke='%23000' stroke-width='1.2' d='M11.2 6.4l2.4-2.4 2.6 2.6-2.4 2.4z'/><path fill='%23fff' stroke='%23000' stroke-width='1.2' d='M15 2.2l2.8 2.8'/></svg>") 2 16, crosshair`;

export default function ImageColorPickerTool({ tool }: { tool: BaseTool }) {
    const {
        image,
        mode,
        zoom,
        history,
        containerRef,
        setMode,
        setZoom,
        handleFilesSelected,
        geom,
        onPointerDown,
        onPointerMove,
        onPointerUp,
        onWheel,
        newImage,
    } = useImageColorPicker();

    const isFullScreen = image !== null;
    const g = geom();

    const sidebar = (
        <div className="p-3 space-y-4">
            <div className="space-y-1.5">
                <Label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                    Tool
                </Label>
                <div className="grid grid-cols-2 gap-2">
                    <Button
                        variant={mode === "pick" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setMode("pick")}
                        className="gap-1.5"
                    >
                        <Pipette className="h-4 w-4" /> Pick
                    </Button>
                    <Button
                        variant={mode === "move" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setMode("move")}
                        className="gap-1.5"
                    >
                        <Move className="h-4 w-4" /> Move
                    </Button>
                </div>
            </div>

            <PropSlider
                label="Zoom"
                value={Math.round(zoom * 100)}
                onChange={(v) => setZoom(Math.max(1, Math.min(10, v / 100)))}
                min={100}
                max={1000}
                step={25}
                unit="%"
            />

            <div className="grid grid-cols-2 gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setZoom((z) => Math.min(10, z + 0.25))}
                >
                    <ZoomIn className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setZoom((z) => Math.max(1, z - 0.25))}
                >
                    <ZoomOut className="h-4 w-4" />
                </Button>
            </div>

            {history.length > 0 && (
                <ColorPlateCard
                    title="Picked Colors"
                    scale={history.map((h, i) => ({ label: i + 1, hex: h.hex }))}
                    view="list"
                />
            )}
        </div>
    );

    if (!image) {
        return (
            <ToolHeader tool={tool}>
                <FileUpload
                    multiple={false}
                    accept="image/*"
                    onFilesSelected={handleFilesSelected}
                    allowedFormats={["jpg", "jpeg", "png", "webp", "gif", "bmp"]}
                />
            </ToolHeader>
        );
    }

    return (
        <ToolFullScreen
            title={tool.name}
            isFullScreen={isFullScreen}
            onToggleFullScreen={newImage}
            sidebar={sidebar}
        >
            <div
                ref={containerRef}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onWheel={onWheel}
                className={cn(
                    "relative w-full h-full overflow-hidden rounded-lg border border-border bg-muted/20 touch-none select-none",
                    "min-h-180",
                    mode === "move" ? "cursor-grab active:cursor-grabbing" : "",
                )}
                style={mode === "pick" ? { cursor: EYEDROPPER_CURSOR } : undefined}
            >
                {g && (
                    <Image
                        src={image}
                        alt="Picked"
                        width={g.dw}
                        height={g.dh}
                        unoptimized
                        draggable={false}
                        className="absolute pointer-events-none"
                        style={{
                            left: g.left,
                            top: g.top,
                            width: g.dw,
                            height: g.dh,
                            imageRendering: zoom > 3 ? "pixelated" : "auto",
                        }}
                    />
                )}
            </div>
        </ToolFullScreen>
    );
}
