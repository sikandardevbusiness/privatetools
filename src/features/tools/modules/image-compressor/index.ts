import dynamic from "next/dynamic";

import { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const imageCompressorToolMetadataList: BaseTool[] = [
    {
        id: "image-compressor",
        category: "image",
        name: "Image Compressor",
        longName: "Free Image Compressor Online - Shrink Files with No Uploads",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/b76c4502ac263ed6f2623746b53ba5fbd1b8edd0-1376x768.jpg",
        description:
            "Compress JPEG, PNG, WebP, and AVIF images online for free. Reduce image file size by up to 80% locally in your browser with zero quality loss.",
        longDescription:
            "Shrink bulky image files without sacrificing visible detail. Whether you need faster website load speeds, smaller attachments for email, or optimized assets for mobile applications, this client-side compressor reduces JPEG, PNG, WebP, and AVIF file sizes by up to 80%.\n\nTraditional online image optimizers upload your files to remote cloud queues, creating slow turnaround times and serious privacy concerns for personal or company assets. Our compressor uses modern browser Web Workers to process images directly on your device. Your pictures stay on your computer, compress in fractions of a second, and never consume upload bandwidth.\n\nTake complete control over your compression settings. Toggle between intuitive quality presets or dial in custom dimensions and compression ratios to match your exact performance requirements. Compress dozens of images at once and download them in a convenient ZIP package.",
        tags: [
            "image compressor",
            "photo optimizer",
            "reduce file size",
            "webp converter",
            "image tools",
        ],
        keywords: [
            "compress images online free no upload",
            "client side image compressor browser",
            "reduce jpeg file size without losing quality",
            "compress png transparent background online",
            "bulk image compressor without server",
            "shrink photo size for web optimization",
            "convert and compress to webp online",
            "private image optimizer no limits",
            "fast local photo compression tool",
        ],
        steps: [
            {
                title: "Add Your Images",
                description:
                    "Drag and drop one or multiple pictures into the local browser compressor.",
            },
            {
                title: "Choose Compression Level",
                description:
                    "Pick a quality preset or adjust the slider to balance visual clarity and file size.",
            },
            {
                title: "Download Optimized Files",
                description:
                    "Save your smaller images individually or download all files together in a ZIP file.",
            },
        ],
        whatToExpect: [
            {
                title: "Significant Size Reduction",
                description: "Cut file sizes by up to 80% while retaining crisp visual resolution.",
            },
            {
                title: "Rapid Batch Optimization",
                description:
                    "Process dozens of photos locally in seconds without upload wait times.",
            },
            {
                title: "Strict Data Protection",
                description:
                    "Keep sensitive graphics, invoices, and personal photos safe on your own device.",
            },
        ],
        faqs: [
            {
                question: "Are my pictures uploaded to a remote server for compression?",
                answer: "No. All compression happens locally on your computer or phone using Web Workers inside your browser. Your images never leave your device.",
            },
            {
                question: "Will compressing images make them look blurry or pixelated?",
                answer: "No. The compressor applies intelligent lossy and lossless algorithms designed to remove unnecessary byte data while keeping the photo sharp and clear to the human eye.",
            },
            {
                question: "Can I compress multiple images simultaneously?",
                answer: "Yes. You can select dozens of images at once, apply your target quality setting, and batch download the compressed results as a single ZIP archive.",
            },
            {
                question: "Which image formats does the compressor support?",
                answer: "You can compress and convert between all standard web formats including JPEG, PNG, WebP, AVIF, and GIF.",
            },
        ],
    },
];

export const imageCompressorToolComponentMap: ToolComponentMap = {
    "image-compressor": dynamic(() => import("./component")),
};
