import { PropsWithChildren } from "react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Navbar />
            <main id="main-content" className="flex-1">
                {children}
            </main>
            <Footer />
        </>
    );
}
