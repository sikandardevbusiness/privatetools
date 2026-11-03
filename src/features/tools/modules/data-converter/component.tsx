"use client";

import { saveAs } from "file-saver";
import React, { useRef, useState, useCallback } from "react";
import { type ColumnDef, type Table as ReactTable } from "@tanstack/react-table";
import { dataConverter } from "@sikandardevbusiness/data-toolkit";

import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";
import { DataTable } from "@/components/data-table/data-table";
import { ConversionSettings } from "./settings";

import { dataConverterToolConfigMap } from "./index";
import { type DataTableFeatures } from "@/components/data-table/data-table-features";
import type { BaseTool } from "@/features/tools/shared/types";

type DataRow = Record<string, string | number | boolean | null | undefined>;

export default function DataConverterClient({ tool }: { tool: BaseTool }) {
    const [data, setData] = useState<DataRow[]>([]);
    const [fileName, setFileName] = useState<string>("");
    const [isProcessing, setIsProcessing] = useState(false);

    const tableRef = useRef<ReactTable<DataTableFeatures, DataRow> | null>(null);

    const config = dataConverterToolConfigMap[tool.id];
    const [targetFormat, setTargetFormat] = useState<string>(config.defaultFormat);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (selectedFiles: File[]) => {
        const selectedFile = selectedFiles[0];
        if (!selectedFile) return;

        setIsProcessing(true);
        setFileName(selectedFile.name);

        try {
            const parsedData = await dataConverter.read(selectedFile);
            setData(parsedData as DataRow[]);
        } catch (error) {
            console.error("Failed to parse file:", error);
            alert("Failed to parse file. Please ensure it is a valid file.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleConvertAndDownload = async () => {
        if (data.length === 0) return;
        if (!tableRef.current) return;

        const selectedRows = tableRef.current.getFilteredSelectedRowModel().rows;
        if (selectedRows.length === 0) {
            alert("Please select at least one row to export.");
            return;
        }

        setIsProcessing(true);
        try {
            const visibleCols = tableRef.current
                .getAllColumns()
                .filter((col) => col.id !== "select" && col.getCanHide() && col.getIsVisible())
                .map((col) => col.id);

            const colsToInclude = visibleCols.length > 0 ? visibleCols : Object.keys(data[0] || {});

            const filteredData = selectedRows.map((row) => {
                const originalRow = row.original as DataRow;
                const newRow: Record<string, unknown> = {};
                colsToInclude.forEach((key) => {
                    newRow[key] = originalRow[key];
                });
                return newRow;
            });

            const blob = await dataConverter.convertData(filteredData, targetFormat);

            const cleanName = fileName.replace(/\.[^/.]+$/, "");
            const newName = `${cleanName}_converted.${targetFormat}`;
            saveAs(blob, newName);
        } catch (error) {
            console.error("Conversion failed:", error);
            alert("Conversion failed. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    const columns: ColumnDef<DataTableFeatures, DataRow>[] = React.useMemo(
        () =>
            data.length > 0
                ? Object.keys(data[0]).map((key) => ({
                      id: key,
                      accessorFn: (row) => row[key],
                      header: () => (
                          <div className="flex items-center gap-2 bg-background text-foreground">
                              <span className="capitalize">{key.replace(/_/g, " ")}</span>
                          </div>
                      ),
                      cell: ({ getValue }) => {
                          const value = getValue();
                          return (
                              <div
                                  className="truncate max-w-50 bg-background text-foreground"
                                  title={String(value)}
                              >
                                  {value !== null && value !== undefined ? String(value) : "-"}
                              </div>
                          );
                      },
                  }))
                : [],
        [data],
    );

    const handleTableReady = useCallback(
        (tableInstance: ReactTable<DataTableFeatures, DataRow>) => {
            tableRef.current = tableInstance;
        },
        [],
    );

    return (
        <ToolShell>
            <ToolHeader tool={tool}>
                {data.length === 0 ? (
                    <FileUpload
                        accept={config.acceptType}
                        maxSizeMB={50}
                        multiple={false}
                        onFilesSelected={handleFileSelect}
                        allowedFormats={config.inputFormats}
                    />
                ) : (
                    <ConversionSettings
                        targetFormat={targetFormat}
                        isProcessing={isProcessing}
                        setTargetFormat={setTargetFormat}
                        outputFormats={config.outputFormats}
                        onDownload={handleConvertAndDownload}
                    />
                )}
            </ToolHeader>

            {data.length > 0 && (
                <div className="w-full max-w-7xl mx-auto md:px-8 px-4 pt-12 bg-background text-foreground">
                    <DataTable
                        key={fileName}
                        columns={columns}
                        data={data}
                        onTableReady={handleTableReady}
                    />
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept={config.acceptType}
                className="hidden"
                onChange={(e) => {
                    if (e.target.files) {
                        handleFileSelect(Array.from(e.target.files));
                    }
                }}
            />
        </ToolShell>
    );
}
