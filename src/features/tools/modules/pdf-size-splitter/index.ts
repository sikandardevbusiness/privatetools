import dynamic from "next/dynamic";
import type { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const pdfSizeSplitterToolMetadataList: BaseTool[] = [
    {
        id: "pdf-size-splitter",
        category: "document",
        name: "PDF Splitter by Size",
        createdAt: "08-11-2026",
        longName: "Split PDF by File Size (MB/KB) Online Free - No Page Guessing",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/06b38dbcb6a5b5a15728b9c4bc24582a67619415-1376x768.jpg",
        description:
            "Split large PDFs into smaller files by exact MB or KB limit (e.g., 10MB, 25MB). Perfect for email attachments and court portal uploads.",
        longDescription:
            "Email servers reject attachments over 25MB, and many court or government portals cap uploads at 10MB. Traditional PDF splitters force you to guess which page numbers equal 10MB. Our tool does the math for you: it intelligently splits your PDF at clean page boundaries, guaranteeing no single part exceeds your chosen file size limit.\n\nUnlike server-based splitters that upload your sensitive documents to remote queues, our tool runs entirely in your browser using advanced PDF parsing algorithms. Your confidential tax returns, legal contracts, and medical records never leave your device, ensuring absolute privacy and instant processing without upload delays.\n\nSet precise targets in kilobytes or megabytes, from tiny 100 KB chunks for legacy systems to large 50 MB segments for high-capacity portals. The tool automatically handles structural overhead and warns you when individual pages exceed your limit, making it perfect for email attachments, court filings, university submissions, and cloud storage optimization.",
        tags: [
            "pdf splitter",
            "split pdf by size",
            "reduce pdf size",
            "email attachment pdf",
            "court portal pdf",
            "pdf compressor",
            "split pdf mb",
        ],
        keywords: [
            "split pdf by file size mb",
            "split pdf into 10mb parts",
            "split pdf into 25mb parts for email",
            "pdf splitter by size not pages",
            "reduce pdf file size by splitting client side",
            "free pdf splitter no page limit",
            "split pdf for court upload size limit",
            "local pdf splitter browser based",
            "split pdf to 100kb chunks",
            "pdf splitter for email attachment size",
            "split pdf by kb size",
            "pdf size reducer split",
            "browser pdf splitter no upload",
            "split large pdf for government portal",
            "pdf chunk splitter online free",
        ],
        steps: [
            {
                title: "Upload PDF File",
                description:
                    "Select or drag and drop your large PDF document into the browser. The tool instantly analyzes the file structure and page count.",
            },
            {
                title: "Set Target Size",
                description:
                    "Choose your maximum size per part in KB or MB (e.g., 10 MB for email, 2 MB for portals). The tool calculates optimal page boundaries automatically.",
            },
            {
                title: "Download ZIP Archive",
                description:
                    "Click split to process locally. All parts are bundled into a single ZIP file for convenient download, avoiding browser download spam.",
            },
        ],
        whatToExpect: [
            {
                title: "Intelligent Page Boundary Detection",
                description:
                    "The tool uses galloping binary search algorithms to find the exact page count that fits your size limit without exceeding it, even accounting for PDF structural overhead.",
            },
            {
                title: "100% Private & Local Processing",
                description:
                    "Your PDF never leaves your browser. All splitting happens in your device's memory using WebAssembly, ensuring sensitive documents remain completely confidential.",
            },
            {
                title: "Smart Size Warnings",
                description:
                    "If your target size is too small (under 4 KB) or individual pages exceed your limit, the tool warns you upfront and explains why splitting may not be possible.",
            },
            {
                title: "One-Click ZIP Packaging",
                description:
                    "All split parts are automatically bundled into a single ZIP file, preventing your browser from triggering multiple download notifications for each part.",
            },
        ],
        faqs: [
            {
                question: "What happens if a single page is larger than my target size?",
                answer: "If an individual page (e.g., a high-resolution scanned image or complex diagram) exceeds your target limit, the tool will place it in its own separate part. PDFs cannot be split within a single page without destroying the content, so the tool keeps oversized pages intact while warning you that they exceed your specified limit.",
            },
            {
                question: "Why can't I split a PDF into very small sizes like 2 KB or 10 KB?",
                answer: "PDF files have mandatory structural overhead including headers, cross-reference tables, metadata streams, and object dictionaries. Even a single blank page typically requires 3-5 KB minimum. Attempting to split below this threshold is technically impossible because each new PDF part must include this structural data to remain a valid, readable PDF file.",
            },
            {
                question:
                    "Will the combined size of all split parts be larger than my original PDF?",
                answer: "Yes, slightly. Each new PDF part must include its own document structure, headers, and cross-reference tables. This means the total size of all parts combined may be 5-15% larger than the original file. However, this overhead is necessary to ensure each part is a fully functional, independent PDF that can be opened and read on its own.",
            },
            {
                question: "Can I split PDFs by KB (kilobytes) instead of MB (megabytes)?",
                answer: "Yes, you can choose either KB or MB units. However, KB splitting is only practical for very small PDFs or specific legacy system requirements. For most modern use cases (email attachments, court portals, cloud storage), MB targets like 10 MB or 25 MB are more practical. If you select KB, ensure your target is at least 100 KB to account for PDF structural overhead.",
            },
            {
                question: "Is my PDF uploaded to a server during the splitting process?",
                answer: "Absolutely not. The entire splitting process runs locally in your browser's memory using WebAssembly and JavaScript. Your PDF file is never uploaded, transmitted, or stored on any external server. This ensures 100% privacy for sensitive documents like tax returns, legal contracts, medical records, and confidential business files.",
            },
        ],
    },
];

export const pdfSizeSplitterToolComponentMap: ToolComponentMap = {
    "pdf-size-splitter": dynamic(() => import("./component")),
};
