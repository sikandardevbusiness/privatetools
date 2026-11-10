"use client";

import { useState } from "react";
import { saveAs } from "file-saver";
import { ShieldCheck, FileKey, Link, AlertTriangle, Download } from "lucide-react";
import { sanitizeHar, SanitizeOptions, SanitizeStats } from "@sikandardevbusiness/har-sanitizer";

import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";

import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/ui/metric-card";
import {
    CodeBlock,
    CodeBlockActions,
    CodeBlockContent,
    CodeBlockCopyButton,
    CodeBlockFullscreenButton,
    CodeBlockHeader,
    CodeBlockTitle,
} from "@/components/ui/code-block";

import { SanitizeSettings } from "./settings";
import type { BaseTool } from "@/features/tools/shared/types";

export default function HarSanitizerClient({ tool }: { tool: BaseTool }) {
    const [fileName, setFileName] = useState<string>("");
    const [originalContent, setOriginalContent] = useState<string>("");
    const [sanitizedContent, setSanitizedContent] = useState<string>("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [stats, setStats] = useState<SanitizeStats | null>(null);

    // Settings state
    const [redactCookies, setRedactCookies] = useState(true);
    const [redactPostData, setRedactPostData] = useState(true);
    const [customRedactKeys, setCustomRedactKeys] = useState("");
    const [redactAuthHeaders, setRedactAuthHeaders] = useState(true);
    const [redactQueryParams, setRedactQueryParams] = useState(true);
    const [redactKnownTokens, setRedactKnownTokens] = useState(true);
    const [redactResponseBody, setRedactResponseBody] = useState(true);
    const [redactUrlCredentials, setRedactUrlCredentials] = useState(true);
    const [replacementPlaceholder, setReplacementPlaceholder] = useState("***REDACTED***");

    const handleFileSelect = async (selectedFiles: File[]) => {
        if (selectedFiles.length > 0) {
            const selectedFile = selectedFiles[0];
            setFileName(selectedFile.name);
            setSanitizedContent("");
            setStats(null);

            const text = await selectedFile.text();
            setOriginalContent(text);
        }
    };

    const handleSanitize = async () => {
        if (!originalContent) return;

        setIsProcessing(true);

        setTimeout(() => {
            try {
                const harData = JSON.parse(originalContent);

                const options: SanitizeOptions = {
                    redactCookies,
                    redactAuthHeaders,
                    redactQueryParams,
                    redactPostData,
                    redactResponseBody,
                    redactUrlCredentials,
                    redactKnownTokens,
                    customRedactKeys: customRedactKeys
                        .split(",")
                        .map((k) => k.trim())
                        .filter(Boolean),
                    replacementPlaceholder: replacementPlaceholder || "***REDACTED***",
                };

                const result = sanitizeHar(harData, options);

                setSanitizedContent(JSON.stringify(result.sanitizedHar, null, 2));
                setStats(result.stats);
            } catch (error) {
                console.error("Invalid HAR JSON", error);
            } finally {
                setIsProcessing(false);
            }
        }, 300);
    };

    const handleDownload = () => {
        if (!sanitizedContent || !fileName) return;
        const blob = new Blob([sanitizedContent], { type: "application/json" });
        const safeName = fileName.replace(/\.har$/i, "").replace(/\.json$/i, "");
        saveAs(blob, `sanitized_${safeName}.har`);
    };

    const handleReset = () => {
        setFileName("");
        setOriginalContent("");
        setSanitizedContent("");
        setStats(null);
        setRedactCookies(true);
        setRedactAuthHeaders(true);
        setRedactQueryParams(true);
        setRedactPostData(true);
        setRedactResponseBody(true);
        setRedactUrlCredentials(true);
        setRedactKnownTokens(true);
        setCustomRedactKeys("");
        setReplacementPlaceholder("***REDACTED***");
    };

    const hasInput = originalContent.trim().length > 0;

    return (
        <ToolShell>
            <ToolHeader tool={tool}>
                {!hasInput ? (
                    <FileUpload
                        multiple={false}
                        accept=".har,.json"
                        onFilesSelected={handleFileSelect}
                        allowedFormats={["har", "json"]}
                    />
                ) : (
                    <SanitizeSettings
                        redactCookies={redactCookies}
                        redactPostData={redactPostData}
                        setRedactCookies={setRedactCookies}
                        redactAuthHeaders={redactAuthHeaders}
                        redactQueryParams={redactQueryParams}
                        setRedactPostData={setRedactPostData}
                        redactResponseBody={redactResponseBody}
                        setRedactQueryParams={setRedactQueryParams}
                        setRedactResponseBody={setRedactResponseBody}
                        setRedactAuthHeaders={setRedactAuthHeaders}
                        redactUrlCredentials={redactUrlCredentials}
                        setRedactUrlCredentials={setRedactUrlCredentials}
                        redactKnownTokens={redactKnownTokens}
                        setRedactKnownTokens={setRedactKnownTokens}
                        customRedactKeys={customRedactKeys}
                        setCustomRedactKeys={setCustomRedactKeys}
                        replacementPlaceholder={replacementPlaceholder}
                        setReplacementPlaceholder={setReplacementPlaceholder}
                        isProcessing={isProcessing}
                        isSanitized={!!sanitizedContent}
                        onSanitize={handleSanitize}
                        onDownload={handleDownload}
                        onReset={handleReset}
                    />
                )}
            </ToolHeader>

            {hasInput && (
                <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8 pt-12">
                    {stats && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <MetricCard
                                title="Total Redactions"
                                value={stats.totalRedactions}
                                icon={ShieldCheck}
                                variant="primary"
                            />
                            <MetricCard
                                title="Headers & Cookies"
                                value={stats.headersRedacted + stats.cookiesRedacted}
                                icon={FileKey}
                                variant="warning"
                            />
                            <MetricCard
                                title="URLs & Query Params"
                                value={stats.urlsSanitized + stats.queryParamsRedacted}
                                icon={Link}
                                variant="info"
                            />
                            <MetricCard
                                title="Tokens & Bodies"
                                value={
                                    stats.tokensRedacted +
                                    stats.responseBodiesRedacted +
                                    stats.postParamsRedacted
                                }
                                icon={AlertTriangle}
                                variant="success"
                            />
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <CodeBlock fullscreen title={fileName || "original.json"} language="json">
                            <CodeBlockHeader>
                                <CodeBlockTitle>Original File</CodeBlockTitle>
                                <CodeBlockActions>
                                    <CodeBlockFullscreenButton />
                                    <CodeBlockCopyButton value={originalContent} />
                                </CodeBlockActions>
                            </CodeBlockHeader>
                            <CodeBlockContent language="json" className="max-h-180 overflow-y-auto">
                                {originalContent}
                            </CodeBlockContent>
                        </CodeBlock>

                        <CodeBlock
                            fullscreen
                            title={`sanitized_${(fileName || "file").replace(/\.(har|json)$/i, "")}.har`}
                            language="json"
                        >
                            <CodeBlockHeader>
                                <CodeBlockTitle>
                                    Sanitized Output {sanitizedContent && "(Changes Highlighted)"}
                                </CodeBlockTitle>
                                <CodeBlockActions>
                                    {sanitizedContent && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="gap-2 h-8"
                                            onClick={handleDownload}
                                        >
                                            <Download className="w-4 h-4" /> Download
                                        </Button>
                                    )}
                                    <CodeBlockFullscreenButton />
                                    <CodeBlockCopyButton
                                        value={sanitizedContent || "Sanitize first to see output"}
                                    />
                                </CodeBlockActions>
                            </CodeBlockHeader>
                            <CodeBlockContent language="json" className="max-h-180 overflow-y-auto">
                                {sanitizedContent ||
                                    "// Click 'Sanitize HAR File' in settings to generate sanitized output."}
                            </CodeBlockContent>
                        </CodeBlock>
                    </div>
                </div>
            )}
        </ToolShell>
    );
}
