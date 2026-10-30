import dynamic from "next/dynamic";

import { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const imageEmoteConverterToolMetadataList: BaseTool[] = [
    {
        id: "emote-resizer",
        category: "image",
        name: "Twitch & Discord Emote Resizer",
        longName: "Free Twitch & Discord Emote Resizer - Instant Size Generator",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/0f1875ae13850bd9244229738a7419a4e3c5e405-1376x768.jpg",
        description:
            "Resize emotes for Twitch and Discord online for free. Automatically generate 28x28, 56x56, 112x112, and 128x128 PNG sizes in your browser with zero uploads.",
        longDescription:
            "Prepare custom emotes and channel badges for Twitch, Discord, and YouTube Gaming without opening desktop editing software. Upload your square artwork, and the tool instantly generates the exact dimensions required by streaming platforms, including 112x112, 56x56, and 28x28 for Twitch emotes, along with 128x128 for Discord stickers and emojis.\n\nPixel-sharp scaling is critical for chat readability. Our browser-based resizer uses high-quality downsampling filters that preserve line art and clean edges even at tiny 28-pixel resolutions. Everything processes directly on your computer or phone using client-side canvas technology. Your original artwork never uploads to a remote cloud server, protecting unreleased subscriber badges and commissioned streamer graphics.\n\nSave time during channel setup by downloading all generated sizes at once in a single structured ZIP file. Works with transparent PNG, JPEG, and WebP files, giving streamers, moderators, and digital artists an instant, free utility to prep emotes in seconds.",
        tags: ["twitch tools", "discord emojis", "emote resizer", "image scaler", "streamer tools"],
        keywords: [
            "twitch emote resizer online free",
            "discord emoji resizer 128x128",
            "resize image for twitch badges 28x28",
            "make twitch emotes 112 56 28",
            "client side emote resizer no upload",
            "free streamer emote maker tool",
            "convert png to twitch emote sizes",
            "batch emote resizer for discord",
            "transparent emote downscaler online",
        ],
        steps: [
            {
                title: "Upload Emote Art",
                description: "Drag and drop your square image or artwork file into the resizer.",
            },
            {
                title: "Preview Standard Sizes",
                description:
                    "Review automatic generations for 28px, 56px, 112px, and 128px badge sizes.",
            },
            {
                title: "Download ZIP Package",
                description:
                    "Click to download a single ZIP containing all correctly named and formatted PNGs.",
            },
        ],
        whatToExpect: [
            {
                title: "Platform-Ready Dimensions",
                description:
                    "Instantly create required dimensions for Twitch affiliate emotes and Discord servers.",
            },
            {
                title: "Complete Art Privacy",
                description:
                    "Unreleased commissions and channel assets never leave your local browser.",
            },
            {
                title: "Sharp Edge Retention",
                description:
                    "Optimized downscaling keeps linework distinct even at tiny 28x28 pixel sizes.",
            },
        ],
        faqs: [
            {
                question: "What dimensions does this emote resizer produce?",
                answer: "The tool generates standard Twitch emote sizes (112x112, 56x56, and 28x28 pixels) and Discord emoji dimensions (128x128 pixels). All files export as transparent PNGs.",
            },
            {
                question: "Does downscaling make small 28x28 emotes blurry?",
                answer: "No. The resizer uses sharp bicubic downsampling algorithms specifically tuned for small graphic icons, keeping line work and transparent borders clear in chat.",
            },
            {
                question: "Are my commissioned emote illustrations uploaded to a server?",
                answer: "No. Resizing takes place locally inside your browser via the HTML5 Canvas API. Your artwork never leaves your computer or phone.",
            },
            {
                question: "Can I upload images with transparent backgrounds?",
                answer: "Yes. Transparent PNG and WebP files retain full alpha transparency through the resizing process, ensuring your emotes display cleanly on both light and dark chat themes.",
            },
        ],
    },
];

export const imageEmoteConverterToolComponentMap: ToolComponentMap = {
    "emote-resizer": dynamic(() => import("./component")),
};
