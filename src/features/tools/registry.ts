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
import {
    audioTranscriberToolComponentMap,
    audioTranscriberToolMetadataList,
} from "./modules/audio-transcriber";
import {
    harSanitizerToolComponentMap,
    harSanitizerToolMetadataList,
} from "./modules/har-sanitizer";
import {
    manhwaPdfMergerToolComponentMap,
    manhwaPdfMergerToolMetadataList,
} from "./modules/manhwa-pdf-merger";
import {
    colorConverterToolComponentMap,
    colorConverterToolMetadataList,
} from "./modules/color-converter";
import {
    colorPaletteToolComponentMap,
    colorPaletteToolMetadataList,
} from "./modules/color-palette";
import {
    imagePaletteToolComponentMap,
    imagePaletteToolMetadataList,
} from "./modules/image-palette";
import {
    contrastCheckerToolComponentMap,
    contrastCheckerToolMetadataList,
} from "./modules/contrast-checker";
import {
    colorblindToolComponentMap,
    colorblindToolMetadataList,
} from "./modules/colorblind-simulator";
import { gradientToolComponentMap, gradientToolMetadataList } from "./modules/gradient-generator";
import {
    imageColorPickerToolComponentMap,
    imageColorPickerToolMetadataList,
} from "./modules/image-color-picker";

export const toolMetadataList: BaseTool[] = [
    ...imageCropperToolMetadataList,
    ...pdfRedactorToolMetadataList,
    ...manhwaCropperToolMetadataList,
    ...removeSilenceToolMetadataList,
    ...audioTrimmerToolMetadata,
    ...audioSpeedChangerToolMetadataList,
    ...audioTranscriberToolMetadataList,
    ...audioMergerToolMetadataList,
    ...audioTagEditorToolMetadataList,
    ...audioVolumeNormalizerToolMetadataList,
    ...manhwaPdfMergerToolMetadataList,
    ...colorConverterToolMetadataList,
    ...colorPaletteToolMetadataList,
    ...contrastCheckerToolMetadataList,
    ...colorblindToolMetadataList,
    ...imagePaletteToolMetadataList,
    ...gradientToolMetadataList,
    ...imageColorPickerToolMetadataList,
    ...epubToolsMetadataList,
    ...pdfSizeSplitterToolMetadataList,
    ...dataConverterToolMetadataList,
    ...harSanitizerToolMetadataList,
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
    ...gradientToolComponentMap,
    ...exifWiperToolComponentMap,
    ...sqlEngineToolComponentMap,
    ...colorblindToolComponentMap,
    ...audioMergerToolComponentMap,
    ...pdfRedactorToolComponentMap,
    ...imageCropperToolComponentMap,
    ...audioTrimmerToolComponentMap,
    ...harSanitizerToolComponentMap,
    ...colorPaletteToolComponentMap,
    ...imagePaletteToolComponentMap,
    ...manhwaCropperToolComponentMap,
    ...removeSilenceToolComponentMap,
    ...fileConverterToolComponentMap,
    ...dataConverterToolComponentMap,
    ...audioTagEditorToolComponentMap,
    ...fileCompressorToolComponentMap,
    ...videoWatermarkToolComponentMap,
    ...colorConverterToolComponentMap,
    ...contrastCheckerToolComponentMap,
    ...dataTransformerToolComponentMap,
    ...pdfSizeSplitterToolComponentMap,
    ...manhwaPdfMergerToolComponentMap,
    ...imageColorPickerToolComponentMap,
    ...audioTranscriberToolComponentMap,
    ...thumbnailPreviewToolComponentMap,
    ...audioSpeedChangerToolComponentMap,
    ...imageEmoteConverterToolComponentMap,
    ...audioVolumeNormalizerToolComponentMap,
};
