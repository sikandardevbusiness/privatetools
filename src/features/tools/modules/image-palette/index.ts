import dynamic from "next/dynamic";
import type { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const imagePaletteToolMetadataList: BaseTool[] = [
    {
        id: "extract-colors-from-image",
        category: "image",
        name: "Image Color Extractor",
        createdAt: "2026-11-13",
        longName: "Extract Colors From Image | Free Image to Color Palette Generator",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/8eec7e57b18683696f46b18bbe6a46889e7dccef-1376x768.jpg",
        description:
            "Extract colors from any image instantly. Get the dominant HEX palette from JPG, PNG, or WebP — 100% free, private, and client-side. No uploads.",
        longDescription:
            "The ultimate free, client-side tool to extract colors from an image. Drop any JPG, PNG, or WebP to instantly generate a dominant color palette. Unlike online extractors, this runs 100% locally in your browser using the HTML5 Canvas API and a lightweight frequency-bucketing algorithm. Zero uploads, zero tracking. Choose 4–10 colors, view them as HEX/RGB/HSL/CMYK/OKLCH, and copy individual swatches or the full CSS variable block with one click.",
        tags: [
            "extract colors from image",
            "image to color palette",
            "dominant color finder",
            "image color extractor",
            "get hex from image",
        ],
        keywords: [
            "extract colors from image online free",
            "get color codes from image",
            "dominant color palette from image",
            "image to hex converter no upload",
            "extract palette from photo browser",
            "private image color extractor",
        ],
        steps: [
            {
                title: "Upload or Drop an Image",
                description:
                    "Use the upload zone to select any JPG, PNG, or WebP image. The preview replaces the upload area instantly.",
            },
            {
                title: "Choose Color Count",
                description:
                    "Pick how many dominant colors to extract (4, 5, 6, 8, or 10) using the dropdown below the image.",
            },
            {
                title: "Copy Your Palette",
                description:
                    "Click any swatch to copy its code, or use 'Copy Full Plate' to grab all colors as CSS variables in HEX, RGB, HSL, CMYK, or OKLCH.",
            },
        ],
        whatToExpect: [
            {
                title: "100% Private & Local",
                description:
                    "Image processing happens entirely in your browser via HTML5 Canvas. Your images never leave your device.",
            },
            {
                title: "Lightning Fast",
                description:
                    "Optimized frequency bucketing finds dominant colors in milliseconds, even on large images.",
            },
            {
                title: "Flexible Output",
                description:
                    "Toggle the extracted palette between HEX, RGB, HSL, CMYK, and OKLCH formats with one dropdown.",
            },
        ],
        faqs: [
            {
                question: "Are my images uploaded to a server?",
                answer: "No. The entire extraction runs locally in your browser using the HTML5 Canvas API. Your files never leave your device.",
            },
            {
                question: "What image formats are supported?",
                answer: "All standard web formats: JPG, PNG, WebP, GIF, and BMP.",
            },
            {
                question: "How does the color extraction work?",
                answer: "The tool reads pixel data, groups similar colors via a lightweight bucketing algorithm, and returns the most frequent dominant colors.",
            },
            {
                question: "Can I copy the colors as CSS variables?",
                answer: "Yes. The 'Copy Full Plate' button exports every extracted color as a ready-to-paste CSS custom-property block.",
            },
        ],
    },
];

export const imagePaletteToolComponentMap: ToolComponentMap = {
    "extract-colors-from-image": dynamic(() => import("./component")),
};
