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
    {
        id: "circle-image-cropper",
        category: "image",
        createdAt: "2026-11-13",
        name: "Circle Image Cropper",
        longName: "Free Circle Image Cropper Online | Round Profile Pictures & Avatars",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/00d9ff7f0aed619b449f33e40848b4fc04be3017-1376x768.jpg",
        description:
            "Crop any photo into a perfect circle and export a transparent PNG. Free, private, and 100% in your browser — ideal for profile pictures and avatars.",
        longDescription:
            "Turn any square or rectangular photo into a flawless circle in seconds. This free online circle image cropper locks to a 1:1 ratio and exports a transparent PNG, perfect for LinkedIn, Twitter, Discord, and Instagram avatars. Everything runs client-side with HTML5 Canvas, so your photos never leave your device.",
        tags: [
            "circle image cropper",
            "round photo crop",
            "avatar maker",
            "profile picture cropper",
            "circular crop tool",
        ],
        keywords: [
            "circle image cropper",
            "crop image into circle",
            "round profile picture maker",
            "make avatar round online",
            "circular photo cropper free",
            "round image transparent png",
            "circle crop for instagram",
            "client side circle cropper",
        ],
        steps: [
            {
                title: "Upload Image",
                description: "Pick the photo you want to turn into a circle.",
            },
            {
                title: "Frame Your Subject",
                description: "Drag to move and zoom to center your face inside the circle.",
            },
            {
                title: "Download PNG",
                description: "Save your circular image with a transparent background.",
            },
        ],
        whatToExpect: [
            {
                title: "Perfect Circles",
                description: "Locked 1:1 ratio and 50% radius guarantee a clean round crop.",
            },
            {
                title: "Transparent Edges",
                description: "PNG export blends seamlessly on any colored background.",
            },
            {
                title: "Total Privacy",
                description: "Runs locally in your browser. Photos never get uploaded.",
            },
        ],
        faqs: [
            {
                question: "Are the corners outside the circle transparent?",
                answer: "Yes. Export as PNG (the default) and everything outside the circle is fully transparent — perfect for avatars.",
            },
            {
                question: "Can I resize the circle?",
                answer: "Yes. Drag the handles to resize the crop box and use the zoom slider to frame your subject.",
            },
            {
                question: "Do I need to create an account?",
                answer: "No. The tool is free, unlimited, and works instantly in your browser with no sign-up.",
            },
            {
                question: "Which formats can I import?",
                answer: "JPG, PNG, WebP, and HEIC all work. The output is a transparent PNG by default.",
            },
        ],
    },
    {
        id: "rounded-image-cropper",
        category: "image",
        createdAt: "2026-11-13",
        name: "Rounded Image Cropper",
        longName: "Free Rounded Image Cropper | Add Rounded Corners to Photos Online",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/fb4b786a0b992902db30f86ce52a908589e2b5fe-1376x768.jpg",
        description:
            "Add smooth rounded corners to any photo and export a transparent PNG. Free, private, and fully in your browser — perfect for modern UI and product shots.",
        longDescription:
            "Give any image clean, rounded corners in seconds. Drag the border-radius slider (0–50%) from subtle curves to near-circles, then export a high-quality PNG with truly transparent corners. Runs 100% client-side, so your photos are never uploaded to a server.",
        tags: [
            "rounded image cropper",
            "round corner photo",
            "border radius image",
            "modern photo crop",
            "rounded rectangle tool",
        ],
        keywords: [
            "rounded image cropper",
            "add rounded corners to photo",
            "round corner image editor",
            "border radius image generator",
            "rounded rectangle crop online",
            "make rounded corners png",
            "round corner photo free",
            "css border radius image tool",
        ],
        steps: [
            {
                title: "Upload Photo",
                description: "Drop the image you want to round the corners on.",
            },
            {
                title: "Set Border Radius",
                description: "Use the slider (0–50%) to choose how round the corners are.",
            },
            {
                title: "Export PNG",
                description: "Download your rounded image with transparent corners.",
            },
        ],
        whatToExpect: [
            {
                title: "Precise Roundness",
                description: "A slider gives exact control from sharp edges to full circles.",
            },
            {
                title: "True Transparency",
                description: "PNG export makes corners transparent, not white boxes.",
            },
            {
                title: "100% Private",
                description: "No uploads. Everything is processed in your own browser.",
            },
        ],
        faqs: [
            {
                question: "How do I make the corners perfectly round?",
                answer: "Set the aspect ratio to 1:1 and drag the border-radius slider to 50%.",
            },
            {
                question: "Why export as PNG instead of JPG?",
                answer: "PNG keeps the rounded corners transparent. JPG fills them with a solid white or black background.",
            },
            {
                question: "Can I use this for product photos?",
                answer: "Yes. Rounded corners give e-commerce and UI shots a clean, modern look.",
            },
            {
                question: "Is there a watermark or sign-up?",
                answer: "No. The tool is completely free with no watermark and no account required.",
            },
        ],
    },
];

export const imageCropperToolComponentMap: ToolComponentMap = {
    "circle-image-cropper": dynamic(() => import("./component")),
    "rounded-image-cropper": dynamic(() => import("./component")),
    "universal-image-cropper": dynamic(() => import("./component")),
};

export const cropperToolConfigMap: Record<
    string,
    {
        defaultAspectRatio: number | undefined;
        defaultBorderRadius: number; // 0 to 50 (50% = perfect circle)
        defaultFormat: string;
        acceptType: string;
        allowedFormats: string[];
    }
> = {
    "universal-image-cropper": {
        defaultAspectRatio: undefined,
        defaultBorderRadius: 0,
        defaultFormat: "png",
        acceptType: "image/*",
        allowedFormats: ["jpg", "jpeg", "png", "webp", "gif", "bmp", "heic"],
    },
    "circle-image-cropper": {
        defaultAspectRatio: 1, // Force 1:1 for perfect circles
        defaultBorderRadius: 50, // 50% = perfect circle
        defaultFormat: "png",
        acceptType: "image/*",
        allowedFormats: ["jpg", "jpeg", "png", "webp", "gif", "bmp", "heic"],
    },
    "rounded-image-cropper": {
        defaultAspectRatio: 1,
        defaultBorderRadius: 25, // 25% = nicely rounded corners
        defaultFormat: "png",
        acceptType: "image/*",
        allowedFormats: ["jpg", "jpeg", "png", "webp", "gif", "bmp", "heic"],
    },
};
