"use client";

import { Maximize2, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ToolFullScreenProps {
    children: React.ReactNode;
    sidebar?: React.ReactNode;
    title?: string;
    className?: string;
    isFullScreen?: boolean;
    onToggleFullScreen?: () => void;
}

export function ToolFullScreen({
    children,
    sidebar,
    title,
    className,
    isFullScreen = false,
    onToggleFullScreen,
}: ToolFullScreenProps) {
    return (
        <div
            className={cn(
                "flex flex-col h-full bg-background",
                isFullScreen ? "fixed inset-0 z-50" : "relative",
                className,
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-20">
                {title && <h2 className="font-semibold text-lg">{title}</h2>}
                <div className="flex-1" />
                {onToggleFullScreen && (
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={onToggleFullScreen}
                        className="gap-2"
                    >
                        {isFullScreen ? (
                            <XIcon className="h-4 w-4" />
                        ) : (
                            <Maximize2 className="h-4 w-4" />
                        )}
                    </Button>
                )}
            </div>

            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden">
                {/* Canvas / Main View */}
                <div className="flex-1 overflow-auto bg-muted/30 relative flex items-start justify-center p-6">
                    {children}
                </div>

                {/* Sidebar */}
                {sidebar && (
                    <div className="w-80 border-l border-border bg-background overflow-y-auto shrink-0">
                        <div className="p-4 space-y-6">{sidebar}</div>
                    </div>
                )}
            </div>
        </div>
    );
}
