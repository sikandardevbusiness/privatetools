"use client";

import { motion } from "framer-motion";

interface Step {
    title: string;
    number: number;
    description: string;
}

interface StepsSectionProps {
    title: string;
    steps: Step[];
    description?: string;
}

export function StepsSection({ title, description, steps }: StepsSectionProps) {
    return (
        <section className="py-16 border-t border-border/40">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">{title}</h2>
                    {description && (
                        <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
                    )}
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative p-6 rounded-2xl border border-border/40 bg-card card-hover"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                                    {step.number}
                                </div>
                                <h3 className="font-semibold text-lg">{step.title}</h3>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
