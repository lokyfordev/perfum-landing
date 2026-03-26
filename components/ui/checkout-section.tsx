"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type CheckoutForm = {
  store_name: string;
  legal_name: string;
  store_email: string;
  phone: string;
  whatsapp_number: string;
  address_line_1: string;
  city: string;
  facebook_url: string;
  instagram_url: string;
  tiktok_url: string;
  owner_name: string;
  owner_email: string;
  owner_password: string;
  owner_password_confirmation: string;
};

type Step = 1 | 2 | 3;
type ButtonState = "idle" | "loading" | "ready" | "error";
type PopupKind = "verifying" | "success" | "failed";

const CHECKOUT_STORAGE_KEY = "perfum_landing_checkout_id";

const initialForm: CheckoutForm = {
  store_name: "",
  legal_name: "",
  store_email: "",
  phone: "",
  whatsapp_number: "",
  address_line_1: "",
  city: "",
  facebook_url: "",
  instagram_url: "",
  tiktok_url: "",
  owner_name: "",
  owner_email: "",
  owner_password: "",
  owner_password_confirmation: "",
};

const steps = [
  { id: 1 as Step, title: "Store details", subtitle: "Basic business information" },
  { id: 2 as Step, title: "Branding", subtitle: "Logo and social links" },
  { id: 3 as Step, title: "Owner account", subtitle: "Credentials and payment" },
];

const labelClassName = "text-sm font-medium text-foreground/90";
const inputClassName =
  "h-11 rounded-xl border-border/70 bg-background/90 text-sm shadow-sm transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-muted-foreground/80 focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0";

