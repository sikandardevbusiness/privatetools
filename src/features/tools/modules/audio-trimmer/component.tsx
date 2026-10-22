"use client";

import { Scissors } from "lucide-react";
import React, { useEffect, useState } from "react";
import Mirt from "react-mirt";
import "react-mirt/dist/css/react-mirt.css";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";

import type { BaseTool } from "@/features/tools/shared/types";
import { formatTimeHHMMSS, parseTimeHHMMSS } from "@/lib/utils";
import { useAudioProcessor } from "./use-audio-processor";

export default function AudioTrimmerClient({}: { tool: BaseTool }): React.JSX.Element {
    const {
        isLoaded,
        isProcessing,
        progress,
        files,
        error,
        startTime,
        endTime,
        fileDurations,
        setStartTime,
        setEndTime,
        setFileDuration,
        handleFileSelect,
        handleProcess,
        activeFile,
    } = useAudioProcessor();

    const [inputStart, setInputStart] = useState("00:00:00");
    const [inputEnd, setInputEnd] = useState("00:00:00");

    // Sync inputs when startTime/endTime change
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setInputStart(formatTimeHHMMSS(startTime));
        setInputEnd(formatTimeHHMMSS(endTime));
    }, [startTime, endTime]);

    // Reset trim times when the active file changes
    useEffect(() => {
        if (activeFile) {
            const duration = fileDurations[activeFile.id] || 0;
            setStartTime(0);
            setEndTime(duration);
        }
    }, [activeFile, fileDurations, setEndTime, setStartTime]);

    const handleMirtChange = ({ start, end }: { start: number; end: number }) => {
        const startSec = start > 1000 ? start / 1000 : start;
        const endSec = end > 1000 ? end / 1000 : end;
        setStartTime(startSec);
        setEndTime(endSec);
    };

    const handleAudioLoaded = (audio: HTMLAudioElement) => {
        if (activeFile && audio.duration) {
            setFileDuration(activeFile.id, audio.duration);
        }
    };

    const handleTimeInputChange = (type: "start" | "end", value: string) => {
        if (type === "start") {
            setInputStart(value);
        } else {
            setInputEnd(value);
        }

        if (value.length === 8 && value.includes(":")) {
            const seconds = parseTimeHHMMSS(value);
            if (type === "start") {
                setStartTime(seconds);
            } else {
                setEndTime(seconds);
            }
        }
    };

    const exportDuration = Math.max(0, endTime - startTime);

    return (
        <ToolShell>
            {files.length === 0 ? (
                <FileUpload
                    accept="audio/*,video/*"
                    maxSizeMB={1000}
                    multiple={false}
                    onFilesSelected={handleFileSelect}
                    allowedFormats={[
                        "mp3",
                        "wav",
                        "m4a",
                        "ogg",
                        "flac",
                        "aac",
                        "mp4",
                        "webm",
                        "mov",
                    ]}
                />
            ) : (
                <Card>
                    <CardContent className="space-y-6">
                        {/* iOS-style Audio Trimmer with react-mirt */}
                        {activeFile && activeFile.file && (
                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground">
                                    Waveform Editor
                                </Label>
                                <div className="border border-border rounded-lg overflow-hidden bg-muted/30 p-2">
                                    <Mirt
                                        file={activeFile.file}
                                        onChange={handleMirtChange}
                                        onAudioLoaded={handleAudioLoaded}
                                        style={{ width: "100%", height: "100px" }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Trim Time Inputs & Export Duration */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground">Start Time</Label>
                                <Input
                                    type="text"
                                    placeholder="00:00:00"
                                    value={inputStart}
                                    onChange={(e) => handleTimeInputChange("start", e.target.value)}
                                    className="h-9 font-mono"
                                    maxLength={8}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground">End Time</Label>
                                <Input
                                    type="text"
                                    placeholder="00:00:00"
                                    value={inputEnd}
                                    onChange={(e) => handleTimeInputChange("end", e.target.value)}
                                    className="h-9 font-mono"
                                    maxLength={8}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground">
                                    Export Duration
                                </Label>
                                <Input
                                    type="text"
                                    value={
                                        exportDuration > 0
                                            ? formatTimeHHMMSS(exportDuration)
                                            : "00:00:00"
                                    }
                                    disabled
                                    className="h-9 font-mono bg-muted"
                                />
                            </div>
                        </div>

                        <Button
                            onClick={handleProcess}
                            disabled={!isLoaded || isProcessing || files.length === 0}
                            className="w-full gap-2"
                            size="lg"
                        >
                            {isProcessing ? (
                                <>Processing... {progress}%</>
                            ) : (
                                <>
                                    <Scissors className="h-4 w-4" /> Trim & Download
                                </>
                            )}
                        </Button>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-600 p-3 rounded-lg text-sm text-center">
                                {error}
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </ToolShell>
    );
}
