import dynamic from "next/dynamic";

import type { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const audioTrimmerToolMetadata: BaseTool[] = [
    {
        id: "audio-trimmer",
        category: "audio",
        name: "Audio Trimmer",
        longName: "Free Audio Trimmer & MP3 Cutter Online - No Upload",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/a8e6e70a4424475e3af7fdf49e25ca228f68ce50-1376x768.jpg",
        description:
            "Trim, cut, and join MP3, WAV, and audio tracks in your browser for free. 100% private client-side audio cutter with zero file size limits.",
        longDescription:
            "Cut, trim, and combine audio files directly in your web browser without sending your recordings to an external server. Whether you are slicing a long podcast recording, cutting ringtones from songs, or removing dead air from voice memos, this tool handles your audio files locally on your computer or phone.\n\nUnlike traditional audio editors that require bulky desktop software installations or force you to wait for slow server uploads, our trimmer processes everything via client-side web technologies. This setup gives you immediate waveform rendering, millisecond-accurate split markers, and smooth volume fades without waiting in server queues.\n\nPrivacy remains absolute because your files never leave your device. You can cut sensitive voice notes, confidential interview tapes, or copyrighted music tracks with complete peace of mind, then export your finished audio file directly to MP3 or lossless WAV.",
        tags: ["audio editor", "mp3 cutter", "audio trimmer", "audio merger", "audio converter"],
        keywords: [
            "free online audio trimmer no upload",
            "cut mp3 file online without upload",
            "client side audio merger free",
            "trim podcast audio in browser",
            "split voice recording online free",
            "private mp3 cutter no server",
            "combine audio files without size limit",
            "browser based wav cutter",
            "free audio track splitter online",
        ],
        steps: [
            {
                title: "Import Audio",
                description: "Select or drop your audio files into the browser editor.",
            },
            {
                title: "Trim and Adjust",
                description:
                    "Drag the waveform handles to set start and end points or arrange tracks.",
            },
            {
                title: "Export Audio",
                description:
                    "Pick MP3 or WAV format and save the processed track directly to your device.",
            },
        ],
        whatToExpect: [
            {
                title: "Local Device Privacy",
                description:
                    "Audio files never upload to third-party servers, keeping private recordings secure.",
            },
            {
                title: "Instant Waveform Cuts",
                description: "Zero upload lag means immediate trimming, splitting, and previewing.",
            },
            {
                title: "Zero File Size Limits",
                description:
                    "Edit hour-long lectures, podcast episodes, or short voice memos without restrictions.",
            },
        ],
        faqs: [
            {
                question: "Is my audio uploaded to a remote server?",
                answer: "No. All cutting, splitting, and merging happens locally inside your browser using client-side processing. Your audio files stay on your machine and are never transmitted over the internet.",
            },
            {
                question: "Is there a file size limit for long recordings?",
                answer: "No. Because the processing uses your local device memory rather than a remote cloud server, you can trim long podcasts, voice recordings, and DJ sets of any size without upload restrictions.",
            },
            {
                question: "Can I combine multiple audio clips into one file?",
                answer: "Yes. You can add multiple MP3 or WAV files, arrange them in the sequence you want, apply fade effects, and export the combined result into a single continuous track.",
            },
            {
                question: "What audio file formats are supported?",
                answer: "The tool supports MP3, WAV, M4A, AAC, FLAC, and OGG formats for input, and lets you export clean outputs in standard MP3 or uncompressed WAV.",
            },
        ],
    },
];

export const audioTrimmerToolComponentMap: ToolComponentMap = {
    "audio-trimmer": dynamic(() => import("./component")),
};
