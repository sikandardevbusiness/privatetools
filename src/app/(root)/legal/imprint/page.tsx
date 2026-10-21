import type { Metadata } from "next";

import { LegalLayout } from "@/components/layouts/legal";

import { env } from "@/lib/env";

export const metadata: Metadata = {
    title: "Imprint",
    description: `Legal imprint and operator information for ${env.NEXT_PUBLIC_SITE_TITLE}.`,
};

export default function ImprintPage() {
    return (
        <LegalLayout
            title="Imprint"
            activePage="imprint"
            updatedAt={new Date(2026, 7, 15).toDateString()}
            description={`Legal information and operator details for ${env.NEXT_PUBLIC_SITE_TITLE}.`}
        >
            <div className="space-y-8">
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Site Operator</h2>
                    <div className="space-y-1 text-muted-foreground">
                        <p className="font-medium text-foreground">{env.NEXT_PUBLIC_SITE_TITLE}</p>
                        <p>Online Service Provider</p>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Contact Information</h2>
                    <div className="space-y-1 text-muted-foreground">
                        <p>
                            Email:{" "}
                            <a
                                href={`mailto:${env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                                className="text-primary hover:underline"
                            >
                                {env.NEXT_PUBLIC_CONTACT_EMAIL}
                            </a>
                        </p>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">
                        Disclaimer for Content
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                        The contents of our pages were created with the utmost care. However, we
                        cannot guarantee the accuracy, completeness, or timeliness of the content.
                        As a service provider, we are responsible for our own content on these pages
                        in accordance with general laws. We are not obligated to monitor transmitted
                        or stored third-party information or to investigate circumstances that point
                        to illegal activity.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Disclaimer for Links</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Our website may contain links to external third-party websites over whose
                        content we have no influence. Therefore, we cannot assume any liability for
                        this external content. The respective provider or operator of the pages is
                        always responsible for the content of the linked pages. The linked pages
                        were checked for possible legal violations at the time of linking. Illegal
                        content was not recognizable at the time of linking.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Copyright</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        The content and works created by the site operators on these pages are
                        subject to copyright law. Duplication, processing, distribution, or any form
                        of commercialization of such material beyond the scope of the copyright law
                        shall require the prior written consent of its respective author or creator.
                    </p>
                </section>
            </div>
        </LegalLayout>
    );
}
