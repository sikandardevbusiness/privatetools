import type { Metadata } from "next";

import { LegalLayout } from "@/components/layouts/legal";

import { env } from "@/lib/env";

export const metadata: Metadata = {
    title: "Terms and Conditions",
    description: `Terms and Conditions for using ${env.NEXT_PUBLIC_SITE_TITLE}'s free, private, client-side online tools.`,
};

export default function TermsPage() {
    return (
        <LegalLayout
            activePage="terms"
            title="Terms and Conditions"
            updatedAt={new Date(2026, 7, 15).toDateString()}
            description={`Rules and guidelines for using ${env.NEXT_PUBLIC_SITE_TITLE} services.`}
        >
            <div className="space-y-8">
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Acceptable Use</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        By using {env.NEXT_PUBLIC_SITE_TITLE}, you agree to use our tools solely for
                        lawful purposes. You must not use our platform to process illegal content,
                        infringe on intellectual property rights, or attempt to reverse-engineer,
                        disrupt, or circumvent any security or rate-limiting measures.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">
                        Service Availability and Disclaimers
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                        {env.NEXT_PUBLIC_SITE_TITLE} is provided {'"'}as is{'"'} and {'"'}as
                        available{'"'} without warranties of any kind, either express or implied.
                        While we strive for accuracy in all client-side conversions and processing,
                        we do not guarantee that output files will be identical to inputs or
                        suitable for any specific professional or commercial purpose. You use these
                        tools entirely at your own risk.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Intellectual Property</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        You retain all rights to the files and content you process using our tools.
                        {env.NEXT_PUBLIC_SITE_TITLE} claims no ownership over your data, as it never
                        reaches our servers. However, the {env.NEXT_PUBLIC_SITE_TITLE} brand, logo,
                        website design, and underlying source code are the exclusive property of
                        {env.NEXT_PUBLIC_SITE_TITLE} and are protected by copyright laws.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">
                        Limitation of Liability
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                        To the maximum extent permitted by applicable law,{" "}
                        {env.NEXT_PUBLIC_SITE_TITLE} and its developers shall not be liable for any
                        indirect, incidental, special, or consequential damages, including but not
                        limited to loss of data, profits, or business interruption, arising out of
                        or in connection with your use of the service.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">
                        Modifications to Terms
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We reserve the right to modify these Terms and Conditions at any time.
                        Continued use of the {env.NEXT_PUBLIC_SITE_TITLE} platform after any changes
                        constitutes your acceptance of the updated terms.
                    </p>
                </section>
            </div>
        </LegalLayout>
    );
}
