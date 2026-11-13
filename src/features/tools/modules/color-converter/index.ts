import dynamic from "next/dynamic";
import type { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const colorConverterToolMetadataList: BaseTool[] = [
    {
        id: "color-converter",
        category: "developer",
        name: "Color Converter",
        createdAt: "12-11-2026",
        longName: "Free Color Converter: HEX, RGB, HSL, CMYK & OKLCH",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/32476902a305ae18ce43b7599009b539d40fb1f4-1376x768.jpg",
        description:
            "Instantly convert colors between HEX, RGB, HSL, CMYK, and OKLCH. 100% free, private, and client-side. No uploads. Includes a visual color picker.",
        longDescription:
            "The ultimate free, client-side Color Converter for developers and designers. Instantly translate colors between HEX, RGB, HSL, CMYK, and the modern OKLCH color space. Unlike online tools, our Color Converter runs 100% locally in your browser using pure JavaScript. Zero data uploads, zero tracking, and zero wait times. Perfect for web development, UI/UX design, print design (CMYK), and accessibility checking. Features a visual color picker, live format syncing, and one-click clipboard copying.",
        tags: [
            "color converter",
            "hex to rgb",
            "rgb to hsl",
            "cmyk converter",
            "oklch converter",
            "visual color picker",
            "client-side tools",
        ],
        keywords: [
            // Short-tail (High volume)
            "color converter",
            "hex to rgb",
            "rgb to hsl",
            "cmyk converter",
            "oklch converter",
            "color picker",
            // Mid-tail (Targeted intent)
            "free color converter online",
            "hex to cmyk converter",
            "rgb to oklch converter",
            "visual color picker tool",
            "client side color converter",
            // Long-tail (Low competition, high conversion)
            "convert hex to rgb hsl cmyk free no upload",
            "private browser based color converter tool",
            "generate oklch color codes from hex online",
            "cmyk color converter for print design free",
            "real time color format converter javascript",
        ],
        steps: [
            {
                title: "Pick or Paste a Color",
                description:
                    "Use the visual saturation/hue picker, native system dialog, or type any valid color code (HEX, RGB, HSL, CMYK, OKLCH) directly into the fields.",
            },
            {
                title: "View Instant Conversions",
                description:
                    "Watch all 5 color formats update in real-time. The live preview swatch confirms your color is converting accurately across all models.",
            },
            {
                title: "One-Click Copy",
                description:
                    "Click the copy icon next to any format to instantly save the exact color code to your clipboard for use in CSS, Figma, or print software.",
            },
        ],
        whatToExpect: [
            {
                title: "100% Private & Local",
                description:
                    "All color math runs locally in your browser. Your design work and color palettes are never uploaded to any external server.",
            },
            {
                title: "Real-Time Bidirectional Sync",
                description:
                    "Edit any field manually. The tool instantly parses your input and updates the visual picker and all other formats simultaneously.",
            },
            {
                title: "Modern OKLCH Support",
                description:
                    "Future-proof your designs by converting to OKLCH, the perceptual color space now natively supported in modern CSS and design systems.",
            },
        ],
        faqs: [
            {
                question: "What is CMYK used for in color conversion?",
                answer: "CMYK (Cyan, Magenta, Yellow, Key/Black) is the subtractive color model used in professional printing. Converting RGB or HEX to CMYK helps you preview how your digital screen colors will look when printed on paper.",
            },
            {
                question: "What is OKLCH and why should I use it?",
                answer: "OKLCH is a modern, perceptual CSS color space. Unlike HSL, equal numeric steps in OKLCH produce equal perceived changes in lightness and color, making it the best choice for creating accessible, smooth color palettes and design systems.",
            },
            {
                question: "Is this color converter really 100% free and private?",
                answer: "Yes. This tool runs entirely client-side using pure JavaScript. No color data, hex codes, or design assets are ever sent to a server. It is completely free, with no accounts, limits, or tracking.",
            },
            {
                question: "Can I type color codes directly instead of using the picker?",
                answer: "Absolutely. You can paste or type any valid color string (e.g., #FF5733, rgb(255, 87, 51), hsl(149, 70%, 50%), cmyk(0, 100, 100, 0), or oklch(0.6 0.2 149)) into any field, and the tool will instantly parse and sync all other formats.",
            },
        ],
    },
];

export const colorConverterToolComponentMap: ToolComponentMap = {
    "color-converter": dynamic(() => import("./component")),
};
