"use client";

import { Redo, Trash2, Undo } from "lucide-react";
import type { RedactionSettings } from "@sikandardevbusiness/pdf-redactor";

import { Button } from "@/components/ui/button";
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

interface PDFRedactorSettingsProps {
    settings: RedactionSettings;
    setSettings: React.Dispatch<React.SetStateAction<RedactionSettings>>;
    pastLength: number;
    futureLength: number;
    redactionsLength: number;
    isProcessing: boolean;
    onUndo: () => void;
    onRedo: () => void;
    onApplyAndDownload: () => void;
    onReset: () => void;
    onOverlayTextChange: (value: string | null) => void;
}

export function PDFRedactorSettings({
    settings,
    setSettings,
    pastLength,
    futureLength,
    redactionsLength,
    isProcessing,
    onUndo,
    onRedo,
    onApplyAndDownload,
    onReset,
    onOverlayTextChange,
}: PDFRedactorSettingsProps) {
    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Color</Label>
                    <Input
                        type="color"
                        value={settings.color}
                        onChange={(e) => setSettings({ ...settings, color: e.target.value })}
                        className="h-9 cursor-pointer p-1 w-full"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Overlay Text</Label>
                    <Select value={settings.overlayText} onValueChange={onOverlayTextChange}>
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Blank">Blank</SelectItem>
                            <SelectItem value="REDACTED">REDACTED</SelectItem>
                            <SelectItem value="CONFIDENTIAL">CONFIDENTIAL</SelectItem>
                            <SelectItem value="CUSTOM">Custom Text</SelectItem>
                        </SelectContent>
                    </Select>
                    {settings.overlayText === "CUSTOM" && (
                        <Input
                            placeholder="Enter custom text"
                            // ✅ Fallback to empty string to prevent uncontrolled/controlled warnings
                            value={settings.customText || ""}
                            onChange={(e) =>
                                setSettings({ ...settings, customText: e.target.value })
                            }
                            className="mt-2"
                        />
                    )}
                </div>

                <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                        <Label className="text-xs cursor-pointer">Strip Metadata</Label>
                        <Switch
                            checked={settings.stripMetadata}
                            onCheckedChange={(v) => setSettings({ ...settings, stripMetadata: v })}
                        />
                    </div>
                    <p className="text-[11px] text-muted-foreground/80 leading-relaxed">
                        Removes hidden properties like author name and creation date.
                    </p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label className="text-xs cursor-pointer">Remove Annotations</Label>
                        <Switch
                            checked={settings.removeAnnotations}
                            onCheckedChange={(v) =>
                                setSettings({ ...settings, removeAnnotations: v })
                            }
                        />
                    </div>
                    <p className="text-[11px] text-muted-foreground/80 leading-relaxed">
                        Deletes existing comments, highlights, and form fields.
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2">
                <Button
                    onClick={onUndo}
                    disabled={pastLength === 0}
                    variant="outline"
                    size="sm"
                    className="gap-1"
                >
                    <Undo className="w-3.5 h-3.5" /> Undo
                </Button>
                <Button
                    onClick={onRedo}
                    disabled={futureLength === 0}
                    variant="outline"
                    size="sm"
                    className="gap-1"
                >
                    <Redo className="w-3.5 h-3.5" /> Redo
                </Button>
            </div>

            <div className="space-y-2">
                <Button
                    onClick={onApplyAndDownload}
                    disabled={redactionsLength === 0 || isProcessing}
                    className="w-full gap-2"
                    size="lg"
                >
                    {isProcessing ? "Processing..." : "Apply & Download"}
                </Button>

                <Button onClick={onReset} variant="outline" className="w-full gap-2" size="lg">
                    <Trash2 className="w-4 h-4" /> Reset
                </Button>
            </div>
        </div>
    );
}
