import { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const pdfConverterToolMetadataList: BaseTool[] = [
    {
        id: "pdf-to-jpg",
        category: "document",
        name: "PDF to JPG Converter",
        acceptType: ".pdf",
        inputFormat: "pdf",
        defaultOutputFormat: "jpg",
        keywords: [
            "pdf to jpg",
            "convert pdf to jpg",
            "pdf to image",
            "extract images from pdf",
            "pdf to jpeg converter",
            "save pdf as image",
            "pdf to jpg online free",
        ],
        tags: ["pdf", "jpg", "convert", "extract"],
        description:
            "Convert PDF pages to high-quality JPG images online for free. Extract images securely. 100% private.",
        longDescription:
            "Convert your PDF documents into high-quality JPG images instantly. Extract pages as images securely in your browser. No server uploads, ensuring complete privacy and security for your sensitive documents.",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/e2424a4bf9f0aa4efdfa190f613c18aada349181-1376x768.jpg",
        faqs: [
            {
                question: "Can I convert multi-page PDFs?",
                answer: "Yes, you can upload multi-page PDFs and convert them. Each page will be processed as a separate image.",
            },
            {
                question: "Is my PDF uploaded to a server?",
                answer: "No. All processing happens 100% locally in your browser. Your documents never leave your device, ensuring maximum privacy.",
            },
            {
                question: "What quality will the JPG images be?",
                answer: "The converter extracts pages at a high resolution, ensuring your text and images remain clear and readable.",
            },
        ],
    },
];

export const pdfConverterToolComponentMap: ToolComponentMap = {
    // "pdf-to-jpg": dynamic(() => import("../image-converter/component")),
};
