import dynamic from "next/dynamic";

import { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const imageCropperToolMetadataList: BaseTool[] = [
    {
        id: "universal-image-cropper",
        category: "image",
        name: "Universal Image Cropper",
        keywords: [
            "image cropper",
            "photo cropper",
            "crop images online",
            "free image cropper",
            "resize images",
            "edit photos",
            "crop JPG",
            "crop PNG",
            "crop WEBP",
            "crop HEIC",
            "aspect ratio tool",
            "image resizer",
            "photo editor",
            "online image editor",
            "client-side image cropper",
            "privacy image tool",
            "no upload image cropper",
        ],
        tags: ["crop", "resize", "edit", "jpg", "png", "webp", "heic", "free", "private"],
        description:
            "Free online image cropper. Crop, resize, and edit JPG, PNG, WEBP, and HEIC images instantly in your browser. 100% private, no uploads required.",
        longDescription:
            "Transform and optimize your visuals with our free Universal Image Cropper. Designed for speed and privacy, this client-side tool lets you crop, resize, and edit JPG, PNG, WEBP, GIF, BMP, and HEIC images directly in your browser. Whether you need to adjust aspect ratios for Instagram, YouTube, or LinkedIn, or simply trim unwanted edges, our intuitive interface makes it effortless. Enjoy high-quality exports in PNG, JPG, or WEBP formats with zero uploads, zero server storage, and 100% data privacy.",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/cd85b1ace5816d7d41a980ccd25db912c90fb4bd-1376x768.jpg",

        // NEW: SEO-optimized "What to Expect" section
        whatToExpect: [
            {
                title: "100% Private & Secure",
                description:
                    "Your images never leave your device. All cropping and processing happen locally in your browser, ensuring complete data privacy.",
            },
            {
                title: "Lightning Fast Processing",
                description:
                    "No uploading or downloading wait times. Get instant, high-quality results with zero latency.",
            },
            {
                title: "High-Quality Output",
                description:
                    "Maintain the original resolution and clarity of your images without unwanted compression artifacts.",
            },
            {
                title: "Works Offline",
                description:
                    "Once the page is loaded, you can continue cropping images seamlessly even without an internet connection.",
            },
        ],

        // NEW: SEO-optimized "How it Works" steps
        steps: [
            {
                title: "Upload Your Image",
                description:
                    "Drag and drop your JPG, PNG, WEBP, or HEIC file into the tool, or click to browse your local device.",
            },
            {
                title: "Adjust Crop Area",
                description:
                    "Drag the corners to resize, move the selection box, or choose a preset aspect ratio like 1:1, 16:9, or 9:16.",
            },
            {
                title: "Download Instantly",
                description:
                    "Select your preferred output format (PNG, JPG, or WEBP) and click download to save your perfectly cropped image.",
            },
        ],

        faqs: [
            {
                question: "Are my images uploaded to a server?",
                answer: "No. All cropping happens 100% locally in your browser. Your photos never leave your device, ensuring complete privacy and security.",
            },
            {
                question: "What image formats are supported?",
                answer: "You can crop JPG, PNG, WEBP, GIF, BMP, SVG, and HEIC files, and download the result as a high-quality PNG, JPG, or WEBP.",
            },
            {
                question: "Can I set specific aspect ratios?",
                answer: "Yes. Choose from popular presets like 1:1 (Instagram), 16:9 (YouTube), 9:16 (Stories), or use the free-form mode for custom dimensions.",
            },
            {
                question: "Is this image cropper really free?",
                answer: "Yes, it is completely free to use with no hidden fees, watermarks, or registration required.",
            },
        ],
    },
];

export const imageCropperToolComponentMap: ToolComponentMap = {
    "universal-image-cropper": dynamic(() => import("./component")),
};
