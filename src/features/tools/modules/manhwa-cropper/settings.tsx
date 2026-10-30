"use client";

import { Settings2 } from "lucide-react";
import { memo } from "react";

import { ColorPicker } from "@/components/ui/color-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export interface CropperSettingsProps {
    splitMode: "auto" | "fixed";
    setSplitMode: (v: "auto" | "fixed") => void;
    targetHeight: string;
    setTargetHeight: (v: string) => void;
    safeMargin: string;
    setSafeMargin: (v: string) => void;
    gapStrength: string;
    setGapStrength: (v: string) => void;
    minPanelHeight: string;
    setMinPanelHeight: (v: string) => void;
    keepMargin: string;
    setKeepMargin: (v: string) => void;
    autoBg: boolean;
    setAutoBg: (v: boolean) => void;
    backgroundColor: string;
    setBackgroundColor: (v: string) => void;
    format: string;
    setFormat: (v: string) => void;
    quality: string;
    setQuality: (v: string) => void;
    isDisabled: boolean;
}

export const CropperSettings = memo(function CropperSettings({
    splitMode,
    setSplitMode,
    targetHeight,
    setTargetHeight,
    safeMargin,
    setSafeMargin,
    gapStrength,
    setGapStrength,
    minPanelHeight,
    setMinPanelHeight,
    keepMargin,
    setKeepMargin,
    autoBg,
    setAutoBg,
    backgroundColor,
    setBackgroundColor,
    format,
    setFormat,
    quality,
    setQuality,
    isDisabled,
}: CropperSettingsProps) {
    return (
        <div className="w-full bg-card border border-border rounded-xl p-4 md:p-6 space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                <Settings2 className="w-4 h-4 text-primary" /> Cropping Settings
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Split Mode</Label>
                    <Select
                        value={splitMode}
                        onValueChange={(v) => v && setSplitMode(v as "auto" | "fixed")}
                        disabled={isDisabled}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="auto">Auto (detect panel gaps)</SelectItem>
                            <SelectItem value="fixed">Fixed height slices</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-[10px] text-muted-foreground">
                        Auto finds white/black bands between panels, exactly like the desktop tool.
                    </p>
                </div>

                {splitMode === "fixed" ? (
                    <>
                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">
                                Target Slice Height (px)
                            </Label>
                            <Input
                                type="number"
                                min="500"
                                max="8000"
                                value={targetHeight}
                                onChange={(e) => setTargetHeight(e.target.value)}
                                disabled={isDisabled}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">
                                Safe Search Margin (px)
                            </Label>
                            <Input
                                type="number"
                                min="0"
                                max="800"
                                value={safeMargin}
                                onChange={(e) => setSafeMargin(e.target.value)}
                                disabled={isDisabled}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">
                                Gap Strength (0.90–0.99)
                            </Label>
                            <Input
                                type="number"
                                step="0.01"
                                min="0.9"
                                max="0.99"
                                value={gapStrength}
                                onChange={(e) => setGapStrength(e.target.value)}
                                disabled={isDisabled}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">
                                Min Panel Height (px)
                            </Label>
                            <Input
                                type="number"
                                min="50"
                                max="5000"
                                value={minPanelHeight}
                                onChange={(e) => setMinPanelHeight(e.target.value)}
                                disabled={isDisabled}
                            />
                        </div>
                    </>
                )}

                <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Keep Margin (px)</Label>
                    <Input
                        type="number"
                        min="0"
                        max="200"
                        value={keepMargin}
                        onChange={(e) => setKeepMargin(e.target.value)}
                        disabled={isDisabled}
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Background Color</Label>
                    <div className="flex items-center gap-3">
                        <Switch checked={autoBg} onCheckedChange={(v) => setAutoBg(v === true)} />
                        <span className="text-xs text-muted-foreground">Auto-detect</span>
                    </div>
                    {!autoBg && (
                        <ColorPicker value={backgroundColor} onChange={setBackgroundColor} />
                    )}
                </div>

                <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Output Format</Label>
                    <Select
                        value={format}
                        onValueChange={(v) => v && setFormat(v)}
                        disabled={isDisabled}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="image/png">PNG (Lossless)</SelectItem>
                            <SelectItem value="image/jpeg">JPG (Smaller)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {format === "image/jpeg" && (
                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">JPG Quality (%)</Label>
                        <Input
                            type="number"
                            min="10"
                            max="100"
                            value={quality}
                            onChange={(e) => setQuality(e.target.value)}
                            disabled={isDisabled}
                        />
                    </div>
                )}
            </div>
        </div>
    );
});
