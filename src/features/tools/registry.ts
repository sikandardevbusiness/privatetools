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
import { pdfRedactorToolComponentMap, pdfRedactorToolMetadataList } from "./modules/pdf-redactor";
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
import {
    audioSpeedChangerToolComponentMap,
    audioSpeedChangerToolMetadataList,
} from "./modules/audio-speed-changer";
import { sqlEngineToolComponentMap, sqlEngineToolMetadataList } from "./modules/sql-engine";
import { epubToolsComponentMap, epubToolsMetadataList } from "./modules/epub-tools";
import {
    audioVolumeNormalizerToolComponentMap,
    audioVolumeNormalizerToolMetadataList,
} from "./modules/audio-volume-normalizer";
import {
    audioTagEditorToolComponentMap,
    audioTagEditorToolMetadataList,
} from "./modules/audio-tag-editor";
import { audioMergerToolComponentMap, audioMergerToolMetadataList } from "./modules/audio-merger";
import {
    pdfSizeSplitterToolComponentMap,
    pdfSizeSplitterToolMetadataList,
} from "./modules/pdf-size-splitter";

export const toolMetadataList: BaseTool[] = [
    ...imageCropperToolMetadataList,
    ...pdfRedactorToolMetadataList,
    ...manhwaCropperToolMetadataList,
    ...removeSilenceToolMetadataList,
    ...audioTrimmerToolMetadata,
    ...audioSpeedChangerToolMetadataList,
    ...audioMergerToolMetadataList,
    ...audioTagEditorToolMetadataList,
    ...audioVolumeNormalizerToolMetadataList,
    ...epubToolsMetadataList,
    ...pdfSizeSplitterToolMetadataList,
    ...dataConverterToolMetadataList,
    ...fileConverterToolMetadataList,
    ...fileCompressorToolMetadataList,
    ...videoWatermarkToolMetadataList,
    ...thumbnailPreviewToolMetadataList,
    ...imageEmoteConverterToolMetadataList,
    ...exifWiperToolMetadataList,
    ...sqlEngineToolMetadataList,
    ...dataTransformerToolMetadataList,
];

export const toolComponentMap: ToolComponentMap = {
    ...epubToolsComponentMap,
    ...exifWiperToolComponentMap,
    ...sqlEngineToolComponentMap,
    ...audioMergerToolComponentMap,
    ...pdfRedactorToolComponentMap,
    ...imageCropperToolComponentMap,
    ...audioTrimmerToolComponentMap,
    ...manhwaCropperToolComponentMap,
    ...removeSilenceToolComponentMap,
    ...fileConverterToolComponentMap,
    ...dataConverterToolComponentMap,
    ...audioTagEditorToolComponentMap,
    ...fileCompressorToolComponentMap,
    ...videoWatermarkToolComponentMap,
    ...dataTransformerToolComponentMap,
    ...pdfSizeSplitterToolComponentMap,
    ...thumbnailPreviewToolComponentMap,
    ...audioSpeedChangerToolComponentMap,
    ...imageEmoteConverterToolComponentMap,
    ...audioVolumeNormalizerToolComponentMap,
};
