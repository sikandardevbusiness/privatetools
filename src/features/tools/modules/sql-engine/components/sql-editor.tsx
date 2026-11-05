"use client";

import React, { memo, useMemo } from "react";
import { Loader2, PlayCircle } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { sql, SQLConfig } from "@codemirror/lang-sql";
import { EditorView } from "@codemirror/view";
import { githubDark } from "@uiw/codemirror-theme-github";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SQLEditorProps {
    value: string;
    tables: string[];
    isLoading: boolean;
    className?: string;
    columns: Record<string, string[]>;
    onExecute: () => void;
    onChange: (value: string) => void;
}

export const SQLEditor = memo(function SQLEditor({
    value,
    onChange,
    onExecute,
    tables,
    columns,
    isLoading,
    className,
}: SQLEditorProps) {
    const schema = useMemo<SQLConfig["schema"]>(() => {
        const dbSchema: Record<string, readonly string[]> = {};

        tables.forEach((table) => {
            dbSchema[table] = columns[table] || [];
        });

        return dbSchema;
    }, [tables, columns]);

    return (
        <div
            className={cn(
                "border border-border rounded-lg overflow-hidden bg-background w-full",
                className,
            )}
        >
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-background">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">SQL Query</span>
                    <span className="text-xs text-muted-foreground">Ctrl/Cmd + Enter to run</span>
                </div>
                <Button onClick={onExecute} disabled={isLoading} size="sm" className="gap-2">
                    {isLoading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Running...
                        </>
                    ) : (
                        <>
                            <PlayCircle className="h-4 w-4" />
                            Execute
                        </>
                    )}
                </Button>
            </div>
            <CodeMirror
                value={value}
                height="150px"
                theme={githubDark}
                extensions={[
                    sql({
                        schema,
                        upperCaseKeywords: true,
                    }),
                    EditorView.theme({
                        "&": {
                            fontSize: "14px",
                        },
                        ".cm-content": {
                            padding: "12px",
                        },
                        "&.cm-editor.cm-focused": {
                            outline: "none",
                        },
                    }),
                ]}
                onChange={onChange}
                onKeyDown={(e) => {
                    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                        e.preventDefault();
                        onExecute();
                    }
                }}
                className="w-full text-foreground"
            />
        </div>
    );
});
