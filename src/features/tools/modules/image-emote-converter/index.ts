import { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const imageEmoteConverterToolMetadataList: BaseTool[] = [
    {
        id: "emote-resizer",
        category: "image",
        name: "Twitch & Discord Emote Resizer",
        keywords: [
            "emote resizer",
            "twitch emote resizer",
            "discord emote resizer",
            "resize emotes",
            "twitch emotes",
            "discord emoji",
            "emote converter",
            "streaming tools",
            "emote maker",
        ],
        tags: ["emote", "resize", "twitch", "discord"],
        description:
            "Resize emotes for Twitch and Discord instantly. Generate all required sizes (112x112, 56x56, 28x28, 128x128) in one click. 100% private.",
        longDescription:
            "Resize your emotes to all required platform sizes instantly. Generate Twitch emotes (112x112, 56x56, 28x28) and Discord emoji (128x128) from a single upload. Download all sizes as a ZIP file. All processing happens locally in your browser - your images never leave your device.",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/0f1875ae13850bd9244229738a7419a4e3c5e405-1376x768.jpg",
        faqs: [
            {
                question: "What sizes are generated?",
                answer: "Twitch: 112x112, 56x56, 28x28. Discord: 128x128. All files are downloaded as PNG format in a ZIP file.",
            },
            {
                question: "Are my images uploaded?",
                answer: "No. All resizing happens 100% locally in your browser. Your images never leave your device.",
            },
            {
                question: "What file formats are supported?",
                answer: "PNG, JPEG, WebP, and GIF. All outputs are converted to PNG format for best quality.",
            },
        ],
    },
];

export const imageEmoteConverterToolComponentMap: ToolComponentMap = {
    // "emote-resizer": dynamic(() => import("./component")),
};
