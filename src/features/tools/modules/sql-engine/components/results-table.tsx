"use client";

import { useState } from "react";
import { useTable, type ColumnDef, type SortingState } from "@tanstack/react-table";
import { ArrowUpDown, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";
import { features, type DataTableFeatures } from "./data-table-features";

interface ResultsTableProps {
    data: Record<string, unknown>[];
    columns: string[];
    isLoading?: boolean;
    className?: string;
}

export function ResultsTable({ data, columns, isLoading, className }: ResultsTableProps) {
    const [sorting, setSorting] = useState<SortingState>([]);

    const tableColumns: ColumnDef<DataTableFeatures, Record<string, unknown>>[] = columns.map(
        (col) => ({
            id: col,
            accessorKey: col,
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-8 px-2 hover:bg-accent font-semibold capitalize"
                >
                    {col}
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
            ),
            cell: ({ getValue }) => {
                const value = getValue();
                return (
                    <div className="truncate max-w-md text-left pl-2" title={String(value)}>
                        {value !== null && value !== undefined ? (
                            String(value)
                        ) : (
                            <span className="text-muted-foreground italic">null</span>
                        )}
                    </div>
                );
            },
        }),
    );

    const table = useTable({
        features,
        data,
        columns: tableColumns,
        onSortingChange: setSorting,
        state: {
            sorting,
        },
        initialState: {
            pagination: {
                pageIndex: 0, // FIX: pageIndex is 0-indexed in v9
                pageSize: 10,
            },
        },
    });

    if (isLoading) {
        return (
            <div className={cn("flex items-center justify-center h-64", className)}>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 />
                    Loading results...
                </div>
            </div>
        );
    }

    return (
        <div className={cn("border rounded-lg bg-background flex flex-col", className)}>
            <div className="overflow-auto flex-1">
                <Table>
                    <TableHeader className="bg-muted/20 sticky top-0">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="h-10 px-3 text-foreground"
                                    >
                                        {header.isPlaceholder ? null : table.FlexRender({ header })}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} className="hover:bg-accent/50">
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="px-3 py-2 text-foreground"
                                        >
                                            {table.FlexRender({ cell })}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center text-muted-foreground"
                                >
                                    No results found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between px-4 py-2 border-t bg-muted/20">
                <div className="text-sm text-muted-foreground">
                    {/* FIX: Use getPaginatedRowModel() instead of getPaginationRowModel() */}
                    Showing {table.getPaginatedRowModel().rows.length} of {data.length} rows
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
