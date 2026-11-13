import dynamic from "next/dynamic";
import type { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const colorPaletteToolMetadataList: BaseTool[] = [
    {
        id: "color-palette",
        category: "developer",
        name: "Color Palette Generator",
        createdAt: "2026-11-13",
        longName: "Free Color Palette Generator: Tailwind-style 50-950 Scales",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/69f2943099ab9fbfdda3ed4cc3ed3d925c019c43-1376x768.jpg",
        description:
            "Generate a full 50-950 color scale from any base color. Features live format switching (HEX, RGB, HSL, CMYK, OKLCH), system color picker.",
        longDescription:
            "The ultimate free, client-side Color Palette Generator for designers and developers. Enter any base color (HEX, RGB, HSL, CMYK, or OKLCH) and instantly get a complete, perceptually-balanced 50-950 color scale, exactly like Tailwind CSS and shadcn/ui. Features include a live-updating color swatch inside the input, one-click system color picker integration, and the ability to toggle the entire plate's output format. Unlike online tools, this generator runs 100% locally in your browser. Zero data uploads, zero tracking. Add multiple base colors to build entire design systems, and copy individual swatches or the full CSS custom-property block with one click.",
        tags: [
            "color palette generator",
            "tailwind color scale",
            "shadcn colors",
            "50-950 palette",
            "design system",
            "color scale generator",
            "live color sync",
        ],
        keywords: [
            "color palette generator online free",
            "tailwind color scale generator",
            "generate 50 to 950 color shades",
            "shadcn color palette generator",
            "hex to color scale generator",
            "design system color ramp tool",
            "free color shade generator no upload",
            "oklch color scale generator browser",
            "cmyk color palette generator",
            "live color picker palette tool",
        ],
        steps: [
            {
                title: "Enter or Pick a Base Color",
                description:
                    "Type any valid color (HEX, RGB, HSL, CMYK, OKLCH) into the base field, or click the color dot to open your system color picker. Click 'Add Color' to build multiple plates.",
            },
            {
                title: "View the Live 50-950 Scale",
                description:
                    "Each base instantly expands into a full 11-step Tailwind-style palette. The scale updates in real-time as you type or pick a new color.",
            },
            {
                title: "Switch Formats & Copy",
                description:
                    "Use the dropdown to toggle the plate's output between HEX, RGB, HSL, CMYK, or OKLCH. Click any swatch to copy it, or use 'Copy Full Plate' to grab the entire CSS variable block.",
            },
        ],
        whatToExpect: [
            {
                title: "100% Private & Local",
                description:
                    "All palette math runs in your browser. Your brand colors are never uploaded, tracked, or stored on any server.",
            },
            {
                title: "Live Real-Time Sync",
                description:
                    "The input's color swatch, text value, and the generated plate all stay perfectly synchronized as you type or use the system color picker.",
            },
            {
                title: "Flexible Output Formats",
                description:
                    "Toggle the entire palette's display and copy format between HEX, RGB, HSL, CMYK, and OKLCH with a single dropdown.",
            },
            {
                title: "Tailwind / shadcn Style",
                description:
                    "Generates the familiar 50-100-...-950 ramp so it drops straight into your existing design system or CSS variables.",
            },
        ],
        faqs: [
            {
                question: "What color formats can I enter as the base?",
                answer: "Any format the tool supports: HEX (#24C172), rgb(), hsl(), cmyk(), or oklch(). The input parses them all and updates the scale live.",
            },
            {
                question: "Can I use my computer's built-in color picker?",
                answer: "Yes. Click the small color swatch dot inside any base input field to instantly open your operating system's native color picker. The palette will update immediately upon selection.",
            },
            {
                question: "How is the 50-950 scale generated?",
                answer: "The tool keeps your base hue, then intelligently interpolates lightness toward white for tints (50-400) and toward black for shades (600-950), while slightly adjusting saturation to create a natural, Tailwind-like ramp.",
            },
            {
                question: "Can I change the output format of the generated palette?",
                answer: "Absolutely. Each plate has a format dropdown in its header. Switch between HEX, RGB, HSL, CMYK, or OKLCH, and both the displayed values and the 'Copy Full Plate' CSS output will instantly update.",
            },
            {
                question: "Is my palette data uploaded anywhere?",
                answer: "No. The entire generator is client-side JavaScript. Nothing leaves your device.",
            },
        ],
    },
];

export const colorPaletteToolComponentMap: ToolComponentMap = {
    "color-palette": dynamic(() => import("./component")),
};
