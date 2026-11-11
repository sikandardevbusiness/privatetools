import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { toolMetadataList } from "@/features/tools/registry";
import { alternativesList } from "./registry";
import { env } from "@/lib/env";

const BASE_URL = env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
    title: "Free & Private Alternatives to Popular Online Tools | PrivateTools",
    description:
        "Discover 100% free, private, and local browser-based alternatives to popular tools like Smallpdf, TinyPNG, and Otter.ai. No uploads, no limits.",
    keywords:
        "smallpdf alternative, tinypng alternative, otter ai alternative, private online tools",
    openGraph: {
        title: "Free & Private Alternatives to Popular Online Tools",
        description:
            "Ditch cloud uploads. Use our 100% local, free alternatives to popular web tools.",
        type: "website",
        siteName: "PrivateTools",
        images: [
            { url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Alternatives" },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Free & Private Alternatives to Popular Online Tools",
        description: "Ditch cloud uploads. Use our 100% local, free alternatives.",
        images: [`${BASE_URL}/og-image.jpg`],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true },
    },
    alternates: { canonical: "/alternatives" },
};

function generateBreadcrumbSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
            {
                "@type": "ListItem",
                position: 2,
                name: "Alternatives",
                item: `${BASE_URL}/alternatives`,
            },
        ],
    };
}

function generateItemListSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Free & Private Tool Alternatives",
        description: "Private, local browser-based alternatives to popular online tools",
        itemListElement: alternativesList.map((alt, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "WebPage",
                name: `${alt.name} Alternative`,
                description: alt.tagline,
                url: `${BASE_URL}/alternatives/${alt.id}`,
            },
        })),
    };
}

export default function AlternativesPage() {
    const breadcrumbSchema = generateBreadcrumbSchema();
    const itemListSchema = generateItemListSchema();

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
                                    Better, Private Alternatives
                                </h1>
                            </div>
                            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
                                Stop uploading your sensitive files to the cloud. We build 100%
                                free, local, and unlimited alternatives to popular web tools.
                            </p>
                        </div>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-12">
                    {/* Grid of Alternatives */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {alternativesList.map((alt) => {
                            const tools = toolMetadataList.filter((t) =>
                                alt.ourTools.includes(t.id),
                            );
                            return (
                                <Card
                                    key={alt.id}
                                    className="flex flex-col transition-all hover:border-primary/50 hover:shadow-lg"
                                >
                                    <CardHeader className="space-y-2">
                                        <div className="flex items-start justify-between gap-2">
                                            <CardTitle className="text-lg leading-tight">
                                                {alt.name}
                                            </CardTitle>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {alt.tagline}
                                        </p>
                                    </CardHeader>

                                    <CardContent className="flex-1">
                                        <div className="flex flex-wrap gap-1.5 mb-3">
                                            {tools.slice(0, 3).map((tool) => (
                                                <Badge
                                                    key={tool.id}
                                                    variant="secondary"
                                                    className="text-[10px] px-2 py-0.5"
                                                >
                                                    {tool.name}
                                                </Badge>
                                            ))}
                                            {tools.length > 3 && (
                                                <Badge
                                                    variant="secondary"
                                                    className="text-[10px] px-2 py-0.5"
                                                >
                                                    +{tools.length - 3} more
                                                </Badge>
                                            )}
                                        </div>
                                    </CardContent>

                                    <CardFooter>
                                        <Link className="w-full" href={`/alternatives/${alt.id}`}>
                                            <Button variant="outline" className="w-full">
                                                View Comparison{" "}
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            );
                        })}
                    </section>
                </div>
            </main>
        </>
    );
}
