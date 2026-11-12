"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Check, ChevronDown, FileText, Bot, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface LLMCopyButtonProps {
    url: string;
}

function getPromptUrl(baseURL: string, targetUrl: string, title: string) {
    return `${baseURL}?q=${encodeURIComponent(
        `I'm looking at this PrivateTools alternative page: ${title} (${targetUrl}). Help me understand the comparison and benefits. Be ready to explain concepts, give examples, or help debug based on it.`,
    )}`;
}

export function LLMCopyButton({ url }: LLMCopyButtonProps) {
    const { copyToClipboard, isCopied } = useCopyToClipboard();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleCopy = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const markdown = await response.text();
            await copyToClipboard(markdown);
            setIsDropdownOpen(false); // Close dropdown after copy
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    };

    return (
        <ButtonGroup>
            <Button variant="secondary" onClick={handleCopy} className="gap-2">
                {isCopied ? (
                    <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Copied!</span>
                    </>
                ) : (
                    <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Page</span>
                    </>
                )}
            </Button>

            <ButtonGroupSeparator />

            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger
                    render={
                        <Button variant="secondary" className="px-2">
                            <ChevronDown className="w-4 h-4" />
                        </Button>
                    }
                />
                <DropdownMenuContent align="end" className="w-47">
                    <DropdownMenuItem className="gap-2 p-0">
                        <Link
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 w-full px-2 py-1.5 cursor-pointer hover:bg-muted rounded-md"
                        >
                            <FileText className="w-4 h-4" />
                            <span>View as Markdown</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 p-0">
                        <a
                            href={getPromptUrl("https://v0.dev", url, "PrivateTools Alternative")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 w-full px-2 py-1.5 cursor-pointer hover:bg-muted rounded-md"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 147 70"
                                className="w-4 h-4"
                            >
                                <path d="M56 50.203V14h14v46.156C70 65.593 65.593 70 60.156 70c-2.596 0-5.158-1-7-2.843L0 14h19.797L56 50.203ZM147 56h-14V23.953L100.953 56H133v14H96.687C85.814 70 77 61.186 77 50.312V14h14v32.156L123.156 14H91V0h36.312C138.186 0 147 8.814 147 19.688V56Z" />
                            </svg>
                            <span>Open in v0</span>
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 p-0">
                        <a
                            href={getPromptUrl(
                                "https://chatgpt.com",
                                url,
                                "PrivateTools Alternative",
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 w-full px-2 py-1.5 cursor-pointer hover:bg-muted rounded-md"
                        >
                            <MessageSquare className="w-4 h-4" />
                            <span>Open in ChatGPT</span>
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 p-0">
                        <a
                            href={getPromptUrl(
                                "https://claude.ai/new",
                                url,
                                "PrivateTools Alternative",
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 w-full px-2 py-1.5 cursor-pointer hover:bg-muted rounded-md"
                        >
                            <Bot className="w-4 h-4" />
                            <span>Open in Claude</span>
                        </a>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </ButtonGroup>
    );
}
