"use client"
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["smarter", "multi-store", "profit-aware", "AI-assisted", "store-ready"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <section className="bg-background py-20 md:py-24">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-6">
        <Button variant="secondary" size="sm" className="mb-4 gap-4">Explore backend modules <MoveRight className="w-4 h-4" /></Button>
        <div className="flex max-w-3xl flex-col items-center gap-8">
          <h1 className="text-center text-4xl font-semibold tracking-tight md:text-6xl">
            <span className="text-primary">Run your perfume business</span>
            <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
              &nbsp;
              {titles.map((title, index) => (
                <motion.span
                  key={index}
                  className="absolute font-semibold"
                  initial={{ opacity: 0, y: "-100" }}
                  transition={{ type: "spring", stiffness: 50 }}
                  animate={
                    titleNumber === index
                      ? {
                          y: 0,
                          opacity: 1,
                        }
                      : {
                          y: titleNumber > index ? -150 : 150,
                          opacity: 0,
                        }
                  }
                >
                  {title}
                </motion.span>
              ))}
            </span>
          </h1>
          <p className="max-w-2xl text-center text-base leading-relaxed text-muted-foreground md:text-lg">
            From checkout onboarding to AI consultations, sales, confirmations, and reports, your backend is designed to reduce manual work and keep teams aligned.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" className="gap-4" variant="outline">
              Request a demo call <PhoneCall className="w-4 h-4" />
            </Button>
            <Button size="lg" className="gap-4">
              Start onboarding <MoveRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Hero };
