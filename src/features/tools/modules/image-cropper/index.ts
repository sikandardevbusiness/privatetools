import { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const imageCropperToolMetadataList: BaseTool[] = [
    {
        id: "universal-image-cropper",
        category: "image",
        name: "Universal Image Cropper",
        acceptType: ".jpg,.png,.webp,.gif,.bmp,.svg,.heic,.heif",
        legacyPaths: ["/tools/croppers/*"],
        keywords: [
            "image cropper",
            "photo cropper",
            "crop images online",
            "free image cropper",
            "resize images",
            "edit photos",
            "crop JPG",
            "crop PNG",
            "crop WEBP",
            "crop HEIC",
            "aspect ratio",
            "image resizer",
            "photo editor",
            "online image editor",
            "client-side image cropper",
            "privacy image tool",
            "no upload image cropper",
        ],
        tags: ["crop", "resize", "edit", "jpg", "png", "webp", "heic"],
        description:
            "Free online image cropper. Crop, resize, and edit JPG, PNG, WEBP, HEIC images instantly in your browser. 100% private, no uploads required.",
        longDescription:
            "Crop, resize, and edit your images completely client-side with our free Universal Image Cropper. Support for JPG, PNG, WEBP, GIF, BMP, SVG, and HEIC formats. Adjust aspect ratios for social media, customize dimensions, and download in your preferred format. All processing happens locally in your browser.",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/cd85b1ace5816d7d41a980ccd25db912c90fb4bd-1376x768.jpg",
        faqs: [
            {
                question: "Are my images uploaded to a server?",
                answer: "No. All cropping happens 100% locally in your browser. Your photos never leave your device, ensuring complete privacy.",
            },
            {
                question: "What image formats are supported?",
                answer: "You can crop JPG, PNG, WEBP, GIF, BMP, SVG, and HEIC files, and download the result as PNG, JPG, or WEBP.",
            },
            {
                question: "Can I set specific aspect ratios?",
                answer: "Yes. Choose from presets like 1:1 (Instagram), 16:9 (YouTube), 9:16 (Stories), or use free-form mode.",
            },
        ],
    },
];

export const imageCropperToolComponentMap: ToolComponentMap = {
    // "universal-image-cropper": dynamic(() => import("./component")),
};
