import type { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const exifWiperToolMetadataList: BaseTool[] = [
    {
        id: "exif-wiper",
        category: "privacy",
        name: "EXIF/GPS Data Wiper",
        tags: ["exif", "gps", "metadata", "privacy", "wiper"],
        description:
            "Instantly strip all photo metadata (GPS, EXIF, XMP). 100% private, client-side processing ensures your images never leave your browser.",
        longDescription:
            "Strip GPS coordinates, camera info, and other hidden metadata from your images. Protect your privacy when sharing photos online. All processing happens locally in your browser - your images never leave your device.",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/85e4d03969c9dbe7cc1078b31fd403cbd2089181-1376x768.jpg",
        keywords: [
            "exif remover",
            "gps data remover",
            "metadata stripper",
            "photo privacy",
            "remove location data",
            "clean image metadata",
            "privacy tool",
        ],
        acceptType: "image/*",
        faqs: [
            {
                question: "Are my photos uploaded to a server?",
                answer: "No. All processing happens 100% locally in your browser. Your images never leave your device, ensuring complete privacy.",
            },
            {
                question: "What kind of data is removed?",
                answer: "The tool removes EXIF data including GPS coordinates, camera make and model, date and time taken, and software editing history.",
            },
            {
                question: "Does this reduce image quality?",
                answer: "No. The tool re-encodes the image to strip metadata while preserving the original visual quality.",
            },
        ],
    },
];

export const exifWiperToolComponentMap: ToolComponentMap = {
    // "exif-wiper": dynamic(() => import("./component")),
};
