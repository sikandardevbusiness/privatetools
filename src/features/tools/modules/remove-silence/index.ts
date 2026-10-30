import dynamic from "next/dynamic";

import { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const removeSilenceToolMetadataList: BaseTool[] = [
    {
        id: "remove-silence",
        category: "audio",
        name: "Remove Silence from Audio",
        longName: "Free Audio Silence Remover Online - Auto Trim Dead Air",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/38092955e88899a8137b121bde49dc1863aec008-1376x768.jpg",
        description:
            "Automatically detect and remove dead air, pauses, and silent gaps from audio files. 100% private browser tool powered by FFmpeg WebAssembly.",
        longDescription:
            "Cut out awkward pauses, dead air, and hesitation gaps from spoken-word recordings in seconds. Perfect for podcasters, voiceover artists, video creators, and students cleaning up lecture recordings, this tool automatically scans your audio timeline, detects quiet segments below your target decibel threshold, and trims them away without clipping spoken words.\n\nPowered by client-side FFmpeg compiled to WebAssembly, all audio decoding and filtering execute directly inside your browser. Your voice recordings never upload to a cloud server, making this tool safe for confidential interviews, business meetings, and personal voice memos. There are no wait times in cloud processing queues.\n\nAdjust the silence threshold slider to match ambient room noise, and fine-tune minimum pause durations so natural breaths between sentences remain intact. Export your cleaned audio as compact MP3 files for quick sharing or uncompressed WAV tracks for professional mixing in your digital audio workstation.",
        tags: [
            "audio editor",
            "silence remover",
            "podcast tool",
            "voiceover cleaner",
            "ffmpeg audio",
        ],
        keywords: [
            "remove silence from audio online free",
            "auto trim dead air podcast",
            "cut silent pauses from voice recording",
            "ffmpeg remove silence in browser",
            "clean voice memo pauses no upload",
            "audio silence trimmer client side",
            "shorten lecture recording dead air",
            "remove quiet gaps from voiceover",
            "batch audio silence remover free",
        ],
        steps: [
            {
                title: "Import Voice Track",
                description:
                    "Drop your podcast, interview, or voice memo into the browser silence remover.",
            },
            {
                title: "Tune Decibel & Timing",
                description:
                    "Set your silence decibel threshold and minimum pause duration to fit your audio room tone.",
            },
            {
                title: "Export Clean Audio",
                description:
                    "Download the trimmed recording as an MP3 or WAV file with all dead air removed.",
            },
        ],
        whatToExpect: [
            {
                title: "Intelligent Pause Trimming",
                description:
                    "Eliminate dead air while preserving natural speech cadence and breath pacing.",
            },
            {
                title: "Local FFmpeg Processing",
                description:
                    "Process audio directly in your browser with zero server uploads and zero privacy risk.",
            },
            {
                title: "Dual Export Options",
                description:
                    "Choose lightweight MP3 for fast publishing or uncompressed WAV for studio editing.",
            },
        ],
        faqs: [
            {
                question: "Will trimming silence cut off the ends of words or natural breathing?",
                answer: "No. You can set a minimum pause duration (such as 0.35 seconds). This preserves natural breathing and conversational pacing while removing prolonged dead air.",
            },
            {
                question: "Are my audio files uploaded to a cloud server?",
                answer: "No. Audio processing is handled locally on your computer through FFmpeg WebAssembly. Your recordings never leave your device.",
            },
            {
                question: "How do I choose the right silence threshold?",
                answer: "The default threshold of -40 dB works well for most recordings. If your room has background hum, adjust toward -35 dB; for very quiet studio mics, lower it to -45 dB.",
            },
            {
                question: "What output formats are available for the cleaned audio?",
                answer: "You can export the trimmed audio as a standard compressed MP3 for sharing or as an uncompressed WAV file for DAW editing.",
            },
        ],
    },
];

export const removeSilenceToolComponentMap: ToolComponentMap = {
    "remove-silence": dynamic(() => import("./component")),
};
