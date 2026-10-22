"use client";

import { Filter, LayoutGrid, Search, Sparkles, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { toolMetadataList } from "@/features/tools/registry";
import { ToolCard } from "@/features/tools/shared/components/tool-card";
import type { ToolCategory } from "@/features/tools/shared/types";
import { getCategoryIcon } from "@/features/tools/shared/utils";
import { cn } from "@/lib/utils";

interface FilterState {
    search: string;
    category: ToolCategory | "all";
}

export function ToolsClient() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState<FilterState>({
        search: searchParams.get("q") || "",
        category: (searchParams.get("category") as ToolCategory) || "all",
    });

    const allCategories = useMemo(() => {
        const categories = [...new Set(toolMetadataList.map((tool) => tool.category))];
        return categories.sort();
    }, []);

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        toolMetadataList.forEach((tool) => {
            counts[tool.category] = (counts[tool.category] || 0) + 1;
        });
        return counts;
    }, []);

    const updateURL = useCallback(
        (newFilters: FilterState) => {
            const params = new URLSearchParams();
            if (newFilters.search) params.set("q", newFilters.search);
            if (newFilters.category !== "all") params.set("category", newFilters.category);

            const queryString = params.toString();
            router.replace(queryString ? `/tools?${queryString}` : "/tools", { scroll: false });
        },
        [router],
    );

    const handleFilterChange = useCallback(
        (key: keyof FilterState, value: string) => {
            const newFilters = { ...filters, [key]: value };
            setFilters(newFilters);
            updateURL(newFilters);
        },
        [filters, updateURL],
    );

    const filteredTools = useMemo(() => {
        return toolMetadataList.filter((tool) => {
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                const matchesSearch =
                    tool.name.toLowerCase().includes(searchLower) ||
                    tool.description.toLowerCase().includes(searchLower) ||
                    tool.tags.some((tag) => tag.toLowerCase().includes(searchLower));
                if (!matchesSearch) return false;
            }
            if (filters.category !== "all" && tool.category !== filters.category) {
                return false;
            }
            return true;
        });
    }, [filters]);

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:block w-64 shrink-0 space-y-6">
                    <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
                            <LayoutGrid className="h-4 w-4" /> Categories
                        </h3>
                        <div className="space-y-1">
                            <button
                                onClick={() => handleFilterChange("category", "all")}
                                className={cn(
                                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                                    filters.category === "all"
                                        ? "bg-primary/10 text-primary font-medium"
                                        : "hover:bg-muted text-muted-foreground",
                                )}
                            >
                                <span className="flex items-center gap-2">
                                    <Sparkles className="h-4 w-4" /> All Tools
                                </span>
                                <Badge variant="secondary">{toolMetadataList.length}</Badge>
                            </button>
                            {allCategories.map((category) => {
                                const count = categoryCounts[category] || 0;
                                if (count === 0) return null;
                                const Icon = getCategoryIcon(category);
                                return (
                                    <button
                                        key={category}
                                        onClick={() => handleFilterChange("category", category)}
                                        className={cn(
                                            "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors capitalize",
                                            filters.category === category
                                                ? "bg-primary/10 text-primary font-medium"
                                                : "hover:bg-muted text-muted-foreground",
                                        )}
                                    >
                                        <span className="flex items-center gap-2">
                                            <Icon className="h-4 w-4" />
                                            {category}
                                        </span>
                                        <Badge variant="secondary">{count}</Badge>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search tools, formats, or keywords..."
                                value={filters.search}
                                onChange={(e) => handleFilterChange("search", e.target.value)}
                                className="pl-10 h-11"
                            />
                            {filters.search && (
                                <button
                                    onClick={() => handleFilterChange("search", "")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-1 w-full sm:w-auto">
                            <Sheet>
                                <SheetTrigger
                                    render={
                                        <Button
                                            variant="outline"
                                            className="lg:hidden gap-2 flex-1 sm:flex-none h-11"
                                        >
                                            <Filter className="h-4 w-4" /> Filters
                                        </Button>
                                    }
                                />
                                <SheetContent side="left" className="w-80 overflow-y-auto pt-2">
                                    <SheetHeader className="border-b border-border pb-4 mb-4">
                                        <SheetTitle>Filter Tools</SheetTitle>
                                    </SheetHeader>

                                    {/* Mobile categories with icons */}
                                    <div className="space-y-1 px-3">
                                        <button
                                            onClick={() => handleFilterChange("category", "all")}
                                            className={cn(
                                                "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                                                filters.category === "all"
                                                    ? "bg-primary/10 text-primary font-medium"
                                                    : "hover:bg-muted text-muted-foreground",
                                            )}
                                        >
                                            <span className="flex items-center gap-2">
                                                <Sparkles className="h-4 w-4" /> All Tools
                                            </span>
                                            <Badge variant="secondary">
                                                {toolMetadataList.length}
                                            </Badge>
                                        </button>
                                        {allCategories.map((category) => {
                                            const count = categoryCounts[category] || 0;
                                            if (count === 0) return null;
                                            const Icon = getCategoryIcon(category);
                                            return (
                                                <button
                                                    key={category}
                                                    onClick={() =>
                                                        handleFilterChange("category", category)
                                                    }
                                                    className={cn(
                                                        "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors capitalize",
                                                        filters.category === category
                                                            ? "bg-primary/10 text-primary font-medium"
                                                            : "hover:bg-muted text-muted-foreground",
                                                    )}
                                                >
                                                    <span className="flex items-center gap-2">
                                                        <Icon className="h-4 w-4" />
                                                        {category}
                                                    </span>
                                                    <Badge variant="secondary">{count}</Badge>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>

                    <div className="text-sm text-muted-foreground mb-6">
                        Showing{" "}
                        <span className="font-medium text-foreground">{filteredTools.length}</span>{" "}
                        of{" "}
                        <span className="font-medium text-foreground">
                            {toolMetadataList.length}
                        </span>{" "}
                        tools
                    </div>

                    {filteredTools.length === 0 ? (
                        <div className="py-16 text-center border border-dashed border-border rounded-xl bg-muted/20">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                                <Search className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold">No tools found</h3>
                            <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                                Try adjusting your search or filters.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                            {filteredTools.map((tool) => (
                                <ToolCard key={tool.id} tool={tool} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
