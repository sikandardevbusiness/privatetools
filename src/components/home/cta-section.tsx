"use client";

import { ArrowRight, Bug, Lightbulb, Mail, Shield } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { env } from "@/lib/env";

export function CTASection() {
    return (
        <section className="bg-primary/5 py-24 border-y border-border" id="community">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-6">
                        <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary">
                            Community Driven
                        </span>

                        <h2 className="font-heading text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-foreground">
                            Help Us Build <br />
                            <span className="text-primary">Better Tools.</span>
                        </h2>

                        <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                            PrivateTools is a community-driven project. If you have an idea for a
                            new privacy-first utility or found a bug, we would love to hear from
                            you.
                        </p>

                        <div className="flex flex-wrap items-center gap-4">
                            <Link
                                href={`${env.NEXT_PUBLIC_GITHUB_URL}/issues/new?labels=enhancement&template=feature_request.md`}
                                target="_blank"
                            >
                                <Button size="lg" className="gap-2">
                                    <Lightbulb size={16} /> Suggest a Tool
                                </Button>
                            </Link>

                            <Link
                                href={`${env.NEXT_PUBLIC_GITHUB_URL}/issues/new?labels=bug&template=bug_report.md`}
                                target="_blank"
                            >
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="gap-2 rounded-lg border-border bg-background hover:bg-muted"
                                >
                                    <Bug size={16} /> Report a Bug
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Trust Indicators / Contact Card */}
                    <div className="flex flex-col justify-center space-y-6">
                        {/* Card 1: Direct Contact */}
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                                    <Mail size={20} />
                                </div>
                                <div className="space-y-1">
                                    <CardTitle>Direct Contact</CardTitle>
                                    <CardDescription>
                                        Reach out to the maintainer directly.
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="pt-2 border-t border-border">
                                    <Link
                                        href={`mailto:${env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                                        className="flex items-center justify-between group p-3 rounded-lg hover:bg-muted transition-colors"
                                    >
                                        <span className="font-medium text-foreground">
                                            {env.NEXT_PUBLIC_CONTACT_EMAIL}
                                        </span>
                                        <ArrowRight
                                            size={16}
                                            className="text-muted-foreground group-hover:text-primary transition-colors"
                                        />
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Card 2: 100% Private Communication */}
                        <Card>
                            <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 mt-1">
                                    <Shield size={20} />
                                </div>
                                <div className="space-y-1">
                                    <CardTitle>100% Private Communication</CardTitle>
                                    <CardDescription>
                                        We respect your inbox. No spam, no tracking, and no selling
                                        of your data. Ever.
                                    </CardDescription>
                                </div>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
