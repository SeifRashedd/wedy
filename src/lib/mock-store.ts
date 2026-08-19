import { MOCK_INVITATIONS, MOCK_ORDERS } from "./mock-data";
import type { Invitation, Order, InvitationData } from "@/types";
import { generateId, generateSlug } from "./utils";
import { INVITATION_DURATION_DAYS } from "@/types";

let orders: Order[] = [...MOCK_ORDERS];
let invitations: Invitation[] = [...MOCK_INVITATIONS];

export const mockStore = {
  getOrders(): Order[] {
    return [...orders];
  },

  getOrder(id: string): Order | undefined {
    return orders.find((o) => o.id === id);
  },

  createOrder(data: Omit<Order, "id" | "created_at" | "approved_at">): Order {
    const order: Order = {
      ...data,
      id: generateId(),
      created_at: new Date().toISOString(),
      approved_at: null,
    };
    orders = [order, ...orders];
    return order;
  },

  updateOrder(id: string, updates: Partial<Order>): Order | undefined {
    const index = orders.findIndex((o) => o.id === id);
    if (index === -1) return undefined;
    orders[index] = { ...orders[index], ...updates };
    return orders[index];
  },

  getInvitations(): Invitation[] {
    return [...invitations];
  },

  getInvitationBySlug(slug: string): Invitation | undefined {
    return invitations.find((i) => i.slug === slug);
  },

  getInvitation(id: string): Invitation | undefined {
    return invitations.find((i) => i.id === id);
  },

  activateInvitation(order: Order): Invitation {
    const slug =
      order.invitation_slug ||
      generateSlug(
        order.invitation_data.groomName ?? "groom",
        order.invitation_data.brideName ?? "bride"
      );

    const startDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + INVITATION_DURATION_DAYS);

    const invitation: Invitation = {
      id: generateId(),
      slug,
      template_id: order.template_id,
      order_id: order.id,
      data: order.invitation_data,
      status: "active",
      start_date: startDate.toISOString(),
      expiry_date: expiryDate.toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    invitations = [invitation, ...invitations];
    return invitation;
  },

  updateInvitation(id: string, updates: Partial<Invitation>): Invitation | undefined {
    const index = invitations.findIndex((i) => i.id === id);
    if (index === -1) return undefined;
    invitations[index] = {
      ...invitations[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    return invitations[index];
  },

  checkExpiredInvitations(): void {
    const now = new Date();
    invitations = invitations.map((inv) => {
      if (
        inv.status === "active" &&
        inv.expiry_date &&
        new Date(inv.expiry_date) < now
      ) {
        return { ...inv, status: "expired" as const };
      }
      return inv;
    });
  },
};

export function mergeInvitationData(
  base: InvitationData,
  override: Partial<InvitationData>
): InvitationData {
  return { ...base, ...override };
}
