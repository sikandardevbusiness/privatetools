"use client";

import { Settings2, Download, RotateCcw, FileDown } from "lucide-react";
import { memo } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PropSlider } from "@/components/ui/prop-slider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export interface MergerSettingsProps {
    singlePage: boolean;
    pageSize: "original" | "a4";
    scaleFactor: number;
    imagesPerPage: number;
    marginX: number;
    marginY: number;
    quality: number;
    isProcessing: boolean;
    isMerged: boolean;
    progress: number;
    setSinglePage: (v: boolean) => void;
    setPageSize: (v: "original" | "a4") => void;
    setScaleFactor: (v: number) => void;
    setImagesPerPage: (v: number) => void;
    setMarginX: (v: number) => void;
    setMarginY: (v: number) => void;
    setQuality: (v: number) => void;
    onMerge: () => void;
    onDownload: () => void;
    onReset: () => void;
}

export const MergerSettings = memo(function MergerSettings({
    singlePage,
    pageSize,
    scaleFactor,
    imagesPerPage,
    marginX,
    marginY,
    quality,
    isProcessing,
    isMerged,
    progress,
    setSinglePage,
    setPageSize,
    setScaleFactor,
    setImagesPerPage,
    setMarginX,
    setMarginY,
    setQuality,
    onMerge,
    onDownload,
    onReset,
}: MergerSettingsProps) {
    return (
        <Card className="w-full">
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Settings2 className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">
                            PDF Merger Settings
                        </span>
                    </div>
                    <Button variant="outline" size="sm" onClick={onReset}>
                        <RotateCcw /> Reset
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Page Layout Mode */}
                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Layout Mode</Label>
                        <Select
                            value={singlePage ? "single" : "paginated"}
                            onValueChange={(v) => setSinglePage(v === "single")}
                            disabled={isProcessing}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="single">
                                    Single Page (Continuous Webtoon Scroll)
                                </SelectItem>
                                <SelectItem value="paginated">
                                    Multiple Pages (Paginated)
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-[10px] text-muted-foreground">
                            {singlePage
                                ? "All images merged into 1 continuous page (no page breaks)"
                                : "Splits images across separate PDF pages"}
                        </p>
                    </div>

                    {/* Page Size */}
                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Page Size</Label>
                        <Select
                            value={pageSize}
                            onValueChange={(v) => setPageSize(v as "original" | "a4")}
                            disabled={isProcessing}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="original">Original Dimensions</SelectItem>
                                <SelectItem value="a4">A4 (Standardized)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Images Per Page (Disabled in Single Page Mode) */}
                    <div className="space-y-2 col-span-2">
                        <Label htmlFor="imagesPerPage" className="text-xs text-muted-foreground">
                            Images Per Page
                        </Label>
                        <Input
                            id="imagesPerPage"
                            type="number"
                            min={1}
                            max={50}
                            value={singlePage ? "All" : imagesPerPage}
                            onChange={(e) =>
                                setImagesPerPage(Math.max(1, parseInt(e.target.value) || 1))
                            }
                            disabled={isProcessing || singlePage}
                        />
                        <p className="text-[10px] text-muted-foreground">
                            {singlePage
                                ? "Automatic (All images are on 1 continuous page)"
                                : "Number of slices per PDF page (1-50)"}
                        </p>
                    </div>

                    {/* Margin X */}
                    <div className="space-y-2">
                        <Label htmlFor="marginX" className="text-xs text-muted-foreground">
                            Horizontal Margin (X)
                        </Label>
                        <Input
                            id="marginX"
                            type="number"
                            min={0}
                            max={200}
                            value={marginX}
                            onChange={(e) => setMarginX(Math.max(0, parseInt(e.target.value) || 0))}
                            disabled={isProcessing}
                        />
                        <p className="text-[10px] text-muted-foreground">
                            Horizontal gap/spacing in pixels (default: 0)
                        </p>
                    </div>

                    {/* Margin Y */}
                    <div className="space-y-2">
                        <Label htmlFor="marginY" className="text-xs text-muted-foreground">
                            Vertical Margin (Y)
                        </Label>
                        <Input
                            id="marginY"
                            type="number"
                            min={0}
                            max={200}
                            value={marginY}
                            onChange={(e) => setMarginY(Math.max(0, parseInt(e.target.value) || 0))}
                            disabled={isProcessing}
                        />
                        <p className="text-[10px] text-muted-foreground">
                            Vertical gap/spacing in pixels (keep 0 for seamless manhwa)
                        </p>
                    </div>

                    {/* Scale Factor */}
                    <div className="space-y-2">
                        <PropSlider
                            label="Display Scale"
                            value={scaleFactor * 100}
                            onChange={(v) => setScaleFactor(v / 100)}
                            min={25}
                            max={150}
                            step={5}
                            unit="%"
                        />
                    </div>

                    {/* Quality */}
                    <div className="space-y-2">
                        <PropSlider
                            label="Image Quality"
                            value={quality}
                            onChange={setQuality}
                            min={10}
                            max={100}
                            step={5}
                            unit="%"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="space-y-2">
                    <Button
                        onClick={onMerge}
                        disabled={isProcessing}
                        size="lg"
                        className="w-full gap-2"
                    >
                        {isProcessing ? (
                            <>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />{" "}
                                Merging... {progress}%
                            </>
                        ) : (
                            <>
                                <FileDown className="w-4 h-4" />{" "}
                                {isMerged ? "Re-merge PDF" : "Merge to PDF"}
                            </>
                        )}
                    </Button>
                    {isMerged && (
                        <Button
                            onClick={onDownload}
                            variant="outline"
                            size="lg"
                            className="w-full gap-2"
                        >
                            <Download className="w-4 h-4" /> Download Merged PDF
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
});
