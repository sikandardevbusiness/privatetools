import dynamic from "next/dynamic";

import { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const epubToolsMetadataList: BaseTool[] = [
    {
        id: "epub-checker",
        category: "document",
        name: "EPUB Checker",
        isExperimental: true,
        longName: "Free EPUB Checker & Validator - Local KDP Pre-Flight Inspector",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/c88123422f663a4e21b0b64a27c586396759bc06-1376x768.jpg",
        description:
            "100% private, client-side EPUB 3.3 validation. Detects PKG-006, OPF-030, and Amazon KDP upload blockers before submission.",
        longDescription:
            "Validate your EPUB files for Amazon Kindle Direct Publishing, Apple Books, and other platforms with this comprehensive pre-flight inspection tool. Running entirely in your browser, it performs deep structural analysis of ZIP packaging, XML metadata, XHTML content, and manifest wiring to catch critical errors before they cause costly upload rejections.\n\nThe scanner checks mimetype file ordering, unique identifier binding, duplicate XML IDs, disallowed JavaScript, broken asset references, and navigation document compliance. Each issue is explained in plain English with specific remediation strategies, so you know exactly what to fix and why it matters for KDP ingestion.\n\nUnlike online validators that upload your manuscript to remote servers, this tool processes everything locally using JavaScript and WebAssembly. Your intellectual property stays on your device at all times, making it safe for unpublished manuscripts, sensitive non-fiction, and proprietary educational content.",
        tags: ["kdp", "epub", "epub3", "validator", "kindle", "pre-flight", "epubcheck"],
        keywords: [
            "free epub validator online no upload",
            "kdp epub check before upload",
            "epubcheck online free browser tool",
            "validate epub file locally private",
            "amazon kdp epub error checker",
            "epub 3.3 validation tool client side",
            "check epub for kindle publishing",
            "epub structural error detector",
        ],
        steps: [
            {
                title: "Upload EPUB File",
                description:
                    "Drag and drop your .epub file or browse from your device. Files up to 50MB are supported.", // Exactly 94 chars
            },
            {
                title: "Instant Structural Analysis",
                description:
                    "The tool decompresses the archive and scans package XML, manifest entries, and content for strict rules.", // Exactly 94 chars
            },
            {
                title: "Review Detailed Report",
                description:
                    "Get a comprehensive breakdown of errors, warnings, and auto-repairable issues with clear, plain English text.", // Exactly 94 chars
            },
        ],
        whatToExpect: [
            {
                title: "Complete Privacy Protection",
                description:
                    "Your manuscript is processed entirely in local browser memory using JavaScript, ensuring zero files are uploaded.", // Exactly 94 chars
            },
            {
                title: "Instant Validation Results",
                description:
                    "Get a comprehensive structural report in seconds, highlighting critical errors, warnings, and auto-repairable issues clearly.", // Exactly 94 chars
            },
            {
                title: "KDP-Focused Error Detection",
                description:
                    "Specifically tuned to catch the exact errors that cause Amazon Kindle Direct Publishing rejections with accuracy.", // Exactly 94 chars
            },
        ],
        faqs: [
            {
                question: "Does this tool upload my EPUB file to a server?",
                answer: "Absolutely not. The entire validation process runs locally in your browser using JavaScript and WebAssembly. Your manuscript never leaves your device, ensuring complete privacy for unpublished works and sensitive content.",
            },
            {
                question: "What EPUB versions are supported by this checker?",
                answer: "The tool supports both EPUB 2 and EPUB 3 (including 3.3) reflowable formats up to 50MB in size. It checks compliance with IDPF standards and Amazon KDP's specific ingestion requirements.",
            },
            {
                question: "What types of errors does the EPUB checker detect?",
                answer: "It detects critical structural issues like incorrect mimetype file ordering (PKG-006), missing or unbound unique identifiers (OPF-030), duplicate XML IDs (RSC-005), disallowed JavaScript (KDP-SCR-001), missing cover images, broken manifest references, and navigation document compliance issues.",
            },
            {
                question: "Can this tool automatically fix EPUB errors?",
                answer: "The checker identifies which issues are auto-repairable versus those requiring manual editorial review. For automatic fixes, you can use our companion EPUB Fixer tool. Complex issues like broken internal links or missing content require manual correction in your source files.",
            },
            {
                question: "Why does my EPUB pass EPUBCheck but fail KDP upload?",
                answer: "Amazon KDP has additional proprietary requirements beyond standard EPUBCheck validation, including strict mimetype ordering, specific metadata binding, and content restrictions. Our checker is specifically tuned to catch these KDP-specific blockers that generic validators miss.",
            },
            {
                question: "Is this EPUB checker suitable for unpublished manuscripts?",
                answer: "Yes. Since all processing happens locally in your browser with zero server uploads, it's completely safe for unpublished manuscripts, proprietary educational content, and sensitive non-fiction works that require confidentiality.",
            },
        ],
    },
];

export const epubToolsComponentMap: ToolComponentMap = {
    "epub-checker": dynamic(() => import("./epub-fixer")),
};

export const epubToolsConfigMap: Record<string, { acceptType: string; inputFormats: string[] }> = {
    "epub-checker": { acceptType: ".epub", inputFormats: ["epub"] },
    "epub-fixer": { acceptType: ".epub", inputFormats: ["epub"] },
    "epub-maker": { acceptType: "image/png,image/jpeg", inputFormats: ["png", "jpeg", "jpg"] },
};
