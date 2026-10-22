import { Code, FileText, Image, Lock, Music, Sparkles, Type, Video } from "lucide-react";

import { toolComponentMap, toolMetadataList } from "@/features/tools/registry";
import type { BaseTool, ToolDefinition } from "./types";

/**
 * Retrieves the lazy-loaded React component for a given tool ID.
 */
export function getToolComponentById(toolId: string): ToolDefinition["component"] | undefined {
    return toolComponentMap[toolId];
}

/**
 * Gets tools from the SAME category as the current tool.
 */
export function getRelatedTools(toolId: string, limit: number = 4): BaseTool[] {
    const currentTool = toolMetadataList.find((t) => t.id === toolId);
    if (!currentTool) return [];

    return toolMetadataList
        .filter((t) => t.id !== toolId && t.category === currentTool.category)
        .slice(0, limit);
}

/**
 * Gets a list of all unique categories available in the registry.
 */
export function getAllToolCategories(): string[] {
    return [...new Set(toolMetadataList.map((t) => t.category))];
}

/**
 * Gets tools from DIFFERENT categories to encourage exploration.
 * Picks 1 tool per different category up to the limit.
 */
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
// Category icon mapping
export function getCategoryIcon(category: string) {
    switch (category) {
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
        default:
            return Sparkles;
    }
}

export function getToolByPath(category: string, id: string) {
    const tool = toolMetadataList.find((t) => t.category === category && t.id === id);
    return tool;
}
