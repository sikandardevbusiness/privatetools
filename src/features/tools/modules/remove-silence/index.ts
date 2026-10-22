import dynamic from "next/dynamic";

import { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const removeSilenceToolMetadataList: BaseTool[] = [
    {
        id: "remove-silence",
        category: "audio",
        name: "Remove Silence from Audio",
        keywords: [
            "remove silence",
            "audio silence remover",
            "trim pauses",
            "remove dead air",
            "podcast editor",
            "clean up voiceover",
            "youtube audio cleanup",
            "voice memo cleaner",
            "ffmpeg audio tool",
            "client-side audio editor",
            "privacy audio tool",
        ],
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/38092955e88899a8137b121bde49dc1863aec008-1376x768.jpg",
        tags: ["audio", "silence", "podcast", "voiceover"],
        description:
            "Automatically detect and remove silent pauses from your audio files. Perfect for podcasts, voiceovers, and recordings. 100% private.",
        longDescription:
            "Transform messy recordings into polished audio in seconds. Our Remove Silence tool uses advanced browser-based processing to automatically detect and trim dead air, long pauses, and background noise gaps. Perfect for podcasters, YouTubers, and students cleaning up voice memos. Choose between highly compressed MP3 or lossless WAV output. Because everything runs locally via WebAssembly, your sensitive recordings never touch a server.",
        faqs: [
            {
                question: "Is my audio uploaded to a server?",
                answer: "Absolutely not. This tool uses FFmpeg WebAssembly to process your audio entirely within your browser. Your files never leave your device, guaranteeing 100% privacy and security.",
            },
            {
                question: "What is the difference between MP3 and WAV output?",
                answer: "MP3 is a compressed format, perfect for sharing, uploading to YouTube, or saving space (usually 2-5 MB). WAV is an uncompressed, lossless format used for professional editing, but it results in much larger file sizes (often 20-50 MB).",
            },
            {
                question: "How do I use the 'Silence Threshold' slider?",
                answer: "This controls how quiet a sound must be to be considered 'silence'. The default is -40dB. If you lower it (e.g., -50dB), the tool becomes stricter and removes more background noise. If you raise it (e.g., -30dB), it becomes more lenient.",
            },
            {
                question: "Will it accidentally cut off my words?",
                answer: "To prevent cutting off words, we use the 'Min Silence Duration' setting. By default, it is set to 0.35 seconds, meaning any pause shorter than that is kept intact. This ensures natural breaths and short pauses between words are not removed.",
            },
            {
                question: "What audio formats can I upload?",
                answer: "You can upload almost any audio format supported by modern browsers, including MP3, WAV, M4A, OGG, WebM, and FLAC.",
            },
            {
                question: "Can I process multiple files at once?",
                answer: "Yes! You can upload and batch process multiple audio files simultaneously. Each file will be cleaned up independently, and you can download them all together as a ZIP file.",
            },
        ],
    },
];

export const removeSilenceToolComponentMap: ToolComponentMap = {
    "remove-silence": dynamic(() => import("./component")),
};
