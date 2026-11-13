"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { Settings2, Download } from "lucide-react";
import { simulateColorBlindness, type ColorBlindnessType } from "@sikandardevbusiness/css-toolkit";

import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PropSlider } from "@/components/ui/prop-slider";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";

import type { BaseTool } from "@/features/tools/shared/types";

const TYPES: { value: ColorBlindnessType; label: string }[] = [
    { value: "protanopia", label: "Protanopia (Red-Blind)" },
    { value: "deuteranopia", label: "Deuteranopia (Green-Blind)" },
    { value: "tritanopia", label: "Tritanopia (Blue-Blind)" },
    { value: "achromatopsia", label: "Achromatopsia (Total)" },
];

export default function ColorblindSimulatorClient({ tool }: { tool: BaseTool }) {
    const [preview, setPreview] = useState<string | null>(null);
    const [simulatedUrl, setSimulatedUrl] = useState<string | null>(null);
    const [type, setType] = useState<ColorBlindnessType>("protanopia");
    const [severity, setSeverity] = useState<number>(100);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);

    // Debounce timer so dragging severity doesn't recompute 60x/sec (kills the blink/jank)
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Core logic stays in the package. We just swap the URL — never null it, never toggle spinner.
    const computeSimulated = useCallback((cbType: ColorBlindnessType, sev: number) => {
        const canvas = canvasRef.current;
        const img = imgRef.current;
        if (!canvas || !img) return;
        const url = simulateColorBlindness(canvas, img, cbType, sev / 100);
        if (url) {
            setSimulatedUrl(url);
            setError(null);
        } else {
            setError("Canvas unavailable.");
        }
    }, []);

    // Re-run on condition/severity change, debounced, WITHOUT touching isProcessing (no spinner flash)
    useEffect(() => {
        if (!preview || !imgRef.current) return;
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            computeSimulated(type, severity);
        }, 120);
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [type, severity, preview, computeSimulated]);

    const handleFiles = (files: File[]) => {
        const file = files[0];
        if (!file || !file.type.startsWith("image/")) return;

        setError(null);
        setIsProcessing(true);
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new window.Image();
            img.onload = () => {
                imgRef.current = img;
                setPreview(URL.createObjectURL(file));
                // First paint immediately (spinner shows only here, then off)
                computeSimulated(type, severity);
                setIsProcessing(false);
            };
            img.onerror = () => {
                setIsProcessing(false);
                setError("Failed to load image data.");
            };
            img.src = e.target?.result as string;
        };
        reader.onerror = () => {
            setIsProcessing(false);
            setError("Failed to read file.");
        };
        reader.readAsDataURL(file);
    };

    const handleDownload = () => {
        if (!simulatedUrl) return;
        const a = document.createElement("a");
        a.href = simulatedUrl;
        a.download = `colorblind-sim-${type}.png`;
        a.click();
    };

    return (
        <ToolShell>
            <ToolHeader tool={tool}>
                {!preview ? (
                    <FileUpload
                        multiple={false}
                        onFilesSelected={handleFiles}
                        accept="image/*"
                        allowedFormats={["jpg", "jpeg", "png", "webp", "gif", "bmp"]}
                    />
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Settings2 className="h-4 w-4 text-primary" />
                                Color Blindness Simulator
                            </CardTitle>
                            <p className="text-xs text-muted-foreground">
                                See how your designs look to users with color vision deficiencies.
                            </p>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {/* Controls (top) */}
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <Label>Condition</Label>
                                    <Select
                                        value={type}
                                        onValueChange={(v) => setType(v as ColorBlindnessType)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="w-full">
                                            {TYPES.map((t) => (
                                                <SelectItem key={t.value} value={t.value}>
                                                    {t.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <PropSlider
                                    label="Severity"
                                    value={severity}
                                    onChange={setSeverity}
                                    min={0}
                                    max={100}
                                    step={1}
                                    unit="%"
                                />
                            </div>

                            {/* Images with Remove overlay */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold uppercase text-muted-foreground text-center">
                                        Original
                                    </p>
                                    <div className="relative w-full aspect-video rounded-lg border border-border bg-muted/30 overflow-hidden">
                                        <Image
                                            src={preview}
                                            alt="Original"
                                            fill
                                            unoptimized
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold uppercase text-muted-foreground text-center flex items-center justify-center gap-1">
                                        Simulated
                                        {isProcessing && (
                                            <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                        )}
                                    </p>
                                    <div className="relative w-full aspect-video rounded-lg border border-border bg-muted/30 overflow-hidden flex items-center justify-center">
                                        {error ? (
                                            <p className="text-sm text-destructive text-center p-4">
                                                {error}
                                            </p>
                                        ) : simulatedUrl ? (
                                            <Image
                                                src={simulatedUrl}
                                                alt="Simulated"
                                                fill
                                                unoptimized
                                                className="object-contain"
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            {/* Download full width */}
                            <Button
                                size="lg"
                                onClick={handleDownload}
                                disabled={!simulatedUrl || isProcessing}
                                className="w-full"
                            >
                                <Download className="h-4 w-4" /> Download Simulated Image
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </ToolHeader>

            <canvas ref={canvasRef} className="hidden" />
        </ToolShell>
    );
}
