import type { Metadata } from "next";
import { Suspense } from "react";

import { toolMetadataList } from "@/features/tools/registry";
import { env } from "@/lib/env";
import { ToolsClient } from "./client";

const BASE_URL = env.NEXT_PUBLIC_SITE_URL || "https://privatetools.in";

export const metadata: Metadata = {
    title: `${toolMetadataList.length}+ Private Utilities`,
    description: `Browse our complete catalog of ${toolMetadataList.length}+ free browser-based online tools. Convert and process images, PDFs, audio, and more 100% locally with zero uploads.`,
    keywords: [
        "free online tools",
        "image converter",
        "pdf tools",
        "privacy tools",
        "no upload tools",
        "client side tools",
    ],
    openGraph: {
        title: `All Free Online Tools (${toolMetadataList.length}+) | PrivateTools`,
        description: `Browse our complete catalog of free browser-based tools that process files entirely in your browser.`,
        type: "website",
        siteName: "PrivateTools",
        images: [
            {
                url: `${BASE_URL}/og-image.jpg`,
                width: 1200,
                height: 630,
                alt: "All Tools Collection",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: `All Free Online Tools (${toolMetadataList.length}+) | PrivateTools`,
        description: `Browse our complete catalog of free browser-based tools.`,
        images: [`${BASE_URL}/og-image.jpg`],
    },
    alternates: { canonical: "/tools" },
};

function generateItemListSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Free Privacy-First Online Tools Collection",
        description:
            "A comprehensive collection of free browser-based tools for image, PDF, text, and data manipulation",
        numberOfItems: toolMetadataList.length,
        itemListElement: toolMetadataList.map((tool, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: tool.name,
            description: tool.description,
            url: `${BASE_URL}/tools/${tool.category}/${tool.id}`,
        })),
    };
}

function generateBreadcrumbSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
            { "@type": "ListItem", position: 2, name: "All Tools", item: `${BASE_URL}/tools` },
        ],
    };
}

function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );
}

export default function ToolsPage() {
    const itemListSchema = generateItemListSchema();
    const breadcrumbSchema = generateBreadcrumbSchema();

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Server-Rendered Header */}
            <header className="border-b bg-muted/30">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                All Tools
                            </h1>
                            <p className="mt-2 text-lg text-muted-foreground max-w-2xl">
                                Browse our collection of {toolMetadataList.length} free online
                                tools. All tools process files 100% locally in your browser.
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <Suspense fallback={<Loading />}>
                <ToolsClient />
            </Suspense>
        </>
    );
}
