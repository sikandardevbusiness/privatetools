import dynamic from "next/dynamic";

import type { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const exifWiperToolMetadataList: BaseTool[] = [
    {
        id: "exif-wiper",
        category: "privacy",
        name: "EXIF/GPS Data Wiper",
        longName: "Free EXIF & GPS Metadata Remover - Clean Photos Locally",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/85e4d03969c9dbe7cc1078b31fd403cbd2089181-1376x768.jpg",
        description:
            "Remove EXIF, GPS location, and camera metadata from photos online for free. Protect your privacy with 100% private in-browser photo cleaning.",
        longDescription:
            "Strip hidden EXIF tags, GPS coordinates, camera serial numbers, and personal timestamps from your photos before publishing them on social media, discussion forums, or classified listings. Modern smartphones and digital cameras embed precise latitude, longitude, device identifiers, and capture times into every JPEG, PNG, and HEIC file you capture, leaving your home location and routine exposed to anyone who downloads the file.\n\nUnlike standard metadata removal websites that demand you upload your private family pictures to their remote servers, our EXIF wiper operates completely client-side. Your photos are read, stripped of metadata headers, and saved directly within your browser. The files never traverse the web or touch external storage drives.\n\nMaintain the original visual resolution and clarity of your pictures without unwanted compression artifacts. Clean multiple images in batches, safeguard your personal security, and share photos with confidence knowing all hidden tracking information has been eliminated.",
        tags: [
            "privacy tool",
            "exif remover",
            "metadata cleaner",
            "photo privacy",
            "image security",
        ],
        keywords: [
            "remove exif data online free",
            "strip gps location from photos",
            "photo metadata remover no upload",
            "delete camera info from jpeg online",
            "clean photo metadata client side",
            "remove location tag from picture",
            "private exif cleaner for images",
            "wipe photo metadata before sharing",
            "bulk image exif remover free",
        ],
        steps: [
            {
                title: "Select Photos",
                description: "Drop your JPG, PNG, or HEIC pictures directly into the browser tool.",
            },
            {
                title: "Strip Metadata",
                description:
                    "The tool automatically wipes GPS tags, camera details, and timestamps locally.",
            },
            {
                title: "Download Clean Photos",
                description:
                    "Save the sanitized images back to your device, free of private location records.",
            },
        ],
        whatToExpect: [
            {
                title: "Full Location Privacy",
                description:
                    "Erase exact GPS home and work coordinates before posting photos online.",
            },
            {
                title: "Zero Quality Loss",
                description:
                    "Strip technical tags while preserving original colors, clarity, and image resolution.",
            },
            {
                title: "Complete Client-Side Security",
                description:
                    "Images are processed exclusively inside your browser with zero server uploads.",
            },
        ],
        faqs: [
            {
                question: "Do my photos get uploaded to your servers to remove metadata?",
                answer: "No. All metadata stripping happens right inside your browser window. Your photos stay strictly on your device and are never sent over the internet.",
            },
            {
                question: "What specific metadata does this tool erase?",
                answer: "It strips GPS coordinates, altitude, camera make and model, lens details, shutter speeds, capture timestamps, software editing tags, and thumbnail caches.",
            },
            {
                question: "Does stripping EXIF data lower the image quality?",
                answer: "No. The tool removes the metadata header tags while leaving the visual image data intact, preserving the sharpness and resolution of your original photo.",
            },
            {
                question: "Can I clean multiple photos at the same time?",
                answer: "Yes. You can drop several images into the tool at once, strip all identifying tags simultaneously, and download your cleaned files.",
            },
        ],
    },
];

export const exifWiperToolComponentMap: ToolComponentMap = {
    "exif-wiper": dynamic(() => import("@/features/tools/shared/components/under-development")),
};
