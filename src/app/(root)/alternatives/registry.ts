export interface Alternative {
    id: string;
    name: string;
    tagline: string;
    description: string;
    ourTools: string[]; // MUST be exact slug IDs to match toolMetadataList.filter((t) => alt.ourTools.includes(t.id))
    competitorFeatures: string[];
    ourBenefits: string[];
    limitations: string[];
    comparisonTable: { feature: string; competitor: string; us: string }[];
    status: "done" | "in-progress" | "planned";
    keywords: string[];
}

export const alternativesList: Alternative[] = [
    {
        id: "smallpdf-ilovepdf",
        name: "Smallpdf & iLovePDF",
        tagline: "The 100% free, private, and unlimited alternative to cloud-based PDF tools.",
        description:
            "Smallpdf and iLovePDF restrict free users and require uploading sensitive documents to cloud servers. Our suite of document tools runs entirely in your browser, offering splits, conversions, and true redaction with zero file uploads.",
        ourTools: [
            "pdf-compressor",
            "pdf-size-splitter",
            "pdf-to-jpg",
            "pdf-to-png",
            "jpg-to-pdf",
            "png-to-pdf",
            "pdf-redactor",
        ],
        competitorFeatures: [
            "Files uploaded to third-party cloud servers",
            "Strict daily limits (e.g., 2 tasks/day) for free users",
            "File size caps (often 50MB–100MB)",
            "Premium paywalls for advanced features like true redaction",
        ],
        ourBenefits: [
            "100% local browser processing (zero server uploads)",
            "Truly unlimited free usage, no daily task limits",
            "No file size limits other than your device's RAM",
            "Advanced privacy tools like true PDF redaction and metadata removal included for free",
        ],
        limitations: [
            "Processing very large PDFs (500MB+) requires a device with sufficient RAM",
            "No cloud storage or cross-device syncing (by design for maximum privacy)",
        ],
        comparisonTable: [
            {
                feature: "Privacy & Security",
                competitor: "Files uploaded to remote cloud servers",
                us: "100% local, files never leave your device",
            },
            {
                feature: "Daily Limits",
                competitor: "2 free tasks per day",
                us: "Unlimited free tasks forever",
            },
            {
                feature: "File Size Limit",
                competitor: "Capped at 50MB–100MB",
                us: "Limited only by your device's available RAM",
            },
            {
                feature: "Cost",
                competitor: "Expensive monthly subscriptions",
                us: "100% Free, no hidden fees",
            },
            {
                feature: "Redaction",
                competitor: "Locked behind premium paywall or fake redaction",
                us: "Free, true, and permanent local redaction",
            },
        ],
        status: "in-progress",
        keywords: [
            "smallpdf alternative",
            "ilovepdf alternative",
            "free local pdf splitter",
            "private pdf redactor no upload",
            "unlimited pdf tools",
        ],
    },
    {
        id: "tinypng",
        name: "TinyPNG & Generic Image Converters",
        tagline: "The private, client-side alternative for image processing and conversion.",
        description:
            "Tools like TinyPNG require uploading your photos to external servers, raising privacy concerns. Our image tools achieve processing locally in your browser, ensuring your images never leave your device.",
        ourTools: [
            "image-compressor",
            "webp-to-jpg",
            "jpg-to-webp",
            "png-to-jpg",
            "webp-to-png",
            "jpg-to-png",
            "heic-to-jpg",
            "tiff-to-jpg",
            "all-in-one-image-converter",
        ],
        competitorFeatures: [
            "Requires uploading images to external servers",
            "Batch processing limits (e.g., max 20 images)",
            "API rate limits for free developers",
            "Low-resolution downloads for free users",
        ],
        ourBenefits: [
            "Zero server uploads, ensuring complete image privacy",
            "No batch limits; process as many images as your device can handle",
            "Full resolution output with no artificial downscaling",
            "No API keys, accounts, or registration required",
        ],
        limitations: [
            "Processing relies on browser algorithms, which may differ slightly from proprietary server-side AI",
            "Requires a modern browser with WebAssembly support for best performance",
        ],
        comparisonTable: [
            {
                feature: "Data Privacy",
                competitor: "Images uploaded to external servers",
                us: "Processed locally in your browser",
            },
            {
                feature: "Batch Processing",
                competitor: "Max 20 images at a time",
                us: "Process unlimited images locally",
            },
            {
                feature: "Output Quality",
                competitor: "Low-res for free users",
                us: "Full resolution, no downscaling",
            },
            {
                feature: "Cost & Limits",
                competitor: "API limits and premium tiers",
                us: "100% Free, no API limits",
            },
        ],
        status: "planned",
        keywords: [
            "tinypng alternative",
            "local image converter",
            "private photo processor",
            "heic to jpg local",
            "batch image converter no upload",
        ],
    },
    {
        id: "otter-ai",
        name: "Otter.ai & Descript",
        tagline: "The 100% private, offline alternative to Otter.ai for audio transcription.",
        description:
            "Otter.ai is a powerful transcription tool, but it requires uploading your audio to the cloud, which is a major privacy risk for sensitive meetings, interviews, or personal recordings. Our Audio Transcriber uses local Whisper AI to transcribe directly in your browser.",
        ourTools: [
            "audio-transcriber",
            "audio-merger",
            "audio-trimmer",
            "remove-silence",
            "audio-speed-changer",
            "audio-volume-normalizer",
        ],
        competitorFeatures: [
            "Audio files uploaded to company servers for processing",
            "Strict monthly minute limits on free tiers",
            "Requires account creation and subscription for full features",
            "Potential data retention and privacy risks for sensitive recordings",
        ],
        ourBenefits: [
            "100% offline transcription using local Whisper AI models with dynamic subtitle chunking",
            "Zero data collection; your audio never leaves your device",
            "Completely free with absolutely no minute or length limits",
            "Suite of editing tools (merge, trim, speed change, normalize) all in one place",
        ],
        limitations: [
            "Transcription speed depends entirely on your device's CPU/GPU power",
            "Requires a modern browser that supports WebAssembly and Web Workers",
        ],
        comparisonTable: [
            {
                feature: "Privacy",
                competitor: "Audio stored on cloud servers",
                us: "Audio never leaves your device",
            },
            {
                feature: "Cost",
                competitor: "Limited free minutes, then paid",
                us: "Unlimited free transcription forever",
            },
            {
                feature: "Setup",
                competitor: "Requires account creation and login",
                us: "Instant, no sign-up required",
            },
            {
                feature: "Editing",
                competitor: "Separate tools or premium features",
                us: "Built-in trim, silence removal, and volume normalization",
            },
        ],
        status: "done",
        keywords: [
            "otter ai alternative",
            "local audio transcription",
            "offline whisper ai browser",
            "free audio transcriber no limit",
            "private podcast transcription",
        ],
    },
    {
        id: "cloudconvert",
        name: "CloudConvert & Zamzar",
        tagline: "The instant, private alternative for media and document conversion.",
        description:
            "CloudConvert requires uploading files to remote servers, which takes time and raises privacy concerns. Our specialized converters handle media and document conversion instantly in your browser, eliminating upload/download wait times.",
        ourTools: [
            "mp4-to-webm",
            "webm-to-mp4",
            "video-to-mp3",
            "wav-to-mp3",
            "m4a-to-mp3",
            "ogg-to-mp3",
            "mp3-to-wav",
            "flac-to-mp3",
            "all-in-one-image-converter",
        ],
        competitorFeatures: [
            "Files uploaded to remote servers for conversion",
            "Long wait times for upload, processing, and download",
            "Strict file size limits on free tiers (e.g., 1GB max)",
            "Conversion minutes capped per day",
        ],
        ourBenefits: [
            "Instant conversion with zero upload/download wait times",
            "No file size limits (bounded only by your device's available RAM)",
            "Ideal for sensitive, confidential, or unreleased media",
            "No watermarks or artificial quality degradation",
        ],
        limitations: [
            "Focused on specific high-demand formats rather than 'every format in existence'",
            "Heavy media conversions require a device with a decent CPU/GPU",
        ],
        comparisonTable: [
            {
                feature: "Speed",
                competitor: "Upload → Process → Download wait times",
                us: "Instant local processing",
            },
            {
                feature: "Privacy",
                competitor: "Files temporarily stored on servers",
                us: "100% local, zero server contact",
            },
            {
                feature: "File Size",
                competitor: "Capped at 1GB or less",
                us: "Limited only by device RAM",
            },
            {
                feature: "Cost",
                competitor: "Pay per minute or subscription",
                us: "100% Free forever",
            },
        ],
        status: "planned",
        keywords: [
            "cloudconvert alternative",
            "local media converter",
            "private audio converter",
            "mp4 to webm local",
            "flac to mp3 browser",
        ],
    },
    {
        id: "generic-image-editors",
        name: "Generic Online Image Editors & Croppers",
        tagline: "The private, high-resolution alternative for image cropping and resizing.",
        description:
            "Generic online editors require uploading high-resolution images to the cloud and often restrict free users to low-resolution downloads. Our specialized creator tools keep your high-res images private and deliver full-quality output for specific niches.",
        ourTools: [
            "universal-image-cropper",
            "manhwa-panel-cropper",
            "emote-resizer",
            "youtube-thumbnail-preview",
        ],
        competitorFeatures: [
            "Uploads high-resolution images to cloud servers",
            "Low-resolution downloads for free users",
            "Credits system for API or bulk processing",
            "Generic tools not optimized for specific niches",
        ],
        ourBenefits: [
            "100% local processing keeps your high-res images private",
            "Full resolution output with no artificial downscaling",
            "Specialized tools built specifically for creators (emotes, thumbnails, manga panels)",
            "No credits, no accounts, no watermarks",
        ],
        limitations: [
            "Does not feature AI background removal (focuses on precise cropping and resizing)",
            "Relies on your device's processing power for large image manipulation",
        ],
        comparisonTable: [
            {
                feature: "Privacy",
                competitor: "Images uploaded to cloud",
                us: "100% local, private processing",
            },
            {
                feature: "Output Quality",
                competitor: "Low-res for free users",
                us: "Full resolution, no downscaling",
            },
            {
                feature: "Specialization",
                competitor: "Generic tools",
                us: "Purpose-built for creators (emotes, thumbnails, manga)",
            },
            {
                feature: "Cost",
                competitor: "Credit-based system",
                us: "100% Free, unlimited use",
            },
        ],
        status: "in-progress",
        keywords: [
            "local image cropper",
            "discord emote resizer local",
            "youtube thumbnail previewer",
            "private manga panel cropper",
            "high res image crop no upload",
        ],
    },
    {
        id: "handbrake-online",
        name: "HandBrake & FreeConvert Video",
        tagline: "The browser-based, instant alternative to desktop media compressors.",
        description:
            "Desktop software requires installation and technical knowledge, while online compressors have strict file size limits and long upload times. Our media tools run instantly in your browser with specialized processing.",
        ourTools: ["video-compressor", "video-compressor-discord", "video-watermark"],
        competitorFeatures: [
            "Desktop software requires installation and technical knowledge",
            "Online compressors have strict file size limits (e.g., 500MB)",
            "Long upload and download times for large media files",
            "Watermarks added to free versions of online tools",
        ],
        ourBenefits: [
            "Browser-based, no software installation required",
            "Specialized presets (e.g., Discord 8MB limit) for instant results",
            "Zero upload/download wait times; processes directly on your machine",
            "Clean, custom watermarking without branding the tool's name on your video",
        ],
        limitations: [
            "Browser sandboxing may limit access to hardware acceleration compared to native desktop apps",
            "Very large files (2GB+) may cause browser memory limits on lower-end devices",
        ],
        comparisonTable: [
            {
                feature: "Convenience",
                competitor: "Requires software installation",
                us: "Runs instantly in your browser",
            },
            {
                feature: "File Limits",
                competitor: "Often capped at 500MB online",
                us: "Limited only by device RAM",
            },
            {
                feature: "Speed",
                competitor: "Upload/Download bottlenecks",
                us: "Instant local processing",
            },
            {
                feature: "Watermarks",
                competitor: "Branded watermarks on free tiers",
                us: "Clean, custom watermarks for free",
            },
        ],
        status: "planned",
        keywords: [
            "handbrake alternative browser",
            "discord video compressor 8mb",
            "local video compressor",
            "free video watermark tool",
        ],
    },
    {
        id: "metadata-remover",
        name: "Metadata2Go & VerExif",
        tagline:
            "The secure, client-side alternative for removing EXIF, ID3, and sensitive metadata.",
        description:
            "Online metadata removers require uploading your photos, audio, or network logs to third-party servers, which defeats the purpose of privacy. Our tools wipe metadata and sanitize files entirely in your browser, guaranteeing your data never touches a server.",
        ourTools: ["exif-wiper", "har-sanitizer", "audio-tag-editor"],
        competitorFeatures: [
            "Requires uploading sensitive files to third-party servers",
            "Unclear data retention policies for uploaded files",
            "Limited to basic EXIF data, often missing deeper metadata or network logs",
            "Clunky, ad-heavy interfaces",
        ],
        ourBenefits: [
            "Guaranteed privacy: files are processed entirely in your browser",
            "Advanced sanitization, including HAR network log redaction and MP3 ID3 editing",
            "True metadata removal with zero data retention",
            "Clean, ad-free, and open-source interface",
        ],
        limitations: [
            "Cannot process files that are locked by the operating system",
            "Relies on the browser's File API capabilities",
        ],
        comparisonTable: [
            {
                feature: "Privacy",
                competitor: "Files uploaded to unknown servers",
                us: "100% local, zero server contact",
            },
            {
                feature: "Data Retention",
                competitor: "Unclear or retained for analytics",
                us: "Impossible, server never sees file",
            },
            {
                feature: "Scope",
                competitor: "Basic photo EXIF only",
                us: "Photo/PDF metadata + advanced developer HAR sanitization + MP3 ID3",
            },
            {
                feature: "Experience",
                competitor: "Ad-heavy, clunky interfaces",
                us: "Clean, open-source, ad-free",
            },
        ],
        status: "done",
        keywords: [
            "metadata2go alternative",
            "local exif remover",
            "private har sanitizer",
            "browser metadata wiper",
            "mp3 tag editor local",
        ],
    },
    {
        id: "convert-csv",
        name: "ConvertCSV & JSONFormatter",
        tagline: "The private, powerful alternative for data transformation and SQL querying.",
        description:
            "Online data converters require pasting or uploading sensitive datasets to external web servers. Our developer tools process JSON, CSV, and VCF files entirely in your browser, featuring advanced capabilities like running actual SQL queries on your data locally.",
        ourTools: [
            "json-to-csv",
            "csv-to-json",
            "csv-json-sql-query",
            "all-in-one-data-transformer",
            "vcf-to-csv",
        ],
        competitorFeatures: [
            "Pastes or uploads sensitive data to external web servers",
            "Lacks advanced querying capabilities (just simple conversion)",
            "Ads and pop-ups disrupt the workflow",
            "No support for specialized formats like VCF contacts",
        ],
        ourBenefits: [
            "100% client-side processing ensures your proprietary data stays private",
            "Advanced features like running actual SQL queries directly on CSV/JSON files powered by DuckDB WebAssembly",
            "Specialized converters (e.g., VCF to CSV/Excel for iPhone/Android contacts)",
            "Fast, ad-free, and open-source",
        ],
        limitations: [
            "Very large datasets (millions of rows) may cause browser tab to freeze due to memory limits",
            "SQL querying is limited to in-memory processing, not a persistent database",
        ],
        comparisonTable: [
            {
                feature: "Data Privacy",
                competitor: "Data sent to external servers",
                us: "100% local, stays on your machine",
            },
            {
                feature: "Capabilities",
                competitor: "Simple format swapping",
                us: "Advanced SQL querying (DuckDB) and complex transformations",
            },
            {
                feature: "Specialization",
                competitor: "Generic CSV/JSON",
                us: "Includes specialized tools like VCF contact conversion",
            },
            {
                feature: "Experience",
                competitor: "Ad-supported, disruptive",
                us: "Clean, fast, and open-source",
            },
        ],
        status: "in-progress",
        keywords: [
            "convertcsv alternative",
            "local json to csv",
            "private sql query csv browser",
            "vcf to csv local",
            "offline data transformer",
        ],
    },
];
