const RAW_BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || "").trim();

function getBackendUrl(): string {
  if (RAW_BACKEND_URL) {
    return RAW_BACKEND_URL.replace(/\/+$/, "");
  }

  if (typeof window !== "undefined") {
    return `${window.location.protocol}//${window.location.hostname}:8000`;
  }

  // return "http://localhost:8000";
  return "https://perfumbackend.eu.cc/api";
}

function getApiUrl(): string {
  return `${getBackendUrl()}/api`;
}

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  store_id: number | null;
};

export type AdminstrationDashboardPayload = {
  success: boolean;
  message: string;
  data: {
    generated_at: string;
    overview: {
      total_stores: number;
      active_stores: number;
      total_users: number;
      total_sales: number;
      sales_revenue: number;
      paid_checkouts: number;
      checkout_revenue_da: number;
      estimated_total_revenue_da: number;
    };
    users: {
      total_users: number;
      owners: number;
      admins: number;
      adminstrations: number;
      cashiers: number;
    };
    sales: {
      total_sales: number;
      today_sales: number;
      total_revenue: number;
      today_revenue: number;
      last_30_days_revenue: number;
    };
    checkouts: {
      total_checkouts: number;
      paid_checkouts: number;
      pending_checkouts: number;
      failed_checkouts: number;
      paid_amount_da: number;
      recent: Array<{
        id: number;
        status: string;
        amount_da: number;
        chargily_checkout_id: string | null;
        chargily_status: string | null;
        store: { id: number; name: string; slug: string } | null;
        created_at: string | null;
      }>;
    };
    stores: {
      total_stores: number;
      active_stores: number;
      inactive_stores: number;
      paid_plan_stores: number;
      items: Array<{
        id: number;
        owner_id: number | null;
        name: string;
        slug: string | null;
        email: string | null;
        city: string | null;
        is_active: boolean;
        payment_status: string;
        employees_count: number;
        admins_count: number;
        adminstrations_count: number;
        cashiers_count: number;
        sales_count: number;
        sales_revenue: number;
        checkouts_count: number;
        paid_checkouts_count: number;
        paid_checkout_amount_da: number;
        created_at: string | null;
      }>;
    };
    chargily_balance: {
      available: boolean;
      mode?: string;
      entity?: string;
      livemode?: boolean;
      message?: string;
      wallets: Array<{
        currency: string;
        balance: number;
        ready_for_payout: number;
        on_hold: number;
      }>;
    };
  };
};

async function parseResponse<T>(response: Response): Promise<T> {
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message =
      typeof payload?.message === "string"
        ? payload.message
        : "Request failed. Please try again.";
    throw new Error(message);
  }
  return payload as T;
}

export async function getCsrfCookie(): Promise<void> {
  await fetch(`${getBackendUrl()}/sanctum/csrf-cookie`, {
    method: "GET",
    credentials: "include",
  });
}

export async function login(email: string, password: string): Promise<{ user: AuthUser; message: string }> {
  await getCsrfCookie();
  const API_URL = getApiUrl();

  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return parseResponse<{ user: AuthUser; message: string }>(response);
}

export async function logout(): Promise<void> {
  const API_URL = getApiUrl();
  const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to logout.");
  }
}

export async function getCurrentUser(): Promise<AuthUser> {
  const API_URL = getApiUrl();
  const response = await fetch(`${API_URL}/user`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  return parseResponse<AuthUser>(response);
}

export async function getAdminstrationDashboard(): Promise<AdminstrationDashboardPayload> {
  const API_URL = getApiUrl();
  const response = await fetch(`${API_URL}/adminstration/dashboard`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  return parseResponse<AdminstrationDashboardPayload>(response);
}
