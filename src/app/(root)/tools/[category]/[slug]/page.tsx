import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield, Eye, Lock, Code2, Mail, Bug, Lightbulb, Globe } from "lucide-react";

import { FaqSection } from "@/features/tools/shared/components/sections/faq-section";
import { RelatedTools } from "@/features/tools/shared/components/sections/related-tools";
import { StepsSection } from "@/features/tools/shared/components/sections/steps-section";
import { WhatToExpect } from "@/features/tools/shared/components/sections/what-to-expect";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

                <section className="w-full space-y-6 mt-12">
                    {/* Flex container for Thumbnail and Long Description */}
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                        {/* 1. Thumbnail Image (16:9 Aspect Ratio & SEO Optimized) */}
                        {tool.thumbnailUrl && (
                            <div className="w-full md:w-1/2 aspect-video relative rounded-xl overflow-hidden shadow-lg border border-border bg-muted group">
                                <Image
                                    src={tool.thumbnailUrl}
                                    alt={`${tool.name} - ${tool.description}`}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            </div>
                        )}

                        {/* 2. Long Description */}
                        {tool.longDescription && (
                            <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
                                <h2 className="text-2xl font-bold text-foreground">
                                    About This Tool
                                </h2>
                                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                    {tool.longDescription}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* 3. Tags / Badges */}
                    {tool.tags && tool.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {tool.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="p-4 text-sm">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </section>

                <section className="w-full mt-12">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                        <Card className="px-4 py-8">
                            <CardHeader className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary text-foreground">
                                    <Shield size={22} />
                                </div>
                                <CardTitle className="text-xl font-bold text-foreground">
                                    100% Open Source &amp; Trustworthy
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed mb-5">
                                    Every tool on{" "}
                                    <span className="font-semibold text-foreground">
                                        PrivateTools
                                    </span>{" "}
                                    is <strong>fully open source</strong> and runs{" "}
                                    <strong>entirely in your browser</strong>. No server uploads. No
                                    tracking. No hidden code. You can{" "}
                                    <Link
                                        href={env.NEXT_PUBLIC_GITHUB_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary underline underline-offset-2 hover:text-primary/80"
                                    >
                                        verify the source code yourself
                                    </Link>{" "}
                                    on GitHub at any time.
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 flex items-center justify-center w-7 h-7 rounded-md bg-blue-500/10 text-blue-500 shrink-0">
                                            <Code2 size={15} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-foreground">
                                                Open Source Code
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Full source code available on GitHub — inspect,
                                                fork, or contribute.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 flex items-center justify-center w-7 h-7 rounded-md bg-purple-500/10 text-purple-500 shrink-0">
                                            <Eye size={15} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-foreground">
                                                Verify &amp; Audit
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Read every line of code. Nothing is hidden. Total
                                                transparency.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 flex items-center justify-center w-7 h-7 rounded-md bg-emerald-500/10 text-emerald-500 shrink-0">
                                            <Lock size={15} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-foreground">
                                                Browser-Local Processing
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Files never leave your device. Zero server uploads.
                                                100% private.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="px-4 py-8">
                            <CardHeader className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary text-foreground">
                                    <Globe size={22} />
                                </div>
                                <CardTitle className="text-xl font-bold text-foreground">
                                    Community &amp; Support
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed mb-5">
                                    PrivateTools is built by the community, for the community. Found
                                    a bug? Have a tool idea? Want to report an issue? We{"'"}d love
                                    to hear from you. Every contribution makes these tools better
                                    for everyone.
                                </p>
                                <div className="space-y-3">
                                    <Button size="lg" className="w-full gap-2">
                                        <Link
                                            href={`${env.NEXT_PUBLIC_GITHUB_URL}/issues/new?labels=enhancement&template=feature_request.md`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 w-full"
                                        >
                                            <Lightbulb size={16} />
                                            Suggest a Tool
                                            <ArrowRight size={16} />
                                        </Link>
                                    </Button>

                                    <Button variant="outline" size="lg" className="w-full gap-2">
                                        <Link
                                            href={`${env.NEXT_PUBLIC_GITHUB_URL}/issues/new?labels=bug&template=bug_report.md`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 w-full"
                                        >
                                            <Bug size={16} />
                                            Report a Bug
                                            <ArrowRight size={16} />
                                        </Link>
                                    </Button>

                                    <Button variant="outline" size="lg" className="w-full gap-2">
                                        <a
                                            href="mailto:support@privatetools.in"
                                            className="flex items-center justify-center gap-2 w-full"
                                        >
                                            <Mail size={16} />
                                            Email Us
                                            <ArrowRight size={16} />
                                        </a>
                                    </Button>
                                </div>

                                {/* GitHub Repo Link */}
                                <div className="mt-5 pt-5 border-t border-border">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-sm text-foreground">
                                                PrivateTools on GitHub
                                            </h4>
                                            <p className="text-xs text-muted-foreground truncate">
                                                {env.NEXT_PUBLIC_GITHUB_URL}
                                            </p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="shrink-0 gap-2"
                                        >
                                            <Link
                                                href={env.NEXT_PUBLIC_GITHUB_URL}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2"
                                            >
                                                Visit Repository
                                                <ArrowRight size={14} />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

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
