"use client";

import { useState, useCallback } from "react";
import { Plus, X, Settings2 } from "lucide-react";
import { parseColor, generateScale, rgbToHex, type RGB } from "@sikandardevbusiness/css-toolkit";

import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ColorPlateCard } from "@/components/ui/color-plate-card";
import { ColorField } from "@/components/ui/color-field";

import type { BaseTool } from "@/features/tools/shared/types";

interface Entry {
    id: number;
    rgb: RGB;
}

const SEEDS = ["#24C172", "#3B82F6", "#EF4444", "#F59E0B", "#8B5CF6", "#06B6D4"];

export default function ColorPaletteClient({ tool }: { tool: BaseTool }) {
    const [entries, setEntries] = useState<Entry[]>([{ id: 0, rgb: parseColor("#24C172")! }]);

    const addEntry = () => {
        const seed = SEEDS[entries.length % SEEDS.length];
        setEntries((prev) => [...prev, { id: Date.now(), rgb: parseColor(seed)! }]);
    };

    const removeEntry = (id: number) => setEntries((prev) => prev.filter((e) => e.id !== id));

    // Single source of truth = rgb. Both swatch + input derive from it.
    const updateRgb = useCallback((id: number, rgb: RGB) => {
        setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, rgb } : e)));
    }, []);

    return (
        <ToolShell>
            <ToolHeader tool={tool}>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Settings2 className="h-4 w-4 text-primary" />
                            Color Palette Generator
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">
                            Enter any base color (HEX, RGB, HSL, CMYK, OKLCH) to generate a full
                            50–950 scale. Add multiple bases.
                        </p>
                    </CardHeader>

                    <CardContent>
                        <div className="flex flex-col gap-4">
                            {entries.map((e, i) => {
                                const canonical = rgbToHex(e.rgb); // live, derived
                                return (
                                    <div key={e.id} className="flex items-end gap-2">
                                        <div className="flex-1">
                                            <ColorField
                                                label={`Plate ${i + 1}`}
                                                value={canonical}
                                                swatch={canonical}
                                                onChange={(rgb) => updateRgb(e.id, rgb)}
                                                enableSystemPicker={true}
                                            />
                                        </div>
                                        {entries.length > 1 && (
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                className="h-9 w-9 shrink-0"
                                                onClick={() => removeEntry(e.id)}
                                                aria-label="Remove plate"
                                            >
                                                <X />
                                            </Button>
                                        )}
                                    </div>
                                );
                            })}

                            <Button
                                variant="outline"
                                size="lg"
                                onClick={addEntry}
                                className="w-full gap-2 border-dashed"
                            >
                                <Plus className="h-5 w-5" /> Add Color
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </ToolHeader>

            <div className="w-full max-w-7xl mx-auto md:px-8 px-4 pt-12 space-y-8">
                {entries.map((e, i) => (
                    <ColorPlateCard
                        key={e.id}
                        title={`Plate ${i + 1}`}
                        scale={generateScale(e.rgb)}
                    />
                ))}
            </div>
        </ToolShell>
    );
}
