"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { isToolNew } from "@/features/tools/shared//utils";
import type { BaseTool } from "@/features/tools/shared/types";

export function ToolCard({ tool }: { tool: BaseTool }) {
    const href = `/tools/${tool.category}/${tool.id}`;
    const isNew = isToolNew(tool.createdAt);

    return (
        <Card className="group relative flex flex-col overflow-hidden border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl p-0 h-full">
            {/* 1. Thumbnail Container */}
            <div className="relative w-full aspect-video overflow-hidden bg-muted">
                <Image
                    src={tool.thumbnailUrl || "/placeholder.png"}
                    alt={`${tool.name} thumbnail`}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Subtle gradient overlay on hover for a premium feel (Tailwind v4 syntax) */}
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* 2. Status Badges (Stacked Top-Left) */}
                <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
                    {isNew && (
                        <Badge className="font-semibold bg-white text-black shadow-sm border-0">
                            New
                        </Badge>
                    )}
                    {tool.isExperimental && (
                        <Badge className="font-semibold bg-white text-black shadow-sm border-0">
                            Experimental
                        </Badge>
                    )}
                </div>
            </div>

            {/* 3. Content Section */}
            <CardContent className="flex flex-col p-5 grow space-y-4">
                <div className="space-y-1">
                    <h3 className="font-heading text-lg font-semibold text-card-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        {tool.name}
                    </h3>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {tool.category}
                    </p>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 grow">
                    {tool.description}
                </p>

                {/* Optional Tags (if your BaseTool type includes a tags array) */}
                <div className="flex flex-wrap gap-1.5">
                    {tool.tags.slice(0, 3).map((tag: string, index: number) => (
                        <Badge
                            key={index}
                            variant="outline"
                            className="text-[10px] px-2 py-0 h-5 border-border/50 text-muted-foreground"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>

                {/* 4. Action Button */}
                <Link href={href} className="block mt-auto">
                    <Button
                        className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm hover:shadow-md transition-all"
                        size="lg"
                    >
                        Use Tool
                        <ArrowRight
                            size={16}
                            className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}
