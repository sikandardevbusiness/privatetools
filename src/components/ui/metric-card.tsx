"use client";

import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

export type MetricCardVariant =
    "default" | "primary" | "success" | "warning" | "info" | "secondary";

export interface MetricCardProps {
    title: string;
    value: string | number;
    description?: string;
    trend?: { value: string; positive: boolean };
    icon?: LucideIcon;
    variant?: MetricCardVariant;
    className?: string;
    prefix?: string;
    suffix?: string;
    showTrendAsBadge?: boolean;
    compact?: boolean;
}

const variantStyles: Record<
    MetricCardVariant,
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
    info: {
        iconBg: "bg-blue-500/10",
        iconColor: "text-blue-500",
        border: "border-blue-500/20",
    },
    secondary: {
        iconBg: "bg-secondary",
        iconColor: "text-secondary-foreground",
        border: "border-border",
    },
};

export function MetricCard({
    title,
    value,
    description,
    trend,
    icon: Icon,
    variant = "default",
    className,
    prefix,
    suffix,
    showTrendAsBadge = false,
    compact = false,
}: MetricCardProps) {
    const style = variantStyles[variant];

    return (
        <div className={cn("bg-card rounded-lg border p-6 shadow-sm", className)}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-muted-foreground text-sm font-medium">{title}</p>
                    <div className="mt-2 flex items-baseline gap-1">
                        {prefix && <span className="text-muted-foreground text-lg">{prefix}</span>}
                        <p
                            className={cn(
                                compact ? "text-xl" : "text-2xl",
                                "font-bold tracking-tight",
                                style.valueColor || "text-foreground",
                            )}
                        >
                            {value}
                        </p>
                        {suffix && <span className="text-muted-foreground text-sm">{suffix}</span>}
                    </div>

                    {/* Trend display */}
                    {trend && !showTrendAsBadge && (
                        <span
                            className={cn(
                                "mt-1 inline-flex items-center text-xs font-medium",
                                trend.positive ? "text-primary" : "text-destructive",
                            )}
                        >
                            {trend.positive ? "↑" : "↓"} {trend.value}
                        </span>
                    )}
                    {trend && showTrendAsBadge && (
                        <span
                            className={cn(
                                "mt-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                                trend.positive
                                    ? "bg-emerald-500/10 text-emerald-600"
                                    : "bg-red-500/10 text-red-600",
                            )}
                        >
                            {trend.positive ? "↑" : "↓"} {trend.value}
                        </span>
                    )}
                    {!trend && description && (
                        <p className="text-muted-foreground mt-1 text-xs">{description}</p>
                    )}
                </div>

                {Icon && (
                    <div
                        className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-md",
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
