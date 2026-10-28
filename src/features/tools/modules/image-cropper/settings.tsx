"use client";

import { Download, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface CropperSettingsProps {
    aspectRatio: number | undefined;
    outputFormat: string;
    onReset: () => void;
    onDownload: () => void;
    onNewImage: () => void;
    onAspectRatioChange: (value: number | undefined) => void;
    onOutputFormatChange: (value: string) => void;
}

export function CropperSettings({
    aspectRatio,
    outputFormat,
    onReset,
    onDownload,
    onAspectRatioChange,
    onOutputFormatChange,
}: CropperSettingsProps) {
    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Aspect Ratio</Label>
                    <Select
                        value={aspectRatio?.toString() || "free"}
                        onValueChange={(value) => {
                            if (value === "free" || value === null) {
                                onAspectRatioChange(undefined);
                            } else {
                                onAspectRatioChange(parseFloat(value));
                            }
                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select ratio" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                            <SelectItem value="free">Free Form</SelectItem>
                            <SelectItem value="1">1:1 (Square)</SelectItem>
                            <SelectItem value="1.7778">16:9 (Landscape)</SelectItem>
                            <SelectItem value="1.3333">4:3 (Standard)</SelectItem>
                            <SelectItem value="0.75">3:4 (Portrait)</SelectItem>
                            <SelectItem value="0.5625">9:16 (Story)</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                        Lock the crop shape for social media or custom dimensions.
                    </p>
                </div>

                <div className="space-y-2">
                    <Label>Output Format</Label>
                    <Select
                        value={outputFormat}
                        onValueChange={(value) => {
                            if (value) onOutputFormatChange(value);
                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                            {["png", "jpg", "webp"].map((fmt) => (
                                <SelectItem key={fmt} value={fmt}>
                                    {fmt.toUpperCase()}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                        PNG for quality, JPG for size, WEBP for modern browsers.
                    </p>
                </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
                {/* Action Buttons */}
                <div className="space-y-3">
                    <Button variant="outline" onClick={onReset} className="w-full gap-2" size="lg">
                        <RotateCcw className="w-4 h-4" />
                        Reset
                    </Button>

                    <Button onClick={onDownload} className="w-full gap-2" size="lg">
                        <Download className="w-4 h-4" />
                        Download Image
                    </Button>
                </div>

                {/* Simple Note instead of Zoom Controls */}
                <p className="text-xs text-muted-foreground text-center py-2">
                    Tip: Scroll to zoom • Drag to move • Drag edges to resize
                </p>
            </div>
        </div>
    );
}
