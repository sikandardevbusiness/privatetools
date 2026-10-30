import { MetadataRoute } from "next";

import { toolMetadataList } from "@/features/tools/registry";
import { env } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = env.NEXT_PUBLIC_SITE_URL;
    const currentDate = new Date();

    // 1. Static Pages
    const staticPages = [
        { route: "", priority: 1.0, changeFrequency: "daily" as const },
        { route: "/tools", priority: 0.9, changeFrequency: "weekly" as const },
        { route: "/about", priority: 0.5, changeFrequency: "monthly" as const },
        { route: "/contact", priority: 0.5, changeFrequency: "monthly" as const },

        // Legal Pages (rarely change, so yearly is more accurate for SEO)
        { route: "/legal/terms", priority: 0.3, changeFrequency: "yearly" as const },
        { route: "/legal/privacy", priority: 0.3, changeFrequency: "yearly" as const },
        { route: "/legal/imprint", priority: 0.3, changeFrequency: "yearly" as const },
    ].map(({ route, priority, changeFrequency }) => ({
        url: `${baseUrl}${route}`,
        lastModified: currentDate,
        changeFrequency,
        priority,
    }));

    // 2. Dynamic Tool Pages
    const toolPages = toolMetadataList.map((tool) => ({
        url: `${baseUrl}/tools/${tool.category}/${tool.id}`,
        lastModified: currentDate,
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    return [...staticPages, ...toolPages];
}
