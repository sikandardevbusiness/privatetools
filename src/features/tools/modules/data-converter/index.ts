import dynamic from "next/dynamic";
import { dataConverter } from "@sikandardevbusiness/data-toolkit";

import { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

// 1. Metadata for all tools in this category
export const dataConverterToolMetadataList: BaseTool[] = [
    {
        id: "vcf-to-csv",
        category: "data",
        name: "VCF to CSV/Excel Converter",
        createdAt: "05-11-2026",
        longName: "Free VCF to CSV & Excel Converter - Convert vCard Contacts Locally & Privately",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/74c20280b3b61220a21ecea58c01496cd2089d8e-1376x768.jpg",
        description:
            "Convert iPhone/Android .vcf contact files to clean CSV or Excel formats instantly. 100% private, client-side processing with zero server uploads.",
        longDescription:
            "Switching phones, backing up your address book, or importing contacts into a CRM? Standard spreadsheet software like Microsoft Excel or Google Sheets cannot open .vcf (vCard) files properly. Furthermore, uploading your personal or business contacts to random online converters is a massive privacy and security risk.\n\nOur VCF to CSV/Excel converter solves this by running **entirely in your web browser**. It parses your vCard file locally, intelligently maps fields (Names, Phones, Emails, Addresses), and lets you download a perfectly structured CSV or Excel (.xlsx) file in seconds. Your sensitive contact data never leaves your device.",
        tags: [
            "vcf to csv",
            "vcard to excel",
            "contact converter",
            "privacy tools",
            "data converter",
            "contact backup",
            "local browser tool",
        ],
        keywords: [
            "convert vcf to csv online free",
            "vcard to excel no upload",
            "open vcf file in excel",
            "iphone contacts to csv locally",
            "android vcf to csv converter private",
            "mac vcf to csv converter",
            "windows vcard to excel free",
            "bulk vcf to csv converter",
            "export contacts to excel without software",
            "client side vcf parser",
        ],
        steps: [
            {
                title: "1. Upload Your VCF File",
                description:
                    "Drag and drop your .vcf contact export file directly into the browser window.",
            },
            {
                title: "2. Preview & Verify Data",
                description:
                    "Instantly review your parsed contacts in our interactive, sortable data table to ensure everything mapped correctly.",
            },
            {
                title: "3. Customize & Download",
                description:
                    "Hide any columns you don't need, select your preferred format (CSV or Excel), and download with one click.",
            },
        ],
        whatToExpect: [
            {
                title: "🔒 100% Private & Local Processing",
                description:
                    "Your contacts are parsed entirely in your browser's memory using JavaScript. Zero data is ever sent to our servers or any third party.",
            },
            {
                title: "📊 Intelligent Data Mapping",
                description:
                    "Automatically separates messy vCard data into clean, distinct columns for First Name, Last Name, Mobile, Email, Organization, and Address.",
            },
            {
                title: "⚡ Universal Compatibility",
                description:
                    "Export to standard UTF-8 CSV or native Excel (.xlsx) formats that open perfectly in Microsoft Excel, Google Sheets, Numbers, and any CRM.",
            },
        ],
        faqs: [
            {
                question: "Is my contact data uploaded to a server?",
                answer: "Absolutely not. The entire parsing, filtering, and conversion process happens locally in your browser. Your data never leaves your device, guaranteeing 100% privacy.",
            },
            {
                question: "Can I convert the file to Excel (.xlsx) instead of CSV?",
                answer: "Yes. You can choose to download your contacts as a standard comma-separated CSV file or a fully formatted, multi-tab ready Excel (.xlsx) workbook.",
            },
            {
                question: "Does this work on Mac, Windows, and mobile devices?",
                answer: "Yes. Because it runs entirely in your web browser, it is fully compatible with macOS, Windows, Linux, iOS, and Android. No software installation is required.",
            },
            {
                question: "Is there a file size or contact limit?",
                answer: "Since processing happens locally, the limit depends on your device's RAM. However, it easily handles files with tens of thousands of contacts in seconds.",
            },
            {
                question:
                    "Can I remove certain columns (like 'Version' or 'Notes') before downloading?",
                answer: "Yes! Use the 'View' dropdown in the table header to uncheck any columns you don't want. The downloaded file will only include the columns you have selected.",
            },
        ],
    },
];

// 2. Component Map for this category
export const dataConverterToolComponentMap: ToolComponentMap = {
    "vcf-to-csv": dynamic(() => import("./component")),
};

// 3. Config Map for this category
export const dataConverterToolConfigMap: Record<
    string,
    { acceptType: string; inputFormats: string[]; outputFormats: string[]; defaultFormat: string }
> = {
    "vcf-to-csv": {
        acceptType: ".vcf",
        inputFormats: ["vcf"],
        outputFormats: [...new Set(dataConverter.getSupportedOutputFormats("vcf"))],
        defaultFormat: "csv",
    },
};
