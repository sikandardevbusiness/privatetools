"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

import { Banner } from "@/components/ui/banner";

import { cn } from "@/lib/utils";
import { BaseTool } from "@/features/tools/shared/types";

export function ToolHeader({
    tool,
    children,
    className,
    childrenClassName = "max-w-3xl mx-auto",
}: {
    tool: BaseTool;
    className?: string;
    children: ReactNode;
    childrenClassName?: string;
}) {
    return (
        <section className={cn("relative w-full bg-background", className)}>
            {tool.isExperimental && (
                <Banner
                    variant="warning" // Change to "primary" or "info" based on your UI theme
                    message={
                        <>
                            🚧 <strong>Experimental:</strong> This tool is still in development and
                            undergoing improvements. It is not yet fully complete, but you can use
                            it. We welcome your{" "}
                            <Link
                                href="/contact" // Replace with your actual feedback/contact link
                                className="underline font-semibold hover:text-primary transition-colors"
                            >
                                feedback
                            </Link>{" "}
                            on what more we can improve!
                        </>
                    }
                />
            )}
            <div className="absolute inset-0 bg-muted/50 border-b border-border pointer-events-none h-[60%]" />

            <div className="relative max-w-6xl mx-auto px-4 pt-12 md:pt-16">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        {tool.name}
                    </h1>
                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                        {tool.description}
                    </p>
                </motion.div>

                {/* Children */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className={childrenClassName}
                >
                    {children}
                </motion.div>
            </div>
        </section>
    );
}
