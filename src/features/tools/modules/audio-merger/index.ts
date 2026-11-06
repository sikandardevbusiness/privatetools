import dynamic from "next/dynamic";

import type { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const audioMergerToolMetadataList: BaseTool[] = [
    {
        id: "audio-merger",
        category: "audio",
        name: "Audio Merger",
        createdAt: "06-11-2026",
        longName: "Free Online Audio Merger & MP3 Joiner - No Upload",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/7f955e2cfa77993eafae3f688483afa12c55b1ff-1376x768.jpg",
        description:
            "Merge and combine multiple MP3, WAV, or audio files into one single track locally in your browser. Zero file size limits, no uploads.",
        longDescription:
            "Stitch together multiple audio files seamlessly directly in your web browser without sending your recordings to an external server. Whether you are combining an intro music track with a voice recording, merging podcast segments, or creating a custom meditation mix, this tool handles it locally.\n\nUnlike traditional online mergers that force you to wait in server queues or cap your file sizes, our tool uses advanced FFmpeg WebAssembly processing right in your browser. This gives you instant, seamless joins with zero upload lag. Privacy remains absolute because your files never leave your device, making it safe for confidential interviews, unreleased music, or sensitive voice notes.",
        tags: ["audio merger", "mp3 joiner", "combine audio", "merge tracks", "local audio editor"],
        keywords: [
            "merge two mp3 files online free no upload",
            "join audio files free no upload",
            "combine audio tracks browser based",
            "stitch mp3 files locally",
            "free audio merger no size limit",
            "concatenate audio files client side",
        ],
        steps: [
            {
                title: "Upload Audio Files",
                description:
                    "Select or drag and drop multiple audio files (MP3, WAV, M4A, OGG) into the browser editor.",
            },
            {
                title: "Drag to Reorder",
                description:
                    "Use the drag handles to arrange your tracks in the exact order you want them merged.",
            },
            {
                title: "Merge & Download",
                description:
                    "Click merge to seamlessly stitch the files together locally and download your combined track instantly.",
            },
        ],
        whatToExpect: [
            {
                title: "Zero File Size Limits",
                description:
                    "Merge short voice notes or hour-long podcast episodes without arbitrary server-side restrictions.",
            },
            {
                title: "Seamless Format Mixing",
                description:
                    "Combine different formats (e.g., a WAV voice note and an MP3 music track) and get a perfectly standardized MP3 output.",
            },
            {
                title: "Absolute Privacy",
                description:
                    "Your files are processed entirely within your device's local memory. Nothing is ever uploaded to a server.",
            },
        ],
        faqs: [
            {
                question: "Does merging audio files reduce the quality?",
                answer: "To ensure seamless playback across all devices, the tool re-encodes the final merged file to a high-quality 192kbps MP3. This guarantees compatibility even if you mix different source formats like WAV and M4A.",
            },
            {
                question: "Is my audio uploaded to a server?",
                answer: "Absolutely not. All processing happens locally in your browser using WebAssembly. Your files never leave your device.",
            },
            {
                question: "How many files can I merge at once?",
                answer: "There is no strict limit. You can merge as many files as your device's memory can comfortably handle. For most modern computers and phones, merging 10-20 files simultaneously works perfectly.",
            },
        ],
    },
];

export const audioMergerToolComponentMap: ToolComponentMap = {
    "audio-merger": dynamic(() => import("./component")),
};
