"use client";

import { Settings2, Info } from "lucide-react";
import { memo } from "react";
import {
    AVAILABLE_MODELS,
    AVAILABLE_LANGUAGES,
    EXPORT_FORMATS,
} from "@sikandardevbusiness/audio-transcriber";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export type TranscriptionTask = "transcribe" | "translate";
export type ExportFormat = (typeof EXPORT_FORMATS)[number];

export interface TranscriberSettingsProps {
    modelId: string;
    setModelId: (v: string) => void;
    language: string;
    setLanguage: (v: string) => void;
    task: TranscriptionTask;
    setTask: (v: TranscriptionTask) => void;
    wordsPerSegment: number;
    setWordsPerSegment: (v: number) => void;
    exportFormat: ExportFormat;
    setExportFormat: (v: ExportFormat) => void;
}

export const TranscriberSettings = memo(function TranscriberSettings({
    modelId,
    setModelId,
    language,
    setLanguage,
    task,
    setTask,
    wordsPerSegment,
    setWordsPerSegment,
    exportFormat,
    setExportFormat,
}: TranscriberSettingsProps) {
    return (
        <Card>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                    <Settings2 className="w-4 h-4 text-primary" />
                    Transcription Settings
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">AI Model</Label>
                        <Select value={modelId} onValueChange={(v) => v && setModelId(v)}>
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                                {AVAILABLE_MODELS.map((m) => (
                                    <SelectItem key={m.id} value={m.id}>
                                        {m.name} ({m.size})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Language</Label>
                        <Select value={language} onValueChange={(v) => v && setLanguage(v)}>
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                                {AVAILABLE_LANGUAGES.map((l) => (
                                    <SelectItem key={l.code} value={l.code}>
                                        {l.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Operation Task</Label>
                        <Select
                            value={task}
                            onValueChange={(v) => v && setTask(v as TranscriptionTask)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                                <SelectItem value="transcribe">
                                    Transcribe (Keep Original)
                                </SelectItem>
                                <SelectItem value="translate">Translate to English</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">
                            Default Export Format
                        </Label>
                        <Select
                            value={exportFormat}
                            onValueChange={(v) => v && setExportFormat(v as ExportFormat)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                                {EXPORT_FORMATS.map((fmt) => (
                                    <SelectItem key={fmt} value={fmt}>
                                        {fmt.toUpperCase()}{" "}
                                        {fmt === "srt"
                                            ? "(Standard Subtitles)"
                                            : fmt === "vtt"
                                              ? "(Web Video)"
                                              : fmt === "ass"
                                                ? "(Advanced Styling)"
                                                : ""}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2 sm:col-span-2 lg:col-span-2">
                        <Label className="text-xs text-muted-foreground">Words Per Segment</Label>
                        <Input
                            type="number"
                            value={wordsPerSegment}
                            onChange={(e) =>
                                setWordsPerSegment(Math.max(1, parseInt(e.target.value) || 1))
                            }
                            className="h-9"
                        />
                    </div>
                </div>

                <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-md border border-border/50">
                    <Info className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                    <div className="text-xs text-muted-foreground leading-relaxed space-y-1.5">
                        <p>
                            Configure your local AI model and export preferences. All processing
                            happens 100% in your browser.
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-[11px] pt-1">
                            <li>
                                <strong>Model Selection:</strong> While {`"Tiny"`} works well for
                                English, use <strong>Base</strong> or <strong>Small</strong> models
                                for other languages to ensure accurate script recognition (e.g.,
                                distinguishing Hindi from Urdu).
                            </li>
                            <li>
                                <strong>Language Setting:</strong> Explicitly select your audio{"'"}
                                s actual language instead of {`"Auto-Detect"`} for the best results,
                                as auto-detection can sometimes struggle with short or noisy clips.
                            </li>
                            <li>
                                <strong>Words Per Segment:</strong> Controls subtitle pacing. Use 1
                                for karaoke-style captions, or 4-7 for standard video subtitles.
                            </li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
});
