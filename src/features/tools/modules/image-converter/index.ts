import { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const imageConverterToolMetadataList: BaseTool[] = [
    {
        id: "all-in-one-image-converter",
        category: "image",
        legacyPaths: ["/tools/converters/*"],
        name: "All-in-One Image Converter",
        acceptType: ".jpg,.jpeg,.png,.webp,.gif,.bmp,.svg,.heic,.heif,.tiff,.tif,.pdf",
        tags: ["convert", "batch", "jpg", "png", "webp", "heic", "tiff"],
        keywords: [
            "all in one image converter",
            "batch image converter online free",
            "convert tiff to jpg online free",
            "convert heic to jpg online free",
            "client-side image converter",
            "privacy focused image converter",
            "offline image format changer",
            "no upload image converter",
            "secure file converter no watermark",
            "fast browser image converter",
        ],
        description:
            "Free online batch image converter. Convert JPG, PNG, WEBP, HEIC, TIFF, and more formats instantly in your browser. 100% private, no uploads, no limits.",
        longDescription:
            "Convert your images between all major formats completely client-side. Full support for JPG, PNG, WEBP, GIF, BMP, SVG, HEIC, HEIF, TIFF, and TIF. Convert single images or batch process multiple files at once. All processing happens locally in your browser, ensuring your files never leave your device. No watermarks, no sign-ups, and no file size limits.",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/eb8ab9c00c2ea3b29840c1571aed377381743b0f-1376x768.jpg",
        faqs: [
            {
                question: "Are my images uploaded to a server?",
                answer: "No. All conversion happens 100% locally in your browser. Your files never leave your device, guaranteeing complete privacy.",
            },
            {
                question: "Can I convert multiple images at once (batch convert)?",
                answer: "Yes! You can drag and drop multiple files to convert them all simultaneously. They will be packaged into a single ZIP file for easy download.",
            },
            {
                question: "Does the converter support TIFF and HEIC files?",
                answer: "Yes. We fully support converting TIFF/TIF (commonly used by scanners) and HEIC/HEIF (Apple iPhone photos) into web-friendly formats like JPG or PNG.",
            },
            {
                question: "Is this image converter really free?",
                answer: "Yes, it is 100% free forever. There are no hidden fees, no watermarks, no sign-ups, and no artificial file size limits.",
            },
        ],
    },
    {
        id: "jpg-to-png",
        category: "image",
        name: "JPG to PNG Converter",
        acceptType: ".jpg,.jpeg",
        inputFormat: "jpg",
        defaultOutputFormat: "png",
        tags: ["jpg", "png", "convert", "transparency"],
        keywords: [
            "jpg to png converter",
            "convert jpeg to png high quality",
            "jpg to png with transparency support",
            "free jpg to png converter no watermark",
            "lossless image converter",
            "make jpg png online",
        ],
        description:
            "Convert JPG to PNG online for free. Add transparency support and preserve lossless quality. 100% private, client-side, no uploads.",
        longDescription:
            "Convert your JPG images to PNG format instantly and securely in your browser. PNG is a lossless format that supports transparent backgrounds, making it the perfect choice for logos, graphics, digital art, and high-quality images. Unlike other tools, our converter runs entirely on your device, ensuring your photos are never uploaded to a third-party server.",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/978f01b09b910547e02fba4aab518d424c683f09-1376x768.jpg",
        faqs: [
            {
                question: "Why should I convert JPG to PNG?",
                answer: "PNG supports lossless compression and transparent backgrounds (alpha channel), making it ideal for logos, graphics, and images where you cannot afford quality loss.",
            },
            {
                question: "Will converting JPG to PNG make the file larger?",
                answer: "Yes, PNG files are typically larger than JPGs because they use lossless compression. However, the image quality will be perfectly preserved.",
            },
            {
                question: "Is my JPG file uploaded to your servers?",
                answer: "Absolutely not. The conversion happens entirely in your browser using local JavaScript. Your files never touch our servers.",
            },
        ],
    },
    {
        id: "png-to-jpg",
        category: "image",
        name: "PNG to JPG Converter",
        acceptType: ".png",
        inputFormat: "png",
        defaultOutputFormat: "jpg",
        tags: ["png", "jpg", "convert", "compress"],
        keywords: [
            "png to jpg converter",
            "convert png to jpeg online free",
            "reduce png file size",
            "png to jpg for email",
            "remove png transparency to jpg",
            "compress png to jpg locally",
        ],
        description:
            "Convert PNG to JPG online for free. Drastically reduce file size for web, email, and social media. 100% private, no uploads required.",
        longDescription:
            "Convert your PNG images to JPG format instantly to significantly reduce file size. JPG is the universal standard for photographs, web use, email attachments, and social media uploads. Note: Because JPG does not support transparency, any transparent areas in your PNG will be filled with a solid white background. 100% client-side, no server uploads.",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/d850ae8cfce85cb32d8cf2b649b2f364058a4f62-1376x768.jpg",
        faqs: [
            {
                question: "What happens to transparent areas when converting PNG to JPG?",
                answer: "JPG format does not support transparency. Any transparent or semi-transparent pixels in your PNG will automatically be filled with a solid white background.",
            },
            {
                question: "Will I lose quality converting PNG to JPG?",
                answer: "JPG uses lossy compression, so there may be a very slight quality reduction. However, it drastically reduces file size, making it ideal for photos and web use.",
            },
            {
                question: "Is this tool free and unlimited?",
                answer: "Yes, completely free with no watermarks, no sign-ups, and no file size limits.",
            },
        ],
    },
    {
        id: "webp-to-jpg",
        category: "image",
        name: "WEBP to JPG Converter",
        acceptType: ".webp",
        inputFormat: "webp",
        defaultOutputFormat: "jpg",
        keywords: [
            "webp to jpg converter",
            "convert webp to jpeg online",
            "save webp as jpg",
            "open webp file on windows",
            "webp to jpg no watermark",
            "webp image converter free",
        ],
        tags: ["webp", "jpg", "convert"],
        description:
            "Convert WEBP to JPG online for free. Make WEBP images compatible with all devices, software, and social media. 100% private, no uploads.",
        longDescription:
            "Convert WEBP images to standard JPG format instantly. While WEBP is highly efficient for websites, many older software programs, photo editors, and social media platforms still require standard JPG files. Our tool solves this compatibility issue locally in your browser, with no uploads and no watermarks.",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/a3767ed9fb45ad371acc9bb946857e0be486f8bc-1376x768.jpg",
        faqs: [
            {
                question: "Why can't I open WEBP files on my computer?",
                answer: "WEBP is a modern web format. Older operating systems (like Windows 7) or basic photo viewers may not support it natively. Converting to JPG makes it universally compatible.",
            },
            {
                question: "Does converting WEBP to JPG reduce quality?",
                answer: "Our converter uses high-quality encoding to ensure the visual difference is virtually imperceptible, while giving you a universally compatible JPG file.",
            },
            {
                question: "Is my WEBP file safe from being stolen?",
                answer: "Yes, the conversion runs 100% locally in your browser. No data is ever sent to any server.",
            },
        ],
    },
    {
        id: "heic-to-jpg",
        category: "image",
        name: "HEIC to JPG Converter",
        acceptType: ".heic,.heif",
        defaultOutputFormat: "jpg",
        inputFormat: "heic",
        tags: ["heic", "jpg", "iphone", "convert"],
        keywords: [
            "heic to jpg converter",
            "convert heic to jpg online free",
            "iphone heic to jpg windows",
            "bulk convert heic to jpg free",
            "heic to jpeg no watermark",
            "apple photo format converter",
            "open heic on android",
        ],
        description:
            "Convert iPhone HEIC photos to JPG online for free. Compatible with Windows, Android, and all devices. 100% private, no uploads.",
        longDescription:
            "Convert Apple HEIC photos to standard JPG format instantly. Modern iPhones save photos in HEIC format to save space, but these files often won't open on Windows PCs, Android phones, or older software. Our tool solves this problem directly in your browser. Convert single photos or bulk convert entire albums locally, with no software installation required.",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/48944e3f0bfafd572952eb5569c4e7de9c48b83d-1376x768.jpg",
        faqs: [
            {
                question: "What is a HEIC file and why can't I open it?",
                answer: "HEIC is the default, space-saving image format for modern iPhones. However, it isn't universally compatible, which is why converting to JPG is necessary for Windows or Android.",
            },
            {
                question: "Can I convert multiple HEIC files at once (batch convert)?",
                answer: "Yes! You can select multiple HEIC files from your iPhone or computer and convert them all at once into a single, easy-to-download ZIP file.",
            },
            {
                question: "Does this HEIC converter work on Windows 10 and 11?",
                answer: "Yes, because it runs entirely in your web browser (Chrome, Edge, Firefox, Safari), it works perfectly on Windows, Mac, Linux, and mobile devices without installing any software.",
            },
        ],
    },
    {
        // 🆕 NEW DEDICATED TOOL FOR HIGH-INTENT SEO TRAFFIC
        id: "tiff-to-jpg",
        category: "image",
        name: "TIFF to JPG Converter",
        acceptType: ".tiff,.tif",
        inputFormat: "tiff",
        defaultOutputFormat: "jpg",
        tags: ["tiff", "jpg", "convert", "scanner"],
        keywords: [
            "tiff to jpg converter",
            "convert tif to jpg online free",
            "tiff to jpeg",
            "reduce tiff file size",
            "open tiff file online",
            "scanner image to jpg",
            "tiff to jpg no watermark",
            "batch convert tiff to jpg",
        ],
        description:
            "Convert TIFF to JPG online for free. Reduce massive scanner or camera TIFF file sizes instantly. 100% private, no uploads.",
        longDescription:
            "Convert large TIFF or TIF image files to standard, web-friendly JPG format instantly. TIFF files are commonly used by document scanners and professional cameras, but they are often too large for email, web uploads, or everyday viewing. Our client-side converter shrinks file sizes dramatically while preserving visual quality, all processed locally in your browser. No uploads, no watermarks, and complete privacy for your sensitive scanned documents.",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/1104748bcc52cda06b8e73a1977a75f9053bf6ab-1376x768.jpg",
        faqs: [
            {
                question: "What is a TIFF file?",
                answer: "TIFF (Tagged Image File Format) is a high-quality, lossless image format commonly used by document scanners, archivists, and professional photographers. However, the files are often very large.",
            },
            {
                question: "Why should I convert TIFF to JPG?",
                answer: "Converting to JPG drastically reduces the file size, making it easy to email, upload to websites, or view on any device without specialized software.",
            },
            {
                question: "Is it safe to convert sensitive scanned documents?",
                answer: "Yes, absolutely. Our tool processes everything 100% locally in your browser. Your scanned documents, IDs, or contracts are never uploaded to any server.",
            },
            {
                question: "Can I convert multiple TIFF files at once?",
                answer: "Yes, you can drag and drop multiple .tif or .tiff files to batch convert them all at once into a single downloadable ZIP file.",
            },
        ],
    },
];

export const imageConverterToolComponentMap: ToolComponentMap = {
    // "jpg-to-png": dynamic(() => import("./component")),
    // "png-to-jpg": dynamic(() => import("./component")),
    // "webp-to-jpg": dynamic(() => import("./component")),
    // "heic-to-jpg": dynamic(() => import("./component")),
    // "tiff-to-jpg": dynamic(() => import("./component")),
    // "all-in-one-image-converter": dynamic(() => import("./component")),
};
