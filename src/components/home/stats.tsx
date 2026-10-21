const stats = [
    { value: "100%", label: "Client-side processing" },
    { value: "0", label: "Files uploaded to servers" },
    { value: "50+", label: "Free utilities available" },
    { value: "0", label: "Trackers or ads" },
];

export function Stats() {
    return (
        <section className="border-y border-border bg-background">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 px-4 md:px-8 py-10">
                {stats.map((stat, i) => (
                    <div
                        key={i}
                        className="flex flex-col items-center justify-center px-4 text-center"
                    >
                        <span className="font-heading text-3xl md:text-4xl font-semibold tracking-tight">
                            {stat.value.split(/(\d+\.?\d*)/).map((part, idx) =>
                                idx % 2 === 1 ? (
                                    <span key={idx} className="text-primary">
                                        {part}
                                    </span>
                                ) : (
                                    part
                                ),
                            )}
                        </span>
                        <p className="mt-2 text-xs text-muted-foreground/80 uppercase tracking-wide font-medium">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
