"use client";

import { ChevronDownIcon, ShieldCheck, UploadCloud } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { cn } from "@/lib/utils";

interface FileUploadProps {
    accept: string;
    maxSizeMB?: number;
    multiple?: boolean;
    allowedFormats?: string[];
    onFilesSelected: (files: File[]) => void | Promise<void>;
}

export function FileUpload({
    accept,
    maxSizeMB = 2000,
    multiple = false,
    allowedFormats,
    onFilesSelected,
}: FileUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const internalRef = useRef<HTMLInputElement>(null);

    const processFiles = useCallback(
        (fileList: FileList | null) => {
            if (!fileList) return;

            const validFiles = Array.from(fileList).filter((file) => {
                // Check file size
                if (file.size > maxSizeMB * 1024 * 1024) {
                    alert(`File "${file.name}" exceeds the ${maxSizeMB}MB limit.`);
                    return false;
                }

                // Check file type if allowedFormats is specified
                if (allowedFormats) {
                    const ext = file.name.split(".").pop()?.toLowerCase();
                    if (!ext || !allowedFormats.includes(ext)) {
                        alert(`File type ".${ext}" is not allowed.`);
                        return false;
                    }
                }

                return true;
            });

            if (validFiles.length > 0) {
                onFilesSelected(validFiles);
            }
        },
        [maxSizeMB, allowedFormats, onFilesSelected],
    );

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(false);
            processFiles(e.dataTransfer.files);
        },
        [processFiles],
    );

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        processFiles(e.target.files);
        if (e.target) e.target.value = ""; // Reset to allow selecting the same file again
    };

    const triggerFileInput = (e: React.MouseEvent) => {
        e.stopPropagation();
        internalRef.current?.click();
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
            className="relative flex flex-col items-center justify-center w-full p-12 md:p-14 rounded-2xl border-2 border-dashed border-border bg-card hover:border-primary/50 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl group gap-4"
        >
            <input
                ref={internalRef}
                type="file"
                multiple={multiple}
                accept={accept}
                onChange={handleFileChange}
                className="hidden"
            />

            <div
                className={cn(
                    "p-4 rounded-full transition-colors duration-300",
                    isDragging ? "bg-primary/10" : "bg-muted group-hover:bg-primary/10",
                )}
            >
                <UploadCloud
                    className={cn(
                        "w-10 h-10 md:w-12 md:h-12 transition-colors duration-300",
                        isDragging
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-primary",
                    )}
                />
            </div>

            <h3 className="text-xl md:text-2xl font-semibold text-foreground text-center">
                Select your file here to get started
            </h3>
            <p className="text-sm md:text-base text-muted-foreground text-center">
                or drop your file here.
            </p>

            {allowedFormats && (
                <div className="flex flex-wrap justify-center gap-2">
                    {allowedFormats.map((format) => (
                        <span
                            key={format}
                            className="px-2 py-1 rounded-md bg-muted text-xs font-medium text-muted-foreground"
                        >
                            .{format}
                        </span>
                    ))}
                </div>
            )}

            <ButtonGroup>
                <Button>
                    <UploadCloud className="w-4 h-4 mr-2" /> Select File
                </Button>
                <Button className="pl-2">
                    <ChevronDownIcon className="w-4 h-4" />
                </Button>
            </ButtonGroup>

            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                <span>Max {maxSizeMB}MB. 100% Private. Files never leave your device.</span>
            </div>
        </div>
    );
}
