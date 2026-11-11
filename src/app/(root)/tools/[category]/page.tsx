import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";

import { ToolCard } from "@/features/tools/shared/components/tool-card";

import { toolMetadataList } from "@/features/tools/registry";
import { toolCategorySchema, type ToolCategory } from "@/features/tools/shared/types";
import { categoryInfoList } from "@/features/tools/category";
import { env } from "@/lib/env";

interface PageProps {
    params: Promise<{
        category: string;
    }>;
}

const BASE_URL = env.NEXT_PUBLIC_SITE_URL;

export async function generateStaticParams() {
    return categoryInfoList.map((category) => ({ category: category.id }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const params = await props.params;
    const categoryData = categoryInfoList.find((c) => c.id === (params.category as ToolCategory));

    if (!categoryData) {
        return { title: "Category Not Found" };
    }

    const title = `${categoryData.title} - Free, Secure & Private Local Browser Tools`;
    const description = `${categoryData.description} Process your files 100% locally in your browser. Zero uploads, zero tracking, instant results.`;

    return {
        title,
        description,
        keywords: categoryData.keywords.join(", "),
        openGraph: {
            title,
            description,
            type: "website",
            siteName: "PrivateTools",
            images: [
                {
                    url: `${BASE_URL}/og-image.jpg`,
                    width: 1200,
                    height: 630,
                    alt: categoryData.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [`${BASE_URL}/og-image.jpg`],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: { index: true, follow: true },
        },
        alternates: {
            canonical: `/tools/${params.category}`,
        },
    };
}

function generateBreadcrumbSchema(categoryData: (typeof categoryInfoList)[0]) {
    const categoryLabel = categoryData.title;
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
            { "@type": "ListItem", position: 2, name: "All Tools", item: `${BASE_URL}/tools` },
            {
                "@type": "ListItem",
                position: 3,
                name: categoryLabel,
                item: `${BASE_URL}/tools/${categoryData.id}`,
            },
        ],
    };
}

function generateItemListSchema(
    categoryData: (typeof categoryInfoList)[0],
    tools: typeof toolMetadataList,
) {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: categoryData.title,
        description: categoryData.description,
        itemListElement: tools.map((tool, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "SoftwareApplication",
                name: tool.name,
                description: tool.description,
                url: `${BASE_URL}/tools/${tool.category}/${tool.id}`,
            },
        })),
    };
}

export default async function CategoryPage({ params }: PageProps) {
    const { category } = await params;

    const parsedCategory = toolCategorySchema.safeParse(category);
    if (!parsedCategory.success) {
        notFound();
    }

    const categoryData = categoryInfoList.find((c) => c.id === parsedCategory.data);
    if (!categoryData) {
        notFound();
    }

    const categoryTools = toolMetadataList.filter((tool) => tool.category === parsedCategory.data);
    const totalTools = categoryTools.length;

    const breadcrumbSchema = generateBreadcrumbSchema(categoryData);
    const itemListSchema = generateItemListSchema(categoryData, categoryTools);

    return (
        <>
            {/* SEO Schema Scripts */}
            <Script
                id="schema-breadcrumb"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Script
                id="schema-itemlist"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
            />

            <main>
                {/* 1. Header with Badge & Description */}
                <section className="border-b border-border bg-muted/30">
                    <div className="max-w-7xl mx-auto flex h-auto min-h-64 flex-col justify-center px-4 md:px-8 py-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                                    {categoryData.title} ({totalTools})
                                </h1>
                            </div>
                            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
                                {categoryData.description}
                            </p>
                        </div>
                    </div>
                </section>

                {/* 2. Tools Grid */}
                <section className="max-w-7xl mx-auto px-4 py-12 md:px-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {categoryTools.map((tool) => (
                            <ToolCard key={tool.id} tool={tool} />
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}
