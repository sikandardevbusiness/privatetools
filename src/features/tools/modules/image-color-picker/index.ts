import dynamic from "next/dynamic";
import type { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const imageColorPickerToolMetadataList: BaseTool[] = [
    {
        id: "image-color-picker",
        category: "image",
        name: "Image Color Picker",
        createdAt: "2026-11-13",
        isExperimental: false,
        longName: "Free Image Color Picker | Zoom, Pan & Eyedropper in Browser",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/1d3b3393eb58b351f1fec1ada89f9c41997ffe4a-1376x768.jpg",
        description:
            "Upload an image, zoom and pan like Photoshop, then eyedrop exact HEX/RGB colors from any pixel. Pick colors are saved to a copyable palette. 100% local.",
        longDescription:
            "A powerful, fully client-side Image Color Picker with Photoshop-style controls. Upload any image, use the Move tool to pan and the zoom slider to inspect pixels up close, then switch to the Eyedropper to sample the exact color under your cursor. Every picked color is saved to a live palette you can copy individually, in any format, or as a full CSS variable block. Toggle fullscreen for a distraction-free workspace. Zero uploads, zero tracking.",
        tags: [
            "image color picker",
            "eyedropper tool",
            "zoom image",
            "pan image",
            "sample color from image",
        ],
        keywords: [
            "image color picker online free",
            "eyedropper tool for images",
            "sample hex color from image",
            "zoom and pan image color picker",
            "get color code from pixel browser",
            "private image eyedropper no upload",
        ],
        steps: [
            {
                title: "Upload & Navigate",
                description:
                    "Drop an image, then use the Move tool to pan and the Zoom slider to inspect pixels closely.",
            },
            {
                title: "Eyedrop Colors",
                description:
                    "Switch to the Pick tool and click anywhere on the image to sample the exact color under the cursor.",
            },
            {
                title: "Copy & Fullscreen",
                description:
                    "Picked colors build a copyable palette. Use format toggles, copy any swatch, or go fullscreen.",
            },
        ],
        whatToExpect: [
            {
                title: "Photoshop-Style Controls",
                description:
                    "Dedicated Move (pan) and Pick (eyedropper) modes plus smooth zoom up to 10x.",
            },
            {
                title: "Pixel-Accurate Sampling",
                description:
                    "Colors are read at the image's natural resolution, so zoomed picks are exact.",
            },
            {
                title: "Live Copyable Palette",
                description:
                    "Every pick is saved into a palette you can copy per-swatch or as full CSS.",
            },
            {
                title: "100% Private & Local",
                description:
                    "All canvas sampling happens in your browser. Your images never leave your device.",
            },
        ],
        faqs: [
            {
                question: "Is my image uploaded to a server?",
                answer: "No. The image is drawn to a local HTML5 Canvas and every color is sampled in-browser.",
            },
            {
                question: "Why do my picks stay accurate when zoomed in?",
                answer: "The eyedropper maps your click to the image's natural pixel coordinates, so you always get the true color of that pixel.",
            },
            {
                question: "How do I move around a zoomed image?",
                answer: "Switch to the Move tool and drag the image to pan, or use Reset View to recenter and fit it again.",
            },
        ],
    },
];

export const imageColorPickerToolComponentMap: ToolComponentMap = {
    "image-color-picker": dynamic(() => import("./component")),
};
