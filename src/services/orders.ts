import { mockStore } from "@/lib/mock-store";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import type { Order, PaymentMethod, InvitationData, DashboardStats, RevenueSummary } from "@/types";
import { generateId, generateSlug } from "@/lib/utils";
import { INVITATION_DURATION_DAYS } from "@/types";

export async function getOrders(): Promise<Order[]> {
  if (!isSupabaseConfigured()) {
    return mockStore.getOrders();
  }

  const supabase = await createClient();
  if (!supabase) return mockStore.getOrders();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return mockStore.getOrders();
  return data as Order[];
}

export async function getOrder(id: string): Promise<Order | undefined> {
  if (!isSupabaseConfigured()) {
    return mockStore.getOrder(id);
  }

  const supabase = await createClient();
  if (!supabase) return mockStore.getOrder(id);

  const { data } = await supabase.from("orders").select("*").eq("id", id).single();
  return data as Order | undefined;
}

export async function createOrder(input: {
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  template_id: string;
  amount: number;
  payment_method: PaymentMethod;
  payment_screenshot: string | null;
  invitation_data: InvitationData;
}): Promise<Order> {
  const slug = generateSlug(
    input.invitation_data.groomName ?? "groom",
    input.invitation_data.brideName ?? "bride"
  );

  const orderData = {
    ...input,
    invitation_id: null,
    invitation_slug: slug,
    payment_status: "pending" as const,
    order_status: "pending" as const,
  };

  if (!isSupabaseConfigured()) {
    return mockStore.createOrder(orderData);
  }

  const supabase = await createClient();
  if (!supabase) return mockStore.createOrder(orderData);

  const { data, error } = await supabase
    .from("orders")
    .insert({ id: generateId(), ...orderData })
    .select()
    .single();

  if (error || !data) return mockStore.createOrder(orderData);
  return data as Order;
}

export async function approveOrder(orderId: string): Promise<{ order: Order; invitationUrl: string } | null> {
  if (!isSupabaseConfigured()) {
    const order = mockStore.getOrder(orderId);
    if (!order) return null;

    const updated = mockStore.updateOrder(orderId, {
      payment_status: "approved",
      order_status: "approved",
      approved_at: new Date().toISOString(),
    });

    if (!updated) return null;

    const invitation = mockStore.activateInvitation(updated);
    mockStore.updateOrder(orderId, { invitation_id: invitation.id });

    return {
      order: { ...updated, invitation_id: invitation.id },
      invitationUrl: `/i/${invitation.slug}`,
    };
  }

  const supabase = await createClient();
  if (!supabase) return null;

  const { data: order } = await supabase.from("orders").select("*").eq("id", orderId).single();
  if (!order) return null;

  const slug =
    order.invitation_slug ||
    generateSlug(order.invitation_data.groomName ?? "groom", order.invitation_data.brideName ?? "bride");

  const startDate = new Date();
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + INVITATION_DURATION_DAYS);

  const invitationId = generateId();

  await supabase.from("invitations").insert({
    id: invitationId,
    slug,
    template_id: order.template_id,
    order_id: orderId,
    data: order.invitation_data,
    status: "active",
    start_date: startDate.toISOString(),
    expiry_date: expiryDate.toISOString(),
  });

  await supabase
    .from("orders")
    .update({
      payment_status: "approved",
      order_status: "approved",
      invitation_id: invitationId,
      approved_at: new Date().toISOString(),
    })
    .eq("id", orderId);

  return { order: order as Order, invitationUrl: `/i/${slug}` };
}

export async function rejectOrder(orderId: string): Promise<Order | null> {
  if (!isSupabaseConfigured()) {
    return mockStore.updateOrder(orderId, {
      payment_status: "rejected",
      order_status: "rejected",
    }) ?? null;
  }

  const supabase = await createClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("orders")
    .update({ payment_status: "rejected", order_status: "rejected" })
    .eq("id", orderId)
    .select()
    .single();

  return data as Order | null;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const orders = await getOrders();
  const approved = orders.filter((o) => o.order_status === "approved");
  const pending = orders.filter((o) => o.order_status === "pending");

  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  const monthRevenue = approved
    .filter((o) => {
      const d = new Date(o.created_at);
      return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
    })
    .reduce((sum, o) => sum + o.amount, 0);

  const yearRevenue = approved
    .filter((o) => new Date(o.created_at).getFullYear() === thisYear)
    .reduce((sum, o) => sum + o.amount, 0);

  const { getInvitations } = await import("./invitations");
  const invitations = await getInvitations();

  return {
    totalSales: approved.reduce((sum, o) => sum + o.amount, 0),
    totalOrders: orders.length,
    pendingOrders: pending.length,
    activeInvitations: invitations.filter((i) => i.status === "active").length,
    expiredInvitations: invitations.filter((i) => i.status === "expired").length,
    monthRevenue,
    yearRevenue,
  };
}

export async function getRevenueSummary(): Promise<RevenueSummary> {
  const orders = await getOrders();
  const approved = orders.filter((o) => o.order_status === "approved");

  const now = new Date();
  const today = now.toDateString();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  return {
    today: approved
      .filter((o) => new Date(o.created_at).toDateString() === today)
      .reduce((sum, o) => sum + o.amount, 0),
    thisMonth: approved
      .filter((o) => {
        const d = new Date(o.created_at);
        return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
      })
      .reduce((sum, o) => sum + o.amount, 0),
    thisYear: approved
      .filter((o) => new Date(o.created_at).getFullYear() === thisYear)
      .reduce((sum, o) => sum + o.amount, 0),
    allTime: approved.reduce((sum, o) => sum + o.amount, 0),
  };
}

export function filterOrders(
  orders: Order[],
  filters: {
    year?: string;
    month?: string;
    paymentStatus?: string;
    templateId?: string;
    search?: string;
  }
): Order[] {
  return orders.filter((order) => {
    const date = new Date(order.created_at);
    if (filters.year && date.getFullYear().toString() !== filters.year) return false;
    if (filters.month && date.getMonth().toString() !== filters.month) return false;
    if (filters.paymentStatus && order.payment_status !== filters.paymentStatus) return false;
    if (filters.templateId && order.template_id !== filters.templateId) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      return (
        order.customer_name.toLowerCase().includes(q) ||
        order.customer_email.toLowerCase().includes(q) ||
        order.customer_phone.includes(q) ||
        order.id.toLowerCase().includes(q)
      );
    }
    return true;
  });
}

export function getMonthlyRevenue(orders: Order[]): { month: string; revenue: number }[] {
  const approved = orders.filter((o) => o.order_status === "approved");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const year = new Date().getFullYear();

  return months.map((month, i) => ({
    month,
    revenue: approved
      .filter((o) => {
        const d = new Date(o.created_at);
        return d.getMonth() === i && d.getFullYear() === year;
      })
      .reduce((sum, o) => sum + o.amount, 0),
  }));
}
