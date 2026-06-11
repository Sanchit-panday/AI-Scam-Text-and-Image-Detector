// import { FAQItem } from "@/components/FAQ/faqs";
import { faqList, FAQItem } from '@/components/FAQ/faqs';
import { caveat, saira } from "@/components/Fonts";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from 'react';

export default function Faq() {
    const [visibleFaqsCount, setVisibleFaqsCount] = useState<number>(5);
    const visibleFaqs = faqList.slice(0, visibleFaqsCount);
    const handleLoadMore = () => {
        setVisibleFaqsCount((prevCount:number) => prevCount + 5);
    };``
    return (
        <div className="mb-15">
            <div className={`mb-4 text-lg font-semibold text-slate-200 ${saira.className}`}>Documentation</div>
            <div className={`mb-10 text-5xl font-bold text-brand-400/90 ${caveat.className}`}>Frequently Asked Questions
            </div>
            <div className="flex flex-col items-center">
                <Accordion type="multiple" className="max-w-xl">
                    {visibleFaqs.map((faq: FAQItem) => (
                        <AccordionItem
                            key={faq.id}
                            value={String(faq.id)}>
                            <AccordionTrigger>{faq.title}</AccordionTrigger>
                            <AccordionContent>{faq.description}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
                {visibleFaqsCount < faqList.length && (
                    <button onClick={handleLoadMore}
                        className="text-xs hover:underline">Show More...</button>
                )}
            </div>
        </div>
    )
}
