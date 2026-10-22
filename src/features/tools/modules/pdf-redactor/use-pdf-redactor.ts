import { saveAs } from "file-saver";
import { PDFDocument, PDFName, rgb, StandardFonts } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";
import { useCallback, useEffect, useRef, useState } from "react";

if (typeof window !== "undefined") {
    const version = pdfjsLib.version || "6.3.289";
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.mjs`;
}

export type TextOverlayType = "Blank" | "REDACTED" | "CONFIDENTIAL" | "CUSTOM";

export interface RedactionSettings {
    color: string;
    customText?: string;
    stripMetadata: boolean;
    removeAnnotations: boolean;
    overlayText: TextOverlayType;
}

export interface CanvasRedactionBox {
    id: string;
    pageIndex: number;
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    overlayText: TextOverlayType;
}

export type ResizeDirection = "nw" | "n" | "ne" | "e" | "se" | "s" | "sw" | "w";
export type ActiveAction = "draw" | "move" | `resize-${ResizeDirection}` | null;

export function usePDFRedactor() {
    const [file, setFile] = useState<File | null>(null);
    const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
    const [pageNum, setPageNum] = useState(1);
    const [scale, setScale] = useState(1.5);

    const [redactions, setRedactions] = useState<CanvasRedactionBox[]>([]);
    const redactionsRef = useRef(redactions);
    useEffect(() => {
        redactionsRef.current = redactions;
    }, [redactions]);

    const [past, setPast] = useState<CanvasRedactionBox[][]>([]);
    const [future, setFuture] = useState<CanvasRedactionBox[][]>([]);

    const [activeAction, setActiveAction] = useState<ActiveAction>(null);
    const [activeBoxId, setActiveBoxId] = useState<string | null>(null);
    const [actionStart, setActionStart] = useState({
        x: 0,
        y: 0,
        boxX: 0,
        boxY: 0,
        boxW: 0,
        boxH: 0,
    });
    const [currentBox, setCurrentBox] = useState<{
        x: number;
        y: number;
        width: number;
        height: number;
    } | null>(null);

    const [settings, setSettings] = useState<RedactionSettings>({
        color: "#000000",
        overlayText: "REDACTED",
        customText: "",
        stripMetadata: true,
        removeAnnotations: true,
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [pageDimensions, setPageDimensions] = useState<
        Record<number, { width: number; height: number }>
    >({});

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const updateRedactions = (
        newRedactions:
            | CanvasRedactionBox[]
            | ((prev: CanvasRedactionBox[]) => CanvasRedactionBox[]),
    ) => {
        const resolved =
            typeof newRedactions === "function"
                ? newRedactions(redactionsRef.current)
                : newRedactions;
        setPast((prevPast) => [...prevPast, redactionsRef.current]);
        setRedactions(resolved);
        setFuture([]);
    };

    const handleUndo = () => {
        if (past.length > 0) {
            const previous = past[past.length - 1];
            const newPast = past.slice(0, -1);
            setPast(newPast);
            setFuture([redactions, ...future]);
            setRedactions(previous);
        }
    };

    const handleRedo = () => {
        if (future.length > 0) {
            const next = future[0];
            const newFuture = future.slice(1);
            setPast([...past, redactions]);
            setRedactions(next);
            setFuture(newFuture);
        }
    };

    const handleFileSelect = async (selectedFile: File) => {
        setFile(selectedFile);
        const arrayBuffer = await selectedFile.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const doc = await loadingTask.promise;
        setPdfDoc(doc);
        setPageNum(1);
        setPast([]);
        setFuture([]);
        setRedactions([]);

        const dims: Record<number, { width: number; height: number }> = {};
        for (let i = 1; i <= doc.numPages; i++) {
            const page = await doc.getPage(i);
            const viewport = page.getViewport({ scale: 1 });
            dims[i] = { width: viewport.width, height: viewport.height };
        }
        setPageDimensions(dims);
    };

    const renderPage = useCallback(async () => {
        if (!pdfDoc || !canvasRef.current) return;
        const page = await pdfDoc.getPage(pageNum);
        const viewport = page.getViewport({ scale });

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvas, viewport }).promise;
    }, [pdfDoc, pageNum, scale]);

    useEffect(() => {
        renderPage();
    }, [renderPage]);

    // ✅ BULLETPROOF FIX: Calculate mouse position relative to the CANVAS internal resolution.
    // This perfectly handles browser zoom, CSS scaling, and responsive resizing.
    const getMousePos = (e: React.MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };

        const rect = canvas.getBoundingClientRect();

        // Calculate the ratio between the canvas internal resolution and its displayed CSS size
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY,
        };
    };

    const handleContainerMouseDown = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest(".redaction-box")) return;
        e.preventDefault();
        const pos = getMousePos(e);
        setActiveAction("draw");
        setActionStart({ x: pos.x, y: pos.y, boxX: 0, boxY: 0, boxW: 0, boxH: 0 });
        setCurrentBox({ x: pos.x, y: pos.y, width: 0, height: 0 });
    };

    const startBoxAction = (e: React.MouseEvent, box: CanvasRedactionBox, action: ActiveAction) => {
        e.stopPropagation();
        e.preventDefault();
        setActiveAction(action);
        setActiveBoxId(box.id);
        const pos = getMousePos(e);
        setActionStart({
            x: pos.x,
            y: pos.y,
            boxX: box.x,
            boxY: box.y,
            boxW: box.width,
            boxH: box.height,
        });
    };

    const handleContainerMouseMove = (e: React.MouseEvent) => {
        if (!activeAction || !containerRef.current) return;
        const pos = getMousePos(e);

        if (activeAction === "draw") {
            setCurrentBox({
                x: actionStart.x,
                y: actionStart.y,
                width: pos.x - actionStart.x,
                height: pos.y - actionStart.y,
            });
        } else if (activeAction === "move" && activeBoxId) {
            const dx = (pos.x - actionStart.x) / scale;
            const dy = (pos.y - actionStart.y) / scale;
            setRedactions((prev) =>
                prev.map((r) =>
                    r.id === activeBoxId
                        ? { ...r, x: actionStart.boxX + dx, y: actionStart.boxY + dy }
                        : r,
                ),
            );
        } else if (activeAction.startsWith("resize-") && activeBoxId) {
            const dir = activeAction.replace("resize-", "");
            const dx = (pos.x - actionStart.x) / scale;
            const dy = (pos.y - actionStart.y) / scale;

            setRedactions((prev) =>
                prev.map((r) => {
                    if (r.id !== activeBoxId) return r;

                    let newX = actionStart.boxX;
                    let newY = actionStart.boxY;
                    let newW = actionStart.boxW;
                    let newH = actionStart.boxH;

                    if (dir.includes("w")) {
                        newX = actionStart.boxX + dx;
                        newW = actionStart.boxW - dx;
                    }
                    if (dir.includes("e")) {
                        newW = actionStart.boxW + dx;
                    }
                    if (dir.includes("n")) {
                        newY = actionStart.boxY + dy;
                        newH = actionStart.boxH - dy;
                    }
                    if (dir.includes("s")) {
                        newH = actionStart.boxH + dy;
                    }

                    if (newW < 5) {
                        if (dir.includes("w")) newX = actionStart.boxX + actionStart.boxW - 5;
                        newW = 5;
                    }
                    if (newH < 5) {
                        if (dir.includes("n")) newY = actionStart.boxY + actionStart.boxH - 5;
                        newH = 5;
                    }

                    return { ...r, x: newX, y: newY, width: newW, height: newH };
                }),
            );
        }
    };

    // Replace the ENTIRE handleContainerMouseUp function with this:

    const handleContainerMouseUp = () => {
        if (activeAction === "draw" && currentBox) {
            let x = currentBox.x;
            let y = currentBox.y;
            let w = currentBox.width;
            let h = currentBox.height;

            if (w < 0) {
                x += w;
                w = Math.abs(w);
            }
            if (h < 0) {
                y += h;
                h = Math.abs(h);
            }

            if (w >= 5 && h >= 5) {
                const newRedaction: CanvasRedactionBox = {
                    id: crypto.randomUUID(),
                    pageIndex: pageNum - 1,
                    x: x / scale, // ✅ Convert from scaled canvas coords to PDF coords
                    y: y / scale, // ✅ Convert from scaled canvas coords to PDF coords
                    width: w / scale, // ✅ Convert from scaled canvas coords to PDF coords
                    height: h / scale, // ✅ Convert from scaled canvas coords to PDF coords
                    color: settings.color,
                    overlayText: settings.overlayText,
                };
                updateRedactions((prev) => [...prev, newRedaction]);
            }
        } else if (activeAction === "move" || activeAction?.startsWith("resize-")) {
            updateRedactions((prev) => prev);
        }

        setActiveAction(null);
        setActiveBoxId(null);
        setCurrentBox(null);
    };

    const deleteRedaction = (id: string) => {
        updateRedactions((prev) => prev.filter((r) => r.id !== id));
    };

    const handleApplyAndDownload = async () => {
        if (!file || redactions.length === 0) return;
        setIsProcessing(true);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

            if (settings.stripMetadata) {
                pdfDoc.setTitle("");
                pdfDoc.setAuthor("");
                pdfDoc.setSubject("");
                pdfDoc.setKeywords([]);
                pdfDoc.setProducer("");
                pdfDoc.setCreator("");
            }

            if (settings.removeAnnotations) {
                for (const page of pdfDoc.getPages()) {
                    page.node.delete(PDFName.of("Annots"));
                }
            }

            const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

            for (const box of redactions) {
                const dims = pageDimensions[box.pageIndex + 1];
                if (!dims) continue;

                const pdfX = box.x;
                const pdfY = dims.height - (box.y + box.height);
                const pdfW = box.width;
                const pdfH = box.height;

                const r = parseInt(box.color.slice(1, 3), 16) / 255;
                const g = parseInt(box.color.slice(3, 5), 16) / 255;
                const b = parseInt(box.color.slice(5, 7), 16) / 255;

                pdfDoc.getPage(box.pageIndex).drawRectangle({
                    x: pdfX,
                    y: pdfY + 10,
                    width: pdfW,
                    height: pdfH,
                    color: rgb(r, g, b),
                });

                const textToDraw =
                    box.overlayText === "CUSTOM"
                        ? settings.customText || "REDACTED"
                        : box.overlayText;

                if (textToDraw && textToDraw !== "Blank") {
                    let textSize = pdfH * 0.5;
                    let textWidth = font.widthOfTextAtSize(textToDraw, textSize);

                    if (textWidth > pdfW * 0.9) {
                        textSize = textSize * ((pdfW * 0.9) / textWidth);
                        textWidth = font.widthOfTextAtSize(textToDraw, textSize);
                    }

                    const textHeight = textSize;
                    if (textHeight > pdfH * 0.8) {
                        textSize = textSize * ((pdfH * 0.8) / textHeight);
                    }

                    textWidth = font.widthOfTextAtSize(textToDraw, textSize);

                    pdfDoc.getPage(box.pageIndex).drawText(textToDraw, {
                        x: pdfX + (pdfW - textWidth) / 2,
                        y: pdfY + (pdfH - textSize) / 2 + 10,
                        size: textSize,
                        font,
                        color: rgb(1, 1, 1),
                    });
                }
            }

            const redactedBytes = await pdfDoc.save({ useObjectStreams: false });
            const safeBuffer = redactedBytes.buffer.slice(
                redactedBytes.byteOffset,
                redactedBytes.byteOffset + redactedBytes.byteLength,
            ) as ArrayBuffer;

            const blob = new Blob([safeBuffer], { type: "application/pdf" });
            saveAs(blob, `redacted_${file.name}`);
        } catch (error) {
            console.error("Redaction failed:", error);
            alert("Failed to process PDF. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    const reset = () => {
        setFile(null);
        setPdfDoc(null);
        setPast([]);
        setFuture([]);
        setRedactions([]);
        setPageNum(1);
    };

    return {
        file,
        pdfDoc,
        pageNum,
        scale,
        redactions,
        settings,
        isProcessing,
        canvasRef,
        containerRef,
        currentBox,
        past,
        future,
        pageDimensions,
        handleFileSelect,
        setPageNum,
        setScale,
        setSettings,
        handleContainerMouseDown,
        startBoxAction,
        handleContainerMouseMove,
        handleContainerMouseUp,
        handleUndo,
        handleRedo,
        deleteRedaction,
        handleApplyAndDownload,
        reset,
    };
}
