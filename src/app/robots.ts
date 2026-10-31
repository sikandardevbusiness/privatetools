import { MetadataRoute } from "next";

import { env } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/admin/", "/_next/", "/private/", "/studio/"],
            },
            {
                userAgent: "GPTBot",
                disallow: "/", // Optional: Prevents OpenAI from using your content to train their models
            },
            {
                userAgent: "Googlebot",
                allow: "/",
            },
        ],
        sitemap: `${env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
    };
}
