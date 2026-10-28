"use client";

import Link from "next/link";
import { ReactNode } from "react";

const navItems = [
    { href: "/legal/privacy", label: "Privacy Policy", id: "privacy" },
    { href: "/legal/terms", label: "Terms and Conditions", id: "terms" },
    { href: "/legal/imprint", label: "Imprint", id: "imprint" },
];

export function LegalLayout({
    title,
    children,
    activePage,
    description,
    updatedAt,
}: {
    title: string;
    description: string;
    children: ReactNode;
    activePage: "privacy" | "terms" | "imprint";
    updatedAt?: string;
}) {
    return (
        <div className="bg-background text-foreground mb-4 min-h-screen">
            {/* Header */}
            <section className="border-border/30 border-b py-8 md:py-12">
                <div className="mx-auto max-w-7xl px-4 md:px-8 py-8">
                    <h1 className="text-3xl font-bold">{title}</h1>
                    <p className="text-muted-foreground mt-2 leading-relaxed">{description}</p>

                    {updatedAt && (
                        <p className="text-muted-foreground/70 mt-4 text-sm">
                            Last updated:{" "}
                            {new Date(updatedAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    )}
                </div>
            </section>

            {/* Content */}
            <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-14">
                <div className="grid gap-8 md:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-8 md:col-span-2">{children}</div>

                    {/* Sidebar Navigation */}
                    <aside className="hidden md:col-span-1 md:block">
                        <nav className="sticky top-20 space-y-2">
                            {navItems.map((item) => {
                                const isActive = activePage === item.id;
                                return (
                                    <Link
                                        key={item.id}
                                        href={item.href}
                                        className={`block rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                                            isActive
                                                ? "bg-primary/10 text-primary border-primary border-l-2"
                                                : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </aside>
                </div>
            </div>
        </div>
    );
}
