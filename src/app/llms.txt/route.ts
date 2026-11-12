import { NextResponse } from "next/server";

import { toolMetadataList } from "@/features/tools/registry";
import { categoryInfoList } from "@/features/tools/category";
import { alternativesList } from "@/app/(root)/alternatives/registry";
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
        const categoryInfo = categoryInfoList.find((c) => c.id === category);
        const categoryName =
            categoryInfo?.title || category.charAt(0).toUpperCase() + category.slice(1);
        content += `### ${categoryName}\n`;
        content += `${categoryInfo?.description || ""}\n\n`;
        for (const tool of tools) {
            content += `- [${tool.name}](${baseUrl}/tools/${category}/${tool.id}): ${tool.description}\n`;
        }
        content += "\n";
    }

    content += `## Alternative Pages

Compare PrivateTools with popular cloud-based tools. See how our local, privacy-first alternatives stack up against industry standards.

`;

    for (const alt of alternativesList) {
        content += `- [${alt.name} Alternative](${baseUrl}/alternatives/${alt.id}): ${alt.tagline}\n`;
    }

    content += `
## Core Pages
- [Home](${baseUrl})
- [All Tools](${baseUrl}/tools): Browse all 50+ privacy-first tools
- [Alternatives](${baseUrl}/alternatives): Compare with popular cloud tools
- [About](${baseUrl}/about): Zero-server privacy guarantee
- [Contact](${baseUrl}/contact): Support and feedback
- [Legal](${baseUrl}/legal/privacy): Privacy policy and terms

## Comprehensive Documentation
- [Full Technical Index & Tool Specs](${baseUrl}/llms-full.txt)
- [Category Documentation](${baseUrl}/llms.txt#core-categories--tools)
- [Alternative Comparisons](${baseUrl}/llms.txt#alternative-pages)
`;

    return new NextResponse(content, {
        headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
        },
    });
}
