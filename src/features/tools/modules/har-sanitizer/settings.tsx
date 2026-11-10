"use client";

import { Settings2, Download, RotateCcw } from "lucide-react";
import { memo } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export interface SanitizeSettingsProps {
    redactCookies: boolean;
    redactAuthHeaders: boolean;
    redactQueryParams: boolean;
    redactPostData: boolean;
    redactResponseBody: boolean;
    redactUrlCredentials: boolean;
    redactKnownTokens: boolean;
    customRedactKeys: string;
    replacementPlaceholder: string;
    setRedactCookies: (v: boolean) => void;
    setRedactAuthHeaders: (v: boolean) => void;
    setRedactQueryParams: (v: boolean) => void;
    setRedactPostData: (v: boolean) => void;
    setRedactResponseBody: (v: boolean) => void;
    setRedactUrlCredentials: (v: boolean) => void;
    setRedactKnownTokens: (v: boolean) => void;
    setCustomRedactKeys: (v: string) => void;
    setReplacementPlaceholder: (v: string) => void;
    isProcessing: boolean;
    isSanitized: boolean;
    onSanitize: () => void;
    onDownload: () => void;
    onReset: () => void;
}

export const SanitizeSettings = memo(function SanitizeSettings({
    redactCookies,
    redactAuthHeaders,
    redactQueryParams,
    redactPostData,
    redactResponseBody,
    redactUrlCredentials,
    redactKnownTokens,
    customRedactKeys,
    replacementPlaceholder,
    setRedactCookies,
    setRedactAuthHeaders,
    setRedactQueryParams,
    setRedactPostData,
    setRedactResponseBody,
    setRedactUrlCredentials,
    setRedactKnownTokens,
    setCustomRedactKeys,
    setReplacementPlaceholder,
    isProcessing,
    isSanitized,
    onSanitize,
    onDownload,
    onReset,
}: SanitizeSettingsProps) {
    return (
        <Card className="w-full">
            <CardContent className="space-y-6">
                {/* Header with Reset Button */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Settings2 className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">
                            Sanitization Settings
                        </span>
                    </div>
                    <Button variant="outline" size="sm" onClick={onReset}>
                        <RotateCcw />
                        Reset
                    </Button>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground -mt-2">
                    Configure what sensitive data to redact from your HAR file. All processing
                    happens locally in your browser.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="redact-cookies"
                            checked={redactCookies}
                            onCheckedChange={(v) => setRedactCookies(v as boolean)}
                        />
                        <Label htmlFor="redact-cookies" className="text-sm cursor-pointer">
                            Redact Cookies
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="redact-auth"
                            checked={redactAuthHeaders}
                            onCheckedChange={(v) => setRedactAuthHeaders(v as boolean)}
                        />
                        <Label htmlFor="redact-auth" className="text-sm cursor-pointer">
                            Redact Auth Headers
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="redact-query"
                            checked={redactQueryParams}
                            onCheckedChange={(v) => setRedactQueryParams(v as boolean)}
                        />
                        <Label htmlFor="redact-query" className="text-sm cursor-pointer">
                            Redact Query Params
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="redact-post"
                            checked={redactPostData}
                            onCheckedChange={(v) => setRedactPostData(v as boolean)}
                        />
                        <Label htmlFor="redact-post" className="text-sm cursor-pointer">
                            Redact POST Data
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="redact-response"
                            checked={redactResponseBody}
                            onCheckedChange={(v) => setRedactResponseBody(v as boolean)}
                        />
                        <Label htmlFor="redact-response" className="text-sm cursor-pointer">
                            Redact Response Body
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="redact-url"
                            checked={redactUrlCredentials}
                            onCheckedChange={(v) => setRedactUrlCredentials(v as boolean)}
                        />
                        <Label htmlFor="redact-url" className="text-sm cursor-pointer">
                            Redact URL Credentials
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2 sm:col-span-2">
                        <Checkbox
                            id="redact-tokens"
                            checked={redactKnownTokens}
                            onCheckedChange={(v) => setRedactKnownTokens(v as boolean)}
                        />
                        <Label htmlFor="redact-tokens" className="text-sm cursor-pointer">
                            Scan for Known Tokens (JWT, AWS, Stripe, GitHub, etc.)
                        </Label>
                    </div>
                </div>

                {/* Custom Replacement Placeholder */}
                <div className="space-y-2">
                    <Label
                        htmlFor="replacement-placeholder"
                        className="text-xs text-muted-foreground"
                    >
                        Replacement Placeholder
                    </Label>
                    <Input
                        id="replacement-placeholder"
                        placeholder="***REDACTED***"
                        value={replacementPlaceholder}
                        onChange={(e) => setReplacementPlaceholder(e.target.value)}
                        className="h-9"
                    />
                    <p className="text-[10px] text-muted-foreground">
                        Custom text to replace sensitive values with. Default is {'"'}***REDACTED***
                        {'"'}.
                    </p>
                </div>

                <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">
                        Custom Keys to Redact (comma-separated)
                    </Label>
                    <Input
                        placeholder="e.g., x-api-key, my-secret-header"
                        value={customRedactKeys}
                        onChange={(e) => setCustomRedactKeys(e.target.value)}
                        className="h-9"
                    />
                    <p className="text-[10px] text-muted-foreground">
                        Additional field or parameter names to redact (case-insensitive).
                    </p>
                </div>

                {!isSanitized ? (
                    <Button
                        onClick={onSanitize}
                        disabled={isProcessing}
                        size="lg"
                        className="w-full"
                    >
                        {isProcessing ? "Sanitizing..." : "Sanitize HAR File"}
                    </Button>
                ) : (
                    <Button onClick={onDownload} size="lg" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Download Sanitized HAR
                    </Button>
                )}
            </CardContent>
        </Card>
    );
});
