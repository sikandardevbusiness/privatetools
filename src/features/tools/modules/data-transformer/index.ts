import { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";
import dynamic from "next/dynamic";

export const dataTransformerToolMetadataList: BaseTool[] = [
    {
        id: "json-to-csv",
        category: "developer",
        name: "JSON to CSV Converter",
        longName: "Free JSON to CSV Converter Online - Client-Side & Private",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/65bbb5a96f60fdf0d2a981aaf9baadb5a4b4e066-1376x768.jpg",
        description:
            "Convert JSON to CSV format online in your browser. Fast, private client-side converter for nested JSON objects and arrays with no data uploads.",
        longDescription:
            "Turn complex JSON arrays, API payloads, and database exports into clean CSV spreadsheets in seconds. Built specifically for developers, data analysts, and operations teams, this tool flattens structured JSON objects into tabular rows and columns compatible with Microsoft Excel, Google Sheets, and standard SQL databases.\n\nMost online converters upload your raw payload to their backend, posing serious security hazards for production data, user profiles, or proprietary analytics. This converter executes completely on the client side using your web browser memory, ensuring that confidential keys, database records, and customer details remain strictly on your machine.\n\nHandle large JSON files without arbitrary row caps or bandwidth throttles. Simply paste your raw JSON string or upload a .json document to preview the tabular layout, customize delimiters, and download your ready-to-use CSV spreadsheet immediately.",
        tags: [
            "json converter",
            "csv export",
            "developer tools",
            "data transformation",
            "spreadsheet tools",
        ],
        keywords: [
            "convert json to csv online free",
            "json to csv converter client side",
            "private json to csv converter no upload",
            "convert nested json to excel csv",
            "turn api response into csv spreadsheet",
            "flatten json array to csv online",
            "large json file to csv converter",
            "json to spreadsheet exporter browser",
            "free developer json to table converter",
        ],
        steps: [
            {
                title: "Load JSON Data",
                description:
                    "Paste your raw JSON text or drag and drop your .json file into the editor.",
            },
            {
                title: "Review Tabular Output",
                description:
                    "Inspect the automatically flattened rows and columns in the live table preview.",
            },
            {
                title: "Download CSV",
                description:
                    "Click to download your generated .csv file or copy the raw table text to your clipboard.",
            },
        ],
        whatToExpect: [
            {
                title: "Strict Local Processing",
                description:
                    "Sensitive API tokens, customer lists, and database dumps stay on your machine.",
            },
            {
                title: "Nested Key Flattening",
                description:
                    "Complex objects and arrays translate cleanly into structured spreadsheet columns.",
            },
            {
                title: "Excel & Sheets Ready",
                description: "Generates standard RFC-compliant CSV files ready for instant import.",
            },
        ],
        faqs: [
            {
                question: "Is my JSON data uploaded to an external server?",
                answer: "No. The conversion logic runs entirely in your local browser environment. Your data never touches any external web server or database.",
            },
            {
                question: "Can this tool handle nested JSON objects and arrays?",
                answer: "Yes. It flattens nested keys into clean column headers using dot notation so your hierarchy displays legibly inside Excel or Google Sheets.",
            },
            {
                question: "Is there a limit on file size or row count?",
                answer: "There are no arbitrary server limits. Because conversion happens locally, the tool can handle large JSON files up to the memory capacity of your web browser.",
            },
            {
                question: "Can I paste raw JSON text directly?",
                answer: "Yes. You can paste raw JSON text directly into the input area or drag and drop a .json file from your computer.",
            },
        ],
    },
    {
        id: "csv-to-json",
        category: "developer",
        name: "CSV to JSON Converter",
        longName: "Free CSV to JSON Converter Online - Instant & Private",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/be96b786f2fa3814a8d0e02d236d3c978ba3de6e-1376x768.jpg",
        description:
            "Convert CSV spreadsheets to JSON arrays and objects online for free. 100% private browser-based tool with instant preview and no file uploads.",
        longDescription:
            "Convert CSV spreadsheets, tab-delimited files, and Excel data into formatted JSON arrays and key-value objects. Whether you are preparing mock data for front-end development, seeding a NoSQL database like MongoDB, or transforming tabular spreadsheets for REST APIs, this tool makes the transition straightforward.\n\nStandard conversion utilities often transmit your files across the network, creating compliance issues when dealing with customer records, proprietary financial numbers, or internal metrics. Our converter operates completely in client-side memory, meaning your raw CSV data is parsed locally by your browser and never leaves your computer.\n\nThe parser automatically inspects header rows, detects data types such as numbers and booleans, and formats the output into clean, indented JSON. You can copy the code directly or download a .json file ready for your development workflow.",
        tags: [
            "csv converter",
            "json tools",
            "developer tools",
            "data transformation",
            "spreadsheet parser",
        ],
        keywords: [
            "convert csv to json online free",
            "csv to json converter client side",
            "transform spreadsheet to json array",
            "excel csv to json objects converter",
            "private csv to json converter no upload",
            "parse csv to json for api",
            "convert tsv to json online",
            "fast csv to json developer tool",
            "batch csv to json converter browser",
        ],
        steps: [
            {
                title: "Provide CSV Input",
                description:
                    "Paste spreadsheet rows into the editor or upload a .csv or .tsv file.",
            },
            {
                title: "Inspect JSON Result",
                description:
                    "Review the formatted JSON structure with automatic syntax highlighting.",
            },
            {
                title: "Copy or Download",
                description:
                    "Copy the JSON payload directly to your clipboard or download it as a .json file.",
            },
        ],
        whatToExpect: [
            {
                title: "Guaranteed Privacy",
                description:
                    "Process internal business records and user lists without exposing them to external servers.",
            },
            {
                title: "Smart Type Inference",
                description:
                    "Numbers and booleans are automatically cast to proper JSON types instead of strings.",
            },
            {
                title: "Immediate Output",
                description:
                    "Zero network transfer delay delivers instant output even on massive datasets.",
            },
        ],
        faqs: [
            {
                question: "Does my spreadsheet data leave my computer?",
                answer: "No. All CSV parsing and JSON generation take place locally within your web browser. Nothing is sent to our servers or stored anywhere.",
            },
            {
                question: "How does the tool handle headers and data types?",
                answer: "The first row is read as object property keys. The parser identifies numbers, booleans, and null values so they are formatted as native JSON data types rather than plain strings.",
            },
            {
                question: "Can I convert large CSV files with thousands of rows?",
                answer: "Yes. Since there are no network transfers or server-imposed timeouts, you can parse large datasets limited only by your browser available memory.",
            },
            {
                question: "Does it support custom delimiters like semicolons or tabs?",
                answer: "Yes. The tool automatically identifies standard commas, semicolons, and tab delimiters to generate accurate JSON structures.",
            },
        ],
    },
    {
        id: "all-in-one-data-transformer",
        category: "developer",
        name: "All-in-One Data Transformer",
        longName: "All-in-One Data Transformer - Convert JSON, CSV, XML, YAML & SQL",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/ac3cafdd7abb03b75aa1bbd6770317ed2640ddf4-1376x768.jpg",
        description:
            "Convert between JSON, CSV, XML, YAML, SQL, and Markdown online for free. Fast, private client-side data conversion tool without server uploads.",
        longDescription:
            "Switch between major data serialization formats in a single workspace. This all-in-one developer tool converts between JSON, CSV, XML, YAML, SQL INSERT statements, Markdown tables, and TSV without forcing you to juggle separate bookmarklets. It gives software engineers, system administrators, and database managers a reliable bridge between configuration files, API payloads, and documentation.\n\nSecurity is the primary priority when transforming database schema exports, Kubernetes YAML manifests, or production JSON responses. Because this transformer executes entirely client-side via JavaScript in your browser, your payloads never travel across the internet. There are no logging mechanisms, no intermediate caches, and no third-party data tracking.\n\nClean syntax formatting, live error validation, and multi-format export make data restructuring quick and predictable. Switch between configuration formats like YAML and JSON, generate SQL migration inserts from spreadsheet dumps, or produce clean Markdown tables for documentation within seconds.",
        tags: ["data converter", "developer tools", "json yaml", "sql tools", "format transformer"],
        keywords: [
            "universal data format converter",
            "json to yaml converter online free",
            "yaml to json client side converter",
            "convert xml to json no upload",
            "sql insert to csv converter online",
            "markdown table to json converter",
            "private developer data transformer",
            "multi format data converter browser",
            "convert csv to yaml online",
        ],
        steps: [
            {
                title: "Select Formats & Input",
                description:
                    "Choose your source and target formats, then paste your raw code or upload a file.",
            },
            {
                title: "Transform & Validate",
                description:
                    "Verify the transformed output with built-in syntax checks and formatting.",
            },
            {
                title: "Export Transformed Data",
                description:
                    "Copy the converted text to your clipboard or download the file in your target extension.",
            },
        ],
        whatToExpect: [
            {
                title: "Universal Interoperability",
                description:
                    "Easily convert across seven common developer and data serialization formats.",
            },
            {
                title: "Zero Server Exposure",
                description:
                    "Keep sensitive infrastructure manifests and database rows completely confidential.",
            },
            {
                title: "Clean Syntax Formatting",
                description:
                    "Outputs properly indented, human-readable code ready for production use.",
            },
        ],
        faqs: [
            {
                question: "Which data formats can I convert between?",
                answer: "You can convert between JSON, CSV, XML, YAML, SQL INSERT statements, TSV, and Markdown tables interchangeably.",
            },
            {
                question:
                    "Is it safe to convert proprietary configuration files and database dumps?",
                answer: "Yes. All data transformations occur in local browser memory. Your secrets, database records, and configuration keys never get transmitted to any cloud server.",
            },
            {
                question: "Can I convert YAML configuration files directly to JSON?",
                answer: "Yes. You can paste Docker Compose, Kubernetes, or Ansible YAML files and turn them into valid JSON structures with one click.",
            },
            {
                question: "How does the tool handle syntax errors in the source code?",
                answer: "The tool features real-time syntax linting that highlights mismatched brackets, missing commas, or improper indentation before running conversions.",
            },
        ],
    },
];

export const dataTransformerToolComponentMap: ToolComponentMap = {
    "json-to-csv": dynamic(() => import("@/features/tools/shared/components/under-development")),
    "csv-to-json": dynamic(() => import("@/features/tools/shared/components/under-development")),
    "all-in-one-data-transformer": dynamic(
        () => import("@/features/tools/shared/components/under-development"),
    ),
};
