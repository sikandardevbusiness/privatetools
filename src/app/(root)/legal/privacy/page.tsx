import type { Metadata } from "next";

import { LegalLayout } from "@/components/layouts/legal";

import { env } from "@/lib/env";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: `${env.NEXT_PUBLIC_SITE_TITLE} Privacy Policy. We do not collect, store, or upload your files. 100% client-side processing.`,
};

export default function PrivacyPage() {
    return (
        <LegalLayout
            activePage="privacy"
            title="Privacy Policy"
            updatedAt={new Date(2026, 7, 15).toDateString()}
            description="Our commitment to your privacy and data security."
        >
            <div className="text-foreground space-y-4 leading-relaxed">
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Zero Data Collection</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        {env.NEXT_PUBLIC_SITE_TITLE} operates on a strict zero-data-collection
                        policy for all file processing. Every tool on our platform runs entirely in
                        your web browser using client-side JavaScript. Your files are never uploaded
                        to our servers, transmitted over the internet, or stored in any cloud
                        database.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">
                        Information We Do Collect
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                        To maintain service functionality and improve user experience, we may
                        collect minimal, anonymous data:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>
                            Anonymous usage analytics (e.g., page views, tool usage counts) without
                            any personally identifiable information.
                        </li>
                        <li>
                            Local storage data on your device to remember theme preferences
                            (light/dark mode) and session rate limits.
                        </li>
                        <li>
                            Information voluntarily provided through our contact form (name, email,
                            message) solely for the purpose of responding to your inquiry.
                        </li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Third-Party Services</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We do not share your data with third parties. Our platform may utilize
                        open-source libraries that execute locally in your browser. Optional bot
                        protection (e.g., Cloudflare Turnstile) may be used on specific actions,
                        governed by their respective privacy policies, but this does not involve
                        file content transmission.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Your Rights</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Since we do not store your files or personal data on our servers, there is
                        no server-side data for us to delete upon request. You have full control
                        over your browser:{"'"}s local storage and cookies, which you can clear at
                        any time through your browser settings.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Contact Us</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        If you have any questions or concerns regarding this Privacy Policy, please
                        contact us at{" "}
                        <a
                            href={`mailto:${env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                            className="text-primary hover:underline"
                        >
                            {env.NEXT_PUBLIC_CONTACT_EMAIL}
                        </a>
                        .
                    </p>
                </section>
            </div>
        </LegalLayout>
    );
}
