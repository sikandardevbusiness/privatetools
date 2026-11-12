import { NextResponse } from "next/server";
import { notFound } from "next/navigation";

import { alternativesList } from "../../registry";
import { toolMetadataList } from "@/features/tools/registry";

interface RouteProps {
    params: Promise<{ id: string }>;
}

export async function GET(request: Request, props: RouteProps) {
    const params = await props.params;
    const alt = alternativesList.find((a) => a.id === params.id);

    if (!alt) {
        notFound();
    }

    const tools = toolMetadataList.filter((t) => alt.ourTools.includes(t.id));

    const markdown = `# ${alt.name} Alternative - PrivateTools

${alt.tagline}

## Overview
${alt.description}

## Our Tools That Replace ${alt.name}

${tools
    .map(
        (tool) => `### ${tool.name}
- **Category:** ${tool.category}
- **Description:** ${tool.description}
- **URL:** /tools/${tool.category}/${tool.id}
`,
    )
    .join("\n")}

## Why Choose PrivateTools?

### Benefits
${alt.ourBenefits.map((benefit) => `- ${benefit}`).join("\n")}

### Limitations
${alt.limitations.map((limit) => `- ${limit}`).join("\n")}

## Comparison Table

| Feature | ${alt.name} | PrivateTools |
|---------|------------|--------------|
${alt.comparisonTable.map((row) => `| ${row.feature} | ${row.competitor} | ${row.us} |`).join("\n")}

## Keywords
${alt.keywords.map((keyword) => `- ${keyword}`).join("\n")}

## Status
${alt.status === "done" ? "✅ Complete" : alt.status === "in-progress" ? "🚧 In Progress" : "📋 Planned"}

---

**All tools are:**
- 100% free
- Process files locally in your browser
- No server uploads
- No tracking
- No account required

Visit: https://privatetools.in/alternatives/${alt.id}
`;

    return new NextResponse(markdown, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    });
}
