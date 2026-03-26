"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  AdminstrationDashboardPayload,
  AuthUser,
  getAdminstrationDashboard,
  getCurrentUser,
  logout,
} from "@/lib/adminstration-api";

function formatMoney(value: number, currency: string = "DA"): string {
  return `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value)} ${currency.toUpperCase()}`;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [payload, setPayload] = useState<AdminstrationDashboardPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        let currentUser: AuthUser | null = null;
        let dashboard: AdminstrationDashboardPayload | null = null;

        // Retry once to avoid redirect loops on slow cookie propagation after login.
        for (let attempt = 0; attempt < 2; attempt += 1) {
          try {
            [currentUser, dashboard] = await Promise.all([
              getCurrentUser(),
              getAdminstrationDashboard(),
            ]);
            break;
          } catch (requestError) {
            const message =
              requestError instanceof Error ? requestError.message.toLowerCase() : "";

            if (attempt === 0 && (message.includes("unauthorized") || message.includes("unauthenticated"))) {
              await new Promise((resolve) => setTimeout(resolve, 250));
              continue;
            }

            throw requestError;
          }
        }

        if (!mounted) return;

        if (!currentUser || !dashboard || !["owner", "adminstration"].includes(currentUser.role)) {
          setError("You do not have permission to view this dashboard.");
          return;
        }

        setUser(currentUser);
        setPayload(dashboard);
      } catch (loadError) {
        if (!mounted) return;

        const message = loadError instanceof Error ? loadError.message : "Failed to load dashboard.";
        setError(message);

        if (message.toLowerCase().includes("unauthorized") || message.toLowerCase().includes("unauthenticated")) {
          router.replace("/login");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadData();
    return () => {
      mounted = false;
    };
  }, [router]);

  const wallets = useMemo(() => payload?.data.chargily_balance.wallets ?? [], [payload]);
  const stores = useMemo(() => payload?.data.stores.items ?? [], [payload]);
  const recentCheckouts = useMemo(() => payload?.data.checkouts.recent ?? [], [payload]);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      router.push("/login");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#07181A] text-[#E5F6F2] flex items-center justify-center p-6">
        <div className="rounded-2xl border border-[#2A5D57] bg-[#0C2326] px-6 py-5 text-sm">
          Loading adminstration dashboard...
        </div>
      </main>
    );
  }

  if (error || !payload) {
    return (
      <main className="min-h-screen bg-[#07181A] text-[#E5F6F2] flex items-center justify-center p-6">
        <div className="w-full max-w-lg rounded-2xl border border-[#7A2D41] bg-[#2C121B] p-6">
          <h1 className="text-xl font-semibold text-[#FFD9E1]">Dashboard unavailable</h1>
          <p className="mt-3 text-sm text-[#FFD9E1]/90">{error || "Unable to load data."}</p>
          <Link href="/login" className="mt-5 inline-block rounded-xl border border-[#C46A82] px-4 py-2 text-sm text-[#FFD9E1]">
            Go to login
          </Link>
        </div>
      </main>
    );
  }

  const { overview, users, sales, checkouts, stores: storeStats, chargily_balance: chargilyBalance } = payload.data;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_0%_0%,#133C3B_0%,#0A1C20_45%,#040B0D_100%)] text-[#E5F6F2]">
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <header className="rounded-3xl border border-[#2D6861]/60 bg-[#0F2A2D]/80 p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#90D8CC]">Adminstration Dashboard</p>
              <h1 className="mt-2 text-3xl font-bold text-[#F1FFFC]">Network Statistics & Revenue</h1>
              <p className="mt-3 text-sm text-[#BBDDD7]">
                Signed in as {user?.name} ({user?.role}) • Updated {new Date(payload.data.generated_at).toLocaleString()}
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-[#7DCFC3]/50 bg-[#0B1E21] px-4 py-2 text-sm text-[#C9F6EE] hover:bg-[#12363A]"
            >
              Logout
            </button>
          </div>
        </header>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Total Stores" value={String(overview.total_stores)} />
          <MetricCard label="Active Stores" value={String(overview.active_stores)} />
          <MetricCard label="Total Sales" value={String(overview.total_sales)} />
          <MetricCard label="Estimated Revenue" value={formatMoney(overview.estimated_total_revenue_da, "DA")} />
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <Panel title="Revenue Snapshot">
            <div className="grid gap-3 sm:grid-cols-2">
              <StatRow label="Sales Revenue" value={formatMoney(sales.total_revenue, "DA")} />
              <StatRow label="Today Revenue" value={formatMoney(sales.today_revenue, "DA")} />
              <StatRow label="Last 30 Days Revenue" value={formatMoney(sales.last_30_days_revenue, "DA")} />
              <StatRow label="Checkout Revenue (DA)" value={formatMoney(checkouts.paid_amount_da, "DA")} />
            </div>
          </Panel>

          <Panel title="User Roles">
            <div className="grid gap-3 sm:grid-cols-2">
              <StatRow label="Owners" value={String(users.owners)} />
              <StatRow label="Admins" value={String(users.admins)} />
              <StatRow label="Adminstrations" value={String(users.adminstrations)} />
              <StatRow label="Cashiers" value={String(users.cashiers)} />
            </div>
          </Panel>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-3">
          <Panel title="Chargily Balance">
            {!chargilyBalance.available ? (
              <p className="text-sm text-[#FFD9E1]">{chargilyBalance.message || "Balance unavailable."}</p>
            ) : (
              <div className="space-y-3">
                {wallets.map((wallet) => (
                  <div key={wallet.currency} className="rounded-xl border border-[#2C615B]/60 bg-[#0C2326]/80 p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-[#8BCFC2]">{wallet.currency}</p>
                    <p className="mt-2 text-xl font-semibold text-[#E9FFFB]">{formatMoney(wallet.balance, wallet.currency)}</p>
                    <p className="mt-1 text-xs text-[#A4CDC7]">
                      Ready: {formatMoney(wallet.ready_for_payout, wallet.currency)} • On Hold: {formatMoney(wallet.on_hold, wallet.currency)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Panel>

          <Panel title="Checkout Overview">
            <div className="space-y-2 text-sm text-[#D1ECE7]">
              <StatRow label="Total Checkouts" value={String(checkouts.total_checkouts)} />
              <StatRow label="Paid Checkouts" value={String(checkouts.paid_checkouts)} />
              <StatRow label="Pending Checkouts" value={String(checkouts.pending_checkouts)} />
              <StatRow label="Failed Checkouts" value={String(checkouts.failed_checkouts)} />
              <StatRow label="Paid Amount" value={formatMoney(checkouts.paid_amount_da, "DA")} />
            </div>
          </Panel>

          <Panel title="Store Health">
            <div className="space-y-2 text-sm text-[#D1ECE7]">
              <StatRow label="Paid Plan Stores" value={String(storeStats.paid_plan_stores)} />
              <StatRow label="Inactive Stores" value={String(storeStats.inactive_stores)} />
              <StatRow label="Total Users" value={String(users.total_users)} />
            </div>
          </Panel>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <Panel title="Recent Checkouts">
            <div className="space-y-3">
              {recentCheckouts.length === 0 ? (
                <p className="text-sm text-[#A9D0C9]">No checkouts found.</p>
              ) : (
                recentCheckouts.map((checkout) => (
                  <div key={checkout.id} className="rounded-xl border border-[#2C615B]/60 bg-[#0D2326]/80 p-3 text-sm">
                    <p className="font-semibold text-[#E8FFFB]">#{checkout.id} • {checkout.status}</p>
                    <p className="mt-1 text-[#AFD6CF]">{formatMoney(checkout.amount_da, "DA")} • {checkout.store?.name || "No store linked"}</p>
                  </div>
                ))
              )}
            </div>
          </Panel>

          <Panel title="Stores Performance">
            <div className="max-h-[420px] space-y-3 overflow-auto pr-1">
              {stores.length === 0 ? (
                <p className="text-sm text-[#A9D0C9]">No stores available.</p>
              ) : (
                stores.map((store) => (
                  <div key={store.id} className="rounded-xl border border-[#2C615B]/60 bg-[#0D2326]/80 p-3 text-sm">
                    <p className="font-semibold text-[#E8FFFB]">{store.name}</p>
                    <p className="mt-1 text-[#A9D0C9]">
                      Revenue: {formatMoney(store.sales_revenue, "DA")} • Sales: {store.sales_count} • Employees: {store.employees_count}
                    </p>
                    <p className="mt-1 text-[#8FC6BC]">
                      Checkouts: {store.checkouts_count} (paid: {store.paid_checkouts_count}) • Plan: {store.payment_status}
                    </p>
                  </div>
                ))
              )}
            </div>
          </Panel>
        </section>
      </div>
    </main>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-[#2D6861]/60 bg-[#0E282B]/80 p-5">
      <h2 className="text-lg font-semibold text-[#EDFFFC]">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-2xl border border-[#2D6861]/60 bg-[#0D2326]/85 p-4">
      <p className="text-xs uppercase tracking-[0.14em] text-[#8BCFC2]">{label}</p>
      <p className="mt-2 text-2xl font-bold text-[#ECFFFC]">{value}</p>
    </article>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-[#2D6861]/40 bg-[#0B1D20]/80 px-3 py-2">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
