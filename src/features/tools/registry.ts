import type { BaseTool, ToolComponentMap } from "./shared/types";

export const toolMetadataList: BaseTool[] = [
    // ==========================================
    // IMAGE TOOLS
    // ==========================================
    {
        id: "universal-image-cropper",
        name: "Universal Image Cropper",
        category: "image",
        description:
            "Free online image cropper. Crop, resize, and edit JPG, PNG, WEBP, HEIC images instantly in your browser. 100% private, no uploads required.",
        thumbnailUrl:
            "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=80",
        tags: ["crop", "resize", "edit", "jpg", "png", "webp", "heic"],
        createdAt: new Date().toISOString(), // Triggers "New" badge
    },
    {
        id: "manhwa-webtoon-panel-cropper",
        name: "Manhwa & Webtoon Panel Cropper",
        category: "image",
        description:
            "Auto-stitch and split long manhwa, webtoon, or manga pages into perfectly cropped individual panels. 100% private, no file size limits.",
        thumbnailUrl:
            "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=800&auto=format&fit=crop&q=80",
        tags: ["manhwa", "webtoon", "manga", "split", "crop"],
        isExperimental: true,
    },
    {
        id: "all-in-one-image-converter",
        name: "All-in-One Image Converter",
        category: "image",
        description:
            "Free online batch image converter. Convert JPG, PNG, WEBP, HEIC, TIFF, and more formats instantly in your browser. 100% private, no uploads, no limits.",
        thumbnailUrl:
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
        tags: ["convert", "batch", "jpg", "png", "webp", "heic", "tiff"],
    },
    {
        id: "jpg-to-png-converter",
        name: "JPG to PNG Converter",
        category: "image",
        description:
            "Convert JPG to PNG online for free. Add transparency support and preserve lossless quality. 100% private, client-side, no uploads.",
        thumbnailUrl:
            "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80",
        tags: ["jpg", "png", "convert", "transparency"],
    },
    {
        id: "png-to-jpg-converter",
        name: "PNG to JPG Converter",
        category: "image",
        description:
            "Convert PNG to JPG online for free. Drastically reduce file size for web, email, and social media. 100% private, no uploads required.",
        thumbnailUrl:
            "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop&q=80",
        tags: ["png", "jpg", "convert", "compress"],
    },
    {
        id: "webp-to-jpg-converter",
        name: "WEBP to JPG Converter",
        category: "image",
        description:
            "Convert WEBP to JPG online for free. Make WEBP images compatible with all devices, software, and social media. 100% private, no uploads.",
        thumbnailUrl:
            "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop&q=80",
        tags: ["webp", "jpg", "convert"],
    },
    {
        id: "heic-to-jpg-converter",
        name: "HEIC to JPG Converter",
        category: "image",
        description:
            "Convert iPhone HEIC photos to JPG online for free. Compatible with Windows, Android, and all devices. 100% private, no uploads.",
        thumbnailUrl:
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80",
        tags: ["heic", "jpg", "iphone", "convert"],
    },
    {
        id: "tiff-to-jpg-converter",
        name: "TIFF to JPG Converter",
        category: "image",
        description:
            "Convert TIFF to JPG online for free. Reduce massive scanner or camera TIFF file sizes instantly. 100% private, no uploads.",
        thumbnailUrl:
            "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80",
        tags: ["tiff", "jpg", "convert", "scanner"],
    },
    {
        id: "image-compressor",
        name: "Image Compressor",
        category: "image",
        description:
            "Compress and optimize images locally in your browser. Reduce file size by up to 80% without losing quality.",
        thumbnailUrl:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
        tags: ["compress", "optimize", "reduce size"],
    },
    {
        id: "twitch-discord-emote-resizer",
        name: "Twitch & Discord Emote Resizer",
        category: "image",
        description:
            "Resize emotes for Twitch and Discord instantly. Generate all required sizes (112x112, 56x56, 28x28, 128x128) in one click. 100% private.",
        thumbnailUrl:
            "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&auto=format&fit=crop&q=80",
        tags: ["emote", "resize", "twitch", "discord"],
    },

    // ==========================================
    // DOCUMENT TOOLS
    // ==========================================
    {
        id: "pdf-to-jpg-converter",
        name: "PDF to JPG Converter",
        category: "document",
        description:
            "Convert PDF pages to high-quality JPG images online for free. Extract images securely. 100% private.",
        thumbnailUrl:
            "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80",
        tags: ["pdf", "jpg", "convert", "extract"],
    },
    {
        id: "pdf-redactor",
        name: "PDF Redactor",
        category: "document",
        description:
            "Permanently redact sensitive information from PDFs locally. True redaction with metadata removal. 100% private, no uploads.",
        thumbnailUrl:
            "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&auto=format&fit=crop&q=80",
        tags: ["pdf", "redact", "privacy", "metadata"],
        isExperimental: true,
    },
    {
        id: "pdf-compressor",
        name: "PDF Compressor",
        category: "document",
        description:
            "Reduce PDF file size locally in your browser. Approximate exact target sizes.",
        thumbnailUrl:
            "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&auto=format&fit=crop&q=80",
        tags: ["pdf", "compress", "reduce size"],
    },

    // ==========================================
    // AUDIO TOOLS
    // ==========================================
    {
        id: "remove-silence-from-audio",
        name: "Remove Silence from Audio",
        category: "audio",
        description:
            "Automatically detect and remove silent pauses from your audio files. Perfect for podcasts, voiceovers, and recordings. 100% private.",
        thumbnailUrl:
            "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80",
        tags: ["audio", "silence", "podcast", "voiceover"],
    },
    {
        id: "audio-trimmer-merger",
        name: "Audio Trimmer & Merger",
        category: "audio",
        description:
            "Free, unlimited, and fast audio trimmer & merger. Edit MP3, WAV, and more locally in your browser. No uploads, no watermarks, no limits.",
        thumbnailUrl:
            "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop&q=80",
        tags: ["audio", "trim", "merge", "mp3", "wav"],
    },

    // ==========================================
    // VIDEO TOOLS
    // ==========================================
    {
        id: "video-watermark",
        name: "Video Watermark",
        category: "video",
        description:
            "Add text or image watermarks to your videos instantly using GPU acceleration. 100% private.",
        thumbnailUrl:
            "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=80",
        tags: ["video", "watermark", "gpu"],
    },

    // ==========================================
    // CREATOR TOOLS
    // ==========================================
    {
        id: "youtube-thumbnail-previewer",
        name: "YouTube Thumbnail Previewer",
        category: "creator",
        description:
            "See exactly how your thumbnail looks on Desktop and Mobile, in Light and Dark mode.",
        thumbnailUrl:
            "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&auto=format&fit=crop&q=80",
        tags: ["youtube", "thumbnail", "preview", "creator"],
        createdAt: new Date().toISOString(), // Triggers "New" badge
    },

    // ==========================================
    // PRIVACY TOOLS
    // ==========================================
    {
        id: "exif-gps-data-wiper",
        name: "EXIF/GPS Data Wiper",
        category: "privacy",
        description:
            "Instantly strip all photo metadata (GPS, EXIF, XMP). 100% private, client-side processing ensures your images never leave your browser.",
        thumbnailUrl:
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
        tags: ["exif", "gps", "metadata", "privacy", "wiper"],
    },
];

// Map tool IDs to their actual React components (lazy load them here when ready)
export const toolComponentMap: ToolComponentMap = {};
