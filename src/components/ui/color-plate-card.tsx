"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import {
    type Swatch,
    type ColorFormat,
    hexToRgb,
    formatColor,
} from "@sikandardevbusiness/css-toolkit";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface ColorPlateCardProps {
    title: string;
    scale: Swatch[];
    view?: "grid" | "list";
}

const FORMATS: ColorFormat[] = ["hex", "rgb", "hsl", "cmyk", "oklch"];

export function ColorPlateCard({ title, scale, view = "grid" }: ColorPlateCardProps) {
    const [copied, setCopied] = useState<string | null>(null);
    const [format, setFormat] = useState<ColorFormat>("hex");

    const display = (s: Swatch) => formatColor(hexToRgb(s.hex), format);

    const copy = async (text: string, key: string) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch {
            const ta = document.createElement("textarea");
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
        }
        setCopied(key);
        setTimeout(() => setCopied(null), 1200);
    };

    const copyAll = () => {
        const slug = title.toLowerCase().replace(/\s+/g, "-");
        const css = scale.map((s) => `  --${slug}-${s.label}: ${display(s)};`).join("\n");
        copy(`:root {\n${css}\n}`, "all");
    };

    return (
        <Card>
            <CardHeader
                className={cn(
                    "flex flex-col gap-3 pb-3 flex-wrap justify-between",
                    view === "grid" ? "flex-row" : "flex-col",
                )}
            >
                <CardTitle className="text-sm font-semibold">{title}</CardTitle>
                <div className="flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto">
                    <Select value={format} onValueChange={(v) => v && setFormat(v as ColorFormat)}>
                        <SelectTrigger className="text-xs">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {FORMATS.map((f) => (
                                <SelectItem key={f} value={f} className="text-xs">
                                    {f.toUpperCase()}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" onClick={copyAll} className="h-8 gap-1.5">
                        {copied === "all" ? <Check className="text-emerald-500" /> : <Copy />}
                        Copy Full Plate
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="@container">
                {view === "grid" ? (
                    <div
                        className={cn(
                            "grid gap-2",
                            "grid-cols-4 @md:grid-cols-6 @3xl:grid-cols-11",
                        )}
                    >
                        {scale.map((s) => {
                            const value = display(s);
                            return (
                                <button
                                    key={s.label}
                                    onClick={() => copy(value, String(s.label))}
                                    className="group flex flex-col items-center gap-1.5"
                                    title={value}
                                >
                                    <div
                                        className="relative w-full aspect-square rounded-md border border-border/50 transition-transform group-hover:scale-105"
                                        style={{ backgroundColor: s.hex }}
                                    >
                                        <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                                            {copied === String(s.label) ? (
                                                <Check className="h-4 w-4 text-white drop-shadow" />
                                            ) : (
                                                <Copy className="h-4 w-4 text-white drop-shadow" />
                                            )}
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-mono text-muted-foreground">
                                        {s.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    <div
                        className={cn(
                            "flex gap-1.5 overflow-y-auto pr-1",
                            view === "list" ? "flex-col" : "flex-row",
                        )}
                    >
                        {scale.map((s) => {
                            const value = display(s);
                            return (
                                <button
                                    key={s.label}
                                    onClick={() => copy(value, String(s.label))}
                                    className="group flex items-center gap-3 rounded-md border border-border/50 p-1.5 text-left transition-colors hover:bg-muted/40"
                                    title={value}
                                >
                                    <span
                                        className="h-7 w-7 shrink-0 rounded border border-border/50"
                                        style={{ backgroundColor: s.hex }}
                                    />
                                    <span className="w-8 shrink-0 text-[11px] font-mono text-muted-foreground">
                                        {s.label}
                                    </span>
                                    <span className="flex-1 truncate font-mono text-xs text-foreground">
                                        {value}
                                    </span>
                                    <span className="shrink-0 text-muted-foreground group-hover:text-foreground">
                                        {copied === String(s.label) ? (
                                            <Check className="h-3.5 w-3.5 text-emerald-500" />
                                        ) : (
                                            <Copy className="h-3.5 w-3.5" />
                                        )}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
