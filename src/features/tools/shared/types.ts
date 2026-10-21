import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";
import { z } from "zod";

import { isBlob, isFile } from "./utils";

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
    longDescription: z.string(),
    category: toolCategorySchema,
    inputFormat: z.string().optional(),
    acceptType: z.string().optional(),
    isExperimental: z.boolean().optional(),
    faqs: z.array(faqItemSchema).default([]),
    keywords: z.array(z.string()).default([]),
    defaultOutputFormat: z.string().optional(),
    legacyPaths: z.array(z.string()).optional(),
    maxFileSizeMB: z.number().positive().optional(),
    supportedOutputFormats: z.array(z.string()).optional(),
});
export type BaseTool = z.infer<typeof baseToolSchema>;

export interface ToolDefinition extends BaseTool {
    icon?: LucideIcon;
    component: ComponentType<{ tool: BaseTool }>;
}

// 1. Reusable type definition for the component map dictionary
export type ToolComponentMap = Record<string, ToolDefinition["component"]>;

/* -------------------------------------------------------------------------- */
/*                             FILE & AUDIO SCHEMAS                           */
/* -------------------------------------------------------------------------- */

export const fileStatusSchema = z.enum(["pending", "processing", "completed", "error"]);
export type FileStatus = z.infer<typeof fileStatusSchema>;

export const processedFileSchema = z.object({
    id: z.string(),
    targetFormat: z.string(),
    status: fileStatusSchema,
    progress: z.number().min(0).max(100),
    file: z.custom<File>(isFile, { message: "Expected a File instance" }),
    error: z.string().nullable().optional(),
    outputBlob: z
        .union([z.string(), z.custom<Blob>(isBlob, { message: "Expected a Blob instance" })])
        .nullable()
        .optional(),
});
export type ProcessedFile = z.infer<typeof processedFileSchema>;

export const audioResultSchema = z.object({
    timeSaved: z.number(),
    newDuration: z.number(),
    originalDuration: z.number(),
    blob: z.custom<Blob>(isBlob, { message: "Expected a Blob instance" }),
});
export type AudioResult = z.infer<typeof audioResultSchema>;

export const processedAudioFileSchema = z.object({
    id: z.string(),
    url: z.string(),
    targetFormat: z.string(),
    status: fileStatusSchema,
    progress: z.number().min(0).max(100),
    error: z.string().nullable().optional(),
    result: audioResultSchema.nullable().optional(),
    file: z.custom<File>(isFile, { message: "Expected a File instance" }),
});
export type ProcessedAudioFile = z.infer<typeof processedAudioFileSchema>;
