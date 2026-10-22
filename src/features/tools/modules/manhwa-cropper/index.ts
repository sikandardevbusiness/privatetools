import { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const manhwaCropperToolMetadataList: BaseTool[] = [
    {
        id: "manhwa-panel-cropper",
        category: "image",
        name: "Manhwa & Webtoon Panel Cropper",
        keywords: [
            "manhwa cropper",
            "webtoon panel splitter",
            "manga page slicer",
            "long vertical image cropper",
            "comic panel extractor",
            "auto crop webtoon",
            "split long image online",
            "webtoon episode slicer",
            "vertical comic cutter",
            "manga panel separator",
        ],
        tags: ["manhwa", "webtoon", "manga", "split", "crop"],
        isExperimental: true,
        description:
            "Auto-stitch and split long manhwa, webtoon, or manga pages into perfectly cropped individual panels. 100% private, no file size limits.",
        longDescription:
            "The ultimate free tool for comic creators, translators, and fans. Upload multiple manhwa or webtoon pages, and our tool will automatically stitch them into a continuous vertical strip. Using smart pixel analysis, it detects the white or black gaps between panels and slices them into perfectly cropped, individual images. Choose between 'Auto Gap Detection' or 'Fixed Height' slicing, auto-detect background colors, and export in high-quality PNG or optimized JPG. Everything runs 100% locally in your browser—your unreleased chapters and private comics never touch a server, and there are no file size limits.",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/a881daf7bd6777bd87f5616e5215c9a1829a787c-1376x768.jpg",
        faqs: [
            {
                question: "Are my images uploaded to a server?",
                answer: "Absolutely not. Everything runs 100% locally in your browser using the HTML5 Canvas API. Your comics, webtoons, and manga remain completely private and secure.",
            },
            {
                question: "Is there a file size or page limit?",
                answer: "No! Unlike other tools, we don't impose artificial file size limits. You can process full webtoon episodes with dozens of pages at once. The tool uses smart memory management to handle extremely long vertical strips.",
            },
            {
                question: "What is the difference between 'Auto' and 'Fixed' split modes?",
                answer: "'Auto' mode scans the image for horizontal white or black bands (gutters) and cuts exactly there, preventing awkward cuts through characters or text. 'Fixed' mode cuts at a specific pixel height (e.g., every 2400px), but includes a 'Safe Search Margin' to nudge the cut to the nearest blank band if possible.",
            },
            {
                question: "What does 'Gap Strength' mean?",
                answer: "It determines how strict the tool is about identifying a gap. A value of 0.97 means 97% of the pixels in a horizontal row must be pure white or pure black to be considered a valid split point. Lower it to 0.90 if your comic has textured or colored backgrounds between panels.",
            },
            {
                question: "Can I process multiple files at once?",
                answer: "Yes! You can select multiple pages (e.g., page 1, page 2, page 3) at once. The tool will automatically stitch them together in alphabetical/numerical order before splitting them into panels.",
            },
        ],
    },
];

export const manhwaCropperToolComponentMap: ToolComponentMap = {
    // "manhwa-panel-cropper": dynamic(() => import("./component")),
};
