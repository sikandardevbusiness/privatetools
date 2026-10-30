import dynamic from "next/dynamic";
import { converter } from "@sikandardevbusiness/file-converter";

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
    {
        id: "jpg-to-pdf",
        category: "document",
        name: "JPG to PDF Converter",
        longName: "Free JPG to PDF Converter Online - Combine Images to PDF",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/1b7678a39950937c08dac06bc619c88903a30348-1280x720.png",
        description:
            "Convert JPG images to PDF documents online for free. Combine multiple photos into a single PDF file instantly in your browser with no uploads.",
        longDescription:
            "Turn your JPG photos, receipts, and scanned documents into professional PDF files in seconds. Whether you need to submit a single ID card or combine multiple photos into a single organized document, this tool handles it locally in your browser.\n\nUnlike cloud-based converters that store your personal photos on remote servers, our tool processes everything 100% client-side. Your images never leave your device, ensuring complete privacy for sensitive documents like passports, bank statements, and contracts.\n\nEnjoy unlimited conversions with no watermarks, no file size limits, and no forced registrations. Simply drop your JPGs, arrange them if needed, and download your clean, professional PDF instantly.",
        tags: [
            "jpg to pdf",
            "image to pdf",
            "combine images",
            "document converter",
            "photo to pdf",
        ],
        keywords: [
            "convert jpg to pdf online free",
            "combine multiple jpg to single pdf",
            "image to pdf converter no upload",
            "free jpg to pdf maker no watermark",
            "client side jpg to pdf tool",
            "turn photos into pdf document",
            "private image to pdf converter",
            "batch jpg to pdf converter browser",
        ],
        steps: [
            {
                title: "Upload JPG Images",
                description: "Select or drag and drop one or multiple JPG files into the browser.",
            },
            {
                title: "Auto-Combine",
                description:
                    "The tool instantly packages your images into a clean, standardized PDF document.",
            },
            {
                title: "Download PDF",
                description:
                    "Save your new PDF file directly to your device, ready to share or print.",
            },
        ],
        whatToExpect: [
            {
                title: "Complete Privacy",
                description:
                    "Your photos and documents are processed locally and never uploaded to any server.",
            },
            {
                title: "Multiple Image Support",
                description:
                    "Easily combine dozens of separate JPGs into a single, multi-page PDF.",
            },
            {
                title: "Zero Quality Loss",
                description:
                    "Images are embedded at their original resolution for crisp, clear PDF documents.",
            },
        ],
        faqs: [
            {
                question: "Can I combine multiple JPG images into one PDF?",
                answer: "Yes! You can select multiple JPG files, and the tool will automatically combine them into a single, multi-page PDF document in the order you uploaded them.",
            },
            {
                question: "Are my photos uploaded to a server?",
                answer: "No. The conversion happens entirely in your browser using local JavaScript. Your files never leave your device.",
            },
            {
                question: "Is there a limit to how many images I can convert?",
                answer: "No. Because processing is done locally on your device, there are no artificial limits on file count or size.",
            },
        ],
    },
    {
        id: "png-to-pdf",
        category: "document",
        name: "PNG to PDF Converter",
        longName: "Free PNG to PDF Converter Online - Transparent to Document",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/8eca7d0aecf17f295ec625a47809b8af37f9b162-1280x720.png",
        description:
            "Convert PNG images to PDF documents online for free. Preserve transparency and combine multiple graphics into a single PDF locally.",
        longDescription:
            "Convert your PNG graphics, logos, and screenshots into professional PDF documents instantly. PNG files are perfect for graphics with transparent backgrounds, and this tool ensures they are cleanly embedded into a universal PDF format suitable for printing, emailing, or official submissions.\n\nAll processing happens 100% locally in your web browser. Your proprietary graphics, sensitive screenshots, and personal documents are never uploaded to external servers, guaranteeing absolute data privacy.\n\nThere are no watermarks, no daily limits, and no sign-ups required. Just drop your PNG files and download your perfectly formatted PDF in seconds.",
        tags: [
            "png to pdf",
            "image to pdf",
            "graphic converter",
            "document tools",
            "transparent to pdf",
        ],
        keywords: [
            "convert png to pdf online free",
            "png to pdf converter no watermark",
            "combine png images to pdf",
            "client side png to pdf tool",
            "free image to pdf maker browser",
            "private png to pdf converter",
            "turn png into pdf document free",
        ],
        steps: [
            {
                title: "Select PNG Files",
                description: "Upload one or multiple PNG images from your computer or phone.",
            },
            {
                title: "Instant Conversion",
                description: "The browser engine embeds your PNGs into a standardized PDF layout.",
            },
            {
                title: "Download Document",
                description: "Save the final PDF file to your device instantly.",
            },
        ],
        whatToExpect: [
            {
                title: "Transparency Handling",
                description:
                    "Transparent PNG backgrounds are cleanly rendered on a white canvas for professional PDF output.",
            },
            {
                title: "Local Processing",
                description:
                    "Your files remain on your device, ensuring total privacy and security.",
            },
            {
                title: "Fast & Unlimited",
                description:
                    "No server queues mean instant conversion, regardless of how many files you process.",
            },
        ],
        faqs: [
            {
                question: "What happens to transparent PNG backgrounds in the PDF?",
                answer: "Transparent areas are automatically rendered on a clean white background within the PDF, ensuring the document looks professional when printed or viewed.",
            },
            {
                question: "Is this PNG to PDF converter really free?",
                answer: "Yes, it is 100% free with no hidden fees, no watermarks, and no file size limits.",
            },
            {
                question: "Can I convert multiple PNGs at once?",
                answer: "Yes, you can batch upload multiple PNG files and combine them into a single multi-page PDF document.",
            },
        ],
    },
    {
        id: "webp-to-png",
        category: "image",
        name: "WEBP to PNG Converter",
        longName: "Free WEBP to PNG Converter Online - Edit Web Images",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/981ddc4c68fbe60a64a4d8d9d554e0e4eb893531-1280x720.png",
        description:
            "Convert WEBP images to PNG format online for free. Unlock web images for editing in Photoshop and other software with no server uploads.",
        longDescription:
            "Turn modern WEBP web images into universally editable PNG files. While WEBP is great for website speed, most professional editing software (like older versions of Photoshop) and operating systems still struggle to open or edit them. This converter solves that problem instantly.\n\nBy running entirely in your browser, this tool ensures your downloaded assets, design references, and personal images never touch a third-party server. You get the convenience of an online tool with the security of offline software.\n\nEnjoy lossless conversion that preserves original dimensions, transparency, and color accuracy. Batch convert dozens of WEBP files at once without watermarks or artificial limits.",
        tags: [
            "webp to png",
            "image converter",
            "web image editor",
            "lossless conversion",
            "design tools",
        ],
        keywords: [
            "convert webp to png online free",
            "save webp as png for photoshop",
            "webp to png converter no upload",
            "batch webp to png tool",
            "free webp converter without watermark",
            "client side webp to png changer",
            "open webp file as png",
        ],
        steps: [
            {
                title: "Upload WEBP Files",
                description: "Drag and drop your downloaded WEBP images into the browser.",
            },
            {
                title: "Lossless Conversion",
                description:
                    "The tool decodes the WEBP format and repackages it as a high-quality PNG.",
            },
            {
                title: "Download PNG",
                description: "Save the editable PNG files directly to your device.",
            },
        ],
        whatToExpect: [
            {
                title: "Software Compatibility",
                description:
                    "Make your web images editable in Photoshop, GIMP, Paint, and other standard graphic tools.",
            },
            {
                title: "Lossless Quality",
                description:
                    "PNG conversion preserves every pixel and transparency layer from the original WEBP.",
            },
            {
                title: "Absolute Privacy",
                description:
                    "Files are processed locally in your browser, keeping your design assets secure.",
            },
        ],
        faqs: [
            {
                question: "Why do I need to convert WEBP to PNG?",
                answer: "Many desktop image editors and older operating systems do not natively support the WEBP format. Converting to PNG makes the image universally editable.",
            },
            {
                question: "Will converting WEBP to PNG lose image quality?",
                answer: "No. PNG is a lossless format, meaning the converted image will retain the exact same visual quality and transparency as the original WEBP.",
            },
            {
                question: "Are my images uploaded to a server?",
                answer: "No. The conversion happens 100% locally in your browser memory. Your files never leave your device.",
            },
        ],
    },
    {
        id: "jpg-to-webp",
        category: "image",
        name: "JPG to WEBP Converter",
        longName: "Free JPG to WEBP Converter Online - Optimize for Web",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/c8f38e82862366609083b0c931a9bfbaa7d89fc5-1280x720.png",
        description:
            "Convert JPG images to WEBP format online for free. Drastically reduce image file size for faster website loading with no quality loss.",
        longDescription:
            "Optimize your JPG photos for the modern web by converting them to Google's highly efficient WEBP format. WEBP files are significantly smaller than JPGs while maintaining identical visual quality, making them the gold standard for fast-loading websites and better SEO.\n\nThis tool runs entirely in your browser, meaning you can optimize hundreds of product photos or blog images without uploading them to a slow, privacy-invasive cloud server. Your original files stay safely on your computer.\n\nEnjoy batch processing with adjustable quality settings. Shrink your image payloads by up to 30-50% without visible degradation, and download the optimized WEBP files instantly.",
        tags: [
            "jpg to webp",
            "image optimizer",
            "web performance",
            "file compressor",
            "photo converter",
        ],
        keywords: [
            "convert jpg to webp online free",
            "optimize images for web free",
            "jpg to webp converter no upload",
            "reduce image file size to webp",
            "batch jpg to webp converter",
            "free image optimizer no watermark",
            "client side jpg to webp tool",
        ],
        steps: [
            {
                title: "Select JPG Images",
                description: "Upload the JPG photos you want to optimize for the web.",
            },
            {
                title: "Optimize to WEBP",
                description:
                    "The browser compresses and converts the images to the efficient WEBP format.",
            },
            {
                title: "Download Optimized Files",
                description: "Save the lightweight WEBP images, ready for website upload.",
            },
        ],
        whatToExpect: [
            {
                title: "Massive Size Reduction",
                description:
                    "Cut image file sizes by 30-50% without noticeable loss in visual quality.",
            },
            {
                title: "Faster Website Speeds",
                description:
                    "WEBP images load faster, improving user experience and search engine rankings.",
            },
            {
                title: "Local Processing",
                description:
                    "Optimize your images privately on your own machine without server uploads.",
            },
        ],
        faqs: [
            {
                question: "Why should I convert JPG to WEBP?",
                answer: "WEBP provides superior compression compared to JPG, resulting in much smaller file sizes that load faster on websites, improving SEO and user experience.",
            },
            {
                question: "Will the WEBP image look worse than the JPG?",
                answer: "No. At standard quality settings, the visual difference is virtually imperceptible to the human eye, while the file size is significantly smaller.",
            },
            {
                question: "Can I convert multiple images at once?",
                answer: "Yes. You can batch upload multiple JPGs and convert them all to WEBP simultaneously in your browser.",
            },
        ],
    },
    {
        id: "tiff-to-png",
        category: "image",
        name: "TIFF to PNG Converter",
        longName: "Free TIFF to PNG Converter Online - Lossless Scanner Format",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/3776080e7ee3292a2c550e50c581bf7323806707-1280x720.png",
        description:
            "Convert large TIFF scanner files to PNG format online for free. Preserve lossless quality while making images web-friendly with no uploads.",
        longDescription:
            "Convert heavy, uncompressed TIFF files from professional cameras and document scanners into lightweight, web-ready PNG images. While TIFF is excellent for archival storage, its massive file sizes make it impractical for web use, email, or everyday viewing.\n\nUnlike standard JPG conversion which introduces compression artifacts, converting TIFF to PNG maintains strict lossless quality. Your fine text, sharp graphics, and transparent layers remain perfectly intact, but in a much more manageable file format.\n\nBecause this tool operates 100% locally in your browser, your sensitive scanned documents and proprietary design files never travel over the internet. Enjoy unlimited, watermark-free conversions with total peace of mind.",
        tags: [
            "tiff to png",
            "scanner converter",
            "lossless image",
            "document images",
            "tif converter",
        ],
        keywords: [
            "convert tiff to png online free",
            "tif to png converter no upload",
            "lossless tiff to png tool",
            "convert scanner tiff to png free",
            "private tiff to png converter browser",
            "batch tiff to png converter",
            "reduce tiff file size to png",
        ],
        steps: [
            {
                title: "Upload TIFF Files",
                description: "Select your large .tiff or .tif files from your computer.",
            },
            {
                title: "Lossless Conversion",
                description:
                    "The tool renders the uncompressed data into a highly efficient, lossless PNG.",
            },
            {
                title: "Download PNG",
                description: "Save the web-friendly PNG file, ready for sharing or editing.",
            },
        ],
        whatToExpect: [
            {
                title: "True Lossless Quality",
                description:
                    "Unlike JPG, PNG preserves every pixel of your original TIFF without compression artifacts.",
            },
            {
                title: "Significant Size Reduction",
                description:
                    "Make massive scanner files manageable for email and web use without sacrificing detail.",
            },
            {
                title: "Complete Privacy",
                description:
                    "Sensitive scans and documents are processed locally and never uploaded to any server.",
            },
        ],
        faqs: [
            {
                question: "Why convert TIFF to PNG instead of JPG?",
                answer: "PNG is a lossless format, meaning it preserves the exact sharpness and detail of your original TIFF file, whereas JPG introduces blurry compression artifacts.",
            },
            {
                question: "Are my scanned documents uploaded to a server?",
                answer: "No. All conversion happens locally in your browser memory. Your files never leave your device.",
            },
            {
                question: "Can I convert multiple TIFF files at once?",
                answer: "Yes. You can batch upload multiple TIFF files and convert them all to PNG simultaneously.",
            },
        ],
    },
    {
        id: "pdf-to-png",
        category: "document",
        name: "PDF to PNG Converter",
        longName: "Free PDF to PNG Converter Online - Extract Pages as Images",
        thumbnailUrl:
            "https://cdn.sanity.io/images/1cv2yjn3/production/9633d729d841643a8e15d868a7c52d6a36e7e47d-1280x720.png",
        description:
            "Convert PDF pages to high-resolution PNG images online for free. Extract individual pages or full documents privately in your browser.",
        longDescription:
            "Turn multi-page PDF documents into crystal-clear, high-resolution PNG pictures without downloading bloated desktop software. Whether you need to pull high-res slides from a PDF presentation, extract figures from an academic paper, or convert document pages for social media, this tool renders each page into an independent, lossless image file.\n\nPrivacy is essential when handling bank statements, contracts, and transcripts. Unlike conventional PDF websites that store your confidential documents on cloud servers, this tool renders pages locally using browser-based technology. Your documents never travel across the internet.\n\nEnjoy fast conversions with zero artificial limitations. Convert single-page certificates or thick multi-page manuals in seconds, and download specific individual pages or the entire collection in a ZIP archive.",
        tags: [
            "pdf to png",
            "pdf converter",
            "extract pdf images",
            "document converter",
            "pdf tools",
        ],
        keywords: [
            "convert pdf to png online free",
            "extract images from pdf no upload",
            "save pdf as high quality png",
            "pdf to png converter client side",
            "convert multi page pdf to png free",
            "private pdf to image converter",
            "batch pdf to png converter browser",
            "free pdf page extractor no watermark",
        ],
        steps: [
            {
                title: "Choose PDF Document",
                description: "Drag and drop your PDF file into the local in-browser converter.",
            },
            {
                title: "Render Pages",
                description:
                    "The tool generates high-resolution PNG previews of every individual page.",
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
                answer: "Yes. Every page in your PDF document is converted into an individual high-resolution PNG file that you can download separately or in a ZIP archive.",
            },
            {
                question: "Is my confidential PDF uploaded to your servers?",
                answer: "No. The document is rendered locally inside your browser memory. Your files are never transmitted across the network.",
            },
            {
                question: "Will the text and diagrams in the exported PNG look blurry?",
                answer: "No. The converter renders PDF pages at a high pixel density to guarantee that text, tables, and vector graphics remain crisp and clear.",
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
    "jpg-to-pdf": dynamic(() => import("./component")),
    "png-to-pdf": dynamic(() => import("./component")),
    "webp-to-png": dynamic(() => import("./component")),
    "jpg-to-webp": dynamic(() => import("./component")),
    "tiff-to-png": dynamic(() => import("./component")),
    "pdf-to-png": dynamic(() => import("./component")),
    "all-in-one-image-converter": dynamic(() => import("./component")),
};

export const fileConverterToolConfigMap: Record<
    string,
    { acceptType: string; inputFormats: string[]; outputFormats: string[]; defaultFormat: string }
> = {
    "jpg-to-png": {
        defaultFormat: "png",
        acceptType: ".jpg,.jpeg",
        inputFormats: ["jpg", "jpeg"],
        outputFormats: [...new Set(converter.getSupportedOutputFormats("jpg"))],
    },
    "png-to-jpg": {
        acceptType: ".png",
        defaultFormat: "jpg",
        inputFormats: ["png"],
        outputFormats: [...new Set(converter.getSupportedOutputFormats("png"))],
    },
    "webp-to-jpg": {
        acceptType: ".webp",
        defaultFormat: "jpg",
        inputFormats: ["webp"],
        outputFormats: [...new Set(converter.getSupportedOutputFormats("webp"))],
    },
    "heic-to-jpg": {
        defaultFormat: "jpg",
        acceptType: ".heic,.heif",
        inputFormats: ["heic", "heif"],
        outputFormats: [
            ...new Set([
                ...converter.getSupportedOutputFormats("heic"),
                ...converter.getSupportedOutputFormats("heif"),
            ]),
        ],
    },
    "tiff-to-jpg": {
        defaultFormat: "jpg",
        acceptType: ".tiff,.tif",
        inputFormats: ["tiff", "tif"],
        outputFormats: [
            ...new Set([
                ...converter.getSupportedOutputFormats("tif"),
                ...converter.getSupportedOutputFormats("tiff"),
            ]),
        ],
    },
    "pdf-to-jpg": {
        acceptType: ".pdf",
        defaultFormat: "jpg",
        inputFormats: ["pdf"],
        outputFormats: [...new Set([...converter.getSupportedOutputFormats("pdf")])],
    },
    "jpg-to-pdf": {
        defaultFormat: "pdf",
        acceptType: ".jpg,.jpeg",
        inputFormats: ["jpg", "jpeg"],
        outputFormats: [...new Set([...converter.getSupportedOutputFormats("jpg")])],
    },
    "png-to-pdf": {
        acceptType: ".png",
        defaultFormat: "pdf",
        inputFormats: ["png"],
        outputFormats: [...new Set([...converter.getSupportedOutputFormats("png")])],
    },
    "webp-to-png": {
        acceptType: ".webp",
        defaultFormat: "png",
        inputFormats: ["webp"],
        outputFormats: [...new Set([...converter.getSupportedOutputFormats("webp")])],
    },
    "jpg-to-webp": {
        defaultFormat: "webp",
        acceptType: ".jpg,.jpeg",
        inputFormats: ["jpg", "jpeg"],
        outputFormats: [...new Set([...converter.getSupportedOutputFormats("jpg")])],
    },
    "tiff-to-png": {
        defaultFormat: "png",
        acceptType: ".tiff,.tif",
        inputFormats: ["tiff", "tif"],
        outputFormats: [...new Set([...converter.getSupportedOutputFormats("tiff")])],
    },
    "pdf-to-png": {
        acceptType: ".pdf",
        defaultFormat: "png",
        inputFormats: ["pdf"],
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
        defaultFormat: "png", // Default for all-in-one
    },
};
