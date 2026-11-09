import dynamic from "next/dynamic";
import type { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const audioTranscriberToolMetadataList: BaseTool[] = [
    {
        id: "audio-transcriber",
        category: "audio",
        name: "Audio Transcriber",
        isExperimental: true,
        createdAt: "08-11-2026",
        longName: "Free Local Audio Transcriber - Whisper in Browser, No Uploads",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/cb3a8588c1657fe1209ec8731ae2de2fd58d8a43-1376x768.jpg",
        description:
            "Transcribe audio and video files to text locally in your browser using Whisper AI. Zero uploads, 100% private, with dynamic subtitle chunking.",
        longDescription:
            "Transform any audio or video file into accurate text transcripts directly in your web browser. Powered by OpenAI's Whisper model running locally via WebAssembly, this tool guarantees 100% privacy—your sensitive meetings, interviews, and media files never leave your device.\n\nUnlike cloud-based services that charge per minute or risk your data, our local transcriber supports 99+ languages, dynamic word-level subtitle chunking (perfect for TikTok, YouTube, or professional editing), and exports to SRT, VTT, ASS, TXT, JSON, and CSV formats. Simply upload your file, choose your settings, and get studio-quality transcripts instantly.",
        tags: [
            "audio transcriber",
            "whisper browser",
            "speech to text",
            "local transcription",
            "srt generator",
            "video to text",
        ],
        keywords: [
            "free audio transcriber no upload",
            "local whisper transcription browser",
            "video to text converter free no upload",
            "generate srt subtitles locally",
            "private speech to text offline",
            "transcribe mp4 to text browser based",
            "whisper ai web browser transcription",
            "dynamic word chunking subtitles generator",
        ],
        steps: [
            {
                title: "Upload Media",
                description: "Select any audio or video file (MP3, MP4, WAV, MKV, etc.).",
            },
            {
                title: "Configure Settings",
                description:
                    "Choose your Whisper model, language, and subtitle chunking preferences.",
            },
            {
                title: "Transcribe & Export",
                description:
                    "Process locally and download your transcript in SRT, VTT, TXT, or other formats.",
            },
        ],
        whatToExpect: [
            {
                title: "100% Private & Local",
                description:
                    "Your media files are processed entirely in your browser. Zero server uploads.",
            },
            {
                title: "99+ Languages Supported",
                description:
                    "Accurate transcription and translation for almost any language globally.",
            },
            {
                title: "Dynamic Subtitle Chunking",
                description:
                    "Customize exactly how many words appear per subtitle segment for perfect video editing sync.",
            },
            {
                title: "Multi-Format Export",
                description: "Instantly download your results as SRT, VTT, ASS, TXT, JSON, or CSV.",
            },
        ],
        faqs: [
            {
                question: "Are my audio or video files uploaded to a server?",
                answer: "Absolutely not. The entire transcription process, including AI model execution and audio decoding, happens locally within your browser's memory using WebAssembly.",
            },
            {
                question: "Which file formats are supported?",
                answer: "The tool supports virtually all common audio and video formats, including MP3, WAV, MP4, MKV, WebM, MOV, and AAC, thanks to our dual-engine (Web Audio API + FFmpeg.wasm) decoder.",
            },
            {
                question: "What does 'Words Per Segment' mean?",
                answer: "This setting allows you to control subtitle pacing. For example, setting it to '1' creates karaoke-style word-by-word captions, while '4-7' creates standard, readable video subtitles.",
            },
            {
                question: "Do I need a powerful computer?",
                answer: "Smaller models like 'Tiny' or 'Base' run smoothly on most modern laptops and phones. The 'Large-v3' model provides maximum accuracy but requires a device with at least 8GB of RAM.",
            },
        ],
    },
];

export const audioTranscriberToolComponentMap: ToolComponentMap = {
    "audio-transcriber": dynamic(() => import("./component")),
};
