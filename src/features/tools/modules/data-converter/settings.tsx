"use client";

import { Download, Settings2 } from "lucide-react";
import { memo } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export interface ConversionSettingsProps {
    targetFormat: string;
    outputFormats: string[];
    isProcessing: boolean;
    setTargetFormat: (v: string) => void;
    onDownload: () => void;
}

export const ConversionSettings = memo(function ConversionSettings({
    targetFormat,
    isProcessing,
    outputFormats,
    onDownload,
    setTargetFormat,
}: ConversionSettingsProps) {
    return (
        <Card>
            <CardContent>
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                            <Settings2 className="w-4 h-4 text-primary" />
                            <h3 className="text-sm font-semibold text-foreground">
                                Conversion Settings
                            </h3>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Choose your output format and download the converted file.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="output-format" className="text-xs text-muted-foreground">
                            Output Format
                        </Label>
                        <Select
                            value={targetFormat}
                            onValueChange={(value) => {
                                if (value) setTargetFormat(value);
                            }}
                        >
                            <SelectTrigger id="output-format" className="w-full">
                                <SelectValue placeholder="Select format" />
                            </SelectTrigger>
                            <SelectContent>
                                {outputFormats.map((fmt) => (
                                    <SelectItem key={fmt} value={fmt}>
                                        {fmt.toUpperCase()}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <p className="text-[10px] text-muted-foreground">
                            Select the format you want to convert your data to.
                        </p>
                    </div>

                    {/* NEW: Quick Tips / Notes Section */}
                    <div className="rounded-lg border border-border bg-muted/30 p-3 space-y-2">
                        <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                            <span className="text-primary">💡</span> Quick Tips
                        </h4>
                        <ul className="text-[11px] text-muted-foreground space-y-1.5 list-disc pl-4">
                            <li>
                                <strong>Search & Filter:</strong> Use the search bar above the table
                                to instantly find specific rows or data.
                            </li>
                            <li>
                                <strong>Customize Columns:</strong> Click the <strong>View</strong>{" "}
                                button to hide or show any column you don{"'"}t need.
                            </li>
                            <li>
                                <strong>Smart Export:</strong> Only the columns you leave{" "}
                                <strong>visible</strong> (checked) will be included in your final
                                downloaded file.
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-2 w-full pt-2">
                        <Button
                            size="lg"
                            onClick={onDownload}
                            disabled={isProcessing}
                            className="w-full"
                        >
                            <Download className="w-4 h-4" />
                            {isProcessing
                                ? "Converting..."
                                : `Download ${targetFormat.toUpperCase()}`}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
});
