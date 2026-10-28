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

interface FaqSectionProps {
    title?: string;
    description?: string;
    items: FAQItem[];
}

export function FaqSection({
    title = "Frequently Asked Questions",
    description = "Get quick answers about supported formats, data privacy, and using this tool.",
    items,
}: FaqSectionProps) {
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
        <section>
            <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2">{title}</h2>
                <p className="text-muted-foreground">{description}</p>
            </div>

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

            {/* Inject JSON-LD schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
        </section>
    );
}
