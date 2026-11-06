import dynamic from "next/dynamic";

import type { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const audioTagEditorToolMetadataList: BaseTool[] = [
    {
        id: "audio-tag-editor",
        category: "audio",
        name: "MP3 Tag Editor",
        createdAt: "06-11-2026",
        longName: "Free Local MP3 Metadata & ID3 Tag Editor - Add Cover Art Privately",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/e6a97557bd94d1eb3037ee1af73476ea1ff5df85-1376x768.jpg",
        description:
            "Edit ID3 tags, artist info, and embed cover artwork for MP3 files directly in your browser. Zero uploads, zero re-encoding.",
        longDescription:
            "Edit the metadata of your MP3 files directly in your web browser without sending your music to an external server. Whether you are fixing missing artist names, adding album art, or organizing your local music library, this tool handles your files locally.\n\nUnlike traditional tag editors that require bulky desktop software or force you to upload your unreleased tracks to sketchy websites, our editor processes everything via client-side JavaScript. This gives you instant results without re-encoding or degrading your audio quality.\n\nPrivacy remains absolute because your files never leave your device.",
        tags: ["mp3 editor", "id3 tags", "metadata", "cover art", "audio tools", "privacy"],
        keywords: [
            "edit mp3 tags online free no upload",
            "add album art to mp3 browser",
            "change mp3 metadata locally",
            "id3 tag editor client side",
            "embed cover image mp3 privacy",
        ],
        steps: [
            {
                title: "Upload MP3",
                description: "Select or drop your MP3 file into the secure browser editor.",
            },
            {
                title: "Edit Metadata",
                description:
                    "Update the title, artist, album, genre, year, or upload new cover artwork.",
            },
            {
                title: "Save & Download",
                description:
                    "Click save to instantly embed the new tags and download the updated MP3 file.",
            },
        ],
        whatToExpect: [
            {
                title: "Zero Re-encoding",
                description:
                    "Only the metadata header is modified. Your original audio quality remains 100% intact.",
            },
            {
                title: "Smart Image Compression",
                description:
                    "Uploaded cover art is automatically resized to optimize file size without losing visual quality.",
            },
            {
                title: "Absolute Privacy",
                description:
                    "Your files are processed entirely within your device's local memory. Nothing is ever uploaded.",
            },
        ],
        faqs: [
            {
                question: "Does this tool re-encode my MP3 file?",
                answer: "No. The tool performs 'tag surgery' by stripping the old ID3 header and writing a new one. The actual audio data is completely untouched, guaranteeing zero quality loss.",
            },
            {
                question: "Is my audio file uploaded to a server?",
                answer: "Absolutely not. All processing happens locally in your browser using JavaScript. Your files never leave your device.",
            },
        ],
    },
];

export const audioTagEditorToolComponentMap: ToolComponentMap = {
    "audio-tag-editor": dynamic(() => import("./component")),
};
