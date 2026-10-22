import { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const videoWatermarkToolMetadataList: BaseTool[] = [
    {
        id: "video-watermark",
        category: "video",
        name: "Video Watermark",
        keywords: [
            "video watermark",
            "add logo to video",
            "add text to video",
            "brand video",
            "protect video",
            "video overlay",
            "add copyright to video",
            "youtube watermark",
            "gpu video editor",
        ],
        description:
            "Add text or image watermarks to your videos instantly using GPU acceleration. 100% private.",
        longDescription:
            "Protect your content and brand your videos by adding custom text or image watermarks. This tool uses the WebCodecs API for hardware-accelerated GPU processing, making it up to 10x faster than traditional browser tools. Adjust position, size, and opacity with a real-time preview, then export in high-quality MP4.",
        tags: ["video", "watermark", "gpu"],
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/832529119b3c9a9fc03166c86fcecd658754eea2-1376x768.jpg",
        faqs: [
            {
                question: "Is my video uploaded to a server?",
                answer: "No. The entire process happens locally in your browser using WebCodecs and your device's GPU. Your videos remain 100% private.",
            },
            {
                question: "How fast is the export?",
                answer: "Because it uses hardware GPU acceleration via WebCodecs, it is significantly faster than standard browser tools. A 1-hour video can be processed in just a few minutes depending on your device.",
            },
            {
                question: "Will it reduce my video quality?",
                answer: "We use high-bitrate encoding to ensure your exported video looks exactly as good as the original, with no visible quality loss.",
            },
        ],
    },
];

export const videoWatermarkToolComponentMap: ToolComponentMap = {
    // "video-watermark": dynamic(() => import("./component")),
};
