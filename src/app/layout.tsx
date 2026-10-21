import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { GlobalJsonLd } from "@/components/global-json-ld";
import { ThemeProvider } from "@/features/preferences/theme/theme-provider";

import { env } from "@/lib/env";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const viewport: Viewport = {
    themeColor: "#000000",
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
};

export const metadata: Metadata = {
    title: {
        default: env.NEXT_PUBLIC_SITE_TITLE,
        template: `%s | ${env.NEXT_PUBLIC_SITE_TITLE}`,
    },
    description: env.NEXT_PUBLIC_SITE_DESCRIPTION,
    authors: [{ name: env.NEXT_PUBLIC_AUTHOR_NAME }],
    metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
    openGraph: {
        type: "website",
        locale: "en_US",
        url: env.NEXT_PUBLIC_SITE_URL,
        title: env.NEXT_PUBLIC_SITE_TITLE,
        siteName: env.NEXT_PUBLIC_SITE_TITLE,
        description: env.NEXT_PUBLIC_SITE_DESCRIPTION,
    },
    twitter: {
        card: "summary_large_image",
        title: env.NEXT_PUBLIC_SITE_TITLE,
        description: env.NEXT_PUBLIC_SITE_DESCRIPTION,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        google: env.NEXT_PUBLIC_GOOGLE_VERIFICATION_CODE,
    },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen antialiased bg-surface text-foreground w-full",
                    inter.variable,
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>

                <GlobalJsonLd />
                <GoogleAnalytics gaId={env.NEXT_PUBLIC_GA_ID} />
            </body>
        </html>
    );
}
