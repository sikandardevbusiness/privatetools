import dynamic from "next/dynamic";

import type { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const pdfRedactorToolMetadata: BaseTool[] = [
    {
        id: "pdf-redactor",
        category: "document",
        name: "PDF Redactor",
        longName: "Free True PDF Redactor Online - Permanently Black Out Text Privately",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/eb1bfeaa9e2307f7d8ab231598ee1cb73f7d1d5e-1376x768.jpg",
        description:
            "Permanently redact sensitive text, SSNs, and data from PDFs online. True client-side redaction with metadata removal and zero server uploads.",
        longDescription:
            "Black out confidential text, Social Security numbers, bank account details, and private contact info with true structural PDF redaction. Drawing a simple black box in standard word processors or basic PDF viewers only obscures content visually, leaving underlying text selectable, searchable, and easily extracted by anyone. Our redactor permanently strips the underlying text layer and replaces it with solid vector shapes.\n\nDesigned for legal discovery, medical record sanitization under HIPAA guidelines, HR hiring reviews, and public records disclosure, this tool runs entirely client-side using WebAssembly. Contracts, court filings, and patient charts stay inside your browser memory and never upload to a third-party server, eliminating compliance breaches.\n\nIn addition to blacking out visible paragraphs, the tool purges invisible document metadata, editing histories, annotations, and hidden comments that could inadvertently leak author names, software revisions, or creation dates. Export clean, sanitized PDFs ready for public distribution or legal submission.",
        tags: ["pdf redactor", "document privacy", "redact pdf", "legal tools", "security tool"],
        keywords: [
            "permanently redact pdf online free",
            "true pdf redaction tool no upload",
            "black out text in pdf permanently",
            "redact ssn from pdf document",
            "private pdf redactor hipaa compliant",
            "remove metadata and redact pdf",
            "censor legal documents in browser",
            "client side secure pdf redactor",
            "hide sensitive personal info on pdf",
        ],
        steps: [
            {
                title: "Load PDF Document",
                description:
                    "Open your confidential contract, resume, or statement in the local browser editor.",
            },
            {
                title: "Mark Redaction Areas",
                description:
                    "Drag redaction boxes over text, numbers, or images you want permanently deleted.",
            },
            {
                title: "Export Sanitized PDF",
                description:
                    "Generate a clean PDF with scrubbed text tokens and wiped metadata headers.",
            },
        ],
        whatToExpect: [
            {
                title: "Irreversible Text Removal",
                description:
                    "Scrubbed text is permanently deleted from the PDF code, not just covered up.",
            },
            {
                title: "Complete Metadata Scrub",
                description:
                    "Purge hidden author details, timestamps, and revision histories automatically.",
            },
            {
                title: "Zero Server Transmission",
                description:
                    "Legal filings, financial ledgers, and health forms never leave your local device.",
            },
        ],
        faqs: [
            {
                question: "Can someone copy or highlight text beneath the black redaction boxes?",
                answer: "No. This tool carries out true structural redaction. The underlying characters and text tokens are permanently scrubbed from the document code, making recovery impossible.",
            },
            {
                question: "Does the redactor remove hidden author and document metadata?",
                answer: "Yes. When you redact the document, the tool clears hidden metadata including author names, timestamps, editing history, and embedded annotations.",
            },
            {
                question: "Is this tool secure for medical charts and confidential contracts?",
                answer: "Yes. Processing takes place exclusively inside your browser via WebAssembly. Documents never leave your computer, satisfying HIPAA and GDPR privacy practices.",
            },
            {
                question: "Can I redact scanned PDF pages and image receipts?",
                answer: "Yes. You can draw solid redaction boxes over any scanned visual elements, handwritten notes, account numbers, or photo areas across any page.",
            },
        ],
    },
];

export const pdfRedactorToolComponentMap: ToolComponentMap = {
    "pdf-redactor": dynamic(() => import("./component")),
};
