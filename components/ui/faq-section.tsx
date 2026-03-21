import { PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "What is included in the 8000 DA onboarding plan?",
    answer: "The landing checkout flow creates your paid request, verifies payment through Chargily, then automatically provisions your owner account and first store."
  },
  {
    question: "Do you support both clone and original perfume sales?",
    answer: "Yes. Clone sales are tied to bottle size and stock in ml, while original sales use per-volume pricing from original price tables."
  },
  {
    question: "How is inventory tracked?",
    answer: "Clone inventory is tracked in purchased and sold milliliters, with low-stock monitoring and restock endpoints. Original volumes are managed with their configured price/volume entries."
  },
  {
    question: "Can I manage multiple stores and employees?",
    answer: "Yes. Owners can create stores and sub-stores, then assign admin or cashier users to specific stores with scoped access."
  },
  {
    question: "What analytics are available?",
    answer: "You get sales dashboard analytics, top products, scent family preferences, recent sales, and margin summaries for daily, weekly, monthly, yearly, and total periods."
  },
  {
    question: "Are reports downloadable?",
    answer: "Yes. Daily sales reports can be generated as PDF and downloaded later from the reports listing endpoints."
  },
  {
    question: "How does the AI recommendation flow work?",
    answer: "A chat session asks adaptive questions, generates perfume recommendations, and can create purchase confirmations that staff can confirm or reject."
  },
  {
    question: "Which languages are supported in AI consultation?",
    answer: "The consultation flow supports English, French, and Algerian Darija (Arabic script) based on the selected language at the start."
  },
];

function FAQ() {
  return (
    <section className="bg-background py-20 md:py-24" id="faq">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <Badge variant="outline" className="w-fit">FAQ</Badge>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Answers based on your real backend features</h2>
            <p className="max-w-xl text-base text-muted-foreground md:text-lg">These FAQs are aligned with the implemented API behavior: onboarding, payments, AI flows, inventory logic, margins, and store roles.</p>
            <Button className="w-fit gap-4" variant="outline">Need help with setup? Reach out <PhoneCall className="w-4 h-4" /></Button>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={"index-" + index}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export { FAQ };
