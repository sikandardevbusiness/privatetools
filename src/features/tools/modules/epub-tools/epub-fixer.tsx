"use client";

import { useState, useRef, ChangeEvent } from "react";
import {
    scanEpub,
    repairEpub,
    type ScanReport,
    type FixResult,
} from "@sikandardevbusiness/epub-engine";

import { CheckCircle2, Scan, Wrench, Download } from "lucide-react";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";
import { Item, ItemGroup, ItemContent, ItemTitle, ItemDescription } from "@/components/ui/item";

import { cn } from "@/lib/utils";
import { epubToolsConfigMap } from "./index";
import type { BaseTool } from "@/features/tools/shared/types";

export default function EpubFixerClient({ tool }: { tool: BaseTool }) {
    const config = epubToolsConfigMap[tool.id];
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [fixing, setFixing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [scanReport, setScanReport] = useState<ScanReport | null>(null);
    const [fixResult, setFixResult] = useState<FixResult | null>(null);
    const [acknowledged, setAcknowledged] = useState(false);

    const handleFileSelect = async (selectedFiles: File[]) => {
        const selectedFile = selectedFiles[0];
        if (!selectedFile) return;
        if (!selectedFile.name.toLowerCase().endsWith(".epub")) {
            alert("Please upload a valid .epub archive.");
            return;
        }
        setFile(selectedFile);
        setLoading(true);
        setScanReport(null);
        setFixResult(null);
        try {
            const res = await scanEpub(selectedFile, selectedFile.name);
            setScanReport(res);
        } catch (err) {
            alert(`Validation error: ${(err as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleFix = async () => {
        if (!file || !scanReport) return;
        setFixing(true);
        setProgress(20);
        setAcknowledged(false);
        try {
            setTimeout(() => setProgress(50), 300);
            const result = await repairEpub(file, file.name);
            setProgress(100);
            setFixResult(result);
        } catch (err) {
            alert(`Repair failed: ${(err as Error).message}`);
        } finally {
            setFixing(false);
        }
    };

    const handleReset = () => {
        setFile(null);
        setScanReport(null);
        setFixResult(null);
        setAcknowledged(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleDownload = () => {
        if (!fixResult?.fixedBlob) return;
        const url = URL.createObjectURL(fixResult.fixedBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fixResult.fixedFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <ToolShell>
            <ToolHeader tool={tool}>
                {!file ? (
                    <FileUpload
                        accept={config.acceptType}
                        maxSizeMB={50}
                        multiple={false}
                        onFilesSelected={handleFileSelect}
                        allowedFormats={config.inputFormats}
                    />
                ) : scanReport && !loading ? (
                    <Card className="overflow-hidden">
                        <CardHeader className="border-b border-border flex justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2 text-base text-foreground">
                                    {scanReport.fileName}
                                </CardTitle>
                                <CardDescription className="text-xs text-muted-foreground">
                                    {(scanReport.fileSize / (1024 * 1024)).toFixed(2)} MB • EPUB
                                    Version: {scanReport.version} • Chapters:{" "}
                                    {scanReport.stats.chaptersCount}
                                </CardDescription>
                            </div>
                            <Button variant="outline" size="sm" onClick={handleReset}>
                                Scan Another
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-border">
                                <div className="flex items-center justify-between px-6 py-3.5">
                                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                        Title
                                    </span>
                                    <span
                                        className="text-sm font-semibold text-foreground truncate max-w-[60%] text-right"
                                        title={scanReport.metadata.title}
                                    >
                                        {scanReport.metadata.title}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between px-6 py-3.5">
                                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                        Author
                                    </span>
                                    <span
                                        className="text-sm font-semibold text-foreground truncate max-w-[60%] text-right"
                                        title={scanReport.metadata.author}
                                    >
                                        {scanReport.metadata.author}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between px-6 py-3.5">
                                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                        Auto-Repairable
                                    </span>
                                    <span className="text-sm font-bold text-primary">
                                        {scanReport.stats.autoFixableCount} issue(s)
                                    </span>
                                </div>
                                <div className="flex items-center justify-between px-6 py-3.5">
                                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                        Manual Review
                                    </span>
                                    <span className="text-sm font-bold text-foreground">
                                        {scanReport.stats.manualReviewCount} issue(s)
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="w-full max-w-4xl mx-auto px-4 pt-8">
                        <Card>
                            <CardContent className="py-12 flex flex-col items-center justify-center space-y-4">
                                <div className="relative">
                                    <Scan className="w-12 h-12 text-primary animate-pulse" />
                                    <div className="absolute inset-0 w-12 h-12 border-2 border-primary/30 rounded-full animate-ping" />
                                </div>
                                <div className="text-center space-y-1">
                                    <p className="font-medium text-sm text-foreground">
                                        Scanning EPUB Structure...
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Decompressing and parsing package XML
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </ToolHeader>

            {fixing && (
                <div className="w-full max-w-4xl mx-auto px-4 pt-8">
                    <Card>
                        <CardContent className="py-8 space-y-3">
                            <Progress value={progress} />
                            <p className="text-xs text-center text-muted-foreground">
                                Repairing EPUB...
                            </p>
                        </CardContent>
                    </Card>
                </div>
            )}

            {fixResult && !fixing && (
                <div className="w-full max-w-4xl mx-auto px-4 pt-12 space-y-4">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                                Repaired: {fixResult.fixedFileName}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <p className="text-sm font-semibold">Applied Fixes:</p>
                                {fixResult.appliedPatches.map((patch, i) => (
                                    <div
                                        key={i}
                                        className="text-xs bg-primary/10 text-primary p-2 rounded font-mono"
                                    >
                                        ✓ {patch}
                                    </div>
                                ))}
                            </div>

                            {fixResult.remainingIssues.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-sm font-semibold text-amber-600">
                                        Manual Review Needed:
                                    </p>
                                    {fixResult.remainingIssues.map((issue, i) => (
                                        <div key={i} className="text-xs bg-muted p-2 rounded">
                                            <span className="font-bold">{issue.code}:</span>{" "}
                                            {issue.message}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="flex items-start gap-2 bg-muted/50 p-3 rounded">
                                <input
                                    type="checkbox"
                                    checked={acknowledged}
                                    onChange={(e) => setAcknowledged(e.target.checked)}
                                    className="mt-0.5"
                                />
                                <label className="text-xs text-muted-foreground cursor-pointer">
                                    I acknowledge the fixes were applied. Manual issues need
                                    editorial review.
                                </label>
                            </div>

                            <Button
                                onClick={handleDownload}
                                disabled={!acknowledged}
                                className={cn(
                                    "w-full",
                                    !acknowledged && "opacity-50 cursor-not-allowed",
                                )}
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Download Repaired EPUB
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}

            {scanReport && !loading && !fixing && !fixResult && (
                <div className="w-full max-w-4xl mx-auto px-4 pt-12 space-y-4">
                    <h3 className="text-2xl font-semibold">Issues</h3>
                    {scanReport.stats.autoFixableCount > 0 && (
                        <Button size="lg" onClick={handleFix} className="w-full shadow-sm">
                            <Wrench className="w-5 h-5 mr-2" />
                            Fix {scanReport.stats.autoFixableCount} Issue(s) Automatically
                        </Button>
                    )}

                    {scanReport.issues.length === 0 ? (
                        <Card>
                            <CardContent className="py-8 text-center">
                                <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-3" />
                                <p className="font-semibold text-primary">No Issues Found</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    EPUB is valid and KDP-ready
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <ItemGroup>
                            {scanReport.issues.map((issue, idx) => (
                                <Item key={idx} variant="muted">
                                    <ItemContent className="flex-1 space-y-2">
                                        <div>
                                            <ItemTitle className="text-sm">
                                                <span className="font-semibold">{issue.code}:</span>{" "}
                                                {issue.title}
                                            </ItemTitle>

                                            <ItemDescription className="text-xs text-muted-foreground">
                                                {issue.message}
                                            </ItemDescription>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-border/50 text-xs">
                                            <div className="space-y-0.5">
                                                <p className="font-semibold text-foreground">
                                                    KDP Impact:
                                                </p>
                                                <p className="text-muted-foreground leading-relaxed">
                                                    {issue.kdpImpact}
                                                </p>
                                            </div>
                                            <div className="space-y-0.5">
                                                <p className="font-semibold text-foreground">
                                                    Remediation:
                                                </p>
                                                <p className="text-muted-foreground leading-relaxed">
                                                    {issue.manualFixGuide}
                                                </p>
                                            </div>
                                        </div>
                                    </ItemContent>
                                </Item>
                            ))}
                        </ItemGroup>
                    )}
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept={config.acceptType}
                className="hidden"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files) {
                        handleFileSelect(Array.from(e.target.files));
                        e.target.value = "";
                    }
                }}
            />
        </ToolShell>
    );
}
