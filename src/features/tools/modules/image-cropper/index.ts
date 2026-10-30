import dynamic from "next/dynamic";

import { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const imageCropperToolMetadataList: BaseTool[] = [
    {
        id: "universal-image-cropper",
        category: "image",
        name: "Universal Image Cropper",
        longName: "Free Online Image Cropper & Resizer - Private & Fast",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/cd85b1ace5816d7d41a980ccd25db912c90fb4bd-1376x768.jpg",
        description:
            "Crop, resize, and edit JPG, PNG, WebP, and HEIC images online for free. 100% private browser tool with custom aspect ratios and no server uploads.",
        longDescription:
            "Crop, trim, and frame your photos directly in your web browser with zero server uploads and zero software installation. Whether you are formatting product photos for an online store, framing profile avatars for LinkedIn, or adjusting aspect ratios for Instagram posts and YouTube thumbnails, this tool gives you precise pixel-level control over your image dimensions.\n\nUnlike typical photo editing websites that send your personal pictures over the network, our cropper operates entirely on the client side using HTML5 Canvas. Your images stay on your device at all times, guaranteeing total privacy for sensitive snapshots, personal IDs, and unreleased design assets.\n\nChoose from standard social media aspect ratios like 1:1, 16:9, 4:5, and 9:16, or switch to freeform mode for exact pixel trimming. Export your finished pictures in JPG, PNG, or WebP formats at full resolution with zero watermarks or subscription fees.",
        tags: [
            "image cropper",
            "photo editor",
            "aspect ratio tool",
            "image resizer",
            "photo tools",
        ],
        keywords: [
            "free online image cropper no upload",
            "crop photos in browser private",
            "social media aspect ratio photo cropper",
            "crop png transparent online free",
            "client side image cutter and resizer",
            "crop heic photos online without server",
            "custom aspect ratio photo cropper",
            "free photo trimmer no watermark",
            "crop picture for youtube thumbnail",
        ],
        steps: [
            {
                title: "Load Photo",
                description: "Drag and drop your image file or browse from your phone or computer.",
            },
            {
                title: "Frame Your Crop",
                description:
                    "Select a preset aspect ratio or drag the bounding box handles to frame your subject.",
            },
            {
                title: "Export Cropped Image",
                description:
                    "Choose your desired export format and save your cropped photo instantly.",
            },
        ],
        whatToExpect: [
            {
                title: "Total Photo Privacy",
                description:
                    "Process personal photos and sensitive documents locally without cloud uploads.",
            },
            {
                title: "One-Click Social Presets",
                description:
                    "Quickly frame images to match standard Instagram, YouTube, and LinkedIn ratios.",
            },
            {
                title: "Lossless Clarity",
                description:
                    "Export clean, full-resolution pictures without unwanted artifacts or watermarks.",
            },
        ],
        faqs: [
            {
                question: "Are my pictures uploaded to any external server?",
                answer: "No. All cropping and resizing operations run locally inside your browser using client-side graphics rendering. Your photos never leave your device.",
            },
            {
                question: "Can I select preset aspect ratios for social media platforms?",
                answer: "Yes. You can choose popular presets like 1:1 for Instagram posts, 16:9 for YouTube thumbnails, 9:16 for TikTok and Reels, or use freeform mode.",
            },
            {
                question: "Will cropping reduce the quality of my photo?",
                answer: "No. The cropper preserves your original image resolution and allows you to export high-definition files in JPG, PNG, or WebP formats.",
            },
            {
                question: "What image formats can I crop with this tool?",
                answer: "You can import and crop JPG, PNG, WebP, GIF, BMP, and HEIC files without needing third-party converter utilities.",
            },
        ],
    },
];

export const imageCropperToolComponentMap: ToolComponentMap = {
    "universal-image-cropper": dynamic(() => import("./component")),
};
