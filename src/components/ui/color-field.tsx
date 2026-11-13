"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Check } from "lucide-react";
import { type RGB, parseColor, hexToRgb } from "@sikandardevbusiness/css-toolkit";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ColorFieldProps {
    label: string;
    value: string;
    swatch: string; // always a valid CSS color (hex) for the preview dot
    onChange: (rgb: RGB) => void;
    enableSystemPicker?: boolean; // Default false, set to true to allow clicking the swatch
}

export function ColorField({
    label,
    value,
    swatch,
    onChange,
    enableSystemPicker = false,
}: ColorFieldProps) {
    const [draft, setDraft] = useState(value);
    const [focused, setFocused] = useState(false);
    const [copied, setCopied] = useState(false);
    const nativeColorRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (!focused) setDraft(value);
    }, [value, focused]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
        } catch {
            const ta = document.createElement("textarea");
            ta.value = value;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
    };

    const handleSystemColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const hex = e.target.value;
        const parsed = hexToRgb(hex);
        if (parsed) {
            onChange(parsed);
        }
    };

    const triggerSystemPicker = () => {
        if (enableSystemPicker && nativeColorRef.current) {
            nativeColorRef.current.click();
        }
    };

    return (
        <div className="space-y-1.5">
            <Label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                {label}
            </Label>
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <div
                        className={`absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 rounded border border-border shrink-0 shadow-sm ${
                            enableSystemPicker
                                ? "cursor-pointer hover:opacity-80 transition-opacity"
                                : ""
                        }`}
                        style={{ backgroundColor: swatch }}
                        onClick={triggerSystemPicker}
                        title={enableSystemPicker ? "Open system color picker" : undefined}
                    />
                    {/* Hidden native color picker */}
                    <input
                        ref={nativeColorRef}
                        type="color"
                        value={swatch}
                        onChange={handleSystemColorChange}
                        className="sr-only"
                    />
                    <Input
                        value={draft}
                        onChange={(e) => {
                            setDraft(e.target.value);
                            const parsed = parseColor(e.target.value);
                            if (parsed) onChange(parsed);
                        }}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        className="h-9 pl-8 font-mono text-sm"
                        spellCheck={false}
                    />
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 shrink-0"
                    onClick={handleCopy}
                >
                    {copied ? (
                        <Check className="h-4 w-4 text-emerald-500" />
                    ) : (
                        <Copy className="h-4 w-4" />
                    )}
                </Button>
            </div>
        </div>
    );
}
