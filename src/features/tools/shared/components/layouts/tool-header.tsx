import { Badge } from "@/components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { BaseTool } from "@/features/tools/shared/types";

interface ToolHeaderProps {
    tool: BaseTool;
}

export function ToolHeader({ tool }: ToolHeaderProps) {
    const categoryLabel = tool.category.charAt(0).toUpperCase() + tool.category.slice(1);

    return (
        <div className="border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-4">
                {/* Breadcrumb Navigation */}
                <div>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                {/* ✅ FIX: Pass href directly. No nested <Link> needed. */}
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/tools">All Tools</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    href={`/tools?category=${tool.category}`}
                                    className="capitalize"
                                >
                                    {categoryLabel} Tools
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{tool.name}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                {/* Hero Section */}
                <div className="max-w-3xl">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                        {tool.name}
                    </h1>
                    <p className="text-lg text-muted-foreground mb-6">{tool.description}</p>

                    {/* Tags Section */}
                    {tool.tags && tool.tags.length > 0 && (
                        <div className="mb-8">
                            <div className="flex flex-wrap gap-2">
                                {tool.tags.map((tag, index) => (
                                    <Badge key={index} variant="secondary" className="capitalize">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Privacy Notice */}
                    {tool.longDescription && (
                        <div className="p-4 rounded-xl bg-muted/50 border border-border">
                            <p className="text-sm text-muted-foreground">
                                <strong className="text-foreground">{tool.name}</strong> by
                                PrivateTools is a 100% free, client-side browser utility. It
                                processes your files locally on your computer or smartphone using
                                HTML5 and Web Workers—zero bytes of your files or data are ever
                                uploaded to any external server.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
