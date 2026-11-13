import dynamic from "next/dynamic";
import type { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const gradientToolMetadataList: BaseTool[] = [
    {
        id: "css-gradient-generator",
        category: "developer",
        name: "CSS Gradient Generator",
        createdAt: "2026-11-13",
        isExperimental: true,
        longName:
            "Free CSS Gradient Generator | Linear, Radial, Conic & Repeating with Live Preview",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/3429cb04efd3fe9ca9bb48a28ee0c9bf5576b906-1376x768.jpg",
        description:
            "Visually design beautiful CSS gradients with draggable, numbered color stops. Supports linear, radial, conic, and repeating types with instant.",
        longDescription:
            "The ultimate free, client-side CSS Gradient Generator for web developers and UI designers. Visually build linear, radial, conic, or repeating gradients with precise, draggable color stops and angle controls. Unlike heavy online tools, this generator runs 100% locally in your browser. Add up to 10 color stops, tweak exact percentage positions, adjust radial shapes and positions, and copy the production-ready CSS code with one click. Zero uploads, zero tracking.",
        tags: [
            "css gradient generator",
            "linear gradient",
            "radial gradient",
            "conic gradient",
            "repeating gradient",
            "css code generator",
            "visual gradient builder",
        ],
        keywords: [
            "free css gradient generator",
            "linear gradient maker online",
            "radial conic gradient tool",
            "repeating gradient generator css",
            "css background generator no upload",
            "visual gradient builder with color stops",
            "custom css gradient code generator",
            "client side gradient maker",
        ],
        steps: [
            {
                title: "Choose Gradient Type",
                description:
                    "Select Linear, Radial, Conic, or any Repeating variant from the dropdown.",
            },
            {
                title: "Edit Color Stops",
                description:
                    "Drag the numbered handles on the ramp, or use the individual stop rows to pick colors and set exact percentage positions.",
            },
            {
                title: "Fine-Tune & Copy",
                description:
                    "Adjust the angle, shape, or position as needed, then click 'Copy' to grab the ready-to-use CSS code for your project.",
            },
        ],
        whatToExpect: [
            {
                title: "Live Visual Preview",
                description:
                    "See your gradient update instantly in real-time as you drag handles or tweak controls.",
            },
            {
                title: "Precise Stop Control",
                description:
                    "Each color stop has its own dedicated editor row with a native color picker, hex input, and exact percentage field.",
            },
            {
                title: "Advanced Options",
                description:
                    "Full support for radial shapes (circle/ellipse), custom focal positions, and repeating gradient patterns.",
            },
            {
                title: "100% Local & Private",
                description:
                    "No server requests. Your design and color choices stay entirely in your browser.",
            },
        ],
        faqs: [
            {
                question: "Can I generate repeating gradients?",
                answer: "Yes. The tool fully supports repeating-linear, repeating-radial, and repeating-conic gradients for seamless pattern backgrounds.",
            },
            {
                question: "How do I add or remove color stops?",
                answer: "Click anywhere on the gradient ramp to add a new stop instantly. Each stop also has its own dedicated 'X' button in its editor row for easy removal (minimum 2 stops required).",
            },
            {
                question: "Can I control the position of radial gradients?",
                answer: "Absolutely. When Radial or Repeating Radial is selected, you can choose both the shape (circle or ellipse) and the exact focal position (e.g., center, top left, bottom right).",
            },
            {
                question: "Is the generated CSS compatible with modern browsers?",
                answer: "Yes. The output uses standard, widely-supported CSS3 gradient syntax that works across all modern browsers.",
            },
        ],
    },
];

export const gradientToolComponentMap: ToolComponentMap = {
    "css-gradient-generator": dynamic(() => import("./component")),
};
