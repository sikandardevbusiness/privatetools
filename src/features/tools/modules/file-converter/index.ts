import dynamic from "next/dynamic";
import { converter } from "../../../../../../packages/packages/file-converter/src/index";

import { BaseTool, ToolComponentMap } from "@/features/tools/shared/types";

export const fileConverterToolMetadataList: BaseTool[] = [
    {
        id: "all-in-one-image-converter",
        category: "image",
        name: "All-in-One Image Converter",
        longName: "Free Batch Image Converter Online - No File Upload",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/eb8ab9c00c2ea3b29840c1571aed377381743b0f-1376x768.jpg",
        description:
            "Convert JPG, PNG, WEBP, HEIC, and TIFF images in batch online for free. Fast, private client-side converter with zero file size limits or server uploads.",
        longDescription:
            "Convert image files between modern and legacy formats directly in your web browser. This all-in-one converter handles JPG, PNG, WEBP, GIF, BMP, SVG, HEIC, and TIFF formats without making you install heavy graphic software or wait in cloud server queues. Whether you need to change iPhone photos into standard JPEGs or prepare transparent web graphics, you can convert individual images or batch process entire folders at once.\n\nUnlike typical file converters that upload your personal pictures, receipts, or confidential scans to remote servers, this tool works entirely on the client side using your browser's native processing power. Your files remain on your device from start to finish, ensuring complete privacy and immediate file transformation without bandwidth bottlenecks.\n\nEnjoy complete freedom with no arbitrary limits. There are no daily conversion caps, watermarks, forced account registrations, or file size restrictions. Download your converted images individually or save all of them together in a single structured ZIP file.",
        tags: [
            "image converter",
            "batch converter",
            "heic to jpg",
            "webp converter",
            "image tools",
        ],
        keywords: [
            "batch image converter online free",
            "convert heic to jpg no upload",
            "client side image converter",
            "free raw image converter browser",
            "tiff to png converter online",
            "bulk picture format changer",
            "private image converter no watermark",
            "offline image converter in browser",
            "convert webp to jpg without limit",
        ],
        steps: [
            {
                title: "Select or Drop Images",
                description:
                    "Add one or multiple JPG, PNG, WEBP, HEIC, or TIFF files from your device.",
            },
            {
                title: "Choose Target Format",
                description:
                    "Pick your desired output format and adjust quality preferences if needed.",
            },
            {
                title: "Download Files",
                description:
                    "Save your converted pictures individually or download everything in a single ZIP file.",
            },
        ],
        whatToExpect: [
            {
                title: "100% In-Browser Privacy",
                description:
                    "Your photos never leave your device and are never sent to external servers.",
            },
            {
                title: "Unlimited Batch Processing",
                description:
                    "Convert dozens of high-resolution images simultaneously with zero queue wait times.",
            },
            {
                title: "Crisp Output Quality",
                description:
                    "Preserve original color profiles, dimensions, and visual clarity across all formats.",
            },
        ],
        faqs: [
            {
                question: "Are my photos uploaded to a remote server during conversion?",
                answer: "No. All image processing runs locally in your browser using client-side JavaScript and Canvas APIs. Your photos never leave your computer or phone.",
            },
            {
                question: "Can I convert multiple images at once?",
                answer: "Yes. You can select and convert dozens of files in a single batch. Once finished, you can download all converted files together as a convenient ZIP archive.",
            },
            {
                question: "Does this tool support iPhone HEIC and scanner TIFF formats?",
                answer: "Yes. The converter fully supports Apple HEIC/HEIF files and scanner TIFF/TIF files, turning them into web-friendly JPG, PNG, or WEBP formats.",
            },
            {
                question: "Is there a daily file size limit or watermarking?",
                answer: "There are no file size limits, daily conversion caps, or watermarks. The tool is free and relies on your local device memory to process files of any size.",
            },
        ],
    },
    {
        id: "jpg-to-png",
        category: "image",
        name: "JPG to PNG Converter",
        longName: "Free Online JPG to PNG Converter - Lossless Quality",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/978f01b09b910547e02fba4aab518d424c683f09-1376x768.jpg",
        description:
            "Convert JPG images to high-quality PNG format online for free. Preserve crisp edges and prepare transparent graphics locally with no server uploads.",
        longDescription:
            "Convert compressed JPG photos into clean, lossless PNG format in seconds. While JPG files are great for compact storage, repeated editing causes visible compression artifacts. Converting your JPG pictures to PNG gives you a stable, uncompressed foundation ideal for graphic design, web assets, logos, and digital artwork.\n\nMost web converters transfer your personal pictures across the internet to convert them on remote web servers. This tool executes 100% locally in your web browser. Because the image conversion is carried out using client-side memory, your files are never exposed to third-party data tracking, server logs, or cloud storage risks.\n\nExperience rapid conversions without waiting for file uploads or downloads. Simply drop your JPG photos into the editor, view the immediate conversion, and download your full-resolution PNG files without watermarks or quality degradation.",
        tags: ["jpg to png", "image converter", "lossless image", "photo editor", "png export"],
        keywords: [
            "convert jpg to png online free",
            "jpeg to png converter high quality",
            "lossless jpg to png tool",
            "convert jpg to png without upload",
            "make jpg png transparent background ready",
            "free image converter no watermark",
            "best jpg to png converter browser",
            "batch convert jpg to png free",
            "client side jpeg to png",
        ],
        steps: [
            {
                title: "Import JPG Files",
                description:
                    "Drag and drop your JPG or JPEG images directly into the browser converter.",
            },
            {
                title: "Automatic Conversion",
                description:
                    "The tool decodes and repacks your image into lossless PNG format locally.",
            },
            {
                title: "Download PNG",
                description: "Save the crystal-clear PNG image straight to your computer or phone.",
            },
        ],
        whatToExpect: [
            {
                title: "Lossless Compression",
                description:
                    "Prevent repeated compression artifacts and keep graphic edges sharp for editing.",
            },
            {
                title: "Absolute Data Privacy",
                description:
                    "Files are processed strictly within your browser without touching external servers.",
            },
            {
                title: "Instant Processing",
                description:
                    "Zero network upload latency means your conversions finish in milliseconds.",
            },
        ],
        faqs: [
            {
                question: "Will converting a JPG to PNG improve its image quality?",
                answer: "Converting to PNG cannot restore detail already lost to JPG compression, but it prevents any further quality loss during future edits and saves.",
            },
            {
                question: "Will the resulting PNG have a transparent background?",
                answer: "Standard JPGs do not support transparency and have solid backgrounds. Converting to PNG allows you to open and edit the image in graphic software to add transparency.",
            },
            {
                question: "Are my JPG files uploaded to an external server?",
                answer: "No. Conversion runs locally in your browser memory. Your images never leave your device, ensuring total privacy.",
            },
            {
                question: "Why is the converted PNG file larger than the original JPG?",
                answer: "PNG is a lossless format that retains every pixel without compression discard, resulting in larger file sizes that preserve maximum visual detail.",
            },
        ],
    },
    {
        id: "png-to-jpg",
        category: "image",
        name: "PNG to JPG Converter",
        longName: "Free Online PNG to JPG Converter - Reduce File Size",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/d850ae8cfce85cb32d8cf2b649b2f364058a4f62-1376x768.jpg",
        description:
            "Convert large PNG images to compressed JPG format online for free. Shrink image file size for web, email, and social media with zero server uploads.",
        longDescription:
            "Shrink bulky PNG graphics into lightweight, universally compatible JPG files. PNG images provide crisp lines and transparent layers, but their large file sizes frequently cause slow website load times and bounce email attachment limits. Converting PNG files to JPG cuts file size by up to 80% while retaining high visual clarity.\n\nYour photos, sensitive scans, and personal screenshots stay completely safe because all encoding happens directly inside your web browser. Without network transfers or remote cloud processing, you avoid data exposure risks, bandwidth delays, and queue limits common to server-based converters.\n\nCustomize your output quality to achieve the exact balance of small file size and clear detail. Any transparent areas in your PNG are cleanly filled with a solid white background, producing ready-to-share JPEGs suited for blogs, social platforms, and online forms.",
        tags: [
            "png to jpg",
            "image compressor",
            "file converter",
            "reduce image size",
            "jpeg format",
        ],
        keywords: [
            "convert png to jpg online free",
            "png to jpeg converter no upload",
            "reduce png file size to jpg",
            "batch png to jpg converter",
            "compress png to jpg high quality",
            "free png to jpg converter without watermark",
            "convert transparent png to white background jpg",
            "client side png to jpg tool",
            "fast png to jpeg photo converter",
        ],
        steps: [
            {
                title: "Upload PNG Images",
                description: "Select or drop your PNG files into the browser conversion tool.",
            },
            {
                title: "Set Compression Quality",
                description:
                    "Choose your preferred JPG quality level to balance file size and visual fidelity.",
            },
            {
                title: "Download JPG",
                description: "Save your lightweight JPG images instantly to your device.",
            },
        ],
        whatToExpect: [
            {
                title: "Significant Size Reduction",
                description:
                    "Cut image file sizes by up to 80% for faster sharing, web publishing, and emailing.",
            },
            {
                title: "Universal Device Support",
                description:
                    "Ensure your pictures open effortlessly across all operating systems and photo viewers.",
            },
            {
                title: "Safe Client-Side Encoding",
                description:
                    "Your files never leave your device, ensuring confidential graphics remain private.",
            },
        ],
        faqs: [
            {
                question: "What happens to transparent backgrounds when converting PNG to JPG?",
                answer: "Because the JPG format does not support alpha transparency, transparent areas are automatically replaced with a clean, solid white background.",
            },
            {
                question: "Will converting PNG to JPG noticeably reduce image quality?",
                answer: "At standard high-quality settings, the visual difference is virtually imperceptible to the human eye, even while drastically slashing the file size.",
            },
            {
                question: "Are my PNG files stored or tracked on your servers?",
                answer: "No. Conversion happens entirely on your local machine using client-side web technology. Nothing is uploaded, saved, or logged on remote servers.",
            },
            {
                question: "Can I convert multiple PNG files at the same time?",
                answer: "Yes. You can batch upload multiple PNGs, convert them simultaneously in your browser, and download the finished JPGs together in a ZIP file.",
            },
        ],
    },
    {
        id: "webp-to-jpg",
        category: "image",
        name: "WEBP to JPG Converter",
        longName: "Free WEBP to JPG Converter Online - Universal Compatibility",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/a3767ed9fb45ad371acc9bb946857e0be486f8bc-1376x768.jpg",
        description:
            "Convert downloaded WEBP images to standard JPG format online for free. Fix compatibility issues on Windows, Mac, and editing apps with no file uploads.",
        longDescription:
            "Turn downloaded web images into standard, universally recognized JPG files. Modern websites use Google's WEBP format for faster loading, but many desktop photo editors, older operating systems, presentation apps, and submission portals still refuse to open WEBP files. This converter solves incompatibility issues in a single click.\n\nForget uploading your downloaded assets or personal pictures to suspicious third-party servers. This tool runs entirely on your device using HTML5 Canvas processing. Your files never touch an external server, protecting your personal browsing downloads and proprietary project assets from unauthorized logging.\n\nWhether you are managing e-commerce product photos, social media graphics, or reference materials, you can batch convert dozens of WEBP images to crisp JPGs in seconds. Save hours of manual exporting and make your images usable across every desktop and mobile application.",
        tags: [
            "webp to jpg",
            "image converter",
            "save webp as jpg",
            "image compatibility",
            "photo format",
        ],
        keywords: [
            "convert webp to jpg online free",
            "save webp as jpg windows",
            "webp to jpeg converter no upload",
            "open webp file in photoshop",
            "batch webp to jpg converter free",
            "free webp converter without watermark",
            "client side webp to jpg changer",
            "how to change webp to jpg",
            "fast webp to jpg converter browser",
        ],
        steps: [
            {
                title: "Drop WEBP Files",
                description: "Drag and drop one or more WEBP pictures into the browser window.",
            },
            {
                title: "Convert Instantly",
                description:
                    "The converter decodes the WEBP format and encodes standard high-resolution JPGs.",
            },
            {
                title: "Download Universal JPG",
                description:
                    "Save the converted JPGs to your device, ready to edit or share anywhere.",
            },
        ],
        whatToExpect: [
            {
                title: "Everywhere Compatibility",
                description:
                    "Open and edit your converted pictures in Photoshop, Word, PowerPoint, and Windows.",
            },
            {
                title: "Zero Upload Latency",
                description:
                    "Images process immediately inside your browser without wait times or server queues.",
            },
            {
                title: "Strict Local Privacy",
                description:
                    "Your downloaded files and graphics stay safely contained on your computer.",
            },
        ],
        faqs: [
            {
                question: "Why do downloaded web images save as WEBP instead of JPG?",
                answer: "Websites use WEBP because it provides smaller file sizes for fast page loading. However, many desktop programs and photo viewers still require standard JPG files.",
            },
            {
                question: "Does converting WEBP to JPG degrade visual quality?",
                answer: "No. Our converter maintains high compression bitrates so the converted JPG matches the clarity and sharpness of the original WEBP image.",
            },
            {
                question: "Can I convert multiple WEBP images at once?",
                answer: "Yes. You can add dozens of WEBP files at once and convert them in batch, then download the entire collection as a single organized ZIP folder.",
            },
            {
                question: "Is it safe to convert private images with this tool?",
                answer: "Yes, completely safe. The tool operates 100% locally in your browser. No image data is ever transferred to remote servers.",
            },
        ],
    },
    {
        id: "heic-to-jpg",
        category: "image",
        name: "HEIC to JPG Converter",
        longName: "Free HEIC to JPG Converter Online - Open iPhone Photos Anywhere",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/48944e3f0bfafd572952eb5569c4e7de9c48b83d-1376x768.jpg",
        description:
            "Convert iPhone HEIC photos to JPG online for free. View Apple photos on Windows, Android, and PC with 100% private in-browser conversion and no uploads.",
        longDescription:
            "Convert Apple High Efficiency Image Container (HEIC) photos to standard JPG format without installing third-party software or buying codec packs. iPhones and iPads capture photos in HEIC format to save storage space, but these files frequently fail to open on Windows PCs, Android phones, smart TVs, and job application portals.\n\nUploading family pictures, personal identity cards, or private vacation snaps to remote cloud converters creates severe privacy concerns. Our HEIC to JPG converter operates strictly inside your browser. Your images are unpacked and re-encoded locally using client-side libraries, guaranteeing that your personal memories never leave your machine.\n\nBatch convert entire photo albums from your latest trip or photo shoot in seconds. The converter preserves original image dimensions, vivid color depth, and sharpness, giving you universally compatible JPEGs ready to print, email, or share across any platform.",
        tags: [
            "heic to jpg",
            "iphone photo converter",
            "apple heic",
            "image converter",
            "windows heic",
        ],
        keywords: [
            "heic to jpg converter online free",
            "convert iphone photo to jpg on windows",
            "batch convert heic to jpg no upload",
            "open heic file on pc free",
            "apple photo to jpeg converter",
            "free heic to jpg without watermark",
            "private heic converter browser",
            "convert heic to jpg without quality loss",
            "bulk heic to jpg converter",
        ],
        steps: [
            {
                title: "Select iPhone HEIC Photos",
                description:
                    "Drag and drop your .heic or .heif pictures from your iPhone, Mac, or PC.",
            },
            {
                title: "Local Processing",
                description:
                    "The browser engine decodes HEIC data and maps it to standard JPG formatting.",
            },
            {
                title: "Download Compatible JPGs",
                description:
                    "Save individual JPG files or grab your entire converted gallery in a ZIP file.",
            },
        ],
        whatToExpect: [
            {
                title: "Works on Any Operating System",
                description:
                    "View and edit your iPhone pictures on Windows 10, Windows 11, and Android with ease.",
            },
            {
                title: "Total Photo Privacy",
                description:
                    "Private family pictures and documents remain secure on your personal device.",
            },
            {
                title: "Bulk Photo Conversion",
                description:
                    "Transform dozens of high-resolution camera shots in seconds with zero restrictions.",
            },
        ],
        faqs: [
            {
                question: "Why can't I open HEIC photos on my Windows PC?",
                answer: "HEIC is Apple's proprietary default format. Windows PCs require special paid codecs to display them natively. Converting to JPG makes them universally accessible.",
            },
            {
                question: "Does converting from HEIC to JPG lower photo quality?",
                answer: "No. The converter preserves high resolution, true colors, and image details so your photos look just as sharp as they did on your iPhone screen.",
            },
            {
                question: "Can I convert multiple HEIC photos at the same time?",
                answer: "Yes. You can select multiple HEIC files or entire folders, convert them simultaneously, and download the results together in a ZIP file.",
            },
            {
                question: "Are my personal iPhone photos uploaded to an online server?",
                answer: "No. All conversion happens locally in your web browser. Your private pictures never touch our servers or any cloud storage system.",
            },
        ],
    },
    {
        id: "tiff-to-jpg",
        category: "image",
        name: "TIFF to JPG Converter",
        longName: "Free Online TIFF to JPG Converter - Shrink Scanner Files",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/1104748bcc52cda06b8e73a1977a75f9053bf6ab-1376x768.jpg",
        description:
            "Convert large scanner TIFF and TIF images to lightweight JPG format online for free. 100% private in-browser conversion with zero file size limits.",
        longDescription:
            "Convert heavy TIFF and TIF files from document scanners and professional cameras into lightweight, web-ready JPG images. While TIFF files provide pristine uncompressed quality for archival preservation, their huge file sizes make them impractical for email attachments, web uploads, and everyday viewing on mobile devices.\n\nScanned documents often contain sensitive personal information like bank records, tax forms, passports, and signed legal agreements. Because this converter operates 100% locally within your browser, your scanned records never travel over the internet. You get instant conversion without exposing private documents to external server vulnerabilities.\n\nReduce gigabytes of raw scanner output down to compact, clear JPEGs in moments. Process single pages or batch convert multi-page archives without artificial limits, subscription paywalls, or added watermarks.",
        tags: [
            "tiff to jpg",
            "scanner converter",
            "tif to jpeg",
            "document images",
            "image converter",
        ],
        keywords: [
            "convert tiff to jpg online free",
            "tif to jpg converter no upload",
            "shrink scanned tiff file size",
            "convert scanner tiff to jpeg free",
            "private tiff to jpg converter browser",
            "batch tiff to jpg converter",
            "open tiff file online free",
            "free tiff converter no watermark",
            "reduce large tiff to small jpg",
        ],
        steps: [
            {
                title: "Upload TIFF Scans",
                description:
                    "Select or drop your large .tiff or .tif scanned files into the converter.",
            },
            {
                title: "Process Locally",
                description:
                    "The tool renders your uncompressed scan data and converts it into optimized JPG.",
            },
            {
                title: "Download Compact JPG",
                description:
                    "Save the reduced JPG file, ready for hassle-free emailing and uploading.",
            },
        ],
        whatToExpect: [
            {
                title: "Massive Size Reduction",
                description:
                    "Turn 50MB+ scanner files into lightweight, easily shareable 2MB JPEGs.",
            },
            {
                title: "Confidential Document Safety",
                description:
                    "Personal records, contracts, and IDs stay secure on your local machine.",
            },
            {
                title: "High Legibility",
                description:
                    "Fine text, signatures, and document details remain clear and readable.",
            },
        ],
        faqs: [
            {
                question: "Why are TIFF files so large compared to JPGs?",
                answer: "TIFF is an uncompressed or losslessly compressed raster format designed for archiving raw scan detail, whereas JPG applies smart compression to minimize file size.",
            },
            {
                question: "Is it safe to convert sensitive legal contracts and IDs with this tool?",
                answer: "Yes. Processing takes place exclusively inside your browser using client-side JavaScript. Your documents never upload to any remote server or database.",
            },
            {
                question: "Can I convert both .tif and .tiff file extensions?",
                answer: "Yes. Both .tif and .tiff file formats are fully supported for conversion into standard JPG images.",
            },
            {
                question: "Will text on scanned documents remain readable after converting to JPG?",
                answer: "Yes. Our conversion algorithm maintains sharp contrast and resolution so fine print, legal clauses, and stamps stay legible.",
            },
        ],
    },
    {
        id: "pdf-to-jpg",
        category: "document",
        name: "PDF to JPG Converter",
        longName: "Free PDF to JPG Converter Online - Extract Pages as Images",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/e2424a4bf9f0aa4efdfa190f613c18aada349181-1376x768.jpg",
        description:
            "Convert PDF pages to high-resolution JPG images online for free. Extract individual pages or full documents privately in your browser with no uploads.",
        longDescription:
            "Turn multi-page PDF documents into crystal-clear JPG pictures without downloading bloated desktop utility software. Whether you need to pull high-res slides from a PDF presentation, extract figures from an academic paper, or convert document pages for social media sharing, this tool renders each page into an independent image file.\n\nPrivacy is essential when handling bank statements, employment contracts, and academic transcripts. Unlike conventional PDF websites that store your confidential documents on cloud servers, this tool renders pages locally using browser-based WebAssembly and Canvas APIs. Your documents never travel across the internet.\n\nEnjoy fast conversions with zero artificial limitations. Convert single-page certificates or thick multi-page manuals in seconds. Download specific individual pages as needed or export the entire collection in a well-structured ZIP archive.",
        tags: [
            "pdf to jpg",
            "pdf converter",
            "extract pdf images",
            "document converter",
            "pdf tools",
        ],
        keywords: [
            "convert pdf to jpg online free",
            "extract images from pdf no upload",
            "save pdf as high quality jpg",
            "pdf to jpeg converter client side",
            "convert multi page pdf to jpg free",
            "private pdf to image converter",
            "batch pdf to jpg converter browser",
            "free pdf page extractor no watermark",
            "turn pdf into picture online",
        ],
        steps: [
            {
                title: "Choose PDF Document",
                description: "Drag and drop your PDF file into the local in-browser converter.",
            },
            {
                title: "Render Pages",
                description:
                    "The tool generates high-resolution JPG previews of every individual page.",
            },
            {
                title: "Download Images",
                description:
                    "Save individual page images or download all rendered pages in a single ZIP file.",
            },
        ],
        whatToExpect: [
            {
                title: "Sharp Text & Graphics",
                description:
                    "Extract pages at full visual fidelity with clean typography and vivid diagrams.",
            },
            {
                title: "Complete Document Privacy",
                description:
                    "Sensitive PDFs remain confined to your device with zero cloud processing.",
            },
            {
                title: "Full Multi-Page Support",
                description:
                    "Convert comprehensive multi-page brochures, ebooks, and reports in one step.",
            },
        ],
        faqs: [
            {
                question: "Can I convert multi-page PDF files into separate images?",
                answer: "Yes. Every page in your PDF document is converted into an individual high-resolution JPG file that you can download separately or in a ZIP archive.",
            },
            {
                question: "Is my confidential PDF uploaded to your servers?",
                answer: "No. The document is rendered locally inside your browser memory using WebAssembly. Your files are never transmitted across the network.",
            },
            {
                question: "Will the text and diagrams in the exported JPG look blurry?",
                answer: "No. The converter renders PDF pages at a high pixel density to guarantee that text, tables, and vector graphics remain crisp and clear.",
            },
            {
                question: "Is there a limit on file size or page count?",
                answer: "Because processing happens locally on your computer or phone, there are no artificial file size caps or page count restrictions.",
            },
        ],
    },
];

