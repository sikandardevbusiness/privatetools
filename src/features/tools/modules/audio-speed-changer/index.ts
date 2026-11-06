import dynamic from "next/dynamic";

import type { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const audioSpeedChangerToolMetadataList: BaseTool[] = [
    {
        id: "audio-speed-changer",
        category: "audio",
        name: "Audio Speed Changer",
        longName: "Free Audio Speed & Tempo Changer Online - No Pitch Change",
        createdAt: "06-11-2026",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/4d0d67cdb21d5c64b224c703ad764615e5e43fda-1376x768.jpg",
        description:
            "Speed up or slow down MP3, WAV, and audio files without changing the pitch. 100% private, client-side processing with zero upload limits.",
        longDescription:
            "Adjust the playback speed of your audio files directly in your web browser without altering the pitch or sending your recordings to an external server. Whether you are speeding up a 1-hour lecture to save time, slowing down a complex guitar solo to learn it, or adjusting podcast pacing, this tool handles it locally.\n\nUnlike basic media players that make voices sound like chipmunks when sped up, our tool uses advanced FFmpeg WebAssembly processing with the 'atempo' filter. This ensures the pitch remains perfectly natural while the tempo changes. Privacy remains absolute because your files never leave your device, making it safe for confidential interviews, unreleased music, or sensitive voice notes.",
        tags: ["audio speed", "tempo changer", "mp3 speed up", "slow down audio", "lecture speed"],
        keywords: [
            "change audio speed online free no upload",
            "speed up mp3 without changing pitch",
            "slow down audio file locally",
            "lecture speed changer browser",
            "tempo change mp3 client side",
            "private audio speed adjuster",
            "ffmpeg atempo filter online free",
        ],
        steps: [
            {
                title: "Upload Audio",
                description:
                    "Select or drop your MP3, WAV, or M4A file into the secure browser editor.",
            },
            {
                title: "Adjust Speed",
                description:
                    "Use the slider or input field to set your desired speed (0.25x to 4.0x) and preview instantly.",
            },
            {
                title: "Process & Download",
                description:
                    "Click to permanently process the file with natural pitch preservation and download it instantly.",
            },
        ],
        whatToExpect: [
            {
                title: "No Pitch Change (Chipmunk Effect)",
                description:
                    "Advanced processing ensures voices and instruments sound natural at any speed.",
            },
            {
                title: "Instant Browser Preview",
                description:
                    "Test different speeds instantly using native HTML5 playback before committing to the final render.",
            },
            {
                title: "Absolute Privacy",
                description:
                    "Zero server uploads. Your audio files are processed entirely within your device's local memory.",
            },
        ],
        faqs: [
            {
                question: "Will speeding up the audio make it sound like a chipmunk?",
                answer: "No. Unlike simple playback rate changes, our tool uses FFmpeg's 'atempo' filter, which alters the tempo while preserving the original pitch, keeping voices and music sounding natural.",
            },
            {
                question: "Is my audio file uploaded to a server?",
                answer: "Absolutely not. All processing happens locally in your browser using WebAssembly. Your files never leave your device.",
            },
            {
                question: "What is the maximum speed I can apply?",
                answer: "The interface allows speeds from 0.25x (quarter speed) to 4.0x (four times faster). The underlying engine intelligently chains filters to support these extreme ranges without errors.",
            },
            {
                question: "Does this tool re-encode the audio?",
                answer: "Yes, to permanently bake the speed change and pitch preservation into the file, it must be re-encoded. However, we use high-quality settings (e.g., 192kbps+ for MP3) to ensure the output sounds excellent.",
            },
        ],
    },
];

export const audioSpeedChangerToolComponentMap: ToolComponentMap = {
    "audio-speed-changer": dynamic(() => import("./component")),
};
