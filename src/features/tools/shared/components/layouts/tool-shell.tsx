"use client";

import { useEffect, useRef } from "react";

interface ToolShellProps {
    children: React.ReactNode;
}

export function ToolShell({ children }: ToolShellProps) {
    const shellRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (shellRef.current) {
            shellRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, []);

    return (
        <div ref={shellRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {children}
        </div>
    );
}
