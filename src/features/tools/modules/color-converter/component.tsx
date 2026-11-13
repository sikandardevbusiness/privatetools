"use client";

import { useRef, useState } from "react";
import { Settings2 } from "lucide-react";
import {
    type RGB,
    hexToRgb,
    rgbToHex,
    rgbToHsl,
    rgbToCmyk,
    rgbToOklch,
    hslToRgb,
} from "@sikandardevbusiness/css-toolkit";

import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { BaseTool } from "@/features/tools/shared/types";
import { ColorField } from "@/components/ui/color-field";

const round2 = (n: number) => Math.round(n * 100) / 100;

export default function ColorConverterClient({ tool }: { tool: BaseTool }) {
    const seed = rgbToHsl({ r: 99, g: 102, b: 241 });
    const [hue, setHue] = useState(seed.h);
    const [sat, setSat] = useState(seed.s);
    const [light, setLight] = useState(seed.l);

    const nativeRef = useRef<HTMLInputElement>(null);
    const satRef = useRef<HTMLDivElement>(null);
    const hueRef = useRef<HTMLDivElement>(null);

    const rgb: RGB = hslToRgb(hue, sat, light);
    const hexValue = rgbToHex(rgb);

    const rgbValue = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    const hslValue = `hsl(${hue}, ${sat}%, ${light}%)`;
    const cmyk = rgbToCmyk(rgb);
    const cmykValue = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
    const oklch = rgbToOklch(rgb);
    const oklchValue = `oklch(${oklch.l} ${oklch.c} ${oklch.h})`;

    const applyColorFromInput = (next: RGB) => {
        const c = rgbToHsl(next);
        setSat(c.s);
        setLight(c.l);
        if (c.s > 0 && c.l > 0 && c.l < 100) setHue(c.h);
    };

    const updateSat = (clientX: number, clientY: number) => {
        const el = satRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
        const y = Math.max(0, Math.min(1, (clientY - r.top) / r.height));
        setSat(round2(x * 100));
        setLight(round2((1 - y) * 100));
    };

    const updateHue = (clientX: number) => {
        const el = hueRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
        setHue(Math.round(x * 360));
    };

    return (
        <ToolShell>
            <ToolHeader tool={tool}>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Settings2 className="h-4 w-4 text-primary" />
                            Color Converter
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">
                            Edit any field or pick a color — every format stays in sync. 100% local,
                            zero uploads.
                        </p>
                    </CardHeader>

                    <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch gap-6">
                            <div className="flex flex-col gap-3">
                                <div
                                    ref={satRef}
                                    className="relative w-full flex-1 min-h-40 rounded-lg cursor-crosshair border border-border select-none touch-none"
                                    style={{
                                        background: `linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,hsl(${hue},100%,50%))`,
                                    }}
                                    onPointerDown={(e) => {
                                        e.currentTarget.setPointerCapture(e.pointerId);
                                        updateSat(e.clientX, e.clientY);
                                    }}
                                    onPointerMove={(e) => {
                                        if (e.buttons) updateSat(e.clientX, e.clientY);
                                    }}
                                    onPointerUp={(e) =>
                                        e.currentTarget.releasePointerCapture(e.pointerId)
                                    }
                                >
                                    <div
                                        className="absolute w-4 h-4 rounded-full border-2 border-white shadow -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                        style={{ left: `${sat}%`, top: `${100 - light}%` }}
                                    />
                                </div>

                                <div
                                    ref={hueRef}
                                    className="relative w-full h-3 rounded-full cursor-pointer border border-border select-none touch-none"
                                    style={{
                                        background:
                                            "linear-gradient(to right,#f00,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,#f00)",
                                    }}
                                    onPointerDown={(e) => {
                                        e.currentTarget.setPointerCapture(e.pointerId);
                                        updateHue(e.clientX);
                                    }}
                                    onPointerMove={(e) => {
                                        if (e.buttons) updateHue(e.clientX);
                                    }}
                                    onPointerUp={(e) =>
                                        e.currentTarget.releasePointerCapture(e.pointerId)
                                    }
                                >
                                    <div
                                        className="absolute top-1/2 w-3.5 h-3.5 rounded-full border-2 border-white shadow -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                        style={{ left: `${(hue / 360) * 100}%` }}
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={() => nativeRef.current?.click()}
                                    className="flex items-center gap-2 w-full rounded-md border border-border px-3 py-2 hover:bg-muted/50 transition-colors shrink-0"
                                >
                                    <span
                                        className="h-5 w-5 rounded shrink-0 border border-border"
                                        style={{ backgroundColor: hexValue }}
                                    />
                                    <span className="text-xs text-muted-foreground">
                                        Open system color picker
                                    </span>
                                    <input
                                        ref={nativeRef}
                                        type="color"
                                        value={hexValue}
                                        onChange={(e) =>
                                            applyColorFromInput(hexToRgb(e.target.value))
                                        }
                                        className="sr-only"
                                    />
                                </button>
                            </div>

                            <div className="space-y-3">
                                <ColorField
                                    label="HEX"
                                    value={hexValue}
                                    swatch={hexValue}
                                    onChange={applyColorFromInput}
                                />
                                <ColorField
                                    label="RGB"
                                    value={rgbValue}
                                    swatch={hexValue}
                                    onChange={applyColorFromInput}
                                />
                                <ColorField
                                    label="HSL"
                                    value={hslValue}
                                    swatch={hexValue}
                                    onChange={applyColorFromInput}
                                />
                                <ColorField
                                    label="CMYK"
                                    value={cmykValue}
                                    swatch={hexValue}
                                    onChange={applyColorFromInput}
                                />
                                <ColorField
                                    label="OKLCH"
                                    value={oklchValue}
                                    swatch={hexValue}
                                    onChange={applyColorFromInput}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </ToolHeader>
        </ToolShell>
    );
}
