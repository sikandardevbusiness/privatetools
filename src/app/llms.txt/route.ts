import { NextResponse } from "next/server";

import { toolMetadataList } from "@/features/tools/registry";
import { env } from "@/lib/env";

export async function GET() {
    const baseUrl = env.NEXT_PUBLIC_SITE_URL;

    // Group tools by category dynamically
    const categories = toolMetadataList.reduce(
        (acc, tool) => {
            if (!acc[tool.category]) {
                acc[tool.category] = [];
            }
            acc[tool.category].push(tool);
            return acc;
        },
        {} as Record<string, typeof toolMetadataList>,
    );

    let content = `# PrivateTools

> Privacy-first, 100% client-side web utilities running entirely within local browser memory. No server uploads, no data storage.

## Core Categories & Tools

`;

    for (const [category, tools] of Object.entries(categories)) {
        const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
        content += `### ${categoryName} Utilities\n`;
        for (const tool of tools) {
            content += `- [${tool.name}](${baseUrl}/tools/${category}/${tool.id}): ${tool.description}\n`;
        }
        content += "\n";
    }

    content += `## Core Pages
- [Home](${baseUrl})
- [About](${baseUrl}/about): Zero-server privacy guarantee.
- [Contact](${baseUrl}/contact): Support and feedback.
- [Legal](${baseUrl}/legal/privacy): Privacy policy and terms.

## Comprehensive Docs
- [Full Technical Index & Tool Specs](${baseUrl}/llms-full.txt)
`;

    return new NextResponse(content, {
        headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
        },
    });
}
