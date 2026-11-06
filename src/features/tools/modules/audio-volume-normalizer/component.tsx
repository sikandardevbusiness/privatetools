"use client";

import { Volume2, RotateCcw } from "lucide-react";
import React, { useRef, useState } from "react";

import { useAudioNormalizer } from "@sikandardevbusiness/audio-toolkit";
import type { NormalizeMode, AudioOutputFormat } from "@sikandardevbusiness/audio-toolkit";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PropSlider } from "@/components/ui/prop-slider";
import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";

import type { BaseTool } from "@/features/tools/shared/types";

export default function AudioVolumeNormalizerClient({
    tool,
}: {
    tool: BaseTool;
}): React.JSX.Element {
    const [file, setFile] = useState<File | null>(null);
    const [audioUrl, setAudioUrl] = useState<string>("");
    const [mode, setMode] = useState<NormalizeMode>("automatic");
    const [outputFormat, setOutputFormat] = useState<AudioOutputFormat>("mp3");

    // Advanced Settings
    const [targetLoudness, setTargetLoudness] = useState<number>(-23);
    const [truePeak, setTruePeak] = useState<number>(-2);
    const [loudnessRange, setLoudnessRange] = useState<number>(7);
    const [gainDb, setGainDb] = useState<number>(0);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { normalize, isLoaded, isProcessing, progress, error } = useAudioNormalizer();

    const handleFilesSelected = (files: File[]) => {
        if (files[0]) {
            setFile(files[0]);
            const url = URL.createObjectURL(files[0]);
            setAudioUrl(url);
            setMode("automatic");
            setOutputFormat("mp3");
            setTargetLoudness(-23);
            setTruePeak(-2);
            setLoudnessRange(7);
            setGainDb(0);
        }
    };

    const handleProcess = async () => {
        if (!file) return;
        await normalize(file, {
            mode,
            targetLoudness,
            truePeak,
            loudnessRange,
            gainDb,
            outputFormat,
            autoDownload: true,
        });
    };

    const handleReset = () => {
        setFile(null);
        setAudioUrl("");
        setMode("automatic");
        setOutputFormat("mp3");
        setTargetLoudness(-23);
        setTruePeak(-2);
        setLoudnessRange(7);
        setGainDb(0);
    };

    return (
        <ToolShell>
            <ToolHeader tool={tool}>
                {!file ? (
                    <FileUpload
                        accept="audio/*"
                        multiple={false}
                        onFilesSelected={handleFilesSelected}
                        allowedFormats={["mp3", "wav", "m4a", "ogg", "flac", "aac", "opus", "wma"]}
                    />
                ) : (
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xl font-medium">Normalize Audio</CardTitle>
                            <Button type="button" variant="outline" size="sm" onClick={handleReset}>
                                <RotateCcw />
                                New File
                            </Button>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {/* Audio Preview */}
                            <div className="space-y-2">
                                <Label>Original Audio Preview</Label>
                                <audio
                                    ref={audioRef}
                                    src={audioUrl}
                                    controls
                                    className="w-full h-10 rounded-md"
                                />
                            </div>

                            {/* Output Format Selection */}
                            <div className="space-y-2">
                                <Label>Output Format</Label>
                                <Select
                                    value={outputFormat}
                                    onValueChange={(v) => setOutputFormat(v as AudioOutputFormat)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select format" />
                                    </SelectTrigger>
                                    <SelectContent className="w-full">
                                        <SelectItem value="mp3">MP3 (Recommended)</SelectItem>
                                        <SelectItem value="wav">WAV (Lossless)</SelectItem>
                                        <SelectItem value="flac">FLAC (Lossless)</SelectItem>
                                        <SelectItem value="aac">AAC</SelectItem>
                                        <SelectItem value="m4a">M4A</SelectItem>
                                        <SelectItem value="ogg">OGG</SelectItem>
                                        <SelectItem value="opus">Opus</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-xs text-muted-foreground">
                                    The audio format the normalized track is saved as
                                </p>
                            </div>

                            {/* Normalization Type */}
                            <div className="space-y-3">
                                <Label className="text-base font-semibold">
                                    Normalization Type
                                </Label>
                                <RadioGroup
                                    value={mode}
                                    onValueChange={(v) => setMode(v as NormalizeMode)}
                                    className="grid grid-cols-1 gap-3"
                                >
                                    <div
                                        className={`flex items-center space-x-3 border rounded-md p-3 cursor-pointer transition-colors ${mode === "automatic" ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}
                                        onClick={() => setMode("automatic")}
                                    >
                                        <RadioGroupItem value="automatic" id="automatic" />
                                        <div className="flex-1">
                                            <Label
                                                htmlFor="automatic"
                                                className="font-medium cursor-pointer"
                                            >
                                                Automatic
                                            </Label>
                                            <p className="text-xs text-muted-foreground">
                                                Smart normalization for general audio. Targets -16
                                                LUFS (podcast standard).
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className={`flex items-center space-x-3 border rounded-md p-3 cursor-pointer transition-colors ${mode === "ebu" ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}
                                        onClick={() => setMode("ebu")}
                                    >
                                        <RadioGroupItem value="ebu" id="ebu" />
                                        <div className="flex-1">
                                            <Label
                                                htmlFor="ebu"
                                                className="font-medium cursor-pointer"
                                            >
                                                EBU R128
                                            </Label>
                                            <p className="text-xs text-muted-foreground">
                                                Broadcast standard. Controls integrated loudness,
                                                true peak, and loudness range.
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className={`flex items-center space-x-3 border rounded-md p-3 cursor-pointer transition-colors ${mode === "rms" ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}
                                        onClick={() => setMode("rms")}
                                    >
                                        <RadioGroupItem value="rms" id="rms" />
                                        <div className="flex-1">
                                            <Label
                                                htmlFor="rms"
                                                className="font-medium cursor-pointer"
                                            >
                                                RMS (Average)
                                            </Label>
                                            <p className="text-xs text-muted-foreground">
                                                Adjusts average volume level. Ideal for spoken
                                                content and voice recordings.
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className={`flex items-center space-x-3 border rounded-md p-3 cursor-pointer transition-colors ${mode === "peak" ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}
                                        onClick={() => setMode("peak")}
                                    >
                                        <RadioGroupItem value="peak" id="peak" />
                                        <div className="flex-1">
                                            <Label
                                                htmlFor="peak"
                                                className="font-medium cursor-pointer"
                                            >
                                                Peak
                                            </Label>
                                            <p className="text-xs text-muted-foreground">
                                                Sets maximum peak level without distortion. Best for
                                                music production.
                                            </p>
                                        </div>
                                    </div>
                                </RadioGroup>
                            </div>

                            {/* Advanced Settings (Conditional) */}
                            {(mode === "ebu" || mode === "rms") && (
                                <div className="space-y-4 pt-4 border-t">
                                    <Label className="text-sm font-semibold">
                                        Advanced Settings
                                    </Label>

                                    <div className="space-y-2">
                                        <PropSlider
                                            label="Target Loudness"
                                            value={targetLoudness}
                                            onChange={setTargetLoudness}
                                            min={-70}
                                            max={-5}
                                            step={1}
                                            unit="LUFS"
                                        />
                                        <p className="text-[10px] text-muted-foreground">
                                            Default: -23 LUFS (EBU standard). Podcasts: -16 LUFS.
                                            Streaming: -14 LUFS.
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <PropSlider
                                            label="True Peak Ceiling"
                                            value={truePeak}
                                            onChange={setTruePeak}
                                            min={-10}
                                            max={0}
                                            step={0.5}
                                            unit="dBTP"
                                        />
                                        <p className="text-[10px] text-muted-foreground">
                                            Prevents clipping. Default: -2 dBTP (leaves headroom for
                                            lossy encoding).
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <PropSlider
                                            label="Loudness Range"
                                            value={loudnessRange}
                                            onChange={setLoudnessRange}
                                            min={1}
                                            max={20}
                                            step={1}
                                            unit="LUFS"
                                        />
                                        <p className="text-[10px] text-muted-foreground">
                                            Controls dynamic range. Default: 7 LUFS. Lower values =
                                            more compressed.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {mode === "peak" && (
                                <div className="space-y-2 pt-4 border-t">
                                    <PropSlider
                                        label="Gain Adjustment"
                                        value={gainDb}
                                        onChange={setGainDb}
                                        min={-20}
                                        max={20}
                                        step={1}
                                        unit="dB"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Positive values make it louder, negative values make it
                                        quieter. You can type exact numbers into the input box.
                                    </p>
                                </div>
                            )}

                            {/* Process & Download Action Button */}
                            <Button
                                onClick={handleProcess}
                                disabled={!isLoaded || isProcessing || !file}
                                className="w-full gap-2"
                                size="lg"
                            >
                                {isProcessing ? (
                                    <>Processing... {progress}%</>
                                ) : (
                                    <>
                                        <Volume2 className="h-4 w-4" /> Normalize & Download
                                    </>
                                )}
                            </Button>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-destructive/10 border border-destructive/20 text-destructive p-3 rounded-lg text-sm text-center">
                                    {error}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </ToolHeader>
        </ToolShell>
    );
}
