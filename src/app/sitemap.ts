import { MetadataRoute } from "next";

import { toolMetadataList } from "@/features/tools/registry";
import { categoryInfoList } from "@/features/tools/category";
import { alternativesList } from "@/app/(root)/alternatives/registry";
import { env } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = env.NEXT_PUBLIC_SITE_URL;
    const currentDate = new Date();

    // 1. Static Pages (Including AI Documentation)
    const staticPages = [
        { route: "", priority: 1.0, changeFrequency: "daily" as const },
        { route: "/tools", priority: 0.9, changeFrequency: "weekly" as const },
        { route: "/alternatives", priority: 0.9, changeFrequency: "weekly" as const },
        { route: "/about", priority: 0.5, changeFrequency: "monthly" as const },
        { route: "/contact", priority: 0.5, changeFrequency: "monthly" as const },

        // AI-First SEO Documentation
        { route: "/llms.txt", priority: 0.5, changeFrequency: "weekly" as const },
        { route: "/llms-full.txt", priority: 0.5, changeFrequency: "weekly" as const },

        // Legal Pages
        { route: "/legal/terms", priority: 0.3, changeFrequency: "yearly" as const },
        { route: "/legal/privacy", priority: 0.3, changeFrequency: "yearly" as const },
        { route: "/legal/imprint", priority: 0.3, changeFrequency: "yearly" as const },
    ].map(({ route, priority, changeFrequency }) => ({
        url: `${baseUrl}${route}`,
        lastModified: currentDate,
        changeFrequency,
        priority,
    }));

    // 2. Dynamic Category Pages (Using your existing categoryInfoList)
    const categoryPages = categoryInfoList.map((category) => ({
        url: `${baseUrl}/tools/${category.id}`,
        lastModified: currentDate,
        changeFrequency: "weekly" as const,
        priority: 0.85,
    }));

    // 3. Dynamic Tool Pages
    const toolPages = toolMetadataList.map((tool) => ({
        url: `${baseUrl}/tools/${tool.category}/${tool.id}`,
        lastModified: currentDate,
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    // 4. Dynamic Alternative Pages
    const alternativePages = alternativesList.map((alt) => ({
        url: `${baseUrl}/alternatives/${alt.id}`,
        lastModified: currentDate,
        changeFrequency: "weekly" as const,
        priority: 0.85,
    }));

    return [...staticPages, ...categoryPages, ...toolPages, ...alternativePages];
}
