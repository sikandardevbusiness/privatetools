import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle, Zap } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { alternativesList } from "../registry";
import { toolMetadataList } from "@/features/tools/registry";
import { env } from "@/lib/env";

interface PageProps {
    params: Promise<{ id: string }>;
}

const BASE_URL = env.NEXT_PUBLIC_SITE_URL;

export async function generateStaticParams() {
    return alternativesList.map((alt) => ({ id: alt.id }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const params = await props.params;
    const alt = alternativesList.find((a) => a.id === params.id);

    if (!alt) {
        return { title: "Alternative Not Found" };
    }

    return {
        title: `${alt.name} Alternative: Free, Private & Unlimited | PrivateTools`,
        description: alt.tagline,
        keywords: alt.keywords.join(", "),
        openGraph: {
            title: `The Best ${alt.name} Alternative`,
            description: alt.description,
            type: "website",
            siteName: "PrivateTools",
            images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: alt.name }],
        },
        twitter: {
            card: "summary_large_image",
            title: `${alt.name} Alternative`,
            description: alt.tagline,
            images: [`${BASE_URL}/og-image.jpg`],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: { index: true, follow: true },
        },
        alternates: { canonical: `/alternatives/${alt.id}` },
    };
}

function generateBreadcrumbSchema(alt: (typeof alternativesList)[0]) {
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
            {
                "@type": "ListItem",
                position: 3,
                name: `${alt.name} Alternative`,
                item: `${BASE_URL}/alternatives/${alt.id}`,
            },
        ],
    };
}

export default async function AlternativePage({ params }: PageProps) {
    const { id } = await params;
    const alt = alternativesList.find((a) => a.id === id);

    if (!alt) {
        notFound();
    }

    const tools = toolMetadataList.filter((t) => alt.ourTools.includes(t.id));
    const breadcrumbSchema = generateBreadcrumbSchema(alt);

    return (
        <>
            {/* SEO Schema Scripts */}
            <Script
                id="schema-breadcrumb"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <main className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 space-y-12">
                {/* Header */}
                <div className="space-y-4">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/alternatives">Alternatives</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{alt.name} Alternative</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                        The Best {alt.name} Alternative
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                        {alt.tagline}
                    </p>
                </div>

                {/* Our Tools Grid */}
                <section>
                    <h2 className="text-xl font-semibold mb-4">Our Tools That Replace It</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {tools.map((tool) => (
                            <Link key={tool.id} href={`/tools/${tool.category}/${tool.id}`}>
                                <Card className="h-full hover:border-primary/50 transition-colors">
                                    <CardHeader>
                                        <CardTitle className="text-base">{tool.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {tool.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Comparison Table */}
                <section>
                    <h2 className="text-xl font-semibold mb-4">Head-to-Head Comparison</h2>
                    <div className="overflow-x-auto border rounded-lg">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 text-muted-foreground font-medium">
                                <tr>
                                    <th className="px-6 py-4">Feature</th>
                                    <th className="px-6 py-4">{alt.name}</th>
                                    <th className="px-6 py-4 text-primary font-semibold">
                                        PrivateTools
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {alt.comparisonTable.map((row, idx) => (
                                    <tr key={idx} className="bg-card">
                                        <td className="px-6 py-4 font-medium">{row.feature}</td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {row.competitor}
                                        </td>
                                        <td className="px-6 py-4 text-foreground font-medium">
                                            {row.us}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Benefits vs Limitations */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="border-emerald-500/20 bg-emerald-500/5">
                        <CardHeader>
                            <CardTitle className="text-emerald-600 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5" /> Why Choose Us
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {alt.ourBenefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-start gap-3 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                                    <span className="text-foreground">{benefit}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="border-amber-500/20 bg-amber-500/5">
                        <CardHeader>
                            <CardTitle className="text-amber-600 flex items-center gap-2">
                                <XCircle className="w-5 h-5" /> Honest Limitations
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {alt.limitations.map((limit, idx) => (
                                <div key={idx} className="flex items-start gap-3 text-sm">
                                    <XCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                                    <span className="text-foreground">{limit}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </section>

                {/* Bottom CTA */}
                <section className="text-center space-y-6 pt-8 border-t">
                    <h2 className="text-2xl font-bold">
                        Ready to switch to a private alternative?
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {tools.slice(0, 3).map((tool) => (
                            <Link key={tool.id} href={`/tools/${tool.category}/${tool.id}`}>
                                <Button size="lg">
                                    Try {tool.name} <Zap className="w-4 h-4" />
                                </Button>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}
