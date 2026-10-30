import dynamic from "next/dynamic";

import { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const pdfCompressorToolMetadataList: BaseTool[] = [
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
];

export const pdfCompressorToolComponentMap: ToolComponentMap = {
    "pdf-compressor": dynamic(() => import("./component")),
};
