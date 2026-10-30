import dynamic from "next/dynamic";

import { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const thumbnailPreviewToolMetadataList: BaseTool[] = [
    {
        id: "youtube-thumbnail-preview",
        category: "creator",
        name: "YouTube Thumbnail Previewer",
        longName: "Free YouTube Thumbnail Previewer & CTR Tester Online",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/2560e0f6ab1f2ffe68aa9d9548e04643c2a1abd0-1376x768.jpg",
        description:
            "Test your YouTube thumbnail and title across Desktop, Mobile, Light, and Dark modes before publishing. Boost your click-through rate with zero uploads.",
        longDescription:
            "Test how your video thumbnail and title appear in realistic YouTube feeds before you publish. A high-converting thumbnail makes or breaks your video's click-through rate (CTR). This preview tool simulates desktop homepages, mobile feeds, suggested video sidebars, and search result layouts so you can spot design flaws before your video goes live.\n\nOver 70% of YouTube viewing happens in Dark Mode and on mobile devices where thumbnails appear at compact dimensions. Our interactive previewer lets you toggle instantly between Light and Dark themes and mobile-to-desktop screens. Verify that bold text overlays remain legible, color contrast pops against dark backgrounds, and the duration timestamp does not cover key visual focal points.\n\nProtect your unreleased video concepts and channel strategy. All thumbnail rendering and title testing run 100% locally in your web browser. Your unpublished artwork, titles, and video metadata never leave your computer, keeping your upcoming releases confidential.",
        tags: [
            "youtube tools",
            "thumbnail tester",
            "creator tools",
            "youtube ctr",
            "video marketing",
        ],
        keywords: [
            "youtube thumbnail previewer online",
            "test youtube thumbnail ctr free",
            "youtube dark mode thumbnail tester",
            "mobile youtube thumbnail preview",
            "youtube title and thumbnail checker",
            "check thumbnail timestamp overlap",
            "youtube creator thumbnail optimizer",
            "free thumbnail comparison tool",
            "unreleased youtube video previewer",
        ],
        steps: [
            {
                title: "Upload Thumbnail Artwork",
                description:
                    "Drop your 1280x720 thumbnail image and enter your prospective video title.",
            },
            {
                title: "Compare Feeds & Themes",
                description:
                    "Switch between Desktop, Mobile, Light Mode, and Dark Mode feed simulations.",
            },
            {
                title: "Optimize for High CTR",
                description:
                    "Check readability, contrast, and timestamp placement before publishing your video.",
            },
        ],
        whatToExpect: [
            {
                title: "Accurate Feed Simulation",
                description:
                    "Preview your thumbnail in true-to-life YouTube desktop and mobile feed layouts.",
            },
            {
                title: "Timestamp Collision Check",
                description:
                    "Ensure the video duration badge in the bottom-right corner does not hide crucial details.",
            },
            {
                title: "100% Content Privacy",
                description:
                    "Unreleased video artwork and titles remain confidential on your local device.",
            },
        ],
        faqs: [
            {
                question: "What is the recommended size and aspect ratio for YouTube thumbnails?",
                answer: "YouTube recommends 1280 x 720 pixels with a 16:9 aspect ratio, a minimum width of 640 pixels, under 2MB in size, formatted as JPG, PNG, or WEBP.",
            },
            {
                question: "Why is it important to test thumbnails in Dark Mode?",
                answer: "Most YouTube users watch in Dark Mode. Testing ensures your thumbnail colors and borders stand out cleanly against dark gray and black feed backgrounds.",
            },
            {
                question: "Can I check if the video timestamp will cover my text?",
                answer: "Yes. The previewer overlays a realistic video duration badge in the lower-right corner so you can avoid placing critical faces or text underneath it.",
            },
            {
                question: "Are my unreleased video thumbnails uploaded to any database?",
                answer: "No. The previewer functions entirely inside your browser memory. Your upcoming video concepts, titles, and thumbnails are never uploaded or tracked.",
            },
        ],
    },
];

export const thumbnailPreviewToolComponentMap: ToolComponentMap = {
    "youtube-thumbnail-preview": dynamic(() => import("./component")),
};