export const fileConverterToolComponentMap: ToolComponentMap = {
    "jpg-to-png": dynamic(() => import("./component")),
    "png-to-jpg": dynamic(() => import("./component")),
    "pdf-to-jpg": dynamic(() => import("./component")),
    "webp-to-jpg": dynamic(() => import("./component")),
    "heic-to-jpg": dynamic(() => import("./component")),
    "tiff-to-jpg": dynamic(() => import("./component")),
    "all-in-one-image-converter": dynamic(() => import("./component")),
};

export const fileConverterToolConfigMap: Record<
    string,
    { acceptType: string; inputFormats: string[]; outputFormats: string[] }
> = {
    "jpg-to-png": {
        inputFormats: ["jpg", "jpeg"],
        acceptType: ".jpg,.jpeg",
        outputFormats: [...new Set(converter.getSupportedOutputFormats("jpg"))],
    },
    "png-to-jpg": {
        inputFormats: ["png"],
        acceptType: ".png",
        outputFormats: [...new Set(converter.getSupportedOutputFormats("png"))],
    },
    "webp-to-jpg": {
        inputFormats: ["webp"],
        acceptType: ".webp",
        outputFormats: [...new Set(converter.getSupportedOutputFormats("webp"))],
    },
    "heic-to-jpg": {
        inputFormats: ["heic", "heif"],
        acceptType: ".heic,.heif",
        outputFormats: [
            ...new Set([
                ...converter.getSupportedOutputFormats("heic"),
                ...converter.getSupportedOutputFormats("heif"),
            ]),
        ],
    },
    "tiff-to-jpg": {
        inputFormats: ["tiff", "tif"],
        acceptType: ".tiff,.tif",
        outputFormats: [
            ...new Set([
                ...converter.getSupportedOutputFormats("tif"),
                ...converter.getSupportedOutputFormats("tiff"),
            ]),
        ],
    },
    "pdf-to-jpg": {
        inputFormats: ["pdf"],
        acceptType: ".pdf",
        outputFormats: [...new Set([...converter.getSupportedOutputFormats("pdf")])],
    },
    "all-in-one-image-converter": {
        acceptType: "image/*",
        inputFormats: [
            "jpg",
            "jpeg",
            "png",
            "webp",
            "heic",
            "heif",
            "gif",
            "bmp",
            "svg",
            "tiff",
            "tif",
            "pdf",
        ],
        outputFormats: [],
    },
};
