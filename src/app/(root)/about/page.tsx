import { ArrowRight, Globe, Lock, Mail, Shield, Users } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CTASection } from "@/components/home/cta-section";
import { Button } from "@/components/ui/button";

import { toolMetadataList } from "@/features/tools/registry";

export const metadata: Metadata = {
    title: "About Us",
    description:
        "Learn about the mission behind PrivateTools. 100% local, 0% tracking. Privacy-first utilities that run entirely in your browser.",
};

const stats = [
    { value: "100%", label: "Client-Side Processing" },
    { value: "0", label: "Files Uploaded to Servers" },
    { value: `${toolMetadataList.length}+`, label: "Free Utilities Available" },
    { value: "24/7", label: "Always Available, No Downtime" },
];

const values = [
    {
        icon: Lock,
        title: "Privacy First",
        description:
            "Your files never leave your device. We physically cannot access your data because it is never sent to us.",
    },
    {
        icon: Shield,
        title: "Transparency",
        description:
            "No hidden trackers, no sneaky analytics, and no paywalls for basic privacy. What you see is what you get.",
    },
    {
        icon: Globe,
        title: "Performance",
        description:
            "By leveraging modern browser APIs like WebAssembly and Web Workers, our tools are blazing fast and efficient.",
    },
    {
        icon: Users,
        title: "Community Driven",
        description:
            "Built for the people, by the people. We actively listen to user feedback to build the tools you actually need.",
    },
];

const expertise = [
    "Browser-based Architecture",
    "Data Privacy & Security",
    "Full-Stack Development",
    "Open Source Advocacy",
];

export default function AboutPage() {
    return (
        <main className="bg-background">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className="space-y-6">
                        <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary">
                            Our Mission
                        </span>
                        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.05]">
                            About <span className="text-primary">PrivateTools.</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                            We are not a corporate software agency. We are a dedicated privacy-first
                            platform building utilities that respect your data. 100% local. 0%
                            tracking.
                        </p>
                        <Button size="lg" className="gap-2">
                            <Link href="/tools" className="flex gap-2 items-center">
                                Explore All Tools <ArrowRight size={16} />
                            </Link>
                        </Button>
                    </div>
                    <div className="relative">
                        <div className="aspect-4/3 rounded-3xl overflow-hidden border border-border bg-muted relative">
                            <Image
                                src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Professional video editing workspace"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* The Architect & Why PrivateTools Section */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 border-t border-border">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left: Why PrivateTools */}
                    <div className="space-y-6">
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">
                            The Mission
                        </span>
                        <h2 className="font-heading text-4xl md:text-5xl font-medium tracking-tight leading-[1.1]">
                            Why PrivateTools?
                        </h2>
                        <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                            <p>
                                With a deep passion for digital privacy and open-source software, I
                                built PrivateTools to solve a simple but critical problem: why do we
                                have to upload our personal files to unknown remote servers just to
                                convert a PDF or compress an image?
                            </p>
                            <p>
                                My mission is to provide powerful, free, and completely private
                                utilities that run entirely in your browser.
                            </p>
                        </div>
                        <blockquote className="border-l-4 border-primary pl-4 italic text-foreground text-lg">
                            {'"'}Your data belongs to you. We believe in building tools that empower
                            users without compromising their digital privacy.{'"'}
                        </blockquote>
                    </div>

                    {/* Right: The Architect Card */}
                    <div className="space-y-6">
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">
                            Leadership
                        </span>
                        <div className="rounded-2xl border border-border bg-card p-8 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <Users size={32} />
                                </div>
                                <div>
                                    <h3 className="font-heading text-2xl font-semibold">
                                        The Architect
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Founder & Lead Maintainer
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Privacy Advocate & Developer dedicated to keeping your data
                                    safe.
                                </p>
                                <Link
                                    href="mailto:support@privatetools.in"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                                >
                                    <Mail size={16} />
                                    support@privatetools.in
                                </Link>
                            </div>

                            <div className="pt-4 border-t border-border">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                                    Core Expertise
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {expertise.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* By The Numbers Section */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 border-t border-border">
                <div className="text-center mb-12">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">
                        By The Numbers
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl font-medium tracking-tight mt-2">
                        Metrics that prove our commitment to your privacy.
                    </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="text-center p-6 rounded-2xl bg-card border border-border"
                        >
                            <span className="font-heading text-4xl md:text-5xl font-medium tracking-tight text-primary">
                                {stat.value}
                            </span>
                            <p className="mt-2 text-sm text-muted-foreground font-medium">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Core Values Section */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 border-t border-border">
                <div className="text-center mb-12">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">
                        Our Core Values
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl font-medium tracking-tight mt-2 max-w-2xl mx-auto">
                        The principles that guide every line of code we write.
                    </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    {values.map((value, i) => (
                        <div
                            key={i}
                            className="rounded-2xl p-8 bg-card border border-border text-foreground"
                        >
                            <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                                <value.icon size={24} />
                            </div>
                            <h3 className="font-heading text-xl font-semibold mb-3">
                                {value.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                {value.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* New Community CTA Section */}
            <CTASection />
        </main>
    );
}
