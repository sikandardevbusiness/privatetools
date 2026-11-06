"use client";

import { Maximize2, SlidersHorizontal, XIcon, PanelRight, PanelRightClose } from "lucide-react";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    useEffect(() => {
        if (isFullScreen) {
            document.documentElement.classList.add("overflow-y-hidden");
            document.body.classList.add("overflow-y-hidden");
        } else {
            document.documentElement.classList.remove("overflow-y-hidden");
            document.body.classList.remove("overflow-y-hidden");
        }

        return () => {
            document.documentElement.classList.remove("overflow-y-hidden");
            document.body.classList.remove("overflow-y-hidden");
        };
    }, [isFullScreen]);

    return (
        <div
            className={cn(
                "flex flex-col bg-background",
                isFullScreen ? "fixed inset-0 z-50" : "relative",
                className,
            )}
        >
            {/* Header - Fixed at top */}
            <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-border bg-background/80 backdrop-blur-sm shrink-0">
                <div className="flex items-center gap-3">
                    {title && <h2 className="font-semibold text-lg">{title}</h2>}
                </div>

                <div className="flex-1" />

                {/* ✅ Toggle Sidebar Button (Desktop Only) */}
                {sidebar && (
                    <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
                        className="hidden md:flex mr-2"
                        title={isSidebarVisible ? "Hide toolbar" : "Show toolbar"}
                    >
                        {isSidebarVisible ? (
                            <PanelRightClose className="h-4 w-4" />
                        ) : (
                            <PanelRight className="h-4 w-4" />
                        )}
                    </Button>
                )}

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

            {/* Main Content Area with ScrollArea */}
            <div className="flex flex-1 overflow-hidden">
                <ScrollArea
                    className={cn(
                        "flex-1 bg-muted/30 relative transition-all duration-300",
                        sidebar && isSidebarVisible ? "md:mr-0" : "",
                    )}
                >
                    <div className="p-4 md:p-6 min-h-full">{children}</div>
                </ScrollArea>

                {/* Desktop Sidebar - Conditionally rendered */}
                {sidebar && isSidebarVisible && (
                    <div className="hidden md:block w-80 border-l border-border bg-background shrink-0">
                        <ScrollArea className="h-full">
                            <div className="p-4 space-y-6">{sidebar}</div>
                        </ScrollArea>
                    </div>
                )}
            </div>

            {/* Mobile Sticky Bottom Navbar */}
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
                            <ScrollArea className="h-[calc(100%-73px)]">
                                <div className="p-4">{sidebar}</div>
                            </ScrollArea>
                        </SheetContent>
                    </Sheet>
                </div>
            )}
        </div>
    );
}
