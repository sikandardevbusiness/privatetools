import { toolMetadataList } from "@/features/tools/registry";
import { env } from "@/lib/env";

export function GlobalJsonLd() {
    const baseUrl = env.NEXT_PUBLIC_SITE_URL;

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: env.NEXT_PUBLIC_SITE_TITLE,
        url: baseUrl,
        description: env.NEXT_PUBLIC_SITE_DESCRIPTION,
        potentialAction: {
            "@type": "SearchAction",
            target: `${baseUrl}/tools?q={search_term_string}`,
            "query-input": "required name=search_term_string",
        },
    };

    // Map over allToolsMetadata to generate SoftwareApplication schemas
    const softwareApplications = toolMetadataList.map((tool) => {
        // Dynamically generate the path since 'href' is no longer in the schema
        const path = `/tools/${tool.category}/${tool.id}`;

        return {
            "@type": "SoftwareApplication",
            "@id": `${baseUrl}${path}`,
            name: tool.name,
            url: `${baseUrl}${path}`,
            applicationCategory: "WebApplication",
            operatingSystem: "All",
            browserRequirements: "Requires HTML5 canvas and JavaScript capabilities.",
            description: tool.description,
            offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
            },
        };
    });

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify([websiteSchema, ...softwareApplications]),
            }}
        />
    );
}
