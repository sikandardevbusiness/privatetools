"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { saveAs } from "file-saver";
import { Loader2, Database } from "lucide-react";

import {
    BrowserSQLEngine,
    type QueryResult,
    type LoadedFile,
} from "@sikandardevbusiness/data-toolkit";

import { ToolFullScreen } from "@/features/tools/shared/components/layouts/tool-fullscreen";
import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { SQLEditor } from "./components/sql-editor";
import { FileSidebar } from "./components/file-sidebar";
import { ResultsTable } from "./components/results-table";

import type { BaseTool } from "@/features/tools/shared/types";

export default function SQLEngineClient({ tool }: { tool: BaseTool }) {
    const [isLoading, setIsLoading] = useState(false);
    const [files, setFiles] = useState<LoadedFile[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [sqlQuery, setSqlQuery] = useState("SELECT * FROM ");
    const [activeFile, setActiveFile] = useState<string | null>(null);
    const [columns, setColumns] = useState<Record<string, string[]>>({});
    const [queryResult, setQueryResult] = useState<QueryResult | null>(null);

    const engineRef = useRef<BrowserSQLEngine | null>(null);

    // Initialize DuckDB on mount (no loading UI)
    useEffect(() => {
        const init = async () => {
            try {
                const engine = new BrowserSQLEngine();
                await engine.initialize();
                engineRef.current = engine;
            } catch (err) {
                console.error("Failed to initialize SQL engine:", err);
                // Don't show error to user yet, only when they try to upload
            }
        };
        init();

        return () => {
            engineRef.current?.disconnect();
        };
    }, []);

    const handleFileSelect = useCallback(
        async (selectedFiles: File[]) => {
            if (!engineRef.current) {
                setError("SQL engine not initialized. Please refresh the page.");
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                for (const file of selectedFiles) {
                    await engineRef.current.loadFile(file.name, file);
                }

                // Refresh file list
                const loadedFiles = await engineRef.current.getLoadedFiles();
                setFiles(loadedFiles);

                // Auto-select first file if none selected
                if (!activeFile && loadedFiles.length > 0) {
                    const firstFile = loadedFiles[0];
                    setActiveFile(firstFile.name);
                    setSqlQuery(`SELECT * FROM "${firstFile.name}" LIMIT 100`);

                    // Load schema
                    const schema = await engineRef.current.getTableSchema(firstFile.name);
                    setColumns((prev) => ({ ...prev, [firstFile.name]: schema }));
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load file");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        },
        [activeFile],
    );

    const handleFileSelectFromSidebar = useCallback(async (fileName: string) => {
        setActiveFile(fileName);
        if (!engineRef.current) return;

        try {
            const schema = await engineRef.current.getTableSchema(fileName);
            setColumns((prev) => ({ ...prev, [fileName]: schema }));
            setSqlQuery(`SELECT * FROM "${fileName}" LIMIT 100`);
        } catch (err) {
            setError("Failed to load file schema");
            console.error(err);
        }
    }, []);

    const handleAddMoreFiles = useCallback(async (selectedFiles: File[]) => {
        if (!engineRef.current) return;

        setIsLoading(true);
        setError(null);

        try {
            for (const file of selectedFiles) {
                await engineRef.current.loadFile(file.name, file);
            }

            const loadedFiles = await engineRef.current.getLoadedFiles();
            setFiles(loadedFiles);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to add files");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleDeleteFile = useCallback(
        async (fileName: string) => {
            if (!engineRef.current) return;

            try {
                // Drop the table from DuckDB
                const tableName = fileName.replace(/\.[^/.]+$/, "");
                await engineRef.current.executeQuery(`DROP TABLE IF EXISTS "${tableName}"`);

                // Remove from files list
                setFiles((prev) => prev.filter((f) => f.name !== fileName));

                // If deleted file was active, clear it
                if (activeFile === fileName) {
                    setActiveFile(null);
                    setQueryResult(null);
                    setSqlQuery("SELECT * FROM ");
                }
            } catch (err) {
                setError("Failed to delete file");
                console.error(err);
            }
        },
        [activeFile],
    );

    const handleExecuteQuery = useCallback(async () => {
        if (!engineRef.current || !sqlQuery) return;

        setIsLoading(true);
        setError(null);

        try {
            const result = await engineRef.current.executeQuery(sqlQuery);
            setQueryResult(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Query execution failed");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [sqlQuery]);

    const handleExportData = useCallback(
        async (scope: "active" | "all", format: "csv" | "json") => {
            if (!engineRef.current) return;

            setIsLoading(true);
            setError(null);

            try {
                if (scope === "active" && activeFile) {
                    // Export only the active file's current state
                    const query = `SELECT * FROM "${activeFile}"`;
                    const blob = await engineRef.current.exportQueryResult(query, format);
                    const cleanName = activeFile.replace(/\.[^/.]+$/, "");
                    saveAs(blob, `${cleanName}_export.${format}`);
                } else if (scope === "all") {
                    // Export all files individually
                    for (const file of files) {
                        const query = `SELECT * FROM "${file.name}"`;
                        const blob = await engineRef.current.exportQueryResult(query, format);
                        const cleanName = file.name.replace(/\.[^/.]+$/, "");
                        saveAs(blob, `${cleanName}_export.${format}`);

                        // Small delay to prevent browser from blocking multiple downloads
                        await new Promise((resolve) => setTimeout(resolve, 300));
                    }
                }
            } catch (err) {
                setError("Export failed");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        },
        [activeFile, files],
    );

    const handleClearFiles = useCallback(() => {
        setFiles([]);
        setActiveFile(null);
        setQueryResult(null);
        setSqlQuery("SELECT * FROM ");
        setColumns({});
        setError(null);
    }, []);

    // If no files are uploaded, show the clean upload screen
    if (files.length === 0) {
        return (
            <ToolHeader tool={tool}>
                <FileUpload
                    accept=".csv,.json"
                    multiple={true}
                    onFilesSelected={handleFileSelect}
                    allowedFormats={["csv", "json"]}
                />
            </ToolHeader>
        );
    }

    return (
        <ToolFullScreen
            title={tool.name}
            isFullScreen={true}
            onToggleFullScreen={handleClearFiles}
            sidebar={
                <FileSidebar
                    files={files}
                    isLoading={isLoading}
                    activeFile={activeFile}
                    onExport={handleExportData}
                    onAddFiles={handleAddMoreFiles}
                    onDeleteFile={handleDeleteFile}
                    onSelectFile={handleFileSelectFromSidebar}
                />
            }
        >
            <div className="flex flex-col h-full w-full gap-4">
                {/* SQL Editor Toolbar */}
                <div className="shrink-0">
                    <SQLEditor
                        value={sqlQuery}
                        onChange={setSqlQuery}
                        onExecute={handleExecuteQuery}
                        tables={files.map((f) => f.name)}
                        columns={columns}
                        isLoading={isLoading}
                    />
                </div>
                {error && (
                    <Alert variant="destructive" className="shrink-0">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                {/* Results Table or Empty State - This takes remaining space */}
                <div className="flex-1  min-h-0">
                    {isLoading ? (
                        <div className="h-full flex items-center justify-center border rounded-lg bg-muted/20 p-4">
                            <div className="flex flex-col items-center text-muted-foreground">
                                <Loader2 className="h-8 w-8 animate-spin mb-2 text-primary" />
                                <p className="text-sm font-medium">Processing query...</p>
                            </div>
                        </div>
                    ) : queryResult ? (
                        <ResultsTable
                            data={queryResult.rows}
                            columns={queryResult.columns}
                            isLoading={isLoading}
                        />
                    ) : (
                        <div className="h-full flex items-center justify-center border rounded-lg bg-muted/20 p-4">
                            <div className="text-center text-muted-foreground">
                                <Database className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                <p className="text-sm font-medium">
                                    Execute a query to see results
                                </p>
                                <p className="text-xs mt-1">
                                    Try:{" "}
                                    <code className="bg-muted px-2 py-1 rounded text-foreground">
                                        SELECT * FROM &quot;{activeFile}&quot; LIMIT 10
                                    </code>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ToolFullScreen>
    );
}
