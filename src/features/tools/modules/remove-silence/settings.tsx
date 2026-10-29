"use client";

import { Settings2 } from "lucide-react";

import { Label } from "@/components/ui/label";
import { PropSlider } from "@/components/ui/prop-slider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type OutputFormat = "mp3" | "wav";

interface SilenceSettingsProps {
    threshold: number;
    minDuration: number;
    outputFormat: OutputFormat;
    onThresholdChange: (v: number) => void;
    onMinDurationChange: (v: number) => void;
    onOutputFormatChange: (v: OutputFormat) => void;
}

export function SilenceSettings({
    threshold,
    minDuration,
    outputFormat,
    onThresholdChange,
    onMinDurationChange,
    onOutputFormatChange,
}: SilenceSettingsProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Settings2 className="w-4 h-4 text-primary" /> Silence Detection Settings
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Output Format</Label>
                    <Select
                        value={outputFormat}
                        onValueChange={(v) => onOutputFormatChange(v as OutputFormat)}
                    >
                        <SelectTrigger className="w-full bg-background text-foreground">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="w-full bg-background text-foreground">
                            <SelectItem value="mp3">MP3 (Compressed, smaller file)</SelectItem>
                            <SelectItem value="wav">WAV (Lossless, higher quality)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <PropSlider
                        label="Silence Threshold"
                        value={threshold}
                        onChange={onThresholdChange}
                        min={-100}
                        max={0}
                        step={1}
                        unit="dB"
                    />
                    <p className="text-[11px] text-muted-foreground">
                        How quiet a sound must be to be considered silence. Lower values are
                        stricter.
                    </p>
                </div>

                <div className="space-y-2">
                    <PropSlider
                        label="Min Silence Duration"
                        value={minDuration}
                        onChange={onMinDurationChange}
                        min={0.05}
                        max={2}
                        step={0.05}
                        unit="s"
                    />
                    <p className="text-[11px] text-muted-foreground">
                        The minimum length of a pause to be removed.
                    </p>
                </div>
            </div>
        </div>
    );
}
