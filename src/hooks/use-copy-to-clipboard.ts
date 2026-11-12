"use client";

import { useState, useCallback } from "react";

interface UseCopyToClipboardReturn {
    copyToClipboard: (text: string) => Promise<void>;
    isCopied: boolean;
}

export function useCopyToClipboard(): UseCopyToClipboardReturn {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = useCallback(async (text: string) => {
        try {
            // Force the window to regain focus before copying
            // This prevents the "Document is not focused" error after async operations
            window.focus();

            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (error) {
            console.warn("Modern clipboard API failed, using fallback:", error);

            // Fallback for when document is not focused or in non-secure contexts
            const textArea = document.createElement("textarea");
            textArea.value = text;

            // Prevent scrolling to the element
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "0";

            document.body.appendChild(textArea);

            // Focus and select the text
            textArea.focus();
            textArea.select();

            try {
                const successful = document.execCommand("copy");
                if (successful) {
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                } else {
                    console.error("Fallback execCommand('copy') returned false");
                }
            } catch (err) {
                console.error("Fallback execCommand('copy') threw an error:", err);
            }

            // Clean up
            document.body.removeChild(textArea);
        }
    }, []);

    return { copyToClipboard, isCopied };
}
