"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import * as React from "react";

interface ColorPickerProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export function ColorPicker({ value, onChange, className }: ColorPickerProps) {
    const inputRef = React.useRef<HTMLInputElement>(null);

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <div
                className="h-9 w-9 rounded-lg border border-input cursor-pointer overflow-hidden"
                style={{ backgroundColor: value }}
                onClick={() => inputRef.current?.click()}
            />
            <Input
                ref={inputRef}
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-20 h-9 p-1 cursor-pointer"
            />
            <Input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="#FFFFFF"
                className="w-24 h-9 uppercase"
            />
        </div>
    );
}
