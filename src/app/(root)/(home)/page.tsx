import type { Metadata } from "next";

import { BrowseSection } from "@/components/home/browse-section";
import { CTASection } from "@/components/home/cta-section";
import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";

export const metadata: Metadata = {
    title: "Home",
};

export default function Home() {
    return (
        <main>
            <Hero />
            <Stats />
            <BrowseSection />
            <CTASection />
        </main>
    );
}
