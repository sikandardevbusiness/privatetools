import { Code, FileText, Image, Lock, Music, Sparkles, Type, Video } from "lucide-react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { toolComponentMap, toolMetadataList } from "@/features/tools/registry";
import { env } from "@/lib/env";
import type { BaseTool, ToolDefinition } from "./types";

/* -------------------------------------------------------------------------- */
/*                            SSR-SAFE TYPE GUARDS                            */
/* -------------------------------------------------------------------------- */

export const isFile = (val: unknown): val is File => {
    return typeof File !== "undefined" && val instanceof File;
};

export const isBlob = (val: unknown): val is Blob => {
    return typeof Blob !== "undefined" && val instanceof Blob;
};

/* -------------------------------------------------------------------------- */
/*                            TOOL REGISTRY HELPERS                           */
/* -------------------------------------------------------------------------- */

export function generateToolMetadata(tool: BaseTool, category: string): Metadata {
    // 1. Optimized Title & Description for higher click-through rates (CTR)
    const title = `${tool.name} - Free, Secure & Private Local Browser Tool`;
    const description = `${tool.description} Process your files 100% locally in your browser. Zero uploads, zero tracking, instant results.`;
    const canonicalUrl = `${env.NEXT_PUBLIC_SITE_URL}/tools/${category}/${tool.id}`;

    // 2. Deduplicate and enrich keywords for better search ranking
    const uniqueKeywords = Array.from(
        new Set([
            tool.name.toLowerCase(),
            category.toLowerCase(),
            "free online tool",
            "private browser tool",
            "local processing",
            "no upload",
            "client-side",
            ...tool.keywords,
        ]),
    );

    // 3. Define the thumbnail image (Standard 16:9 ratio: 1200x630 for best social media rendering)
    const imageUrl = tool.thumbnailUrl || `${env.NEXT_PUBLIC_SITE_URL}/default-og-image.jpg`;

    return {
        title,
        description,
        keywords: uniqueKeywords.join(", "),

        // 4. Author metadata (great for E-E-A-T / Google Trust)
        authors: env.NEXT_PUBLIC_AUTHOR_NAME ? [{ name: env.NEXT_PUBLIC_AUTHOR_NAME }] : undefined,

        // 5. Advanced Robots directives to ensure proper indexing and rich snippets
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large", // Allows Google to show your 16:9 thumbnail in search results
                "max-snippet": -1,
            },
        },

        // 6. Open Graph (Facebook, LinkedIn, Discord, etc.)
        openGraph: {
            title,
            description,
            type: "website",
            url: canonicalUrl,
            siteName: "PrivateTools",
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: `${tool.name} - Free Private Browser Tool Interface Preview`,
                },
            ],
        },

        // 7. Twitter Card (X.com)
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [imageUrl],
            // creator: "@YourTwitterHandle", // Optional: Uncomment and add your handle
        },

        // 8. Canonical URL to prevent duplicate content issues
        alternates: {
            canonical: canonicalUrl,
        },
    };
}

export function getToolByPath(category: string, id: string) {
    // 1. Match tool by exact category and ID
    const tool = toolMetadataList.find((t) => t.category === category && t.id === id);
    if (tool) {
        return tool;
    }

    // 2. Check for legacy paths / wildcards
    const requestedPath = `/tools/${category}/${id}`;
    const legacyTool = toolMetadataList.find((t) =>
        t.legacyPaths?.some((path: string) => {
            if (path.endsWith("/*")) {
                const prefix = path.slice(0, -2);
                return requestedPath.startsWith(`${prefix}/`);
            }
            return path === requestedPath;
        }),
    );

    // 3. Perform redirect if legacy route matched
    if (legacyTool) {
        redirect(`/tools/${legacyTool.category}/${legacyTool.id}`);
    }

    return undefined;
}

/**
 * Retrieves the lazy-loaded React component for a given tool ID.
 */
export function getToolComponentById(toolId: string): ToolDefinition["component"] | undefined {
    return toolComponentMap[toolId];
}

/**
 * Gets tools from the SAME category as the current tool.
 */
export function getRelatedTools(toolId: string, limit: number = 4): BaseTool[] {
    const currentTool = toolMetadataList.find((t) => t.id === toolId);
    if (!currentTool) return [];

    return toolMetadataList
        .filter((t) => t.id !== toolId && t.category === currentTool.category)
        .slice(0, limit);
}

/**
 * Gets a list of all unique categories available in the registry.
 */
export function getAllToolCategories(): string[] {
    return [...new Set(toolMetadataList.map((t) => t.category))];
}

/**
 * Gets tools from DIFFERENT categories to encourage exploration.
 * Picks 1 tool per different category up to the limit.
 */
export function getDiverseTools(currentToolId: string, limit: number = 4): BaseTool[] {
    const currentTool = toolMetadataList.find((t) => t.id === currentToolId);
    if (!currentTool) return [];

    const otherCategories = getAllToolCategories().filter((cat) => cat !== currentTool.category);
    const diverseTools: BaseTool[] = [];

    for (const category of otherCategories) {
        const toolsInCategory = toolMetadataList.filter((t) => t.category === category);
        if (toolsInCategory.length > 0) {
            diverseTools.push(toolsInCategory[0]); // Pick the first tool from this category
        }
        if (diverseTools.length >= limit) break;
    }

    return diverseTools;
}

// Category icon mapping
export function getCategoryIcon(category: string) {
    switch (category) {
        case "image":
            return Image;
        case "document":
            return FileText;
        case "text":
            return Type;
        case "video":
            return Video;
        case "audio":
            return Music;
        case "privacy":
            return Lock;
        case "developer":
            return Code;
        default:
            return Sparkles;
    }
}
