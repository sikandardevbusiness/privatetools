"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ToolCard } from "../tool-card";

import { BaseTool } from "../../types";

interface RelatedToolsProps {
    title?: string;
    tools: BaseTool[];
    category?: string;
}

export function RelatedTools({ title = "Related tools", tools, category }: RelatedToolsProps) {
    if (tools.length === 0) return null;

    return (
        <section>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">{title}</h2>
                {category && (
                    <Link
                        href={`/tools?category=${category}`}
                        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                    >
                        View all
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {tools.map((tool, index) => (
                    <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <ToolCard tool={tool} />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
