import dynamic from "next/dynamic";

import type { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const sqlEngineToolMetadataList: BaseTool[] = [
    {
        id: "csv-json-sql-query",
        category: "developer",
        name: "CSV & JSON SQL Query Tool",
        longName: "Query CSV & JSON Files with SQL Online - 100% Private Browser Tool",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/01da02ce28737865f57922165af0f5739f4a9343-1376x768.jpg",
        isExperimental: true,
        createdAt: "05-11-2026",
        description:
            "Run standard SQL queries directly on your CSV and JSON files in the browser. 100% private, zero server uploads, powered by DuckDB WebAssembly.",
        longDescription:
            "Need to analyze, filter, or join large **CSV or JSON files** but don't want to upload sensitive data to the cloud? Our **In-Browser CSV & JSON SQL Engine** lets you run full SQL queries on your data entirely locally.\n\n**No uploads. No installations. No privacy concerns.** Just drag your CSV or JSON files, write standard SQL (SELECT, JOIN, GROUP BY), and get instant results. Perfect for data analysts, developers, and anyone working with sensitive datasets who needs a powerful, local SQL database for their files.\n\nSupports files up to 200MB with lightning-fast, columnar query performance.",
        tags: [
            "csv sql",
            "json sql",
            "query csv",
            "data analysis",
            "privacy tools",
            "duckdb",
            "local sql engine",
            "browser database",
        ],
        keywords: [
            "query csv with sql online free",
            "run sql on json file browser",
            "csv to sql query tool no upload",
            "local sql engine for csv and json",
            "analyze csv with sql locally",
            "browser based sql database for csv",
            "json sql query tool client side",
            "duckdb wasm csv viewer",
            "offline sql query for csv",
        ],
        steps: [
            {
                title: "1. Upload CSV or JSON Files",
                description:
                    "Drag and drop your .csv or .json files (up to 200MB). All processing happens securely in your browser.",
            },
            {
                title: "2. Write SQL Queries",
                description:
                    "Use standard SQL syntax with intelligent autocomplete to filter, join, aggregate, and transform your tabular data.",
            },
            {
                title: "3. Export Filtered Results",
                description:
                    "Download your queried data instantly as a new CSV or JSON file. Only export exactly what you need.",
            },
        ],
        whatToExpect: [
            {
                title: "100% Private & Local Processing",
                description:
                    "Your CSV and JSON data never leaves your browser. Powered by DuckDB WebAssembly for secure, client-side data analysis.",
            },
            {
                title: "Lightning-Fast CSV/JSON Queries",
                description:
                    "Execute complex SQL queries on 100MB+ files in milliseconds. Columnar storage and query optimization built right in.",
            },
            {
                title: "Full Standard SQL Support",
                description:
                    "Use SELECT, WHERE, JOIN, GROUP BY, ORDER BY, and aggregations (COUNT, SUM, AVG) just like a real database.",
            },
        ],
        faqs: [
            {
                question: "Can I run SQL queries on a CSV file online without uploading it?",
                answer: "Yes! Our tool runs entirely in your browser using WebAssembly. Your CSV or JSON files are processed locally on your device and are never uploaded to any server.",
            },
            {
                question: "What file formats does this SQL tool support?",
                answer: "We currently support .csv and .json files up to 200MB in size. The tool automatically detects the format and loads it into a local SQL table.",
            },
            {
                question: "What SQL commands can I use on my files?",
                answer: "You can use full DuckDB SQL syntax, including SELECT, WHERE, JOIN (to combine multiple CSV/JSON files), GROUP BY, ORDER BY, and aggregations like COUNT, SUM, AVG, MIN, and MAX.",
            },
            {
                question: "Is there a file size limit for querying CSV or JSON?",
                answer: "We support files up to 200MB. The actual limit depends on your device's available RAM, but DuckDB is highly optimized to handle large datasets efficiently in the browser.",
            },
            {
                question: "Can I join multiple CSV or JSON files together?",
                answer: "Absolutely. Upload multiple files, and each one becomes a separate SQL table. You can then write JOIN queries to combine and analyze data across all your uploaded files.",
            },
        ],
    },
];

export const sqlEngineToolComponentMap: ToolComponentMap = {
    "csv-json-sql-query": dynamic(() => import("./component")),
};
