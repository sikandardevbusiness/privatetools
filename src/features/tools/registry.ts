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
    imageConverterToolComponentMap,
    imageConverterToolMetadataList,
} from "./modules/image-converter";
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
import {
    pdfConverterToolComponentMap,
    pdfConverterToolMetadataList,
} from "./modules/pdf-converter";
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
    ...pdfConverterToolMetadataList,
    ...pdfRedactorToolMetadata,
    ...manhwaCropperToolMetadataList,
    ...removeSilenceToolMetadataList,
    ...audioTrimmerToolMetadata,
    ...pdfCompressorToolMetadataList,
    ...imageConverterToolMetadataList,
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
    ...pdfConverterToolComponentMap,
    ...imageCropperToolComponentMap,
    ...audioTrimmerToolComponentMap,
    ...manhwaCropperToolComponentMap,
    ...pdfCompressorToolComponentMap,
    ...removeSilenceToolComponentMap,
    ...imageConverterToolComponentMap,
    ...videoWatermarkToolComponentMap,
    ...imageCompressorToolComponentMap,
    ...dataTransformerToolComponentMap,
    ...thumbnailPreviewToolComponentMap,
    ...imageEmoteConverterToolComponentMap,
};
