"use client";

import { useState, useRef, useCallback } from "react";
import { Settings2, Plus, X, Copy, Check } from "lucide-react";
import {
    rgbToHex,
    parseColor,
    generateGradientCSS,
    generateRampCSS,
    type GradientType,
    type GradientShape,
    type GradientPosition,
} from "@sikandardevbusiness/css-toolkit";

import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PropSlider } from "@/components/ui/prop-slider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import type { BaseTool } from "@/features/tools/shared/types";

interface ColorStop {
    id: string;
    color: string;
    position: number;
}

const TYPES: { value: GradientType; label: string }[] = [
    { value: "linear", label: "Linear" },
    { value: "radial", label: "Radial" },
    { value: "conic", label: "Conic" },
    { value: "repeating-linear", label: "Repeating Linear" },
    { value: "repeating-radial", label: "Repeating Radial" },
    { value: "repeating-conic", label: "Repeating Conic" },
];

const SHAPES: GradientShape[] = ["circle", "ellipse"];
const POSITIONS: GradientPosition[] = [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top left",
    "top right",
    "bottom left",
    "bottom right",
];

export default function GradientGeneratorClient({ tool }: { tool: BaseTool }) {
    const [type, setType] = useState<GradientType>("linear");
    const [angle, setAngle] = useState<number>(90);
    const [shape, setShape] = useState<GradientShape>("circle");
    const [position, setPosition] = useState<GradientPosition>("center");
    const [stops, setStops] = useState<ColorStop[]>([
        { id: "1", color: "#24C172", position: 0 },
        { id: "2", color: "#3B82F6", position: 100 },
    ]);
    const [selectedId, setSelectedId] = useState<string>("1");
    const [copied, setCopied] = useState(false);

    const rampRef = useRef<HTMLDivElement>(null);

    const hasAngle =
        type === "linear" ||
        type === "conic" ||
        type === "repeating-linear" ||
        type === "repeating-conic";
    const hasShape = type === "radial" || type === "repeating-radial";
    const hasPosition = type !== "linear" && type !== "repeating-linear";

    // Display order = left→right by position. ids stay stable; we never re-sort the source array.
    const sortedStops = [...stops].sort((a, b) => a.position - b.position);

    const pctFromClientX = useCallback((clientX: number) => {
        const el = rampRef.current;
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        return Math.max(0, Math.min(100, Math.round(((clientX - r.left) / r.width) * 100)));
    }, []);

    const addStop = (atPosition?: number) => {
        const id = Date.now().toString();
        setStops((prev) => [...prev, { id, color: "#000000", position: atPosition ?? 50 }]);
        setSelectedId(id);
    };

    const removeStop = (id: string) => {
        if (stops.length <= 2) return;
        const next = stops.filter((s) => s.id !== id);
        setStops(next);
        if (selectedId === id) setSelectedId(next[0]?.id ?? "");
    };

    const updateStop = (id: string, field: "color" | "position", value: string | number) => {
        setStops((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
    };

    const handleRampClick = (e: React.MouseEvent) => {
        if (e.target === rampRef.current) addStop(pctFromClientX(e.clientX));
    };

    const startDrag = (e: React.PointerEvent, id: string) => {
        e.stopPropagation();
        setSelectedId(id);
        const el = e.currentTarget as HTMLElement;
        el.setPointerCapture(e.pointerId);
        const move = (ev: PointerEvent) => updateStop(id, "position", pctFromClientX(ev.clientX));
        const up = () => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerup", up);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerup", up);
    };

    const css = generateGradientCSS(type, angle, stops, { shape, position });

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(css);
        } catch {
            const ta = document.createElement("textarea");
            ta.value = css;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <ToolShell>
            <ToolHeader tool={tool}>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Settings2 className="h-4 w-4 text-primary" />
                            CSS Gradient Generator
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">
                            Drag the numbered handles on the ramp, or edit each stop below. Click
                            the ramp to add a stop.
                        </p>
                    </CardHeader>

                    <CardContent className="space-y-5">
                        {/* Big live preview */}
                        <div
                            className="w-full h-40 rounded-lg border border-border transition-all"
                            style={{ background: css }}
                        />

                        {/* Draggable ramp editor (numbered handles) */}
                        <div className="space-y-2">
                            <Label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                                Gradient Ramp
                            </Label>
                            <div
                                ref={rampRef}
                                onClick={handleRampClick}
                                className="relative w-full h-10 rounded-lg border border-border cursor-copy touch-none"
                                style={{ background: generateRampCSS(stops) }}
                            >
                                {sortedStops.map((s, i) => (
                                    <button
                                        key={s.id}
                                        onPointerDown={(e) => startDrag(e, s.id)}
                                        className={cn(
                                            "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 rounded-full border-2 shadow grid place-items-center cursor-grab active:cursor-grabbing text-[10px] font-bold",
                                            selectedId === s.id
                                                ? "ring-2 ring-foreground border-white"
                                                : "border-white",
                                        )}
                                        style={{ left: `${s.position}%`, backgroundColor: s.color }}
                                        aria-label={`Stop ${i + 1} at ${s.position}%`}
                                    >
                                        <span
                                            className={cn(
                                                "drop-shadow",
                                                isDark(s.color) ? "text-white" : "text-black",
                                            )}
                                        >
                                            {i + 1}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Per-stop editor rows (each numbered, each with own remove) */}
                        <div className="space-y-2">
                            <Label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                                Color Stops
                            </Label>
                            {sortedStops.map((s, i) => (
                                <div
                                    key={s.id}
                                    className="flex items-center gap-3 p-2 rounded-md border border-border bg-muted/20"
                                >
                                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-background border border-border text-[11px] font-bold text-muted-foreground">
                                        {i + 1}
                                    </span>
                                    <div className="relative shrink-0">
                                        <input
                                            type="color"
                                            value={s.color}
                                            onChange={(e) =>
                                                updateStop(
                                                    s.id,
                                                    "color",
                                                    e.target.value.toUpperCase(),
                                                )
                                            }
                                            className="absolute inset-0 h-8 w-8 opacity-0 cursor-pointer"
                                        />
                                        <span
                                            className="block h-8 w-8 rounded border border-border"
                                            style={{ backgroundColor: s.color }}
                                        />
                                    </div>
                                    <Input
                                        value={s.color.toUpperCase()}
                                        onChange={(e) => {
                                            const parsed = parseColor(e.target.value);
                                            if (parsed) updateStop(s.id, "color", rgbToHex(parsed));
                                        }}
                                        className="h-8 w-28 font-mono text-xs"
                                        spellCheck={false}
                                    />
                                    <div className="flex items-center gap-1 ml-auto">
                                        <Input
                                            type="number"
                                            min={0}
                                            max={100}
                                            value={s.position}
                                            onChange={(e) =>
                                                updateStop(
                                                    s.id,
                                                    "position",
                                                    Math.max(
                                                        0,
                                                        Math.min(100, Number(e.target.value)),
                                                    ),
                                                )
                                            }
                                            className="h-8 w-16 text-center text-xs"
                                        />
                                        <span className="text-xs text-muted-foreground">%</span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                                        onClick={() => removeStop(s.id)}
                                        disabled={stops.length <= 2}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>

                        {/* Controls — single row, columns adapt to type */}
                        <div
                            className={cn(
                                "grid grid-cols-1 gap-4 p-4 rounded-lg border border-border bg-muted/20",
                                hasPosition ? "sm:grid-cols-3" : "sm:grid-cols-2",
                            )}
                        >
                            <div className="space-y-1.5">
                                <Label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                                    Type
                                </Label>
                                <Select
                                    value={type}
                                    onValueChange={(v) => setType(v as GradientType)}
                                >
                                    <SelectTrigger className="w-full h-9">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="w-full">
                                        {TYPES.map((t) => (
                                            <SelectItem key={t.value} value={t.value}>
                                                {t.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {hasAngle && (
                                <PropSlider
                                    label="Angle"
                                    value={angle}
                                    onChange={setAngle}
                                    min={0}
                                    max={360}
                                    step={1}
                                    unit="°"
                                />
                            )}

                            {hasShape && (
                                <div className="space-y-1.5">
                                    <Label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                                        Shape
                                    </Label>
                                    <Select
                                        value={shape}
                                        onValueChange={(v) => setShape(v as GradientShape)}
                                    >
                                        <SelectTrigger className="w-full h-9">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="w-full">
                                            {SHAPES.map((s) => (
                                                <SelectItem key={s} value={s}>
                                                    {s}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            {hasPosition && (
                                <div className="space-y-1.5">
                                    <Label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                                        Position
                                    </Label>
                                    <Select
                                        value={position}
                                        onValueChange={(v) => setPosition(v as GradientPosition)}
                                    >
                                        <SelectTrigger className="w-full h-9">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="w-full">
                                            {POSITIONS.map((p) => (
                                                <SelectItem key={p} value={p}>
                                                    {p}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>

                        {/* Bigger Add button */}
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => addStop()}
                            disabled={stops.length >= 10}
                            className="w-full gap-2 border-dashed"
                        >
                            <Plus className="h-5 w-5" /> Add Stop
                        </Button>

                        {/* Output */}
                        <div className="space-y-1.5">
                            <Label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                                CSS Output
                            </Label>
                            <div className="relative">
                                <pre className="p-3 pr-24 rounded-lg bg-muted/50 border border-border font-mono text-xs text-foreground break-all whitespace-pre-wrap">
                                    {css}
                                </pre>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="absolute top-2 right-2"
                                    onClick={handleCopy}
                                >
                                    {copied ? (
                                        <Check className="h-4 w-4 mr-1 text-emerald-500" />
                                    ) : (
                                        <Copy className="h-4 w-4 mr-1" />
                                    )}
                                    Copy
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </ToolHeader>
        </ToolShell>
    );
}

// small helper for handle number contrast
function isDark(hex: string): boolean {
    const c = hex.replace("#", "");
    const r = parseInt(c.slice(0, 2), 16);
    const g = parseInt(c.slice(2, 4), 16);
    const b = parseInt(c.slice(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}
