import type { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const pdfRedactorToolMetadata: BaseTool[] = [
    {
        id: "pdf-redactor",
        category: "document",
        name: "PDF Redactor",
        tags: ["pdf", "redact", "privacy", "metadata"],
        keywords: [
            // Primary keywords
            "pdf redactor",
            "redact pdf",
            "pdf redaction tool",
            "black out pdf",

            // Privacy & Security
            "secure pdf editor",
            "private pdf redactor",
            "local pdf editor",
            "client-side pdf",
            "no upload pdf redactor",
            "offline pdf editor",

            // Use Cases
            "redact resume pdf",
            "hide personal information pdf",
            "remove sensitive data pdf",
            "pdf privacy tool",
            "legal document redaction",
            "medical records redaction",
            "hipaa compliant pdf",
            "gdpr pdf redaction",
            "contract redaction",
            "invoice redaction",
            "bank statement redactor",

            // Features
            "permanent pdf redaction",
            "true pdf redaction",
            "metadata removal pdf",
            "strip pdf metadata",
            "remove pdf annotations",
            "delete pdf comments",
            "hide text in pdf",
            "black box pdf",
            "censor pdf",

            // Technical
            "browser-based pdf editor",
            "webassembly pdf",
            "javascript pdf redactor",
            "free pdf redactor",
            "online pdf redactor",
        ],
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/eb1bfeaa9e2307f7d8ab231598ee1cb73f7d1d5e-1376x768.jpg",
        description:
            "Permanently redact sensitive information from PDFs locally. True redaction with metadata removal. 100% private, no uploads.",
        longDescription:
            "Permanently remove sensitive information from PDF documents with our 100% client-side PDF Redactor. Unlike basic editors that just draw a fake black box over text, our tool ensures **true redaction** by permanently covering data with solid vector shapes and stripping hidden metadata, annotations, and comments. All processing happens locally in your browser—your sensitive documents, resumes, legal contracts, and medical records **never leave your device**. Perfect for HIPAA compliance, GDPR requirements, legal document preparation, HR processes, and protecting personal information in resumes and applications. Free, fast, and completely private.",
        faqs: [
            {
                question: "Is my PDF uploaded to a server?",
                answer: "Absolutely not. This tool runs entirely in your browser using WebAssembly. Your sensitive documents never touch our servers or leave your device, ensuring 100% privacy and security.",
            },
            {
                question: "Can someone un-redact or recover the blacked-out text?",
                answer: "No. We apply permanent, solid vector shapes over the selected areas and completely strip the document of hidden metadata and annotations. The underlying text is permanently covered and cannot be recovered or copied.",
            },
            {
                question:
                    "What's the difference between this and just drawing a black box in Word or Acrobat?",
                answer: "Drawing a black box in Word or basic PDF editors only hides the text visually—the text is still there and can be copied, selected, or extracted. Our tool performs true redaction by permanently covering the data at the PDF structure level.",
            },
            {
                question: "Does it remove hidden metadata and properties?",
                answer: "Yes! When enabled, our tool strips all hidden metadata including author name, creation date, modification date, software used, and embedded properties that could reveal sensitive information.",
            },
            {
                question: "Can I redact scanned PDFs or images?",
                answer: "Yes, you can draw redaction boxes over any visible content including scanned documents and images. However, text search only works on PDFs with selectable text layers.",
            },
            {
                question: "Is this tool HIPAA compliant for medical records?",
                answer: "Yes, because all processing happens locally in your browser and no data is uploaded to any server, this tool is suitable for HIPAA-compliant redaction of medical records and protected health information (PHI).",
            },
            {
                question: "What file formats are supported?",
                answer: "We support all standard PDF files. The tool works with any PDF created by Word, Excel, scanners, or other document generators.",
            },
            {
                question: "Can I customize the redaction color and text?",
                answer: "Yes! You can choose any color for the redaction box and add custom overlay text like 'REDACTED', 'CONFIDENTIAL', or your own custom text.",
            },
            {
                question: "Does it work on mobile devices?",
                answer: "Yes, the tool works on all modern browsers including mobile browsers on iOS and Android devices.",
            },
            {
                question: "Is there a file size limit?",
                answer: "Since processing happens in your browser, the limit depends on your device's available memory. Most documents up to 50MB work smoothly.",
            },
        ],
    },
];

export const pdfRedactorToolComponentMap: ToolComponentMap = {
    // "pdf-redactor": dynamic(() => import("./component")),
};
