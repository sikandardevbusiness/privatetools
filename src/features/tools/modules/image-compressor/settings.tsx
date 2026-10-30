"use client";

import { Settings2 } from "lucide-react";
import { memo } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export type QualityPreset = "small" | "medium" | "large" | "custom";
export type Format = "original" | "jpeg" | "png" | "webp";
export type SizeUnit = "kb" | "mb";

export interface CompressionSettingsProps {
    qualityPreset: QualityPreset;
    targetSize: string;
    sizeUnit: SizeUnit;
    outputFormat: Format;
    setQualityPreset: (v: QualityPreset) => void;
    setTargetSize: (v: string) => void;
    setSizeUnit: (v: SizeUnit) => void;
    setOutputFormat: (v: Format) => void;
    isDisabled: boolean;
}

export const CompressionSettings = memo(function CompressionSettings({
    qualityPreset,
    targetSize,
    sizeUnit,
    outputFormat,
    setQualityPreset,
    setTargetSize,
    setSizeUnit,
    setOutputFormat,
    isDisabled,
}: CompressionSettingsProps) {
    return (
        <Card>
            <CardContent className="space-y-6 pt-6">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                    <Settings2 className="w-4 h-4 text-primary" />
                    Compression Settings
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Quality Preset</Label>
                        <Select
                            value={qualityPreset}
                            onValueChange={(v) => setQualityPreset(v as QualityPreset)}
                            disabled={isDisabled}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                                <SelectItem value="small">Small (Low Quality)</SelectItem>
                                <SelectItem value="medium">Medium (Standard Quality)</SelectItem>
                                <SelectItem value="large">Large (High Quality)</SelectItem>
                                <SelectItem value="custom">Custom Parameters</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Output Format</Label>
                        <Select
                            value={outputFormat}
                            onValueChange={(v) => setOutputFormat(v as Format)}
                            disabled={isDisabled}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                                <SelectItem value="original">Keep Original</SelectItem>
                                <SelectItem value="jpeg">JPEG</SelectItem>
                                <SelectItem value="png">PNG</SelectItem>
                                <SelectItem value="webp">WebP (Recommended)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">
                            Target Size (Optional)
                        </Label>
                        <div className="flex w-full rounded-md border border-input bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                            <Input
                                type="number"
                                step="0.1"
                                min="0.1"
                                value={targetSize}
                                onChange={(e) => setTargetSize(e.target.value)}
                                placeholder="Leave empty"
                                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-none h-9"
                                disabled={isDisabled}
                            />
                            <Select
                                value={sizeUnit}
                                onValueChange={(v) => setSizeUnit(v as SizeUnit)}
                                disabled={isDisabled}
                            >
                                <SelectTrigger className="w-20 rounded-l-none border-0 border-l border-input focus:ring-0 focus:ring-offset-0 h-9 bg-background">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="mb">MB</SelectItem>
                                    <SelectItem value="kb">KB</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <p className="text-[10px] text-muted-foreground">
                            Approximates target size by adjusting dimensions and quality.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
});
