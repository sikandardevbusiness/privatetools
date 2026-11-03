import type { BaseTool, ToolComponentMap } from "./shared/types";

import { audioTrimmerToolComponentMap, audioTrimmerToolMetadata } from "./modules/audio-trimmer";
import {
    dataTransformerToolComponentMap,
    dataTransformerToolMetadataList,
} from "./modules/data-transformer";
import { exifWiperToolComponentMap, exifWiperToolMetadataList } from "./modules/exif-wiper";
import {
    fileConverterToolComponentMap,
    fileConverterToolMetadataList,
} from "./modules/file-converter";
import {
    fileCompressorToolComponentMap,
    fileCompressorToolMetadataList,
} from "./modules/file-compressor";
import {
    imageCropperToolComponentMap,
    imageCropperToolMetadataList,
} from "./modules/image-cropper";
import {
    imageEmoteConverterToolComponentMap,
    imageEmoteConverterToolMetadataList,
} from "./modules/image-emote-converter";
import {
    manhwaCropperToolComponentMap,
    manhwaCropperToolMetadataList,
} from "./modules/manhwa-cropper";
import { pdfRedactorToolComponentMap, pdfRedactorToolMetadata } from "./modules/pdf-redactor";
import {
    removeSilenceToolComponentMap,
    removeSilenceToolMetadataList,
} from "./modules/remove-silence";
import {
    thumbnailPreviewToolComponentMap,
    thumbnailPreviewToolMetadataList,
} from "./modules/thumbnail-preview";
import {
    videoWatermarkToolComponentMap,
    videoWatermarkToolMetadataList,
} from "./modules/video-watermark";
import {
    dataConverterToolMetadataList,
    dataConverterToolComponentMap,
} from "@/features/tools/modules/data-converter";

export const toolMetadataList: BaseTool[] = [
    ...imageCropperToolMetadataList,
    ...pdfRedactorToolMetadata,
    ...manhwaCropperToolMetadataList,
    ...removeSilenceToolMetadataList,
    ...audioTrimmerToolMetadata,
    ...dataConverterToolMetadataList,
    ...fileConverterToolMetadataList,
    ...fileCompressorToolMetadataList,
    ...videoWatermarkToolMetadataList,
    ...thumbnailPreviewToolMetadataList,
    ...imageEmoteConverterToolMetadataList,
    ...exifWiperToolMetadataList,
    ...dataTransformerToolMetadataList,
];

export const toolComponentMap: ToolComponentMap = {
    ...exifWiperToolComponentMap,
    ...pdfRedactorToolComponentMap,
    ...imageCropperToolComponentMap,
    ...audioTrimmerToolComponentMap,
    ...manhwaCropperToolComponentMap,
    ...removeSilenceToolComponentMap,
    ...fileConverterToolComponentMap,
    ...dataConverterToolComponentMap,
    ...fileCompressorToolComponentMap,
    ...videoWatermarkToolComponentMap,
    ...dataTransformerToolComponentMap,
    ...thumbnailPreviewToolComponentMap,
    ...imageEmoteConverterToolComponentMap,
};
