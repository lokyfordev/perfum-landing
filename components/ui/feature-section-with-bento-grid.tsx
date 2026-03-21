// "use client"


import { BarChart3, Brain, Package, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function Feature() {
  return (
    <section className="bg-background py-20 md:py-24" id="features">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-12">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <Badge variant="outline">Core Modules</Badge>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Everything your perfume business needs in one flow</h2>
            <p className="text-base text-muted-foreground md:text-lg">Built from your backend: AI consultation, sales operations, inventory logic, and margin analytics.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="rounded-2xl border bg-card p-6 shadow-sm flex flex-col justify-between aspect-square lg:aspect-auto lg:col-span-2">
              <Brain className="w-8 h-8 stroke-1 mb-4" />
              <h3 className="text-xl font-semibold mb-2 tracking-tight">AI fragrance consultation and recommendations</h3>
              <p className="text-muted-foreground text-base">Run adaptive 10-15 step consultations, support English/French/Algerian Darija, and return personalized perfume matches with reasons and match scores.</p>
            </div>
            <div className="rounded-2xl border bg-card p-6 shadow-sm flex flex-col justify-between aspect-square">
              <ShoppingCart className="w-8 h-8 stroke-1 mb-4" />
              <h3 className="text-xl font-semibold mb-2 tracking-tight">Clone and original sales logic</h3>
              <p className="text-muted-foreground text-base">Sell clones by bottle size, originals by volume price table, and validate stock and pricing rules automatically at checkout.</p>
            </div>
            <div className="rounded-2xl border bg-card p-6 shadow-sm flex flex-col justify-between aspect-square">
              <Package className="w-8 h-8 stroke-1 mb-4" />
              <h3 className="text-xl font-semibold mb-2 tracking-tight">Inventory in ml with low-stock control</h3>
              <p className="text-muted-foreground text-base">Track purchased ml, live remaining stock, bottle costs, and low-stock alerts for clone perfumes while keeping original volumes organized.</p>
            </div>
            <div className="rounded-2xl border bg-card p-6 shadow-sm flex flex-col justify-between aspect-square lg:aspect-auto lg:col-span-2">
              <BarChart3 className="w-8 h-8 stroke-1 mb-4" />
              <h3 className="text-xl font-semibold mb-2 tracking-tight">Automated margins, reports, and dashboards</h3>
              <p className="text-muted-foreground max-w-2xl text-base">Compute daily/weekly/monthly/yearly/total margins, visualize top products and scent families, and generate downloadable daily sales reports.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Feature };
