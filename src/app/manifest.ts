import type { MetadataRoute } from "next";

import { env } from "@/lib/env";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: `${env.NEXT_PUBLIC_SITE_TITLE} - Free & Private Online Tools`,
        short_name: env.NEXT_PUBLIC_SITE_TITLE,
        description: env.NEXT_PUBLIC_SITE_DESCRIPTION,
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
            {
                src: "/icon-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icon-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
