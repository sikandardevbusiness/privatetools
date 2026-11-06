import {
    Code,
    Database,
    FileText,
    Flame,
    Image,
    Lock,
    Music,
    Sparkles,
    Type,
    Video,
} from "lucide-react";

import { toolComponentMap, toolMetadataList } from "@/features/tools/registry";
import type { BaseTool, ToolDefinition } from "./types";

export function getToolComponentById(toolId: string): ToolDefinition["component"] | undefined {
    return toolComponentMap[toolId];
}

export function getRelatedTools(toolId: string, limit: number = 4): BaseTool[] {
    const currentTool = toolMetadataList.find((t) => t.id === toolId);
    if (!currentTool) return [];

    return toolMetadataList
        .filter((t) => t.id !== toolId && t.category === currentTool.category)
        .slice(0, limit);
}

export function getAllToolCategories(): string[] {
    return [...new Set(toolMetadataList.map((t) => t.category))];
}

export function getDiverseTools(currentToolId: string, limit: number = 4): BaseTool[] {
    const currentTool = toolMetadataList.find((t) => t.id === currentToolId);
    if (!currentTool) return [];

    const otherCategories = getAllToolCategories().filter((cat) => cat !== currentTool.category);
    const diverseTools: BaseTool[] = [];

    for (const category of otherCategories) {
        const toolsInCategory = toolMetadataList.filter((t) => t.category === category);
        if (toolsInCategory.length > 0) {
            diverseTools.push(toolsInCategory[0]);
        }
        if (diverseTools.length >= limit) break;
    }

    return diverseTools;
}

// ✅ FIX: Added "data" and "new" category icons
export function getCategoryIcon(category: string) {
    switch (category.toLowerCase()) {
        case "image":
            return Image;
        case "document":
            return FileText;
        case "text":
            return Type;
        case "video":
            return Video;
        case "audio":
            return Music;
        case "privacy":
            return Lock;
        case "developer":
            return Code;
        case "data":
            return Database;
        case "new":
            return Flame;
        default:
            return Sparkles;
    }
}

export function getToolByPath(category: string, id: string) {
    const tool = toolMetadataList.find((t) => t.category === category && t.id === id);
    return tool;
}

/**
 * Checks if a tool was created within the last 30 days.
 * Intelligently parses both "YYYY-MM-DD" and "DD-MM-YYYY" formats.
 *
 * @param createdAt - The creation date string (e.g., "2026-11-06" or "06-11-2026")
 * @returns boolean - True if the tool is less than 30 days old
 */
export function isToolNew(createdAt?: string): boolean {
    if (!createdAt) return false;

    let createdTime = 0;
    const dateStr = createdAt.trim();
    const parts = dateStr.split("-");

    if (parts.length === 3) {
        if (parts[0].length === 4) {
            // Format is YYYY-MM-DD (e.g., "2026-11-06")
            createdTime = new Date(dateStr).getTime();
        } else {
            // Format is DD-MM-YYYY (e.g., "06-11-2026")
            const [day, month, year] = parts;
            createdTime = new Date(`${year}-${month}-${day}`).getTime();
        }
    } else {
        // Fallback for any other standard date string
        createdTime = new Date(dateStr).getTime();
    }

    const now = Date.now();
    const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;

    // Only return true if the date is valid and within the last 30 days
    return createdTime > 0 && now - createdTime < thirtyDaysInMs;
}
