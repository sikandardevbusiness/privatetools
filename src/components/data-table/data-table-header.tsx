"use client";

import * as React from "react";
import { type ReactTable, type RowData } from "@tanstack/react-table";
import { Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

import { type DataTableFeatures } from "./data-table-features";

interface DataTableHeaderProps<TData extends RowData> {
    table: ReactTable<DataTableFeatures, TData>;
}

export function DataTableHeader<TData extends RowData>({ table }: DataTableHeaderProps<TData>) {
    const [searchInput, setSearchInput] = React.useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchInput(value);

        // Regex to detect "fieldname:value" or "fieldname:"value""
        const fieldSearchMatch = value.match(/^([a-zA-Z0-9_]+):"?([^"]*)"?$/);

        if (fieldSearchMatch) {
            const [, fieldId, searchValue] = fieldSearchMatch;

            // ✅ FIX: Case-insensitive column lookup
            const targetColumn = table
                .getAllColumns()
                .find((col) => col.id.toLowerCase() === fieldId.toLowerCase());

            if (targetColumn) {
                // Field-specific search: Clear global, set column filter
                table.setGlobalFilter("");
                table.setColumnFilters([{ id: targetColumn.id, value: searchValue }]);
            } else {
                // Field doesn't exist, fallback to global search
                table.setGlobalFilter(value);
                table.setColumnFilters([]);
            }
        } else {
            // Normal global search: Clear column filters, set global filter
            table.setGlobalFilter(value);
            table.setColumnFilters([]);
        }
    };

    return (
        <div className="flex gap-4 flex-row items-center justify-between">
            <div className="flex flex-1 items-center gap-2">
                <Input
                    placeholder='Search all fields or type field:"value"...'
                    value={searchInput}
                    onChange={handleSearchChange}
                    className="max-w-sm"
                />
            </div>

            <div className="flex items-center gap-2 ml-auto">
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <Button variant="outline" size="sm" className="h-8">
                                <Settings2 className="h-4 w-4" /> View
                            </Button>
                        }
                    />
                    <DropdownMenuContent align="end" className="w-37.5">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {table
                                .getAllColumns()
                                .filter(
                                    (column) =>
                                        typeof column.accessorFn !== "undefined" &&
                                        column.getCanHide(),
                                )
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
