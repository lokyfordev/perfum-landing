"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCurrentUser, login } from "@/lib/adminstration-api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        const user = await getCurrentUser();
        if (!mounted) return;

        if (["owner", "adminstration"].includes(user.role)) {
          router.replace("/dashboard");
        } else {
          setError("Your account does not have adminstration dashboard access.");
        }
      } catch {
        if (mounted) {
          setError("");
        }
      } finally {
        if (mounted) {
          setCheckingSession(false);
        }
      }
    };

    checkSession();
    return () => {
      mounted = false;
    };
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await login(email, password);
      if (!["owner", "adminstration"].includes(result.user.role)) {
        setError("Only owner or adminstration users can open this dashboard.");
        return;
      }

      // Confirm session cookie is usable before moving to dashboard.
      await getCurrentUser();
      router.push("/dashboard");
    } catch (submitError) {
      const message =
        submitError instanceof Error ? submitError.message : "Login failed. Please try again.";
      if (message.toLowerCase().includes("unauthorized") || message.toLowerCase().includes("unauthenticated")) {
        setError("Login succeeded but session cookie was not kept. Check backend cookie settings for local HTTP.");
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <main className="min-h-screen bg-[#07181A] text-[#E5F6F2] flex items-center justify-center p-6">
        <div className="rounded-2xl border border-[#2A5D57] bg-[#0C2326] px-6 py-5 text-sm">
          Checking your session...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_10%_20%,#1A4F4A_0%,#07181A_55%,#040C0D_100%)] text-[#E5F6F2] p-6">
      <div className="mx-auto max-w-5xl grid gap-8 lg:grid-cols-2 pt-12">
        <section className="rounded-3xl border border-[#2D6861]/70 bg-[#0D2A2D]/80 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
          <p className="inline-flex rounded-full border border-[#64C7B8]/40 bg-[#64C7B8]/10 px-4 py-1 text-xs tracking-[0.2em] uppercase text-[#9FE4D9]">
            Adminstration Access
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-[#F2FFFC]">
            Store network control center.
          </h1>
          <p className="mt-4 text-[#BFE0DB]">
            Sign in to monitor all stores, checkout performance, sales totals, and Chargily wallet balances.
          </p>
          <div className="mt-10 space-y-4 text-sm text-[#CFEAE5]">
            <div className="rounded-2xl border border-[#2D6861]/60 bg-[#113136]/70 px-4 py-3">Live store totals and team distribution</div>
            <div className="rounded-2xl border border-[#2D6861]/60 bg-[#113136]/70 px-4 py-3">Paid checkout and subscription tracking</div>
            <div className="rounded-2xl border border-[#2D6861]/60 bg-[#113136]/70 px-4 py-3">Chargily balance by wallet (DZD, USD, EUR)</div>
          </div>
        </section>

        <section className="rounded-3xl border border-[#2D6861]/70 bg-[#0B1F22]/85 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
          <h2 className="text-2xl font-semibold text-[#F2FFFC]">Login</h2>
          <p className="mt-2 text-sm text-[#9EC9C3]">Use your owner/adminstration account credentials.</p>

          {error ? (
            <div className="mt-5 rounded-xl border border-[#C64A64]/40 bg-[#4A1B27]/50 px-4 py-3 text-sm text-[#FFD8E1]">
              {error}
            </div>
          ) : null}

          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm text-[#CFEAE5]">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-[#2D6861]/70 bg-[#061214] px-4 py-3 text-[#E8FFFA] outline-none transition focus:border-[#6DD7C7]"
                placeholder="adminstration@perfum.com"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-[#CFEAE5]">Password</span>
              <input
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-[#2D6861]/70 bg-[#061214] px-4 py-3 text-[#E8FFFA] outline-none transition focus:border-[#6DD7C7]"
                placeholder="Your password"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-[#7DE6D6] via-[#53BFAF] to-[#E1D16D] px-4 py-3 font-semibold text-[#092224] transition hover:brightness-110 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <Link href="/" className="mt-6 inline-block text-sm text-[#8FD1C6] hover:text-[#C8F6EE]">
            Back to landing page
          </Link>
        </section>
      </div>
    </main>
  );
}
