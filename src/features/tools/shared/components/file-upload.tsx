"use client";

import { File, FileText, Image, Music, Upload, Video, X } from "lucide-react";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { cn } from "@/lib/utils";

interface FileUploadProps {
    accept: string;
    maxSizeMB?: number;
    multiple?: boolean;
    progress?: number;
    processing?: boolean;
    allowedFormats?: string[];
    onFilesSelected: (files: File[]) => void;
}

const formatIcons: Record<string, React.ReactNode> = {
    image: <Image className="h-5 w-5" />,
    audio: <Music className="h-5 w-5" />,
    video: <Video className="h-5 w-5" />,
    pdf: <FileText className="h-5 w-5" />,
    text: <FileText className="h-5 w-5" />,
};

export function FileUpload({
    accept,
    maxSizeMB = 50,
    multiple = false,
    onFilesSelected,
    allowedFormats,
    processing = false,
    progress = 0,
}: FileUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState<File[]>([]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const processFiles = useCallback(
        (fileList: FileList | null) => {
            if (!fileList) return;

            const newFiles = Array.from(fileList).filter((file) => {
                // Check file size
                if (file.size > maxSizeMB * 1024 * 1024) {
                    alert(`File ${file.name} exceeds ${maxSizeMB}MB limit`);
                    return false;
                }

                // Check file type if allowedFormats specified
                if (allowedFormats) {
                    const ext = file.name.split(".").pop()?.toLowerCase();
                    if (!ext || !allowedFormats.includes(ext)) {
                        alert(`File type ${ext} is not allowed`);
                        return false;
                    }
                }

                return true;
            });

            const updatedFiles = multiple ? [...files, ...newFiles] : newFiles.slice(0, 1);
            setFiles(updatedFiles);
            onFilesSelected(updatedFiles);
        },
        [files, maxSizeMB, allowedFormats, multiple, onFilesSelected],
    );

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(false);
            processFiles(e.dataTransfer.files);
        },
        [processFiles],
    );

    const handleFileInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            processFiles(e.target.files);
        },
        [processFiles],
    );

    const removeFile = useCallback(
        (index: number) => {
            const updatedFiles = files.filter((_, i) => i !== index);
            setFiles(updatedFiles);
            onFilesSelected(updatedFiles);
        },
        [files, onFilesSelected],
    );

    const getFileIcon = (file: File) => {
        const type = file.type.split("/")[0];
        return formatIcons[type] || <File className="h-5 w-5" />;
    };

    return (
        <div className="space-y-4">
            {/* Drop Zone */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                    "relative border-2 border-dashed rounded-xl p-8 text-center transition-colors",
                    isDragging
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50",
                )}
            >
                <input
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={processing}
                />

                <div className="flex flex-col items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Upload className="h-8 w-8 text-primary" />
                    </div>

                    <div>
                        <p className="text-lg font-medium mb-1">
                            Drop your file{multiple ? "s" : ""} here, or click to browse
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Max file size: {maxSizeMB}MB. Fast local processing.
                        </p>
                    </div>

                    {allowedFormats && (
                        <div className="flex flex-wrap justify-center gap-2">
                            {allowedFormats.map((format) => (
                                <span
                                    key={format}
                                    className="px-2 py-1 rounded-md bg-muted text-xs font-medium"
                                >
                                    .{format}
                                </span>
                            ))}
                        </div>
                    )}

                    <p className="text-xs text-muted-foreground">
                        Tip: Press <kbd className="px-2 py-0.5 rounded bg-muted">⌘V</kbd> to paste
                        from clipboard
                    </p>
                </div>
            </div>

            {/* File List */}
            {files.length > 0 && (
                <div className="space-y-2">
                    {files.map((file, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card"
                        >
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                {getFileIcon(file)}
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{file.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                                {processing && <Progress value={progress} className="mt-2 h-1" />}
                            </div>

                            {!processing && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeFile(index)}
                                    className="shrink-0"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
