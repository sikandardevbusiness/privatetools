"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQWithSchemaProps {
    items: FAQItem[];
}

export function FAQWithSchema({ items }: FAQWithSchemaProps) {
    // Generate JSON-LD schema
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    };

    return (
        <div className="mt-12">
            {/* Inject JSON-LD schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>

                <Accordion className="w-full bg-card rounded-lg border border-border shadow-sm">
                    {items.map((item, index) => (
                        <AccordionItem
                            key={index}
                            value={`faq-item-${index}`}
                            className="border-b border-border last:border-b-0 px-6"
                        >
                            <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline hover:text-primary transition-all py-5 text-base md:text-lg">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground pb-5 text-sm md:text-base leading-relaxed">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}
