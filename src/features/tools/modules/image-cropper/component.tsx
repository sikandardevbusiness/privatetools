"use client";

import { useCallback, useRef, useState } from "react";
import { Cropper, CropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

import { ToolFullScreen } from "@/features/tools/shared/components/layouts/tool-fullscreen";
import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";
import { CropperSettings } from "./settings";

import type { BaseTool } from "@/features/tools/shared/types";

export default function ImageCropperTool({ tool }: { tool: BaseTool }) {
    const cropperRef = useRef<CropperRef>(null);
    const [image, setImage] = useState<string | null>(null);
    const [outputFormat, setOutputFormat] = useState("png");
    const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handleFilesSelected = useCallback((files: File[]) => {
        if (files.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
                setIsFullScreen(true);
            };
            reader.readAsDataURL(files[0]);
        }
    }, []);

    const handleDownload = useCallback(() => {
        if (!cropperRef.current) return;
        const canvas = cropperRef.current.getCanvas();
        if (canvas) {
            const link = document.createElement("a");
            link.href = canvas.toDataURL(`image/${outputFormat}`);
            link.download = `cropped-image.${outputFormat}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }, [outputFormat]);

    const handleReset = useCallback(() => {
        cropperRef.current?.reset();
    }, []);

    const handleNewImage = useCallback(() => {
        setImage(null);
        setIsFullScreen(false);
    }, []);

    if (!image) {
        return (
            <ToolHeader title={tool.name} description={tool.description}>
                <FileUpload
                    multiple={false}
                    accept="image/*"
                    onFilesSelected={handleFilesSelected}
                    allowedFormats={["jpg", "jpeg", "png", "webp", "gif", "bmp"]}
                />
            </ToolHeader>
        );
    }

    return (
        <ToolFullScreen
            title={tool.name}
            isFullScreen={isFullScreen}
            onToggleFullScreen={handleNewImage}
            sidebar={
                <CropperSettings
                    onReset={handleReset}
                    aspectRatio={aspectRatio}
                    outputFormat={outputFormat}
                    onDownload={handleDownload}
                    onNewImage={handleNewImage}
                    onAspectRatioChange={setAspectRatio}
                    onOutputFormatChange={setOutputFormat}
                />
            }
        >
            <Cropper
                ref={cropperRef}
                src={image}
                stencilProps={{
                    aspectRatio,
                    movable: true,
                    resizable: true,
                }}
                className="cropper-container"
            />
        </ToolFullScreen>
    );
}
