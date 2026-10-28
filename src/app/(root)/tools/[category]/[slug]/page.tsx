import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FaqSection } from "@/features/tools/shared/components/sections/faq-section";
import { RelatedTools } from "@/features/tools/shared/components/sections/related-tools";

import { toolComponentMap, toolMetadataList } from "@/features/tools/registry";
import { getDiverseTools, getRelatedTools, getToolByPath } from "@/features/tools/shared/actions";

import { env } from "@/lib/env";

interface PageProps {
    params: Promise<{
        category: string;
        slug: string;
    }>;
}

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

    return (
        <>
            {/* Tool Component */}
            <DynamicComponent tool={tool} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
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
                        <RelatedTools tools={relatedTools} title="Explore something different" />
                    )}
                </div>
            </div>
        </>
    );
}
