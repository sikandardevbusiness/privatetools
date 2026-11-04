import { NextResponse } from "next/server";

import { toolMetadataList } from "@/features/tools/registry";
import { env } from "@/lib/env";

export async function GET() {
    const baseUrl = env.NEXT_PUBLIC_SITE_URL;

    let content = `# PrivateTools - Comprehensive Technical Specification & Tool Index

## Architecture & Privacy Guarantee
- **Execution Model:** 100% Client-side execution using HTML5, Web Workers, WebAssembly (WASM), and Canvas.
- **Data Privacy:** Zero server uploads. Files never leave the user's local browser RAM or IndexedDB storage.
- **Tech Stack:** Next.js App Router, React, Tailwind CSS, TypeScript.

---

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

    content += `## Technical Linkage
- Every individual tool provides its own standalone, granular markdown documentation at:
  \`[https://privatetools.in/tools/](https://privatetools.in/tools/)[category]/[slug]/llms.txt\`
`;

    return new NextResponse(content, {
        headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
        },
    });
}
