"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon, Maximize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { codeToHtml } from "shiki";
import { useTheme } from "next-themes";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------
export interface CodeBlockProps extends React.ComponentProps<"div"> {
    variant?: "default" | "destructive";
    size?: "default" | "sm";
    title?: string;
    language?: string;
    fullscreen?: boolean;
}

export interface CodeBlockContentProps extends React.ComponentProps<"div"> {
    lineNumbers?: boolean;
    language?: string;
}

interface ShikiNode {
    properties: Record<string, unknown>;
}

interface CustomShikiTransformer {
    name: string;
    line?: (node: ShikiNode, line: number) => void;
}

// -----------------------------------------------------------------------------
// Context
// -----------------------------------------------------------------------------
const CodeBlockContext = React.createContext<{
    isFullscreen: boolean;
    setIsFullscreen: (v: boolean) => void;
    title?: string;
    language?: string;
} | null>(null);

// -----------------------------------------------------------------------------
// Variants
// -----------------------------------------------------------------------------
const codeBlockVariants = cva(
    "group/code-block relative flex w-full min-w-0 flex-col overflow-hidden rounded-xl border text-sm",
    {
        variants: {
            variant: {
                default: "bg-secondary text-foreground border-border",
                destructive: "bg-destructive/10 text-destructive border-destructive/20",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

// -----------------------------------------------------------------------------
// Components
// -----------------------------------------------------------------------------
export function CodeBlock({
    className,
    variant = "default",
    size = "default",
    title,
    language,
    fullscreen = false,
    children,
    ...props
}: CodeBlockProps) {
    const [isFullscreen, setIsFullscreen] = React.useState(false);

    // Disable root level scrolling when fullscreen (matching ToolFullScreen logic)
    React.useEffect(() => {
        if (isFullscreen) {
            document.documentElement.classList.add("overflow-y-hidden");
            document.body.classList.add("overflow-y-hidden");
        } else {
            document.documentElement.classList.remove("overflow-y-hidden");
            document.body.classList.remove("overflow-y-hidden");
        }
        return () => {
            document.documentElement.classList.remove("overflow-y-hidden");
            document.body.classList.remove("overflow-y-hidden");
        };
    }, [isFullscreen]);

    if (isFullscreen && fullscreen) {
        return (
            <div className="fixed inset-0 z-50 bg-background flex flex-col w-full h-full">
                {/* Only a close button, NO title header */}
                <div className="absolute top-4 right-4 z-50">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-md hover:bg-muted"
                        onClick={() => setIsFullscreen(false)}
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>
                {/* Full width and height for the code */}
                <div className="flex-1 w-full h-full overflow-auto">{children}</div>
            </div>
        );
    }

    return (
        <CodeBlockContext.Provider value={{ isFullscreen, setIsFullscreen, title, language }}>
            <div
                data-slot="code-block"
                data-variant={variant}
                data-size={size}
                className={cn(codeBlockVariants({ variant }), className)}
                {...props}
            >
                {children}
            </div>
        </CodeBlockContext.Provider>
    );
}

export function CodeBlockHeader({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="code-block-header"
            className={cn(
                "flex min-w-0 shrink-0 items-center justify-between gap-2 border-b px-3 py-2 text-xs text-muted-foreground bg-background/50",
                className,
            )}
            {...props}
        />
    );
}

export function CodeBlockTitle({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="code-block-title"
            className={cn(
                "flex items-center gap-2 font-mono text-xs font-medium text-foreground truncate",
                className,
            )}
            {...props}
        />
    );
}

export function CodeBlockActions({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="code-block-actions"
            className={cn("flex items-center gap-1 shrink-0", className)}
            {...props}
        />
    );
}

export function CodeBlockCopyButton({
    value,
    className,
    onClick,
    ...props
}: React.ComponentProps<typeof Button> & { value: string }) {
    const [copied, setCopied] = React.useState(false);

    React.useEffect(() => {
        if (!copied) return;
        const timer = setTimeout(() => setCopied(false), 2000);
        return () => clearTimeout(timer);
    }, [copied]);

    return (
        <Button
            data-slot="code-block-copy-button"
            variant="ghost"
            size="icon" // Icon only, NO text
            className={cn(
                "h-7 w-7 rounded-md text-muted-foreground hover:text-foreground",
                className,
            )}
            aria-label={copied ? "Copied" : "Copy code"}
            onClick={(e) => {
                onClick?.(e);
                if (value) {
                    navigator.clipboard.writeText(value).then(() => setCopied(true));
                }
            }}
            {...props}
        >
            {copied ? (
                <CheckIcon className="h-4 w-4 text-emerald-500" />
            ) : (
                <CopyIcon className="h-4 w-4" />
            )}
        </Button>
    );
}

export function CodeBlockFullscreenButton({
    className,
    ...props
}: React.ComponentProps<typeof Button>) {
    const context = React.useContext(CodeBlockContext);
    if (!context) return null;

    return (
        <Button
            variant="ghost"
            size="icon" // Icon only, NO text
            className={cn(
                "h-7 w-7 rounded-md text-muted-foreground hover:text-foreground",
                className,
            )}
            aria-label="Toggle fullscreen"
            onClick={() => context.setIsFullscreen(true)}
            {...props}
        >
            <Maximize2 className="h-4 w-4" />
        </Button>
    );
}

export function CodeBlockContent({
    className,
    children,
    lineNumbers = false,
    language = "plaintext",
    ...props
}: CodeBlockContentProps) {
    const [html, setHtml] = React.useState<string>("");
    const { theme: currentTheme, systemTheme } = useTheme();
    const code = typeof children === "string" ? children : "";

    const selectedTheme = React.useMemo(() => {
        const resolvedTheme = currentTheme === "system" ? systemTheme : currentTheme;
        return resolvedTheme === "dark" ? "github-dark" : "github-light";
    }, [currentTheme, systemTheme]);

    React.useEffect(() => {
        const highlight = async () => {
            try {
                const transformers: CustomShikiTransformer[] = lineNumbers
                    ? [
                          {
                              name: "add-data-line",
                              line(node: ShikiNode, line: number) {
                                  if (node.properties) {
                                      node.properties["data-line"] = String(line);
                                  }
                              },
                          },
                      ]
                    : [];

                const result = await codeToHtml(code, {
                    lang: language === "plaintext" ? "text" : language,
                    theme: selectedTheme,
                    transformers,
                });
                setHtml(result);
            } catch (error) {
                console.error("Shiki highlighting error:", error);
            }
        };
        if (code) highlight();
    }, [code, language, selectedTheme, lineNumbers]);

    return (
        <div
            data-slot="code-block-content"
            className={cn("w-full h-full overflow-auto bg-background font-mono text-sm", className)}
            {...props}
        >
            {html ? (
                <div
                    dangerouslySetInnerHTML={{ __html: html }}
                    className={cn(
                        "[&>pre]:m-0",
                        "[&>pre]:bg-transparent!",
                        "[&>pre]:p-4",
                        "[&>pre]:w-full",
                        lineNumbers && "[&>pre]:grid [&>pre]:grid-cols-[auto_1fr] [&>pre]:gap-x-4",
                        lineNumbers && "[&>pre>code]:block",
                        lineNumbers && "[&>pre>code>.line]:relative [&>pre>code>.line]:pl-4",
                        lineNumbers &&
                            "[&>pre>code>.line::before]:absolute [&>pre>code>.line::before]:left-0 [&>pre>code>.line::before]:w-8 [&>pre>code>.line::before]:text-right [&>pre>code>.line::before]:pr-3 [&>pre>code>.line::before]:text-muted-foreground/40 [&>pre>code>.line::before]:select-none",
                        lineNumbers && "[&>pre>code>.line::before]:content-[attr(data-line)]",
                    )}
                />
            ) : (
                <pre className="p-4 w-full m-0 bg-transparent">
                    <code>{code}</code>
                </pre>
            )}
        </div>
    );
}

export default CodeBlock;
