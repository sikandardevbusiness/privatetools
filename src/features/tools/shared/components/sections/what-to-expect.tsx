"use client";

import { motion } from "framer-motion";

interface Expectation {
    title: string;
    description: string;
}

interface WhatToExpectProps {
    title?: string;
    description?: string;
    items: Expectation[];
}

export function WhatToExpect({
    title = "What to expect",
    description = "Experience fast, secure, and completely private processing directly inside your web browser.",
    items,
}: WhatToExpectProps) {
    if (!items || items.length === 0) return null;

    return (
        <section>
            <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2">{title}</h2>
                <p className="text-muted-foreground">{description}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="p-6 rounded-xl border border-border/40 bg-card/50 hover:bg-card transition-colors"
                    >
                        <h3 className="font-semibold mb-2 text-lg">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
