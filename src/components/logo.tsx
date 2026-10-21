import { HatGlasses } from "lucide-react";
import Link from "next/link";

import { env } from "@/lib/env";
import { cn } from "@/lib/utils";

export function Logo({ showTitle = true, className }: { showTitle?: boolean; className?: string }) {
    return (
        <Link href="/" className="flex items-center gap-2">
            <div
                className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-background",
                    className,
                )}
            >
                <HatGlasses className="h-6 w-6" strokeWidth={2.5} />
            </div>
            {showTitle && (
                <span className="text-lg font-bold tracking-tight text-foreground">
                    {env.NEXT_PUBLIC_SITE_TITLE}
                </span>
            )}
        </Link>
    );
}
