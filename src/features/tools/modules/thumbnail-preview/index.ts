import { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const thumbnailPreviewToolMetadataList: BaseTool[] = [
    {
        id: "youtube-thumbnail-preview",
        category: "creator", // Or create a "creator" category in your schema
        name: "YouTube Thumbnail Previewer",
        tags: ["youtube", "thumbnail", "preview", "creator"],
        createdAt: new Date().toISOString(), // Triggers "New" badge
        description:
            "See exactly how your thumbnail looks on Desktop and Mobile, in Light and Dark mode.",
        longDescription:
            "Test your YouTube thumbnail readability and contrast before you publish. Preview your image alongside realistic titles and metadata in both Desktop and Mobile views, across Light and Dark modes. 100% private, runs locally in your browser.",
        keywords: [
            "youtube thumbnail previewer",
            "thumbnail tester",
            "youtube ctr tool",
            "dark mode thumbnail check",
            "mobile thumbnail preview",
        ],
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/2560e0f6ab1f2ffe68aa9d9548e04643c2a1abd0-1376x768.jpg",
        faqs: [
            {
                question: "What is the ideal YouTube thumbnail size?",
                answer: "1280 x 720 pixels (16:9 aspect ratio), under 2MB, in JPG, GIF, or PNG format.",
            },
            {
                question: "Why test in Dark Mode?",
                answer: "Over 70% of YouTube watch time happens in Dark Mode. High-contrast text and bright colors perform significantly better.",
            },
            {
                question: "Are my images uploaded?",
                answer: "No. Everything is processed locally in your browser. Your unreleased thumbnails remain 100% private.",
            },
        ],
    },
];

export const thumbnailPreviewToolComponentMap: ToolComponentMap = {
    // "youtube-thumbnail-preview": dynamic(() => import("./component")),
};
