import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";
import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*                                CATEGORIES & FAQS                           */
/* -------------------------------------------------------------------------- */

export const faqItemSchema = z.object({
    question: z.string(),
    answer: z.string(),
});
export type FAQItem = z.infer<typeof faqItemSchema>;

export const toolCategorySchema = z.enum([
    "text",
    "audio",
    "image",
    "video",
    "creator",
    "privacy",
    "document",
    "developer",
]);
export type ToolCategory = z.infer<typeof toolCategorySchema>;

/* -------------------------------------------------------------------------- */
/*                                 BASE SCHEMAS                               */
/* -------------------------------------------------------------------------- */

export const baseToolSchema = z.object({
    id: z.string(),
    name: z.string(),
    thumbnailUrl: z.url(),
    description: z.string(),
    tags: z.array(z.string()),
    longDescription: z.string(),
    category: toolCategorySchema,
    createdAt: z.string().optional(),
    isExperimental: z.boolean().optional(),
    faqs: z.array(faqItemSchema).default([]),
    keywords: z.array(z.string()).default([]),
});
export type BaseTool = z.infer<typeof baseToolSchema>;

export interface ToolDefinition extends BaseTool {
    icon?: LucideIcon;
    component: ComponentType<{ tool: BaseTool }>;
}

// 1. Reusable type definition for the component map dictionary
export type ToolComponentMap = Record<string, ToolDefinition["component"]>;
