import dynamic from "next/dynamic";

import { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const imageCompressorToolMetadataList: BaseTool[] = [
    {
        id: "image-compressor",
        category: "image",
        name: "Image Compressor",
        tags: ["compress", "optimize", "reduce size"],
        keywords: [
            "image compressor",
            "compress jpeg",
            "compress png",
            "reduce image size",
            "webp converter",
            "bulk image compressor",
            "client-side image compression",
            "privacy image tool",
        ],
        description:
            "Compress and optimize images locally in your browser. Reduce file size by up to 80% without losing quality.",
        longDescription:
            "Reduce your image file sizes instantly and securely in your browser. Our advanced client-side compression engine supports JPEG, PNG, WebP, GIF, BMP, and AVIF. Choose your target size, output format, and compression level. Perfect for web optimization, email attachments, and social media. 100% private, no server uploads.",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/b76c4502ac263ed6f2623746b53ba5fbd1b8edd0-1376x768.jpg",
        faqs: [
            {
                question: "Are my images uploaded to a server?",
                answer: "No. All compression happens 100% locally in your browser using Web Workers. Your images never leave your device.",
            },
            {
                question: "Does compression reduce image quality?",
                answer: "You control the quality! Our 'Medium' and 'Large' presets use smart compression to reduce file size significantly while keeping the image visually identical to the original.",
            },
            {
                question: "Can I compress multiple images at once?",
                answer: "Yes! You can upload and compress dozens of images simultaneously and download them all together as a single ZIP file.",
            },
        ],
    },
];

export const imageCompressorToolComponentMap: ToolComponentMap = {
    "image-compressor": dynamic(() => import("./component")),
};
