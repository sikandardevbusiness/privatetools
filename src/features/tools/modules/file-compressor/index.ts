import dynamic from "next/dynamic";

import { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const fileCompressorToolMetadataList: BaseTool[] = [
    {
        id: "image-compressor",
        category: "image",
        name: "Image Compressor",
        longName: "Free Image Compressor Online - Shrink Files with No Uploads",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/b76c4502ac263ed6f2623746b53ba5fbd1b8edd0-1376x768.jpg",
        description:
            "Compress JPEG, PNG, WebP, and AVIF images online for free. Reduce image file size by up to 80% locally in your browser with zero quality loss.",
        longDescription:
            "Shrink bulky image files without sacrificing visible detail. Whether you need faster website load speeds, smaller attachments for email, or optimized assets for mobile applications, this client-side compressor reduces JPEG, PNG, WebP, and AVIF file sizes by up to 80%.\n\nTraditional online image optimizers upload your files to remote cloud queues, creating slow turnaround times and serious privacy concerns for personal or company assets. Our compressor uses modern browser Web Workers to process images directly on your device. Your pictures stay on your computer, compress in fractions of a second, and never consume upload bandwidth.\n\nTake complete control over your compression settings. Toggle between intuitive quality presets or dial in custom dimensions and compression ratios to match your exact performance requirements. Compress dozens of images at once and download them in a convenient ZIP package.",
        tags: [
            "image compressor",
            "photo optimizer",
            "reduce file size",
            "webp converter",
            "image tools",
        ],
        keywords: [
            "compress images online free no upload",
            "client side image compressor browser",
            "reduce jpeg file size without losing quality",
            "compress png transparent background online",
            "bulk image compressor without server",
            "shrink photo size for web optimization",
            "convert and compress to webp online",
            "private image optimizer no limits",
            "fast local photo compression tool",
        ],
        steps: [
            {
                title: "Add Your Images",
                description:
                    "Drag and drop one or multiple pictures into the local browser compressor.",
            },
            {
                title: "Choose Compression Level",
                description:
                    "Pick a quality preset or adjust the slider to balance visual clarity and file size.",
            },
            {
                title: "Download Optimized Files",
                description:
                    "Save your smaller images individually or download all files together in a ZIP file.",
            },
        ],
        whatToExpect: [
            {
                title: "Significant Size Reduction",
                description: "Cut file sizes by up to 80% while retaining crisp visual resolution.",
            },
            {
                title: "Rapid Batch Optimization",
                description:
                    "Process dozens of photos locally in seconds without upload wait times.",
            },
            {
                title: "Strict Data Protection",
                description:
                    "Keep sensitive graphics, invoices, and personal photos safe on your own device.",
            },
        ],
        faqs: [
            {
                question: "Are my pictures uploaded to a remote server for compression?",
                answer: "No. All compression happens locally on your computer or phone using Web Workers inside your browser. Your images never leave your device.",
            },
            {
                question: "Will compressing images make them look blurry or pixelated?",
                answer: "No. The compressor applies intelligent lossy and lossless algorithms designed to remove unnecessary byte data while keeping the photo sharp and clear to the human eye.",
            },
            {
                question: "Can I compress multiple images simultaneously?",
                answer: "Yes. You can select dozens of images at once, apply your target quality setting, and batch download the compressed results as a single ZIP archive.",
            },
            {
                question: "Which image formats does the compressor support?",
                answer: "You can compress and convert between all standard web formats including JPEG, PNG, WebP, AVIF, and GIF.",
            },
        ],
    },
    {
        id: "pdf-compressor",
        category: "document",
        name: "PDF Compressor",
        longName: "Free PDF Compressor Online - Shrink PDF Size with No Upload",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/51d91055d270b211c4bfdb0ac3c81427977a01f9-1376x768.jpg",
        description:
            "Compress PDF files online for free directly in your browser. Reduce document size by up to 80% with custom target sizes and zero server uploads.",
        longDescription:
            "Shrink large PDF documents to manageable file sizes without compromising font sharpness or diagram readability. Whether you need to meet strict email attachment caps, upload resumes to job portals, or submit legal forms under a 2MB limit, this client-side PDF compressor reduces file weight by up to 80%.\n\nMost online PDF tools send your sensitive tax forms, financial records, and contracts to remote cloud processing queues, introducing data leaks and privacy risks. Our optimizer runs locally in your browser using WebAssembly. Your documents are rendered, downsampled, and re-encoded on your device, meaning your confidential information never travels over the web.\n\nSet specific target sizes in kilobytes or megabytes, or select smart compression presets that match standard government, university, or corporate portal requirements. Batch-process multiple PDF files simultaneously and download the optimized files individually or packaged in a ZIP archive.",
        tags: [
            "pdf compressor",
            "reduce pdf",
            "document optimizer",
            "pdf tools",
            "file compressor",
        ],
        keywords: [
            "compress pdf online free no upload",
            "reduce pdf file size below 2mb",
            "client side pdf compressor browser",
            "shrink pdf document without losing quality",
            "compress confidential pdf privately",
            "batch pdf size reducer free",
            "make scanned pdf smaller for email",
            "pdf compressor to target size kb",
            "offline webassembly pdf optimizer",
        ],
        steps: [
            {
                title: "Choose PDF Files",
                description:
                    "Drag and drop one or multiple PDF documents into the browser compression window.",
            },
            {
                title: "Select Size Target",
                description:
                    "Pick a compression preset or specify your exact target file size in KB or MB.",
            },
            {
                title: "Download Smaller PDF",
                description:
                    "Save the reduced document directly to your device or download all as a ZIP archive.",
            },
        ],
        whatToExpect: [
            {
                title: "Guaranteed Document Privacy",
                description:
                    "Bank records, resumes, and medical files stay safely on your local device.",
            },
            {
                title: "Predictable Target Sizes",
                description:
                    "Hit strict email and application portal upload limits without trial and error.",
            },
            {
                title: "Sharp Text Retention",
                description:
                    "Vector text, signatures, and document layouts stay crisp and fully legible.",
            },
        ],
        faqs: [
            {
                question: "Will my confidential documents be uploaded to a server?",
                answer: "No. The compression engine executes locally in your browser through WebAssembly. Your PDFs never leave your computer or phone, making it secure for contracts, bank statements, and tax forms.",
            },
            {
                question: "Can I set a specific target file size like 1MB or 300KB?",
                answer: "Yes. You can enter an exact target threshold in KB or MB, and the tool will calculate the optimal image downsampling and font subsampling to match that target.",
            },
            {
                question: "Will text become blurry after compression?",
                answer: "No. Vector text fonts and shapes remain clean and scalable. The tool primarily reduces heavy raster image assets and cleans redundant metadata streams within the PDF.",
            },
            {
                question: "Can I compress multiple PDF documents at once?",
                answer: "Yes. You can drag and drop multiple PDF files into the batch queue, process them simultaneously, and download all compressed files in a single ZIP.",
            },
        ],
    },
    {
        id: "video-compressor",
        category: "video",
        name: "Video Compressor",
        longName: "Free Video Compressor Online - Shrink MP4 & WebM Files Locally",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/f37c9e130df0c30b3b715001ef83923784a0a3a8-1376x768.jpg",
        description:
            "Compress MP4 and WebM videos online for free. Reduce video file size by up to 80% locally in your browser using GPU acceleration, with zero server uploads.",
        longDescription:
            "Shrink large video files without sacrificing visual quality. Whether you need to meet strict upload limits for Discord, WhatsApp, email, or web portals, this client-side video compressor reduces MP4 and WebM file sizes by up to 80%.\n\nTraditional online video compressors force you to upload massive files to remote servers, wasting hours on upload/download times and exposing your private videos to privacy risks. Our compressor runs entirely in your browser, utilizing your device's built-in GPU (via the WebCodecs API) to re-encode videos at lightning speed. Your files never leave your device.\n\nSet specific target file sizes in kilobytes or megabytes, or select smart compression presets. Batch-process multiple videos simultaneously and download the optimized files individually or packaged in a ZIP archive.",
        tags: [
            "video compressor",
            "reduce video size",
            "mp4 compressor",
            "webm compressor",
            "video tools",
        ],
        keywords: [
            "compress video online free no upload",
            "reduce mp4 file size below 8mb",
            "client side video compressor browser",
            "shrink video without losing quality",
            "compress video for discord whatsapp email",
            "webm compressor online free",
            "gpu accelerated video compression",
            "private video optimizer no limits",
        ],
        steps: [
            {
                title: "Add Your Videos",
                description:
                    "Drag and drop one or multiple MP4, WebM, MOV, or AVI files into the browser.",
            },
            {
                title: "Choose Compression Level",
                description:
                    "Pick a quality preset or specify an exact target file size in KB or MB.",
            },
            {
                title: "Download Optimized Videos",
                description:
                    "Save your smaller videos individually or download all files together in a ZIP archive.",
            },
        ],
        whatToExpect: [
            {
                title: "Massive Size Reduction",
                description:
                    "Cut video file sizes by up to 80% while retaining smooth playback and visual clarity.",
            },
            {
                title: "GPU-Accelerated Speed",
                description:
                    "Leverages your device's hardware encoder for blazing-fast compression without draining your CPU.",
            },
            {
                title: "Strict Data Protection",
                description:
                    "Your personal videos, screen recordings, and confidential footage stay 100% on your device.",
            },
        ],
        faqs: [
            {
                question: "Are my videos uploaded to a remote server for compression?",
                answer: "No. All compression happens locally on your computer or phone using the browser's native WebCodecs API. Your videos never leave your device.",
            },
            {
                question: "Will compressing my video make it look blurry or pixelated?",
                answer: "No. The compressor uses smart bitrate allocation and hardware-accelerated encoding to remove unnecessary data while keeping the video sharp and clear to the human eye.",
            },
            {
                question: "Can I compress multiple videos simultaneously?",
                answer: "Yes. You can select multiple videos at once, apply your target quality setting, and batch download the compressed results as a single ZIP archive.",
            },
            {
                question: "Which video formats does the compressor support?",
                answer: "You can compress MP4, WebM, MOV, and AVI files, and export them as highly compatible MP4 or WebM formats.",
            },
        ],
    },
    {
        id: "audio-compressor",
        category: "audio",
        name: "Audio Compressor",
        longName: "Free Audio Compressor Online - Shrink MP3, WAV, M4A Files Locally",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/f592c44a28ecfbf9ac3edd934de814d7cdb832a1-1376x768.jpg",
        description:
            "Compress MP3, WAV, M4A, OGG, and AAC audio files online for free. Reduce audio file size by up to 80% locally in your browser with zero server uploads.",
        longDescription:
            "Shrink large audio files without sacrificing sound quality. Whether you need to meet strict upload limits for email, podcasts, or web portals, this client-side audio compressor reduces MP3, WAV, M4A, OGG, and AAC file sizes by up to 80%.\n\nTraditional online audio compressors force you to upload your private recordings to remote servers, wasting time and exposing your data to privacy risks. Our compressor runs entirely in your browser, utilizing hardware-accelerated encoding to re-compress audio at lightning speed. Your files never leave your device.\n\nSet specific target file sizes in kilobytes or megabytes, or select smart compression presets. Batch-process multiple audio tracks simultaneously and download the optimized files individually or packaged in a ZIP archive.",
        tags: [
            "audio compressor",
            "reduce audio size",
            "mp3 compressor",
            "wav to mp3",
            "audio tools",
        ],
        keywords: [
            "compress audio online free no upload",
            "reduce mp3 file size below 5mb",
            "client side audio compressor browser",
            "shrink wav file without losing quality",
            "compress audio for email podcast",
            "m4a ogg aac compressor online free",
            "hardware accelerated audio compression",
            "private audio optimizer no limits",
        ],
        steps: [
            {
                title: "Add Your Audio Files",
                description:
                    "Drag and drop one or multiple MP3, WAV, M4A, OGG, or AAC files into the browser.",
            },
            {
                title: "Choose Compression Level",
                description:
                    "Pick a quality preset or specify an exact target file size in KB or MB.",
            },
            {
                title: "Download Optimized Audio",
                description:
                    "Save your smaller audio files individually or download all files together in a ZIP archive.",
            },
        ],
        whatToExpect: [
            {
                title: "Massive Size Reduction",
                description:
                    "Cut audio file sizes by up to 80% while retaining clear, high-fidelity sound.",
            },
            {
                title: "Lightning-Fast Processing",
                description:
                    "Leverages your device's built-in encoders for blazing-fast compression without draining your CPU.",
            },
            {
                title: "Strict Data Protection",
                description:
                    "Your personal recordings, voice memos, and confidential audio stay 100% on your device.",
            },
        ],
        faqs: [
            {
                question: "Are my audio files uploaded to a remote server for compression?",
                answer: "No. All compression happens locally on your computer or phone using the browser's native WebCodecs API. Your audio never leaves your device.",
            },
            {
                question: "Will compressing my audio make it sound muffled or distorted?",
                answer: "No. The compressor uses smart bitrate allocation to remove unnecessary data while keeping the audio crisp and clear to the human ear.",
            },
            {
                question: "Can I compress multiple audio files simultaneously?",
                answer: "Yes. You can select multiple audio tracks at once, apply your target quality setting, and batch download the compressed results as a single ZIP archive.",
            },
            {
                question: "Which audio formats does the compressor support?",
                answer: "You can compress MP3, WAV, M4A, OGG, and AAC files, and export them as highly compatible MP3, M4A, or OGG formats.",
            },
        ],
    },
    {
        id: "video-compressor-discord",
        category: "video",
        name: "Video Compressor for Discord (8MB)",
        isExperimental: true,
        longName: "Free Video Compressor for Discord - Shrink to 8MB Locally",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/8d5d109eeba02440c8f12a7b8ae3157c237e9294-1376x768.jpg",
        description:
            "Compress videos to exactly 8MB for Discord uploads. Free, local, and fast with zero server uploads.",
        longDescription:
            "Struggling with Discord's strict 8MB file size limit for non-Nitro users? This free, client-side video compressor shrinks your MP4 or WebM files to perfectly fit under 8MB without sacrificing watchable quality.\n\nUnlike sketchy online converters that steal your data or add watermarks, our tool runs 100% locally in your browser using hardware-accelerated WebCodecs. Your videos never leave your device, ensuring complete privacy and lightning-fast processing.\n\nSimply drop your video, and the tool automatically calculates the perfect bitrate to hit the 8MB target. You can also customize the target size for WhatsApp (16MB) or email attachments.",
        tags: [
            "discord video compressor",
            "compress video to 8mb",
            "discord file size limit",
            "video tools",
        ],
        keywords: [
            "compress video to 8mb for discord",
            "make video smaller for discord free",
            "discord video size limit compressor",
            "shrink mp4 to 8mb online no upload",
            "reduce video file size for discord nitro free alternative",
            "local video compressor for discord 8mb limit",
        ],
        steps: [
            {
                title: "Upload Video",
                description: "Drag and drop your MP4, WebM, or MOV file into the browser.",
            },
            {
                title: "Auto-Compress to 8MB",
                description:
                    "The tool automatically calculates the optimal bitrate to fit the 8MB Discord limit.",
            },
            {
                title: "Download & Share",
                description: "Save your perfectly sized video and upload it directly to Discord.",
            },
        ],
        whatToExpect: [
            {
                title: "Perfect 8MB Fit",
                description:
                    "Intelligent padding and bitrate calculation guarantee your video stays under the limit.",
            },
            {
                title: "100% Private & Local",
                description:
                    "No server uploads. Your videos are processed entirely on your device.",
            },
            {
                title: "Lightning Fast",
                description:
                    "Uses your device's GPU for hardware-accelerated compression in seconds.",
            },
        ],
        faqs: [
            {
                question: "Will this guarantee my video is under 8MB for Discord?",
                answer: "Yes. The tool calculates the exact bitrate needed based on your video's duration and applies format-compliant padding to ensure it hits the target size perfectly.",
            },
            {
                question: "Is my video uploaded to a server?",
                answer: "No. Everything happens locally in your browser. Your files never leave your device.",
            },
            {
                question: "Can I change the 8MB limit to something else?",
                answer: "Absolutely. You can manually adjust the target size field to 16MB for WhatsApp or any other size you need.",
            },
        ],
    },
];

export const fileCompressorToolComponentMap: ToolComponentMap = {
    "pdf-compressor": dynamic(() => import("./component")),
    "image-compressor": dynamic(() => import("./component")),
    "video-compressor": dynamic(() => import("./component")),
    "audio-compressor": dynamic(() => import("./component")),
    "video-compressor-discord": dynamic(() => import("./component")),
};

export const fileCompressorToolConfigMap: Record<
    string,
    {
        acceptType: string;
        defaultFormat: string;
        inputFormats: string[];
        outputFormats: string[];
        defaultTargetSizeKB?: number | null;
    }
> = {
    "image-compressor": {
        acceptType: "image/*",
        inputFormats: [
            "jpg",
            "jpeg",
            "png",
            "webp",
            "heic",
            "heif",
            "gif",
            "bmp",
            "svg",
            "tiff",
            "tif",
        ],
        outputFormats: ["jpg", "jpeg", "png", "webp"],
        defaultFormat: "webp",
        defaultTargetSizeKB: null,
    },
    "pdf-compressor": {
        acceptType: "application/pdf",
        inputFormats: ["pdf"],
        outputFormats: ["pdf"],
        defaultFormat: "pdf",
        defaultTargetSizeKB: null,
    },
    "video-compressor": {
        acceptType: "video/mp4,video/webm,video/quicktime,video/x-msvideo",
        inputFormats: ["mp4", "webm", "mov", "avi"],
        outputFormats: ["mp4", "webm"],
        defaultFormat: "mp4",
        defaultTargetSizeKB: null,
    },
    "video-compressor-discord": {
        acceptType: "video/mp4,video/webm,video/quicktime,video/x-msvideo",
        inputFormats: ["mp4", "webm", "mov", "avi"],
        outputFormats: ["mp4", "webm"],
        defaultFormat: "mp4",
        defaultTargetSizeKB: 8192,
    },
    "audio-compressor": {
        acceptType: "audio/mpeg,audio/wav,audio/mp4,audio/x-m4a,audio/ogg,audio/aac",
        inputFormats: ["mp3", "wav", "m4a", "ogg", "aac"],
        outputFormats: ["mp3", "wav", "m4a", "ogg", "aac"],
        defaultFormat: "mp3",
        defaultTargetSizeKB: null,
    },
};
