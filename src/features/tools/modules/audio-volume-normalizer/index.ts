import dynamic from "next/dynamic";

import type { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const audioVolumeNormalizerToolMetadataList: BaseTool[] = [
    {
        id: "audio-volume-normalizer",
        category: "audio",
        name: "Audio Volume Normalizer",
        longName: "Free Audio Volume Normalizer & Booster Online - No Upload",
        createdAt: "06-11-2026",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/a1748a3f51cf1b6df08a62671dc82bd4767a0859-1376x768.jpg",
        description:
            "Make MP3 files louder or normalize podcast volume to -14 LUFS locally. 100% private, client-side audio booster with zero file size limits.",
        longDescription:
            "Fix low or inconsistent audio volume directly in your web browser without sending your recordings to an external server. Whether you are fixing a quiet phone voice note, balancing a podcast episode to the industry-standard -14 LUFS, or boosting a weak microphone recording, this tool handles it locally.\n\nUnlike cheap online 'volume boosters' that distort audio or add watermarks, our tool uses professional FFmpeg WebAssembly processing. The 'Smart Normalization' mode analyzes your audio and dynamically adjusts loud and quiet parts for a consistent, professional sound, while the 'Custom Gain' mode uniformly boosts the volume by your chosen decibels. Privacy remains absolute because your files never leave your device.",
        tags: [
            "audio normalizer",
            "volume booster",
            "make mp3 louder",
            "podcast loudness",
            "audio gain",
        ],
        keywords: [
            "make mp3 louder online free no upload",
            "audio normalizer no upload client side",
            "boost voice recording volume locally",
            "podcast loudness normalizer -14 LUFS",
            "increase audio volume without distortion",
            "free mp3 volume booster browser based",
        ],
        steps: [
            {
                title: "Upload Audio",
                description:
                    "Select or drop your quiet or inconsistent audio file into the secure browser editor.",
            },
            {
                title: "Choose Mode",
                description:
                    "Select 'Smart Normalization' for professional podcast balancing, or 'Custom Gain' to boost by specific decibels.",
            },
            {
                title: "Process & Download",
                description:
                    "Click to permanently process the file locally and download the louder, clearer audio instantly.",
            },
        ],
        whatToExpect: [
            {
                title: "Professional Loudness Standards",
                description:
                    "Smart normalization targets -14 LUFS, the exact standard used by Spotify, Apple Podcasts, and YouTube.",
            },
            {
                title: "No Distortion or Watermarks",
                description:
                    "Uses professional FFmpeg filters to boost volume cleanly without the artifacts common in cheap online tools.",
            },
            {
                title: "Absolute Privacy",
                description:
                    "Zero server uploads. Your sensitive voice notes and unreleased music are processed entirely within your device's local memory.",
            },
        ],
        faqs: [
            {
                question: "What is the difference between Normalization and Gain Boost?",
                answer: "Normalization (LUFS) analyzes the entire track and dynamically adjusts loud and quiet parts to hit a target average loudness (like -14 LUFS for podcasts), resulting in a more consistent sound. Gain Boost simply turns up the volume uniformly across the entire file, which can make already-loud parts distort if pushed too high.",
            },
            {
                question: "Is my audio file uploaded to a server?",
                answer: "Absolutely not. All processing happens locally in your browser using WebAssembly. Your files never leave your device.",
            },
            {
                question: "Will boosting the volume ruin my audio quality?",
                answer: "Moderate gain boosts (e.g., +3dB to +6dB) are generally safe. However, boosting too high (e.g., +15dB) can cause digital clipping (distortion). For the best results, we recommend using the 'Smart Normalization' mode, which prevents clipping automatically.",
            },
        ],
    },
];

export const audioVolumeNormalizerToolComponentMap: ToolComponentMap = {
    "audio-volume-normalizer": dynamic(() => import("./component")),
};
