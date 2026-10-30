import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";

import { FaqSection } from "@/features/tools/shared/components/sections/faq-section";
import { RelatedTools } from "@/features/tools/shared/components/sections/related-tools";
import { StepsSection } from "@/features/tools/shared/components/sections/steps-section";
import { WhatToExpect } from "@/features/tools/shared/components/sections/what-to-expect";

import { toolComponentMap, toolMetadataList } from "@/features/tools/registry";
import { getDiverseTools, getRelatedTools, getToolByPath } from "@/features/tools/shared/actions";
import type { BaseTool } from "@/features/tools/shared/types";

import { env } from "@/lib/env";

interface PageProps {
    params: Promise<{
        category: string;
        slug: string;
    }>;
}

// ✅ FIX: Tells Next.js this route is allowed to block while resolving params,
// preventing the "URL data outside of Suspense" warning.
export const instant = false;

const BASE_URL = env.NEXT_PUBLIC_SITE_URL;

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

    const title = `${tool.longName || tool.name} - Free, Secure & Private Local Browser Tool`;
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

function generateWebApplicationSchema(tool: BaseTool) {
    return {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: tool.longName || tool.name,
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

function generateFAQSchema(tool: BaseTool) {
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
                name: tool.longName || tool.name,
                item: `${BASE_URL}/tools/${tool.category}/${tool.id}`,
            },
        ],
    };
}

function generateHowToSchema(tool: BaseTool) {
    if (!tool.steps || tool.steps.length === 0) return null;
    return {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: `How to use ${tool.longName || tool.name}`,
        description: `Step-by-step instructions for using ${tool.name.toLowerCase()} securely on your device with no server upload.`,
        step: tool.steps.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: step.title,
            text: step.description,
        })),
    };
}

export default async function DynamicToolPage({ params }: PageProps) {
    const _params = await params;
    const tool = getToolByPath(_params.category, _params.slug);

    if (!tool) {
        notFound();
    }

    const DynamicComponent = toolComponentMap[tool.id];
    if (!DynamicComponent) {
        notFound();
    }

    const relatedTools = getRelatedTools(tool.id, 4);
    const diverseTools = getDiverseTools(tool.id, 4);

    const webAppSchema = generateWebApplicationSchema(tool);
    const faqSchema = generateFAQSchema(tool);
    const breadcrumbSchema = generateBreadcrumbSchema(tool);
    const howToSchema = generateHowToSchema(tool);

    return (
        <>
            <Script
                id="schema-webapp"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
            />
            <Script
                id="schema-breadcrumb"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {howToSchema && (
                <Script
                    id="schema-howto"
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
                />
            )}
            {faqSchema && (
                <Script
                    id="schema-faq"
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}

            <DynamicComponent tool={tool} />

            <div className="max-w-7xl mx-auto px-4 space-y-12 sm:px-6 lg:px-8 py-12">
                {tool.whatToExpect && tool.whatToExpect.length > 0 && (
                    <WhatToExpect items={tool.whatToExpect} />
                )}

                {tool.steps && tool.steps.length > 0 && <StepsSection steps={tool.steps} />}

                {tool.faqs && tool.faqs.length > 0 && <FaqSection items={tool.faqs} />}

                <div className="w-full space-y-12 mt-12">
                    {relatedTools.length > 0 && (
                        <RelatedTools
                            tools={relatedTools}
                            category={tool.category}
                            title="More like this"
                        />
                    )}

                    {diverseTools.length > 0 && (
                        <RelatedTools tools={diverseTools} title="Explore something different" />
                    )}
                </div>
            </div>
        </>
    );
}
