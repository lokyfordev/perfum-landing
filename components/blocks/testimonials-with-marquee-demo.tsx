import { TestimonialsSection } from "@/components/ui/testimonials-with-marquee"

const testimonials = [
  {
    author: {
      name: "Amel K.",
      handle: "Owner - Blush House",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    text: "The AI consultation helped us guide clients faster and our team now closes recommendations with more confidence."
  },
  {
    author: {
      name: "Nassim B.",
      handle: "Admin - Elixir Store",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "Clone and original workflows are finally separated the right way. Pricing, bottle sizes, and stock checks are clear."
  },
  {
    author: {
      name: "Yacine M.",
      handle: "Cashier Lead - Oud Point",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    text: "Daily reports and dashboard numbers match our reality. We can track revenue and margins without manual sheets."
  }
]

export function TestimonialsSectionDemo() {
  return (
    <TestimonialsSection
      title="Used every day by perfume teams in real stores"
      description="Owners, admins, and cashiers run sales, inventory, AI consultations, and reports from one backend."
      testimonials={testimonials}
    />
  )
}
