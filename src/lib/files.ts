"use client";

import {
    Database,
    FileCode,
    FileIcon,
    FileSpreadsheet,
    FileText,
    FileType,
    type LucideIcon,
} from "lucide-react";

export const FILE_TYPE_CONFIG: Record<string, { icon: LucideIcon; color: string }> = {
    json: { icon: FileCode, color: "text-yellow-500" },
    csv: { icon: FileSpreadsheet, color: "text-green-500" },
    tsv: { icon: FileSpreadsheet, color: "text-green-500" },
    xml: { icon: FileCode, color: "text-orange-500" },
    yaml: { icon: FileCode, color: "text-red-500" },
    yml: { icon: FileCode, color: "text-red-500" },
    sql: { icon: Database, color: "text-blue-500" },
    md: { icon: FileType, color: "text-gray-500" },
    markdown: { icon: FileType, color: "text-gray-500" },
    xlsx: { icon: FileSpreadsheet, color: "text-green-600" },
    xls: { icon: FileSpreadsheet, color: "text-green-600" },
    txt: { icon: FileText, color: "text-gray-500" },
    jpg: { icon: FileIcon, color: "text-purple-500" },
    jpeg: { icon: FileIcon, color: "text-purple-500" },
    png: { icon: FileIcon, color: "text-purple-500" },
    webp: { icon: FileIcon, color: "text-purple-500" },
    pdf: { icon: FileText, color: "text-red-600" },
};

export function getFileConfig(filename: string) {
    const ext = filename.split(".").pop()?.toLowerCase() || "txt";
    return FILE_TYPE_CONFIG[ext] || { icon: FileText, color: "text-gray-500" };
}
