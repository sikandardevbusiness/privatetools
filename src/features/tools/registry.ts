import type { BaseTool, ToolComponentMap } from "./shared/types";

import { audioTrimmerToolComponentMap, audioTrimmerToolMetadata } from "./modules/audio-trimmer";
import {
    dataTransformerToolComponentMap,
    dataTransformerToolMetadataList,
} from "./modules/data-transformer";
import { exifWiperToolComponentMap, exifWiperToolMetadataList } from "./modules/exif-wiper";
import {
    imageCompressorToolComponentMap,
    imageCompressorToolMetadataList,
} from "./modules/image-compressor";
import {
    fileConverterToolComponentMap,
    fileConverterToolMetadataList,
} from "./modules/file-converter";
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
import {
    pdfCompressorToolComponentMap,
    pdfCompressorToolMetadataList,
} from "./modules/pdf-compressor";
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

export const toolMetadataList: BaseTool[] = [
    ...imageCropperToolMetadataList,
    ...pdfRedactorToolMetadata,
    ...manhwaCropperToolMetadataList,
    ...removeSilenceToolMetadataList,
    ...audioTrimmerToolMetadata,
    ...pdfCompressorToolMetadataList,
    ...fileConverterToolMetadataList,
    ...imageCompressorToolMetadataList,
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
    ...pdfCompressorToolComponentMap,
    ...removeSilenceToolComponentMap,
    ...fileConverterToolComponentMap,
    ...videoWatermarkToolComponentMap,
    ...imageCompressorToolComponentMap,
    ...dataTransformerToolComponentMap,
    ...thumbnailPreviewToolComponentMap,
    ...imageEmoteConverterToolComponentMap,
};
