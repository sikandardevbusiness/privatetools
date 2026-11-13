"use client";

import { useState, useCallback } from "react";
import { Settings2, Check, X, Sparkles } from "lucide-react";
import {
    rgbToHex,
    parseColor,
    calculateContrast,
    findAccessibleColor,
    maxContrastRatio,
    type RGB,
} from "@sikandardevbusiness/css-toolkit";

import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ColorField } from "@/components/ui/color-field";

import type { BaseTool } from "@/features/tools/shared/types";

const PASS_EXAMPLE = { fg: "#0F172A", bg: "#24C172" };
const FAIL_EXAMPLE = { fg: "#7C3131", bg: "#567666" };

function ResultRow({ label, req, pass }: { label: string; req: string; pass: boolean }) {
    return (
        <div className="flex items-center justify-between px-4 py-2.5">
            <div className="flex items-baseline gap-2">
                <span className="text-sm font-medium text-foreground">{label}</span>
                <span className="text-xs text-muted-foreground">{req}</span>
            </div>
            <span
                className={`inline-flex items-center gap-1 text-sm font-semibold ${
                    pass ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"
                }`}
            >
                {pass ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                {pass ? "Pass" : "Fail"}
            </span>
        </div>
    );
}

export default function ContrastCheckerClient({ tool }: { tool: BaseTool }) {
    const [fgHex, setFgHex] = useState(PASS_EXAMPLE.fg);
    const [bgHex, setBgHex] = useState(PASS_EXAMPLE.bg);

    const fg = parseColor(fgHex) ?? { r: 0, g: 0, b: 0 };
    const bg = parseColor(bgHex) ?? { r: 255, g: 255, b: 255 };
    const result = calculateContrast(fg, bg);
    const ceiling = maxContrastRatio(bg);

    const updateFg = useCallback((rgb: RGB) => setFgHex(rgbToHex(rgb)), []);
    const updateBg = useCallback((rgb: RGB) => setBgHex(rgbToHex(rgb)), []);

    // Tier definitions: [label, threshold, passes?]
    const tiers = [
        { key: "aaNormal", label: "AA · Normal", req: "≥ 4.5", target: 4.5, pass: result.aaNormal },
        { key: "aaLarge", label: "AA · Large", req: "≥ 3.0", target: 3, pass: result.aaLarge },
        {
            key: "aaaNormal",
            label: "AAA · Normal",
            req: "≥ 7.0",
            target: 7,
            pass: result.aaaNormal,
        },
        { key: "aaaLarge", label: "AAA · Large", req: "≥ 4.5", target: 4.5, pass: result.aaaLarge },
    ];

    const failingTiers = tiers.filter((t) => !t.pass);

    return (
        <ToolShell>
            <ToolHeader tool={tool}>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Settings2 className="h-4 w-4 text-primary" />
                            WCAG Contrast Checker
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">
                            Check foreground vs background contrast against WCAG 2.1. 100% local.
                        </p>
                    </CardHeader>

                    <CardContent className="space-y-5">
                        <div className="flex flex-wrap gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setFgHex(PASS_EXAMPLE.fg);
                                    setBgHex(PASS_EXAMPLE.bg);
                                }}
                            >
                                Pass example
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setFgHex(FAIL_EXAMPLE.fg);
                                    setBgHex(FAIL_EXAMPLE.bg);
                                }}
                            >
                                Fail example
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <ColorField
                                label="Foreground (Text)"
                                value={fgHex}
                                swatch={fgHex}
                                onChange={updateFg}
                                enableSystemPicker
                            />
                            <ColorField
                                label="Background"
                                value={bgHex}
                                swatch={bgHex}
                                onChange={updateBg}
                                enableSystemPicker
                            />
                        </div>

                        <div
                            className="rounded-lg border border-border p-6 text-center transition-colors"
                            style={{ backgroundColor: bgHex, color: fgHex }}
                        >
                            <p className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-2">
                                Live Preview
                            </p>
                            <p className="text-2xl font-bold mb-1">The quick brown fox jumps.</p>
                            <p className="text-sm opacity-90">
                                Body text sample — 1234567890 !@#$%^&*()
                            </p>
                        </div>

                        <div className="rounded-lg border border-border">
                            <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-3">
                                <span className="text-sm font-medium text-muted-foreground">
                                    Contrast ratio
                                </span>
                                <span className="text-xl font-bold text-foreground">
                                    {result.ratio.toFixed(2)}:1
                                </span>
                            </div>
                            <div className="divide-y divide-border">
                                {tiers.map((t) => (
                                    <ResultRow
                                        key={t.key}
                                        label={t.label}
                                        req={t.req}
                                        pass={t.pass}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Per-tier suggestions: Apply if reachable, honest note if not */}
                        {failingTiers.length > 0 && (
                            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-3">
                                <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                                    <Sparkles className="h-4 w-4 text-primary" />
                                    How to fix failing levels
                                </p>
                                <div className="space-y-2">
                                    {failingTiers.map((t) => {
                                        const safe = findAccessibleColor(fg, bg, t.target);
                                        if (safe) {
                                            return (
                                                <div
                                                    key={t.key}
                                                    className="flex items-center justify-between gap-3 rounded-md border border-border bg-card px-3 py-2"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span
                                                            className="h-5 w-5 rounded border border-border"
                                                            style={{ backgroundColor: safe }}
                                                        />
                                                        <span className="text-xs text-muted-foreground">
                                                            <b className="text-foreground">
                                                                {t.label}
                                                            </b>{" "}
                                                            → {safe}
                                                        </span>
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        variant="secondary"
                                                        className="h-7 px-2"
                                                        onClick={() => setFgHex(safe.toUpperCase())}
                                                    >
                                                        Apply
                                                    </Button>
                                                </div>
                                            );
                                        }
                                        return (
                                            <div
                                                key={t.key}
                                                className="flex items-center justify-between gap-3 rounded-md border border-border bg-card px-3 py-2"
                                            >
                                                <span className="text-xs text-muted-foreground">
                                                    <b className="text-foreground">{t.label}</b> not
                                                    achievable with this background.
                                                </span>
                                                <span className="text-[11px] font-mono text-muted-foreground whitespace-nowrap">
                                                    max {ceiling.toFixed(2)}:1
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </ToolHeader>
        </ToolShell>
    );
}
