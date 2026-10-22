import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FAQWithSchema } from "@/features/tools/shared/components/faq-with-schema";
import { ToolCard } from "@/features/tools/shared/components/tool-card";

import { toolMetadataList } from "@/features/tools/registry";
import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { BaseTool } from "@/features/tools/shared/types";
import { getDiverseTools, getRelatedTools, getToolByPath } from "@/features/tools/shared/utils";

interface PageProps {
    params: Promise<{
        category: string;
        slug: string;
    }>;
}

// ✅ FIX: Tell Next.js this route is allowed to block while resolving params
export const instant = false;

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://privatetools.in";

export async function generateStaticParams() {
    return toolMetadataList.map((tool) => ({
        category: tool.category,
        slug: tool.id,
    }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const params = await props.params;
    const tool = toolMetadataList.find(
        (t) => t.category === params.category && t.id === params.slug,
    );

    if (!tool) {
        return {
            title: "Tool Not Found",
            description: "The requested tool does not exist.",
        };
    }

    const title = `${tool.name} - Free, Secure & Private Local Browser Tool`;
    const description = `${tool.description} Process your files 100% locally in your browser. Zero uploads, zero tracking, instant results.`;

    return {
        title,
        description,
        keywords: tool.keywords?.join(", ") || tool.name,
        openGraph: {
            title,
            description,
            type: "website",
            siteName: "PrivateTools",
            images: [
                {
                    url: tool.thumbnailUrl || `${BASE_URL}/og-image.jpg`,
                    width: 1200,
                    height: 630,
                    alt: tool.name,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [tool.thumbnailUrl || `${BASE_URL}/og-image.jpg`],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            },
        },
        alternates: {
            canonical: `/tools/${tool.category}/${tool.id}`,
        },
    };
}

function generateStructuredData(tool: BaseTool) {
    return {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: tool.name,
        description: tool.longDescription || tool.description,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
        featureList: tool.keywords || [],
        browserRequirements: "Requires JavaScript. Works in Chrome, Firefox, Safari, Edge.",
    };
}

function generateFAQStructuredData(tool: BaseTool) {
    if (!tool.faqs || tool.faqs.length === 0) return null;
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: tool.faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    };
}

function generateBreadcrumbSchema(tool: BaseTool) {
    const categoryLabel = tool.category.charAt(0).toUpperCase() + tool.category.slice(1);
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
            { "@type": "ListItem", position: 2, name: "All Tools", item: `${BASE_URL}/tools` },
            {
                "@type": "ListItem",
                position: 3,
                name: `${categoryLabel} Tools`,
                item: `${BASE_URL}/tools?category=${tool.category}`,
            },
            {
                "@type": "ListItem",
                position: 4,
                name: tool.name,
                item: `${BASE_URL}/tools/${tool.category}/${tool.id}`,
            },
        ],
    };
}

function generateHowToSchema(tool: BaseTool) {
    return {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: `How to use ${tool.name}`,
        description: `Step-by-step instructions for ${tool.name.toLowerCase()} securely on your device with no server upload.`,
        step: [
            {
                "@type": "HowToStep",
                position: 1,
                name: "Select or input your file",
                text: "Choose your file to load directly into the browser.",
            },
            {
                "@type": "HowToStep",
                position: 2,
                name: "Adjust preferences",
                text: "Configure your desired conversion, format, or compression settings.",
            },
            {
                "@type": "HowToStep",
                position: 3,
                name: "Download your result",
                text: "Processing completes in your browser. Download your file instantly with complete data privacy.",
            },
        ],
    };
}

export default async function DynamicToolPage({ params }: PageProps) {
    const _params = await params;

    const tool = getToolByPath(_params.category, _params.slug);

    if (!tool) {
        notFound();
    }

    const structuredData = generateStructuredData(tool);
    const faqStructuredData = generateFAQStructuredData(tool);
    const breadcrumbSchema = generateBreadcrumbSchema(tool);
    const howToSchema = generateHowToSchema(tool);

    const relatedTools = getRelatedTools(tool.id, 4);
    const diverseTools = getDiverseTools(tool.id, 4);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            {faqStructuredData && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
                />
            )}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />

            <ToolHeader tool={tool} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {tool.faqs && tool.faqs.length > 0 && <FAQWithSchema items={tool.faqs} />}

                <div className="w-full mt-12">
                    {relatedTools.length > 0 && (
                        <div className="mb-12">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                                More like this
                                <span className="text-sm font-normal text-muted-foreground capitalize">
                                    ({tool.category} tools)
                                </span>
                            </h2>
                            <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedTools.map((related) => (
                                    <ToolCard key={related.id} tool={related} />
                                ))}
                            </div>
                        </div>
                    )}

                    {diverseTools.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                                Explore something different
                            </h2>
                            <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {diverseTools.map((diverse) => (
                                    <ToolCard key={diverse.id} tool={diverse} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
