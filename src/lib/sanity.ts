import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { createClient } from "next-sanity";
import { type SchemaTypeDefinition } from "sanity";
import type { StructureResolver } from "sanity/structure";

export const client = createClient({
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET,
    apiVersion: "2024-01-01",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID! || process.env.SANITY_STUDIO_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET! || process.env.SANITY_STUDIO_DATASET!,
});

export const urlFor = (source: SanityImageSource) => {
    return builder.image(source);
};

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [],
};

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
    S.list().title("Content").items(S.documentTypeListItems());
