"use client";

import { Zap, RotateCcw } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";

import { useAudioSpeed } from "@sikandardevbusiness/audio-toolkit";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PropSlider } from "@/components/ui/prop-slider";
import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";

import type { BaseTool } from "@/features/tools/shared/types";

export default function AudioSpeedChangerClient({ tool }: { tool: BaseTool }): React.JSX.Element {
    const [file, setFile] = useState<File | null>(null);
    const [audioUrl, setAudioUrl] = useState<string>("");
    const [speed, setSpeed] = useState<number>(1.5);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { changeSpeed, isLoaded, isProcessing, progress, error } = useAudioSpeed();

    const handleFilesSelected = (files: File[]) => {
        if (files[0]) {
            setFile(files[0]);
            const url = URL.createObjectURL(files[0]);
            setAudioUrl(url);
            setSpeed(1.5);
        }
    };

    // Sync audio playback rate for instant preview without re-encoding
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.playbackRate = speed;
        }
    }, [speed]);

    // ✅ Simplified: PropSlider passes a single number, not an array
    const handleSpeedChange = (newSpeed: number) => {
        setSpeed(newSpeed);
    };

    const handleProcess = async () => {
        if (!file) return;
        await changeSpeed(file, {
            speed,
            outputFormat: "mp3",
            autoDownload: true,
        });
    };

    const handleReset = () => {
        setFile(null);
        setAudioUrl("");
        setSpeed(1.5);
    };

    return (
        <ToolShell>
            <ToolHeader tool={tool}>
                {!file ? (
                    <FileUpload
                        accept="audio/*"
                        maxSizeMB={500}
                        multiple={false}
                        onFilesSelected={handleFilesSelected}
                        allowedFormats={["mp3", "wav", "m4a", "ogg", "flac", "aac"]}
                    />
                ) : (
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xl font-medium">
                                Audio Speed Changer
                            </CardTitle>
                            <Button type="button" variant="outline" size="sm" onClick={handleReset}>
                                <RotateCcw className="" />
                                New File
                            </Button>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {/* Audio Preview Player */}
                            <div className="space-y-2">
                                <Label>Preview (Instant Playback Rate Change)</Label>
                                <audio
                                    ref={audioRef}
                                    src={audioUrl}
                                    controls
                                    className="w-full h-10 rounded-md"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Note: This preview uses browser playback rate. The final
                                    download will be permanently processed without pitch change.
                                </p>
                            </div>

                            {/* Speed Controls using PropSlider (Handles all types and validation) */}
                            <div className="space-y-2">
                                <PropSlider
                                    label="Playback Speed"
                                    value={speed}
                                    onChange={handleSpeedChange}
                                    min={0.25}
                                    max={4.0}
                                    step={0.25}
                                    unit="x"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Tip: You can type any custom number (e.g., 1.75 or 2.3) directly
                                    into the input box for precise control beyond the slider steps.
                                </p>
                            </div>

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
                                        <Zap className="h-4 w-4" /> Change Speed & Download
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
