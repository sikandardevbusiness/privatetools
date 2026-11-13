"use client";

import { useCallback, useRef, useState } from "react";
import { Cropper, type CropperRef, OutputFormat } from "@sikandardevbusiness/image-cropper";

import { ToolFullScreen } from "@/features/tools/shared/components/layouts/tool-fullscreen";
import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";
import { CropperSettings } from "./settings";
import { cropperToolConfigMap } from "./index";

import type { BaseTool } from "@/features/tools/shared/types";

export default function ImageCropperTool({ tool }: { tool: BaseTool }) {
    const cropperRef = useRef<CropperRef>(null);
    const config = cropperToolConfigMap[tool.id] || cropperToolConfigMap["universal-image-cropper"];

    const [image, setImage] = useState<string | null>(null);
    const [outputFormat, setOutputFormat] = useState<OutputFormat>(
        (config.defaultFormat as OutputFormat) || "png",
    );
    const [aspectRatio, setAspectRatio] = useState<number | undefined>(config.defaultAspectRatio);
    const [borderRadius, setBorderRadius] = useState<number>(config.defaultBorderRadius);
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
        // The new package handles the rounded mask internally!
        const canvas = cropperRef.current?.getCroppedCanvas();
        if (!canvas) return;

        const link = document.createElement("a");
        link.href = canvas.toDataURL(`image/${outputFormat}`);
        link.download = `cropped-image.${outputFormat}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
            <ToolHeader tool={tool}>
                <FileUpload
                    multiple={false}
                    accept={config.acceptType}
                    onFilesSelected={handleFilesSelected}
                    allowedFormats={config.allowedFormats}
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
                    aspectRatio={aspectRatio}
                    borderRadius={borderRadius}
                    outputFormat={outputFormat}
                    onReset={handleReset}
                    onDownload={handleDownload}
                    onNewImage={handleNewImage}
                    onAspectRatioChange={setAspectRatio}
                    onBorderRadiusChange={setBorderRadius}
                    onOutputFormatChange={setOutputFormat}
                />
            }
        >
            <div className="p-5 max-w-5xl mx-auto h-full flex items-center justify-center">
                {/* Dark background container for the cropper stage */}
                <div className="w-full h-[70vh] max-h-[80vh] rounded-lg overflow-hidden bg-[#0f1115]">
                    <Cropper
                        ref={cropperRef}
                        src={image}
                        aspectRatio={aspectRatio}
                        borderRadius={borderRadius}
                        outputFormat={outputFormat}
                        showGrid={true}
                        className="w-full h-full"
                    />
                </div>
            </div>
        </ToolFullScreen>
    );
}
