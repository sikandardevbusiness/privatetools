interface ToolShellProps {
    children: React.ReactNode;
}

export function ToolShell({ children }: ToolShellProps) {
    return <div className="py-4">{children}</div>;
}
