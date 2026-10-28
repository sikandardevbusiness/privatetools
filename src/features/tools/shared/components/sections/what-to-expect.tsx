"use client";

import { motion } from "framer-motion";
import { Globe, Lock, Shield, Zap } from "lucide-react";

interface Feature {
    title: string;
    description: string;
    icon: React.ReactNode;
}

interface WhatToExpectProps {
    title?: string;
    features: Feature[];
}

const defaultFeatures: Feature[] = [
    {
        icon: <Shield className="h-6 w-6" />,
        title: "100% Private",
        description:
            "Files never leave your device. All processing happens locally in your browser.",
    },
    {
        icon: <Zap className="h-6 w-6" />,
        title: "Lightning Fast",
        description: "No upload or download times. Process files instantly with zero latency.",
    },
    {
        icon: <Lock className="h-6 w-6" />,
        title: "Secure by Design",
        description: "End-to-end encryption. Your data is never stored or transmitted.",
    },
    {
        icon: <Globe className="h-6 w-6" />,
        title: "Works Offline",
        description: "Once loaded, the tool works without an internet connection.",
    },
];

export function WhatToExpect({
    title = "What to expect",
    features = defaultFeatures,
}: WhatToExpectProps) {
    return (
        <section className="py-16 border-t border-border/40">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">{title}</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="p-6 rounded-xl border border-border/40 bg-card/50 hover:bg-card transition-colors"
                        >
                            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="font-semibold mb-2">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
