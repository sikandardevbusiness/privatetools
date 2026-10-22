import { ArrowRight, Bug, Lightbulb, Mail, MessageSquare } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { env } from "@/lib/env";

export const metadata: Metadata = {
    title: "Contact Us",
    description:
        "Get in touch with PrivateTools. Report bugs, suggest features, or ask questions. We're here to help.",
};

export default function ContactPage() {
    return (
        <main className="bg-surface">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className="space-y-6">
                        <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary">
                            Get in Touch
                        </span>
                        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.05]">
                            How can we <span className="text-primary">help?</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                            Have a question, found a bug, or have an idea for a new tool? We&apos;d
                            love to hear from you.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="aspect-4/3 rounded-3xl overflow-hidden border border-border bg-muted">
                            <Image
                                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80"
                                alt="Team collaboration"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Methods Section */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 border-t border-border">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Suggest a Tool */}
                    <div className="rounded-2xl border border-border bg-card p-8">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                            <Lightbulb size={24} />
                        </div>
                        <h3 className="font-heading text-xl font-semibold mb-3">Suggest a Tool</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                            Have an idea for a new privacy-first utility? Let us know and we might
                            build it for the community.
                        </p>
                        <Button size="lg" className="w-full gap-2">
                            <Link
                                href={`${env.NEXT_PUBLIC_GITHUB_URL}/issues/new?labels=enhancement&template=feature_request.md`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2"
                            >
                                Suggest a Tool <ArrowRight size={16} />
                            </Link>
                        </Button>
                    </div>

                    {/* Report a Bug */}
                    <div className="rounded-2xl border border-border bg-card p-8">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                            <Bug size={24} />
                        </div>
                        <h3 className="font-heading text-xl font-semibold mb-3">Report a Bug</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                            Found something that isn&apos;t working right? Help us improve by
                            reporting it with detailed information.
                        </p>
                        <Button variant="outline" size="lg" className="w-full gap-2">
                            <Link
                                href={`${env.NEXT_PUBLIC_GITHUB_URL}/issues/new?labels=bug&template=bug_report.md`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2"
                            >
                                Report a Bug <ArrowRight size={16} />
                            </Link>
                        </Button>
                    </div>

                    {/* Email Support */}
                    <div className="rounded-2xl border border-border bg-card p-8">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                            <Mail size={24} />
                        </div>
                        <h3 className="font-heading text-xl font-semibold mb-3">Email Support</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                            Need direct assistance or have a private inquiry? Reach out to our team
                            directly via email.
                        </p>
                        <Button variant="outline" size="lg" className="w-full gap-2">
                            <a
                                href="mailto:support@privatetools.in"
                                className="flex items-center justify-center gap-2"
                            >
                                Email Us <ArrowRight size={16} />
                            </a>
                        </Button>
                    </div>
                </div>
            </section>

            {/* GitHub Community Section */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 border-t border-border">
                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Left Side */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="rounded-2xl border border-border p-8 bg-primary text-primary-foreground">
                            <MessageSquare className="h-12 w-12 mb-4" />
                            <h2 className="font-heading text-2xl font-bold mb-3">
                                Join the Community
                            </h2>
                            <p className="text-primary-foreground/80 leading-relaxed">
                                Our project is open source! Star the repository, contribute code, or
                                browse existing issues to see what we&apos;re working on.
                            </p>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="lg:col-span-7 space-y-4">
                        <div className="rounded-2xl border border-border bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg mb-1">
                                    PrivateTools on GitHub
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {env.NEXT_PUBLIC_GITHUB_URL}
                                </p>
                            </div>
                            <Button variant="outline">
                                <Link
                                    href={env.NEXT_PUBLIC_GITHUB_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2"
                                >
                                    Visit Repository <ArrowRight size={16} />
                                </Link>
                            </Button>
                        </div>

                        <div className="rounded-2xl border border-border bg-muted/50 p-6">
                            <h4 className="font-semibold mb-4">Before Creating an Issue</h4>
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                <li className="flex items-start gap-3">
                                    <span className="text-primary mt-0.5">•</span>
                                    <span>Search existing issues to avoid duplicates</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-primary mt-0.5">•</span>
                                    <span>
                                        For bug reports, include steps to reproduce the issue
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-primary mt-0.5">•</span>
                                    <span>
                                        For feature requests, explain the use case and benefits
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-primary mt-0.5">•</span>
                                    <span>Be respectful and follow our code of conduct</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Privacy Promise */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 border-t border-border">
                <div className="max-w-3xl mx-auto text-center">
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-4">
                        Our Promise
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl font-medium tracking-tight mb-6">
                        Your privacy extends to your communications
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Just like our tools, we respect your privacy. We do not sell your data, use
                        it for marketing, or share it with third parties. We only use your
                        information to respond to your inquiry.
                    </p>
                </div>
            </section>
        </main>
    );
}
