import { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const dataTransformerToolMetadataList: BaseTool[] = [
    {
        id: "json-to-csv",
        category: "developer",
        name: "JSON to CSV Converter",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/65bbb5a96f60fdf0d2a981aaf9baadb5a4b4e066-1376x768.jpg",
        keywords: [
            "json to csv",
            "convert json to csv",
            "json to csv converter",
            "export json to csv",
        ],
        tags: ["json", "csv", "convert", "developer", "data", "spreadsheet", "export"],
        isExperimental: true,
        description:
            "Convert JSON to CSV online for free. Transform arrays and objects into spreadsheet format instantly. 100% private.",
        longDescription:
            "Convert your JSON data into CSV format instantly and securely in your browser. Perfect for exporting API responses or database dumps into Excel-compatible spreadsheets. No server uploads, 100% client-side processing.",
        faqs: [
            {
                question: "Is my JSON data uploaded to a server?",
                answer: "No. All conversion happens 100% locally in your browser. Your data never leaves your device.",
            },
            {
                question: "Can I paste JSON directly?",
                answer: "Yes! You can paste your JSON text directly into the editor or upload a .json file.",
            },
        ],
    },
    {
        id: "csv-to-json",
        category: "developer",
        name: "CSV to JSON Converter",
        isExperimental: true,
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/be96b786f2fa3814a8d0e02d236d3c978ba3de6e-1376x768.jpg",
        keywords: [
            "csv to json",
            "convert csv to json",
            "csv to json converter",
            "spreadsheet to json",
        ],
        tags: ["csv", "json", "convert", "developer", "data", "spreadsheet", "import"],
        description:
            "Convert CSV to JSON online for free. Transform spreadsheet data into JSON arrays instantly. 100% private.",
        longDescription:
            "Convert your CSV files into clean JSON format instantly. Perfect for importing spreadsheet data into applications, APIs, or databases. 100% client-side, no server uploads.",
        faqs: [
            {
                question: "Does it handle complex CSV files?",
                answer: "Yes, it automatically detects headers and converts rows into JSON objects. It handles standard CSV formats perfectly.",
            },
            {
                question: "Is this tool free?",
                answer: "Yes, completely free with no file size limits or watermarks.",
            },
        ],
    },
    {
        id: "all-in-one-data-transformer",
        category: "developer",
        name: "All-in-One Data Transformer",
        isExperimental: true,
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/ac3cafdd7abb03b75aa1bbd6770317ed2640ddf4-1376x768.jpg",
        keywords: [
            "data transformer",
            "convert data formats",
            "json to xml",
            "yaml to json",
            "sql to csv",
            "format converter",
        ],
        tags: [
            "data",
            "transformer",
            "convert",
            "developer",
            "json",
            "csv",
            "xml",
            "yaml",
            "sql",
            "markdown",
            "all-in-one",
        ],
        description:
            "Convert between JSON, CSV, XML, YAML, SQL, and Markdown formats instantly. 100% private, no uploads.",
        longDescription:
            "The ultimate private data transformer. Convert between all major data formats completely client-side. Paste text or upload files. Fast, free, and secure.",
        faqs: [
            {
                question: "What data formats are supported?",
                answer: "It supports JSON, CSV, XML, YAML, SQL, Markdown, and TSV. You can convert between any of these formats.",
            },
            {
                question: "Is my sensitive data safe?",
                answer: "Yes. The transformation happens entirely in your browser's memory. Nothing is sent to our servers.",
            },
        ],
    },
];

export const dataTransformerToolComponentMap: ToolComponentMap = {
    // "json-to-csv": dynamic(() => import("./component")),
    // "csv-to-json": dynamic(() => import("./component")),
    // "all-in-one-data-transformer": dynamic(() => import("./component")),
};
