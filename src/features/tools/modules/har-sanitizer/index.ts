import dynamic from "next/dynamic";
import type { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const harSanitizerToolMetadataList: BaseTool[] = [
    {
        id: "har-sanitizer",
        category: "developer",
        name: "HAR File Sanitizer & Redactor",
        createdAt: "10-11-2026",
        longName: "Free HAR File Sanitizer - Redact Passwords, Cookies & Auth Tokens Locally",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/909933a8556a9e4feb4dc3a156710e6f1cc64fa1-1376x768.jpg",
        description:
            "Instantly sanitize and redact sensitive data (passwords, cookies, auth tokens) from HAR network logs. 100% free, secure, and processed locally in your browser.",
        longDescription:
            "Sharing HAR files with support teams is essential for debugging, but they often leak sensitive session cookies, authorization headers, and passwords. Our **Free HAR File Sanitizer** instantly cleans and redacts your network logs directly in your browser.\n\nChoose exactly what to remove: session cookies, auth headers, passwords, or custom API keys. The tool processes everything locally—your file never leaves your device, ensuring absolute privacy, security, and compliance.",
        tags: [
            "har sanitizer",
            "redact har file",
            "remove cookies from har",
            "clean har file",
            "secure har sharing",
            "network log cleaner",
            "developer tools",
        ],
        keywords: [
            "sanitize har file online free",
            "remove passwords from har file",
            "redact cookies har file",
            "clean har file for support",
            "local har file sanitizer",
            "har file secret stripper",
            "remove auth token from har",
            "secure har file sharing tool",
            "redact sensitive data from har",
        ],
        steps: [
            {
                title: "1. Upload HAR File",
                description:
                    "Drag and drop your .har or .json network log file into the secure upload area.",
            },
            {
                title: "2. Select Redaction Rules",
                description:
                    "Toggle what to sanitize: cookies, auth headers, passwords, JWTs, or add custom sensitive keys.",
            },
            {
                title: "3. Download Clean HAR",
                description:
                    "Instantly download the sanitized, valid JSON HAR file, ready for safe sharing with support teams.",
            },
        ],
        whatToExpect: [
            {
                title: "100% Client-Side Privacy",
                description:
                    "Your HAR file is processed entirely in your browser's memory. No uploads, no server logs, zero data leakage.",
            },
            {
                title: "Granular Redaction Control",
                description:
                    "Toggle specific rules or add your own custom sensitive field names to ensure nothing slips through.",
            },
            {
                title: "Valid JSON Output",
                description:
                    "The tool only replaces sensitive *values* with '***REDACTED***'. The file structure, timestamps, and status codes remain perfectly intact for debugging.",
            },
        ],
        faqs: [
            {
                question: "How do I remove passwords and cookies from a HAR file?",
                answer: "Simply upload your HAR file to our free HAR File Sanitizer, ensure the 'Redact Cookies' and 'Redact POST Data' options are checked, and click 'Sanitize'. The tool will automatically replace all sensitive values with '***REDACTED***' while keeping the file structure intact.",
            },
            {
                question: "Is it safe to use an online HAR file sanitizer?",
                answer: "Yes, because our tool is 100% client-side. Your HAR file is never uploaded to any server. All sanitization and redaction happen locally in your browser's memory using JavaScript, guaranteeing absolute privacy.",
            },
            {
                question: "Will redacting a HAR file break its structure for debugging?",
                answer: "No. The sanitizer only replaces the *values* of sensitive fields (like passwords or tokens) with a placeholder. The keys, HTTP methods, status codes, and overall JSON structure remain completely valid and usable for support teams.",
            },
            {
                question: "Can I redact custom headers or specific API keys?",
                answer: "Absolutely. Use the 'Custom Keys to Redact' field in the settings to add comma-separated names (e.g., 'x-my-custom-token', 'client-secret'). The tool will automatically find and redact them anywhere in the HAR file.",
            },
        ],
    },
];

export const harSanitizerToolComponentMap: ToolComponentMap = {
    "har-sanitizer": dynamic(() => import("./component")),
};
