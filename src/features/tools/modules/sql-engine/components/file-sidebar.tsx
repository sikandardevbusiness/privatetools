"use client";

import { useCallback, useState } from "react";
import { FileText, Database, Plus, Trash2, Download } from "lucide-react";

import { formatBytes, type LoadedFile } from "@sikandardevbusiness/data-toolkit";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

interface FileSidebarProps {
    files: LoadedFile[];
    activeFile: string | null;
    onSelectFile: (fileName: string) => void;
    onAddFiles: (files: File[]) => void;
    onDeleteFile: (fileName: string) => void;
    onExport: (scope: "active" | "all", format: "csv" | "json") => void;
    isLoading?: boolean;
    className?: string;
}

export function FileSidebar({
    files,
    activeFile,
    onSelectFile,
    onAddFiles,
    onDeleteFile,
    onExport,
    isLoading,
}: FileSidebarProps) {
    const [isExportOpen, setIsExportOpen] = useState(false);
    const [exportScope, setExportScope] = useState<"active" | "all">("active");
    const [exportFormat, setExportFormat] = useState<"csv" | "json">("csv");

    const handleFileInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                onAddFiles(Array.from(e.target.files));
                e.target.value = ""; // Reset input
            }
        },
        [onAddFiles],
    );

    const handleDeleteClick = useCallback(
        (e: React.MouseEvent, fileName: string) => {
            e.stopPropagation();
            if (confirm(`Delete ${fileName}?`)) {
                onDeleteFile(fileName);
            }
        },
        [onDeleteFile],
    );

    const handleExportClick = () => {
        onExport(exportScope, exportFormat);
        setIsExportOpen(false);
    };

    return (
        <>
            <div className="pb-4 border-b bg-background/50 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-primary" />
                        <h3 className="text-sm font-semibold text-foreground">Uploaded Files</h3>
                    </div>
                    <span className="text-xs text-muted-foreground">{files.length}</span>
                </div>

                <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => document.getElementById("file-input")?.click()}
                    disabled={isLoading}
                >
                    <Plus className="w-4 h-4" />
                    Add Files
                </Button>
                <input
                    id="file-input"
                    type="file"
                    accept=".csv,.json"
                    multiple
                    className="hidden"
                    onChange={handleFileInput}
                />

                {/* Export Button */}
                <Dialog open={isExportOpen} onOpenChange={setIsExportOpen}>
                    <DialogTrigger
                        className="w-full gap-2"
                        render={
                            <Button
                                variant="default"
                                className="w-full gap-2"
                                disabled={isLoading || files.length === 0}
                            >
                                <Download className="w-4 h-4" />
                                Export Data
                            </Button>
                        }
                    ></DialogTrigger>
                    <DialogContent className="sm:max-w-106.25">
                        <DialogHeader>
                            <DialogTitle>Export Data</DialogTitle>
                            <DialogDescription>
                                Choose which files to export and in what format. This will export
                                the current state of the data.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-6">
                            {/* Scope Selection */}
                            <div className="grid gap-3">
                                <Label>Export Scope</Label>
                                <Select
                                    value={exportScope}
                                    onValueChange={(value) =>
                                        setExportScope(value as "active" | "all")
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select scope" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">
                                            Active File {activeFile && `(${activeFile})`}
                                        </SelectItem>
                                        <SelectItem value="all">
                                            All Files ({files.length} files)
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Format Selection */}
                            <div className="grid gap-3">
                                <Label>Format</Label>
                                <Select
                                    value={exportFormat}
                                    onValueChange={(value) =>
                                        setExportFormat(value as "csv" | "json")
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select format" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="csv">CSV</SelectItem>
                                        <SelectItem value="json">JSON</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* BIG BUTTONS ADDED HERE */}
                        <DialogFooter className="flex-col sm:flex-row gap-3 mt-4">
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-auto"
                                onClick={() => setIsExportOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                size="lg"
                                className="w-full sm:w-auto"
                                onClick={handleExportClick}
                                disabled={isLoading}
                            >
                                {isLoading ? "Exporting..." : "Download"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <ScrollArea className="flex-1">
                <div className="space-y-1">
                    {files.map((file) => (
                        <div
                            key={file.name}
                            className={cn(
                                "group relative flex items-start gap-2 px-3 py-2.5 rounded-md text-sm hover:bg-accent transition-colors",
                                activeFile === file.name && "bg-accent font-medium",
                            )}
                        >
                            <button
                                onClick={() => onSelectFile(file.name)}
                                className="flex-1 min-w-0 text-left"
                            >
                                <div className="flex items-start gap-2">
                                    <FileText className="w-8 h-8 mt-0.5 text-muted-foreground shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <div
                                            className="font-medium text-foreground truncate pr-6"
                                            title={file.name}
                                        >
                                            {file.name}
                                        </div>
                                        {/* ENHANCED DESCRIPTION ADDED HERE */}
                                        <div className="text-xs text-muted-foreground mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                                            <span>{formatBytes(file.size)}</span>
                                            <span>{file.rowCount.toLocaleString()} rows</span>
                                        </div>
                                    </div>
                                </div>
                            </button>
                            <button
                                onClick={(e) => handleDeleteClick(e, file.name)}
                                className="absolute right-2 top-2 p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground transition-all"
                                title="Delete file"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))}
                    {files.length === 0 && (
                        <div className="text-center py-8 text-sm text-muted-foreground">
                            No files uploaded
                        </div>
                    )}
                </div>
            </ScrollArea>
        </>
    );
}
