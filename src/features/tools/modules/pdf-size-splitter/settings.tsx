"use client";

import { Settings2, Info } from "lucide-react";
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

export type SizeUnit = "kb" | "mb";

export interface SplitterSettingsProps {
    sizeUnit: SizeUnit;
    targetSize: string;
    setTargetSize: (v: string) => void;
    setSizeUnit: (v: SizeUnit) => void;
}

export const SplitterSettings = memo(function SplitterSettings({
    targetSize,
    sizeUnit,
    setSizeUnit,
    setTargetSize,
}: SplitterSettingsProps) {
    return (
        <Card>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                    <Settings2 className="w-4 h-4 text-primary" />
                    Split Settings
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Max Size per Part</Label>
                        <div className="flex w-full rounded-md border border-input bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                            <Input
                                type="number"
                                step="1"
                                min="1"
                                value={targetSize}
                                onChange={(e) => setTargetSize(e.target.value)}
                                placeholder="e.g., 10"
                                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-none h-9"
                            />
                            <Select
                                value={sizeUnit}
                                onValueChange={(v) => setSizeUnit(v as SizeUnit)}
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
                            The tool will split the PDF at page boundaries to ensure no part exceeds
                            this size.
                        </p>
                    </div>
                </div>
                <div className="space-y-2 -mt-2">
                    <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-md border border-border/50">
                        <Info className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                        <div className="space-y-1.5">
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Upload your PDF file(s) and set your desired maximum size per part.
                                After processing, you can download the split parts directly as a
                                single, convenient ZIP file.
                            </p>
                            <div className="text-[10px] text-muted-foreground space-y-1 pt-1 border-t border-border/30">
                                <p>
                                    <strong>Important Limitations:</strong>
                                </p>
                                <ul className="list-disc list-inside space-y-0.5 ml-1">
                                    <li>
                                        <strong>Minimum viable size:</strong> 10 KB (PDFs have
                                        structural overhead)
                                    </li>
                                    <li>
                                        <strong>KB splitting:</strong> Only works for PDFs with many
                                        small pages. Single pages are typically 3-10 KB minimum
                                    </li>
                                    <li>
                                        <strong>Page boundaries:</strong> Splitting occurs at page
                                        breaks only (cannot split individual pages)
                                    </li>
                                    <li>
                                        <strong>File size increase:</strong> Total size of all parts
                                        may be 5-15% larger due to duplicated PDF structure in each
                                        part
                                    </li>
                                    <li>
                                        <strong>Recommended:</strong> Use MB (megabytes) for most
                                        PDFs. KB splitting only for very specific use cases
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
});
