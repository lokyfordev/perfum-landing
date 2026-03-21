import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function Featuree() {
  return (
    <section className="w-full bg-background py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-8 rounded-2xl border bg-card p-8 shadow-sm lg:grid-cols-2">
          <div className="flex gap-10 flex-col">
            <div className="flex gap-4 flex-col">
              <div>
                <Badge variant="outline">Operations</Badge>
              </div>
              <div className="flex gap-2 flex-col">
                <h2 className="max-w-xl text-left text-3xl font-semibold tracking-tight md:text-4xl">
                  Backend flows that match real perfume retail
                </h2>
                <p className="max-w-xl text-left text-base leading-relaxed text-muted-foreground md:text-lg">
                  From paid onboarding to post-sale reporting, your API already covers the full lifecycle. This section now mirrors that workflow.
                </p>
              </div>
            </div>
            <div className="grid lg:pl-6 grid-cols-1 sm:grid-cols-3 items-start lg:grid-cols-1 gap-6">
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Paid onboarding with auto provisioning</p>
                  <p className="text-muted-foreground text-sm">
                    Landing checkout verifies Chargily payment, then automatically creates the owner user and store.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>AI recommendation confirmation workflow</p>
                  <p className="text-muted-foreground text-sm">
                    Customer selections are queued as pending confirmations, then confirmed or rejected by staff.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Store-scoped catalog and employee assignment</p>
                  <p className="text-muted-foreground text-sm">
                    Brands, categories, perfumes, and bottles are scoped to store with owner-controlled team assignment.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-muted/60 p-6">
            <p className="text-sm font-medium">Key API paths used in production</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>/api/landing/checkout + verify + webhook</li>
              <li>/api/ai-chat/* session + adaptive questions</li>
              <li>/api/admin/sales/* and /api/cashier/* operations</li>
              <li>/api/admin/margins/summary for profit tracking</li>
              <li>/api/*/reports for daily report generation/download</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Featuree };
