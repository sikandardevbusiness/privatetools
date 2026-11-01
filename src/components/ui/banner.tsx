"use client";

import { cn } from "@/lib/utils";

export interface BannerProps {
    className?: string;
    message: React.ReactNode;
    variant?: "primary" | "warning" | "info" | "default";
}

const variantStyles = {
    primary: "bg-primary/80 text-primary-foreground",
    warning: "bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-black font-semibold",
    info: "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-b border-blue-500/20",
    default: "bg-muted text-muted-foreground border-b",
};

export function Banner({ variant = "primary", message, className }: BannerProps) {
    return (
        <div className={cn("w-full py-3 px-4", variantStyles[variant], className)}>
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm">
                <span className="text-center leading-snug">{message}</span>
            </div>
        </div>
    );
}
