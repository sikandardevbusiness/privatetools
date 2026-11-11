import dynamic from "next/dynamic";

import { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const manhwaPdfMergerToolMetadataList: BaseTool[] = [
    {
        id: "manhwa-pdf-merger",
        category: "creator",
        name: "Webtoon to PDF Merger",
        createdAt: "10-11-2026",
        longName: "Free Webtoon to PDF Merger | Combine Manga, Manhwa & Comic Images Online",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/4ef69d9b32095258582420466b61f8565e31a5dc-1376x768.jpg",
        description:
            "Upload your sliced webtoon or manga images and merge them into a single, optimized PDF for offline reading. 100% local and private.",
        longDescription:
            "Need to combine your sliced webtoon or manga images into one seamless PDF? Our free Webtoon to PDF Merger lets you merge multiple images into a single, high-quality PDF document directly in your browser. Perfect for manhwa readers, manga fans, and webcomic creators who want to create reading-ready PDFs from image slices.\n\nSimply upload your images (JPG, PNG, WEBP), reorder them with drag-and-drop, adjust quality and scaling, then merge them into a professional PDF. Whether you're creating a webtoon chapter PDF, combining manga pages, or stitching manhwa panels, our tool handles it all locally - no file uploads, no watermarks, complete privacy.\n\nFeatures include: automatic image stitching, customizable page size (Original or A4), quality control, seamless edge-to-edge merging with zero gaps, and instant download. Optimized for webtoons, manga, manhwa, comics, and graphic novels.",
        tags: [
            "webtoon to pdf",
            "manga merger",
            "manhwa pdf creator",
            "combine images to pdf",
            "comic stitcher",
            "webtoon merger online",
            "manga to pdf converter",
            "image to pdf merger",
            "seamless pdf merger",
        ],
        keywords: [
            "webtoon to pdf converter free",
            "merge manga images to pdf online",
            "combine webtoon slices into pdf",
            "manhwa image merger pdf",
            "stitch manga pages pdf free",
            "webtoon panel merger",
            "create pdf from images online free",
            "combine jpg to pdf webtoon",
            "manga chapter pdf creator",
            "webtoon reader pdf maker",
            "merge comic images pdf",
            "manhwa to pdf converter browser",
            "seamless webtoon pdf merger",
            "combine png images to pdf",
            "webtoon stitcher no watermark",
            "local pdf merger no upload",
            "manga merger tool online",
            "create reading pdf from images",
            "webtoon image combiner",
            "pdf merger for comics",
        ],
        steps: [
            {
                title: "Upload Your Images",
                description:
                    "Drag and drop your sliced webtoon, manga, or manhwa images (JPG, PNG, WEBP).",
            },
            {
                title: "Arrange Order",
                description:
                    "Reorder pages using drag-and-drop to ensure correct reading sequence.",
            },
            {
                title: "Customize Settings",
                description: "Adjust page size, quality, scale, and margins for perfect output.",
            },
            {
                title: "Merge & Download",
                description: "Click merge to instantly generate your seamless PDF and download it.",
            },
        ],
        whatToExpect: [
            {
                title: "100% Private & Local",
                description:
                    "Your images never leave your device. All processing happens in your browser with zero uploads to servers.",
            },
            {
                title: "Zero Gaps Between Images",
                description:
                    "Seamless edge-to-edge merging with customizable margins. Perfect for continuous webtoon reading.",
            },
            {
                title: "Full Control Over Output",
                description:
                    "Adjust quality (10-100%), scale (25-150%), page size (Original/A4), and spacing to match your needs.",
            },
        ],
        faqs: [
            {
                question: "How do I merge webtoon images into a PDF?",
                answer: "Simply upload your sliced webtoon images using the upload button, arrange them in the correct reading order by dragging, adjust your preferred settings (quality, scale, page size), and click 'Merge to PDF'. Your PDF will be generated instantly and downloaded automatically.",
            },
            {
                question: "Can I combine manga or manhwa pages without gaps?",
                answer: "Yes! Set the Vertical Margin (Y) and Horizontal Margin (X) to 0 for seamless, edge-to-edge merging. This creates a continuous scroll perfect for webtoon reading with no white space between panels.",
            },
            {
                question: "Is this webtoon merger free to use?",
                answer: "Yes, completely free! No registration required, no watermarks, no hidden fees. You can merge as many images as you want, as many times as you want.",
            },
            {
                question: "Will my images be uploaded to a server?",
                answer: "Absolutely not. All processing happens locally in your browser using JavaScript. Your images never leave your device, ensuring complete privacy and security for your content.",
            },
            {
                question: "What image formats are supported?",
                answer: "We support JPG, JPEG, PNG, and WEBP formats. You can mix different formats in the same PDF if needed.",
            },
        ],
    },
    {
        id: "images-to-pdf",
        category: "image",
        name: "Images to PDF",
        createdAt: "10-11-2026",
        longName: "Free Images to PDF Converter | Merge Photos & Documents Online",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/f1bba083e212b734039194a95cf8f9e5611918bc-1376x768.jpg",
        description:
            "Convert and merge multiple images into a single PDF document. Perfect for photos, documents, and standard images. Fast, free, and 100% private.",
        longDescription:
            "Easily convert your images to PDF format or merge multiple photos into one document. Our Images to PDF tool works entirely in your browser - no uploads, no registration, completely free. Ideal for creating PDF documents from photos, combining scanned images, or organizing multiple pictures into a single file.\n\nUpload your images (JPG, PNG, WEBP), arrange them in order, choose A4 or original size, adjust quality, and merge instantly. Perfect for creating photo albums, document scans, or image collections in PDF format.",
        tags: [
            "images to pdf",
            "photo to pdf",
            "jpg to pdf",
            "png to pdf",
            "merge images pdf",
            "convert images to pdf",
            "combine photos pdf",
        ],
        keywords: [
            "images to pdf converter free",
            "merge photos to pdf online",
            "convert jpg to pdf free",
            "combine images into pdf",
            "photo to pdf converter",
            "create pdf from images",
            "multiple images to one pdf",
        ],
        steps: [
            {
                title: "Upload Images",
                description: "Select and upload your images (JPG, PNG, WEBP).",
            },
            {
                title: "Arrange & Configure",
                description: "Drag to reorder, choose A4 or original size, adjust quality.",
            },
            {
                title: "Merge & Download",
                description: "Click merge to create your PDF and download instantly.",
            },
        ],
        whatToExpect: [
            {
                title: "100% Private",
                description: "All processing happens locally in your browser. No uploads.",
            },
            {
                title: "A4 or Original Size",
                description: "Choose standard A4 formatting or keep original image dimensions.",
            },
            {
                title: "Fast & Free",
                description: "No registration, no watermarks, unlimited conversions.",
            },
        ],
        faqs: [
            {
                question: "How do I convert images to PDF?",
                answer: "Upload your images, arrange them in order, select your preferred settings (A4 or original size), and click 'Merge to PDF'. Your PDF will download automatically.",
            },
            {
                question: "Is this service free?",
                answer: "Yes! Completely free with no registration required. Convert as many images as you want.",
            },
            {
                question: "Are my images uploaded?",
                answer: "No. All processing happens locally in your browser. Your images never leave your device.",
            },
            {
                question: "What formats are supported?",
                answer: "We support JPG, JPEG, PNG, and WEBP image formats.",
            },
            {
                question: "Can I merge multiple images into one PDF?",
                answer: "Yes! Upload multiple images, arrange them in your preferred order, and they will be merged into a single PDF document.",
            },
        ],
    },
];

export const manhwaPdfMergerToolComponentMap: ToolComponentMap = {
    "images-to-pdf": dynamic(() => import("./component")),
    "manhwa-pdf-merger": dynamic(() => import("./component")),
};

export interface MergerToolConfig {
    quality: number;
    marginX: number;
    marginY: number;
    singlePage: boolean;
    scaleFactor: number;
    imagesPerPage: number;
    pageSize: "original" | "a4";
}

export const manhwaPdfMergerToolConfigMap: Record<string, MergerToolConfig> = {
    "manhwa-pdf-merger": {
        marginX: 0,
        marginY: 0,
        quality: 85,
        singlePage: true,
        scaleFactor: 0.4,
        imagesPerPage: 1,
        pageSize: "original",
    },
    "images-to-pdf": {
        marginX: 0,
        marginY: 0,
        quality: 85,
        pageSize: "a4",
        scaleFactor: 1.0,
        imagesPerPage: 1,
        singlePage: false,
    },
};
