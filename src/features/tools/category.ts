import { ToolCategory } from "./shared/types";

export interface CategoryInfo {
    title: string;
    tags: string[];
    id: ToolCategory;
    keywords: string[];
    description: string;
}

export const categoryInfoList: CategoryInfo[] = [
    {
        id: "image",
        title: "Image Tools",
        description:
            "Compress, convert, crop, and edit images locally with zero server uploads. Process JPG, PNG, WebP, HEIC, and TIFF files entirely client-side. Perfect for creators who need fast, private image editing without uploading sensitive files to third-party servers.",
        keywords: [
            "image compressor",
            "jpg to png",
            "webp converter",
            "image cropper",
            "heic to jpg",
        ],
        tags: ["compression", "conversion", "editing", "privacy-first"],
    },
    {
        id: "document",
        title: "Document & PDF Tools",
        description:
            "Compress, split, redact, and convert PDF files securely without uploading to the cloud. Process heavy documents locally, merge files, extract pages, and check EPUBs for errors. Your sensitive documents remain 100% private and never leave your device.",
        keywords: ["pdf compressor", "pdf splitter", "pdf redactor", "pdf to jpg", "epub checker"],
        tags: ["pdf", "documents", "security", "local processing"],
    },
    {
        id: "audio",
        title: "Audio Tools",
        description:
            "Transcribe, merge, trim, and convert audio files directly in your browser with zero uploads. Process MP3, WAV, M4A, OGG, and FLAC files client-side. Transcribe speech locally, change speed, and remove silence. Your audio files never leave your device.",
        keywords: [
            "audio transcriber",
            "mp3 merger",
            "audio speed changer",
            "remove silence",
            "wav to mp3",
        ],
        tags: ["transcription", "editing", "conversion", "offline"],
    },
    {
        id: "video",
        title: "Video Tools",
        description:
            "Compress videos for Discord, convert between MP4 and WebM, and add watermarks locally. Reduce file sizes by up to 80% while maintaining quality, perfect for social media limits. All processing uses hardware-accelerated GPU encoding in your browser.",
        keywords: [
            "video compressor",
            "discord video compressor",
            "mp4 to webm",
            "video watermark",
        ],
        tags: ["compression", "conversion", "social media", "local"],
    },
    {
        id: "developer",
        title: "Developer Tools",
        description:
            "Format, transform, and query JSON, CSV, and HAR files instantly in your browser. Convert data formats, run SQL queries on CSVs, and sanitize sensitive HAR logs. Your code and data never leave your device, ensuring complete privacy.",
        keywords: [
            "json to csv",
            "csv to json",
            "har sanitizer",
            "sql query csv",
            "data transformer",
        ],
        tags: ["formatting", "data", "debugging", "privacy"],
    },
    {
        id: "data",
        title: "Data Tools",
        description:
            "Convert and manage personal data formats securely with zero server uploads. Transform VCF contacts to CSV or Excel, and manage databases entirely client-side. Your contact information never leaves your device, ensuring complete privacy.",
        keywords: ["vcf to csv", "contact converter", "data transformation", "local data tools"],
        tags: ["conversion", "contacts", "privacy", "offline"],
    },
    {
        id: "text",
        title: "Text Tools",
        description:
            "Analyze, format, and manipulate text securely in your browser with zero data transmission. Count words, format JSON/XML, and clean up messy text data. Your text remains completely private and secure on your local device.",
        keywords: ["text analyzer", "word counter", "text formatter", "local text tools"],
        tags: ["formatting", "analysis", "privacy", "utility"],
    },
    {
        id: "creator",
        title: "Creator Tools",
        description:
            "Specialized utilities for creators, including webtoon mergers, emote resizers, and thumbnail previewers. Create reading-ready PDFs, resize images to platform specs, and preview content locally. Your creative work never leaves your device.",
        keywords: [
            "webtoon to pdf",
            "manhwa cropper",
            "emote resizer",
            "youtube thumbnail preview",
        ],
        tags: ["content creation", "social media", "images", "local"],
    },
    {
        id: "privacy",
        title: "Privacy Tools",
        description:
            "Protect your digital footprint by removing metadata before sharing files online. Wipe EXIF data from photos, including GPS and camera settings. All processing happens locally, ensuring your files are never uploaded to external servers.",
        keywords: ["exif wiper", "metadata remover", "privacy cleaner", "photo sanitizer"],
        tags: ["security", "metadata", "anonymity", "local"],
    },
];
