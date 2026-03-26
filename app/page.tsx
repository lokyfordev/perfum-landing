import { HeroSection } from "@/components/blocks/hero-section-9"
import { Feature } from "@/components/ui/feature-section-with-bento-grid"
import { TestimonialsSectionDemo } from "@/components/blocks/testimonials-with-marquee-demo"
import { Demo as FeaturesDemo } from "@/components/blocks/features-8-demo"

import { Testimonials } from "@/components/blocks/testimonials-columns-1-demo"
import { FAQDemo } from "@/components/blocks/faq-section-demo"
import { HeroDemo } from "@/components/blocks/animated-hero-demo"
import { Footer } from "@/components/blocks/footer-demo"
import { CheckoutSection } from "@/components/ui/checkout-section"
import { Featuree } from "@/components/blocks/featuree"
import Link from "next/link"


export default function Page() {
  return (
    <main className="bg-background text-foreground">
      
      <HeroSection />
      <Feature />
      <TestimonialsSectionDemo />
      <FeaturesDemo />
      <Featuree />
      <Testimonials />
      <HeroDemo />
      <FAQDemo />
      <CheckoutSection />
      <Footer />
    </main>
  )
}
