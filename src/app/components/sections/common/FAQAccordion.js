
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/app/components/ui/accordion";

export default function FAQAccordion({ title, questions = [] }) {
  return (
    <section className="py-16 px-4 md:px-12 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
        <Accordion type="single" collapsible className="w-full divide-y divide-gray-200">
          {questions.map((q, i) => (
            <AccordionItem value={String(i)} key={i}>
              <AccordionTrigger>{q.question}</AccordionTrigger>
              <AccordionContent>{q.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
