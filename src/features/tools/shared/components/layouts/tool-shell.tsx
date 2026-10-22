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
        <div ref={shellRef} className="py-6">
            {children}
        </div>
    );
}
