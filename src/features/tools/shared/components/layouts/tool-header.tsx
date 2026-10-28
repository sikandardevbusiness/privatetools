"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function ToolHeader({
    title,
    children,
    className,
    description,
    childrenClassName = "max-w-3xl mx-auto",
}: {
    title: string;
    className?: string;
    description: string;
    children: ReactNode;
    childrenClassName?: string;
}) {
    return (
        <section className={cn("relative w-full bg-background", className)}>
            <div className="absolute inset-0 bg-muted/50 border-b border-border pointer-events-none h-[60%]" />

            <div className="relative max-w-6xl mx-auto px-4 pt-12 md:pt-16">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        {title}
                    </h1>
                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                        {description}
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
