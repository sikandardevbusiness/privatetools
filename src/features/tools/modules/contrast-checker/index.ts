import dynamic from "next/dynamic";
import type { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const contrastCheckerToolMetadataList: BaseTool[] = [
    {
        id: "wcag-contrast-checker",
        category: "developer",
        name: "WCAG Contrast Checker",
        createdAt: "2026-11-13",
        longName: "Free WCAG 2.1 Color Contrast Checker | AA & AAA Accessibility Tool",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/d0f90354a9f7e6d4eb0e8588806c80bc84103b28-1376x768.jpg",
        description:
            "Instantly check if your foreground and background colors meet WCAG 2.1 AA and AAA accessibility standards. 100% free, private, and client-side.",
        longDescription:
            "The ultimate free, client-side WCAG Contrast Checker for designers and developers. Instantly calculate the contrast ratio between any two colors and get clear Pass/Fail badges for WCAG 2.1 AA and AAA standards (both normal and large text). Unlike online tools, this checker runs 100% locally in your browser using pure W3C math. Zero data uploads, zero tracking. Features a live preview box and reusable color inputs with system picker support.",
        tags: [
            "contrast checker",
            "wcag accessibility",
            "color contrast ratio",
            "aa aaa compliance",
            "accessibility tool",
        ],
        keywords: [
            "wcag contrast checker online free",
            "color contrast ratio calculator",
            "check aa aaa accessibility compliance",
            "foreground background contrast tool",
            "web accessibility color checker no upload",
            "w3c contrast ratio calculator",
        ],
        steps: [
            {
                title: "Pick Your Colors",
                description:
                    "Enter or pick your Foreground (text) and Background colors using the inputs or system color picker.",
            },
            {
                title: "View Live Preview",
                description:
                    "See exactly how your text will look on the background in the large, real-time preview box.",
            },
            {
                title: "Check Compliance",
                description:
                    "Instantly see your contrast ratio and clear Pass/Fail badges for WCAG 2.1 AA and AAA standards.",
            },
        ],
        whatToExpect: [
            {
                title: "100% Private & Local",
                description:
                    "All contrast math runs in your browser using pure W3C formulas. Your color choices are never uploaded or tracked.",
            },
            {
                title: "Instant W3C Math",
                description:
                    "Calculates Relative Luminance and Contrast Ratio in milliseconds with zero external dependencies.",
            },
            {
                title: "Clear Pass/Fail Badges",
                description:
                    "Instantly know if your colors meet the strict requirements for Normal Text, Large Text, AA, and AAA compliance.",
            },
        ],
        faqs: [
            {
                question: "What is the WCAG contrast ratio requirement?",
                answer: "For normal text, WCAG 2.1 AA requires a ratio of at least 4.5:1, and AAA requires 7.0:1. For large text (18pt+ or 14pt+ bold), AA requires 3.0:1 and AAA requires 4.5:1.",
            },
            {
                question: "How is the contrast ratio calculated?",
                answer: "It uses the official W3C formula: it converts sRGB to linear RGB, calculates the Relative Luminance of each color, and divides the lighter luminance by the darker luminance (with a 0.05 offset).",
            },
            {
                question: "Is my color data uploaded anywhere?",
                answer: "No. The entire checker is client-side JavaScript. Nothing leaves your device.",
            },
        ],
    },
];

export const contrastCheckerToolComponentMap: ToolComponentMap = {
    "wcag-contrast-checker": dynamic(() => import("./component")),
};
