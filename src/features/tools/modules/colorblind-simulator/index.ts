import dynamic from "next/dynamic";
import type { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const colorblindToolMetadataList: BaseTool[] = [
    {
        id: "colorblind-simulator",
        category: "image",
        name: "Color Blindness Simulator",
        createdAt: "2026-11-13",
        longName: "Free Color Blindness Simulator | Test Image Accessibility Locally",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/790b4998f3424b20541788e5355962e9d8e92b66-1376x768.jpg",
        description:
            "Simulate how your images and designs look to users with Protanopia, Deuteranopia, Tritanopia, or Achromatopsia.",
        longDescription:
            "Ensure your designs are accessible to everyone. This free, client-side Color Blindness Simulator uses HTML5 Canvas and scientific 3x3 color matrices to accurately simulate how images appear to users with various types of color vision deficiency (CVD). Adjust the severity slider, compare side-by-side, and download the result. Zero uploads, zero tracking.",
        tags: [
            "color blindness simulator",
            "accessibility tool",
            "protanopia",
            "deuteranopia",
            "image filter",
        ],
        keywords: [
            "color blindness simulator online free",
            "test image for color blindness",
            "protanopia deuteranopia simulator",
            "accessibility image checker no upload",
            "web accessibility color vision test",
        ],
        steps: [
            { title: "Upload an Image", description: "Drop any JPG or PNG into the upload zone." },
            {
                title: "Select Condition",
                description:
                    "Choose between Red-blind, Green-blind, Blue-blind, or Total color blindness.",
            },
            {
                title: "Adjust & Download",
                description:
                    "Use the severity slider to fine-tune the effect, then download the simulated image.",
            },
        ],
        whatToExpect: [
            {
                title: "100% Private",
                description: "All pixel processing happens locally in your browser via Canvas API.",
            },
            {
                title: "Scientific Accuracy",
                description:
                    "Uses established 3x3 color transformation matrices for realistic simulation.",
            },
            {
                title: "Real-time Preview",
                description: "Side-by-side comparison updates instantly as you adjust settings.",
            },
        ],
        faqs: [
            {
                question: "Are my images uploaded?",
                answer: "No. The entire simulation runs locally in your browser.",
            },
            {
                question: "What types of color blindness are supported?",
                answer: "Protanopia (red-blind), Deuteranopia (green-blind), Tritanopia (blue-blind), and Achromatopsia (total color blindness).",
            },
        ],
    },
];
export const colorblindToolComponentMap: ToolComponentMap = {
    "colorblind-simulator": dynamic(() => import("./component")),
};