export function CheckoutSection() {
  const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://perfumbackend.eu.cc/api").replace(/\/$/, "");
  // const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api").replace(/\/$/, "");

  const planAmountDa = Number(process.env.NEXT_PUBLIC_PLAN_AMOUNT_DA ?? "8000");

  const [form, setForm] = React.useState<CheckoutForm>(initialForm);
  const [logoFile, setLogoFile] = React.useState<File | null>(null);
  const [logoPreview, setLogoPreview] = React.useState<string | null>(null);
  const [errors, setErrors] = React.useState<Record<string, string[]>>({});
  const [statusMessage, setStatusMessage] = React.useState("");
  const [step, setStep] = React.useState<Step>(1);
  const [buttonState, setButtonState] = React.useState<ButtonState>("idle");
  const [checkoutUrl, setCheckoutUrl] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [dashboardUrl, setDashboardUrl] = React.useState("");
  const [storefrontUrl, setStorefrontUrl] = React.useState("");

  const [popupOpen, setPopupOpen] = React.useState(false);
  const [popupKind, setPopupKind] = React.useState<PopupKind>("verifying");
  const [popupMessage, setPopupMessage] = React.useState("");
  const [countdown, setCountdown] = React.useState(5);

  React.useEffect(() => {
    if (!logoFile) {
      setLogoPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(logoFile);
    setLogoPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [logoFile]);

  const fieldError = (name: keyof CheckoutForm | "logo" | "general") => errors[name]?.[0];

  const clearPaymentParams = React.useCallback(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.delete("payment");
    url.searchParams.delete("checkout_id");
    window.history.replaceState({}, "", url.toString());
  }, []);

  const verifyCheckout = React.useCallback(
    async (checkoutId: string) => {
      setPopupOpen(true);
      setPopupKind("verifying");
      setPopupMessage("Verifying payment status...");
      setStorefrontUrl("");

      try {
        const response = await fetch(
          `${apiBaseUrl}/landing/checkout/verify?checkout_id=${encodeURIComponent(checkoutId)}`,
          {
            method: "GET",
            headers: { Accept: "application/json" },
          }
        );

        const payload = await response.json().catch(() => ({}));

        if (response.ok && payload?.success) {
          const storefrontCandidate: string = payload?.data?.storefront_url ?? "";
          const redirectTo: string =
            payload?.data?.redirect_to ??
            (storefrontCandidate
              ? `${String(storefrontCandidate).replace(/\/$/, "")}/login`
              : "https://lokyperfumstore.eu.cc/login");
          const nextStorefrontUrl: string = storefrontCandidate;
          setDashboardUrl(redirectTo);
          setStorefrontUrl(nextStorefrontUrl);
          setPopupKind("success");
          setPopupMessage(payload?.message ?? "Payment confirmed. Redirecting to your store login...");
          setCountdown(5);
          window.localStorage.removeItem(CHECKOUT_STORAGE_KEY);
          clearPaymentParams();
          return;
        }

        setPopupKind("failed");
        setPopupMessage(payload?.message ?? "Could not verify payment right now.");
      } catch {
        setPopupKind("failed");
        setPopupMessage("Network error while verifying payment.");
      }
    },
    [apiBaseUrl, clearPaymentParams]
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const payment = params.get("payment");
    const queryCheckoutId = params.get("checkout_id");

    if (!payment) return;

    if (payment === "failed") {
      setPopupOpen(true);
      setPopupKind("failed");
      setPopupMessage("Payment failed or canceled. Please try again.");
      clearPaymentParams();
      return;
    }

    if (payment === "success") {
      const storedCheckoutId = window.localStorage.getItem(CHECKOUT_STORAGE_KEY);
      const checkoutId = queryCheckoutId || storedCheckoutId;

      if (!checkoutId) {
        setPopupOpen(true);
        setPopupKind("failed");
        setPopupMessage("Payment succeeded but checkout reference was not found.");
        clearPaymentParams();
        return;
      }

      void verifyCheckout(checkoutId);
    }
  }, [clearPaymentParams, verifyCheckout]);

  React.useEffect(() => {
    if (!popupOpen || popupKind !== "success") return;
    if (!dashboardUrl) return;
    if (countdown <= 0) {
      window.location.assign(dashboardUrl);
      return;
    }

    const timer = window.setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [countdown, dashboardUrl, popupKind, popupOpen]);

  const resetCheckoutAction = () => {
    if (checkoutUrl) {
      setCheckoutUrl("");
      setButtonState("idle");
      setStatusMessage("");
    }
  };

  const setField = (field: keyof CheckoutForm, value: string) => {
    resetCheckoutAction();
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (targetStep: Step): Record<string, string[]> => {
    const nextErrors: Record<string, string[]> = {};

    if (targetStep === 1) {
      if (!form.store_name.trim()) nextErrors.store_name = ["Store name is required."];
      if (!form.store_email.trim()) nextErrors.store_email = ["Store email is required."];
      if (!form.phone.trim()) nextErrors.phone = ["Phone is required."];
      if (!form.city.trim()) nextErrors.city = ["City is required."];
      if (!form.address_line_1.trim()) nextErrors.address_line_1 = ["Address is required."];
    }

    if (targetStep === 2) {
      if (!logoFile) nextErrors.logo = ["Store logo is required."];
    }

    if (targetStep === 3) {
      if (!form.owner_name.trim()) nextErrors.owner_name = ["Owner name is required."];
      if (!form.owner_email.trim()) nextErrors.owner_email = ["Owner email is required."];
      if (!/\S+@\S+\.\S+/.test(form.owner_email)) nextErrors.owner_email = ["Owner email is invalid."];
      if (form.owner_password.length < 8) nextErrors.owner_password = ["Password must be at least 8 characters."];
      if (form.owner_password_confirmation !== form.owner_password) {
        nextErrors.owner_password_confirmation = ["Password confirmation must match owner password."];
      }
    }

    return nextErrors;
  };

  const firstStepForErrors = (allErrors: Record<string, string[]>): Step => {
    const keys = Object.keys(allErrors);
    if (keys.some((key) => ["store_name", "store_email", "phone", "city", "address_line_1"].includes(key))) return 1;
    if (keys.some((key) => ["logo"].includes(key))) return 2;
    return 3;
  };

  const goNext = () => {
    const stepErrors = validateStep(step);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setErrors({});
    if (step < 3) setStep((prev) => (prev + 1) as Step);
  };

  const goBack = () => {
    setErrors({});
    if (step > 1) setStep((prev) => (prev - 1) as Step);
  };

  const submitCheckout = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (checkoutUrl && buttonState === "ready") {
      window.location.assign(checkoutUrl);
      return;
    }

    setErrors({});
    setStatusMessage("");

    const allErrors = {
      ...validateStep(1),
      ...validateStep(2),
      ...validateStep(3),
    };

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      setStep(firstStepForErrors(allErrors));
      setButtonState("error");
      return;
    }

    setButtonState("loading");
    setIsSubmitting(true);

    try {
      const payload = new FormData();

      payload.append("store_name", form.store_name.trim());
      payload.append("store_email", form.store_email.trim());
      payload.append("phone", form.phone.trim());
      payload.append("address_line_1", form.address_line_1.trim());
      payload.append("city", form.city.trim());
      payload.append("owner_name", form.owner_name.trim());
      payload.append("owner_email", form.owner_email.trim());
      payload.append("owner_password", form.owner_password);
      payload.append("owner_password_confirmation", form.owner_password_confirmation);
      payload.append("plan_amount_da", String(planAmountDa));
      payload.append("logo", logoFile as Blob);

      const optionalFields: Array<keyof CheckoutForm> = [
        "legal_name",
        "whatsapp_number",
        "facebook_url",
        "instagram_url",
        "tiktok_url",
      ];

      optionalFields.forEach((field) => {
        const value = form[field].trim();
        if (value) payload.append(field, value);
      });

      const response = await fetch(`${apiBaseUrl}/landing/checkout`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });

      const result = await response.json().catch(() => ({}));

      if (response.status === 422) {
        const serverErrors = result?.errors ?? { general: ["Please check your information."] };
        setErrors(serverErrors);
        setStep(firstStepForErrors(serverErrors));
        setButtonState("error");
        return;
      }

      if (!response.ok || !result?.success) {
        const errorReference = typeof result?.error_reference === "string" && result.error_reference
          ? ` Reference: ${result.error_reference}`
          : "";
        setStatusMessage((result?.message ?? "Could not create checkout right now.") + errorReference);
        setButtonState("error");
        return;
      }

      const nextCheckoutUrl: string | undefined = result?.data?.checkout_url;
      const checkoutId: string | undefined = result?.data?.checkout_id;

      if (!nextCheckoutUrl || !checkoutId) {
        setStatusMessage("Checkout created but payment URL was missing.");
        setButtonState("error");
        return;
      }

      window.localStorage.setItem(CHECKOUT_STORAGE_KEY, checkoutId);
      setCheckoutUrl(nextCheckoutUrl);
      setStatusMessage("Checkout link is ready. Click the button to continue to payment.");
      setButtonState("ready");
    } catch {
      setStatusMessage("Network error while creating checkout.");
      setButtonState("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const buttonLabel =
    buttonState === "loading"
      ? "Generating..."
      : buttonState === "ready"
        ? "Go to Checkout"
        : buttonState === "error"
          ? "Try Again"
          : "Generate Checkout Link";

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background py-20 md:py-24" id="checkout">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-3xl border border-border/80 bg-card/95 p-6 shadow-xl shadow-black/[0.04] backdrop-blur md:p-10">
            <div className="mx-auto mb-8 max-w-3xl text-center">
              <Badge variant="outline" className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.14em]">
                Starter onboarding
              </Badge>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Fast checkout in 3 simple steps
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
                Inspired by clean product onboarding flows: short, guided, and easy to complete.
              </p>
            </div>

            <div className="mb-8 grid gap-3 md:grid-cols-3">
              {steps.map((item) => {
                const isActive = step === item.id;
                const isDone = step > item.id;
                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border p-4 transition-all duration-200 ${
                      isActive
                        ? "border-primary/50 bg-primary/5 shadow-sm"
                        : isDone
                          ? "border-emerald-300/80 bg-emerald-50/70"
                          : "border-border/80 bg-background/80"
                    }`}
                  >
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Step {item.id}</p>
                    <p className="mt-1 text-sm font-semibold tracking-tight">{item.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.subtitle}</p>
                  </div>
                );
              })}
            </div>

            {statusMessage && (
              <div
                className={`mb-6 rounded-xl border p-3 text-sm shadow-sm ${
                  buttonState === "ready"
                    ? "border-emerald-300 bg-emerald-50/80 text-emerald-900"
                    : buttonState === "error"
                      ? "border-rose-300 bg-rose-50/80 text-rose-900"
                      : "border-border/70 bg-muted/40"
                }`}
              >
                {statusMessage}
              </div>
            )}

            <form onSubmit={submitCheckout} className="space-y-1">
              {step === 1 && (
                <div className="grid gap-4 rounded-2xl border border-border/70 bg-background/70 p-5 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label className={labelClassName} htmlFor="store_name">Store Name *</Label>
                    <Input
                      id="store_name"
                      className={inputClassName}
                      value={form.store_name}
                      onChange={(e) => setField("store_name", e.target.value)}
                    />
                    {fieldError("store_name") && <p className="text-xs text-destructive">{fieldError("store_name")}</p>}
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label className={labelClassName} htmlFor="legal_name">Legal Name</Label>
                    <Input
                      id="legal_name"
                      className={inputClassName}
                      value={form.legal_name}
                      onChange={(e) => setField("legal_name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className={labelClassName} htmlFor="store_email">Store Email *</Label>
                    <Input
                      id="store_email"
                      type="email"
                      className={inputClassName}
                      value={form.store_email}
                      onChange={(e) => setField("store_email", e.target.value)}
                    />
                    {fieldError("store_email") && <p className="text-xs text-destructive">{fieldError("store_email")}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className={labelClassName} htmlFor="phone">Phone *</Label>
                    <Input id="phone" className={inputClassName} value={form.phone} onChange={(e) => setField("phone", e.target.value)} />
                    {fieldError("phone") && <p className="text-xs text-destructive">{fieldError("phone")}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className={labelClassName} htmlFor="city">City *</Label>
                    <Input id="city" className={inputClassName} value={form.city} onChange={(e) => setField("city", e.target.value)} />
                    {fieldError("city") && <p className="text-xs text-destructive">{fieldError("city")}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className={labelClassName} htmlFor="whatsapp_number">WhatsApp</Label>
                    <Input
                      id="whatsapp_number"
                      className={inputClassName}
                      value={form.whatsapp_number}
                      onChange={(e) => setField("whatsapp_number", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label className={labelClassName} htmlFor="address_line_1">Address Line 1 *</Label>
                    <Input
                      id="address_line_1"
                      className={inputClassName}
                      value={form.address_line_1}
                      onChange={(e) => setField("address_line_1", e.target.value)}
                    />
                    {fieldError("address_line_1") && <p className="text-xs text-destructive">{fieldError("address_line_1")}</p>}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-4 rounded-2xl border border-border/70 bg-background/70 p-5 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label className={labelClassName} htmlFor="logo">Store Logo * (jpg/jpeg/png/webp)</Label>
                    <Input
                      id="logo"
                      type="file"
                      className={`${inputClassName} cursor-pointer file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-primary-foreground hover:file:bg-primary/90`}
                      accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                      onChange={(e) => {
                        resetCheckoutAction();
                        setLogoFile(e.target.files?.[0] ?? null);
                      }}
                    />
                    {fieldError("logo") && <p className="text-xs text-destructive">{fieldError("logo")}</p>}
                    {logoPreview && (
                      <div className="mt-2">
                        <img src={logoPreview} alt="Logo preview" className="h-16 w-16 rounded-lg border border-border object-cover shadow-sm" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className={labelClassName} htmlFor="facebook_url">Facebook URL</Label>
                    <Input
                      id="facebook_url"
                      type="url"
                      className={inputClassName}
                      value={form.facebook_url}
                      onChange={(e) => setField("facebook_url", e.target.value)}
                    />
                    {fieldError("facebook_url") && <p className="text-xs text-destructive">{fieldError("facebook_url")}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className={labelClassName} htmlFor="instagram_url">Instagram URL</Label>
                    <Input
                      id="instagram_url"
                      type="url"
                      className={inputClassName}
                      value={form.instagram_url}
                      onChange={(e) => setField("instagram_url", e.target.value)}
                    />
                    {fieldError("instagram_url") && <p className="text-xs text-destructive">{fieldError("instagram_url")}</p>}
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label className={labelClassName} htmlFor="tiktok_url">TikTok URL</Label>
                    <Input
                      id="tiktok_url"
                      type="url"
                      className={inputClassName}
                      value={form.tiktok_url}
                      onChange={(e) => setField("tiktok_url", e.target.value)}
                    />
                    {fieldError("tiktok_url") && <p className="text-xs text-destructive">{fieldError("tiktok_url")}</p>}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="grid gap-4 rounded-2xl border border-border/70 bg-background/70 p-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className={labelClassName} htmlFor="owner_name">Owner Name *</Label>
                    <Input id="owner_name" className={inputClassName} value={form.owner_name} onChange={(e) => setField("owner_name", e.target.value)} />
                    {fieldError("owner_name") && <p className="text-xs text-destructive">{fieldError("owner_name")}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className={labelClassName} htmlFor="owner_email">Owner Email *</Label>
                    <Input
                      id="owner_email"
                      type="email"
                      className={inputClassName}
                      value={form.owner_email}
                      onChange={(e) => setField("owner_email", e.target.value)}
                    />
                    {fieldError("owner_email") && <p className="text-xs text-destructive">{fieldError("owner_email")}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className={labelClassName} htmlFor="owner_password">Owner Password *</Label>
                    <Input
                      id="owner_password"
                      type="password"
                      className={inputClassName}
                      value={form.owner_password}
                      onChange={(e) => setField("owner_password", e.target.value)}
                    />
                    {fieldError("owner_password") && <p className="text-xs text-destructive">{fieldError("owner_password")}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className={labelClassName} htmlFor="owner_password_confirmation">Confirm Password *</Label>
                    <Input
                      id="owner_password_confirmation"
                      type="password"
                      className={inputClassName}
                      value={form.owner_password_confirmation}
                      onChange={(e) => setField("owner_password_confirmation", e.target.value)}
                    />
                    {fieldError("owner_password_confirmation") && (
                      <p className="text-xs text-destructive">{fieldError("owner_password_confirmation")}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2 rounded-xl border border-border/70 bg-muted/30 p-4">
                    <p className="text-sm font-medium text-foreground/90">Plan Summary</p>
                    <p className="mt-1 text-2xl font-semibold tracking-tight">{planAmountDa.toLocaleString()} DA</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Chargily checkout will be generated after this step.
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goBack}
                  disabled={step === 1}
                  className="h-11 rounded-xl px-5 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>

                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={goNext}
                    className="h-11 rounded-xl px-5 transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className={cn(
                      "h-11 min-w-[220px] rounded-xl px-5 text-sm font-medium shadow-lg shadow-black/10 transition-all duration-300 ease-out hover:-translate-y-0.5",
                      buttonState === "ready" && "bg-emerald-600 text-white hover:bg-emerald-600/90",
                      buttonState === "error" && "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                      isSubmitting && "cursor-wait"
                    )}
                    disabled={isSubmitting}
                  >
                    {buttonState === "ready" ? (
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                    ) : buttonState === "error" ? (
                      <XCircle className="mr-2 h-5 w-5" />
                    ) : isSubmitting ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <ArrowRight className="mr-2 h-5 w-5" />
                    )}
                    {buttonLabel}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {popupOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-4">
          <div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-2xl">
            <div className="flex items-start gap-3">
              {popupKind === "verifying" && <Loader2 className="mt-0.5 h-5 w-5 animate-spin text-primary" />}
              {popupKind === "success" && <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />}
              {popupKind === "failed" && <XCircle className="mt-0.5 h-5 w-5 text-rose-600" />}
              <div className="flex-1">
                <h4 className="text-base font-semibold">
                  {popupKind === "verifying" ? "Verifying payment" : popupKind === "success" ? "Payment successful" : "Payment failed"}
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">{popupMessage}</p>
                {popupKind === "success" && (
                  <p className="mt-3 text-sm font-medium text-emerald-700">
                    Store login is loading in {countdown}s...
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              {popupKind !== "verifying" && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setPopupOpen(false)}
                >
                  Close
                </Button>
              )}
              {popupKind === "success" && dashboardUrl && (
                <Button
                  type="button"
                  onClick={() => window.location.assign(dashboardUrl)}
                >
                  Go now
                </Button>
              )}
              {popupKind === "success" && storefrontUrl && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.open(storefrontUrl, "_blank", "noopener,noreferrer")}
                >
                  Open storefront
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

    </>
  );
}
