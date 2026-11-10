"use client";

import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

type StatCardVariant = "default" | "success" | "warning" | "destructive" | "info" | "primary";

export interface StatCardProps {
    title: string;
    value: string | number;
    description?: string;
    trend?: { value: string; positive: boolean };
    icon?: LucideIcon;
    variant?: StatCardVariant;
    className?: string;
    prefix?: string; // ← Passed from parent (e.g., "₹")
    suffix?: string;
}

const variantStyles: Record<
    StatCardVariant,
    { iconBg: string; iconColor: string; border: string; valueColor?: string }
> = {
    default: {
        iconBg: "bg-muted",
        iconColor: "text-foreground",
        border: "border-border",
    },
    primary: {
        iconBg: "bg-primary/10",
        iconColor: "text-primary",
        border: "border-primary/20",
        valueColor: "text-primary",
    },
    success: {
        iconBg: "bg-emerald-500/10",
        iconColor: "text-emerald-500",
        border: "border-emerald-500/20",
        valueColor: "text-emerald-500",
    },
    warning: {
        iconBg: "bg-amber-500/10",
        iconColor: "text-amber-500",
        border: "border-amber-500/20",
    },
    destructive: {
        iconBg: "bg-red-500/10",
        iconColor: "text-red-500",
        border: "border-red-500/20",
    },
    info: {
        iconBg: "bg-blue-500/10",
        iconColor: "text-blue-500",
        border: "border-blue-500/20",
    },
};

export function StatCard({
    title,
    value,
    description,
    trend,
    icon: Icon,
    variant = "default",
    className,
    prefix,
    suffix,
}: StatCardProps) {
    const style = variantStyles[variant];

    return (
        <div className={cn("bg-card rounded-lg border p-6 shadow-sm", style.border, className)}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-muted-foreground text-sm font-medium">{title}</p>
                    <div className="mt-2 flex items-baseline gap-1">
                        {prefix && <span className="text-muted-foreground text-lg">{prefix}</span>}
                        <p
                            className={cn(
                                "text-2xl font-bold tracking-tight",
                                style.valueColor || "text-foreground",
                            )}
                        >
                            {value}
                        </p>
                        {suffix && <span className="text-muted-foreground text-sm">{suffix}</span>}
                    </div>

                    {/* ✅ Show trend OR description — not both */}
                    {trend ? (
                        <span
                            className={cn(
                                "mt-1 inline-flex items-center text-xs font-medium",
                                trend.positive ? "text-primary" : "text-destructive",
                            )}
                        >
                            {trend.positive ? "↑" : "↓"} {trend.value}
                        </span>
                    ) : description ? (
                        <p className="text-muted-foreground mt-1 text-xs">{description}</p>
                    ) : null}
                </div>

                {Icon && (
                    <div
                        className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-md",
                            style.iconBg,
                        )}
                    >
                        <Icon className={cn("h-4.5 w-4.5", style.iconColor)} />
                    </div>
                )}
            </div>
        </div>
    );
}
