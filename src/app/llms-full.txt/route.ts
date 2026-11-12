import { NextResponse } from "next/server";

import { toolMetadataList } from "@/features/tools/registry";
import { categoryInfoList } from "@/features/tools/category";
import { alternativesList } from "@/app/(root)/alternatives/registry";
import { env } from "@/lib/env";

export async function GET() {
    const baseUrl = env.NEXT_PUBLIC_SITE_URL;

    let content = `# PrivateTools - Comprehensive Technical Specification & Tool Index

## Architecture & Privacy Guarantee
- **Execution Model:** 100% Client-side execution using HTML5, Web Workers, WebAssembly (WASM), and Canvas
- **Data Privacy:** Zero server uploads. Files never leave the user's local browser RAM or IndexedDB storage
- **Tech Stack:** Next.js App Router, React, Tailwind CSS, TypeScript
- **No Tracking:** No analytics, no cookies, no user identification

---

## Category Specifications

`;

    for (const category of categoryInfoList) {
        const categoryTools = toolMetadataList.filter((tool) => tool.category === category.id);
        content += `### ${category.title}\n`;
        content += `- **ID:** \`${category.id}\`\n`;
        content += `- **Route:** \`/tools/${category.id}\`\n`;
        content += `- **URL:** [${baseUrl}/tools/${category.id}](${baseUrl}/tools/${category.id})\n`;
        content += `- **Description:** ${category.description}\n`;
        content += `- **Keywords:** ${category.keywords.join(", ")}\n`;
        content += `- **Tags:** ${category.tags.join(", ")}\n`;
        content += `- **Tools in Category:** ${categoryTools.length}\n`;
        content += `\n`;
    }

    content += `---

## Tool Directory & Specifications

`;

    for (const tool of toolMetadataList) {
        content += `### ${tool.name}\n`;
        content += `- **Route:** \`/tools/${tool.category}/${tool.id}\`\n`;
        content += `- **URL:** [${baseUrl}/tools/${tool.category}/${tool.id}](${baseUrl}/tools/${tool.category}/${tool.id})\n`;
        content += `- **Description:** ${tool.description}\n`;
        content += `- **Long Description:** ${tool.longDescription}\n`;
        content += `- **Keywords:** ${tool.keywords.join(", ")}\n`;
        content += `- **Workflow:**\n`;

        tool.steps.forEach((step, i) => {
            content += `  ${i + 1}. **${step.title}**: ${step.description}\n`;
        });

        content += `- **What to Expect:**\n`;
        tool.whatToExpect.forEach((item) => {
            content += `  - **${item.title}**: ${item.description}\n`;
        });
        content += `\n---\n\n`;
    }

    content += `## Alternative Comparisons

Detailed comparisons between PrivateTools and popular cloud-based alternatives.

`;

    for (const alt of alternativesList) {
        content += `### ${alt.name} Alternative\n`;
        content += `- **ID:** \`${alt.id}\`\n`;
        content += `- **Route:** \`/alternatives/${alt.id}\`\n`;
        content += `- **URL:** [${baseUrl}/alternatives/${alt.id}](${baseUrl}/alternatives/${alt.id})\n`;
        content += `- **Tagline:** ${alt.tagline}\n`;
        content += `- **Description:** ${alt.description}\n`;
        content += `- **Status:** ${alt.status}\n`;
        content += `- **Keywords:** ${alt.keywords.join(", ")}\n`;
        content += `- **Our Tools:** ${alt.ourTools.join(", ")}\n`;
        content += `\n**Benefits:**\n`;
        alt.ourBenefits.forEach((benefit) => {
            content += `  - ${benefit}\n`;
        });
        content += `\n**Comparison Table:**\n`;
        alt.comparisonTable.forEach((row) => {
            content += `  - **${row.feature}**: ${alt.name} vs PrivateTools - ${row.competitor} | ${row.us}\n`;
        });
        content += `\n---\n\n`;
    }

    content += `## Technical Linkage
- Every individual tool provides its own standalone, granular markdown documentation at:
  \`[https://privatetools.in/tools/](https://privatetools.in/tools/)[category]/[slug]/llms.txt\`
  
- Every alternative page provides comparison markdown at:
  \`[https://privatetools.in/alternatives/](https://privatetools.in/alternatives/)[id]/llms.txt\`

- Category pages are accessible at:
  \`[https://privatetools.in/tools/](https://privatetools.in/tools/)[category-id]\`

---

## API Endpoints
- **Sitemap:** \`${baseUrl}/sitemap.xml\`
- **Main Documentation:** \`${baseUrl}/llms.txt\`
- **Full Technical Specs:** \`${baseUrl}/llms-full.txt\`
- **Tool Documentation:** \`${baseUrl}/tools/[category]/[slug]/llms.txt\`
- **Alternative Documentation:** \`${baseUrl}/alternatives/[id]/llms.txt\`
`;

    return new NextResponse(content, {
        headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
        },
    });
}
