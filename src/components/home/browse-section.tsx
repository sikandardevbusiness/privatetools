"use client";

import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToolCard } from "@/features/tools/shared/components/tool-card";

import { isToolNew } from "@/features/tools/shared/actions";
import { toolMetadataList } from "@/features/tools/registry";
import { cn } from "@/lib/utils";

const displayCategories = [
    "All",
    "New",
    ...Array.from(new Set(toolMetadataList.map((tool) => tool.category))).map(
        (cat) => cat.charAt(0).toUpperCase() + cat.slice(1),
    ),
];

export function BrowseSection() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [query, setQuery] = useState("");

    const filtered = useMemo(() => {
        let results = toolMetadataList.filter((tool) => {
            let matchesCategory = true;

            // FIX: Handle "New" category separately using isToolNew
            if (activeCategory === "New") {
                matchesCategory = isToolNew(tool.createdAt);
            } else if (activeCategory !== "All") {
                const categoryValue = activeCategory.toLowerCase();
                matchesCategory = tool.category === categoryValue;
            }

            const tags = tool.tags || [];
            const searchString =
                `${tool.name} ${tool.category} ${tags.join(" ")} ${tool.description}`.toLowerCase();
            const matchesQuery = searchString.includes(query.toLowerCase());

            return matchesCategory && matchesQuery;
        });

        results.sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
        });

        // FIX: Apply 9-tool limit for both "All" and "New" when no search query
        if ((activeCategory === "All" || activeCategory === "New") && query.trim() === "") {
            results = results.slice(0, 9);
        }

        return results;
    }, [activeCategory, query]);

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-24" id="browse">
            <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div className="max-w-xl space-y-3">
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary">
                        Find the right tool
                    </span>
                    <h2 className="font-heading text-4xl md:text-5xl font-medium tracking-tight">
                        Browse Tools
                    </h2>
                    <p className="text-muted-foreground">
                        Powerful, 100% private utilities, ready when you are.
                    </p>
                </div>
                <Link href="/tools">
                    <Button
                        variant="link"
                        className="gap-2 text-foreground hover:text-primary p-0 h-auto font-semibold self-start md:self-auto"
                    >
                        View all tools <ArrowRight size={16} />
                    </Button>
                </Link>
            </div>

            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                    {displayCategories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={cn(
                                "rounded-full px-4 py-2 text-xs font-medium transition-all",
                                activeCategory === category
                                    ? "bg-foreground text-background"
                                    : "border border-border bg-card text-muted-foreground hover:border-foreground hover:text-foreground",
                            )}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-72">
                    <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search tools, keywords..."
                        className="pl-9 rounded-lg bg-card border-border focus-visible:ring-primary"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">
                        No tools found matching &quot;{query}&quot;.
                    </p>
                </div>
            )}

            {(activeCategory === "All" || activeCategory === "New") &&
                query.trim() === "" &&
                toolMetadataList.length > 9 && (
                    <div className="text-center mt-12">
                        <p className="text-sm text-muted-foreground mb-4">
                            Showing the 9 newest tools.
                        </p>
                        <Link href="/tools">
                            <Button variant="outline">
                                Browse All Tools <ArrowRight size={16} />
                            </Button>
                        </Link>
                    </div>
                )}
        </section>
    );
}
