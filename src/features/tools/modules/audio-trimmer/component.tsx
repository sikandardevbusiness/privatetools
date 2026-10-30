"use client";

import React, { useCallback, useRef, useState } from "react";
import { RotateCcw, Scissors } from "lucide-react";

import {
    AudioVisualizer,
    useAudioTrimmer,
    formatTimeHHMMSS,
    parseTimeHHMMSS,
    type AudioVisualizerRef,
} from "../../../../../../packages/packages/audio-trimmer/src/index";
import "../../../../../../packages/packages/audio-trimmer/src/styles.css";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";
import type { BaseTool } from "@/features/tools/shared/types";

export default function AudioTrimmerClient({ tool }: { tool: BaseTool }): React.JSX.Element {
    const [file, setFile] = useState<File | null>(null);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);

    const [inputStart, setInputStart] = useState("00:00:00");
    const [inputEnd, setInputEnd] = useState("00:00:00");
    const isTypingRef = useRef({ start: false, end: false });

    const visualizerRef = useRef<AudioVisualizerRef | null>(null);
    const { trim, isLoaded, isProcessing, progress, error } = useAudioTrimmer();

    const handleFilesSelected = (files: File[]) => {
        if (files[0]) {
            setFile(files[0]);
            setStartTime(0);
            setEndTime(0);
        }
    };

    const handleRegionChange = useCallback(({ start, end }: { start: number; end: number }) => {
        setStartTime(start);
        setEndTime(end);

        if (!isTypingRef.current.start) {
            setInputStart(formatTimeHHMMSS(start));
        }
        if (!isTypingRef.current.end) {
            setInputEnd(formatTimeHHMMSS(end));
        }
    }, []);

    const handleTimeChange = (type: "start" | "end", value: string) => {
        if (type === "start") {
            isTypingRef.current.start = true;
            setInputStart(value);
        } else {
            isTypingRef.current.end = true;
            setInputEnd(value);
        }

        if (value.length === 8 && value.includes(":")) {
            const seconds = parseTimeHHMMSS(value);
            if (!isNaN(seconds)) {
                if (type === "start") setStartTime(seconds);
                else setEndTime(seconds);
            }
        }
    };

    const handleInputBlur = (type: "start" | "end") => {
        isTypingRef.current[type] = false;
        if (type === "start") setInputStart(formatTimeHHMMSS(startTime));
        else setInputEnd(formatTimeHHMMSS(endTime));
    };

    const startSec = parseTimeHHMMSS(inputStart);
    const endSec = parseTimeHHMMSS(inputEnd);
    const exportDuration = Math.max(
        0,
        !isNaN(startSec) && !isNaN(endSec) ? endSec - startSec : Math.round(endTime - startTime),
    );

    const handleTrimProcess = async () => {
        if (!file) return;
        await trim(file, {
            startTime,
            endTime,
            outputFormat: "mp3",
            autoDownload: true,
        });
    };

    return (
        <ToolShell>
            <ToolHeader title={tool.name} description={tool.description}>
                {!file ? (
                    <FileUpload
                        accept="audio/*,video/*"
                        maxSizeMB={1000}
                        multiple={false}
                        onFilesSelected={handleFilesSelected}
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
                        {/* Clean Header with Title and Reset Button */}
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xl font-medium">Audio Trimmer</CardTitle>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => visualizerRef.current?.resetToFull()}
                            >
                                <RotateCcw className="h-3.5 w-3.5" />
                                Reset
                            </Button>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {/* Visualizer Component */}
                            <AudioVisualizer
                                ref={visualizerRef}
                                file={file}
                                startTime={startTime}
                                endTime={endTime}
                                onRegionChange={handleRegionChange}
                                onDurationLoaded={(dur) => {
                                    setEndTime(dur);
                                    setInputEnd(formatTimeHHMMSS(dur));
                                }}
                            />

                            {/* Precise Time Inputs */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Start Time</Label>
                                    <Input
                                        type="text"
                                        value={inputStart}
                                        onChange={(e) => handleTimeChange("start", e.target.value)}
                                        onBlur={() => handleInputBlur("start")}
                                        className="font-mono text-center"
                                        maxLength={8}
                                        placeholder="00:00:00"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>End Time</Label>
                                    <Input
                                        type="text"
                                        value={inputEnd}
                                        onChange={(e) => handleTimeChange("end", e.target.value)}
                                        onBlur={() => handleInputBlur("end")}
                                        className="font-mono text-center"
                                        maxLength={8}
                                        placeholder="00:00:00"
                                    />
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <Label>Export Duration</Label>
                                    <Input
                                        type="text"
                                        value={
                                            exportDuration > 0
                                                ? formatTimeHHMMSS(exportDuration)
                                                : "00:00:00"
                                        }
                                        disabled
                                        className="font-mono text-center"
                                    />
                                </div>
                            </div>

                            {/* Trim & Download Action Button */}
                            <Button
                                onClick={handleTrimProcess}
                                disabled={!isLoaded || isProcessing || exportDuration <= 0}
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
