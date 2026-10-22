"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { memo } from "react";

export const PropSlider = memo(function PropSlider({
    label,
    value,
    onChange,
    min,
    max,
    step = 1,
    unit = "",
}: {
    label: string;
    value: number;
    onChange: (v: number) => void;
    min: number;
    max: number;
    step?: number;
    unit?: string;
}) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <Label className="text-[11px] font-medium text-muted-foreground">{label}</Label>
                <div className="flex items-center gap-1">
                    <Input
                        type="number"
                        value={value}
                        onChange={(e) => onChange(Number(e.target.value))}
                        min={min}
                        max={max}
                        step={step} // 👈 FIX: Added step prop to Input so arrows work correctly
                        className="w-16 h-6 text-[11px] text-right px-1.5"
                    />
                    {unit && (
                        <span className="text-[14px] text-muted-foreground w-5 pt-2">{unit}</span>
                    )}
                </div>
            </div>
            <Slider
                value={[value]}
                onValueChange={(val) => {
                    const nextVal = Array.isArray(val) ? val[0] : val;
                    if (typeof nextVal === "number") onChange(nextVal);
                }}
                min={min}
                max={max}
                step={step} // 👈 FIX: Ensure step is explicitly passed to Slider
                className="w-full"
            />
        </div>
    );
});
