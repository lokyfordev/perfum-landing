"use client";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "The AI consultation flow is practical, not gimmicky. Customers answer quick questions and we get recommendation suggestions we can actually sell.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Lina Ait",
    role: "Store Owner",
  },
  {
    text: "We sell both clone and original perfumes. The system handles bottle-size clone sales and fixed-volume original prices without confusion.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Sofiane M.",
    role: "Operations Admin",
  },
  {
    text: "Low-stock visibility in ml changed our replenishment routine. We no longer run out of top clone references unexpectedly.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Meriem D.",
    role: "Inventory Manager",
  },
  {
    text: "Owners can manage stores and sub-stores while assigning admins and cashiers. Permissions are clear and safer for day-to-day work.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Karim L.",
    role: "Franchise Owner",
  },
  {
    text: "Margin summaries and sales analytics are now available without spreadsheets. Daily decisions are faster and more accurate.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Amina K.",
    role: "Finance Lead",
  },
  {
    text: "Cashier mode is efficient and focused. Teams can process transactions quickly without touching admin-only screens.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Nour E.",
    role: "Cashier Supervisor",
  },
  {
    text: "The recommendation confirmation queue gives us control before final sale creation, which is perfect for store operations.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Rachid B.",
    role: "Counter Manager",
  },
  {
    text: "Landing onboarding with payment and automatic owner/store creation reduced manual setup work for every new client.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Yasmine T.",
    role: "Implementation Partner",
  },
  {
    text: "Daily PDF reports are simple to generate and share. We finally have consistent reporting from the system itself.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Walid H.",
    role: "Regional Admin",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <section className="bg-background py-20 md:py-24 relative">
      <div className="z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-[640px] flex-col items-center justify-center text-center"
        >
          <Badge variant="outline">Testimonials</Badge>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
            What perfume teams are saying
          </h2>
          <p className="mt-5 text-base text-muted-foreground md:text-lg">
            Feedback from owners, admins, and cashiers using the same modules shown above.
          </p>
        </motion.div>
        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export { Testimonials };
