import Link from "next/link";

import { Logo } from "@/components/logo";
import { env } from "@/lib/env";

const footerLinks = {
    company: [
        { label: "About Us", href: "/about" },
        { label: "Donate", href: "/donate" },
    ],
    legal: [
        { label: "Privacy Policy", href: "/legal/privacy" },
        { label: "Terms and Conditions", href: "/legal/terms" },
        { label: "Imprint", href: "/legal/imprint" },
    ],
    support: [
        { label: "Contact Us", href: "/contact" },
        { label: "Suggest a Tool", href: "/suggest" },
        { label: "Report a Bug", href: "/report-bug" },
    ],
};

const exploreLinks = [
    { label: "All Tools", href: "/tools" },
    { label: "Image Tools", href: "/tools/image" },
    { label: "Document Tools", href: "/tools/document" },
];

export function Footer() {
    return (
        <footer className="border-t border-border bg-surface text-foreground">
            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-8">
                {/* Changed to lg:grid-cols-5 to cleanly separate Brand, Explore, Company, Support, and Legal */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Column 1: Brand */}
                    <div className="lg:col-span-1 space-y-4">
                        <Logo />
                        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                            Find the right PDF, image, file, or utility tool. Everything runs in
                            your browser. 100% Private.
                        </p>
                    </div>

                    {/* Column 2: Explore */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-primary">
                            Explore
                        </h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            {exploreLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Company */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-primary">
                            Company
                        </h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Support (Separated) */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-primary">
                            Support
                        </h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            {footerLinks.support.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 5: Legal (Separated) */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-primary">
                            Legal
                        </h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            {footerLinks.legal.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-muted-foreground/20 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground/60">
                    <span>© 2026 {env.NEXT_PUBLIC_SITE_TITLE}. All rights reserved.</span>
                    <span>Built with privacy first. No tracking. No ads. Pure tools.</span>
                </div>
            </div>
        </footer>
    );
}
