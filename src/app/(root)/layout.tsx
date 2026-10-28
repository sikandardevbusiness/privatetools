import Link from "next/link";
import { PropsWithChildren } from "react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Banner } from "@/components/ui/banner";

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Banner
                variant="primary"
                message={
                    <>
                        ✨ New Release:{" "}
                        <Link
                            href="/tools/document/pdf-redactor"
                            className="underline font-semibold"
                        >
                            PDF Redactor
                        </Link>{" "}
                        is live! True redaction & metadata removal with zero server uploads.
                    </>
                }
            />
            <Navbar />
            <main id="main-content" className="flex-1">
                {children}
            </main>
            <Footer />
        </>
    );
}
