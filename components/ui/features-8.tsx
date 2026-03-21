import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users } from "lucide-react";

export function Features() {
  return (
    <section className="bg-muted/30 py-20 md:py-24" id="analytics">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Control finance, teams, and performance from one panel</h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Your backend already includes role permissions, analytics, and report generation. The page now reflects those capabilities.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-6">

          <Card className="relative col-span-full overflow-hidden rounded-2xl lg:col-span-3">
            <CardContent className="grid pt-6 sm:grid-cols-2">
              <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                <div className="relative flex aspect-square size-12 rounded-full border">
                  <Shield className="m-auto size-5" strokeWidth={1} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-lg font-medium">Profit visibility by period</h2>
                  <p className="text-muted-foreground">
                    Margins update automatically after each sale and are available by daily, weekly, monthly, yearly, and total periods.
                  </p>
                </div>
              </div>

              <div className="mt-6 border-l border-t p-6">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Dashboard metrics: sales, revenue, growth</li>
                  <li>Top products and scent family preferences</li>
                  <li>Sales-over-time trends and recent transactions</li>
                  <li>Daily PDF sales reports with download history</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="relative col-span-full overflow-hidden rounded-2xl lg:col-span-3">
            <CardContent className="grid h-full pt-6 sm:grid-cols-2">
              <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                <div className="relative flex aspect-square size-12 rounded-full border">
                  <Users className="m-auto size-6" strokeWidth={1} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-lg font-medium">Role-based and store-scoped access</h2>
                  <p className="text-muted-foreground">
                    Owners, admins, and cashiers get the right permissions, with data scoped to their assigned store or sub-store hierarchy.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4">
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Owner</p>
                  <p className="mt-1 text-xs text-muted-foreground">Creates stores and sub-stores, assigns employees, controls organization.</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Admin</p>
                  <p className="mt-1 text-xs text-muted-foreground">Manages inventory, users, confirmations, and analytics.</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Cashier</p>
                  <p className="mt-1 text-xs text-muted-foreground">Processes sales quickly with stock-aware clone/original flows.</p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
}
