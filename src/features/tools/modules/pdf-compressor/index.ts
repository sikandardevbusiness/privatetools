import dynamic from "next/dynamic";

import { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const pdfCompressorToolMetadataList: BaseTool[] = [
    {
        id: "pdf-compressor",
        category: "document",
        name: "PDF Compressor",
        description:
            "Reduce PDF file size locally in your browser. Approximate exact target sizes.",
        longDescription:
            "Compress your PDF files securely and privately. Our advanced client-side engine optimizes page rendering and compression to reduce file sizes by up to 80% without ruining readability. Set a specific target size in KB or MB, and the tool will intelligently adjust the compression to meet your needs. 100% private, no server uploads.",
        keywords: [
            "pdf compressor",
            "reduce pdf size",
            "compress pdf online",
            "make pdf smaller",
            "client-side pdf compression",
            "privacy pdf tool",
            "local pdf optimizer",
        ],
        tags: ["pdf", "compress", "reduce size"],
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/51d91055d270b211c4bfdb0ac3c81427977a01f9-1376x768.jpg",
        faqs: [
            {
                question: "Are my PDFs uploaded to a server?",
                answer: "No. All compression happens 100% locally in your browser using WebAssembly. Your documents never leave your device.",
            },
            {
                question: "Will this reduce the quality of my PDF?",
                answer: "The tool intelligently balances quality and file size. For 'Large' presets, text and images remain crisp. For 'Small' presets, images are optimized more aggressively to hit the target size.",
            },
            {
                question: "Can I compress multiple PDFs at once?",
                answer: "Yes! You can upload and batch-process multiple PDF files simultaneously, and download them all together in a single ZIP file.",
            },
        ],
    },
];

export const pdfCompressorToolComponentMap: ToolComponentMap = {
    "pdf-compressor": dynamic(() => import("./component")),
};
