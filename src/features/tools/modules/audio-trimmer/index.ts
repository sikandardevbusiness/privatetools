import type { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const audioTrimmerToolMetadata: BaseTool[] = [
    {
        id: "audio-trimmer",
        category: "audio",
        name: "Audio Trimmer & Merger",
        tags: ["audio", "trim", "merge", "mp3", "wav"],
        keywords: [
            "free audio trimmer online",
            "unlimited mp3 cutter no watermark",
            "fast local browser audio editor",
            "merge audio files client-side",
            "podcast editor no upload",
            "voice note trimmer free",
            "combine mp3 online free unlimited",
            "lecture recorder trimmer browser",
            "fade in out audio locally",
            "private audio cutter no server",
        ],
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/a8e6e70a4424475e3af7fdf49e25ca228f68ce50-1376x768.jpg",
        description:
            "Free, unlimited, and fast audio trimmer & merger. Edit MP3, WAV, and more locally in your browser. No uploads, no watermarks, no limits.",
        longDescription:
            "Instantly trim, cut, and merge audio files directly in your browser with our free and unlimited audio editor. Perfect for editing long lectures, podcasts, and voice notes. Add professional fade-ins and fade-outs, combine multiple tracks seamlessly, and export as high-quality MP3 or WAV. Because all processing happens locally in your browser, it is blazing fast, completely private, and has absolutely no file size limits or server uploads.",
        faqs: [
            {
                question: "Is this audio trimmer really free and unlimited?",
                answer: "Yes, 100% free forever. There are no hidden fees, no watermarks, no sign-ups, and absolutely no file size limits.",
            },
            {
                question: "How fast is the processing?",
                answer: "It is incredibly fast because it runs locally in your browser. Your audio never travels over the internet to a server, meaning processing starts instantly and finishes in seconds.",
            },
            {
                question: "Is it safe for private or sensitive audio recordings?",
                answer: "Absolutely. This is a local browser tool. Your files never leave your device, ensuring complete privacy and security for your voice notes, lectures, or podcast recordings.",
            },
            {
                question: "Can I merge multiple audio files together?",
                answer: "Yes! You can upload multiple audio files, arrange them in your preferred order, and merge them into a single, seamless track instantly.",
            },
            {
                question: "What audio formats are supported?",
                answer: "We support all major audio formats including MP3, WAV, M4A, OGG, AAC, and FLAC. You can export your final edited track in either compressed MP3 or high-quality WAV.",
            },
        ],
    },
];

export const audioTrimmerToolComponentMap: ToolComponentMap = {
    // "audio-trimmer": dynamic(() => import("./component")),
};
