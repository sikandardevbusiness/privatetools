import dynamic from "next/dynamic";

import { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const manhwaCropperToolMetadataList: BaseTool[] = [
    {
        id: "manhwa-panel-cropper",
        category: "image",
        name: "Manhwa & Webtoon Panel Cropper",
        longName: "Free Webtoon & Manhwa Panel Splitter - Auto Slice Comics",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/a881daf7bd6777bd87f5616e5215c9a1829a787c-1376x768.jpg",
        description:
            "Stitch and slice long vertical manhwa, webtoon, and manga strips into individual panels online. 100% private in-browser cutter with no file size limits.",
        longDescription:
            "Split long vertical manhwa, webtoons, and digital comic episodes into perfectly framed individual panels without tedious manual cropping in Photoshop. Designed for scanlation teams, webcomic artists, translators, and readers, this tool analyzes continuous scrolling strips and cuts panels cleanly along gutter margins.\n\nChoose between automatic gutter detection or fixed-height slicing. The smart gap detection engine scans your vertical strips for horizontal whitespace or solid black gutters between story beats, ensuring cuts never slice through dialogue bubbles or character art. For comics with textured borders, adjustable gap threshold parameters give you fine-tuned control over cut points.\n\nBecause image processing runs directly inside your browser using HTML5 Canvas and local memory management, you can process entire chapters with dozens of high-resolution pages without hitting server timeouts or file size limits. Unreleased storyboards and raw scans remain private on your computer.",
        tags: [
            "manhwa cropper",
            "webtoon splitter",
            "manga tools",
            "comic slicer",
            "image splitter",
        ],
        keywords: [
            "webtoon panel splitter online free",
            "manhwa image cropper auto slice",
            "split long manga strip into panels",
            "vertical comic page cutter",
            "auto detect webtoon gutters split",
            "slice manhwa chapter without upload",
            "long vertical image slicer free",
            "comic scanlation cropping tool",
            "batch webtoon episode panel extractor",
        ],
        steps: [
            {
                title: "Load Comic Pages",
                description:
                    "Select or drop individual episode pages or a continuous vertical strip into the slicer.",
            },
            {
                title: "Configure Cut Settings",
                description:
                    "Choose auto-detection or fixed-height slicing and adjust the gap tolerance sensitivity.",
            },
            {
                title: "Download Cropped Panels",
                description:
                    "Export all cleanly sliced comic panels in sequence as a single organized ZIP file.",
            },
        ],
        whatToExpect: [
            {
                title: "Accurate Gutter Cuts",
                description:
                    "Smart horizontal scanning prevents awkward splits across text boxes and character art.",
            },
            {
                title: "Total Draft Privacy",
                description:
                    "Raw scans, fan translations, and upcoming chapters stay safely on your device.",
            },
            {
                title: "Unlimited Strip Length",
                description:
                    "Stitch and slice full-length webcomic chapters without file size restrictions.",
            },
        ],
        faqs: [
            {
                question: "How does the automatic gutter detection find cut points?",
                answer: "The tool scans horizontal rows of pixels for uniform white or black gutters between panels. Once it verifies an empty margin across the strip, it marks that point for a clean slice.",
            },
            {
                question: "Can I stitch multiple numbered pages before slicing?",
                answer: "Yes. Upload all episode pages at once. The tool arranges them in alphabetical or numerical sequence, joins them into a continuous vertical image, and slices them into clean panels.",
            },
            {
                question: "Are my unreleased comic chapters uploaded to external servers?",
                answer: "No. Everything runs 100% locally in your browser memory. Your drafts, raw raws, and unpublished story pages never touch an external server.",
            },
            {
                question: "Is there a limit on how long the vertical image can be?",
                answer: "There are no arbitrary server limits. The tool uses chunked browser memory rendering, letting you process multi-page webtoon episodes directly on modern hardware.",
            },
        ],
    },
];

export const manhwaCropperToolComponentMap: ToolComponentMap = {
    "manhwa-panel-cropper": dynamic(() => import("./component")),
};
