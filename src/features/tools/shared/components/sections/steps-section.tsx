"use client";

import { motion } from "framer-motion";

interface Step {
    title: string;
    description: string;
}

interface StepsSectionProps {
    steps: Step[];
    title?: string;
    description?: string;
}

export function StepsSection({
    title = "How it works",
    description = "Simply upload your content, adjust your settings, and download the result instantly.",
    steps,
}: StepsSectionProps) {
    if (!steps || steps.length === 0) return null;

    return (
        <section>
            <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2">{title}</h2>
                <p className="text-muted-foreground">{description}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="relative p-6 rounded-2xl border border-border bg-card card-hover"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                                {index + 1}
                            </div>
                            <h3 className="font-semibold text-lg">{step.title}</h3>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            {step.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
