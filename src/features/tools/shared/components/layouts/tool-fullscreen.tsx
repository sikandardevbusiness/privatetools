"use client";

import { Maximize2, SlidersHorizontal, XIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
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
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    return (
        <div
            className={cn(
                "flex flex-col h-full bg-background",
                isFullScreen ? "fixed inset-0 z-50" : "relative",
                className,
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-20">
                <div className="flex items-center gap-3">
                    {title && <h2 className="font-semibold text-lg">{title}</h2>}
                </div>

                <div className="flex-1" />

                {onToggleFullScreen && (
                    <Button variant="outline" size="icon" onClick={onToggleFullScreen}>
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
                {/* Canvas / Main View - Added pb-24 md:pb-6 to prevent overlap with mobile bottom bar */}
                <div className="flex-1 overflow-auto bg-muted/30 relative flex items-start justify-center p-4 md:p-6 pb-24 md:pb-6">
                    {children}
                </div>

                {/* Desktop Sidebar - Hidden on mobile/tablet */}
                {sidebar && (
                    <div className="hidden md:block w-80 border-l border-border bg-background overflow-y-auto shrink-0">
                        <div className="p-4 space-y-6">{sidebar}</div>
                    </div>
                )}
            </div>

            {/* Mobile Sticky Bottom Navbar (Accordion-style Bottom Sheet) */}
            {sidebar && (
                <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-md p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                        <SheetTrigger
                            render={
                                <Button
                                    variant="default"
                                    className="w-full gap-2 h-12 text-base font-medium shadow-lg"
                                >
                                    <SlidersHorizontal className="h-5 w-5" />
                                    Adjust Settings
                                </Button>
                            }
                        />
                        <SheetContent side="bottom" className="w-full h-[85vh]">
                            <SheetHeader className="px-6 py-4 border-b border-border flex flex-row items-center justify-between sticky top-0 bg-background z-10">
                                <SheetTitle className="text-lg">Settings</SheetTitle>
                            </SheetHeader>
                            <div className="p-4 overflow-y-auto h-[calc(100%-73px)]">{sidebar}</div>
                        </SheetContent>
                    </Sheet>
                </div>
            )}
        </div>
    );
}
