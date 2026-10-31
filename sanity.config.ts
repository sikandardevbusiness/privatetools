"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { media } from "sanity-plugin-media";
import { structureTool } from "sanity/structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { schema, structure } from "./src/lib/sanity";

// Enviorment Variables
const studioTitle = process.env.NEXT_PUBLIC_SANITY_NAME || process.env.SANITY_STUDIO_NAME;
const studioProjectId =
    process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const studioDataset = process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!studioProjectId) {
    throw new Error(
        "Sanity Configuration Error: Project ID initialization token is missing from environment variables.",
    );
}

export default defineConfig({
    basePath: "/studio",
    title: studioTitle,
    dataset: studioDataset as string,
    projectId: studioProjectId as string,
    // Add and edit the content schema in the './sanity/schemaTypes' folder
    schema,
    plugins: [
        structureTool({ structure }),
        // Vision is for querying with GROQ from inside the Studio
        // https://www.sanity.io/docs/the-vision-plugin
        visionTool({ defaultApiVersion: process.env.SANITY_STUDIO_API_VERSION }),
        media(),
    ],
});
