"use client";

import { Download, RotateCcw } from "lucide-react";
import { OutputFormat } from "@sikandardevbusiness/image-cropper";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PropSlider } from "@/components/ui/prop-slider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface CropperSettingsProps {
    borderRadius: number;
    outputFormat: OutputFormat;
    aspectRatio: number | undefined;
    onReset: () => void;
    onDownload: () => void;
    onNewImage: () => void;
    onBorderRadiusChange: (value: number) => void;
    onOutputFormatChange: (value: OutputFormat) => void;
    onAspectRatioChange: (value: number | undefined) => void;
}

export function CropperSettings({
    aspectRatio,
    borderRadius,
    outputFormat,
    onReset,
    onDownload,
    onAspectRatioChange,
    onBorderRadiusChange,
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
                            if (value === "free" || value === null) onAspectRatioChange(undefined);
                            else onAspectRatioChange(parseFloat(value));
                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select ratio" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                            <SelectItem value="free">Free Form</SelectItem>
                            <SelectItem value="1">1:1 (Square / Circle)</SelectItem>
                            <SelectItem value="1.7778">16:9 (Landscape)</SelectItem>
                            <SelectItem value="1.3333">4:3 (Standard)</SelectItem>
                            <SelectItem value="0.75">3:4 (Portrait)</SelectItem>
                            <SelectItem value="0.5625">9:16 (Story)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <PropSlider
                        label="Border Radius"
                        value={borderRadius}
                        onChange={onBorderRadiusChange}
                        min={0}
                        max={50}
                        step={1}
                        unit="%"
                    />
                    <p className="text-xs text-muted-foreground">
                        0% = sharp, 50% = circle (at 1:1).
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
                            <SelectItem value="png">PNG (Transparent)</SelectItem>
                            <SelectItem value="jpg">JPG (White BG)</SelectItem>
                            <SelectItem value="webp">WEBP (Compressed)</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                        PNG keeps rounded corners transparent.
                    </p>
                </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
                <Button variant="outline" onClick={onReset} className="w-full gap-2" size="lg">
                    <RotateCcw className="w-4 h-4" /> Reset
                </Button>
                <Button onClick={onDownload} className="w-full gap-2" size="lg">
                    <Download className="w-4 h-4" /> Crop & Download
                </Button>
                <p className="text-xs text-muted-foreground text-center py-2">
                    Drag to move • Drag handles to resize • Scroll to zoom
                </p>
            </div>
        </div>
    );
}
