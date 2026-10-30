import dynamic from "next/dynamic";

import { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const videoWatermarkToolMetadataList: BaseTool[] = [
    {
        id: "video-watermark",
        category: "video",
        name: "Video Watermark",
        longName: "Free Online Video Watermark Tool - GPU Accelerated & Private",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/832529119b3c9a9fc03166c86fcecd658754eea2-1376x768.jpg",
        description:
            "Add logo or text watermarks to videos online using local GPU acceleration. Protect video content with 100% private in-browser rendering and zero uploads.",
        longDescription:
            "Brand your video content and deter unauthorized reposting by adding custom text, copyright notices, or logo watermarks directly in your browser. Whether you are distributing client review cuts, publishing YouTube shorts, or watermarking training webinars, this tool gives you precise positioning, scale, and transparency controls over your branding overlay.\n\nWhile conventional online video editors force you to upload gigabytes of footage to third-party cloud servers, this tool harnesses the modern WebCodecs API and your device's GPU hardware acceleration. Rendering occurs entirely on your machine at up to 10x the speed of standard web editors, without consuming your internet bandwidth.\n\nSafeguard unreleased video cuts, private client projects, and proprietary footage. Your videos never touch a remote server or cloud database. Export high-bitrate, full-resolution MP4 files with zero quality degradation and no forced site watermarks.",
        tags: [
            "video watermark",
            "add logo to video",
            "video branding",
            "gpu video editor",
            "video tools",
        ],
        keywords: [
            "add watermark to video online free",
            "add logo to video without upload",
            "gpu accelerated video watermark tool",
            "private video watermark editor browser",
            "batch watermark videos free",
            "add text copyright to mp4 online",
            "client side video watermark no watermark",
            "protect video content from reposting",
            "fast browser video branding tool",
        ],
        steps: [
            {
                title: "Import Your Video",
                description:
                    "Select your MP4, WebM, or MOV video file directly from your local drive.",
            },
            {
                title: "Add & Position Watermark",
                description:
                    "Upload a logo or type custom text, then adjust opacity, size, and screen placement.",
            },
            {
                title: "Export with GPU Speed",
                description:
                    "Render and download your branded video locally using hardware acceleration.",
            },
        ],
        whatToExpect: [
            {
                title: "Hardware-Accelerated Speed",
                description:
                    "Utilize your computer GPU via WebCodecs for rapid export speeds without cloud lag.",
            },
            {
                title: "Total Video Confidentiality",
                description:
                    "Raw footage, personal clips, and client projects never upload to external servers.",
            },
            {
                title: "Lossless Visual Clarity",
                description:
                    "Export crisp, high-bitrate MP4 video preserving original resolution and audio sync.",
            },
        ],
        faqs: [
            {
                question: "Is my video uploaded to a remote server during watermarking?",
                answer: "No. The entire watermarking and re-encoding process takes place locally on your computer or phone using your device's GPU and WebCodecs API.",
            },
            {
                question: "Can I use transparent PNG logos as watermarks?",
                answer: "Yes. You can upload transparent PNG or SVG logos and adjust opacity, scale, and corner positioning to brand your footage cleanly.",
            },
            {
                question:
                    "Does adding a watermark lower the video's original resolution or framerate?",
                answer: "No. The tool uses high-bitrate encoding to maintain your original video dimensions, framerates, and audio fidelity without blur or stutter.",
            },
            {
                question: "How fast is GPU-accelerated video export?",
                answer: "Because encoding runs directly on your device's graphics hardware rather than through slow internet connections, a typical video renders in just minutes.",
            },
        ],
    },
];

export const videoWatermarkToolComponentMap: ToolComponentMap = {
    "video-watermark": dynamic(() => import("./component")),
};
