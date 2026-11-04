import { NextResponse } from "next/server";

import { toolMetadataList } from "@/features/tools/registry";
import { env } from "@/lib/env";

interface RouteParams {
    params: Promise<{
        category: string;
        slug: string;
    }>;
}

export async function GET(request: Request, { params }: RouteParams) {
    const { category, slug } = await params;

    // Find the specific tool matching the URL params
    const tool = toolMetadataList.find((t) => t.category === category && t.id === slug);

    if (!tool) {
        return new NextResponse("Tool not found", { status: 404 });
    }

    const baseUrl = env.NEXT_PUBLIC_SITE_URL;
    const toolUrl = `${baseUrl}/tools/${category}/${slug}`;
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);

    const content = `# ${tool.name} (${formattedCategory}) - PrivateTools Specification

> ${tool.description}

## Overview
${tool.longDescription}

## Metadata
- **URL:** ${toolUrl}
- **Category:** ${formattedCategory}
- **Keywords:** ${tool.keywords.join(", ")}
- **Tags:** ${tool.tags.join(", ")}

## Workflow & Execution Strategy
${tool.steps.map((step, i) => `${i + 1}. **${step.title}**: ${step.description}`).join("\n")}

## What to Expect
${tool.whatToExpect.map((item) => `- **${item.title}**: ${item.description}`).join("\n")}

## Frequently Asked Questions
${tool.faqs.map((faq) => `### ${faq.question}\n${faq.answer}`).join("\n\n")}

## Privacy Guarantee
This tool runs 100% client-side in your browser. Zero files are uploaded to any server. Your data never leaves your device.
`;

    return new NextResponse(content, {
        headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
        },
    });
}
